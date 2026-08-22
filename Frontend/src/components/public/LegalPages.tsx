"use client";
import { COLORS, Reveal } from "./shared";
const PRIVACY = [
  {
    h: "What we store",
    p: "Your account details, base and tailored resumes, application records, and the inputs/outputs of AI processing tied to your account.",
  },
  {
    h: "How AI processing works",
    p: "Job descriptions and resume content you submit are sent to our AI provider for parsing and tailoring. We do not use your resume content to train models.",
  },
  {
    h: "Data sharing",
    p: "We do not sell your data. Resume and application data is never shared with third parties outside the processing described above.",
  },
  {
    h: "Your controls",
    p: "You can export or delete all of your data at any time from Settings.",
  },
  {
    h: "Contact",
    p: "Questions about this policy can be sent to hello@jobpilot.app.",
  },
];
const TERMS = [
  {
    h: "Using JobPilot",
    p: "You agree to use JobPilot for personal job-search tracking and related purposes.",
  },
  {
    h: "AI-generated content",
    p: "Tailored resumes and drafted follow-ups are suggestions. You are responsible for reviewing and approving anything before it is sent.",
  },
  {
    h: "Accounts",
    p: "You're responsible for keeping your account credentials secure and for all activity under your account.",
  },
  {
    h: "Plan limits",
    p: "Free accounts are limited to 20 applications per month.",
  },
  { h: "Termination", p: "You may delete your account at any time." },
];
function Legal({
  title,
  sections,
}: {
  title: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <h1
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "32px",
            color: COLORS.paper,
          }}
        >
          {title}
        </h1>
        <p
          className="text-xs mt-2"
          style={{ color: COLORS.textDim2, fontFamily: "monospace" }}
        >
          Last updated: August 1, 2026
        </p>
      </Reveal>
      <div className="mt-8 space-y-6">
        {sections.map((section, i) => (
          <Reveal key={section.h} delay={i * 40}>
            <h2
              className="text-sm font-semibold mb-2"
              style={{ color: COLORS.paper }}
            >
              {section.h}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: COLORS.textDim }}
            >
              {section.p}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
export function PrivacyPage() {
  return <Legal title="Privacy Policy" sections={PRIVACY} />;
}
export function TermsPage() {
  return <Legal title="Terms of Service" sections={TERMS} />;
}
