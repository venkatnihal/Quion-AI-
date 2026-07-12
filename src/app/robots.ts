import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Statically generated at build time → emitted as /robots.txt in the export.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
