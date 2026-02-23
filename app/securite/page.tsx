import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import { FactCard } from "@/components/fact-card"
import { ShieldAlert, AlertTriangle, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Sécurité en Atelier - Manuel d'Atelier",
  description:
    "Règles essentielles de sécurité en atelier d'usinage : EPI, précautions machines, premiers secours et maintenance préventive.",
}

const epiItems = [
  "Casque de protection : contre les chutes d'objets",
  "Lunettes de sécurité : protection contre projections de copeaux",
  "Gants adaptés : protection des mains (hors fonctionnement machine)",
  "Bouchons d'oreilles ou casque antibruit : contre le bruit excessif",
  "Chaussures de sécurité : protection contre chutes d'objets lourds",
  "Vêtements ajustés : éviter les accrochages dans les machines",
]

const reglesGenerales = [
  "Lire les notices et consignes d'utilisation avant usage",
  "Vérifier les dispositifs de sécurité (carters, capots) fonctionnels",
  "Ne jamais porter de vêtements amples ou bijoux près des machines",
  "Maintenir l'atelier propre et dégagé",
  "Débrancher les machines avant réglage ou entretien",
  "Utiliser les outils adaptés et vérifier leur état",
  "Signaler immédiatement toute anomalie ou dysfonctionnement",
]

export default function SecuritePage() {
  return (
    <>
      <PageHeader
        badge="Sécurité"
        title="Sécurité en Atelier"
        subtitle="Règles essentielles pour prévenir les accidents, protéger les opérateurs et garantir un environnement de travail sain."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/securite-ASW5ItCQnmTVL3n5eRq0nrQKHhXZh8.jpg"
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Alert banner */}
        <div className="my-8 flex items-start gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold text-foreground">Attention</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              La sécurité en atelier est essentielle. En respectant les consignes,
              on réduit considérablement les risques liés à l{"'"}utilisation des
              machines et des outils. Ne négligez jamais les EPI.
            </p>
          </div>
        </div>

        <FactCard
          fact="En France, l'industrie de la métallurgie enregistre environ 40 000 accidents du travail par an (CTN A, 2024). La majorité d'entre eux auraient pu être évités par le port correct des EPI et le respect des consignes de sécurité."
          variant="highlight"
          className="mb-4"
        />

        {/* Visual - Safety poster */}
        <ContentSection title="Équipements de Protection — Vue d'ensemble">
          <ImageShowcase
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/securite-ASW5ItCQnmTVL3n5eRq0nrQKHhXZh8.jpg"
            alt="Panneau Travail et Sécurité montrant tous les équipements de protection individuelle obligatoires en atelier"
            caption="EPI obligatoires : lunettes, bottes, gants, casque, protections auditives, masque respiratoire"
            priority
            aspectRatio="wide"
          />
        </ContentSection>

        <ContentSection title="Équipements de Protection Individuelle (EPI)">
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

        <ContentSection title="Règles Générales de Sécurité">
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

        <ContentSection title="Précautions par Machine">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Fraiseuses"
              items={[
                "Fixer solidement les pièces sur la table",
                "Vérifier que les fraises sont correctement montées",
                "Éviter de travailler trop près des fraises en rotation",
              ]}
            />
            <InfoCard
              title="Tours"
              items={[
                "Contre-pointe ou lunettes pour longues pièces",
                "Ne jamais mesurer une pièce en rotation",
                "Vérifier que le mandrin est bien serré",
              ]}
            />
            <InfoCard
              title="Rectifieuses"
              items={[
                "Vérifier la vitesse maximale marquée sur la meule avant montage",
                "Ne jamais dépasser la vitesse périphérique indiquée",
                "Le protecteur de meule doit couvrir au minimum 180 degrés",
                "Laisser tourner la meule à vide pendant 1 minute après mise en route",
              ]}
            />
            <InfoCard
              title="Perceuses"
              items={[
                "Toujours brider la pièce ou utiliser un étau de perceuse",
                "Ne jamais tenir la pièce à la main pendant le perçage",
                "Retirer la clé du mandrin avant la mise en marche",
                "Utiliser des forets affûtés pour éviter le grippage",
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
                "Éteindre immédiatement la machine",
                "Alerter les secours et décrire la situation",
                "Appliquer les premiers soins si nécessaire",
                "Évacuer les zones dangereuses si risque accru",
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

        <ContentSection title="Maintenance Préventive et Nettoyage">
          <InfoCard
            title="Entretien régulier"
            items={[
              "Nettoyer les machines après chaque utilisation",
              "Vérifier l'état des outils de coupe régulièrement",
              "Lubrifier les pièces mobiles pour éviter les frottements",
              "Inspecter les câbles électriques et interrupteurs de sécurité",
            ]}
          />
        </ContentSection>
      </div>
    </>
  )
}
