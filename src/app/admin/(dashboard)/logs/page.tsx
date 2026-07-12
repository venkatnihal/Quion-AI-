import { listRows } from "@/lib/cms/db";
import { PageHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

interface Log { id: string; user_email?: string; action: string; entity?: string; created_at?: string }

export default async function LogsPage() {
  const logs = await listRows<Log>("audit_logs", { order: "created_at", limit: 300 });
  return (
    <div>
      <PageHeader title="Audit Logs" subtitle="Every change made in the CMS is recorded here." />
      {logs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-[#94A3B8]">No activity recorded yet.</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-[#0F172A] text-left text-xs uppercase tracking-wider text-[#64748B]">
              <tr><th className="px-4 py-3 font-medium">When</th><th className="px-4 py-3 font-medium">User</th><th className="px-4 py-3 font-medium">Action</th><th className="px-4 py-3 font-medium">Entity</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#0B1120]/40">
              {logs.map((l) => (
                <tr key={l.id}>
                  <td className="whitespace-nowrap px-4 py-2.5 text-xs text-[#64748B]">{l.created_at ? new Date(l.created_at).toLocaleString() : "—"}</td>
                  <td className="px-4 py-2.5 text-[#94A3B8]">{l.user_email || "system"}</td>
                  <td className="px-4 py-2.5"><code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#00D4FF]">{l.action}</code></td>
                  <td className="px-4 py-2.5 text-xs text-[#94A3B8]">{l.entity || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
