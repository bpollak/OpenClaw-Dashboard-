#!/usr/bin/env python3
"""
Fetches live OpenClaw cron status and writes to public/live-status.json.
Called by an OpenClaw cron job — commits and pushes to trigger Vercel redeploy.
"""

import subprocess, json, os, sys, time
from pathlib import Path

REPO = Path("/Users/brettpollak/.openclaw/workspace/henry-dashboard")
OUTPUT = REPO / "public" / "live-status.json"

def run(cmd, **kwargs):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True, **kwargs)

# Fetch cron status
result = run("openclaw cron list --json 2>/dev/null")
if result.returncode != 0 or not result.stdout.strip():
    print("Failed to fetch cron status:", result.stderr)
    sys.exit(1)

data = json.loads(result.stdout)
jobs = {}
for j in data.get("jobs", []):
    jobs[j["name"]] = {
        "id": j["id"],
        "enabled": j["enabled"],
        "lastStatus": j.get("state", {}).get("lastStatus"),
        "lastRunAtMs": j.get("state", {}).get("lastRunAtMs"),
        "lastDelivered": j.get("state", {}).get("lastDelivered"),
        "nextRunAtMs": j.get("state", {}).get("nextRunAtMs"),
        "lastDurationMs": j.get("state", {}).get("lastDurationMs"),
    }

output = {"jobs": jobs, "updatedAt": int(time.time() * 1000)}
OUTPUT.write_text(json.dumps(output, indent=2))
print(f"Written {len(jobs)} jobs to {OUTPUT}")

# Commit and push if changed
os.chdir(REPO)
diff = run("git diff --quiet public/live-status.json")
if diff.returncode == 0:
    print("No changes — skipping push")
    sys.exit(0)

run("git add public/live-status.json")
stamp = time.strftime("%Y-%m-%dT%H:%M")
commit = run(f'git commit -m "chore: live status {stamp}"')
print(commit.stdout.strip())

push = run("git push origin main")
if push.returncode == 0:
    print("Pushed — Vercel will redeploy")
else:
    print("Push failed:", push.stderr)
    sys.exit(1)
