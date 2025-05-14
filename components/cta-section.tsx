import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-cyan-900 to-blue-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à optimiser vos opérations d'usinage ?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Rejoignez des milliers de professionnels qui utilisent AtelierConnect Ultra pour améliorer leur productivité
          et la qualité de leurs usinages.
        </p>
        <Button size="lg" asChild>
          <Link href="/register">Commencer gratuitement</Link>
        </Button>
      </div>
    </section>
  )
}
