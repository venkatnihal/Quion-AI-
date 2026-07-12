import type { Metadata } from "next";
import { Mail, MessageCircle, Globe, Linkedin, Instagram } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { BookingButton } from "@/components/shared/Booking";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { buildMetadata } from "@/lib/metadata";
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  WHATSAPP_LINK_PREFILLED,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contact QuionAi",
  description:
    "Get in touch with the QuionAi team. Book a free consultation, message us on WhatsApp, or send us an email.",
  path: "/contact",
});

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    subtext: "We reply within 4 hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_LINK_PREFILLED,
    subtext: "Fastest way to reach us",
  },
  {
    icon: Globe,
    label: "Markets We Serve",
    value: "US · UK · AU · CA · EU",
    href: null,
    subtext: "Delivered from India",
  },
];

const socialDetails = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "quionai-automations",
    href: LINKEDIN_URL,
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "quionai.automations",
    href: INSTAGRAM_URL,
  },
];

export default function ContactPage() {
  return (
    <div className="section bg-[#050816]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — 2/5 */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <SectionLabel>Contact Us</SectionLabel>
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
                Let&apos;s Talk{" "}
                <GradientText>Business</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-[#64748B] leading-relaxed text-sm">
                We&apos;re a small team — you&apos;ll speak directly to the people who will be
                working on your project. No account managers, no runaround.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 space-y-5">
                {contactDetails.map(({ icon: Icon, label, value, href, subtext }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(109,93,252,0.08))",
                        border: "1px solid rgba(0,212,255,0.18)",
                      }}
                    >
                      <Icon size={15} className="text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#475569] uppercase tracking-[0.08em] mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-white hover:text-[#00D4FF] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-white">{value}</p>
                      )}
                      {subtext && (
                        <p className="text-xs text-[#334155] mt-0.5">{subtext}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick booking */}
              <div className="mt-8 pt-7 border-t border-[rgba(255,255,255,0.05)]">
                <p className="text-[0.8125rem] text-white font-medium mb-3">
                  Prefer to skip the form?
                </p>
                <BookingButton variant="primary" size="md" fullWidth>
                  Book a Free Consultation
                </BookingButton>
              </div>

              {/* Social */}
              <div className="mt-8 pt-7 border-t border-[rgba(255,255,255,0.05)]">
                <p className="text-[0.8125rem] text-[#64748B] uppercase tracking-[0.08em] mb-4">
                  Follow us
                </p>
                <div className="space-y-3">
                  {socialDetails.map(({ icon: Icon, label, handle, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors group"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(0,212,255,0.3)] transition-colors"
                      >
                        <Icon size={13} />
                      </div>
                      <span>{handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — 3/5 */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.1}>
          <TrustBadges className="mt-14 max-w-4xl mx-auto" />
        </ScrollReveal>
      </div>
    </div>
  );
}
