"use client";
import { ChevronRight } from "lucide-react";
import { COLORS, Reveal, usePublicNavigation } from "./shared";
export function BlogPostPage() {
  const goTo = usePublicNavigation();
  return (
    <div className="max-w-2xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <button
          onClick={() => goTo("blog")}
          className="text-xs flex items-center gap-1.5 mb-6"
          style={{ color: COLORS.textDim }}
        >
          <ChevronRight size={12} className="rotate-180" /> Back to blog
        </button>
        <span
          className="text-xs px-2 py-0.5 rounded"
          style={{
            fontFamily: "monospace",
            fontSize: "9.5px",
            backgroundColor: COLORS.surfaceLight,
            color: COLORS.cyan,
          }}
        >
          PRODUCT
        </span>
        <h1
          className="mt-3"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "32px",
            color: COLORS.paper,
            lineHeight: 1.2,
          }}
        >
          Why we made JobPilot refuse to invent your skills
        </h1>
        <div className="flex items-center gap-2 mt-4">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: COLORS.cyan, color: COLORS.base }}
          >
            SK
          </div>
          <span className="text-xs" style={{ color: COLORS.textDim2 }}>
            Sushanto Kumar · Aug 18, 2026 · 4 min read
          </span>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div
          className="mt-8 space-y-4 text-sm leading-relaxed"
          style={{ color: COLORS.textDim }}
        >
          <p>
            The easy version of an AI resume tailor is the dangerous one: feed
            it a job description, let it rewrite your resume to match, and hand
            back something that reads well. The problem is what reads well
            quietly costs you — a fabricated familiarity with a tool you've
            never touched.
          </p>
          <p>
            So the tailoring prompt in JobPilot is built around a single hard
            constraint: it may reorder, rephrase, and re-emphasize content that
            already exists in your resume. It may not add anything that isn't
            there.
          </p>
          <p>
            That constraint shapes almost everything else in the product — why
            every AI action requires your approval, why there's a full audit
            table, and why the pipeline board never auto-submits anything.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
