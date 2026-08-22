"use client";

export function Switch({ checked, onCheckedChange, "aria-label": ariaLabel }: { checked: boolean; onCheckedChange: (checked: boolean) => void; "aria-label"?: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={ariaLabel} onClick={() => onCheckedChange(!checked)} className={`relative h-[22px] w-[38px] rounded-full transition-colors ${checked ? "bg-jp-cyan" : "bg-jp-border"}`}><span className={`absolute left-[3px] top-[3px] h-4 w-4 rounded-full bg-jp-base transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`} /></button>;
}