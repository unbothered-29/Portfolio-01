import React from "react";
import { useTheme } from "../context/ThemeContext";

export function HeroAtmosphere() {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 transition-colors duration-500 ${
        isDark ? "bg-[#09080E]" : "bg-[#FAFAFA]"
      }`}
    >
      {/* Seamless bottom blend into the next section */}
      <div
        className={`absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b from-transparent pointer-events-none transition-colors duration-500 ${
          isDark ? "to-[#09080E]" : "to-[#FAFAFA]"
        }`}
      />
    </div>
  );
}
