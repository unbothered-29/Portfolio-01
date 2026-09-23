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
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group/toggle relative p-1.5 sm:p-2 min-w-[34px] min-h-[34px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-none",
        "text-[#34154E] dark:text-[#F5F3FA] hover:bg-[#34154E]/[0.06] dark:hover:bg-white/10 active:scale-95",
        className
      )}
    >
      <div className="relative w-4 h-4 sm:w-[18px] sm:h-[18px] flex items-center justify-center">
        {/* Sun Icon (Visible in Dark Mode to switch to Light) */}
        <Sun
          className={cn(
            "w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#F5F3FA] group-hover/toggle:text-[#FDE047] transition-all duration-300 stroke-[1.8] absolute",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />

        {/* Moon Icon (Visible in Light Mode to switch to Dark) */}
        <Moon
          className={cn(
            "w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#34154E] group-hover/toggle:text-[#6D3DF5] transition-all duration-300 stroke-[1.8] absolute",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
      </div>
    </button>
  );
}


