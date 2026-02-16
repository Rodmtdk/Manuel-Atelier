import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageShowcaseProps {
  src: string
  alt: string
  caption?: string
  className?: string
  priority?: boolean
  aspectRatio?: "video" | "square" | "wide" | "auto"
}

export function ImageShowcase({
  src,
  alt,
  caption,
  className,
  priority = false,
  aspectRatio = "video",
}: ImageShowcaseProps) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
    auto: "",
  }

  return (
    <figure
      className={cn(
        "group overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          aspectClasses[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      {caption && (
        <figcaption className="border-t border-border bg-secondary/30 px-4 py-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

interface ImageGridProps {
  images: {
    src: string
    alt: string
    caption?: string
  }[]
  columns?: 2 | 3
  className?: string
}

export function ImageGrid({ images, columns = 2, className }: ImageGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {images.map((img, i) => (
        <ImageShowcase
          key={i}
          src={img.src}
          alt={img.alt}
          caption={img.caption}
        />
      ))}
    </div>
  )
}
