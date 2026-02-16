import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase, ImageGrid } from "@/components/image-showcase"
import { VideoEmbed } from "@/components/video-embed"
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

const etapes = [
  {
    num: "01",
    title: "Inspection",
    desc: "V\u00e9rifiez que la machine est propre, bien lubrifi\u00e9e et exempte de tout obstacle.",
    icon: CheckCircle,
  },
  {
    num: "02",
    title: "Installation de la pi\u00e8ce",
    desc: "Fixez solidement la pi\u00e8ce \u00e0 usiner dans le mandrin ou sur la table de travail (\u00e9tau, brides...).",
    icon: Layers,
  },
  {
    num: "03",
    title: "Choix de l\u2019outil",
    desc: "S\u00e9lectionnez un outil adapt\u00e9 \u00e0 l\u2019op\u00e9ration pr\u00e9vue (fraisage, tournage, rainurage, etc.).",
    icon: Wrench,
  },
  {
    num: "04",
    title: "R\u00e9glage des param\u00e8tres",
    desc: "Ajustez la vitesse de rotation, l\u2019avance et la profondeur de coupe en fonction du mat\u00e9riau.",
    icon: Zap,
  },
  {
    num: "05",
    title: "Test",
    desc: "Effectuez une passe d\u2019essai pour v\u00e9rifier la pr\u00e9cision et ajuster si n\u00e9cessaire.",
    icon: Ruler,
  },
]

const outilsFraisage = [
  "Fraises cylindriques : usinage des surfaces planes et rainures",
  "Fraises \u00e0 bout plat : rainures, poches et surfaces planes",
  "Fraises \u00e0 bout sph\u00e9rique (boule) : contours 3D et surfaces courbes",
  "Fraises \u00e0 surfacer : enlever de grandes quantit\u00e9s de mati\u00e8re",
  "Fraises \u00e0 chanfreiner : cr\u00e9er des chanfreins ou biseaux",
  "Fraises \u00e0 rainurer : rainures simples, en T ou en queue d\u2019aronde",
]

const outilsTournage = [
  "Outils \u00e0 dresser : usinage des faces planes (perpendiculaires \u00e0 l\u2019axe)",
  "Outils \u00e0 gorge : cr\u00e9ation de rainures ou gorges",
  "Outils de filetage : filetages internes ou externes",
  "Outils d\u2019al\u00e9sage : ajustement des diam\u00e8tres internes",
  "Outils de tron\u00e7onnage : couper ou s\u00e9parer la mati\u00e8re brute",
]

const outilsCarbure = [
  "R\u00e9sistance \u00e9lev\u00e9e \u00e0 l\u2019usure et duret\u00e9 exceptionnelle",
  "Usinage de mat\u00e9riaux durs (aciers tremp\u00e9s, inox)",
  "Utilis\u00e9s pour les vitesses de coupe \u00e9lev\u00e9es",
]

const plaquettes = [
  "Plaquettes rempla\u00e7ables mont\u00e9es sur porte-outils",
  "R\u00e9duction des temps d\u2019arr\u00eat pour aff\u00fbtage",
  "Convient pour le fraisage, le tournage et l\u2019al\u00e9sage",
]

const forets = [
  "Forets h\u00e9lico\u00efdaux : les plus courants pour percer des trous droits",
  "Forets \u00e0 centrer/pointer : per\u00e7ages de haute pr\u00e9cision ou guidage",
  "Forets \u00e9tag\u00e9s : plusieurs diam\u00e8tres avec un seul outil",
]

const outilsMesure = [
  "Pied \u00e0 coulisse : mesures des dimensions ext\u00e9rieures, int\u00e9rieures et profondeurs",
  "Microm\u00e8tre : mesures de haute pr\u00e9cision",
  "Comparateur : v\u00e9rifie les d\u00e9viations et concentricit\u00e9s",
  "Rugosim\u00e8tre : analyse la finition de surface",
]

const materiaux = [
  {
    title: "Acier non alli\u00e9",
    items: [
      "Outils : HSS pour faibles vitesses, carbure rev\u00eatu (TiN, TiAlN) pour vitesses \u00e9lev\u00e9es",
      "Applications : usinage g\u00e9n\u00e9ral, d\u00e9grossissage et finition",
    ],
  },
  {
    title: "Acier alli\u00e9 et tremp\u00e9",
    items: [
      "Outils : carbure monobloc ou plaquettes, CBN pour > 50 HRC",
      "Applications : usinage haute pr\u00e9cision et haute r\u00e9sistance",
    ],
  },
  {
    title: "Fonte",
    items: [
      "Outils : carbure sans rev\u00eatement (fonte grise), c\u00e9ramique (fonte ductile)",
      "Applications : d\u00e9grossissage et finition des pi\u00e8ces moul\u00e9es",
    ],
  },
  {
    title: "Aluminium et alliages l\u00e9gers",
    items: [
      "Outils : carbure grande h\u00e9lice (40-45\u00b0), PCD pour finitions ultra-pr\u00e9cises",
      "Applications : usinage rapide, pr\u00e9vention des bavures et collages",
    ],
  },
  {
    title: "Inox",
    items: [
      "Outils : carbure rev\u00eatu (TiAlN, TiCN), g\u00e9om\u00e9trie positive",
      "Applications : pr\u00e9cision \u00e0 vitesses mod\u00e9r\u00e9es, \u00e9viter l\u2019\u00e9crouissage",
    ],
  },
  {
    title: "Titane et alliages",
    items: [
      "Outils : carbure \u00e0 ar\u00eates vives, rev\u00eatements TiAlN",
      "Applications : bonne gestion thermique, faible avance et haute pr\u00e9cision",
    ],
  },
  {
    title: "Mat\u00e9riaux durs (c\u00e9ramique, composites)",
    items: [
      "Outils : diamant polycristallin (PCD), c\u00e9ramique ou CBN",
      "Applications : haute pr\u00e9cision, machines rigides requises",
    ],
  },
  {
    title: "Plastiques et polym\u00e8res",
    items: [
      "Outils : HSS ou carbure, ar\u00eates vives",
      "Applications : haute vitesse, gestion de la chaleur pour \u00e9viter d\u00e9formation",
    ],
  },
]

export default function DemarragePage() {
  return (
    <>
      <PageHeader
        badge="Guide de d\u00e9marrage"
        title="Mise en Marche et R\u00e9glage des Machines"
        subtitle="Les \u00e9tapes fondamentales pour pr\u00e9parer, r\u00e9gler et d\u00e9marrer vos machines-outils en toute s\u00e9curit\u00e9."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils.jpg-bZqaPg57JOVBcIk9ZYxNpQkHNaPTSO.webp"
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Steps */}
        <ContentSection title="\u00c9tapes G\u00e9n\u00e9rales">
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
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/start-BRWnfvQLdBPz5XZ9W6I4VnKhMpfFzX.jpg"
              alt="Bouton Cycle Start d\u2019une machine CNC"
              caption="Bouton CYCLE START \u2014 Lancement du programme CNC"
              aspectRatio="video"
            />
            <VideoEmbed
              videoId="kCAR-NCt0fg"
              title="D\u00e9marrage et r\u00e9glage d\u2019une machine-outil"
              caption="Mise en route d\u2019une machine CNC"
            />
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

        {/* Fact */}
        <FactCard
          fact="Un outil de coupe en carbure de tungst\u00e8ne atteint une duret\u00e9 de 1 500 \u00e0 2 500 HV (Vickers), soit plus de 3 fois la duret\u00e9 d\u2019un acier tremp\u00e9. Son rev\u00eatement TiAlN lui permet de supporter des temp\u00e9ratures de 800 \u00b0C en contact avec la pi\u00e8ce."
          variant="accent"
          className="my-4"
        />

        {/* Tool images */}
        <ContentSection title="Galerie d\u2019Outils">
          <ImageGrid
            images={[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils.jpg-bZqaPg57JOVBcIk9ZYxNpQkHNaPTSO.webp",
                alt: "Collection compl\u00e8te d\u2019outils de coupe professionnels",
                caption: "Outils \u00e0 plaquettes interchangeables \u2014 Fraisage et per\u00e7age",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cutting-DoKGVvDxuVBZOSn3g5WWeeHkhQN40G.jpg",
                alt: "Plaquettes carbure avec rev\u00eatements or et noirs de diff\u00e9rentes g\u00e9om\u00e9tries",
                caption: "Plaquettes carbure \u2014 g\u00e9om\u00e9tries CNMG, WNMG, RCMG",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/for-KBe9cVu5utQUNcXTMoBzxPD2ByHmyV.jpg",
                alt: "Forets et fraises carbure de diff\u00e9rentes tailles et g\u00e9om\u00e9tries",
                caption: "Forets et fraises carbure monobloc",
              },
            ]}
            columns={3}
          />
          <ImageGrid
            images={[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outilscarb-3fKqIQV2fcFnKqu1KhHcJUZtUlg1Qr.jpg",
                alt: "Fraises carbure monobloc de diff\u00e9rentes g\u00e9om\u00e9tries",
                caption: "Fraises carbure \u2014 \u00e9bauche et finition",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils-tournage.jpg-7RVclx58YOJwm1RdyGf4z3lvPmI1NU.png",
                alt: "Sch\u00e9ma des outils de tournage selon normes DIN",
                caption: "Classification DIN des outils de tournage",
              },
            ]}
            className="mt-4"
          />
        </ContentSection>

        {/* Materiaux banner */}
        <SectionBanner
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/materiaux.jpg-BlXwqB7QRLjr3067LUcZEpBw7af9wr.webp"
          alt="Collection de m\u00e9taux et alliages utilis\u00e9s en usinage"
          caption="Les mat\u00e9riaux d\u2019usinage : aciers, aluminiums, cuivre, titane, inox et alliages exotiques"
        />

        {/* Metrologie banner */}
        <SectionBanner
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mesure.jpg-d9PceTfRum5SrQA2rafUKjXyvPzUJe.png"
          alt="Pied \u00e0 coulisse num\u00e9rique mesurant un roulement sur des plans techniques"
          caption="M\u00e9trologie de pr\u00e9cision : contr\u00f4le dimensionnel avec pied \u00e0 coulisse num\u00e9rique et suivi SPC"
        />

        {/* Metrologie detail */}
        <ContentSection title="M\u00e9trologie en D\u00e9tail">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="/images/micrometre-precision.jpg"
              alt="Microm\u00e8tre de pr\u00e9cision mesurant une pi\u00e8ce m\u00e9tallique"
              caption="Microm\u00e8tre d\u2019ext\u00e9rieur \u2014 pr\u00e9cision au centi\u00e8me de millim\u00e8tre (0,01 mm)"
            />
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Pourquoi la m\u00e9trologie ?</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                La m\u00e9trologie est indissociable de l{"\u2019"}usinage. Sans mesure pr\u00e9cise, il est impossible de garantir que les pi\u00e8ces respectent les tol\u00e9rances demand\u00e9es par les plans techniques. Chaque outil de mesure a sa plage d{"\u2019"}utilisation et sa pr\u00e9cision propre.
              </p>
              <div className="rounded-lg bg-secondary p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Pr\u00e9cisions typiques</h4>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Pied \u00e0 coulisse</strong> : 0,02 mm</li>
                  <li><strong className="text-foreground">Microm\u00e8tre</strong> : 0,01 mm (jusqu{"\u2019"}\u00e0 0,001 mm)</li>
                  <li><strong className="text-foreground">Comparateur</strong> : 0,01 mm</li>
                  <li><strong className="text-foreground">Rugosim\u00e8tre</strong> : 0,001 \u00b5m (Ra)</li>
                </ul>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Materials */}
        <ContentSection title="Choix des Outils en Fonction des Mat\u00e9riaux">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materiaux.map((mat) => (
              <InfoCard key={mat.title} title={mat.title} items={mat.items} />
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              Facteurs cl\u00e9s pour le choix des outils
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Propri\u00e9t\u00e9s du mat\u00e9riau : duret\u00e9, conductivit\u00e9, ductilit\u00e9",
                "Type d\u2019op\u00e9ration : d\u00e9grossissage, finition, per\u00e7age, filetage",
                "Conditions de coupe : vitesse, avance, profondeur",
                "Rev\u00eatement de l\u2019outil : TiN, TiAlN pour durabilit\u00e9",
                "Syst\u00e8me de refroidissement : n\u00e9cessaire pour titane, inox",
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
        <ContentSection title="Rev\u00eatements d\u2019Outils">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Rev\u00eatement</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Propri\u00e9t\u00e9s</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["TiN (Nitrure de titane)", "R\u00e9duction de l\u2019usure, meilleure \u00e9vacuation des copeaux"],
                  ["TiAlN (Nitrure de titane-aluminium)", "R\u00e9sistance \u00e0 la chaleur accrue, id\u00e9al pour aciers durs"],
                  ["CVD / PVD", "Technologies avanc\u00e9es pour applications exigeantes"],
                  ["PCD (Diamant polycristallin)", "Id\u00e9al pour mat\u00e9riaux abrasifs et composites"],
                  ["CBN (Nitrure de bore cubique)", "Usinage des aciers tremp\u00e9s"],
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
