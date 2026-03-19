"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Rocket,
  Wrench,
  Settings,
  Calculator,
  ShieldAlert,
  Disc,
  Layers,
  Gauge,
  Flame,
  Thermometer,
  Search,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Cpu,
  GraduationCap,
} from "lucide-react"

interface NavItem {
  label: string
  href?: string
  icon: React.ElementType
  description?: string
  children?: { label: string; href: string; description?: string }[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

// Navigation organisée par catégories intuitives
const navSections: NavSection[] = [
  {
    title: "Principal",
    items: [
      { label: "Accueil", href: "/", icon: Home, description: "Page d'accueil" },
      { label: "Démarrage", href: "/demarrage", icon: Rocket, description: "Guide pour débuter" },
    ],
  },
  {
    title: "Usinage",
    items: [
      {
        label: "Fraisage",
        icon: Wrench,
        description: "Techniques de fraisage",
        children: [
          { label: "Conventionnel", href: "/fraisage/conventionnel", description: "Fraisage manuel" },
          { label: "CNC", href: "/fraisage/cnc", description: "Fraisage numérique" },
        ],
      },
      {
        label: "Tournage",
        icon: Settings,
        description: "Techniques de tournage",
        children: [
          { label: "Conventionnel", href: "/tournage/conventionnel", description: "Tournage manuel" },
          { label: "CNC", href: "/tournage/cnc", description: "Tournage numérique" },
        ],
      },
      { label: "Rectification", href: "/rectification", icon: Disc, description: "Finition de précision" },
    ],
  },
  {
    title: "Conception",
    items: [
      { label: "CAO/FAO", href: "/cao-fao", icon: Layers, description: "Conception et fabrication assistées" },
      { label: "RDM", href: "/rdm", icon: Gauge, description: "Résistance des matériaux" },
    ],
  },
  {
    title: "Matériaux",
    items: [
      { label: "Soudure", href: "/soudure", icon: Flame, description: "Procédés de soudage" },
      { label: "Matériaux", href: "/materiaux", icon: Thermometer, description: "Matériaux et traitements" },
    ],
  },
  {
    title: "Outils",
    items: [
      { label: "Calculateur", href: "/calculateur", icon: Calculator, description: "Calculs d'usinage" },
      { label: "Sécurité", href: "/securite", icon: ShieldAlert, description: "Règles de sécurité" },
    ],
  },
]

// Flatten pour la navigation mobile
const navItems = navSections.flatMap(section => section.items)

interface SearchEntry {
  title: string
  description: string
  href: string
  category: string
  keywords: string[]
}

const searchIndex: SearchEntry[] = [
  { title: "Accueil", description: "Page d'accueil du Manuel d'Atelier", href: "/", category: "Navigation", keywords: ["accueil", "home", "manuel", "atelier"] },
  { title: "Guide de démarrage", description: "Les bases de l'usinage : outils, matériaux, métrologie", href: "/demarrage", category: "Navigation", keywords: ["démarrage", "bases", "débutant", "introduction"] },
  { title: "Fraisage conventionnel", description: "Étaux, têtes de fraiseuse, outils, opposition/concordance", href: "/fraisage/conventionnel", category: "Fraisage", keywords: ["fraisage", "conventionnel", "étau", "tête", "opposition", "concordance"] },
  { title: "Fraisage CNC", description: "Programmation, codes G/M, 5 axes, usinage numérique", href: "/fraisage/cnc", category: "Fraisage", keywords: ["fraisage", "cnc", "numérique", "code g", "5 axes"] },
  { title: "Tournage conventionnel", description: "Montages, mandrins, mors, outils, ébauche/finition", href: "/tournage/conventionnel", category: "Tournage", keywords: ["tournage", "conventionnel", "mandrin", "mors"] },
  { title: "Tournage CNC", description: "Tours numériques, tourelle, programmation ISO", href: "/tournage/cnc", category: "Tournage", keywords: ["tournage", "cnc", "numérique", "tourelle"] },
  { title: "Rectification", description: "Rectification plane, cylindrique et spiroconique, meules", href: "/rectification", category: "Rectification", keywords: ["rectification", "meule", "cylindrique", "plane"] },
  { title: "CAO/FAO", description: "Conception et Fabrication Assistées par Ordinateur", href: "/cao-fao", category: "CAO/FAO", keywords: ["cao", "fao", "solidworks", "mastercam"] },
  { title: "Résistance des Matériaux", description: "RDM : contraintes, déformations, flexion, torsion", href: "/rdm", category: "RDM", keywords: ["rdm", "résistance", "contrainte", "flexion"] },
  { title: "Soudure", description: "Techniques de soudage MIG, MAG, TIG, MMA", href: "/soudure", category: "Soudure", keywords: ["soudure", "soudage", "mig", "tig"] },
  { title: "Matériaux et Traitements", description: "Aciers, aluminiums, traitements thermiques", href: "/materiaux", category: "Matériaux", keywords: ["matériaux", "acier", "trempe", "revenu"] },
  { title: "Calculateur de vitesses", description: "Calculer Vc, n, Vf, Ra, débit de copeaux", href: "/calculateur", category: "Outils", keywords: ["calculateur", "vitesse", "coupe", "avance"] },
  { title: "Sécurité en atelier", description: "EPI, précautions machines, risques", href: "/securite", category: "Sécurité", keywords: ["sécurité", "epi", "protection"] },
]

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

// Composant Tooltip personnalisé
function Tooltip({ children, content, side = "right" }: { children: React.ReactNode; content: string; side?: "right" | "bottom" }) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div
          className={`absolute z-[100] whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background shadow-lg ${
            side === "right" 
              ? "left-full top-1/2 ml-3 -translate-y-1/2" 
              : "left-1/2 top-full mt-2 -translate-x-1/2"
          }`}
        >
          {content}
          <div 
            className={`absolute h-2 w-2 rotate-45 bg-foreground ${
              side === "right" 
                ? "-left-1 top-1/2 -translate-y-1/2" 
                : "left-1/2 -top-1 -translate-x-1/2"
            }`}
          />
        </div>
      )}
    </div>
  )
}

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false)
    setQuery("")
  }, [])

  const handleSelect = useCallback((href: string) => {
    handleSearchClose()
    setMobileMenuOpen(false)
    router.push(href)
  }, [handleSearchClose, router])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        handleSearchClose()
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [handleSearchClose])

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [searchOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href
  const isParentActive = (children?: { href: string }[]) => 
    children?.some((c) => pathname === c.href)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[72px] flex-col border-r border-border bg-background lg:flex">
        {/* Logo */}
        <div className="flex h-[72px] items-center justify-center border-b border-border">
          <Tooltip content="Manuel d'Atelier">
            <Link href="/" className="flex items-center justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary transition-transform hover:scale-105">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
            </Link>
          </Tooltip>
        </div>

        {/* Nav items with sections */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Recherche */}
          <div className="px-3 pb-2">
            <Tooltip content="Rechercher (Ctrl+K)">
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:bg-secondary ${
                  searchOpen ? "bg-secondary text-primary" : "text-foreground"
                }`}
              >
                <Search className="h-5 w-5" />
              </button>
            </Tooltip>
          </div>

          {/* Sections de navigation */}
          {navSections.map((section, sectionIdx) => (
            <div key={section.title} className={sectionIdx > 0 ? "mt-4 border-t border-border pt-4" : ""}>
              <div className="mb-2 px-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  {section.title.charAt(0)}
                </span>
              </div>
              <ul className="flex flex-col gap-1 px-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <div>
                        <Tooltip content={item.description || item.label}>
                          <button
                            onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:bg-secondary ${
                              isParentActive(item.children) || expandedItem === item.label
                                ? "bg-secondary text-primary"
                                : "text-foreground"
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                          </button>
                        </Tooltip>
                        {expandedItem === item.label && (
                          <div className="mt-1 flex flex-col gap-1">
                            {item.children.map((child) => (
                              <Tooltip key={child.href} content={child.description || child.label}>
                                <Link
                                  href={child.href}
                                  className={`flex h-9 w-11 items-center justify-center rounded-lg text-xs transition-all hover:bg-secondary ${
                                    isActive(child.href)
                                      ? "bg-primary/10 font-semibold text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  <span className="w-5 text-center">{child.label.charAt(0)}</span>
                                </Link>
                              </Tooltip>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Tooltip content={item.description || item.label}>
                        <Link
                          href={item.href!}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:bg-secondary ${
                            isActive(item.href!)
                              ? "bg-secondary text-primary"
                              : "text-foreground"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                        </Link>
                      </Tooltip>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Search Panel (slides from left) */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
            onClick={handleSearchClose}
          />
          <div className="fixed left-0 top-0 z-[70] h-screen w-full max-w-md border-r border-border bg-background shadow-2xl lg:left-[72px]">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="text-2xl font-bold text-foreground">Recherche</h2>
                <button
                  onClick={handleSearchClose}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search input */}
              <div className="border-b border-border p-4">
                <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
                  <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher une page, un outil..."
                    className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Raccourci : <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono">Ctrl</kbd> + <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono">K</kbd>
                </p>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto p-4">
                {query.length < 2 ? (
                  <div className="py-12 text-center">
                    <Search className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Tapez au moins 2 caractères pour rechercher
                    </p>
                    <div className="mt-8">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                        Suggestions
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {["Fraisage", "Tournage", "CAO", "Soudure", "Calcul"].map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="rounded-full bg-secondary px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary/80"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                      Aucun résultat pour « {query} »
                    </p>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {results.map((entry, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handleSelect(entry.href)}
                          className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all hover:bg-secondary"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="truncate text-base font-medium text-foreground">
                              {entry.title}
                            </div>
                            <div className="truncate text-sm text-muted-foreground">
                              {entry.description}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground/50">
                              {entry.category}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
          >
            <Home className="h-6 w-6" />
            <span className="text-[10px] font-medium">Accueil</span>
          </Link>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors"
          >
            <Search className="h-6 w-6" />
            <span className="text-[10px] font-medium">Recherche</span>
          </button>
          <Link
            href="/calculateur"
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${isActive("/calculateur") ? "text-primary" : "text-muted-foreground"}`}
          >
            <Calculator className="h-6 w-6" />
            <span className="text-[10px] font-medium">Calcul</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors"
          >
            <Menu className="h-6 w-6" />
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Full Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[80] bg-background lg:hidden">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Wrench className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">Manuel d{"'"}Atelier</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items organized by sections */}
            <div className="flex-1 overflow-y-auto p-4">
              {navSections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        {item.children ? (
                          <div>
                            <button
                              onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all hover:bg-secondary ${
                                isParentActive(item.children) ? "bg-secondary" : ""
                              }`}
                            >
                              <item.icon className={`h-5 w-5 ${isParentActive(item.children) ? "text-primary" : "text-foreground"}`} />
                              <div className="flex-1 text-left">
                                <span className={`text-base ${isParentActive(item.children) ? "font-semibold text-primary" : "text-foreground"}`}>
                                  {item.label}
                                </span>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground">{item.description}</p>
                                )}
                              </div>
                              <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${expandedItem === item.label ? "rotate-90" : ""}`} />
                            </button>
                            {expandedItem === item.label && (
                              <ul className="ml-14 mt-1 flex flex-col gap-1 border-l border-border pl-4">
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`block rounded-lg px-4 py-2.5 transition-all hover:bg-secondary ${
                                        isActive(child.href) ? "font-semibold text-primary" : "text-muted-foreground"
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href!}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all hover:bg-secondary ${
                              isActive(item.href!) ? "bg-secondary" : ""
                            }`}
                          >
                            <item.icon className={`h-5 w-5 ${isActive(item.href!) ? "text-primary" : "text-foreground"}`} />
                            <div className="flex-1">
                              <span className={`text-base ${isActive(item.href!) ? "font-semibold text-primary" : "text-foreground"}`}>
                                {item.label}
                              </span>
                              {item.description && (
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              )}
                            </div>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
