import { USE_CASES } from "@/lib/use-cases";
import { CRON_MAP, formatRelativeTime, formatNextRun } from "@/lib/cron-map";
import { CronJobStatus } from "@/app/api/cron-status/route";
import UseCaseCard from "@/components/UseCaseCard";
import StatsBar from "@/components/StatsBar";
import Header from "@/components/Header";
import { readFileSync } from "fs";
import { join } from "path";

const INFRA_CATEGORIES = ["Data Sources", "Infrastructure"];

function getLiveCronStatus(): Record<string, CronJobStatus> {
  try {
    const file = join(process.cwd(), "public", "live-status.json");
    const data = JSON.parse(readFileSync(file, "utf-8"));
    return data.jobs ?? {};
  } catch {
    return {};
  }
}

export default async function Dashboard() {

  const cronStatus = getLiveCronStatus();

  const automations = USE_CASES.filter((u) => !INFRA_CATEGORIES.includes(u.category));
  const infra = USE_CASES.filter((u) => INFRA_CATEGORIES.includes(u.category));

  const active = automations.filter((u) => u.status === "active").length;
  const scheduled = automations.filter((u) => u.status === "scheduled").length;
  const building = automations.filter((u) => u.status === "building").length;

  // Enrich each automation with live cron data
  function getLiveMetrics(id: string) {
    const cronName = CRON_MAP[id];
    if (!cronName) return null;
    const job = cronStatus[cronName];
    if (!job) return null;
    return {
      lastRun: formatRelativeTime(job.lastRunAtMs),
      nextRun: formatNextRun(job.nextRunAtMs),
      lastStatus: job.lastStatus,
      delivered: job.lastDelivered,
    };
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Personal AI Infrastructure</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            AI Automation <span className="gradient-text">Stack</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            Always-on automations connecting Microsoft 365, Teams, Telegram, and local LLMs — built on OpenClaw.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-10">
        <StatsBar active={active} scheduled={scheduled} building={building} total={automations.length} />

        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Automations</h2>
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-300">{automations.length} total</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {automations.map((uc) => (
              <UseCaseCard key={uc.id} useCase={uc} liveMetrics={getLiveMetrics(uc.id)} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Sources & Infrastructure</h2>
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-300">{infra.length} total</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {infra.map((uc) => (
              <UseCaseCard key={uc.id} useCase={uc} liveMetrics={getLiveMetrics(uc.id)} />
            ))}
          </div>
        </section>

        <footer className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-300">Built with <a href="https://openclaw.ai" className="text-indigo-500 hover:text-indigo-700 transition">OpenClaw</a></p>
          <p className="text-xs text-slate-300">Henry v1</p>
        </footer>
      </main>
    </div>
  );
}
