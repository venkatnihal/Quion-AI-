import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

interface ChatMsg { role: "user" | "assistant"; content: string }

const FALLBACK_SYSTEM =
  "You are QuionAi's AI assistant. QuionAi is an AI transformation company that helps businesses automate operations, generate leads and scale. Be concise, helpful and focused on business value. Guide qualified visitors to book a strategy call at /book.";

/**
 * AI assistant endpoint. Pulls the live system prompt + published knowledge
 * from Supabase (edited in the CMS → AI Agent) and answers via Google Gemini.
 * Degrades to a helpful canned reply if the model isn't configured.
 */
export async function POST(request: NextRequest) {
  let body: { messages?: ChatMsg[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const messages = (body.messages ?? []).slice(-12);
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  // Load prompt + knowledge (best effort).
  let systemPrompt = FALLBACK_SYSTEM;
  let knowledge = "";
  let model = DEFAULT_MODEL;
  const admin = createAdminClient();
  if (admin) {
    const [{ data: sys }, { data: kn }, { data: cfg }] = await Promise.all([
      admin.from("ai_prompts").select("content").eq("key", "system").maybeSingle(),
      admin.from("ai_knowledge").select("title,body,category").eq("status", "published").limit(40),
      admin.from("content").select("data").eq("key", "settings.ai").maybeSingle(),
    ]);
    if (sys?.content) systemPrompt = sys.content;
    if (kn?.length) knowledge = kn.map((k) => `## ${k.category} — ${k.title}\n${k.body}`).join("\n\n");
    if (cfg?.data?.model) model = cfg.data.model;
  }

  if (!GEMINI_KEY) {
    return NextResponse.json({
      reply:
        "Thanks for reaching out! I'm the QuionAi assistant. Our team can show you exactly how AI automation could help your business — the fastest way is to book a free strategy call at /book, or share your email and we'll follow up.",
    });
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const systemInstruction = {
    parts: [
      {
        text: `${systemPrompt}\n\n${knowledge ? `Use ONLY this knowledge base to answer factual questions about QuionAi:\n${knowledge}` : ""}`.slice(0, 30000),
      },
    ],
  };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction,
          contents: contents.length ? contents : [{ role: "user", parts: [{ text: lastUser || "Hello" }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 800 },
        }),
      }
    );
    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ??
      "I'm having trouble responding right now — please try again, or book a call at /book.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "I'm having trouble connecting right now. Please try again shortly, or book a strategy call at /book.",
    });
  }
}

export const runtime = "nodejs";
