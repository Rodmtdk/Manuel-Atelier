"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Home,
  FileText,
  PenToolIcon as Tool,
  Settings,
  Database,
  Calculator,
  BookOpen,
  Shield,
  Wrench,
  Cpu,
  Box,
  Layers,
  FileCode,
  BarChart2,
  Play,
  HelpCircle,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
  submenu?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Accueil",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Fraisage & Tournage",
    href: "/machining",
    icon: <Tool className="h-5 w-5" />,
    badge: "Essentiel",
    submenu: [
      {
        title: "Fraisage conventionnel",
        href: "/machining/conventional-milling",
        icon: <FileText className="h-4 w-4" />,
      },
      { title: "Fraisage CNC", href: "/machining/cnc-milling", icon: <FileText className="h-4 w-4" /> },
      {
        title: "Tournage conventionnel",
        href: "/machining/conventional-turning",
        icon: <FileText className="h-4 w-4" />,
      },
      { title: "Tournage CNC", href: "/machining/cnc-turning", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: "Machines-outils",
    href: "/machines",
    icon: <Wrench className="h-5 w-5" />,
    submenu: [
      { title: "Conventionnelles", href: "/machines/conventional", icon: <FileText className="h-4 w-4" /> },
      { title: "3 axes", href: "/machines/3-axis", icon: <FileText className="h-4 w-4" /> },
      { title: "5 axes", href: "/machines/5-axis", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: "Commandes numériques",
    href: "/cnc",
    icon: <Cpu className="h-5 w-5" />,
    submenu: [
      { title: "Siemens", href: "/cnc/siemens", icon: <FileText className="h-4 w-4" /> },
      { title: "Fanuc", href: "/cnc/fanuc", icon: <FileText className="h-4 w-4" /> },
      { title: "NUM", href: "/cnc/num", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: "Post-processeurs FAO",
    href: "/post-processors",
    icon: <FileCode className="h-5 w-5" />,
  },
  {
    title: "Outils coupants",
    href: "/cutting-tools",
    icon: <Tool className="h-5 w-5" />,
    badge: "Nouveau",
  },
  {
    title: "Fixations",
    href: "/fixations",
    icon: <Box className="h-5 w-5" />,
  },
  {
    title: "Matières usinables",
    href: "/materials",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: "Nomenclatures",
    href: "/nomenclature",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Sécurité",
    href: "/safety",
    icon: <Shield className="h-5 w-5" />,
    badge: "Important",
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: "Simulation",
    href: "/simulation",
    icon: <Play className="h-5 w-5" />,
  },
  {
    title: "Offsets & Palpeurs",
    href: "/offsets",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Scripts & Macros",
    href: "/scripts",
    icon: <FileCode className="h-5 w-5" />,
  },
  {
    title: "Calculateur",
    href: "/calculator",
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    title: "Guides FAO",
    href: "/cam-guides",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Optimisation",
    href: "/optimization",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    title: "Base de données",
    href: "/database",
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "Aide",
    href: "/help",
    icon: <HelpCircle className="h-5 w-5" />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const NavItems = () => (
    <>
      <div className="flex items-center justify-center py-4">
        <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          AtelierConnect
        </h2>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <div key={item.title} className="space-y-1">
              {item.submenu ? (
                <>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", pathname === item.href && "bg-accent")}
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                  {expandedItems[item.title] && (
                    <div className="pl-6 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Button
                          key={subitem.title}
                          variant="ghost"
                          size="sm"
                          className={cn("w-full justify-start", pathname === subitem.href && "bg-accent")}
                          asChild
                        >
                          <Link href={subitem.href}>
                            {subitem.icon}
                            <span className="ml-2">{subitem.title}</span>
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", pathname === item.href && "bg-accent")}
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )

  return (
    <>
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r">
        <div className="flex flex-col h-full">
          <NavItems />
        </div>
      </aside>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close Menu</span>
            </Button>
            <div className="flex flex-col h-full pt-12">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
