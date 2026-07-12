import type { Post } from "@/types";

/* ─────────────────────────────────────────────────────────────
 * Blog fallback content.
 *
 * LITE MODE: posts live here as typed data with a plain-text body.
 * Once Sanity is connected and you publish posts there, the site uses
 * Sanity automatically (rich text, images, authors) — this file simply
 * keeps the blog populated in the meantime. Shape matches the Sanity
 * schema so nothing needs to change when you switch over.
 * ───────────────────────────────────────────────────────────── */

export const blogPosts: Post[] = [
  {
    slug: "ai-automation-guide-2025",
    title: "The Complete Guide to AI Automation for Business in 2025",
    excerpt:
      "How to identify, prioritise, and implement AI automation across your business operations to drive measurable ROI in 30 days.",
    category: "AI Automation",
    readTime: 12,
    published: "May 2025",
    bodyPlain: `AI automation is no longer a competitive edge reserved for enterprise — it's the new baseline for any business that wants to move faster with fewer people. But most teams start in the wrong place: they chase a shiny tool instead of a painful process.

Start by mapping where time actually leaks. List every repetitive, rules-based task your team touches weekly — data entry, follow-ups, reporting, scheduling, invoice matching. Score each one by hours spent and error rate. Your best first automation is almost always the boring, high-volume task nobody wants to own.

Next, pick a system of record and connect it. The ROI in automation comes from removing hand-offs between tools, not from any single feature. A lead that flows from form to CRM to calendar to follow-up without a human touching it is worth more than the fanciest chatbot.

Finally, measure before and after. Track hours saved, response time, and error rate for 30 days. When you can point to a number, expanding automation across the business stops being a debate and becomes an obvious decision.`,
  },
  {
    slug: "ai-agents-vs-chatbots",
    title: "AI Agents vs Chatbots: Which Does Your Business Actually Need?",
    excerpt:
      "A clear breakdown of the difference between AI agents and chatbots — and which one will deliver the highest ROI for your specific use case.",
    category: "AI Strategy",
    readTime: 8,
    published: "April 2025",
    bodyPlain: `The words "chatbot" and "AI agent" get used interchangeably, but they solve very different problems — and confusing them wastes budget.

A chatbot answers. It responds to questions, follows a script, and hands off when things get complex. It's ideal for support deflection, FAQs, and lead capture on your website. If your goal is "answer common questions instantly, 24/7," a well-trained chatbot is the right, affordable tool.

An AI agent acts. It can research, make decisions, call other tools, and complete multi-step tasks with a goal in mind — qualifying a lead, reconciling an invoice, or drafting and sending a follow-up sequence. Agents shine where the work isn't just answering, but doing.

The practical rule: if the value is in conversation, start with a chatbot. If the value is in completed work, invest in an agent. Many businesses end up running both — a chatbot at the front door and agents working quietly in the back office.`,
  },
  {
    slug: "how-ai-calling-works",
    title: "How AI Voice Calling is Replacing Inbound Sales Teams",
    excerpt:
      "AI calling assistants can answer, qualify, and book appointments 24/7 at a fraction of the cost of human SDRs. Here's exactly how they work.",
    category: "AI Calling",
    readTime: 10,
    published: "March 2025",
    bodyPlain: `Voice AI has crossed the threshold where callers often can't tell they're speaking to a machine — and for booking-driven businesses, that changes the economics of the front desk entirely.

Under the hood, an AI calling assistant chains three systems: speech-to-text to hear the caller, a language model to understand and respond, and text-to-speech to reply in a natural voice. The magic is in the orchestration — handling interruptions, pauses, and objections the way a trained rep would.

The business case is simple. A human SDR handles one call at a time, works fixed hours, and costs thousands per month. A voice agent handles unlimited concurrent calls, never sleeps, and books straight into your calendar. For after-hours enquiries alone, most businesses were quietly losing every one of those leads.

Start narrow: point the agent at one clear job — answer, qualify, and book. Nail that, measure booked appointments, then expand to outbound follow-ups once you trust the results.`,
  },
  {
    slug: "roi-ai-automation",
    title: "How to Measure ROI from AI Automation (With Real Benchmarks)",
    excerpt:
      "The metrics that matter, the benchmarks from 200+ deployments, and how to build a business case for AI automation investment.",
    category: "Strategy",
    readTime: 9,
    published: "February 2025",
    bodyPlain: `Every automation project should be able to answer one question: what did it return? If you can't measure it, you can't defend the budget — or scale it.

Three metrics carry most of the weight. Hours reclaimed (multiply by loaded labour cost), response time (faster replies convert measurably better), and error rate (mistakes have a real, if hidden, cost). Capture a baseline for each before you automate anything.

Typical benchmarks we see: 60–90% reduction in manual handling time on high-volume tasks, response times dropping from hours to seconds, and near-zero error rates on rules-based work. The payback period on a well-scoped automation is usually measured in weeks, not months.

Build the business case as a simple before/after table. Decision-makers don't need to understand the technology — they need to see the number. When the number is obvious, approval is easy.`,
  },
  {
    slug: "ai-transformation-small-business",
    title: "AI Transformation for Small Businesses: Where to Start",
    excerpt:
      "You don't need a $1M AI budget. Here's how small businesses with under 50 employees are using AI to compete with enterprise companies.",
    category: "AI Strategy",
    readTime: 7,
    published: "January 2025",
    bodyPlain: `The narrative that AI belongs to big companies with big budgets is backwards. Small businesses are often the fastest to benefit, because they have fewer layers between "let's try this" and "it's live."

Begin with one workflow that touches revenue: lead response. Most small businesses lose deals simply by replying slowly. An automated intake that captures, qualifies, and follows up within seconds often pays for an entire AI program on its own.

From there, expand into the back office — automated reporting, document processing, and scheduling. These aren't glamorous, but they hand hours back to the owner, which is the scarcest resource in any small business.

The mindset that wins is incremental. Ship one automation, measure it, reinvest the time saved into the next. Within a quarter, a five-person team can operate with the leverage of a much larger one.`,
  },
  {
    slug: "best-ai-tools-ecommerce",
    title: "The Best AI Tools for E-commerce Businesses in 2025",
    excerpt:
      "From AI chatbots to automated inventory management — the tools that are actually driving revenue for e-commerce brands right now.",
    category: "E-commerce",
    readTime: 11,
    published: "December 2024",
    bodyPlain: `E-commerce is where AI pays back fastest, because every improvement compounds across thousands of orders. But the tool landscape is noisy — here's where the real returns are.

Support automation comes first. An AI assistant trained on your catalogue and policies can resolve the majority of "where's my order" and "which size" questions instantly, freeing your team for the conversations that actually need a human.

Merchandising and personalisation come next. AI-driven product recommendations and dynamic bundles lift average order value without any change to your traffic — you're simply making better use of the visitors you already have.

Behind the scenes, automation handles inventory alerts, review requests, and abandoned-cart recovery. None of these are exciting individually, but together they recover revenue that was previously slipping through the cracks every single day.`,
  },
];
