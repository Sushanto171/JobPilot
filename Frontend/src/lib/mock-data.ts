import { type AnalyticsData, type Application, type Resume, type SettingsDefaults, type StageConfig, type UserProfile } from "./types";

export const COLORS = {
  base: "#14181F",
  surface: "#1C222C",
  surfaceLight: "#242B37",
  border: "#2E3542",
  paper: "#EDEAE1",
  paperDim: "#E2DED2",
  amber: "#F2A93B",
  cyan: "#3FC1C9",
  rose: "#E0567C",
  textDim: "#8A93A3",
  textDim2: "#5C6577",
} as const;

export const STAGES: StageConfig[] = [
  { key: "APPLIED", label: "Applied", color: COLORS.textDim },
  { key: "SCREENING", label: "Screening", color: COLORS.amber },
  { key: "INTERVIEW", label: "Interview", color: COLORS.cyan },
  { key: "CLOSED", label: "Offer / Closed", color: COLORS.rose },
];

export const SEED_APPLICATIONS: Application[] = [
  { id: "s1", company: "ACME LABS", code: "ACM", role: "Sr. Backend Eng", date: "08.14", stage: "APPLIED", location: "Remote" },
  { id: "s2", company: "NORTHWIND", code: "NWD", role: "Node.js Developer", date: "08.15", stage: "APPLIED", location: "Dhaka" },
  { id: "s3", company: "VELOCIRA", code: "VLC", role: "Backend Engineer", date: "08.11", stage: "SCREENING", location: "Remote" },
  { id: "s4", company: "PIXELFORGE", code: "PXF", role: "Fullstack Dev", date: "08.09", stage: "SCREENING", location: "Remote" },
  { id: "s5", company: "HALCYON IO", code: "HAL", role: "Platform Engineer", date: "08.05", stage: "INTERVIEW", location: "Singapore" },
  { id: "s6", company: "REDSHIFT", code: "RSH", role: "SDE - Backend", date: "07.29", stage: "CLOSED", location: "Remote" },
];

export const SEED_RESUMES: Resume[] = [
  { id: "r1", label: "Base Resume", tag: "MASTER", linked: null, updated: "07.20", keywords: [] },
  { id: "r2", label: "v2 · Acme Labs", tag: "TAILORED", linked: "ACME LABS", updated: "08.14", keywords: ["Docker", "BullMQ", "PostgreSQL"] },
  { id: "r3", label: "v3 · Northwind", tag: "TAILORED", linked: "NORTHWIND", updated: "08.15", keywords: ["TypeScript", "Redis", "Prisma"] },
  { id: "r4", label: "v4 · Halcyon IO", tag: "TAILORED", linked: "HALCYON IO", updated: "08.05", keywords: ["Docker", "CI/CD", "Kubernetes"] },
];

export const ANALYTICS_DATA: AnalyticsData = {
  stats: [
    { label: "APPLICATIONS", value: "6", delta: "+2 this week", icon: "trending" },
    { label: "RESPONSE RATE", value: "33%", delta: "+11% vs baseline", icon: "chart" },
    { label: "AVG TIME SAVED", value: "17m", delta: "per application", icon: "zap" },
    { label: "AI SUCCESS RATE", value: "96%", delta: "47/49 jobs", icon: "sparkles" },
  ],
  responseTrend: [
    { week: "W1", rate: 8 }, { week: "W2", rate: 14 }, { week: "W3", rate: 12 },
    { week: "W4", rate: 22 }, { week: "W5", rate: 31 }, { week: "W6", rate: 27 },
  ],
  pipelineDistribution: [
    { name: "Applied", value: 2, color: COLORS.textDim },
    { name: "Screening", value: 2, color: COLORS.amber },
    { name: "Interview", value: 1, color: COLORS.cyan },
    { name: "Closed", value: 1, color: COLORS.rose },
  ],
  matchedKeywords: [
    { keyword: "Docker", matches: 9 }, { keyword: "BullMQ", matches: 6 },
    { keyword: "PostgreSQL", matches: 8 }, { keyword: "TypeScript", matches: 11 },
    { keyword: "Redis", matches: 5 },
  ],
};

export const USER_PROFILE: UserProfile = {
  initials: "SK",
  name: "Sushanto Kumar",
  email: "sushanto@mail.com",
  location: "Dhaka, Bangladesh",
  targetRole: "Backend / Node.js Engineer",
  headline: "Backend Developer · Bangladesh",
};

export const SETTINGS_DEFAULTS: SettingsDefaults = {
  autoTailor: true,
  emailNotifications: true,
  followupDays: 7,
  darkMode: true,
};

export const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  pipeline: { title: "Pipeline", subtitle: "6 applications in flight" },
  analytics: { title: "Analytics", subtitle: "Your job search, measured" },
  resumes: { title: "Resumes", subtitle: "Base resume and tailored versions" },
  settings: { title: "Settings", subtitle: "Automation, notifications, account" },
  profile: { title: "Profile", subtitle: "Your personal details" },
};
