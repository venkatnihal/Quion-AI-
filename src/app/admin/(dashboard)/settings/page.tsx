import { getProfile } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { getContent } from "@/lib/cms/db";
import { GLOBAL, THEME } from "@/lib/cms/content-schemas";
import { PageHeader, Card } from "@/components/admin/ui";
import { ContentForm } from "@/components/admin/ContentForm";
import { Icon } from "@/components/admin/Icon";

export const dynamic = "force-dynamic";

const INTEGRATIONS = [
  { name: "Supabase", env: "SUPABASE_SERVICE_ROLE_KEY", desc: "Database, auth & storage" },
  { name: "Resend", env: "RESEND_API_KEY", desc: "Transactional email" },
  { name: "Microsoft Graph", env: "MICROSOFT_CLIENT_SECRET", desc: "Outlook calendar & bookings" },
  { name: "Cloudinary", env: "CLOUDINARY_API_SECRET", desc: "Media storage & optimization" },
  { name: "Google Gemini", env: "GEMINI_API_KEY", desc: "AI assistant" },
];

export default async function SettingsPage() {
  const profile = await getProfile();
  const canEdit = can(profile?.role, "settings.manage");
  const [global, theme] = await Promise.all([
    getContent<Record<string, unknown>>(GLOBAL.key),
    getContent<Record<string, unknown>>(THEME.key),
  ]);

  return (
    <div>
      <PageHeader title="Settings" subtitle="Company details, brand theme and connected integrations." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-1 text-sm font-semibold text-white">{GLOBAL.title}</h2>
          <p className="mb-4 text-xs text-[#94A3B8]">{GLOBAL.description}</p>
          <ContentForm schema={GLOBAL} initial={global} canEdit={canEdit} />
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-1 text-sm font-semibold text-white">{THEME.title}</h2>
            <p className="mb-4 text-xs text-[#94A3B8]">{THEME.description}</p>
            <ContentForm schema={THEME} initial={theme} canEdit={canEdit} />
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-white">Integrations & API Keys</h2>
            <p className="mb-4 text-xs text-[#94A3B8]">Keys are stored securely in environment variables (never in the browser). Status shown from the server.</p>
            <ul className="space-y-2">
              {INTEGRATIONS.map((i) => {
                const configured = Boolean(process.env[i.env]);
                return (
                  <li key={i.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5">
                    <div>
                      <p className="text-sm text-white">{i.name}</p>
                      <p className="text-xs text-[#64748B]">{i.desc}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${configured ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-500/15 text-slate-400"}`}>
                      <Icon name={configured ? "Check" : "X"} size={12} /> {configured ? "Connected" : "Not set"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
