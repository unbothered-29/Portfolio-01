import React from "react";
import { cn } from "../lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  intensity?: "standard" | "high" | "subtle" | "dark";
}

export function GlassCard({
  className,
  interactive = false,
  intensity = "standard",
  children,
  ...props
}: GlassCardProps) {
  const intensityStyles = {
    standard:
      "bg-[rgba(255,255,255,0.52)] dark:bg-[rgba(20,18,30,0.68)] border-[rgba(255,255,255,0.68)] dark:border-[rgba(255,255,255,0.12)] backdrop-blur-[24px] shadow-[0_20px_60px_rgba(30,20,50,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-[#111015] dark:text-[#F5F3FA]",
    high:
      "bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(26,22,38,0.80)] border-[rgba(255,255,255,0.85)] dark:border-[rgba(255,255,255,0.18)] backdrop-blur-[28px] shadow-[0_24px_70px_rgba(30,20,50,0.10)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.7)] text-[#111015] dark:text-[#F5F3FA]",
    subtle:
      "bg-[rgba(255,255,255,0.38)] dark:bg-[rgba(16,14,24,0.55)] border-[rgba(255,255,255,0.55)] dark:border-[rgba(255,255,255,0.08)] backdrop-blur-[18px] shadow-[0_12px_40px_rgba(30,20,50,0.05)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] text-[#111015] dark:text-[#F5F3FA]",
    dark:
      "bg-[rgba(16,14,24,0.88)] border-[rgba(255,255,255,0.14)] text-white backdrop-blur-[24px] shadow-[0_24px_70px_rgba(0,0,0,0.6)]",
  };

  return (
    <div
      className={cn(
        "rounded-[28px] border transition-all duration-300 ease-out",
        intensityStyles[intensity],
        interactive &&
          "hover:-translate-y-1 hover:border-white/90 dark:hover:border-white/30 hover:shadow-[0_28px_75px_rgba(30,20,50,0.12)] dark:hover:shadow-[0_28px_75px_rgba(0,0,0,0.8)] cursor-pointer active:translate-y-0 active:scale-[0.995]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
