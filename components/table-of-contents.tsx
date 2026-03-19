"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronUp } from "lucide-react"

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
      {/* Desktop sidebar TOC - Style Leonardo da Vinci */}
      <nav
        className={cn(
          "hidden xl:block fixed right-6 top-24 z-40 w-64",
          className
        )}
        aria-label="Sommaire"
      >
        {/* Cadre principal avec bordure ornementale */}
        <div className="relative">
          {/* Ornement coin supérieur gauche */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-amber-600/40" />
          {/* Ornement coin supérieur droit */}
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-amber-600/40" />
          {/* Ornement coin inférieur gauche */}
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-amber-600/40" />
          {/* Ornement coin inférieur droit */}
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-amber-600/40" />
          
          <div className="bg-zinc-950/90 backdrop-blur-xl border border-amber-900/30 p-5">
            {/* En-tête style manuscrit */}
            <div className="text-center mb-4 pb-3 border-b border-amber-800/20">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-600/50" />
                <svg className="w-5 h-5 text-amber-600/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-600/50" />
              </div>
              <h3 className="text-sm font-serif tracking-[0.2em] text-amber-100/90 uppercase">
                Sommaire
              </h3>
              <p className="text-[10px] text-amber-600/50 italic mt-1 tracking-wider">
                Index Capitulorum
              </p>
            </div>

            {/* Barre de progression */}
            <div className="relative h-1 bg-zinc-800/50 rounded-full mb-4 overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-700 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Liste des items avec numérotation romaine */}
            <ul className="space-y-0.5">
              {items.map((item, index) => {
                const isActive = activeId === item.id
                const isPast = activeIndex > index
                const romanNumeral = toRoman(index + 1)
                
                return (
                  <li key={item.id} className="relative">
                    {/* Ligne de connexion verticale */}
                    {index < items.length - 1 && (
                      <div className={cn(
                        "absolute left-[18px] top-7 w-px h-[calc(100%-4px)]",
                        isPast ? "bg-amber-600/40" : "bg-zinc-700/30"
                      )} />
                    )}
                    
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        "group w-full flex items-start gap-3 py-2 px-2 rounded-lg text-left transition-all duration-300",
                        isActive
                          ? "bg-amber-900/20"
                          : "hover:bg-zinc-800/50"
                      )}
                    >
                      {/* Numéro romain avec cercle */}
                      <div className={cn(
                        "relative flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-serif transition-all duration-300",
                        isActive
                          ? "border-amber-500 bg-amber-600/20 text-amber-400 shadow-[0_0_10px_rgba(217,119,6,0.3)]"
                          : isPast
                            ? "border-amber-700/50 text-amber-600/70 bg-amber-900/10"
                            : "border-zinc-700 text-zinc-500 group-hover:border-zinc-600 group-hover:text-zinc-400"
                      )}>
                        {romanNumeral}
                        {isActive && (
                          <div className="absolute inset-0 rounded-full animate-ping bg-amber-500/20" />
                        )}
                      </div>
                      
                      {/* Label */}
                      <span className={cn(
                        "text-xs leading-relaxed pt-1 transition-all duration-300",
                        isActive
                          ? "text-amber-200 font-medium"
                          : isPast
                            ? "text-amber-100/60"
                            : "text-zinc-400 group-hover:text-zinc-300"
                      )}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Pied de page ornemental */}
            <div className="mt-4 pt-3 border-t border-amber-800/20 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-600/30" />
                <svg className="w-3 h-3 text-amber-600/40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-600/30" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile floating TOC button + dropdown */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 xl:hidden">
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-900/30 bg-zinc-950/90 text-amber-600/70 shadow-lg backdrop-blur-xl transition-all hover:border-amber-600/50 hover:text-amber-500 hover:shadow-amber-900/20"
            aria-label="Retour en haut"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-14 right-0 mb-2 w-72 max-h-[70vh] overflow-y-auto rounded-xl border border-amber-900/30 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl">
              {/* En-tête mobile */}
              <div className="text-center mb-3 pb-2 border-b border-amber-800/20">
                <h3 className="text-sm font-serif tracking-[0.15em] text-amber-100/90 uppercase">
                  Sommaire
                </h3>
              </div>
              
              {/* Liste mobile */}
              <ul className="space-y-1">
                {items.map((item, index) => {
                  const isActive = activeId === item.id
                  const romanNumeral = toRoman(index + 1)
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200",
                          isActive
                            ? "bg-amber-900/20 text-amber-200"
                            : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                        )}
                      >
                        <span className={cn(
                          "text-[10px] font-serif w-6 text-center",
                          isActive ? "text-amber-500" : "text-zinc-600"
                        )}>
                          {romanNumeral}
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
          
          {/* Bouton flottant mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300",
              isOpen
                ? "border-amber-600 bg-amber-900/30 text-amber-400 shadow-amber-900/30"
                : "border-amber-900/30 bg-zinc-950/90 text-amber-600/70 hover:border-amber-600/50 hover:text-amber-500"
            )}
            aria-label="Ouvrir le sommaire"
          >
            {/* Icône livre/parchemin */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <path d="M8 7h8" />
              <path d="M8 11h6" />
            </svg>
            
            {/* Indicateur de progression circulaire */}
            <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${scrollProgress * 1.38} 138`}
                className="text-amber-600/50 transition-all duration-300"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

// Fonction de conversion en chiffres romains
function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ]
  
  let result = ""
  for (const [value, symbol] of romanNumerals) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }
  return result
}
