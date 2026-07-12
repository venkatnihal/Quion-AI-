import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  size?: string;
  color1?: string;
  color2?: string;
}

export function GlowOrb({
  className,
  size = "600px",
  color1 = "#00D4FF",
  color2 = "#6D5DFC",
}: GlowOrbProps) {
  return (
    <div
      className={cn("rounded-full animate-orb pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(ellipse at center, ${color1}22 0%, ${color2}15 40%, transparent 70%)`,
        filter: "blur(60px)",
      }}
      aria-hidden
    />
  );
}
