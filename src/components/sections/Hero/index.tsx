"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/shared/GradientText";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { BookingButton } from "@/components/shared/Booking";

const FlowFieldBackground = dynamic(
  () => import("@/components/shared/FlowFieldBackground"),
  { ssr: false }
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero — QuionAi AI Automation"
    >
      {/* Animated flow field background */}
      <div className="absolute inset-0 z-0">
        <FlowFieldBackground
          color="#00D4FF"
          color2="#6D5DFC"
          trailOpacity={0.07}
          particleCount={450}
          speed={0.55}
        />
      </div>

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 38%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* Bottom fade to section below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #050816 100%)",
        }}
        aria-hidden
      />

      {/* Mobile glow */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none sm:hidden">
        <GlowOrb size="90vw" />
      </div>

      {/* Hero content — vertically centred within the viewport, clear of the navbar */}
      <div className="container relative z-10 text-center pt-24 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-5 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <Badge variant="brand" dot>
              AI Automation for Small &amp; Medium Businesses
            </Badge>
          </motion.div>

          {/* Main headline — three intentional, centred lines */}
          <motion.h1
            variants={item}
            className="font-bold text-white text-center"
            style={{
              fontSize: "var(--type-display)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.035em",
              lineHeight: "0.98",
              textShadow: "0 0 60px rgba(0,212,255,0.12)",
            }}
          >
            <span className="block">Your Business.</span>
            <span className="block">Automated.</span>
            <span className="block">
              <GradientText>Scaled.</GradientText>
            </span>
          </motion.h1>

          {/* Supporting subtext — credible, specific */}
          <motion.p
            variants={item}
            className="max-w-[560px] leading-[1.7]"
            style={{
              fontSize: "var(--type-body-xl)",
              color: "var(--text-secondary)",
            }}
          >
            We&apos;re a small, specialist team that helps businesses automate operations, follow up on leads faster, and save hours every week — without hiring extra staff.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 mt-1"
          >
            <BookingButton variant="primary" size="lg">
              Book a Free Consultation
            </BookingButton>
            <Button href="/contact" variant="secondary" size="lg">
              Talk To Our Team
              <ArrowRight size={15} />
            </Button>
          </motion.div>

          {/* Trust signals — realistic, no fake revenue claims */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-3"
          >
            {[
              "200+ Clients Served",
              "US · UK · AU · CA · EU",
              "5.0 ★ Rated",
              "Delivered from India 🇮🇳",
            ].map((t) => (
              <span key={t} className="text-sm text-[#94A3B8] flex items-center gap-1.5">
                <span className="text-[#00D4FF] text-xs">✦</span>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-[#334155] uppercase tracking-[0.15em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#00D4FF30] to-transparent animate-float" />
        </div>
      </motion.div>
    </section>
  );
}
