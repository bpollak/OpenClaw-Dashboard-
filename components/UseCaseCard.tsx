import { UseCase } from "@/lib/use-cases";
import {
  Calendar, Mail, Linkedin, Globe, Link2, Cpu,
  ClipboardList, Zap, TrendingUp, CheckCircle2, Clock, Wrench
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
};

const categoryAccent: Record<string, { border: string; glow: string; iconBg: string; iconColor: string }> = {
  "Executive Intelligence": {
    border: "border-indigo-500/30",
    glow: "hover:shadow-indigo-500/10",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
  },
  "Thought Leadership": {
    border: "border-violet-500/30",
    glow: "hover:shadow-violet-500/10",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  "Competitive Intelligence": {
    border: "border-sky-500/30",
    glow: "hover:shadow-sky-500/10",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
  },
  "Data Sources": {
    border: "border-teal-500/30",
    glow: "hover:shadow-teal-500/10",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
  },
  "Infrastructure": {
    border: "border-slate-500/30",
    glow: "hover:shadow-slate-500/10",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-400",
  },
};

const statusConfig = {
  active: {
    label: "Live",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    pulse: true,
  },
  scheduled: {
    label: "Scheduled",
    dot: "bg-sky-400",
    text: "text-sky-400",
    bg: "bg-sky-400/10",
    pulse: false,
  },
  building: {
    label: "In Development",
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    pulse: false,
  },
};

export default function UseCaseCard({ useCase: uc }: { useCase: UseCase }) {
  const accent = categoryAccent[uc.category] ?? categoryAccent["Infrastructure"];
  const status = statusConfig[uc.status];
  const icon = iconMap[uc.id] ?? <Zap className="w-5 h-5" />;
  const isBuilding = uc.status === "building";

  return (
    <div className={`rounded-2xl bg-white/[0.04] border ${accent.border} hover:bg-white/[0.07] hover:shadow-xl ${accent.glow} transition-all duration-300 overflow-hidden ${isBuilding ? "opacity-60" : ""}`}>

      {/* Top accent line */}
      <div className={`h-px w-full ${isBuilding ? "bg-amber-500/20" : "bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"}`} />

      <div className="p-6">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${accent.iconBg} ${accent.iconColor} flex items-center justify-center shrink-0`}>
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">{uc.title}</h3>
              <p className="text-xs text-white/40 mt-0.5">{uc.category}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg} shrink-0`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${status.pulse ? "animate-pulse" : ""}`} />
            <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed mb-5">{uc.description}</p>

        {/* Schedule callout */}
        {uc.schedule && !isBuilding && (
          <div className="flex items-center gap-2 mb-5 text-xs text-white/40">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{uc.schedule}</span>
          </div>
        )}

        {/* Live metrics */}
        {uc.livePreview && uc.livePreview.length > 0 && !isBuilding && (
          <div className="grid grid-cols-3 gap-2 mb-5">
            {uc.livePreview.map((item) => (
              <div key={item.label} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <div className="text-xs text-white/35 mb-1">{item.label}</div>
                <div className="text-xs font-bold text-white/80 leading-tight">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* How it works */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-3">How it works</p>
          <ol className="space-y-2.5">
            {uc.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-none w-5 h-5 rounded-full bg-white/[0.06] text-white/30 text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
                <span className="text-sm text-white/55 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Outcome callout */}
        <div className={`rounded-xl border ${isBuilding ? "border-amber-500/15 bg-amber-500/5" : "border-indigo-500/20 bg-indigo-500/5"} p-4`}>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isBuilding ? "text-amber-400/50" : "text-indigo-400"}`} />
            <div>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-1">Outcome</p>
              <p className="text-sm text-white/70 leading-relaxed">{uc.outcome}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {uc.tags.map((tag) => (
            <span key={tag} className="text-xs text-white/30 border border-white/[0.08] px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
