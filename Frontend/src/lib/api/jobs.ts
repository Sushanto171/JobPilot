import { Application } from "../types";

export interface ParsedJob {
  company: string;
  code: string;
  role: string;
  seniority: string;
  location: string;
  skills: string[];
  hrEmail: string | null;
}

export async function parseJobDescription(raw: string): Promise<ParsedJob> {
  const text = raw.trim();
  const words = text.split(/\s+/).filter(Boolean);
  const capitalWord =
    words.find((word) => /^[A-Z][a-zA-Z]{2,}/.test(word)) ?? "ACME LABS";
  const company =
    capitalWord.replace(/[^a-zA-Z]/g, "").toUpperCase() || "ACME LABS";

  const roleGuess = /senior|sr\.?/i.test(text)
    ? "Sr. Backend Engineer"
    : /front ?end/i.test(text)
      ? "Frontend Engineer"
      : /full ?stack/i.test(text)
        ? "Fullstack Developer"
        : "Backend Engineer";

  return {
    company: company.length > 2 ? company : "ACME LABS",
    code: company.slice(0, 3) || "ACM",
    role: roleGuess,
    seniority: /senior|sr\.?/i.test(text) ? "Senior" : "Mid-level",
    location: /remote/i.test(text) ? "Remote" : "Dhaka",
    skills: ["Node.js", "PostgreSQL", "Docker", "Redis", "TypeScript"],
    hrEmail:
      text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] ?? null,
  };
}

export function createApplicationFromParsedJob(job: ParsedJob): Application {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  return {
    id: `job-${Date.now()}`,
    company: job.company,
    code: job.code,
    role: job.role,
    date: `${mm}.${dd}`,
    stage: "APPLIED",
    location: job.location,
  };
}
