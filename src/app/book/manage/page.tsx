import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import { ManageBooking } from "@/components/shared/ManageBooking";

export const metadata: Metadata = {
  title: "Manage your booking — QuionAi",
  robots: { index: false, follow: false },
};

export default function ManageBookingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-[#050816] section">
        <div className="container max-w-xl">
          <h1 className="mb-6 text-center text-2xl font-bold text-white">
            Manage your <GradientText>booking</GradientText>
          </h1>
          <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-white/5" />}>
            <ManageBooking />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
