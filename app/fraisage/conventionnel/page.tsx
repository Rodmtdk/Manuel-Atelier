import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import { VideoGrid } from "@/components/video-embed"
import { SectionBanner } from "@/components/banner-image"
import { FactCard } from "@/components/fact-card"

const composants = [
  "Table de travail : supporte la piece, deplacable en X, Y, et Z",
  "Mandrin : maintient l'outil de coupe fermement",
  "Manivelles manuelles : controle precis des mouvements de la table",
  "Broche : rotation de l'outil, vitesses ajustables",
  "Systeme de lubrification : reduit la chaleur, prolonge la duree de vie",
  "Echelles de mesure : deplacements de precision",
  "Protecteurs de securite : protection contre eclats et copeaux",
  "Variateur de vitesse : ajustement selon materiau et outil",
  "Systeme de refroidissement : evite les surchauffes",
]

const techniques = [
  {
    title: "Fraisage en opposition",
    desc: "La fraise tourne dans le sens oppose a l'avance de la piece. Ideal pour les materiaux tendres. Privilegiez une lubrification abondante pour ameliorer la duree de vie de l'outil.",
  },
  {
    title: "Fraisage en avalant",
    desc: "La fraise tourne dans le meme sens que l'avance, reduisant les vibrations et produisant de meilleurs etats de surface. Necessite des machines rigides et des outils bien fixes.",
  },
  {
    title: "Fraisage en bout",
    desc: "Cree des poches ou surfaces planes. L'outil travaille avec ses faces frontales. Limitez la profondeur de passe a moins de 30% du diametre de la fraise.",
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
          fact="Une fraiseuse conventionnelle Bridgeport, iconique de l'industrie americaine depuis 1938, pese pres de 1 tonne. Sa tete pivotante a revolutionne l'usinage en permettant des angles impossibles a obtenir autrement."
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
              title="Fixation et Lubrification"
              items={[
                "Assurez-vous que la piece et les outils sont bien fixes",
                "Utilisez des etaux ou des brides de serrage adaptees",
                "Lubrifiant adapte pour minimiser chaleur et frottements",
                "Verifiez regulierement le niveau et la proprete du lubrifiant",
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
