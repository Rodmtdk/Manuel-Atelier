"use client"

import { useState, useEffect } from "react"
import { Upload, Check, FileText, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function FileUploadDemo() {
  const [stage, setStage] = useState<"idle" | "uploading" | "analyzing" | "complete">("idle")
  const [progress, setProgress] = useState(0)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  // Simulate the upload and analysis process
  useEffect(() => {
    const simulateProcess = () => {
      // Reset
      setStage("idle")
      setProgress(0)
      setAnalysisProgress(0)

      // Start upload after a delay
      setTimeout(() => {
        setStage("uploading")

        // Simulate upload progress
        const uploadInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(uploadInterval)
              setStage("analyzing")
              return 100
            }
            return prev + 5
          })
        }, 200)

        // Start analysis after upload completes
        setTimeout(() => {
          // Simulate analysis progress
          const analysisInterval = setInterval(() => {
            setAnalysisProgress((prev) => {
              if (prev >= 100) {
                clearInterval(analysisInterval)
                setStage("complete")
                return 100
              }
              return prev + 2
            })
          }, 100)
        }, 4000) // Start analysis after upload completes

        // Reset after completion
        setTimeout(() => {
          simulateProcess()
        }, 12000) // Restart the process
      }, 2000) // Initial delay
    }

    simulateProcess()

    return () => {
      // Cleanup any intervals
    }
  }, [])

  return (
    <div className="bg-background p-6 h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        {stage === "idle" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium mb-2">Prêt pour l'upload</p>
            <p className="text-sm text-muted-foreground">Glissez-déposez vos fichiers ou cliquez pour sélectionner</p>
          </div>
        )}

        {stage === "uploading" && (
          <div className="text-center w-full">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-lg font-medium mb-2">Upload en cours...</p>
            <div className="w-full max-w-md mx-auto mb-2">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">Téléchargement de gear_assembly.step ({progress}%)</p>
          </div>
        )}

        {stage === "analyzing" && (
          <div className="text-center w-full">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
            <p className="text-lg font-medium mb-2">Analyse IA en cours...</p>
            <div className="w-full max-w-md mx-auto mb-2">
              <Progress value={analysisProgress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Détection des caractéristiques géométriques ({analysisProgress}%)
            </p>
          </div>
        )}

        {stage === "complete" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-lg font-medium mb-2">Analyse terminée !</p>
            <p className="text-sm text-muted-foreground mb-4">8 perçages, 3 poches et 2 bossages détectés</p>
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
              <div className="bg-muted/30 rounded p-2 text-xs">
                <p className="font-medium">Volume</p>
                <p>127.3 cm³</p>
              </div>
              <div className="bg-muted/30 rounded p-2 text-xs">
                <p className="font-medium">Matériau</p>
                <p>Aluminium</p>
              </div>
              <div className="bg-muted/30 rounded p-2 text-xs">
                <p className="font-medium">Dimensions</p>
                <p>120 x 80 x 40 mm</p>
              </div>
              <div className="bg-muted/30 rounded p-2 text-xs">
                <p className="font-medium">Usinabilité</p>
                <p>85/100</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
