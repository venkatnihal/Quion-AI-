"use client";
import { useState } from "react";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { submitForm, isValidEmail } from "@/lib/forms";
import { WHATSAPP_LINK_PREFILLED, WHATSAPP_DISPLAY } from "@/lib/constants";

const inputClass =
  "w-full rounded-xl bg-[rgba(15,23,42,0.8)] border text-white placeholder:text-[#334155] px-5 py-4 text-sm focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] transition-all";
const okBorder = "border-[rgba(255,255,255,0.06)] focus:border-[rgba(0,212,255,0.4)]";
const errBorder = "border-[rgba(248,113,113,0.5)] focus:border-[rgba(248,113,113,0.7)]";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // ── Validation ──
    const next: FieldErrors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email address.";
    if (!message) next.message = "Tell us a little about your business.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    setFormError("");

    const result = await submitForm(
      {
        name,
        email,
        company: String(data.get("company") ?? ""),
        service: String(data.get("service") ?? ""),
        budget: String(data.get("budget") ?? ""),
        message,
      },
      {
        subject: `New enquiry from ${name} — QuionAi`,
        from_name: "QuionAi Contact Form",
        botcheck: String(data.get("botcheck") ?? ""),
      }
    );

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setFormError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <GlassCard elevated className="p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">✓</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Message Sent!
        </h2>
        <p className="text-[#64748B] text-sm">
          Thanks — we&apos;ll get back to you within 4 hours. Check your inbox for our reply.
        </p>
        <a
          href={WHATSAPP_LINK_PREFILLED}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 rounded-full bg-[#25D366] text-[#052e16] font-semibold px-6 py-3 text-sm hover:brightness-110 active:scale-95 transition-all"
        >
          Message us on WhatsApp for an instant reply
        </a>
      </GlassCard>
    );
  }

  return (
    <GlassCard elevated className="p-8">
      <h2 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Send Us a Message
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from users, catches bots */}
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#94A3B8] mb-2">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="James Smith"
              aria-invalid={!!errors.name}
              className={`${inputClass} ${errors.name ? errBorder : okBorder}`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-[#f87171]">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-2">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="james@company.com"
              aria-invalid={!!errors.email}
              className={`${inputClass} ${errors.email ? errBorder : okBorder}`}
            />
            {errors.email && <p className="mt-1.5 text-xs text-[#f87171]">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[#94A3B8] mb-2">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Inc."
              className={`${inputClass} ${okBorder}`}
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-[#94A3B8] mb-2">
              Monthly Budget
            </label>
            <select
              id="budget"
              name="budget"
              defaultValue=""
              className={`${inputClass} ${okBorder} text-[#94A3B8] appearance-none`}
            >
              <option value="">Select a range…</option>
              <option>Under $1,000</option>
              <option>$1,000 – $3,000</option>
              <option>$3,000 – $10,000</option>
              <option>$10,000+</option>
              <option>Not sure yet</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-[#94A3B8] mb-2">
            I&apos;m interested in
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className={`${inputClass} ${okBorder} text-[#94A3B8] appearance-none`}
          >
            <option value="">Select a service…</option>
            <option>AI Automation</option>
            <option>AI Agents</option>
            <option>AI Chatbots</option>
            <option>AI Calling Assistants</option>
            <option>Website Development</option>
            <option>SEO Optimisation</option>
            <option>Social Media Marketing</option>
            <option>Copywriting</option>
            <option>Multiple Services</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#94A3B8] mb-2">
            Tell us about your business *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Briefly describe your business and what you're looking to achieve with AI…"
            aria-invalid={!!errors.message}
            className={`${inputClass} ${errors.message ? errBorder : okBorder} resize-none`}
          />
          {errors.message && <p className="mt-1.5 text-xs text-[#f87171]">{errors.message}</p>}
        </div>

        {status === "error" && formError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.08)] px-4 py-3">
            <AlertCircle size={16} className="text-[#f87171] shrink-0 mt-0.5" />
            <div className="text-sm text-[#fca5a5]">
              {formError}{" "}
              <a
                href={WHATSAPP_LINK_PREFILLED}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#25D366] hover:underline whitespace-nowrap"
              >
                Message us on WhatsApp ({WHATSAPP_DISPLAY}) →
              </a>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Sending…
            </span>
          ) : (
            "Send Message"
          )}
        </Button>

        <p className="text-xs text-center text-[#334155]">
          Or{" "}
          <Link href="/book" className="text-[#00D4FF] hover:underline">
            book a call directly
          </Link>{" "}
          — we respond within 4 hours.
        </p>
      </form>
    </GlassCard>
  );
}
