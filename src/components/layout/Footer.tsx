import Link from "next/link";
import { Mail, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { LogoMark } from "@/components/shared/Logo";
import { BookingButton } from "@/components/shared/Booking";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { footerLinks } from "@/data/navigation";
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  WHATSAPP_LINK_PREFILLED,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#050816] border-t border-[rgba(255,255,255,0.05)]">
      <div className="container py-14">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <LogoMark size={32} />
              <span
                className="text-lg font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Quion<GradientText>Ai</GradientText>
              </span>
            </Link>
            <p className="text-sm text-[#475569] leading-relaxed mb-5 max-w-[220px]">
              A specialist AI automation team helping small and medium businesses automate operations and scale efficiently.
            </p>

            {/* Actual contact details */}
            <div className="space-y-2.5 mb-5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors"
              >
                <Mail size={13} className="shrink-0" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={WHATSAPP_LINK_PREFILLED}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-[#64748B] hover:text-[#25D366] transition-colors"
              >
                <MessageCircle size={13} className="shrink-0" />
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors"
              >
                <Linkedin size={13} className="shrink-0" />
                quionai-automations
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors"
              >
                <Instagram size={13} className="shrink-0" />
                quionai.automations
              </a>
            </div>

            <p className="text-xs text-[#334155]">
              🇺🇸 US · 🇬🇧 UK · 🇦🇺 AU · 🇨🇦 CA · 🇪🇺 EU
              <br />
              Delivered from India 🇮🇳
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-[#475569] mb-5">
              Services
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-[#475569] mb-5">
              Company
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-[#475569] mb-5">
              Get Started
            </h3>
            <p className="text-sm text-[#475569] mb-5 leading-relaxed">
              Free 30-minute consultation. We&apos;ll map your best AI automation opportunities — no commitment.
            </p>
            <BookingButton size="sm">Book a Free Consultation</BookingButton>

            <div className="flex gap-3 mt-7">
              {[
                { label: "LinkedIn", href: LINKEDIN_URL, Icon: Linkedin, hover: "#00D4FF" },
                { label: "Instagram", href: INSTAGRAM_URL, Icon: Instagram, hover: "#00D4FF" },
                { label: "WhatsApp", href: WHATSAPP_LINK_PREFILLED, Icon: MessageCircle, hover: "#25D366" },
                { label: "Email", href: `mailto:${CONTACT_EMAIL}`, Icon: Mail, hover: "#00D4FF" },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl border border-[rgba(0,212,255,0.15)] flex items-center justify-center text-[#94A3B8] bg-[rgba(0,212,255,0.04)] hover:text-[#00D4FF] hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.1)] hover:scale-105 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter band */}
        <div className="mt-12 pt-10 border-t border-[rgba(255,255,255,0.05)] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div>
            <h3 className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
              AI growth tips, straight to your inbox
            </h3>
            <p className="text-sm text-[#475569] mt-1.5 max-w-md">
              Practical automation playbooks and case studies for founders. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm className="lg:max-w-md lg:ml-auto" />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-[rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#334155] text-center sm:text-left">
            © {new Date().getFullYear()} QuionAi. All rights reserved. Global services delivered from India.
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#334155] hover:text-[#64748B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
