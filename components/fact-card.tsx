import { cn } from "@/lib/utils"
import { Lightbulb, Zap, Info } from "lucide-react"

interface FactCardProps {
  fact: string
  source?: string
  variant?: "default" | "accent" | "highlight"
  className?: string
}

export function FactCard({
  fact,
  source,
  variant = "default",
  className,
}: FactCardProps) {
  const variants = {
    default: {
      border: "border-primary/20",
      bg: "bg-primary/5",
      icon: Lightbulb,
      iconColor: "text-primary",
      label: "Le saviez-vous ?",
    },
    accent: {
      border: "border-accent/20",
      bg: "bg-accent/5",
      icon: Zap,
      iconColor: "text-accent",
      label: "Fait technique",
    },
    highlight: {
      border: "border-primary/30",
      bg: "bg-primary/5",
      icon: Info,
      iconColor: "text-primary",
      label: "Detail fascinant",
    },
  }

  const v = variants[variant]
  const Icon = v.icon

  return (
    <div
      className={cn(
        "rounded-xl border p-5",
        v.border,
        v.bg,
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon className={cn("h-4 w-4", v.iconColor)} />
        <span className={cn("text-xs font-semibold uppercase tracking-wider", v.iconColor)}>
          {v.label}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">{fact}</p>
      {source && (
        <p className="mt-2 text-xs text-muted-foreground">Source : {source}</p>
      )}
    </div>
  )
}

interface FactStripProps {
  facts: { fact: string; source?: string; variant?: "default" | "accent" | "highlight" }[]
  className?: string
}

export function FactStrip({ facts, className }: FactStripProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {facts.map((f, i) => (
        <FactCard key={i} fact={f.fact} source={f.source} variant={f.variant} />
      ))}
    </div>
  )
}
