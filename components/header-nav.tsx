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
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface NavItem {
  label: string
  href?: string
  icon: React.ElementType
  children?: { label: string; href: string }[]
}

interface NavCategory {
  title: string
  items: NavItem[]
}

const navCategories: NavCategory[] = [
  {
    title: "Principal",
    items: [
      { label: "Accueil", href: "/", icon: Home },
      { label: "Démarrage", href: "/demarrage", icon: Rocket },
    ],
  },
  {
    title: "Usinage",
    items: [
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
    ],
  },
  {
    title: "Conception",
    items: [
      { label: "CAO/FAO", href: "/cao-fao", icon: Layers },
      { label: "RDM", href: "/rdm", icon: Gauge },
    ],
  },
  {
    title: "Matériaux",
    items: [
      { label: "Soudure", href: "/soudure", icon: Flame },
      { label: "Matériaux", href: "/materiaux", icon: Thermometer },
    ],
  },
  {
    title: "Outils",
    items: [
      { label: "Calculateur", href: "/calculateur", icon: Calculator },
      { label: "Sécurité", href: "/securite", icon: ShieldAlert },
    ],
  },
]

// Index de recherche
const searchIndex = [
  { title: "Accueil", href: "/", keywords: ["accueil", "home", "menu"] },
  { title: "Démarrage", href: "/demarrage", keywords: ["démarrage", "débuter", "commencer", "guide"] },
  { title: "Fraisage Conventionnel", href: "/fraisage/conventionnel", keywords: ["fraisage", "fraiseuse", "conventionnel", "manuel"] },
  { title: "Fraisage CNC", href: "/fraisage/cnc", keywords: ["fraisage", "cnc", "numérique", "programmation"] },
  { title: "Tournage Conventionnel", href: "/tournage/conventionnel", keywords: ["tournage", "tour", "conventionnel", "manuel"] },
  { title: "Tournage CNC", href: "/tournage/cnc", keywords: ["tournage", "cnc", "numérique", "programmation"] },
  { title: "Rectification", href: "/rectification", keywords: ["rectification", "meule", "précision", "finition"] },
  { title: "CAO/FAO", href: "/cao-fao", keywords: ["cao", "fao", "conception", "fabrication", "solidworks", "mastercam"] },
  { title: "RDM", href: "/rdm", keywords: ["rdm", "résistance", "matériaux", "contrainte", "flexion"] },
  { title: "Soudure", href: "/soudure", keywords: ["soudure", "soudage", "mig", "tig", "mma"] },
  { title: "Matériaux", href: "/materiaux", keywords: ["matériaux", "acier", "aluminium", "traitement", "thermique"] },
  { title: "Calculateur", href: "/calculateur", keywords: ["calculateur", "vitesse", "coupe", "avance"] },
  { title: "Sécurité", href: "/securite", keywords: ["sécurité", "epi", "protection", "danger"] },
]

export function HeaderNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Raccourci clavier Ctrl+K pour la recherche
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === "Escape") {
        setSearchOpen(false)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus sur le champ de recherche
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // Résultats de recherche filtrés
  const searchResults = searchQuery.trim()
    ? searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  const handleSearchSelect = (href: string) => {
    router.push(href)
    setSearchQuery("")
    setSearchOpen(false)
  }

  return (
    <>
      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-bold text-foreground sm:inline">Manuel d'Atelier</span>
          </Link>

          {/* Navigation desktop - Menu déroulant */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navCategories.map((category) => (
              <DropdownMenu key={category.title} category={category} pathname={pathname} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Bouton recherche */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-border bg-muted px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Rechercher...</span>
              <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-xs font-mono text-muted-foreground md:inline">
                Ctrl+K
              </kbd>
            </button>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16 lg:hidden">
          <nav className="h-full overflow-y-auto p-4">
            {navCategories.map((category) => (
              <div key={category.title} className="mb-6">
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <MobileNavItem
                      key={item.label}
                      item={item}
                      pathname={pathname}
                      expanded={expandedItems.includes(item.label)}
                      onToggle={() => toggleExpanded(item.label)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Modal de recherche */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-20 backdrop-blur-sm">
          <div
            ref={menuRef}
            className="w-full max-w-lg mx-4 overflow-hidden rounded-xl border border-border bg-zinc-900 shadow-2xl"
          >
            {/* Champ de recherche */}
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher une page..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Résultats */}
            <div className="max-h-80 overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Tapez pour rechercher...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Aucun résultat pour "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((result) => (
                    <button
                      key={result.href}
                      onClick={() => handleSearchSelect(result.href)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-foreground transition-colors hover:bg-muted"
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <span>{result.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Menu déroulant desktop
function DropdownMenu({
  category,
  pathname,
}: {
  category: NavCategory
  pathname: string
}) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  // Vérifier si un item de cette catégorie est actif
  const isActive = category.items.some((item) => {
    if (item.href) return pathname === item.href
    if (item.children) return item.children.some((child) => pathname === child.href)
    return false
  })

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={`flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {category.title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-border bg-zinc-900 p-2 shadow-2xl">
          {category.items.map((item) => (
            <DropdownItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  )
}

// Item de menu déroulant desktop
function DropdownItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [subOpen, setSubOpen] = useState(false)
  const Icon = item.icon

  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setSubOpen(true)}
        onMouseLeave={() => setSubOpen(false)}
      >
        <button
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            item.children.some((c) => pathname === c.href)
              ? "bg-primary/10 text-primary"
              : "text-foreground hover:bg-zinc-800"
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        {subOpen && (
          <div className="absolute left-full top-0 ml-1 min-w-[180px] rounded-xl border border-border bg-zinc-900 p-2 shadow-2xl">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === child.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-zinc-800"
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-zinc-800"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  )
}

// Item de navigation mobile
function MobileNavItem({
  item,
  pathname,
  expanded,
  onToggle,
}: {
  item: NavItem
  pathname: string
  expanded: boolean
  onToggle: () => void
}) {
  const Icon = item.icon

  if (item.children) {
    const isChildActive = item.children.some((c) => pathname === c.href)

    return (
      <div>
        <button
          onClick={onToggle}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
            isChildActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
          }`}
        >
          <Icon className="h-5 w-5" />
          <span className="flex-1 font-medium">{item.label}</span>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {expanded && (
          <div className="ml-8 mt-1 space-y-1 border-l border-border pl-4">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  pathname === child.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
        pathname === item.href
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{item.label}</span>
    </Link>
  )
}
