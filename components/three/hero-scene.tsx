"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const Scene = dynamic(() => import("./scene").then((mod) => mod.Scene), {
  ssr: false,
});

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const isSmallViewport = useMediaQuery("(max-width: 640px)");

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {!isSmallViewport && <Scene />}
    </div>
  );
}
