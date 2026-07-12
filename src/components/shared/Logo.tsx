"use client";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * QuionAi brand mark — octagonal "Q" built from circuit traces,
 * a central brain-chip, and a breakout arrow tail. Brand blue→purple gradient.
 * Based on the approved Gemini reference logo.
 */
export function LogoMark({ size = 34, className }: LogoMarkProps) {
  // SSR-deterministic unique gradient id (React useId) so multiple instances
  // never collide AND the server/client markup always matches — no hydration error.
  const gid = `quion-logo-${useId()}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#6D5DFC" />
        </linearGradient>
      </defs>

      {/* Outer octagon ring (circuit trace) */}
      <path
        d="M15.3 3 H32.7 L45 15.3 V32.7 L32.7 45 H15.3 L3 32.7 V15.3 Z"
        stroke={`url(#${gid})`}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Inner octagon ring */}
      <path
        d="M17.6 8 H30.4 L40 17.6 V30.4 L30.4 40 H17.6 L8 30.4 V17.6 Z"
        stroke={`url(#${gid})`}
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.75"
      />

      {/* Trace nodes on the four diagonal corners */}
      <circle cx="24" cy="3" r="1.5" fill={`url(#${gid})`} />
      <circle cx="9.6" cy="9.6" r="1.5" fill={`url(#${gid})`} />
      <circle cx="38.4" cy="9.6" r="1.5" fill={`url(#${gid})`} />
      <circle cx="9.6" cy="38.4" r="1.5" fill={`url(#${gid})`} />

      {/* Center brain-chip */}
      <rect
        x="18.5"
        y="18.5"
        width="11"
        height="11"
        rx="2.2"
        stroke={`url(#${gid})`}
        strokeWidth="1.6"
      />
      {/* Chip pins */}
      <g stroke={`url(#${gid})`} strokeWidth="1.3" strokeLinecap="round">
        <line x1="21" y1="18.5" x2="21" y2="16" />
        <line x1="24" y1="18.5" x2="24" y2="16" />
        <line x1="27" y1="18.5" x2="27" y2="16" />
        <line x1="21" y1="29.5" x2="21" y2="32" />
        <line x1="24" y1="29.5" x2="24" y2="32" />
        <line x1="27" y1="29.5" x2="27" y2="32" />
        <line x1="18.5" y1="21" x2="16" y2="21" />
        <line x1="18.5" y1="24" x2="16" y2="24" />
        <line x1="18.5" y1="27" x2="16" y2="27" />
        <line x1="29.5" y1="21" x2="32" y2="21" />
        <line x1="29.5" y1="24" x2="32" y2="24" />
        <line x1="29.5" y1="27" x2="32" y2="27" />
      </g>
      {/* Brain hint inside chip */}
      <line x1="24" y1="20.5" x2="24" y2="27.5" stroke={`url(#${gid})`} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M24 22 C21.8 22 21.8 25 24 25" stroke={`url(#${gid})`} strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M24 22 C26.2 22 26.2 25 24 25" stroke={`url(#${gid})`} strokeWidth="1.1" strokeLinecap="round" fill="none" />

      {/* Arrow tail breaking out of the Q (bottom-right) */}
      <line x1="30" y1="30" x2="43" y2="43" stroke={`url(#${gid})`} strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M37 43 H43 V37"
        stroke={`url(#${gid})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  className?: string;
  textClassName?: string;
}

/** Full lockup: mark + "QuionAi" wordmark (Quion white, Ai brand blue). */
export function Logo({ size = 34, className, textClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      <span
        className={cn("font-bold tracking-[-0.03em] text-white", textClassName)}
        style={{ fontFamily: "var(--font-display)" }}
      >
        Quion<span style={{ color: "#00D4FF" }}>Ai</span>
      </span>
    </span>
  );
}
