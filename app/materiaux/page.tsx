import type { Metadata } from "next"
import { BannerImage } from "@/components/banner-image"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import {
  Thermometer,
  Flame,
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Droplets,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Matériaux et Traitements Thermiques - Manuel d'Atelier",
  description:
    "Guide complet des matériaux métalliques et traitements thermiques : aciers, aluminiums, trempe, revenu, cémentation, nitruration.",
}

const sommaire = [
  { id: "introduction", label: "Introduction aux Matériaux" },
  { id: "designation-aciers", label: "Désignation des Aciers" },
  { id: "familles-aciers", label: "Familles d'Aciers" },
  { id: "aluminium", label: "Aluminium et Alliages" },
  { id: "autres-metaux", label: "Autres Métaux" },
  { id: "traitements-thermiques", label: "Traitements Thermiques" },
  { id: "traitements-surface", label: "Traitements de Surface" },
  { id: "usinabilite", label: "Usinabilité" },
]

export default function MateriauxPage() {
  return (
    <>
      <BannerImage
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/echantillons-de-materiaux-industriels-metal-composite-bois-et-plastique-szerZ0oUB7GKbO8FlNcY8Hwe77A7iS.webp"
        alt="Échantillons de matériaux industriels : aluminium, acier, laiton, titane, carbone, bois, plastique"
        overlay="gradient"
        height="md"
        priority
      >
        <div className="mx-auto max-w-7xl">
          <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
            Science des Matériaux
          </span>
          <h1 className="max-w-3xl text-balance text-3xl font-bold text-foreground md:text-5xl">
            Matériaux et Traitements Thermiques
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Connaître les métaux et leurs traitements pour optimiser l{"'"}usinage et la conception.
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
            <ContentSection title="Introduction aux Matériaux" id="introduction">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Le choix du <strong className="text-foreground">matériau</strong> est déterminant pour la fonction 
                de la pièce, son usinabilité et son coût. Chaque famille de métaux possède des caractéristiques 
                spécifiques qu{"'"}il faut connaître.
              </p>

              <ImageShowcase
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%80%90%E7%81%AB%E5%A4%A7%E5%9B%BE-om5H8UhtWDHbpq2GnuQi8OSNOHrggV.webp"
                alt="Coulée d'acier en fusion dans une aciérie"
                caption="Coulée d'acier en fusion — la métallurgie est à l'origine de tous les matériaux métalliques"
                aspectRatio="wide"
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard
                  title="Résistance"
                  icon={Shield}
                  items={[
                    "Re — Limite élastique",
                    "Rm — Résistance traction",
                    "HRC/HB — Dureté"
                  ]}
                />
                <InfoCard
                  title="Rigidité"
                  icon={Shield}
                  items={[
                    "E — Module d'Young",
                    "G — Module de Coulomb",
                    "Déformation sous charge"
                  ]}
                />
                <InfoCard
                  title="Ductilité"
                  icon={Droplets}
                  items={[
                    "A% — Allongement rupture",
                    "Capacité déformation",
                    "Mise en forme"
                  ]}
                />
                <InfoCard
                  title="Dureté"
                  icon={Thermometer}
                  items={[
                    "HRC — Rockwell C",
                    "HB — Brinell",
                    "HV — Vickers"
                  ]}
                />
              </div>
            </ContentSection>

            {/* Désignation des aciers */}
            <ContentSection title="Désignation des Aciers" id="designation-aciers">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                La <strong className="text-foreground">désignation normalisée</strong> des aciers permet d{"'"}identifier 
                leur composition et leurs propriétés. Deux systèmes coexistent : européen (EN) et américain (AISI/SAE).
              </p>

              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-4">Système européen EN 10027</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="font-medium text-foreground mb-2">Aciers d{"'"}usage général</p>
                    <p className="text-lg font-mono text-primary">S235JR</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      S = Structural • 235 = Re mini (MPa) • JR = résilience
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="font-medium text-foreground mb-2">Aciers de construction</p>
                    <p className="text-lg font-mono text-primary">C45</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      C = Carbone • 45 = 0,45% de carbone
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="font-medium text-foreground mb-2">Aciers faiblement alliés</p>
                    <p className="text-lg font-mono text-primary">42CrMo4</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      0,42%C • 1%Cr • Mo présent • 4 = série
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <p className="font-medium text-foreground mb-2">Aciers fortement alliés</p>
                    <p className="text-lg font-mono text-primary">X5CrNi18-10</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      X = {">"} 5% allié • 0,05%C • 18%Cr • 10%Ni (inox 304)
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">EN</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">AISI/SAE</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">%C</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">S235JR</td>
                      <td className="px-4 py-3 text-muted-foreground">A36</td>
                      <td className="px-4 py-3 text-muted-foreground">0,17</td>
                      <td className="px-4 py-3 text-muted-foreground">Construction, charpente</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">C45</td>
                      <td className="px-4 py-3 text-muted-foreground">1045</td>
                      <td className="px-4 py-3 text-muted-foreground">0,45</td>
                      <td className="px-4 py-3 text-muted-foreground">Arbres, axes, engrenages</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">42CrMo4</td>
                      <td className="px-4 py-3 text-muted-foreground">4140</td>
                      <td className="px-4 py-3 text-muted-foreground">0,42</td>
                      <td className="px-4 py-3 text-muted-foreground">Vilebrequins, bielles, haute résistance</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">100Cr6</td>
                      <td className="px-4 py-3 text-muted-foreground">52100</td>
                      <td className="px-4 py-3 text-muted-foreground">1,00</td>
                      <td className="px-4 py-3 text-muted-foreground">Roulements, outillage</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">X5CrNi18-10</td>
                      <td className="px-4 py-3 text-muted-foreground">304</td>
                      <td className="px-4 py-3 text-muted-foreground">0,05</td>
                      <td className="px-4 py-3 text-muted-foreground">Inox alimentaire, chimie</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">X2CrNiMo17-12-2</td>
                      <td className="px-4 py-3 text-muted-foreground">316L</td>
                      <td className="px-4 py-3 text-muted-foreground">0,02</td>
                      <td className="px-4 py-3 text-muted-foreground">Inox marine, médical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ContentSection>

            {/* Familles d'aciers */}
            <ContentSection title="Familles d'Aciers" id="familles-aciers">
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Aciers au carbone
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Bas carbone ({"<"} 0,25%)</p>
                      <p className="text-xs text-muted-foreground">Soudables, formables • S235, S355</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Moyen carbone (0,25-0,6%)</p>
                      <p className="text-xs text-muted-foreground">Trempables • C35, C45, C60</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Haut carbone ({">"} 0,6%)</p>
                      <p className="text-xs text-muted-foreground">Très durs • ressorts, outils</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Aciers alliés
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Faiblement alliés</p>
                      <p className="text-xs text-muted-foreground">Cr, Mo, Ni {"<"} 5% • 42CrMo4, 34CrNiMo6</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Inoxydables austénitiques</p>
                      <p className="text-xs text-muted-foreground">18% Cr, 8-10% Ni • 304, 316</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="font-medium text-foreground">Inoxydables martensitiques</p>
                      <p className="text-xs text-muted-foreground">12-17% Cr, trempables • 420, 440</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Influence des éléments d{"'"}alliage
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Carbone (C)</strong> — ↑ dureté, ↓ soudabilité</p>
                  <p><strong className="text-foreground">Chrome (Cr)</strong> — résistance corrosion, dureté</p>
                  <p><strong className="text-foreground">Nickel (Ni)</strong> — ténacité, résistance au froid</p>
                  <p><strong className="text-foreground">Molybdène (Mo)</strong> — résistance à chaud, trempabilité</p>
                  <p><strong className="text-foreground">Vanadium (V)</strong> — affine le grain, outils</p>
                  <p><strong className="text-foreground">Manganèse (Mn)</strong> — désoxydant, résistance usure</p>
                </div>
              </div>
            </ContentSection>

            {/* Aluminium */}
            <ContentSection title="Aluminium et Alliages" id="aluminium">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                L{"'"}<strong className="text-foreground">aluminium</strong> est 3× plus léger que l{"'"}acier avec une 
                bonne résistance à la corrosion. Les alliages sont classés en séries selon l{"'"}élément d{"'"}addition principal.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Série</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Élément</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Caractéristiques</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Exemples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">1xxx</td>
                      <td className="px-4 py-3 text-muted-foreground">Alu pur (99%+)</td>
                      <td className="px-4 py-3 text-muted-foreground">Conductivité, formabilité</td>
                      <td className="px-4 py-3 text-muted-foreground">1050, 1100</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">2xxx</td>
                      <td className="px-4 py-3 text-muted-foreground">Cuivre (Cu)</td>
                      <td className="px-4 py-3 text-muted-foreground">Haute résistance, aéronautique</td>
                      <td className="px-4 py-3 text-muted-foreground">2024-T3, 2017</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">5xxx</td>
                      <td className="px-4 py-3 text-muted-foreground">Magnésium (Mg)</td>
                      <td className="px-4 py-3 text-muted-foreground">Corrosion marine, soudable</td>
                      <td className="px-4 py-3 text-muted-foreground">5083, 5052</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">6xxx</td>
                      <td className="px-4 py-3 text-muted-foreground">Mg + Si</td>
                      <td className="px-4 py-3 text-muted-foreground">Polyvalent, extrusion, soudable</td>
                      <td className="px-4 py-3 text-muted-foreground">6061-T6, 6082</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-primary">7xxx</td>
                      <td className="px-4 py-3 text-muted-foreground">Zinc (Zn)</td>
                      <td className="px-4 py-3 text-muted-foreground">Très haute résistance, aéro</td>
                      <td className="px-4 py-3 text-muted-foreground">7075-T6, 7050</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  États de traitement (temper)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Le suffixe après le numéro indique l{"'"}état métallurgique :
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">O</strong> — Recuit (mou)</p>
                  <p><strong className="text-foreground">H</strong> — Écroui (déformation à froid)</p>
                  <p><strong className="text-foreground">T3</strong> — Mis en solution + écroui + maturation</p>
                  <p><strong className="text-foreground">T6</strong> — Mis en solution + vieilli artificiel</p>
                </div>
              </div>
            </ContentSection>

            {/* Autres métaux */}
            <ContentSection title="Autres Métaux" id="autres-metaux">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoCard
                  title="Laiton (Cu-Zn)"
                  icon={Droplets}
                  items={[
                    "Excellent usinage (décolletage)",
                    "Bonne conductivité",
                    "CuZn39Pb3 (laiton de décolletage)"
                  ]}
                />
                <InfoCard
                  title="Bronze (Cu-Sn)"
                  icon={Shield}
                  items={[
                    "Résistance à l'usure",
                    "Frottement (coussinets)",
                    "CuSn12 (bronze d'étain)"
                  ]}
                />
                <InfoCard
                  title="Titane"
                  icon={Shield}
                  items={[
                    "Légèreté + résistance",
                    "Biocompatible, aéro/médical",
                    "TA6V (Ti-6Al-4V)"
                  ]}
                />
                <InfoCard
                  title="Fonte"
                  icon={Shield}
                  items={[
                    "Excellente usinabilité",
                    "Amortissement vibrations",
                    "GJL (lamellaire), GJS (sphéroïdal)"
                  ]}
                />
                <InfoCard
                  title="Cuivre pur"
                  icon={Droplets}
                  items={[
                    "Conductivité max",
                    "Électricité, thermique",
                    "Cu-ETP, Cu-OF"
                  ]}
                />
                <InfoCard
                  title="Inconel"
                  icon={Flame}
                  items={[
                    "Superalliage Ni-Cr",
                    "Haute température",
                    "Turbines, aéronautique"
                  ]}
                />
              </div>
            </ContentSection>

            {/* Traitements thermiques */}
            <ContentSection title="Traitements Thermiques" id="traitements-thermiques">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Les <strong className="text-foreground">traitements thermiques</strong> modifient la structure 
                cristalline des métaux pour ajuster leurs propriétés mécaniques sans changer leur composition.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Flame className="h-5 w-5 text-destructive" />
                    Trempe
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chauffage au-dessus de Ac3 puis refroidissement rapide (eau, huile, air). 
                    Transforme l{"'"}austénite en martensite (très dure mais fragile).
                  </p>
                  <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3">
                    <p className="text-sm font-medium text-foreground">Effet :</p>
                    <p className="text-sm text-muted-foreground">↑↑ Dureté (HRC 50-65) • ↓↓ Ductilité</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-amber-500" />
                    Revenu
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Réchauffage après trempe (150-650°C) puis refroidissement lent. 
                    Réduit les contraintes internes et ajuste dureté/ténacité.
                  </p>
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                    <p className="text-sm font-medium text-foreground">Effet :</p>
                    <p className="text-sm text-muted-foreground">↓ Dureté • ↑ Ténacité • ↓ Contraintes</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Recuit
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chauffage puis refroidissement très lent (dans le four). 
                    Adoucit le métal, homogénéise la structure, élimine l{"'"}écrouissage.
                  </p>
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3">
                    <p className="text-sm font-medium text-foreground">Effet :</p>
                    <p className="text-sm text-muted-foreground">↓↓ Dureté • ↑↑ Ductilité • ↑ Usinabilité</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Normalisation
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chauffage au-dessus de Ac3 puis refroidissement à l{"'"}air calme. 
                    Affine le grain, homogénéise après forgeage ou soudage.
                  </p>
                  <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3">
                    <p className="text-sm font-medium text-foreground">Effet :</p>
                    <p className="text-sm text-muted-foreground">Grain fin • Propriétés homogènes</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Traitement</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Température</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Refroidissement</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Objectif</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Trempe</td>
                      <td className="px-4 py-3 text-muted-foreground">800-900°C</td>
                      <td className="px-4 py-3 text-muted-foreground">Rapide (eau, huile)</td>
                      <td className="px-4 py-3 text-muted-foreground">Dureté maximale</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Revenu bas</td>
                      <td className="px-4 py-3 text-muted-foreground">150-250°C</td>
                      <td className="px-4 py-3 text-muted-foreground">Air</td>
                      <td className="px-4 py-3 text-muted-foreground">Détente, maintien dureté</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Revenu haut</td>
                      <td className="px-4 py-3 text-muted-foreground">500-650°C</td>
                      <td className="px-4 py-3 text-muted-foreground">Air</td>
                      <td className="px-4 py-3 text-muted-foreground">Ténacité, résilience</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium text-foreground">Recuit</td>
                      <td className="px-4 py-3 text-muted-foreground">700-900°C</td>
                      <td className="px-4 py-3 text-muted-foreground">Très lent (four)</td>
                      <td className="px-4 py-3 text-muted-foreground">Adoucissement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ContentSection>

            {/* Traitements de surface */}
            <ContentSection title="Traitements de Surface" id="traitements-surface">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Les <strong className="text-foreground">traitements de surface</strong> durcissent uniquement 
                la couche externe tout en conservant un cœur ductile — idéal pour les pièces soumises à l{"'"}usure et aux chocs.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <InfoCard
                  title="Cémentation"
                  icon={Flame}
                  items={[
                    "Diffusion de carbone en surface",
                    "Aciers bas carbone (16MnCr5)",
                    "Profondeur 0,5-2 mm, suivi trempe"
                  ]}
                />
                <InfoCard
                  title="Nitruration"
                  icon={Shield}
                  items={[
                    "Diffusion d'azote (500-550°C)",
                    "Très dure (HV 1000+), sans trempe",
                    "42CrMo4, 34CrAlNi7"
                  ]}
                />
                <InfoCard
                  title="Carbonitruration"
                  icon={Flame}
                  items={[
                    "C + N simultanés",
                    "Trempe huile ou gaz",
                    "Pièces moyennes, bonne fatigue"
                  ]}
                />
                <InfoCard
                  title="Trempe superficielle"
                  icon={Thermometer}
                  items={[
                    "Induction ou flamme",
                    "Chauffage localisé rapide",
                    "Engrenages, arbres, C45+"
                  ]}
                />
              </div>
            </ContentSection>

            {/* Usinabilité */}
            <ContentSection title="Usinabilité" id="usinabilite">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                L{"'"}<strong className="text-foreground">usinabilité</strong> caractérise la facilité à usiner un matériau. 
                Elle dépend de la composition, de la structure et du traitement thermique.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Matériau</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Usinabilité</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Vc carbure</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Remarques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-foreground">Laiton de décolletage</td>
                      <td className="px-4 py-3 text-green-500 font-semibold">Excellente</td>
                      <td className="px-4 py-3 text-muted-foreground">200-400 m/min</td>
                      <td className="px-4 py-3 text-muted-foreground">Référence (100%)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-foreground">Aluminium 6061</td>
                      <td className="px-4 py-3 text-green-500 font-semibold">Excellente</td>
                      <td className="px-4 py-3 text-muted-foreground">300-600 m/min</td>
                      <td className="px-4 py-3 text-muted-foreground">Arête rapportée possible</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-foreground">Acier S235</td>
                      <td className="px-4 py-3 text-amber-500 font-semibold">Bonne</td>
                      <td className="px-4 py-3 text-muted-foreground">150-250 m/min</td>
                      <td className="px-4 py-3 text-muted-foreground">Copeaux longs</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-foreground">Acier C45</td>
                      <td className="px-4 py-3 text-amber-500 font-semibold">Moyenne</td>
                      <td className="px-4 py-3 text-muted-foreground">120-200 m/min</td>
                      <td className="px-4 py-3 text-muted-foreground">Meilleur recuit</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-foreground">Inox 304</td>
                      <td className="px-4 py-3 text-amber-500 font-semibold">Moyenne</td>
                      <td className="px-4 py-3 text-muted-foreground">100-180 m/min</td>
                      <td className="px-4 py-3 text-muted-foreground">Écrouissage, chaleur</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-foreground">Titane TA6V</td>
                      <td className="px-4 py-3 text-red-500 font-semibold">Difficile</td>
                      <td className="px-4 py-3 text-muted-foreground">40-80 m/min</td>
                      <td className="px-4 py-3 text-muted-foreground">Chaleur, usure outil</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 text-foreground">Inconel 718</td>
                      <td className="px-4 py-3 text-red-500 font-semibold">Très difficile</td>
                      <td className="px-4 py-3 text-muted-foreground">20-40 m/min</td>
                      <td className="px-4 py-3 text-muted-foreground">Céramique ou CBN</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Conseils pour matériaux difficiles
                </h4>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Réduire Vc, augmenter f (avance)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Arêtes vives, géométrie positive
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Arrosage haute pression
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Revêtements adaptés (TiAlN, AlCrN)
                  </li>
                </ul>
              </div>
            </ContentSection>

            {/* CTA */}
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <Thermometer className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                Calculez vos conditions de coupe
              </h3>
              <p className="mt-2 text-muted-foreground">
                Utilisez le calculateur pour adapter Vc et f à vos matériaux.
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
