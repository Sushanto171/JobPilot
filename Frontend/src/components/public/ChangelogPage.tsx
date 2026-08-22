"use client";
import { COLORS, Reveal, SectionTag } from "./shared";
const CHANGES = [
  {
    version: "v0.4.0",
    date: "Aug 20, 2026",
    color: COLORS.cyan,
    items: [
      "Added the 4-step Add Application wizard (Paste → Parse → Tailor → Apply)",
      "AI grounding check now flags missing skills explicitly in the review step",
    ],
  },
  {
    version: "v0.3.0",
    date: "Aug 10, 2026",
    color: COLORS.amber,
    items: [
      "Analytics dashboard: response rate trend, pipeline distribution, top keywords",
      "Redis caching for repeated JD parsing lookups",
    ],
  },
  {
    version: "v0.2.0",
    date: "Jul 28, 2026",
    color: COLORS.rose,
    items: [
      "Drag-and-drop pipeline board across Applied / Screening / Interview / Closed",
      "AIJob audit table for every AI invocation",
    ],
  },
  {
    version: "v0.1.0",
    date: "Jul 12, 2026",
    color: COLORS.textDim,
    items: [
      "Initial release: core CRUD for applications and resumes",
      "Manual pipeline status tracking",
    ],
  },
];
export function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <SectionTag>CHANGELOG</SectionTag>
        <h1
          className="mt-2"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "38px",
            color: COLORS.paper,
          }}
        >
          What's shipped.
        </h1>
      </Reveal>
      <div className="mt-10 space-y-8">
        {CHANGES.map((change, i) => (
          <Reveal key={change.version} delay={i * 80}>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: change.color }}
                />
                {i < CHANGES.length - 1 && (
                  <div
                    className="w-px flex-1 mt-1"
                    style={{ backgroundColor: COLORS.border }}
                  />
                )}
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: COLORS.paper,
                    }}
                  >
                    {change.version}
                  </span>
                  <span className="text-xs" style={{ color: COLORS.textDim2 }}>
                    {change.date}
                  </span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {change.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm flex gap-2"
                      style={{ color: COLORS.textDim }}
                    >
                      <span style={{ color: COLORS.textDim2 }}>-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
