"use client";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Search, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery Call",
    description:
      "We audit your business, map your workflows, and identify the highest-ROI opportunities for AI and automation. No jargon — just clarity on exactly what to build and why.",
    outcomes: ["Business audit", "AI opportunity map", "Custom roadmap"],
  },
  {
    number: "02",
    icon: Wrench,
    title: "We Build Your System",
    description:
      "Our team architects and deploys your custom AI infrastructure in 2–4 weeks. We handle all the technical complexity — integrations, testing, and training included.",
    outcomes: ["Custom AI system", "Full integration", "Team onboarding"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "You Scale",
    description:
      "Your AI systems run 24/7, handling tasks, qualifying leads, and generating revenue. You get a business that scales without proportional cost increases.",
    outcomes: ["24/7 operation", "Ongoing optimisation", "Measurable ROI"],
  },
];

export function HowItWorksSection() {
  return (
    <SectionWrapper bg="surface">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <ScrollReveal>
            <SectionLabel>How It Works</SectionLabel>
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
              From Strategy to{" "}
              <GradientText>Scale</GradientText>{" "}
              in 3 Steps
            </h2>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, #00D4FF40, #6D5DFC40, transparent)",
            }}
            aria-hidden
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={i * 0.12} direction="up">
                <GlassCard className="p-8 h-full flex flex-col gap-5 relative">
                  {/* Number badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(109,93,252,0.2))",
                        border: "1px solid rgba(0,212,255,0.25)",
                      }}
                    >
                      <Icon size={20} className="text-[#00D4FF]" />
                    </div>
                    <span
                      className="text-5xl font-bold"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(109,93,252,0.1))",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-xl font-semibold text-white mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Outcomes */}
                  <ul className="space-y-2 mt-auto" role="list">
                    {step.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
                        <span className="h-1 w-1 rounded-full bg-[#00D4FF] shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
