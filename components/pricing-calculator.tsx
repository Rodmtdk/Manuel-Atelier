"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

interface PricingCalculatorProps {
  price: number | null
  service: string
  material: string
  quantity: number
  urgency: boolean
}

export function PricingCalculator({ price, service, material, quantity, urgency }: PricingCalculatorProps) {
  // Format service name for display
  const getServiceName = () => {
    switch (service) {
      case "fraisage":
        return "Fraisage CNC"
      case "tournage":
        return "Tournage CNC"
      case "impression3d":
        return "Impression 3D"
      default:
        return "Service"
    }
  }

  // Format material name for display
  const getMaterialName = () => {
    switch (material) {
      case "aluminium":
        return "Aluminium"
      case "acier":
        return "Acier"
      case "inox":
        return "Acier inoxydable"
      case "titane":
        return "Titane"
      case "plastique":
        return "Plastique technique"
      case "pla":
        return "PLA"
      case "abs":
        return "ABS"
      case "petg":
        return "PETG"
      case "nylon":
        return "Nylon"
      case "tpu":
        return "TPU Flexible"
      default:
        return "Matériau non spécifié"
    }
  }

  if (!price) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Complétez le formulaire pour obtenir une estimation de prix</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <motion.div
          key={price}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-4xl font-bold"
        >
          {price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </motion.div>
        <p className="text-sm text-muted-foreground mt-1">Estimation HT</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Service:</span>
              <span className="font-medium">{getServiceName()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Matériau:</span>
              <span className="font-medium">{getMaterialName()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantité:</span>
              <span className="font-medium">{quantity}</span>
            </div>
            {urgency && (
              <div className="flex justify-between text-sm">
                <span>Délai express:</span>
                <span className="font-medium text-amber-500">Oui (+50%)</span>
              </div>
            )}

            <Separator className="my-2" />

            <div className="flex justify-between text-sm">
              <span>Prix unitaire:</span>
              <span className="font-medium">
                {(price / quantity).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>TVA (20%):</span>
              <span className="font-medium">
                {(price * 0.2).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
              </span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between font-medium">
              <span>Total TTC:</span>
              <span>{(price * 1.2).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
