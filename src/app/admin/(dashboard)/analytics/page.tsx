import { listRows } from "@/lib/cms/db";
import { PageHeader, StatCard, Card } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

interface Ev { id: string; type: string; path?: string; device?: string; country?: string; created_at?: string }

function tally(items: string[]): [string, number][] {
  const map = new Map<string, number>();
  for (const i of items) map.set(i || "unknown", (map.get(i || "unknown") ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
}

function Bars({ title, data }: { title: string; data: [string, number][] }) {
  const max = Math.max(1, ...data.map((d) => d[1]));
  return (
    <Card className="p-5">
      <h2 className="mb-3 text-sm font-semibold text-white">{title}</h2>
      {data.length === 0 ? (
        <p className="py-4 text-center text-xs text-[#64748B]">No data yet.</p>
      ) : (
        <ul className="space-y-2">
          {data.map(([label, n]) => (
            <li key={label}>
              <div className="mb-1 flex justify-between text-xs"><span className="truncate text-[#94A3B8]">{label}</span><span className="text-[#64748B]">{n}</span></div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC]" style={{ width: `${(n / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default async function AnalyticsPage() {
  const [events, leads, bookings] = await Promise.all([
    listRows<Ev>("analytics_events", { order: "created_at", limit: 5000 }),
    listRows<{ id: string; service?: string }>("leads", { limit: 2000 }),
    listRows<{ id: string }>("bookings", { limit: 2000 }),
  ]);

  const pageviews = events.filter((e) => e.type === "pageview");
  const conv = pageviews.length > 0 ? ((leads.length / pageviews.length) * 100).toFixed(1) + "%" : "—";

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Traffic, engagement and conversion — captured first-party from your own site." />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pageviews" value={pageviews.length} icon="BarChart3" />
        <StatCard label="Leads" value={leads.length} icon="Users" />
        <StatCard label="Bookings" value={bookings.length} icon="CalendarCheck" />
        <StatCard label="Conversion" value={conv} icon="Star" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Bars title="Top Pages" data={tally(pageviews.map((e) => e.path ?? "/"))} />
        <Bars title="Devices" data={tally(events.map((e) => e.device ?? "unknown"))} />
        <Bars title="Top Services (leads)" data={tally(leads.map((l) => l.service ?? "unspecified"))} />
      </div>
      <Card className="mt-4 p-4 text-xs text-[#64748B]">
        Events are captured automatically on every page (a lightweight beacon to <code>/api/track</code>). Connect Google Analytics or Microsoft Clarity under SEO for deeper reporting.
      </Card>
    </div>
  );
}
