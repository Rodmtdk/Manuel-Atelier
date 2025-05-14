"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { FileUploader } from "@/components/file-uploader"
import { PricingCalculator } from "@/components/pricing-calculator"
import { toast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"
import { Check } from "lucide-react"

export default function DevisPage() {
  const searchParams = useSearchParams()
  const defaultService = searchParams.get("service") || "fraisage"

  const [activeTab, setActiveTab] = useState(defaultService)
  const [files, setFiles] = useState<File[]>([])
  const [material, setMaterial] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [urgency, setUrgency] = useState(false)
  const [dimensions, setDimensions] = useState({ x: "", y: "", z: "" })
  const [tolerance, setTolerance] = useState("0.1")
  const [surface, setSurface] = useState("standard")
  const [price, setPrice] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles)
    // Recalculate price when files change
    calculatePrice()
  }

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

    // Calculate final price
    const calculatedPrice =
      basePrice * materialFactor * quantityFactor * urgencyFactor * toleranceFactor * surfaceFactor * qty

    // Round to 2 decimal places
    setPrice(Math.round(calculatedPrice * 100) / 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Demande de devis envoyée !",
        description: "Nous vous contacterons dans les plus brefs délais.",
      })
    }, 2000)
  }

  // Recalculate price when form values change
  const updateFormAndPrice = (key: string, value: any) => {
    switch (key) {
      case "material":
        setMaterial(value)
        break
      case "quantity":
        setQuantity(value)
        break
      case "urgency":
        setUrgency(value)
        break
      case "tolerance":
        setTolerance(value)
        break
      case "surface":
        setSurface(value)
        break
      case "dimensions":
        setDimensions(value)
        break
    }

    // Delay calculation slightly to ensure state is updated
    setTimeout(calculatePrice, 0)
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center py-12">
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <Check className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Demande de devis envoyée avec succès !</h1>
            <p className="text-muted-foreground max-w-md mb-8">
              Merci pour votre demande. Notre équipe technique va l&apos;étudier et vous contactera dans les plus brefs
              délais.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mb-8 max-w-md">
              <p className="font-medium">Référence de votre demande :</p>
              <p className="text-xl font-mono mt-2">
                DEV-
                {Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, "0")}
              </p>
            </div>
            <Button asChild>
              <a href="/">Retour à l&apos;accueil</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Demande de devis</h1>
        <p className="text-muted-foreground">Obtenez un devis personnalisé pour vos projets d&apos;usinage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Détails de votre projet</CardTitle>
              <CardDescription>Fournissez les informations nécessaires pour obtenir un devis précis</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="fraisage">Fraisage CNC</TabsTrigger>
                    <TabsTrigger value="tournage">Tournage CNC</TabsTrigger>
                    <TabsTrigger value="impression3d">Impression 3D</TabsTrigger>
                  </TabsList>

                  <TabsContent value="fraisage" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fraisage-files">Fichiers 3D (STL, STEP, IGS)</Label>
                        <FileUploader
                          id="fraisage-files"
                          onFilesChange={handleFileChange}
                          acceptedFileTypes=".stl,.step,.stp,.igs,.iges"
                          maxFiles={5}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fraisage-material">Matière</Label>
                          <Select value={material} onValueChange={(value) => updateFormAndPrice("material", value)}>
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
                            onChange={(e) => updateFormAndPrice("quantity", e.target.value)}
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
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, x: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fraisage-dim-y">Dimension Y (mm)</Label>
                          <Input
                            id="fraisage-dim-y"
                            type="number"
                            placeholder="0.00"
                            value={dimensions.y}
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, y: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fraisage-dim-z">Dimension Z (mm)</Label>
                          <Input
                            id="fraisage-dim-z"
                            type="number"
                            placeholder="0.00"
                            value={dimensions.z}
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, z: e.target.value })}
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
                          onValueChange={(value) => updateFormAndPrice("tolerance", value[0].toString())}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fraisage-surface">Finition de surface</Label>
                        <Select value={surface} onValueChange={(value) => updateFormAndPrice("surface", value)}>
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
                        <Switch
                          id="fraisage-urgency"
                          checked={urgency}
                          onCheckedChange={(checked) => updateFormAndPrice("urgency", checked)}
                        />
                        <Label htmlFor="fraisage-urgency">Usinage express (24-48h)</Label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tournage" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tournage-files">Fichiers 3D (STL, STEP, IGS)</Label>
                        <FileUploader
                          id="tournage-files"
                          onFilesChange={handleFileChange}
                          acceptedFileTypes=".stl,.step,.stp,.igs,.iges"
                          maxFiles={5}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tournage-material">Matière</Label>
                          <Select value={material} onValueChange={(value) => updateFormAndPrice("material", value)}>
                            <SelectTrigger id="tournage-material">
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
                          <Label htmlFor="tournage-quantity">Quantité</Label>
                          <Input
                            id="tournage-quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => updateFormAndPrice("quantity", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tournage-dim-diameter">Diamètre (mm)</Label>
                          <Input
                            id="tournage-dim-diameter"
                            type="number"
                            placeholder="0.00"
                            value={dimensions.x}
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, x: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tournage-dim-length">Longueur (mm)</Label>
                          <Input
                            id="tournage-dim-length"
                            type="number"
                            placeholder="0.00"
                            value={dimensions.y}
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, y: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="tournage-tolerance">Tolérance (mm)</Label>
                          <span className="text-sm text-muted-foreground">{tolerance} mm</span>
                        </div>
                        <Slider
                          id="tournage-tolerance"
                          min={0.01}
                          max={0.5}
                          step={0.01}
                          value={[Number.parseFloat(tolerance)]}
                          onValueChange={(value) => updateFormAndPrice("tolerance", value[0].toString())}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tournage-surface">Finition de surface</Label>
                        <Select value={surface} onValueChange={(value) => updateFormAndPrice("surface", value)}>
                          <SelectTrigger id="tournage-surface">
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
                        <Switch
                          id="tournage-urgency"
                          checked={urgency}
                          onCheckedChange={(checked) => updateFormAndPrice("urgency", checked)}
                        />
                        <Label htmlFor="tournage-urgency">Usinage express (24-48h)</Label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="impression3d" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="impression3d-files">Fichiers 3D (STL)</Label>
                        <FileUploader
                          id="impression3d-files"
                          onFilesChange={handleFileChange}
                          acceptedFileTypes=".stl"
                          maxFiles={5}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="impression3d-material">Matière</Label>
                          <Select value={material} onValueChange={(value) => updateFormAndPrice("material", value)}>
                            <SelectTrigger id="impression3d-material">
                              <SelectValue placeholder="Sélectionner une matière" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pla">PLA</SelectItem>
                              <SelectItem value="abs">ABS</SelectItem>
                              <SelectItem value="petg">PETG</SelectItem>
                              <SelectItem value="nylon">Nylon</SelectItem>
                              <SelectItem value="tpu">TPU Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="impression3d-quantity">Quantité</Label>
                          <Input
                            id="impression3d-quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => updateFormAndPrice("quantity", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="impression3d-dim-x">Dimension X (mm)</Label>
                          <Input
                            id="impression3d-dim-x"
                            type="number"
                            placeholder="0.00"
                            value={dimensions.x}
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, x: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="impression3d-dim-y">Dimension Y (mm)</Label>
                          <Input
                            id="impression3d-dim-y"
                            type="number"
                            placeholder="0.00"
                            value={dimensions.y}
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, y: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="impression3d-dim-z">Dimension Z (mm)</Label>
                          <Input
                            id="impression3d-dim-z"
                            type="number"
                            placeholder="0.00"
                            value={dimensions.z}
                            onChange={(e) => updateFormAndPrice("dimensions", { ...dimensions, z: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="impression3d-surface">Finition de surface</Label>
                        <Select value={surface} onValueChange={(value) => updateFormAndPrice("surface", value)}>
                          <SelectTrigger id="impression3d-surface">
                            <SelectValue placeholder="Sélectionner une finition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="poli">Poli</SelectItem>
                            <SelectItem value="peint">Peint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="impression3d-urgency"
                          checked={urgency}
                          onCheckedChange={(checked) => updateFormAndPrice("urgency", checked)}
                        />
                        <Label htmlFor="impression3d-urgency">Impression express (24-48h)</Label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes supplémentaires</Label>
                  <Textarea
                    id="notes"
                    placeholder="Précisez ici toute information complémentaire concernant votre projet..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Informations de contact</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="name" placeholder="Nom complet" required />
                    <Input id="email" type="email" placeholder="Email" required />
                    <Input id="company" placeholder="Entreprise" />
                    <Input id="phone" placeholder="Téléphone" />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : "Demander un devis"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Estimation de prix</CardTitle>
              <CardDescription>Estimation basée sur les informations fournies</CardDescription>
            </CardHeader>
            <CardContent>
              <PricingCalculator
                price={price}
                service={activeTab}
                material={material}
                quantity={Number.parseInt(quantity) || 1}
                urgency={urgency}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
