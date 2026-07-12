"use client";
import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPos?: "left" | "right";
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#00D4FF] text-[#050816] font-semibold",
    "hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]",
    "active:scale-[0.97]",
    "focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
  ].join(" "),
  secondary: [
    "border border-[#6D5DFC] text-white bg-transparent",
    "hover:bg-[rgba(109,93,252,0.1)] hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]",
    "active:scale-[0.97]",
    "focus-visible:ring-2 focus-visible:ring-[#6D5DFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
  ].join(" "),
  ghost: [
    "text-[#00D4FF] bg-transparent",
    "hover:bg-[rgba(0,212,255,0.05)]",
    "active:scale-[0.97]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-[0.9375rem]",
  lg: "px-10 py-5 text-base",
};

const ButtonInner = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      loading,
      icon,
      iconPos = "right",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 rounded-full",
          "transition-all duration-200 select-none whitespace-nowrap",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {icon && iconPos === "left" && <span className="shrink-0">{icon}</span>}
            {children}
            {icon && iconPos === "right" && <span className="shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);
ButtonInner.displayName = "Button";

export function Button({ href, external, ...props }: ButtonProps) {
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <ButtonInner {...props} />
        </a>
      );
    }
    return (
      <Link href={href}>
        <ButtonInner {...props} />
      </Link>
    );
  }
  return <ButtonInner {...props} />;
}
