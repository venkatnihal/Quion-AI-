import { Mail, ExternalLink, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { BookingButton } from "@/components/shared/Booking";
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  WHATSAPP_LINK_PREFILLED,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";

const channels = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn",
    handle: "quionai-automations",
    href: LINKEDIN_URL,
    description: "Follow us for AI automation tips and business insights.",
    color: "#0A66C2",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    label: "Instagram",
    handle: "quionai.automations",
    href: INSTAGRAM_URL,
    description: "Behind-the-scenes and client success stories.",
    color: "#E1306C",
  },
  {
    icon: <MessageCircle size={22} aria-hidden />,
    label: "WhatsApp",
    handle: WHATSAPP_DISPLAY,
    href: WHATSAPP_LINK_PREFILLED,
    description: "The fastest way to reach us. Message us anytime.",
    color: "#25D366",
  },
  {
    icon: <Mail size={22} aria-hidden />,
    label: "Email",
    handle: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    description: "Direct line to our team. We reply within 4 hours.",
    color: "#00D4FF",
  },
];

export function ConnectSection() {
  return (
    <SectionWrapper bg="surface" id="connect">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-14 max-w-xl mx-auto">
          <ScrollReveal>
            <SectionLabel>Stay Connected</SectionLabel>
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
              Connect With{" "}
              <GradientText>QuionAi</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-3 text-[#64748B]" style={{ fontSize: "var(--type-body-lg)" }}>
              We&apos;re a real team — not a faceless agency. Reach us wherever you&apos;re most comfortable.
            </p>
          </ScrollReveal>
        </div>

        {/* Channel cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {channels.map((ch, i) => (
            <ScrollReveal key={ch.label} delay={i * 0.07}>
              <a
                href={ch.href}
                target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group block h-full"
                aria-label={`Connect on ${ch.label}`}
              >
                <GlassCard hoverable className="p-6 h-full flex flex-col gap-4">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${ch.color}18`,
                      border: `1px solid ${ch.color}30`,
                      color: ch.color,
                    }}
                  >
                    {ch.icon}
                  </div>

                  <div className="flex-1">
                    <p
                      className="font-semibold text-white text-base mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {ch.label}
                    </p>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: ch.color }}
                    >
                      {ch.handle}
                    </p>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {ch.description}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: ch.color }}
                  >
                    {ch.href.startsWith("mailto") ? "Send email" : "Open →"}
                    <ExternalLink size={11} />
                  </div>
                </GlassCard>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <ScrollReveal delay={0.2}>
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "rgba(15,23,42,0.6)",
              border: "1px solid rgba(0,212,255,0.12)",
            }}
          >
            <p className="text-sm text-[#475569] mb-1">Prefer to just talk?</p>
            <h3
              className="text-xl font-semibold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Free 30-Minute Consultation — No Commitment
            </h3>
            <BookingButton variant="primary" size="md">
              Book a Free Consultation
            </BookingButton>
            <p className="text-xs text-[#334155] mt-3">
              No commitment · Same-day availability · Real conversation with our team
            </p>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
