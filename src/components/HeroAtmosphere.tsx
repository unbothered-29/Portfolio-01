import React from "react";
import { useTheme } from "../context/ThemeContext";

export function HeroAtmosphere() {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-0"
    >
      {/* Soft atmospheric gradient base that blends smoothly with the page */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-[#09080E] via-[#0D0A16] to-[#09080E]"
            : "bg-gradient-to-b from-[#FAFAFA] via-[#F8F5FF]/70 to-[#FAFAFA]"
        }`}
      />
    </div>
  );
}
