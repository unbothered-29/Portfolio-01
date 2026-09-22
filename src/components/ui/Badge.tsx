import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "glass" | "dark" | "coral" | "lavender" | "subtle";
}

export function Badge({ className, variant = "glass", children, ...props }: BadgeProps) {
  const base =
    "inline-flex items-center justify-center font-medium tracking-[0.12em] uppercase rounded-full text-[11px] px-3.5 py-1 select-none transition-colors";

  const variants = {
    glass:
      "bg-white/55 backdrop-blur-md text-[#18171C] border border-white/70 shadow-[0_4px_16px_rgba(30,20,50,0.04)]",
    dark:
      "bg-[#14121C]/85 backdrop-blur-md text-white border border-white/10",
    coral:
      "bg-[#FF6B81]/15 text-[#E03A53] border border-[#FF6B81]/25",
    lavender:
      "bg-[#A98BFF]/15 text-[#7352D4] border border-[#A98BFF]/30",
    subtle:
      "bg-white/40 text-[#77747E] border border-white/60",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
