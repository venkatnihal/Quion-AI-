"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function LoginInner() {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"google" | "email" | null>(null);
  const [msg, setMsg] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  const supabase = createClient();

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy("email");
    setMsg(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(next);
      router.refresh();
    } catch (err) {
      setBusy(null);
      setMsg({ kind: "error", text: err instanceof Error ? err.message : "Sign in failed." });
    }
  }

  async function handleGoogle() {
    setBusy("google");
    setMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) {
      setBusy(null);
      setMsg({ kind: "error", text: `Google sign-in unavailable: ${error.message}` });
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#00D4FF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-[#6D5DFC]/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#0B1120]/80 p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#6D5DFC] shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              <span className="text-lg font-bold text-white">Q</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white">QuionAi Admin Console</h1>
            <p className="mt-1 text-sm text-[#94A3B8]">Sign in to manage your website</p>
          </div>

          {!isSupabaseConfigured && (
            <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
              Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and the anon key in <code>.env.local</code>.
            </p>
          )}

          <button
            onClick={handleGoogle}
            disabled={busy !== null}
            className="mb-4 flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
            {busy === "google" ? "Redirecting…" : "Continue with Google"}
          </button>

          <div className="mb-4 flex items-center gap-3 text-xs text-[#64748B]">
            <span className="h-px flex-1 bg-white/10" /> or email <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-xl border border-white/10 bg-[#050816] px-3.5 py-3 text-sm text-white placeholder:text-[#475569] outline-none transition focus:border-[#00D4FF]"
            />
            <input
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-[#050816] px-3.5 py-3 text-sm text-white placeholder:text-[#475569] outline-none transition focus:border-[#00D4FF]"
            />
            <button
              type="submit"
              disabled={busy !== null}
              className="w-full rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {busy === "email" ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {msg && (
            <p className={`mt-4 rounded-lg p-3 text-xs ${msg.kind === "error" ? "border border-red-500/30 bg-red-500/10 text-red-300" : "border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]"}`}>
              {msg.text}
            </p>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-[#475569]">
          🔒 Authorized personnel only · This area is monitored and access-restricted.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050816]" />}>
      <LoginInner />
    </Suspense>
  );
}
