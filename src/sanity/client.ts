import { createClient, type SanityClient } from "@sanity/client";
import { projectId, dataset, apiVersion, isSanityConfigured } from "./env";

/**
 * Build-time read-only Sanity client. Null when Sanity isn't configured yet,
 * which triggers the local fallback in src/sanity/content.ts.
 * `useCdn: true` serves fast, cached content — perfect for a static build.
 */
// Optional read token — only needed if your dataset is PRIVATE. Public
// datasets (the simplest choice for a marketing site) need no token.
const token = process.env.SANITY_API_TOKEN || undefined;

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Build-time fetch reads the LIVE API (not the cached CDN) so content
      // published moments ago always appears on the next rebuild.
      useCdn: false,
      perspective: "published",
      token,
    })
  : null;
