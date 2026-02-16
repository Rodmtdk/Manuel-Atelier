import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import {
  CheckCircle,
  Wrench,
  Ruler,
  Shield,
  Layers,
  Zap,
} from "lucide-react"

const etapes = [
  {
    num: "01",
    title: "Inspection",
    desc: "Verifiez que la machine est propre, bien lubrifiee et exempte de tout obstacle.",
    icon: CheckCircle,
  },
  {
    num: "02",
    title: "Installation de la piece",
    desc: "Fixez solidement la piece a usiner dans le mandrin ou sur la table de travail (etau, brides...).",
    icon: Layers,
  },
  {
    num: "03",
    title: "Choix de l'outil",
    desc: "Selectionnez un outil adapte a l'operation prevue (fraisage, tournage, rainurage, etc.).",
    icon: Wrench,
  },
  {
    num: "04",
    title: "Reglage des parametres",
    desc: "Ajustez la vitesse de rotation, l'avance et la profondeur de coupe en fonction du materiau.",
    icon: Zap,
  },
  {
    num: "05",
    title: "Test",
    desc: "Effectuez une passe d'essai pour verifier la precision et ajuster si necessaire.",
    icon: Ruler,
  },
]

const outilsFraisage = [
  "Fraises cylindriques : usinage des surfaces planes et rainures",
  "Fraises a bout plat : rainures, poches et surfaces planes",
  "Fraises a bout hemispherique : contours 3D et surfaces courbes",
  "Fraises a surfacer : enlever de grandes quantites de matiere",
  "Fraises a chanfreiner : creer des chanfreins ou biseaux",
  "Fraises a rainurer : rainures simples, en T ou en queue d'aronde",
]

const outilsTournage = [
  "Poincons a dresser : usinage des faces planes",
  "Poincons a gorge : creation de rainures ou gorges",
  "Outils de filetage : filetages internes ou externes",
  "Outils d'alesage : ajustement des diametres internes",
  "Outils de tronconnage : couper ou separer la matiere brute",
]

const outilsCarbure = [
  "Resistance elevee a l'usure et durete exceptionnelle",
  "Usinage de materiaux durs (aciers trempes, inox)",
  "Utilises pour les vitesses de coupe elevees",
]

const plaquettes = [
  "Plaquettes remplacables montees sur porte-outils",
  "Reduction des temps d'arret pour affutage",
  "Convient pour le fraisage, le tournage et l'alesage",
]

const forets = [
  "Forets helicoidaux : les plus courants pour percer des trous droits",
  "Forets a centrer/pointer : percages de haute precision ou guidage",
  "Forets etages : plusieurs diametres avec un seul outil",
]

const outilsMesure = [
  "Pied a coulisse : mesures des dimensions exterieures, interieures et profondeurs",
  "Micrometre : mesures de haute precision",
  "Comparateur : verifie les deviations et concentricites",
  "Rugosimetre : analyse la finition de surface",
]

const materiaux = [
  {
    title: "Acier non allie",
    items: [
      "Outils : HSS pour faibles vitesses, carbure revetu (TiN, TiAlN) pour vitesses elevees",
      "Applications : usinage general, degrossissage et finition",
    ],
  },
  {
    title: "Acier allie et trempe",
    items: [
      "Outils : carbure monobloc ou plaquettes, CBN pour > 50 HRC",
      "Applications : usinage haute precision et haute resistance",
    ],
  },
  {
    title: "Fonte",
    items: [
      "Outils : carbure sans revetement (fonte grise), ceramique (fonte ductile)",
      "Applications : degrossissage et finition des pieces moulees",
    ],
  },
  {
    title: "Aluminium et alliages legers",
    items: [
      "Outils : carbure grande helice (40-45 deg), PCD pour finitions ultra-precises",
      "Applications : usinage rapide, prevention des bavures et collages",
    ],
  },
  {
    title: "Inox",
    items: [
      "Outils : carbure revetu (TiAlN, TiCN), geometrie positive",
      "Applications : precision a vitesses moderees, eviter l'ecrouissage",
    ],
  },
  {
    title: "Titane et alliages",
    items: [
      "Outils : carbure a aretes vives, revetements TiAlN",
      "Applications : bonne gestion thermique, faible avance et haute precision",
    ],
  },
  {
    title: "Materiaux durs (ceramique, composites)",
    items: [
      "Outils : diamantes (PCD), ceramique ou CBN",
      "Applications : haute precision, machines rigides requises",
    ],
  },
  {
    title: "Plastiques et polymeres",
    items: [
      "Outils : HSS ou carbure, aretes vives",
      "Applications : haute vitesse, gestion de la chaleur pour eviter deformation",
    ],
  },
]

export default function DemarragePage() {
  return (
    <>
      <PageHeader
        badge="Guide de demarrage"
        title="Mise en Marche et Reglage des Machines"
        subtitle="Les etapes fondamentales pour preparer, regler et demarrer vos machines-outils en toute securite."
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Steps */}
        <ContentSection title="Etapes Generales">
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

        {/* Materials */}
        <ContentSection title="Choix des Outils en Fonction des Materiaux">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materiaux.map((mat) => (
              <InfoCard key={mat.title} title={mat.title} items={mat.items} />
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              Facteurs cles pour le choix des outils
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Proprietes du materiau : durete, conductivite, ductilite",
                "Type d'operation : degrossissage, finition, percage, filetage",
                "Conditions de coupe : vitesse, avance, profondeur",
                "Revetement de l'outil : TiN, TiAlN pour durabilite",
                "Systeme de refroidissement : necessaire pour titane, inox",
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
        <ContentSection title="Revetements d'Outils">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Revetement</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Proprietes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["TiN (Nitrure de titane)", "Reduction de l'usure, meilleure evacuation des copeaux"],
                  ["TiAlN (Nitrure titane-alu)", "Resistance a la chaleur accrue"],
                  ["CVD / PVD", "Technologies avancees pour applications exigeantes"],
                  ["PCD (Diamant polycristallin)", "Ideal pour materiaux abrasifs et composites"],
                  ["CBN (Nitrure de bore cubique)", "Usinage des aciers trempes"],
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
