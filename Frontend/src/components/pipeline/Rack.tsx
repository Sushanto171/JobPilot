"use client";

import { StripCard } from "@/components/pipeline/StripCard";
import { STAGES } from "@/lib/mock-data";
import type { Application, Stage } from "@/lib/types";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

export function Rack({
  stage,
  applications,
  onOpen,
}: {
  stage: Stage;
  applications: Application[];
  onOpen: (application: Application) => void;
}) {
  const stageConfig = STAGES.find((item) => item.key === stage) ?? STAGES[0];
  const { isOver, setNodeRef } = useDroppable({ id: stage });

  return (
    <div className="mb-5" ref={setNodeRef}>
      <div className="mb-2.5 flex items-center gap-2 px-1">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stageConfig.color }} />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-jp-text-dim">
          {stageConfig.label}
        </span>
        <span className="text-xs text-jp-text-dim/70">{applications.length}</span>
        <div className="h-px flex-1 bg-jp-border" />
      </div>

      <motion.div
        layout
        className={`min-h-[132px] rounded-md border border-jp-border bg-jp-surface p-3 transition-colors duration-200 ${
          isOver ? "ring-1 ring-jp-cyan/50" : ""
        }`}
      >
        {applications.length === 0 ? (
          <div className="px-1 py-4 font-mono text-xs text-jp-text-dim">— empty rack —</div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {applications.map((application, index) => (
              <div key={application.id} className="w-[236px]">
                <StripCard application={application} index={index} onOpen={onOpen} />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Rack;
