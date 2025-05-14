import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CuttingSpeedCalculator } from "@/components/calculators/cutting-speed-calculator"
import { ThreadingCalculator } from "@/components/calculators/threading-calculator"
import { ToleranceCalculator } from "@/components/calculators/tolerance-calculator"
import { MachiningTimeCalculator } from "@/components/calculators/machining-time-calculator"

export default function CalculatorPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Calculateur d&apos;usinage</h1>
        <p className="text-muted-foreground">
          Outils de calcul pour les paramètres d&apos;usinage, les tolérances et plus encore
        </p>
      </div>

      <Tabs defaultValue="cutting-speed" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="cutting-speed">Vitesse de coupe</TabsTrigger>
          <TabsTrigger value="threading">Filetages</TabsTrigger>
          <TabsTrigger value="tolerance">Tolérances ISO</TabsTrigger>
          <TabsTrigger value="machining-time">Temps d&apos;usinage</TabsTrigger>
        </TabsList>

        <TabsContent value="cutting-speed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur de vitesse de coupe</CardTitle>
              <CardDescription>
                Calculez les paramètres de coupe optimaux en fonction du matériau et de l&apos;outil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CuttingSpeedCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur de filetages</CardTitle>
              <CardDescription>
                Calculez les dimensions et paramètres pour différents types de filetages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThreadingCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tolerance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur de tolérances ISO</CardTitle>
              <CardDescription>Déterminez les tolérances selon les normes ISO</CardDescription>
            </CardHeader>
            <CardContent>
              <ToleranceCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="machining-time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur de temps d&apos;usinage</CardTitle>
              <CardDescription>Estimez le temps d&apos;usinage en fonction des paramètres de coupe</CardDescription>
            </CardHeader>
            <CardContent>
              <MachiningTimeCalculator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
