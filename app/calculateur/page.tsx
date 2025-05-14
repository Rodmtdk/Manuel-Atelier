import { Suspense } from "react"
import { CalculateurFraisage } from "@/components/calculateur-fraisage"
import { CalculateurSkeleton } from "@/components/calculateur-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoriqueCalculs } from "@/components/historique-calculs"

export default function CalculateurPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-cyan-400">
        Calculateur de Paramètres d'Usinage
      </h1>
      <p className="text-center text-gray-300 mb-8">
        Optimisez vos paramètres d'usinage pour des résultats précis et efficaces
      </p>

      <Tabs defaultValue="fraisage" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="fraisage">Fraisage</TabsTrigger>
          <TabsTrigger value="tournage">Tournage</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="fraisage">
          <Suspense fallback={<CalculateurSkeleton />}>
            <CalculateurFraisage />
          </Suspense>
        </TabsContent>

        <TabsContent value="tournage">
          <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Module de tournage bientôt disponible</p>
          </div>
        </TabsContent>

        <TabsContent value="historique">
          <HistoriqueCalculs />
        </TabsContent>
      </Tabs>
    </main>
  )
}
