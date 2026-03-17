"use client";
import { useState } from "react";
import { UseCase } from "@/lib/use-cases";

const statusConfig = {
  active: { label: "Active", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  scheduled: { label: "Scheduled", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  building: { label: "Building", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
};

export default function UseCaseCard({ useCase: uc }: { useCase: UseCase }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[uc.status];

  return (
    <div
      className="bg-[#111827] border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-all cursor-pointer group"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{uc.icon}</span>
          <div>
            <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition">{uc.title}</h3>
            {uc.schedule && (
              <p className="text-xs text-slate-500 mt-0.5">{uc.schedule}</p>
            )}
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 mt-3 leading-relaxed">{uc.description}</p>

      {/* Live Preview */}
      {uc.livePreview && uc.livePreview.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {uc.livePreview.map((item) => (
            <div key={item.label} className="bg-[#0d1422] rounded-lg px-3 py-2">
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="text-xs text-slate-200 font-medium mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Expanded: How It Works */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">How it works</h4>
          <ol className="space-y-1.5">
            {uc.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-300">
                <span className="text-slate-600 shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-4 bg-[#0d1422] rounded-lg p-3">
            <span className="text-xs text-slate-500">Outcome: </span>
            <span className="text-xs text-slate-200">{uc.outcome}</span>
          </div>

          {uc.privacyNote && (
            <p className="text-xs text-slate-600 mt-2 italic">🔒 {uc.privacyNote}</p>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {uc.tags.map((tag) => (
          <span key={tag} className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-slate-700 mt-3 text-right">
        {expanded ? "Click to collapse ↑" : "Click for details ↓"}
      </p>
    </div>
  );
}
