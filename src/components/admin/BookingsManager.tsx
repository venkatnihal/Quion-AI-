"use client";

import { useState, useTransition } from "react";
import { updateBooking } from "@/app/admin/actions";
import { Icon } from "@/components/admin/Icon";
import { StatusBadge } from "@/components/admin/ui";

export interface Booking {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  topic?: string;
  starts_at?: string;
  status?: string;
  notes?: string;
  created_at?: string;
}

const ACTIONS: { status: string; label: string }[] = [
  { status: "approved", label: "Approve" },
  { status: "rejected", label: "Reject" },
  { status: "completed", label: "Complete" },
  { status: "cancelled", label: "Cancel" },
];

export function BookingsManager({ initial }: { initial: Booking[] }) {
  const [rows, setRows] = useState(initial);
  const [, startTransition] = useTransition();

  function setStatus(id: string, status: string) {
    setRows((r) => r.map((b) => (b.id === id ? { ...b, status } : b)));
    startTransition(() => { void updateBooking(id, { status }); });
  }

  if (rows.length === 0) {
    return <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-[#94A3B8]">No bookings yet. Requests from the site appear here and can sync to Outlook.</div>;
  }

  return (
    <div className="space-y-3">
      {rows.map((b) => (
        <div key={b.id} className="rounded-xl border border-white/10 bg-[#0F172A]/60 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-white">{b.name || "—"}</p>
                <StatusBadge status={b.status} />
              </div>
              <p className="text-xs text-[#64748B]">{b.email}{b.phone ? ` · ${b.phone}` : ""}{b.company ? ` · ${b.company}` : ""}</p>
              {b.topic && <p className="mt-1 text-sm text-[#94A3B8]">{b.topic}</p>}
              {b.starts_at && <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#00D4FF]"><Icon name="CalendarCheck" size={13} /> {new Date(b.starts_at).toLocaleString()}</p>}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ACTIONS.map((a) => (
                <button key={a.status} onClick={() => setStatus(b.id, a.status)} disabled={b.status === a.status} className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-[#94A3B8] transition hover:border-[#00D4FF]/40 hover:text-white disabled:opacity-40">{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
