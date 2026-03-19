// RDM page - version 4.0 - no icon props on InfoCard
import type { Metadata } from "next"

import { BannerImage } from "@/components/banner-image"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"

import {
  Gauge,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react"

import Link from "next/link"

export const metadata: Metadata = {
  title: "Résistance des Matériaux (RDM) - Manuel d'Atelier",
  description:
    "Guide complet de résistance des matériaux : traction, compression, flexion, torsion, cisaillement. Du simple au complexe.",
}

const sommaire = [
  { id: "introduction", label: "Introduction à la RDM" },
  { id: "traction-compression", label: "Traction et Compression" },
  { id: "flexion", label: "Flexion" },
  { id: "torsion", label: "Torsion" },
  { id: "cisaillement", label: "Cisaillement" },
  { id: "sollicitations-composees", label: "Sollicitations Composées" },
  { id: "coefficients-securite", label: "Coefficients de Sécurité" },
]

export default function RDMPage() {
  return (
    <>
      <BannerImage
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3526-UVAZdmrgJQWz7NJAdEg0jYf8L9AOrO.webp"
        alt="Simulation numérique de contraintes sur une pièce mécanique"
        overlay="gradient"
        height="md"
        priority
      >
        <div className="mx-auto max-w-7xl">
          <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
            Résistance des Matériaux
          </span>
          <h1 className="max-w-3xl text-balance text-3xl font-bold text-foreground md:text-5xl">
            Résistance des Matériaux (RDM)
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Des concepts fondamentaux aux calculs avancés : maîtrisez les contraintes et déformations.
          </p>
        </div>
      </BannerImage>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sommaire */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                Sommaire
              </h2>
              <nav className="flex flex-col gap-1">
                {sommaire.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="space-y-16">
            {/* Introduction */}
            <ContentSection title="Introduction à la RDM" id="introduction">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                La <strong className="text-foreground">Résistance des Matériaux</strong> (RDM) est la science qui permet 
                de dimensionner les pièces mécaniques pour qu{"'"}elles résistent aux efforts qu{"'"}elles subissent. 
                Elle repose sur quelques concepts fondamentaux.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <InfoCard
                  title="Contrainte (σ ou τ)"
                  items={[
                    "Force par unité de surface (MPa = N/mm²)",
                    "σ = F / S pour les contraintes normales",
                    "τ pour les contraintes tangentielles"
                  ]}
                />
                <InfoCard
                  title="Déformation (ε)"
                  items={[
                    "Allongement relatif (sans unité)",
                    "ε = ΔL / L₀",
                    "Liée à la contrainte par la loi de Hooke"
                  ]}
                />
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 mb-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Loi de Hooke (domaine élastique)
                </h4>
                <p className="text-2xl font-mono text-primary mb-2">σ = E × ε</p>
                <p className="text-sm text-muted-foreground">
                  Où <strong>E</strong> est le module d{"'"}Young (module d{"'"}élasticité) en MPa. 
                  Pour l{"'"}acier : E ≈ 210 000 MPa. Pour l{"'"}aluminium : E ≈ 70 000 MPa.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Matériau</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">E (MPa)</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Re (MPa)</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Rm (MPa)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Acier S235</td>
                      <td className="px-4 py-3 text-muted-foreground">210 000</td>
                      <td className="px-4 py-3 text-muted-foreground">235</td>
                      <td className="px-4 py-3 text-muted-foreground">360-510</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Acier C45</td>
                      <td className="px-4 py-3 text-muted-foreground">210 000</td>
                      <td className="px-4 py-3 text-muted-foreground">430</td>
                      <td className="px-4 py-3 text-muted-foreground">700</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Alu 6061-T6</td>
                      <td className="px-4 py-3 text-muted-foreground">70 000</td>
                      <td className="px-4 py-3 text-muted-foreground">275</td>
                      <td className="px-4 py-3 text-muted-foreground">310</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Laiton CuZn37</td>
                      <td className="px-4 py-3 text-muted-foreground">100 000</td>
                      <td className="px-4 py-3 text-muted-foreground">200</td>
                      <td className="px-4 py-3 text-muted-foreground">400</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Re = Limite élastique (yield strength) • Rm = Résistance à la traction (tensile strength)
              </p>
            </ContentSection>

            {/* Traction et Compression */}
            <ContentSection title="Traction et Compression" id="traction-compression">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                La <strong className="text-foreground">traction</strong> et la <strong className="text-foreground">compression</strong> 
                sont les sollicitations les plus simples : une force axiale appliquée sur une section.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5 text-primary" />
                    Formules de base
                  </h4>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="text-lg font-mono text-primary">σ = F / S</p>
                      <p className="text-xs text-muted-foreground mt-1">Contrainte normale (MPa)</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="text-lg font-mono text-primary">ΔL = (F × L) / (E × S)</p>
                      <p className="text-xs text-muted-foreground mt-1">Allongement (mm)</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="text-lg font-mono text-primary">ε = ΔL / L₀ = σ / E</p>
                      <p className="text-xs text-muted-foreground mt-1">Déformation relative</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4">Exemple de calcul</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Une tige en acier S235 de section 100 mm² supporte une charge de 15 000 N.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Contrainte :</strong> σ = 15 000 / 100 = <span className="text-primary font-semibold">150 MPa</span>
                    </p>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Vérification :</strong> σ = 150 MPa {"<"} Re = 235 MPa ✓
                    </p>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Coefficient :</strong> s = 235 / 150 = <span className="text-primary font-semibold">1,57</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Attention : Flambement en compression
                </h4>
                <p className="text-sm text-muted-foreground">
                  En compression, les pièces élancées risquent le <strong className="text-foreground">flambement</strong> (flambage) 
                  avant d{"'"}atteindre leur limite élastique. Utilisez la formule d{"'"}Euler pour vérifier la charge critique.
                </p>
              </div>
            </ContentSection>

            {/* Flexion */}
            <ContentSection title="Flexion" id="flexion">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                La <strong className="text-foreground">flexion</strong> apparaît lorsqu{"'"}une poutre est soumise à des forces 
                perpendiculaires à son axe. C{"'"}est l{"'"}une des sollicitations les plus fréquentes en mécanique.
              </p>

              <div className="grid gap-4 sm:grid-cols-3 mb-8">
                <InfoCard
                  title="Moment fléchissant Mf"
                  items={[
                    "Produit de la force par le bras de levier",
                    "Unité : N·mm ou N·m",
                    "Varie le long de la poutre"
                  ]}
                />
                <InfoCard
                  title="Contrainte de flexion"
                  items={[
                    "σ = Mf × y / I",
                    "Maximale sur les fibres extrêmes",
                    "Nulle sur la fibre neutre"
                  ]}
                />
                <InfoCard
                  title="Flèche f"
                  items={[
                    "Déformation transversale",
                    "Dépend de E, I et du chargement",
                    "Critère de rigidité important"
                  ]}
                />
              </div>

              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-4">Formules essentielles</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="text-lg font-mono text-primary">σ_max = Mf_max / W</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Où W = I/y_max est le module de résistance (mm³)
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="text-lg font-mono text-primary">f = (F × L³) / (48 × E × I)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Flèche poutre bi-appuyée, charge centrée
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Section</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Moment d{"'"}inertie I</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Module W</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Rectangle b×h</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">b×h³/12</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">b×h²/6</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Cercle plein Ø D</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">π×D⁴/64</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">π×D³/32</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Tube Ø D / d</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">π×(D⁴-d⁴)/64</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">π×(D⁴-d⁴)/(32×D)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ContentSection>

            {/* Torsion */}
            <ContentSection title="Torsion" id="torsion">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                La <strong className="text-foreground">torsion</strong> survient lorsqu{"'"}un couple (moment de torsion) est appliqué 
                autour de l{"'"}axe longitudinal d{"'"}une pièce, typiquement un arbre de transmission.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    Formules de torsion
                  </h4>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="text-lg font-mono text-primary">τ_max = Mt × r / Io</p>
                      <p className="text-xs text-muted-foreground mt-1">Contrainte tangentielle maximale</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="text-lg font-mono text-primary">θ = (Mt × L) / (G × Io)</p>
                      <p className="text-xs text-muted-foreground mt-1">Angle de rotation (rad)</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>G</strong> = module de Coulomb ≈ E / 2,6 pour l{"'"}acier (~80 000 MPa)
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4">Moment polaire Io</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <span className="text-sm text-muted-foreground">Arbre plein Ø D</span>
                      <span className="font-mono text-primary">π×D⁴/32</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <span className="text-sm text-muted-foreground">Arbre creux D/d</span>
                      <span className="font-mono text-primary">π×(D⁴-d⁴)/32</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Un arbre creux est plus efficace qu{"'"}un arbre plein à masse égale : 
                    le matériau est mieux réparti loin de l{"'"}axe neutre.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <h4 className="font-semibold text-foreground mb-3">Application : Dimensionnement d{"'"}un arbre</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Un moteur de 5 kW à 1500 tr/min entraîne un arbre. Calculer le diamètre minimum 
                  si τ_adm = 50 MPa.
                </p>
                <div className="grid gap-2 text-sm">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Couple :</strong> Mt = P×60 / (2π×N) = 5000×60 / (2π×1500) = <span className="text-primary">31,8 N·m</span>
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Diamètre :</strong> D = ∛(16×Mt / π×τ) = ∛(16×31800 / π×50) = <span className="text-primary">≈ 14,7 mm → 15 mm</span>
                  </p>
                </div>
              </div>
            </ContentSection>

            {/* Cisaillement */}
            <ContentSection title="Cisaillement" id="cisaillement">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Le <strong className="text-foreground">cisaillement</strong> apparaît lorsque deux forces parallèles et opposées 
                tendent à faire glisser une section par rapport à l{"'"}autre. Typique des assemblages rivetés et boulonnés.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <InfoCard
                  title="Cisaillement simple"
                  items={[
                    "τ = F / S",
                    "Une seule section cisaillée",
                    "Ex: rivet en simple recouvrement"
                  ]}
                />
                <InfoCard
                  title="Cisaillement double"
                  items={[
                    "τ = F / (2 × S)",
                    "Deux sections cisaillées",
                    "Ex: axe de chape, boulon en double recouvrement"
                  ]}
                />
              </div>

              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-4">Pression de matage</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  En plus du cisaillement, il faut vérifier la pression exercée sur les parois du trou (matage).
                </p>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-lg font-mono text-primary">p = F / (d × e)</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Où d = diamètre du rivet/boulon et e = épaisseur de la tôle
                  </p>
                </div>
              </div>
            </ContentSection>

            {/* Sollicitations composées */}
            <ContentSection title="Sollicitations Composées" id="sollicitations-composees">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                En réalité, les pièces subissent souvent plusieurs sollicitations simultanées. 
                Il faut alors calculer une <strong className="text-foreground">contrainte équivalente</strong>.
              </p>

              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-4">Critère de Von Mises</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Le critère le plus utilisé pour les matériaux ductiles (aciers, aluminiums).
                </p>
                <div className="rounded-lg bg-secondary/50 p-4 mb-4">
                  <p className="text-lg font-mono text-primary">σ_eq = √(σ² + 3×τ²)</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pour flexion + torsion combinées
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  La pièce est correctement dimensionnée si : <strong className="text-foreground">σ_eq {"<"} Re / s</strong>
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-semibold text-foreground mb-2">Flexion + Traction</h4>
                  <p className="text-lg font-mono text-primary mb-2">σ = σ_trac + σ_flex</p>
                  <p className="text-xs text-muted-foreground">Les contraintes normales s{"'"}additionnent directement</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-semibold text-foreground mb-2">Flexion + Torsion</h4>
                  <p className="text-lg font-mono text-primary mb-2">σ_eq = √(σ² + 3×τ²)</p>
                  <p className="text-xs text-muted-foreground">Cas typique d{"'"}un arbre de transmission</p>
                </div>
              </div>
            </ContentSection>

            {/* Coefficients de sécurité */}
            <ContentSection title="Coefficients de Sécurité" id="coefficients-securite">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Le <strong className="text-foreground">coefficient de sécurité</strong> (s) protège contre les incertitudes 
                sur les charges, les matériaux et les conditions d{"'"}utilisation.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Application</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Coefficient s</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Remarques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Charges statiques, matériau homogène</td>
                      <td className="px-4 py-3 text-primary font-semibold">1,5 à 2</td>
                      <td className="px-4 py-3 text-muted-foreground">Conditions bien maîtrisées</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Charges dynamiques modérées</td>
                      <td className="px-4 py-3 text-primary font-semibold">2 à 3</td>
                      <td className="px-4 py-3 text-muted-foreground">Machines-outils, équipements industriels</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Charges de choc, conditions sévères</td>
                      <td className="px-4 py-3 text-primary font-semibold">3 à 5</td>
                      <td className="px-4 py-3 text-muted-foreground">Levage, engins de chantier</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-muted-foreground">Sécurité des personnes</td>
                      <td className="px-4 py-3 text-primary font-semibold">5 à 10</td>
                      <td className="px-4 py-3 text-muted-foreground">Ascenseurs, manèges, équipements de sport</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Fatigue : un danger invisible
                </h4>
                <p className="text-sm text-muted-foreground">
                  Sous charges cycliques, une pièce peut casser bien en dessous de Re. 
                  La <strong className="text-foreground">limite d{"'"}endurance</strong> est souvent 40-50% de Rm pour l{"'"}acier. 
                  Utilisez les courbes S-N (Wöhler) et un coefficient de sécurité adapté.
                </p>
              </div>
            </ContentSection>

            {/* CTA */}
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <Gauge className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                Prêt à dimensionner vos pièces ?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Utilisez le calculateur pour vérifier rapidement vos contraintes.
              </p>
              <Link
                href="/calculateur"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Accéder au Calculateur
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
