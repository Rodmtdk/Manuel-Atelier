"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, X, Command } from "lucide-react"

interface SearchEntry {
  title: string
  description: string
  href: string
  category: string
  keywords: string[]
}

const searchIndex: SearchEntry[] = [
  // Accueil
  { title: "Accueil", description: "Page d'accueil du Manuel d'Atelier", href: "/", category: "Navigation", keywords: ["accueil", "home", "manuel", "atelier"] },
  { title: "Guide de démarrage", description: "Les bases de l'usinage : outils, matériaux, métrologie", href: "/demarrage", category: "Navigation", keywords: ["démarrage", "bases", "débutant", "introduction"] },

  // Fraisage
  { title: "Fraisage conventionnel", description: "Étaux, têtes de fraiseuse, outils, opposition/concordance, ébauche/finition", href: "/fraisage/conventionnel", category: "Fraisage", keywords: ["fraisage", "conventionnel", "étau", "tête", "opposition", "concordance", "ébauche", "finition", "dégauchissage"] },
  { title: "Fraisage CNC", description: "Programmation, codes G/M, 5 axes, usinage numérique", href: "/fraisage/cnc", category: "Fraisage", keywords: ["fraisage", "cnc", "numérique", "code g", "5 axes", "programmation", "fao"] },
  { title: "Étaux de fraisage", description: "Types d'étaux, dégauchissage au comparateur, bridage", href: "/fraisage/conventionnel#etaux-de-fraisage", category: "Fraisage", keywords: ["étau", "dégauchir", "comparateur", "bridage", "serrage"] },
  { title: "Opposition et concordance", description: "Fraisage en opposition vs en avalant (concordance)", href: "/fraisage/conventionnel#techniques-de-fraisage", category: "Fraisage", keywords: ["opposition", "concordance", "avalant", "sens", "coupe"] },
  { title: "Types de fraises", description: "1 taille, 2 tailles, 3 tailles, surfacer, forme", href: "/fraisage/conventionnel#types-de-fraises", category: "Fraisage", keywords: ["fraise", "1 taille", "2 tailles", "3 tailles", "surfacer", "forme", "rainure"] },

  // Tournage
  { title: "Tournage conventionnel", description: "Montages, mandrins, mors, outils, ébauche/finition, épaulement", href: "/tournage/conventionnel", category: "Tournage", keywords: ["tournage", "conventionnel", "mandrin", "mors", "épaulement", "cône", "filetage"] },
  { title: "Tournage CNC", description: "Tours numériques, tourelle, programmation ISO", href: "/tournage/cnc", category: "Tournage", keywords: ["tournage", "cnc", "numérique", "tourelle", "code g", "programmation"] },
  { title: "Types de montages", description: "En l'air, mixte, entre pointes, en pince, lunette", href: "/tournage/conventionnel#types-de-montages", category: "Tournage", keywords: ["montage", "en l'air", "mixte", "entre pointes", "pince", "lunette", "contre-pointe"] },
  { title: "Mandrins et mors", description: "2/3/4 mors, mors durs, mors doux, montage", href: "/tournage/conventionnel#mandrins-et-mors", category: "Tournage", keywords: ["mandrin", "mors", "durs", "doux", "serrage", "3 mors", "4 mors"] },
  { title: "Outils de tournage", description: "Charioter, dresser, aléser, fileter, tronçonner", href: "/tournage/conventionnel#classification-outils", category: "Tournage", keywords: ["outil", "charioter", "dresser", "aléser", "fileter", "tronçonner", "saigner", "moleter"] },
  { title: "Épaulement en tournage", description: "Réalisation d'un épaulement extérieur et intérieur", href: "/tournage/conventionnel#realiser-epaulement", category: "Tournage", keywords: ["épaulement", "chariotage", "dressage", "alésage"] },

  // Rectification
  { title: "Rectification", description: "Rectification plane, cylindrique et spiroconique, meules, dressage", href: "/rectification", category: "Rectification", keywords: ["rectification", "meule", "cylindrique", "plane", "dressage", "abrasif", "spiroconique"] },

  // CAO/FAO
  { title: "CAO/FAO", description: "Conception et Fabrication Assistées par Ordinateur, logiciels, parcours d'outils", href: "/cao-fao", category: "CAO/FAO", keywords: ["cao", "fao", "cam", "cad", "conception", "fabrication", "assistée", "ordinateur", "logiciel", "parcours", "3d"] },
  { title: "Logiciels CAO", description: "SolidWorks, Fusion 360, FreeCAD, AutoCAD pour la conception 3D", href: "/cao-fao#logiciels-cao", category: "CAO/FAO", keywords: ["solidworks", "fusion", "freecad", "autocad", "logiciel", "cao", "3d", "modélisation"] },
  { title: "Logiciels FAO", description: "Mastercam, Fusion 360, HSMWorks pour la génération de parcours d'outils", href: "/cao-fao#logiciels-fao", category: "CAO/FAO", keywords: ["mastercam", "fusion", "hsmworks", "fao", "parcours", "outil", "code g", "post-processeur"] },
  { title: "Formats de fichiers", description: "STEP, IGES, STL, DXF et autres formats d'échange CAO", href: "/cao-fao#formats", category: "CAO/FAO", keywords: ["step", "iges", "stl", "dxf", "dwg", "format", "fichier", "échange", "export", "import"] },

  // Calculateur
  { title: "Calculateur de vitesses", description: "Calculer Vc, n, Vf, Ra, débit de copeaux", href: "/calculateur", category: "Outils", keywords: ["calculateur", "vitesse", "coupe", "avance", "rpm", "vc", "vf", "ra"] },

  // Résistance des Matériaux
  { title: "Résistance des Matériaux", description: "RDM : contraintes, déformations, flexion, torsion, cisaillement", href: "/rdm", category: "RDM", keywords: ["rdm", "résistance", "matériaux", "contrainte", "déformation", "flexion", "torsion"] },
  { title: "Traction et Compression", description: "Contraintes normales, allongement, loi de Hooke", href: "/rdm#traction-compression", category: "RDM", keywords: ["traction", "compression", "hooke", "allongement", "module young", "contrainte normale"] },
  { title: "Flexion", description: "Moment fléchissant, flèche, contraintes de flexion", href: "/rdm#flexion", category: "RDM", keywords: ["flexion", "moment", "fléchissant", "flèche", "poutre", "appui"] },
  { title: "Torsion", description: "Moment de torsion, contraintes tangentielles, angle de rotation", href: "/rdm#torsion", category: "RDM", keywords: ["torsion", "moment", "tangentielle", "arbre", "cisaillement"] },
  { title: "Cisaillement", description: "Contraintes de cisaillement, assemblages rivetés et boulonnés", href: "/rdm#cisaillement", category: "RDM", keywords: ["cisaillement", "rivet", "boulon", "assemblage", "contrainte tangentielle"] },

  // Soudure
  { title: "Soudure", description: "Techniques de soudage MIG, MAG, TIG, MMA, positions de soudure", href: "/soudure", category: "Soudure", keywords: ["soudure", "soudage", "mig", "mag", "tig", "mma", "arc", "electrode"] },
  { title: "Soudage MIG/MAG", description: "Soudage semi-automatique sous gaz protecteur", href: "/soudure#mig-mag", category: "Soudure", keywords: ["mig", "mag", "semi-automatique", "gaz", "fil", "gmaw"] },
  { title: "Soudage TIG", description: "Soudage à l'arc avec électrode tungstène et gaz inerte", href: "/soudure#tig", category: "Soudure", keywords: ["tig", "tungstène", "argon", "gtaw", "inox", "aluminium"] },
  { title: "Soudage MMA", description: "Soudage à l'arc avec électrode enrobée", href: "/soudure#mma", category: "Soudure", keywords: ["mma", "smaw", "électrode", "enrobée", "baguette", "arc"] },
  { title: "Positions de soudure", description: "PA, PB, PC, PD, PE, PF, PG selon ISO 6947", href: "/soudure#positions", category: "Soudure", keywords: ["position", "pa", "pb", "pc", "pd", "pe", "pf", "pg", "iso", "6947"] },

  // Matériaux et Traitements Thermiques
  { title: "Matériaux et Traitements", description: "Aciers, aluminiums, traitements thermiques, désignations", href: "/materiaux", category: "Matériaux", keywords: ["matériaux", "acier", "aluminium", "traitement", "thermique", "trempe", "revenu"] },
  { title: "Désignation des aciers", description: "Normes EN, AISI, nuances courantes S235, C45, 42CrMo4", href: "/materiaux#designation-aciers", category: "Matériaux", keywords: ["acier", "désignation", "en", "aisi", "s235", "c45", "42crmo4", "norme"] },
  { title: "Traitements thermiques", description: "Trempe, revenu, recuit, cémentation, nitruration", href: "/materiaux#traitements-thermiques", category: "Matériaux", keywords: ["trempe", "revenu", "recuit", "cémentation", "nitruration", "traitement", "thermique", "dureté"] },
  { title: "Aluminium et alliages", description: "Séries 1000 à 7000, propriétés et applications", href: "/materiaux#aluminium", category: "Matériaux", keywords: ["aluminium", "alliage", "2024", "6061", "7075", "série", "léger"] },

  // Sécurité
  { title: "Sécurité en atelier", description: "EPI, précautions machines, risques, premiers secours", href: "/securite", category: "Sécurité", keywords: ["sécurité", "epi", "protection", "lunettes", "gants", "risque", "accident"] },

  // Techniques spécifiques
  { title: "Vitesse de coupe (Vc)", description: "Formule Vc = π × D × N / 1000", href: "/calculateur", category: "Formules", keywords: ["vitesse de coupe", "vc", "formule", "pi", "diamètre"] },
  { title: "Avance par tour (f)", description: "Paramètre clé pour la qualité de surface (Ra)", href: "/calculateur", category: "Formules", keywords: ["avance", "tour", "f", "ra", "rugosité", "surface"] },
  { title: "Matériaux d'outils", description: "HSS, carbure, céramique, PCD, CBN, revêtements", href: "/demarrage", category: "Matériaux", keywords: ["hss", "carbure", "céramique", "pcd", "cbn", "tialn", "tin", "revêtement", "matériau"] },
  { title: "Lubrification", description: "Rôle du lubrifiant : refroidir, lubrifier, évacuer les copeaux", href: "/fraisage/conventionnel#ebauche-finition", category: "Technique", keywords: ["lubrifiant", "arrosage", "huile", "coupe", "refroidissement"] },
]

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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

  const handleOpen = useCallback(() => {
    setOpen(true)
    setQuery("")
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setQuery("")
  }, [])

  const handleSelect = useCallback(
    (href: string) => {
      handleClose()
      router.push(href)
    },
    [handleClose, router]
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        handleClose()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [handleClose])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
        aria-label="Rechercher"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Rechercher...</span>
        <span className="sm:hidden">Recherche</span>
        <kbd className="ml-2 hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          <Command className="inline h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh] sm:pt-[15vh]">
          <div
            className="fixed inset-0 bg-background/90 backdrop-blur-md"
            onClick={handleClose}
          />
          <div className="relative w-full max-w-lg animate-fade-in rounded-2xl border border-border bg-card shadow-2xl shadow-black/50">
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une technique, un outil, un concept..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={handleClose}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {query.length < 2 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Tapez au moins 2 caractères pour rechercher
                </div>
              ) : results.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  {"Aucun résultat pour « "}{query}{" »"}
                </div>
              ) : (
                <ul role="listbox">
                  {results.map((entry, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleSelect(entry.href)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all hover:bg-secondary"
                        role="option"
                        aria-selected={false}
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">
                            {entry.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {entry.description}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {entry.category}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
