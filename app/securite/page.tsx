import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download, AlertTriangle, ShieldCheck, FileText } from "lucide-react"

export default function SecuritePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sécurité en atelier</h1>
        <p className="text-muted-foreground">Consignes et bonnes pratiques pour un environnement de travail sécurisé</p>
      </div>

      <Tabs defaultValue="epi" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="epi">Équipements de protection</TabsTrigger>
          <TabsTrigger value="regles">Règles générales</TabsTrigger>
          <TabsTrigger value="machines">Sécurité machines</TabsTrigger>
          <TabsTrigger value="urgence">Situations d&apos;urgence</TabsTrigger>
        </TabsList>

        <TabsContent value="epi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Équipements de Protection Individuelle (EPI)</CardTitle>
              <CardDescription>
                Les EPI sont indispensables pour protéger les opérateurs des dangers potentiels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Équipements essentiels</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Lunettes de sécurité :</span> Protègent les yeux des projections de
                    copeaux ou de produits chimiques. Obligatoires en permanence dans l&apos;atelier.
                  </li>
                  <li>
                    <span className="font-medium">Chaussures de sécurité :</span> Protègent les pieds contre les chutes
                    d&apos;objets lourds et les perforations. Doivent être portées en permanence.
                  </li>
                  <li>
                    <span className="font-medium">Gants adaptés :</span> Protègent les mains des coupures, brûlures ou
                    abrasions. Attention : ne pas porter de gants près des machines en rotation.
                  </li>
                  <li>
                    <span className="font-medium">Protection auditive :</span> Bouchons d&apos;oreilles ou casque
                    antibruit pour réduire l&apos;exposition au bruit excessif des machines.
                  </li>
                  <li>
                    <span className="font-medium">Vêtements ajustés :</span> Évitent les accrochages dans les machines
                    en mouvement. Pas de vêtements amples, bijoux ou cheveux longs non attachés.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Situations spécifiques</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <span className="font-medium">Travail avec des produits chimiques :</span> Utiliser des gants
                    résistants aux produits chimiques et un masque respiratoire si nécessaire.
                  </li>
                  <li>
                    <span className="font-medium">Soudage :</span> Porter un masque de soudage, des gants résistants à
                    la chaleur et des vêtements ignifuges.
                  </li>
                  <li>
                    <span className="font-medium">Meulage :</span> Utiliser un écran facial en plus des lunettes de
                    sécurité.
                  </li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/documents?category=securite">
                    <Download className="mr-2 h-4 w-4" /> Télécharger la fiche EPI
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/securite/formation">
                    Formation sécurité <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Règles générales de sécurité</CardTitle>
              <CardDescription>Principes fondamentaux pour un environnement de travail sécurisé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Avant de commencer</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Lire attentivement les notices et consignes d&apos;utilisation des machines.</li>
                  <li>S&apos;assurer que les dispositifs de sécurité sont en place et fonctionnels.</li>
                  <li>Vérifier l&apos;état des outils et des équipements.</li>
                  <li>Porter les EPI appropriés.</li>
                  <li>S&apos;assurer que la zone de travail est propre et dégagée.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Pendant le travail</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Rester concentré sur la tâche en cours.</li>
                  <li>Ne jamais retirer les protections des machines.</li>
                  <li>Ne pas laisser une machine en fonctionnement sans surveillance.</li>
                  <li>Maintenir la zone de travail propre et dégagée.</li>
                  <li>Signaler immédiatement tout dysfonctionnement ou situation dangereuse.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Après le travail</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Éteindre et débrancher les machines.</li>
                  <li>Nettoyer la zone de travail et les équipements.</li>
                  <li>Ranger les outils et les matériaux.</li>
                  <li>Signaler tout problème rencontré pendant le travail.</li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/documents?category=securite">
                    <Download className="mr-2 h-4 w-4" /> Télécharger le règlement
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/securite/risques">
                    Analyse des risques <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="machines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité spécifique aux machines</CardTitle>
              <CardDescription>Précautions particulières pour chaque type de machine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Fraiseuses</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fixer solidement les pièces à usiner sur la table pour éviter tout mouvement.</li>
                  <li>Vérifier que les fraises sont correctement montées et serrées.</li>
                  <li>S&apos;assurer que la vitesse de rotation est adaptée au matériau et à l&apos;outil.</li>
                  <li>Ne jamais mesurer une pièce pendant que la machine est en fonctionnement.</li>
                  <li>Utiliser un pinceau ou un crochet pour enlever les copeaux, jamais les mains.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tours</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Utiliser la contre-pointe ou les lunettes pour soutenir les longues pièces.</li>
                  <li>Vérifier que le mandrin est bien serré avant de démarrer la machine.</li>
                  <li>Ne jamais laisser la clé de mandrin sur le mandrin.</li>
                  <li>S&apos;assurer que l&apos;outil est correctement positionné et fixé.</li>
                  <li>Ne jamais mesurer une pièce en rotation.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Machines CNC</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>S&apos;assurer que le programme a été vérifié avant de lancer l&apos;usinage.</li>
                  <li>Vérifier que les portes de sécurité sont fermées avant de démarrer la machine.</li>
                  <li>Connaître l&apos;emplacement et le fonctionnement du bouton d&apos;arrêt d&apos;urgence.</li>
                  <li>Ne jamais ouvrir les portes de sécurité pendant l&apos;usinage.</li>
                  <li>Être particulièrement vigilant lors des phases de réglage et de mise au point.</li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/documents?category=securite">
                    <Download className="mr-2 h-4 w-4" /> Fiches sécurité machines
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/securite/maintenance">
                    Maintenance préventive <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des situations d&apos;urgence</CardTitle>
              <CardDescription>Procédures à suivre en cas d&apos;accident ou d&apos;incident</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">En cas d&apos;accident</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Arrêter immédiatement la machine en utilisant le bouton d&apos;arrêt d&apos;urgence.</li>
                  <li>Alerter les secours et décrire précisément la situation.</li>
                  <li>
                    Prodiguer les premiers soins si vous êtes formé, sinon attendre l&apos;arrivée des secouristes.
                  </li>
                  <li>Ne pas déplacer la victime sauf en cas de danger imminent.</li>
                  <li>Sécuriser la zone pour éviter d&apos;autres accidents.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">En cas d&apos;incendie</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Donner l&apos;alerte et déclencher l&apos;alarme incendie.</li>
                  <li>
                    Utiliser l&apos;extincteur approprié si l&apos;incendie est maîtrisable et si vous êtes formé.
                  </li>
                  <li>Évacuer les lieux en suivant les consignes d&apos;évacuation.</li>
                  <li>Ne pas utiliser les ascenseurs.</li>
                  <li>Se rendre au point de rassemblement et attendre les instructions.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Numéros d&apos;urgence</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <span className="font-medium">SAMU :</span> 15
                  </li>
                  <li>
                    <span className="font-medium">Pompiers :</span> 18
                  </li>
                  <li>
                    <span className="font-medium">Police :</span> 17
                  </li>
                  <li>
                    <span className="font-medium">Numéro d&apos;urgence européen :</span> 112
                  </li>
                  <li>
                    <span className="font-medium">Responsable sécurité de l&apos;atelier :</span> [Numéro interne]
                  </li>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link href="/documents?category=securite">
                    <Download className="mr-2 h-4 w-4" /> Plan d&apos;évacuation
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/securite/premiers-secours">
                    Formation premiers secours <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-500">
              <AlertTriangle className="mr-2 h-5 w-5" /> Risques spécifiques
            </CardTitle>
            <CardDescription>Identification et prévention des risques en atelier d&apos;usinage</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">Risques mécaniques :</span> Coupures, écrasements, entraînements par les
                  pièces en mouvement.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">Risques chimiques :</span> Exposition aux fluides de coupe, solvants et
                  autres produits.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">Risques physiques :</span> Bruit, vibrations, projections de copeaux.
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/securite/risques">
                  Consulter l&apos;analyse des risques <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-green-500">
              <ShieldCheck className="mr-2 h-5 w-5" /> Certifications et normes
            </CardTitle>
            <CardDescription>Standards et réglementations applicables en atelier</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">ISO 45001 :</span> Système de management de la santé et de la sécurité
                  au travail.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">Directive Machines 2006/42/CE :</span> Exigences essentielles de santé
                  et de sécurité.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">Code du travail :</span> Articles relatifs à la sécurité des
                  travailleurs.
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/securite/normes">
                  Consulter les normes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Documentation de sécurité
          </CardTitle>
          <CardDescription>Ressources et documents essentiels pour la sécurité en atelier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" asChild className="justify-start">
              <Link href="/documents/securite/fiches-epi.pdf">
                <Download className="mr-2 h-4 w-4" /> Fiches EPI
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/documents/securite/procedures-urgence.pdf">
                <Download className="mr-2 h-4 w-4" /> Procédures d&apos;urgence
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/documents/securite/fiches-machines.pdf">
                <Download className="mr-2 h-4 w-4" /> Fiches sécurité machines
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/documents/securite/plan-evacuation.pdf">
                <Download className="mr-2 h-4 w-4" /> Plan d&apos;évacuation
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/documents/securite/registre-incidents.pdf">
                <Download className="mr-2 h-4 w-4" /> Registre des incidents
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/documents/securite/formation.pdf">
                <Download className="mr-2 h-4 w-4" /> Programme de formation
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
