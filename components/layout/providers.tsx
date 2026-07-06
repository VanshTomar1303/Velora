"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { useLenis } from "@/hooks/use-lenis";
import { Cursor } from "@/components/layout/cursor";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { useCartStore } from "@/store/cart-store";

function LenisSetup() {
  useLenis();
  return null;
}

function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LenisSetup />
      <CartHydration />
      <LoadingScreen />
      <Cursor />
      {children}
      <CookieBanner />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
