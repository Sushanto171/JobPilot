import React, { useState, useEffect, useRef } from "react";
import {
  Plus, X, Clock, MapPin, ChevronRight, ChevronLeft, Sparkles, Check,
  LayoutGrid, BarChart3, FileText, Settings as SettingsIcon, User,
  Bell, Search, ChevronDown, Upload, Trash2, Moon, TrendingUp,
  Mail, Shield, Zap, LogOut, Link2, Loader2, ScanSearch, Send, ArrowRight,
  CheckCircle2, AlertTriangle, Users, Activity, Ban, Pencil, Database,
  Power, KeyRound, RefreshCw, Bot, MessageCircle, Paperclip, Download, ExternalLink,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const COLORS = {
  base: "#14181F",
  surface: "#1C222C",
  surfaceLight: "#242B37",
  border: "#2E3542",
  paper: "#EDEAE1",
  paperDim: "#E2DED2",
  amber: "#F2A93B",
  cyan: "#3FC1C9",
  rose: "#E0567C",
  textDim: "#8A93A3",
  textDim2: "#5C6577",
};

const STAGES = [
  { key: "APPLIED", label: "Applied", color: COLORS.textDim },
  { key: "SCREENING", label: "Screening", color: COLORS.amber },
  { key: "INTERVIEW", label: "Interview", color: COLORS.cyan },
  { key: "CLOSED", label: "Offer / Closed", color: COLORS.rose },
];

const SEED = [
  { id: "s1", company: "ACME LABS", code: "ACM", role: "Sr. Backend Eng", date: "08.14", stage: "APPLIED", location: "Remote" },
  { id: "s2", company: "NORTHWIND", code: "NWD", role: "Node.js Developer", date: "08.15", stage: "APPLIED", location: "Dhaka" },
  { id: "s3", company: "VELOCIRA", code: "VLC", role: "Backend Engineer", date: "08.11", stage: "SCREENING", location: "Remote" },
  { id: "s4", company: "PIXELFORGE", code: "PXF", role: "Fullstack Dev", date: "08.09", stage: "SCREENING", location: "Remote" },
  { id: "s5", company: "HALCYON IO", code: "HAL", role: "Platform Engineer", date: "08.05", stage: "INTERVIEW", location: "Singapore" },
  { id: "s6", company: "REDSHIFT", code: "RSH", role: "SDE - Backend", date: "07.29", stage: "CLOSED", location: "Remote" },
];

const NAV_ITEMS = [
  { key: "pipeline", label: "Pipeline", icon: LayoutGrid },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "resumes", label: "Resumes", icon: FileText },
  { key: "settings", label: "Settings", icon: SettingsIcon },
  { key: "profile", label: "Profile", icon: User },
];

const ADMIN_ITEM = { key: "admin", label: "Admin panel", icon: Shield };

const ADMIN_USERS = [
  { id: "u1", name: "Sushanto Kumar", email: "sushanto@mail.com", plan: "Pro", apps: 6, status: "active", joined: "Jul 12, 2026", role: "Admin" },
  { id: "u2", name: "Maya Chen", email: "maya@mail.com", plan: "Free", apps: 14, status: "active", joined: "Jul 20, 2026", role: "User" },
  { id: "u3", name: "Arif Hossain", email: "arif@mail.com", plan: "Pro", apps: 22, status: "active", joined: "Jul 28, 2026", role: "User" },
  { id: "u4", name: "Devon Price", email: "devon@mail.com", plan: "Free", apps: 3, status: "suspended", joined: "Aug 2, 2026", role: "User" },
  { id: "u5", name: "Lina Torres", email: "lina@mail.com", plan: "Teams", apps: 41, status: "active", joined: "Aug 9, 2026", role: "User" },
];

const ADMIN_AI_JOBS = [
  { id: "j1", type: "resume-tailor", user: "maya@mail.com", status: "completed", time: "2m ago" },
  { id: "j2", type: "jd-parse", user: "arif@mail.com", status: "completed", time: "6m ago" },
  { id: "j3", type: "resume-tailor", user: "lina@mail.com", status: "failed", time: "14m ago", error: "Upstream AI timeout after 3 attempts" },
  { id: "j4", type: "followup-draft", user: "sushanto@mail.com", status: "processing", time: "just now" },
  { id: "j5", type: "jd-parse", user: "devon@mail.com", status: "completed", time: "38m ago" },
  { id: "j6", type: "resume-tailor", user: "maya@mail.com", status: "completed", time: "1h ago" },
];

const ADMIN_CONTENT = [
  { id: "c1", type: "Blog post", title: "Why we made JobPilot refuse to invent your skills", status: "published", updated: "Aug 18, 2026" },
  { id: "c2", type: "Blog post", title: "Two-stage prompting: parsing before tailoring", status: "published", updated: "Aug 10, 2026" },
  { id: "c3", type: "Blog post", title: "What 60 applications taught us about ATS keywords", status: "draft", updated: "Aug 20, 2026" },
  { id: "c4", type: "Changelog", title: "v0.4.0 — Add Application wizard", status: "published", updated: "Aug 20, 2026" },
];

const SIGNUP_TREND = [
  { week: "W1", signups: 4 }, { week: "W2", signups: 7 }, { week: "W3", signups: 6 },
  { week: "W4", signups: 11 }, { week: "W5", signups: 15 }, { week: "W6", signups: 19 },
];

/* ---------------- shared bits ---------------- */

function GlobalStyles() {
  return (
    <style>{`
      @keyframes snap {
        0% { transform: scale(1); }
        35% { transform: scale(1.06) translateY(-3px); }
        60% { transform: scale(0.98); }
        100% { transform: scale(1); }
      }
      .animate-snap { animation: snap 0.4s cubic-bezier(.36,1.5,.64,1); }
      @keyframes slidein {
        from { transform: translateX(24px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .animate-slidein { animation: slidein 0.28s ease-out; }
      @keyframes slidedown {
        from { transform: translateY(-8px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slidedown { animation: slidedown 0.22s ease-out; }
      @keyframes fadeup {
        from { transform: translateY(6px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-fadeup { animation: fadeup 0.3s ease-out both; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .animate-spin-slow { animation: spin 1.1s linear infinite; }
      @keyframes popcheck {
        0% { transform: scale(0.5); opacity: 0; }
        60% { transform: scale(1.15); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      .animate-popcheck { animation: popcheck 0.32s ease-out; }
      @keyframes modalin {
        from { transform: scale(0.96) translateY(8px); opacity: 0; }
        to { transform: scale(1) translateY(0); opacity: 1; }
      }
      .animate-modalin { animation: modalin 0.24s ease-out; }
      @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .pulse-dot { animation: pulse-dot 1.6s ease-in-out infinite; }
      @keyframes bounce-dot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-3px); opacity: 1; } }
      .bounce-dot { animation: bounce-dot 1s ease-in-out infinite; }
      @keyframes chatin {
        from { transform: translateY(16px) scale(0.97); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      .animate-chatin { animation: chatin 0.22s ease-out; }
    `}</style>
  );
}

function SectionLabel({ children, icon: Icon }) {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      {Icon && <Icon size={12} color={COLORS.textDim} />}
      <span
        className="text-xs font-semibold uppercase"
        style={{ fontFamily: "monospace", color: COLORS.textDim, letterSpacing: "0.12em" }}
      >
        {children}
      </span>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative rounded-full transition-colors duration-200"
      style={{ width: "38px", height: "22px", backgroundColor: checked ? COLORS.cyan : COLORS.border }}
    >
      <span
        className="absolute rounded-full transition-transform duration-200"
        style={{
          width: "16px", height: "16px", top: "3px", left: "3px",
          backgroundColor: COLORS.base,
          transform: checked ? "translateX(16px)" : "translateX(0)",
        }}
      />
    </button>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      className="rounded-md p-4"
      style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, ...style }}
    >
      {children}
    </div>
  );
}

/* ---------------- sidebar / header ---------------- */

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <div
      className="h-screen flex flex-col shrink-0 transition-all duration-300"
      style={{
        width: collapsed ? "72px" : "220px",
        backgroundColor: COLORS.surface,
        borderRight: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="flex items-center gap-2 px-4 py-5" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div
          className="w-7 h-7 rounded flex items-center justify-center shrink-0"
          style={{ backgroundColor: COLORS.amber }}
        >
          <Zap size={14} color={COLORS.base} />
        </div>
        {!collapsed && (
          <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "14px", color: COLORS.paper, letterSpacing: "0.03em" }}>
            JOBPILOT
          </span>
        )}
      </div>

      <div className="flex-1 py-4 px-2.5 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors duration-150"
              style={{
                backgroundColor: isActive ? COLORS.surfaceLight : "transparent",
                color: isActive ? COLORS.paper : COLORS.textDim,
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
              {!collapsed && (
                <span className="text-sm" style={{ fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.amber }} />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-2.5" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        {!collapsed && (
          <div className="text-xs px-2.5 pt-3 pb-1.5" style={{ color: COLORS.textDim2, fontFamily: "monospace", letterSpacing: "0.1em" }}>
            ADMIN
          </div>
        )}
        <button
          onClick={() => setActive(ADMIN_ITEM.key)}
          className="w-full flex items-center gap-3 px-2.5 py-2 my-1 rounded-md transition-colors duration-150"
          style={{
            backgroundColor: active === ADMIN_ITEM.key ? "rgba(224,86,124,0.12)" : "transparent",
            color: active === ADMIN_ITEM.key ? COLORS.rose : COLORS.textDim,
          }}
        >
          <Shield size={16} strokeWidth={active === ADMIN_ITEM.key ? 2.4 : 2} />
          {!collapsed && (
            <span className="text-sm" style={{ fontWeight: active === ADMIN_ITEM.key ? 600 : 400 }}>{ADMIN_ITEM.label}</span>
          )}
          {active === ADMIN_ITEM.key && !collapsed && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.rose }} />
          )}
        </button>
      </div>

      <div className="p-2.5" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div
          className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setActive("profile")}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
            style={{ backgroundColor: COLORS.cyan, color: COLORS.base }}
          >
            SK
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate" style={{ color: COLORS.paper }}>Sushanto Kumar</div>
              <div className="text-xs truncate" style={{ color: COLORS.textDim2 }}>Free plan</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 mt-2 py-1.5 rounded-md transition-colors hover:bg-white/5"
          style={{ color: COLORS.textDim }}
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span className="text-xs">Collapse</span></>}
        </button>
      </div>
    </div>
  );
}

function Header({ title, subtitle, onAdd }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 shrink-0"
      style={{ borderBottom: `1px solid ${COLORS.border}` }}
    >
      <div>
        <h1 style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "18px", color: COLORS.paper }}>{title}</h1>
        <p className="text-xs mt-0.5" style={{ color: COLORS.textDim }}>{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md"
          style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        >
          <Search size={13} color={COLORS.textDim} />
          <input
            placeholder="Search..."
            className="bg-transparent text-xs outline-none w-32"
            style={{ color: COLORS.paper }}
          />
        </div>
        <button className="p-2 rounded-md relative transition-colors hover:bg-white/5">
          <Bell size={15} color={COLORS.textDim} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.rose }} />
        </button>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-md font-semibold transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: COLORS.amber, color: COLORS.base }}
          >
            <Plus size={13} /> Log application
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- pipeline page ---------------- */

function StripCard({ strip, index, onOpen, onDragStart, justSnapped }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40 * index);
    return () => clearTimeout(t);
  }, [index]);

  const stage = STAGES.find((s) => s.key === strip.stage);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, strip.id)}
      onClick={() => onOpen(strip)}
      className={
        "group cursor-pointer select-none transition-all duration-300 ease-out " +
        (mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2") +
        (justSnapped === strip.id ? " animate-snap" : "")
      }
      style={{ width: "236px" }}
    >
      <div
        className="flex items-stretch rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
        style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.paperDim}` }}
      >
        <div style={{ width: "5px", backgroundColor: stage.color, flexShrink: 0 }} />
        <div className="flex-1 px-3 py-2.5 min-w-0">
          <div
            className="flex items-center justify-between mb-1"
            style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.05em", color: "#6B6558" }}
          >
            <span>{strip.code} · {strip.date}</span>
            <ChevronRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700, color: "#1C1A15" }} className="truncate">
            {strip.company}
          </div>
          <div style={{ fontSize: "11.5px", color: "#4A4638", marginTop: "2px" }} className="truncate">
            {strip.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function Rack({ stage, strips, onOpen, onDragStart, onDrop }) {
  const [justSnapped, setJustSnapped] = useState(null);
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { onDrop(e, stage.key); setJustSnapped(null); }}
      className="mb-5"
    >
      <div className="flex items-center gap-2 mb-2.5 px-1">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stage.color }} />
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ fontFamily: "monospace", color: COLORS.textDim, letterSpacing: "0.12em" }}
        >
          {stage.label}
        </span>
        <span className="text-xs" style={{ color: COLORS.textDim, opacity: 0.5 }}>{strips.length}</span>
        <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
      </div>
      <div
        className="rounded-md p-3 flex flex-wrap gap-3 min-h-20"
        style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}
      >
        {strips.length === 0 && (
          <div className="text-xs py-4 px-1" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>— empty rack —</div>
        )}
        {strips.map((strip, i) => (
          <StripCard key={strip.id} strip={strip} index={i} onOpen={onOpen} onDragStart={onDragStart} justSnapped={justSnapped} />
        ))}
      </div>
    </div>
  );
}

function DetailPanel({ strip, onClose }) {
  if (!strip) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 transition-opacity duration-300" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={onClose} />
      <div
        className="relative w-full max-w-sm h-full overflow-y-auto shadow-2xl animate-slidein"
        style={{ backgroundColor: COLORS.surface, borderLeft: `1px solid ${COLORS.border}` }}
      >
        <div className="p-5" style={{ backgroundColor: COLORS.paper }}>
          <div className="flex items-start justify-between">
            <div>
              <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#6B6558" }}>{strip.code} · APPLIED {strip.date}</div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "20px", color: "#1C1A15", marginTop: "2px" }}>{strip.company}</div>
              <div style={{ fontSize: "13px", color: "#4A4638", marginTop: "2px" }}>{strip.role}</div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded hover:bg-black/5 transition-colors">
              <X size={16} color="#1C1A15" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <MapPin size={12} color="#6B6558" />
            <span style={{ fontSize: "11.5px", color: "#6B6558" }}>{strip.location}</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <SectionLabel>Status</SectionLabel>
            <div className="flex gap-2 flex-wrap">
              {STAGES.map((s) => (
                <span
                  key={s.key}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: s.key === strip.stage ? s.color : "transparent",
                    color: s.key === strip.stage ? COLORS.base : COLORS.textDim,
                    border: `1px solid ${s.key === strip.stage ? s.color : COLORS.border}`,
                    fontWeight: s.key === strip.stage ? 600 : 400,
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-md p-3.5" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} color={COLORS.cyan} />
              <span className="text-xs font-semibold" style={{ color: COLORS.cyan, fontFamily: "monospace" }}>AI TAILORED RESUME · v2</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: COLORS.textDim }}>
              Reordered experience to lead with Docker/BullMQ work, matched 6 JD keywords. No fabricated content — 1 skill gap flagged (Kubernetes).
            </p>
            <div className="flex gap-2 mt-3">
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md" style={{ backgroundColor: COLORS.cyan, color: COLORS.base, fontWeight: 600 }}>
                <Check size={12} /> Approve
              </button>
              <button className="text-xs px-3 py-1.5 rounded-md" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}>
                Edit first
              </button>
            </div>
          </div>

          <div>
            <SectionLabel icon={Clock}>Follow-up</SectionLabel>
            <p className="text-xs" style={{ color: COLORS.textDim }}>
              Scheduled to draft in <span style={{ color: COLORS.amber }}>3 days</span> if no status change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- add application wizard ---------------- */

const WIZARD_STEPS = ["Paste", "Parse", "Tailor", "Apply"];

function fakeParse(raw) {
  const text = raw.trim();
  const words = text.split(/\s+/).filter(Boolean);
  const capitalWord = words.find((w) => /^[A-Z][a-zA-Z]{2,}/.test(w)) || "ACME LABS";
  const company = capitalWord.replace(/[^a-zA-Z]/g, "").toUpperCase() || "ACME LABS";
  const roleGuess =
    /senior|sr\.?/i.test(text) ? "Sr. Backend Engineer" :
    /front ?end/i.test(text) ? "Frontend Engineer" :
    /full ?stack/i.test(text) ? "Fullstack Developer" :
    "Backend Engineer";
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return {
    company: company.length > 2 ? company : "ACME LABS",
    code: company.slice(0, 3) || "ACM",
    role: roleGuess,
    seniority: /senior|sr\.?/i.test(text) ? "Senior" : "Mid-level",
    location: /remote/i.test(text) ? "Remote" : "Dhaka",
    skills: ["Node.js", "PostgreSQL", "Docker", "Redis", "TypeScript"],
    hrEmail: emailMatch ? emailMatch[0] : null,
  };
}

function isUrlInput(text) {
  return /^https?:\/\//i.test(text.trim());
}

function FetchStep({ url, onSuccess, onFail }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const t = setTimeout(() => {
      // Simulated: sites known for heavy JS rendering / anti-scraping are
      // the ones a plain fetch + headless-browser fallback still can't win.
      const hardToScrape = /linkedin\.com|indeed\.com/i.test(url);
      if (hardToScrape) {
        setStatus("failed");
        setTimeout(onFail, 700);
      } else {
        setStatus("success");
        setTimeout(onSuccess, 500);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2.5">
        {status === "loading" && <Loader2 size={15} className="animate-spin-slow shrink-0" color={COLORS.amber} />}
        {status === "success" && <span className="animate-popcheck shrink-0"><CheckCircle2 size={15} color={COLORS.cyan} /></span>}
        {status === "failed" && <AlertTriangle size={15} color={COLORS.rose} className="shrink-0" />}
        <span className="text-xs" style={{ color: COLORS.paper, fontFamily: "monospace" }}>
          {status === "loading" && "Fetching job posting..."}
          {status === "success" && "Fetched job posting"}
          {status === "failed" && "Couldn't read this page automatically"}
        </span>
      </div>
      {status === "loading" && (
        <p className="text-xs pl-6" style={{ color: COLORS.textDim2 }}>
          Trying a direct read first, falling back to a full render if the page needs JavaScript...
        </p>
      )}
      {status === "failed" && (
        <p className="text-xs pl-6" style={{ color: COLORS.textDim2 }}>
          This site blocks automated reads. Sending you back to paste the job description text instead.
        </p>
      )}
    </div>
  );
}

function ProcessChecklist({ items, onDone }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (revealed >= items.length) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRevealed((n) => n + 1), 620);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <div className="space-y-2.5">
      {items.map((item, i) => {
        const state = i < revealed ? "done" : i === revealed ? "active" : "pending";
        return (
          <div key={i} className="flex items-center gap-2.5" style={{ opacity: state === "pending" ? 0.35 : 1 }}>
            {state === "done" && (
              <span className="animate-popcheck shrink-0">
                <CheckCircle2 size={15} color={COLORS.cyan} />
              </span>
            )}
            {state === "active" && <Loader2 size={15} className="animate-spin-slow shrink-0" color={COLORS.amber} />}
            {state === "pending" && <span className="w-[15px] h-[15px] rounded-full shrink-0" style={{ border: `1.5px solid ${COLORS.border}` }} />}
            <span className="text-xs" style={{ color: state === "pending" ? COLORS.textDim2 : COLORS.paper, fontFamily: "monospace" }}>
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function AddApplicationWizard({ open, onClose, onComplete }) {
  const [step, setStep] = useState(0);
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState(null);
  const [applying, setApplying] = useState(false);
  const [fetchPhase, setFetchPhase] = useState(true); // true = still needs to fetch URL, before extraction
  const [fetchWarning, setFetchWarning] = useState(false);
  const [applyMode, setApplyMode] = useState(null); // "email" | "manual" — null defers to hrEmail presence
  const [emailBody, setEmailBody] = useState(null);
  const [emailOpened, setEmailOpened] = useState(false); // true once mailto + download have been triggered

  useEffect(() => {
    if (open) {
      setStep(0); setRaw(""); setParsed(null); setApplying(false);
      setFetchPhase(true); setFetchWarning(false);
      setApplyMode(null); setEmailBody(null); setEmailOpened(false);
    }
  }, [open]);

  if (!open) return null;

  const isUrl = isUrlInput(raw);
  const effectiveMode = applyMode || (parsed?.hrEmail ? "email" : "manual");
  const defaultEmailBody = parsed
    ? `Hi team,\n\nI'm applying for the ${parsed.role} position. I've attached my tailored resume, reordered to highlight relevant backend/infra experience for this role.\n\nLooking forward to hearing from you.\n\nBest,\nSushanto Kumar`
    : "";

  const startParse = () => {
    if (!raw.trim()) return;
    setFetchWarning(false);
    setFetchPhase(true);
    setStep(1);
  };

  const onFetchFail = () => {
    setFetchWarning(true);
    setStep(0);
  };

  const onFetchSuccess = () => {
    setFetchPhase(false);
  };

  const onExtractDone = () => {
    setParsed(fakeParse(raw));
    setStep(2);
  };

  const confirmApply = () => {
    setApplying(true);
    setTimeout(() => {
      onComplete({
        id: "s" + Date.now(),
        company: parsed.company,
        code: parsed.code,
        role: parsed.role,
        date: "08.21",
        stage: "APPLIED",
        location: parsed.location,
      });
      onClose();
    }, 900);
  };

  const openEmailClient = () => {
    const subject = `Application for ${parsed.role} — Sushanto Kumar`;
    const body = emailBody ?? defaultEmailBody;
    // 1. Trigger the tailored resume download — mailto: cannot attach files,
    //    this is a browser/OS-level restriction, so the file has to land on
    //    disk first for the user to attach manually in their mail client.
    try {
      const blob = new Blob([`Tailored resume for ${parsed.company} — ${parsed.role}`], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_v2_${parsed.company}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) {
      // download blocked — the confirmation screen still tells the user
      // exactly what to attach manually.
    }
    // 2. Open the user's own default mail client with To/Subject/Body
    //    pre-filled. JobPilot never sends this itself.
    const mailto = `mailto:${parsed.hrEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try {
      window.open(mailto, "_self");
    } catch (e) {
      // pop-up/protocol handler blocked — fine, the confirmation screen
      // below still shows a manual mailto link to click.
    }
    setEmailOpened(true);
  };

  const markEmailSent = () => {
    onComplete({
      id: "s" + Date.now(),
      company: parsed.company,
      code: parsed.code,
      role: parsed.role,
      date: "08.21",
      stage: "APPLIED",
      location: parsed.location,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-lg shadow-2xl animate-modalin overflow-hidden"
        style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}
      >
        {/* progress header */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "13px", color: COLORS.paper, letterSpacing: "0.04em" }}>
              LOG APPLICATION
            </span>
            <button onClick={onClose} className="p-1 rounded hover:bg-white/5"><X size={15} color={COLORS.textDim} /></button>
          </div>
          <div className="flex items-center gap-1.5">
            {WIZARD_STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: i < step ? COLORS.cyan : i === step ? COLORS.amber : COLORS.surfaceLight,
                      color: i <= step ? COLORS.base : COLORS.textDim,
                      fontFamily: "monospace", fontWeight: 700, fontSize: "10px",
                    }}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="text-xs hidden sm:inline" style={{ color: i === step ? COLORS.paper : COLORS.textDim2 }}>{s}</span>
                </div>
                {i < WIZARD_STEPS.length - 1 && <div className="flex-1 h-px" style={{ backgroundColor: i < step ? COLORS.cyan : COLORS.border }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="px-5 py-5 min-h-[260px]">
          {step === 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link2 size={13} color={COLORS.textDim} />
                <span className="text-xs" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>PASTE JOB URL OR JD TEXT</span>
              </div>
              {fetchWarning && (
                <div className="flex items-start gap-2 p-2.5 rounded-md" style={{ backgroundColor: "rgba(224,86,124,0.1)", border: `1px solid rgba(224,86,124,0.3)` }}>
                  <AlertTriangle size={13} color={COLORS.rose} className="mt-0.5 shrink-0" />
                  <span className="text-xs" style={{ color: COLORS.textDim }}>
                    Couldn't read that page automatically — paste the job description text below instead.
                  </span>
                </div>
              )}
              <textarea
                autoFocus
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                placeholder="https://company.com/careers/senior-backend-engineer  — or paste the full job description here..."
                className="w-full h-32 bg-transparent text-sm rounded-md px-3 py-2.5 outline-none resize-none"
                style={{ color: COLORS.paper, border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.surfaceLight }}
              />
              <button
                onClick={startParse}
                disabled={!raw.trim()}
                className="w-full flex items-center justify-center gap-1.5 text-sm px-3 py-2.5 rounded-md font-semibold transition-opacity"
                style={{ backgroundColor: COLORS.amber, color: COLORS.base, opacity: raw.trim() ? 1 : 0.4 }}
              >
                Parse job description <ArrowRight size={14} />
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ScanSearch size={13} color={COLORS.amber} />
                <span className="text-xs" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>PARSING JOB DESCRIPTION</span>
              </div>
              {isUrl && fetchPhase ? (
                <FetchStep url={raw} onSuccess={onFetchSuccess} onFail={onFetchFail} />
              ) : (
                <ProcessChecklist
                  items={["Extracting company & role", "Identifying required skills", "Detecting seniority level"]}
                  onDone={onExtractDone}
                />
              )}
            </div>
          )}

          {step === 2 && parsed && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={13} color={COLORS.cyan} />
                <span className="text-xs" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>AI TAILORING RESUME</span>
              </div>
              <TailorStep parsed={parsed} onApprove={() => setStep(3)} />
            </div>
          )}

          {step === 3 && parsed && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Send size={13} color={COLORS.amber} />
                <span className="text-xs" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>REVIEW & SUBMIT</span>
              </div>

              {parsed.hrEmail && !emailOpened && (
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setApplyMode("email")}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-md font-medium transition-colors"
                    style={{
                      backgroundColor: effectiveMode === "email" ? "rgba(63,193,201,0.12)" : "transparent",
                      border: `1px solid ${effectiveMode === "email" ? COLORS.cyan : COLORS.border}`,
                      color: effectiveMode === "email" ? COLORS.cyan : COLORS.textDim,
                    }}
                  >
                    <Mail size={12} /> Apply now via email
                  </button>
                  <button
                    onClick={() => setApplyMode("manual")}
                    className="flex-1 text-xs px-3 py-2 rounded-md font-medium transition-colors"
                    style={{
                      backgroundColor: effectiveMode === "manual" ? COLORS.surfaceLight : "transparent",
                      border: `1px solid ${effectiveMode === "manual" ? COLORS.paper : COLORS.border}`,
                      color: effectiveMode === "manual" ? COLORS.paper : COLORS.textDim,
                    }}
                  >
                    Track manually
                  </button>
                </div>
              )}

              {effectiveMode === "email" && parsed.hrEmail ? (
                emailOpened ? (
                  <div className="py-2">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="animate-popcheck shrink-0"><CheckCircle2 size={18} color={COLORS.cyan} /></span>
                      <span className="text-sm font-semibold" style={{ color: COLORS.paper }}>Handed off to your email app</span>
                    </div>
                    <div className="rounded-md p-3.5 mb-4 space-y-1.5" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
                      <div className="flex items-start gap-2">
                        <Download size={12} color={COLORS.cyan} className="mt-0.5 shrink-0" />
                        <span className="text-xs" style={{ color: COLORS.textDim }}>Downloaded Resume_v2_{parsed.company}.pdf</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail size={12} color={COLORS.cyan} className="mt-0.5 shrink-0" />
                        <span className="text-xs" style={{ color: COLORS.textDim }}>Opened your default email app with To and Subject filled in</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Paperclip size={12} color={COLORS.amber} className="mt-0.5 shrink-0" />
                        <span className="text-xs" style={{ color: COLORS.textDim }}>Attach the downloaded file, then send it from there — JobPilot can't attach it or send it for you</span>
                      </div>
                    </div>
                    <p className="text-xs mb-3 px-0.5" style={{ color: COLORS.textDim2 }}>
                      We can't see your outbox, so let us know once you've actually hit send in your email app:
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={markEmailSent}
                        className="flex-1 flex items-center justify-center gap-1.5 text-sm px-3 py-2.5 rounded-md font-semibold"
                        style={{ backgroundColor: COLORS.amber, color: COLORS.base }}
                      >
                        <Check size={14} /> I've sent it — mark Applied
                      </button>
                      <button
                        onClick={() => setEmailOpened(false)}
                        className="text-sm px-3 py-2.5 rounded-md"
                        style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
                      >
                        Not yet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="rounded-md p-3.5 mb-3" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
                      <div className="text-xs mb-1" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>TO</div>
                      <div className="text-xs mb-2.5" style={{ color: COLORS.paper }}>{parsed.hrEmail}</div>
                      <div className="text-xs mb-1" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>SUBJECT</div>
                      <div className="text-xs mb-2.5" style={{ color: COLORS.paper }}>Application for {parsed.role} — Sushanto Kumar</div>
                      <div className="text-xs mb-1" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>MESSAGE</div>
                      <textarea
                        value={emailBody ?? defaultEmailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        className="w-full h-24 bg-transparent text-xs rounded-md px-2.5 py-2 outline-none resize-none mb-2.5"
                        style={{ color: COLORS.paper, border: `1px solid ${COLORS.border}` }}
                      />
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md w-fit" style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
                        <Paperclip size={11} color={COLORS.cyan} />
                        <span className="text-xs" style={{ color: COLORS.textDim }}>Resume_v2_{parsed.company}.pdf</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 mb-3 px-0.5">
                      <AlertTriangle size={11} color={COLORS.textDim2} className="mt-0.5 shrink-0" />
                      <span className="text-xs" style={{ color: COLORS.textDim2 }}>
                        Opens in your own email app — the resume downloads automatically for you to attach, since browsers won't let a webpage attach files to an email for you.
                      </span>
                    </div>
                    <button
                      onClick={openEmailClient}
                      className="w-full flex items-center justify-center gap-1.5 text-sm px-3 py-2.5 rounded-md font-semibold"
                      style={{ backgroundColor: COLORS.amber, color: COLORS.base }}
                    >
                      Open email app <ExternalLink size={13} />
                    </button>
                  </div>
                )
              ) : (
                <div>
                  <div className="rounded-md p-3.5 mb-3" style={{ backgroundColor: COLORS.paper }}>
                    <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#6B6558" }}>{parsed.code} · {parsed.seniority}</div>
                    <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "16px", color: "#1C1A15", marginTop: "2px" }}>{parsed.company}</div>
                    <div style={{ fontSize: "12.5px", color: "#4A4638", marginTop: "2px" }}>{parsed.role} · {parsed.location}</div>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <Check size={12} color={COLORS.cyan} />
                      <span style={{ fontSize: "11px", color: "#4A4638" }}>Tailored resume v2 attached</span>
                    </div>
                  </div>
                  {!parsed.hrEmail && (
                    <div className="flex items-start gap-2 mb-3 px-0.5">
                      <AlertTriangle size={12} color={COLORS.textDim2} className="mt-0.5 shrink-0" />
                      <span className="text-xs" style={{ color: COLORS.textDim2 }}>
                        No direct HR email found in this listing — apply via the original posting, then track it here.
                      </span>
                    </div>
                  )}
                  <button
                    onClick={confirmApply}
                    disabled={applying}
                    className="w-full flex items-center justify-center gap-1.5 text-sm px-3 py-2.5 rounded-md font-semibold transition-opacity"
                    style={{ backgroundColor: COLORS.amber, color: COLORS.base, opacity: applying ? 0.6 : 1 }}
                  >
                    {applying ? (<><Loader2 size={14} className="animate-spin-slow" /> Submitting application...</>) : (<>Confirm & add to pipeline <ArrowRight size={14} /></>)}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TailorStep({ parsed, onApprove }) {
  const [ready, setReady] = useState(false);
  return (
    <div>
      {!ready ? (
        <ProcessChecklist
          items={["Analyzing your base resume", "Matching JD keywords", "Grounding check — no fabricated content"]}
          onDone={() => setReady(true)}
        />
      ) : (
        <div className="animate-fadeup">
          <div className="rounded-md p-3.5" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
            <p className="text-xs leading-relaxed mb-2.5" style={{ color: COLORS.textDim }}>
              Reordered experience to lead with backend/infra work. Matched {parsed.skills.length} keywords from the JD.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {parsed.skills.map((s) => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(63,193,201,0.12)", color: COLORS.cyan }}>{s}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 pt-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
              <AlertTriangle size={12} color={COLORS.rose} />
              <span className="text-xs" style={{ color: COLORS.textDim2 }}>Gap flagged: Kubernetes not found in your resume — not fabricated.</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3.5">
            <button onClick={onApprove} className="flex-1 flex items-center justify-center gap-1.5 text-sm px-3 py-2 rounded-md font-semibold" style={{ backgroundColor: COLORS.cyan, color: COLORS.base }}>
              <Check size={14} /> Approve & continue
            </button>
            <button className="text-sm px-3 py-2 rounded-md" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PipelinePage({ strips, setStrips, addOpen, setAddOpen }) {
  const [selected, setSelected] = useState(null);
  const draggedId = useRef(null);
  const onDragStart = (e, id) => { draggedId.current = id; };
  const onDrop = (e, stageKey) => {
    e.preventDefault();
    const id = draggedId.current;
    if (!id) return;
    setStrips((prev) => prev.map((s) => (s.id === id ? { ...s, stage: stageKey } : s)));
    draggedId.current = null;
  };
  return (
    <div className="px-6 py-6 max-w-4xl">
      {STAGES.map((stage) => (
        <Rack key={stage.key} stage={stage} strips={strips.filter((s) => s.stage === stage.key)} onOpen={setSelected} onDragStart={onDragStart} onDrop={onDrop} />
      ))}
      <DetailPanel strip={selected} onClose={() => setSelected(null)} />
      <AddApplicationWizard
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onComplete={(strip) => setStrips((p) => [...p, strip])}
      />
    </div>
  );
}

/* ---------------- analytics page ---------------- */

const stageData = [
  { name: "Applied", value: 2, fill: COLORS.textDim },
  { name: "Screening", value: 2, fill: COLORS.amber },
  { name: "Interview", value: 1, fill: COLORS.cyan },
  { name: "Closed", value: 1, fill: COLORS.rose },
];

const trendData = [
  { week: "W1", rate: 8 },
  { week: "W2", rate: 14 },
  { week: "W3", rate: 12 },
  { week: "W4", rate: 22 },
  { week: "W5", rate: 31 },
  { week: "W6", rate: 27 },
];

const keywordData = [
  { keyword: "Docker", matches: 9 },
  { keyword: "BullMQ", matches: 6 },
  { keyword: "PostgreSQL", matches: 8 },
  { keyword: "TypeScript", matches: 11 },
  { keyword: "Redis", matches: 5 },
];

function StatCard({ label, value, delta, icon: Icon, color }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>{label}</span>
        <Icon size={14} color={color} />
      </div>
      <div style={{ fontSize: "24px", fontWeight: 700, color: COLORS.paper, fontFamily: "monospace" }}>{value}</div>
      {delta && <div className="text-xs mt-1" style={{ color: COLORS.cyan }}>{delta}</div>}
    </Card>
  );
}

function AnalyticsPage() {
  return (
    <div className="px-6 py-6 max-w-4xl space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="APPLICATIONS" value="6" delta="+2 this week" icon={TrendingUp} color={COLORS.amber} />
        <StatCard label="RESPONSE RATE" value="33%" delta="+11% vs baseline" icon={BarChart3} color={COLORS.cyan} />
        <StatCard label="AVG TIME SAVED" value="17m" delta="per application" icon={Zap} color={COLORS.amber} />
        <StatCard label="AI SUCCESS RATE" value="96%" delta="47/49 jobs" icon={Sparkles} color={COLORS.cyan} />
      </div>

      <Card>
        <SectionLabel icon={TrendingUp}>Response rate trend</SectionLabel>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid stroke={COLORS.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" stroke={COLORS.textDim} fontSize={11} tickLine={false} axisLine={{ stroke: COLORS.border }} />
            <YAxis stroke={COLORS.textDim} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12 }} labelStyle={{ color: COLORS.paper }} />
            <Line type="monotone" dataKey="rate" stroke={COLORS.cyan} strokeWidth={2} dot={{ fill: COLORS.cyan, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <SectionLabel icon={LayoutGrid}>Pipeline distribution</SectionLabel>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={stageData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={65} paddingAngle={3}>
                {stageData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-1 justify-center">
            {stageData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.fill }} />
                <span className="text-xs" style={{ color: COLORS.textDim }}>{s.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel icon={FileText}>Top matched keywords</SectionLabel>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={keywordData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="keyword" stroke={COLORS.textDim} fontSize={11} tickLine={false} axisLine={false} width={80} />
              <Tooltip contentStyle={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12 }} cursor={{ fill: COLORS.surfaceLight }} />
              <Bar dataKey="matches" fill={COLORS.amber} radius={[0, 4, 4, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- resumes page ---------------- */

const RESUMES = [
  { id: "r1", label: "Base Resume", tag: "MASTER", linked: null, updated: "07.20", keywords: [] },
  { id: "r2", label: "v2 · Acme Labs", tag: "TAILORED", linked: "ACME LABS", updated: "08.14", keywords: ["Docker", "BullMQ", "PostgreSQL"] },
  { id: "r3", label: "v3 · Northwind", tag: "TAILORED", linked: "NORTHWIND", updated: "08.15", keywords: ["TypeScript", "Redis", "Prisma"] },
  { id: "r4", label: "v4 · Halcyon IO", tag: "TAILORED", linked: "HALCYON IO", updated: "08.05", keywords: ["Docker", "CI/CD", "Kubernetes"] },
];

function ResumesPage() {
  return (
    <div className="px-6 py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <SectionLabel icon={FileText}>Resume versions</SectionLabel>
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.paper }}>
          <Upload size={12} /> Upload base resume
        </button>
      </div>
      <div className="space-y-3">
        {RESUMES.map((r, i) => (
          <div
            key={r.id}
            className="animate-fadeup flex items-center justify-between p-3.5 rounded-md"
            style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: r.tag === "MASTER" ? COLORS.surfaceLight : "rgba(63,193,201,0.12)" }}
              >
                <FileText size={15} color={r.tag === "MASTER" ? COLORS.textDim : COLORS.cyan} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold truncate" style={{ color: COLORS.paper }}>{r.label}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      fontFamily: "monospace", fontSize: "9px",
                      backgroundColor: r.tag === "MASTER" ? COLORS.surfaceLight : "rgba(242,169,59,0.15)",
                      color: r.tag === "MASTER" ? COLORS.textDim : COLORS.amber,
                    }}
                  >
                    {r.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {r.linked && <span className="text-xs" style={{ color: COLORS.textDim2 }}>→ {r.linked}</span>}
                  {r.keywords.map((k) => (
                    <span key={k} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: COLORS.surfaceLight, color: COLORS.textDim }}>{k}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs hidden sm:block" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>{r.updated}</span>
              <button className="text-xs px-2.5 py-1.5 rounded-md transition-colors hover:bg-white/5" style={{ color: COLORS.cyan, border: `1px solid ${COLORS.border}` }}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- settings page ---------------- */

function SettingsRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-3.5" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="pr-4">
        <div className="text-sm" style={{ color: COLORS.paper }}>{label}</div>
        {description && <div className="text-xs mt-0.5" style={{ color: COLORS.textDim2 }}>{description}</div>}
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const [autoTailor, setAutoTailor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [followupDays, setFollowupDays] = useState(7);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="px-6 py-6 max-w-2xl space-y-5">
      <Card>
        <SectionLabel icon={Zap}>Automation</SectionLabel>
        <SettingsRow label="Auto-tailor resume on new application" description="AI drafts a tailored version immediately; still requires your approval">
          <Toggle checked={autoTailor} onChange={setAutoTailor} />
        </SettingsRow>
        <SettingsRow label="Follow-up reminder delay" description="Days to wait before drafting a follow-up email">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={followupDays}
              onChange={(e) => setFollowupDays(e.target.value)}
              className="w-14 bg-transparent text-sm text-center rounded px-2 py-1 outline-none"
              style={{ color: COLORS.paper, border: `1px solid ${COLORS.border}`, fontFamily: "monospace" }}
            />
            <span className="text-xs" style={{ color: COLORS.textDim2 }}>days</span>
          </div>
        </SettingsRow>
        <div className="pt-3.5">
          <SettingsRow label="Dark interface" description="JobPilot is designed dark-first">
            <Toggle checked={darkMode} onChange={setDarkMode} />
          </SettingsRow>
        </div>
      </Card>

      <Card>
        <SectionLabel icon={Bell}>Notifications</SectionLabel>
        <SettingsRow label="Email notifications" description="Status changes, follow-up drafts ready, weekly summary">
          <Toggle checked={emailNotif} onChange={setEmailNotif} />
        </SettingsRow>
        <SettingsRow label="Notification email" description="">
          <span className="text-xs" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>sushanto@mail.com</span>
        </SettingsRow>
      </Card>

      <Card>
        <SectionLabel icon={Shield}>Account</SectionLabel>
        <SettingsRow label="Plan" description="Free — 20 applications / month">
          <button className="text-xs px-3 py-1.5 rounded-md font-semibold" style={{ backgroundColor: COLORS.amber, color: COLORS.base }}>Upgrade</button>
        </SettingsRow>
        <SettingsRow label="Export my data" description="Download all applications, resumes, and events as JSON">
          <button className="text-xs px-3 py-1.5 rounded-md" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.paper }}>Export</button>
        </SettingsRow>
      </Card>

      <Card style={{ borderColor: "rgba(224,86,124,0.35)" }}>
        <SectionLabel icon={Trash2}>Danger zone</SectionLabel>
        <SettingsRow label="Delete account" description="Permanently removes all applications, resumes, and history">
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md" style={{ backgroundColor: "rgba(224,86,124,0.12)", color: COLORS.rose, border: `1px solid rgba(224,86,124,0.35)` }}>
            <Trash2 size={12} /> Delete
          </button>
        </SettingsRow>
      </Card>
    </div>
  );
}

/* ---------------- profile page ---------------- */

function ProfileField({ label, value }) {
  return (
    <div>
      <label className="text-xs" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>{label}</label>
      <input
        defaultValue={value}
        className="w-full mt-1 bg-transparent text-sm rounded-md px-3 py-2 outline-none"
        style={{ color: COLORS.paper, border: `1px solid ${COLORS.border}` }}
      />
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="px-6 py-6 max-w-2xl space-y-5">
      <Card>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
            style={{ backgroundColor: COLORS.cyan, color: COLORS.base }}
          >
            SK
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold" style={{ color: COLORS.paper }}>Sushanto Kumar</div>
            <div className="text-xs mt-0.5" style={{ color: COLORS.textDim }}>Backend Developer · Bangladesh</div>
            <button className="flex items-center gap-1.5 text-xs mt-2 px-2.5 py-1 rounded-md" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.paper }}>
              <Upload size={11} /> Change avatar
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card><div className="text-xs" style={{ color: COLORS.textDim2 }}>Applications</div><div className="text-lg font-bold mt-1" style={{ color: COLORS.paper, fontFamily: "monospace" }}>6</div></Card>
        <Card><div className="text-xs" style={{ color: COLORS.textDim2 }}>Response rate</div><div className="text-lg font-bold mt-1" style={{ color: COLORS.paper, fontFamily: "monospace" }}>33%</div></Card>
        <Card><div className="text-xs" style={{ color: COLORS.textDim2 }}>Interviews</div><div className="text-lg font-bold mt-1" style={{ color: COLORS.paper, fontFamily: "monospace" }}>1</div></Card>
      </div>

      <Card>
        <SectionLabel icon={User}>Personal info</SectionLabel>
        <div className="space-y-3">
          <ProfileField label="FULL NAME" value="Sushanto Kumar" />
          <ProfileField label="EMAIL" value="sushanto@mail.com" />
          <ProfileField label="LOCATION" value="Dhaka, Bangladesh" />
          <ProfileField label="TARGET ROLE" value="Backend / Node.js Engineer" />
        </div>
        <div className="flex gap-2 mt-4">
          <button className="text-xs px-3.5 py-1.5 rounded-md font-semibold" style={{ backgroundColor: COLORS.amber, color: COLORS.base }}>Save changes</button>
          <button className="text-xs px-3.5 py-1.5 rounded-md" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}>Cancel</button>
        </div>
      </Card>

      <button className="flex items-center gap-2 text-xs px-1" style={{ color: COLORS.rose }}>
        <LogOut size={13} /> Sign out
      </button>
    </div>
  );
}

/* ---------------- admin page ---------------- */

const ADMIN_TABS = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "users", label: "Users", icon: Users },
  { key: "aijobs", label: "AI Jobs", icon: Database },
  { key: "content", label: "Content", icon: FileText },
  { key: "system", label: "System", icon: SettingsIcon },
];

function AdminTabs({ tab, setTab }) {
  return (
    <div className="flex items-center gap-1.5 mb-5 flex-wrap">
      {ADMIN_TABS.map((t) => {
        const Icon = t.icon;
        const isActive = tab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors duration-150"
            style={{
              backgroundColor: isActive ? "rgba(224,86,124,0.14)" : COLORS.surface,
              color: isActive ? COLORS.rose : COLORS.textDim,
              border: `1px solid ${isActive ? "rgba(224,86,124,0.35)" : COLORS.border}`,
            }}
          >
            <Icon size={12} /> {t.label}
          </button>
        );
      })}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    active: { bg: "rgba(63,193,201,0.14)", fg: COLORS.cyan, label: "Active" },
    suspended: { bg: "rgba(224,86,124,0.14)", fg: COLORS.rose, label: "Suspended" },
    completed: { bg: "rgba(63,193,201,0.14)", fg: COLORS.cyan, label: "Completed" },
    failed: { bg: "rgba(224,86,124,0.14)", fg: COLORS.rose, label: "Failed" },
    processing: { bg: "rgba(242,169,59,0.14)", fg: COLORS.amber, label: "Processing" },
    published: { bg: "rgba(63,193,201,0.14)", fg: COLORS.cyan, label: "Published" },
    draft: { bg: COLORS.surfaceLight, fg: COLORS.textDim, label: "Draft" },
  };
  const s = map[status] || map.draft;
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: s.bg, color: s.fg }}>
      {s.label}
    </span>
  );
}

function AdminOverviewTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="TOTAL USERS" value="1,204" delta="+19 this week" icon={Users} color={COLORS.amber} />
        <StatCard label="MRR" value="$3,410" delta="+$280 this week" icon={TrendingUp} color={COLORS.cyan} />
        <StatCard label="APPLICATIONS PROCESSED" value="18.6k" delta="+1.2k this week" icon={Activity} color={COLORS.amber} />
        <StatCard label="PLATFORM AI SUCCESS" value="97.2%" delta="last 7 days" icon={Shield} color={COLORS.cyan} />
      </div>
      <Card>
        <SectionLabel icon={TrendingUp}>Signups (last 6 weeks)</SectionLabel>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={SIGNUP_TREND}>
            <CartesianGrid stroke={COLORS.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" stroke={COLORS.textDim} fontSize={11} tickLine={false} axisLine={{ stroke: COLORS.border }} />
            <YAxis stroke={COLORS.textDim} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12 }} labelStyle={{ color: COLORS.paper }} />
            <Line type="monotone" dataKey="signups" stroke={COLORS.rose} strokeWidth={2} dot={{ fill: COLORS.rose, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <SectionLabel icon={AlertTriangle}>Needs attention</SectionLabel>
        <div className="flex items-center gap-2.5 py-2">
          <Ban size={13} color={COLORS.rose} />
          <span className="text-xs" style={{ color: COLORS.textDim }}>1 AI job failed in the last hour — see AI Jobs tab</span>
        </div>
        <div className="flex items-center gap-2.5 py-2">
          <Users size={13} color={COLORS.amber} />
          <span className="text-xs" style={{ color: COLORS.textDim }}>1 account currently suspended</span>
        </div>
      </Card>
    </div>
  );
}

function AdminUsersTab() {
  const [query, setQuery] = useState("");
  const filtered = ADMIN_USERS.filter((u) => (u.name + u.email).toLowerCase().includes(query.toLowerCase()));
  return (
    <Card>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <SectionLabel icon={Users}>Users ({filtered.length})</SectionLabel>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
          <Search size={12} color={COLORS.textDim} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..." className="bg-transparent text-xs outline-none w-32" style={{ color: COLORS.paper }} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth: "560px" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {["User", "Plan", "Apps", "Status", "Joined", ""].map((h) => (
                <th key={h} className="text-xs font-normal pb-2 px-2" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td className="py-2.5 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: COLORS.surfaceLight, color: COLORS.paper }}>
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate" style={{ color: COLORS.paper }}>{u.name} {u.role === "Admin" && <span style={{ color: COLORS.rose }}>· admin</span>}</div>
                      <div className="text-xs truncate" style={{ color: COLORS.textDim2 }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-2 text-xs" style={{ color: COLORS.textDim }}>{u.plan}</td>
                <td className="py-2.5 px-2 text-xs" style={{ color: COLORS.textDim, fontFamily: "monospace" }}>{u.apps}</td>
                <td className="py-2.5 px-2"><StatusPill status={u.status} /></td>
                <td className="py-2.5 px-2 text-xs" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>{u.joined}</td>
                <td className="py-2.5 px-2">
                  <div className="flex items-center gap-1.5 justify-end">
                    <button title="Suspend / reinstate" className="p-1.5 rounded hover:bg-white/5 transition-colors">
                      <Ban size={13} color={u.status === "suspended" ? COLORS.cyan : COLORS.rose} />
                    </button>
                    <button title="Delete user" className="p-1.5 rounded hover:bg-white/5 transition-colors">
                      <Trash2 size={13} color={COLORS.textDim} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AdminAiJobsTab() {
  const [filter, setFilter] = useState("all");
  const filtered = ADMIN_AI_JOBS.filter((j) => filter === "all" || j.status === filter);
  return (
    <Card>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <SectionLabel icon={Database}>AI job audit log</SectionLabel>
        <div className="flex items-center gap-1.5">
          {["all", "completed", "processing", "failed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-2.5 py-1 rounded-full capitalize transition-colors"
              style={{
                backgroundColor: filter === f ? COLORS.surfaceLight : "transparent",
                color: filter === f ? COLORS.paper : COLORS.textDim2,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((j) => (
          <div key={j.id} className="flex items-center justify-between p-3 rounded-md" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
            <div className="flex items-center gap-3 min-w-0">
              {j.status === "processing" ? (
                <Loader2 size={14} className="animate-spin-slow shrink-0" color={COLORS.amber} />
              ) : j.status === "failed" ? (
                <AlertTriangle size={14} color={COLORS.rose} className="shrink-0" />
              ) : (
                <CheckCircle2 size={14} color={COLORS.cyan} className="shrink-0" />
              )}
              <div className="min-w-0">
                <div className="text-xs font-medium" style={{ color: COLORS.paper, fontFamily: "monospace" }}>{j.type}</div>
                <div className="text-xs truncate" style={{ color: COLORS.textDim2 }}>
                  {j.user} {j.error && <span style={{ color: COLORS.rose }}>· {j.error}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <StatusPill status={j.status} />
              <span className="text-xs hidden sm:block" style={{ color: COLORS.textDim2, fontFamily: "monospace" }}>{j.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminContentTab() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel icon={FileText}>Content management</SectionLabel>
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md font-semibold" style={{ backgroundColor: COLORS.amber, color: COLORS.base }}>
          <Plus size={12} /> New post
        </button>
      </div>
      <div className="space-y-2">
        {ADMIN_CONTENT.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 rounded-md" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ fontFamily: "monospace", fontSize: "9px", backgroundColor: COLORS.surface, color: COLORS.textDim }}>{c.type}</span>
                <span className="text-xs font-medium truncate" style={{ color: COLORS.paper }}>{c.title}</span>
              </div>
              <div className="text-xs mt-1" style={{ color: COLORS.textDim2 }}>Updated {c.updated}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <StatusPill status={c.status} />
              <button className="p-1.5 rounded hover:bg-white/5 transition-colors"><Pencil size={13} color={COLORS.textDim} /></button>
              <button className="p-1.5 rounded hover:bg-white/5 transition-colors"><Trash2 size={13} color={COLORS.textDim} /></button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminSystemTab() {
  const [autoTailorGlobal, setAutoTailorGlobal] = useState(true);
  const [signupsOpen, setSignupsOpen] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-5">
      <Card>
        <SectionLabel icon={Power}>Feature flags</SectionLabel>
        <SettingsRow label="Auto-tailor resumes platform-wide" description="Overrides individual user settings when disabled">
          <Toggle checked={autoTailorGlobal} onChange={setAutoTailorGlobal} />
        </SettingsRow>
        <SettingsRow label="New signups enabled" description="Turn off to pause onboarding during incidents">
          <Toggle checked={signupsOpen} onChange={setSignupsOpen} />
        </SettingsRow>
        <SettingsRow label="Maintenance mode" description="Shows a maintenance banner to all users">
          <Toggle checked={maintenance} onChange={setMaintenance} />
        </SettingsRow>
      </Card>

      <Card>
        <SectionLabel icon={Database}>Infrastructure</SectionLabel>
        <SettingsRow label="BullMQ queues" description="jd-parse · resume-tailor · followup-reminder">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(63,193,201,0.14)", color: COLORS.cyan }}>Healthy</span>
        </SettingsRow>
        <SettingsRow label="Redis cache" description="Hit rate last 24h: 88%">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(63,193,201,0.14)", color: COLORS.cyan }}>Healthy</span>
        </SettingsRow>
        <div className="pt-3.5">
          <SettingsRow label="Restart workers" description="Gracefully drains and restarts all BullMQ workers">
            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.paper }}>
              <RefreshCw size={12} /> Restart
            </button>
          </SettingsRow>
        </div>
      </Card>

      <Card style={{ borderColor: "rgba(224,86,124,0.35)" }}>
        <SectionLabel icon={KeyRound}>Access</SectionLabel>
        <SettingsRow label="Admin API keys" description="Used for platform-level scripts and automation">
          <button className="text-xs px-3 py-1.5 rounded-md" style={{ backgroundColor: "rgba(224,86,124,0.12)", color: COLORS.rose, border: `1px solid rgba(224,86,124,0.35)` }}>
            Rotate keys
          </button>
        </SettingsRow>
      </Card>
    </div>
  );
}

function AdminPage() {
  const [tab, setTab] = useState("overview");
  return (
    <div className="px-6 py-6 max-w-4xl">
      <AdminTabs tab={tab} setTab={setTab} />
      {tab === "overview" && <AdminOverviewTab />}
      {tab === "users" && <AdminUsersTab />}
      {tab === "aijobs" && <AdminAiJobsTab />}
      {tab === "content" && <AdminContentTab />}
      {tab === "system" && <AdminSystemTab />}
    </div>
  );
}

/* ---------------- ai chatbot widget ---------------- */

const CHAT_QUICK_PROMPTS = [
  "What's my response rate?",
  "Why was my Acme Labs resume tailored this way?",
  "Draft a follow-up for Halcyon IO",
];

function mockCopilotAnswer(q) {
  const lower = q.toLowerCase();
  if (lower.includes("response rate") || lower.includes("callback")) {
    return "Your response rate is 33% across 6 applications — up 11 points from your baseline. Docker and PostgreSQL keyword matches are correlating most with callbacks so far.";
  }
  if (lower.includes("tailor") || lower.includes("acme")) {
    return "For Acme Labs, I reordered your experience to lead with Docker and BullMQ work and matched 6 JD keywords. One gap was flagged honestly — Kubernetes isn't in your resume, so I didn't add it.";
  }
  if (lower.includes("follow") || lower.includes("halcyon")) {
    return "Here's a draft:\n\n\"Hi team, following up on my application for the Platform Engineer role. Still very interested — happy to share more detail on my Docker/CI-CD experience if useful.\"\n\nWant me to adjust the tone?";
  }
  if (lower.includes("pipeline") || lower.includes("stage")) {
    return "Right now you have 2 in Applied, 2 in Screening, 1 in Interview, and 1 Closed. Halcyon IO has been in Interview the longest — might be worth a check-in.";
  }
  return "I can only answer using your actual applications, resumes, and pipeline data — I won't guess or invent details. Try asking about your response rate, a specific tailored resume, or a follow-up draft.";
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "Hi Sushanto — I'm your JobPilot copilot. Ask me about your pipeline, a tailored resume, or draft a follow-up." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: mockCopilotAnswer(q) }]);
    }, 850 + Math.random() * 500);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: COLORS.amber, width: "52px", height: "52px" }}
        >
          <MessageCircle size={22} color={COLORS.base} />
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-6 right-6 z-40 w-[340px] max-w-[calc(100vw-2rem)] rounded-lg shadow-2xl overflow-hidden animate-chatin flex flex-col"
          style={{ height: "480px", maxHeight: "calc(100vh-3rem)", backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        >
          <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${COLORS.border}`, backgroundColor: COLORS.surfaceLight }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: COLORS.amber }}>
                <Bot size={14} color={COLORS.base} />
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: COLORS.paper, fontFamily: "monospace" }}>JOBPILOT COPILOT</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: COLORS.cyan }} />
                  <span className="text-xs" style={{ color: COLORS.textDim2 }}>Grounded in your data only</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/5">
              <X size={14} color={COLORS.textDim} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className="max-w-[85%] px-3 py-2 rounded-md text-xs leading-relaxed whitespace-pre-line"
                  style={{
                    backgroundColor: m.role === "user" ? COLORS.amber : COLORS.surfaceLight,
                    color: m.role === "user" ? COLORS.base : COLORS.paper,
                    border: m.role === "user" ? "none" : `1px solid ${COLORS.border}`,
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-3 py-2.5 rounded-md flex items-center gap-1" style={{ backgroundColor: COLORS.surfaceLight, border: `1px solid ${COLORS.border}` }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bounce-dot" style={{ backgroundColor: COLORS.textDim, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && !typing && (
            <div className="px-3.5 pb-2.5 flex flex-wrap gap-1.5 shrink-0">
              {CHAT_QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-2.5 py-1 rounded-full transition-colors hover:bg-white/5"
                  style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 flex items-center gap-2 shrink-0" style={{ borderTop: `1px solid ${COLORS.border}` }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about your pipeline..."
              className="flex-1 bg-transparent text-xs px-3 py-2 rounded-md outline-none"
              style={{ color: COLORS.paper, border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.surfaceLight }}
            />
            <button onClick={() => send()} className="p-2 rounded-md shrink-0" style={{ backgroundColor: COLORS.amber }}>
              <Send size={13} color={COLORS.base} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- root app ---------------- */

const PAGE_META = {
  pipeline: { title: "Pipeline", subtitle: "6 applications in flight" },
  analytics: { title: "Analytics", subtitle: "Your job search, measured" },
  resumes: { title: "Resumes", subtitle: "Base resume and tailored versions" },
  settings: { title: "Settings", subtitle: "Automation, notifications, account" },
  profile: { title: "Profile", subtitle: "Your personal details" },
  admin: { title: "Admin panel", subtitle: "Platform users, AI jobs, content, and system health" },
};

export default function JobPilotApp() {
  const [active, setActive] = useState("pipeline");
  const [collapsed, setCollapsed] = useState(false);
  const [strips, setStrips] = useState(SEED);
  const [addOpen, setAddOpen] = useState(false);

  const meta = PAGE_META[active];

  return (
    <div className="flex w-full" style={{ backgroundColor: COLORS.base, fontFamily: "Inter, sans-serif", height: "100vh" }}>
      <GlobalStyles />
      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={meta.title} subtitle={meta.subtitle} onAdd={active === "pipeline" ? () => setAddOpen(true) : null} />
        <div className="flex-1 overflow-y-auto">
          {active === "pipeline" && <PipelinePage strips={strips} setStrips={setStrips} addOpen={addOpen} setAddOpen={setAddOpen} />}
          {active === "analytics" && <AnalyticsPage />}
          {active === "resumes" && <ResumesPage />}
          {active === "settings" && <SettingsPage />}
          {active === "profile" && <ProfilePage />}
          {active === "admin" && <AdminPage />}
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}
