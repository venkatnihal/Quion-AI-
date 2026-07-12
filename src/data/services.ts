import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "ai-automation",
    title: "AI Automation",
    shortDescription: "Eliminate repetitive work. Deploy AI systems that operate 24/7 with zero errors.",
    description:
      "We build intelligent automation systems that replace manual, repetitive tasks across your entire operation — from data entry and reporting to customer follow-ups and internal approvals. Our AI systems run around the clock, freeing your team to focus on high-value work.",
    icon: "Zap",
    features: [
      "Workflow automation across all departments",
      "CRM and ERP integration",
      "Automated reporting and analytics",
      "Email and communication automation",
      "Document processing with AI",
      "Custom approval workflows",
    ],
    process: [
      { step: 1, title: "Audit", description: "We map every repetitive process in your business." },
      { step: 2, title: "Design", description: "We architect the automation system and integrations." },
      { step: 3, title: "Deploy", description: "We build, test, and launch in 2–4 weeks." },
      { step: 4, title: "Optimise", description: "We monitor and continuously improve performance." },
    ],
    benefits: [
      { label: "Time Saved", value: "87%" },
      { label: "Error Rate", value: "~0%" },
      { label: "ROI Timeline", value: "30 days" },
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    shortDescription: "Custom AI employees that handle complex tasks, make decisions, and scale your team.",
    description:
      "AI Agents are autonomous systems that can research, analyse, decide, and act — just like a human employee but without limits on hours, capacity, or cost. We build custom agents for sales, operations, customer success, and more.",
    icon: "Bot",
    features: [
      "Autonomous research and analysis agents",
      "Lead qualification and outreach agents",
      "Customer success and onboarding agents",
      "Operations management agents",
      "Multi-agent orchestration systems",
      "Real-time decision-making pipelines",
    ],
    process: [
      { step: 1, title: "Define", description: "Identify the role and scope of the AI agent." },
      { step: 2, title: "Train", description: "Configure the agent with your business knowledge." },
      { step: 3, title: "Test", description: "Extensive testing across real-world scenarios." },
      { step: 4, title: "Launch", description: "Deploy and monitor in your live environment." },
    ],
    benefits: [
      { label: "Capacity Increase", value: "10x" },
      { label: "Cost vs Hiring", value: "−80%" },
      { label: "Availability", value: "24/7" },
    ],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    shortDescription: "Intelligent bots that qualify leads, answer questions, and close deals — 24/7.",
    description:
      "Our AI chatbots are trained on your business, products, and processes. They handle support, qualify leads, and guide prospects through your sales funnel — all without human intervention.",
    icon: "MessageSquare",
    features: [
      "Website and app chat integration",
      "Lead capture and qualification",
      "Multi-language support",
      "CRM sync and lead routing",
      "Handoff to human agents",
      "Analytics and conversation insights",
    ],
    process: [
      { step: 1, title: "Train", description: "Feed the chatbot your products, FAQs, and processes." },
      { step: 2, title: "Configure", description: "Set up flows, triggers, and integrations." },
      { step: 3, title: "Embed", description: "Deploy across your website, app, or WhatsApp." },
      { step: 4, title: "Refine", description: "Continuously improve based on conversation data." },
    ],
    benefits: [
      { label: "Response Time", value: "< 2s" },
      { label: "Leads Captured", value: "+340%" },
      { label: "Support Cost", value: "−60%" },
    ],
  },
  {
    slug: "ai-calling",
    title: "AI Calling Assistants",
    shortDescription: "Voice AI that answers, qualifies, and books appointments — without hiring staff.",
    description:
      "Our AI calling assistants make and receive calls with natural, human-like conversation. They handle inbound enquiries, follow up on leads, and book appointments directly into your calendar — 24 hours a day.",
    icon: "Phone",
    features: [
      "Inbound and outbound calling",
      "Natural language conversation",
      "Calendar booking integration",
      "CRM sync after every call",
      "Call recording and transcription",
      "Sentiment analysis and reporting",
    ],
    process: [
      { step: 1, title: "Script", description: "Design the conversation flows and objection handling." },
      { step: 2, title: "Voice", description: "Select and configure the AI voice model." },
      { step: 3, title: "Integrate", description: "Connect to your phone system and calendar." },
      { step: 4, title: "Launch", description: "Go live with full monitoring and reporting." },
    ],
    benefits: [
      { label: "Booking Rate", value: "+250%" },
      { label: "Call Capacity", value: "Unlimited" },
      { label: "Cost per Call", value: "−90%" },
    ],
  },
  {
    slug: "web-development",
    title: "Website Development",
    shortDescription: "High-performance websites that convert visitors into revenue.",
    description:
      "We build fast, beautiful, conversion-optimised websites using modern technology. Every site we build is designed to rank, load instantly, and turn traffic into revenue — not just impress in Figma.",
    icon: "Globe",
    features: [
      "Next.js and React development",
      "Conversion-rate optimisation",
      "CMS integration",
      "E-commerce solutions",
      "Performance and Core Web Vitals",
      "Ongoing maintenance and support",
    ],
    process: [
      { step: 1, title: "Strategy", description: "Define goals, audience, and conversion targets." },
      { step: 2, title: "Design", description: "Create wireframes and high-fidelity designs." },
      { step: 3, title: "Build", description: "Develop with modern tech, optimised for speed." },
      { step: 4, title: "Launch", description: "Test, deploy, and monitor post-launch." },
    ],
    benefits: [
      { label: "Load Time", value: "< 2s" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Conversion Lift", value: "+180%" },
    ],
  },
  {
    slug: "seo",
    title: "SEO Optimisation",
    shortDescription: "Rank higher, drive qualified traffic, and generate inbound leads at scale.",
    description:
      "We use AI-powered SEO strategies to help your business rank for the keywords your customers actually search. From technical audits to content strategy and link building — we drive sustainable organic growth.",
    icon: "TrendingUp",
    features: [
      "Technical SEO audits and fixes",
      "AI-powered keyword research",
      "Content strategy and creation",
      "Link building campaigns",
      "Local SEO for multiple markets",
      "Monthly reporting and analysis",
    ],
    process: [
      { step: 1, title: "Audit", description: "Full technical and content SEO audit." },
      { step: 2, title: "Strategy", description: "Keyword mapping and content calendar." },
      { step: 3, title: "Execute", description: "On-page, off-page, and technical implementation." },
      { step: 4, title: "Grow", description: "Monthly reporting and iterative optimisation." },
    ],
    benefits: [
      { label: "Organic Traffic", value: "+420%" },
      { label: "Keyword Rankings", value: "Top 3" },
      { label: "Lead Quality", value: "High" },
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    shortDescription: "Meta ads, content, and growth campaigns that convert into revenue.",
    description:
      "We run paid and organic social media strategies across Meta, LinkedIn, and beyond. From ad creative to targeting and attribution — every campaign is engineered for measurable ROI, not vanity metrics.",
    icon: "Share2",
    features: [
      "Meta (Facebook & Instagram) ads",
      "LinkedIn lead generation",
      "Content creation and scheduling",
      "Audience targeting and retargeting",
      "A/B testing and creative optimisation",
      "Attribution and ROI tracking",
    ],
    process: [
      { step: 1, title: "Research", description: "Audience analysis and competitor review." },
      { step: 2, title: "Creative", description: "Ad copy, creative, and landing pages." },
      { step: 3, title: "Launch", description: "Campaign setup, targeting, and launch." },
      { step: 4, title: "Scale", description: "Optimise and scale winning campaigns." },
    ],
    benefits: [
      { label: "ROAS", value: "4.2x avg" },
      { label: "CPL Reduction", value: "−55%" },
      { label: "Reach Growth", value: "+280%" },
    ],
  },
  {
    slug: "copywriting",
    title: "Copywriting",
    shortDescription: "High-converting sales and marketing copy that makes your business more money.",
    description:
      "Words drive revenue. Our copywriting team creates compelling, benefit-focused copy for websites, ads, email sequences, and sales pages — engineered to convert decision-makers in your target market.",
    icon: "PenTool",
    features: [
      "Website copy and landing pages",
      "Email marketing sequences",
      "Sales page copywriting",
      "Ad copy for Meta and Google",
      "LinkedIn thought leadership content",
      "Video scripts and VSLs",
    ],
    process: [
      { step: 1, title: "Research", description: "Deep dive into your market, ICP, and competitors." },
      { step: 2, title: "Strategy", description: "Define messaging hierarchy and copy framework." },
      { step: 3, title: "Write", description: "Craft, review, and refine all copy." },
      { step: 4, title: "Test", description: "A/B test and optimise based on conversion data." },
    ],
    benefits: [
      { label: "Conversion Rate", value: "+210%" },
      { label: "Email Open Rate", value: "+65%" },
      { label: "Revenue per Visitor", value: "+180%" },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
