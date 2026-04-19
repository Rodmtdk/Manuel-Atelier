import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import { FactCard } from "@/components/fact-card"
import { TableOfContents } from "@/components/table-of-contents"
import { Quiz } from "@/components/quiz"

export const metadata: Metadata = {
  title: "Fraisage Conventionnel - Manuel d'Atelier",
  description:
    "Guide complet du fraisage conventionnel : composants, têtes de fraiseuse, étaux, types de fraises, techniques d'usinage, ébauche et finition.",
}

const tocItemsFraisage = [
  { id: "composants-fraiseuse", label: "Composants" },
  { id: "tetes-fraiseuse", label: "Têtes de fraiseuse" },
  { id: "etaux-fraisage", label: "Étaux" },
  { id: "types-fraises", label: "Types de fraises" },
  { id: "materiaux-outils-fraisage", label: "Matériaux outils" },
  { id: "techniques-fraisage", label: "Techniques" },
  { id: "ebauche-finition-fraisage", label: "Ébauche / Finition" },
  { id: "securite-fraisage", label: "Sécurité" },
  { id: "quiz-fraisage", label: "Quiz" },
]

const quizFraisage = [
  {
    question: "Pourquoi le fraisage en opposition est-il recommandé sur une fraiseuse conventionnelle ?",
    options: ["Il donne un meilleur état de surface", "Il évite le problème du jeu vis-écrou", "Il use moins l'outil", "Il est plus rapide"],
    correctIndex: 1,
    explanation: "Sur une machine conventionnelle avec système vis-écrou (et non vis à bille), le fraisage en concordance (avalant) provoquerait un rattrapage brutal du jeu. L'opposition évite ce problème.",
  },
  {
    question: "Lors du dégauchissage d'un étau, de quel côté ne doit-on jamais déplacer l'étau ?",
    options: ["Du côté de la bride C", "Du côté de la bride B (pivot)", "Du côté opposé à l'opérateur", "Peu importe"],
    correctIndex: 1,
    explanation: "La bride B sert de pivot (centre de rotation). On ne déplace jamais l'étau du côté B ; les ajustements se font du côté C en frappant légèrement au maillet.",
  },
  {
    question: "Quelle est la différence entre une fraise une taille et une fraise deux tailles ?",
    options: ["Le nombre de dents", "Le nombre d'arêtes de coupe actives (1 vs 2 faces)", "La matière de l'outil", "La vitesse de rotation"],
    correctIndex: 1,
    explanation: "Une fraise 1 taille (fraise-scie) ne coupe que sur sa périphérie. Une fraise 2 tailles coupe aussi sur son extrémité, permettant de plonger et de rainurer.",
  },
  {
    question: "Pourquoi incline-t-on légèrement la broche de quelques centièmes en surfaçage ?",
    options: ["Pour augmenter la vitesse de coupe", "Pour éviter que la fraise ne talonne", "Pour améliorer l'évacuation des copeaux", "Pour réduire le bruit"],
    correctIndex: 1,
    explanation: "Si la broche est parfaitement perpendiculaire, le dos des plaquettes peut frotter sur la surface déjà usinée (talonnage), dégradant l'état de surface.",
  },
  {
    question: "En finition, quelle stratégie est recommandée pour l'avance et la vitesse ?",
    options: ["Augmenter l'avance, réduire la vitesse", "Réduire l'avance, augmenter légèrement la vitesse", "Tout au maximum", "Tout au minimum"],
    correctIndex: 1,
    explanation: "En finition, on réduit l'avance (meilleur Ra) et on augmente légèrement la vitesse de rotation pour un état de surface optimal.",
  },
]

const composants = [
  "Table de travail : supporte la pièce, déplaçable en X, Y, et Z",
  "Porte-outil (pince ou mandrin porte-fraise) : maintient l'outil de coupe fermement",
  "Manivelles manuelles : contrôle précis des mouvements de la table",
  "Broche : rotation de l'outil, vitesses ajustables",
  "Tête de fraiseuse : renvoi d'angle horizontal/vertical (types Huron, Dufour, Gambin)",
  "Système de lubrification : réduit la chaleur, prolonge la durée de vie",
  "Échelles de mesure et tambours gradués : déplacements de précision",
  "Protecteurs de sécurité : protection contre éclats et copeaux",
  "Variateur de vitesse : ajustement selon matériau et outil",
  "Système vis-écrou : déplacements de la table (attention au jeu fonctionnel)",
]

const typesEtaux = [
  {
    title: "Étau standard",
    desc: "Étau de fraisage à base fixe, serrage mécanique par vis-écrou. Le plus courant pour les opérations générales. Bridage en 4 points à l'extérieur pour rigidité maximale.",
  },
  {
    title: "Étau à base rotative",
    desc: "Possède une base pivotante graduée en degrés, permettant d'orienter la pièce à l'angle désiré. Le réglage précis se fait au comparateur.",
  },
  {
    title: "Étau à serrages multiples",
    desc: "Permet de serrer plusieurs pièces simultanément pour la production en série. Gain de temps considérable pour les petites séries.",
  },
  {
    title: "Étaux modulables",
    desc: "Systèmes de serrage modulaires adaptables à différentes formes et tailles de pièces. Utilisent des mors spéciaux pour pièces cylindriques ou obliques.",
  },
]

const degauchissageEtau = [
  "Serrer moyennement la bride B (pivot), puis légèrement la bride C",
  "Mettre le comparateur à 0 du côté B",
  "Se déplacer vers C et ajuster l'étau en frappant légèrement au maillet",
  "Revenir vers B, contrôler, recommencer tant que l'écart dépasse 0,01 mm",
  "Serrer tous les points de bridage, puis contrôler à nouveau l'alignement",
  "Ne jamais déplacer l'étau du côté B (centre de rotation)",
]

const typesFreises = [
  {
    title: "Fraises une taille (fraise-scie)",
    desc: "Une seule arête de coupe. Utilisée pour le tronçonnage, rainures étroites ou ébauche de dentures. Diamètre de 20 à 315 mm, faible épaisseur.",
  },
  {
    title: "Fraises deux tailles",
    desc: "Usinage sur l'extrémité et les côtés. Existent en 2 dents (bonne évacuation copeaux) ou multidents (meilleure finition). Certaines ont une coupe au centre permettant de plonger dans la matière.",
  },
  {
    title: "Fraises trois tailles",
    desc: "Trois arêtes de coupe limitant la flexion. Rainurage avec forte avance. Denture alternée sur les faces latérales.",
  },
  {
    title: "Fraises à surfacer",
    desc: "Profondeur de passe limitée par la longueur d'arête des plaquettes. Diamètres de 32 à 630 mm. Idéales pour le surfaçage de grandes surfaces.",
  },
  {
    title: "Fraises à surfacer-dresser",
    desc: "Deux tailles dont une parallèle à l'axe de l'outil. Polyvalentes : dressage, rainurage et surfaçage en une seule fraise.",
  },
  {
    title: "Fraises de forme",
    desc: "Reproduisent sur la surface la forme de la génératrice de la fraise : fraises boule à plaquettes, à chanfreiner, à rayon, à vé...",
  },
]

const techniques = [
  {
    title: "Fraisage en opposition",
    desc: "Le mouvement d'avance (Mf) et le mouvement de coupe (Mc) sont de sens contraire dans la zone fraisée. L'épaisseur du copeau est faible à l'attaque puis maximale en fin de trajectoire. Fortement recommandé sur machines conventionnelles non équipées de vis à bille.",
  },
  {
    title: "Fraisage en avalant (concordance)",
    desc: "Mf et Mc sont dans le même sens. Le copeau est maximal à l'attaque puis diminue. Meilleur état de surface et moins d'usure de l'outil, mais attention au jeu vis-écrou ! À utiliser en finition sur machine conventionnelle, ou systématiquement sur CNC (vis à bille).",
  },
  {
    title: "Fraisage en bout (surfaçage)",
    desc: "Crée des surfaces planes. L'outil travaille avec ses faces frontales. Le plus efficace quand c'est possible. Incliner légèrement la broche de quelques centièmes pour éviter que la fraise ne talonne.",
  },
  {
    title: "Fraisage de rainure",
    desc: "Utilisez des fraises adaptées à la largeur de la rainure et effectuez plusieurs passes légères pour des profondeurs importantes.",
  },
  {
    title: "Fraisage hélicoïdal",
    desc: "Pour percer des trous de grand diamètre ou usiner des vis sans fin. Synchronisez l'avance linéaire avec la rotation.",
  },
  {
    title: "Fraisage de forme",
    desc: "Pour des profils complexes, utilisez des fraises profilées et réalisez une pré-finition avant la passe finale.",
  },
  {
    title: "Fraisage en T",
    desc: "Usinage pour rainures en T, couramment utilisées dans les glissières. Dégagez régulièrement les copeaux.",
  },
  {
    title: "Fraisage de chanfrein",
    desc: "Fraises à chanfreiner pour ébavurer ou créer des bords inclinés. Réglez précisément l'angle selon les spécifications.",
  },
  {
    title: "Fraisage en queue d'aronde",
    desc: "Technique avancée pour assemblages mécaniques résistants. Utilisez une fraise spécifique pour un résultat précis et durable.",
  },
  {
    title: "Fraisage en contournage",
    desc: "Pour suivre des profils complexes avec précision. Adaptez la vitesse d'avance pour éviter les déformations.",
  },
]

const materiauxOutils = [
  {
    title: "Acier rapide (HSS)",
    desc: "Peu coûteux, nombreuses formes disponibles. Capacité de découpe limitée : ne coupe pas les aciers trop durs, mais très pratique pour aciers doux et aluminium.",
  },
  {
    title: "Acier rapide au cobalt",
    desc: "Dureté supérieure au HSS classique mais plus fragile (éviter les chocs). Meilleure résistance à l'usure grâce au cobalt. Aspect visuel très proche du HSS.",
  },
  {
    title: "Carbure",
    desc: "Augmentation importante de dureté et résistance. Montage rigide et vitesses de coupe appropriées indispensables. Supporte mieux la chaleur, idéal pour grandes cadences.",
  },
  {
    title: "Outils revêtus (TiN, TiAlN...)",
    desc: "Corps HSS avec partie tranchante revêtue de carbure ou titane. Le revêtement en nitrure de titane (TiN) est le plus répandu et permet des vitesses de coupe plus élevées.",
  },
]

const ebaucheFinition = {
  ebauche: [
    "Machine puissante et robuste avec appareillage rigide",
    "Serrages conséquents, porte-à-faux réduit",
    "Outils à grosse denture ou denture brise-copeaux",
    "Vitesse de rotation moyenne, grande vitesse d'avance",
    "Lubrifiant recommandé pour prolonger la durée de vie de l'outil",
    "Tracer la pièce à quelques mm des cotes pour faciliter l'ébauche",
  ],
  finition: [
    "Augmenter légèrement la vitesse de rotation et diminuer l'avance",
    "Appuis précis, serrages plus modérés (faibles efforts de coupe)",
    "Outil de finition adapté (denture droite ou hélicoïdale fine)",
    "Faire les deux dernières passes identiques pour meilleur résultat",
    "En roulant : finition en avalant pour meilleur état de surface",
    "Travailler en lubrifiant pour un Ra optimal",
  ],
}

export default function FraisageConvPage() {
  return (
    <>
      <PageHeader
        badge="Fraisage"
        title="Fraisage Conventionnel"
        subtitle="Procédé d'usinage par enlèvement de matière utilisant des fraiseuses manuelles. L'outil tourne pour enlever la matière selon les axes X, Y et Z."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage%20conventionnel-aYsSJcdqvA32L4XzZIhn0zgibJa9JN.jpg"
      />

      <TableOfContents items={tocItemsFraisage} />
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <ContentSection title="Présentation">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">
              Le fraisage conventionnel est un procédé d{"'"}usinage par enlèvement de
              matière utilisant des fraiseuses manuelles. L{"'"}outil, généralement une
              fraise, tourne pour enlever la matière de la pièce selon les axes X, Y
              et Z. Ce procédé est souvent utilisé pour la fabrication de prototypes,
              de petites séries et dans les environnements éducatifs.
            </p>
          </div>
        </ContentSection>

        {/* Visual section */}
        <ContentSection title="Le Fraisage en Images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage%20conv-tubZTGEt01gknbdEw46e5E2wB02vyw.jpg"
              alt="Surfacage avec fraise a plaquettes sur bloc aluminium"
              caption="Surfacage avec fraise a plaquettes — copeaux en projection"
              priority
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-conv-hQ6MZQwEpYMaXRitgcZN6oyAZnH21I.jpg"
              alt="Fraisage conventionnel avec lubrification sur pièce d'engrenage"
              caption="Lubrification active lors du fraisage d'un engrenage"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils%20de%20coupe-6xtY6IzC6x82AchgZdgfHVto6qh6RZ.jpg"
              alt="Collection d'outils de coupe professionnels à plaquettes"
              caption="Outils à plaquettes interchangeables"
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foret%20et%20fraise%20carbure%20monobloc-haexBcTrZNdEQ8XWQQbX2lujVqasnt.jpg"
              alt="Forets et fraises carbure monobloc"
              caption="Forets et fraises carbure monobloc"
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cutting-DoKGVvDxuVBZOSn3g5WWeeHkhQN40G.jpg"
              alt="Plaquettes carbure pour outils de coupe"
              caption="Plaquettes de coupe — géométries variées"
            />
          </div>
        </ContentSection>

        {/* Intriguing fact */}
        <FactCard
          fact="La fraiseuse Bridgeport, créée en 1938 aux États-Unis, est devenue la référence mondiale des fraiseuses conventionnelles. Pesant environ 900 kg, sa tête orientable a révolutionné l'usinage en permettant des inclinaisons impossibles à obtenir autrement. Elle reste une machine emblématique dans les ateliers du monde entier."
          variant="highlight"
          className="mb-8"
        />

        <ContentSection title="Composants d'une Fraiseuse Conventionnelle" id="composants-fraiseuse">
          <InfoCard title="Éléments de la machine" items={composants} />
        </ContentSection>

        {/* Têtes de fraiseuse */}
        <ContentSection title="Les Têtes de Fraiseuse" id="tetes-fraiseuse">
          <div className="mb-4 rounded-xl border border-border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">
              La tête de fraiseuse comporte un renvoi d{"'"}angle qui permet de passer du fraisage horizontal au fraisage vertical. De la qualité de son réglage dépendra la qualité finale de la pièce. Il faut toujours contrôler la précision du réglage de la tête en arrivant sur une machine inconnue.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Tête Huron", desc: "Réglage par abaque du constructeur. Attention : toujours utiliser l'angle complémentaire à l'angle voulu (ex : pour 33 degrés, chercher 67 degrés sur l'abaque)." },
              { title: "Tête Dufour", desc: "Réglage en deux étapes obligatoires : d'abord le porte-fraise, puis le renvoi d'angle. Attention au basculement lors du desserrage." },
              { title: "Tête Gambin", desc: "Même principe que Dufour, mais sans ordre précis de réglage." },
            ].map((tete) => (
              <div key={tete.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-semibold text-foreground">{tete.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tete.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-semibold text-foreground">Réglage au comparateur</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fixer le comparateur dans la broche, desserrer légèrement toutes les vis de la tête, positionner le comparateur juste sous l{"'"}axe de rotation et le régler sur 0. Mesurer l{"'"}autre côté et faire pivoter la tête jusqu{"'"}au 0. Pour le surfaçage, incliner la broche de quelques centièmes pour éviter que la fraise ne talonne.
            </p>
          </div>
        </ContentSection>

        {/* Étaux */}
        <ContentSection title="Les Étaux de Fraisage" id="etaux-fraisage">
          <div className="grid gap-4 sm:grid-cols-2">
            {typesEtaux.map((etau) => (
              <div key={etau.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{etau.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{etau.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Dégauchissage d{"'"}un Étau</h3>
              <div className="flex flex-col gap-3">
                {degauchissageEtau.map((etape, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{etape}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold text-foreground">Règles de serrage en étau</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Le serrage ne doit pas être excessif (risque de déformer et marquer la pièce)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Toujours serrer avec la même pression, surtout pour les séries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Diriger les efforts d{"'"}usinage vers le mors fixe (élément le plus rigide)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Contrôler le fond de l{"'"}étau avant dégauchissage (pas de copeaux entre étau et table)
                  </li>
                </ul>
              </div>
              <FactCard
                fact="Un étau se dégauchit en moins de dix minutes. Le bridage en 4 points à l'extérieur est le plus efficace. Ça ne sert à rien de serrer avec un tube ou une rallonge !"
                variant="default"
              />
            </div>
          </div>
        </ContentSection>

        {/* Types de fraises */}
        <ContentSection title="Types de Fraises selon leur Usage" id="types-fraises">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {typesFreises.map((fraise) => (
              <div key={fraise.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{fraise.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{fraise.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Matériaux outils */}
        <ContentSection title="Matériaux des Outils de Fraisage" id="materiaux-outils-fraisage">
          <div className="grid gap-4 sm:grid-cols-2">
            {materiauxOutils.map((mat) => (
              <div key={mat.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{mat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{mat.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Techniques de Fraisage" id="techniques-fraisage">
          <div className="grid gap-4 sm:grid-cols-2">
            {techniques.map((tech, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {tech.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Mise en position diagram */}
        <ContentSection title="Mise en Position (MIP)">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.jpg-lXAUx3kv4pVWy3yACM3GtT4ZJQDQFd.png"
              alt="Schéma de mise en position isostatique — appuis et serrages"
              caption="Principe de mise en position isostatique : 6 degrés de liberté bloqués par les appuis"
              aspectRatio="square"
            />
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold text-foreground">Principe isostatique</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Toute pièce dans l{"'"}espace possède 6 degrés de liberté (3 translations + 3 rotations). La mise en position consiste à éliminer ces 6 degrés à l{"'"}aide d{"'"}appuis ponctuels : 3 appuis sur le plan principal, 2 sur le plan secondaire, 1 sur le plan tertiaire.
                </p>
              </div>
              <FactCard
                fact="Le principe isostatique date du XIXe siècle et reste la base de tout montage d'usinage. Sans lui, impossible de garantir la répétabilité des opérations sur des séries de pièces."
                variant="default"
              />
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Paramètres Cruciaux">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Vitesse de Coupe (Vc)</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Dépend du matériau et de l{"'"}outil. Calculée avec la formule :
              </p>
              <div className="rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                Vc = (Pi x D x n) / 1000
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                D = diamètre de la fraise, n = vitesse de rotation (tr/min)
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Avance par dent (fz)</h3>
              <p className="text-sm text-muted-foreground">
                Distance parcourue par dent de fraise à chaque rotation. Une avance
                excessive entraîne des vibrations, une avance trop faible use
                prématurément l{"'"}outil.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Profondeur de Passe (ap)</h3>
              <p className="text-sm text-muted-foreground">
                Épaisseur de matière retirée par passe. Pour les matériaux durs, limitez
                à 0,1-0,3 mm. Équilibrez rapidité et qualité.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Largeur de Passe (ae)</h3>
              <p className="text-sm text-muted-foreground">
                Engagement radial essentiel pour maintenir la stabilité de l{"'"}usinage
                et prolonger la durée de vie des outils.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Ébauche et finition */}
        <ContentSection title="Ébauche, Semi-finition et Finition" id="ebauche-finition-fraisage">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Ébauche</h3>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  L{"'"}ébauche consiste à enlever le plus gros de la matière en un temps réduit. Elle sert à éliminer la croûte superficielle et les fortes surépaisseurs d{"'"}usinage.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {ebaucheFinition.ebauche.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Finition</h3>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  La finition sert à respecter les spécifications du dessin de définition. La finition extérieure est le gage de qualité d{"'"}un usinage et, souvent, de l{"'"}opérateur lui-même.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {ebaucheFinition.finition.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-semibold text-foreground">La Lubrification</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Le lubrifiant (liquide réfrigérant) assure 3 fonctions : <strong className="text-foreground">refroidir l{"'"}arête de l{"'"}outil</strong> (30% de la chaleur se concentre à cet endroit), <strong className="text-foreground">lubrifier le tranchant</strong> (moins de frottement = moins de chaleur), et <strong className="text-foreground">évacuer les copeaux</strong> (meilleure finition). L{"'"}huile de coupe doit être correctement dosée pour éviter l{"'"}oxydation.
            </p>
          </div>
        </ContentSection>

        <ContentSection title="Applications Pratiques">
          <InfoCard
            title="Utilisations courantes"
            items={[
              "Fabrication de pièces mécaniques uniques",
              "Petites séries pour l'industrie",
              "Formation dans les ateliers pédagogiques",
              "Réparations rapides et ajustements personnalisés",
              "Création de pièces artistiques ou prototypes en bois et métal",
              "Restauration ou modification de pièces existantes",
            ]}
          />
        </ContentSection>

        <ContentSection title="Bonnes Pratiques et Sécurité" id="securite-fraisage">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Sécurité machine"
              items={[
                "Fermer les carters avant toute mise en route",
                "Ne pas s'approcher à moins de 50 cm d'un outil en rotation",
                "Ne pas laisser pendre les manches du bleu de travail",
                "Cheveux longs attachés et dans le col",
                "Ne pas mettre la broche en rotation si l'outil est mal fixé",
                "La fraise avale tout ce qui n'est pas fermement bridé (pièces, chiffons, doigts...)",
              ]}
            />
            <InfoCard
              title="Équipements de Protection (EPI)"
              items={[
                "Port obligatoire de lunettes de protection",
                "Gants adaptés pour manipuler les outils (hors fonctionnement)",
                "Vêtements ajustés pour éviter les accrochages",
                "Bouchons d'oreilles contre le bruit",
                "Chaussures de sécurité contre les chutes d'objets",
              ]}
            />
          </div>
        </ContentSection>

        {/* Quiz */}
        <ContentSection title="Testez vos Connaissances" id="quiz-fraisage">
          <Quiz
            title="Quiz - Fraisage Conventionnel"
            questions={quizFraisage}
          />
        </ContentSection>
      </div>
    </>
  )
}
