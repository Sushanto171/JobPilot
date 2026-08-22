"use client";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { COLORS, Reveal, SectionTag, usePublicNavigation } from "./shared";
const FAQS = [
  {
    q: "Does the AI ever make up experience I don't have?",
    a: "No. The tailoring prompt is explicitly restricted to reordering and rephrasing content already in your resume. Gaps are flagged instead of invented.",
  },
  {
    q: "Do I need to approve every AI action?",
    a: "Yes, by design. Tailored resumes and follow-up drafts are never sent or finalized automatically.",
  },
  {
    q: "What happens if the AI parsing fails?",
    a: "The application still gets created — you can fill in the job details manually.",
  },
  {
    q: "Can I use JobPilot without the AI features?",
    a: "Yes. The pipeline board, manual status tracking, and reminders all work without AI tailoring.",
  },
  {
    q: "Is my resume data private?",
    a: "Your base resume and tailored versions are stored per-account and are not shared.",
  },
  {
    q: "What's the difference between Free and Pro?",
    a: "Free covers up to 20 applications a month. Pro removes the cap and adds analytics and email integration.",
  },
];
export function FAQPage() {
  const [open, setOpen] = useState(0);
  const goTo = usePublicNavigation();
  return (
    <div className="max-w-2xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <SectionTag>FAQ</SectionTag>
        <h1
          className="mt-2"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "38px",
            color: COLORS.paper,
          }}
        >
          Questions, answered.
        </h1>
      </Reveal>
      <div className="mt-8 space-y-2.5">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.q} delay={i * 50}>
              <div
                className="rounded-md overflow-hidden"
                style={{
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                >
                  <span
                    className="text-sm font-medium pr-4"
                    style={{ color: COLORS.paper }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={15}
                    color={COLORS.textDim}
                    style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {isOpen && (
                  <div className="accordion-in px-4 pb-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: COLORS.textDim }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={200}>
        <div
          className="mt-8 flex items-center gap-2 p-4 rounded-md"
          style={{
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <HelpCircle size={15} color={COLORS.textDim} />
          <span className="text-xs" style={{ color: COLORS.textDim }}>
            Still have a question?{" "}
          </span>
          <button
            onClick={() => goTo("contact")}
            className="text-xs"
            style={{ color: COLORS.cyan }}
          >
            Contact us →
          </button>
        </div>
      </Reveal>
    </div>
  );
}
