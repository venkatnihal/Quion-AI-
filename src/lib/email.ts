import "server-only";
import { Resend } from "resend";

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM ?? "QuionAi <onboarding@resend.dev>";
const TO = process.env.RESEND_NOTIFY_TO ?? "services@quionai.com";

const resend = KEY ? new Resend(KEY) : null;

export const isEmailConfigured = Boolean(KEY);

interface SendArgs {
  subject: string;
  html: string;
  to?: string;
  replyTo?: string;
}

/** Send a notification email. Never throws — returns ok:false on failure. */
export async function sendEmail({ subject, html, to, replyTo }: SendArgs): Promise<{ ok: boolean; error?: string }> {
  if (!resend) return { ok: false, error: "Resend not configured." };
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: to ?? TO,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "send failed" };
  }
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#64748b;font-size:13px">${label}</td><td style="padding:4px 0;color:#0f172a;font-size:14px">${value}</td></tr>`;
}

export function leadEmailHtml(lead: Record<string, string | undefined>): string {
  return `
  <div style="font-family:system-ui,sans-serif;max-width:560px">
    <h2 style="color:#0f172a">New ${lead.subject || "lead"} — QuionAi</h2>
    <table style="border-collapse:collapse">
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Company", lead.company)}
      ${row("Service", lead.service)}
      ${row("Budget", lead.budget)}
      ${row("Message", lead.message)}
      ${row("Source", lead.source)}
    </table>
  </div>`;
}
