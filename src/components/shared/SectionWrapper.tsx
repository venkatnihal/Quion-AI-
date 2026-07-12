import { cn } from "@/lib/utils";

type BgVariant = "canvas" | "surface" | "elevated" | "gradient";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bg?: BgVariant;
  id?: string;
}

const bgStyles: Record<BgVariant, string> = {
  canvas: "bg-[#050816]",
  surface: "bg-[#0F172A]",
  elevated: "bg-[#111827]",
  gradient: "bg-gradient-to-b from-[#050816] via-[#0F172A] to-[#111827]",
};

export function SectionWrapper({ children, className, bg = "canvas", id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("section", bgStyles[bg], className)}
    >
      {children}
    </section>
  );
}
