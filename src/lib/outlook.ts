import "server-only";

const TENANT = process.env.MICROSOFT_TENANT_ID;
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;
const CALENDAR_USER = process.env.MICROSOFT_CALENDAR_USER ?? "";

export const isOutlookConfigured = Boolean(TENANT && CLIENT_ID && CLIENT_SECRET);

/**
 * Whether live Outlook calendar sync should be attempted. Requires the Graph
 * app credentials AND a real mailbox to book into (a personal Gmail address is
 * not a valid Graph user, so we require a non-gmail CALENDAR_USER). When false,
 * the booking system runs fully on Supabase + email and simply skips calendar
 * sync — the "toggle" lights up automatically once this is configured.
 */
export const isOutlookReady = Boolean(
  isOutlookConfigured && CALENDAR_USER && !/@gmail\.|@googlemail\./i.test(CALENDAR_USER)
);

export const calendarUser = CALENDAR_USER;

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

/** Update an existing Outlook event's time (used on reschedule). */
export async function updateCalendarEvent(
  eventId: string,
  input: { start: string; end: string; subject?: string }
): Promise<{ ok: boolean; error?: string }> {
  const { token, error } = await getAppToken();
  if (!token) return { ok: false, error };
  if (!CALENDAR_USER) return { ok: false, error: "No calendar mailbox configured." };
  try {
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(CALENDAR_USER)}/events/${eventId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(input.subject ? { subject: input.subject } : {}),
          start: { dateTime: input.start, timeZone: "UTC" },
          end: { dateTime: input.end, timeZone: "UTC" },
        }),
      }
    );
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data.error?.message || "Event update failed." };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Event update failed." };
  }
}

/** Delete an Outlook event (used on cancel/reject). */
export async function deleteCalendarEvent(eventId: string): Promise<{ ok: boolean; error?: string }> {
  const { token, error } = await getAppToken();
  if (!token) return { ok: false, error };
  if (!CALENDAR_USER) return { ok: false, error: "No calendar mailbox configured." };
  try {
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(CALENDAR_USER)}/events/${eventId}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok && res.status !== 404) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data.error?.message || "Event delete failed." };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Event delete failed." };
  }
}

/**
 * Read busy intervals from the booking mailbox within a window, so we never
 * offer a slot that conflicts with the owner's real Outlook calendar.
 * Returns [] (fail-open) if unavailable so booking still works.
 */
export async function getBusyIntervals(
  startISO: string,
  endISO: string
): Promise<{ start: number; end: number }[]> {
  if (!isOutlookReady) return [];
  const { token } = await getAppToken();
  if (!token) return [];
  try {
    const url =
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(CALENDAR_USER)}/calendarView` +
      `?startDateTime=${encodeURIComponent(startISO)}&endDateTime=${encodeURIComponent(endISO)}` +
      `&$select=start,end,showAs&$top=200`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Prefer: 'outlook.timezone="UTC"' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.value ?? [])
      .filter((e: { showAs?: string }) => e.showAs !== "free")
      .map((e: { start: { dateTime: string }; end: { dateTime: string } }) => ({
        start: new Date(e.start.dateTime + "Z").getTime(),
        end: new Date(e.end.dateTime + "Z").getTime(),
      }));
  } catch {
    return [];
  }
}
