import { PageHeader } from "@/components/page-header"
import { CalculatorTabs } from "@/components/calculator-tabs"

export default function CalculateurPage() {
  return (
    <>
      <PageHeader
        badge="Calculateur"
        title="Calculateur de Vitesses de Coupe"
        subtitle="Calculez instantanement vos vitesses de rotation, avances et parametres d'usinage pour le fraisage, le tournage et la rectification."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <CalculatorTabs />
      </div>
    </>
  )
}
