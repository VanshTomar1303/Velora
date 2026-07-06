"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Copy, Check, Tag } from "lucide-react";
import type { Offer } from "@/types/offer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function OfferCard({ offer }: { offer: Offer }) {
  const t = useTranslations("offers");
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      toast.success(t("copied", { code: offer.code }));
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(t("copyError"));
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/30 p-6">
        <Badge variant="secondary" className="gap-1">
          <Tag className="size-3" aria-hidden="true" /> {offer.tag}
        </Badge>
        <span className="font-display text-2xl text-primary">{offer.discount}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-display text-xl leading-tight">{offer.title}</h2>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{offer.description}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          {t("validUntil")}: {formatDate(offer.validUntil)}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <code className="flex-1 rounded-full border border-dashed border-primary/50 bg-primary/5 px-4 py-2 text-center text-sm font-medium tracking-wider text-primary">
            {offer.code}
          </code>
          <Button size="icon" variant="outline" className="rounded-full" onClick={copyCode} aria-label={t("copy")} data-cursor-hover>
            {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Offers({ offers }: { offers: Offer[] }) {
  const t = useTranslations("offers");

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display mt-4 text-4xl sm:text-5xl">{t("heading")}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground">{t("subheading")}</p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {offers.map((offer, i) => (
            <FadeIn key={offer.id} delay={(i % 2) * 0.08}>
              <OfferCard offer={offer} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
