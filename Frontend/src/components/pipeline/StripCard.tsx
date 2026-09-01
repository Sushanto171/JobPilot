"use client";

import { STAGES } from "@/lib/mock-data";
import type { Application } from "@/lib/types";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

export function StripCard({
  application,
  index,
  onOpen,
}: {
  application: Application;
  index: number;
  onOpen: (application: Application) => void;
}) {
  const stageConfig = STAGES.find((item) => item.key === application.stage) ?? STAGES[0];
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: application.id,
    data: { applicationId: application.id },
  });

  return (
    <motion.button
      ref={setNodeRef}
      type="button"
      layoutId={`strip-${application.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -1 }}
      onClick={() => onOpen(application)}
      className="group block w-full cursor-pointer select-none text-left"
      style={{
        touchAction: "none",
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-stretch overflow-hidden rounded-sm border border-jp-paper-dim bg-jp-paper shadow-[0_10px_18px_rgba(0,0,0,0.12)] transition-shadow duration-200 group-hover:shadow-[0_12px_22px_rgba(0,0,0,0.20)]">
        <div className="w-[5px] shrink-0" style={{ backgroundColor: stageConfig.color }} />
        <div className="min-w-0 flex-1 px-3 py-2.5">
          <div className="mb-1 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.08em] text-[#6B6558]">
            <span className="font-mono">
              {application.code} · {application.date}
            </span>
            <span className="opacity-0 transition-opacity group-hover:opacity-60">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </div>

          <div className="truncate font-mono text-[13px] font-bold text-[#1C1A15]">
            {application.company}
          </div>
          <div className="mt-0.5 truncate text-[11.5px] text-[#4A4638]">
            {application.role}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default StripCard;
