import Link from "next/link"
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
