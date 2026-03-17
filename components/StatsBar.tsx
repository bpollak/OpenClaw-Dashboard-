interface Props {
  active: number;
  scheduled: number;
  building: number;
  total: number;
}

export default function StatsBar({ active, scheduled, building, total }: Props) {
  const stats = [
    { label: "Total Automations", value: total, icon: "⚡", bg: "bg-white", text: "text-slate-900", sub: "text-slate-500", border: "border-slate-200" },
    { label: "Running Now", value: active, icon: "🟢", bg: "bg-white", text: "text-emerald-600", sub: "text-emerald-400", border: "border-emerald-100" },
    { label: "Scheduled", value: scheduled, icon: "🕐", bg: "bg-white", text: "text-blue-600", sub: "text-blue-400", border: "border-blue-100" },
    { label: "In Development", value: building, icon: "🔧", bg: "bg-white", text: "text-amber-600", sub: "text-amber-400", border: "border-amber-100" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
      {stats.map((s) => (
        <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm flex items-center gap-4`}>
          <span className="text-2xl">{s.icon}</span>
          <div>
            <div className={`text-3xl font-bold ${s.text}`}>{s.value}</div>
            <div className={`text-xs font-medium ${s.sub} mt-0.5`}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
