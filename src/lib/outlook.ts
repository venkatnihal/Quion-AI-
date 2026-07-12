import "server-only";

const TENANT = process.env.MICROSOFT_TENANT_ID;
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;
const CALENDAR_USER = process.env.MICROSOFT_CALENDAR_USER ?? process.env.SUPER_ADMIN_EMAIL ?? "";

export const isOutlookConfigured = Boolean(TENANT && CLIENT_ID && CLIENT_SECRET);

/** Acquire an app-only Graph token via client-credentials. */
export async function getAppToken(): Promise<{ token?: string; error?: string }> {
  if (!isOutlookConfigured) return { error: "Microsoft Graph is not configured." };
  try {
    const res = await fetch(`https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error_description || "Token request failed." };
    return { token: data.access_token };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Token request failed." };
  }
}

export interface CalendarEventInput {
  subject: string;
  body?: string;
  start: string; // ISO
  end: string; // ISO
  attendeeEmail?: string;
  attendeeName?: string;
}

/** Create an event on the configured user's Outlook calendar (app-only). */
export async function createCalendarEvent(
  input: CalendarEventInput
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const { token, error } = await getAppToken();
  if (!token) return { ok: false, error };
  if (!CALENDAR_USER) return { ok: false, error: "Set MICROSOFT_CALENDAR_USER to the mailbox to book into." };

  try {
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(CALENDAR_USER)}/events`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: input.subject,
          body: { contentType: "HTML", content: input.body ?? "" },
          start: { dateTime: input.start, timeZone: "UTC" },
          end: { dateTime: input.end, timeZone: "UTC" },
          attendees: input.attendeeEmail
            ? [{ emailAddress: { address: input.attendeeEmail, name: input.attendeeName }, type: "required" }]
            : [],
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error?.message || "Event creation failed." };
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Event creation failed." };
  }
}
