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
} from "lucide-react"

interface NavItem {
  label: string
  href?: string
  icon: React.ElementType
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Démarrage", href: "/demarrage", icon: Rocket },
  {
    label: "Fraisage",
    icon: Wrench,
    children: [
      { label: "Conventionnel", href: "/fraisage/conventionnel" },
      { label: "CNC", href: "/fraisage/cnc" },
    ],
  },
  {
    label: "Tournage",
    icon: Settings,
    children: [
      { label: "Conventionnel", href: "/tournage/conventionnel" },
      { label: "CNC", href: "/tournage/cnc" },
    ],
  },
  { label: "Rectification", href: "/rectification", icon: Disc },
  { label: "CAO/FAO", href: "/cao-fao", icon: Layers },
  { label: "RDM", href: "/rdm", icon: Gauge },
  { label: "Soudure", href: "/soudure", icon: Flame },
  { label: "Matériaux", href: "/materiaux", icon: Thermometer },
  { label: "Calculateur", href: "/calculateur", icon: Calculator },
  { label: "Sécurité", href: "/securite", icon: ShieldAlert },
]

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href
  const isParentActive = (children?: { href: string }[]) => 
    children?.some((c) => pathname === c.href)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[72px] flex-col border-r border-border bg-background xl:w-[244px] lg:flex">
        {/* Logo */}
        <div className="flex h-[72px] items-center justify-center border-b border-border px-3 xl:justify-start xl:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden text-base font-bold text-foreground xl:block">
              Manuel d{"'"}Atelier
            </span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {/* Search button */}
            <li>
              <button
                onClick={() => setSearchOpen(true)}
                className={`group flex w-full items-center gap-4 rounded-lg px-3 py-3 transition-all hover:bg-secondary ${
                  searchOpen ? "bg-secondary" : ""
                }`}
              >
                <Search className="h-6 w-6 shrink-0 text-foreground" />
                <span className="hidden text-base text-foreground xl:block">Rechercher</span>
              </button>
            </li>

            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                      className={`group flex w-full items-center gap-4 rounded-lg px-3 py-3 transition-all hover:bg-secondary ${
                        isParentActive(item.children) ? "bg-secondary" : ""
                      }`}
                    >
                      <item.icon className={`h-6 w-6 shrink-0 ${isParentActive(item.children) ? "text-primary" : "text-foreground"}`} />
                      <span className={`hidden flex-1 text-left text-base xl:block ${isParentActive(item.children) ? "font-semibold text-primary" : "text-foreground"}`}>
                        {item.label}
                      </span>
                      <ChevronRight className={`hidden h-4 w-4 text-muted-foreground transition-transform xl:block ${expandedItem === item.label ? "rotate-90" : ""}`} />
                    </button>
                    {expandedItem === item.label && (
                      <ul className="ml-0 mt-1 flex flex-col gap-1 xl:ml-10">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary ${
                                isActive(child.href) ? "bg-secondary font-semibold text-primary" : "text-muted-foreground"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current xl:hidden" />
                              <span className="hidden xl:block">{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`group flex items-center gap-4 rounded-lg px-3 py-3 transition-all hover:bg-secondary ${
                      isActive(item.href!) ? "bg-secondary" : ""
                    }`}
                  >
                    <item.icon className={`h-6 w-6 shrink-0 ${isActive(item.href!) ? "text-primary" : "text-foreground"}`} />
                    <span className={`hidden text-base xl:block ${isActive(item.href!) ? "font-semibold text-primary" : "text-foreground"}`}>
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Search Panel (slides from left) */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={handleSearchClose}
          />
          <div className="fixed left-0 top-0 z-[70] h-screen w-full max-w-md border-r border-border bg-background shadow-2xl lg:left-[72px] xl:left-[244px]">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="text-2xl font-bold text-foreground">Recherche</h2>
                <button
                  onClick={handleSearchClose}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search input */}
              <div className="border-b border-border p-4">
                <div className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3">
                  <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto p-4">
                {query.length < 2 ? (
                  <div className="py-12 text-center">
                    <Search className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Tapez au moins 2 caractères
                    </p>
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
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                            <Search className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="truncate text-base font-medium text-foreground">
                              {entry.title}
                            </div>
                            <div className="truncate text-sm text-muted-foreground">
                              {entry.description}
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
            className={`flex flex-col items-center gap-1 px-4 py-2 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
          >
            <Home className="h-6 w-6" />
            <span className="text-[10px]">Accueil</span>
          </Link>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground"
          >
            <Search className="h-6 w-6" />
            <span className="text-[10px]">Recherche</span>
          </button>
          <Link
            href="/calculateur"
            className={`flex flex-col items-center gap-1 px-4 py-2 ${isActive("/calculateur") ? "text-primary" : "text-muted-foreground"}`}
          >
            <Calculator className="h-6 w-6" />
            <span className="text-[10px]">Calcul</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground"
          >
            <Menu className="h-6 w-6" />
            <span className="text-[10px]">Menu</span>
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
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items */}
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                          className={`flex w-full items-center gap-4 rounded-xl px-4 py-4 transition-all hover:bg-secondary ${
                            isParentActive(item.children) ? "bg-secondary" : ""
                          }`}
                        >
                          <item.icon className={`h-6 w-6 ${isParentActive(item.children) ? "text-primary" : "text-foreground"}`} />
                          <span className={`flex-1 text-left text-base ${isParentActive(item.children) ? "font-semibold text-primary" : "text-foreground"}`}>
                            {item.label}
                          </span>
                          <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${expandedItem === item.label ? "rotate-90" : ""}`} />
                        </button>
                        {expandedItem === item.label && (
                          <ul className="ml-14 mt-1 flex flex-col gap-1 border-l border-border pl-4">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block rounded-lg px-4 py-3 text-base transition-all hover:bg-secondary ${
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
                        className={`flex items-center gap-4 rounded-xl px-4 py-4 transition-all hover:bg-secondary ${
                          isActive(item.href!) ? "bg-secondary" : ""
                        }`}
                      >
                        <item.icon className={`h-6 w-6 ${isActive(item.href!) ? "text-primary" : "text-foreground"}`} />
                        <span className={`text-base ${isActive(item.href!) ? "font-semibold text-primary" : "text-foreground"}`}>
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
