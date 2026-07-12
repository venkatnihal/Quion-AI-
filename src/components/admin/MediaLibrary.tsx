"use client";

import { useRef, useState, useTransition } from "react";
import { deleteMedia } from "@/app/admin/actions";
import { Icon } from "@/components/admin/Icon";

export interface MediaItem {
  id: string;
  url: string;
  public_id?: string;
  type?: string;
  format?: string;
  alt?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export function MediaLibrary({ initial, canEdit }: { initial: MediaItem[]; canEdit: boolean }) {
  const [items, setItems] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/media/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok && data.item) {
          setItems((prev) => [data.item, ...prev]);
        } else {
          setError(data.error || "Upload failed. Check Cloudinary settings.");
        }
      } catch {
        setError("Upload failed. Network error.");
      }
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(id: string) {
    if (!confirm("Delete this asset?")) return;
    startTransition(async () => {
      const res = await deleteMedia(id);
      if (res.ok) setItems((p) => p.filter((i) => i.id !== id));
      else setError(res.error ?? "Failed to delete.");
    });
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      {canEdit && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          className="mb-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-[#0F172A]/40 p-8 text-center"
        >
          <Icon name="Upload" size={22} className="mb-2 text-[#00D4FF]" />
          <p className="text-sm text-white">Drag & drop files here, or</p>
          <button onClick={() => inputRef.current?.click()} disabled={uploading} className="mt-2 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
            {uploading ? "Uploading…" : "Choose files"}
          </button>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*,.pdf,.svg" hidden onChange={(e) => handleFiles(e.target.files)} />
          <p className="mt-2 text-[11px] text-[#64748B]">Images, video, SVG, PDF — optimized & stored on Cloudinary.</p>
        </div>
      )}

      {error && <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">{error}</p>}

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-[#94A3B8]">No media yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#0F172A]">
              <div className="flex aspect-video items-center justify-center bg-[#050816]">
                {m.type === "image" || !m.type ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.alt ?? ""} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs uppercase text-[#64748B]">{m.format || m.type}</span>
                )}
              </div>
              <div className="flex items-center justify-between p-2">
                <button onClick={() => copy(m.url)} className="truncate text-[11px] text-[#94A3B8] hover:text-white" title={m.url}>
                  {copied === m.url ? "Copied!" : "Copy URL"}
                </button>
                {canEdit && (
                  <button onClick={() => remove(m.id)} className="text-red-400 hover:text-red-300" title="Delete"><Icon name="Trash2" size={14} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
