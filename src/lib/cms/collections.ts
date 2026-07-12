/**
 * Config-driven collection managers. One generic CRUD screen serves every
 * collection listed here, so adding a manageable content type = adding config.
 */
export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "tags"
  | "list";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  help?: string;
  required?: boolean;
}

export interface CollectionDef {
  key: string; // route param, e.g. "services"
  table: string; // supabase table
  label: string; // plural label
  singular: string;
  icon: string; // lucide icon name
  titleField: string; // which field to show as row title
  subtitleField?: string;
  order: string; // default order column
  ascending?: boolean;
  fields: FieldDef[];
}

const STATUS: FieldDef = {
  name: "status",
  label: "Status",
  type: "select",
  options: ["published", "draft"],
};
const SORT: FieldDef = { name: "sort_order", label: "Sort order", type: "number" };

export const COLLECTIONS: Record<string, CollectionDef> = {
  services: {
    key: "services",
    table: "services",
    label: "Services",
    singular: "Service",
    icon: "Wrench",
    titleField: "title",
    subtitleField: "description",
    order: "sort_order",
    ascending: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", placeholder: "ai-automation" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon (lucide name)", type: "text", placeholder: "Bot" },
      { name: "features", label: "Features", type: "list", help: "One per line" },
      { name: "image", label: "Image URL", type: "image" },
      { name: "cta", label: "CTA label", type: "text" },
      SORT,
      STATUS,
    ],
  },
  portfolio: {
    key: "portfolio",
    table: "projects",
    label: "Portfolio",
    singular: "Project",
    icon: "FolderKanban",
    titleField: "title",
    subtitleField: "category",
    order: "sort_order",
    ascending: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "images", label: "Images", type: "list", help: "One image URL per line" },
      { name: "tech", label: "Tech stack", type: "tags" },
      { name: "results", label: "Results", type: "list", help: "One per line" },
      { name: "client", label: "Client", type: "text" },
      { name: "completed", label: "Completion date", type: "text" },
      { name: "url", label: "Project URL", type: "text" },
      { name: "featured", label: "Featured", type: "boolean" },
      SORT,
      STATUS,
    ],
  },
  testimonials: {
    key: "testimonials",
    table: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    icon: "Quote",
    titleField: "name",
    subtitleField: "company",
    order: "sort_order",
    ascending: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "avatar", label: "Photo URL", type: "image" },
      { name: "logo", label: "Company logo URL", type: "image" },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "video", label: "Video URL", type: "text" },
      { name: "featured", label: "Featured", type: "boolean" },
      SORT,
      STATUS,
    ],
  },
  faqs: {
    key: "faqs",
    table: "faqs",
    label: "FAQs",
    singular: "FAQ",
    icon: "HelpCircle",
    titleField: "question",
    subtitleField: "category",
    order: "sort_order",
    ascending: true,
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text" },
      SORT,
      STATUS,
    ],
  },
  knowledge: {
    key: "knowledge",
    table: "ai_knowledge",
    label: "AI Knowledge",
    singular: "Knowledge entry",
    icon: "BrainCircuit",
    titleField: "title",
    subtitleField: "category",
    order: "updated_at",
    fields: [
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          "Company",
          "Services",
          "Pricing",
          "Portfolio",
          "FAQs",
          "Case Studies",
          "Processes",
          "Blogs",
          "Policies",
          "Documents",
        ],
      },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "body", label: "Content", type: "textarea", required: true },
      STATUS,
    ],
  },
};

export const COLLECTION_LIST = Object.values(COLLECTIONS);

/** Parse a form value into the correct type for a field. */
export function coerceField(field: FieldDef, raw: FormDataEntryValue | null): unknown {
  const val = typeof raw === "string" ? raw : "";
  switch (field.type) {
    case "number":
      return val === "" ? null : Number(val);
    case "boolean":
      return val === "on" || val === "true";
    case "tags":
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    case "list":
      return val
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    default:
      return val;
  }
}
