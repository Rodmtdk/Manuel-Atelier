import { cn } from "@/lib/utils"

interface InfoCardProps {
  title: string
  items: string[]
  className?: string
}

export function InfoCard({ title, items, className }: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
