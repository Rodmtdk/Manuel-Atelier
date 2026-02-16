"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Home,
  Rocket,
  Wrench,
  Settings,
  Calculator,
  ShieldAlert,
  ChevronDown,
  Menu,
  X,
  Disc,
} from "lucide-react"

const navItems = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Demarrage", href: "/demarrage", icon: Rocket },
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
  { label: "Calculateur", href: "/calculateur", icon: Calculator },
  { label: "Securite", href: "/securite", icon: ShieldAlert },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">
              Manuel d{"'"}Atelier
            </span>
            <span className="ml-2 hidden text-xs font-medium text-muted-foreground sm:inline">
              Usinage & Rectification
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" role="navigation" aria-label="Navigation principale">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                    item.children.some((c) => pathname === c.href)
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground"
                  }`}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-lg border border-border bg-popover p-1 shadow-xl shadow-black/30">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary ${
                          pathname === child.href
                            ? "text-primary"
                            : "text-popover-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                  pathname === item.href
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background p-4 lg:hidden" role="navigation" aria-label="Navigation mobile">
          <div className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-6 flex flex-col gap-0.5 py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary ${
                            pathname === child.href
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary ${
                    pathname === item.href
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
