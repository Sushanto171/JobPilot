"use client";
import {
  ArrowRight,
  BarChart3,
  Clock,
  LayoutGrid,
  Link2,
  ScanSearch,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  COLORS,
  GhostButton,
  PrimaryButton,
  Reveal,
  SectionTag,
  usePublicNavigation,
} from "./shared";

function MiniStrip({
  company,
  code,
  role,
  color,
  style,
}: {
  company: string;
  code: string;
  role: string;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="float-strip absolute shadow-2xl rounded-sm overflow-hidden flex"
      style={{
        width: "210px",
        backgroundColor: COLORS.paper,
        border: `1px solid ${COLORS.paperDim}`,
        ...style,
      }}
    >
      <div style={{ width: "4px", backgroundColor: color, flexShrink: 0 }} />
      <div className="px-3 py-2">
        <div
          style={{ fontFamily: "monospace", fontSize: "9px", color: "#6B6558" }}
        >
          {code} · 08.21
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "12px",
            color: "#1C1A15",
          }}
        >
          {company}
        </div>
        <div style={{ fontSize: "10px", color: "#4A4638" }}>{role}</div>
      </div>
    </div>
  );
}
const FEATURES = [
  {
    icon: Sparkles,
    color: COLORS.cyan,
    title: "AI resume tailoring — grounded, not invented",
    desc: "Reorders and reworks your real experience to match a job description. Missing skills are flagged honestly, never fabricated.",
  },
  {
    icon: LayoutGrid,
    color: COLORS.amber,
    title: "A pipeline board that feels like mission control",
    desc: "Every application is a flight strip moving through Applied → Screening → Interview → Offer.",
  },
  {
    icon: Clock,
    color: COLORS.rose,
    title: "Follow-ups that actually get sent",
    desc: "Background jobs draft a follow-up after 7 days of silence. You approve, edit, or send.",
  },
  {
    icon: BarChart3,
    color: COLORS.cyan,
    title: "Analytics that close the loop",
    desc: "See which resume version and keywords are converting, so your search improves every week.",
  },
];
const STEPS = [
  {
    icon: Link2,
    label: "Paste",
    desc: "Drop in a job URL or the raw JD text.",
  },
  {
    icon: ScanSearch,
    label: "Parse",
    desc: "AI extracts skills, seniority, and keywords.",
  },
  {
    icon: Sparkles,
    label: "Tailor",
    desc: "Your resume is reworked and grounded — you approve it.",
  },
  {
    icon: Send,
    label: "Apply",
    desc: "Confirm, and it lands in your pipeline as Applied.",
  },
];
export function HomePage() {
  const goTo = usePublicNavigation();
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-24 md:pt-24 md:pb-32 relative">
          <div
            className="hidden lg:block absolute -right-4 top-8 pointer-events-none opacity-90"
            style={{ width: "260px", height: "260px" }}
          >
            <MiniStrip
              company="ACME LABS"
              code="ACM"
              role="Sr. Backend Eng"
              color={COLORS.textDim}
              style={
                { top: 0, right: 40, "--r": "-4deg" } as React.CSSProperties
              }
            />
            <MiniStrip
              company="HALCYON IO"
              code="HAL"
              role="Platform Eng"
              color={COLORS.cyan}
              style={
                {
                  top: 80,
                  right: 0,
                  "--r": "3deg",
                  animationDelay: "0.6s",
                } as React.CSSProperties
              }
            />
            <MiniStrip
              company="VELOCIRA"
              code="VLC"
              role="Backend Eng"
              color={COLORS.amber}
              style={
                {
                  top: 165,
                  right: 55,
                  "--r": "-2deg",
                  animationDelay: "1.2s",
                } as React.CSSProperties
              }
            />
          </div>
          <Reveal>
            <div
              className="flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full w-fit"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <Sparkles size={12} color={COLORS.cyan} />
              <span
                className="text-xs"
                style={{ color: COLORS.textDim, fontFamily: "monospace" }}
              >
                AI-GROUNDED · NEVER FABRICATES
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="max-w-2xl"
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 52px)",
                lineHeight: 1.08,
                color: COLORS.paper,
              }}
            >
              Run your job search like a control tower.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="max-w-lg mt-5 text-base leading-relaxed"
              style={{ color: COLORS.textDim }}
            >
              JobPilot tracks every application like a flight strip on a board —
              AI tailors your resume per job description, drafts your
              follow-ups, and shows you what's actually working. You approve
              everything before it moves.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <PrimaryButton onClick={() => goTo("signup")}>
                Start tracking free <ArrowRight size={15} />
              </PrimaryButton>
              <GhostButton onClick={() => goTo("features")}>
                See how it works
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
          backgroundColor: COLORS.surface,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "15–20 min|wasted tailoring each resume by hand",
            "40+|applications before you lose track of what went where",
            "0|feedback loops most job seekers have on what's working",
          ].map((item, i) => {
            const [stat, label] = item.split("|");
            return (
              <Reveal key={label} delay={i * 100}>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "30px",
                    fontWeight: 700,
                    color: COLORS.amber,
                  }}
                >
                  {stat}
                </div>
                <div
                  className="text-sm mt-1.5"
                  style={{ color: COLORS.textDim }}
                >
                  {label}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 py-20">
        <Reveal>
          <SectionTag>FEATURES</SectionTag>
          <h2
            className="mt-2 max-w-md"
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "30px",
              color: COLORS.paper,
            }}
          >
            Built like production software, not a demo.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={i * 90}>
                <div
                  className="h-full p-5 rounded-md"
                  style={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center mb-4"
                    style={{ backgroundColor: COLORS.surfaceLight }}
                  >
                    <Icon size={16} color={feature.color} />
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
        <button
          onClick={() => goTo("features")}
          className="flex items-center gap-1.5 text-sm mt-8"
          style={{ color: COLORS.cyan }}
        >
          See all features <ArrowRight size={13} />
        </button>
      </div>
      <div
        style={{
          backgroundColor: COLORS.surface,
          borderTop: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-20">
          <Reveal>
            <SectionTag>HOW IT WORKS</SectionTag>
            <h2
              className="mt-2"
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "30px",
                color: COLORS.paper,
              }}
            >
              Four steps. One human approval gate.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.label} delay={i * 100}>
                  <div
                    className="relative p-5 rounded-md h-full"
                    style={{
                      backgroundColor: COLORS.base,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: COLORS.surfaceLight }}
                      >
                        <Icon size={14} color={COLORS.amber} />
                      </div>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "11px",
                          color: COLORS.textDim2,
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <div
                      className="text-sm font-semibold mb-1.5"
                      style={{ color: COLORS.paper, fontFamily: "monospace" }}
                    >
                      {step.label}
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: COLORS.textDim }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="py-6 overflow-hidden"
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
      >
        <div className="flex gap-10 w-max marquee-track">
          {[
            "NO FABRICATED SKILLS",
            "HUMAN APPROVAL ON EVERY STEP",
            "FULL AI AUDIT TRAIL",
            "BUILT ON POSTGRES + REDIS + BULLMQ",
            "OPEN SOURCE BACKEND",
            "NO FABRICATED SKILLS",
            "HUMAN APPROVAL ON EVERY STEP",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <ShieldCheck size={13} color={COLORS.textDim2} />
              <span
                className="text-xs"
                style={{ fontFamily: "monospace", color: COLORS.textDim2 }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 py-20">
        <Reveal>
          <div
            className="rounded-lg p-10 md:p-14 text-center"
            style={{
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <h2
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "34px",
                color: COLORS.paper,
              }}
            >
              Stop guessing. Start tracking.
            </h2>
            <p
              className="max-w-md mx-auto mt-3 text-sm"
              style={{ color: COLORS.textDim }}
            >
              Free for up to 20 applications a month. No credit card. Your data,
              your resume, your call on every AI suggestion.
            </p>
            <div className="mt-7 flex justify-center">
              <PrimaryButton onClick={() => goTo("signup")}>
                Get started free <ArrowRight size={15} />
              </PrimaryButton>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
