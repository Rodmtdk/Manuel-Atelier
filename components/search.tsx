"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function Search() {
  const [open, setOpen] = useState(false)

  // Mock search results - in a real app, this would be fetched from an API
  const searchResults = [
    { category: "Fraisage", title: "Paramètres de coupe pour l'aluminium", href: "/machining/cnc-milling/aluminum" },
    { category: "Tournage", title: "Filetage extérieur sur tour CNC", href: "/machining/cnc-turning/threading" },
    {
      category: "Outils",
      title: "Fraises carbure pour acier inoxydable",
      href: "/cutting-tools/carbide-mills/stainless",
    },
    { category: "Matières", title: "Propriétés de l'aluminium 7075", href: "/materials/aluminum/7075" },
    { category: "Commandes", title: "Cycles fixes Siemens 840D", href: "/cnc/siemens/840d/cycles" },
  ]

  return (
    <>
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher dans le manuel d'atelier..."
          className="pl-10 pr-4"
          onClick={() => setOpen(true)}
          onFocus={() => setOpen(true)}
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher dans le manuel d'atelier..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Résultats">
            {searchResults.map((result) => (
              <CommandItem
                key={result.href}
                value={result.title}
                onSelect={() => {
                  setOpen(false)
                  // In a real app, this would navigate to the result
                  console.log(`Navigating to ${result.href}`)
                }}
              >
                <span className="font-medium">{result.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{result.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
