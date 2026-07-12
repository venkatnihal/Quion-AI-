import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap, Bot, MessageSquare, Phone, Globe, TrendingUp, Share2, PenTool, ArrowRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { services } from "@/data/services";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI Services",
  description:
    "Explore QuionAi's full range of AI services — automation, agents, chatbots, calling assistants, web development, SEO, and more.",
};

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Zap, Bot, MessageSquare, Phone, Globe, TrendingUp, Share2, PenTool,
};

export default function ServicesPage() {
  return (
    <>
      {services.map((s) => (
        <script
          key={s.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema(s.title, s.description, s.slug)),
          }}
        />
      ))}

      <div className="section bg-[#050816]">
        <div className="container">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <SectionLabel>Services</SectionLabel>
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
                Every AI System{" "}
                <GradientText>Your Business Needs</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-[#64748B]" style={{ fontSize: "var(--type-body-xl)" }}>
                From intelligent automation to AI agents, voice assistants, and
                conversion-focused digital infrastructure — built for businesses
                in the US, UK, Australia, and Canada.
              </p>
            </ScrollReveal>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap;
              return (
                <ScrollReveal key={service.slug} delay={i * 0.06}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <GlassCard hoverable className="h-full p-8 flex flex-col gap-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(109,93,252,0.15))",
                          border: "1px solid rgba(0,212,255,0.2)",
                        }}
                      >
                        <Icon size={22} className="text-[#00D4FF]" />
                      </div>
                      <div className="flex-1">
                        <h2
                          className="text-lg font-semibold text-white mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {service.title}
                        </h2>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>
                      {/* Benefits */}
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((b) => (
                          <span
                            key={b.label}
                            className="text-xs font-semibold text-[#00D4FF] bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] rounded-full px-3 py-1"
                          >
                            {b.value} {b.label}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-[#00D4FF]">
                        Learn more
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      <FinalCTASection />
    </>
  );
}
