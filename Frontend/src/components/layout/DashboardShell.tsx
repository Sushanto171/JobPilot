"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AddApplicationWizard } from "@/components/pipeline/AddApplicationWizard";
import { useState } from "react";
import { DashboardShellProvider } from "./DashboardShellContext";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <DashboardShellProvider>
      <div className="flex w-full h-screen bg-jp-base font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header onAdd={() => setWizardOpen(true)} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
      <AddApplicationWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </DashboardShellProvider>
  );
}