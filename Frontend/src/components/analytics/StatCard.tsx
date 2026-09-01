import { Card } from "@/components/ui/card";

export function StatCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return <Card><div className="mb-3 flex items-center justify-between"><span className="font-mono text-xs text-jp-text-dim">{label}</span><Icon size={14} className="text-jp-cyan" /></div><div className="font-mono text-2xl font-bold text-jp-paper">{value}</div><div className="mt-1 text-xs text-jp-cyan">{delta}</div></Card>;
}
