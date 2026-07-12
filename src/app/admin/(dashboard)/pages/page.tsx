import { getProfile } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { getContent } from "@/lib/cms/db";
import { HERO } from "@/lib/cms/content-schemas";
import { PageHeader, Card } from "@/components/admin/ui";
import { ContentForm } from "@/components/admin/ContentForm";
import { SectionsManager } from "@/components/admin/SectionsManager";
import { DEFAULT_SECTIONS, type Section } from "@/lib/cms/sections";

export const dynamic = "force-dynamic";

export default async function PagesEditor() {
  const profile = await getProfile();
  const canEdit = can(profile?.role, "content.edit");

  const [hero, sectionsData] = await Promise.all([
    getContent<Record<string, unknown>>(HERO.key),
    getContent<{ sections: Section[] }>("home.sections"),
  ]);

  return (
    <div>
      <PageHeader title="Pages" subtitle="Visually edit your homepage — the hero content and the order/visibility of every section." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-1 text-sm font-semibold text-white">{HERO.title}</h2>
          <p className="mb-4 text-xs text-[#94A3B8]">{HERO.description}</p>
          <ContentForm schema={HERO} initial={hero} canEdit={canEdit} />
        </Card>

        <Card className="p-5">
          <h2 className="mb-1 text-sm font-semibold text-white">Homepage Sections</h2>
          <p className="mb-4 text-xs text-[#94A3B8]">Reorder or hide sections. Use the arrows to move, the eye to toggle visibility.</p>
          <SectionsManager initial={sectionsData?.sections ?? DEFAULT_SECTIONS} canEdit={canEdit} />
        </Card>
      </div>
    </div>
  );
}
