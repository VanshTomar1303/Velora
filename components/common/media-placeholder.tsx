import { ImageOff, Video as VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  className?: string;
  type?: "image" | "video";
  label?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
  style?: React.CSSProperties;
}

const ratioClass: Record<Required<MediaPlaceholderProps>["ratio"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-video",
};

/**
 * Stands in for real photography/video (none provided yet). Swap by
 * replacing the call site with next/image or a <video> element — the
 * surrounding layout classes are designed to carry over unchanged.
 */
export function MediaPlaceholder({ className, type = "image", label, ratio = "square", style }: MediaPlaceholderProps) {
  const Icon = type === "video" ? VideoIcon : ImageOff;

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
