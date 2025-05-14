import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 pt-16 pb-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            AtelierConnect Ultra
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            La plateforme intelligente pour optimiser vos opérations d'usinage et maximiser votre productivité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/calculateur">
                Accéder au calculateur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/register">Créer un compte</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
