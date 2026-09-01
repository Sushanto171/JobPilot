"use client";

import {
  ArrowRight,
  ChevronRight,
  Code2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const COLORS = {
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

export type PublicPage =
  | "home"
  | "features"
  | "pricing"
  | "blog"
  | "post"
  | "changelog"
  | "about"
  | "faq"
  | "contact"
  | "login"
  | "signup"
  | "privacy"
  | "terms";

const PATHS: Record<PublicPage, string> = {
  home: "/",
  features: "/features",
  pricing: "/pricing",
  blog: "/blog",
  post: "/blog/post",
  changelog: "/changelog",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
  login: "/login",
  signup: "/signup",
  privacy: "/privacy",
  terms: "/terms",
};

export function usePublicNavigation() {
  const router = useRouter();
  return (page: PublicPage) => {
    router.push(PATHS[page]);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
}

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function GlobalStyles() {
  return (
    <style>{`@keyframes float{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-10px) rotate(var(--r,0deg))}}.float-strip{animation:float 5s ease-in-out infinite}@keyframes drift{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.marquee-track{animation:drift 22s linear infinite}@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}.pulse-dot{animation:pulse-dot 1.8s ease-in-out infinite}@keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.page-in{animation:fadein .35s ease-out}@keyframes accordion{from{opacity:0;max-height:0}to{opacity:1;max-height:400px}}.accordion-in{animation:accordion .25s ease-out}`}</style>
  );
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-xs font-semibold"
      style={{
        fontFamily: "monospace",
        color: COLORS.textDim,
        letterSpacing: "0.12em",
      }}
    >
      {children}
    </span>
  );
}

export function FieldInput({
  label,
  type = "text",
  placeholder,
  icon: Icon,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: typeof Mail;
}) {
  return (
    <div>
      {label && (
        <label
          className="text-xs"
          style={{ color: COLORS.textDim2, fontFamily: "monospace" }}
        >
          {label}
        </label>
      )}
      <div className="relative mt-1">
        {Icon && (
          <Icon
            size={14}
            color={COLORS.textDim}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm rounded-md px-3 py-2.5 outline-none"
          style={{
            color: COLORS.paper,
            border: `1px solid ${COLORS.border}`,
            backgroundColor: COLORS.surfaceLight,
            paddingLeft: Icon ? "34px" : "12px",
          }}
        />
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-md font-semibold transition-transform hover:scale-105 active:scale-95 ${full ? "w-full" : ""}`}
      style={{ backgroundColor: COLORS.amber, color: COLORS.base }}
    >
      {children}
    </button>
  );
}
export function GhostButton({
  children,
  onClick,
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-md transition-colors hover:bg-white/5 ${full ? "w-full" : ""}`}
      style={{ border: `1px solid ${COLORS.border}`, color: COLORS.paper }}
    >
      {children}
    </button>
  );
}

const NAV_LINKS: { key: PublicPage; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "features", label: "Features" },
  { key: "pricing", label: "Pricing" },
  { key: "blog", label: "Blog" },
  { key: "faq", label: "FAQ" },
  { key: "contact", label: "Contact" },
];
const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { k: "features", l: "Features" },
      { k: "pricing", l: "Pricing" },
      { k: "changelog", l: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { k: "about", l: "About" },
      { k: "blog", l: "Blog" },
      { k: "contact", l: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { k: "privacy", l: "Privacy Policy" },
      { k: "terms", l: "Terms of Service" },
    ],
  },
  {
    title: "Account",
    links: [
      { k: "login", l: "Sign in" },
      { k: "signup", l: "Sign up" },
    ],
  },
] as const;

function NavBar({
  page,
  goTo,
}: {
  page: PublicPage;
  goTo: (page: PublicPage) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="sticky top-0 z-40"
      style={{
        backgroundColor: "rgba(20,24,31,0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
        <button
          className="flex items-center gap-2"
          onClick={() => goTo("home")}
        >
          <div
            className="w-7 h-7 rounded flex items-center justify-center"
            style={{ backgroundColor: COLORS.amber }}
          >
            <Zap size={14} color={COLORS.base} />
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "15px",
              color: COLORS.paper,
              letterSpacing: "0.03em",
            }}
          >
            JOBPILOT
          </span>
        </button>
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              onClick={() => goTo(link.key)}
              className="text-sm transition-colors"
              style={{
                color: page === link.key ? COLORS.paper : COLORS.textDim,
                fontWeight: page === link.key ? 600 : 400,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => goTo("login")}
            className="text-sm"
            style={{ color: COLORS.textDim }}
          >
            Sign in
          </button>
          <button
            onClick={() => goTo("signup")}
            className="flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-md font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: COLORS.amber, color: COLORS.base }}
          >
            Get started <ArrowRight size={13} />
          </button>
        </div>
        <button className="md:hidden p-1.5" onClick={() => setOpen(!open)}>
          {open ? (
            <X size={18} color={COLORS.paper} />
          ) : (
            <Menu size={18} color={COLORS.paper} />
          )}
        </button>
      </div>
      {open && (
        <div
          className="md:hidden px-5 pb-4 flex flex-col gap-3"
          style={{ borderTop: `1px solid ${COLORS.border}` }}
        >
          {[
            ...NAV_LINKS,
            { key: "login", label: "Sign in" },
            { key: "signup", label: "Get started" },
          ].map((link) => (
            <button
              key={link.key}
              onClick={() => {
                goTo(link.key as PublicPage);
                setOpen(false);
              }}
              className="text-sm pt-3 text-left"
              style={{ color: COLORS.textDim }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Footer({ goTo }: { goTo: (page: PublicPage) => void }) {
  return (
    <div style={{ borderTop: `1px solid ${COLORS.border}` }}>
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: COLORS.amber }}
            >
              <Zap size={12} color={COLORS.base} />
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "13px",
                color: COLORS.paper,
              }}
            >
              JOBPILOT
            </span>
          </div>
          <p
            className="text-xs leading-relaxed max-w-xs"
            style={{ color: COLORS.textDim2 }}
          >
            An AI-grounded job application tracker and resume tailor. Every AI
            suggestion is reviewed by you before it moves.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Code2 size={14} color={COLORS.textDim} />
            <MessageCircle size={14} color={COLORS.textDim} />
            <Users size={14} color={COLORS.textDim} />
          </div>
        </div>
        {FOOTER_GROUPS.map((group) => (
          <div key={group.title}>
            <div
              className="text-xs font-semibold mb-3"
              style={{ color: COLORS.paper, fontFamily: "monospace" }}
            >
              {group.title}
            </div>
            <div className="flex flex-col gap-2">
              {group.links.map((link) => (
                <button
                  key={link.k}
                  onClick={() => goTo(link.k)}
                  className="text-xs text-left"
                  style={{ color: COLORS.textDim2 }}
                >
                  {link.l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="max-w-6xl mx-auto px-5 pb-8 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: "20px" }}
      >
        <span
          className="text-xs"
          style={{ color: COLORS.textDim2, fontFamily: "monospace" }}
        >
          © 2026 JobPilot. Built by Sushanto Kumar.
        </span>
        <span className="text-xs" style={{ color: COLORS.textDim2 }}>
          Made in Bangladesh 🇧🇩
        </span>
      </div>
    </div>
  );
}

export function PublicFrame({
  page,
  children,
}: {
  page: PublicPage;
  children: ReactNode;
}) {
  const goTo = usePublicNavigation();
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: COLORS.base, fontFamily: "Inter, sans-serif" }}
    >
      <GlobalStyles />
      <NavBar page={page} goTo={goTo} />
      {children}
      <Footer goTo={goTo} />
    </div>
  );
}
export { ChevronRight, Eye, EyeOff, Lock, Mail, MapPin };
