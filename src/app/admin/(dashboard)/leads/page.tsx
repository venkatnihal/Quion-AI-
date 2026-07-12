import { getProfile } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { listRows } from "@/lib/cms/db";
import { PageHeader } from "@/components/admin/ui";
import { LeadsManager, type Lead } from "@/components/admin/LeadsManager";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const profile = await getProfile();
  const leads = await listRows<Lead>("leads", { order: "created_at", limit: 1000 });
  return (
    <div>
      <PageHeader title="Leads" subtitle={`${leads.length} total — captured from every website form.`} />
      <LeadsManager initial={leads} canExport={can(profile?.role, "data.export")} />
    </div>
  );
}
