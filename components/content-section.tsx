import { cn } from "@/lib/utils"

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
  return (
    <section id={id} className={cn("py-12", className)}>
      <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
        <span className="mr-2 inline-block h-1 w-8 rounded-full bg-primary align-middle" />
        {title}
      </h2>
      {children}
    </section>
  )
}
