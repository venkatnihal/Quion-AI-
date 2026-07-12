import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="container max-w-xl text-center">
          <p
            className="text-8xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              background: "var(--grad-text)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </p>
          <h1
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Page Not <GradientText>Found</GradientText>
          </h1>
          <p className="text-[#64748B] mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#00D4FF] px-8 py-4 text-sm font-semibold text-[#050816] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
