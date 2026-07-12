import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/shared/GradientText";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { caseStudyPreviews } from "@/data/stats";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Real results from real businesses. See how QuionAi transformed operations, generated revenue, and scaled companies across the US, UK, Australia, and Canada.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <div className="section bg-[#050816]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <ScrollReveal>
              <SectionLabel>Case Studies</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1
                className="mt-4 font-bold text-white"
                style={{
                  fontSize: "var(--type-h1)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.025em",
                }}
              >
                Real Results.{" "}
                <GradientText>Real Businesses.</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-[#64748B]" style={{ fontSize: "var(--type-body-xl)" }}>
                Every case study below is a real client engagement with real, trackable outcomes.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudyPreviews.map((cs, i) => (
              <ScrollReveal key={cs.client} delay={i * 0.08}>
                <Link href={cs.href} className="group block h-full">
                  <GlassCard hoverable className="p-8 h-full flex flex-col gap-5">
                    <div>
                      <p className="text-xs text-[#475569] mb-1">{cs.country} · {cs.industry}</p>
                      <h2
                        className="text-xl font-semibold text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {cs.client}
                      </h2>
                    </div>

                    <div
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: "var(--grad-text)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {cs.metric}
                    </div>
                    <p className="text-sm text-[#475569]">{cs.metricLabel}</p>

                    <p className="text-sm text-[#64748B] leading-relaxed flex-1">{cs.result}</p>

                    <Badge variant="brand">View Case Study</Badge>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#00D4FF]">
                      Read full case study
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <FinalCTASection />
    </>
  );
}
