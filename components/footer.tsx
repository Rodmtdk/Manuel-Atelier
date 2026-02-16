import Link from "next/link"
import { Wrench } from "lucide-react"

const sections = [
  {
    title: "Fraisage",
    links: [
      { label: "Conventionnel", href: "/fraisage/conventionnel" },
      { label: "CNC", href: "/fraisage/cnc" },
    ],
  },
  {
    title: "Tournage",
    links: [
      { label: "Conventionnel", href: "/tournage/conventionnel" },
      { label: "CNC", href: "/tournage/cnc" },
    ],
  },
  {
    title: "Outils",
    links: [
      { label: "Calculateur", href: "/calculateur" },
      { label: "Rectification", href: "/rectification" },
      { label: "Securite", href: "/securite" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">
                Manuel d{"'"}Atelier
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Encyclopedie complete d{"'"}usinage et de rectification. Toutes les
              competences pour maitriser l{"'"}atelier.
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Manuel d{"'"}Atelier - Usinage &
          Rectification
        </div>
      </div>
    </footer>
  )
}
