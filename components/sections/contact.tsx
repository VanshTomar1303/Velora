"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Music2 } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { ContactForm } from "@/components/sections/contact-form";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { getSettingsSync } from "@/lib/api/settings";

export function Contact() {
  const t = useTranslations("contact");
  const settings = getSettingsSync();

  return (
    <section id="contact" className="relative py-24 sm:py-32">
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

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <SlideUp>
            <ContactForm />
          </SlideUp>

          <SlideUp delay={0.1} className="space-y-6">
            <MediaPlaceholder label={t("mapPlaceholder")} ratio="landscape" className="w-full rounded-2xl" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="size-4 text-primary" aria-hidden="true" /> {t("addressTitle")}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{settings.address}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="size-4 text-primary" aria-hidden="true" /> {t("phoneTitle")}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{settings.phone}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="size-4 text-primary" aria-hidden="true" /> {t("emailTitle")}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{settings.email}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <div className="text-sm font-medium">{t("hoursTitle")}</div>
                <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {settings.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-2">
                      <span>{h.day}</span>
                      <span>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: settings.social.instagram, label: "Instagram" },
                { Icon: Facebook, href: settings.social.facebook, label: "Facebook" },
                { Icon: Twitter, href: settings.social.twitter, label: "Twitter" },
                { Icon: Music2, href: settings.social.tiktok, label: "TikTok" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
