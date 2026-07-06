"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({ value, suffix = "", prefix = "", className }: CounterProps) {
  const { ref, value: current } = useCountUp(value);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={cn(className)}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}
