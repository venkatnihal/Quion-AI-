import { LINKEDIN_URL, INSTAGRAM_URL, CONTACT_EMAIL } from "@/lib/constants";

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const footerLinks = {
  services: [
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "AI Agents", href: "/services/ai-agents" },
    { label: "AI Chatbots", href: "/services/ai-chatbots" },
    { label: "AI Calling", href: "/services/ai-calling" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "SEO Optimisation", href: "/services/seo" },
    { label: "Social Media", href: "/services/social-media" },
    { label: "Copywriting", href: "/services/copywriting" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Get Free Consultation", href: "/book" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const socialLinks = [
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    icon: "Linkedin",
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: "Instagram",
  },
  {
    label: "Email Us",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: "Mail",
  },
];
