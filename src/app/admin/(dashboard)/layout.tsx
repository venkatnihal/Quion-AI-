import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/rbac";
import { Sidebar } from "@/components/admin/Sidebar";
import { Icon } from "@/components/admin/Icon";
import { isSupabaseConfigured, isAdminEmail } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 text-center">
        <div className="max-w-md rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-200">
          <h1 className="mb-2 text-lg font-semibold">Supabase not configured</h1>
          <p className="text-sm">Add NEXT_PUBLIC_SUPABASE_URL and the anon key to <code>.env.local</code>, then restart.</p>
        </div>
      </div>
    );
  }

  const profile = await getProfile();
  if (!profile) redirect("/admin/login");
  // Hard allowlist: only permitted admin emails ever reach the dashboard.
  if (!isAdminEmail(profile.email)) redirect("/");

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Sidebar role={profile.role} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#050816]/80 px-4 backdrop-blur lg:px-8">
          <div className="pl-10 lg:pl-0">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white"
            >
              <Icon name="ExternalLink" size={13} /> View live site
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-medium text-white leading-none">{profile.email}</p>
              <p className="text-[10px] text-[#00D4FF]">{ROLE_LABELS[profile.role]}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6D5DFC] text-center text-sm font-semibold leading-8">
              {(profile.email[0] || "?").toUpperCase()}
            </div>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-white/10 p-2 text-[#94A3B8] transition hover:bg-white/5 hover:text-white"
                title="Sign out"
              >
                <Icon name="LogOut" size={16} />
              </button>
            </form>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
