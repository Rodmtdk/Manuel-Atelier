import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

interface VideoEmbedProps {
  videoId: string
  title: string
  caption?: string
  className?: string
  platform?: "youtube" | "youtube-short"
}

export function VideoEmbed({
  videoId,
  title,
  caption,
  className,
  platform = "youtube",
}: VideoEmbedProps) {
  const embedUrl =
    platform === "youtube-short"
      ? `https://www.youtube.com/embed/${videoId}`
      : `https://www.youtube.com/embed/${videoId}`

  const aspectClass =
    platform === "youtube-short" ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video"

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
    >
      <div className={cn("relative w-full", aspectClass)}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="flex items-center gap-2 border-t border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
          <Play className="h-3.5 w-3.5 shrink-0 text-primary" />
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

interface VideoGridProps {
  videos: {
    videoId: string
    title: string
    caption?: string
    platform?: "youtube" | "youtube-short"
  }[]
  className?: string
}

export function VideoGrid({ videos, className }: VideoGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {videos.map((vid, i) => (
        <VideoEmbed
          key={i}
          videoId={vid.videoId}
          title={vid.title}
          caption={vid.caption}
          platform={vid.platform}
        />
      ))}
    </div>
  )
}
