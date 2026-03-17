"use client";
import { useState } from "react";
import { UseCase } from "@/lib/use-cases";

const statusDot: Record<string, string> = {
  active: "bg-emerald-500",
  scheduled: "bg-blue-500",
  building: "bg-slate-300",
};

const statusLabel: Record<string, string> = {
  active: "Live",
  scheduled: "Scheduled",
  building: "In Development",
};

export default function UseCaseCard({ useCase: uc }: { useCase: UseCase }) {
  const [expanded, setExpanded] = useState(false);
  const isBuilding = uc.status === "building";

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer group
        ${isBuilding ? "opacity-60" : "hover:shadow-md hover:border-slate-300"}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition leading-snug">
              {uc.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{uc.category}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[uc.status]} ${uc.status === 'active' ? 'animate-pulse' : ''}`} />
            <span className="text-xs text-slate-400">{statusLabel[uc.status]}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-5">
          {uc.description}
        </p>

        {/* Live metrics — only for active */}
        {uc.livePreview && uc.livePreview.length > 0 && !isBuilding && (
          <div className="flex flex-wrap gap-3 mb-5">
            {uc.livePreview.map((item) => (
              <div key={item.label}>
                <div className="text-xs text-slate-400">{item.label}</div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Schedule */}
        {uc.schedule && !isBuilding && (
          <p className="text-xs text-slate-400 mb-4">{uc.schedule}</p>
        )}

        {/* Expanded section */}
        {expanded && (
          <div className="pt-5 border-t border-slate-100 space-y-5">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">How it works</h4>
              <ol className="space-y-2.5">
                {uc.howItWorks.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-slate-300 tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Outcome</p>
              <p className="text-sm text-slate-700 leading-relaxed">{uc.outcome}</p>
            </div>

            {uc.privacyNote && (
              <p className="text-xs text-slate-400 italic">{uc.privacyNote}</p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
          <div className="flex flex-wrap gap-1.5">
            {uc.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-slate-300 group-hover:text-slate-500 transition select-none">
            {expanded ? "Less" : "Details"} ↕
          </span>
        </div>
      </div>
    </div>
  );
}
