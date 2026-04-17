"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface ContentSectionProps {
  title: string
  children: React.ReactNode
  className?: string
  id?: string
}

export function ContentSection({
  title,
  children,
  className,
  id,
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={cn(
        "py-12 scroll-mt-24",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl flex items-center gap-3">
        <span 
          className={cn(
            "inline-block h-1 w-8 rounded-full bg-gradient-to-r from-primary to-accent",
            "transition-all duration-500 delay-200",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{ transformOrigin: "left" }}
        />
        <span 
          className={cn(
            "transition-all duration-500 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          )}
        >
          {title}
        </span>
      </h2>
      <div 
        className={cn(
          "transition-all duration-600 delay-400",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </div>
    </section>
  )
}
