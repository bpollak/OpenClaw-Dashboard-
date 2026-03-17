interface Props {
  active: number;
  scheduled: number;
  building: number;
  total: number;
}

export default function StatsBar({ active, scheduled, building, total }: Props) {
  const stats = [
    { label: "Total", value: total, color: "text-slate-900" },
    { label: "Live", value: active, color: "text-emerald-600" },
    { label: "Scheduled", value: scheduled, color: "text-blue-600" },
    { label: "In Development", value: building, color: "text-amber-600" },
  ];

  return (
    <div className="grid grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden mb-10">
      {stats.map((s, i) => (
        <div key={s.label} className={`bg-white px-6 py-5 ${i === 0 ? "" : ""}`}>
          <div className={`text-3xl font-bold tracking-tight ${s.color}`}>{s.value}</div>
          <div className="text-xs text-slate-400 font-medium mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
