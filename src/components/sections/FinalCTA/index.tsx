"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { BookingButton } from "@/components/shared/Booking";

export function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "var(--section-py) 0",
        background: "linear-gradient(180deg, #050816 0%, #08102A 50%, #050816 100%)",
      }}
      aria-label="Book a free strategy call"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <GlowOrb size="800px" color1="#00D4FF" color2="#6D5DFC" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="container relative z-10 text-center">
        <ScrollReveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00D4FF] mb-5">
            ✦ Free Consultation — No Commitment
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-bold text-white max-w-2xl mx-auto"
            style={{
              fontSize: "var(--type-h1)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
              lineHeight: "1.08",
            }}
          >
            Ready to Automate Your{" "}
            <GradientText>Business?</GradientText>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="mt-5 max-w-lg mx-auto text-[#64748B] leading-relaxed"
            style={{ fontSize: "var(--type-body-xl)" }}
          >
            Book a free 30-minute call with our team. We&apos;ll look at your business, identify the
            highest-impact opportunities, and give you a practical roadmap — no sales pitch.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <BookingButton variant="primary" size="lg">
              Book a Free Consultation
            </BookingButton>
            <Button href="/contact" variant="secondary" size="lg">
              Talk to an Expert
              <ArrowRight size={15} />
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              "Free 30-min call",
              "No commitment",
              "Response within 4 hours",
              "Real team, real conversation",
            ].map((t) => (
              <span key={t} className="text-xs text-[#334155] flex items-center gap-1.5">
                <span className="text-[#00D4FF30] text-[10px]">✓</span>
                {t}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
