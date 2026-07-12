"use client";

import { useState, useTransition } from "react";
import { updateUserRole } from "@/app/admin/actions";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/rbac";

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  role: Role;
  created_at?: string;
}

export function UsersManager({ initial, selfId }: { initial: Profile[]; selfId: string }) {
  const [rows, setRows] = useState(initial);
  const [msg, setMsg] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function setRole(id: string, role: Role) {
    setRows((r) => r.map((p) => (p.id === id ? { ...p, role } : p)));
    startTransition(async () => {
      const res = await updateUserRole(id, role);
      setMsg(res.ok ? "Role updated." : res.error ?? "Failed.");
      setTimeout(() => setMsg(null), 2000);
    });
  }

  if (rows.length === 0) {
    return <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-[#94A3B8]">No users yet. Users appear here after they sign in for the first time.</div>;
  }

  return (
    <div>
      {msg && <p className="mb-3 text-xs text-[#00D4FF]">{msg}</p>}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#0F172A] text-left text-xs uppercase tracking-wider text-[#64748B]">
            <tr><th className="px-4 py-3 font-medium">User</th><th className="px-4 py-3 font-medium">Role</th><th className="hidden px-4 py-3 font-medium md:table-cell">Joined</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#0B1120]/40">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <p className="text-white">{p.full_name || p.email}</p>
                  <p className="text-xs text-[#64748B]">{p.email}{p.id === selfId ? " (you)" : ""}</p>
                </td>
                <td className="px-4 py-3">
                  <select value={p.role} disabled={p.id === selfId} onChange={(e) => setRole(p.id, e.target.value as Role)} className="rounded-lg border border-white/10 bg-[#050816] px-2.5 py-1.5 text-xs text-white disabled:opacity-50">
                    {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                  </select>
                </td>
                <td className="hidden px-4 py-3 text-xs text-[#64748B] md:table-cell">{p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
