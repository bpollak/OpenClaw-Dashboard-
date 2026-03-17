"use client";
import { useState } from "react";
import { UseCase } from "@/lib/use-cases";

const statusConfig = {
  active: {
    label: "Live",
    dot: "bg-emerald-400 animate-pulse",
    badge: "text-emerald-700 border-emerald-200 bg-emerald-50",
    bar: "from-emerald-400 to-teal-400",
  },
  scheduled: {
    label: "Scheduled",
    dot: "bg-blue-400",
    badge: "text-blue-700 border-blue-200 bg-blue-50",
    bar: "from-blue-400 to-indigo-400",
  },
  building: {
    label: "Coming Soon",
    dot: "bg-amber-400",
    badge: "text-amber-700 border-amber-200 bg-amber-50",
    bar: "from-amber-300 to-orange-300",
  },
};

const categoryColors: Record<string, string> = {
  "Executive Intelligence": "text-indigo-600 bg-indigo-50 border-indigo-100",
  "Thought Leadership": "text-violet-600 bg-violet-50 border-violet-100",
  "Competitive Intelligence": "text-sky-600 bg-sky-50 border-sky-100",
  "Data Sources": "text-teal-600 bg-teal-50 border-teal-100",
  "Infrastructure": "text-slate-600 bg-slate-100 border-slate-200",
};

export default function UseCaseCard({ useCase: uc }: { useCase: UseCase }) {
  const [expanded, setExpanded] = useState(false);
  const s = statusConfig[uc.status];
  const catColor = categoryColors[uc.category] || "text-slate-500 bg-slate-50 border-slate-200";
  const dimmed = uc.status === "building";

  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer group shadow-sm
        ${dimmed ? "border-slate-200 opacity-80" : "border-slate-200 hover:shadow-md hover:border-slate-300"}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Accent bar */}
      <div className={`h-1 bg-gradient-to-r ${s.bar}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
              {uc.icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition truncate">{uc.title}</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border inline-block mt-0.5 ${catColor}`}>
                {uc.category}
              </span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${s.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </div>
        </div>

        {/* Description — capped at 2 lines */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">{uc.description}</p>

        {/* Schedule */}
        {uc.schedule && (
          <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
            <span>🕐</span> {uc.schedule}
          </p>
        )}

        {/* Live metrics */}
        {uc.livePreview && uc.livePreview.length > 0 && (
          <div className={`grid gap-2 mb-3 ${uc.livePreview.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
            {uc.livePreview.map((item) => (
              <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                <div className="text-xs text-slate-400">{item.label}</div>
                <div className="text-xs font-bold text-slate-700 mt-0.5 truncate">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Expanded */}
        {expanded && (
          <div className="mt-3 pt-4 border-t border-slate-100 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">How it works</h4>
              <ol className="space-y-2">
                {uc.howItWorks.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-100 rounded-xl p-3.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outcome · </span>
              <span className="text-sm text-slate-700">{uc.outcome}</span>
            </div>
            {uc.privacyNote && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>🔒</span> {uc.privacyNote}
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
          <div className="flex flex-wrap gap-1">
            {uc.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-slate-300 group-hover:text-slate-400 transition">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>
    </div>
  );
}
