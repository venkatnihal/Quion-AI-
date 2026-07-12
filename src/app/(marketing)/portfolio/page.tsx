import type { Metadata } from "next";
import { GradientText } from "@/components/shared/GradientText";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { PortfolioGrid } from "@/components/sections/Portfolio/PortfolioGrid";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { getAllProjects, getProjectIndustries } from "@/sanity/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/constants";
import type { PortfolioProject } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Explore QuionAi's work — AI automation, chatbots, voice agents, and high-converting websites built for businesses across the US, UK, Australia, Canada, and Europe.",
  path: "/portfolio",
});

// Schema.org ItemList so search engines understand the project collection.
function portfolioSchema(projects: PortfolioProject[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.title} — ${p.client}`,
      url: `${SITE_URL}/portfolio/`,
    })),
  };
}

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const industries = await getProjectIndustries();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema(projects)) }}
      />
      <div className="section bg-[#050816]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <ScrollReveal>
              <SectionLabel>Our Work</SectionLabel>
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
                Work That <GradientText>Delivers Results</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-[#64748B]" style={{ fontSize: "var(--type-body-xl)" }}>
                A selection of AI systems and websites we&apos;ve shipped. Filter by industry or
                search to find work like yours.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <PortfolioGrid projects={projects} industries={industries} />
          </ScrollReveal>
        </div>
      </div>

      <FinalCTASection />
    </>
  );
}
