"use client";

import { useState, useTransition } from "react";
import type { ContentSchema } from "@/lib/cms/content-schemas";
import { coerceField } from "@/lib/cms/collections";
import { saveContentAction } from "@/app/admin/actions";
import { Icon } from "@/components/admin/Icon";

function display(type: string, v: unknown): string {
  if (v == null) return "";
  if (Array.isArray(v)) return type === "tags" ? v.join(", ") : v.join("\n");
  return String(v);
}

export function ContentForm({
  schema,
  initial,
  canEdit,
}: {
  schema: ContentSchema;
  initial: Record<string, unknown> | null;
  canEdit: boolean;
}) {
  const data = { ...schema.defaults, ...(initial ?? {}) };
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function persist(form: HTMLFormElement, status: "draft" | "published") {
    const fd = new FormData(form);
    const payload: Record<string, unknown> = {};
    for (const field of schema.fields) payload[field.name] = coerceField(field, fd.get(field.name));
    setMsg(null);
    startTransition(async () => {
      const res = await saveContentAction(schema.key, payload, status);
      setMsg(res.ok ? { kind: "ok", text: status === "draft" ? "Saved as draft." : "Published to the live site." } : { kind: "err", text: res.error ?? "Failed to save." });
    });
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); persist(e.currentTarget, "published"); }} className="max-w-2xl">
      <div className="grid gap-4">
        {schema.fields.map((field) => {
          const val = display(field.type, data[field.name]);
          const id = `c-${field.name}`;
          return (
            <div key={field.name}>
              <label htmlFor={id} className="mb-1 block text-xs font-medium text-[#94A3B8]">
                {field.label}{field.required && <span className="text-red-400"> *</span>}
              </label>
              {field.type === "textarea" || field.type === "richtext" || field.type === "list" ? (
                <textarea id={id} name={field.name} defaultValue={val} rows={3} placeholder={field.placeholder} disabled={!canEdit} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF] disabled:opacity-60" />
              ) : field.type === "select" ? (
                <select id={id} name={field.name} defaultValue={val} disabled={!canEdit} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF]">
                  {field.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input id={id} name={field.name} type="text" defaultValue={val} placeholder={field.placeholder} disabled={!canEdit} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF] disabled:opacity-60" />
              )}
              {field.help && <p className="mt-1 text-[11px] text-[#64748B]">{field.help}</p>}
            </div>
          );
        })}
      </div>

      {msg && (
        <p className={`mt-4 rounded-lg p-3 text-xs ${msg.kind === "ok" ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border border-red-500/30 bg-red-500/10 text-red-300"}`}>{msg.text}</p>
      )}

      {canEdit && (
        <div className="mt-5 flex gap-2">
          <button type="submit" disabled={pending} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
            <Icon name="Save" size={15} /> {pending ? "Saving…" : "Publish"}
          </button>
          <button type="button" onClick={(e) => { const f = e.currentTarget.form; if (f) persist(f, "draft"); }} disabled={pending} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-[#94A3B8] hover:text-white">Save draft</button>
        </div>
      )}
    </form>
  );
}
