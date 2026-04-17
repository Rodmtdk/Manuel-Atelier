"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronUp, List } from "lucide-react"

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
          "hidden xl:block fixed right-6 top-24 z-40 w-64",
          className
        )}
        aria-label="Sommaire"
      >
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-xl p-5 shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <List className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Sommaire
            </h3>
          </div>

          {/* Progress bar */}
          <div className="relative h-1 bg-muted rounded-full mb-4 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Items list */}
          <ul className="space-y-1">
            {items.map((item, index) => {
              const isActive = activeId === item.id
              const isPast = activeIndex > index
              
              return (
                <li key={item.id} className="relative">
                  {/* Vertical connection line */}
                  {index < items.length - 1 && (
                    <div className={cn(
                      "absolute left-3 top-8 w-px h-[calc(100%-8px)]",
                      isPast ? "bg-primary/40" : "bg-border"
                    )} />
                  )}
                  
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "group w-full flex items-start gap-3 py-2 px-2 rounded-lg text-left transition-all duration-200",
                      isActive
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    )}
                  >
                    {/* Number indicator */}
                    <div className={cn(
                      "relative flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono transition-all duration-200",
                      isActive
                        ? "border-primary bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,217,114,0.3)]"
                        : isPast
                          ? "border-primary/50 text-primary/70 bg-primary/5"
                          : "border-border text-muted-foreground group-hover:border-muted-foreground group-hover:text-foreground"
                    )}>
                      {index + 1}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className={cn(
                      "text-xs leading-relaxed pt-0.5 transition-all duration-200",
                      isActive
                        ? "text-primary font-medium"
                        : isPast
                          ? "text-foreground/70"
                          : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile floating TOC button + dropdown */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 xl:hidden">
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-lg backdrop-blur-xl transition-all hover:border-primary/50 hover:text-primary hover:shadow-primary/10"
            aria-label="Retour en haut"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-14 right-0 mb-2 w-72 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl">
              {/* Mobile header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                <List className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Sommaire
                </h3>
              </div>
              
              {/* Mobile list */}
              <ul className="space-y-1">
                {items.map((item, index) => {
                  const isActive = activeId === item.id
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span className={cn(
                          "text-xs font-mono w-5 text-center",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}>
                          {index + 1}
                        </span>
                        <span className="text-xs leading-snug">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          
          {/* Mobile floating button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300",
              isOpen
                ? "border-primary bg-primary/20 text-primary shadow-primary/20"
                : "border-border bg-card/90 text-muted-foreground hover:border-primary/50 hover:text-primary"
            )}
            aria-label="Ouvrir le sommaire"
          >
            <List className="w-5 h-5" />
            
            {/* Circular progress indicator */}
            <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
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
