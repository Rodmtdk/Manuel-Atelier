import type { Metadata } from "next"
import { BannerImage } from "@/components/banner-image"
import { ContentSection, InfoCard, HighlightBox, ImageShowcase, TableBlock } from "@/components/content-blocks"
import { Layers, Monitor, Cpu, FileCode, Cog, ArrowRight, CheckCircle2 } from "lucide-react"
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

          <HighlightBox variant="info" className="mt-8">
            Le workflow moderne intègre souvent CAO et FAO dans un même logiciel (Fusion 360, SolidWorks CAM)
            pour fluidifier le passage de la conception à la fabrication.
          </HighlightBox>
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

          <TableBlock
            caption="Principaux logiciels de CAO"
            headers={["Logiciel", "Éditeur", "Points forts", "Usage"]}
            rows={[
              ["SolidWorks", "Dassault Systèmes", "Paramétrique puissant, écosystème riche", "Industrie, PME"],
              ["Fusion 360", "Autodesk", "Cloud, CAO+FAO intégré, accessible", "Makers, PME, formation"],
              ["Inventor", "Autodesk", "Mécanique, simulation, gestion données", "Industrie mécanique"],
              ["FreeCAD", "Open Source", "Gratuit, paramétrique, extensible", "Hobbyistes, formation"],
              ["CATIA", "Dassault Systèmes", "Surfaces complexes, aéronautique", "Grandes entreprises"],
              ["NX", "Siemens", "Tout-en-un CAO/FAO/IAO", "Industrie automobile, aéro"],
            ]}
          />

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

          <TableBlock
            caption="Principaux logiciels de FAO"
            headers={["Logiciel", "Spécialité", "Machines supportées"]}
            rows={[
              ["Mastercam", "Référence industrielle, très complet", "Fraisage 2-5 axes, tournage, électroérosion"],
              ["Fusion 360 CAM", "Intégré à la CAO, cloud", "Fraisage 3-5 axes, tournage, découpe"],
              ["HSMWorks", "Plugin SolidWorks", "Fraisage, tournage"],
              ["Esprit", "Multi-technologies", "Fraisage, tournage, électroérosion fil"],
              ["PowerMill", "Usinage 5 axes complexe", "Moules, matrices, aéronautique"],
              ["TopSolid", "CAO/FAO intégré français", "Fraisage, tournage, tôlerie"],
            ]}
          />

          <HighlightBox variant="warning" className="mt-8">
            <strong>Post-processeur :</strong> Chaque combinaison machine/CN nécessite un post-processeur
            spécifique. Un programme généré pour une Fanuc ne fonctionnera pas directement sur une Siemens.
            Vérifiez toujours la compatibilité avant d{"'"}envoyer un programme en machine.
          </HighlightBox>

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

          <TableBlock
            caption="Formats d'échange CAO courants"
            headers={["Format", "Extension", "Type", "Usage recommandé"]}
            rows={[
              ["STEP", ".step, .stp", "Solide paramétrique", "Échange universel, FAO, archivage"],
              ["IGES", ".iges, .igs", "Surfaces, courbes", "Ancien standard, compatibilité legacy"],
              ["STL", ".stl", "Maillage triangulé", "Impression 3D, visualisation"],
              ["DXF/DWG", ".dxf, .dwg", "2D / 3D", "Plans, découpe laser/plasma"],
              ["Parasolid", ".x_t, .x_b", "Solide", "Échange SolidWorks, NX, Solid Edge"],
              ["JT", ".jt", "Léger, visualisation", "Revue de conception, PLM"],
            ]}
          />

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

          <HighlightBox variant="tip" className="mt-8">
            <strong>Conseil :</strong> Créez une bibliothèque d{"'"}outils dans votre FAO avec les paramètres
            de coupe validés pour chaque matériau. Cela accélère la programmation et garantit la cohérence
            des programmes.
          </HighlightBox>
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
              href="/fraisage/cnc"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Fraisage CNC
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tournage/cnc"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              Tournage CNC
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
