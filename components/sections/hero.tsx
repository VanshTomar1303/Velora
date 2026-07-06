"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/animations/text-reveal";
import { FadeIn } from "@/components/animations/fade-in";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { HeroScene } from "@/components/three/hero-scene";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Hero() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (reduced) return;
    function handleMove(e: MouseEvent) {
      setGlow({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced]);

  return (
    <section className="relative flex h-screen min-h-[720px] w-full items-center justify-center overflow-hidden">
      <MediaPlaceholder
        type="image"
        ratio="square"
        src="/images/hero-interior.jpg"
        label="Velora dining room"
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full scale-105 rounded-none"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" aria-hidden="true" />

      <HeroScene />

      {!reduced && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-1 rounded-full bg-primary/50"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <FadeIn delay={0.1}>
          <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
        </FadeIn>

        <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
          <TextReveal text={t("heading")} as="span" />
        </h1>

        <FadeIn delay={0.5} className="mt-6 max-w-xl">
          <p className="text-base text-muted-foreground sm:text-lg">{t("subheading")}</p>
        </FadeIn>

        <FadeIn delay={0.7} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/reservations">{t("reserveTable")}</Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="/menu">{t("orderOnline")}</Link>
            </Button>
          </MagneticButton>
        </FadeIn>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t("scroll")}</span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
