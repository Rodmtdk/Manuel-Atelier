"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    content:
      "AtelierConnect Ultra a révolutionné notre façon de travailler. L'analyse IA nous permet d'identifier rapidement les problèmes potentiels et d'optimiser nos stratégies d'usinage. Nous avons réduit nos délais de production de 30% !",
    author: "Thomas Durand",
    role: "Directeur technique, MécaPrécision",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    content:
      "La génération automatique de devis nous a permis de répondre plus rapidement aux demandes de nos clients. Nous pouvons maintenant fournir des devis précis en quelques minutes au lieu de plusieurs heures.",
    author: "Sophie Martin",
    role: "Responsable commerciale, IndusTech",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    content:
      "L'assistant IA est incroyablement utile. Je peux contrôler la production par commandes vocales tout en travaillant sur d'autres tâches. C'est comme avoir un expert en usinage toujours disponible pour répondre à mes questions.",
    author: "Marc Lefevre",
    role: "Chef d'atelier, AéroPièces",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-6">
                    <Quote className="h-8 w-8 text-primary/50" />
                  </div>
                  <p className="text-center text-lg mb-6">{testimonial.content}</p>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-12 w-12 mb-2">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn("w-2 h-2 rounded-full transition-colors", index === activeIndex ? "bg-primary" : "bg-muted")}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 hidden md:flex"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:flex"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
