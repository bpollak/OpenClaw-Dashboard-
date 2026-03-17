interface Props {
  active: number;
  scheduled: number;
  building: number;
  total: number;
}

export default function StatsBar({ active, scheduled, building, total }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
      {[
        { label: "Total Use Cases", value: total, color: "text-white" },
        { label: "Active & Running", value: active, color: "text-emerald-400" },
        { label: "Scheduled", value: scheduled, color: "text-blue-400" },
        { label: "In Development", value: building, color: "text-amber-400" },
      ].map((stat) => (
        <div key={stat.label} className="bg-[#111827] border border-slate-800 rounded-xl p-4">
          <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
