import Header from "@/components/Header";

export const metadata = {
  title: "Architecture - Mission Control",
  description: "OpenClaw system architecture and component overview",
};

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">System Overview</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Architecture <span className="gradient-text">Design</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            OpenClaw distributed system architecture, real-time status, and integration topology as of April 7, 2026.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Current Status */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status & Recent Changes</h2>
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-300">April 7, 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Gateway Health</span>
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-1">Healthy</p>
              <p className="text-xs text-slate-500">ws://127.0.0.1:18789 · 903ms</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Sessions</span>
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-1">140</p>
              <p className="text-xs text-slate-500">Default: claude-sonnet-4-6</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Audit Issues</span>
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-1">19 errors</p>
              <p className="text-xs text-slate-500">309 warnings · Action needed</p>
            </div>
          </div>
        </section>

        {/* System Diagram */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Topology</h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-8 font-mono text-xs overflow-x-auto">
            <pre className="text-slate-600 leading-relaxed">{`┌─────────────────────────────────────────────────────────────┐
│          USER INTERFACES                                  │
├─────────────────────────────────────────────────────────────┤
│ • Telegram Chat (primary)                                   │
│ • Mission Control Dashboard (Vercel)                        │
│ • CLI / Mac mini terminal                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────▼───────────────────┐
        │  OPENCLAW GATEWAY                    │
        ├────────────────────────────────────────┤
        │ • ws://127.0.0.1:18789                │
        │ • 140 active sessions                  │
        │ • LaunchAgent service (running)        │
        │ • Default model: claude-sonnet-4-6     │
        └──────────────────┬───────────────────┘
              ┌────────────┼────────────┐
              ▼            ▼            ▼
    ┌──────────────┐ ┌────────────┐ ┌──────────────┐
    │ CRON ENGINE  │ │ AI MODELS  │ │INTEGRATIONS  │
    ├──────────────┤ ├────────────┤ ├──────────────┤
    │ 6 jobs       │ │ FALLBACK:  │ │ • MS Graph   │
    │ (enabled)    │ │ • Sonnet   │ │ • GitHub API │
    │              │ │ • Haiku    │ │ • Brave Srch │
    │ Status: ⚠️   │ │ • Codex    │ │ • LanceDB    │
    │ Some errors  │ │ • Gemma4   │ │ • henry-api  │
    │              │ │            │ │   (localhost)│
    │ ⚠️ Nemotron  │ │ ⚠️ Legacy  │ │              │
    │   still      │ │   models   │ │ ✅ Tunnel:   │
    │   active     │ │   active   │ │ henry-api.   │
    │              │ │            │ │ brettcpollak │
    └──────────────┘ └────────────┘ └──────────────┘`}</pre>
          </div>
        </section>

        {/* Model Architecture */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Model Stack</h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-3">
            {[
              {
                tier: 1,
                model: "TritonAI Sonnet",
                purpose: "Complex reasoning, synthesis, briefing generation",
                status: "✅ Production",
                provider: "TritonAI (free via recharge)",
              },
              {
                tier: 2,
                model: "TritonAI Haiku",
                purpose: "Lightweight monitoring, alerts, status checks",
                status: "✅ Production",
                provider: "TritonAI (free via recharge)",
              },
              {
                tier: 3,
                model: "OpenAI Codex",
                purpose: "Code generation, structured outputs",
                status: "✅ Production",
                provider: "Azure OpenAI",
              },
              {
                tier: 4,
                model: "Codex-mini",
                purpose: "Final fallback for coding tasks",
                status: "✅ Fallback",
                provider: "Azure OpenAI",
              },
              {
                tier: 5,
                model: "Gemma4 (Ollama)",
                purpose: "Local embeddings, vector search",
                status: "✅ Local",
                provider: "Ollama (9.6 GB)",
              },
              {
                tier: "⚠️",
                model: "Nemotron (deprecated)",
                purpose: "Legacy dev environment model",
                status: "🔴 Migrate",
                provider: "Should not be in production",
              },
            ].map((row, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{row.model}</p>
                  <p className="text-xs text-slate-500">{row.purpose}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 mb-1">{row.provider}</p>
                  <p className="text-xs">{row.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cron Jobs */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cron Job Status</h2>
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-300">6 total jobs</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-bold text-slate-600">Job</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-600">Schedule</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-600">Model</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { name: "briefing-calendar-email", schedule: "6:25 AM daily", model: "TritonAI Sonnet", status: "✅" },
                  { name: "briefing-ai-news", schedule: "6:35 AM daily", model: "TritonAI Sonnet", status: "✅" },
                  { name: "opportunity-scan", schedule: "8:00 AM daily", model: "TritonAI Sonnet", status: "✅" },
                  { name: "graph-token-refresh", schedule: "Periodic", model: "Gemma4", status: "✅" },
                  { name: "knowledge-graph-rebuild", schedule: "6:20 AM daily", model: "Gemma4", status: "✅" },
                  { name: "health-check-periodic", schedule: "Every 5 min", model: "Gemma4", status: "⚠️ Watch" },
                ].map((job, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-mono text-slate-900">{job.name}</td>
                    <td className="px-4 py-3 text-slate-600">{job.schedule}</td>
                    <td className="px-4 py-3 text-slate-600">{job.model}</td>
                    <td className="px-4 py-3">{job.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Known Issues */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Known Issues & TODOs</h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-3">
            {[
              {
                priority: "🔴 Critical",
                issue: "Vercel password mismatch",
                detail: "Local password and Vercel deployment password are out of sync — update via Vercel dashboard",
              },
              {
                priority: "🔴 Critical",
                issue: "19 configuration errors",
                detail: "Reverse proxy trust, exec security, safeBins configuration",
              },
              {
                priority: "⚠️ High",
                issue: "Nemotron still active",
                detail: "Deprecated model in production fallback chain, should migrate to TritonAI",
              },
              {
                priority: "⚠️ High",
                issue: "MS Graph token expiry",
                detail: "~90 day window, may cause calendar/email sync failures if expired",
              },
              {
                priority: "⚠️ Medium",
                issue: "Task maintenance needed",
                detail: "106 issues, run: openclaw tasks maintenance --apply",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-sm font-bold mt-0.5">{item.priority}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{item.issue}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-300">
            Last updated: April 7, 2026 9:12 PM PT · Source:{" "}
            <code className="bg-slate-100 px-2 py-1 rounded">openclaw status</code>
          </p>
          <p className="text-xs text-slate-300">Henry Architecture v2</p>
        </footer>
      </main>
    </div>
  );
}
