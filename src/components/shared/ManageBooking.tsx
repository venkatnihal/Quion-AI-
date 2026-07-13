"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Booking {
  id: string;
  name?: string;
  email?: string;
  topic?: string;
  starts_at?: string;
  status?: string;
}

const localTz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
const fmt = (iso?: string) =>
  iso ? new Date(iso).toLocaleString(undefined, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }) : "";

export function ManageBooking() {
  const token = useSearchParams().get("token") ?? "";
  const [booking, setBooking] = useState<Booking | null>(null);
  const [meetingName, setMeetingName] = useState("your call");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Reschedule picker state
  const [showResched, setShowResched] = useState(false);
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!token) { setError("This link is missing its token."); return; }
    fetch(`/api/bookings/manage?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.booking) { setBooking(d.booking); setMeetingName(d.meetingName || "your call"); }
        else setError(d.error || "Booking not found.");
      })
      .catch(() => setError("Couldn't load this booking."));
  }, [token]);

  function openReschedule() {
    setShowResched(true);
    fetch("/api/bookings/availability").then((r) => r.json()).then((d) => {
      setDates(d.dates ?? []);
      if (d.dates?.[0]) setDate(d.dates[0]);
    });
  }

  useEffect(() => {
    if (!date) return;
    fetch(`/api/bookings/availability?date=${date}`).then((r) => r.json()).then((d) => setSlots(d.slots ?? []));
  }, [date]);

  async function act(action: "cancel" | "reschedule", startsAt?: string) {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/bookings/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action, startsAt }),
      });
      const d = await res.json();
      if (res.ok && d.ok) {
        if (action === "cancel") { setBooking((b) => b && { ...b, status: "cancelled" }); setNotice("Your booking has been cancelled."); }
        else { setBooking((b) => b && { ...b, starts_at: startsAt, status: "approved" }); setShowResched(false); setNotice("Your booking has been rescheduled."); }
      } else setError(d.error || "Action failed.");
    } catch { setError("Network error."); }
    finally { setBusy(false); }
  }

  if (error && !booking) return <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</p>;
  if (!booking) return <div className="h-40 animate-pulse rounded-2xl bg-white/5" />;

  const cancelled = booking.status === "cancelled";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0A0F1E]/80 p-6">
      {notice && <p className="mb-4 rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 p-3 text-sm text-[#7FE7FF]">{notice}</p>}
      {error && <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

      <p className="text-xs uppercase tracking-wider text-[#64748B]">{meetingName}</p>
      <h2 className={`mt-1 text-xl font-semibold ${cancelled ? "text-[#64748B] line-through" : "text-white"}`}>{fmt(booking.starts_at)}</h2>
      <p className="mt-1 text-sm text-[#64748B]">{localTz}{cancelled ? " · cancelled" : ""}</p>

      {!cancelled && !showResched && (
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={openReschedule} disabled={busy} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white hover:border-[#00D4FF]">Reschedule</button>
          <button onClick={() => { if (confirm("Cancel this booking?")) act("cancel"); }} disabled={busy} className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10">Cancel booking</button>
        </div>
      )}

      {showResched && !cancelled && (
        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="mb-2 text-xs uppercase tracking-wider text-[#64748B]">Pick a new day</p>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {dates.slice(0, 14).map((d) => {
              const [y, m, dd] = d.split("-").map(Number);
              const dt = new Date(Date.UTC(y, m - 1, dd, 12));
              return (
                <button key={d} onClick={() => setDate(d)} className={`min-w-[60px] rounded-lg border px-2 py-2 text-center text-xs ${d === date ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white" : "border-white/10 text-[#94A3B8]"}`}>
                  {dt.toLocaleDateString(undefined, { weekday: "short", timeZone: "UTC" })}<br /><span className="text-base font-semibold">{dd}</span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slots.length === 0 ? <p className="col-span-full text-sm text-[#94A3B8]">No times this day.</p> :
              slots.map((s) => (
                <button key={s} onClick={() => act("reschedule", s)} disabled={busy} className="rounded-lg border border-white/10 px-2 py-2 text-sm text-[#94A3B8] hover:border-[#00D4FF] hover:text-white">
                  {new Date(s).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                </button>
              ))}
          </div>
          <button onClick={() => setShowResched(false)} className="mt-3 text-xs text-[#64748B] hover:text-white">Cancel</button>
        </div>
      )}
    </div>
  );
}
