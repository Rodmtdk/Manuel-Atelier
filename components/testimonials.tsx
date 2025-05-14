export function Testimonials() {
  const testimonials = [
    {
      quote:
        "AtelierConnect Ultra a révolutionné notre façon de calculer les paramètres d'usinage. Nous avons réduit nos temps de préparation de 40%.",
      author: "Jean Dupont",
      position: "Chef d'atelier, Industrie Précision",
    },
    {
      quote:
        "Les recommandations IA sont bluffantes de précision. L'application nous a permis d'optimiser nos processus et d'économiser sur nos outils.",
      author: "Marie Laurent",
      position: "Ingénieure de production, TechnoFab",
    },
    {
      quote:
        "La possibilité de sauvegarder nos calculs et d'y accéder depuis n'importe quel poste est un vrai plus pour notre équipe.",
      author: "Thomas Mercier",
      position: "Responsable CNC, AéroPièces",
    },
  ]

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">Ce que disent nos utilisateurs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 relative">
              <div className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 text-5xl text-cyan-400 opacity-30">
                "
              </div>
              <p className="text-gray-300 mb-6 relative z-10">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
