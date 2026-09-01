"use client";
import { COLORS, Reveal, SectionTag, usePublicNavigation } from "./shared";
const POSTS = [
  {
    tag: "PRODUCT",
    title: "Why we made JobPilot refuse to invent your skills",
    date: "Aug 18, 2026",
    excerpt:
      "The hardest part of building an AI resume tool wasn't the tailoring — it was deciding what the model is not allowed to do.",
  },
  {
    tag: "ENGINEERING",
    title: "Two-stage prompting: parsing before tailoring",
    date: "Aug 10, 2026",
    excerpt:
      "Splitting JD extraction from resume tailoring into separate, auditable AI calls made the whole pipeline easier to debug and retry.",
  },
  {
    tag: "JOB SEARCH",
    title: "The follow-up email nobody sends",
    date: "Aug 2, 2026",
    excerpt:
      "Follow-ups measurably raise response rates, so why do so few applicants send them? A look at what actually breaks the habit.",
  },
  {
    tag: "ENGINEERING",
    title: "Queues, retries, and why your AI feature needs an audit table",
    date: "Jul 24, 2026",
    excerpt:
      "If an AI call fails silently, you don't have a feature — you have a mystery.",
  },
  {
    tag: "PRODUCT",
    title: "Designing a pipeline board that doesn't feel like a spreadsheet",
    date: "Jul 15, 2026",
    excerpt:
      "The flight-strip metaphor, and why a literal paper-tracking system from aviation mapped so well onto job hunting.",
  },
  {
    tag: "JOB SEARCH",
    title: "What 60 applications taught us about ATS keywords",
    date: "Jul 5, 2026",
    excerpt:
      "Self-reported data from real usage on which keyword patterns correlate with callbacks.",
  },
];
export function BlogPage() {
  const goTo = usePublicNavigation();
  return (
    <div className="max-w-6xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <SectionTag>BLOG</SectionTag>
        <h1
          className="mt-2"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "38px",
            color: COLORS.paper,
          }}
        >
          Notes on building JobPilot.
        </h1>
        <p className="mt-3 max-w-lg text-sm" style={{ color: COLORS.textDim }}>
          Product decisions, engineering trade-offs, and what the data says
          about job hunting.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
        {POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 70}>
            <button
              onClick={() => goTo("post")}
              className="text-left h-full w-full p-5 rounded-md block"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  fontFamily: "monospace",
                  fontSize: "9.5px",
                  backgroundColor: COLORS.surfaceLight,
                  color: COLORS.cyan,
                }}
              >
                {post.tag}
              </span>
              <h3
                className="text-sm font-semibold mt-3 mb-2 leading-snug"
                style={{ color: COLORS.paper }}
              >
                {post.title}
              </h3>
              <p
                className="text-xs leading-relaxed mb-3"
                style={{ color: COLORS.textDim }}
              >
                {post.excerpt}
              </p>
              <span
                className="text-xs"
                style={{ color: COLORS.textDim2, fontFamily: "monospace" }}
              >
                {post.date}
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
