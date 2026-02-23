import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import { FactCard } from "@/components/fact-card"
import { TableOfContents } from "@/components/table-of-contents"
import { Quiz } from "@/components/quiz"

export const metadata: Metadata = {
  title: "Tournage Conventionnel - Manuel d'Atelier",
  description:
    "Guide complet du tournage conventionnel : composants du tour, techniques, montages, mandrins, mors, outils et contrôle qualité.",
}

const tocItems = [
  { id: "images", label: "Le tournage en images" },
  { id: "composants", label: "Composants du tour" },
  { id: "utilisation", label: "Comment utiliser un tour" },
  { id: "techniques", label: "Techniques courantes" },
  { id: "montages", label: "Types de montages" },
  { id: "mandrins-et-mors", label: "Mandrins et mors" },
  { id: "classification-outils", label: "Classification des outils" },
  { id: "materiaux-outils", label: "Matériaux des outils" },
  { id: "ebauche-finition", label: "Ébauche et finition" },
  { id: "realiser-epaulement", label: "Épaulement" },
  { id: "diagnostic", label: "Diagnostic problèmes" },
  { id: "cones", label: "Pièces coniques" },
  { id: "controle", label: "Contrôle qualité" },
  { id: "materiaux", label: "Adaptation matériaux" },
  { id: "quiz-tournage", label: "Quiz" },
]

const quizTournage = [
  {
    question: "Quel type de montage est recommandé quand la longueur de la pièce dépasse 2 fois son diamètre ?",
    options: ["Montage en l'air", "Montage mixte (mandrin + contre-pointe)", "Montage en pince", "Montage sur plateau"],
    correctIndex: 1,
    explanation: "Quand la longueur dépasse 2× le diamètre, le porte-à-faux est trop important en montage en l'air. Le montage mixte ajoute le soutien de la contre-pointe.",
  },
  {
    question: "Quelle est la différence principale entre mors durs et mors doux ?",
    options: ["Les mors durs sont en aluminium", "Les mors doux ont une meilleure concentricité (0,05 mm vs 0,2 mm)", "Les mors durs permettent de réaléser", "Les mors doux laissent des empreintes"],
    correctIndex: 1,
    explanation: "Les mors doux, usinables, permettent d'être réalésés pour chaque pièce, offrant une concentricité de 0,05 mm contre 0,2 mm pour les mors durs (acier trempé).",
  },
  {
    question: "Que doit-on TOUJOURS faire avant de mettre le tour en marche ?",
    options: ["Vérifier la vitesse de broche", "Retirer la clef du mandrin", "Mettre les lunettes de protection", "Les trois à la fois"],
    correctIndex: 3,
    explanation: "Les trois sont indispensables ! Mais le retrait de la clef du mandrin est critique car une clef oubliée peut être éjectée violemment à la mise en route.",
  },
  {
    question: "En ébauche, quelle stratégie adopter pour la vitesse ?",
    options: ["Vitesse de rotation élevée, faible avance", "Vitesse de rotation moyenne, grande avance", "Vitesse de rotation faible, faible avance", "Vitesse maximale pour tout"],
    correctIndex: 1,
    explanation: "En ébauche, on privilégie une vitesse de rotation moyenne avec une grande avance pour enlever un maximum de matière rapidement.",
  },
  {
    question: "Pour réaliser un épaulement extérieur, quel est l'outil idéal ?",
    options: ["Outil à tronçonner", "Outil à charioter/dresser", "Outil à aléser", "Outil à fileter"],
    correctIndex: 1,
    explanation: "L'outil à charioter/dresser combine les deux opérations nécessaires : le chariotage du diamètre et le dressage de la face plane.",
  },
  {
    question: "Quelle formule permet de calculer l'angle d'un cône ?",
    options: ["tan(α) = (D + d) / L", "tan(α) = (D - d) / (2L)", "tan(α) = D / (2d)", "tan(α) = L / (D - d)"],
    correctIndex: 1,
    explanation: "La formule tan(α) = (D - d) / (2L) utilise la différence entre le grand diamètre D et le petit d, divisée par 2 fois la longueur du cône.",
  },
]

const composants = [
  "Mandrin : maintient fermement la pièce à usiner",
  "Broche : fournit la rotation de la pièce",
  "Chariot transversal : déplacement perpendiculaire à l'axe",
  "Chariot longitudinal : déplacement parallèle à l'axe",
  "Contre-pointe : soutient les longues pièces",
  "Boîte de vitesse : ajuste la vitesse de rotation",
  "Boîte d'avance : contrôle la vitesse d'avance",
  "Volants : déplacement manuel des chariots",
]

const etapesUtilisation = [
  "Préparation : vérifier la propreté, la lubrification et l'état des outils",
  "Installation de la pièce : fixation dans le mandrin et alignement correct",
  "Choix de l'outil : adapté à l'opération (dressage, alésage, filetage...)",
  "Réglage des paramètres : vitesse, avance et profondeur selon le matériau",
  "Usinage : déplacement des chariots avec précaution",
  "Contrôle : vérification régulière des dimensions",
]

const techniquesCourantes = [
  {
    title: "Dressage",
    desc: "Usinage d'une surface plane perpendiculaire à l'axe de la pièce.",
  },
  {
    title: "Cylindrage",
    desc: "Réduction uniforme du diamètre extérieur de la pièce.",
  },
  {
    title: "Alésage",
    desc: "Agrandissement ou création de trous cylindriques.",
  },
  {
    title: "Filetage",
    desc: "Création de filets sur surface extérieure ou intérieure.",
  },
  {
    title: "Rainurage",
    desc: "Usinage de rainures ou gorges pour applications spécifiques.",
  },
  {
    title: "Chanfreinage",
    desc: "Création de bords inclinés pour assemblage ou sécurité.",
  },
]

const methodesCone = [
  "Inclinaison du Petit Chariot : idéal pour petits cônes avec angle précis",
  "Décalage de la Contre-Pointe : adapté aux cônes de grande longueur",
  "Outil Forme : utilisé pour cônes avec angles fixes",
  "Copieur : reproduire des profils coniques complexes",
]

const typesMontages = [
  {
    title: "Montage en l'air",
    desc: "Le plus utilisé. La pièce est maintenue par le mandrin à une seule extrémité. Le porte-à-faux ne doit pas dépasser 2 fois le diamètre de la pièce.",
    coaxialite: "0,2 mm (mors durs) / 0,05 mm (mors doux)",
  },
  {
    title: "Montage mixte",
    desc: "Pièce serrée en mandrin + soutenue par la contre-pointe. Nécessaire quand la longueur dépasse le double du diamètre.",
    coaxialite: "0,01 mm",
  },
  {
    title: "Montage entre pointes",
    desc: "Pièce centrée entre pointe fixe et pointe tournante, entraînée par un toc et un plateau pousse-toc. Concentricité maximale.",
    coaxialite: "0,01 mm",
  },
  {
    title: "Montage en pince",
    desc: "Pour petites pièces ou barres calibrées (cylindres, carrés, hexagones). Concentricité précise pour reprises d'usinage. Serrage par déformation de la pince fendue.",
    coaxialite: "0,01 mm (mandrin expansible)",
  },
  {
    title: "Montage en lunette fixe",
    desc: "Bridée sur le banc du tour. Donne de la rigidité pour les usinages trop éloignés du mandrin : dressage de face, perçage, alésage.",
    coaxialite: "Dépend du réglage",
  },
  {
    title: "Montage en lunette à suivre",
    desc: "Vissée sur le chariot, elle accompagne les mouvements longitudinaux de l'outil. Idéale pour les pièces longues et flexibles.",
    coaxialite: "Dépend du réglage",
  },
]

const outilsUsinage = [
  {
    categorie: "Usinages extérieurs",
    outils: [
      "Outil à charioter : ébauche ou finition des diamètres extérieurs",
      "Outil à dresser (45 degrés) : dressage des faces et chanfreins",
      "Outil à saigner (rainurer) : gorges et rainures",
      "Outil à tronçonner : découpe des pièces après usinage (lame 2-3 mm d'épaisseur min.)",
    ],
  },
  {
    categorie: "Usinages intérieurs",
    outils: [
      "Outil à aléser : chariotage, dressage et alésage intérieurs",
      "Outil à chambrer : évidements intérieurs",
      "Foret à queue conique : gros efforts sur le corps de l'outil",
      "Foret à plaquettes : grandes vitesses d'avance, arrosage au centre",
    ],
  },
  {
    categorie: "Outils spéciaux",
    outils: [
      "Outil à fileter : filetages extérieurs ou intérieurs (plaquettes multidents)",
      "Outil à moleter : impression de surfaces striées (refoulement, pas de 0,3 à 3 mm)",
      "Outil de forme (barreau ARS) : rayons concaves/convexes, formes à moindre coût",
      "Outil à carotter : récupération d'une partie de la pièce usinée",
    ],
  },
]

const materiauxOutils = [
  {
    title: "Acier rapide (HSS)",
    desc: "Peu coûteux, nombreuses formes. Ne coupe pas les aciers trop durs, pratique pour aciers doux et aluminium.",
  },
  {
    title: "Carbure brasé",
    desc: "Plaquette carbure brasée sur corps acier. Finition de longs alésages ou états de surface spécifiques (on peut l'affûter).",
  },
  {
    title: "Plaquettes carbure",
    desc: "Agglomérés de cobalt et carbures (tungstène, tantale, titane). Conservent leur dureté jusqu'à 1000 °C. Outils de base en tournage.",
  },
  {
    title: "Plaquettes céramique",
    desc: "Oxyde d'aluminium et chrome. Dureté comparable au carbure, résistant jusqu'à 1200 °C. Vitesses de coupe très élevées, même sur aciers durs.",
  },
  {
    title: "Plaquettes diamant (PCD)",
    desc: "Cristal fixé sur corps carbure. Usinage à très grande vitesse et finition de haute précision. Coût élevé mais évite la rectification. Supporte mal les chocs.",
  },
]

const problemesRemedes = [
  { probleme: "Pièce tourne rond aux mors, pas à l'extrémité", remede: "En mors doux : réaléser. En mors durs : dégauchir au comparateur (maillet)" },
  { probleme: "Vibration de la pièce", remede: "Réduire la fréquence de rotation, augmenter les avances si la prise de mors le permet" },
  { probleme: "Flexion sur les pièces de faible diamètre", remede: "Limiter les efforts de coupe, outil bien affûté" },
  { probleme: "Le tour fait du cône", remede: "Si pas dû à la flexion, régler la broche du tour" },
]

const ebaucheFinitionTour = {
  ebauche: [
    "Enlever le plus gros de la matière en un temps réduit",
    "Vitesse de rotation moyenne, grande vitesse d'avance",
    "Machine puissante, appareillage rigide, porte-à-faux réduit",
    "Éliminer la croûte superficielle liée au brut",
    "Lubrifier pour prolonger la durée de vie de l'outil",
  ],
  finition: [
    "Augmenter légèrement la vitesse de rotation, diminuer l'avance",
    "Appuis précis, serrages modérés (faibles efforts de coupe)",
    "Outil de finition adapté au matériau",
    "Les deux dernières passes doivent être identiques",
    "Le lubrifiant assure : refroidissement (30% chaleur à l'arête), lubrification du tranchant, évacuation des copeaux",
  ],
}

export default function TournageConvPage() {
  return (
    <>
      <PageHeader
        badge="Tournage"
        title="Tournage Conventionnel"
        subtitle="Méthode d'usinage traditionnelle utilisant des tours manuels. La pièce tourne tandis que l'outil de coupe enlève la matière."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv1-AeqQSvQl5OISTypBxTtimDtx2X231w.jpg"
      />

      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-6xl px-4 lg:px-8 xl:mr-64 xl:max-w-5xl">
        {/* Visual hero */}
        <ContentSection title="Le Tournage en Images" id="images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv1-AeqQSvQl5OISTypBxTtimDtx2X231w.jpg"
              alt="Tournage conventionnel en action avec copeaux métalliques"
              caption="Copeaux en vol lors d'une opération de chariotage"
              priority
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv.jpg-tIcIx0K8YwE4Xd2sM51NjYPfH6LN8F.webp"
              alt="Tour conventionnel avec pièce conique en usinage"
              caption="Tour parallèle en fonctionnement — arrosage actif"
            />
          </div>
          <div className="mt-4">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0348-bis-e1704459718413-ZuGzjauqHOaGt8qeFFquJ4PSDbguZE.jpg"
              alt="Tour CNC en action sur pièce complexe avec arrosage"
              caption="Usinage d'un vilebrequin — précision et complexité des formes"
              aspectRatio="wide"
            />
          </div>
        </ContentSection>

        {/* Fact */}
        <FactCard
          fact="Le tour parallèle est la plus ancienne machine-outil. Son ancêtre, le tour à perche, existait déjà en Égypte antique il y a 3 300 ans. Le principe fondamental n'a pas changé : la pièce tourne, l'outil coupe."
          variant="highlight"
          className="mb-4"
        />

        <ContentSection title="Composants d'un Tour Conventionnel" id="composants">
          <InfoCard title="Éléments de la machine" items={composants} />
        </ContentSection>

        <ContentSection title="Comment Utiliser un Tour" id="utilisation">
          <div className="grid gap-3">
            {etapesUtilisation.map((etape, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{etape}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Techniques Courantes" id="techniques">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techniquesCourantes.map((tech, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <h3 className="mb-2 font-semibold text-foreground">{tech.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Turning tools diagram */}
        <ContentSection title="Outils de Tournage - Classification DIN">
          <ImageShowcase
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils-tournage.jpg-7RVclx58YOJwm1RdyGf4z3lvPmI1NU.png"
            alt="Schéma complet des outils de tournage selon les normes DIN — différentes géométries et applications"
            caption="Classification DIN des outils de tournage : chaque outil correspond à une opération spécifique (dressage, chariotage, alésage, filetage, tronçonnage...)"
            aspectRatio="wide"
          />
        </ContentSection>

        {/* Types de montages */}
        <ContentSection title="Types de Montages en Tournage" id="montages">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {typesMontages.map((montage) => (
              <div key={montage.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{montage.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{montage.desc}</p>
                <div className="rounded-lg bg-secondary px-3 py-2">
                  <span className="text-xs text-muted-foreground">Coaxialité : </span>
                  <span className="text-xs font-semibold text-primary">{montage.coaxialite}</span>
                </div>
              </div>
            ))}
          </div>
          <FactCard
            fact="Plus un mandrin a de mors, plus les efforts de serrage seront divisés sur la circonférence de la pièce. Cela se traduit par moins de déformation : le mandrin 6 mors est idéal pour les pièces à parois minces."
            variant="default"
            className="mt-4"
          />
        </ContentSection>

        {/* Mandrins et mors */}
        <ContentSection title="Mandrins et Mors" id="mandrins-et-mors">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Types de Mandrins</h3>
              <div className="flex flex-col gap-3">
                {[
                  { mors: "Mandrin 2 mors", desc: "Usinages spécifiques : brut de fonderie, pièces prismatiques, excentriques" },
                  { mors: "Mandrin 3 mors (le plus courant)", desc: "Mors dépendants (auto-centrant). Utilisation en mors durs ou mors doux" },
                  { mors: "Mandrin 4 mors indépendants", desc: "Usinages désaxés : alésage désaxé, came, vilebrequin, pièces cubiques" },
                  { mors: "Mandrin 4 mors mixte", desc: "Mors à la fois indépendants et concentriques. Idéal pour les séries" },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4">
                    <h4 className="mb-1 text-sm font-semibold text-foreground">{m.mors}</h4>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Types de Mors</h3>
              <div className="flex flex-col gap-3">
                {[
                  { mors: "Mors durs (acier trempé)", desc: "Ne pas usiner, rectifiés. Concentricité 0,2 mm max. Surfaces striées pour bonne prise. Laissent des empreintes sur la pièce." },
                  { mors: "Mors doux (acier doux ou alu)", desc: "Facilement usinables, bien meilleure concentricité (0,05 mm). Peuvent être réalésés pour chaque pièce." },
                  { mors: "Mors enveloppants", desc: "Alu ou acier doux, pour serrer des pièces fines sans déformation. Enveloppent la quasi-totalité de la pièce." },
                  { mors: "Mors monobloc vs rapportés", desc: "Monobloc : plus rigides mais coûteux. Rapportés sur semelle : faciles à fabriquer, standard pour serrage hydraulique." },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4">
                    <h4 className="mb-1 text-sm font-semibold text-foreground">{m.mors}</h4>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-semibold text-foreground">Montage des mors : règles essentielles</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Les mors sont repérés 1, 2, 3 ainsi que les rainures du mandrin. Toujours respecter l{"'"}ordre.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Ne jamais taper sur les mors pour faire tourner rond une pièce : il faut les réaléser.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Éviter de serrer de la matière brute avec des mors usinés.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Retirer la clef du mandrin AVANT la mise en marche du tour.
              </li>
            </ul>
          </div>
        </ContentSection>

        {/* Outils de tournage détaillés */}
        <ContentSection title="Classification des Outils de Tournage" id="classification-outils">
          <div className="flex flex-col gap-6">
            {outilsUsinage.map((cat) => (
              <div key={cat.categorie}>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{cat.categorie}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cat.outils.map((outil, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">{outil}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-3 font-semibold text-foreground">Réglage de l{"'"}outil sur le tour</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pour une coupe optimale, l{"'"}arête de coupe doit être au même niveau que l{"'"}axe de la pièce. L{"'"}outil doit être sorti de la longueur nécessaire à l{"'"}usinage sans excès, pour éviter le porte-à-faux. La mise à hauteur se fait à l{"'"}aide de cales étalons.
            </p>
          </div>
        </ContentSection>

        {/* Matériaux des outils */}
        <ContentSection title="Matériaux des Outils de Tournage" id="materiaux-outils">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materiauxOutils.map((mat) => (
              <div key={mat.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{mat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{mat.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Ébauche et finition */}
        <ContentSection title="Ébauche, Semi-finition et Finition" id="ebauche-finition">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Ébauche</h3>
              <div className="rounded-xl border border-border bg-card p-6">
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {ebaucheFinitionTour.ebauche.map((item, i) => (
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
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {ebaucheFinitionTour.finition.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Épaulement */}
        <ContentSection title="Réaliser un Épaulement" id="realiser-epaulement">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Épaulement extérieur</h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                L{"'"}épaulement droit consiste à usiner un changement de diamètre avec une face plane perpendiculaire à l{"'"}axe. L{"'"}outil à charioter/dresser est l{"'"}outil idéal pour cette opération, combinant chariotage et dressage en un minimum de passes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Alésage épaulé</h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Pour un alésage épaulé : centrer d{"'"}abord (bon guidage du foret), puis percer à un diamètre inférieur de 2 mm par rapport à l{"'"}alésage voulu. Choisir un outil de section maximale et limiter le porte-à-faux pour éviter les vibrations.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Diagnostic problèmes */}
        <ContentSection title="Diagnostic des Problèmes d'Usinage" id="diagnostic">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Problème</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Remède</th>
                </tr>
              </thead>
              <tbody>
                {problemesRemedes.map((pr, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 font-medium text-foreground">{pr.probleme}</td>
                    <td className="px-6 py-3 text-muted-foreground">{pr.remede}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>

        <ContentSection title="Usinage de Pièces Coniques" id="cones">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard title="Méthodes de tournage conique" items={methodesCone} />
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Calcul de l{"'"}angle du cône</h3>
              <div className="mb-3 rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                tan(alpha) = (D - d) / (2L)
              </div>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><strong className="text-foreground">D</strong> = diamètre plus grand</li>
                <li><strong className="text-foreground">d</strong> = diamètre plus petit</li>
                <li><strong className="text-foreground">L</strong> = longueur du cône</li>
              </ul>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Contrôle Qualité" id="controle">
          <InfoCard
            title="Instruments de Mesure"
            items={[
              "Pied à coulisse : mesures des diamètres et longueurs",
              "Micromètre : grande précision",
              "Comparateur : concentricités et déviations",
              "Jauge de filetage : précision des filets usinés",
            ]}
          />
        </ContentSection>

        <ContentSection title="Adaptation aux Matériaux" id="materiaux">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Matériau</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Vitesse</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Acier doux", "Modérée", "Arrosage recommandé, carbure ou HSS"],
                  ["Inox", "Faible à modérée", "Outils robustes, lubrification abondante, éviter l'écrouissage"],
                  ["Aluminium", "Élevée", "Arêtes vives, grande hélice, évacuation des copeaux"],
                  ["Plastiques", "Modérée", "Éviter la fusion ou la déformation"],
                ].map(([mat, vit, note], i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 font-medium text-foreground">{mat}</td>
                    <td className="px-6 py-3 text-primary">{vit}</td>
                    <td className="px-6 py-3 text-muted-foreground">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>

        {/* Quiz */}
        <ContentSection title="Testez vos Connaissances" id="quiz-tournage">
          <Quiz
            title="Quiz - Tournage Conventionnel"
            questions={quizTournage}
          />
        </ContentSection>
      </div>
    </>
  )
}
