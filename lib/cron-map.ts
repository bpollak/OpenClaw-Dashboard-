// Maps automation id → OpenClaw cron job name
export const CRON_MAP: Record<string, string> = {
  // Executive Intelligence
  "morning-briefing":          "briefing-calendar-email",
  "email-triage":              "evening-wrap",
  "evening-reflection":        "evening-wrap",
  "opportunity-scan":          "opportunity-scan",
  "tritongpt-intel":           "tritongpt-intel-sunday",
  "pre-meeting-brief":         "granola-meeting-debrief",
  "relationship-health":       "relationship-health-check",

  // Thought Leadership
  "linkedin-machine":          "linkedin-post-machine",

  // Data Sources & Infrastructure
  "teams-integration":         "graph-token-refresh",
  "knowledge-graph":           "knowledge-graph-rebuild",
  "student-signals":           "student-pain-signal-monitor",
  "it-job-monitor":            "it-job-monitor",

  // Development & Maintenance
  "ai-automation-dashboard":   "openclaw-update-watch",
  "overnight-code-maintenance": "overnight-code-maintenance",
  "briefing-ai-news":          "briefing-ai-news",
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
