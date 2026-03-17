export type UseCaseStatus = "active" | "scheduled" | "building";

export interface UseCase {
  id: string;
  title: string;
  category: string;
  description: string;
  howItWorks: string[];
  outcome: string;
  status: UseCaseStatus;
  schedule?: string;
  privacyNote?: string;
  livePreview?: {
    label: string;
    value: string;
  }[];
  icon: string;
  tags: string[];
}

export const USE_CASES: UseCase[] = [
  {
    id: "morning-briefing",
    title: "Morning Briefing",
    category: "Executive Intelligence",
    description: "A personalized daily brief delivered at 6:30 AM — calendar, inbox highlights, and AI news in one Telegram message.",
    howItWorks: [
      "Fetches today's calendar via Microsoft Graph API",
      "Pulls top unread emails, cross-references with meetings",
      "Searches the web for AI news from the past 24 hours",
      "Formats and delivers to Telegram before the workday starts",
    ],
    outcome: "Zero manual research before the first meeting. Walk in prepared.",
    status: "active",
    schedule: "Daily at 6:30 AM PT",
    privacyNote: "Meeting titles and email senders anonymized in demo",
    livePreview: [
      { label: "Next run", value: "Tomorrow 6:30 AM" },
      { label: "Last delivered", value: "Today" },
      { label: "Sections", value: "Calendar · Inbox · AI News" },
    ],
    icon: "☀️",
    tags: ["Calendar", "Email", "AI News", "Telegram"],
  },
  {
    id: "email-triage",
    title: "Email Triage",
    category: "Executive Intelligence",
    description: "Every evening, surfaces emails from the past 48 hours that likely need a reply — filtered by sender, urgency signals, and action language.",
    howItWorks: [
      "Fetches recent emails via Microsoft Graph API",
      "Filters out automated notifications, calendar invites, ServiceNow alerts",
      "Scores remaining emails by: sender seniority, action language, thread activity",
      "Delivers a clean 'Needs Your Reply' list to Telegram at 5:30 PM",
    ],
    outcome: "No important email goes unanswered. Inbox zero mindset without the work.",
    status: "active",
    schedule: "Weekdays at 5:30 PM PT",
    privacyNote: "Sender names shown as initials + role in demo",
    livePreview: [
      { label: "Next run", value: "Today 5:30 PM" },
      { label: "Emails scanned", value: "Last 48 hours" },
      { label: "Avg flagged", value: "3–6 emails/day" },
    ],
    icon: "📬",
    tags: ["Email", "Microsoft Graph", "Telegram"],
  },
  {
    id: "linkedin-machine",
    title: "LinkedIn Post Machine",
    category: "Thought Leadership",
    description: "Every Friday, drafts two instructional LinkedIn posts based on the week's activity — sourced from email, Teams channels, and 1:1 chats.",
    howItWorks: [
      "Scans email for project milestones, wins, and notable outcomes",
      "Reads Teams channels: AI Use Cases, TritonAI Internal, AI Admin Workgroup",
      "Checks 1:1 chats with direct reports, Anna Nordeen, Kevin Chou, AI Core Team",
      "Drafts two posts: one use case walkthrough, one outcome/numbers post",
      "Delivers to Telegram for review — reply 'post 1' or 'tweak 1: [notes]'",
    ],
    outcome: "Consistent LinkedIn presence without the time investment. Instructional posts that build credibility.",
    status: "active",
    schedule: "Fridays at 5:00 PM PT",
    livePreview: [
      { label: "Next draft", value: "Friday 5:00 PM" },
      { label: "Sources", value: "Email · Teams · Chats" },
      { label: "Format", value: "Use Case + Outcome" },
    ],
    icon: "✍️",
    tags: ["LinkedIn", "Teams", "Email", "Content"],
  },
  {
    id: "tritongpt-intel",
    title: "TritonAI Intel Brief",
    category: "Competitive Intelligence",
    description: "Every Sunday morning, a strategic brief on what peer universities and competitors are doing in AI — so the TritonAI team stays ahead.",
    howItWorks: [
      "Searches the web for institutional AI deployments at peer universities",
      "Monitors AI vendor and platform news targeting higher education",
      "Tracks governance, policy, and compliance developments",
      "Flags early signals relevant to TritonAI roadmap",
      "Delivered to Telegram every Sunday at 8:00 AM",
    ],
    outcome: "Walk into every meeting and conference knowing the competitive landscape cold.",
    status: "active",
    schedule: "Sundays at 8:00 AM PT",
    livePreview: [
      { label: "Next run", value: "Sunday 8:00 AM" },
      { label: "Sections", value: "Peer Moves · Vendors · Governance · Wildcards" },
      { label: "Coverage", value: "UC System + R1 peers" },
    ],
    icon: "🔭",
    tags: ["Higher Ed", "TritonAI", "Competitive Intel", "Strategy"],
  },
  {
    id: "evening-reflection",
    title: "Evening Reflection",
    category: "Executive Intelligence",
    description: "A daily end-of-day recap — what worked, what didn't, what needs attention tomorrow. Honest, direct, under 200 words.",
    howItWorks: [
      "Reviews the day's activity and conversation context",
      "Identifies friction points and wins",
      "Cross-references emails needing reply",
      "Surfaces tomorrow's calendar highlights",
      "Delivered to Telegram at 5:30 PM with the email triage",
    ],
    outcome: "End each day with clarity. No loose ends slipping through.",
    status: "active",
    schedule: "Weekdays at 5:30 PM PT",
    livePreview: [
      { label: "Next run", value: "Today 5:30 PM" },
      { label: "Includes", value: "Wins · Gaps · Tomorrow" },
    ],
    icon: "🪞",
    tags: ["Reflection", "Productivity", "Telegram"],
  },
  {
    id: "teams-integration",
    title: "Teams & Exchange Integration",
    category: "Data Sources",
    description: "Full read access to Microsoft 365 — 39 Teams, all channels, 1:1 chats, email, and calendar — feeding context into every automation.",
    howItWorks: [
      "OAuth device flow authentication with UC San Diego Microsoft tenant",
      "Delegated permissions: Mail.Read, Calendars.Read, Chat.Read, ChannelMessage.Read.All",
      "Token auto-refreshed hourly to maintain access",
      "Feeds data to: Morning Briefing, Email Triage, LinkedIn Machine, Evening Reflection",
    ],
    outcome: "All automations have live institutional context. No copy-pasting. No context switching.",
    status: "active",
    livePreview: [
      { label: "Teams", value: "39 workspaces" },
      { label: "Chats", value: "1:1s + group threads" },
      { label: "Token refresh", value: "Every hour" },
    ],
    icon: "🔗",
    tags: ["Microsoft 365", "Teams", "Exchange", "OAuth"],
  },
  {
    id: "local-llm",
    title: "Local LLM (Qwen 2.5 14B)",
    category: "Infrastructure",
    description: "A locally-hosted large language model running on the Mac mini's M4 chip — for privacy-sensitive tasks that shouldn't leave the building.",
    howItWorks: [
      "Qwen 2.5 14B running via Ollama on M4 Mac mini",
      "11.8 GiB Apple Metal GPU acceleration",
      "Registered as a model provider in OpenClaw",
      "Switch with /model qwen — switch back with /model sonnet",
    ],
    outcome: "Sensitive institutional data stays on-prem. Zero API costs for local tasks.",
    status: "active",
    livePreview: [
      { label: "Model", value: "Qwen 2.5 14B (Q4)" },
      { label: "Hardware", value: "Apple M4 · 16GB" },
      { label: "Alias", value: "/model qwen" },
    ],
    icon: "🧠",
    tags: ["Local AI", "Ollama", "Privacy", "On-Prem"],
  },
  {
    id: "pre-meeting-brief",
    title: "Pre-Meeting Brief",
    category: "Executive Intelligence",
    description: "15 minutes before each meeting, relevant email context and talking points surface automatically — so every meeting starts informed.",
    howItWorks: [
      "Monitors calendar for upcoming meetings",
      "Searches email and Teams for threads related to the meeting topic or attendees",
      "Generates a 3-bullet context brief",
      "Delivers to Telegram 15 minutes before start time",
    ],
    outcome: "Walk into every meeting knowing the recent context. No last-minute scrambling.",
    status: "building",
    icon: "📋",
    tags: ["Calendar", "Email", "Teams", "Meetings"],
  },
];
