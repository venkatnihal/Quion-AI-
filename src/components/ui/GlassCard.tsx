"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hoverable?: boolean;
  elevated?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, hoverable, elevated, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border transition-all duration-300",
          elevated
            ? "bg-[rgba(15,23,42,0.8)] backdrop-blur-[40px] border-[rgba(0,212,255,0.15)]"
            : "bg-[rgba(15,23,42,0.6)] backdrop-blur-[20px] border-[rgba(255,255,255,0.08)]",
          hoverable && [
            "cursor-pointer",
            "hover:-translate-y-1.5 hover:border-[rgba(0,212,255,0.3)]",
            "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
          ],
          glow && "animate-border-glow",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
