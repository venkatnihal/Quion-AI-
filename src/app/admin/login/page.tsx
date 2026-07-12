"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function LoginInner() {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/admin";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  const supabase = createClient();

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` },
        });
        if (error) throw error;
        setMsg({ kind: "info", text: "Account created. If email confirmation is on, check your inbox — otherwise sign in now." });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(next);
        router.refresh();
      }
    } catch (err) {
      setMsg({ kind: "error", text: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) {
      setBusy(false);
      setMsg({ kind: "error", text: `Google sign-in unavailable: ${error.message}. Enable the Google provider in Supabase → Authentication → Providers.` });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050816]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-11 w-11 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#6D5DFC]" />
          <h1 className="text-xl font-semibold text-white">QuionAi CMS</h1>
          <p className="text-sm text-[#94A3B8]">Sign in to the admin dashboard</p>
        </div>

        {!isSupabaseConfigured && (
          <p className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-300">
            Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and the anon key in .env.local.
          </p>
        )}

        <button
          onClick={handleGoogle}
          disabled={busy}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
          Continue with Google
        </button>

        <div className="mb-4 flex items-center gap-3 text-xs text-[#64748B]">
          <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white placeholder:text-[#64748B] outline-none focus:border-[#00D4FF]"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white placeholder:text-[#64748B] outline-none focus:border-[#00D4FF]"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6D5DFC] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        {msg && (
          <p className={`mt-4 rounded-lg p-3 text-xs ${msg.kind === "error" ? "bg-red-500/10 border border-red-500/30 text-red-300" : "bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]"}`}>
            {msg.text}
          </p>
        )}

        <button
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMsg(null); }}
          className="mt-5 w-full text-center text-xs text-[#94A3B8] hover:text-white"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
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
