"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
  const [account, setAccount] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  // Prefill from an existing session (customers who signed in with Google/Microsoft).
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (u?.email) {
        setAccount(u.email);
        setForm((f) => ({
          ...f,
          email: f.email || u.email!,
          name: f.name || (u.user_metadata?.full_name as string) || (u.user_metadata?.name as string) || "",
        }));
      }
    });
  }, [supabase]);

  function signIn(provider: "google" | "azure") {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/book`,
        ...(provider === "azure" ? { scopes: "email openid profile" } : {}),
      },
    });
  }

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
      {/* Optional customer sign-in — autofills details and lets returning clients book faster */}
      {account ? (
        <p className="mb-5 flex items-center gap-2 rounded-lg border border-[#00D4FF]/20 bg-[#00D4FF]/5 px-3 py-2 text-xs text-[#7FE7FF]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00D4FF]" /> Signed in as {account}
        </p>
      ) : (
        <div className="mb-5 flex flex-col gap-2 rounded-lg border border-white/10 bg-[#050816]/60 p-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-[#94A3B8]">Returning client? Sign in to autofill your details.</span>
          <div className="flex gap-2">
            <button onClick={() => signIn("google")} className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-100">
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
              Google
            </button>
            <button onClick={() => signIn("azure")} className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#0F172A] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1e293b]">
              <svg width="14" height="14" viewBox="0 0 23 23" aria-hidden><path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#7fba00" d="M12 1h10v10H12z"/><path fill="#00a4ef" d="M1 12h10v10H1z"/><path fill="#ffb900" d="M12 12h10v10H12z"/></svg>
              Microsoft
            </button>
          </div>
        </div>
      )}

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
