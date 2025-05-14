import { Calculator, Database, Bot, FileCode, CloudCog } from "lucide-react"

export function FeatureHighlights() {
  const features = [
    {
      icon: <Calculator className="h-10 w-10 text-cyan-400" />,
      title: "Calculateur de paramètres",
      description: "Déterminez rapidement les paramètres optimaux pour vos opérations de fraisage et tournage.",
    },
    {
      icon: <Database className="h-10 w-10 text-cyan-400" />,
      title: "Sauvegarde dans le cloud",
      description: "Enregistrez vos calculs et configurations pour y accéder depuis n'importe quel appareil.",
    },
    {
      icon: <Bot className="h-10 w-10 text-cyan-400" />,
      title: "Recommandations IA",
      description: "Obtenez des suggestions intelligentes basées sur votre matériau et vos contraintes d'usinage.",
    },
    {
      icon: <FileCode className="h-10 w-10 text-cyan-400" />,
      title: "Gestion de G-code",
      description: "Stockez, analysez et optimisez vos fichiers G-code directement dans l'application.",
    },
    {
      icon: <CloudCog className="h-10 w-10 text-cyan-400" />,
      title: "Synchronisation multi-appareils",
      description: "Accédez à vos données depuis votre atelier, votre bureau ou en déplacement.",
    },
  ]

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">Fonctionnalités principales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 transition-transform hover:scale-105">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
