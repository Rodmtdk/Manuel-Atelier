interface PageHeaderProps {
  title: string
  subtitle: string
  badge?: string
}

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/30 px-4 py-16 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,114,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            {badge}
          </span>
        )}
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
