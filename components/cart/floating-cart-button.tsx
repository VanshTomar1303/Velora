"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";

export function FloatingCartButton() {
  const t = useTranslations("cart");
  const { itemCount, summary, open } = useCart();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={open}
          data-cursor-hover
          className="glass fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full px-6 py-3 shadow-xl shadow-black/20"
        >
          <ShoppingBag className="size-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium">
            {itemCount} {t("items")}
          </span>
          <span className="text-sm font-semibold text-primary">{formatCurrency(summary.total)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
