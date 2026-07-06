"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/fade-in";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { GalleryItem } from "@/types/gallery";

export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
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

        <div className="mt-16">
          <GalleryGrid items={items} limit={9} />
        </div>

        <FadeIn delay={0.2} className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link href="/gallery">{t("heading")}</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
