"use client";
import { signOut } from "next-auth/react";

export default function Header() {
  const now = new Date();
  const formatted = now.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <header className="border-b border-slate-800 bg-[#0d1422]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Henry</h1>
            <p className="text-xs text-slate-500">Brett Pollak's AI Stack · UC San Diego</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs text-slate-500 hidden md:block">{formatted}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-slate-500 hover:text-slate-300 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
