import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, Cpu, Calculator, Code, ClipboardList, Database, Bot, Zap } from "lucide-react"

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard
        icon={<FileUp className="h-10 w-10 text-blue-500" />}
        title="Upload intelligent"
        description="Téléchargez vos fichiers 3D/2D et obtenez une analyse automatique des caractéristiques géométriques."
      />

      <FeatureCard
        icon={<Cpu className="h-10 w-10 text-cyan-500" />}
        title="Analyse IA"
        description="Notre IA détecte automatiquement les perçages, poches, filetages et autres caractéristiques de vos modèles."
      />

      <FeatureCard
        icon={<Zap className="h-10 w-10 text-amber-500" />}
        title="Simulation d'usinage"
        description="Visualisez et optimisez vos stratégies d'usinage avant la production."
      />

      <FeatureCard
        icon={<Calculator className="h-10 w-10 text-green-500" />}
        title="Devis automatiques"
        description="Obtenez des devis précis en quelques secondes, basés sur l'analyse de vos fichiers."
      />

      <FeatureCard
        icon={<Code className="h-10 w-10 text-purple-500" />}
        title="Génération de G-code"
        description="Transformez vos modèles 3D en code CNC prêt à l'emploi pour vos machines."
      />

      <FeatureCard
        icon={<ClipboardList className="h-10 w-10 text-pink-500" />}
        title="Gestion de séries"
        description="Organisez et planifiez vos productions avec des fiches de série complètes."
      />

      <FeatureCard
        icon={<Database className="h-10 w-10 text-indigo-500" />}
        title="Explorateur documentaire"
        description="Gérez tous vos documents techniques dans un espace centralisé et organisé."
      />

      <FeatureCard
        icon={<Bot className="h-10 w-10 text-red-500" />}
        title="Assistant IA"
        description="Contrôlez votre production par commandes vocales et obtenez des recommandations intelligentes."
      />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="card-3d h-full">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
