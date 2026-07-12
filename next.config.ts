import type { NextConfig } from "next";

/**
 * QuionAi runs in two modes:
 *
 *  1. SERVER (default) — full Next.js server app. Enables the Super Admin CMS,
 *     API routes, Supabase server auth, Resend, Outlook and Cloudinary. Run with
 *     `npm run dev` / `npm run build && npm start` on port 8012.
 *
 *  2. STATIC EXPORT — marketing pages only, output to ./out for static hosts
 *     (e.g. Hostinger). Enabled with `npm run export` (STATIC_EXPORT=true).
 *     The /admin area and /api routes are excluded from a static build.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  // Static export cannot run the Image Optimization server; keep images as-is.
  // In server mode Cloudinary + remote images are allowed.
  images: isStaticExport
    ? { unoptimized: true }
    : {
        remotePatterns: [
          { protocol: "https", hostname: "res.cloudinary.com" },
          { protocol: "https", hostname: "**.supabase.co" },
        ],
      },
  // Emit /path/index.html so static hosts resolve clean URLs without config.
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
} satisfies NextConfig;

export default nextConfig;
