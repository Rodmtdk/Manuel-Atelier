"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for standard threads
const metricThreads = [
  { designation: "M3", pitch: 0.5, majorDiameter: 3, minorDiameter: 2.39, pitchDiameter: 2.675 },
  { designation: "M4", pitch: 0.7, majorDiameter: 4, minorDiameter: 3.242, pitchDiameter: 3.545 },
  { designation: "M5", pitch: 0.8, majorDiameter: 5, minorDiameter: 4.134, pitchDiameter: 4.48 },
  { designation: "M6", pitch: 1, majorDiameter: 6, minorDiameter: 4.917, pitchDiameter: 5.35 },
  { designation: "M8", pitch: 1.25, majorDiameter: 8, minorDiameter: 6.647, pitchDiameter: 7.188 },
  { designation: "M10", pitch: 1.5, majorDiameter: 10, minorDiameter: 8.376, pitchDiameter: 9.026 },
  { designation: "M12", pitch: 1.75, majorDiameter: 12, minorDiameter: 10.106, pitchDiameter: 10.863 },
  { designation: "M16", pitch: 2, majorDiameter: 16, minorDiameter: 13.835, pitchDiameter: 14.701 },
  { designation: "M20", pitch: 2.5, majorDiameter: 20, minorDiameter: 17.294, pitchDiameter: 18.376 },
  { designation: "M24", pitch: 3, majorDiameter: 24, minorDiameter: 20.752, pitchDiameter: 22.051 },
]

const inchThreads = [
  { designation: "1/4-20 UNC", tpi: 20, majorDiameter: 6.35, minorDiameter: 5.188, pitchDiameter: 5.773 },
  { designation: "5/16-18 UNC", tpi: 18, majorDiameter: 7.938, minorDiameter: 6.647, pitchDiameter: 7.295 },
  { designation: "3/8-16 UNC", tpi: 16, majorDiameter: 9.525, minorDiameter: 8.05, pitchDiameter: 8.79 },
  { designation: "1/2-13 UNC", tpi: 13, majorDiameter: 12.7, minorDiameter: 10.851, pitchDiameter: 11.78 },
  { designation: "5/8-11 UNC", tpi: 11, majorDiameter: 15.875, minorDiameter: 13.716, pitchDiameter: 14.8 },
  { designation: "3/4-10 UNC", tpi: 10, majorDiameter: 19.05, minorDiameter: 16.662, pitchDiameter: 17.86 },
  { designation: "1-8 UNC", tpi: 8, majorDiameter: 25.4, minorDiameter: 22.326, pitchDiameter: 23.87 },
]

export function ThreadingCalculator() {
  const [threadType, setThreadType] = useState("metric")
  const [selectedThread, setSelectedThread] = useState("")
  const [customDiameter, setCustomDiameter] = useState("")
  const [customPitch, setCustomPitch] = useState("")
  const [results, setResults] = useState<any>(null)

  const calculateMetricThread = () => {
    let diameter, pitch

    if (selectedThread) {
      const thread = metricThreads.find((t) => t.designation === selectedThread)
      if (thread) {
        diameter = thread.majorDiameter
        pitch = thread.pitch
      }
    } else {
      diameter = Number.parseFloat(customDiameter)
      pitch = Number.parseFloat(customPitch)

      if (isNaN(diameter) || isNaN(pitch) || diameter <= 0 || pitch <= 0) {
        return
      }
    }

    // Calculate thread dimensions
    const minorDiameter = diameter - 1.226869 * pitch
    const pitchDiameter = diameter - 0.649519 * pitch
    const threadDepth = 0.613435 * pitch
    const coreArea = Math.PI * Math.pow(minorDiameter / 2, 2)

    setResults({
      majorDiameter: diameter.toFixed(3),
      minorDiameter: minorDiameter.toFixed(3),
      pitchDiameter: pitchDiameter.toFixed(3),
      pitch: pitch.toFixed(3),
      threadDepth: threadDepth.toFixed(3),
      coreArea: coreArea.toFixed(2),
      type: "metric",
    })
  }

  const calculateInchThread = () => {
    if (!selectedThread) return

    const thread = inchThreads.find((t) => t.designation === selectedThread)
    if (!thread) return

    const diameter = thread.majorDiameter
    const tpi = thread.tpi
    const pitch = 25.4 / tpi

    // Calculate thread dimensions
    const minorDiameter = thread.minorDiameter
    const pitchDiameter = thread.pitchDiameter
    const threadDepth = 0.613435 * pitch
    const coreArea = Math.PI * Math.pow(minorDiameter / 2, 2)

    setResults({
      majorDiameter: diameter.toFixed(3),
      minorDiameter: minorDiameter.toFixed(3),
      pitchDiameter: pitchDiameter.toFixed(3),
      pitch: pitch.toFixed(3),
      tpi: tpi,
      threadDepth: threadDepth.toFixed(3),
      coreArea: coreArea.toFixed(2),
      type: "inch",
    })
  }

  const calculateThread = () => {
    if (threadType === "metric") {
      calculateMetricThread()
    } else {
      calculateInchThread()
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={threadType} onValueChange={setThreadType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metric">Métrique</TabsTrigger>
          <TabsTrigger value="inch">Pouce</TabsTrigger>
        </TabsList>

        <TabsContent value="metric" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metric-thread">Filetage standard</Label>
              <Select value={selectedThread} onValueChange={setSelectedThread}>
                <SelectTrigger id="metric-thread">
                  <SelectValue placeholder="Sélectionner un filetage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                  {metricThreads.map((thread) => (
                    <SelectItem key={thread.designation} value={thread.designation}>
                      {thread.designation} × {thread.pitch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!selectedThread && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="custom-diameter">Diamètre (mm)</Label>
                  <Input
                    id="custom-diameter"
                    type="number"
                    value={customDiameter}
                    onChange={(e) => setCustomDiameter(e.target.value)}
                    min="0.1"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="custom-pitch">Pas (mm)</Label>
                  <Input
                    id="custom-pitch"
                    type="number"
                    value={customPitch}
                    onChange={(e) => setCustomPitch(e.target.value)}
                    min="0.1"
                    step="0.1"
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="inch" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="inch-thread">Filetage standard</Label>
            <Select value={selectedThread} onValueChange={setSelectedThread}>
              <SelectTrigger id="inch-thread">
                <SelectValue placeholder="Sélectionner un filetage" />
              </SelectTrigger>
              <SelectContent>
                {inchThreads.map((thread) => (
                  <SelectItem key={thread.designation} value={thread.designation}>
                    {thread.designation} ({thread.tpi} TPI)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={calculateThread} className="w-full">
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
                <TableCell>{results.majorDiameter}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Diamètre à fond de filet</TableCell>
                <TableCell>{results.minorDiameter}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Diamètre sur flancs</TableCell>
                <TableCell>{results.pitchDiameter}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pas</TableCell>
                <TableCell>{results.pitch}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              {results.type === "inch" && (
                <TableRow>
                  <TableCell>Filets par pouce</TableCell>
                  <TableCell>{results.tpi}</TableCell>
                  <TableCell>TPI</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>Profondeur de filet</TableCell>
                <TableCell>{results.threadDepth}</TableCell>
                <TableCell>mm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Section résistante</TableCell>
                <TableCell>{results.coreArea}</TableCell>
                <TableCell>mm²</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
