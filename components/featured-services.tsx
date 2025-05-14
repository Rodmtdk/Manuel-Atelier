"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Cog, Wrench, PrinterIcon as Printer3d, Clock } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    title: "Fraisage CNC",
    description: "Usinage de précision sur 3 et 5 axes pour vos pièces complexes",
    icon: <Cog className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-400",
    link: "/devis?service=fraisage",
    badge: "Populaire",
  },
  {
    title: "Tournage CNC",
    description: "Fabrication de pièces de révolution avec une précision exceptionnelle",
    icon: <Wrench className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    link: "/devis?service=tournage",
  },
  {
    title: "Impression 3D",
    description: "Prototypage rapide et production de petites séries",
    icon: <Printer3d className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500",
    link: "/devis?service=impression3d",
  },
  {
    title: "Usinage express",
    description: "Livraison en 24-48h pour vos besoins urgents",
    icon: <Clock className="h-8 w-8" />,
    color: "from-orange-500 to-amber-500",
    link: "/devis?service=express",
    badge: "Urgent",
  },
]

export function FeaturedServices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col overflow-hidden">
            <CardContent className="flex-1 pt-6">
              <div className="mb-4">
                <div className={`rounded-full p-3 bg-gradient-to-br ${service.color} text-white inline-block`}>
                  {service.icon}
                </div>
                {service.badge && (
                  <Badge className="ml-2" variant="secondary">
                    {service.badge}
                  </Badge>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={service.link}>
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
