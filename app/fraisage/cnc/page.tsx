import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase, ImageGrid } from "@/components/image-showcase"
import { VideoGrid } from "@/components/video-embed"
import { SectionBanner } from "@/components/banner-image"
import { FactCard } from "@/components/fact-card"

const composants = [
  "Table de travail : support avec axes motorises",
  "Broche : rotation rapide pour l'usinage",
  "Commandes numeriques : interface de programmation",
  "Systeme de lubrification : prolonge la duree de vie",
  "Capteurs de position : retroaction precise pour tolerances",
  "Changeur d'outils automatique : optimise le temps",
  "Systeme de refroidissement : evite la surchauffe",
  "Controle de vibration : silentblocs, rigidite",
  "Logiciel FAO : parcours d'outils optimises",
]

const techniques = [
  {
    title: "Fraisage 3 axes",
    desc: "Les trois axes lineaires (X, Y, Z) permettent d'usiner des pieces planes ou legerement complexes. Methode ideale pour des pieces geometriquement simples.",
  },
  {
    title: "Fraisage 4 axes",
    desc: "Un axe de rotation supplementaire (autour de X ou Y) permet d'usiner les surfaces cylindriques ou d'acceder a des zones plus complexes.",
  },
  {
    title: "Fraisage 5 axes",
    desc: "Deux axes de rotation supplementaires pour pieces tres complexes en une seule configuration. Utilise en aerospatial, automobile et implants medicaux.",
  },
  {
    title: "Fraisage haute vitesse (HSM)",
    desc: "Vitesses de broche tres elevees pour finitions ultra-precises et taux d'enlevement de matiere optimises.",
  },
  {
    title: "Fraisage trochoidal",
    desc: "Optimise le contact outil/matiere pour reduire les contraintes thermiques et mecaniques. Ideal pour materiaux difficiles.",
  },
  {
    title: "Usinage adaptatif",
    desc: "Parcours d'outils dynamiques pour maintenir une charge constante, augmentant productivite et duree de vie de l'outil.",
  },
]

const mandrins = [
  "Mandrin a Mors Independants : reglage individuel de chaque mors",
  "Mandrin a 3 Mors : auto-centrant, rapide et precis",
  "Mandrin a 4 Mors : ideal pour pieces asymetriques",
  "Mandrin a 6 Mors : repartition uniforme pour pieces fragiles",
]

const mors = [
  "Mors Doux : acier non traite, adaptables",
  "Mors Durs : acier trempe, pieces standardisees",
  "Mors Reversibles : adaptables a plusieurs tailles",
  "Mors Speciaux : concus pour formes complexes",
]

export default function FraisageCncPage() {
  return (
    <>
      <PageHeader
        badge="Fraisage CNC"
        title="Fraisage a Commande Numerique"
        subtitle="Procede d'usinage automatise utilisant des machines-outils commandees par ordinateur pour une precision et une repetabilite exceptionnelles."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-cnc.jpg-4r4iswSu1DX2bbB1n0dejMY2mR79bC.webp"
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Visual hero */}
        <ContentSection title="Le Fraisage CNC en Images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-cnc.jpg-4r4iswSu1DX2bbB1n0dejMY2mR79bC.webp"
              alt="Fraisage CNC avec arrosage haute pression et piece en etau"
              caption="Centre d'usinage CNC en action - arrosage et evacuation de copeaux"
              priority
            />
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-image-7F4dkLjnT8Gu3tlBSjjzi3GZiXPvKh.jpg"
              alt="Fraisage CNC 5 axes d'un engrenage spiroconique"
              caption="Usinage 5 axes d'un engrenage spiroconique"
            />
          </div>
        </ContentSection>

        {/* Fact */}
        <FactCard
          fact="Un centre d'usinage CNC 5 axes moderne execute ses mouvements avec une precision de positionnement de 0,003 mm. Sa broche tourne a 24 000 tr/min, soit 400 tours par seconde. Le changeur d'outils automatique permute un outil en moins de 1,5 seconde."
          variant="accent"
          className="mb-4"
        />

        {/* Videos */}
        <ContentSection title="Voir en Video">
          <VideoGrid
            videos={[
              {
                videoId: "9FiqMikfr8A",
                title: "Fraisage CNC 5 axes - Demonstration",
                caption: "Usinage CNC 5 axes en action",
              },
              {
                videoId: "Gg2d7wMmq2I",
                title: "Parcours d'outils et strategies CNC",
                caption: "Strategies d'usinage : trochoidal et adaptatif",
              },
            ]}
          />
        </ContentSection>

        <ContentSection title="Composants d'une Fraiseuse CNC">
          <InfoCard title="Elements de la machine" items={composants} />
        </ContentSection>

        <ContentSection title="Techniques et Methodes d'Usinage CNC">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techniques.map((tech, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                  {i + 3}ax
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{tech.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Parametres Cruciaux">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Vitesse de broche</h3>
              <div className="mb-3 rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                n = (Vc x 1000) / (Pi x D)
              </div>
              <p className="text-sm text-muted-foreground">
                Vc = vitesse de coupe, D = diametre de l{"'"}outil
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Avance par dent</h3>
              <p className="text-sm text-muted-foreground">
                Quantite de matiere enlevee par dent a chaque rotation. Avance
                excessive = vibrations ou mauvais etat de surface.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Profondeur de coupe</h3>
              <p className="text-sm text-muted-foreground">
                Optimisez ap (axiale) et ae (radiale) en fonction de la rigidite
                machine et piece.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Strategie d{"'"}usinage</h3>
              <p className="text-sm text-muted-foreground">
                Les parcours optimises (trochoidal, adaptatif) reduisent l{"'"}usure
                des outils et augmentent la productivite.
              </p>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Montage et Serrage">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard title="Types de Mandrins" items={mandrins} />
            <InfoCard title="Types de Mors" items={mors} />
          </div>
        </ContentSection>

        <ContentSection title="Controle Qualite et Metrologie">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Instruments Utilises"
              items={[
                "Pied a coulisse : mesures exterieures, interieures et profondeurs",
                "Micrometre : haute precision pour les diametres",
                "Comparateur : verification de la planeite",
                "Rugosimetre : mesure la rugosite de surface",
              ]}
            />
            <InfoCard
              title="Lecture de Plans Techniques"
              items={[
                "Lire et interpreter les cotes dimensionnelles et de fonction",
                "Comprendre les tolerances geometriques et dimensionnelles",
                "Dechiffrer les symboles de rugosite et de finition",
                "Suivre les etapes pour respecter les specifications",
              ]}
            />
          </div>
        </ContentSection>

        <ContentSection title="Adaptation aux Materiaux">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Materiau</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Vitesse</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Recommandations</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Acier", "Faible", "Avance moderee"],
                  ["Aluminium", "Elevee", "Faible profondeur de passe"],
                  ["Inox", "Moderee", "Lubrification importante"],
                  ["Plastiques", "Elevee", "Attention a la surchauffe"],
                ].map(([mat, vit, reco], i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 font-medium text-foreground">{mat}</td>
                    <td className="px-6 py-3 text-primary">{vit}</td>
                    <td className="px-6 py-3 text-muted-foreground">{reco}</td>
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
