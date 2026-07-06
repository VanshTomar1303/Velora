import Image from "next/image";
import { ImageOff, Video as VideoIcon, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  className?: string;
  type?: "image" | "video";
  label?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
  style?: React.CSSProperties;
  src?: string;
  priority?: boolean;
  sizes?: string;
}

const ratioClass: Record<Required<MediaPlaceholderProps>["ratio"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-video",
};

/**
 * Renders a real photo via next/image when `src` is provided. Falls back to
 * a gradient placeholder otherwise (no asset supplied yet for that slot).
 */
export function MediaPlaceholder({
  className,
  type = "image",
  label,
  ratio = "square",
  style,
  src,
  priority,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: MediaPlaceholderProps) {
  const Icon = type === "video" ? VideoIcon : ImageOff;

  if (src) {
    return (
      <div
        className={cn(ratioClass[ratio], "relative overflow-hidden rounded-lg bg-muted", className)}
        style={style}
      >
        <Image
          src={src}
          alt={label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {type === "video" && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="size-8 fill-white text-white" aria-hidden="true" />
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        ratioClass[ratio],
        "relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-secondary via-muted to-secondary",
        className
      )}
      style={style}
      role="img"
      aria-label={label ?? `${type} placeholder`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
        <Icon className="size-6 opacity-60" aria-hidden="true" />
        {label && <span className="text-xs opacity-60">{label}</span>}
      </div>
    </div>
  );
}
