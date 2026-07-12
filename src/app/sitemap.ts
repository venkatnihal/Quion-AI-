import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { services } from "@/data/services";

// Statically generated at build time → emitted as /sitemap.xml in the export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: `${SITE_URL}/`, priority: 1.0 },
    { url: `${SITE_URL}/services/`, priority: 0.9 },
    { url: `${SITE_URL}/portfolio/`, priority: 0.85 },
    { url: `${SITE_URL}/about/`, priority: 0.8 },
    { url: `${SITE_URL}/case-studies/`, priority: 0.8 },
    { url: `${SITE_URL}/blog/`, priority: 0.7 },
    { url: `${SITE_URL}/contact/`, priority: 0.8 },
    { url: `${SITE_URL}/book/`, priority: 0.9 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const servicePages = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const caseStudyPages = ["meridian-property", "nexascale", "elara-commerce"].map((slug) => ({
    url: `${SITE_URL}/case-studies/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages];
}
