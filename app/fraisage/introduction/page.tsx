import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download, BookOpen, PenToolIcon as Tool, Cog, Calculator } from "lucide-react"

export default function IntroFraisagePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Introduction au fraisage</h1>
        <p className="text-muted-foreground">Principes fondamentaux et techniques de base du fraisage</p>
      </div>

      <Tabs defaultValue="principes" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="principes">Principes de base</TabsTrigger>
          <TabsTrigger value="outils">Outils de fraisage</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
        </TabsList>

        <TabsContent value="principes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Principes fondamentaux du fraisage</CardTitle>
              <CardDescription>Comprendre les bases de l&apos;usinage par enlèvement de matière</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Qu&apos;est-ce que le fraisage ?</h3>
                <p>
                  Le fraisage est un procédé d&apos;usinage par enlèvement de matière utilisant un outil coupant rotatif
                  appelé fraise. Ce procédé permet de réaliser des surfaces planes, des épaulements, des rainures, des
                  poches et des formes complexes sur différents matériaux.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Types de fraisage</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <span className="font-medium">Fraisage en bout :</span> L&apos;axe de rotation de l&apos;outil est
                    perpendiculaire à la surface usinée.
                  </li>
                  <li>
                    <span className="font-medium">Fraisage en roulant :</span> L&apos;axe de rotation de l&apos;outil
                    est parallèle à la surface usinée.
                  </li>
                  <li>
                    <span className="font-medium">Fraisage combiné :</span> Combinaison des deux méthodes précédentes.
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
                    de la vitesse de coupe et du diamètre de l&apos;outil.
                  </li>
                  <li>
                    <span className="font-medium">Avance par dent (fz) :</span> Distance parcourue par une dent de
                    l&apos;outil pendant une rotation.
                  </li>
                  <li>
                    <span className="font-medium">Vitesse d&apos;avance (Vf) :</span> Vitesse de déplacement de
                    l&apos;outil par rapport à la pièce, exprimée en mm/min.
                  </li>
                  <li>
                    <span className="font-medium">Profondeur de passe (ap) :</span> Profondeur de matière enlevée en une
                    passe.
                  </li>
                  <li>
                    <span className="font-medium">Largeur de passe (ae) :</span> Largeur de matière enlevée en une
                    passe.
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
                  <Link href="/fraisage/conventionnel">
                    Fraisage conventionnel <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outils" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outils de fraisage</CardTitle>
              <CardDescription>Les différents types de fraises et leurs applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Types de fraises</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Fraises deux tailles :</span> Utilisées pour le surfaçage et le
                    fraisage en bout. Elles coupent à la fois sur leur périphérie et sur leur face frontale.
                  </li>
                  <li>
                    <span className="font-medium">Fraises cylindriques :</span> Utilisées pour le fraisage en roulant de
                    surfaces planes. Elles coupent uniquement sur leur périphérie.
                  </li>
                  <li>
                    <span className="font-medium">Fraises à surfacer :</span> Conçues spécifiquement pour le surfaçage
                    de grandes surfaces planes.
                  </li>
                  <li>
                    <span className="font-medium">Fraises à rainurer :</span> Utilisées pour créer des rainures et des
                    saignées.
                  </li>
                  <li>
                    <span className="font-medium">Fraises à queue :</span> Outils polyvalents disponibles dans une
                    grande variété de formes et de tailles.
                  </li>
                  <li>
                    <span className="font-medium">Fraises à plaquettes :</span> Équipées de plaquettes amovibles en
                    carbure, céramique ou autres matériaux.
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
              <CardTitle>Techniques de fraisage</CardTitle>
              <CardDescription>Méthodes et stratégies pour optimiser vos opérations de fraisage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Stratégies de fraisage</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Fraisage en avalant :</span> L&apos;outil tourne dans le sens du
                    déplacement de la pièce. Avantages : meilleur état de surface, moins d&apos;efforts sur la pièce,
                    durée de vie de l&apos;outil prolongée.
                  </li>
                  <li>
                    <span className="font-medium">Fraisage en opposition :</span> L&apos;outil tourne dans le sens
                    opposé au déplacement de la pièce. Avantages : engagement progressif des dents, adapté aux machines
                    moins rigides.
                  </li>
                  <li>
                    <span className="font-medium">Fraisage trochoïdal :</span> Trajectoire combinant un mouvement
                    circulaire et un mouvement linéaire. Avantages : réduction des efforts de coupe, usinage de
                    matériaux durs, augmentation de la durée de vie de l&apos;outil.
                  </li>
                  <li>
                    <span className="font-medium">Fraisage par plongée :</span> L&apos;outil plonge verticalement dans
                    la matière. Avantages : adapté aux machines peu rigides, réduction des vibrations.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Conseils pratiques</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Toujours adapter les paramètres de coupe au matériau usiné et à l&apos;outil utilisé.</li>
                  <li>Assurer une lubrification adéquate pour évacuer les copeaux et refroidir l&apos;outil.</li>
                  <li>Vérifier la rigidité du montage de la pièce et de l&apos;outil avant l&apos;usinage.</li>
                  <li>Commencer avec des paramètres conservateurs puis optimiser progressivement.</li>
                  <li>Surveiller l&apos;usure de l&apos;outil et l&apos;état de surface de la pièce.</li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/documents?category=techniques">
                    <Download className="mr-2 h-4 w-4" /> Télécharger le guide
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/fraisage/cnc">
                    Fraisage CNC <ArrowRight className="ml-2 h-4 w-4" />
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
              <Tool className="mr-2 h-5 w-5" /> Fraisage conventionnel
            </CardTitle>
            <CardDescription>Techniques et méthodes pour le fraisage sur machines conventionnelles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Le fraisage conventionnel est réalisé sur des fraiseuses manuelles ou semi-automatiques. Ces machines
              nécessitent l&apos;intervention constante d&apos;un opérateur qualifié pour contrôler les mouvements et
              les paramètres d&apos;usinage.
            </p>
            <Button asChild>
              <Link href="/fraisage/conventionnel">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cog className="mr-2 h-5 w-5" /> Fraisage CNC
            </CardTitle>
            <CardDescription>Programmation et utilisation des fraiseuses à commande numérique</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Le fraisage CNC (Computer Numerical Control) utilise des machines contrôlées par ordinateur pour exécuter
              des programmes d&apos;usinage précis. Cette technologie permet de réaliser des pièces complexes avec une
              grande précision et répétabilité.
            </p>
            <Button asChild>
              <Link href="/fraisage/cnc">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
