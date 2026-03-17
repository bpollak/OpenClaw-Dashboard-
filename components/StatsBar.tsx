interface Props {
  active: number;
  scheduled: number;
  building: number;
  total: number;
}

export default function StatsBar({ active, scheduled, building, total }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-12">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 shadow-lg shadow-indigo-500/20">
        <div className="text-4xl font-black text-white mb-1">{total}</div>
        <div className="text-indigo-200 text-xs font-medium uppercase tracking-wider">Total Automations</div>
      </div>
      <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-live" />
          <span className="text-4xl font-black text-emerald-400">{active}</span>
        </div>
        <div className="text-white/40 text-xs font-medium uppercase tracking-wider">Running Live</div>
      </div>
      <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
        <div className="text-4xl font-black text-sky-400 mb-1">{scheduled}</div>
        <div className="text-white/40 text-xs font-medium uppercase tracking-wider">Scheduled</div>
      </div>
      <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
        <div className="text-4xl font-black text-amber-400 mb-1">{building}</div>
        <div className="text-white/40 text-xs font-medium uppercase tracking-wider">In Development</div>
      </div>
    </div>
  );
}
