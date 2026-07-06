"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Check, Leaf, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { MenuItem } from "@/types/menu";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { MenuCard } from "@/components/sections/menu-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export function ProductDetail({ item, related }: { item: MenuItem; related: MenuItem[] }) {
  const t = useTranslations("menu");
  const tp = useTranslations("product");
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          data-cursor-hover
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> {tp("backToMenu")}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <MediaPlaceholder ratio="landscape" src={item.image} label={item.name} className="w-full rounded-2xl" priority />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">{t(`categories.${item.category}`)}</span>
              <h1 className="font-display mt-3 text-4xl sm:text-5xl">{item.name}</h1>
              <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {item.popular && <Badge variant="secondary">{t("popular")}</Badge>}
                {item.vegetarian && (
                  <Badge variant="outline" className="gap-1">
                    <Leaf className="size-3" aria-hidden="true" /> {tp("vegetarian")}
                  </Badge>
                )}
                {item.spicy && (
                  <Badge variant="outline" className="gap-1">
                    <Flame className="size-3" aria-hidden="true" /> {tp("spicy")}
                  </Badge>
                )}
                {item.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-6">
                <span className="font-display text-3xl text-primary">{formatCurrency(item.price)}</span>
                <span className="text-sm text-muted-foreground">
                  {item.calories} {t("calories")}
                </span>
              </div>

              <Button size="lg" onClick={handleAdd} className="mt-8 w-full rounded-full sm:w-auto" data-cursor-hover>
                {justAdded ? (
                  <>
                    <Check className="size-4" aria-hidden="true" /> {t("added")}
                  </>
                ) : (
                  <>
                    <Plus className="size-4" aria-hidden="true" /> {t("addToCart")}
                  </>
                )}
              </Button>
            </div>
          </FadeIn>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl sm:text-3xl">{tp("related")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <MenuCard key={r.id} item={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
