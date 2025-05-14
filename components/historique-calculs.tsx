"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, FileDown, Eye } from "lucide-react"
import { fetchCalculations, deleteCalculation } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

type Calculation = {
  id: string
  type: string
  name: string
  material: string
  parameters: {
    diameter: number
    teeth: number
    cuttingSpeed: number
    feedPerTooth: number
  }
  results: {
    rotationSpeed: number
    feedRate: number
  }
  timestamp: string
}

export function HistoriqueCalculs() {
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadCalculations()
  }, [])

  const loadCalculations = async () => {
    setIsLoading(true)
    try {
      const data = await fetchCalculations()
      setCalculations(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des calculs.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCalculation(id)
      setCalculations(calculations.filter((calc) => calc.id !== id))
      toast({
        title: "Supprimé",
        description: "Le calcul a été supprimé avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le calcul.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getMaterialName = (materialId: string) => {
    const materials: Record<string, string> = {
      acier: "Acier",
      acier_inox: "Acier inoxydable",
      fonte: "Fonte",
      aluminium: "Aluminium",
      laiton: "Laiton",
      bronze: "Bronze",
      plastique: "Plastique",
      titane: "Titane",
      inconel: "Inconel",
    }
    return materials[materialId] || materialId
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (calculations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-gray-400 mb-4">Aucun calcul enregistré</p>
        <p className="text-sm text-gray-500 max-w-md">
          Vos calculs sauvegardés apparaîtront ici. Utilisez le bouton "Sauvegarder" dans le calculateur pour
          enregistrer vos paramètres.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="fraisage">
        <TabsList>
          <TabsTrigger value="fraisage">Fraisage</TabsTrigger>
          <TabsTrigger value="tournage">Tournage</TabsTrigger>
        </TabsList>

        <TabsContent value="fraisage" className="mt-4">
          <div className="space-y-4">
            {calculations
              .filter((calc) => calc.type === "fraisage")
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((calc) => (
                <Card key={calc.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-grow p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{calc.name}</h3>
                            <p className="text-sm text-gray-400">{formatDate(calc.timestamp)}</p>
                          </div>
                          <span className="bg-cyan-900/30 text-cyan-400 text-xs px-2 py-1 rounded">
                            {getMaterialName(calc.material)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm">
                          <div>
                            <span className="text-gray-400">Diamètre:</span> {calc.parameters.diameter} mm
                          </div>
                          <div>
                            <span className="text-gray-400">Dents:</span> {calc.parameters.teeth}
                          </div>
                          <div>
                            <span className="text-gray-400">Vc:</span> {calc.parameters.cuttingSpeed} m/min
                          </div>
                          <div>
                            <span className="text-gray-400">fz:</span> {calc.parameters.feedPerTooth} mm/dt
                          </div>
                        </div>

                        <div className="flex gap-4 mt-3">
                          <div>
                            <span className="text-xs text-gray-400">Vitesse de rotation</span>
                            <p className="font-semibold">{calc.results.rotationSpeed} tr/min</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Vitesse d'avance</span>
                            <p className="font-semibold">{calc.results.feedRate} mm/min</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-gray-700">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-1 rounded-none text-gray-400 hover:text-white"
                        >
                          <Eye size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-1 rounded-none text-gray-400 hover:text-white"
                        >
                          <FileDown size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-1 rounded-none text-gray-400 hover:text-red-500"
                          onClick={() => handleDelete(calc.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="tournage" className="mt-4">
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-gray-400">Aucun calcul de tournage enregistré</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
