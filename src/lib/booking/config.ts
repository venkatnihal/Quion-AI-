import "server-only";
import { getContent } from "@/lib/cms/db";

/**
 * Booking configuration. Editable in the CMS under the `settings.booking`
 * content key; falls back to these sensible defaults so booking works
 * out-of-the-box with zero setup.
 */
export interface BookingConfig {
  /** IANA timezone the business hours are expressed in. */
  timezone: string;
  /** Length of a single appointment slot, in minutes. */
  slotMinutes: number;
  /** Days of week that accept bookings (0 = Sun … 6 = Sat). */
  workingDays: number[];
  /** Start of the working day, "HH:MM" in `timezone`. */
  dayStart: string;
  /** End of the working day, "HH:MM" in `timezone`. */
  dayEnd: string;
  /** Minimum hours of notice before a slot can be booked. */
  minNoticeHours: number;
  /** How many days into the future can be booked. */
  horizonDays: number;
  /** Label shown as the meeting subject / call name. */
  meetingName: string;
}

export const DEFAULT_BOOKING_CONFIG: BookingConfig = {
  timezone: "America/New_York",
  slotMinutes: 30,
  workingDays: [1, 2, 3, 4, 5],
  dayStart: "09:00",
  dayEnd: "17:00",
  minNoticeHours: 4,
  horizonDays: 21,
  meetingName: "QuionAi Strategy Call",
};

export async function getBookingConfig(): Promise<BookingConfig> {
  const saved = await getContent<Partial<BookingConfig>>("settings.booking");
  if (!saved) return DEFAULT_BOOKING_CONFIG;
  // Merge saved over defaults, coercing types that arrive as strings from the CMS form.
  return {
    ...DEFAULT_BOOKING_CONFIG,
    ...saved,
    slotMinutes: Number(saved.slotMinutes) || DEFAULT_BOOKING_CONFIG.slotMinutes,
    minNoticeHours:
      saved.minNoticeHours != null ? Number(saved.minNoticeHours) : DEFAULT_BOOKING_CONFIG.minNoticeHours,
    horizonDays: Number(saved.horizonDays) || DEFAULT_BOOKING_CONFIG.horizonDays,
    workingDays:
      Array.isArray(saved.workingDays) && saved.workingDays.length
        ? saved.workingDays.map(Number)
        : DEFAULT_BOOKING_CONFIG.workingDays,
  };
}
