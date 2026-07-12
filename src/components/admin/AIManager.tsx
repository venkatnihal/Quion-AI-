"use client";

import { useState, useTransition } from "react";
import { saveAiPrompt, saveAiModel } from "@/app/admin/actions";
import { Icon } from "@/components/admin/Icon";

const PROMPTS: { key: string; label: string; help: string }[] = [
  { key: "system", label: "System Prompt", help: "Core behaviour + persona of the assistant." },
  { key: "greeting", label: "Greeting", help: "First message shown to visitors." },
  { key: "sales", label: "Sales Prompt", help: "How it pitches and drives bookings." },
  { key: "support", label: "Support Prompt", help: "How it answers product/support questions." },
  { key: "qualify", label: "Lead Qualification", help: "What it gathers to qualify a lead." },
  { key: "fallback", label: "Fallback", help: "Used when it can't answer." },
];

export function AIManager({
  prompts,
  model,
}: {
  prompts: Record<string, string>;
  model: { model?: string; temperature?: string };
}) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);

  function savePrompt(key: string, value: string) {
    startTransition(async () => {
      const res = await saveAiPrompt(key, value);
      setSaved(res.ok ? key : null);
      if (res.ok) setTimeout(() => setSaved(null), 1500);
    });
  }

  function saveModel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveAiModel({ model: String(fd.get("model")), temperature: String(fd.get("temperature")) });
      setSaved("model");
      setTimeout(() => setSaved(null), 1500);
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={saveModel} className="rounded-xl border border-white/10 bg-[#0F172A]/60 p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Model configuration</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-[#94A3B8]">Model</label>
            <select name="model" defaultValue={model.model ?? "gemini-2.0-flash"} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white">
              <option value="gemini-2.0-flash">gemini-2.0-flash (fast)</option>
              <option value="gemini-2.0-pro">gemini-2.0-pro</option>
              <option value="gemini-1.5-flash">gemini-1.5-flash</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#94A3B8]">Temperature</label>
            <input name="temperature" type="number" step="0.1" min="0" max="1" defaultValue={model.temperature ?? "0.6"} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white" />
          </div>
        </div>
        <button type="submit" disabled={pending} className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
          <Icon name="Save" size={15} /> Save {saved === "model" && "✓"}
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        {PROMPTS.map((p) => (
          <div key={p.key} className="rounded-xl border border-white/10 bg-[#0F172A]/60 p-5">
            <h3 className="text-sm font-semibold text-white">{p.label}</h3>
            <p className="mb-2 text-[11px] text-[#64748B]">{p.help}</p>
            <textarea id={`p-${p.key}`} defaultValue={prompts[p.key] ?? ""} rows={4} className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4FF]" />
            <button
              onClick={() => {
                const el = document.getElementById(`p-${p.key}`) as HTMLTextAreaElement | null;
                if (el) savePrompt(p.key, el.value);
              }}
              disabled={pending}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#94A3B8] hover:text-white"
            >
              <Icon name="Save" size={13} /> Save {saved === p.key && "✓"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
