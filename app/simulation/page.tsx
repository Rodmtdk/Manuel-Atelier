import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MachiningSim3D } from "@/components/simulation/machining-sim-3d"
import { ToolpathVisualizer } from "@/components/simulation/toolpath-visualizer"
import { CuttingForceSimulator } from "@/components/simulation/cutting-force-simulator"

export default function SimulationPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Simulation d&apos;usinage</h1>
        <p className="text-muted-foreground">
          Visualisez et optimisez vos processus d&apos;usinage avec des simulations interactives
        </p>
      </div>

      <Tabs defaultValue="3d-sim" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="3d-sim">Simulation 3D</TabsTrigger>
          <TabsTrigger value="toolpath">Visualisation de trajectoire</TabsTrigger>
          <TabsTrigger value="cutting-forces">Forces de coupe</TabsTrigger>
        </TabsList>

        <TabsContent value="3d-sim" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Simulation 3D d&apos;usinage</CardTitle>
              <CardDescription>Visualisez l&apos;enlèvement de matière en temps réel</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <MachiningSim3D />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toolpath" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visualisation de trajectoire d&apos;outil</CardTitle>
              <CardDescription>Analysez les trajectoires d&apos;outil générées par votre FAO</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <ToolpathVisualizer />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cutting-forces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Simulation des forces de coupe</CardTitle>
              <CardDescription>Analysez les forces générées pendant l&apos;usinage</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <CuttingForceSimulator />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
