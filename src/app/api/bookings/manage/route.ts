import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyBookingToken, rescheduleBooking, cancelBooking } from "@/lib/booking/service";
import { getBookingConfig } from "@/lib/booking/config";

/** GET /api/bookings/manage?token=... — fetch a booking for the manage page. */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const id = verifyBookingToken(token);
  if (!id) return NextResponse.json({ error: "Invalid or expired link." }, { status: 403 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Unavailable." }, { status: 500 });

  const { data } = await admin
    .from("bookings")
    .select("id,name,email,topic,starts_at,status")
    .eq("id", id)
    .maybeSingle();
  if (!data) return NextResponse.json({ error: "Booking not found." }, { status: 404 });

  const config = await getBookingConfig();
  return NextResponse.json({ booking: data, timezone: config.timezone, meetingName: config.meetingName });
}

/** POST /api/bookings/manage — { token, action: "cancel" | "reschedule", startsAt? } */
export async function POST(request: NextRequest) {
  let body: { token?: string; action?: string; startsAt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const id = verifyBookingToken(body.token ?? "");
  if (!id) return NextResponse.json({ ok: false, error: "Invalid or expired link." }, { status: 403 });

  if (body.action === "cancel") {
    const r = await cancelBooking(id);
    return NextResponse.json(r.ok ? { ok: true } : { ok: false, error: r.error }, { status: r.ok ? 200 : 400 });
  }
  if (body.action === "reschedule") {
    if (!body.startsAt || isNaN(new Date(body.startsAt).getTime())) {
      return NextResponse.json({ ok: false, error: "Pick a new time." }, { status: 400 });
    }
    const r = await rescheduleBooking(id, body.startsAt);
    return NextResponse.json(r.ok ? { ok: true } : { ok: false, error: r.error }, { status: r.ok ? 200 : 400 });
  }
  return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 400 });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
