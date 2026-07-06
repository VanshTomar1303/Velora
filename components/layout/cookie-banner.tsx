"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "velora-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // storage unavailable — stay hidden
    }
  }, []);

  function decide(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-2xl"
          role="dialog"
          aria-label={t("title")}
        >
          <div className="glass flex flex-col gap-4 rounded-2xl border border-border p-5 shadow-lg shadow-black/10 sm:flex-row sm:items-center">
            <Cookie className="size-6 shrink-0 text-primary" aria-hidden="true" />
            <p className="flex-1 text-sm text-foreground/90">
              {t("message")}{" "}
              <Link href="/cookies" className="underline transition-colors hover:text-primary">
                {t("learnMore")}
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" className="rounded-full" onClick={() => decide("declined")}>
                {t("decline")}
              </Button>
              <Button size="sm" className="rounded-full" onClick={() => decide("accepted")}>
                {t("accept")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
