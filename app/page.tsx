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
    <div className="min-h-screen bg-[#f5f6f8]">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Automation Stack</h1>
          <p className="text-slate-500 mt-1.5 text-sm max-w-lg leading-relaxed">
            Personal AI automations connecting Microsoft 365, Teams, Telegram, and local models — built on OpenClaw.
          </p>
        </div>

        <StatsBar active={active} scheduled={scheduled} building={building} total={USE_CASES.length} />

        {categories.map((category) => {
          const items = USE_CASES.filter((u) => u.category === category);
          return (
            <section key={category} className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{category}</h2>
                <span className="text-xs text-slate-300">{items.length} automation{items.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map((uc) => (
                  <UseCaseCard key={uc.id} useCase={uc} />
                ))}
              </div>
            </section>
          );
        })}

        <footer className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-300">Built with OpenClaw</p>
          <p className="text-xs text-slate-300">Henry v1</p>
        </footer>

      </main>
    </div>
  );
}
