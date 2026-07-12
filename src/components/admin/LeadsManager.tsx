"use client";

import { Fragment, useMemo, useState, useTransition } from "react";
import { updateLead } from "@/app/admin/actions";
import { Icon } from "@/components/admin/Icon";
import { StatusBadge } from "@/components/admin/ui";

export interface Lead {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  subject?: string;
  source?: string;
  status?: string;
  notes?: string;
  created_at?: string;
}

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

function toCsv(rows: Lead[]): string {
  const cols = ["created_at", "name", "email", "company", "service", "budget", "status", "subject", "message", "notes"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc((r as unknown as Record<string, unknown>)[c])).join(","))].join("\n");
}

export function LeadsManager({ initial, canExport }: { initial: Lead[]; canExport: boolean }) {
  const [leads, setLeads] = useState(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (!query) return true;
      const hay = `${l.name} ${l.email} ${l.company} ${l.subject} ${l.message}`.toLowerCase();
      return hay.includes(query.toLowerCase());
    });
  }, [leads, query, filter]);

  function setStatus(id: string, status: string) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    startTransition(() => { void updateLead(id, { status }); });
  }
  function saveNotes(id: string, notes: string) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, notes } : l)));
    startTransition(() => { void updateLead(id, { notes }); });
  }

  function exportCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quionai-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="Search" size={15} className="absolute left-3 top-2.5 text-[#64748B]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leads…" className="w-full rounded-lg border border-white/10 bg-[#050816] py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-[#00D4FF]" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF]">
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {canExport && (
          <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-[#94A3B8] hover:text-white">
            <Icon name="Download" size={15} /> Export CSV
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-[#94A3B8]">No leads match.</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-[#0F172A] text-left text-xs uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#0B1120]/40">
              {filtered.map((l) => (
                <Fragment key={l.id}>
                  <tr className="cursor-pointer hover:bg-white/[0.02]" onClick={() => setOpenId(openId === l.id ? null : l.id)}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{l.name || "—"}</p>
                      <p className="text-xs text-[#64748B]">{l.email}</p>
                    </td>
                    <td className="hidden px-4 py-3 text-[#94A3B8] md:table-cell">{l.service || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                    <td className="hidden px-4 py-3 text-xs text-[#64748B] lg:table-cell">{l.created_at ? new Date(l.created_at).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-3 text-right"><Icon name="ChevronRight" size={15} className={`inline transition ${openId === l.id ? "rotate-90" : ""} text-[#64748B]`} /></td>
                  </tr>
                  {openId === l.id && (
                    <tr className="bg-[#050816]/60">
                      <td colSpan={5} className="px-4 py-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-1.5 text-sm">
                            {l.company && <p className="text-[#94A3B8]"><span className="text-[#64748B]">Company:</span> {l.company}</p>}
                            {l.budget && <p className="text-[#94A3B8]"><span className="text-[#64748B]">Budget:</span> {l.budget}</p>}
                            {l.source && <p className="text-[#94A3B8]"><span className="text-[#64748B]">Source:</span> {l.source}</p>}
                            {l.message && <p className="text-[#94A3B8]"><span className="text-[#64748B]">Message:</span> {l.message}</p>}
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-xs text-[#64748B]">Status:</span>
                              <select value={l.status ?? "new"} onClick={(e) => e.stopPropagation()} onChange={(e) => setStatus(l.id, e.target.value)} className="rounded border border-white/10 bg-[#050816] px-2 py-1 text-xs text-white">
                                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-[#64748B]">Notes</label>
                            <textarea defaultValue={l.notes ?? ""} onClick={(e) => e.stopPropagation()} onBlur={(e) => saveNotes(l.id, e.target.value)} rows={3} placeholder="Internal notes (saved on blur)…" className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF]" />
                            {l.email && <a href={`mailto:${l.email}`} className="mt-2 inline-block text-xs text-[#00D4FF] hover:underline">Reply by email →</a>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
