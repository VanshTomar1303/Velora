"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ClipboardList, CalendarCheck, Sparkles, MessageSquareHeart } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, staggerItem } from "@/components/animations/stagger-container";

const ICONS = [ClipboardList, CalendarCheck, Sparkles, MessageSquareHeart];

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">{t("heading")}</h2>
          </FadeIn>
        </div>

        <StaggerContainer className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border sm:block" aria-hidden="true" />
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={step.title} variants={staggerItem} className="relative text-center">
                <div className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border border-primary bg-background text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="font-display mt-4 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
