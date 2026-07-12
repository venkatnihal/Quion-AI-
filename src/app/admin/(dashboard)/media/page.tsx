import { getProfile } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { listRows } from "@/lib/cms/db";
import { PageHeader } from "@/components/admin/ui";
import { MediaLibrary, type MediaItem } from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const profile = await getProfile();
  const media = await listRows<MediaItem>("media", { order: "created_at", limit: 500 });
  return (
    <div>
      <PageHeader title="Media Library" subtitle="Upload and manage images, video, SVG and documents. Stored & optimized on Cloudinary." />
      <MediaLibrary initial={media} canEdit={can(profile?.role, "content.edit")} />
    </div>
  );
}
