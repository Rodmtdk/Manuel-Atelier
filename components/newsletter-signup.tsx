"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Check } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
      })
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="rounded-full bg-primary/10 p-3 mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">Merci pour votre inscription !</h3>
        <p className="text-muted-foreground">Vous recevrez bientôt nos dernières actualités et mises à jour.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Inscription..." : "S'inscrire"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        En vous inscrivant, vous acceptez de recevoir nos emails et confirmez avoir lu notre politique de
        confidentialité.
      </p>
    </form>
  )
}
