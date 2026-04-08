'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200">
                <span className="text-white font-black text-sm">H</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white pulse-live" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-bold text-sm">Henry</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400 text-sm">Brett Pollak</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-xs font-medium transition ${
                isActive('/') 
                  ? 'text-indigo-600' 
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Automations
            </Link>
            <Link
              href="/architecture"
              className={`text-xs font-medium transition ${
                isActive('/architecture') 
                  ? 'text-indigo-600' 
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Architecture
            </Link>
          </nav>
        </div>
        <div>
          <a
            href="https://brettcpollak.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-indigo-600 transition"
          >
            brettcpollak.com →
          </a>
        </div>
      </div>
    </header>
  );
}
