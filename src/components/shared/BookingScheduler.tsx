"use client";

import { useEffect, useMemo, useState } from "react";

interface DatesResp {
  dates: string[];
  timezone: string;
  slotMinutes: number;
  outlookSync?: boolean;
}

const localTz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";

function labelDate(ymd: string): { dow: string; day: string; mon: string } {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  return {
    dow: dt.toLocaleDateString(undefined, { weekday: "short", timeZone: "UTC" }),
    day: String(d),
    mon: dt.toLocaleDateString(undefined, { month: "short", timeZone: "UTC" }),
  };
}

function labelTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function BookingScheduler() {
  const [meta, setMeta] = useState<DatesResp | null>(null);
  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [slot, setSlot] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", topic: "", botcheck: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/bookings/availability")
      .then((r) => r.json())
      .then((d: DatesResp) => {
        setMeta(d);
        if (d.dates?.length) setDate(d.dates[0]);
      })
      .catch(() => setError("Couldn't load availability. Please try again or email us."));
  }, []);

  useEffect(() => {
    if (!date) return;
    setLoadingSlots(true);
    setSlot("");
    fetch(`/api/bookings/availability?date=${date}`)
      .then((r) => r.json())
      .then((d: { slots?: string[] }) => setSlots(d.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [date]);

  const canSubmit = slot && form.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startsAt: slot }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDone(slot);
      } else {
        setError(data.error || "Something went wrong. Please try another slot.");
        // If the slot was taken, refresh availability.
        if (res.status === 409 && date) {
          fetch(`/api/bookings/availability?date=${date}`).then((r) => r.json()).then((d) => setSlots(d.slots ?? []));
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const dateChips = useMemo(() => meta?.dates?.slice(0, 14) ?? [], [meta]);

  if (done) {
    return (
      <div className="rounded-2xl border border-[#00D4FF]/25 bg-[#0A0F1E]/80 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6D5DFC] text-2xl">✓</div>
        <h3 className="text-xl font-semibold text-white">You&apos;re booked!</h3>
        <p className="mt-2 text-[#94A3B8]">
          {new Date(done).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} at{" "}
          <span className="text-white">{labelTime(done)}</span>{" "}
          <span className="text-[#64748B]">({localTz})</span>
        </p>
        <p className="mt-3 text-sm text-[#64748B]">A confirmation email is on its way with the details and a link to reschedule if needed.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0A0F1E]/80 p-5 sm:p-7">
      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      {/* Step 1 — date */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748B]">1 · Pick a day</p>
        {!meta ? (
          <div className="h-16 animate-pulse rounded-lg bg-white/5" />
        ) : dateChips.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No availability right now — please email us and we&apos;ll find a time.</p>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dateChips.map((d) => {
              const l = labelDate(d);
              const active = d === date;
              return (
                <button
                  key={d}
                  onClick={() => setDate(d)}
                  aria-pressed={active}
                  className={`flex min-w-[64px] flex-col items-center rounded-xl border px-3 py-2 transition ${active ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white" : "border-white/10 text-[#94A3B8] hover:border-white/25"}`}
                >
                  <span className="text-[11px] uppercase">{l.dow}</span>
                  <span className="text-lg font-semibold">{l.day}</span>
                  <span className="text-[11px]">{l.mon}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Step 2 — time */}
      {date && (
        <div className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748B]">
            2 · Pick a time <span className="text-[#475569] normal-case">· shown in your timezone ({localTz})</span>
          </p>
          {loadingSlots ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-10 animate-pulse rounded-lg bg-white/5" />)}
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-[#94A3B8]">No open times this day — try another.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  aria-pressed={s === slot}
                  className={`rounded-lg border px-2 py-2 text-sm transition ${s === slot ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white" : "border-white/10 text-[#94A3B8] hover:border-white/25"}`}
                >
                  {labelTime(s)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3 — details */}
      {slot && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748B]">3 · Your details</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input aria-label="Your name" placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white placeholder:text-[#475569] focus:border-[#00D4FF] focus:outline-none" />
            <input aria-label="Your email" type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white placeholder:text-[#475569] focus:border-[#00D4FF] focus:outline-none" />
            <input aria-label="Phone (optional)" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white placeholder:text-[#475569] focus:border-[#00D4FF] focus:outline-none" />
            <input aria-label="Company (optional)" placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white placeholder:text-[#475569] focus:border-[#00D4FF] focus:outline-none" />
          </div>
          <textarea aria-label="What would you like to discuss?" placeholder="What would you like to discuss? (optional)" rows={3} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="mt-3 w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white placeholder:text-[#475569] focus:border-[#00D4FF] focus:outline-none" />
          {/* Honeypot */}
          <input type="text" tabIndex={-1} autoComplete="off" value={form.botcheck} onChange={(e) => setForm({ ...form, botcheck: e.target.value })} className="hidden" aria-hidden />

          <button
            onClick={submit}
            disabled={!canSubmit || submitting}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Booking…" : `Confirm ${labelTime(slot)} on ${new Date(slot).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`}
          </button>
        </div>
      )}
    </div>
  );
}
