import "server-only";
import type { User } from "@supabase/supabase-js";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SUPER_ADMIN_EMAIL } from "@/lib/supabase/config";
import type { Role } from "@/lib/rbac";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
}

/** The currently authenticated Supabase user, or null. */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

/**
 * Resolve the user's profile + role. Looks up the `profiles` table via the
 * service-role client (bypasses RLS so it works before RLS is fully seeded).
 * Falls back to super_admin for the bootstrap email, otherwise viewer.
 */
export async function getProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const email = (user.email ?? "").toLowerCase();
  const bootstrapRole: Role =
    email && email === SUPER_ADMIN_EMAIL ? "super_admin" : "viewer";

  const admin = createAdminClient();
  if (admin) {
    const { data } = await admin
      .from("profiles")
      .select("id, email, full_name, role")
      .eq("id", user.id)
      .maybeSingle();

    if (data) {
      return {
        id: data.id,
        email: data.email ?? email,
        full_name: data.full_name ?? null,
        role: (data.role as Role) ?? bootstrapRole,
      };
    }

    // Auto-provision a profile row on first sign-in (best effort).
    await admin
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email,
          full_name: (user.user_metadata?.full_name as string) ?? null,
          role: bootstrapRole,
        },
        { onConflict: "id" }
      )
      .then(() => undefined, () => undefined);
  }

  return {
    id: user.id,
    email,
    full_name: (user.user_metadata?.full_name as string) ?? null,
    role: bootstrapRole,
  };
}

/** Throws (via redirect at the page level) if unauthenticated. */
export async function requireProfile(): Promise<Profile | null> {
  return getProfile();
}
