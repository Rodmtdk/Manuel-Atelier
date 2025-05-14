"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Lightbulb, RefreshCw } from "lucide-react"
import { getAIRecommendations } from "@/lib/api"

interface AIRecommendationsProps {
  materiau: string
  diametre: number
  nbDents: number
  vitesseCoupe: number
  avanceParDent: number
}

export function AIRecommendations({
  materiau,
  diametre,
  nbDents,
  vitesseCoupe,
  avanceParDent,
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getAIRecommendations({
        material: materiau,
        diameter: diametre,
        teeth: nbDents,
        cuttingSpeed: vitesseCoupe,
        feedPerTooth: avanceParDent,
      })

      setRecommendations(data.recommendations)
    } catch (err) {
      setError("Impossible d'obtenir des recommandations. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Charger les recommandations au premier rendu
  useEffect(() => {
    fetchRecommendations()
  }, [])

  // Exemples de recommandations statiques pour la démonstration
  const staticRecommendations = [
    "Pour ce diamètre d'outil, une vitesse de coupe légèrement plus élevée (90 m/min) pourrait améliorer l'état de surface.",
    "Considérez une avance par dent de 0.06 mm pour optimiser la durée de vie de l'outil tout en maintenant la productivité.",
    "Pour l'acier, utilisez de la lubrification pour éviter la surchauffe et prolonger la durée de vie de l'outil.",
  ]

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-40 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mb-3"></div>
          <p className="text-sm text-gray-400">Analyse des paramètres en cours...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-40 text-center">
          <p className="text-sm text-red-400 mb-3">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchRecommendations}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {(recommendations.length > 0 ? recommendations : staticRecommendations).map((rec, index) => (
              <li key={index} className="flex">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>

          <Button variant="outline" size="sm" className="w-full" onClick={fetchRecommendations}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </>
      )}
    </div>
  )
}
