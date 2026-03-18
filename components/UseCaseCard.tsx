import { UseCase } from "@/lib/use-cases";

interface LiveMetrics {
  lastRun: string;
  nextRun: string;
  lastStatus: string | null;
  delivered: boolean | null;
}
import {
  Calendar, Mail, Linkedin, TrendingUp,
  ClipboardList, Link2, Cpu, Zap, CheckCircle2, Clock, Layers, LayoutDashboard
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "morning-briefing":   <Calendar className="w-5 h-5" />,
  "email-triage":       <Mail className="w-5 h-5" />,
  "linkedin-machine":   <Linkedin className="w-5 h-5" />,
  "tritongpt-intel":    <TrendingUp className="w-5 h-5" />,
  "evening-reflection": <ClipboardList className="w-5 h-5" />,
  "teams-integration":  <Link2 className="w-5 h-5" />,
  "local-llm":          <Cpu className="w-5 h-5" />,
  "pre-meeting-brief":  <Zap className="w-5 h-5" />,
  "mission-control": <LayoutDashboard className="w-5 h-5" />,
  "ai-automation-dashboard": <LayoutDashboard className="w-5 h-5" />,
  "software-blueprint": <Layers className="w-5 h-5" />,
};

const idAccent: Record<string, { iconBg: string; iconColor: string; outcomeRing: string; bar: string }> = {
  "morning-briefing":   { iconBg: "bg-amber-50",   iconColor: "text-amber-600",   outcomeRing: "border-amber-100 bg-amber-50",   bar: "bg-amber-400" },
  "email-triage":       { iconBg: "bg-rose-50",    iconColor: "text-rose-600",    outcomeRing: "border-rose-100 bg-rose-50",    bar: "bg-rose-500" },
  "linkedin-machine":   { iconBg: "bg-blue-50",    iconColor: "text-blue-600",    outcomeRing: "border-blue-100 bg-blue-50",    bar: "bg-blue-500" },
  "tritongpt-intel":    { iconBg: "bg-emerald-50", iconColor: "text-emerald-600", outcomeRing: "border-emerald-100 bg-emerald-50", bar: "bg-emerald-500" },
  "evening-reflection": { iconBg: "bg-violet-50",  iconColor: "text-violet-600",  outcomeRing: "border-violet-100 bg-violet-50",  bar: "bg-violet-500" },
  "teams-integration":  { iconBg: "bg-teal-50",    iconColor: "text-teal-600",    outcomeRing: "border-teal-100 bg-teal-50",    bar: "bg-teal-500" },
  "local-llm":          { iconBg: "bg-slate-100",  iconColor: "text-slate-600",   outcomeRing: "border-slate-100 bg-slate-50",  bar: "bg-slate-500" },
  "pre-meeting-brief":  { iconBg: "bg-orange-50",  iconColor: "text-orange-600",  outcomeRing: "border-orange-100 bg-orange-50",  bar: "bg-orange-400" },
  "mission-control": { iconBg: "bg-slate-100", iconColor: "text-slate-900", outcomeRing: "border-slate-200 bg-slate-50", bar: "bg-slate-900" },
  "ai-automation-dashboard": { iconBg: "bg-cyan-50", iconColor: "text-cyan-600", outcomeRing: "border-cyan-100 bg-cyan-50", bar: "bg-cyan-500" },
  "software-blueprint": { iconBg: "bg-purple-50",  iconColor: "text-purple-600",  outcomeRing: "border-purple-100 bg-purple-50",  bar: "bg-purple-500" },
};

const statusConfig = {
  active:    { label: "Live",           dot: "bg-emerald-500 pulse-live", text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  scheduled: { label: "Scheduled",      dot: "bg-sky-400",                text: "text-sky-600",     bg: "bg-sky-50 border-sky-200" },
  building:  { label: "In Development", dot: "bg-amber-400",              text: "text-amber-600",   bg: "bg-amber-50 border-amber-200" },
};

export default function UseCaseCard({ useCase: uc, liveMetrics }: { useCase: UseCase; liveMetrics?: ReturnType<any> | null }) {
  const accent = idAccent[uc.id] ?? idAccent["local-llm"];
  const status = statusConfig[uc.status];
  const icon = iconMap[uc.id] ?? <Zap className="w-5 h-5" />;
  const isBuilding = uc.status === "building";

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 ${isBuilding ? "opacity-70" : ""}`}>

      {/* Category color bar */}
      <div className={`h-1 w-full ${accent.bar}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${accent.iconBg} ${accent.iconColor} flex items-center justify-center shrink-0`}>
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">{uc.title}</h3>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold shrink-0 ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed mb-4">{uc.description}</p>

        {/* Schedule */}
        {uc.schedule && !isBuilding && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>{uc.schedule}</span>
          </div>
        )}

        {/* Live metrics */}
        {!isBuilding && (
          <div className="grid grid-cols-3 gap-2 mb-5">
            {liveMetrics ? (
              <>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">Last run</div>
                  <div className={`text-xs font-bold ${liveMetrics.lastStatus === "ok" ? "text-emerald-600" : liveMetrics.lastStatus === "error" ? "text-red-500" : "text-slate-700"}`}>
                    {liveMetrics.lastRun}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">Next run</div>
                  <div className="text-xs font-bold text-slate-700">{liveMetrics.nextRun}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">Delivered</div>
                  <div className={`text-xs font-bold ${liveMetrics.delivered === true ? "text-emerald-600" : liveMetrics.delivered === false ? "text-amber-500" : "text-slate-400"}`}>
                    {liveMetrics.delivered === true ? "Yes" : liveMetrics.delivered === false ? "No" : "—"}
                  </div>
                </div>
              </>
            ) : uc.livePreview ? (
              uc.livePreview.map((item) => (
                <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                  <div className="text-xs font-bold text-slate-700">{item.value}</div>
                </div>
              ))
            ) : null}
          </div>
        )}

        {/* How it works */}
        <div className="mb-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How it works</p>
          <ol className="space-y-2">
            {uc.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-none w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
                <span className="text-sm text-slate-600 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Outcome */}
        <div className={`rounded-xl border ${accent.outcomeRing} p-4`}>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${accent.iconColor}`} />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Outcome</p>
              <p className="text-sm text-slate-700 leading-relaxed">{uc.outcome}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {uc.tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
