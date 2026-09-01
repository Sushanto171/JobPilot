"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface DashboardShellContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const DashboardShellContext = createContext<DashboardShellContextValue | null>(null);
const SIDEBAR_STORAGE_KEY = "jobpilot.sidebar.collapsed";

export function DashboardShellProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (storedValue !== null) {
      setCollapsed(storedValue === "true");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
    }
  }, [collapsed, hydrated]);

  return (
    <DashboardShellContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </DashboardShellContext.Provider>
  );
}

export function useDashboardShell() {
  const context = useContext(DashboardShellContext);
  if (!context) {
    throw new Error("useDashboardShell must be used within DashboardShellProvider");
  }
  return context;
}
