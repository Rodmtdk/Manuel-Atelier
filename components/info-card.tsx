import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface InfoCardProps {
  title: string
  items?: string[]
  children?: ReactNode
  variant?: "default" | "accent"
  className?: string
}

export function InfoCard({
  title,
  items,
  children,
  variant = "default",
  className,
}: InfoCardProps) {
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : []
  const hasItems = safeItems.length > 0

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 backdrop-blur-sm transition-all hover:shadow-lg",
        variant === "accent"
          ? "border-accent/30 hover:border-accent/50 hover:shadow-accent/5"
          : "border-border hover:border-primary/30 hover:shadow-primary/5",
        className
      )}
    >
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      {hasItems ? (
        <ul className="flex flex-col gap-2.5">
          {safeItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className={cn(
                  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                  variant === "accent" ? "bg-accent" : "bg-primary"
                )}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : children ? (
        <div className="text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      ) : null}
    </div>
  )
}
