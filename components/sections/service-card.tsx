"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/types/service";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ServiceCardProps {
  service: Service;
  Icon?: LucideIcon;
  variants?: Variants;
}

export function ServiceCard({ service, Icon, variants }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="group glass relative overflow-hidden rounded-2xl p-6 transition-transform duration-200 [transform-style:preserve-3d]"
      data-cursor-hover
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-primary/20 group-hover:via-transparent group-hover:to-accent/20" />
      <motion.div
        className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
        whileHover={reduced ? undefined : { rotate: 8, scale: 1.1 }}
      >
        {Icon && <Icon className="size-6" aria-hidden="true" />}
      </motion.div>
      <h3 className="font-display mt-5 text-lg">{service.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
    </motion.div>
  );
}
