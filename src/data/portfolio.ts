import type { PortfolioProject } from "@/types";

/* ─────────────────────────────────────────────────────────────
 * Work portfolio.
 *
 * LITE MODE: projects live here as typed data. The shape matches the
 * planned Sanity schema exactly, so migrating to the CMS later is a
 * drop-in swap — no component changes required.
 *
 * To add a project now: copy a block, change the fields, and (optionally)
 * drop a cover image in /public/images/portfolio/ and set `image`.
 * Without an image, a branded gradient cover is shown automatically.
 * ───────────────────────────────────────────────────────────── */

export const portfolio: PortfolioProject[] = [
  {
    slug: "elara-commerce",
    title: "AI Support Suite for a DTC Retailer",
    client: "Elara Commerce",
    industry: "E-commerce",
    services: ["AI Chatbots", "AI Automation"],
    description:
      "We deployed a fully trained support chatbot and order-automation layer that resolves 70% of tickets without a human, syncing every conversation back to their helpdesk and CRM.",
    technologies: ["OpenAI", "Next.js", "Zendesk API", "Shopify"],
    result: "70% of support tickets auto-resolved; response time down from 8h to under 2 minutes.",
    liveUrl: "https://example.com",
    year: "2025",
    featured: true,
    testimonial: {
      quote:
        "Our support inbox used to be chaos. Now the AI handles the bulk of it and our team only touches the tricky stuff.",
      author: "Sarah Chen",
      role: "Head of CX, Elara Commerce",
    },
  },
  {
    slug: "meridian-property",
    title: "Voice AI Booking Assistant",
    client: "Meridian Property",
    industry: "Real Estate",
    services: ["AI Calling Assistants", "AI Automation"],
    description:
      "A voice agent that answers inbound enquiries 24/7, qualifies leads, and books viewings straight into agents' calendars — capturing after-hours demand that was previously lost.",
    technologies: ["Vapi", "Twilio", "Microsoft Bookings", "n8n"],
    result: "+250% booked viewings and zero missed after-hours calls.",
    liveUrl: "https://example.com",
    year: "2025",
    featured: true,
    testimonial: {
      quote:
        "It books viewings while we sleep. The ROI was obvious within the first month.",
      author: "David Okonkwo",
      role: "Director, Meridian Property",
    },
  },
  {
    slug: "nexascale",
    title: "Conversion-Optimised Marketing Site",
    client: "NexaScale",
    industry: "SaaS",
    services: ["Website Development", "SEO Optimisation", "Copywriting"],
    description:
      "A ground-up rebuild of their marketing site focused on page speed and conversion, paired with a technical SEO overhaul and new positioning copy across every page.",
    technologies: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
    result: "Lighthouse 98, organic traffic +180%, demo requests +64% in 90 days.",
    liveUrl: "https://example.com",
    year: "2024",
    featured: true,
    testimonial: {
      quote: "Fast, beautiful, and it actually converts. Exactly what we needed.",
      author: "Priya Nair",
      role: "CMO, NexaScale",
    },
  },
  {
    slug: "atlas-logistics",
    title: "Operations Automation Platform",
    client: "Atlas Logistics",
    industry: "Logistics",
    services: ["AI Automation", "AI Agents"],
    description:
      "We replaced a tangle of manual spreadsheets with an automated pipeline that ingests orders, assigns routes, and triggers customer notifications — with AI agents handling exceptions.",
    technologies: ["Python", "n8n", "OpenAI", "PostgreSQL"],
    result: "87% less manual data entry and a 5-hour daily time saving for ops staff.",
    year: "2024",
    testimonial: {
      quote: "The team stopped drowning in admin overnight.",
      author: "Marcus Feld",
      role: "COO, Atlas Logistics",
    },
  },
  {
    slug: "brightsmile-dental",
    title: "Lead-Gen Funnel & AI Front Desk",
    client: "BrightSmile Dental",
    industry: "Healthcare",
    services: ["AI Chatbots", "Social Media Marketing"],
    description:
      "A paid-social lead funnel feeding an AI front-desk assistant that answers questions, screens patients, and books appointments — cutting no-shows with automated reminders.",
    technologies: ["Meta Ads", "OpenAI", "Microsoft Bookings", "Zapier"],
    result: "Cost per new patient down 55%; no-shows down 40%.",
    year: "2025",
    testimonial: {
      quote: "We're booked out weeks in advance now. The front-desk AI is a game changer.",
      author: "Dr. Lena Weiss",
      role: "Owner, BrightSmile Dental",
    },
  },
  {
    slug: "vantage-capital",
    title: "Research & Reporting AI Agents",
    client: "Vantage Capital",
    industry: "Finance",
    services: ["AI Agents", "AI Automation"],
    description:
      "Multi-agent research assistants that gather market data, summarise filings, and draft weekly client reports — turning a two-day manual process into minutes of review.",
    technologies: ["OpenAI", "LangChain", "Next.js", "Supabase"],
    result: "Weekly reporting cycle cut from 2 days to 45 minutes.",
    year: "2024",
  },
];

export const portfolioIndustries = Array.from(
  new Set(portfolio.map((p) => p.industry))
).sort();

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolio.find((p) => p.slug === slug);
}
