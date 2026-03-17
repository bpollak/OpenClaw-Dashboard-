"use client";
import { signOut } from "next-auth/react";

export default function Header() {
  const now = new Date();
  const formatted = now.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white text-base shadow-sm">
            🤖
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Henry</h1>
            <p className="text-xs text-slate-400 leading-tight">Brett Pollak</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-xs text-slate-400 hidden md:block">{formatted}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-slate-400 hover:text-slate-600 transition px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
