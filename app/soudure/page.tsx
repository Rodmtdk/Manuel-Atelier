// Soudure page - updated
import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/table-of-contents"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import {
  Flame,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Soudure - Manuel d'Atelier",
  description:
    "Guide complet du soudage : MIG, MAG, TIG, MMA. Positions de soudure, défauts, contrôles et qualifications.",
}

const tocItems = [
  { id: "introduction", label: "Introduction au Soudage" },
  { id: "mma", label: "Soudage MMA (Électrode Enrobée)" },
  { id: "mig-mag", label: "Soudage MIG/MAG" },
  { id: "tig", label: "Soudage TIG" },
  { id: "positions", label: "Positions de Soudure" },
  { id: "defauts", label: "Défauts de Soudure" },
  { id: "controles", label: "Contrôles et Qualifications" },
  { id: "securite", label: "Sécurité en Soudage" },
]

export default function SoudurePage() {
  return (
    <>
      <PageHeader
        badge="Soudure"
        title="Techniques de Soudage"
        subtitle="Du soudage à l'arc aux procédés avancés : maîtrisez les techniques d'assemblage par fusion. MIG, MAG, TIG, MMA."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13986-IMG_0007-zxPSp6oWVueTLylc3V677N01bWrwEz.jpg"
      />

      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Introduction */}
        <ContentSection title="Introduction au Soudage" id="introduction">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Le <strong className="text-foreground">soudage</strong> est un procédé d{"'"}assemblage permanent qui consiste 
                à créer une continuité métallique entre deux pièces par fusion locale. Plusieurs procédés existent, 
                chacun adapté à des matériaux et applications spécifiques.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <InfoCard
                  title="MMA (111)"
                  items={[
                    "Électrode enrobée",
                    "Polyvalent, extérieur",
                    "Acier, inox, fonte"
                  ]}
                />
                <InfoCard
                  title="MIG/MAG (131/135)"
                  items={[
                    "Fil continu + gaz",
                    "Productivité élevée",
                    "Acier, alu, inox"
                  ]}
                />
                <InfoCard
                  title="TIG (141)"
                  items={[
                    "Tungstène + argon",
                    "Haute qualité",
                    "Tous métaux, fines épaisseurs"
                  ]}
                />
                <InfoCard
                  title="SAW (121)"
                  items={[
                    "Arc submergé",
                    "Forte pénétration",
                    "Grandes séries, fortes épaisseurs"
                  ]}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Procédé</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Norme ISO</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Avantages</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Limites</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">MMA</td>
                      <td className="px-4 py-3 text-muted-foreground">111</td>
                      <td className="px-4 py-3 text-muted-foreground">Polyvalent, extérieur, pas de gaz</td>
                      <td className="px-4 py-3 text-muted-foreground">Laitier, changement électrode</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">MIG</td>
                      <td className="px-4 py-3 text-muted-foreground">131</td>
                      <td className="px-4 py-3 text-muted-foreground">Rapide, aluminium, inox</td>
                      <td className="px-4 py-3 text-muted-foreground">Coût gaz (argon pur)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">MAG</td>
                      <td className="px-4 py-3 text-muted-foreground">135</td>
                      <td className="px-4 py-3 text-muted-foreground">Productif, économique (acier)</td>
                      <td className="px-4 py-3 text-muted-foreground">Projections, pas pour alu</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">TIG</td>
                      <td className="px-4 py-3 text-muted-foreground">141</td>
                      <td className="px-4 py-3 text-muted-foreground">Qualité optimale, précision</td>
                      <td className="px-4 py-3 text-muted-foreground">Lent, main qualifiée</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ContentSection>

            {/* MMA */}
            <ContentSection title="Soudage MMA (Électrode Enrobée)" id="mma">
              <ImageShowcase
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MMA_SchemaDeTransfertduMetal-eRV7jRXCffAtvqp4Bm781AVh7MLEQL.jpg"
                alt="Schéma de transfert du métal en soudage MMA"
                caption="Schéma de transfert du métal en soudage à l'électrode enrobée (MMA)"
                aspectRatio="wide"
              />

              <p className="mt-6 mb-6 text-muted-foreground leading-relaxed">
                Le <strong className="text-foreground">soudage MMA</strong> (Manual Metal Arc) ou SMAW utilise une électrode 
                enrobée qui fond pour créer le bain de fusion. L{"'"}enrobage génère un gaz protecteur et un laitier.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4">Types d{"'"}enrobage</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Rutile (R)</p>
                      <p className="text-xs text-muted-foreground">Facile à amorcer, bel aspect, toutes positions</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Basique (B)</p>
                      <p className="text-xs text-muted-foreground">Haute qualité mécanique, séchage nécessaire</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Cellulosique (C)</p>
                      <p className="text-xs text-muted-foreground">Forte pénétration, pipelines, descendante</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4">Réglage de l{"'"}intensité</h4>
                  <div className="rounded-lg bg-primary/10 border border-primary/30 p-4 mb-4">
                    <p className="text-lg font-mono text-primary">I ≈ 40 × Ø électrode</p>
                    <p className="text-xs text-muted-foreground mt-1">Règle empirique de base (ampères)</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">Ø 2,5 mm → 80-100 A</p>
                    <p className="text-muted-foreground">Ø 3,2 mm → 100-140 A</p>
                    <p className="text-muted-foreground">Ø 4,0 mm → 140-180 A</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Stockage des électrodes basiques
                </h4>
                <p className="text-sm text-muted-foreground">
                  Les électrodes basiques sont <strong className="text-foreground">hygroscopiques</strong>. 
                  Stockez-les dans une étuve à 70-150°C. Une électrode humide provoque des porosités et 
                  un risque de fissuration à froid par hydrogène.
                </p>
              </div>
            </ContentSection>

            {/* MIG/MAG */}
            <ContentSection title="Soudage MIG/MAG" id="mig-mag">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Le <strong className="text-foreground">soudage MIG/MAG</strong> (GMAW) utilise un fil-électrode continu 
                et un gaz de protection. MIG = gaz inerte (argon), MAG = gaz actif (CO₂ ou mélange Ar/CO₂).
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <InfoCard
                  title="MIG (131)"
                  items={[
                    "Gaz : Argon pur ou Ar/He",
                    "Matériaux : Aluminium, inox",
                    "Aspect propre, peu de projections"
                  ]}
                />
                <InfoCard
                  title="MAG (135)"
                  items={[
                    "Gaz : CO₂ ou Ar/CO₂ (82/18)",
                    "Matériaux : Aciers carbone",
                    "Économique, forte pénétration"
                  ]}
                />
              </div>

              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-4">Modes de transfert</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="font-medium text-foreground">Court-circuit</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Faible intensité, fines épaisseurs, toutes positions
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="font-medium text-foreground">Globulaire</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Zone intermédiaire instable, à éviter
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="font-medium text-foreground">Spray (pulvérisé)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Forte intensité, à plat, haute productivité
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Paramètre</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Effet si trop faible</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Effet si trop élevé</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Intensité</td>
                      <td className="px-4 py-3 text-muted-foreground">Manque de fusion, collage</td>
                      <td className="px-4 py-3 text-muted-foreground">Brûlure, projections</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Tension</td>
                      <td className="px-4 py-3 text-muted-foreground">Arc instable, cordon étroit</td>
                      <td className="px-4 py-3 text-muted-foreground">Arc long, porosités</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Vitesse fil</td>
                      <td className="px-4 py-3 text-muted-foreground">Manque d{"'"}apport</td>
                      <td className="px-4 py-3 text-muted-foreground">Bourrage, arc instable</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Débit gaz</td>
                      <td className="px-4 py-3 text-muted-foreground">Porosités, oxydation</td>
                      <td className="px-4 py-3 text-muted-foreground">Turbulences, gaspillage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ContentSection>

            {/* TIG */}
            <ContentSection title="Soudage TIG" id="tig">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Le <strong className="text-foreground">soudage TIG</strong> (GTAW) utilise une électrode de tungstène 
                non fusible et un gaz inerte (argon). Le métal d{"'"}apport est ajouté manuellement si nécessaire. 
                C{"'"}est le procédé de référence pour la qualité.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4">Choix du courant</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">DC- (polarité directe)</p>
                      <p className="text-xs text-muted-foreground">Acier, inox, titane — pénétration maximale</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">AC (alternatif)</p>
                      <p className="text-xs text-muted-foreground">Aluminium, magnésium — décapage de l{"'"}oxyde</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4">Électrodes tungstène</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">WP (verte)</span>
                      <span className="text-foreground">Pur — AC aluminium</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">WT20 (rouge)</span>
                      <span className="text-foreground">Thorié 2% — DC acier/inox</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">WC20 (grise)</span>
                      <span className="text-foreground">Cérié — DC/AC polyvalent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">WL15 (or)</span>
                      <span className="text-foreground">Lanthané — DC/AC (non radioactif)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Secrets d{"'"}un beau cordon TIG
                </h4>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Propreté absolue (dégraissage acétone)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Affûtage correct de l{"'"}électrode
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Distance torche-pièce constante (2-3 mm)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Angle torche 75-80° par rapport à la pièce
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Post-gaz suffisant (refroidissement)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Vitesse régulière et contrôlée
                  </li>
                </ul>
              </div>
            </ContentSection>

            {/* Positions */}
            <ContentSection title="Positions de Soudure" id="positions">
              <ImageShowcase
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20265-welding_position_6947-N5cTeR8ClTTW95NSES3RsU8eE4IqbI.jpg"
                alt="Positions de soudure selon ISO 6947:2011"
                caption="Positions de soudure normalisées selon BS EN ISO 6947:2011"
                aspectRatio="wide"
              />

              <p className="mt-6 mb-6 text-muted-foreground leading-relaxed">
                La <strong className="text-foreground">position de soudage</strong> influence fortement la difficulté 
                et les paramètres. La norme ISO 6947 définit les positions standard.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Code</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Position</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Description</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Difficulté</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">PA</td>
                      <td className="px-4 py-3 text-foreground">À plat</td>
                      <td className="px-4 py-3 text-muted-foreground">Soudure horizontale, pièce à plat</td>
                      <td className="px-4 py-3 text-green-500">Facile</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">PB</td>
                      <td className="px-4 py-3 text-foreground">En angle à plat</td>
                      <td className="px-4 py-3 text-muted-foreground">Cordon d{"'"}angle horizontal</td>
                      <td className="px-4 py-3 text-green-500">Facile</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">PC</td>
                      <td className="px-4 py-3 text-foreground">Horizontale</td>
                      <td className="px-4 py-3 text-muted-foreground">Soudure horizontale sur plan vertical</td>
                      <td className="px-4 py-3 text-amber-500">Moyenne</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">PD</td>
                      <td className="px-4 py-3 text-foreground">En angle au plafond</td>
                      <td className="px-4 py-3 text-muted-foreground">Cordon d{"'"}angle au plafond</td>
                      <td className="px-4 py-3 text-red-500">Difficile</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">PE</td>
                      <td className="px-4 py-3 text-foreground">Au plafond</td>
                      <td className="px-4 py-3 text-muted-foreground">Soudure bout à bout au plafond</td>
                      <td className="px-4 py-3 text-red-500">Difficile</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">PF</td>
                      <td className="px-4 py-3 text-foreground">Verticale montante</td>
                      <td className="px-4 py-3 text-muted-foreground">De bas en haut</td>
                      <td className="px-4 py-3 text-amber-500">Moyenne</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">PG</td>
                      <td className="px-4 py-3 text-foreground">Verticale descendante</td>
                      <td className="px-4 py-3 text-muted-foreground">De haut en bas</td>
                      <td className="px-4 py-3 text-amber-500">Moyenne</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ContentSection>

            {/* Défauts */}
            <ContentSection title="Défauts de Soudure" id="defauts">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Identifier et prévenir les <strong className="text-foreground">défauts de soudure</strong> 
                est essentiel pour garantir la qualité des assemblages.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-semibold text-foreground mb-3">Défauts géométriques</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Caniveau</strong> — sillon le long du cordon
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Manque de pénétration</strong> — racine non fusionnée
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Excès de pénétration</strong> — effondrement racine
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Déformation</strong> — retrait thermique
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-semibold text-foreground mb-3">Défauts internes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Porosités</strong> — bulles de gaz piégées
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Inclusions</strong> — laitier ou tungstène piégé
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Fissures</strong> — à chaud ou à froid
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Manque de fusion</strong> — collage
                    </li>
                  </ul>
                </div>
              </div>
            </ContentSection>

            {/* Contrôles */}
            <ContentSection title="Contrôles et Qualifications" id="controles">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Les soudures critiques nécessitent des <strong className="text-foreground">contrôles</strong> 
                pour garantir leur intégrité, et les soudeurs doivent être <strong className="text-foreground">qualifiés</strong>.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <InfoCard
                  title="Contrôles Non Destructifs"
                  items={[
                    "Visuel (VT) — obligatoire, premier niveau",
                    "Ressuage (PT) — défauts débouchants",
                    "Magnétoscopie (MT) — défauts proches surface",
                    "Ultrasons (UT) — défauts internes",
                    "Radiographie (RT) — image des défauts"
                  ]}
                />
                <InfoCard
                  title="Qualifications"
                  items={[
                    "QMOS — Qualification Mode Opératoire",
                    "QS — Qualification Soudeur (ISO 9606)",
                    "Validité limitée (généralement 2 ans)",
                    "Renouvellement par test pratique"
                  ]}
                />
              </div>
            </ContentSection>

            {/* Sécurité */}
            <ContentSection title="Sécurité en Soudage" id="securite">
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 mb-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Risques majeurs
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Rayonnement UV/IR</strong> — "coup d{"'"}arc", brûlures
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Fumées</strong> — toxiques (inox, galva, peinture)
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Incendie</strong> — projections, chaleur
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <strong className="text-foreground">Électrocution</strong> �� surtout en milieu humide
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <InfoCard
                  title="Protection des yeux"
                  items={[
                    "Cagoule avec filtre adapté",
                    "Teinte 9-13 selon intensité",
                    "Cagoule auto-obscurcissante"
                  ]}
                />
                <InfoCard
                  title="Protection respiratoire"
                  items={[
                    "Ventilation/aspiration localisée",
                    "Masque FFP2/FFP3 si nécessaire",
                    "Éviter zones confinées"
                  ]}
                />
                <InfoCard
                  title="Protection corporelle"
                  items={[
                    "Veste cuir ou ignifugée",
                    "Gants cuir manchettes longues",
                    "Tablier, guêtres si position"
                  ]}
                />
              </div>
            </ContentSection>

        {/* CTA */}
        <div className="my-12 rounded-2xl border border-border bg-card p-8 text-center">
          <Flame className="mx-auto mb-4 h-10 w-10 text-accent" />
          <h3 className="text-xl font-bold text-foreground">
            Découvrez les matériaux et traitements thermiques
          </h3>
          <p className="mt-2 text-muted-foreground">
            Comprenez les propriétés des métaux pour mieux les souder.
          </p>
          <Link
            href="/materiaux"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Matériaux et Traitements
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
