"use client";

import { Bell, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/pipeline": { title: "Pipeline", subtitle: "6 applications in flight" },
  "/analytics": { title: "Analytics", subtitle: "Your job search, measured" },
  "/resumes": { title: "Resumes", subtitle: "Base resume and tailored versions" },
  "/settings": { title: "Settings", subtitle: "Automation, notifications, account" },
  "/profile": { title: "Profile", subtitle: "Your personal details" },
};

export function Header({ onAdd }: { onAdd?: () => void }) {
  const pathname = usePathname();
  const meta = Object.entries(PAGE_META).find(([href]) => pathname.startsWith(href))?.[1] ?? {
    title: "JobPilot",
    subtitle: "",
  };
  const showAdd = pathname === "/pipeline";

  return (
    <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-jp-border">
      <div>
        <h1 className="font-mono font-bold text-lg text-jp-paper">{meta.title}</h1>
        <p className="text-xs mt-0.5 text-jp-text-dim">{meta.subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-jp-surface border border-jp-border">
          <Search size={13} className="text-jp-text-dim" />
          <input
            placeholder="Search..."
            className="bg-transparent text-xs outline-none w-32 text-jp-paper"
          />
        </div>
        <button className="p-2 rounded-md relative transition-colors hover:bg-white/5">
          <Bell size={15} className="text-jp-text-dim" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-jp-rose" />
        </button>
        {showAdd && onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-md font-semibold transition-transform hover:scale-105 active:scale-95 bg-jp-amber text-jp-base"
          >
            <Plus size={13} /> Log application
          </button>
        )}
      </div>
    </div>
  );
}
