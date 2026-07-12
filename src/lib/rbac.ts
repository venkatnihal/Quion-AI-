/**
 * Role-Based Access Control definitions — shared by client and server.
 * Three roles per the CMS spec: super_admin, editor, viewer.
 */
export type Role = "super_admin" | "editor" | "viewer";

export const ROLES: Role[] = ["super_admin", "editor", "viewer"];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  editor: "Editor",
  viewer: "Viewer",
};

/** Capabilities gated across the CMS. */
export type Capability =
  | "content.edit" // edit pages, sections, services, portfolio, testimonials, faq, media, seo
  | "settings.manage" // global settings, theme, navigation
  | "apikeys.manage" // API keys / integrations
  | "ai.configure" // AI models, prompts, knowledge
  | "users.manage" // users + permissions
  | "data.view" // leads, bookings, chat, analytics
  | "data.export"; // export csv/excel

const MATRIX: Record<Role, Capability[]> = {
  super_admin: [
    "content.edit",
    "settings.manage",
    "apikeys.manage",
    "ai.configure",
    "users.manage",
    "data.view",
    "data.export",
  ],
  editor: ["content.edit", "data.view", "data.export"],
  viewer: ["data.view"],
};

export function can(role: Role | null | undefined, cap: Capability): boolean {
  if (!role) return false;
  return MATRIX[role]?.includes(cap) ?? false;
}

export function isAdminRole(role: Role | null | undefined): boolean {
  return role === "super_admin" || role === "editor" || role === "viewer";
}
