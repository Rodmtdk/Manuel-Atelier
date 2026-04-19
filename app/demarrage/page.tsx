import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase, ImageGrid } from "@/components/image-showcase"
import { SectionBanner } from "@/components/banner-image"
import { FactCard } from "@/components/fact-card"
import {
  CheckCircle,
  Wrench,
  Ruler,
  Shield,
  Layers,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Guide de Démarrage - Manuel d'Atelier",
  description:
    "Les étapes fondamentales pour préparer, régler et démarrer vos machines-outils en toute sécurité. Outils, matériaux et métrologie.",
}

const etapes = [
  {
    num: "01",
    title: "Inspection",
    desc: "Vérifiez que la machine est propre, bien lubrifiée et exempte de tout obstacle.",
    icon: CheckCircle,
  },
  {
    num: "02",
    title: "Installation de la pièce",
    desc: "Fixez solidement la pièce à usiner dans le mandrin ou sur la table de travail (étau, brides...).",
    icon: Layers,
  },
  {
    num: "03",
    title: "Choix de l'outil",
    desc: "Sélectionnez un outil adapté à l'opération prévue (fraisage, tournage, rainurage, etc.).",
    icon: Wrench,
  },
  {
    num: "04",
    title: "Réglage des paramètres",
    desc: "Ajustez la vitesse de rotation, l'avance et la profondeur de coupe en fonction du matériau.",
    icon: Zap,
  },
  {
    num: "05",
    title: "Test",
    desc: "Effectuez une passe d'essai pour vérifier la précision et ajuster si nécessaire.",
    icon: Ruler,
  },
]

const outilsFraisage = [
  "Fraises cylindriques : usinage des surfaces planes et rainures",
  "Fraises à bout plat : rainures, poches et surfaces planes",
  "Fraises à bout sphérique (boule) : contours 3D et surfaces courbes",
  "Fraises à surfacer : enlever de grandes quantités de matière",
  "Fraises à chanfreiner : créer des chanfreins ou biseaux",
  "Fraises à rainurer : rainures simples, en T ou en queue d'aronde",
]

const outilsTournage = [
  "Outils à dresser : usinage des faces planes (perpendiculaires à l'axe)",
  "Outils à gorge : création de rainures ou gorges",
  "Outils de filetage : filetages internes ou externes",
  "Outils d'alésage : ajustement des diamètres internes",
  "Outils de tronçonnage : couper ou séparer la matière brute",
]

const outilsCarbure = [
  "Résistance élevée à l'usure et dureté exceptionnelle",
  "Usinage de matériaux durs (aciers trempés, inox)",
  "Utilisés pour les vitesses de coupe élevées",
]

const plaquettes = [
  "Plaquettes remplaçables montées sur porte-outils",
  "Réduction des temps d'arrêt pour affûtage",
  "Convient pour le fraisage, le tournage et l'alésage",
]

const forets = [
  "Forets hélicoïdaux : les plus courants pour percer des trous droits",
  "Forets à centrer/pointer : perçages de haute précision ou guidage",
  "Forets étagés : plusieurs diamètres avec un seul outil",
]

const outilsMesure = [
  "Pied à coulisse : mesures des dimensions extérieures, intérieures et profondeurs",
  "Micromètre : mesures de haute précision",
  "Comparateur : vérifie les déviations et concentricités",
  "Rugosimètre : analyse la finition de surface",
]

const materiaux = [
  {
    title: "Acier non allié",
    items: [
      "Outils : HSS pour faibles vitesses, carbure revêtu (TiN, TiAlN) pour vitesses élevées",
      "Applications : usinage général, dégrossissage et finition",
    ],
  },
  {
    title: "Acier allié et trempé",
    items: [
      "Outils : carbure monobloc ou plaquettes, CBN pour > 50 HRC",
      "Applications : usinage haute précision et haute résistance",
    ],
  },
  {
    title: "Fonte",
    items: [
      "Outils : carbure sans revêtement (fonte grise), céramique (fonte ductile)",
      "Applications : dégrossissage et finition des pièces moulées",
    ],
  },
  {
    title: "Aluminium et alliages légers",
    items: [
      "Outils : carbure grande hélice (40-45°), PCD pour finitions ultra-précises",
      "Applications : usinage rapide, prévention des bavures et collages",
    ],
  },
  {
    title: "Inox",
    items: [
      "Outils : carbure revêtu (TiAlN, TiCN), géométrie positive",
      "Applications : précision à vitesses modérées, éviter l'écrouissage",
    ],
  },
  {
    title: "Titane et alliages",
    items: [
      "Outils : carbure à arêtes vives, revêtements TiAlN",
      "Applications : bonne gestion thermique, faible avance et haute précision",
    ],
  },
  {
    title: "Matériaux durs (céramique, composites)",
    items: [
      "Outils : diamant polycristallin (PCD), céramique ou CBN",
      "Applications : haute précision, machines rigides requises",
    ],
  },
  {
    title: "Plastiques et polymères",
    items: [
      "Outils : HSS ou carbure, arêtes vives",
      "Applications : haute vitesse, gestion de la chaleur pour éviter déformation",
    ],
  },
]

export default function DemarragePage() {
  return (
    <>
      <PageHeader
        badge="Guide de démarrage"
        title="Mise en Marche et Réglage des Machines"
        subtitle="Les étapes fondamentales pour préparer, régler et démarrer vos machines-outils en toute sécurité."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils.jpg-bZqaPg57JOVBcIk9ZYxNpQkHNaPTSO.webp"
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Steps */}
        <ContentSection title="Étapes Générales">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {etapes.map((step) => (
              <div
                key={step.num}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                    {step.num}
                  </span>
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Visual - Cycle Start */}
        <ContentSection title="En Images">
          <ImageShowcase
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/start-BRWnfvQLdBPz5XZ9W6I4VnKhMpfFzX.jpg"
            alt="Bouton Cycle Start d'une machine CNC"
            caption="Bouton CYCLE START — Lancement du programme CNC"
            aspectRatio="wide"
          />
        </ContentSection>

        {/* Cutting tools */}
        <ContentSection title="Outils de Coupe">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard title="Outils de fraisage" items={outilsFraisage} />
            <InfoCard title="Outils de tournage" items={outilsTournage} />
            <InfoCard title="Outils en carbure monobloc" items={outilsCarbure} />
            <InfoCard title="Plaquettes interchangeables" items={plaquettes} />
            <InfoCard title="Forets" items={forets} />
            <InfoCard title="Outils de mesure" items={outilsMesure} />
          </div>
        </ContentSection>

        {/* Fact */}
        <FactCard
          fact="Un outil de coupe en carbure de tungstène atteint une dureté de 1 500 à 2 500 HV (Vickers), soit plus de 3 fois la dureté d'un acier trempé. Son revêtement TiAlN lui permet de supporter des températures de 800 °C en contact avec la pièce."
          variant="accent"
          className="my-4"
        />

        {/* Tool images */}
        <ContentSection title="Galerie d'Outils">
          <ImageGrid
            images={[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils.jpg-bZqaPg57JOVBcIk9ZYxNpQkHNaPTSO.webp",
                alt: "Collection complète d'outils de coupe professionnels",
                caption: "Outils a plaquettes interchangeables",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plaquettes%20carbure%20g%C3%A9om%C3%A9tries%20CNMG%2C%20WNMG%2C%20RCMG.jpg-RvChG1nBW8kNi3kxy6Zp4EfZm03NBM.webp",
                alt: "Plaquettes carbure de differentes geometries CNMG, WNMG, RCMG",
                caption: "Plaquettes carbure — geometries CNMG, WNMG, RCMG",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Forets%20et%20fraises%20carbure%20monobloc-xaEIAJdfXgO6IT4qn0L2fVJMQ00VRb.jpg",
                alt: "Forets et fraises carbure monobloc avec revetements TiN",
                caption: "Forets et fraises carbure monobloc",
              },
            ]}
            columns={3}
          />
        </ContentSection>

        {/* Materiaux banner */}
        <SectionBanner
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/materiaux.jpg-BlXwqB7QRLjr3067LUcZEpBw7af9wr.webp"
          alt="Collection de metaux et alliages utilises en usinage"
          caption="Echantillons de materiaux — aciers, aluminiums, cuivre, titane, inox"
        />

        {/* Metrologie banner */}
        <SectionBanner
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mesure.jpg-d9PceTfRum5SrQA2rafUKjXyvPzUJe.png"
          alt="Pied a coulisse numerique mesurant un roulement"
          caption="Controle dimensionnel avec pied a coulisse numerique"
        />

        {/* Metrologie detail */}
        <ContentSection title="Métrologie en Détail">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-3 font-semibold text-foreground">Pourquoi la métrologie ?</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              La métrologie est indissociable de l{"'"}usinage. Sans mesure précise, il est impossible de garantir que les pièces respectent les tolérances demandées par les plans techniques. Chaque outil de mesure a sa plage d{"'"}utilisation et sa précision propre.
            </p>
            <div className="rounded-lg bg-secondary p-4">
              <h4 className="mb-2 text-sm font-semibold text-foreground">Précisions typiques</h4>
              <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Pied à coulisse</strong> : 0,02 mm</li>
                <li><strong className="text-foreground">Micromètre</strong> : 0,01 mm (jusqu{"'"}à 0,001 mm)</li>
                <li><strong className="text-foreground">Comparateur</strong> : 0,01 mm</li>
                <li><strong className="text-foreground">Rugosimètre</strong> : 0,001 µm (Ra)</li>
              </ul>
            </div>
          </div>
        </ContentSection>

        {/* Materials */}
        <ContentSection title="Choix des Outils en Fonction des Matériaux">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materiaux.map((mat) => (
              <InfoCard key={mat.title} title={mat.title} items={mat.items} />
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              Facteurs clés pour le choix des outils
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Propriétés du matériau : dureté, conductivité, ductilité",
                "Type d'opération : dégrossissage, finition, perçage, filetage",
                "Conditions de coupe : vitesse, avance, profondeur",
                "Revêtement de l'outil : TiN, TiAlN pour durabilité",
                "Système de refroidissement : nécessaire pour titane, inox",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </ContentSection>

        {/* Coatings */}
        <ContentSection title="Revêtements d'Outils">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Revêtement</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Propriétés</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["TiN (Nitrure de titane)", "Réduction de l'usure, meilleure évacuation des copeaux"],
                  ["TiAlN (Nitrure de titane-aluminium)", "Résistance à la chaleur accrue, idéal pour aciers durs"],
                  ["CVD / PVD", "Technologies avancées pour applications exigeantes"],
                  ["PCD (Diamant polycristallin)", "Idéal pour matériaux abrasifs et composites"],
                  ["CBN (Nitrure de bore cubique)", "Usinage des aciers trempés"],
                ].map(([name, desc], i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 font-medium text-foreground">{name}</td>
                    <td className="px-6 py-3 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>
      </div>
    </>
  )
}
