import type { FieldDef } from "@/lib/cms/collections";

/**
 * Structured editors for keyed `content` rows. Each schema maps to a content
 * key and the site reads these values at render time (with local fallback).
 */
export interface ContentSchema {
  key: string;
  title: string;
  description: string;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
}

export const HERO: ContentSchema = {
  key: "home.hero",
  title: "Hero Section",
  description: "The first thing visitors see. Edit the headline, subheadline and call-to-action buttons.",
  fields: [
    { name: "eyebrow", label: "Eyebrow / badge", type: "text" },
    { name: "headline", label: "Headline", type: "text", required: true },
    { name: "highlight", label: "Highlighted word(s)", type: "text", help: "Rendered in the blue→purple gradient." },
    { name: "subheadline", label: "Subheadline", type: "textarea" },
    { name: "primaryCta", label: "Primary button label", type: "text" },
    { name: "primaryHref", label: "Primary button link", type: "text" },
    { name: "secondaryCta", label: "Secondary button label", type: "text" },
    { name: "secondaryHref", label: "Secondary button link", type: "text" },
    { name: "backgroundImage", label: "Background image URL", type: "image" },
  ],
  defaults: {
    eyebrow: "AI Transformation Company",
    headline: "Think Bigger. Scale Smarter.",
    highlight: "Scale Smarter",
    subheadline: "QuionAi helps businesses automate operations, generate leads, and scale with intelligent AI systems.",
    primaryCta: "Book a Free Strategy Call",
    primaryHref: "/book",
    secondaryCta: "See Our Work",
    secondaryHref: "/case-studies",
    backgroundImage: "",
  },
};

export const GLOBAL: ContentSchema = {
  key: "settings.global",
  title: "Global Settings",
  description: "Company details used across the site (footer, contact, schema).",
  fields: [
    { name: "siteName", label: "Website name", type: "text" },
    { name: "tagline", label: "Tagline", type: "text" },
    { name: "contactEmail", label: "Contact email", type: "text" },
    { name: "phone", label: "Phone / WhatsApp display", type: "text" },
    { name: "whatsapp", label: "WhatsApp number (digits only)", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "hours", label: "Working hours", type: "text" },
    { name: "linkedin", label: "LinkedIn URL", type: "text" },
    { name: "instagram", label: "Instagram URL", type: "text" },
  ],
  defaults: {
    siteName: "QuionAi",
    tagline: "Think Bigger. Scale Smarter.",
    contactEmail: "services@quionai.com",
    phone: "+91 88972 44774",
    whatsapp: "918897244774",
    address: "",
    hours: "Mon–Fri, 9am–6pm",
    linkedin: "http://www.linkedin.com/in/quionai-automations",
    instagram: "https://www.instagram.com/quionai.automations",
  },
};

export const SEO: ContentSchema = {
  key: "settings.seo",
  title: "SEO & Analytics",
  description: "Search metadata, social sharing and analytics tags.",
  fields: [
    { name: "metaTitle", label: "Default meta title", type: "text" },
    { name: "metaDescription", label: "Default meta description", type: "textarea" },
    { name: "keywords", label: "Keywords", type: "tags" },
    { name: "ogImage", label: "Open Graph image URL", type: "image" },
    { name: "canonical", label: "Canonical base URL", type: "text" },
    { name: "googleAnalytics", label: "Google Analytics ID", type: "text", placeholder: "G-XXXXXXX" },
    { name: "clarity", label: "Microsoft Clarity ID", type: "text" },
    { name: "facebookPixel", label: "Facebook Pixel ID", type: "text" },
    { name: "robots", label: "Robots directive", type: "text", placeholder: "index, follow" },
  ],
  defaults: {
    metaTitle: "QuionAi — AI Automation for Small & Medium Businesses",
    metaDescription: "QuionAi helps businesses automate operations, generate leads, and scale with intelligent AI systems.",
    keywords: ["AI automation", "AI agents", "AI chatbot", "business automation"],
    ogImage: "",
    canonical: "https://quionai.com",
    googleAnalytics: "",
    clarity: "",
    facebookPixel: "",
    robots: "index, follow",
  },
};

export const THEME: ContentSchema = {
  key: "settings.theme",
  title: "Theme",
  description: "Brand colours and styling. Applied site-wide via CSS variables.",
  fields: [
    { name: "primary", label: "Primary (CTA) colour", type: "text", placeholder: "#00D4FF" },
    { name: "secondary", label: "Secondary colour", type: "text", placeholder: "#6D5DFC" },
    { name: "canvas", label: "Background colour", type: "text", placeholder: "#050816" },
    { name: "radius", label: "Border radius", type: "text", placeholder: "12px" },
  ],
  defaults: { primary: "#00D4FF", secondary: "#6D5DFC", canvas: "#050816", radius: "12px" },
};

export const SCHEMAS: Record<string, ContentSchema> = {
  hero: HERO,
  global: GLOBAL,
  seo: SEO,
  theme: THEME,
};
