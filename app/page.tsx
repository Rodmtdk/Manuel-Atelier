import { LandingHero } from "@/components/landing-hero"
import { FeatureHighlights } from "@/components/feature-highlights"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <LandingHero />
      <FeatureHighlights />
      <Testimonials />
      <CTASection />
    </main>
  )
}
