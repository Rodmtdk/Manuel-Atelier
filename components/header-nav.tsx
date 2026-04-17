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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === "Escape") {
        setSearchOpen(false)
        setMobileMenuOpen(false)
        setActiveDropdown(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null)
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [activeDropdown])

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

  const handleDropdownEnter = useCallback((title: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveDropdown(title)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100)
  }, [])

  return (
    <>
      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 z-header h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary transition-smooth group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-bold text-foreground sm:inline">Manuel d&apos;Atelier</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navCategories.map((category) => (
              <DropdownMenu 
                key={category.title} 
                category={category} 
                pathname={pathname}
                isOpen={activeDropdown === category.title}
                onEnter={() => handleDropdownEnter(category.title)}
                onLeave={handleDropdownLeave}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-border bg-muted/50 px-3 text-sm text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-muted hover:text-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Rechercher...</span>
              <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-xs font-mono text-muted-foreground md:inline">
                Ctrl+K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 z-dropdown bg-background pt-16 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="h-full overflow-y-auto p-4">
          {navCategories.map((category, catIndex) => (
            <div 
              key={category.title} 
              className="mb-6"
              style={{ 
                animationDelay: mobileMenuOpen ? `${catIndex * 50}ms` : '0ms',
              }}
            >
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {category.title}
              </h3>
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    expanded={expandedItems.includes(item.label)}
                    onToggle={() => toggleExpanded(item.label)}
                    delay={mobileMenuOpen ? (catIndex * 50) + (itemIndex * 30) : 0}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Modal de recherche */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-modal flex items-start justify-center bg-black/70 pt-20 backdrop-blur-sm animate-fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg mx-4 overflow-hidden rounded-xl border border-border bg-zinc-900/95 shadow-2xl backdrop-blur-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
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
                className="rounded-md p-1 text-muted-foreground transition-fast hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Tapez pour rechercher...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Aucun résultat pour &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((result, index) => (
                    <button
                      key={result.href}
                      onClick={() => handleSearchSelect(result.href)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-foreground transition-fast hover:bg-zinc-800"
                      style={{ animationDelay: `${index * 30}ms` }}
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

function DropdownMenu({
  category,
  pathname,
  isOpen,
  onEnter,
  onLeave,
}: {
  category: NavCategory
  pathname: string
  isOpen: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const isActive = category.items.some((item) => {
    if (item.href) return pathname === item.href
    if (item.children) return item.children.some((child) => pathname === child.href)
    return false
  })

  return (
    <div 
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        className={`flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-smooth ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {category.title}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div 
        className={`absolute left-0 top-full z-dropdown mt-2 min-w-[220px] rounded-xl border border-border bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 origin-top ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {category.items.map((item, index) => (
          <div 
            key={item.label}
            className={`transition-all duration-150 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
            style={{ transitionDelay: isOpen ? `${index * 30}ms` : '0ms' }}
          >
            <DropdownItem item={item} pathname={pathname} parentOpen={isOpen} />
          </div>
        ))}
      </div>
    </div>
  )
}

function DropdownItem({ item, pathname, parentOpen }: { item: NavItem; pathname: string; parentOpen: boolean }) {
  const [subOpen, setSubOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const Icon = item.icon

  const handleSubEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setSubOpen(true)
  }

  const handleSubLeave = () => {
    timeoutRef.current = setTimeout(() => setSubOpen(false), 80)
  }

  // Reset submenu when parent closes
  useEffect(() => {
    if (!parentOpen) setSubOpen(false)
  }, [parentOpen])

  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={handleSubEnter}
        onMouseLeave={handleSubLeave}
      >
        <button
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-fast ${
            item.children.some((c) => pathname === c.href)
              ? "bg-primary/10 text-primary"
              : "text-foreground hover:bg-zinc-800"
          }`}
        >
          <Icon className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-150 ${subOpen ? 'translate-x-0.5' : ''}`} />
        </button>

        <div 
          className={`absolute left-full top-0 z-dropdown ml-2 min-w-[180px] rounded-xl border border-border bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-150 origin-left ${
            subOpen 
              ? "opacity-100 scale-100 translate-x-0 pointer-events-auto" 
              : "opacity-0 scale-95 -translate-x-1 pointer-events-none"
          }`}
        >
          {item.children.map((child, index) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block rounded-lg px-3 py-2.5 text-sm transition-fast ${
                pathname === child.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-zinc-800 hover:translate-x-0.5"
              }`}
              style={{ transitionDelay: subOpen ? `${index * 25}ms` : '0ms' }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-fast ${
        pathname === item.href 
          ? "bg-primary/10 text-primary" 
          : "text-foreground hover:bg-zinc-800 hover:translate-x-0.5"
      }`}
    >
      <Icon className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
      <span>{item.label}</span>
    </Link>
  )
}

function MobileNavItem({
  item,
  pathname,
  expanded,
  onToggle,
  delay,
}: {
  item: NavItem
  pathname: string
  expanded: boolean
  onToggle: () => void
  delay: number
}) {
  const Icon = item.icon

  if (item.children) {
    const isChildActive = item.children.some((c) => pathname === c.href)

    return (
      <div style={{ animationDelay: `${delay}ms` }} className="animate-fade-in">
        <button
          onClick={onToggle}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-fast ${
            isChildActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
          }`}
        >
          <Icon className="h-5 w-5" />
          <span className="flex-1 font-medium">{item.label}</span>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <div 
          className={`ml-8 mt-1 space-y-1 border-l border-border pl-4 overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {item.children.map((child, index) => (
            <Link
              key={child.href}
              href={child.href}
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm transition-fast ${
                pathname === child.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              style={{ transitionDelay: expanded ? `${index * 40}ms` : '0ms' }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-fast ${
        pathname === item.href
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground hover:bg-muted"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="h-5 w-5" />
      <span>{item.label}</span>
    </Link>
  )
}
