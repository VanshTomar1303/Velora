"use client";

import { useTranslations } from "next-intl";
import { SlideUp } from "@/components/animations/slide-up";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, staggerItem } from "@/components/animations/stagger-container";
import { ParallaxImage } from "@/components/animations/parallax-image";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { Counter } from "@/components/common/counter";
import { getSettingsSync } from "@/lib/api/settings";
import { motion } from "framer-motion";

export function About() {
  const t = useTranslations("about");
  const settings = getSettingsSync();
  const values = t.raw("values") as { title: string; description: string }[];
  const timeline = t.raw("timeline") as { year: string; title: string; description: string }[];

  const stats = [
    { value: settings.stats.years, suffix: "+", label: t("statsYears") },
    { value: settings.stats.customers, suffix: "+", label: t("statsCustomers") },
    { value: settings.stats.awards, suffix: "", label: t("statsAwards") },
    { value: settings.stats.employees, suffix: "+", label: t("statsEmployees") },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <ParallaxImage className="rounded-2xl">
            <MediaPlaceholder ratio="portrait" label="Founders in the original cafe" className="h-full rounded-2xl" />
          </ParallaxImage>

          <div>
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
            </FadeIn>
            <SlideUp delay={0.1}>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">{t("heading")}</h2>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="mt-6 text-muted-foreground">{t("story")}</p>
            </SlideUp>

            <SlideUp delay={0.3} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-display text-lg">{t("missionTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("mission")}</p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-display text-lg">{t("valuesTitle")}</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {values.map((v) => (
                    <li key={v.title}>
                      <span className="font-medium text-foreground">{v.title}.</span> {v.description}
                    </li>
                  ))}
                </ul>
              </div>
            </SlideUp>
          </div>
        </div>

        <StaggerContainer className="mt-24 grid grid-cols-2 gap-8 border-y border-border py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} className="font-display text-3xl text-primary sm:text-4xl" />
              <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        <div className="mt-24">
          <FadeIn>
            <h3 className="font-display text-center text-2xl sm:text-3xl">{t("timelineTitle")}</h3>
          </FadeIn>
          <div className="relative mt-12 space-y-10 border-l border-border pl-8 sm:pl-10">
            {timeline.map((item, i) => (
              <SlideUp key={item.year} delay={i * 0.05} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-primary sm:-left-[calc(2.5rem+5px)]" />
                <span className="text-xs uppercase tracking-widest text-primary">{item.year}</span>
                <h4 className="font-display mt-1 text-lg">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </SlideUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
