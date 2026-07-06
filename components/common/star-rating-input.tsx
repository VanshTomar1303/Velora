"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRatingInput({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className={cn("flex items-center gap-1", className)} role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const rating = i + 1;
        return (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={value === rating}
            aria-label={`${rating} star${rating > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(rating)}
            onMouseLeave={() => setHover(0)}
            onFocus={() => setHover(rating)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(rating)}
            className="rounded-full p-0.5 transition-transform hover:scale-110"
            data-cursor-hover
          >
            <Star
              className={cn(
                "size-7 transition-colors",
                rating <= active ? "fill-primary text-primary" : "fill-transparent text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
