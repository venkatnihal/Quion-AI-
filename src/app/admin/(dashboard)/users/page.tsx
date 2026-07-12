import { getProfile } from "@/lib/auth";
import { listRows } from "@/lib/cms/db";
import { PageHeader } from "@/components/admin/ui";
import { UsersManager, type Profile } from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const me = await getProfile();
  const users = await listRows<Profile>("profiles", { order: "created_at", limit: 500 });
  return (
    <div>
      <PageHeader title="Users & Permissions" subtitle="Assign roles. Super Admins have full access; Editors manage content; Viewers are read-only." />
      <UsersManager initial={users} selfId={me?.id ?? ""} />
    </div>
  );
}
