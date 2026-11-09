"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, X } from "lucide-react"

export function SectionsoudurePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <div className="relative my-8 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 via-card to-primary/10 p-8 text-center shadow-[0_0_40px_rgba(14,230,214,0.08)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,230,214,0.16),transparent_45%)]" />
        <div className="relative">
          <span className="mb-3 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Ressource spécialisée
          </span>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">
            Approfondissez vos connaissances en soudure
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Découvrez Sectionsoudure, notre espace dédié aux techniques et procédés de soudage.
          </p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/15 transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Découvrir Sectionsoudure
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sectionsoudure-dialog-title"
            className="relative w-full max-w-lg animate-scale-in rounded-2xl border border-accent/30 bg-zinc-900 p-7 shadow-2xl shadow-black/50"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer la fenêtre Sectionsoudure"
              className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Sectionsoudure
            </span>
            <h2 id="sectionsoudure-dialog-title" className="mt-3 pr-8 text-2xl font-bold text-foreground">
              Un espace dédié au soudage
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Retrouvez des ressources complémentaires sur les procédés, les réglages, les défauts et les bonnes pratiques de soudage.
            </p>
            <a
              href="https://sectionsoudure.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              Ouvrir Sectionsoudure
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}
