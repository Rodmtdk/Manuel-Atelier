import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase, ImageGrid } from "@/components/image-showcase"
import { VideoEmbed, VideoGrid } from "@/components/video-embed"
import { FactCard } from "@/components/fact-card"
import { TableOfContents } from "@/components/table-of-contents"
import { Quiz } from "@/components/quiz"

const tocItems = [
  { id: "images", label: "Le tournage en images" },
  { id: "composants", label: "Composants du tour" },
  { id: "utilisation", label: "Comment utiliser un tour" },
  { id: "techniques", label: "Techniques courantes" },
  { id: "montages", label: "Types de montages" },
  { id: "mandrins-et-mors", label: "Mandrins et mors" },
  { id: "classification-outils", label: "Classification des outils" },
  { id: "materiaux-outils", label: "Mat\u00e9riaux des outils" },
  { id: "ebauche-finition", label: "\u00c9bauche et finition" },
  { id: "realiser-epaulement", label: "\u00c9paulement" },
  { id: "diagnostic", label: "Diagnostic probl\u00e8mes" },
  { id: "cones", label: "Pi\u00e8ces coniques" },
  { id: "controle", label: "Contr\u00f4le qualit\u00e9" },
  { id: "materiaux", label: "Adaptation mat\u00e9riaux" },
  { id: "quiz-tournage", label: "Quiz" },
]

const quizTournage = [
  {
    question: "Quel type de montage est recommand\u00e9 quand la longueur de la pi\u00e8ce d\u00e9passe 2 fois son diam\u00e8tre ?",
    options: ["Montage en l'air", "Montage mixte (mandrin + contre-pointe)", "Montage en pince", "Montage sur plateau"],
    correctIndex: 1,
    explanation: "Quand la longueur d\u00e9passe 2\u00d7 le diam\u00e8tre, le porte-\u00e0-faux est trop important en montage en l'air. Le montage mixte ajoute le soutien de la contre-pointe.",
  },
  {
    question: "Quelle est la diff\u00e9rence principale entre mors durs et mors doux ?",
    options: ["Les mors durs sont en aluminium", "Les mors doux ont une meilleure concentricit\u00e9 (0,05 mm vs 0,2 mm)", "Les mors durs permettent de r\u00e9al\u00e9ser", "Les mors doux laissent des empreintes"],
    correctIndex: 1,
    explanation: "Les mors doux, usinables, permettent d'\u00eatre r\u00e9al\u00e9s\u00e9s pour chaque pi\u00e8ce, offrant une concentricit\u00e9 de 0,05 mm contre 0,2 mm pour les mors durs (acier tremp\u00e9).",
  },
  {
    question: "Que doit-on TOUJOURS faire avant de mettre le tour en marche ?",
    options: ["V\u00e9rifier la vitesse de broche", "Retirer la clef du mandrin", "Mettre les lunettes de protection", "Les trois \u00e0 la fois"],
    correctIndex: 3,
    explanation: "Les trois sont indispensables ! Mais le retrait de la clef du mandrin est critique car une clef oubli\u00e9e peut \u00eatre \u00e9ject\u00e9e violemment \u00e0 la mise en route.",
  },
  {
    question: "En \u00e9bauche, quelle strat\u00e9gie adopter pour la vitesse ?",
    options: ["Vitesse de rotation \u00e9lev\u00e9e, faible avance", "Vitesse de rotation moyenne, grande avance", "Vitesse de rotation faible, faible avance", "Vitesse maximale pour tout"],
    correctIndex: 1,
    explanation: "En \u00e9bauche, on privil\u00e9gie une vitesse de rotation moyenne avec une grande avance pour enlever un maximum de mati\u00e8re rapidement.",
  },
  {
    question: "Pour r\u00e9aliser un \u00e9paulement ext\u00e9rieur, quel est l'outil id\u00e9al ?",
    options: ["Outil \u00e0 tron\u00e7onner", "Outil \u00e0 charioter/dresser", "Outil \u00e0 al\u00e9ser", "Outil \u00e0 fileter"],
    correctIndex: 1,
    explanation: "L'outil \u00e0 charioter/dresser combine les deux op\u00e9rations n\u00e9cessaires : le chariotage du diam\u00e8tre et le dressage de la face plane.",
  },
  {
    question: "Quelle formule permet de calculer l'angle d'un c\u00f4ne ?",
    options: ["tan(\u03b1) = (D + d) / L", "tan(\u03b1) = (D - d) / (2L)", "tan(\u03b1) = D / (2d)", "tan(\u03b1) = L / (D - d)"],
    correctIndex: 1,
    explanation: "La formule tan(\u03b1) = (D - d) / (2L) utilise la diff\u00e9rence entre le grand diam\u00e8tre D et le petit d, divis\u00e9e par 2 fois la longueur du c\u00f4ne.",
  },
]

const composants = [
  "Mandrin : maintient fermement la piece a usiner",
  "Broche : fournit la rotation de la piece",
  "Chariot transversal : deplacement perpendiculaire a l'axe",
  "Chariot longitudinal : deplacement parallele a l'axe",
  "Contre-pointe : soutient les longues pieces",
  "Boite de vitesse : ajuste la vitesse de rotation",
  "Boite d'avance : controle la vitesse d'avance",
  "Volants : deplacement manuel des chariots",
]

const etapesUtilisation = [
  "Preparation : verifier la proprete, la lubrification et l'etat des outils",
  "Installation de la piece : fixation dans le mandrin et alignement correct",
  "Choix de l'outil : adapte a l'operation (dressage, alesage, filetage...)",
  "Reglage des parametres : vitesse, avance et profondeur selon le materiau",
  "Usinage : deplacement des chariots avec precaution",
  "Controle : verification reguliere des dimensions",
]

const techniquesCourantes = [
  {
    title: "Dressage",
    desc: "Usinage d'une surface plane perpendiculaire a l'axe de la piece.",
  },
  {
    title: "Cylindrage",
    desc: "Reduction uniforme du diametre exterieur de la piece.",
  },
  {
    title: "Alesage",
    desc: "Agrandissement ou creation de trous cylindriques.",
  },
  {
    title: "Filetage",
    desc: "Creation de filets sur surface exterieure ou interieure.",
  },
  {
    title: "Rainurage",
    desc: "Usinage de rainures ou gorges pour applications specifiques.",
  },
  {
    title: "Chanfreinage",
    desc: "Creation de bords inclines pour assemblage ou securite.",
  },
]

const methodesCone = [
  "Inclinaison du Petit Chariot : ideal pour petits cones avec angle precis",
  "Decalage de la Contre-Pointe : adapte aux cones de grande longueur",
  "Outil Forme : utilise pour cones avec angles fixes",
  "Copieur : reproduire des profils coniques complexes",
]

const typesMontages = [
  {
    title: "Montage en l'air",
    desc: "Le plus utilise. La piece est maintenue par le mandrin a une seule extremite. Le porte-a-faux ne doit pas depasser 2 fois le diametre de la piece.",
    coaxialite: "0,2 mm (mors durs) / 0,05 mm (mors doux)",
  },
  {
    title: "Montage mixte",
    desc: "Piece serree en mandrin + soutenue par la contre-pointe. Necessaire quand la longueur depasse le double du diametre.",
    coaxialite: "0,01 mm",
  },
  {
    title: "Montage entre pointes",
    desc: "Piece centree entre pointe fixe et pointe tournante, entrainee par un toc et un plateau pousse-toc. Concentricite maximale.",
    coaxialite: "0,01 mm",
  },
  {
    title: "Montage en pince",
    desc: "Pour petites pieces ou barres calibrees (cylindres, carres, hexagones). Concentricite precise pour reprises d'usinage. Serrage par deformation de la pince fendue.",
    coaxialite: "0,01 mm (mandrin expansible)",
  },
  {
    title: "Montage en lunette fixe",
    desc: "Bridee sur le banc du tour. Donne de la rigidite pour les usinages trop eloignes du mandrin : dressage de face, percage, alesage.",
    coaxialite: "Depend du reglage",
  },
  {
    title: "Montage en lunette a suivre",
    desc: "Vissee sur le chariot, elle accompagne les mouvements longitudinaux de l'outil. Ideale pour les pieces longues et flexibles.",
    coaxialite: "Depend du reglage",
  },
]

const outilsUsinage = [
  {
    categorie: "Usinages exterieurs",
    outils: [
      "Outil a charioter : ebauche ou finition des diametres exterieurs",
      "Outil a dresser (45 degres) : dressage des faces et chanfreins",
      "Outil a saigner (rainurer) : gorges et rainures",
      "Outil a tronconner : decoupe des pieces apres usinage (lame 2-3 mm d'epaisseur min.)",
    ],
  },
  {
    categorie: "Usinages interieurs",
    outils: [
      "Outil a aleser : chariotage, dressage et alesage interieurs",
      "Outil a chambrer : evidements interieurs",
      "Foret a queue conique : gros efforts sur le corps de l'outil",
      "Foret a plaquettes : grandes vitesses d'avance, arrosage au centre",
    ],
  },
  {
    categorie: "Outils speciaux",
    outils: [
      "Outil a fileter : filetages exterieurs ou interieurs (plaquettes multidents)",
      "Outil a moleter : impression de surfaces striees (refoulement, pas de 0,3 a 3 mm)",
      "Outil de forme (barreau ARS) : rayons concaves/convexes, formes a moindre cout",
      "Outil a carotter : recuperation d'une partie de la piece usinee",
    ],
  },
]

const materiauxOutils = [
  {
    title: "Acier rapide (HSS)",
    desc: "Peu couteux, nombreuses formes. Ne coupe pas les aciers trop durs, pratique pour aciers doux et aluminium.",
  },
  {
    title: "Carbure brase",
    desc: "Plaquette carbure brasee sur corps acier. Finition de longs alesages ou etats de surface specifiques (on peut l'affuter).",
  },
  {
    title: "Plaquettes carbure",
    desc: "Agglomeres de cobalt et carbures (tungstene, tantale, titane). Conservent leur durete jusqu'a 1000 degres C. Outils de base en tournage.",
  },
  {
    title: "Plaquettes ceramique",
    desc: "Oxyde d'aluminium et chrome. Durete comparable au carbure, resistant jusqu'a 1200 degres C. Vitesses de coupe tres elevees, meme sur aciers durs.",
  },
  {
    title: "Plaquettes diamant (PCD)",
    desc: "Cristal fixe sur corps carbure. Usinage a tres grande vitesse et finition de haute precision. Cout eleve mais evite la rectification. Supporte mal les chocs.",
  },
]

const problemesRemedes = [
  { probleme: "Piece tourne rond aux mors, pas a l'extremite", remede: "En mors doux : realaser. En mors durs : degauchir au comparateur (maillet)" },
  { probleme: "Vibration de la piece", remede: "Reduire la frequence de rotation, augmenter les avances si la prise de mors le permet" },
  { probleme: "Flexion sur les pieces de faible diametre", remede: "Limiter les efforts de coupe, outil bien affute" },
  { probleme: "Le tour fait du cone", remede: "Si pas du a la flexion, regler la broche du tour" },
]

const ebaucheFinitionTour = {
  ebauche: [
    "Enlever le plus gros de la matiere en un temps reduit",
    "Vitesse de rotation moyenne, grande vitesse d'avance",
    "Machine puissante, appareillage rigide, porte-a-faux reduit",
    "Eliminer la croute superficielle liee au brut",
    "Lubrifier pour prolonger la duree de vie de l'outil",
  ],
  finition: [
    "Augmenter legerement la vitesse de rotation, diminuer l'avance",
    "Appuis precis, serrages moderes (faibles efforts de coupe)",
    "Outil de finition adapte au materiau",
    "Les deux dernieres passes doivent etre identiques",
    "Le lubrifiant assure : refroidissement (30% chaleur a l'arete), lubrification du tranchant, evacuation des copeaux",
  ],
}

export default function TournageConvPage() {
  return (
    <>
      <PageHeader
        badge="Tournage"
        title="Tournage Conventionnel"
        subtitle="Methode d'usinage traditionnelle utilisant des tours manuels. La piece tourne tandis que l'outil de coupe enleve la matiere."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv1-AeqQSvQl5OISTypBxTtimDtx2X231w.jpg"
      />

      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-6xl px-4 lg:px-8 xl:mr-64 xl:max-w-5xl">
        {/* Visual hero */}
        <ContentSection title="Le Tournage en Images" id="images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv1-AeqQSvQl5OISTypBxTtimDtx2X231w.jpg"
              alt="Tournage conventionnel en action avec copeaux metalliques"
              caption="Copeaux en vol lors d'une operation de chariotage"
              priority
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv.jpg-tIcIx0K8YwE4Xd2sM51NjYPfH6LN8F.webp"
              alt="Tour conventionnel avec piece conique en usinage"
              caption="Tour parallele en fonctionnement - arrosage actif"
            />
          </div>
        </ContentSection>

        {/* Video */}
        <ContentSection title="Voir en Video">
          <VideoGrid
            videos={[
              {
                videoId: "vFyAfXcbUcQ",
                title: "Tournage conventionnel - Operations de base",
                caption: "Chariotage et dressage sur tour parallele",
              },
              {
                videoId: "KV1DG5VKvqE",
                title: "Filetage au tour conventionnel",
                caption: "Technique de filetage exterieur pas a pas",
              },
            ]}
          />
        </ContentSection>

        {/* Fact */}
        <FactCard
          fact="Le tour parallele est la plus ancienne machine-outil. Son ancetre, le tour a perche, existait deja en Egypte antique il y a 3 300 ans. Le principe fondamental n'a pas change : la piece tourne, l'outil coupe."
          variant="highlight"
          className="mb-4"
        />

        <ContentSection title="Composants d'un Tour Conventionnel" id="composants">
          <InfoCard title="Elements de la machine" items={composants} />
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
            alt="Schema complet des outils de tournage selon les normes DIN - differentes geometries et applications"
            caption="Classification DIN des outils de tournage : chaque outil correspond a une operation specifique (dressage, chariotage, alesage, filetage, tronconnage...)"
            aspectRatio="wide"
          />
        </ContentSection>

        {/* Types de montages - from PDF 1 */}
        <ContentSection title="Types de Montages en Tournage" id="montages">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {typesMontages.map((montage) => (
              <div key={montage.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{montage.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{montage.desc}</p>
                <div className="rounded-lg bg-secondary px-3 py-2">
                  <span className="text-xs text-muted-foreground">Coaxialite : </span>
                  <span className="text-xs font-semibold text-primary">{montage.coaxialite}</span>
                </div>
              </div>
            ))}
          </div>
          <FactCard
            fact="Plus un mandrin a de mors, plus les efforts de serrage seront divises sur la circonference de la piece. Cela se traduit par moins de deformation : le mandrin 6 mors est ideal pour les pieces a parois minces."
            variant="default"
            className="mt-4"
          />
        </ContentSection>

        {/* Mandrins et mors - from PDF 3 */}
        <ContentSection title="Mandrins et Mors" id="mandrins-et-mors">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Types de Mandrins</h3>
              <div className="flex flex-col gap-3">
                {[
                  { mors: "Mandrin 2 mors", desc: "Usinages specifiques : brut de fonderie, pieces prismatiques, excentriques" },
                  { mors: "Mandrin 3 mors (le plus courant)", desc: "Mors dependants (auto-centrant). Utilisation en mors durs ou mors doux" },
                  { mors: "Mandrin 4 mors independants", desc: "Usinages desaxes : alesage desaxe, came, vilebrequin, pieces cubiques" },
                  { mors: "Mandrin 4 mors mixte", desc: "Mors a la fois independants et concentriques. Ideal pour les series" },
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
                  { mors: "Mors durs (acier trempe)", desc: "Ne pas usiner, rectifies. Concentricite 0,2 mm max. Surfaces striees pour bonne prise. Laissent des empreintes sur la piece." },
                  { mors: "Mors doux (acier doux ou alu)", desc: "Facilement usinables, bien meilleure concentricite (0,05 mm). Peuvent etre realeses pour chaque piece." },
                  { mors: "Mors enveloppants", desc: "Alu ou acier doux, pour serrer des pieces fines sans deformation. Enveloppent la quasi-totalite de la piece." },
                  { mors: "Mors monobloc vs rapportes", desc: "Monobloc : plus rigides mais couteux. Rapportes sur semelle : faciles a fabriquer, standard pour serrage hydraulique." },
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
            <h3 className="mb-2 font-semibold text-foreground">Montage des mors : regles essentielles</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Les mors sont reperes 1, 2, 3 ainsi que les rainures du mandrin. Toujours respecter l{"'"}ordre.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Ne jamais taper sur les mors pour faire tourner rond une piece : il faut les realaser.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Eviter de serrer de la matiere brute avec des mors usines.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Retirer la clef du mandrin AVANT la mise en marche du tour.
              </li>
            </ul>
          </div>
        </ContentSection>

        {/* Outils de tournage detailles - from PDF 2 */}
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
            <h3 className="mb-3 font-semibold text-foreground">Reglage de l{"'"}outil sur le tour</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pour une coupe optimale, l{"'"}arete de coupe doit etre au meme niveau que l{"'"}axe de la piece. L{"'"}outil doit etre sorti de la longueur necessaire a l{"'"}usinage sans exces, pour eviter le porte-a-faux. La mise a hauteur se fait a l{"'"}aide de cales etalons.
            </p>
          </div>
        </ContentSection>

        {/* Materiaux des outils - from PDF 2 */}
        <ContentSection title="Materiaux des Outils de Tournage" id="materiaux-outils">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materiauxOutils.map((mat) => (
              <div key={mat.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <h3 className="mb-2 font-semibold text-foreground">{mat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{mat.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Ebauche et finition - from PDF 4 */}
        <ContentSection title="Ebauche, Semi-finition et Finition" id="ebauche-finition">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">Ebauche</h3>
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

        {/* Epaulement - from PDF 5 */}
        <ContentSection title="Realiser un Epaulement" id="realiser-epaulement">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Epaulement exterieur</h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                L{"'"}epaulement droit consiste a usiner un changement de diametre avec une face plane perpendiculaire a l{"'"}axe. L{"'"}outil a charioter/dresser est l{"'"}outil ideal pour cette operation, combinant chariotage et dressage en un minimum de passes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Alesage epaule</h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Pour un alesage epaule : centrer d{"'"}abord (bon guidage du foret), puis percer a un diametre inferieur de 2 mm par rapport a l{"'"}alesage voulu. Choisir un outil de section maximale et limiter le porte-a-faux pour eviter les vibrations.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Diagnostic problemes - from PDF 3 */}
        <ContentSection title="Diagnostic des Problemes d'Usinage" id="diagnostic">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Probleme</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Remede</th>
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

        <ContentSection title="Usinage de Pieces Coniques" id="cones">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard title="Methodes de tournage conique" items={methodesCone} />
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Calcul de l{"'"}angle du cone</h3>
              <div className="mb-3 rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                tan(alpha) = (D - d) / (2L)
              </div>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><strong className="text-foreground">D</strong> = diametre plus grand</li>
                <li><strong className="text-foreground">d</strong> = diametre plus petit</li>
                <li><strong className="text-foreground">L</strong> = longueur du cone</li>
              </ul>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Copieurs">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Mecanique", desc: "Suit un gabarit fixe pour guider l'outil" },
              { title: "Hydraulique", desc: "Systeme hydraulique pour formes complexes" },
              { title: "Numerique", desc: "Programmation assistee pour profils precis" },
            ].map((cop) => (
              <div key={cop.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-semibold text-foreground">Copieur {cop.title}</h3>
                <p className="text-sm text-muted-foreground">{cop.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Controle Qualite" id="controle">
          <InfoCard
            title="Instruments de Mesure"
            items={[
              "Pied a coulisse : mesures des diametres et longueurs",
              "Micrometre : grande precision",
              "Comparateur : concentricites et deviations",
              "Jauge de filetage : precision des filets usines",
            ]}
          />
        </ContentSection>

        <ContentSection title="Adaptation aux Materiaux" id="materiaux">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Materiau</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Vitesse</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Acier doux", "Moderee", "Arrosage recommande, carbure ou HSS"],
                  ["Inox", "Faible a moderee", "Outils robustes, lubrification abondante, eviter l'ecrouissage"],
                  ["Aluminium", "Elevee", "Aretes vives, grande helice, evacuation des copeaux"],
                  ["Plastiques", "Moderee", "Eviter la fusion ou la deformation"],
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
