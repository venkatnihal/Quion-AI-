"use client";
import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  start?: boolean;
}

export function useCountUp({
  from = 0,
  to,
  duration = 2000,
  decimals = 0,
  start = true,
}: UseCountUpOptions): string {
  const [value, setValue] = useState(from);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [from, to, duration, start]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}
