"use client"

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
  const renderItems = () => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return null
    }
    
    return (
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              className={cn(
                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125",
                variant === "accent" ? "bg-accent" : "bg-primary"
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    )
  }

  const renderChildren = () => {
    if (items && Array.isArray(items) && items.length > 0) {
      return null
    }
    if (!children) {
      return null
    }
    return (
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-card/50 p-6 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        variant === "accent"
          ? "border-accent/20 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
          : "border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          variant === "accent"
            ? "bg-gradient-to-br from-accent/5 to-transparent"
            : "bg-gradient-to-br from-primary/5 to-transparent"
        )}
      />
      
      <div className="relative">
        <h3 className="mb-4 text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-foreground">
          {title}
        </h3>
        {renderItems()}
        {renderChildren()}
      </div>
    </div>
  )
}
