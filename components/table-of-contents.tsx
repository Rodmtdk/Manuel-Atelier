"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronUp, List, ChevronRight, X } from "lucide-react"

interface TocItem {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
    setIsOpen(false)
  }, [])

  const activeIndex = items.findIndex(item => item.id === activeId)

  return (
    <>
      {/* Desktop sidebar TOC */}
      <nav
        className={cn(
          "hidden xl:block fixed right-6 top-24 w-64",
          "z-40",
          className
        )}
        aria-label="Sommaire"
      >
        <div className="rounded-xl border border-border bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
            <List className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">
              Sommaire
            </h3>
          </div>

          {/* Progress bar */}
          <div className="relative h-1 bg-zinc-800 rounded-full mb-4 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Items list */}
          <div className="space-y-0.5">
            {items.map((item, index) => {
              const isActive = activeId === item.id
              const isPast = activeIndex > index
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-fast",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : isPast
                        ? "text-foreground/70 hover:bg-zinc-800 hover:text-foreground"
                        : "text-muted-foreground hover:bg-zinc-800 hover:text-foreground"
                  )}
                >
                  <ChevronRight className={cn(
                    "h-3 w-3 flex-shrink-0 transition-all duration-150",
                    isActive 
                      ? "text-primary translate-x-0.5" 
                      : "text-muted-foreground group-hover:translate-x-0.5"
                  )} />
                  <span className="text-left leading-snug truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile floating TOC */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 xl:hidden z-40">
        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-zinc-900/95 text-muted-foreground shadow-2xl backdrop-blur-xl transition-all duration-300",
            showBackToTop 
              ? "opacity-100 translate-y-0 pointer-events-auto hover:bg-zinc-800 hover:text-primary" 
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
          aria-label="Retour en haut"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        {/* TOC dropdown */}
        <div className="relative">
          {/* Mobile TOC panel */}
          <div 
            className={cn(
              "absolute bottom-14 right-0 mb-2 w-72 max-h-[60vh] overflow-hidden rounded-xl border border-border bg-zinc-900/95 shadow-2xl backdrop-blur-xl transition-all duration-200 origin-bottom-right",
              isOpen 
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            )}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <List className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">
                  Sommaire
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:bg-zinc-800 hover:text-foreground transition-fast"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Mobile list */}
            <div className="overflow-y-auto max-h-[calc(60vh-56px)] p-2">
              <div className="space-y-0.5">
                {items.map((item, index) => {
                  const isActive = activeId === item.id
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-fast",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-zinc-800"
                      )}
                      style={{ 
                        transitionDelay: isOpen ? `${index * 20}ms` : '0ms',
                      }}
                    >
                      <ChevronRight className={cn(
                        "h-3 w-3 flex-shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className="text-sm leading-snug">
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile floating button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-200",
              isOpen
                ? "border-primary bg-primary/20 text-primary"
                : "border-border bg-zinc-900/95 text-muted-foreground hover:bg-zinc-800 hover:text-primary hover:border-primary/30"
            )}
            aria-label="Ouvrir le sommaire"
          >
            <List className="w-5 h-5" />
            
            {/* Circular progress */}
            <svg className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${scrollProgress * 1.38} 138`}
                className="text-primary/50 transition-all duration-300"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
