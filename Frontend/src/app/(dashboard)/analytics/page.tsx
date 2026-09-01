"use client";

import { StatCard } from "@/components/analytics/StatCard";
import { Card } from "@/components/ui/card";
import { ANALYTICS_DATA } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, FileText, LayoutGrid, Sparkles, TrendingUp, Zap } from "lucide-react";

function ChartCard({ title, icon: Icon, children }: { title: string; icon: typeof TrendingUp; children: React.ReactNode }) {
  return <Card><div className="mb-3 flex items-center gap-1.5"><Icon size={12} className="text-jp-text-dim" /><span className="text-xs font-semibold uppercase tracking-[0.12em] text-jp-text-dim">{title}</span></div>{children}</Card>;
}

const icons = { trending: TrendingUp, chart: BarChart3, zap: Zap, sparkles: Sparkles } as const;
const tooltipStyle = { backgroundColor: "#242B37", border: "1px solid #2E3542", borderRadius: 6, fontSize: 12 };

export default function AnalyticsPage() {
  return <div className="max-w-4xl space-y-5 px-6 py-6"><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{ANALYTICS_DATA.stats.map((stat) => <StatCard key={stat.label} {...stat} icon={icons[stat.icon]} />)}</div><ChartCard title="Response rate trend" icon={TrendingUp}><ResponsiveContainer width="100%" height={200}><LineChart data={ANALYTICS_DATA.responseTrend}><CartesianGrid stroke="#2E3542" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="week" stroke="#8A93A3" fontSize={11} tickLine={false} axisLine={{ stroke: "#2E3542" }} /><YAxis stroke="#8A93A3" fontSize={11} tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#EDEAE1" }} /><Line type="monotone" dataKey="rate" stroke="#3FC1C9" strokeWidth={2} dot={{ fill: "#3FC1C9", r: 3 }} /></LineChart></ResponsiveContainer></ChartCard><div className="grid grid-cols-1 gap-5 md:grid-cols-2"><ChartCard title="Pipeline distribution" icon={LayoutGrid}><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={ANALYTICS_DATA.pipelineDistribution} dataKey="value" nameKey="name" innerRadius={40} outerRadius={65} paddingAngle={3}>{ANALYTICS_DATA.pipelineDistribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer><div className="mt-1 flex flex-wrap justify-center gap-3">{ANALYTICS_DATA.pipelineDistribution.map((entry) => <div key={entry.name} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} /><span className="text-xs text-jp-text-dim">{entry.name}</span></div>)}</div></ChartCard><ChartCard title="Top matched keywords" icon={FileText}><ResponsiveContainer width="100%" height={180}><BarChart data={ANALYTICS_DATA.matchedKeywords} layout="vertical" margin={{ left: 10 }}><XAxis type="number" hide /><YAxis type="category" dataKey="keyword" stroke="#8A93A3" fontSize={11} tickLine={false} axisLine={false} width={80} /><Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#242B37" }} /><Bar dataKey="matches" fill="#F2A93B" radius={[0, 4, 4, 0]} barSize={12} /></BarChart></ResponsiveContainer></ChartCard></div></div>;
}
