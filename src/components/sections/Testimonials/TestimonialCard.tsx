import { Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <GlassCard className="p-8 flex flex-col gap-5 h-full">
      {/* Stars */}
      <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#00D4FF] text-[#00D4FF]" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-[#94A3B8] leading-relaxed text-sm flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Result badge */}
      <Badge variant="brand" dot>
        {testimonial.result}
      </Badge>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[rgba(255,255,255,0.05)]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
          style={{
            background: "linear-gradient(135deg, #00D4FF33, #6D5DFC33)",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
          aria-hidden
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-[#475569]">
            {testimonial.role}, {testimonial.company} {testimonial.countryFlag}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
