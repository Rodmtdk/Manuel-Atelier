import Link from "next/link"
import Image from "next/image"
import { BannerImage } from "@/components/banner-image"
import { FactStrip } from "@/components/fact-card"
import {
  Wrench,
  Settings,
  Calculator,
  ShieldAlert,
  Rocket,
  Disc,
  ArrowRight,
  BookOpen,
  Target,
  Gauge,
} from "lucide-react"

const categories = [
  {
    title: "Fraisage Conventionnel",
    description: "Techniques classiques pour le fraisage traditionnel. Ma\u00eetrisez les fraiseuses manuelles.",
    href: "/fraisage/conventionnel",
    icon: Wrench,
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Fraisage CNC",
    description: "Technologies avanc\u00e9es d\u2019usinage num\u00e9rique. Programmation et parcours d\u2019outils.",
    href: "/fraisage/cnc",
    icon: Settings,
    color: "from-accent/20 to-accent/5",
  },
  {
    title: "Tournage Conventionnel",
    description: "Bases et techniques du tournage manuel. Du dressage au filetage.",
    href: "/tournage/conventionnel",
    icon: Wrench,
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Tournage CNC",
    description: "Tournage num\u00e9rique haute pr\u00e9cision. Programmation ISO et FAO.",
    href: "/tournage/cnc",
    icon: Settings,
    color: "from-accent/20 to-accent/5",
  },
  {
    title: "Rectification",
    description: "Techniques de rectification plane et cylindrique. Finitions de haute pr\u00e9cision.",
    href: "/rectification",
    icon: Disc,
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "S\u00e9curit\u00e9 en Atelier",
    description: "\u00c9quipements de protection, r\u00e8gles de s\u00e9curit\u00e9 et premiers secours.",
    href: "/securite",
    icon: ShieldAlert,
    color: "from-destructive/20 to-destructive/5",
  },
]

const stats = [
  { value: "7+", label: "Modules complets", icon: BookOpen },
  { value: "50+", label: "Techniques d\u00e9taill\u00e9es", icon: Target },
  { value: "3", label: "Calculateurs", icon: Gauge },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border px-4 py-20 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,114,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,230,214,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Encyclop\u00e9die d{"\u2019"}Atelier
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Manuel d{"\u2019"}Atelier{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Usinage & Rectification
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            L{"\u2019"}encyclop\u00e9die compl\u00e8te qui transmet toutes les comp\u00e9tences en
            fraisage, tournage et rectification. Du d\u00e9butant au professionnel.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demarrage"
              className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <Rocket className="h-4 w-4" />
              Commencer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/calculateur"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              <Calculator className="h-4 w-4" />
              Calculateur de vitesses
            </Link>
          </div>
        </div>
      </section>

      {/* Cinematic banner */}
      <BannerImage
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mesure1-NTzOlWysMlPU9zAL42mKYDBHo9LSGJ.jpg"
        alt="Plans techniques avec pi\u00e8ces usin\u00e9es, roulements et pied \u00e0 coulisse"
        overlay="gradient"
        height="md"
        priority
      >
        <div className="mx-auto max-w-7xl">
          <span className="mb-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
            Pr\u00e9cision au micron
          </span>
          <h2 className="max-w-xl text-balance text-2xl font-bold text-foreground md:text-4xl">
            O\u00f9 chaque centi\u00e8me de millim\u00e8tre compte
          </h2>
        </div>
      </BannerImage>

      {/* Stats */}
      <section className="border-b border-border bg-secondary/20 px-4 py-12 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-center">
              <stat.icon className="h-8 w-8 text-primary" />
              <div>
                <div className="animate-shimmer text-2xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories grid */}
      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Apprendre
            </h2>
            <p className="mt-3 text-muted-foreground">
              Explorez chaque domaine de l{"\u2019"}usinage avec des guides d\u00e9taill\u00e9s
              et des ressources professionnelles.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`animate-fade-in group relative overflow-hidden rounded-2xl border border-border bg-card p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 delay-${(i + 1) * 100}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <cat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {cat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    D\u00e9couvrir
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Facts + feature image */}
      <section className="border-t border-border px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid items-center gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-image-7F4dkLjnT8Gu3tlBSjjzi3GZiXPvKh.jpg"
                  alt="Usinage CNC d\u2019un engrenage spiroconique de haute pr\u00e9cision"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                  Rectification spiroconique
                </span>
              </div>
            </div>
            <div className="lg:col-span-3">
              <FactStrip
                facts={[
                  {
                    fact: "Un engrenage spiroconique de diff\u00e9rentiel automobile tourne jusqu\u2019\u00e0 4 000 tr/min et transmet plusieurs centaines de Nm de couple. La moindre impr\u00e9cision de 0,01 mm g\u00e9n\u00e8re un bruit perceptible.",
                    variant: "accent",
                  },
                  {
                    fact: "Les broches de tours CNC modernes atteignent 15 000 tr/min. \u00c0 cette vitesse, un copeau d\u2019acier est \u00e9ject\u00e9 \u00e0 plus de 200 km/h \u2014 d\u2019o\u00f9 l\u2019importance capitale des protections.",
                    variant: "default",
                  },
                  {
                    fact: "La meule de rectification contient des millions de grains abrasifs. Chacun agit comme un micro-outil de coupe, permettant des tol\u00e9rances de 0,001 mm \u2014 soit 50 fois plus fin qu\u2019un cheveu humain.",
                    variant: "highlight",
                  },
                ]}
                className="grid-cols-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compact gallery */}
      <section className="border-t border-border bg-secondary/10 px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              L{"\u2019"}Atelier en Images
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv1-AeqQSvQl5OISTypBxTtimDtx2X231w.jpg",
                label: "Tournage conventionnel",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-conv-hQ6MZQwEpYMaXRitgcZN6oyAZnH21I.jpg",
                label: "Fraisage conventionnel",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraisage-cnc.jpg-4r4iswSu1DX2bbB1n0dejMY2mR79bC.webp",
                label: "Fraisage CNC",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mesure.jpg-d9PceTfRum5SrQA2rafUKjXyvPzUJe.png",
                label: "M\u00e9trologie",
              },
            ].map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                  {img.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore guides CTA */}
      <section className="border-t border-border px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Commencez votre apprentissage
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Chaque module contient des guides illustr\u00e9s, des quiz interactifs et
            des calculateurs pour ma\u00eetriser les techniques d{"\u2019"}usinage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demarrage"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <Rocket className="h-4 w-4" />
              Guide de d\u00e9marrage
            </Link>
            <Link
              href="/calculateur"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              <Calculator className="h-4 w-4" />
              Calculateur de vitesses
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
