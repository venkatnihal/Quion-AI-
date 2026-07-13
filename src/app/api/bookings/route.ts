import { NextResponse, type NextRequest } from "next/server";
import { createBooking } from "@/lib/booking/service";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** POST /api/bookings — public booking creation with lightweight validation. */
export async function POST(request: NextRequest) {
  let body: Record<string, string | undefined>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently succeed so bots learn nothing.
  if (body.botcheck) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const startsAt = (body.startsAt ?? "").trim();

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (!startsAt || isNaN(new Date(startsAt).getTime())) {
    return NextResponse.json({ ok: false, error: "Please pick a time slot." }, { status: 400 });
  }
  if (new Date(startsAt).getTime() < Date.now()) {
    return NextResponse.json({ ok: false, error: "That time is in the past." }, { status: 400 });
  }

  const result = await createBooking({
    name,
    email,
    phone: body.phone?.trim().slice(0, 40),
    company: body.company?.trim().slice(0, 160),
    topic: body.topic?.trim().slice(0, 2000),
    startsAt,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }
  return NextResponse.json({ ok: true, id: result.booking?.id, outlookSynced: result.outlookSynced });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
