"use client";
import { signOut } from "next-auth/react";

export default function Header() {
  const now = new Date();
  const formatted = now.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs tracking-tight">H</span>
          </div>
          <span className="text-sm font-semibold text-slate-900">Henry</span>
          <span className="text-slate-300">·</span>
          <span className="text-sm text-slate-500">Brett Pollak</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-xs text-slate-400 hidden md:block">{formatted}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-slate-400 hover:text-slate-700 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
