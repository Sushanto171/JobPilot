"use client";
import { ArrowRight, Check, Mail, MapPin, Split } from "lucide-react";
import { useState } from "react";
import {
  COLORS,
  FieldInput,
  PrimaryButton,
  Reveal,
  SectionTag,
} from "./shared";
export function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-4xl mx-auto px-5 py-16 page-in">
      <Reveal>
        <SectionTag>CONTACT</SectionTag>
        <h1
          className="mt-2"
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "38px",
            color: COLORS.paper,
          }}
        >
          Get in touch.
        </h1>
        <p className="mt-3 max-w-md text-sm" style={{ color: COLORS.textDim }}>
          Questions, feedback, or a bug you found — all of it goes to a real
          inbox, not a ticket queue.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-10">
        <Reveal className="md:col-span-3">
          {!sent ? (
            <div
              className="p-6 rounded-md space-y-4"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <FieldInput label="NAME" placeholder="Your name" />
              <FieldInput
                label="EMAIL"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
              />
              <div>
                <label
                  className="text-xs"
                  style={{ color: COLORS.textDim2, fontFamily: "monospace" }}
                >
                  MESSAGE
                </label>
                <textarea
                  placeholder="How can we help?"
                  className="w-full h-28 mt-1 bg-transparent text-sm rounded-md px-3 py-2.5 outline-none resize-none"
                  style={{
                    color: COLORS.paper,
                    border: `1px solid ${COLORS.border}`,
                    backgroundColor: COLORS.surfaceLight,
                  }}
                />
              </div>
              <PrimaryButton full onClick={() => setSent(true)}>
                Send message <ArrowRight size={14} />
              </PrimaryButton>
            </div>
          ) : (
            <div
              className="p-6 rounded-md text-center"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <Check size={22} color={COLORS.cyan} className="mx-auto mb-3" />
              <div
                className="text-sm font-semibold"
                style={{ color: COLORS.paper }}
              >
                Message sent
              </div>
              <div className="text-xs mt-1" style={{ color: COLORS.textDim }}>
                We'll get back to you within a couple of days.
              </div>
            </div>
          )}
        </Reveal>
        <Reveal delay={100} className="md:col-span-2 space-y-3">
          {[
            [Mail, "Email", "hello@jobpilot.app", COLORS.cyan],
            [MapPin, "Based in", "Dhaka, Bangladesh", COLORS.amber],
            [
              Split,
              "Open source",
              "Backend repo is public on GitHub.",
              COLORS.textDim,
            ],
          ].map(([Icon, title, text, color]) => (
            <div
              key={title as string}
              className="p-4 rounded-md flex items-start gap-3"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <Icon size={15} color={color as string} />
              <div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: COLORS.paper }}
                >
                  {title as string}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: COLORS.textDim }}
                >
                  {text as string}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
