import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, leadEmailHtml } from "@/lib/email";

/**
 * Server-side lead capture: stores the lead with the service-role key and
 * fires an email notification via Resend. Used by the website contact/quote/
 * newsletter forms. Honeypot-aware.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, string | undefined>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently succeed so bots learn nothing.
  if (body.botcheck) return NextResponse.json({ ok: true });

  const lead = {
    name: body.name,
    email: body.email,
    company: body.company,
    service: body.service,
    budget: body.budget,
    message: body.message,
    list: body.list,
    subject: body.subject || "Website enquiry",
    source: body.from_name || "Website",
  };

  const admin = createAdminClient();
  let stored = false;
  if (admin) {
    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(lead)) if (v) clean[k] = v;
    const { error } = await admin.from("leads").insert(clean);
    stored = !error;

    // Track a lead event (best effort).
    await admin.from("analytics_events").insert({ type: "lead", meta: { service: lead.service } }).then(() => undefined, () => undefined);
  }

  // Email notification (best effort — doesn't block the response contract).
  void sendEmail({
    subject: `New ${lead.subject} — ${lead.name || lead.email || "Website"}`,
    html: leadEmailHtml(lead),
    replyTo: lead.email,
  });

  if (!admin) {
    // No DB, but we still tried to email — treat as success so the visitor isn't blocked.
    return NextResponse.json({ ok: true, note: "email-only" });
  }
  if (!stored) {
    return NextResponse.json(
      { ok: false, error: "We couldn't save your message. Please email us directly or try WhatsApp." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
