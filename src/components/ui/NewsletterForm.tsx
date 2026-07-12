"use client";
import { useState } from "react";
import { Loader2, ArrowRight, Check } from "lucide-react";
import { submitForm, isValidEmail } from "@/lib/forms";
import { cn } from "@/lib/utils";

/**
 * Compact newsletter signup. Delivers to the same Web3Forms inbox with a
 * "Newsletter" subject so you can filter subscribers. Use `variant="footer"`
 * for the dark footer, or the default for light-on-dark cards.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    if (!isValidEmail(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setError("");
    const result = await submitForm(
      { email, list: "Newsletter" },
      {
        subject: "New newsletter subscriber — QuionAi",
        from_name: "QuionAi Newsletter",
        botcheck: String(data.get("botcheck") ?? ""),
      }
    );

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-[#00D4FF]", className)}>
        <Check size={16} /> You&apos;re in — watch your inbox for AI growth tips.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.7)] p-1.5 focus-within:border-[rgba(0,212,255,0.4)] transition-colors">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your work email"
          className="flex-1 bg-transparent text-white placeholder:text-[#475569] px-4 py-2 text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Subscribe to newsletter"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#00D4FF] text-[#050816] font-semibold px-4 py-2 text-sm hover:shadow-[0_0_24px_rgba(0,212,255,0.45)] active:scale-95 transition-all disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Subscribe</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </div>
      {status === "error" && error && <p className="mt-2 text-xs text-[#f87171] pl-4">{error}</p>}
    </form>
  );
}
