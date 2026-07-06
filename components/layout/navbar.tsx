"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { CartButton } from "@/components/cart/cart-button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/menu", key: "menu" },
  { href: "/gallery", key: "gallery" },
  { href: "/about", key: "about" },
  { href: "/#reviews", key: "reviews" },
  { href: "/reservations", key: "reservations" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass py-3 shadow-lg shadow-black/5" : "bg-transparent py-6"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <Link href="/" className="font-display text-xl tracking-[0.15em]" data-cursor-hover>
            VELORA
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                  data-cursor-hover
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <CartButton />
            <Button asChild size="sm" className="ml-2 rounded-full">
              <Link href="/reservations">{t("bookNow")}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <CartButton />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-full"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} links={NAV_LINKS} />
    </>
  );
}
