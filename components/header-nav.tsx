"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
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
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"

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

export function HeaderNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
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
            <span className="hidden font-bold text-foreground sm:inline">Manuel d{"'"}Atelier</span>
          </Link>

          {/* Navigation desktop - Menu déroulant */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navCategories.map((category) => (
              <DropdownMenu key={category.title} category={category} pathname={pathname} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Composant de recherche */}
            <SearchDialog />

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
  const timeoutRef = useRef<NodeJS.Timeout>(null)

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

      {/* Menu déroulant avec animation */}
      <div 
        className={`absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-border bg-card p-2 shadow-2xl transition-all duration-200 origin-top ${
          open 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {category.items.map((item, index) => (
          <div 
            key={item.label} 
            className="transition-all duration-200"
            style={{ 
              transitionDelay: open ? `${index * 30}ms` : '0ms',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-8px)'
            }}
          >
            <DropdownItem item={item} pathname={pathname} />
          </div>
        ))}
      </div>
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
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
            item.children.some((c) => pathname === c.href)
              ? "bg-primary/10 text-primary"
              : "text-foreground hover:bg-secondary"
          }`}
        >
          <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${subOpen ? 'translate-x-1' : 'group-hover:translate-x-0.5'}`} />
        </button>

        {/* Sous-menu avec animation */}
        <div 
          className={`absolute left-full top-0 ml-1 min-w-[180px] rounded-xl border border-border bg-card p-2 shadow-2xl transition-all duration-200 origin-left ${
            subOpen 
              ? "opacity-100 scale-100 translate-x-0 pointer-events-auto" 
              : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
          }`}
        >
          {item.children.map((child, index) => (
            <Link
              key={child.href}
              href={child.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                pathname === child.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary hover:translate-x-1"
              }`}
              style={{ 
                transitionDelay: subOpen ? `${index * 40}ms` : '0ms',
              }}
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
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
        pathname === item.href 
          ? "bg-primary/10 text-primary" 
          : "text-foreground hover:bg-secondary hover:translate-x-1"
      }`}
    >
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
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

        {/* Sous-menu mobile avec animation */}
        <div 
          className={`ml-8 mt-1 space-y-1 border-l border-border pl-4 overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {item.children.map((child, index) => (
            <Link
              key={child.href}
              href={child.href}
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                pathname === child.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1"
              }`}
              style={{ 
                transitionDelay: expanded ? `${index * 50}ms` : '0ms',
              }}
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
