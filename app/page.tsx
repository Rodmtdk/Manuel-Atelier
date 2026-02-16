import Link from "next/link"
import Image from "next/image"
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
    description: "Techniques classiques pour le fraisage traditionnel. Maitrisez les fraiseuses manuelles.",
    href: "/fraisage/conventionnel",
    icon: Wrench,
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Fraisage CNC",
    description: "Technologies avancees d'usinage numerique. Programmation et parcours d'outils.",
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
    description: "Tournage numerique haute precision. Programmation ISO et FAO.",
    href: "/tournage/cnc",
    icon: Settings,
    color: "from-accent/20 to-accent/5",
  },
  {
    title: "Rectification",
    description: "Techniques de rectification plane et cylindrique. Finitions de haute precision.",
    href: "/rectification",
    icon: Disc,
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Securite en Atelier",
    description: "Equipements de protection, regles de securite et premiers secours.",
    href: "/securite",
    icon: ShieldAlert,
    color: "from-destructive/20 to-destructive/5",
  },
]

const stats = [
  { value: "7+", label: "Modules complets", icon: BookOpen },
  { value: "50+", label: "Techniques detaillees", icon: Target },
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
            Encyclopedie d{"'"}Atelier
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Manuel d{"'"}Atelier{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Usinage & Rectification
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            L{"'"}encyclopedie complete qui transmet toutes les competences en
            fraisage, tournage et rectification. Du debutant au professionnel.
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

      {/* Hero image */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-0 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-[420px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-image-7F4dkLjnT8Gu3tlBSjjzi3GZiXPvKh.jpg"
              alt="Usinage CNC d'un engrenage spiroconique de haute precision"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/80" />
          </div>
          <div className="flex flex-col gap-4 px-6 py-10 lg:px-12">
            <span className="inline-block w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Focus technique
            </span>
            <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
              Usinage d{"'"}engrenages spiroconiques
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              La rectification spiroconique represente le sommet de la precision
              en usinage. Decouvrez les techniques de taillage et de rectification
              des engrenages coniques a denture spirale, essentiels dans
              l{"'"}aeronautique, l{"'"}automobile et la robotique.
            </p>
            <Link
              href="/rectification"
              className="group mt-2 flex w-fit items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary/20 px-4 py-12 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-center">
              <stat.icon className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">
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
              Explorez chaque domaine de l{"'"}usinage avec des guides detailles
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
                    Decouvrir
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visual gallery */}
      <section className="border-t border-border bg-secondary/10 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              L{"'"}Atelier en Images
            </h2>
            <p className="mt-3 text-muted-foreground">
              Un apercu visuel des techniques et des machines couvertes dans ce manuel.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-conv1-AeqQSvQl5OISTypBxTtimDtx2X231w.jpg",
                alt: "Tournage conventionnel avec copeaux de metal en vol",
                label: "Tournage conventionnel",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-cnc-bHB1tYlh0iLkVkt0Yih2NFjNnnOD4n.jpg",
                alt: "Tour CNC en fonctionnement avec piece en mandrin",
                label: "Tournage CNC",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-image-7F4dkLjnT8Gu3tlBSjjzi3GZiXPvKh.jpg",
                alt: "Fraisage CNC d'un engrenage spiroconique",
                label: "Rectification spiroconique",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outils.jpg-bZqaPg57JOVBcIk9ZYxNpQkHNaPTSO.webp",
                alt: "Collection d'outils de fraisage et de coupe professionnels",
                label: "Outillage professionnel",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tournage-cnc1.jpg-CIJpZlxFYsEvVVUREnsclrdkD1BAvC.webp",
                alt: "Usinage CNC de precision sur piece en laiton",
                label: "Precision CNC",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/securite-ASW5ItCQnmTVL3n5eRq0nrQKHhXZh8.jpg",
                alt: "Equipements de protection individuelle en atelier",
                label: "Securite en atelier",
              },
            ].map((img, i) => (
              <div
                key={i}
                className="group relative aspect-video overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
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

      {/* PDF resources teaser */}
      <section className="border-t border-border bg-secondary/10 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Ressources PDF incluses
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Plus de 30 fiches techniques PDF couvrant chaque operation d{"'"}usinage
            en detail, du montage en l{"'"}air au filetage avance.
          </p>
          <Link
            href="/demarrage"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary/80"
          >
            <Rocket className="h-4 w-4" />
            Explorer les guides
          </Link>
        </div>
      </section>
    </>
  )
}
