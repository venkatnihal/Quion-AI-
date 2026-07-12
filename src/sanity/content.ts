import "server-only";
import { supabaseSelect } from "@/lib/supabase";
import { blogPosts as localPosts } from "@/data/blog";
import { portfolio as localPortfolio } from "@/data/portfolio";
import type { Post, PortfolioProject } from "@/types";

/* ─────────────────────────────────────────────────────────────
 * Content layer.
 *
 * Portfolio  → Supabase (table: projects), with automatic fallback to the
 *              local sample data if Supabase isn't configured or is empty.
 * Blog       → local data files (src/data/blog.ts) — edit there.
 *
 * (Kept at this path so page imports don't change. Sanity has been retired.)
 * ───────────────────────────────────────────────────────────── */

/* ── Blog (local) ── */
export async function getAllPosts(): Promise<Post[]> {
  return localPosts;
}
export async function getPostSlugs(): Promise<string[]> {
  return localPosts.map((p) => p.slug);
}
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return localPosts.find((p) => p.slug === slug) ?? null;
}

/* ── Portfolio (Supabase) ── */
interface ProjectRow {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[] | null;
  description: string;
  technologies: string[] | null;
  result: string;
  live_url: string | null;
  image: string | null;
  year: string | null;
  featured: boolean | null;
  testimonial: { quote?: string; author?: string; role?: string } | null;
}

function mapRow(r: ProjectRow): PortfolioProject {
  return {
    slug: r.slug,
    title: r.title,
    client: r.client,
    industry: r.industry,
    services: r.services ?? [],
    description: r.description,
    technologies: r.technologies ?? [],
    result: r.result,
    liveUrl: r.live_url ?? undefined,
    image: r.image ?? undefined,
    year: r.year ?? undefined,
    featured: r.featured ?? undefined,
    testimonial:
      r.testimonial && r.testimonial.quote
        ? {
            quote: r.testimonial.quote,
            author: r.testimonial.author ?? "",
            role: r.testimonial.role ?? "",
          }
        : undefined,
  };
}

export async function getAllProjects(): Promise<PortfolioProject[]> {
  const rows = await supabaseSelect<ProjectRow>(
    "projects?select=*&order=featured.desc,order_rank.asc.nullslast"
  );
  if (rows && rows.length) return rows.map(mapRow);
  return localPortfolio;
}

export async function getProjectIndustries(): Promise<string[]> {
  const projects = await getAllProjects();
  return Array.from(new Set(projects.map((p) => p.industry))).sort();
}
