"use client";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface CountUpProps {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals = 0,
  className,
}: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.3, once: true });
  const value = useCountUp({ from, to, duration, decimals, start: inView });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}{value}{suffix}
    </span>
  );
}
