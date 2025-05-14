import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download, BookOpen, PenToolIcon as Tool, Cog, Calculator } from "lucide-react"

export default function IntroTournagePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Introduction au tournage</h1>
        <p className="text-muted-foreground">Principes fondamentaux et techniques de base du tournage</p>
      </div>

      <Tabs defaultValue="principes" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="principes">Principes de base</TabsTrigger>
          <TabsTrigger value="outils">Outils de tournage</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
        </TabsList>

        <TabsContent value="principes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Principes fondamentaux du tournage</CardTitle>
              <CardDescription>
                Comprendre les bases de l&apos;usinage par enlèvement de matière en tournage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Qu&apos;est-ce que le tournage ?</h3>
                <p>
                  Le tournage est un procédé d&apos;usinage par enlèvement de matière qui permet de réaliser des pièces
                  de révolution. La pièce est mise en rotation (mouvement de coupe) tandis que l&apos;outil de coupe se
                  déplace selon différents axes (mouvement d&apos;avance). Ce procédé permet de réaliser des cylindres,
                  des cônes, des filetages et diverses formes de révolution.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Types de tournage</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <span className="font-medium">Tournage extérieur :</span> Usinage de la surface extérieure
                    d&apos;une pièce.
                  </li>
                  <li>
                    <span className="font-medium">Tournage intérieur :</span> Usinage de la surface intérieure
                    d&apos;une pièce (alésage).
                  </li>
                  <li>
                    <span className="font-medium">Dressage :</span> Usinage d&apos;une surface plane perpendiculaire à
                    l&apos;axe de rotation.
                  </li>
                  <li>
                    <span className="font-medium">Filetage :</span> Réalisation de filets intérieurs ou extérieurs.
                  </li>
                  <li>
                    <span className="font-medium">Tronçonnage :</span> Séparation d&apos;une pièce en deux parties.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Paramètres de coupe</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <span className="font-medium">Vitesse de coupe (Vc) :</span> Exprimée en m/min, elle dépend du
                    matériau à usiner et de l&apos;outil utilisé.
                  </li>
                  <li>
                    <span className="font-medium">Vitesse de rotation (N) :</span> Exprimée en tr/min, calculée à partir
                    de la vitesse de coupe et du diamètre de la pièce.
                  </li>
                  <li>
                    <span className="font-medium">Avance (f) :</span> Distance parcourue par l&apos;outil pendant une
                    rotation de la pièce, exprimée en mm/tr.
                  </li>
                  <li>
                    <span className="font-medium">Profondeur de passe (ap) :</span> Profondeur de matière enlevée en une
                    passe, mesurée radialement.
                  </li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/calculateur">
                    <Calculator className="mr-2 h-4 w-4" /> Calculateur de paramètres
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/tournage/conventionnel">
                    Tournage conventionnel <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outils" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outils de tournage</CardTitle>
              <CardDescription>Les différents types d&apos;outils et leurs applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Types d&apos;outils</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Outils de chariotage :</span> Pour l&apos;usinage de surfaces
                    cylindriques extérieures.
                  </li>
                  <li>
                    <span className="font-medium">Outils de dressage :</span> Pour l&apos;usinage de surfaces planes
                    perpendiculaires à l&apos;axe de rotation.
                  </li>
                  <li>
                    <span className="font-medium">Outils d&apos;alésage :</span> Pour l&apos;usinage de surfaces
                    cylindriques intérieures.
                  </li>
                  <li>
                    <span className="font-medium">Outils à fileter :</span> Pour la réalisation de filets intérieurs ou
                    extérieurs.
                  </li>
                  <li>
                    <span className="font-medium">Outils à tronçonner :</span> Pour la séparation d&apos;une pièce en
                    deux parties.
                  </li>
                  <li>
                    <span className="font-medium">Outils à former :</span> Pour la réalisation de formes spécifiques.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Matériaux des outils</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <span className="font-medium">Acier rapide (HSS) :</span> Bon rapport qualité/prix, utilisé pour des
                    applications générales.
                  </li>
                  <li>
                    <span className="font-medium">Carbure de tungstène :</span> Plus dur et résistant à l&apos;usure que
                    l&apos;acier rapide, permet des vitesses de coupe plus élevées.
                  </li>
                  <li>
                    <span className="font-medium">Céramique :</span> Pour des vitesses de coupe très élevées et
                    l&apos;usinage de matériaux durs.
                  </li>
                  <li>
                    <span className="font-medium">Nitrure de bore cubique (CBN) :</span> Pour l&apos;usinage de
                    matériaux très durs comme les aciers trempés.
                  </li>
                  <li>
                    <span className="font-medium">Diamant polycristallin (PCD) :</span> Pour l&apos;usinage de matériaux
                    non ferreux et abrasifs.
                  </li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/documents?category=outils">
                    <BookOpen className="mr-2 h-4 w-4" /> Documentation outils
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/cutting-tools">
                    Catalogue d&apos;outils <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="techniques" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Techniques de tournage</CardTitle>
              <CardDescription>Méthodes et stratégies pour optimiser vos opérations de tournage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Stratégies de tournage</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Ébauche :</span> Enlèvement rapide de matière avec des passes
                    profondes et des avances importantes. L&apos;objectif est d&apos;approcher la forme finale.
                  </li>
                  <li>
                    <span className="font-medium">Demi-finition :</span> Préparation de la surface pour la finition avec
                    des passes moins profondes et des avances modérées.
                  </li>
                  <li>
                    <span className="font-medium">Finition :</span> Obtention des dimensions et de l&apos;état de
                    surface finaux avec des passes légères et des avances faibles.
                  </li>
                  <li>
                    <span className="font-medium">Tournage dur :</span> Usinage de matériaux durcis (>45 HRC) avec des
                    outils spécifiques et des paramètres adaptés.
                  </li>
                  <li>
                    <span className="font-medium">Tournage à grande vitesse :</span> Utilisation de vitesses de coupe
                    élevées pour augmenter la productivité et améliorer l&apos;état de surface.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Conseils pratiques</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Toujours adapter les paramètres de coupe au matériau usiné et à l&apos;outil utilisé.</li>
                  <li>Assurer une lubrification adéquate pour évacuer les copeaux et refroidir l&apos;outil.</li>
                  <li>Vérifier la rigidité du montage de la pièce et de l&apos;outil avant l&apos;usinage.</li>
                  <li>Positionner correctement l&apos;outil par rapport à l&apos;axe de la pièce.</li>
                  <li>Surveiller la formation des copeaux et ajuster les paramètres si nécessaire.</li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/documents?category=techniques">
                    <Download className="mr-2 h-4 w-4" /> Télécharger le guide
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/tournage/cnc">
                    Tournage CNC <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tool className="mr-2 h-5 w-5" /> Tournage conventionnel
            </CardTitle>
            <CardDescription>Techniques et méthodes pour le tournage sur machines conventionnelles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Le tournage conventionnel est réalisé sur des tours manuels ou semi-automatiques. Ces machines nécessitent
              l&apos;intervention constante d&apos;un opérateur qualifié pour contrôler les mouvements et les paramètres
              d&apos;usinage.
            </p>
            <Button asChild>
              <Link href="/tournage/conventionnel">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cog className="mr-2 h-5 w-5" /> Tournage CNC
            </CardTitle>
            <CardDescription>Programmation et utilisation des tours à commande numérique</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Le tournage CNC (Computer Numerical Control) utilise des machines contrôlées par ordinateur pour exécuter
              des programmes d&apos;usinage précis. Cette technologie permet de réaliser des pièces complexes avec une
              grande précision et répétabilité.
            </p>
            <Button asChild>
              <Link href="/tournage/cnc">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
