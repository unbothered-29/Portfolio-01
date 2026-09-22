import React from "react";
import { cn } from "../lib/utils";

import { useTheme } from "../context/ThemeContext";

interface BlurOrbProps {
  variant?: "coral" | "lavender" | "softBlue" | "custom";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

export function BlurOrb({
  variant = "lavender",
  className,
  size = "lg",
  color,
}: BlurOrbProps) {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  const sizeClasses = {
    sm: "w-[240px] h-[240px] blur-[80px]",
    md: "w-[360px] h-[360px] blur-[110px]",
    lg: "w-[520px] h-[520px] blur-[140px]",
    xl: "w-[680px] h-[680px] blur-[160px]",
  };

  const variantGradients = {
    coral: isDark ? "bg-[#FF6B81]/15" : "bg-[#FF6B81]/18",
    lavender: isDark ? "bg-[#8B5CF6]/18" : "bg-[#A98BFF]/20",
    softBlue: isDark ? "bg-[#6366F1]/16" : "bg-[#8FB8FF]/20",
    custom: color || (isDark ? "bg-white/10" : "bg-white/40"),
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full select-none transform-gpu will-change-transform transition-all duration-700",
        isDark ? "mix-blend-screen opacity-75" : "mix-blend-multiply",
        sizeClasses[size],
        variantGradients[variant],
        className
      )}
    />
  );
}

export function AtmosphericBackground() {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none transition-opacity duration-700">
      {/* Mid-page Work Section Soft Glow - only below 100vh */}
      <div
        className={cn(
          "absolute top-[130vh] -left-36 w-[550px] h-[550px] rounded-full blur-[160px] transform-gpu transition-all duration-700",
          isDark ? "bg-[#7C3AED]/12" : "bg-[#B9A7FF]/10"
        )}
      />

      {/* About/Capabilities Soft Blue/Indigo Glow */}
      <div
        className={cn(
          "absolute top-[230vh] -right-28 w-[580px] h-[580px] rounded-full blur-[160px] transform-gpu transition-all duration-700",
          isDark ? "bg-[#4F46E5]/10" : "bg-[#C8D5FF]/12"
        )}
      />

      {/* Footer Subtle Violet Glow */}
      <div
        className={cn(
          "absolute bottom-20 left-[25%] w-[600px] h-[400px] rounded-full blur-[170px] transform-gpu transition-all duration-700",
          isDark ? "bg-[#8B5CF6]/10" : "bg-[#B9A7FF]/8"
        )}
      />
    </div>
  );
}
