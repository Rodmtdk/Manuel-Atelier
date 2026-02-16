"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, X, Command } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchEntry {
  title: string
  description: string
  href: string
  category: string
  keywords: string[]
}

const searchIndex: SearchEntry[] = [
  // Accueil
  { title: "Accueil", description: "Page d'accueil du Manuel d'Atelier", href: "/", category: "Navigation", keywords: ["accueil", "home", "manuel", "atelier"] },
  { title: "Guide de d\u00e9marrage", description: "Les bases de l'usinage : outils, mat\u00e9riaux, m\u00e9trologie", href: "/demarrage", category: "Navigation", keywords: ["d\u00e9marrage", "bases", "d\u00e9butant", "introduction"] },

  // Fraisage
  { title: "Fraisage conventionnel", description: "\u00c9taux, t\u00eates de fraiseuse, outils, opposition/concordance, \u00e9bauche/finition", href: "/fraisage/conventionnel", category: "Fraisage", keywords: ["fraisage", "conventionnel", "\u00e9tau", "t\u00eate", "opposition", "concordance", "\u00e9bauche", "finition", "d\u00e9gauchissage"] },
  { title: "Fraisage CNC", description: "Programmation, codes G/M, 5 axes, usinage num\u00e9rique", href: "/fraisage/cnc", category: "Fraisage", keywords: ["fraisage", "cnc", "num\u00e9rique", "code g", "5 axes", "programmation", "fao"] },
  { title: "\u00c9taux de fraisage", description: "Types d'\u00e9taux, d\u00e9gauchissage au comparateur, bridage", href: "/fraisage/conventionnel#etaux-de-fraisage", category: "Fraisage", keywords: ["\u00e9tau", "d\u00e9gauchir", "comparateur", "bridage", "serrage"] },
  { title: "Opposition et concordance", description: "Fraisage en opposition vs en avalant (concordance)", href: "/fraisage/conventionnel#techniques-de-fraisage", category: "Fraisage", keywords: ["opposition", "concordance", "avalant", "sens", "coupe"] },
  { title: "Types de fraises", description: "1 taille, 2 tailles, 3 tailles, surfacer, forme", href: "/fraisage/conventionnel#types-de-fraises", category: "Fraisage", keywords: ["fraise", "1 taille", "2 tailles", "3 tailles", "surfacer", "forme", "rainure"] },

  // Tournage
  { title: "Tournage conventionnel", description: "Montages, mandrins, mors, outils, \u00e9bauche/finition, \u00e9paulement", href: "/tournage/conventionnel", category: "Tournage", keywords: ["tournage", "conventionnel", "mandrin", "mors", "\u00e9paulement", "c\u00f4ne", "filetage"] },
  { title: "Tournage CNC", description: "Tours num\u00e9riques, tourelle, programmation ISO", href: "/tournage/cnc", category: "Tournage", keywords: ["tournage", "cnc", "num\u00e9rique", "tourelle", "code g", "programmation"] },
  { title: "Types de montages", description: "En l'air, mixte, entre pointes, en pince, lunette", href: "/tournage/conventionnel#types-de-montages", category: "Tournage", keywords: ["montage", "en l'air", "mixte", "entre pointes", "pince", "lunette", "contre-pointe"] },
  { title: "Mandrins et mors", description: "2/3/4 mors, mors durs, mors doux, montage", href: "/tournage/conventionnel#mandrins-et-mors", category: "Tournage", keywords: ["mandrin", "mors", "durs", "doux", "serrage", "3 mors", "4 mors"] },
  { title: "Outils de tournage", description: "Charioter, dresser, al\u00e9ser, fileter, tron\u00e7onner", href: "/tournage/conventionnel#classification-outils", category: "Tournage", keywords: ["outil", "charioter", "dresser", "al\u00e9ser", "fileter", "tron\u00e7onner", "saigner", "moleter"] },
  { title: "\u00c9paulement en tournage", description: "R\u00e9alisation d'un \u00e9paulement ext\u00e9rieur et int\u00e9rieur", href: "/tournage/conventionnel#realiser-epaulement", category: "Tournage", keywords: ["\u00e9paulement", "chariotage", "dressage", "al\u00e9sage"] },

  // Rectification
  { title: "Rectification", description: "Rectification plane et cylindrique, meules, dressage", href: "/rectification", category: "Rectification", keywords: ["rectification", "meule", "cylindrique", "plane", "dressage", "abrasif"] },

  // Calculateur
  { title: "Calculateur de vitesses", description: "Calculer Vc, n, Vf, Ra, d\u00e9bit de copeaux", href: "/calculateur", category: "Outils", keywords: ["calculateur", "vitesse", "coupe", "avance", "rpm", "vc", "vf", "ra"] },

  // S\u00e9curit\u00e9
  { title: "S\u00e9curit\u00e9 en atelier", description: "EPI, pr\u00e9cautions machines, risques, premiers secours", href: "/securite", category: "S\u00e9curit\u00e9", keywords: ["s\u00e9curit\u00e9", "epi", "protection", "lunettes", "gants", "risque", "accident"] },

  // Technique sp\u00e9cifiques
  { title: "Vitesse de coupe (Vc)", description: "Formule Vc = \u03c0 \u00d7 D \u00d7 N / 1000", href: "/calculateur", category: "Formules", keywords: ["vitesse de coupe", "vc", "formule", "pi", "diam\u00e8tre"] },
  { title: "Avance par tour (f)", description: "Param\u00e8tre cl\u00e9 pour la qualit\u00e9 de surface (Ra)", href: "/calculateur", category: "Formules", keywords: ["avance", "tour", "f", "ra", "rugosit\u00e9", "surface"] },
  { title: "Mat\u00e9riaux d'outils", description: "HSS, carbure, c\u00e9ramique, PCD, CBN, rev\u00eatements", href: "/demarrage", category: "Mat\u00e9riaux", keywords: ["hss", "carbure", "c\u00e9ramique", "pcd", "cbn", "tialn", "tin", "rev\u00eatement", "mat\u00e9riau"] },
  { title: "Lubrification", description: "R\u00f4le du lubrifiant : refroidir, lubrifier, \u00e9vacuer les copeaux", href: "/fraisage/conventionnel#ebauche-finition", category: "Technique", keywords: ["lubrifiant", "arrosage", "huile", "coupe", "refroidissement"] },
]

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = query.length >= 2
    ? searchIndex.filter((entry) => {
        const q = normalize(query)
        return (
          normalize(entry.title).includes(q) ||
          normalize(entry.description).includes(q) ||
          entry.keywords.some((k) => normalize(k).includes(q))
        )
      }).slice(0, 8)
    : []

  const handleOpen = useCallback(() => {
    setOpen(true)
    setQuery("")
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setQuery("")
  }, [])

  const handleSelect = useCallback(
    (href: string) => {
      handleClose()
      router.push(href)
    },
    [handleClose, router]
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        handleClose()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [handleClose])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
        aria-label="Rechercher"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Rechercher...</span>
        <kbd className="ml-2 hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          <Command className="inline h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative w-full max-w-lg animate-fade-in rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une technique, un outil, un concept..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={handleClose}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {query.length < 2 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Tapez au moins 2 caract{"\u00e8"}res pour rechercher
                </div>
              ) : results.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Aucun r{"\u00e9"}sultat pour {"\u00ab"} {query} {"\u00bb"}
                </div>
              ) : (
                <ul role="listbox">
                  {results.map((entry, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleSelect(entry.href)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all hover:bg-secondary"
                        role="option"
                        aria-selected={false}
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">
                            {entry.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {entry.description}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {entry.category}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
