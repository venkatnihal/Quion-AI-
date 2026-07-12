import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { ServicesSection } from "@/components/sections/Services";
import { HowItWorksSection } from "@/components/sections/HowItWorks";
import { ResultsSection } from "@/components/sections/Results";
import { AIDemoSection } from "@/components/sections/AIDemo";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQ";
import { ConnectSection } from "@/components/sections/ConnectSection";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { websiteSchema, faqSchema } from "@/lib/schema";
import { faqs } from "@/data/faqs";
import { getContent } from "@/lib/cms/db";
import { DEFAULT_SECTIONS, type Section } from "@/lib/cms/sections";

// Read editable homepage layout from the CMS at request time (falls back to
// the built-in order/visibility so the page always renders).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QuionAi — AI Automation for Small & Medium Businesses",
  description:
    "A specialist AI team helping businesses in the US, UK, Australia & Canada automate operations, follow up on leads faster, and scale without extra headcount.",
  openGraph: {
    title: "QuionAi — AI Automation for Small & Medium Businesses",
    description:
      "Automate operations, improve lead response, and scale your business with AI — built by a small, specialist team. Serving US, UK, AU, CA & EU.",
    url: "https://quionai.com",
  },
};

const SECTION_RENDER: Record<string, React.ReactNode> = {
  hero: <HeroSection key="hero" />,
  socialProof: (
    <div key="socialProof">
      <SocialProofBar />
      <div className="container py-10 sm:py-12">
        <TrustBadges />
      </div>
    </div>
  ),
  services: <ServicesSection key="services" />,
  howItWorks: <HowItWorksSection key="howItWorks" />,
  results: <ResultsSection key="results" />,
  aiDemo: <AIDemoSection key="aiDemo" />,
  testimonials: <TestimonialsSection key="testimonials" />,
  faq: <FAQSection key="faq" />,
  connect: <ConnectSection key="connect" />,
  finalCta: <FinalCTASection key="finalCta" />,
};

export default async function HomePage() {
  const cfg = await getContent<{ sections: Section[] }>("home.sections");
  const sections = Array.isArray(cfg?.sections) && cfg.sections.length ? cfg.sections : DEFAULT_SECTIONS;
  const ordered = sections.filter((s) => s.visible && SECTION_RENDER[s.id]);
  // Guard: if config somehow yields nothing, fall back to the full default layout.
  const toRender = ordered.length ? ordered : DEFAULT_SECTIONS;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <Navbar />
      <main>{toRender.map((s) => SECTION_RENDER[s.id])}</main>
      <Footer />
    </>
  );
}
