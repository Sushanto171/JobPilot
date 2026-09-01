"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

export function Sheet({
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

export function SheetContent({
  side = "right",
  className = "",
  children,
  onOpenChange,
}: {
  side?: "right";
  className?: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  const sideClasses = side === "right" ? "justify-end" : "justify-start";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex ${sideClasses}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />

      <motion.aside
        initial={{ x: side === "right" ? 420 : -420 }}
        animate={{ x: 0 }}
        exit={{ x: side === "right" ? 420 : -420 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className={`relative h-full w-full max-w-sm overflow-y-auto border-l border-jp-border bg-jp-surface shadow-2xl ${className}`}
      >
        {children}
      </motion.aside>
    </motion.div>
  );
}
