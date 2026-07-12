export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quionai.com";
export const SITE_NAME = "QuionAi";
export const SITE_TAGLINE = "Think Bigger. Scale Smarter.";
export const SITE_DESCRIPTION =
  "QuionAi is a specialist AI automation team helping small and medium businesses automate operations, generate leads, and scale efficiently — serving US, UK, Australia, Canada, and Europe.";

/* ─────────────────────────────────────────────────────────────
 * MICROSOFT BOOKINGS — CONFIGURE YOUR BOOKING LINK HERE
 * Paste your Microsoft Bookings page URL below, or (preferred) set
 * NEXT_PUBLIC_BOOKING_URL in .env.local / your host's env vars.
 * Example: https://outlook.office365.com/owa/calendar/QuionAi@yourdomain.com/bookings/
 * This single value powers every "Book", "Schedule", and "Talk to an Expert"
 * CTA, the modal scheduler, and the embedded inline scheduler site-wide.
 * Until it's a real URL, booking CTAs fall back to a WhatsApp prompt.
 * ───────────────────────────────────────────────────────────── */
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://outlook.office.com/bookwithme/user/d3b16b7993a246e59d2df1b48ae17905@quionai.com/meetingtype/AU_rAydDOkCecqnVYwUG0Q2?anonymous&ismsaljsauthenabled&ep=mlink";

/* Microsoft "Book with me" personal links block iframe embedding; classic
 * Bookings business pages (/owa/calendar/.../bookings/) allow it. We auto-detect
 * so the scheduler embeds inline when possible and opens in a new tab otherwise. */
export const BOOKING_EMBEDDABLE =
  BOOKING_URL.includes("/owa/calendar/") && BOOKING_URL.includes("/bookings");

/* ─────────────────────────────────────────────────────────────
 * CONTACT FORM ENDPOINT
 * Self-hosted PHP mailer that ships in /public/contact.php and runs on
 * Hostinger — no third-party service, no signup, no limits. Override with
 * NEXT_PUBLIC_FORM_ENDPOINT if you host the handler elsewhere.
 * ───────────────────────────────────────────────────────────── */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "/contact.php";

/* ── Contact details ── */
export const CONTACT_EMAIL = "services@quionai.com";

// WhatsApp — digits only for the wa.me link, formatted for display
export const WHATSAPP_NUMBER = "918897244774";
export const WHATSAPP_DISPLAY = "+91 88972 44774";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
// Pre-filled WhatsApp message (URL-encoded) to reduce friction on first contact
export const WHATSAPP_PREFILL =
  "Hi QuionAi, I'd like to learn how AI automation could help my business.";
export const WHATSAPP_LINK_PREFILLED = `${WHATSAPP_LINK}?text=${encodeURIComponent(
  WHATSAPP_PREFILL
)}`;

/* ── Social ── */
export const LINKEDIN_URL = "http://www.linkedin.com/in/quionai-automations";
export const INSTAGRAM_URL = "https://www.instagram.com/quionai.automations";
export const WEBSITE_URL = "https://quionai.com";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const SERVICE_SLUGS = [
  "ai-automation",
  "ai-agents",
  "ai-chatbots",
  "ai-calling",
  "web-development",
  "seo",
  "social-media",
  "copywriting",
];

export const MARKETS = ["United States", "United Kingdom", "Australia", "Canada", "Europe"];
