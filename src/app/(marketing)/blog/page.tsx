import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/shared/GradientText";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { buildMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/sanity/content";

export const metadata: Metadata = buildMetadata({
  title: "Blog — AI Insights & Strategy",
  description:
    "Expert insights on AI automation, AI agents, business transformation, and scaling with intelligent systems.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="section bg-[#050816]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <ScrollReveal>
              <SectionLabel>Blog</SectionLabel>
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
                AI Insights &amp;{" "}
                <GradientText>Strategy</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-[#64748B]" style={{ fontSize: "var(--type-body-xl)" }}>
                Expert guidance on AI automation, agents, and intelligent systems for business growth.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.07}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <GlassCard hoverable className="p-7 h-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="neutral">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-[#334155]">
                        <Clock size={11} />
                        {post.readTime} min read
                      </div>
                    </div>
                    <h2
                      className="font-semibold text-white leading-snug flex-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.04)]">
                      <span className="text-xs text-[#334155]">{post.published}</span>
                      <div className="flex items-center gap-1 text-xs font-medium text-[#00D4FF]">
                        Read
                        <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <FinalCTASection />
    </>
  );
}
