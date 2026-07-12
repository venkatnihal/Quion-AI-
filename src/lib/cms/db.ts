import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Server-side CMS data access. All calls go through the service-role client
 * (bypasses RLS). Every function degrades gracefully: if Supabase isn't
 * configured or a table is missing, reads return [] / null and writes return
 * a clear { ok:false } result — the app never crashes.
 */

export interface DbResult<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

/** True when the tables have not been created yet (needs schema.sql). */
export function isMissingTable(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42P01" || // undefined_table
    /does not exist/i.test(error.message ?? "") ||
    /Could not find the table/i.test(error.message ?? "")
  );
}

export async function listRows<T = Record<string, unknown>>(
  table: string,
  opts: { order?: string; ascending?: boolean; limit?: number; match?: Record<string, unknown> } = {}
): Promise<T[]> {
  const admin = createAdminClient();
  if (!admin) return [];
  let q = admin.from(table).select("*");
  if (opts.match) {
    for (const [k, v] of Object.entries(opts.match)) q = q.eq(k, v);
  }
  if (opts.order) q = q.order(opts.order, { ascending: opts.ascending ?? false });
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) return [];
  return (data as T[]) ?? [];
}

export async function getRow<T = Record<string, unknown>>(
  table: string,
  id: string
): Promise<T | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.from(table).select("*").eq("id", id).maybeSingle();
  if (error) return null;
  return (data as T) ?? null;
}

export async function insertRow(
  table: string,
  row: Record<string, unknown>
): Promise<DbResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Supabase not configured." };
  const { data, error } = await admin.from(table).insert(row).select().maybeSingle();
  if (error) {
    return {
      ok: false,
      error: isMissingTable(error)
        ? `Table "${table}" is missing. Run supabase/schema.sql in the Supabase SQL editor.`
        : error.message,
    };
  }
  return { ok: true, data };
}

export async function updateRow(
  table: string,
  id: string,
  patch: Record<string, unknown>
): Promise<DbResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Supabase not configured." };
  const { data, error } = await admin.from(table).update(patch).eq("id", id).select().maybeSingle();
  if (error) return { ok: false, error: error.message };
  return { ok: true, data };
}

export async function deleteRow(table: string, id: string): Promise<DbResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Supabase not configured." };
  const { error } = await admin.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ── Editable content (pages / sections / settings) ──────────────────────────

export async function getContent<T = Record<string, unknown>>(
  key: string
): Promise<T | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data, error } = await admin
    .from("content")
    .select("data")
    .eq("key", key)
    .maybeSingle();
  if (error || !data) return null;
  return (data.data as T) ?? null;
}

export async function saveContent(
  key: string,
  data: Record<string, unknown>,
  userId: string | null,
  status: "draft" | "published" = "published"
): Promise<DbResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Supabase not configured." };

  // Snapshot previous version before overwriting (best effort).
  const { data: prev } = await admin.from("content").select("data,status").eq("key", key).maybeSingle();
  if (prev) {
    await admin
      .from("content_versions")
      .insert({ key, data: prev.data, status: prev.status, created_by: userId })
      .then(() => undefined, () => undefined);
  }

  const { error } = await admin
    .from("content")
    .upsert(
      { key, data, status, updated_by: userId, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  if (error) {
    return {
      ok: false,
      error: isMissingTable(error)
        ? "The content table is missing. Run supabase/schema.sql in Supabase."
        : error.message,
    };
  }
  return { ok: true };
}

export async function listVersions(key: string, limit = 20) {
  return listRows("content_versions", { order: "created_at", limit, match: { key } });
}

// ── Audit log ────────────────────────────────────────────────────────────────

export async function logAudit(entry: {
  userId?: string | null;
  userEmail?: string | null;
  action: string;
  entity?: string;
  meta?: Record<string, unknown>;
}): Promise<void> {
  const admin = createAdminClient();
  if (!admin) return;
  await admin
    .from("audit_logs")
    .insert({
      user_id: entry.userId ?? null,
      user_email: entry.userEmail ?? null,
      action: entry.action,
      entity: entry.entity ?? null,
      meta: entry.meta ?? {},
    })
    .then(() => undefined, () => undefined);
}
