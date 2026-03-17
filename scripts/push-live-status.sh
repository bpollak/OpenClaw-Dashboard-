#!/bin/bash
# Fetches live OpenClaw cron status and pushes to GitHub → triggers Vercel redeploy
# Run via OpenClaw cron job

set -e

REPO="/Users/brettpollak/.openclaw/workspace/henry-dashboard"
OUTPUT="$REPO/public/live-status.json"

# Fetch cron status
STATUS=$(openclaw cron list --json 2>/dev/null)
if [ -z "$STATUS" ]; then
  echo "Failed to fetch cron status"
  exit 1
fi

# Write with timestamp
python3 -c "
import sys, json
data = json.loads('''$STATUS''')
jobs = {}
for j in data.get('jobs', []):
    jobs[j['name']] = {
        'id': j['id'],
        'enabled': j['enabled'],
        'lastStatus': j.get('state', {}).get('lastStatus'),
        'lastRunAtMs': j.get('state', {}).get('lastRunAtMs'),
        'lastDelivered': j.get('state', {}).get('lastDelivered'),
        'nextRunAtMs': j.get('state', {}).get('nextRunAtMs'),
        'lastDurationMs': j.get('state', {}).get('lastDurationMs'),
    }
output = {'jobs': jobs, 'updatedAt': $(python3 -c 'import time; print(int(time.time()*1000))')}
with open('$OUTPUT', 'w') as f:
    json.dump(output, f, indent=2)
print('Written to $OUTPUT')
"

# Commit and push if changed
cd "$REPO"
if git diff --quiet public/live-status.json 2>/dev/null; then
  echo "No changes to live-status.json — skipping push"
  exit 0
fi

git add public/live-status.json
git commit -m "chore: update live status $(date +%Y-%m-%dT%H:%M)"
git push origin main
echo "Pushed live status update"
