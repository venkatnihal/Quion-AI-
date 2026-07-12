import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientText } from "@/components/shared/GradientText";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <SectionWrapper bg="surface">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <ScrollReveal>
            <SectionLabel>Client Results</SectionLabel>
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
              Businesses We&apos;ve{" "}
              <GradientText>Transformed</GradientText>
            </h2>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.07}>
              <TestimonialCard testimonial={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
