"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { useLockBody } from "@/hooks/use-lock-body";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: readonly { href: string; key: string }[];
}

export function MobileMenu({ open, onOpenChange, links }: MobileMenuProps) {
  const t = useTranslations("nav");
  useLockBody(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-background lg:hidden"
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-display text-xl tracking-[0.15em]">VELORA</span>
            <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => onOpenChange(false)}>
              <X className="size-5" aria-hidden="true" />
            </Button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
            {links.map((link, i) => (
              <motion.li
                key={link.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={() => onOpenChange(false)}
                  className="font-display block py-3 text-4xl tracking-wide"
                >
                  {t(link.key)}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-6">
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Button asChild className="rounded-full">
              <Link href="/reservations" onClick={() => onOpenChange(false)}>
                {t("bookNow")}
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
