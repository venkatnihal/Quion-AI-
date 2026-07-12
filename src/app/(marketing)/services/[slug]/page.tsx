import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { BookingButton } from "@/components/shared/Booking";
import { services, getServiceBySlug } from "@/data/services";
import { serviceSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(service.title, service.description, service.slug)),
        }}
      />

      <div className="section bg-[#050816]">
        <div className="container">
          {/* Back */}
          <ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#00D4FF] transition-colors mb-12"
            >
              <ArrowLeft size={14} />
              All Services
            </Link>
          </ScrollReveal>

          {/* Hero */}
          <div className="max-w-3xl mb-16">
            <ScrollReveal>
              <Badge variant="brand" dot className="mb-4">
                QuionAi Service
              </Badge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1
                className="font-bold text-white"
                style={{
                  fontSize: "var(--type-h1)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.025em",
                }}
              >
                <GradientText>{service.title}</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p
                className="mt-5 text-[#64748B] leading-relaxed"
                style={{ fontSize: "var(--type-body-xl)" }}
              >
                {service.description}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <BookingButton variant="primary" size="lg">
                  Book a Free Consultation
                </BookingButton>
                <Button href="/contact" variant="secondary" size="lg">
                  Talk to an Expert
                </Button>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Features */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <GlassCard className="p-8">
                  <h2
                    className="text-xl font-semibold text-white mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-3" role="list">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[#00D4FF] mt-0.5 shrink-0" />
                        <span className="text-[#94A3B8] text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>

              {/* Process */}
              <ScrollReveal delay={0.1}>
                <GlassCard className="p-8">
                  <h2
                    className="text-xl font-semibold text-white mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Our Process
                  </h2>
                  <div className="space-y-5">
                    {service.process.map((step, i) => (
                      <div key={step.step} className="flex gap-4">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{
                            background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(109,93,252,0.2))",
                            border: "1px solid rgba(0,212,255,0.2)",
                            color: "#00D4FF",
                          }}
                        >
                          {step.step}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm mb-1">{step.title}</p>
                          <p className="text-sm text-[#64748B]">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Results */}
              <ScrollReveal delay={0.15}>
                <GlassCard elevated className="p-6">
                  <h3
                    className="text-sm font-semibold text-white mb-5 uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Typical Results
                  </h3>
                  <div className="space-y-4">
                    {service.benefits.map((b) => (
                      <div key={b.label} className="flex items-center justify-between">
                        <span className="text-sm text-[#64748B]">{b.label}</span>
                        <span
                          className="text-lg font-bold"
                          style={{
                            fontFamily: "var(--font-display)",
                            background: "var(--grad-text)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {b.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>

              {/* CTA card */}
              <ScrollReveal delay={0.2}>
                <GlassCard
                  elevated
                  className="p-6 text-center"
                  style={{ border: "1px solid rgba(0,212,255,0.2)" }}
                >
                  <p className="text-xs text-[#475569] uppercase tracking-widest mb-2">Get Started</p>
                  <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Free Consultation
                  </h3>
                  <p className="text-sm text-[#475569] mb-5">
                    30 minutes. No commitment. We&apos;ll map your opportunity and show you exactly what to build.
                  </p>
                  <BookingButton variant="primary" fullWidth>
                    Book a Free Consultation
                  </BookingButton>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      <FinalCTASection />
    </>
  );
}
