"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/fade-in";
import type { LegalDocument } from "@/types/legal";

export function LegalPage({ title, doc }: { title: string; doc: LegalDocument }) {
  const t = useTranslations("legal");
  const updated = new Date(doc.updated).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl">{title}</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("lastUpdated")}: {updated}
          </p>
        </FadeIn>

        <div className="mt-14 space-y-10">
          {doc.sections.map((section, i) => (
            <FadeIn key={section.heading} delay={0.05 * i}>
              <section>
                <h2 className="font-display text-xl sm:text-2xl">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
              </section>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
