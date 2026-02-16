import Image from "next/image"

interface PageHeaderProps {
  title: string
  subtitle: string
  badge?: string
  backgroundImage?: string
}

export function PageHeader({
  title,
  subtitle,
  badge,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background image (banner) */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </>
      )}

      {/* Fallback radial glow if no image */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,114,0.08),transparent_60%)]" />
      )}

      <div className={`relative mx-auto max-w-4xl px-4 text-center lg:px-8 ${backgroundImage ? "py-20 lg:py-32" : "py-16 lg:py-24"}`}>
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
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
