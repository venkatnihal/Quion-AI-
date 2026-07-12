"use client";
import { useEffect, useState, useRef } from "react";
import { X, Sparkles, Check } from "lucide-react";
import { BookingButton } from "@/components/shared/Booking";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

/**
 * Exit-intent lead capture. Fires at most ONCE per browser session
 * (sessionStorage), only after the visitor has been on the page a few
 * seconds, and only on desktop-style exit intent (cursor leaving the
 * top of the viewport). Respects prefers-reduced-motion and is fully
 * keyboard-dismissible. Deliberately not shown on the /book page.
 */
const SESSION_KEY = "quion_exit_shown";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const armed = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    // Don't interrupt someone already on the booking page.
    if (window.location.pathname.startsWith("/book")) return;

    // Arm only after 6s so we don't ambush immediate bouncers.
    const armTimer = window.setTimeout(() => {
      armed.current = true;
    }, 6000);

    const trigger = () => {
      if (!armed.current || sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      // Cursor left through the top edge → likely heading for the tab bar / back.
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Special offer before you go"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-[rgba(2,4,12,0.8)] backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-[rgba(0,212,255,0.2)] bg-[#0F172A] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.6)] animate-[scaleIn_0.24s_cubic-bezier(0.16,1,0.3,1)]">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-[linear-gradient(135deg,rgba(0,212,255,0.15),rgba(109,93,252,0.12))] border border-[rgba(0,212,255,0.25)]">
          <Sparkles size={22} className="text-[#00D4FF]" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Before you go —
        </h2>
        <p className="text-[#94A3B8] text-sm mb-5 leading-relaxed">
          Book a <span className="text-white font-medium">free 30-minute AI strategy call</span> and
          we&apos;ll map your three highest-ROI automation opportunities. No pitch, no obligation.
        </p>

        <ul className="space-y-2 mb-6">
          {["A clear automation roadmap", "Realistic ROI & timelines", "Same-day availability"].map((t) => (
            <li key={t} className="flex items-center gap-2.5 text-sm text-[#AEBACD]">
              <Check size={15} className="text-[#00D4FF] shrink-0" /> {t}
            </li>
          ))}
        </ul>

        <BookingButton variant="primary" size="md" fullWidth>
          Claim My Free Consultation
        </BookingButton>

        <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-xs text-[#64748B] mb-2.5">Not ready? Get our AI growth tips instead:</p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
