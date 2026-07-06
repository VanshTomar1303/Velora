"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play, X } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { Button } from "@/components/ui/button";
import { useLockBody } from "@/hooks/use-lock-body";

const CATEGORIES = ["all", "interior", "food", "coffee", "cocktails"] as const;

export function GalleryGrid({ items, limit }: { items: GalleryItem[]; limit?: number }) {
  const t = useTranslations("gallery");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    const result = category === "all" ? items : items.filter((item) => item.category === category);
    return limit ? result.slice(0, limit) : result;
  }, [items, category, limit]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
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

      <div className="mt-10 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {filtered.map((item, i) => (
          <motion.button
            key={item.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActive(item)}
            className="group relative block w-full overflow-hidden rounded-xl"
            data-cursor-hover
          >
            <MediaPlaceholder
              type={item.type}
              label={item.title}
              className="rounded-xl transition-transform duration-500 group-hover:scale-105"
              style={{ aspectRatio: `${item.width} / ${item.height}` }}
            />
            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <Play className="size-8 text-white" aria-hidden="true" />
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <GalleryModalContent item={active} onClose={() => setActive(null)} label={t("close")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryModalContent({ item, onClose, label }: { item: GalleryItem; onClose: () => void; label: string }) {
  useLockBody(true);

  return (
    <motion.div
      className="relative w-full max-w-3xl"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      <MediaPlaceholder type={item.type} label={item.title} className="w-full rounded-2xl" ratio="wide" />
      <Button
        variant="secondary"
        size="icon"
        aria-label={label}
        onClick={onClose}
        className="absolute -right-3 -top-3 rounded-full"
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
      <p className="mt-4 text-center text-sm text-white/80">{item.title}</p>
    </motion.div>
  );
}
