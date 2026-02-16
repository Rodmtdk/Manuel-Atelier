import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import { VideoEmbed, VideoGrid } from "@/components/video-embed"
import { FactStrip, FactCard } from "@/components/fact-card"

const composantsCylindrique = [
  "Meule : abrasif lie (corindon, CBN, diamant) qui enleve la matiere par abrasion",
  "Poupee porte-meule : entraine la meule a grande vitesse (1500-3000 tr/min typique)",
  "Poupee porte-piece : entraine la piece en rotation lente et reguliere",
  "Contre-pointe : maintient la piece entre pointes pour la rectification cylindrique",
  "Table longitudinale : deplacement axial de la piece (avance transversale)",
  "Chariot transversal : regle la profondeur de passe (plongee radiale)",
  "Systeme de dressage : diamant ou molette pour remettre la meule en forme",
  "Systeme d'arrosage : lubrification abondante, refroidissement et evacuation des particules",
  "Comparateur / palpeur : controle dimensionnel en cours de rectification",
  "Filtre magnetique : recupere les particules metalliques du liquide de coupe",
]

const composantsPlane = [
  "Meule plate : abrasif pour usinage de surfaces planes",
  "Plateau magnetique : maintien de la piece par magnetisme (materiaux ferreux)",
  "Table longitudinale : deplacement alternatif de la piece sous la meule",
  "Chariot transversal : avance laterale entre chaque course de la table",
  "Colonne verticale : reglage de la profondeur de passe en descente",
  "Systeme de dressage : diamant mono-pointe ou molette pour raviver la meule",
  "Bac de recuperation : collecte le liquide de coupe et les boues de rectification",
  "Protecteur de meule : capotage obligatoire pour la securite",
]

const typesRectification = [
  {
    title: "Rectification cylindrique exterieure",
    desc: "La piece tourne entre pointes ou en mandrin tandis que la meule rectifie la surface exterieure. Utilisee pour les arbres, les axes, les portees de roulements et les surfaces de revolution de haute precision.",
  },
  {
    title: "Rectification cylindrique interieure",
    desc: "Une petite meule tourne a grande vitesse a l'interieur d'un alesage. La piece est serree en mandrin et tourne en sens oppose. Indispensable pour les bagues, les douilles et les chemises de cylindres.",
  },
  {
    title: "Rectification plane (surfacage)",
    desc: "La piece est fixee sur un plateau magnetique et la meule travaille la surface superieure. Permet d'obtenir des planitudes de l'ordre de 0,002 mm et des etats de surface remarquables.",
  },
  {
    title: "Rectification sans centres (centerless)",
    desc: "La piece est maintenue entre la meule de travail, la meule de regulation et une reglette de support. Ideale pour les grandes series de pieces cylindriques (axes, goupilles, rouleaux).",
  },
  {
    title: "Rectification de profil",
    desc: "La meule est dressee avec un profil specifique (rayon, chanfrein, gorge). Permet de rectifier des formes complexes en une seule operation. Utilisee pour les matrices et les outillages.",
  },
  {
    title: "Superfinition / Honage",
    desc: "Procede de finition ultime avec des pierres abrasives oscillantes. Atteint des Ra inferieurs a 0,1 um. Essentiel pour les arbres a cames, les vilebrequins et les cylindres hydrauliques.",
  },
]

const abrasifs = [
  {
    title: "Corindon (oxyde d'aluminium - Al2O3)",
    items: [
      "Abrasif le plus courant et le plus economique",
      "Variantes : corindon blanc (friable, finition), brun (ebauche), rose (aciers durs)",
      "Ideal pour les aciers doux, mi-durs et les fontes",
      "Vitesse peripherique : 25-35 m/s en conventionnel",
    ],
  },
  {
    title: "Carbure de silicium (SiC)",
    items: [
      "Plus dur mais plus fragile que le corindon",
      "Variante verte pour les carbures de tungstene",
      "Variante noire pour la fonte grise et les materiaux non ferreux",
      "Utilisations : ceramiques, verres, materiaux tres durs ou tres tendres",
    ],
  },
  {
    title: "CBN (nitrure de bore cubique)",
    items: [
      "Deuxieme materiau le plus dur apres le diamant",
      "Excellente stabilite thermique (pas de reaction avec le fer)",
      "Ideal pour les aciers trempes (>50 HRC), aciers rapides, fontes dures",
      "Vitesse : 30-80 m/s, duree de vie 10 a 100 fois superieure au corindon",
    ],
  },
  {
    title: "Diamant",
    items: [
      "Materiau le plus dur connu, mais reagit avec le fer a haute temperature",
      "Reserve aux carbures de tungstene, ceramiques, verres, materiaux composites",
      "Meules electro-deposees ou frittees selon l'application",
      "Vitesse : 25-50 m/s, precision de forme exceptionnelle",
    ],
  },
]

const parametres = [
  {
    title: "Vitesse de meule (Vs)",
    content: "Vitesse peripherique de la meule en m/s. Conventionnel : 25-35 m/s. Grande vitesse (HSG) : 60-120 m/s. Un mauvais reglage peut provoquer l'eclatement de la meule.",
    formula: "Vs = (Pi x Ds x ns) / (1000 x 60)",
  },
  {
    title: "Vitesse de piece (Vw)",
    content: "Vitesse peripherique de la piece en m/min. Typiquement 10-30 m/min. Le ratio Vs/Vw influence la qualite de surface et le taux d'enlevement.",
    formula: "Vw = (Pi x Dw x nw) / 1000",
  },
  {
    title: "Profondeur de passe (ae)",
    content: "Epaisseur de matiere retiree par passe. Ebauche : 0,01-0,05 mm. Finition : 0,002-0,01 mm. Superfinition : 0,001-0,005 mm. Des passes excessives provoquent des brulures.",
    formula: "ae en mm (typiquement 0,002 a 0,05)",
  },
  {
    title: "Avance transversale (fa)",
    content: "Deplacement lateral de la meule (ou de la table) a chaque revolution de la piece. Generalement 1/3 a 2/3 de la largeur de la meule. Influe sur l'etat de surface.",
    formula: "fa = (1/3 a 2/3) x largeur meule",
  },
]

const defauts = [
  {
    title: "Brulures de rectification",
    items: [
      "Cause : profondeur de passe excessive, meule bouchee, arrosage insuffisant",
      "Consequence : zones decolorees (bleu/brun), contraintes de traction, microfissures",
      "Solution : reduire ae, dresser la meule, ameliorer l'arrosage",
      "Detection : attaque Nital, test Barkhausen, controle visuel",
    ],
  },
  {
    title: "Chattering (vibrations)",
    items: [
      "Cause : desequilibre de la meule, jeu dans les paliers, resonance",
      "Consequence : motifs reguliers ondulants sur la surface",
      "Solution : equilibrer la meule, verifier les roulements, modifier les vitesses",
      "Prevention : dressage soigne, meule bien equilibree apres montage",
    ],
  },
  {
    title: "Chargement de la meule",
    items: [
      "Cause : materiau tendre, meule trop dure, Vc inadaptee",
      "Consequence : perte de coupe, echauffement, mauvais etat de surface",
      "Solution : dresser la meule, choisir un liant plus tendre",
      "Prevention : arrosage adapte, choix de meule correct",
    ],
  },
  {
    title: "Defauts geometriques",
    items: [
      "Cause : alignement machine, dilatation thermique, montage piece",
      "Consequence : conicite, ovalisation, erreurs de circularite",
      "Solution : verifier les alignements, stabiliser la temperature",
      "Prevention : prechauffage machine, controle dimensionnel regulier",
    ],
  },
]

const dressage = [
  "Le dressage (ou diamantage) ravive le pouvoir de coupe de la meule",
  "Diamant mono-pointe : le plus simple, passage en travers de la meule",
  "Molette diamantee : plus rapide, profiles possibles, pour production serie",
  "Peigne diamant : compromis entre precision et productivite",
  "Frequence : apres chaque nouveau montage, puis selon besoin (bruit, brulures)",
  "Profondeur de dressage : 0,01-0,03 mm par passe, avance lente et reguliere",
  "Toujours dresser avec arrosage pour proteger le diamant et la meule",
  "Le dressage en finition se fait a avance plus lente pour un meilleur Ra",
]

const securiteRectif = [
  "Verifier la vitesse maximale marquee sur la meule AVANT montage",
  "Ne jamais depasser la vitesse peripherique indiquee par le fabricant",
  "Monter les flasques correctement et serrer progressivement",
  "Tester la meule (son de cloche) pour detecter les fissures avant montage",
  "Le protecteur de meule doit couvrir au minimum 180 degres",
  "Porter des lunettes de protection et un ecran facial si necessaire",
  "L'arrosage doit etre actif AVANT le contact meule-piece",
  "Ne jamais utiliser une meule endommagee, fissuree ou ayant subi un choc",
  "Equilibrer la meule apres chaque montage sur son mandrin",
  "Laisser tourner la meule a vide pendant 1 minute apres mise en route",
]

const etatsurface = [
  { qualite: "Ebauche", ra: "1,6 - 3,2", application: "Pre-rectification, enlevement de matiere" },
  { qualite: "Semi-finition", ra: "0,4 - 1,6", application: "Portees generales, pieces mecaniques" },
  { qualite: "Finition", ra: "0,1 - 0,4", application: "Portees de roulement, arbres de precision" },
  { qualite: "Superfinition", ra: "0,025 - 0,1", application: "Hydraulique, pneumatique, optique" },
  { qualite: "Poli miroir", ra: "< 0,025", application: "Moules, outillages de precision" },
]

export default function RectificationPage() {
  return (
    <>
      <PageHeader
        badge="Rectification"
        title="Rectification - Usinage de Precision"
        subtitle="Procede d'usinage par abrasion permettant d'atteindre des tolerances de l'ordre du micrometre et des etats de surface exceptionnels. Guide complet des techniques, abrasifs et parametres."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-image-7F4dkLjnT8Gu3tlBSjjzi3GZiXPvKh.jpg"
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Introduction */}
        <ContentSection title="Presentation">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">
              La rectification est un procede d{"'"}usinage de finition par abrasion.
              Contrairement au tournage et au fraisage qui utilisent des outils a arete
              definie, la rectification fait appel a une meule composee de millions de
              grains abrasifs. Chaque grain agit comme un micro-outil de coupe, permettant
              d{"'"}atteindre des tolerances dimensionnelles de l{"'"}ordre de 0,001 mm et des
              etats de surface (Ra) inferieurs a 0,1 um. C{"'"}est une operation essentielle
              dans la fabrication de pieces de haute precision : roulements, arbres,
              matrices, outillages, pieces aeronautiques et automobiles.
            </p>
          </div>
        </ContentSection>

        {/* Intriguing facts */}
        <FactStrip
          className="my-4"
          facts={[
            {
              fact: "Une meule de rectification tourne a plus de 2 000 tr/min. A sa surface, chaque grain abrasif atteint une vitesse de 30 m/s, soit 108 km/h - l'equivalent d'une voiture sur autoroute frappant le metal.",
              variant: "accent",
            },
            {
              fact: "La rectification permet d'atteindre un Ra de 0,025 um, soit un poli quasi-miroir. A cette echelle, les irregularites de surface sont plus petites qu'une bacterie.",
              variant: "default",
            },
            {
              fact: "Le CBN (Nitrure de Bore Cubique) est le 2e materiau le plus dur au monde apres le diamant. Il resiste a 1 300 C sans se degrader - ideal pour rectifier les aciers trempes.",
              variant: "highlight",
            },
          ]}
        />

        {/* ============================================= */}
        {/* RECTIFICATION SPIROCONIQUE - Section majeure */}
        {/* ============================================= */}
        <ContentSection title="Rectification Spiroconique" id="spiroconique">
          {/* Hero image spiroconique */}
          <div className="mb-8">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-image-7F4dkLjnT8Gu3tlBSjjzi3GZiXPvKh.jpg"
              alt="Usinage CNC d'un engrenage spiroconique - meule de precision sur denture spirale"
              caption="Rectification d'un engrenage spiroconique sur machine CNC 5 axes - denture spirale de haute precision"
              priority
              aspectRatio="wide"
            />
          </div>

          {/* Description */}
          <div className="mb-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Qu{"'"}est-ce que la rectification spiroconique ?
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              La rectification spiroconique est un procede de finition de tres haute precision
              applique aux engrenages coniques a denture spirale (ou engrenages spiroconiques).
              Ces engrenages transmettent le mouvement entre deux arbres perpendiculaires ou
              obliques avec un contact progressif et silencieux. La rectification de leurs flancs
              de dents est essentielle pour garantir la precision de l{"'"}engrenement, reduire le
              bruit et prolonger la duree de vie. Ce procede est utilise dans les ponts
              d{"'"}automobiles, les reducteurs industriels, les transmissions d{"'"}helicopteres et
              les robots de haute precision.
            </p>
          </div>

          {/* Principe et etapes */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Principe de fonctionnement</h3>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                {[
                  "L'engrenage spiroconique est monte sur un axe de precision",
                  "Une meule de forme (coupe ou boisseau) rectifie le flanc de chaque dent",
                  "Le mouvement combine rotation piece + deplacement meule reproduit la geometrie spirale",
                  "Les machines modernes utilisent 5 a 6 axes CNC synchronises",
                  "Le procede Gleason ou Klingelnberg definit la geometrie de reference",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Etapes de la rectification</h3>
              <div className="flex flex-col gap-3">
                {[
                  { step: "01", text: "Taillage initial de la denture (fraise-mere ou outil Gleason)" },
                  { step: "02", text: "Traitement thermique (cementation, trempe)" },
                  { step: "03", text: "Montage de la piece sur la rectifieuse spiroconique" },
                  { step: "04", text: "Reglage des parametres : angle de spirale, module, pas" },
                  { step: "05", text: "Rectification d'ebauche des flancs de dents" },
                  { step: "06", text: "Rectification de finition pour l'etat de surface final" },
                  { step: "07", text: "Controle 3D de la portee de denture (Gleason CMM)" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-bold text-accent">
                      {item.step}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Videos spiroconiques */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Rectification spiroconique en video
            </h3>
            <VideoGrid
              videos={[
                {
                  videoId: "nqwF7mPgjfo",
                  title: "Rectification d'engrenage spiroconique - Gleason",
                  caption: "Processus de rectification Gleason sur engrenage conique",
                },
                {
                  videoId: "CBqXXjPmjQU",
                  title: "Taillage et rectification d'engrenages coniques",
                  caption: "Taillage et finition d'engrenages spiroconiques",
                },
              ]}
            />
          </div>

          {/* Parametres specifiques */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-accent">0,005 mm</div>
              <div className="text-sm text-muted-foreground">Tolerance sur le profil de dent</div>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-accent">Ra 0,4</div>
              <div className="text-sm text-muted-foreground">Rugosite flanc de dent (um)</div>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-accent">DIN 3965</div>
              <div className="text-sm text-muted-foreground">Norme de qualite engrenages coniques</div>
            </div>
          </div>

          {/* Applications spiroconiques */}
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Applications Spiroconiques"
              items={[
                "Ponts arrieres automobiles (differentiels)",
                "Reducteurs d'helicopteres et turbines",
                "Transmissions de robots industriels",
                "Reducteurs de machines-outils",
                "Engrenages de direction assistee",
                "Treuils et systemes de levage de precision",
              ]}
            />
            <InfoCard
              title="Avantages de la denture spirale"
              items={[
                "Contact progressif = fonctionnement silencieux",
                "Meilleure repartition des charges sur les dents",
                "Capacite de couple superieure a la denture droite",
                "Rendement de transmission eleve (97-99%)",
                "Duree de vie prolongee grace a la rectification",
                "Precision d'engrenement constante dans le temps",
              ]}
            />
          </div>
        </ContentSection>

        {/* Types de rectification */}
        <ContentSection title="Types de Rectification">
          <div className="grid gap-4 sm:grid-cols-2">
            {typesRectification.map((type, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {type.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Videos rectification generale */}
        <ContentSection title="La Rectification en Video">
          <VideoGrid
            videos={[
              {
                videoId: "aBXCJnFmFOI",
                title: "Rectification cylindrique - Principe et fonctionnement",
                caption: "Rectification cylindrique exterieure en action",
              },
              {
                videoId: "NB2bHnj-Wvo",
                title: "Rectification plane sur plateau magnetique",
                caption: "Surfacage de precision sur rectifieuse plane",
              },
            ]}
          />
        </ContentSection>

        {/* Images machines */}
        <ContentSection title="Les Rectifieuses en Images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="/images/rectification-cylindrique.jpg"
              alt="Rectifieuse cylindrique en action avec etincelles et arrosage"
              caption="Rectification cylindrique exterieure - la meule rectifie un arbre de precision"
            />
            <ImageShowcase
              src="/images/rectification-plane.jpg"
              alt="Rectifieuse plane avec plateau magnetique et meule plate"
              caption="Rectification plane - surfacage de precision sur plateau magnetique"
            />
          </div>
        </ContentSection>

        {/* Composants machines */}
        <ContentSection title="Composants des Machines">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Rectifieuse Cylindrique"
              items={composantsCylindrique}
            />
            <InfoCard
              title="Rectifieuse Plane"
              items={composantsPlane}
            />
          </div>
        </ContentSection>

        {/* Abrasifs */}
        <ContentSection title="Types d'Abrasifs et Meules">
          <div className="grid gap-4 sm:grid-cols-2">
            {abrasifs.map((abr) => (
              <InfoCard
                key={abr.title}
                title={abr.title}
                items={abr.items}
              />
            ))}
          </div>

          {/* Designation meule */}
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-4 font-semibold text-foreground">Designation normalisee d{"'"}une meule</h3>
            <div className="mb-4 rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
              Exemple : WA 60 K 5 V
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { code: "WA", desc: "Type d'abrasif (White Alumina = corindon blanc)" },
                { code: "60", desc: "Grosseur du grain (36=gros, 60=moyen, 120=fin)" },
                { code: "K", desc: "Durete du liant (A=tres tendre, Z=tres dur)" },
                { code: "5", desc: "Structure (1=dense, 14=ouverte)" },
                { code: "V", desc: "Type de liant (V=vitrifie, B=resineux, M=metallique)" },
              ].map((item) => (
                <div key={item.code} className="rounded-lg border border-border bg-card p-3">
                  <span className="block font-mono text-lg font-bold text-primary">{item.code}</span>
                  <span className="text-xs leading-snug text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </ContentSection>

        {/* Parametres */}
        <ContentSection title="Parametres de Rectification">
          <div className="grid gap-6 sm:grid-cols-2">
            {parametres.map((param) => (
              <div key={param.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold text-foreground">{param.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{param.content}</p>
                <div className="rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                  {param.formula}
                </div>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Etats de surface */}
        <ContentSection title="Etats de Surface Atteignables">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Qualite</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Ra (um)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Application</th>
                </tr>
              </thead>
              <tbody>
                {etatsurface.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border transition-colors last:border-0 hover:bg-secondary/30"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{row.qualite}</td>
                    <td className="px-4 py-3 font-mono text-primary">{row.ra}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>

        {/* Dressage */}
        <ContentSection title="Dressage de la Meule">
          <InfoCard
            title="Techniques et bonnes pratiques de dressage"
            items={dressage}
          />
        </ContentSection>

        {/* Defauts */}
        <ContentSection title="Defauts Courants et Solutions">
          <div className="grid gap-4 sm:grid-cols-2">
            {defauts.map((defaut) => (
              <InfoCard
                key={defaut.title}
                title={defaut.title}
                items={defaut.items}
              />
            ))}
          </div>
        </ContentSection>

        {/* Securite */}
        <ContentSection title="Securite en Rectification">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              Regles de securite essentielles
            </h3>
            <ul className="flex flex-col gap-3">
              {securiteRectif.map((rule, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-destructive/10 font-mono text-xs font-bold text-destructive">
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </ContentSection>

        {/* Tolerances */}
        <ContentSection title="Tolerances et Capacites">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-primary">0,001 mm</div>
              <div className="text-sm text-muted-foreground">Tolerance dimensionnelle atteignable</div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-primary">Ra 0,025</div>
              <div className="text-sm text-muted-foreground">Rugosite minimale (um)</div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-primary">IT5 - IT6</div>
              <div className="text-sm text-muted-foreground">Classes de tolerance ISO courantes</div>
            </div>
          </div>
        </ContentSection>

        {/* Applications */}
        <ContentSection title="Applications Industrielles">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Automobile & Aeronautique"
              items={[
                "Rectification de vilebrequins et arbres a cames",
                "Portees de roulements et fusees de roues",
                "Aubes de turbines et disques de freins",
                "Soupapes et sieges de soupapes",
                "Pistons hydrauliques de trains d'atterrissage",
              ]}
            />
            <InfoCard
              title="Outillage & Moules"
              items={[
                "Rectification de matrices d'emboutissage",
                "Poincons et contre-poincons de decoupe",
                "Moules d'injection plastique (surfaces miroir)",
                "Outils de coupe (affutage de forets, fraises)",
                "Calibres et jauges de controle dimensionnel",
              ]}
            />
          </div>
        </ContentSection>
      </div>
    </>
  )
}
