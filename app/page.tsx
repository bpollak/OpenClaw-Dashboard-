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
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
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
        <StatsBar active={active} scheduled={scheduled} building={building} total={USE_CASES.length} />

        {categories.map((category) => {
          const items = USE_CASES.filter((u) => u.category === category);
          return (
            <section key={category} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{category}</h2>
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-300">{items.length} automation{items.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map((uc) => (
                  <UseCaseCard key={uc.id} useCase={uc} />
                ))}
              </div>
            </section>
          );
        })}

        <footer className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-300">Built with <a href="https://openclaw.ai" className="text-indigo-500 hover:text-indigo-700 transition">OpenClaw</a></p>
          <p className="text-xs text-slate-300">Henry v1</p>
        </footer>
      </main>
    </div>
  );
}
