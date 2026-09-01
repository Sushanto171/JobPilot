import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(function Input({ className = "", ...props }, ref) {
  return <input ref={ref} className={`rounded-md border border-jp-border bg-transparent px-3 py-2 text-sm text-jp-paper outline-none focus:border-jp-amber ${className}`} {...props} />;
});