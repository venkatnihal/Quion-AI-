import type { Capability } from "@/lib/rbac";

export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide icon name
  cap?: Capability; // capability required to see it
  group?: string;
}

/** Sidebar navigation for the CMS (order follows the spec). */
export const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard", group: "Overview" },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3", cap: "data.view", group: "Overview" },

  { label: "Pages", href: "/admin/pages", icon: "FileText", cap: "content.edit", group: "Content" },
  { label: "Services", href: "/admin/collections/services", icon: "Wrench", cap: "content.edit", group: "Content" },
  { label: "Portfolio", href: "/admin/collections/portfolio", icon: "FolderKanban", cap: "content.edit", group: "Content" },
  { label: "Testimonials", href: "/admin/collections/testimonials", icon: "Quote", cap: "content.edit", group: "Content" },
  { label: "FAQ", href: "/admin/collections/faqs", icon: "HelpCircle", cap: "content.edit", group: "Content" },
  { label: "Media Library", href: "/admin/media", icon: "Image", cap: "content.edit", group: "Content" },
  { label: "SEO", href: "/admin/seo", icon: "Search", cap: "content.edit", group: "Content" },

  { label: "AI Agent", href: "/admin/ai", icon: "Bot", cap: "ai.configure", group: "Engagement" },
  { label: "Leads", href: "/admin/leads", icon: "Users", cap: "data.view", group: "Engagement" },
  { label: "Bookings", href: "/admin/bookings", icon: "CalendarCheck", cap: "data.view", group: "Engagement" },
  { label: "Chat History", href: "/admin/chat", icon: "MessagesSquare", cap: "data.view", group: "Engagement" },

  { label: "Settings", href: "/admin/settings", icon: "Settings", cap: "settings.manage", group: "System" },
  { label: "Users", href: "/admin/users", icon: "Shield", cap: "users.manage", group: "System" },
  { label: "Logs", href: "/admin/logs", icon: "ScrollText", cap: "users.manage", group: "System" },
];
