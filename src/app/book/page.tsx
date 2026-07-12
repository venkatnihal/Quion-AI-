import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import { BookingEmbed } from "@/components/shared/Booking";
import { buildMetadata } from "@/lib/metadata";
import { WHATSAPP_LINK_PREFILLED, WHATSAPP_DISPLAY, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Book a Free Consultation",
  description:
    "Book a free 30-minute consultation with QuionAi. We'll map your best AI automation opportunities and give you a clear roadmap — no commitment.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-[#050816] section">
        <div className="container max-w-3xl text-center mb-10">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.15em] text-[#00D4FF] mb-4">
            Free Consultation
          </p>
          <h1
            className="font-bold text-white"
            style={{
              fontSize: "var(--type-h1)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
            }}
          >
            Schedule Your Free{" "}
            <GradientText>Consultation</GradientText>
          </h1>
          <p className="mt-4 text-[#AEBACD] mx-auto max-w-xl" style={{ fontSize: "var(--type-body-lg)" }}>
            Pick a time that works for you. In 30 minutes we&apos;ll audit your business,
            identify your highest-ROI automation opportunities, and give you a clear
            roadmap — no obligation, no sales pressure.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-[#94A3B8]">
            <span>✓ Free of charge</span>
            <span>✓ No commitment</span>
            <span>✓ Same-day availability</span>
          </div>
        </div>

        {/* Embedded Microsoft Bookings scheduler (booking link configured in src/lib/constants.ts) */}
        <div className="container max-w-3xl">
          <BookingEmbed minHeight={700} />

          {/* Fallback contact options */}
          <p className="text-center text-sm text-[#64748B] mt-6">
            Prefer to talk first? Message us on{" "}
            <a
              href={WHATSAPP_LINK_PREFILLED}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp ({WHATSAPP_DISPLAY})
            </a>{" "}
            or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#00D4FF] hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
