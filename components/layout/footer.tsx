"use client";

import { useTranslations } from "next-intl";
import { Instagram, Facebook, Twitter, Music2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { newsletterSchema } from "@/lib/validations";
import { getSettingsSync } from "@/lib/api/settings";
import { z } from "zod";

const INSTAGRAM_PREVIEW = [
  "/images/lifestyle-1.jpg",
  "/images/lifestyle-2.jpg",
  "/images/lifestyle-3.jpg",
  "/images/lifestyle-4.jpg",
  "/images/event-1.jpg",
  "/images/event-2.jpg",
];

const LINK_COLUMNS = [
  {
    heading: "explore",
    links: [
      { href: "/menu", key: "menu" },
      { href: "/gallery", key: "gallery" },
      { href: "/blog", key: "blog" },
      { href: "/feedback", key: "testimonials" },
      { href: "/locations", key: "locations" },
    ],
  },
  {
    heading: "company",
    links: [
      { href: "/offers", key: "offers" },
      { href: "/referral", key: "referral" },
      { href: "/partners", key: "partners" },
      { href: "/about", key: "about" },
      { href: "/contact", key: "contact" },
    ],
  },
  {
    heading: "legal",
    links: [
      { href: "/privacy", key: "privacy" },
      { href: "/cookies", key: "cookies" },
      { href: "/terms", key: "terms" },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const settings = getSettingsSync();

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  function onSubmit() {
    toast.success(t("newsletterSuccess"));
    form.reset();
  }

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <span className="font-display text-2xl tracking-[0.15em]">VELORA</span>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{settings.description}</p>
            <div className="mt-6 flex items-center gap-3">
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
                  data-cursor-hover
                  className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="mt-6 grid max-w-xs grid-cols-3 gap-2">
              {INSTAGRAM_PREVIEW.map((src) => (
                <MediaPlaceholder key={src} ratio="square" src={src} className="rounded-md" />
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t(`columns.${column.heading}`)}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-primary">
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("newsletter")}</h3>
            <p className="mt-4 text-sm text-muted-foreground">{t("newsletterCopy")}</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
                aria-label={t("emailPlaceholder")}
                {...form.register("email")}
              />
              <Button type="submit">{t("subscribe")}</Button>
            </form>
            {form.formState.errors.email && (
              <p className="mt-2 text-xs text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {settings.brand}. {t("rights")}</p>
          <p>{settings.address}</p>
        </div>
      </div>
    </footer>
  );
}
