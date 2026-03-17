import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { USE_CASES } from "@/lib/use-cases";
import UseCaseCard from "@/components/UseCaseCard";
import StatsBar from "@/components/StatsBar";
import Header from "@/components/Header";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const active = USE_CASES.filter((u) => u.status === "active").length;
  const scheduled = USE_CASES.filter((u) => u.status === "scheduled").length;
  const building = USE_CASES.filter((u) => u.status === "building").length;
  const categories = [...new Set(USE_CASES.map((u) => u.category))];

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      <Header />

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">Personal AI Stack</p>
          <h2 className="text-3xl font-bold mb-2">AI Automation Dashboard</h2>
          <p className="text-blue-100 text-sm max-w-xl leading-relaxed">
            Connecting Microsoft 365, Teams, Telegram, and local LLMs to automate executive workflows — built on OpenClaw.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-6 pb-12">
        <StatsBar active={active} scheduled={scheduled} building={building} total={USE_CASES.length} />

        {categories.map((category) => {
          const items = USE_CASES.filter((u) => u.category === category);
          return (
            <section key={category} className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{category}</h2>
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                  {items.length} automation{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className={`grid gap-4 ${items.length === 1 ? "grid-cols-1 max-w-lg" : items.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
                {items.map((uc) => (
                  <UseCaseCard key={uc.id} useCase={uc} />
                ))}
              </div>
            </section>
          );
        })}

        <footer className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-400">Built with <a href="https://openclaw.ai" className="text-blue-500 hover:underline">OpenClaw</a></p>
          <p className="text-xs text-slate-300">Henry v1</p>
        </footer>
      </main>
    </div>
  );
}
