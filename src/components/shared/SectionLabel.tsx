import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[#00D4FF]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" aria-hidden />
      {children}
    </p>
  );
}
