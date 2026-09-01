"use client";
import { Compass, ShieldCheck, User } from "lucide-react";
import { COLORS, Reveal, SectionTag } from "./shared";
export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <SectionTag>ABOUT</SectionTag>
        <h1
          className="mt-2 max-w-xl"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "38px",
            color: COLORS.paper,
          }}
        >
          Built out of an actual job search, not a hackathon idea.
        </h1>
      </Reveal>
      <Reveal delay={100}>
        <div
          className="mt-8 space-y-4 text-sm leading-relaxed"
          style={{ color: COLORS.textDim }}
        >
          <p>
            JobPilot started as a tool for one person applying to 15–20 backend
            engineering roles a week — tailoring each resume by hand, losing
            track of which version went where, and never quite getting to the
            follow-up email that would've mattered.
          </p>
          <p>
            Instead of another spreadsheet, it became a small backend system: a
            queue-driven pipeline, an AI layer with a hard rule against
            inventing experience, and a board that treats every application like
            something worth tracking carefully.
          </p>
          <p>
            It's still shaped by that original use case — every feature exists
            because it solved a real, specific friction point.
          </p>
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {[
            {
              icon: ShieldCheck,
              label: "Grounded by default",
              desc: "AI never adds what isn't already true.",
            },
            {
              icon: Compass,
              label: "Built for real use",
              desc: "Every feature traces back to an actual friction point.",
            },
            {
              icon: User,
              label: "Human-approved",
              desc: "Nothing sends or finalizes without you.",
            },
          ].map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.label}
                className="p-4 rounded-md"
                style={{
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <Icon size={16} color={COLORS.cyan} />
                <div
                  className="text-sm font-semibold mt-3"
                  style={{ color: COLORS.paper }}
                >
                  {value.label}
                </div>
                <div className="text-xs mt-1" style={{ color: COLORS.textDim }}>
                  {value.desc}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
