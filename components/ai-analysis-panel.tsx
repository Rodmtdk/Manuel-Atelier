"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ruler, Drill, Square, Cylinder, Layers, Wrench } from "lucide-react"

export function AIAnalysisPanel() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="features">
          <Layers className="mr-2 h-4 w-4" /> Caractéristiques
        </TabsTrigger>
        <TabsTrigger value="dimensions">
          <Ruler className="mr-2 h-4 w-4" /> Dimensions
        </TabsTrigger>
        <TabsTrigger value="manufacturing">
          <Wrench className="mr-2 h-4 w-4" /> Fabrication
        </TabsTrigger>
      </TabsList>

      <TabsContent value="features" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Drill className="h-5 w-5 text-blue-500" />}
            title="Perçages"
            count={8}
            details={[
              { label: "Ø6mm", count: 4 },
              { label: "Ø8mm", count: 2 },
              { label: "Ø10mm", count: 2 },
            ]}
          />

          <FeatureCard
            icon={<Square className="h-5 w-5 text-green-500" />}
            title="Poches"
            count={3}
            details={[
              { label: "Rectangulaires", count: 2 },
              { label: "Circulaires", count: 1 },
            ]}
          />

          <FeatureCard
            icon={<Cylinder className="h-5 w-5 text-purple-500" />}
            title="Bossages"
            count={2}
            details={[{ label: "Cylindriques", count: 2 }]}
          />

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Layers className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Autres caractéristiques</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chanfreins</span>
                    <Badge variant="outline">4</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Congés</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Filetages</span>
                    <Badge variant="outline">2</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="dimensions" className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Dimensions principales</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Longueur</p>
                  <p className="font-medium">120.0 mm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Largeur</p>
                  <p className="font-medium">80.0 mm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Hauteur</p>
                  <p className="font-medium">40.0 mm</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Volume</p>
                  <p className="font-medium">127.3 cm³</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Surface</p>
                  <p className="font-medium">186.5 cm²</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Masse estimée (Aluminium)</p>
                <p className="font-medium">343.7 g</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Tolérances détectées</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Perçages Ø6mm</span>
                <Badge>H7</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Poche rectangulaire centrale</span>
                <Badge>±0.05mm</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Surface supérieure</span>
                <Badge>Ra 1.6</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="manufacturing" className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Recommandations de fabrication</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Matériau recommandé</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500">Aluminium 6061</Badge>
                  <Badge variant="outline">Aluminium 7075</Badge>
                  <Badge variant="outline">Acier inoxydable 304</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Procédé recommandé</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500">Fraisage CNC</Badge>
                  <Badge variant="outline">Usinage 5 axes</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Complexité d'usinage</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-amber-500">Moyenne</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  La pièce présente quelques caractéristiques complexes qui nécessitent une attention particulière.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Temps d'usinage estimé</p>
                <p className="font-medium">45-60 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  count: number
  details: { label: string; count: number }[]
}

function FeatureCard({ icon, title, count, details }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            {icon}
            <h3 className="font-medium">{title}</h3>
            <Badge className="ml-auto">{count}</Badge>
          </div>
          <div className="space-y-2">
            {details.map((detail, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{detail.label}</span>
                <Badge variant="outline">{detail.count}</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
