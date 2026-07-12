import { Icon } from "@/components/admin/Icon";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[#94A3B8]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-[#0F172A]/60 ${className}`}>{children}</div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon: string;
  hint?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">{label}</p>
        <Icon name={icon} size={16} className="text-[#00D4FF]" />
      </div>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-[#94A3B8]">{hint}</p>}
    </Card>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-[#0F172A]/40 p-10 text-center">
      <p className="text-sm font-medium text-white">{title}</p>
      {hint && <p className="mt-1 text-xs text-[#94A3B8]">{hint}</p>}
    </div>
  );
}

export function SchemaNotice() {
  return (
    <div className="mb-5 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
      <Icon name="AlertTriangle" size={15} className="mt-0.5 shrink-0" />
      <span>
        No data table found. Run <code className="rounded bg-black/30 px-1">supabase/schema.sql</code> in
        the Supabase SQL editor to enable this module. The website keeps working on built-in content until then.
      </span>
    </div>
  );
}

export function StatusBadge({ status }: { status?: string }) {
  const s = status ?? "";
  const map: Record<string, string> = {
    published: "bg-emerald-500/15 text-emerald-300",
    draft: "bg-slate-500/15 text-slate-300",
    new: "bg-[#00D4FF]/15 text-[#00D4FF]",
    contacted: "bg-blue-500/15 text-blue-300",
    qualified: "bg-violet-500/15 text-violet-300",
    won: "bg-emerald-500/15 text-emerald-300",
    lost: "bg-red-500/15 text-red-300",
    pending: "bg-amber-500/15 text-amber-300",
    approved: "bg-emerald-500/15 text-emerald-300",
    rejected: "bg-red-500/15 text-red-300",
    cancelled: "bg-slate-500/15 text-slate-300",
    completed: "bg-emerald-500/15 text-emerald-300",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${map[s] ?? "bg-white/10 text-white"}`}>
      {s || "—"}
    </span>
  );
}
