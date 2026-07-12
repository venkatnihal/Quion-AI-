import { getProfile } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { getContent } from "@/lib/cms/db";
import { SEO } from "@/lib/cms/content-schemas";
import { PageHeader, Card } from "@/components/admin/ui";
import { ContentForm } from "@/components/admin/ContentForm";

export const dynamic = "force-dynamic";

export default async function SeoPage() {
  const profile = await getProfile();
  const data = await getContent<Record<string, unknown>>(SEO.key);
  return (
    <div>
      <PageHeader title={SEO.title} subtitle={SEO.description} />
      <Card className="max-w-2xl p-5">
        <ContentForm schema={SEO} initial={data} canEdit={can(profile?.role, "content.edit")} />
      </Card>
    </div>
  );
}
