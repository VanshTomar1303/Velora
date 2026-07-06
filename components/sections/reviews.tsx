"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/fade-in";
import { StarRating } from "@/components/common/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Review } from "@/types/review";
import { cn } from "@/lib/utils";

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass mx-3 w-80 shrink-0 rounded-2xl p-6">
      <StarRating rating={review.rating} />
      <p className="mt-4 text-sm text-foreground/90">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <Avatar>
          {review.avatar && <AvatarImage src={review.avatar} alt={review.name} />}
          <AvatarFallback className="bg-primary/15 text-primary">
            {review.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.country}</p>
        </div>
      </div>
    </div>
  );
}

export function Reviews({ items }: { items: Review[] }) {
  const t = useTranslations("reviews");
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">{t("heading")}</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-muted-foreground">{t("subheading")}</p>
        </FadeIn>
      </div>

      <div className="group relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className={cn(
            "flex w-max",
            !reduced && "animate-marquee group-hover:[animation-play-state:paused]"
          )}
        >
          {reduced
            ? items.map((review) => <ReviewCard key={review.id} review={review} />)
            : doubled.map((review, i) => <ReviewCard key={`${review.id}-${i}`} review={review} />)}
        </div>
      </div>
    </section>
  );
}
