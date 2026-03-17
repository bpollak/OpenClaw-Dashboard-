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
    <div className="min-h-screen bg-[#0b0f19]">
      <Header />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-10">
        <div className="mb-2">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Personal AI Infrastructure</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-3">
          AI Automation <span className="gradient-text">Stack</span>
        </h1>
        <p className="text-white/50 text-base max-w-xl leading-relaxed">
          Always-on automations connecting Microsoft 365, Teams, Telegram, and local LLMs — built on OpenClaw.
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-8 pb-16">
        <StatsBar active={active} scheduled={scheduled} building={building} total={USE_CASES.length} />

        {categories.map((category) => {
          const items = USE_CASES.filter((u) => u.category === category);
          return (
            <section key={category} className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xs font-bold text-white/30 uppercase tracking-widest">{category}</h2>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-white/20">{items.length} automation{items.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map((uc) => (
                  <UseCaseCard key={uc.id} useCase={uc} />
                ))}
              </div>
            </section>
          );
        })}

        <footer className="pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-white/20">Built with <a href="https://openclaw.ai" className="text-indigo-400 hover:text-indigo-300 transition">OpenClaw</a></p>
          <p className="text-xs text-white/20">Henry v1</p>
        </footer>
      </main>
    </div>
  );
}
