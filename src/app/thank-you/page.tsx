import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";

export const metadata: Metadata = {
  title: "Thank You | QuionAi",
  description: "Thank you for reaching out to QuionAi.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-[#050816] flex items-center justify-center section">
        <div className="container max-w-xl text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={28} className="text-[#00D4FF]" />
          </div>
          <h1
            className="font-bold text-white mb-4"
            style={{
              fontSize: "var(--type-h1)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
            }}
          >
            <GradientText>Thank You!</GradientText>
          </h1>
          <p className="text-[#64748B] leading-relaxed mb-8" style={{ fontSize: "var(--type-body-lg)" }}>
            We&apos;ve received your message and will get back to you within 4 hours. In the
            meantime, explore our services or read our latest insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00D4FF] px-8 py-4 text-sm font-semibold text-[#050816] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Explore Services
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#6D5DFC] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[rgba(109,93,252,0.1)]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
