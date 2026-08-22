"use client";

import { DetailPanel } from "@/components/pipeline/DetailPanel";
import { Rack } from "@/components/pipeline/Rack";
import { SEED_APPLICATIONS, STAGES } from "@/lib/mock-data";
import type { Application, Stage } from "@/lib/types";
import {
    closestCenter,
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";

export default function PipelinePage() {
  const [applications, setApplications] = useState<Application[]>(SEED_APPLICATIONS);
  const [activeApplication, setActiveApplication] = useState<Application | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 8 } }),
  );

  const racks = useMemo(
    () =>
      STAGES.map((stage) => ({
        ...stage,
        applications: applications.filter((application) => application.stage === stage.key),
      })),
    [applications],
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const nextStage = String(over.id) as Stage;
    if (!STAGES.some((stage) => stage.key === nextStage)) return;
    if (active.id === over.id) return;

    setApplications((current) =>
      current.map((application) =>
        application.id === String(active.id)
          ? { ...application, stage: nextStage }
          : application,
      ),
    );
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="h-full bg-jp-base px-6 py-6">
        <div className="space-y-5">
          {racks.map((rack) => (
            <Rack
              key={rack.key}
              stage={rack.key}
              applications={rack.applications}
              onOpen={setActiveApplication}
            />
          ))}
        </div>
      </div>

      <DetailPanel
        application={activeApplication}
        open={activeApplication !== null}
        onClose={() => setActiveApplication(null)}
      />
    </DndContext>
  );
}
