"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Grid, Box, Cylinder, useHelper } from "@react-three/drei"
import { Vector3, BoxGeometry, MeshStandardMaterial, DirectionalLightHelper } from "three"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

// Simulation parameters
const simulationParams = {
  workpieceSize: new Vector3(100, 50, 20),
  toolDiameter: 10,
  toolLength: 30,
  feedRate: 100,
  spindleSpeed: 1000,
  depth: 5,
  stepover: 5,
}

// Tool component
function Tool({ position, rotation, diameter, length }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Tool holder */}
      <Cylinder
        args={[diameter * 0.8, diameter * 0.8, length * 0.3, 32]}
        position={[0, length * 0.15, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Tool shank */}
      <Cylinder
        args={[diameter * 0.6, diameter * 0.6, length * 0.5, 32]}
        position={[0, -length * 0.1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#777777" metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* Cutting part */}
      <Cylinder
        args={[diameter / 2, diameter / 2, length * 0.2, 32]}
        position={[0, -length * 0.45, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </Cylinder>
    </group>
  )
}

// Workpiece component with material removal
function Workpiece({ size, toolPosition, toolDiameter, isSimulating, progress }) {
  const meshRef = useRef()
  const [chunks, setChunks] = useState([])
  const geometry = new BoxGeometry(size.x, size.y, size.z)
  const material = new MeshStandardMaterial({ color: "#4a9eff", metalness: 0.2, roughness: 0.3 })

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
    } else if (!isSimulating) {
      setChunks([])
    }
  }, [isSimulating, progress, size])

  return (
    <group>
      {/* Main workpiece */}
      <Box args={[size.x, size.y, size.z]} ref={meshRef}>
        <meshStandardMaterial color="#4a9eff" metalness={0.2} roughness={0.3} />
      </Box>

      {/* Material removal visualization */}
      {chunks.map((chunk, index) => (
        <Box key={index} args={chunk.size} position={chunk.position}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
      ))}
    </group>
  )
}

// Machine component
function Machine() {
  const directionalLightRef = useRef()
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "red")

  return (
    <group>
      {/* Machine base */}
      <Box args={[200, 10, 150]} position={[0, -simulationParams.workpieceSize.y / 2 - 5, 0]}>
        <meshStandardMaterial color="#333333" />
      </Box>

      {/* Machine column */}
      <Box args={[30, 150, 30]} position={[-100, 65, 0]}>
        <meshStandardMaterial color="#444444" />
      </Box>

      {/* Machine head */}
      <Box args={[120, 20, 30]} position={[-40, 140, 0]}>
        <meshStandardMaterial color="#555555" />
      </Box>

      {/* Lighting */}
      <directionalLight ref={directionalLightRef} position={[50, 100, 50]} intensity={1} castShadow />
      <ambientLight intensity={0.5} />
    </group>
  )
}

// Simulation controller
function SimulationController({ isSimulating, setIsSimulating, progress, setProgress }) {
  const { camera } = useThree()
  const [toolPosition, setToolPosition] = useState([0, 50, 0])

  // Animation loop
  useFrame(({ clock }) => {
    if (isSimulating && progress < 1) {
      const newProgress = Math.min(progress + 0.001, 1)
      setProgress(newProgress)

      // Update tool position
      const xPos = -simulationParams.workpieceSize.x / 2 + newProgress * simulationParams.workpieceSize.x
      setToolPosition([
        xPos,
        simulationParams.workpieceSize.y / 2 + simulationParams.toolLength / 2 - simulationParams.depth,
        0,
      ])
    }
  })

  // Reset camera position
  useEffect(() => {
    camera.position.set(150, 100, 150)
    camera.lookAt(0, 0, 0)
  }, [camera])

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

export function MachiningSim3D() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [operationType, setOperationType] = useState("milling")

  const resetSimulation = () => {
    setIsSimulating(false)
    setProgress(0)
  }

  return (
    <div className="relative h-full w-full">
      <Canvas shadows camera={{ position: [150, 100, 150], fov: 50 }}>
        <color attach="background" args={["#111111"]} />
        <fog attach="fog" args={["#111111", 200, 500]} />

        <SimulationController
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          progress={progress}
          setProgress={setProgress}
        />

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={50} maxDistance={500} />

        <Environment preset="studio" />
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg">
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
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Outil:</span> Fraise Ø{simulationParams.toolDiameter}mm
            </div>
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Avance:</span> {simulationParams.feedRate} mm/min
            </div>
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Vitesse:</span> {simulationParams.spindleSpeed} tr/min
            </div>
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Profondeur:</span> {simulationParams.depth} mm
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
