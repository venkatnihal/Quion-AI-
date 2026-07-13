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

/**
 * Allowlist of emails permitted to access the /admin portal AT ALL. Everyone
 * else — even authenticated customers who signed in to book — is blocked and
 * bounced to the public site. Defaults to just the super-admin email; override
 * with a comma-separated ADMIN_ALLOWED_EMAILS if more admins are ever needed.
 * (Server-only env; empty in the browser, which is fine — enforcement is
 * server-side in middleware + the admin layout.)
 */
export const ADMIN_EMAILS = (process.env.ADMIN_ALLOWED_EMAILS ?? SUPER_ADMIN_EMAIL)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** True only for emails explicitly allowed into the admin portal. */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
