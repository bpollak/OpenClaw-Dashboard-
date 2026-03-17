interface Props {
  active: number;
  scheduled: number;
  building: number;
  total: number;
}

export default function StatsBar({ active, scheduled, building, total }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-12">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 shadow-lg shadow-indigo-200">
        <div className="text-4xl font-black text-white mb-1">{total}</div>
        <div className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">Total Automations</div>
      </div>
      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-live" />
          <span className="text-4xl font-black text-emerald-600">{active}</span>
        </div>
        <div className="text-emerald-500 text-xs font-semibold uppercase tracking-wider">Running Live</div>
      </div>
      <div className="rounded-2xl bg-sky-50 border border-sky-100 p-5">
        <div className="text-4xl font-black text-sky-600 mb-1">{scheduled}</div>
        <div className="text-sky-400 text-xs font-semibold uppercase tracking-wider">Scheduled</div>
      </div>
      <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5">
        <div className="text-4xl font-black text-amber-500 mb-1">{building}</div>
        <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider">In Development</div>
      </div>
    </div>
  );
}
