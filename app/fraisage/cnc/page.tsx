import { PageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/table-of-contents"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase, ImageGrid } from "@/components/image-showcase"
import { VideoGrid } from "@/components/video-embed"
import { SectionBanner } from "@/components/banner-image"
import { FactCard } from "@/components/fact-card"

const tocItems = [
  { id: "images", label: "Le Fraisage CNC en Images" },
  { id: "videos", label: "Voir en Vidéo" },
  { id: "techniques", label: "Techniques de Fraisage" },
  { id: "5axes", label: "Centre d'Usinage 5 Axes" },
  { id: "composants", label: "Composants" },
  { id: "serrage", label: "Serrage et Porte-outils" },
]

const composants = [
  "Table de travail : support avec axes motorisés",
  "Broche : rotation rapide pour l'usinage",
  "Commandes numériques : interface de programmation",
  "Système de lubrification : prolonge la durée de vie",
  "Capteurs de position (règles optiques) : asservissement en boucle fermée",
  "Changeur d'outils automatique : optimise le temps",
  "Système de refroidissement : évite la surchauffe",
  "Contrôle de vibration : silentblocs, rigidité",
  "Logiciel FAO : parcours d'outils optimisés",
]

const techniques = [
  {
    title: "Fraisage 3 axes",
    desc: "Les trois axes linéaires (X, Y, Z) permettent d'usiner des pièces planes ou légèrement complexes. Méthode idéale pour des pièces géométriquement simples.",
  },
  {
    title: "Fraisage 4 axes",
    desc: "Un axe de rotation supplémentaire (autour de X ou Y) permet d'usiner les surfaces cylindriques ou d'accéder à des zones plus complexes.",
  },
  {
    title: "Fraisage 5 axes",
    desc: "Deux axes de rotation supplémentaires pour pièces très complexes en une seule configuration. Utilisé en aérospatial, automobile et implants médicaux.",
  },
  {
    title: "Fraisage haute vitesse (HSM)",
    desc: "Vitesses de broche très élevées pour finitions ultra-précises et taux d'enlèvement de matière optimisés.",
  },
  {
    title: "Fraisage trochoïdal",
    desc: "Optimise le contact outil/matière pour réduire les contraintes thermiques et mécaniques. Idéal pour matériaux difficiles.",
  },
  {
    title: "Usinage adaptatif",
    desc: "Parcours d'outils dynamiques pour maintenir une charge constante, augmentant productivité et durée de vie de l'outil.",
  },
]

const serrages = [
  "Étau de précision : serrage rapide pour pièces prismatiques",
  "Brides et tirants : fixation directe sur la table pour grandes pièces",
  "Plateau diviseur : positionnement angulaire précis de la pièce",
  "Mandrin porte-fraise (pince ER) : maintien de l'outil avec concentricité élevée",
  "Frettage thermique : concentricité optimale pour UGV",
]

const porteoutils = [
  "Pinces ER : polyvalentes, différents diamètres de serrage",
  "Mandrins hydrauliques : concentricité < 0,003 mm",
  "Porte-outils frettage : rigidité maximale pour UGV",
  "Mandrins Weldon : entraînement positif par vis de serrage",
]

export default function FraisageCncPage() {
  return (
    <>
      <PageHeader
        badge="Fraisage CNC"
        title="Fraisage à Commande Numérique"
        subtitle="Procédé d'usinage automatisé utilisant des machines-outils commandées par ordinateur pour une précision et une répétabilité exceptionnelles."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-cnc.jpg-4r4iswSu1DX2bbB1n0dejMY2mR79bC.webp"
      />

      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Visual hero */}
        <ContentSection title="Le Fraisage CNC en Images" id="images">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-cnc.jpg-4r4iswSu1DX2bbB1n0dejMY2mR79bC.webp"
              alt="Fraisage CNC avec arrosage haute pression et pièce en étau"
              caption="Centre d'usinage CNC en action — arrosage et évacuation de copeaux"
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
          fact="Un centre d'usinage CNC 5 axes moderne exécute ses mouvements avec une précision de positionnement de 0,003 mm. Sa broche peut tourner jusqu'à 15 000 - 20 000 tr/min (et plus en UGV). Le changeur d'outils automatique permute un outil en moins de 1,5 seconde."
          variant="accent"
          className="mb-4"
        />

        {/* Videos */}
        <ContentSection title="Voir en Vidéo" id="videos">
          <VideoGrid
            videos={[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TIMTOS%202013%20Centre%20d_usinage%205%20axes-sX9fmnL5LIxxT9eHHrAv7YR68movN2.mp4",
                title: "Centre d'usinage 5 axes",
                caption: "Démonstration d'un centre d'usinage 5 axes",
                platform: "mp4",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Comparaison%20entre%20usinage%20trocho%C3%AFdal%20et%20usinage%20cl-lrNnJjrhrwKUKckxnMjnv03YVZfFt6.mp4",
                title: "Comparaison usinage trochoïdal vs classique",
                caption: "Comparaison entre usinage trochoïdal et usinage classique",
                platform: "mp4",
              },
            ]}
          />
        </ContentSection>

        <ContentSection title="Composants d'une Fraiseuse CNC" id="composants">
          <InfoCard title="Éléments de la machine" items={composants} />
        </ContentSection>

        <ContentSection title="Techniques et Méthodes d'Usinage CNC" id="techniques">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techniques.map((tech, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{tech.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Paramètres Cruciaux">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Vitesse de broche</h3>
              <div className="mb-3 rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                n = (Vc × 1000) / (π × D)
              </div>
              <p className="text-sm text-muted-foreground">
                Vc = vitesse de coupe, D = diamètre de l{"'"}outil
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Avance par dent</h3>
              <p className="text-sm text-muted-foreground">
                Quantité de matière enlevée par dent à chaque rotation. Avance
                excessive = vibrations ou mauvais état de surface.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Profondeur de coupe</h3>
              <p className="text-sm text-muted-foreground">
                Optimisez ap (axiale) et ae (radiale) en fonction de la rigidité
                machine et pièce.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Stratégie d{"'"}usinage</h3>
              <p className="text-sm text-muted-foreground">
                Les parcours optimisés (trochoïdal, adaptatif) réduisent l{"'"}usure
                des outils et augmentent la productivité.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Image 5 axes */}
        <ContentSection title="Centre d'Usinage 5 Axes" id="5axes">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageShowcase
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-cnc.jpg-4r4iswSu1DX2bbB1n0dejMY2mR79bC.webp"
              alt="Centre d'usinage CNC 5 axes travaillant sur une pièce aéronautique complexe"
              caption="Usinage 5 axes simultanés — pièce aéronautique en cours de finition"
            />
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Pourquoi le 5 axes ?</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Le fraisage 5 axes permet d{"'"}usiner des pièces complexes en une seule mise en position, éliminant les erreurs de repositionnement et réduisant les temps de cycle.
              </p>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Réduction du nombre de montages (1 au lieu de 3-5)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Accès aux zones difficiles sous différents angles
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Meilleure finition de surface grâce à l{"'"}orientation optimale de l{"'"}outil
                </li>
              </ul>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Montage et Serrage" id="serrage">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard title="Systèmes de Serrage Pièce" items={serrages} />
            <InfoCard title="Porte-Outils" items={porteoutils} />
          </div>
        </ContentSection>

        <ContentSection title="Contrôle Qualité et Métrologie">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Instruments Utilisés"
              items={[
                "Pied à coulisse : mesures extérieures, intérieures et profondeurs",
                "Micromètre : haute précision pour les diamètres",
                "Comparateur : vérification de la planéité",
                "Rugosimètre : mesure la rugosité de surface",
              ]}
            />
            <InfoCard
              title="Lecture de Plans Techniques"
              items={[
                "Lire et interpréter les cotes dimensionnelles et de fonction",
                "Comprendre les tolérances géométriques et dimensionnelles",
                "Déchiffrer les symboles de rugosité et de finition",
                "Suivre les étapes pour respecter les spécifications",
              ]}
            />
          </div>
        </ContentSection>

        <ContentSection title="Adaptation aux Matériaux">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Matériau</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Vitesse</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Recommandations</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Acier", "Faible à modérée", "Arrosage abondant, carbure revêtu"],
                  ["Aluminium", "Élevée", "Grande hélice, arêtes vives, évacuation copeaux"],
                  ["Inox", "Modérée", "Lubrification importante"],
                  ["Plastiques", "Élevée", "Éviter la fusion par surchauffe"],
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
