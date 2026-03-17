// Maps automation id → OpenClaw cron job name
export const CRON_MAP: Record<string, string> = {
  "morning-briefing":   "briefing-calendar-email",
  "email-triage":       "daily-reflection",
  "evening-reflection": "daily-reflection",
  "linkedin-machine":   "linkedin-post-machine",
  "tritongpt-intel":    "tritongpt-intel-sunday",
  "teams-integration":  "graph-token-refresh",
};

export function formatRelativeTime(ms: number | null): string {
  if (!ms) return "—";
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function formatNextRun(ms: number | null): string {
  if (!ms) return "—";
  const diff = ms - Date.now();
  if (diff < 0) return "Due";
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (mins < 60) return `In ${mins}m`;
  if (hours < 24) return `In ${hours}h`;
  const d = new Date(ms);
  return d.toLocaleDateString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" });
}
