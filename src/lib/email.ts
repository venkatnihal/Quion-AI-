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

function fmtWhen(iso: string, tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toUTCString();
  }
}

interface BookingEmailArgs {
  name?: string;
  startsAt: string;
  meetingName: string;
  timezone: string;
  manageUrl?: string;
}

function shell(inner: string): string {
  return `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:auto;color:#0f172a">${inner}
    <p style="margin-top:24px;font-size:12px;color:#94a3b8">QuionAi — Think Bigger. Scale Smarter.</p></div>`;
}

export function bookingConfirmationHtml(a: BookingEmailArgs): string {
  return shell(`
    <h2 style="color:#0f172a">You're booked! 🎉</h2>
    <p>Hi${a.name ? " " + a.name : ""}, your <strong>${a.meetingName}</strong> is confirmed.</p>
    <p style="font-size:16px;background:#f1f5f9;padding:12px 16px;border-radius:10px">📅 <strong>${fmtWhen(a.startsAt, a.timezone)}</strong></p>
    <p>We'll send a calendar invite and meeting link shortly. Looking forward to speaking with you.</p>
    ${a.manageUrl ? `<p style="font-size:13px;color:#64748b">Need to change plans? <a href="${a.manageUrl}" style="color:#2563eb">Reschedule or cancel</a>.</p>` : ""}`);
}

export function bookingRescheduledHtml(a: BookingEmailArgs): string {
  return shell(`
    <h2>Your booking was rescheduled</h2>
    <p>Hi${a.name ? " " + a.name : ""}, your <strong>${a.meetingName}</strong> has a new time:</p>
    <p style="font-size:16px;background:#f1f5f9;padding:12px 16px;border-radius:10px">📅 <strong>${fmtWhen(a.startsAt, a.timezone)}</strong></p>
    ${a.manageUrl ? `<p style="font-size:13px;color:#64748b"><a href="${a.manageUrl}" style="color:#2563eb">Reschedule or cancel</a>.</p>` : ""}`);
}

export function bookingCancelledHtml(a: BookingEmailArgs): string {
  return shell(`
    <h2>Your booking was cancelled</h2>
    <p>Hi${a.name ? " " + a.name : ""}, your <strong>${a.meetingName}</strong> for ${fmtWhen(a.startsAt, a.timezone)} has been cancelled.</p>
    <p>If this was a mistake, you can book a new time any time on our website.</p>`);
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
