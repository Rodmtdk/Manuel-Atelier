import Image from "next/image"
import { cn } from "@/lib/utils"

interface BannerImageProps {
  src: string
  alt: string
  overlay?: "dark" | "gradient" | "none"
  height?: "sm" | "md" | "lg"
  children?: React.ReactNode
  className?: string
  priority?: boolean
}

export function BannerImage({
  src,
  alt,
  overlay = "gradient",
  height = "md",
  children,
  className,
  priority = false,
}: BannerImageProps) {
  const heightClasses = {
    sm: "h-[200px] md:h-[260px]",
    md: "h-[280px] md:h-[380px]",
    lg: "h-[360px] md:h-[480px]",
  }

  const overlayClasses = {
    dark: "bg-background/70",
    gradient:
      "bg-gradient-to-t from-background via-background/50 to-background/20",
    none: "",
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        heightClasses[height],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority={priority}
      />
      {overlay !== "none" && (
        <div className={cn("absolute inset-0", overlayClasses[overlay])} />
      )}
      {children && (
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 pb-6 lg:px-8">{children}</div>
        </div>
      )}
    </div>
  )
}

interface SectionBannerProps {
  src: string
  alt: string
  caption?: string
  className?: string
}

export function SectionBanner({
  src,
  alt,
  caption,
  className,
}: SectionBannerProps) {
  return (
    <figure className={cn("group relative my-8 overflow-hidden rounded-2xl", className)}>
      <div className="relative h-[200px] w-full overflow-hidden md:h-[300px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 px-6 pb-4 text-sm font-medium text-foreground/90">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
