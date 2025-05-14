"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, Bot } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid"></div>

      {/* Animated Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                L'atelier intelligent
              </span>
              <br />
              nouvelle génération
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transformez votre fabrication industrielle avec l'IA, la simulation d'usinage et la génération automatique
              de devis et de code CNC.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="gradient-button" asChild>
                <Link href="/upload">
                  <Upload className="mr-2 h-5 w-5" /> Télécharger un fichier
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="neon-border" asChild>
                <Link href="/ai-assistant">
                  <Bot className="mr-2 h-5 w-5" /> Essayer l'assistant IA
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Compatible avec <span className="font-medium text-foreground">STEP, STL, PDF, DXF</span> et plus encore
            </motion.div>
          </div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="relative w-full aspect-square max-w-[500px] mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* 3D Model Visualization Placeholder */}
              <div className="absolute inset-0 rounded-lg overflow-hidden border-2 border-primary/50 neon-border bg-black/20">
                <div className="absolute inset-0 cyber-grid opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2 neon-text">3D</div>
                    <div className="text-sm text-muted-foreground">Visualisation interactive</div>
                  </div>
                </div>
              </div>

              {/* Animated UI Elements */}
              <motion.div
                className="absolute top-4 right-4 w-32 h-24 rounded-md bg-background/80 backdrop-blur-sm border border-primary/30 p-2"
                initial={{ x: 20, opacity: 0 }}
                animate={{
                  x: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-medium mb-1">Analyse IA</div>
                <div className="h-1 w-full bg-muted rounded-full mb-2">
                  <div className="h-1 bg-primary rounded-full" style={{ width: "70%" }}></div>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Caractéristiques détectées:</div>
                <div className="text-xs">• 4 perçages</div>
                <div className="text-xs">• 2 poches</div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 w-40 h-28 rounded-md bg-background/80 backdrop-blur-sm border border-primary/30 p-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: isHovered ? 0 : -10,
                  opacity: isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-medium mb-1">Informations pièce</div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div className="text-xs text-muted-foreground">Volume:</div>
                  <div className="text-xs">127 cm³</div>
                  <div className="text-xs text-muted-foreground">Matière:</div>
                  <div className="text-xs">Aluminium</div>
                  <div className="text-xs text-muted-foreground">Dimensions:</div>
                  <div className="text-xs">120 x 80 x 40</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
