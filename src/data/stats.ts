import type { StatItem } from "@/types";

export const proofStats = [
  { label: "Clients Served", value: "200+" },
  { label: "Automations Built", value: "300+" },
  { label: "Client Rating", value: "5.0 ★" },
  { label: "Markets", value: "🇺🇸 🇬🇧 🇦🇺 🇨🇦 🇪🇺" },
  { label: "Avg. Time to ROI", value: "< 30 Days" },
  { label: "Delivered From", value: "India 🇮🇳" },
];

export const resultStats: StatItem[] = [
  {
    value: 60,
    suffix: "%",
    label: "Average Time Saved",
    description: "Hours saved on repetitive tasks per week, across automation clients",
  },
  {
    value: 2,
    suffix: "x",
    label: "Lead Response Speed",
    description: "Faster lead follow-up after AI automation — no more missed opportunities",
  },
  {
    value: 3,
    suffix: " weeks",
    label: "Average Deployment",
    description: "From discovery call to a live, working AI system",
  },
];

export const caseStudyPreviews = [
  {
    client: "Meridian Property Group",
    industry: "Real Estate",
    country: "🇦🇺 Australia",
    result: "Inbound leads now get instant AI responses — no more lost enquiries after hours.",
    metric: "3x",
    metricLabel: "Faster lead response",
    href: "/case-studies/meridian-property",
  },
  {
    client: "NexaScale SaaS",
    industry: "Technology",
    country: "🇬🇧 United Kingdom",
    result: "Customer onboarding went from 3 days of manual emails to a fully automated 20-minute flow.",
    metric: "−72%",
    metricLabel: "Onboarding time",
    href: "/case-studies/nexascale",
  },
  {
    client: "Elara Commerce",
    industry: "E-commerce",
    country: "🇺🇸 United States",
    result: "Automated follow-up sequences and chatbot together brought their first consistent £5K+ months.",
    metric: "68%",
    metricLabel: "More repeat purchases",
    href: "/case-studies/elara-commerce",
  },
];
