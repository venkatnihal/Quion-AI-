import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";

export const metadata: Metadata = {
  title: "Terms of Service | QuionAi",
  description: "QuionAi Terms of Service — the terms governing your use of our services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] bg-[#050816] min-h-screen">
        <div className="container max-w-3xl py-20">
          <h1
            className="font-bold text-white mb-4"
            style={{
              fontSize: "var(--type-h1)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
            }}
          >
            Terms of <GradientText>Service</GradientText>
          </h1>
          <p className="text-sm text-[#475569] mb-12">Last updated: January 2025</p>

          <div className="space-y-8 text-[#64748B] leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using QuionAi&apos;s website and services, you accept and agree to
                be bound by these Terms of Service. If you do not agree to these terms, please do not
                use our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                2. Services
              </h2>
              <p>
                QuionAi provides AI transformation services including automation systems, AI agents,
                chatbots, calling assistants, web development, SEO, social media marketing, and
                copywriting. Specific terms for each engagement are outlined in individual service
                agreements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                3. Intellectual Property
              </h2>
              <p>
                All content, designs, and materials on this website are the intellectual property of
                QuionAi. Custom AI systems and deliverables created for clients are governed by
                individual project agreements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                4. Limitation of Liability
              </h2>
              <p>
                QuionAi shall not be liable for any indirect, incidental, special, or consequential
                damages resulting from the use of our services. Our liability is limited to the fees
                paid for the specific service in question.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                5. Contact
              </h2>
              <p>
                For questions about these Terms, contact us at{" "}
                <a href="mailto:legal@quionai.com" className="text-[#00D4FF] hover:underline">
                  legal@quionai.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
