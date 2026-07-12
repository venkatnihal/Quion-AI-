import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { BlogBody } from "@/components/sections/Blog/BlogBody";
import { FinalCTASection } from "@/components/sections/FinalCTA";
import { buildMetadata } from "@/lib/metadata";
import { getPostSlugs, getPostBySlug } from "@/sanity/content";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Article", description: "QuionAi blog", path: `/blog/${slug}` });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function articleSchema(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    author: { "@type": "Organization", name: post.authorName ?? "QuionAi" },
    publisher: { "@type": "Organization", name: "QuionAi" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />
      <article className="section bg-[#050816]">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#00D4FF] transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              All Articles
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="brand">{post.category}</Badge>
              <span className="flex items-center gap-1.5 text-xs text-[#475569]">
                <Clock size={12} /> {post.readTime} min read
              </span>
              {post.published && <span className="text-xs text-[#475569]">· {post.published}</span>}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1
              className="font-bold text-white mb-5"
              style={{
                fontSize: "var(--type-h1)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              {post.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 pb-10 border-b border-[rgba(255,255,255,0.06)]">
              {post.excerpt}
            </p>
          </ScrollReveal>

          {post.coverImage && (
            <ScrollReveal delay={0.15}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-2xl mb-10 border border-[rgba(255,255,255,0.06)]"
                loading="lazy"
              />
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
            <div className="max-w-none">
              <BlogBody post={post} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-14 pt-8 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-white font-medium mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Want this applied to your business?
              </p>
              <p className="text-sm text-[#64748B] mb-5">
                Book a free strategy call and we&apos;ll map your highest-ROI AI opportunities.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-[#00D4FF] text-[#050816] font-semibold px-6 py-3 text-sm hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-95 transition-all"
              >
                Book a Free Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>

      <FinalCTASection />
    </>
  );
}
