/* ─────────────────────────────────────────────────────────────
 * Sanity connection settings — read from environment variables.
 *
 * Until NEXT_PUBLIC_SANITY_PROJECT_ID is set, the site runs entirely
 * on the local fallback content in src/data/* — so the build never
 * breaks and the site works exactly as it does today. The moment you
 * add a project ID and publish content in Sanity, the site uses it.
 * ───────────────────────────────────────────────────────────── */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

/** True once a real Sanity project has been connected. */
export const isSanityConfigured = Boolean(projectId);
