import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/** Lightweight first-party analytics beacon. Fire-and-forget. */
export async function POST(request: NextRequest) {
  const admin = createAdminClient();
  if (!admin) return new NextResponse(null, { status: 204 });

  let body: { type?: string; path?: string; referrer?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* ignore */
  }

  const ua = request.headers.get("user-agent") ?? "";
  const device = /mobile|android|iphone|ipad/i.test(ua) ? "mobile" : "desktop";

  await admin
    .from("analytics_events")
    .insert({
      type: body.type || "pageview",
      path: (body.path || "/").slice(0, 512),
      referrer: (body.referrer || "").slice(0, 512),
      device,
    })
    .then(() => undefined, () => undefined);

  return new NextResponse(null, { status: 204 });
}

export const runtime = "nodejs";
