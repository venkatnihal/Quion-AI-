import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getBookingConfig } from "@/lib/booking/config";
import { slotsForDate, bookableDates, type Interval } from "@/lib/booking/availability";
import { getBusyIntervals, isOutlookReady } from "@/lib/outlook";

/**
 * GET /api/bookings/availability
 *   (no params)      -> { dates: ["YYYY-MM-DD", ...], timezone, slotMinutes }
 *   ?date=YYYY-MM-DD -> { slots: [ISO, ...], timezone }
 */
export async function GET(request: NextRequest) {
  const config = await getBookingConfig();
  const now = new Date();
  const date = request.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({
      dates: bookableDates(config, now),
      timezone: config.timezone,
      slotMinutes: config.slotMinutes,
      outlookSync: isOutlookReady,
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  // Busy intervals = existing DB bookings that day + the owner's Outlook events.
  const busy: Interval[] = [];
  const dayStartISO = new Date(`${date}T00:00:00.000Z`);
  const windowStart = new Date(dayStartISO.getTime() - 86_400_000).toISOString();
  const windowEnd = new Date(dayStartISO.getTime() + 2 * 86_400_000).toISOString();

  const admin = createAdminClient();
  if (admin) {
    const { data } = await admin
      .from("bookings")
      .select("starts_at,ends_at,status")
      .gte("starts_at", windowStart)
      .lte("starts_at", windowEnd)
      .in("status", ["pending", "approved"]);
    for (const b of data ?? []) {
      if (b.starts_at) {
        busy.push({
          start: new Date(b.starts_at).getTime(),
          end: b.ends_at ? new Date(b.ends_at).getTime() : new Date(b.starts_at).getTime() + config.slotMinutes * 60_000,
        });
      }
    }
  }

  const outlookBusy = await getBusyIntervals(windowStart, windowEnd);
  busy.push(...outlookBusy);

  const slots = slotsForDate(date, config, busy, now);
  return NextResponse.json({ slots, timezone: config.timezone, slotMinutes: config.slotMinutes });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
