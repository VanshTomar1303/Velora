"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { useLenis } from "@/hooks/use-lenis";
import { Cursor } from "@/components/layout/cursor";
import { LoadingScreen } from "@/components/layout/loading-screen";

function LenisSetup() {
  useLenis();
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LenisSetup />
      <LoadingScreen />
      <Cursor />
      {children}
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
