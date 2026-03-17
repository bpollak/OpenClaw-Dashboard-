"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { password, redirect: false });
    setLoading(false);
    if (res?.ok) router.push("/");
    else setError("Incorrect password.");
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Wordmark */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-slate-900 rounded-lg mb-4">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Henry</h1>
          <p className="text-sm text-slate-400 mt-1">AI Automation Stack</p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-slate-900 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition"
            >
              {loading ? "Signing in…" : "Continue"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-300 mt-6">
          Powered by OpenClaw
        </p>
      </div>
    </div>
  );
}
