import "server-only";
import type { BookingConfig } from "./config";

export interface Interval {
  start: number; // epoch ms
  end: number; // epoch ms
}

/** Offset (ms) of an IANA timezone at a given instant: tzWallClock - UTC. */
function tzOffsetMs(tz: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const p = Object.fromEntries(dtf.formatToParts(date).map((x) => [x.type, x.value])) as Record<string, string>;
  const asUTC = Date.UTC(
    Number(p.year),
    Number(p.month) - 1,
    Number(p.day),
    Number(p.hour),
    Number(p.minute),
    Number(p.second)
  );
  return asUTC - date.getTime();
}

/** Convert a wall-clock time in `tz` to a UTC Date. */
export function zonedWallClockToUtc(
  y: number,
  mo: number,
  d: number,
  hh: number,
  mm: number,
  tz: string
): Date {
  const guess = Date.UTC(y, mo - 1, d, hh, mm);
  const offset = tzOffsetMs(tz, new Date(guess));
  return new Date(guess - offset);
}

/** The calendar Y/M/D of an instant, as seen in `tz`. */
export function ymdInTz(date: Date, tz: string): { y: number; mo: number; d: number; dow: number } {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const p = Object.fromEntries(dtf.formatToParts(date).map((x) => [x.type, x.value])) as Record<string, string>;
  const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { y: Number(p.year), mo: Number(p.month), d: Number(p.day), dow: dowMap[p.weekday] ?? 0 };
}

function parseHM(hm: string): [number, number] {
  const [h, m] = hm.split(":").map(Number);
  return [h || 0, m || 0];
}

/**
 * Generate all candidate slot start-times (as UTC ISO strings) for a given
 * calendar date (YYYY-MM-DD interpreted in the business timezone), excluding
 * any that overlap a busy interval or fall inside the minimum-notice window.
 */
export function slotsForDate(
  dateYMD: string,
  config: BookingConfig,
  busy: Interval[],
  now: Date
): string[] {
  const [y, mo, d] = dateYMD.split("-").map(Number);
  if (!y || !mo || !d) return [];

  // Reject non-working days (evaluated in the business timezone).
  const probe = zonedWallClockToUtc(y, mo, d, 12, 0, config.timezone);
  const { dow } = ymdInTz(probe, config.timezone);
  if (!config.workingDays.includes(dow)) return [];

  const [sh, sm] = parseHM(config.dayStart);
  const [eh, em] = parseHM(config.dayEnd);
  const dayStart = zonedWallClockToUtc(y, mo, d, sh, sm, config.timezone).getTime();
  const dayEnd = zonedWallClockToUtc(y, mo, d, eh, em, config.timezone).getTime();

  const slotMs = config.slotMinutes * 60_000;
  const notBefore = now.getTime() + config.minNoticeHours * 3_600_000;

  const out: string[] = [];
  for (let t = dayStart; t + slotMs <= dayEnd; t += slotMs) {
    if (t < notBefore) continue;
    const overlaps = busy.some((b) => t < b.end && t + slotMs > b.start);
    if (!overlaps) out.push(new Date(t).toISOString());
  }
  return out;
}

/** The list of bookable calendar dates (YYYY-MM-DD in business tz) within the horizon. */
export function bookableDates(config: BookingConfig, now: Date): string[] {
  const dates: string[] = [];
  for (let i = 0; i <= config.horizonDays; i++) {
    const day = new Date(now.getTime() + i * 86_400_000);
    const { y, mo, d, dow } = ymdInTz(day, config.timezone);
    if (config.workingDays.includes(dow)) {
      dates.push(`${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    }
  }
  return dates;
}
