import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

/**
 * QuionAi content studio.
 *
 * projectId + dataset come from environment variables written by
 * `sanity init` (SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET),
 * or you can hard-code them here after you create the project.
 * Use the SAME project ID in the website's NEXT_PUBLIC_SANITY_PROJECT_ID.
 */
export default defineConfig({
  name: "quionai",
  title: "QuionAi Content",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REPLACE_WITH_PROJECT_ID",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
