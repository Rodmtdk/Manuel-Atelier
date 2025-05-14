"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export function MachiningTimeCalculator() {
  const [operationType, setOperationType] = useState("milling")
  const [length, setLength] = useState("100")
  const [width, setWidth] = useState("50")
  const [depth, setDepth] = useState("10")
  const [feedRate, setFeedRate] = useState("200")
  const [toolDiameter, setToolDiameter] = useState("10")
  const [stepover, setStepover] = useState("50")
  const [approachDistance, setApproachDistance] = useState("10")
  const [numberOfPasses, setNumberOfPasses] = useState("1")
  const [results, setResults] = useState<any>(null)
  const [chartData, setChartData] = useState<any[]>([])

  const calculateMachiningTime = () => {
    const l = Number.parseFloat(length)
    const w = Number.parseFloat(width)
    const d = Number.parseFloat(depth)
    const f = Number.parseFloat(feedRate)
    const td = Number.parseFloat(toolDiameter)
    const so = Number.parseFloat(stepover) / 100 // Convert percentage to decimal
    const ad = Number.parseFloat(approachDistance)
    const np = Number.parseInt(numberOfPasses)

    if (
      isNaN(l) ||
      isNaN(w) ||
      isNaN(d) ||
      isNaN(f) ||
      isNaN(td) ||
      isNaN(so) ||
      isNaN(ad) ||
      isNaN(np) ||
      l <= 0 ||
      w <= 0 ||
      d <= 0 ||
      f <= 0 ||
      td <= 0 ||
      so <= 0 ||
      so > 1 ||
      ad < 0 ||
      np <= 0
    ) {
      return
    }

    let machiningTime = 0
    let rapidTime = 0
    let totalDistance = 0
    let rapidDistance = 0

    if (operationType === "milling") {
      // Calculate number of passes needed to cover the width
      const effectiveToolWidth = td * so
      const widthPasses = Math.ceil(w / effectiveToolWidth)

      // Calculate total machining distance
      totalDistance = l * widthPasses * np

      // Calculate rapid positioning distance (approach + repositioning between passes)
      rapidDistance = ad * 2 + (widthPasses - 1) * ad

      // Calculate times
      machiningTime = totalDistance / f
      rapidTime = rapidDistance / 1000 // Assuming rapid at 1000 mm/min
    } else if (operationType === "turning") {
      // For turning, we'll calculate based on a cylindrical workpiece
      const circumference = Math.PI * w // Using width as diameter
      const lengthPasses = Math.ceil(d / (td * so))

      // Calculate total machining distance
      totalDistance = circumference * lengthPasses * np

      // Calculate rapid positioning distance
      rapidDistance = l * 2 * lengthPasses

      // Calculate times
      machiningTime = totalDistance / f
      rapidTime = rapidDistance / 1000 // Assuming rapid at 1000 mm/min
    }

    const totalTime = machiningTime + rapidTime
    const timeInMinutes = Math.floor(totalTime)
    const timeInSeconds = Math.round((totalTime - timeInMinutes) * 60)

    const newResults = {
      machiningTime: machiningTime.toFixed(2),
      rapidTime: rapidTime.toFixed(2),
      totalTime: totalTime.toFixed(2),
      totalDistance: totalDistance.toFixed(2),
      rapidDistance: rapidDistance.toFixed(2),
      timeFormatted: `${timeInMinutes}m ${timeInSeconds}s`,
    }

    setResults(newResults)

    // Generate chart data
    const newChartData = [
      { name: "Usinage", time: Number.parseFloat(newResults.machiningTime) },
      { name: "Déplacement rapide", time: Number.parseFloat(newResults.rapidTime) },
    ]

    setChartData(newChartData)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="operation-type">Type d&apos;opération</Label>
          <Select value={operationType} onValueChange={setOperationType}>
            <SelectTrigger id="operation-type">
              <SelectValue placeholder="Sélectionner une opération" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="milling">Fraisage</SelectItem>
              <SelectItem value="turning">Tournage</SelectItem>
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
          <Label htmlFor="length">{operationType === "milling" ? "Longueur (mm)" : "Longueur (mm)"}</Label>
          <Input
            id="length"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">{operationType === "milling" ? "Largeur (mm)" : "Diamètre (mm)"}</Label>
          <Input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="depth">{operationType === "milling" ? "Profondeur (mm)" : "Profondeur de passe (mm)"}</Label>
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
          <Label htmlFor="feed-rate">Avance (mm/min)</Label>
          <Input
            id="feed-rate"
            type="number"
            value={feedRate}
            onChange={(e) => setFeedRate(e.target.value)}
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stepover">Recouvrement (%)</Label>
          <Input
            id="stepover"
            type="number"
            value={stepover}
            onChange={(e) => setStepover(e.target.value)}
            min="1"
            max="100"
            step="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="approach-distance">Distance d&apos;approche (mm)</Label>
          <Input
            id="approach-distance"
            type="number"
            value={approachDistance}
            onChange={(e) => setApproachDistance(e.target.value)}
            min="0"
            step="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number-of-passes">Nombre de passes</Label>
          <Input
            id="number-of-passes"
            type="number"
            value={numberOfPasses}
            onChange={(e) => setNumberOfPasses(e.target.value)}
            min="1"
            step="1"
          />
        </div>
      </div>

      <Button onClick={calculateMachiningTime} className="w-full">
        Calculer
      </Button>

      {results && (
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paramètre</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Unité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Temps d&apos;usinage</TableCell>
                <TableCell>{results.machiningTime}</TableCell>
                <TableCell>min</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Temps de déplacement rapide</TableCell>
                <TableCell>{results.rapidTime}</TableCell>
                <TableCell>min</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Temps total</TableCell>
                <TableCell>{results.totalTime}</TableCell>
                <TableCell>min</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Distance d&apos;usinage</TableCell>
                <TableCell>{results.totalDistance}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Distance de déplacement rapide</TableCell>
                <TableCell>{results.rapidDistance}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Temps formaté</TableCell>
                <TableCell colSpan={2}>{results.timeFormatted}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="h-[250px]">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "Temps (min)", angle: -90, position: "insideLeft" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="time" name="Temps (min)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend>
                <ChartLegendItem name="Temps (min)" color="#3b82f6" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </div>
      )}
    </div>
  )
}
