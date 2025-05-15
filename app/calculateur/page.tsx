import { CalculateurFraisage } from "@/components/calculateur-fraisage"

export default function CalculateurPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Calculateur de paramètres d&apos;usinage</h1>
      <CalculateurFraisage />
    </div>
  )
}
