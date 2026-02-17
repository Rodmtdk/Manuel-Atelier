import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import { FactStrip, FactCard } from "@/components/fact-card"
import { TableOfContents } from "@/components/table-of-contents"

export const metadata: Metadata = {
  title: "Rectification - Manuel d'Atelier",
  description:
    "Guide complet de la rectification : cylindrique, plane, spiroconique. Meules, abrasifs, paramètres de coupe et défauts courants.",
}

const tocItems = [
  { id: "presentation", label: "Présentation" },
  { id: "images", label: "En images" },
  { id: "types", label: "Types de rectification" },
  { id: "spiroconique", label: "Rectification spiroconique" },
  { id: "composants", label: "Composants des machines" },
  { id: "abrasifs", label: "Abrasifs et meules" },
  { id: "parametres", label: "Paramètres" },
  { id: "etats-surface", label: "États de surface" },
  { id: "dressage", label: "Dressage de la meule" },
  { id: "defauts", label: "Défauts et solutions" },
  { id: "securite-rectif", label: "Sécurité" },
  { id: "tolerances", label: "Tolérances" },
  { id: "applications", label: "Applications" },
]

const composantsCylindrique = [
  "Meule : abrasif lié (corindon, CBN, diamant) qui enlève la matière par abrasion",
  "Poupée porte-meule : entraîne la meule à grande vitesse (1500-3000 tr/min typique)",
  "Poupée porte-pièce : entraîne la pièce en rotation lente et régulière",
  "Contre-pointe : maintient la pièce entre pointes pour la rectification cylindrique",
  "Table longitudinale : déplacement axial de la pièce (avance transversale)",
  "Chariot transversal : règle la profondeur de passe (plongée radiale)",
  "Système de dressage : diamant ou molette pour remettre la meule en forme",
  "Système d'arrosage : lubrification abondante, refroidissement et évacuation des particules",
  "Comparateur / palpeur : contrôle dimensionnel en cours de rectification",
  "Filtre magnétique : récupère les particules métalliques du liquide de coupe",
]

const composantsPlane = [
  "Meule plate : abrasif pour usinage de surfaces planes",
  "Plateau magnétique : maintien de la pièce par magnétisme (matériaux ferreux)",
  "Table longitudinale : déplacement alternatif de la pièce sous la meule",
  "Chariot transversal : avance latérale entre chaque course de la table",
  "Colonne verticale : réglage de la profondeur de passe en descente",
  "Système de dressage : diamant mono-pointe ou molette pour raviver la meule",
  "Bac de récupération : collecte le liquide de coupe et les boues de rectification",
  "Protecteur de meule : capotage obligatoire pour la sécurité",
]

const typesRectification = [
  {
    title: "Rectification cylindrique extérieure",
    desc: "La pièce tourne entre pointes ou en mandrin tandis que la meule rectifie la surface extérieure. Utilisée pour les arbres, les axes, les portées de roulements et les surfaces de révolution de haute précision.",
  },
  {
    title: "Rectification cylindrique intérieure",
    desc: "Une petite meule tourne à grande vitesse à l'intérieur d'un alésage. La pièce est serrée en mandrin et tourne en sens opposé. Indispensable pour les bagues, les douilles et les chemises de cylindres.",
  },
  {
    title: "Rectification plane (surfaçage)",
    desc: "La pièce est fixée sur un plateau magnétique et la meule travaille la surface supérieure. Permet d'obtenir des planéités de l'ordre de 0,002 mm et des états de surface remarquables.",
  },
  {
    title: "Rectification sans centres (centerless)",
    desc: "La pièce est maintenue entre la meule de travail, la meule de régulation et une réglette de support. Idéale pour les grandes séries de pièces cylindriques (axes, goupilles, rouleaux).",
  },
  {
    title: "Rectification de profil",
    desc: "La meule est dressée avec un profil spécifique (rayon, chanfrein, gorge). Permet de rectifier des formes complexes en une seule opération. Utilisée pour les matrices et les outillages.",
  },
  {
    title: "Superfinition / Honage",
    desc: "Procédé de finition ultime avec des pierres abrasives oscillantes. Atteint des Ra inférieurs à 0,1 µm. Essentiel pour les arbres à cames, les vilebrequins et les cylindres hydrauliques.",
  },
]

const abrasifs = [
  {
    title: "Corindon (oxyde d'aluminium - Al₂O₃)",
    items: [
      "Abrasif le plus courant et le plus économique",
      "Variantes : corindon blanc (friable, finition), brun (ébauche), rose (aciers durs)",
      "Idéal pour les aciers doux, mi-durs et les fontes",
      "Vitesse périphérique : 25-35 m/s en conventionnel",
    ],
  },
  {
    title: "Carbure de silicium (SiC)",
    items: [
      "Plus dur mais plus fragile que le corindon",
      "Variante verte pour les carbures de tungstène",
      "Variante noire pour la fonte grise et les matériaux non ferreux",
      "Utilisations : céramiques, verres, matériaux très durs ou très tendres",
    ],
  },
  {
    title: "CBN (nitrure de bore cubique)",
    items: [
      "Deuxième matériau le plus dur après le diamant",
      "Excellente stabilité thermique (pas de réaction avec le fer)",
      "Idéal pour les aciers trempés (>50 HRC), aciers rapides, fontes dures",
      "Vitesse : 30-80 m/s, durée de vie 10 à 100 fois supérieure au corindon",
    ],
  },
  {
    title: "Diamant",
    items: [
      "Matériau le plus dur connu, mais réagit avec le fer à haute température",
      "Réservé aux carbures de tungstène, céramiques, verres, matériaux composites",
      "Meules électro-déposées ou frittées selon l'application",
      "Vitesse : 25-50 m/s, précision de forme exceptionnelle",
    ],
  },
]

const parametres = [
  {
    title: "Vitesse de meule (Vs)",
    content: "Vitesse périphérique de la meule en m/s. Conventionnel : 25-35 m/s. Grande vitesse (HSG) : 60-120 m/s. Un mauvais réglage peut provoquer l'éclatement de la meule.",
    formula: "Vs = (π × Ds × ns) / (1000 × 60)",
  },
  {
    title: "Vitesse de pièce (Vw)",
    content: "Vitesse périphérique de la pièce en m/min. Typiquement 10-30 m/min. Le ratio Vs/Vw influence la qualité de surface et le taux d'enlèvement.",
    formula: "Vw = (π × Dw × nw) / 1000",
  },
  {
    title: "Profondeur de passe (ae)",
    content: "Épaisseur de matière retirée par passe. Ébauche : 0,01-0,05 mm. Finition : 0,002-0,01 mm. Superfinition : 0,001-0,005 mm. Des passes excessives provoquent des brûlures.",
    formula: "ae en mm (typiquement 0,002 à 0,05)",
  },
  {
    title: "Avance transversale (fa)",
    content: "Déplacement latéral de la meule (ou de la table) à chaque révolution de la pièce. Généralement 1/3 à 2/3 de la largeur de la meule. Influe sur l'état de surface.",
    formula: "fa = (1/3 à 2/3) × largeur meule",
  },
]

const defauts = [
  {
    title: "Brûlures de rectification",
    items: [
      "Cause : profondeur de passe excessive, meule bouchée, arrosage insuffisant",
      "Conséquence : zones décolorées (bleu/brun), contraintes de traction, microfissures",
      "Solution : réduire ae, dresser la meule, améliorer l'arrosage",
      "Détection : attaque Nital, test Barkhausen, contrôle visuel",
    ],
  },
  {
    title: "Chattering (vibrations)",
    items: [
      "Cause : déséquilibre de la meule, jeu dans les paliers, résonance",
      "Conséquence : motifs réguliers ondulants sur la surface",
      "Solution : équilibrer la meule, vérifier les roulements, modifier les vitesses",
      "Prévention : dressage soigné, meule bien équilibrée après montage",
    ],
  },
  {
    title: "Chargement de la meule",
    items: [
      "Cause : matériau tendre, meule trop dure, Vc inadaptée",
      "Conséquence : perte de coupe, échauffement, mauvais état de surface",
      "Solution : dresser la meule, choisir un liant plus tendre",
      "Prévention : arrosage adapté, choix de meule correct",
    ],
  },
  {
    title: "Défauts géométriques",
    items: [
      "Cause : alignement machine, dilatation thermique, montage pièce",
      "Conséquence : conicité, ovalisation, erreurs de circularité",
      "Solution : vérifier les alignements, stabiliser la température",
      "Prévention : préchauffage machine, contrôle dimensionnel régulier",
    ],
  },
]

const dressage = [
  "Le dressage (ou diamantage) ravive le pouvoir de coupe de la meule",
  "Diamant mono-pointe : le plus simple, passage en travers de la meule",
  "Molette diamantée : plus rapide, profilés possibles, pour production série",
  "Peigne diamant : compromis entre précision et productivité",
  "Fréquence : après chaque nouveau montage, puis selon besoin (bruit, brûlures)",
  "Profondeur de dressage : 0,01-0,03 mm par passe, avance lente et régulière",
  "Toujours dresser avec arrosage pour protéger le diamant et la meule",
  "Le dressage en finition se fait à avance plus lente pour un meilleur Ra",
]

const securiteRectif = [
  "Vérifier la vitesse maximale marquée sur la meule AVANT montage",
  "Ne jamais dépasser la vitesse périphérique indiquée par le fabricant",
  "Monter les flasques correctement et serrer progressivement",
  "Tester la meule (son de cloche) pour détecter les fissures avant montage",
  "Le protecteur de meule doit couvrir au minimum 180 degrés",
  "Porter des lunettes de protection et un écran facial si nécessaire",
  "L'arrosage doit être actif AVANT le contact meule-pièce",
  "Ne jamais utiliser une meule endommagée, fissurée ou ayant subi un choc",
  "Équilibrer la meule après chaque montage sur son mandrin",
  "Laisser tourner la meule à vide pendant 1 minute après mise en route",
]

const etatsurface = [
  { qualite: "Ébauche", ra: "1,6 - 3,2", application: "Pré-rectification, enlèvement de matière" },
  { qualite: "Semi-finition", ra: "0,4 - 1,6", application: "Portées générales, pièces mécaniques" },
  { qualite: "Finition", ra: "0,1 - 0,4", application: "Portées de roulement, arbres de précision" },
  { qualite: "Superfinition", ra: "0,025 - 0,1", application: "Hydraulique, pneumatique, optique" },
  { qualite: "Poli miroir", ra: "< 0,025", application: "Moules, outillages de précision" },
]

export default function RectificationPage() {
  return (
    <>
      <PageHeader
        badge="Rectification"
        title="Rectification - Usinage de Précision"
        subtitle="Procédé d'usinage par abrasion permettant d'atteindre des tolérances de l'ordre du micromètre et des états de surface exceptionnels. Guide complet des techniques, abrasifs et paramètres."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rectification-B2JCTjKvrTDXxkArwiNcJCkij9deYA.jpeg"
      />

      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-6xl px-4 lg:px-8 xl:mr-64 xl:max-w-5xl">
        {/* Introduction */}
        <ContentSection title="Présentation" id="presentation">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">
              La rectification est un procédé d{"'"}usinage de finition par abrasion.
              Contrairement au tournage et au fraisage qui utilisent des outils à arête
              définie, la rectification fait appel à une meule composée de millions de
              grains abrasifs. Chaque grain agit comme un micro-outil de coupe, permettant
              d{"'"}atteindre des tolérances dimensionnelles de l{"'"}ordre de 0,001 mm et des
              états de surface (Ra) inférieurs à 0,1 µm. C{"'"}est une opération essentielle
              dans la fabrication de pièces de haute précision : roulements, arbres,
              matrices, outillages, pièces aéronautiques et automobiles.
            </p>
          </div>
        </ContentSection>

        {/* Intriguing facts */}
        <FactStrip
          className="my-4"
          facts={[
            {
              fact: "Une meule de rectification tourne à plus de 2 000 tr/min. À sa surface, chaque grain abrasif atteint une vitesse de 30 m/s, soit 108 km/h — l'équivalent d'une voiture sur autoroute frappant le métal.",
              variant: "accent",
            },
            {
              fact: "La rectification permet d'atteindre un Ra de 0,025 µm, soit un poli quasi-miroir. À cette échelle, les irrégularités de surface sont plus petites qu'une bactérie.",
              variant: "default",
            },
            {
              fact: "Le CBN (Nitrure de Bore Cubique) est le 2e matériau le plus dur au monde après le diamant. Il résiste à 1 300 °C sans se dégrader — idéal pour rectifier les aciers trempés.",
              variant: "highlight",
            },
          ]}
        />

        {/* Images rectification */}
        <ContentSection title="La Rectification en Images" id="images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rectification-B2JCTjKvrTDXxkArwiNcJCkij9deYA.jpeg"
              alt="Rectification cylindrique en action avec étincelles"
              caption="Rectification cylindrique extérieure — la meule rectifie un arbre de précision"
              priority
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rectification-cylindrique-CAWVuw4NMmULnZB8Ja9lveDPxQQGY1.webp"
              alt="Rectification cylindrique de précision avec meule et pièce montée entre pointes"
              caption="Rectification cylindrique intérieure — finition d'un alésage de haute précision"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectification%20conventionelle-bfSBkjAng3P6HQAnRDkSRB9GAXgJXc.jpg"
              alt="Rectification conventionnelle avec arrosage sur pièce cylindrique"
              caption="Rectification conventionnelle — arrosage actif et pièce montée en mandrin"
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WIN_20251013_14_04_50_Pro-NqDRhy1U4HMyDjEdV70IITxlC1WmyW.jpg"
              alt="Meule de rectification en action sur machine conventionnelle"
              caption="Meule de rectification plane en fonctionnement"
            />
          </div>
        </ContentSection>

        {/* Types de rectification */}
        <ContentSection title="Types de Rectification" id="types">
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

        {/* ============================================= */}
        {/* RECTIFICATION SPIROCONIQUE - Section majeure */}
        {/* ============================================= */}
        <ContentSection title="Rectification Spiroconique" id="spiroconique">
          {/* Hero image spiroconique */}
          <div className="mb-8">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-image-7F4dkLjnT8Gu3tlBSjjzi3GZiXPvKh.jpg"
              alt="Usinage CNC d'un engrenage spiroconique — meule de précision sur denture spirale"
              caption="Rectification d'un engrenage spiroconique sur machine CNC 5 axes — denture spirale de haute précision"
              aspectRatio="wide"
            />
          </div>

          {/* Description */}
          <div className="mb-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Qu{"'"}est-ce que la rectification spiroconique ?
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              La rectification spiroconique est un procédé de finition de très haute précision
              appliqué aux engrenages coniques à denture spirale (ou engrenages spiroconiques).
              Ces engrenages transmettent le mouvement entre deux arbres perpendiculaires ou
              obliques avec un contact progressif et silencieux. La rectification de leurs flancs
              de dents est essentielle pour garantir la précision de l{"'"}engrènement, réduire le
              bruit et prolonger la durée de vie. Ce procédé est utilisé dans les ponts
              d{"'"}automobiles, les réducteurs industriels, les transmissions d{"'"}hélicoptères et
              les robots de haute précision.
            </p>
          </div>

          {/* Principe et étapes */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Principe de fonctionnement</h3>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                {[
                  "L'engrenage spiroconique est monté sur un axe de précision",
                  "Une meule de forme (coupe ou boisseau) rectifie le flanc de chaque dent",
                  "Le mouvement combiné rotation pièce + déplacement meule reproduit la géométrie spirale",
                  "Les machines modernes utilisent 5 à 6 axes CNC synchronisés",
                  "Le procédé Gleason ou Klingelnberg définit la géométrie de référence",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Étapes de la rectification</h3>
              <div className="flex flex-col gap-3">
                {[
                  { step: "01", text: "Taillage initial de la denture (fraise-mère ou outil Gleason)" },
                  { step: "02", text: "Traitement thermique (cémentation, trempe)" },
                  { step: "03", text: "Montage de la pièce sur la rectifieuse spiroconique" },
                  { step: "04", text: "Réglage des paramètres : angle de spirale, module, pas" },
                  { step: "05", text: "Rectification d'ébauche des flancs de dents" },
                  { step: "06", text: "Rectification de finition pour l'état de surface final" },
                  { step: "07", text: "Contrôle 3D de la portée de denture (Gleason CMM)" },
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

          {/* Paramètres spécifiques */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-accent">0,005 mm</div>
              <div className="text-sm text-muted-foreground">Tolérance sur le profil de dent</div>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-accent">Ra 0,4</div>
              <div className="text-sm text-muted-foreground">Rugosité flanc de dent (µm)</div>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-accent">DIN 3965</div>
              <div className="text-sm text-muted-foreground">Norme de qualité engrenages coniques</div>
            </div>
          </div>

          {/* Applications spiroconiques */}
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Applications Spiroconiques"
              items={[
                "Ponts arrières automobiles (différentiels)",
                "Réducteurs d'hélicoptères et turbines",
                "Transmissions de robots industriels",
                "Réducteurs de machines-outils",
                "Engrenages de direction assistée",
                "Treuils et systèmes de levage de précision",
              ]}
            />
            <InfoCard
              title="Avantages de la denture spirale"
              items={[
                "Contact progressif = fonctionnement silencieux",
                "Meilleure répartition des charges sur les dents",
                "Capacité de couple supérieure à la denture droite",
                "Rendement de transmission élevé (97-99%)",
                "Durée de vie prolongée grâce à la rectification",
                "Précision d'engrènement constante dans le temps",
              ]}
            />
          </div>
        </ContentSection>

        {/* Composants machines */}
        <ContentSection title="Composants des Machines" id="composants">
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
        <ContentSection title="Types d'Abrasifs et Meules" id="abrasifs">
          <div className="grid gap-4 sm:grid-cols-2">
            {abrasifs.map((abr) => (
              <InfoCard
                key={abr.title}
                title={abr.title}
                items={abr.items}
              />
            ))}
          </div>

          {/* Désignation meule */}
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-4 font-semibold text-foreground">Désignation normalisée d{"'"}une meule</h3>
            <div className="mb-4 rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
              Exemple : WA 60 K 5 V
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { code: "WA", desc: "Type d'abrasif (White Alumina = corindon blanc)" },
                { code: "60", desc: "Grosseur du grain (36=gros, 60=moyen, 120=fin)" },
                { code: "K", desc: "Dureté du liant (A=très tendre, Z=très dur)" },
                { code: "5", desc: "Structure (1=dense, 14=ouverte)" },
                { code: "V", desc: "Type de liant (V=vitrifié, B=résineux, M=métallique)" },
              ].map((item) => (
                <div key={item.code} className="rounded-lg border border-border bg-card p-3">
                  <span className="block font-mono text-lg font-bold text-primary">{item.code}</span>
                  <span className="text-xs leading-snug text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </ContentSection>

        {/* Paramètres */}
        <ContentSection title="Paramètres de Rectification" id="parametres">
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

        {/* États de surface */}
        <ContentSection title="États de Surface Atteignables" id="etats-surface">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Qualité</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Ra (µm)
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
        <ContentSection title="Dressage de la Meule" id="dressage">
          <InfoCard
            title="Techniques et bonnes pratiques de dressage"
            items={dressage}
          />
        </ContentSection>

        {/* Défauts */}
        <ContentSection title="Défauts Courants et Solutions" id="defauts">
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

        {/* Sécurité */}
        <ContentSection title="Sécurité en Rectification" id="securite-rectif">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <h3 className="mb-4 font-semibold text-foreground">
              Règles de sécurité essentielles
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

        {/* Tolérances */}
        <ContentSection title="Tolérances et Capacités" id="tolerances">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-primary">0,001 mm</div>
              <div className="text-sm text-muted-foreground">Tolérance dimensionnelle atteignable</div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-primary">Ra 0,025</div>
              <div className="text-sm text-muted-foreground">Rugosité minimale (µm)</div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <div className="mb-2 font-mono text-3xl font-bold text-primary">IT5 - IT6</div>
              <div className="text-sm text-muted-foreground">Classes de tolérance ISO courantes</div>
            </div>
          </div>
        </ContentSection>

        {/* Applications */}
        <ContentSection title="Applications Industrielles" id="applications">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Automobile et Aéronautique"
              items={[
                "Rectification de vilebrequins et arbres à cames",
                "Portées de roulements et fusées de roues",
                "Aubes de turbines et disques de freins",
                "Soupapes et sièges de soupapes",
                "Pistons hydrauliques de trains d'atterrissage",
              ]}
            />
            <InfoCard
              title="Outillage et Moules"
              items={[
                "Rectification de matrices d'emboutissage",
                "Poinçons et contre-poinçons de découpe",
                "Moules d'injection plastique (surfaces miroir)",
                "Outils de coupe (affûtage de forets, fraises)",
                "Calibres et jauges de contrôle dimensionnel",
              ]}
            />
          </div>
        </ContentSection>
      </div>
    </>
  )
}
