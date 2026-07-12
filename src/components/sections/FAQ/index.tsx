import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientText } from "@/components/shared/GradientText";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/data/faqs";

export function FAQSection() {
  return (
    <SectionWrapper bg="canvas">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <ScrollReveal>
            <SectionLabel>FAQ</SectionLabel>
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
              Questions{" "}
              <GradientText>Answered</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-[#64748B]" style={{ fontSize: "var(--type-body-lg)" }}>
              Everything you need to know before booking a strategy call.
            </p>
          </ScrollReveal>
        </div>

        {/* Accordion */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />

            {/* Bottom CTA */}
            <div className="mt-10 text-center">
              <p className="text-[#475569] text-sm mb-4">
                Still have questions? Talk to our AI assistant.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#00D4FF] hover:underline underline-offset-4"
              >
                <MessageSquare size={15} />
                Chat with our team
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
