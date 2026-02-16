import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ShieldAlert, AlertTriangle, Heart, Wrench } from "lucide-react"

const epiItems = [
  "Casque de protection : contre les chutes d'objets",
  "Lunettes de securite : protection contre projections de copeaux",
  "Gants adaptes : protection des mains (hors fonctionnement machine)",
  "Bouchons d'oreilles ou casque antibruit : contre le bruit excessif",
  "Chaussures de securite : protection contre chutes d'objets lourds",
  "Vetements ajustes : eviter les accrochages dans les machines",
]

const reglesGenerales = [
  "Lire les notices et consignes d'utilisation avant usage",
  "Verifier les dispositifs de securite (carters, capots) fonctionnels",
  "Ne jamais porter de vetements amples ou bijoux pres des machines",
  "Maintenir l'atelier propre et degage",
  "Debrancher les machines avant reglage ou entretien",
  "Utiliser les outils adaptes et verifier leur etat",
  "Signaler immediatement toute anomalie ou dysfonctionnement",
]

export default function SecuritePage() {
  return (
    <>
      <PageHeader
        badge="Securite"
        title="Securite en Atelier"
        subtitle="Regles essentielles pour prevenir les accidents, proteger les operateurs et garantir un environnement de travail sain."
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Alert banner */}
        <div className="my-8 flex items-start gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold text-foreground">Attention</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              La securite en atelier est essentielle. En respectant les consignes,
              on reduit considerablement les risques lies a l{"'"}utilisation des
              machines et des outils. Ne negligez jamais les EPI.
            </p>
          </div>
        </div>

        <ContentSection title="Equipements de Protection Individuelle (EPI)">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {epiItems.map((item, i) => {
              const [title, desc] = item.split(" : ")
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
                >
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">{title}</span>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ContentSection>

        <ContentSection title="Regles Generales de Securite">
          <div className="grid gap-3">
            {reglesGenerales.map((regle, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 font-mono text-sm font-bold text-destructive">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{regle}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="Precautions par Machine">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Fraiseuses"
              items={[
                "Fixer solidement les pieces sur la table",
                "Verifier que les fraises sont correctement montees",
                "Eviter de travailler trop pres des fraises en rotation",
              ]}
            />
            <InfoCard
              title="Tours"
              items={[
                "Contre-pointe ou lunettes pour longues pieces",
                "Ne jamais mesurer une piece en rotation",
                "Verifier que le mandrin est bien serre",
              ]}
            />
          </div>
        </ContentSection>

        <ContentSection title="Gestes de Premiers Secours">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">En cas d{"'"}accident</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Eteindre immediatement la machine",
                "Alerter les secours et decrire la situation",
                "Appliquer les premiers soins si necessaire",
                "Evacuer les zones dangereuses si risque accru",
              ].map((geste, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {geste}
                </div>
              ))}
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Maintenance Preventive et Nettoyage">
          <InfoCard
            title="Entretien regulier"
            items={[
              "Nettoyer les machines apres chaque utilisation",
              "Verifier l'etat des outils de coupe regulierement",
              "Lubrifier les pieces mobiles pour eviter les frottements",
              "Inspecter les cables electriques et interrupteurs de securite",
            ]}
          />
        </ContentSection>
      </div>
    </>
  )
}
