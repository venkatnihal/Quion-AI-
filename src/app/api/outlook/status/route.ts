import { NextResponse } from "next/server";
import { getProfile } from "@/lib/auth";
import { isOutlookConfigured, getAppToken } from "@/lib/outlook";

/** Diagnostics: confirms Microsoft Graph credentials work (app-only token). */
export async function GET() {
  const profile = await getProfile();
  if (!profile) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  if (!isOutlookConfigured) {
    return NextResponse.json({ configured: false, connected: false, message: "Set MICROSOFT_* env vars." });
  }
  const { token, error } = await getAppToken();
  return NextResponse.json({ configured: true, connected: Boolean(token), message: error ?? "Connected." });
}
