"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, Pause, RotateCcw, Settings, Download, Layers, PenToolIcon as ToolIcon, Clock } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid, Environment } from "@react-three/drei"

// Simulation parameters
const simulationParams = {
  workpieceSize: { x: 100, y: 50, z: 20 },
  toolDiameter: 10,
  toolLength: 30,
  feedRate: 100,
  spindleSpeed: 1000,
  depth: 5,
  stepover: 5,
}

// Tool component
function Tool({ position, rotation, diameter, length, isSpinning }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Tool holder */}
      <mesh position={[0, length * 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[diameter * 0.8, diameter * 0.8, length * 0.3, 32]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Tool shank */}
      <mesh position={[0, -length * 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[diameter * 0.6, diameter * 0.6, length * 0.5, 32]} />
        <meshStandardMaterial color="#777777" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cutting part */}
      <group rotation={[0, isSpinning ? Date.now() * 0.01 : 0, 0]}>
        <mesh position={[0, -length * 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[diameter / 2, diameter / 2, length * 0.2, 32]} />
          <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  )
}

// Workpiece component
function Workpiece({ size, toolPosition, toolDiameter, isSimulating, progress }) {
  const [chunks, setChunks] = useState([])

  // Create material removal effect
  useEffect(() => {
    if (isSimulating && progress > 0) {
      const newChunks = []
      const numChunks = Math.floor(progress * 10)

      for (let i = 0; i < numChunks; i++) {
        const chunkWidth = size.x / 10
        const xPos = -size.x / 2 + chunkWidth / 2 + i * chunkWidth

        newChunks.push({
          position: [xPos, size.y / 2 - simulationParams.depth / 2, 0],
          size: [chunkWidth - 0.5, simulationParams.depth, size.z - 0.5],
        })
      }

      setChunks(newChunks)
    } else if (!isSimulating && progress === 0) {
      setChunks([])
    }
  }, [isSimulating, progress, size])

  return (
    <group>
      {/* Main workpiece */}
      <mesh>
        <boxGeometry args={[size.x, size.y, size.z]} />
        <meshStandardMaterial color="#4a9eff" metalness={0.2} roughness={0.3} />
      </mesh>

      {/* Material removal visualization */}
      {chunks.map((chunk, index) => (
        <mesh key={index} position={chunk.position}>
          <boxGeometry args={chunk.size} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </group>
  )
}

// Machine component
function Machine() {
  return (
    <group>
      {/* Machine base */}
      <mesh position={[0, -simulationParams.workpieceSize.y / 2 - 5, 0]}>
        <boxGeometry args={[200, 10, 150]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Machine column */}
      <mesh position={[-100, 65, 0]}>
        <boxGeometry args={[30, 150, 30]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Machine head */}
      <mesh position={[-40, 140, 0]}>
        <boxGeometry args={[120, 20, 30]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Lighting */}
      <directionalLight position={[50, 100, 50]} intensity={1} castShadow />
      <ambientLight intensity={0.5} />
    </group>
  )
}

// Simulation scene
function SimulationScene({ isSimulating, progress, operationType }) {
  const [toolPosition, setToolPosition] = useState([0, 50, 0])

  // Update tool position based on progress
  useEffect(() => {
    if (isSimulating || progress > 0) {
      const xPos = -simulationParams.workpieceSize.x / 2 + progress * simulationParams.workpieceSize.x
      setToolPosition([
        xPos,
        simulationParams.workpieceSize.y / 2 + simulationParams.toolLength / 2 - simulationParams.depth,
        0,
      ])
    }
  }, [isSimulating, progress])

  return (
    <group>
      <Machine />

      <Workpiece
        size={simulationParams.workpieceSize}
        toolPosition={toolPosition}
        toolDiameter={simulationParams.toolDiameter}
        isSimulating={isSimulating}
        progress={progress}
      />

      <Tool
        position={toolPosition}
        rotation={[0, 0, Math.PI / 2]}
        diameter={simulationParams.toolDiameter}
        length={simulationParams.toolLength}
        isSpinning={isSimulating}
      />

      <Grid
        args={[400, 400]}
        position={[0, -simulationParams.workpieceSize.y / 2, 0]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={100}
        sectionThickness={1}
        sectionColor="#9d4b4b"
        fadeDistance={400}
      />
    </group>
  )
}

export function MachiningSimulator() {
  const [activeTab, setActiveTab] = useState("simulation")
  const [isSimulating, setIsSimulating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [operationType, setOperationType] = useState("milling")
  const animationRef = useRef(null)

  // Animation loop
  useEffect(() => {
    if (isSimulating) {
      let lastTime = 0

      const animate = (time) => {
        if (lastTime === 0) lastTime = time
        const delta = time - lastTime
        lastTime = time

        setProgress((prev) => {
          const newProgress = prev + delta * 0.0001
          if (newProgress >= 1) {
            setIsSimulating(false)
            return 1
          }
          return newProgress
        })

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isSimulating])

  const resetSimulation = () => {
    setIsSimulating(false)
    setProgress(0)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Calculate estimated time based on progress
  const totalTime = 180 // 3 minutes in seconds
  const remainingTime = totalTime * (1 - progress)
  const elapsedTime = totalTime * progress

  return (
    <Card className="w-full h-full overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>Simulation d&apos;usinage</CardTitle>
            <CardDescription>Visualisez le processus d&apos;usinage en temps réel</CardDescription>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-2 w-full md:w-[300px]">
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
              <TabsTrigger value="gcode">Code G</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <TabsContent value="simulation" className="m-0 h-full">
          <div className="relative h-[400px] md:h-[500px]">
            <Canvas shadows camera={{ position: [150, 100, 150], fov: 50 }}>
              <color attach="background" args={["#111111"]} />
              <fog attach="fog" args={["#111111", 200, 500]} />

              <SimulationScene isSimulating={isSimulating} progress={progress} operationType={operationType} />

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={50}
                maxDistance={500}
              />

              <Environment preset="studio" />
            </Canvas>

            <div className="absolute top-4 left-4 right-4">
              <div className="flex items-center justify-between bg-background/80 backdrop-blur-sm p-2 rounded-lg">
                <Badge variant="outline" className="bg-primary/10">
                  {operationType === "milling" ? "Fraisage" : operationType === "turning" ? "Tournage" : "Perçage"}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-muted/30">
                    <ToolIcon className="h-3 w-3 mr-1" />Ø{simulationParams.toolDiameter}mm
                  </Badge>
                  <Badge variant="outline" className="bg-muted/30">
                    <Layers className="h-3 w-3 mr-1" />
                    {simulationParams.depth}mm
                  </Badge>
                  <Badge variant="outline" className="bg-muted/30">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(remainingTime)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={isSimulating ? "outline" : "default"}
                    size="icon"
                    onClick={() => setIsSimulating(!isSimulating)}
                  >
                    {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={resetSimulation}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 mx-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progression: {Math.round(progress * 100)}%</span>
                    <span>
                      Temps: {formatTime(elapsedTime)} / {formatTime(totalTime)}
                    </span>
                  </div>
                  <Slider
                    value={[progress * 100]}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setProgress(value[0] / 100)
                    }}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={operationType} onValueChange={setOperationType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type d'opération" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milling">Fraisage</SelectItem>
                      <SelectItem value="turning">Tournage</SelectItem>
                      <SelectItem value="drilling">Perçage</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Outil:</span> Fraise Ø{simulationParams.toolDiameter}mm
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Avance:</span> {simulationParams.feedRate} mm/min
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Vitesse:</span> {simulationParams.spindleSpeed} tr/min
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Profondeur:</span> {simulationParams.depth} mm
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gcode" className="m-0 h-full">
          <div className="h-[400px] md:h-[500px] overflow-auto p-4 bg-muted/30 font-mono text-xs">
            <pre className="whitespace-pre">
              {`N10 G90 G54 G17
N20 G21
N30 T1 M6 (FRAISE D10)
N40 S1000 M3
N50 G0 X-50 Y0 Z50
N60 G0 Z5
N70 G1 Z-5 F100
N80 G1 X50 F100
N90 G0 Z50
N100 G0 X-50 Y10
N110 G0 Z5
N120 G1 Z-5 F100
N130 G1 X50 F100
N140 G0 Z50
N150 G0 X-50 Y20
N160 G0 Z5
N170 G1 Z-5 F100
N180 G1 X50 F100
N190 G0 Z50
N200 G0 X-50 Y-10
N210 G0 Z5
N220 G1 Z-5 F100
N230 G1 X50 F100
N240 G0 Z50
N250 G0 X-50 Y-20
N260 G0 Z5
N270 G1 Z-5 F100
N280 G1 X50 F100
N290 G0 Z50
N300 M5
N310 M30`}
            </pre>
          </div>

          <div className="p-4 border-t">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="bg-primary/10">
                    Code G généré
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Post-processeur
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Format:</span> ISO (Fanuc)
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Lignes:</span> 31
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <span className="text-muted-foreground">Taille:</span> 0.5 KB
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  )
}
