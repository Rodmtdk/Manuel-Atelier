"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Logo } from "@/components/logo"

const modules = [
  {
    title: "Upload & Analyse",
    href: "/upload",
    description: "Téléchargez et analysez vos fichiers 3D/2D avec notre IA",
  },
  {
    title: "Simulation d'usinage",
    href: "/simulation",
    description: "Générez et optimisez vos stratégies d'usinage",
  },
  {
    title: "Devis automatiques",
    href: "/devis",
    description: "Obtenez des devis précis en quelques secondes",
  },
  {
    title: "Génération de G-code",
    href: "/gcode",
    description: "Transformez vos modèles 3D en code CNC",
  },
  {
    title: "Gestion de séries",
    href: "/series",
    description: "Organisez et planifiez votre production",
  },
  {
    title: "Explorateur documentaire",
    href: "/documents",
    description: "Gérez tous vos documents techniques",
  },
]

const resources = [
  {
    title: "Documentation",
    href: "/docs",
    description: "Guides détaillés et tutoriels pour AtelierConnect Ultra",
  },
  {
    title: "API",
    href: "/api-docs",
    description: "Intégrez AtelierConnect Ultra à vos systèmes existants",
  },
  {
    title: "Communauté",
    href: "/community",
    description: "Rejoignez notre communauté d'utilisateurs et d'experts",
  },
  {
    title: "Formations",
    href: "/training",
    description: "Formations en ligne pour maîtriser la plateforme",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo className="h-8 w-8" />
        <span className="hidden font-bold sm:inline-block">AtelierConnect Ultra</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Modules</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {modules.map((module) => (
                  <ListItem
                    key={module.title}
                    title={module.title}
                    href={module.href}
                    isActive={pathname === module.href}
                  >
                    {module.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {resources.map((resource) => (
                  <ListItem
                    key={resource.title}
                    title={resource.title}
                    href={resource.href}
                    isActive={pathname === resource.href}
                  >
                    {resource.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/ai-assistant" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Assistant IA</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tableau de bord</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { isActive?: boolean }>(
  ({ className, title, children, isActive, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              isActive && "bg-accent text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
