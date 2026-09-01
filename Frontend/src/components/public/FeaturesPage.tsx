"use client";
import {
  ArrowRight,
  BarChart3,
  Clock,
  LayoutGrid,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  COLORS,
  PrimaryButton,
  Reveal,
  SectionTag,
  usePublicNavigation,
} from "./shared";
const FEATURES = [
  {
    icon: Sparkles,
    color: COLORS.cyan,
    title: "Grounded AI resume tailoring",
    desc: "Every tailored resume is built strictly from your existing experience. The AI reorders, reweights, and rewords — it never invents a skill, project, or metric. Gaps between the JD and your resume are surfaced explicitly, not papered over.",
  },
  {
    icon: LayoutGrid,
    color: COLORS.amber,
    title: "The flight-strip pipeline board",
    desc: "Applications move through Applied → Screening → Interview → Offer/Rejected as draggable strips on a rack board — built so a glance tells you exactly where every application stands, with nothing lost in a spreadsheet.",
  },
  {
    icon: Clock,
    color: COLORS.rose,
    title: "Automated, human-approved follow-ups",
    desc: "A background job drafts a follow-up email after a set number of days of silence. Nothing sends without your review — you can edit tone, add a detail, or skip it entirely.",
  },
  {
    icon: BarChart3,
    color: COLORS.cyan,
    title: "A real feedback loop",
    desc: "Response rate by resume version, by keyword, by company type. Instead of guessing why applications go quiet, you get a dashboard that tells you what to change next.",
  },
  {
    icon: ShieldCheck,
    color: COLORS.amber,
    title: "Full AI audit trail",
    desc: "Every AI call — parsing, tailoring, drafting — is logged with its input, output, and status. If something looks off, you can see exactly what the model was given and what it returned.",
  },
  {
    icon: Radio,
    color: COLORS.rose,
    title: "Built on real infrastructure",
    desc: "PostgreSQL, Prisma, Redis, and BullMQ under the hood — async job queues with retries and backoff, not a fragile synchronous wrapper around an API call.",
  },
];
export function FeaturesPage() {
  const goTo = usePublicNavigation();
  return (
    <div className="max-w-6xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <SectionTag>FEATURES</SectionTag>
        <h1
          className="mt-2 max-w-xl"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "38px",
            color: COLORS.paper,
          }}
        >
          Everything that makes JobPilot more than a spreadsheet.
        </h1>
        <p className="mt-3 max-w-lg text-sm" style={{ color: COLORS.textDim }}>
          Each feature below exists because it solves a specific, measurable
          problem in a real job search — not because it sounded good in a pitch
          deck.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={i * 80}>
              <div
                className="h-full p-6 rounded-md"
                style={{
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                  style={{ backgroundColor: COLORS.surfaceLight }}
                >
                  <Icon size={18} color={feature.color} />
                </div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: COLORS.paper }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: COLORS.textDim }}
                >
                  {feature.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={150}>
        <div className="mt-14 flex justify-center">
          <PrimaryButton onClick={() => goTo("signup")}>
            Try it free <ArrowRight size={15} />
          </PrimaryButton>
        </div>
      </Reveal>
    </div>
  );
}
