import { notFound } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { COLLECTIONS } from "@/lib/cms/collections";
import { listRows } from "@/lib/cms/db";
import { PageHeader } from "@/components/admin/ui";
import { CollectionManager } from "@/components/admin/CollectionManager";

export const dynamic = "force-dynamic";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const def = COLLECTIONS[collection];
  if (!def) notFound();

  const profile = await getProfile();
  const canEdit = collection === "knowledge" ? can(profile?.role, "ai.configure") : can(profile?.role, "content.edit");

  const rows = await listRows<Record<string, unknown> & { id: string }>(def.table, {
    order: def.order,
    ascending: def.ascending,
    limit: 500,
  });

  return (
    <div>
      <PageHeader
        title={def.label}
        subtitle={`Manage your ${def.label.toLowerCase()}. Changes publish to the live site immediately.`}
      />
      <CollectionManager collectionKey={collection} def={def} initialRows={rows} canEdit={canEdit} />
    </div>
  );
}
