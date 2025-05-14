"use client"

import { useState } from "react"
import { FileText, Folder, ChevronRight, Download, Eye, Search, SortAsc, SortDesc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock folder structure
const folderStructure = [
  {
    id: "1",
    name: "Fraisage",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "Conventionnel",
        type: "folder",
        children: [
          {
            id: "1-1-1",
            name: "Guide d'utilisation fraiseuse manuelle.pdf",
            type: "file",
            size: "2.4 MB",
            date: "2023-05-12",
          },
          { id: "1-1-2", name: "Paramètres de coupe acier.xlsx", type: "file", size: "1.1 MB", date: "2023-06-18" },
        ],
      },
      {
        id: "1-2",
        name: "CNC",
        type: "folder",
        children: [
          { id: "1-2-1", name: "Programmation ISO.pdf", type: "file", size: "3.7 MB", date: "2023-04-22" },
          { id: "1-2-2", name: "Stratégies d'usinage.pdf", type: "file", size: "5.2 MB", date: "2023-07-05" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Tournage",
    type: "folder",
    children: [
      { id: "2-1", name: "Filetage extérieur.pdf", type: "file", size: "1.8 MB", date: "2023-03-15" },
      { id: "2-2", name: "Outils de tournage.pdf", type: "file", size: "4.3 MB", date: "2023-05-27" },
    ],
  },
  {
    id: "3",
    name: "Commandes numériques",
    type: "folder",
    children: [
      {
        id: "3-1",
        name: "Siemens",
        type: "folder",
        children: [
          { id: "3-1-1", name: "Manuel 840D.pdf", type: "file", size: "12.6 MB", date: "2023-02-10" },
          { id: "3-1-2", name: "Cycles fixes.pdf", type: "file", size: "3.2 MB", date: "2023-04-18" },
        ],
      },
      {
        id: "3-2",
        name: "Fanuc",
        type: "folder",
        children: [
          { id: "3-2-1", name: "Manuel 0i-TF.pdf", type: "file", size: "9.8 MB", date: "2023-01-22" },
          { id: "3-2-2", name: "Macros personnalisées.pdf", type: "file", size: "2.7 MB", date: "2023-03-30" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Matières",
    type: "folder",
    children: [
      { id: "4-1", name: "Aluminium 7075.pdf", type: "file", size: "1.5 MB", date: "2023-06-05" },
      { id: "4-2", name: "Acier C45.pdf", type: "file", size: "1.3 MB", date: "2023-05-12" },
      { id: "4-3", name: "Titane Grade 5.pdf", type: "file", size: "2.1 MB", date: "2023-07-18" },
    ],
  },
  {
    id: "5",
    name: "Sécurité",
    type: "folder",
    children: [
      { id: "5-1", name: "Protocoles de sécurité.pdf", type: "file", size: "3.4 MB", date: "2023-01-15" },
      { id: "5-2", name: "Fiches EPI.pdf", type: "file", size: "2.2 MB", date: "2023-02-28" },
    ],
  },
]

// Flatten folder structure for search
const flattenStructure = (structure, path = "") => {
  let result = []

  structure.forEach((item) => {
    const newPath = path ? `${path} > ${item.name}` : item.name

    if (item.type === "file") {
      result.push({
        ...item,
        path: newPath,
      })
    } else if (item.children) {
      result = [...result, ...flattenStructure(item.children, newPath)]
    }
  })

  return result
}

const allFiles = flattenStructure(folderStructure)

export function DocumentExplorer() {
  const [currentFolder, setCurrentFolder] = useState(folderStructure)
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: "Racine", items: folderStructure }])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [viewMode, setViewMode] = useState("list")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const navigateToFolder = (folder) => {
    if (isSearching) return

    setCurrentFolder(folder.children)
    setBreadcrumbs([...breadcrumbs, { name: folder.name, items: folder.children }])
  }

  const navigateToBreadcrumb = (index) => {
    if (isSearching) return

    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].items)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = allFiles.filter(
      (file) => file.name.toLowerCase().includes(query) || file.path.toLowerCase().includes(query),
    )

    setSearchResults(results)
    setIsSearching(true)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      // Always sort folders before files
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1
      }

      // Then sort by the selected field
      let aValue = a[sortField]
      let bValue = b[sortField]

      // Handle date sorting
      if (sortField === "date") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      // Handle string sorting
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      // Apply sort direction
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  const displayedItems = isSearching ? searchResults : sortItems(currentFolder)

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>

        <Button onClick={handleSearch} variant="secondary">
          Rechercher
        </Button>

        {isSearching && (
          <Button onClick={clearSearch} variant="outline">
            Effacer
          </Button>
        )}

        <Select value={sortField} onValueChange={setSortField}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="size">Taille</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={toggleSortDirection} variant="outline" size="icon">
          {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        </Button>
      </div>

      {!isSearching && (
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}
              <Button variant="link" className="p-0 h-auto" onClick={() => navigateToBreadcrumb(index)}>
                {crumb.name}
              </Button>
            </div>
          ))}
        </div>
      )}

      {isSearching && searchResults.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucun résultat trouvé pour &quot;{searchQuery}&quot;</p>
        </div>
      )}

      {displayedItems.length > 0 && (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {item.type === "folder" ? (
                        <Folder className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-500" />
                      )}
                      <span
                        className={item.type === "folder" ? "cursor-pointer hover:underline" : ""}
                        onClick={() => item.type === "folder" && navigateToFolder(item)}
                      >
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.type === "folder" ? (
                      <Badge variant="outline">Dossier</Badge>
                    ) : (
                      <Badge variant="outline">{item.name.split(".").pop().toUpperCase()}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{item.size || "-"}</TableCell>
                  <TableCell>{item.date || "-"}</TableCell>
                  <TableCell className="text-right">
                    {item.type === "file" && (
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
