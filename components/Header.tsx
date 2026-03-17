"use client";
import { signOut } from "next-auth/react";

export default function Header() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const date = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <header className="border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0b0f19] pulse-live" />
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Henry</span>
            <span className="text-white/30 mx-2 text-xs">·</span>
            <span className="text-white/50 text-sm">Brett Pollak</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-white/70 text-xs font-medium">{time}</p>
            <p className="text-white/30 text-xs">{date}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-white/30 hover:text-white/60 text-xs transition px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
