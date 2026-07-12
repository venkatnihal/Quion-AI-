"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { CalendarDays, X, ExternalLink, ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BOOKING_URL,
  BOOKING_EMBEDDABLE,
  WHATSAPP_LINK_PREFILLED,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";

/* ─────────────────────────────────────────────────────────────
 * Microsoft Bookings integration (replaces Calendly).
 *
 * The booking link is configured ONCE in src/lib/constants.ts (BOOKING_URL)
 * or via NEXT_PUBLIC_BOOKING_URL.
 *
 *   • <BookingButton>  — a CTA that books a call
 *   • <BookingEmbed>   — the inline scheduler for /book & /contact
 *
 * Microsoft "Book with me" personal links block iframe embedding, so we
 * auto-detect (BOOKING_EMBEDDABLE): embeddable Bookings business pages open
 * inline in a modal / iframe; personal links open in a new tab reliably.
 * ───────────────────────────────────────────────────────────── */

const isConfigured = BOOKING_URL && !BOOKING_URL.includes("REPLACE_WITH");

function openBookingTab() {
  if (typeof window !== "undefined") {
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  }
}

/* ── Shared button styling (matches the site's brand system) ── */
type BookingVariant = "primary" | "secondary" | "ghost";
type BookingSize = "sm" | "md" | "lg";

const variantStyles: Record<BookingVariant, string> = {
  primary:
    "bg-[#00D4FF] text-[#050816] font-semibold hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-[0.97] focus-visible:ring-[#00D4FF]",
  secondary:
    "border border-[#6D5DFC] text-white bg-transparent hover:bg-[rgba(109,93,252,0.1)] hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] active:scale-[0.97] focus-visible:ring-[#6D5DFC]",
  ghost:
    "text-[#00D4FF] bg-transparent hover:bg-[rgba(0,212,255,0.05)] active:scale-[0.97] focus-visible:ring-[#00D4FF]",
};

const sizeStyles: Record<BookingSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[0.9375rem]",
  lg: "px-8 py-4 text-base",
};

interface BookingButtonProps {
  children: React.ReactNode;
  variant?: BookingVariant;
  size?: BookingSize;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function BookingButton({
  children,
  variant = "primary",
  size = "md",
  className,
  icon = <CalendarDays size={16} />,
  fullWidth,
}: BookingButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!isConfigured) {
      window.open(WHATSAPP_LINK_PREFILLED, "_blank", "noopener,noreferrer");
    } else if (BOOKING_EMBEDDABLE) {
      setOpen(true);
    } else {
      openBookingTab();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 rounded-full whitespace-nowrap",
          "transition-all duration-200 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
      {BOOKING_EMBEDDABLE && <BookingModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

/* ── Modal scheduler (only used for embeddable Bookings business pages) ── */
function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a free consultation"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label="Close booking dialog"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(2,4,12,0.8)] backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      />
      <div className="relative w-full max-w-3xl h-[85vh] max-h-[760px] rounded-2xl overflow-hidden border border-[rgba(0,212,255,0.2)] bg-[#0F172A] shadow-[0_30px_120px_rgba(0,0,0,0.6)] animate-[scaleIn_0.24s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
          <span className="text-sm font-medium text-white flex items-center gap-2">
            <CalendarDays size={16} className="text-[#00D4FF]" />
            Book Your Free Consultation
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 grid place-items-center rounded-full text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
          >
            <X size={18} />
          </button>
        </div>
        <BookingIframe title="Microsoft Bookings scheduler" className="h-[calc(100%-53px)]" />
      </div>
    </div>
  );
}

/* ── Inline embed: iframe when embeddable, otherwise a premium CTA card ── */
interface BookingEmbedProps {
  className?: string;
  minHeight?: number;
}

export function BookingEmbed({ className, minHeight = 680 }: BookingEmbedProps) {
  const [inView, setInView] = useState(false);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
  }, []);

  // Not configured yet → CTA card with WhatsApp.
  if (!isConfigured) {
    return <BookingCard className={className} minHeight={minHeight} />;
  }

  // Attempt to render the live calendar. Personal "Book with me" links may
  // refuse to frame in some browsers, so a persistent fallback bar sits below.
  return (
    <div className={className}>
      <div
        ref={setRef}
        className="relative rounded-2xl overflow-hidden border border-[rgba(0,212,255,0.15)] bg-[rgba(15,23,42,0.6)]"
        style={{ minHeight }}
      >
        {inView ? (
          <BookingIframe title="Booking calendar" style={{ minHeight }} className="w-full" />
        ) : (
          <div className="grid place-items-center text-sm text-[#64748B]" style={{ minHeight }} aria-hidden="true">
            Loading calendar…
          </div>
        )}
      </div>

      {/* Always-visible fallback so booking never dead-ends if the frame is blocked */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm">
        <span className="text-[#64748B]">Calendar not showing?</span>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-[#00D4FF] hover:underline"
        >
          Open the booking calendar <ArrowUpRight size={14} />
        </a>
        <span className="text-[#334155]" aria-hidden>·</span>
        <a
          href={WHATSAPP_LINK_PREFILLED}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#25D366] hover:underline"
        >
          WhatsApp {WHATSAPP_DISPLAY}
        </a>
      </div>
    </div>
  );
}

/* Premium inline card used when the scheduler can't be embedded. Opens the
 * real Microsoft Bookings page in a new tab. */
function BookingCard({ className, minHeight = 680 }: BookingEmbedProps) {
  const benefits = [
    "Pick any open slot on our live calendar",
    "Instant confirmation + calendar invite",
    "30 minutes, free, no obligation",
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-[rgba(0,212,255,0.15)] bg-[rgba(15,23,42,0.6)] grid place-items-center p-8 text-center",
        className
      )}
      style={{ minHeight: Math.min(minHeight, 460) }}
    >
      <div className="max-w-md">
        <div className="w-14 h-14 rounded-2xl grid place-items-center mx-auto mb-5 bg-[linear-gradient(135deg,rgba(0,212,255,0.15),rgba(109,93,252,0.12))] border border-[rgba(0,212,255,0.25)]">
          <CalendarDays size={26} className="text-[#00D4FF]" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Choose a time that works for you
        </h3>
        <p className="text-sm text-[#94A3B8] mb-6">
          Our live scheduling calendar opens in a new tab — pick a slot and you&apos;re booked in seconds.
        </p>

        <ul className="text-left space-y-2.5 mb-7 inline-block">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-sm text-[#AEBACD]">
              <Check size={15} className="text-[#00D4FF] shrink-0" /> {b}
            </li>
          ))}
        </ul>

        {isConfigured ? (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#00D4FF] text-[#050816] font-semibold px-8 py-4 text-base hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-95 transition-all"
          >
            Open the Booking Calendar
            <ArrowUpRight size={18} />
          </a>
        ) : (
          <a
            href={WHATSAPP_LINK_PREFILLED}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-[#052e16] font-semibold px-6 py-3 text-sm"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        )}

        <p className="text-xs text-[#475569] mt-5">
          Prefer to talk first? WhatsApp us at{" "}
          <a href={WHATSAPP_LINK_PREFILLED} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
            {WHATSAPP_DISPLAY}
          </a>
        </p>
      </div>
    </div>
  );
}

/* ── The Microsoft Bookings iframe (embeddable business pages only) ── */
function BookingIframe({
  title,
  className,
  style,
}: {
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("relative w-full h-full", className)} style={style}>
      <iframe
        src={BOOKING_URL}
        title={title}
        className="w-full h-full border-0"
        style={{ minHeight: style?.minHeight }}
        loading="lazy"
        allow="fullscreen"
      />
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[rgba(2,4,12,0.7)] backdrop-blur px-3 py-1.5 text-xs text-[#94A3B8] hover:text-white border border-[rgba(255,255,255,0.08)] transition-colors"
      >
        <ExternalLink size={12} /> Open in new tab
      </a>
    </div>
  );
}
