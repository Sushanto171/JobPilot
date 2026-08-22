export interface Application {
  id: string;
  company: string;
  code: string;
  role: string;
  date: string;
  stage: Stage;
  location: string;
}

export type Stage = "APPLIED" | "SCREENING" | "INTERVIEW" | "CLOSED";

export interface StageConfig {
  key: Stage;
  label: string;
  color: string;
}

export interface Resume {
  id: string;
  label: string;
  tag: "MASTER" | "TAILORED";
  linked: string | null;
  updated: string;
  keywords: string[];
}

export interface AnalyticsStat {
  label: string;
  value: string;
  delta: string;
  icon: "trending" | "chart" | "zap" | "sparkles";
}

export interface AnalyticsData {
  stats: AnalyticsStat[];
  responseTrend: { week: string; rate: number }[];
  pipelineDistribution: { name: string; value: number; color: string }[];
  matchedKeywords: { keyword: string; matches: number }[];
}

export interface UserProfile {
  initials: string;
  name: string;
  email: string;
  location: string;
  targetRole: string;
  headline: string;
}

export interface SettingsDefaults {
  autoTailor: boolean;
  emailNotifications: boolean;
  followupDays: number;
  darkMode: boolean;
}

export interface ParsedJob {
  company: string;
  code: string;
  role: string;
  seniority: string;
  location: string;
  skills: string[];
}

export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: string;
}

export interface PageMeta {
  title: string;
  subtitle: string;
}
