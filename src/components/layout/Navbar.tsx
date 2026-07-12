"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/shared/Logo";
import { BookingButton } from "@/components/shared/Booking";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  WHATSAPP_LINK_PREFILLED,
} from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[300] transition-all duration-300",
          scrolled
            ? "bg-[rgba(5,8,22,0.94)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.05)] shadow-[0_1px_24px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
      >
        <nav
          className="container flex h-[68px] items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="QuionAi — Home"
          >
            <LogoMark size={36} className="transition-transform duration-300 group-hover:scale-105" />
            <span
              className="text-[1.3125rem] font-bold tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quion<span style={{ color: "#00D4FF" }}>Ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-7" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-[0.875rem] font-medium transition-colors duration-200 group",
                    pathname === link.href
                      ? "text-[#00D4FF]"
                      : "text-[#94A3B8] hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-[#00D4FF] transition-all duration-200 origin-left",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors flex items-center gap-1.5"
              aria-label="Email QuionAi"
            >
              <Mail size={14} />
              <span className="hidden xl:inline">{CONTACT_EMAIL}</span>
            </a>
            <BookingButton variant="primary" size="sm">
              Book a Free Consultation
            </BookingButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-[#94A3B8] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[400] lg:hidden flex flex-col"
            style={{ backgroundColor: "rgba(5,8,22,0.98)" }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-[rgba(255,255,255,0.05)]">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
                <LogoMark size={32} />
                <span
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Quion<span style={{ color: "#00D4FF" }}>Ai</span>
                </span>
              </Link>
              <button
                className="p-2 text-[#94A3B8] hover:text-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav className="flex-1 px-6 pt-6 overflow-y-auto" aria-label="Mobile navigation">
              <ul className="space-y-1" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-3.5 text-xl font-semibold border-b border-[rgba(255,255,255,0.05)] transition-colors",
                        pathname === link.href ? "text-[#00D4FF]" : "text-white hover:text-[#00D4FF]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Contact info in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-3"
              >
                <p className="text-xs text-[#334155] uppercase tracking-widest mb-3">
                  Get in touch
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors"
                >
                  <Mail size={15} />
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#64748B] hover:text-[#00D4FF] transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Instagram
                </a>
                <a
                  href={WHATSAPP_LINK_PREFILLED}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#64748B] hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              </motion.div>
            </nav>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 pb-8 pt-4 border-t border-[rgba(255,255,255,0.05)] space-y-3"
            >
              <BookingButton variant="primary" size="lg" fullWidth>
                Book a Free Consultation
              </BookingButton>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full justify-center"
              >
                Talk To Our Team
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
