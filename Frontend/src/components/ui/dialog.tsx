"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return <AnimatePresence>{open ? children : null}</AnimatePresence>;
}

export function DialogContent({
  className = "",
  children,
  onOpenChange,
}: {
  className?: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60"
        onClick={() => onOpenChange?.(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className={`relative z-10 w-full max-w-2xl rounded-xl border border-jp-border bg-jp-surface shadow-[0_18px_50px_rgba(0,0,0,0.45)] ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-mono text-xl font-bold text-jp-paper ${className}`}>{children}</h2>
  );
}

export function DialogDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`mt-1 text-sm text-jp-text-dim ${className}`}>{children}</p>;
}
