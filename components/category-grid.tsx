import Link from "next/link"
import { PenToolIcon as Tool, Wrench, Cpu, FileCode, Box, Layers, Shield, Calculator } from "lucide-react"

const categories = [
  {
    title: "Fraisage & Tournage",
    description: "Techniques et paramètres",
    icon: <Tool className="h-8 w-8" />,
    href: "/machining",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Machines-outils",
    description: "Conventionnelles et CNC",
    icon: <Wrench className="h-8 w-8" />,
    href: "/machines",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Commandes numériques",
    description: "Siemens, Fanuc, NUM",
    icon: <Cpu className="h-8 w-8" />,
    href: "/cnc",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Post-processeurs",
    description: "Configuration FAO",
    icon: <FileCode className="h-8 w-8" />,
    href: "/post-processors",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Outils coupants",
    description: "Sélection et utilisation",
    icon: <Tool className="h-8 w-8" />,
    href: "/cutting-tools",
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Fixations",
    description: "Systèmes et standards",
    icon: <Box className="h-8 w-8" />,
    href: "/fixations",
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Matières usinables",
    description: "Propriétés et paramètres",
    icon: <Layers className="h-8 w-8" />,
    href: "/materials",
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Sécurité",
    description: "Protocoles et normes",
    icon: <Shield className="h-8 w-8" />,
    href: "/safety",
    color: "from-rose-500 to-red-500",
  },
  {
    title: "Calculateur",
    description: "Outils de calcul",
    icon: <Calculator className="h-8 w-8" />,
    href: "/calculator",
    color: "from-teal-500 to-green-500",
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className="group relative overflow-hidden rounded-lg border p-4 hover:border-foreground/20 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-full p-2 bg-gradient-to-br ${category.color} text-white`}>{category.icon}</div>
            <div>
              <h3 className="font-medium">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      ))}
    </div>
  )
}
