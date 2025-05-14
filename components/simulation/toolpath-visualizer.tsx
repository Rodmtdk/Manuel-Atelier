"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Grid, Line, Html, PerspectiveCamera } from "@react-three/drei"
import { Vector3 } from "three"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Upload, Download } from "lucide-react"

// Mock toolpath data
const generateToolpath = (type) => {
  const points = []

  switch (type) {
    case "contour":
      // Generate a rectangular contour
      points.push(new Vector3(-50, 0, -30))
      points.push(new Vector3(50, 0, -30))
      points.push(new Vector3(50, 0, 30))
      points.push(new Vector3(-50, 0, 30))
      points.push(new Vector3(-50, 0, -30))
      break

    case "pocket":
      // Generate a spiral pocket
      const turns = 5
      const pointsPerTurn = 20
      const maxRadius = 40

      for (let i = 0; i <= turns * pointsPerTurn; i++) {
        const angle = (i / pointsPerTurn) * Math.PI * 2
        const radius = (i / (turns * pointsPerTurn)) * maxRadius
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        points.push(new Vector3(x, 0, z))
      }
      break

    case "drilling":
      // Generate a grid of drilling points
      const rows = 5
      const cols = 5
      const spacing = 20

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = (col - (cols - 1) / 2) * spacing
          const z = (row - (rows - 1) / 2) * spacing
          points.push(new Vector3(x, 0, z))
          points.push(new Vector3(x, -10, z)) // Drill depth
          points.push(new Vector3(x, 0, z)) // Retract
        }
      }
      break

    default:
      // Default to a simple square
      points.push(new Vector3(-30, 0, -30))
      points.push(new Vector3(30, 0, -30))
      points.push(new Vector3(30, 0, 30))
      points.push(new Vector3(-30, 0, 30))
      points.push(new Vector3(-30, 0, -30))
  }

  return points
}

// Toolpath visualization component
function Toolpath({ type, progress, isAnimating }) {
  const points = useRef(generateToolpath(type))
  const currentPointRef = useRef(null)
  const [visiblePoints, setVisiblePoints] = useState([])

  // Update points when type changes
  useEffect(() => {
    points.current = generateToolpath(type)
  }, [type])

  // Update visible points based on progress
  useEffect(() => {
    const numPoints = Math.floor(points.current.length * progress)
    setVisiblePoints(points.current.slice(0, numPoints))
  }, [progress])

  // Animate current point
  useFrame(({ clock }) => {
    if (currentPointRef.current && isAnimating) {
      currentPointRef.current.position.y = Math.sin(clock.getElapsedTime() * 5) * 2
    }
  })

  return (
    <group>
      {/* Toolpath line */}
      {visiblePoints.length > 1 && <Line points={visiblePoints} color="cyan" lineWidth={2} />}

      {/* Current point indicator */}
      {visiblePoints.length > 0 && (
        <mesh ref={currentPointRef} position={visiblePoints[visiblePoints.length - 1]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={0.5} />
        </mesh>
      )}

      {/* Coordinate system */}
      <group>
        {/* X axis */}
        <Line points={[new Vector3(-100, 0, 0), new Vector3(100, 0, 0)]} color="red" lineWidth={1} />
        {/* Y axis */}
        <Line points={[new Vector3(0, -100, 0), new Vector3(0, 100, 0)]} color="green" lineWidth={1} />
        {/* Z axis */}
        <Line points={[new Vector3(0, 0, -100), new Vector3(0, 0, 100)]} color="blue" lineWidth={1} />
      </group>
    </group>
  )
}

export function ToolpathVisualizer() {
  const [toolpathType, setToolpathType] = useState("contour")
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef(null)

  // Animation loop
  useEffect(() => {
    if (isAnimating) {
      let lastTime = 0

      const animate = (time) => {
        if (lastTime === 0) lastTime = time
        const delta = time - lastTime
        lastTime = time

        setProgress((prev) => {
          const newProgress = prev + delta * 0.0001
          if (newProgress >= 1) {
            setIsAnimating(false)
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
  }, [isAnimating])

  const resetAnimation = () => {
    setIsAnimating(false)
    setProgress(0)
  }

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <color attach="background" args={["#111111"]} />
        <PerspectiveCamera makeDefault position={[100, 100, 100]} fov={50} />

        <Toolpath type={toolpathType} progress={progress} isAnimating={isAnimating} />

        <Grid
          args={[200, 200]}
          position={[0, -0.01, 0]}
          cellSize={10}
          cellThickness={0.5}
          cellColor="#6f6f6f"
          sectionSize={50}
          sectionThickness={1}
          sectionColor="#9d4b4b"
          fadeDistance={200}
        />

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        <Environment preset="studio" />

        <Html position={[80, 80, 0]}>
          <div className="bg-background/80 backdrop-blur-sm p-2 rounded text-xs">
            <div>
              <span className="text-red-500">X</span>: {Math.round(progress * 100)}%
            </div>
            <div>
              <span className="text-green-500">Y</span>: 0.00
            </div>
            <div>
              <span className="text-blue-500">Z</span>: 0.00
            </div>
          </div>
        </Html>
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant={isAnimating ? "outline" : "default"}
                size="icon"
                onClick={() => setIsAnimating(!isAnimating)}
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={resetAnimation}>
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
              <Select value={toolpathType} onValueChange={setToolpathType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de trajectoire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contour">Contournage</SelectItem>
                  <SelectItem value="pocket">Poche</SelectItem>
                  <SelectItem value="drilling">Perçage</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Type:</span>{" "}
              {toolpathType === "contour" ? "Contournage" : toolpathType === "pocket" ? "Poche" : "Perçage"}
            </div>
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Longueur:</span>{" "}
              {toolpathType === "contour" ? "320 mm" : toolpathType === "pocket" ? "502 mm" : "750 mm"}
            </div>
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Points:</span>{" "}
              {toolpathType === "contour" ? "5" : toolpathType === "pocket" ? "101" : "75"}
            </div>
            <div className="bg-background p-2 rounded">
              <span className="text-muted-foreground">Progression:</span> {Math.round(progress * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
