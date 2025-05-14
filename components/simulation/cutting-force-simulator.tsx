"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Material properties (simplified)
const materialProperties = {
  C45: { hardness: 200, specificCuttingForce: 2200 },
  "EN AW 2017": { hardness: 100, specificCuttingForce: 900 },
  "7075": { hardness: 150, specificCuttingForce: 1100 },
  Inox: { hardness: 250, specificCuttingForce: 2500 },
  Titane: { hardness: 350, specificCuttingForce: 3000 },
}

// Generate force data based on parameters
const generateForceData = (material, toolDiameter, depth, feedRate, spindleSpeed) => {
  const materialData = materialProperties[material]
  const specificCuttingForce = materialData.specificCuttingForce

  // Calculate chip thickness (simplified)
  const chipThickness = feedRate / spindleSpeed

  // Calculate cutting area (simplified)
  const cuttingArea = depth * chipThickness

  // Base cutting force
  const baseCuttingForce = specificCuttingForce * cuttingArea

  // Generate data points for one revolution
  const dataPoints = []
  const numPoints = 100

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 360
    const radians = (angle * Math.PI) / 180

    // Simulate force variation during rotation (simplified model)
    const forceFactor = Math.abs(Math.sin(radians * 2)) * 0.3 + 0.7
    const tangentialForce = baseCuttingForce * forceFactor

    // Calculate force components
    const forceX = tangentialForce * Math.cos(radians)
    const forceY = tangentialForce * Math.sin(radians)
    const forceZ = tangentialForce * 0.2 // Axial force component (simplified)

    // Calculate resultant force
    const resultantForce = Math.sqrt(forceX * forceX + forceY * forceY + forceZ * forceZ)

    dataPoints.push({
      angle,
      forceX: Math.round(forceX),
      forceY: Math.round(forceY),
      forceZ: Math.round(forceZ),
      resultantForce: Math.round(resultantForce),
    })
  }

  return dataPoints
}

export function CuttingForceSimulator() {
  const [material, setMaterial] = useState("C45")
  const [toolDiameter, setToolDiameter] = useState("10")
  const [depth, setDepth] = useState("1")
  const [feedRate, setFeedRate] = useState("0.1")
  const [spindleSpeed, setSpindleSpeed] = useState("1000")
  const [forceData, setForceData] = useState([])
  const [maxForce, setMaxForce] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(0)

  const calculateForces = () => {
    const d = Number.parseFloat(toolDiameter)
    const ap = Number.parseFloat(depth)
    const f = Number.parseFloat(feedRate)
    const n = Number.parseFloat(spindleSpeed)

    if (isNaN(d) || isNaN(ap) || isNaN(f) || isNaN(n) || d <= 0 || ap <= 0 || f <= 0 || n <= 0) {
      return
    }

    const data = generateForceData(material, d, ap, f, n)
    setForceData(data)

    // Find maximum force for scaling
    const maxForceValue = Math.max(...data.map((point) => point.resultantForce))
    setMaxForce(maxForceValue)
  }

  // Get current force values based on rotation angle
  const getCurrentForces = () => {
    if (forceData.length === 0) return { x: 0, y: 0, z: 0, resultant: 0 }

    // Find closest angle in data
    const index = Math.round((rotationAngle / 360) * forceData.length) % forceData.length
    const point = forceData[index]

    return {
      x: point.forceX,
      y: point.forceY,
      z: point.forceZ,
      resultant: point.resultantForce,
    }
  }

  const currentForces = getCurrentForces()

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="material">Matière</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger id="material">
                <SelectValue placeholder="Sélectionner une matière" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C45">Acier C45</SelectItem>
                <SelectItem value="EN AW 2017">Aluminium EN AW 2017</SelectItem>
                <SelectItem value="7075">Aluminium 7075</SelectItem>
                <SelectItem value="Inox">Acier inoxydable</SelectItem>
                <SelectItem value="Titane">Titane</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-diameter">Diamètre d&apos;outil (mm)</Label>
            <Input
              id="tool-diameter"
              type="number"
              value={toolDiameter}
              onChange={(e) => setToolDiameter(e.target.value)}
              min="0.1"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="depth">Profondeur de passe (mm)</Label>
            <Input
              id="depth"
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              min="0.1"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feed-rate">Avance par tour (mm/tr)</Label>
            <Input
              id="feed-rate"
              type="number"
              value={feedRate}
              onChange={(e) => setFeedRate(e.target.value)}
              min="0.01"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spindle-speed">Vitesse de rotation (tr/min)</Label>
            <Input
              id="spindle-speed"
              type="number"
              value={spindleSpeed}
              onChange={(e) => setSpindleSpeed(e.target.value)}
              min="1"
              step="1"
            />
          </div>
        </div>

        <Button onClick={calculateForces} className="w-full">
          Calculer les forces de coupe
        </Button>
      </div>

      {forceData.length > 0 && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          <div className="lg:col-span-2 h-[300px]">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="angle"
                      label={{ value: "Angle de rotation (°)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis label={{ value: "Force (N)", angle: -90, position: "insideLeft" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="forceX" stroke="#ef4444" name="Force X (N)" />
                    <Line type="monotone" dataKey="forceY" stroke="#22c55e" name="Force Y (N)" />
                    <Line type="monotone" dataKey="forceZ" stroke="#3b82f6" name="Force Z (N)" />
                    <Line type="monotone" dataKey="resultantForce" stroke="#a855f7" name="Force résultante (N)" />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend>
                <ChartLegendItem name="Force X (N)" color="#ef4444" />
                <ChartLegendItem name="Force Y (N)" color="#22c55e" />
                <ChartLegendItem name="Force Z (N)" color="#3b82f6" />
                <ChartLegendItem name="Force résultante (N)" color="#a855f7" />
              </ChartLegend>
            </ChartContainer>
          </div>

          <div className="space-y-4">
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="text-lg font-medium mb-4">Forces actuelles</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Angle de rotation</Label>
                  <Slider
                    value={[rotationAngle]}
                    max={359}
                    step={1}
                    onValueChange={(value) => setRotationAngle(value[0])}
                  />
                  <div className="text-right text-sm">{rotationAngle}°</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Force X:</span>
                    <span className="font-medium text-red-500">{currentForces.x} N</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(Math.abs(currentForces.x) / maxForce) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Force Y:</span>
                    <span className="font-medium text-green-500">{currentForces.y} N</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(Math.abs(currentForces.y) / maxForce) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Force Z:</span>
                    <span className="font-medium text-blue-500">{currentForces.z} N</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(Math.abs(currentForces.z) / maxForce) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Force résultante:</span>
                    <span className="font-medium text-purple-500">{currentForces.resultant} N</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(currentForces.resultant / maxForce) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border">
              <h3 className="text-lg font-medium mb-2">Analyse</h3>
              <p className="text-sm text-muted-foreground">
                Force maximale: <span className="font-medium">{maxForce} N</span>
                <br />
                Puissance estimée:{" "}
                <span className="font-medium">
                  {Math.round((maxForce * Number.parseFloat(feedRate) * Number.parseFloat(spindleSpeed)) / 60000)} kW
                </span>
                <br />
                Matériau: <span className="font-medium">{material}</span>
                <br />
                Force spécifique de coupe:{" "}
                <span className="font-medium">{materialProperties[material].specificCuttingForce} N/mm²</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
