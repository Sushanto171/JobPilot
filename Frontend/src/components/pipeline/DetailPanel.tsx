"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { STAGES } from "@/lib/mock-data";
import type { Application } from "@/lib/types";
import { Check, Clock, MapPin, Sparkles, X } from "lucide-react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-jp-text-dim">
        {children}
      </span>
    </div>
  );
}

export function DetailPanel({
  application,
  open,
  onClose,
}: {
  application: Application | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!application) {
    return null;
  }

  const stageConfig = STAGES.find((item) => item.key === application.stage) ?? STAGES[0];
  const statusBadgeClass = "rounded-full border px-2.5 py-1 text-[10px]";

  return (
    <Sheet open={open} onOpenChange={(value) => !value && onClose()}>
      <SheetContent side="right" onOpenChange={(value) => !value && onClose()} className="bg-jp-surface">
        <div className="bg-jp-paper p-5 text-[#1C1A15]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] text-[#6B6558]">
                {application.code} · APPLIED {application.date}
              </div>
              <div className="mt-1 font-mono text-[20px] font-bold">
                {application.company}
              </div>
              <div className="mt-1 text-[13px] text-[#4A4638]">{application.role}</div>
            </div>
            <button
              type="button"
              aria-label="Close panel"
              onClick={onClose}
              className="rounded p-1.5 text-[#1C1A15] transition-colors hover:bg-black/5"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[#6B6558]">
            <MapPin size={12} />
            <span className="text-[11.5px]">{application.location}</span>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <SectionLabel>Status</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((stage) => {
                const isActive = stage.key === application.stage;
                return (
                  <span
                    key={stage.key}
                    className={`${statusBadgeClass} ${
                      isActive
                        ? "border-transparent font-semibold text-jp-base"
                        : "border-jp-border text-jp-text-dim"
                    }`}
                    style={{
                      backgroundColor: isActive ? stage.color : "transparent",
                    }}
                  >
                    {stage.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="rounded-md border border-jp-border bg-jp-surface-light p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-jp-cyan" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-jp-cyan">
                AI tailored resume · v2
              </span>
            </div>
            <p className="text-xs leading-relaxed text-jp-text-dim">
              Reordered experience to lead with Docker/BullMQ work, matched 6 JD keywords.
              No fabricated content — 1 skill gap flagged (Kubernetes).
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-md bg-jp-cyan px-3 py-1.5 text-[11px] font-semibold text-jp-base"
              >
                <Check size={12} /> Approve
              </button>
              <button
                type="button"
                className="rounded-md border border-jp-border px-3 py-1.5 text-[11px] text-jp-text-dim"
              >
                Edit first
              </button>
            </div>
          </div>

          <div>
            <SectionLabel>Follow-up</SectionLabel>
            <p className="text-xs text-jp-text-dim">
              Scheduled to draft in <span className="text-jp-amber">3 days</span> if no status change.
            </p>
          </div>

          <div className="rounded-md border border-jp-border bg-jp-surface p-3">
            <div className="flex items-center gap-2 text-jp-text-dim">
              <Clock size={13} className="text-jp-amber" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em]">Follow-up countdown</span>
            </div>
            <div className="mt-2 text-2xl font-semibold text-jp-paper">03:12:48</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-jp-text-dim">HR reminder</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DetailPanel;
