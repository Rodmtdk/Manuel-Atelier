"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { List, ChevronUp } from "lucide-react"

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

  return (
    <>
      {/* Desktop sidebar TOC */}
      <nav
        className={cn(
          "hidden xl:block fixed right-4 top-24 z-40 w-56 rounded-xl border border-border bg-card/80 p-4 backdrop-blur-xl",
          className
        )}
        aria-label="Sommaire"
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <List className="h-3.5 w-3.5" />
          Sommaire
        </div>
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "w-full rounded-md px-2.5 py-1.5 text-left text-xs leading-snug transition-all",
                  activeId === item.id
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile floating TOC button + dropdown */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 xl:hidden">
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-lg backdrop-blur-xl transition-all hover:border-primary/30 hover:text-primary"
            aria-label="Retour en haut"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-12 right-0 mb-2 w-64 max-h-80 overflow-y-auto rounded-xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-xl">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sommaire
              </div>
              <ul className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        "w-full rounded-md px-2.5 py-2 text-left text-xs leading-snug transition-all",
                        activeId === item.id
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-all",
              isOpen
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/90 text-muted-foreground hover:border-primary/30 hover:text-primary"
            )}
            aria-label="Ouvrir le sommaire"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  )
}
