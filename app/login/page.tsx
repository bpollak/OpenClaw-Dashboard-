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
    const res = await signIn("credentials", {
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid password");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🤖</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Henry</h1>
          <p className="text-slate-400 text-sm mt-1">Brett Pollak's AI Stack</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#111827] border border-slate-800 rounded-xl p-8 shadow-2xl">
          <label className="block text-sm text-slate-400 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1e2a3a] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            placeholder="Enter password"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-center text-slate-600 text-xs mt-6">UC San Diego · ITS</p>
      </div>
    </div>
  );
}
