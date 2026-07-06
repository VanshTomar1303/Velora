"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { MenuItem } from "@/types/menu";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export function MenuCard({ item }: { item: MenuItem }) {
  const t = useTranslations("menu");
  const { addItem } = useCart();
  const [favorite, setFavorite] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative">
        <Link href={`/menu/${item.id}`} aria-label={item.name} data-cursor-hover>
          <MediaPlaceholder ratio="landscape" src={item.image} label={item.name} className="rounded-none transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <button
          onClick={() => setFavorite((f) => !f)}
          aria-label="Toggle favorite"
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/70 backdrop-blur transition-colors hover:text-accent"
        >
          <Heart className={cn("size-4", favorite && "fill-accent text-accent")} aria-hidden="true" />
        </button>
        {item.popular && (
          <Badge className="absolute left-3 top-3" variant="secondary">
            {t("popular")}
          </Badge>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight">
            <Link href={`/menu/${item.id}`} className="transition-colors hover:text-primary" data-cursor-hover>
              {item.name}
            </Link>
          </h3>
          <span className="whitespace-nowrap font-semibold text-primary">{formatCurrency(item.price)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {item.calories} {t("calories")}
          </span>
          <Button size="sm" onClick={handleAdd} className="rounded-full" data-cursor-hover>
            {justAdded ? (
              <>
                <Check className="size-3.5" aria-hidden="true" /> {t("added")}
              </>
            ) : (
              <>
                <Plus className="size-3.5" aria-hidden="true" /> {t("addToCart")}
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
