import { cn } from "@/lib/utils";

type BadgeVariant = "brand" | "neutral" | "outline" | "success" | "error";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.25)] text-[#00D4FF]",
  neutral: "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[#94A3B8]",
  outline: "bg-transparent border border-[rgba(255,255,255,0.15)] text-white",
  success: "bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-[#10B981]",
  error: "bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[#EF4444]",
};

export function Badge({ variant = "brand", dot, className, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-1",
        "text-xs font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {children}
    </div>
  );
}
