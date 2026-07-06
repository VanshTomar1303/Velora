"use client";

import { useTranslations } from "next-intl";
import * as LucideIcons from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, staggerItem } from "@/components/animations/stagger-container";
import { ServiceCard } from "@/components/sections/service-card";
import servicesData from "@/data/services.json";
import type { Service } from "@/types/service";

const services = servicesData as Service[];

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative py-24 sm:py-32">
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

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[service.icon];
            return (
              <ServiceCard key={service.id} service={service} Icon={Icon} variants={staggerItem} />
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
