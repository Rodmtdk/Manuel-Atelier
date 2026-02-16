import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import { VideoGrid } from "@/components/video-embed"
import { SectionBanner } from "@/components/banner-image"
import { FactCard } from "@/components/fact-card"

const composants = [
  "Table de travail : supporte la piece, deplacable en X, Y, et Z",
  "Porte-outil (pince ou mandrin porte-fraise) : maintient l'outil de coupe fermement",
  "Manivelles manuelles : controle precis des mouvements de la table",
  "Broche : rotation de l'outil, vitesses ajustables",
  "Tete de fraiseuse : renvoi d'angle horizontal/vertical (types Hure, Dufour, Gambin)",
  "Systeme de lubrification : reduit la chaleur, prolonge la duree de vie",
  "Echelles de mesure et tambours gradues : deplacements de precision",
  "Protecteurs de securite : protection contre eclats et copeaux",
  "Variateur de vitesse : ajustement selon materiau et outil",
  "Systeme vis-ecrou : deplacements de la table (attention au jeu fonctionnel)",
]

const typesEtaux = [
  {
    title: "Etau standard",
    desc: "Etau de fraisage a base fixe, serrage mecanique par vis-ecrou. Le plus courant pour les operations generales. Bridage en 4 points a l'exterieur pour rigidite maximale.",
  },
  {
    title: "Etau a base rotative",
    desc: "Possede une base pivotante graduee en degres, permettant d'orienter la piece a l'angle desire. Le reglage precis se fait au comparateur.",
  },
  {
    title: "Etau a serrages multiples",
    desc: "Permet de serrer plusieurs pieces simultanement pour la production en serie. Gain de temps considerable pour les petites series.",
  },
  {
    title: "Etaux modulables",
    desc: "Systemes de serrage modulaires adaptables a differentes formes et tailles de pieces. Utilisent des mors speciaux pour pieces cylindriques ou obliques.",
  },
]

const degauchissageEtau = [
  "Serrer moyennement la bride B (pivot), puis legerement la bride C",
  "Mettre le comparateur a 0 du cote B",
  "Se deplacer vers C et ajuster l'etau en frappant legerement au maillet",
  "Revenir vers B, controler, recommencer tant que l'ecart depasse 0,01 mm",
  "Serrer tous les points de bridage, puis controler a nouveau l'alignement",
  "Ne jamais deplacer l'etau du cote B (centre de rotation)",
]

const typesFreises = [
  {
    title: "Fraises une taille (fraise-scie)",
    desc: "Une seule arete de coupe. Utilisee pour le tronconnage, rainures etroites ou ebauche de dentures. Diametre de 20 a 315 mm, faible epaisseur.",
  },
  {
    title: "Fraises deux tailles",
    desc: "Usinage sur l'extremite et les cotes. Existent en 2 dents (bonne evacuation copeaux) ou multidents (meilleure finition). Certaines ont une coupe au centre permettant de plonger dans la matiere.",
  },
  {
    title: "Fraises trois tailles",
    desc: "Trois aretes de coupe limitant la flexion. Rainurage avec forte avance. Denture alternee sur les faces laterales.",
  },
  {
    title: "Fraises a surfacer",
    desc: "Profondeur de passe limitee par la longueur d'arete des plaquettes. Diametres de 32 a 630 mm. Ideales pour le surfacage de grandes surfaces.",
  },
  {
    title: "Fraises a surfacer-dresser",
    desc: "Deux tailles dont une parallele a l'axe de l'outil. Polyvalentes : dressage, rainurage et surfacage en une seule fraise.",
  },
  {
    title: "Fraises de forme",
    desc: "Reproduisent sur la surface la forme de la generatrice de la fraise : fraises boule a plaquettes, a chanfreiner, a rayon, a ve...",
  },
]

const techniques = [
  {
    title: "Fraisage en opposition",
    desc: "Le mouvement d'avance (Mf) et le mouvement de coupe (Mc) sont de sens contraire dans la zone fraisee. L'epaisseur du copeau est faible a l'attaque puis maximale en fin de trajectoire. Fortement recommande sur machines conventionnelles non equipees de vis a bille.",
  },
  {
    title: "Fraisage en avalant (concordance)",
    desc: "Mf et Mc sont dans le meme sens. Le copeau est maximal a l'attaque puis diminue. Meilleur etat de surface et moins d'usure de l'outil, mais attention au jeu vis-ecrou ! A utiliser en finition sur machine conventionnelle, ou systematiquement sur CNC (vis a bille).",
  },
  {
    title: "Fraisage en bout (surfacage)",
    desc: "Cree des surfaces planes. L'outil travaille avec ses faces frontales. Le plus efficace quand c'est possible. Incliner legerement la broche de quelques centiemes pour eviter que la fraise ne talonne.",
  },
  {
    title: "Fraisage de rainure",
    desc: "Utilisez des fraises adaptees a la largeur de la rainure et effectuez plusieurs passes legeres pour des profondeurs importantes.",
  },
  {
    title: "Fraisage helicoidal",
    desc: "Pour percer des trous de grand diametre ou usiner des vis sans fin. Synchronisez l'avance lineaire avec la rotation.",
  },
  {
    title: "Fraisage de forme",
    desc: "Pour des profils complexes, utilisez des fraises profilees et realisez une pre-finition avant la passe finale.",
  },
  {
    title: "Fraisage en T",
    desc: "Usinage pour rainures en T, couramment utilisees dans les glissieres. Degagez regulierement les copeaux.",
  },
  {
    title: "Fraisage de chanfrein",
    desc: "Fraises a chanfreiner pour ebavurer ou creer des bords inclines. Reglez precisement l'angle selon les specifications.",
  },
  {
    title: "Fraisage en queue d'aronde",
    desc: "Technique avancee pour assemblages mecaniques resistants. Utilisez une fraise specifique pour un resultat precis et durable.",
  },
  {
    title: "Fraisage en contournage",
    desc: "Pour suivre des profils complexes avec precision. Adaptez la vitesse d'avance pour eviter les deformations.",
  },
]

const materiauxOutils = [
  {
    title: "Acier rapide (HSS)",
    desc: "Peu couteux, nombreuses formes disponibles. Capacite de decoupe limitee : ne coupe pas les aciers trop durs, mais tres pratique pour aciers doux et aluminium.",
  },
  {
    title: "Acier rapide au cobalt",
    desc: "Durete superieure au HSS classique mais plus fragile (eviter les chocs). Meilleure resistance a l'usure grace au cobalt. Aspect visuel tres proche du HSS.",
  },
  {
    title: "Carbure",
    desc: "Augmentation importante de durete et resistance. Montage rigide et vitesses de coupe appropriees indispensables. Supporte mieux la chaleur, ideal pour grandes cadences.",
  },
  {
    title: "Outils revetus (TiN, TiAlN...)",
    desc: "Corps HSS avec partie tranchante revetue de carbure ou titane. Le revetement en nitrure de titane (TiN) est le plus repandu et permet des vitesses de coupe plus elevees.",
  },
]

const ebaucheFinition = {
  ebauche: [
    "Machine puissante et robuste avec appareillage rigide",
    "Serrages consequents, porte-a-faux reduit",
    "Outils a grosse denture ou denture brise-copeaux",
    "Vitesse de rotation moyenne, grande vitesse d'avance",
    "Lubrifiant recommande pour prolonger la duree de vie de l'outil",
    "Tracer la piece a quelques mm des cotes pour faciliter l'ebauche",
  ],
  finition: [
    "Augmenter legerement la vitesse de rotation et diminuer l'avance",
    "Appuis precis, serrages plus moderes (faibles efforts de coupe)",
    "Outil de finition adapte (denture droite ou helicodale fine)",
    "Faire les deux dernieres passes identiques pour meilleur resultat",
    "En roulant : finition en avalant pour meilleur etat de surface",
    "Travailler en lubrifiant pour un Ra optimal",
  ],
}

export default function FraisageConvPage() {
  return (
    <>
      <PageHeader
        badge="Fraisage"
        title="Fraisage Conventionnel"
        subtitle="Procede d'usinage par enlevement de matiere utilisant des fraiseuses manuelles. L'outil tourne pour enlever la matiere selon les axes X, Y et Z."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-conv-hQ6MZQwEpYMaXRitgcZN6oyAZnH21I.jpg"
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <ContentSection title="Presentation">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">
              Le fraisage conventionnel est un procede d{"'"}usinage par enlevement de
              matiere utilisant des fraiseuses manuelles. L{"'"}outil, generalement une
              fraise, tourne pour enlever la matiere de la piece selon les axes X, Y
              et Z. Ce procede est souvent utilise pour la fabrication de prototypes,
              de petites series et dans les environnements educatifs.
            </p>
          </div>
        </ContentSection>

        {/* Visual section */}
        <ContentSection title="Le Fraisage en Images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-conv1-dKnKSz1GCTohz95HLhCALpdTAK4tUZ.jpg"
              alt="Fraiseuse conventionnelle en action avec outil de coupe et piece metallique"
              caption="Fraiseuse conventionnelle en action - fraisage de precision sur etau"
              priority
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-conv-hQ6MZQwEpYMaXRitgcZN6oyAZnH21I.jpg"
              alt="Fraisage conventionnel avec lubrification sur piece d'engrenage"
              caption="Lubrification active lors du fraisage d'un engrenage"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils.jpg-bZqaPg57JOVBcIk9ZYxNpQkHNaPTSO.webp"
              alt="Collection d'outils de fraisage professionnels"
              caption="Outils a plaquettes interchangeables"
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/for-KBe9cVu5utQUNcXTMoBzxPD2ByHmyV.jpg"
              alt="Forets et fraises carbure monobloc"
              caption="Forets et fraises carbure monobloc"
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cutting-DoKGVvDxuVBZOSn3g5WWeeHkhQN40G.jpg"
              alt="Plaquettes carbure pour outils de coupe"
              caption="Plaquettes de coupe - geometries variees"
            />
          </div>
        </ContentSection>

        {/* Intriguing fact */}
        <FactCard
          fact="La fraiseuse Bridgeport, creee en 1938 aux Etats-Unis, est devenue la reference mondiale des fraiseuses conventionnelles. Pesant environ 900 kg, sa tete orientable a revolutionne l'usinage en permettant des inclinaisons impossibles a obtenir autrement. Elle reste une machine emblematique dans les ateliers du monde entier."
          variant="highlight"
          className="mb-8"
        />

        {/* Videos */}
        <ContentSection title="Voir en Video">
          <VideoGrid
            videos={[
              {
                videoId: "gR9xGH-DxWI",
                title: "Fraisage conventionnel - Techniques de base",
                caption: "Surfacage et rainurage sur fraiseuse manuelle",
              },
              {
                videoId: "E_N_MFnOPfY",
                title: "Utilisation d'une fraiseuse conventionnelle",
                caption: "Reglage et utilisation d'une fraiseuse",
              },
            ]}
          />
        </ContentSection>

        <ContentSection title="Composants d'une Fraiseuse Conventionnelle">
          <InfoCard title="Elements de la machine" items={composants} />
        </ContentSection>

        {/* Tetes de fraiseuse - from PDF 1 */}
        <ContentSection title="Les Tetes de Fraiseuse">
          <div className="rounded-xl border border-border bg-card p-6 mb-4">
            <p className="leading-relaxed text-muted-foreground">
              La tete de fraiseuse comporte un renvoi d{"'"}angle qui permet de passer du fraisage horizontal au fraisage vertical. De la qualite de son reglage dependra la qualite finale de la piece. Il faut toujours controler la precision du reglage de la tete en arrivant sur une machine inconnue.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Tete Hure", desc: "Reglage par abaque du constructeur. Attention : toujours utiliser l'angle complementaire a l'angle voulu (ex : pour 33 degres, chercher 67 degres sur l'abaque)." },
              { title: "Tete Dufour", desc: "Reglage en deux etapes obligatoires : d'abord le porte-fraise, puis le renvoi d'angle. Attention au basculement lors du desserrage." },
              { title: "Tete Gambin", desc: "Meme principe que Dufour, mais sans ordre precis de reglage." },
            ].map((tete) => (
              <div key={tete.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-semibold text-foreground">{tete.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tete.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-semibold text-foreground">Reglage au comparateur</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fixer le comparateur dans la broche, desserrer legerement toutes les vis de la tete, positionner le comparateur juste sous l{"'"}axe de rotation et le regler sur 0. Mesurer l{"'"}autre cote et faire pivoter la tete jusqu{"'"}au 0. Pour le surfacage, incliner la broche de quelques centiemes pour eviter que la fraise ne talonne.
            </p>
          </div>
        </ContentSection>

        {/* Etaux - from PDF 2 */}
        <ContentSection title="Les Etaux de Fraisage">
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
              <h3 className="mb-3 text-lg font-semibold text-foreground">Degauchissage d{"'"}un Etau</h3>
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
                <h3 className="mb-3 font-semibold text-foreground">Regles de serrage en etau</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Le serrage ne doit pas etre excessif (risque de deformer et marquer la piece)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Toujours serrer avec la meme pression, surtout pour les series
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Diriger les efforts d{"'"}usinage vers le mors fixe (element le plus rigide)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Controler le fond de l{"'"}etau avant degauchissage (pas de copeaux entre etau et table)
                  </li>
                </ul>
              </div>
              <FactCard
                fact="Un etau se degauchit en moins de dix minutes. Le bridage en 4 points a l'exterieur est le plus efficace. Ca ne sert a rien de serrer avec un tube ou une rallonge !"
                variant="default"
              />
            </div>
          </div>
        </ContentSection>

        {/* Types de fraises - from PDF 3 */}
        <ContentSection title="Types de Fraises selon leur Usage">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {typesFreises.map((fraise) => (
              <div key={fraise.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{fraise.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{fraise.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Materiaux outils - from PDF 3 */}
        <ContentSection title="Materiaux des Outils de Fraisage">
          <div className="grid gap-4 sm:grid-cols-2">
            {materiauxOutils.map((mat) => (
              <div key={mat.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{mat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{mat.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Techniques de Fraisage">
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
              alt="Schema de mise en position isostatique - appuis et serrages"
              caption="Principe de mise en position isostatique : 6 degres de liberte bloques par les appuis"
              aspectRatio="square"
            />
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold text-foreground">Principe isostatique</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Toute piece dans l{"'"}espace possede 6 degres de liberte (3 translations + 3 rotations). La mise en position consiste a eliminer ces 6 degres a l{"'"}aide d{"'"}appuis ponctuels : 3 appuis sur le plan principal, 2 sur le plan secondaire, 1 sur le plan tertiaire.
                </p>
              </div>
              <FactCard
                fact="Le principe isostatique date du XIXe siecle et reste la base de tout montage d'usinage. Sans lui, impossible de garantir la repetabilite des operations sur des series de pieces."
                variant="default"
              />
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Parametres Cruciaux">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Vitesse de Coupe (Vc)</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Depend du materiau et de l{"'"}outil. Calculee avec la formule :
              </p>
              <div className="rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                Vc = (Pi x D x n) / 1000
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                D = diametre de la fraise, n = vitesse de rotation (tr/min)
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Avance par dent (fz)</h3>
              <p className="text-sm text-muted-foreground">
                Distance parcourue par dent de fraise a chaque rotation. Une avance
                excessive entraine des vibrations, une avance trop faible use
                prematurement l{"'"}outil.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Profondeur de Passe (ap)</h3>
              <p className="text-sm text-muted-foreground">
                Epaisseur de matiere retiree par passe. Pour les materiaux durs, limitez
                a 0,1-0,3 mm. Equilibrez rapidite et qualite.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Largeur de Passe (ae)</h3>
              <p className="text-sm text-muted-foreground">
                Engagement radial essentiel pour maintenir la stabilite de l{"'"}usinage
                et prolonger la duree de vie des outils.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Ebauche et finition - from PDF 5 */}
        <ContentSection title="Ebauche, Semi-finition et Finition">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Ebauche</h3>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  L{"'"}ebauche consiste a enlever le plus gros de la matiere en un temps reduit. Elle sert a eliminer la croute superficielle et les fortes surepaisseurs d{"'"}usinage.
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
                  La finition sert a respecter les specifications du dessin de definition. La finition exterieure est le gage de qualite d{"'"}un usinage et, souvent, de l{"'"}ouvrier lui-meme.
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
              Le lubrifiant (liquide refrigerant) assure 3 fonctions : <strong className="text-foreground">refroidir l{"'"}arete de l{"'"}outil</strong> (30% de la chaleur se concentre a cet endroit), <strong className="text-foreground">lubrifier le tranchant</strong> (moins de frottement = moins de chaleur), et <strong className="text-foreground">evacuer les copeaux</strong> (meilleure finition). L{"'"}huile de coupe doit etre correctement dosee pour eviter l{"'"}oxydation.
            </p>
          </div>
        </ContentSection>

        <ContentSection title="Applications Pratiques">
          <InfoCard
            title="Utilisations courantes"
            items={[
              "Fabrication de pieces mecaniques uniques",
              "Petites series pour l'industrie",
              "Formation dans les ateliers pedagogiques",
              "Reparations rapides et ajustements personnalises",
              "Creation de pieces artistiques ou prototypes en bois et metal",
              "Restauration ou modification de pieces existantes",
            ]}
          />
        </ContentSection>

        <ContentSection title="Bonnes Pratiques et Securite">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Securite machine (selon Compagnons)"
              items={[
                "Fermer les carters avant toute mise en route",
                "Ne pas s'approcher a moins de 50 cm d'un outil en rotation",
                "Ne pas laisser pendre les manches du bleu de travail",
                "Cheveux longs attaches et dans le col",
                "Ne pas mettre la broche en rotation si l'outil est mal fixe",
                "La fraise avale tout ce qui n'est pas fermement bride (pieces, chiffons, doigts...)",
              ]}
            />
            <InfoCard
              title="Equipements de Protection (EPI)"
              items={[
                "Port obligatoire de lunettes de protection",
                "Gants adaptes pour manipuler les outils (hors fonctionnement)",
                "Vetements ajustes pour eviter les accrochages",
                "Bouchons d'oreilles contre le bruit",
                "Chaussures de securite contre les chutes d'objets",
              ]}
            />
          </div>
        </ContentSection>
      </div>
    </>
  )
}
