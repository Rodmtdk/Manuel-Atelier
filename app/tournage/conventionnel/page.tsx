import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase, ImageGrid } from "@/components/image-showcase"
import { VideoEmbed, VideoGrid } from "@/components/video-embed"

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

export default function TournageConvPage() {
  return (
    <>
      <PageHeader
        badge="Tournage"
        title="Tournage Conventionnel"
        subtitle="Methode d'usinage traditionnelle utilisant des tours manuels. La piece tourne tandis que l'outil de coupe enleve la matiere."
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Visual hero */}
        <ContentSection title="Le Tournage en Images">
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

        <ContentSection title="Composants d'un Tour Conventionnel">
          <InfoCard title="Elements de la machine" items={composants} />
        </ContentSection>

        <ContentSection title="Comment Utiliser un Tour">
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

        <ContentSection title="Techniques Courantes">
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

        <ContentSection title="Montage et Serrage">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Types de Mandrins"
              items={[
                "Mandrin a Mors Independants : reglage individuel",
                "Mandrin a 3 Mors : auto-centrant, rapide et precis",
                "Mandrin a 4 Mors : ideal pour pieces asymetriques",
                "Mandrin a 6 Mors : repartition uniforme des forces",
              ]}
            />
            <InfoCard
              title="Types de Mors"
              items={[
                "Mors Doux : acier non traite, adaptables",
                "Mors Durs : acier trempe, pieces standardisees",
                "Mors Reversibles : adaptables a plusieurs tailles",
                "Mors Speciaux : formes complexes",
              ]}
            />
          </div>
        </ContentSection>

        <ContentSection title="Usinage de Pieces Coniques">
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

        <ContentSection title="Controle Qualite">
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

        <ContentSection title="Adaptation aux Materiaux">
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
                  ["Acier", "Faible", "Refroidissement intensif"],
                  ["Inox", "Moderee", "Outils robustes, lubrification importante"],
                  ["Aluminium", "Elevee", "Faible resistance mecanique"],
                  ["Plastiques", "Moderee", "Eviter fonte ou deformation"],
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
      </div>
    </>
  )
}
