"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for cutting speeds by material and tool
const cuttingSpeedData = {
  C45: {
    HSS: { minVc: 20, maxVc: 30, minFeed: 0.1, maxFeed: 0.3 },
    Carbide: { minVc: 100, maxVc: 150, minFeed: 0.2, maxFeed: 0.4 },
    Ceramic: { minVc: 300, maxVc: 500, minFeed: 0.3, maxFeed: 0.6 },
  },
  "EN AW 2017": {
    HSS: { minVc: 60, maxVc: 90, minFeed: 0.15, maxFeed: 0.35 },
    Carbide: { minVc: 200, maxVc: 300, minFeed: 0.25, maxFeed: 0.5 },
    Ceramic: { minVc: 500, maxVc: 800, minFeed: 0.4, maxFeed: 0.7 },
  },
  "7075": {
    HSS: { minVc: 70, maxVc: 100, minFeed: 0.15, maxFeed: 0.4 },
    Carbide: { minVc: 250, maxVc: 350, minFeed: 0.3, maxFeed: 0.6 },
    Ceramic: { minVc: 600, maxVc: 900, minFeed: 0.5, maxFeed: 0.8 },
  },
  Inox: {
    HSS: { minVc: 10, maxVc: 15, minFeed: 0.05, maxFeed: 0.15 },
    Carbide: { minVc: 60, maxVc: 90, minFeed: 0.1, maxFeed: 0.25 },
    Ceramic: { minVc: 150, maxVc: 250, minFeed: 0.2, maxFeed: 0.4 },
  },
  Titane: {
    HSS: { minVc: 5, maxVc: 10, minFeed: 0.05, maxFeed: 0.1 },
    Carbide: { minVc: 30, maxVc: 50, minFeed: 0.1, maxFeed: 0.2 },
    Ceramic: { minVc: 80, maxVc: 120, minFeed: 0.15, maxFeed: 0.3 },
  },
}

export function CuttingSpeedCalculator() {
  const [material, setMaterial] = useState("C45")
  const [toolType, setToolType] = useState("Carbide")
  const [diameter, setDiameter] = useState("10")
  const [results, setResults] = useState<any>(null)
  const [chartData, setChartData] = useState<any[]>([])

  const calculateParameters = () => {
    const d = Number.parseFloat(diameter)
    if (isNaN(d) || d <= 0) return

    const materialData = cuttingSpeedData[material as keyof typeof cuttingSpeedData]
    const toolData = materialData[toolType as keyof typeof materialData]

    const minVc = toolData.minVc
    const maxVc = toolData.maxVc
    const minFeed = toolData.minFeed
    const maxFeed = toolData.maxFeed

    // Calculate RPM: n = (Vc * 1000) / (π * D)
    const minRPM = Math.round((minVc * 1000) / (Math.PI * d))
    const maxRPM = Math.round((maxVc * 1000) / (Math.PI * d))

    // Calculate feed rate: Vf = n * fz * z (assuming z=4 for a typical end mill)
    const z = 4 // Number of teeth
    const minFeedRate = Math.round(minRPM * minFeed * z)
    const maxFeedRate = Math.round(maxRPM * maxFeed * z)

    const newResults = {
      minVc,
      maxVc,
      minRPM,
      maxRPM,
      minFeed,
      maxFeed,
      minFeedRate,
      maxFeedRate,
    }

    setResults(newResults)

    // Generate chart data
    const newChartData = []
    for (let i = 0; i <= 10; i++) {
      const vcValue = minVc + (i / 10) * (maxVc - minVc)
      const rpm = Math.round((vcValue * 1000) / (Math.PI * d))
      const feed = minFeed + (i / 10) * (maxFeed - minFeed)
      const feedRate = Math.round(rpm * feed * z)

      newChartData.push({
        percent: i * 10,
        vc: Math.round(vcValue),
        rpm,
        feedRate,
      })
    }

    setChartData(newChartData)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <Label htmlFor="tool-type">Type d&apos;outil</Label>
          <Select value={toolType} onValueChange={setToolType}>
            <SelectTrigger id="tool-type">
              <SelectValue placeholder="Sélectionner un type d'outil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HSS">Acier rapide (HSS)</SelectItem>
              <SelectItem value="Carbide">Carbure</SelectItem>
              <SelectItem value="Ceramic">Céramique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="diameter">Diamètre (mm)</Label>
          <Input
            id="diameter"
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="flex items-end">
          <Button onClick={calculateParameters} className="w-full">
            Calculer
          </Button>
        </div>
      </div>

      {results && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paramètre</TableHead>
                    <TableHead>Minimum</TableHead>
                    <TableHead>Maximum</TableHead>
                    <TableHead>Unité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Vitesse de coupe (Vc)</TableCell>
                    <TableCell>{results.minVc}</TableCell>
                    <TableCell>{results.maxVc}</TableCell>
                    <TableCell>m/min</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Vitesse de rotation (n)</TableCell>
                    <TableCell>{results.minRPM}</TableCell>
                    <TableCell>{results.maxRPM}</TableCell>
                    <TableCell>tr/min</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Avance par dent (fz)</TableCell>
                    <TableCell>{results.minFeed}</TableCell>
                    <TableCell>{results.maxFeed}</TableCell>
                    <TableCell>mm/dent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Vitesse d&apos;avance (Vf)</TableCell>
                    <TableCell>{results.minFeedRate}</TableCell>
                    <TableCell>{results.maxFeedRate}</TableCell>
                    <TableCell>mm/min</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="h-[300px]">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="percent"
                      label={{ value: "Pourcentage de la plage (%)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      label={{ value: "Vitesse de coupe (m/min)", angle: -90, position: "insideLeft" }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Vitesse de rotation (tr/min)", angle: -90, position: "insideRight" }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="vc"
                      stroke="#3b82f6"
                      name="Vitesse de coupe (m/min)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rpm"
                      stroke="#10b981"
                      name="Vitesse de rotation (tr/min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend>
                <ChartLegendItem name="Vitesse de coupe (m/min)" color="#3b82f6" />
                <ChartLegendItem name="Vitesse de rotation (tr/min)" color="#10b981" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </div>
      )}
    </div>
  )
}
