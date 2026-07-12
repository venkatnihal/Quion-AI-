"use client";

import { useState, useTransition } from "react";
import type { CollectionDef, FieldDef } from "@/lib/cms/collections";
import { saveCollectionItem, deleteCollectionItem, duplicateCollectionItem } from "@/app/admin/actions";
import { Icon } from "@/components/admin/Icon";
import { StatusBadge } from "@/components/admin/ui";

type Row = Record<string, unknown> & { id: string };

function displayValue(field: FieldDef, v: unknown): string {
  if (v == null) return "";
  if (Array.isArray(v)) return field.type === "tags" ? v.join(", ") : v.join("\n");
  if (typeof v === "boolean") return v ? "true" : "false";
  return String(v);
}

export function CollectionManager({
  collectionKey,
  def,
  initialRows,
  canEdit,
}: {
  collectionKey: string;
  def: CollectionDef;
  initialRows: Row[];
  canEdit: boolean;
}) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const open = creating || editing !== null;

  function refresh() {
    // Server actions revalidate; trigger a soft reload of data via full navigation.
    window.location.reload();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await saveCollectionItem(collectionKey, fd);
      if (res.ok) {
        setCreating(false);
        setEditing(null);
        refresh();
      } else {
        setError(res.error ?? "Failed to save.");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    startTransition(async () => {
      const res = await deleteCollectionItem(collectionKey, id);
      if (res.ok) setRows((r) => r.filter((x) => x.id !== id));
      else setError(res.error ?? "Failed to delete.");
    });
  }

  function handleDuplicate(id: string) {
    startTransition(async () => {
      const res = await duplicateCollectionItem(collectionKey, id);
      if (res.ok) refresh();
      else setError(res.error ?? "Failed to duplicate.");
    });
  }

  return (
    <div>
      {canEdit && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => { setCreating(true); setEditing(null); setError(null); }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-3.5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <Icon name="Plus" size={15} /> New {def.singular}
          </button>
        </div>
      )}

      {error && !open && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">{error}</p>
      )}

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#0F172A]/40 p-10 text-center text-sm text-[#94A3B8]">
          No {def.label.toLowerCase()} yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-[#0F172A] text-left text-xs uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3 font-medium">{def.singular}</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#0B1120]/40">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{String(row[def.titleField] ?? "Untitled")}</p>
                    {def.subtitleField && (
                      <p className="truncate text-xs text-[#64748B] max-w-md">{String(row[def.subtitleField] ?? "")}</p>
                    )}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={String(row.status ?? "")} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      {canEdit && (
                        <>
                          <button onClick={() => { setEditing(row); setCreating(false); setError(null); }} className="rounded p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white" title="Edit"><Icon name="Pencil" size={15} /></button>
                          <button onClick={() => handleDuplicate(row.id)} className="rounded p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white" title="Duplicate"><Icon name="Copy" size={15} /></button>
                          <button onClick={() => handleDelete(row.id)} className="rounded p-1.5 text-red-400 hover:bg-red-500/10" title="Delete"><Icon name="Trash2" size={15} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0F172A] p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {creating ? `New ${def.singular}` : `Edit ${def.singular}`}
              </h2>
              <button type="button" onClick={() => { setCreating(false); setEditing(null); }} className="rounded p-1 text-[#94A3B8] hover:text-white"><Icon name="X" size={18} /></button>
            </div>

            {editing && <input type="hidden" name="id" value={editing.id} />}

            <div className="grid gap-4">
              {def.fields.map((field) => {
                const current = editing ? displayValue(field, editing[field.name]) : "";
                const id = `f-${field.name}`;
                return (
                  <div key={field.name}>
                    <label htmlFor={id} className="mb-1 block text-xs font-medium text-[#94A3B8]">
                      {field.label}{field.required && <span className="text-red-400"> *</span>}
                    </label>
                    {field.type === "textarea" || field.type === "richtext" || field.type === "list" ? (
                      <textarea id={id} name={field.name} defaultValue={current} rows={field.type === "list" ? 4 : 3} placeholder={field.placeholder} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF]" />
                    ) : field.type === "boolean" ? (
                      <label className="flex items-center gap-2 text-sm text-white">
                        <input type="checkbox" name={field.name} defaultChecked={editing ? Boolean(editing[field.name]) : false} className="h-4 w-4 accent-[#00D4FF]" />
                        {field.help || "Enabled"}
                      </label>
                    ) : field.type === "select" ? (
                      <select id={id} name={field.name} defaultValue={current || field.options?.[0]} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF]">
                        {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input id={id} name={field.name} type={field.type === "number" ? "number" : "text"} defaultValue={current} placeholder={field.placeholder} required={field.required} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF]" />
                    )}
                    {field.help && field.type !== "boolean" && <p className="mt-1 text-[11px] text-[#64748B]">{field.help}</p>}
                  </div>
                );
              })}
            </div>

            {error && <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">{error}</p>}

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-[#94A3B8] hover:text-white">Cancel</button>
              <button type="submit" disabled={pending} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
                <Icon name="Save" size={15} /> {pending ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
