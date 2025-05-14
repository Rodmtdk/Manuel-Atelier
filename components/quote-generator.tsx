"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Download, Clock, FileCheck, Send, Calculator, Sparkles } from "lucide-react"

interface QuoteGeneratorProps {
  modelData?: {
    name: string
    dimensions: { x: number; y: number; z: number }
    volume: number
    features: { type: string; count: number }[]
  }
}

export function QuoteGenerator({ modelData }: QuoteGeneratorProps) {
  const [activeTab, setActiveTab] = useState("fraisage")
  const [material, setMaterial] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [urgency, setUrgency] = useState(false)
  const [tolerance, setTolerance] = useState("0.1")
  const [surface, setSurface] = useState("standard")
  const [price, setPrice] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [quoteNumber, setQuoteNumber] = useState("")
  const [dimensions, setDimensions] = useState({
    x: modelData?.dimensions.x.toString() || "",
    y: modelData?.dimensions.y.toString() || "",
    z: modelData?.dimensions.z.toString() || "",
  })

  // Generate a quote number
  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    setQuoteNumber(`Q${year}${month}-${random}`)
  }, [])

  // Calculate price when form values change
  useEffect(() => {
    if (material && quantity) {
      calculatePrice()
    }
  }, [material, quantity, urgency, tolerance, surface, activeTab])

  const calculatePrice = () => {
    // Base price depends on the service
    let basePrice = 0
    switch (activeTab) {
      case "fraisage":
        basePrice = 100
        break
      case "tournage":
        basePrice = 80
        break
      case "impression3d":
        basePrice = 50
        break
      default:
        basePrice = 100
    }

    // Material factor
    let materialFactor = 1
    switch (material) {
      case "aluminium":
        materialFactor = 1.2
        break
      case "acier":
        materialFactor = 1.5
        break
      case "inox":
        materialFactor = 1.8
        break
      case "titane":
        materialFactor = 2.5
        break
      case "plastique":
        materialFactor = 0.8
        break
      default:
        materialFactor = 1
    }

    // Quantity discount
    const qty = Number.parseInt(quantity) || 1
    let quantityFactor = 1
    if (qty >= 10) quantityFactor = 0.8
    else if (qty >= 5) quantityFactor = 0.9
    else if (qty > 1) quantityFactor = 0.95

    // Urgency surcharge
    const urgencyFactor = urgency ? 1.5 : 1

    // Tolerance factor
    const toleranceValue = Number.parseFloat(tolerance) || 0.1
    let toleranceFactor = 1
    if (toleranceValue <= 0.01) toleranceFactor = 1.8
    else if (toleranceValue <= 0.05) toleranceFactor = 1.3
    else if (toleranceValue <= 0.1) toleranceFactor = 1

    // Surface finish factor
    let surfaceFactor = 1
    switch (surface) {
      case "poli":
        surfaceFactor = 1.3
        break
      case "anodise":
        surfaceFactor = 1.5
        break
      default:
        surfaceFactor = 1
    }

    // Volume factor (if model data is available)
    let volumeFactor = 1
    if (modelData?.volume) {
      volumeFactor = Math.max(1, Math.min(2, modelData.volume / 100))
    }

    // Calculate final price
    const calculatedPrice =
      basePrice * materialFactor * quantityFactor * urgencyFactor * toleranceFactor * surfaceFactor * volumeFactor * qty

    // Round to 2 decimal places
    setPrice(Math.round(calculatedPrice * 100) / 100)
  }

  const generateQuote = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Générateur de devis</CardTitle>
            <CardDescription>Configurez et générez un devis personnalisé</CardDescription>
          </div>
          {isGenerated && (
            <Badge variant="outline" className="px-3 py-1">
              <FileCheck className="mr-1 h-3 w-3" /> Devis #{quoteNumber}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="fraisage">Fraisage CNC</TabsTrigger>
            <TabsTrigger value="tournage">Tournage CNC</TabsTrigger>
            <TabsTrigger value="impression3d">Impression 3D</TabsTrigger>
          </TabsList>

          <TabsContent value="fraisage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fraisage-material">Matière</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger id="fraisage-material">
                    <SelectValue placeholder="Sélectionner une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluminium">Aluminium</SelectItem>
                    <SelectItem value="acier">Acier</SelectItem>
                    <SelectItem value="inox">Acier inoxydable</SelectItem>
                    <SelectItem value="titane">Titane</SelectItem>
                    <SelectItem value="plastique">Plastique technique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fraisage-quantity">Quantité</Label>
                <Input
                  id="fraisage-quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fraisage-dim-x">Dimension X (mm)</Label>
                <Input
                  id="fraisage-dim-x"
                  type="number"
                  placeholder="0.00"
                  value={dimensions.x}
                  onChange={(e) => setDimensions({ ...dimensions, x: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fraisage-dim-y">Dimension Y (mm)</Label>
                <Input
                  id="fraisage-dim-y"
                  type="number"
                  placeholder="0.00"
                  value={dimensions.y}
                  onChange={(e) => setDimensions({ ...dimensions, y: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fraisage-dim-z">Dimension Z (mm)</Label>
                <Input
                  id="fraisage-dim-z"
                  type="number"
                  placeholder="0.00"
                  value={dimensions.z}
                  onChange={(e) => setDimensions({ ...dimensions, z: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="fraisage-tolerance">Tolérance (mm)</Label>
                <span className="text-sm text-muted-foreground">{tolerance} mm</span>
              </div>
              <Slider
                id="fraisage-tolerance"
                min={0.01}
                max={0.5}
                step={0.01}
                value={[Number.parseFloat(tolerance)]}
                onValueChange={(value) => setTolerance(value[0].toString())}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fraisage-surface">Finition de surface</Label>
              <Select value={surface} onValueChange={setSurface}>
                <SelectTrigger id="fraisage-surface">
                  <SelectValue placeholder="Sélectionner une finition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (brut d&apos;usinage)</SelectItem>
                  <SelectItem value="poli">Poli</SelectItem>
                  <SelectItem value="anodise">Anodisé (aluminium uniquement)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="fraisage-urgency" checked={urgency} onCheckedChange={setUrgency} />
              <Label htmlFor="fraisage-urgency">Usinage express (24-48h)</Label>
            </div>
          </TabsContent>

          <TabsContent value="tournage" className="space-y-6">
            {/* Contenu similaire pour le tournage */}
            <div className="text-center text-muted-foreground py-8">
              Configuration similaire au fraisage, adaptée pour le tournage
            </div>
          </TabsContent>

          <TabsContent value="impression3d" className="space-y-6">
            {/* Contenu similaire pour l'impression 3D */}
            <div className="text-center text-muted-foreground py-8">
              Configuration similaire au fraisage, adaptée pour l'impression 3D
            </div>
          </TabsContent>
        </Tabs>

        {price !== null && (
          <div className="mt-6 p-4 border rounded-lg bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Récapitulatif</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span>
                      {activeTab === "fraisage"
                        ? "Fraisage CNC"
                        : activeTab === "tournage"
                          ? "Tournage CNC"
                          : "Impression 3D"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Matière:</span>
                    <span>{material || "Non spécifiée"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Quantité:</span>
                    <span>{quantity}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span>
                      {dimensions.x || "0"}×{dimensions.y || "0"}×{dimensions.z || "0"} mm
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Tolérance:</span>
                    <span>±{tolerance} mm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Finition:</span>
                    <span>{surface === "standard" ? "Standard" : surface === "poli" ? "Poli" : "Anodisé"}</span>
                  </li>
                  {urgency && (
                    <li className="flex justify-between text-amber-500">
                      <span>Délai express:</span>
                      <span>Oui (+50%)</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium mb-2">Estimation de prix</h3>
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prix unitaire HT:</span>
                      <span>{(price / Number.parseInt(quantity)).toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prix total HT:</span>
                      <span>{price.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVA (20%):</span>
                      <span>{(price * 0.2).toFixed(2)} €</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total TTC:</span>
                      <span>{(price * 1.2).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Délai estimé: {urgency ? "2-3 jours" : "7-10 jours"}</span>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    <Calculator className="h-3 w-3 mr-1" /> Estimation
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          Optimiser
        </Button>
        <div className="flex space-x-2">
          {isGenerated ? (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Télécharger PDF
            </Button>
          ) : (
            <Button onClick={generateQuote} disabled={isGenerating || !material || !quantity}>
              {isGenerating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Génération...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Générer le devis
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
