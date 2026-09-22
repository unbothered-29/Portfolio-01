import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "obsidian";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group/toggle relative inline-flex items-center w-[46px] h-[24px] p-[2px] rounded-full transition-all duration-300 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/50",
        isDark
          ? "bg-[#1A1626]/90 border border-white/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5),_0_2px_8px_rgba(0,0,0,0.3)]"
          : "bg-white/70 border border-white/80 shadow-[inset_0_1px_2px_rgba(109,61,245,0.08),_0_2px_8px_rgba(109,61,245,0.06)]",
        className
      )}
    >
      {/* Dynamic Glow aura on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-300 pointer-events-none",
          isDark
            ? "bg-gradient-to-r from-[#8B5CF6]/20 via-[#6366F1]/15 to-[#8B5CF6]/20"
            : "bg-gradient-to-r from-[#B9A7FF]/25 via-[#E4C7FF]/20 to-[#C8D5FF]/25"
        )}
      />

      {/* Sliding Glass Thumb */}
      <div
        className={cn(
          "relative z-10 w-[20px] h-[20px] rounded-full flex items-center justify-center transform transition-transform duration-300 ease-out shadow-[0_2px_6px_rgba(0,0,0,0.18)]",
          isDark
            ? "translate-x-[20px] bg-[#2A233C] text-[#C4B5FD] border border-white/20"
            : "translate-x-0 bg-white text-[#8B5CF6] border border-white/90 shadow-[0_1px_4px_rgba(109,61,245,0.18)]"
        )}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-[#C4B5FD] transition-transform duration-300 group-hover/toggle:rotate-12" />
        ) : (
          <Sun className="w-3 h-3 text-[#8B5CF6] transition-transform duration-300 group-hover/toggle:rotate-45" />
        )}
      </div>
    </button>
  );
}

