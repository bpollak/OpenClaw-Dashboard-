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
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <StatsBar active={active} scheduled={scheduled} building={building} total={USE_CASES.length} />

        {categories.map((category) => (
          <section key={category} className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {USE_CASES.filter((u) => u.category === category).map((uc) => (
                <UseCaseCard key={uc.id} useCase={uc} />
              ))}
            </div>
          </section>
        ))}

        <footer className="mt-16 pb-8 text-center text-slate-600 text-xs">
          Henry · UC San Diego ITS · Built with OpenClaw
        </footer>
      </main>
    </div>
  );
}
