"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import type { MenuItem, MenuCategory } from "@/types/menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuCard } from "@/components/sections/menu-card";
import { cn } from "@/lib/utils";

const CATEGORIES: (MenuCategory | "all")[] = [
  "all",
  "coffee",
  "tea",
  "desserts",
  "breakfast",
  "lunch",
  "dinner",
  "drinks",
  "cocktails",
];

export function MenuExplorer({ items, limit }: { items: MenuItem[]; limit?: number }) {
  const t = useTranslations("menu");
  const [category, setCategory] = useState<MenuCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = items;
    if (category !== "all") result = result.filter((item) => item.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }
    return limit ? result.slice(0, limit) : result;
  }, [items, category, query, limit]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
              className="rounded-full"
              data-cursor-hover
            >
              {t(`categories.${c}`)}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-9"
            aria-label={t("searchPlaceholder")}
          />
        </div>
      </div>

      <motion.div
        layout
        className={cn("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3")}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">{t("noResults")}</p>
      )}
    </div>
  );
}
