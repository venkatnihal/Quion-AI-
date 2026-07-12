/* ─────────────────────────────────────────────────────────────
 * Supabase data layer (portfolio reads + lead writes).
 *
 * Uses the plain PostgREST HTTP API with the PUBLISHABLE key — safe to
 * ship in the browser because access is governed by Row-Level Security
 * (public can READ projects and INSERT leads; nothing else).
 *
 * Config comes from env:
 *   NEXT_PUBLIC_SUPABASE_URL   e.g. https://xxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_KEY   your sb_publishable_... key
 *
 * Until the URL is set, the site falls back to local content and the PHP
 * mailer — so the build never breaks.
 * ───────────────────────────────────────────────────────────── */

export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/$/, "");
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

function headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...extra,
  };
}

/** SELECT rows via PostgREST. `path` is e.g. "projects?select=*&order=featured.desc". */
export async function supabaseSelect<T>(path: string): Promise<T[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T[];
  } catch {
    return null;
  }
}

/** INSERT a row into a table. Returns true on success. */
export async function supabaseInsert(table: string, row: Record<string, unknown>): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  // Drop undefined values so we only send real columns.
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (v !== undefined && v !== "") clean[k] = v;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: headers({ "Content-Type": "application/json", Prefer: "return=minimal" }),
      body: JSON.stringify(clean),
    });
    return res.ok;
  } catch {
    return false;
  }
}
