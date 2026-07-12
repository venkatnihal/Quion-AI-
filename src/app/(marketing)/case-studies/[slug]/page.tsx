import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { caseStudyPreviews } from "@/data/stats";

interface Props {
  params: Promise<{ slug: string }>;
}

const caseStudyData: Record<string, { title: string; description: string }> = {
  "meridian-property": {
    title: "Meridian Property Group",
    description: "How AI calling assistants booked 47 qualified appointments in week one.",
  },
  nexascale: {
    title: "NexaScale SaaS",
    description: "Reducing a 3-day onboarding process to 20 minutes with AI automation.",
  },
  "elara-commerce": {
    title: "Elara Commerce",
    description: "Building a complete AI growth system that drove 340% revenue growth in 8 months.",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "meridian-property" },
    { slug: "nexascale" },
    { slug: "elara-commerce" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = caseStudyData[slug];
  return {
    title: data?.title ?? "Case Study",
    description: data?.description ?? "A QuionAi client case study.",
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const data = caseStudyData[slug];
  const preview = caseStudyPreviews.find((c) => c.href.includes(slug));

  return (
    <>
      <div className="section bg-[#050816]">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#00D4FF] transition-colors mb-12"
            >
              <ArrowLeft size={14} />
              All Case Studies
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xs text-[#475569] uppercase tracking-widest mb-3">
              {preview?.country} · {preview?.industry}
            </p>
            <h1
              className="font-bold text-white mb-6"
              style={{
                fontSize: "var(--type-h1)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.025em",
              }}
            >
              <GradientText>{data?.title ?? slug}</GradientText>
            </h1>
            <p
              className="text-[#64748B] leading-relaxed mb-10"
              style={{ fontSize: "var(--type-body-xl)" }}
            >
              {data?.description}
            </p>
          </ScrollReveal>

          {preview && (
            <ScrollReveal delay={0.2}>
              <GlassCard elevated className="p-8 mb-10">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">
                      Key Result
                    </p>
                    <p
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: "var(--grad-text)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {preview.metric}
                    </p>
                    <p className="text-sm text-[#475569] mt-1">{preview.metricLabel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">
                      Outcome
                    </p>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{preview.result}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.25}>
            <GlassCard className="p-8">
              <p className="text-[#64748B] leading-relaxed">
                Full case study details are shared during our strategy calls. Book a free consultation
                to discuss how we can achieve similar results for your business.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>

      <FinalCTASection />
    </>
  );
}
