/* ─────────────────────────────────────────────────────────────
 * Form delivery.
 *
 * Primary: every submission is stored in your Supabase `leads` table
 * (works on any static host, including local preview). You view/search
 * them in the Supabase dashboard → Table editor → leads.
 *
 * Secondary (best-effort): a notification email via the PHP mailer
 * (public/contact.php) — fires on the live Hostinger site so you also get
 * an inbox alert. It's not awaited, so it never blocks the visitor.
 *
 * If Supabase isn't configured, it falls back to the PHP mailer alone.
 * ───────────────────────────────────────────────────────────── */
import { FORM_ENDPOINT } from "@/lib/constants";
import { supabaseInsert, isSupabaseConfigured } from "@/lib/supabase";

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/** Best-effort email notification (live Hostinger only). Never throws. */
function notifyByEmail(payload: Record<string, string | undefined>) {
  try {
    void fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

export async function submitForm(
  fields: Record<string, string | undefined>,
  opts: { subject: string; from_name?: string; botcheck?: string }
): Promise<SubmitResult> {
  // Honeypot tripped → pretend success so bots get no signal.
  if (opts.botcheck) return { ok: true };

  // Preferred path (server mode): the /api/leads route stores the lead with the
  // service-role key AND emails a notification via Resend. Falls through to the
  // static-host paths below if the route isn't available (static export).
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, subject: opts.subject, from_name: opts.from_name, botcheck: opts.botcheck }),
    });
    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (data.ok) return { ok: true };
    }
    // A 404 (static export) or 5xx falls through to the fallbacks below.
  } catch {
    /* server route unavailable — use fallbacks */
  }

  const row = {
    name: fields.name,
    email: fields.email,
    company: fields.company,
    service: fields.service,
    budget: fields.budget,
    message: fields.message,
    list: fields.list,
    subject: opts.subject,
    source: opts.from_name ?? "Website",
  };

  if (isSupabaseConfigured) {
    const stored = await supabaseInsert("leads", row);
    // Fire the email alert too (best-effort; doesn't affect the result).
    notifyByEmail({ ...fields, subject: opts.subject, from_name: opts.from_name, botcheck: opts.botcheck });
    if (stored) return { ok: true };
    return {
      ok: false,
      error:
        "We couldn't save your message right now. Please email us directly or message us on WhatsApp — we'll respond right away.",
    };
  }

  // ── Fallback: PHP mailer only ──
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        subject: opts.subject,
        from_name: opts.from_name ?? "QuionAi Website",
        botcheck: opts.botcheck ?? "",
        ...fields,
      }),
    });
    if (!res.ok) {
      return {
        ok: false,
        error:
          "We couldn't send your message right now. Please email us directly or message us on WhatsApp — we'll respond right away.",
      };
    }
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (data.success) return { ok: true };
    return { ok: false, error: data.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

/** Lightweight, dependency-free email validation. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
