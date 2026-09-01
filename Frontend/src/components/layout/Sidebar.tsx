"use client";

import {
    BarChart3,
    ChevronLeft, ChevronRight,
    FileText,
    LayoutGrid,
    Settings, User, Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardShell } from "./DashboardShellContext";

const NAV_ITEMS = [
  { key: "pipeline", label: "Pipeline", href: "/pipeline", icon: LayoutGrid },
  { key: "analytics", label: "Analytics", href: "/analytics", icon: BarChart3 },
  { key: "resumes", label: "Resumes", href: "/resumes", icon: FileText },
  { key: "settings", label: "Settings", href: "/settings", icon: Settings },
  { key: "profile", label: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const { collapsed, setCollapsed } = useDashboardShell();
  const pathname = usePathname();

  return (
    <div
      className={`h-screen flex flex-col shrink-0 transition-[width] duration-300 ease-in-out bg-jp-surface border-r border-jp-border ${
        collapsed ? "w-[72px]" : "w-[220px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-[25px] border-b border-jp-border">
        <div className="w-7 h-7 rounded flex items-center justify-center shrink-0 bg-jp-amber">
          <Zap size={14} className="text-jp-base" />
        </div>
        {!collapsed && (
          <span className="font-mono font-bold text-sm text-jp-paper tracking-wide">
            JOBPILOT
          </span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-2.5 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors duration-150 hover:bg-jp-surface-light/60 ${
                  isActive ? "bg-jp-surface-light text-jp-paper" : "text-jp-text-dim"
                }`}
            >
              <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
              {!collapsed && (
                <span className={`text-sm ${isActive ? "font-semibold" : "font-normal"}`}>
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-jp-amber" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-jp-border">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-white/5 transition-colors"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold bg-jp-cyan text-jp-base">
            SK
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate text-jp-paper">Sushanto Kumar</div>
              <div className="text-xs truncate text-jp-text-dim2">Free plan</div>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-full flex items-center justify-center gap-2 mt-2 py-1.5 rounded-md transition-colors hover:bg-white/5 text-jp-text-dim"
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span className="text-xs">Collapse</span></>}
        </button>
      </div>
    </div>
  );
}
