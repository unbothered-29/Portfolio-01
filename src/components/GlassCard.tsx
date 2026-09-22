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
      "bg-white/[0.42] dark:bg-white/[0.07] border-white/[0.60] dark:border-white/[0.22] backdrop-blur-[24px] backdrop-saturate-[180%] shadow-[0_20px_60px_rgba(30,20,50,0.08),inset_0_1.5px_1px_rgba(255,255,255,0.7)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1.5px_1px_rgba(255,255,255,0.25)] text-[#34154E] dark:text-[#F5F3FA]",
    high:
      "bg-white/[0.55] dark:bg-white/[0.12] border-white/[0.75] dark:border-white/[0.30] backdrop-blur-[28px] backdrop-saturate-[200%] shadow-[0_24px_70px_rgba(30,20,50,0.10),inset_0_2px_1.5px_rgba(255,255,255,0.85)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.7),inset_0_2px_1.5px_rgba(255,255,255,0.35)] text-[#34154E] dark:text-[#F5F3FA]",
    subtle:
      "bg-white/[0.25] dark:bg-white/[0.05] border-white/[0.45] dark:border-white/[0.16] backdrop-blur-[18px] backdrop-saturate-[160%] shadow-[0_12px_40px_rgba(30,20,50,0.05),inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.18)] text-[#34154E] dark:text-[#F5F3FA]",
    dark:
      "bg-white/[0.08] dark:bg-white/[0.06] border-white/[0.30] text-white backdrop-blur-[24px] backdrop-saturate-[200%] shadow-[0_24px_70px_rgba(0,0,0,0.6),inset_0_1.5px_1px_rgba(255,255,255,0.5)]",
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
