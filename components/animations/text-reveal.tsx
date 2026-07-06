"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "word" | "letter";
}

export function TextReveal({ text, className, delay = 0, as = "span", splitBy = "word" }: TextRevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "span"];
  const pieces = splitBy === "letter" ? text.split("") : text.split(" ");

  if (reduced) {
    const StaticTag = as;
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  return (
    <MotionTag className={cn("inline-block overflow-hidden", className)} aria-label={text}>
      {pieces.map((piece, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * (splitBy === "letter" ? 0.02 : 0.06),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {piece}
            {splitBy === "word" ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
