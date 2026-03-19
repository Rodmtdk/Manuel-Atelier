import type { Metadata } from "next"
import { BannerImage } from "@/components/banner-image"
import { ContentSection } from "@/components/content-section"
import { InfoCard } from "@/components/info-card"
import { ImageShowcase } from "@/components/image-showcase"
import {
  Layers,
  Monitor,
  Cpu,
  FileCode,
  Cog,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "CAO/FAO - Conception et Fabrication Assistées par Ordinateur | Manuel d'Atelier",
  description:
    "Guide complet sur la CAO (Conception Assistée par Ordinateur) et la FAO (Fabrication Assistée par Ordinateur). Logiciels, formats, workflow et bonnes pratiques.",
}

export default function CaoFaoPage() {
  return (
    <>
      {/* Hero Banner */}
      <BannerImage
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freisage-cnc-pbqDleTJcJ18UadCQqDwQxAGLH5eYm.webp"
        alt="Fraisage CNC 5 axes en action - usinage d'une pièce complexe en aluminium"
        height="lg"
        overlay="gradient"
        priority
      >
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
            Du virtuel au réel
          </span>
          <h1 className="text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            CAO/FAO
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Conception et Fabrication Assistées par Ordinateur — De la modélisation 3D à l{"'"}usinage CNC
          </p>
        </div>
      </BannerImage>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Introduction */}
        <ContentSection title="Introduction à la CAO/FAO" id="introduction">
          <p className="text-muted-foreground leading-relaxed">
            La <strong className="text-foreground">CAO</strong> (Conception Assistée par Ordinateur) et la{" "}
            <strong className="text-foreground">FAO</strong> (Fabrication Assistée par Ordinateur) constituent
            le pont numérique entre l{"'"}idée d{"'"}une pièce et sa réalisation physique. Ces technologies
            permettent de concevoir des pièces en 3D, de simuler leur usinage et de générer automatiquement
            les programmes CN pour les machines-outils.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoCard title="CAO - Conception" variant="accent">
              <p>
                Modélisation 3D paramétrique, assemblages, plans 2D, cotation fonctionnelle.
                Le concepteur crée le modèle numérique de la pièce.
              </p>
            </InfoCard>
            <InfoCard title="FAO - Fabrication" variant="default">
              <p>
                Génération des parcours d{"'"}outils, simulation d{"'"}usinage, post-processing.
                Le programmeur transforme le modèle en programme CN.
              </p>
            </InfoCard>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <Lightbulb className="h-5 w-5 shrink-0 text-primary mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Le workflow moderne intègre souvent CAO et FAO dans un même logiciel (Fusion 360, SolidWorks CAM)
              pour fluidifier le passage de la conception à la fabrication.
            </p>
          </div>
        </ContentSection>

        {/* CAO Section */}
        <ContentSection title="Logiciels de CAO" id="logiciels-cao">
          <p className="text-muted-foreground leading-relaxed mb-6">
            Les logiciels de CAO permettent de modéliser des pièces en 3D avec une précision absolue.
            La conception paramétrique permet de modifier facilement les dimensions tout en conservant
            les relations géométriques entre les éléments.
          </p>

          <ImageShowcase
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils%20de%20coupe-6xtY6IzC6x82AchgZdgfHVto6qh6RZ.jpg"
            alt="Outils de coupe modernes - porte-outils et fraises à plaquettes carbure"
            caption="Les outils de coupe doivent être fidèlement modélisés en CAO pour une simulation FAO précise"
            aspectRatio="wide"
          />

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="mb-3 text-left text-base font-semibold text-foreground">
                Principaux logiciels de CAO
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Logiciel</th>
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Éditeur</th>
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Points forts</th>
                  <th className="py-3 text-left font-semibold text-foreground">Usage</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">SolidWorks</td>
                  <td className="py-3 pr-4">Dassault Systèmes</td>
                  <td className="py-3 pr-4">Paramétrique puissant, écosystème riche</td>
                  <td className="py-3">Industrie, PME</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">Fusion 360</td>
                  <td className="py-3 pr-4">Autodesk</td>
                  <td className="py-3 pr-4">Cloud, CAO+FAO intégré, accessible</td>
                  <td className="py-3">Makers, PME, formation</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">Inventor</td>
                  <td className="py-3 pr-4">Autodesk</td>
                  <td className="py-3 pr-4">Mécanique, simulation, gestion données</td>
                  <td className="py-3">Industrie mécanique</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">FreeCAD</td>
                  <td className="py-3 pr-4">Open Source</td>
                  <td className="py-3 pr-4">Gratuit, paramétrique, extensible</td>
                  <td className="py-3">Hobbyistes, formation</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">CATIA</td>
                  <td className="py-3 pr-4">Dassault Systèmes</td>
                  <td className="py-3 pr-4">Surfaces complexes, aéronautique</td>
                  <td className="py-3">Grandes entreprises</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">NX</td>
                  <td className="py-3 pr-4">Siemens</td>
                  <td className="py-3 pr-4">Tout-en-un CAO/FAO/IAO</td>
                  <td className="py-3">Industrie automobile, aéro</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <Monitor className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground">Modélisation</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Esquisses 2D, extrusions, révolutions, balayages, lissages
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <Layers className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground">Assemblages</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Contraintes, liaisons mécaniques, détection de collisions
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <FileCode className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground">Mise en plan</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Vues, coupes, cotation ISO, tolérances, cartouche
              </p>
            </div>
          </div>
        </ContentSection>

        {/* FAO Section */}
        <ContentSection title="Logiciels de FAO" id="logiciels-fao">
          <p className="text-muted-foreground leading-relaxed mb-6">
            Les logiciels de FAO génèrent les parcours d{"'"}outils à partir du modèle CAO. Ils calculent
            les trajectoires optimales, simulent l{"'"}usinage pour détecter les collisions, puis exportent
            le programme via un post-processeur adapté à chaque machine.
          </p>

          <ImageShowcase
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0348-bis-e1704459718413-ZuGzjauqHOaGt8qeFFquJ4PSDbguZE.jpg"
            alt="Tour CNC avec arrosage haute pression - usinage d'un vilebrequin"
            caption="L'usinage CNC complexe nécessite une programmation FAO soignée pour optimiser les parcours"
            aspectRatio="wide"
          />

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="mb-3 text-left text-base font-semibold text-foreground">
                Principaux logiciels de FAO
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Logiciel</th>
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Spécialité</th>
                  <th className="py-3 text-left font-semibold text-foreground">Machines supportées</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">Mastercam</td>
                  <td className="py-3 pr-4">Référence industrielle, très complet</td>
                  <td className="py-3">Fraisage 2-5 axes, tournage, électroérosion</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">Fusion 360 CAM</td>
                  <td className="py-3 pr-4">Intégré à la CAO, cloud</td>
                  <td className="py-3">Fraisage 3-5 axes, tournage, découpe</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">HSMWorks</td>
                  <td className="py-3 pr-4">Plugin SolidWorks</td>
                  <td className="py-3">Fraisage, tournage</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">Esprit</td>
                  <td className="py-3 pr-4">Multi-technologies</td>
                  <td className="py-3">Fraisage, tournage, électroérosion fil</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">PowerMill</td>
                  <td className="py-3 pr-4">Usinage 5 axes complexe</td>
                  <td className="py-3">Moules, matrices, aéronautique</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">TopSolid</td>
                  <td className="py-3 pr-4">CAO/FAO intégré français</td>
                  <td className="py-3">Fraisage, tournage, tôlerie</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Post-processeur :</strong> Chaque combinaison machine/CN nécessite un post-processeur
              spécifique. Un programme généré pour une Fanuc ne fonctionnera pas directement sur une Siemens.
              Vérifiez toujours la compatibilité avant d{"'"}envoyer un programme en machine.
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4">Étapes du workflow FAO</h4>
            <div className="space-y-3">
              {[
                "Import du modèle CAO (STEP, format natif)",
                "Définition du brut (dimensions, matière)",
                "Création des opérations (ébauche, finition, perçage...)",
                "Choix des outils et paramètres de coupe",
                "Simulation et vérification des collisions",
                "Post-processing et génération du code ISO",
                "Transfert vers la machine CNC",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </ContentSection>

        {/* Formats de fichiers */}
        <ContentSection title="Formats de fichiers" id="formats">
          <p className="text-muted-foreground leading-relaxed mb-6">
            L{"'"}échange de données entre logiciels CAO/FAO nécessite des formats standards.
            Chaque format a ses avantages et ses limites en termes de fidélité géométrique et
            de conservation des paramètres.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="mb-3 text-left text-base font-semibold text-foreground">
                Formats d{"'"}échange CAO courants
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Format</th>
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Extension</th>
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">Type</th>
                  <th className="py-3 text-left font-semibold text-foreground">Usage recommandé</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">STEP</td>
                  <td className="py-3 pr-4">.step, .stp</td>
                  <td className="py-3 pr-4">Solide paramétrique</td>
                  <td className="py-3">Échange universel, FAO, archivage</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">IGES</td>
                  <td className="py-3 pr-4">.iges, .igs</td>
                  <td className="py-3 pr-4">Surfaces, courbes</td>
                  <td className="py-3">Ancien standard, compatibilité legacy</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">STL</td>
                  <td className="py-3 pr-4">.stl</td>
                  <td className="py-3 pr-4">Maillage triangulé</td>
                  <td className="py-3">Impression 3D, visualisation</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">DXF/DWG</td>
                  <td className="py-3 pr-4">.dxf, .dwg</td>
                  <td className="py-3 pr-4">2D / 3D</td>
                  <td className="py-3">Plans, découpe laser/plasma</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">Parasolid</td>
                  <td className="py-3 pr-4">.x_t, .x_b</td>
                  <td className="py-3 pr-4">Solide</td>
                  <td className="py-3">Échange SolidWorks, NX, Solid Edge</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">JT</td>
                  <td className="py-3 pr-4">.jt</td>
                  <td className="py-3 pr-4">Léger, visualisation</td>
                  <td className="py-3">Revue de conception, PLM</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoCard title="Format recommandé : STEP AP214" variant="accent">
              <p>
                Le format STEP AP214 (ou AP242) est le standard ISO pour l{"'"}échange de données CAO.
                Il conserve la géométrie exacte et supporte les assemblages.
              </p>
            </InfoCard>
            <InfoCard title="Attention au STL" variant="default">
              <p>
                Le STL approxime les surfaces par des triangles. Plus la résolution est fine,
                plus le fichier est lourd. Inadapté pour l{"'"}usinage de précision.
              </p>
            </InfoCard>
          </div>
        </ContentSection>

        {/* Bonnes pratiques */}
        <ContentSection title="Bonnes pratiques CAO/FAO" id="bonnes-pratiques">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Cog className="h-5 w-5 text-primary" />
                En CAO
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Nommer clairement les fonctions et esquisses",
                  "Utiliser des plans de référence cohérents",
                  "Coter fonctionnellement (chaînes de cotes)",
                  "Prévoir les surépaisseurs d'usinage",
                  "Documenter les modifications (historique)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                En FAO
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Toujours simuler avant d'envoyer en machine",
                  "Vérifier les longueurs d'outils (collisions)",
                  "Adapter la stratégie au matériau",
                  "Optimiser les temps morts (repositionnements)",
                  "Archiver les programmes avec les paramètres",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
            <Lightbulb className="h-5 w-5 shrink-0 text-accent mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Conseil :</strong> Créez une bibliothèque d{"'"}outils dans votre FAO avec les paramètres
              de coupe validés pour chaque matériau. Cela accélère la programmation et garantit la cohérence
              des programmes.
            </p>
          </div>
        </ContentSection>

        {/* CTA vers CNC */}
        <section className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/5 p-8 text-center">
          <Layers className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Passez à la pratique CNC
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Découvrez nos guides sur le fraisage et le tournage CNC pour mettre en application
            vos programmes FAO sur les machines-outils numériques.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/fraisage/conventionnel"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Fraisage
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tournage/conventionnel"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              Tournage
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
