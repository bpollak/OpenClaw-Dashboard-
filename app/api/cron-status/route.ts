import { exec } from "child_process";
import { promisify } from "util";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const execAsync = promisify(exec);

export interface CronJobStatus {
  id: string;
  name: string;
  enabled: boolean;
  status: string | null;         // computed top-level status (ok/error/skipped/idle/running/disabled)
  lastStatus: string | null;
  lastRunAtMs: number | null;
  lastDelivered: boolean | null;
  nextRunAtMs: number | null;
  lastDurationMs: number | null;
  consecutiveErrors: number;
}

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { stdout } = await execAsync("openclaw cron list --json 2>/dev/null", {
      env: { ...process.env, PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin" },
    });
    const data = JSON.parse(stdout);
    const jobs: CronJobStatus[] = (data.jobs || []).map((j: any) => ({
      id: j.id,
      name: j.name,
      enabled: j.enabled,
      status: j.status ?? null,
      lastStatus: j.state?.lastStatus ?? null,
      lastRunAtMs: j.state?.lastRunAtMs ?? null,
      lastDelivered: j.state?.lastDelivered ?? null,
      nextRunAtMs: j.state?.nextRunAtMs ?? null,
      lastDurationMs: j.state?.lastDurationMs ?? null,
      consecutiveErrors: j.state?.consecutiveErrors ?? 0,
    }));
    return NextResponse.json({ jobs, fetchedAt: Date.now() });
  } catch (e) {
    return NextResponse.json({ jobs: [], error: String(e) });
  }
}
