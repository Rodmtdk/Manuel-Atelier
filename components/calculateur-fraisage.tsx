"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Download, RotateCw, Calculator, Save, Share } from "lucide-react"
import { AIRecommendations } from "@/components/ai-recommendations"
import { saveCalculation } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

// Définition des types de matériaux et leurs vitesses de coupe recommandées
const materiaux = [
  { id: "acier", nom: "Acier", vc: 80 },
  { id: "acier_inox", nom: "Acier inoxydable", vc: 60 },
  { id: "fonte", nom: "Fonte", vc: 100 },
  { id: "aluminium", nom: "Aluminium", vc: 300 },
  { id: "laiton", nom: "Laiton", vc: 150 },
  { id: "bronze", nom: "Bronze", vc: 120 },
  { id: "plastique", nom: "Plastique", vc: 200 },
  { id: "titane", nom: "Titane", vc: 40 },
  { id: "inconel", nom: "Inconel", vc: 30 },
]

export function CalculateurFraisage() {
  // États pour les paramètres d'entrée
  const [diametre, setDiametre] = useState<number>(10)
  const [nbDents, setNbDents] = useState<number>(4)
  const [vitesseCoupe, setVitesseCoupe] = useState<number>(80)
  const [avanceParDent, setAvanceParDent] = useState<number>(0.05)
  const [materiau, setMateriau] = useState<string>("acier")
  const [nom, setNom] = useState<string>("")

  // États pour les résultats calculés
  const [vitesseRotation, setVitesseRotation] = useState<number>(0)
  const [vitesseAvance, setVitesseAvance] = useState<number>(0)
  const [chartData, setChartData] = useState<any[]>([])
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const { toast } = useToast()

  // Calcul des paramètres lorsque les entrées changent
  useEffect(() => {
    calculerParametres()
  }, [diametre, nbDents, vitesseCoupe, avanceParDent])

  // Mise à jour de la vitesse de coupe lorsque le matériau change
  useEffect(() => {
    const materielSelectionne = materiaux.find((m) => m.id === materiau)
    if (materielSelectionne) {
      setVitesseCoupe(materielSelectionne.vc)
    }
  }, [materiau])

  // Fonction de calcul des paramètres
  const calculerParametres = () => {
    if (diametre && nbDents && vitesseCoupe && avanceParDent) {
      // Calcul de la vitesse de rotation (tr/min)
      const n = (1000 * vitesseCoupe) / (Math.PI * diametre)

      // Calcul de la vitesse d'avance (mm/min)
      const vf = n * nbDents * avanceParDent

      setVitesseRotation(Math.round(n))
      setVitesseAvance(Math.round(vf))

      // Mise à jour des données du graphique
      setChartData([
        { name: "Vitesse de rotation (tr/min)", value: Math.round(n) },
        { name: "Vitesse d'avance (mm/min)", value: Math.round(vf) },
      ])
    }
  }

  // Fonction de réinitialisation des champs
  const reinitialiser = () => {
    setDiametre(10)
    setNbDents(4)
    setVitesseCoupe(80)
    setAvanceParDent(0.05)
    setMateriau("acier")
    setNom("")
  }

  // Fonction d'exportation des résultats en CSV
  const exporterCSV = () => {
    const headers = "Paramètre,Valeur\n"
    const rows = [
      `Diamètre de l'outil (mm),${diametre}`,
      `Nombre de dents,${nbDents}`,
      `Vitesse de coupe (m/min),${vitesseCoupe}`,
      `Avance par dent (mm/dt),${avanceParDent}`,
      `Matériau,${materiaux.find((m) => m.id === materiau)?.nom || ""}`,
      `Vitesse de rotation (tr/min),${vitesseRotation}`,
      `Vitesse d'avance (mm/min),${vitesseAvance}`,
    ].join("\n")

    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "parametres_fraisage.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Fonction pour sauvegarder le calcul
  const sauvegarderCalcul = async () => {
    if (!nom) {
      toast({
        title: "Nom requis",
        description: "Veuillez donner un nom à votre calcul avant de l'enregistrer.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      await saveCalculation({
        type: "fraisage",
        name: nom,
        material: materiau,
        parameters: {
          diameter: diametre,
          teeth: nbDents,
          cuttingSpeed: vitesseCoupe,
          feedPerTooth: avanceParDent,
        },
        results: {
          rotationSpeed: vitesseRotation,
          feedRate: vitesseAvance,
        },
        timestamp: new Date().toISOString(),
      })

      toast({
        title: "Calcul sauvegardé",
        description: "Votre calcul a été enregistré avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le calcul. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-cyan-400">Paramètres d'entrée</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="parametres" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="parametres">Paramètres</TabsTrigger>
              <TabsTrigger value="materiaux">Matériaux</TabsTrigger>
            </TabsList>

            <TabsContent value="parametres" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom du calcul</Label>
                  <Input
                    id="nom"
                    placeholder="Ex: Fraisage pièce A123"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materiau">Matériau</Label>
                  <Select value={materiau} onValueChange={setMateriau}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      {materiaux.map((mat) => (
                        <SelectItem key={mat.id} value={mat.id}>
                          {mat.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diametre">Diamètre de l'outil (mm)</Label>
                  <Input
                    id="diametre"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={diametre}
                    onChange={(e) => setDiametre(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nbDents">Nombre de dents</Label>
                  <Input
                    id="nbDents"
                    type="number"
                    min="1"
                    step="1"
                    value={nbDents}
                    onChange={(e) => setNbDents(Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vitesseCoupe">Vitesse de coupe (m/min)</Label>
                  <Input
                    id="vitesseCoupe"
                    type="number"
                    min="1"
                    step="1"
                    value={vitesseCoupe}
                    onChange={(e) => setVitesseCoupe(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avanceParDent">Avance par dent (mm/dt)</Label>
                  <Input
                    id="avanceParDent"
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={avanceParDent}
                    onChange={(e) => setAvanceParDent(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-between mt-6">
                <Button variant="outline" onClick={reinitialiser}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Réinitialiser
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={sauvegarderCalcul} disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                  </Button>

                  <Button onClick={calculerParametres}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="materiaux" className="pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="materiau">Sélectionner un matériau</Label>
                  <Select value={materiau} onValueChange={setMateriau}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      {materiaux.map((mat) => (
                        <SelectItem key={mat.id} value={mat.id}>
                          {mat.nom} - {mat.vc} m/min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Vitesses de coupe recommandées</h3>
                  <div className="bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2">Matériau</th>
                          <th className="text-right py-2">Vitesse de coupe (m/min)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {materiaux.map((mat) => (
                          <tr key={mat.id} className="border-b border-gray-700 last:border-0">
                            <td className="py-2">{mat.nom}</td>
                            <td className="text-right py-2">{mat.vc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-cyan-400">Résultats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Vitesse de rotation</p>
                <p className="text-2xl font-bold">{vitesseRotation} tr/min</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Vitesse d'avance</p>
                <p className="text-2xl font-bold">{vitesseAvance} mm/min</p>
              </div>
            </div>

            <div className="h-64">
              <ChartContainer
                config={{
                  value: {
                    label: "Valeur",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--color-value)" name="Valeur" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="w-full" onClick={exporterCSV}>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>

              <Button variant="outline" className="w-full">
                <Share className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-cyan-400">Formules utilisées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Vitesse de rotation (n)</h3>
              <p className="text-gray-300 mb-2">La vitesse de rotation de la broche en tours par minute.</p>
              <div className="bg-gray-900 p-3 rounded text-center">
                <p className="text-cyan-400 font-mono">n = (1000 × Vc) / (π × D)</p>
              </div>
              <ul className="mt-3 text-sm text-gray-300 space-y-1">
                <li>n = Vitesse de rotation (tr/min)</li>
                <li>Vc = Vitesse de coupe (m/min)</li>
                <li>D = Diamètre de l'outil (mm)</li>
                <li>π = 3.14159...</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Vitesse d'avance (Vf)</h3>
              <p className="text-gray-300 mb-2">La vitesse d'avance de l'outil en millimètres par minute.</p>
              <div className="bg-gray-900 p-3 rounded text-center">
                <p className="text-cyan-400 font-mono">Vf = n × Z × fz</p>
              </div>
              <ul className="mt-3 text-sm text-gray-300 space-y-1">
                <li>Vf = Vitesse d'avance (mm/min)</li>
                <li>n = Vitesse de rotation (tr/min)</li>
                <li>Z = Nombre de dents</li>
                <li>fz = Avance par dent (mm/dt)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl text-cyan-400">Recommandations IA</CardTitle>
        </CardHeader>
        <CardContent>
          <AIRecommendations
            materiau={materiau}
            diametre={diametre}
            nbDents={nbDents}
            vitesseCoupe={vitesseCoupe}
            avanceParDent={avanceParDent}
          />
        </CardContent>
      </Card>
    </div>
  )
}
