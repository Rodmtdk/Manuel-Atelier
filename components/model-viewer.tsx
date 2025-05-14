"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { Button } from "@/components/ui/button"
import { CuboidIcon as Cube, Maximize, Minimize, RotateCcw } from "lucide-react"

interface ModelViewerProps {
  files: File[]
}

export function ModelViewer({ files }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current || files.length === 0) return

    setIsLoading(true)
    setError(null)

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111827) // Dark background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.innerHTML = ""
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222)
    scene.add(gridHelper)

    // Load model
    const file = files[0] // Use the first file
    const fileExtension = file.name.split(".").pop()?.toLowerCase()

    if (fileExtension === "stl") {
      const loader = new STLLoader()
      const fileURL = URL.createObjectURL(file)

      loader.load(
        fileURL,
        (geometry) => {
          // Center the geometry
          geometry.computeBoundingBox()
          const center = new THREE.Vector3()
          geometry.boundingBox!.getCenter(center)
          geometry.center()

          // Scale the geometry to fit the view
          const size = new THREE.Vector3()
          geometry.boundingBox!.getSize(size)
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = 3 / maxDim
          geometry.scale(scale, scale, scale)

          // Create material
          const material = new THREE.MeshPhongMaterial({
            color: 0x00bcd4,
            specular: 0x111111,
            shininess: 200,
          })

          // Create mesh
          const mesh = new THREE.Mesh(geometry, material)
          scene.add(mesh)

          // Position camera to look at the center of the model
          camera.lookAt(0, 0, 0)

          setIsLoading(false)

          // Clean up URL
          URL.revokeObjectURL(fileURL)
        },
        undefined,
        (err) => {
          console.error("Error loading STL:", err)
          setError("Erreur lors du chargement du fichier STL.")
          setIsLoading(false)
          URL.revokeObjectURL(fileURL)
        },
      )
    } else {
      setError(`Format de fichier non pris en charge pour la visualisation: ${fileExtension}`)
      setIsLoading(false)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      container.innerHTML = ""
      renderer.dispose()
    }
  }, [files])

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  const resetView = () => {
    // This would reset the camera position in a real implementation
  }

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full rounded-md overflow-hidden"></div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <div className="loading-dots mb-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="text-sm">Chargement du modèle...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center max-w-xs">
            <Cube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-destructive font-medium mb-1">{error}</p>
            <p className="text-xs text-muted-foreground">
              Essayez de télécharger un fichier STL valide pour la visualisation 3D.
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && files.length > 0 && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button variant="secondary" size="icon" onClick={resetView}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}
