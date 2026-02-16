import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"

const composants = [
  "Mandrin : maintient fermement la piece",
  "Broche : rotation a vitesses controlees",
  "Outil de coupe : enleve la matiere selon les specifications",
  "Chariot porte-outil : deplacement en X et Z",
  "Commande numerique : programmation des mouvements",
  "Changeur d'outils automatique : changement rapide",
  "Systeme de refroidissement : prolonge la duree de vie",
  "Glissieres et guides : precision des mouvements",
]

const etapesMiseEnRoute = [
  "Preparation : machine propre, lubrifiee, exempte d'obstacles",
  "Installation de la piece : fixation et verification d'alignement",
  "Configuration de l'outil : installation et prereglage",
  "Parametres de coupe : vitesse, avance, profondeur selon le materiau",
  "Test initial : passe d'essai pour verification",
  "Lancement : demarrage du programme CNC, surveillance",
]

const techniquesAvancees = [
  {
    title: "Tournage Multi-Axes",
    desc: "Usinage de formes complexes en une seule configuration.",
  },
  {
    title: "Tournage-Fraisage",
    desc: "Combinaison du tournage et du fraisage pour pieces completes.",
  },
  {
    title: "Tournage Dur",
    desc: "Usinage de materiaux trempes pour remplacer le meulage.",
  },
  {
    title: "Usinage Grande Vitesse (HSM)",
    desc: "Finitions parfaites et reduction des temps de cycle.",
  },
]

const codesGM = [
  ["G00", "Deplacement rapide (positionnement)"],
  ["G01", "Interpolation lineaire (avance de travail)"],
  ["G02", "Interpolation circulaire horaire"],
  ["G03", "Interpolation circulaire anti-horaire"],
  ["G28", "Retour au point de reference"],
  ["G40", "Annulation compensation de rayon"],
  ["G41/G42", "Compensation de rayon a gauche/droite"],
  ["G54-G59", "Systemes de coordonnees piece"],
  ["G71", "Cycle d'ebauche longitudinal"],
  ["G76", "Cycle de filetage automatique"],
  ["G96", "Vitesse de coupe constante"],
  ["G97", "Vitesse de broche constante (tr/min)"],
  ["M03", "Demarrage broche rotation horaire"],
  ["M04", "Demarrage broche rotation anti-horaire"],
  ["M05", "Arret de la broche"],
  ["M06", "Changement d'outil"],
  ["M08", "Marche de l'arrosage"],
  ["M09", "Arret de l'arrosage"],
  ["M30", "Fin de programme et retour au debut"],
]

export default function TournageCncPage() {
  return (
    <>
      <PageHeader
        badge="Tournage CNC"
        title="Tournage a Commande Numerique"
        subtitle="Procede automatise pour produire des pieces cylindriques avec une precision et une repetabilite exceptionnelles."
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <ContentSection title="Composants d'un Tour CNC">
          <InfoCard title="Elements de la machine" items={composants} />
        </ContentSection>

        <ContentSection title="Mise en Route">
          <div className="grid gap-3">
            {etapesMiseEnRoute.map((etape, i) => (
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

        <ContentSection title="Techniques Avancees">
          <div className="grid gap-4 sm:grid-cols-2">
            {techniquesAvancees.map((tech, i) => (
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

        <ContentSection title="Parametres Cruciaux">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Vitesse de Rotation</h3>
              <div className="mb-3 rounded-lg bg-secondary p-4 font-mono text-sm text-primary">
                n = (Vc x 1000) / (Pi x D)
              </div>
              <p className="text-sm text-muted-foreground">
                Vc = vitesse de coupe, D = diametre de la piece
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Avance</h3>
              <p className="text-sm text-muted-foreground">
                Distance parcourue par l{"'"}outil a chaque rotation. Choisie en
                fonction de la finition souhaitee et des contraintes d{"'"}usinage.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Profondeur de Passe</h3>
              <p className="text-sm text-muted-foreground">
                Epaisseur enlevee par passe. Profondeur elevee = temps reduit mais
                contraintes mecaniques accrues.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Lubrification</h3>
              <p className="text-sm text-muted-foreground">
                Lubrifiant adapte au materiau pour ameliorer la finition de surface
                et prolonger la duree de vie de l{"'"}outil.
              </p>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Programmation ISO - Codes G et M">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Code</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Fonction</th>
                </tr>
              </thead>
              <tbody>
                {codesGM.map(([code, desc], i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 font-mono font-medium text-primary">{code}</td>
                    <td className="px-6 py-3 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-semibold text-foreground">Programmation FAO</h3>
            <p className="text-sm text-muted-foreground">
              Utilisation de logiciels comme MasterCAM ou Fusion 360 pour generer
              des parcours d{"'"}outils optimises automatiquement.
            </p>
          </div>
        </ContentSection>

        <ContentSection title="Applications Industrielles">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Automobile", desc: "Arbres, vis, poulies" },
              { title: "Aeronautique", desc: "Composants en alliages legers" },
              { title: "Medical", desc: "Vis medicales, implants" },
              { title: "Energie", desc: "Turbines, raccords industriels" },
            ].map((app) => (
              <div key={app.title} className="rounded-xl border border-border bg-card p-5 text-center">
                <h3 className="mb-1 font-semibold text-foreground">{app.title}</h3>
                <p className="text-sm text-muted-foreground">{app.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Maintenance">
          <InfoCard
            title="Entretien du Tour CNC"
            items={[
              "Nettoyage : retirer les copeaux apres chaque utilisation",
              "Lubrification : verifier le niveau d'huile regulierement",
              "Inspection des outils : remplacer ou affuter les outils uses",
              "Calibration : verifier les axes X, Y et Z",
              "Surveillance des vibrations : detecter les anomalies",
            ]}
          />
        </ContentSection>

        <ContentSection title="Innovations">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Machines multitaches", desc: "Combinaison tournage et fraisage pour reduire les temps" },
              { title: "Capteurs intelligents", desc: "Surveillance en temps reel pour prevenir les pannes" },
              { title: "Fabrication additive hybride", desc: "Impression 3D + usinage pour finition parfaite" },
            ].map((inno) => (
              <div key={inno.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-semibold text-foreground">{inno.title}</h3>
                <p className="text-sm text-muted-foreground">{inno.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>
      </div>
    </>
  )
}
