"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Simplified ISO tolerance data
const toleranceGrades = ["IT6", "IT7", "IT8", "IT9", "IT10", "IT11"]
const tolerancePositions = ["h", "j", "k", "n", "p", "s"]

// Simplified calculation functions
const calculateToleranceValue = (diameter: number, grade: string) => {
  // Simplified calculation based on ISO 286
  const i = Number.parseInt(grade.replace("IT", ""))
  const factor = Math.pow(10, (i - 5) / 5)
  let baseValue

  if (diameter <= 3) {
    baseValue = 0.8
  } else if (diameter <= 6) {
    baseValue = 1
  } else if (diameter <= 10) {
    baseValue = 1.2
  } else if (diameter <= 18) {
    baseValue = 1.5
  } else if (diameter <= 30) {
    baseValue = 1.8
  } else if (diameter <= 50) {
    baseValue = 2
  } else if (diameter <= 80) {
    baseValue = 2.5
  } else if (diameter <= 120) {
    baseValue = 3
  } else if (diameter <= 180) {
    baseValue = 4
  } else {
    baseValue = 5
  }

  return Math.round(baseValue * factor * 10) / 10
}

const calculatePositionOffset = (diameter: number, position: string, tolerance: number) => {
  // Simplified calculation for position offsets
  let factor = 0

  switch (position) {
    case "h":
      factor = 0
      break
    case "j":
      factor = 0.2
      break
    case "k":
      factor = 0.4
      break
    case "n":
      factor = 0.6
      break
    case "p":
      factor = 0.8
      break
    case "s":
      factor = 1
      break
    default:
      factor = 0
  }

  return Math.round(tolerance * factor * 10) / 10
}

export function ToleranceCalculator() {
  const [diameter, setDiameter] = useState("10")
  const [toleranceGrade, setToleranceGrade] = useState("IT7")
  const [tolerancePosition, setTolerancePosition] = useState("h")
  const [results, setResults] = useState<any>(null)

  const calculateTolerance = () => {
    const d = Number.parseFloat(diameter)
    if (isNaN(d) || d <= 0) return

    const toleranceValue = calculateToleranceValue(d, toleranceGrade)
    const positionOffset = calculatePositionOffset(d, tolerancePosition, toleranceValue)

    const upperDeviation = positionOffset
    const lowerDeviation = positionOffset - toleranceValue

    const maxDimension = d + upperDeviation / 1000
    const minDimension = d + lowerDeviation / 1000

    setResults({
      nominalDiameter: d.toFixed(3),
      toleranceValue: toleranceValue.toFixed(3),
      upperDeviation: upperDeviation.toFixed(3),
      lowerDeviation: lowerDeviation.toFixed(3),
      maxDimension: maxDimension.toFixed(3),
      minDimension: minDimension.toFixed(3),
      toleranceZone: `${d.toFixed(3)} ${tolerancePosition}${toleranceGrade.replace("IT", "")}`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="diameter">Diamètre nominal (mm)</Label>
          <Input
            id="diameter"
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tolerance-grade">Qualité ISO (IT)</Label>
          <Select value={toleranceGrade} onValueChange={setToleranceGrade}>
            <SelectTrigger id="tolerance-grade">
              <SelectValue placeholder="Sélectionner une qualité" />
            </SelectTrigger>
            <SelectContent>
              {toleranceGrades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tolerance-position">Position (écart)</Label>
          <Select value={tolerancePosition} onValueChange={setTolerancePosition}>
            <SelectTrigger id="tolerance-position">
              <SelectValue placeholder="Sélectionner une position" />
            </SelectTrigger>
            <SelectContent>
              {tolerancePositions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={calculateTolerance} className="w-full">
        Calculer
      </Button>

      {results && (
        <div className="pt-4">
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
                <TableCell>Diamètre nominal</TableCell>
                <TableCell>{results.nominalDiameter}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Intervalle de tolérance</TableCell>
                <TableCell>{results.toleranceValue}</TableCell>
                <TableCell>μm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Écart supérieur</TableCell>
                <TableCell>{results.upperDeviation}</TableCell>
                <TableCell>μm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Écart inférieur</TableCell>
                <TableCell>{results.lowerDeviation}</TableCell>
                <TableCell>μm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dimension maximale</TableCell>
                <TableCell>{results.maxDimension}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dimension minimale</TableCell>
                <TableCell>{results.minDimension}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Désignation ISO</TableCell>
                <TableCell colSpan={2}>{results.toleranceZone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
