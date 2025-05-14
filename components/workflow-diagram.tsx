"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FileUp, Cpu, Zap, Calculator, Code, ClipboardList, ArrowRight } from "lucide-react"

export function WorkflowDiagram() {
  const [activeStep, setActiveStep] = useState(0)

  // Cycle through steps automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      icon: <FileUp className="h-6 w-6" />,
      title: "Upload de fichier",
      description: "Téléchargez vos fichiers 3D/2D (STEP, STL, PDF, DXF)",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Analyse IA",
      description: "Détection automatique des caractéristiques géométriques",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Simulation d'usinage",
      description: "Génération et optimisation des stratégies d'usinage",
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Devis automatique",
      description: "Calcul précis des coûts de production",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Génération de G-code",
      description: "Création du programme CNC prêt à l'emploi",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Fiche série",
      description: "Documentation complète pour la production",
    },
  ]

  return (
    <div className="relative">
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 relative z-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <Card
              className={cn(
                "w-full transition-all duration-300",
                activeStep === index ? "scale-110 border-primary shadow-lg" : "opacity-70",
              )}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                    activeStep === index ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {step.icon}
                </div>
                <h3 className="text-sm font-medium mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>

            {index < steps.length - 1 && (
              <div className="hidden lg:flex items-center justify-center h-8 w-8">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
