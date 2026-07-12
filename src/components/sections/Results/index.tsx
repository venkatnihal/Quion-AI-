import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/shared/CountUp";
import { resultStats, caseStudyPreviews } from "@/data/stats";

export function ResultsSection() {
  return (
    <SectionWrapper bg="canvas">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <ScrollReveal>
            <SectionLabel>Results</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="mt-4 font-bold text-white"
              style={{
                fontSize: "var(--type-h2)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Real Results.{" "}
              <GradientText>Real Revenue.</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-[#64748B]" style={{ fontSize: "var(--type-body-lg)" }}>
              Every number below is tracked across real client deployments.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {resultStats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <GlassCard glow className="p-8 text-center flex flex-col gap-3">
                <div
                  className="text-5xl font-bold"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                >
                  <span
                    style={{
                      background: "var(--grad-text)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <CountUp
                      to={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </span>
                </div>
                <p className="font-semibold text-white">{stat.label}</p>
                {stat.description && (
                  <p className="text-xs text-[#475569] leading-relaxed">{stat.description}</p>
                )}
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Case Study Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {caseStudyPreviews.map((cs, i) => (
            <ScrollReveal key={cs.client} delay={i * 0.08}>
              <Link href={cs.href} className="group block h-full">
                <GlassCard hoverable className="p-6 h-full flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#475569] mb-1">{cs.country} · {cs.industry}</p>
                      <h3 className="font-semibold text-white text-sm">{cs.client}</h3>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="text-2xl font-bold"
                        style={{
                          fontFamily: "var(--font-display)",
                          background: "var(--grad-text)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {cs.metric}
                      </p>
                      <p className="text-xs text-[#475569]">{cs.metricLabel}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed flex-1">{cs.result}</p>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#00D4FF]">
                    Read Case Study
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
