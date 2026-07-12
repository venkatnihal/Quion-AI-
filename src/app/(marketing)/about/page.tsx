import type { Metadata } from "next";
import { CheckCircle2, Users, Globe, Zap, Shield } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { ConnectSection } from "@/components/sections/ConnectSection";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About QuionAi",
  description:
    "QuionAi is a small, specialist AI automation team helping businesses in the US, UK, Australia, and Canada automate their operations and scale efficiently — delivered from India.",
  path: "/about",
});

const values = [
  {
    icon: Zap,
    title: "Speed to Value",
    description:
      "We aim to have working automations live within 2–3 weeks. You should see results before the end of the first month.",
  },
  {
    icon: Shield,
    title: "Honest, Practical Advice",
    description:
      "We only recommend what will actually work for your business. We'd rather tell you a simpler solution than sell you something complex you don't need.",
  },
  {
    icon: Users,
    title: "Small Team, Real Attention",
    description:
      "You work directly with the people building your system — not account managers. We keep our client list manageable so every business gets proper attention.",
  },
  {
    icon: Globe,
    title: "Global Delivery, Local Understanding",
    description:
      "We're based in India and serve clients in the US, UK, Australia, Canada, and Europe. Global reach with competitive pricing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="section bg-[#050816]">
        <div className="container">
          {/* Hero */}
          <div className="max-w-3xl mb-20">
            <ScrollReveal>
              <SectionLabel>About QuionAi</SectionLabel>
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
                A Specialist Team,{" "}
                <GradientText>Not a Big Agency</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p
                className="mt-5 text-[#64748B] leading-relaxed"
                style={{ fontSize: "var(--type-body-xl)" }}
              >
                QuionAi is a small, focused team of AI automation specialists. We help small and
                medium businesses in the US, UK, Australia, and Canada automate the parts of their
                operations that are eating up time and money — and we do it in a few weeks, not months.
              </p>
            </ScrollReveal>
          </div>

          {/* Who we are */}
          <ScrollReveal>
            <GlassCard elevated className="p-8 mb-16">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(109,93,252,0.2))",
                    border: "1px solid rgba(0,212,255,0.25)",
                  }}
                >
                  <Users size={18} className="text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-xs text-[#00D4FF] uppercase tracking-widest font-medium mb-2">
                    Who We Are
                  </p>
                  <p
                    className="text-lg font-semibold text-white leading-relaxed"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    A team of 5–8 AI automation specialists, delivered from India — working with
                    businesses in the US, UK, Australia, Canada, and Europe.
                  </p>
                  <p className="mt-3 text-[#64748B] leading-relaxed text-sm">
                    We&apos;re not a 200-person agency. We&apos;re a small team that focuses on
                    practical AI automation — the kind that actually works and delivers measurable
                    results for real businesses, not just impressive demos.
                  </p>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* What we do */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-20">
            <div>
              <ScrollReveal>
                <h2
                  className="font-bold text-white mb-5"
                  style={{
                    fontSize: "var(--type-h2)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  We Build Practical AI Systems
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="space-y-4 text-[#64748B] leading-relaxed text-sm">
                  <p>
                    Most AI agencies sell you on big visions and charge accordingly. We focus on the
                    practical stuff that makes an immediate difference — automated lead follow-up,
                    AI chatbots that save your team hours, onboarding flows that run without manual
                    intervention.
                  </p>
                  <p>
                    Our clients are typically small and medium businesses — typically under 50 staff —
                    who don&apos;t have the resources to hire a full AI team but understand there&apos;s
                    a real competitive advantage to be gained from automation.
                  </p>
                  <p>
                    We keep things simple, build what we say we&apos;ll build, and stand behind the
                    work. That&apos;s it.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.15}>
              <div className="space-y-3">
                {[
                  "Live automation systems in 2–3 weeks",
                  "200+ businesses helped across 5 markets",
                  "Team of 5–8 specialists (not a 200-person agency)",
                  "Serving US, UK, Australia, Canada and Europe",
                  "Based in India — globally competitive pricing",
                  "Direct access to the people building your system",
                  "We only recommend what you actually need",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-[#00D4FF] shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8] text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Values */}
          <div>
            <ScrollReveal>
              <SectionLabel>How We Work</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="mt-4 font-bold text-white mb-10"
                style={{
                  fontSize: "var(--type-h2)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Our Principles
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <ScrollReveal key={v.title} delay={i * 0.08}>
                    <GlassCard hoverable className="p-6 flex flex-col gap-4 h-full">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(109,93,252,0.15))",
                          border: "1px solid rgba(0,212,255,0.2)",
                        }}
                      >
                        <Icon size={17} className="text-[#00D4FF]" />
                      </div>
                      <h3
                        className="font-semibold text-white text-[0.9375rem]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {v.title}
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">{v.description}</p>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ConnectSection />
      <FinalCTASection />
    </>
  );
}
