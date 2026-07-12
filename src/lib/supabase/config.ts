/**
 * Shared Supabase configuration. The anon/publishable key is safe in the
 * browser (RLS-governed). The URL comes from NEXT_PUBLIC_SUPABASE_URL.
 * A legacy alias (NEXT_PUBLIC_SUPABASE_KEY) is still honoured.
 */
export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/$/, "");

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

/** Server-only service-role key. Never import this into client components. */
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Email that is always treated as super_admin as a bootstrap fallback. */
export const SUPER_ADMIN_EMAIL = (process.env.SUPER_ADMIN_EMAIL ?? "").toLowerCase();
