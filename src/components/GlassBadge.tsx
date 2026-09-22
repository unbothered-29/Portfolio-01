import React from "react";
import { cn } from "../lib/utils";

export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  interactive?: boolean;
  dot?: boolean;
  dotColor?: string;
  size?: "sm" | "md" | "lg";
}

export function GlassBadge({
  className,
  active = false,
  interactive = false,
  dot = false,
  dotColor = "bg-emerald-500",
  size = "md",
  children,
  ...props
}: GlassBadgeProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-[10px] tracking-[0.12em]",
    md: "px-4 py-1.5 text-[11px] tracking-[0.12em]",
    lg: "px-5 py-2 text-xs tracking-[0.10em]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium uppercase select-none transition-all duration-300 ease-out",
        "bg-white/58 dark:bg-white/[0.08] backdrop-blur-[20px] border border-white/75 dark:border-white/15 text-[#18171C] dark:text-[#F5F3FA] shadow-[0_4px_20px_rgba(30,20,50,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
        active &&
          "bg-white/85 dark:bg-white/[0.18] border-white dark:border-white/30 text-[#18171C] dark:text-white shadow-[0_8px_25px_rgba(30,20,50,0.08)]",
        interactive &&
          "hover:bg-white/80 dark:hover:bg-white/[0.14] hover:border-white dark:hover:border-white/25 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(30,20,50,0.08)] cursor-pointer active:translate-y-0",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0 animate-pulse",
            dotColor
          )}
        />
      )}
      {children}
    </span>
  );
}
