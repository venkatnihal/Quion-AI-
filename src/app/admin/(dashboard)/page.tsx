import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { listRows } from "@/lib/cms/db";
import { PageHeader, StatCard, Card, StatusBadge } from "@/components/admin/ui";
import { Icon } from "@/components/admin/Icon";

export const dynamic = "force-dynamic";

interface Lead { id: string; name?: string; email?: string; subject?: string; status?: string; created_at?: string }
interface Booking { id: string; name?: string; status?: string; created_at?: string }

export default async function DashboardPage() {
  const profile = await getProfile();
  const [leads, bookings, events] = await Promise.all([
    listRows<Lead>("leads", { order: "created_at", limit: 100 }),
    listRows<Booking>("bookings", { order: "created_at", limit: 100 }),
    listRows<{ id: string; type: string }>("analytics_events", { order: "created_at", limit: 1000 }),
  ]);

  const pageviews = events.filter((e) => e.type === "pageview").length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const conv = pageviews > 0 ? ((leads.length / pageviews) * 100).toFixed(1) : "—";

  return (
    <div>
      <PageHeader
        title={`Welcome back${profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}`}
        subtitle="Here's what's happening across your website."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Leads" value={leads.length} icon="Users" hint={`${newLeads} new`} />
        <StatCard label="Bookings" value={bookings.length} icon="CalendarCheck" />
        <StatCard label="Pageviews" value={pageviews} icon="BarChart3" hint="tracked events" />
        <StatCard label="Conversion" value={conv === "—" ? "—" : `${conv}%`} icon="Star" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-[#00D4FF] hover:underline">View all</Link>
          </div>
          {leads.length === 0 ? (
            <p className="py-6 text-center text-xs text-[#64748B]">No leads yet.</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {leads.slice(0, 6).map((l) => (
                <li key={l.id} className="flex items-center justify-between py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{l.name || l.email || "Anonymous"}</p>
                    <p className="truncate text-xs text-[#64748B]">{l.subject || l.email}</p>
                  </div>
                  <StatusBadge status={l.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-sm font-semibold text-white">Quick actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: "/admin/pages", label: "Edit Homepage", icon: "FileText" },
              { href: "/admin/collections/portfolio", label: "Add Project", icon: "FolderKanban" },
              { href: "/admin/media", label: "Upload Media", icon: "Upload" },
              { href: "/admin/ai", label: "AI Knowledge", icon: "Bot" },
              { href: "/admin/seo", label: "SEO", icon: "Search" },
              { href: "/admin/settings", label: "Settings", icon: "Settings" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-[#94A3B8] transition hover:border-[#00D4FF]/40 hover:text-white"
              >
                <Icon name={a.icon} size={15} className="text-[#00D4FF]" />
                {a.label}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
