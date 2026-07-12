import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientText } from "@/components/shared/GradientText";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <SectionWrapper bg="canvas" id="services">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <ScrollReveal>
            <SectionLabel>What We Build</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="mt-4 font-bold text-white"
              style={{
                fontSize: "var(--type-h2)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AI Systems That{" "}
              <GradientText>Scale Your Business</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-[#64748B]" style={{ fontSize: "var(--type-body-lg)" }}>
              From intelligent automation to AI agents, calling assistants, and
              conversion-focused digital infrastructure — we build the systems
              that make your business operate at scale.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.06} direction="up">
              <ServiceCard service={service} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
