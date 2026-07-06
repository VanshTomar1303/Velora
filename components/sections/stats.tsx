"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Counter } from "@/components/common/counter";
import { StaggerContainer, staggerItem } from "@/components/animations/stagger-container";
import { getSettingsSync } from "@/lib/api/settings";

export function Stats() {
  const t = useTranslations("stats");
  const settings = getSettingsSync();

  const stats = [
    { value: settings.stats.years, suffix: "+", label: t("years") },
    { value: settings.stats.customers, suffix: "+", label: t("customers") },
    { value: settings.stats.orders, suffix: "+", label: t("orders") },
    { value: settings.stats.awards, suffix: "", label: t("awards") },
    { value: settings.stats.branches, suffix: "", label: t("branches") },
  ];

  return (
    <section className="relative border-y border-border bg-secondary/30 py-16">
      <StaggerContainer className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:grid-cols-5 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={staggerItem} className="text-center">
            <Counter value={stat.value} suffix={stat.suffix} className="font-display block text-3xl text-primary sm:text-4xl" />
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  );
}
