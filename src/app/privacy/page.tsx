import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";

export const metadata: Metadata = {
  title: "Privacy Policy | QuionAi",
  description: "QuionAi Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
            Privacy <GradientText>Policy</GradientText>
          </h1>
          <p className="text-sm text-[#475569] mb-12">Last updated: January 2025</p>

          <div className="prose prose-sm max-w-none space-y-8 text-[#64748B] leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you fill out a
                contact form, book a strategy call, or subscribe to our communications. This includes
                your name, email address, company name, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services,
                communicate with you about our services and opportunities, respond to your enquiries,
                and comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                3. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information with trusted service providers who assist us in operating our
                website and conducting our business, subject to confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                4. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                5. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@quionai.com" className="text-[#00D4FF] hover:underline">
                  privacy@quionai.com
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
