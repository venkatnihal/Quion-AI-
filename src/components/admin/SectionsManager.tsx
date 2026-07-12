"use client";

import { useState, useTransition } from "react";
import { saveContentAction } from "@/app/admin/actions";
import { Icon } from "@/components/admin/Icon";
import { DEFAULT_SECTIONS, type Section } from "@/lib/cms/sections";

export function SectionsManager({ initial, canEdit }: { initial: Section[]; canEdit: boolean }) {
  const [sections, setSections] = useState<Section[]>(initial.length ? initial : DEFAULT_SECTIONS);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
  }
  function toggle(i: number) {
    setSections((s) => s.map((sec, idx) => (idx === i ? { ...sec, visible: !sec.visible } : sec)));
  }
  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await saveContentAction("home.sections", { sections });
      setMsg(res.ok ? "Saved. The homepage will reflect this order." : res.error ?? "Failed to save.");
    });
  }

  return (
    <div className="max-w-xl">
      <div className="space-y-2">
        {sections.map((sec, i) => (
          <div key={sec.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0F172A]/60 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Icon name="GripVertical" size={15} className="text-[#475569]" />
              <span className={sec.visible ? "text-sm text-white" : "text-sm text-[#64748B] line-through"}>{sec.label}</span>
            </div>
            {canEdit && (
              <div className="flex items-center gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded p-1 text-[#94A3B8] hover:bg-white/5 disabled:opacity-30" title="Move up">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === sections.length - 1} className="rounded p-1 text-[#94A3B8] hover:bg-white/5 disabled:opacity-30" title="Move down">↓</button>
                <button onClick={() => toggle(i)} className="rounded p-1.5 text-[#94A3B8] hover:bg-white/5" title={sec.visible ? "Hide" : "Show"}>
                  <Icon name={sec.visible ? "Eye" : "EyeOff"} size={15} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {msg && <p className="mt-3 text-xs text-[#00D4FF]">{msg}</p>}
      {canEdit && (
        <button onClick={save} disabled={pending} className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
          <Icon name="Save" size={15} /> {pending ? "Saving…" : "Save order"}
        </button>
      )}
    </div>
  );
}
