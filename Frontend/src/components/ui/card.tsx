import * as React from "react";

export function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`rounded-md border border-jp-border bg-jp-surface p-4 ${className}`} style={style}>{children}</div>;
}