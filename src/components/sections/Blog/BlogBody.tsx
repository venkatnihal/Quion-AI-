import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/image";
import type { Post } from "@/types";

/* Renders a blog body from either Sanity Portable Text (rich content, images)
 * or the plain-text fallback stored in src/data/blog.ts. */

const para = "text-[#AEBACD] leading-[1.85] text-[1.0625rem]";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={para}>{children}</p>,
    h2: ({ children }) => (
      <h2
        className="text-2xl font-bold text-white mt-12 mb-4"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white mt-9 mb-3" style={{ fontFamily: "var(--font-display)" }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#00D4FF] pl-5 my-7 text-[#94A3B8] italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#00D4FF] underline underline-offset-2 hover:text-[#6D5DFC] transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 space-y-2.5 pl-1">{children}</ul>,
    number: ({ children }) => <ol className="my-6 space-y-2.5 pl-5 list-decimal">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-[#AEBACD] leading-relaxed">
        <span className="text-[#00D4FF] mt-1.5 shrink-0" aria-hidden>
          ▹
        </span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-[#AEBACD] leading-relaxed pl-1">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value, 1400);
      if (!url) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={value?.alt ?? ""}
          loading="lazy"
          className="rounded-xl my-8 w-full border border-[rgba(255,255,255,0.06)]"
        />
      );
    },
  },
};

export function BlogBody({ post }: { post: Post }) {
  if (Array.isArray(post.body) && post.body.length > 0) {
    return <PortableText value={post.body as never} components={components} />;
  }
  const paragraphs = (post.bodyPlain ?? "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={`${para} mb-6`}>
          {p}
        </p>
      ))}
    </>
  );
}
