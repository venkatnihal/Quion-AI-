import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset, isSanityConfigured } from "./env";

/** A Sanity image reference (asset ref or already-resolved object). */
export type SanityImageSource = { asset?: { _ref?: string; url?: string }; _ref?: string } | string;

const builder = isSanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

/** Resolve a Sanity image reference to a CDN URL (or null if unavailable). */
export function urlForImage(source: SanityImageSource | undefined, width = 1200): string | null {
  if (!builder || !source) return null;
  try {
    return builder.image(source).width(width).fit("max").auto("format").url();
  } catch {
    return null;
  }
}
