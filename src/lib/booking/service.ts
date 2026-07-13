import "server-only";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendEmail,
  bookingConfirmationHtml,
  bookingRescheduledHtml,
  bookingCancelledHtml,
} from "@/lib/email";
import {
  isOutlookReady,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "@/lib/outlook";
import { getBookingConfig, type BookingConfig } from "./config";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8012").replace(/\/$/, "");
const TOKEN_SECRET = process.env.JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "quionai-dev-secret";

export interface BookingRecord {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  topic?: string;
  starts_at?: string;
  ends_at?: string;
  status?: string;
  outlook_event_id?: string;
}

/** Signed, self-verifying token so reschedule/cancel links work without extra DB columns. */
export function signBookingToken(id: string): string {
  const sig = crypto.createHmac("sha256", TOKEN_SECRET).update(id).digest("base64url");
  return `${id}.${sig}`;
}

export function verifyBookingToken(token: string): string | null {
  const [id, sig] = token.split(".");
  if (!id || !sig) return null;
  const expected = crypto.createHmac("sha256", TOKEN_SECRET).update(id).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return id;
}

function manageUrl(id: string): string {
  return `${SITE_URL}/book/manage?token=${encodeURIComponent(signBookingToken(id))}`;
}

interface CreateInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic?: string;
  startsAt: string; // ISO
}

export interface BookingResult {
  ok: boolean;
  error?: string;
  booking?: BookingRecord;
  outlookSynced?: boolean;
}

/** Create a booking: persist → sync Outlook (if ready) → email attendee + team. */
export async function createBooking(input: CreateInput): Promise<BookingResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Booking storage is not configured." };

  const config = await getBookingConfig();
  const start = new Date(input.startsAt);
  if (isNaN(start.getTime())) return { ok: false, error: "Invalid time selected." };
  const end = new Date(start.getTime() + config.slotMinutes * 60_000);

  // Guard against double-booking the exact slot.
  const { data: clash } = await admin
    .from("bookings")
    .select("id")
    .eq("starts_at", start.toISOString())
    .in("status", ["pending", "approved"])
    .maybeSingle();
  if (clash) return { ok: false, error: "That slot was just taken — please pick another time." };

  const { data: booking, error } = await admin
    .from("bookings")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      topic: input.topic,
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
      status: "approved",
    })
    .select()
    .single();
  if (error || !booking) return { ok: false, error: error?.message || "Could not save booking." };

  // Outlook sync (best effort; never blocks the booking).
  let outlookSynced = false;
  if (isOutlookReady) {
    const evt = await createCalendarEvent({
      subject: `${config.meetingName} — ${input.name}`,
      body: bookingBody(input, config),
      start: start.toISOString(),
      end: end.toISOString(),
      attendeeEmail: input.email,
      attendeeName: input.name,
    });
    if (evt.ok && evt.id) {
      outlookSynced = true;
      await admin.from("bookings").update({ outlook_event_id: evt.id }).eq("id", booking.id);
    }
  }

  // Emails (best effort).
  void sendEmail({
    to: input.email,
    subject: `Confirmed: ${config.meetingName}`,
    html: bookingConfirmationHtml({
      name: input.name,
      startsAt: start.toISOString(),
      meetingName: config.meetingName,
      timezone: config.timezone,
      manageUrl: manageUrl(booking.id),
    }),
  });
  void sendEmail({
    subject: `New booking — ${input.name} (${input.email})`,
    html: bookingConfirmationHtml({
      name: input.name,
      startsAt: start.toISOString(),
      meetingName: config.meetingName,
      timezone: config.timezone,
    }),
    replyTo: input.email,
  });

  return { ok: true, booking, outlookSynced };
}

/** Reschedule an existing booking to a new start time. */
export async function rescheduleBooking(id: string, newStartISO: string): Promise<BookingResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Booking storage is not configured." };
  const config = await getBookingConfig();

  const { data: booking } = await admin.from("bookings").select("*").eq("id", id).maybeSingle();
  if (!booking) return { ok: false, error: "Booking not found." };
  if (booking.status === "cancelled") return { ok: false, error: "This booking was cancelled." };

  const start = new Date(newStartISO);
  if (isNaN(start.getTime())) return { ok: false, error: "Invalid time." };
  const end = new Date(start.getTime() + config.slotMinutes * 60_000);

  const { error } = await admin
    .from("bookings")
    .update({ starts_at: start.toISOString(), ends_at: end.toISOString(), status: "approved" })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  if (isOutlookReady && booking.outlook_event_id) {
    await updateCalendarEvent(booking.outlook_event_id, {
      start: start.toISOString(),
      end: end.toISOString(),
    });
  }

  void sendEmail({
    to: booking.email,
    subject: `Updated: ${config.meetingName}`,
    html: bookingRescheduledHtml({
      name: booking.name,
      startsAt: start.toISOString(),
      meetingName: config.meetingName,
      timezone: config.timezone,
      manageUrl: manageUrl(id),
    }),
  });
  return { ok: true, booking: { ...booking, starts_at: start.toISOString() } };
}

/** Cancel a booking: mark cancelled → remove Outlook event → email. */
export async function cancelBooking(id: string): Promise<BookingResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Booking storage is not configured." };
  const config = await getBookingConfig();

  const { data: booking } = await admin.from("bookings").select("*").eq("id", id).maybeSingle();
  if (!booking) return { ok: false, error: "Booking not found." };
  if (booking.status === "cancelled") return { ok: true, booking };

  await admin.from("bookings").update({ status: "cancelled" }).eq("id", id);

  if (isOutlookReady && booking.outlook_event_id) {
    await deleteCalendarEvent(booking.outlook_event_id);
  }

  void sendEmail({
    to: booking.email,
    subject: `Cancelled: ${config.meetingName}`,
    html: bookingCancelledHtml({
      name: booking.name,
      startsAt: booking.starts_at,
      meetingName: config.meetingName,
      timezone: config.timezone,
    }),
  });
  return { ok: true, booking: { ...booking, status: "cancelled" } };
}

function bookingBody(input: CreateInput, config: BookingConfig): string {
  return [
    `${config.meetingName}`,
    input.company ? `Company: ${input.company}` : "",
    input.phone ? `Phone: ${input.phone}` : "",
    input.topic ? `Topic: ${input.topic}` : "",
    `Booked via quionai.com`,
  ]
    .filter(Boolean)
    .join("<br>");
}
