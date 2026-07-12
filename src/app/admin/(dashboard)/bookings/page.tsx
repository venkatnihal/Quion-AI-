import { listRows } from "@/lib/cms/db";
import { PageHeader } from "@/components/admin/ui";
import { BookingsManager, type Booking } from "@/components/admin/BookingsManager";
import { BOOKING_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await listRows<Booking>("bookings", { order: "created_at", limit: 500 });
  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle="Strategy-call requests. Approve, reschedule or cancel — and sync to Microsoft Outlook."
        action={
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-[#94A3B8] hover:text-white">
            Open Microsoft Bookings ↗
          </a>
        }
      />
      <BookingsManager initial={bookings} />
    </div>
  );
}
