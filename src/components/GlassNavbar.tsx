import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { DESIGNER_NAME } from "../data/portfolioData";
import { ThemeToggle } from "./ThemeToggle";

interface GlassNavbarProps {
  onNavigate: (sectionId: string) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function GlassNavbar({ onNavigate, isMenuOpen, onToggleMenu }: GlassNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-5 md:top-6 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      {/* Floating Liquid Glass Capsule */}
      <nav
        aria-label="Main Navigation Shell"
        className={cn(
          "group relative pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 md:gap-5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-400 ease-out overflow-hidden select-none font-sora",
          isScrolled
            ? "bg-white/[0.80] dark:bg-[#12101D]/[0.85] backdrop-blur-[34px] backdrop-saturate-[190%] border-[#D6CBFF] dark:border-white/20 shadow-[0_20px_50px_-10px_rgba(66,55,100,0.12),_0_6px_20px_rgba(24,15,46,0.05),_inset_0_1px_1.5px_0_rgba(255,255,255,0.98),_inset_0_-1px_2px_0_rgba(214,203,255,0.22)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),_inset_0_1px_1.5px_0_rgba(255,255,255,0.2),_inset_0_-1px_2px_0_rgba(139,92,246,0.3)]"
            : "bg-white/[0.65] dark:bg-[#141220]/[0.72] backdrop-blur-[30px] backdrop-saturate-[180%] border-[#D6CBFF]/70 dark:border-white/15 shadow-[0_16px_40px_-10px_rgba(66,55,100,0.08),_0_4px_16px_rgba(24,15,46,0.03),_inset_0_1px_1.5px_0_rgba(255,255,255,0.95),_inset_0_-1px_2px_0_rgba(214,203,255,0.20)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7),_inset_0_1px_1.5px_0_rgba(255,255,255,0.15),_inset_0_-1px_2px_0_rgba(139,92,246,0.22)]"
        )}
      >
        {/* Fluid Reflection Layer inside the Glass */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C4B5FD]/[0.12] dark:via-[#8B5CF6]/[0.15] to-[#D6CBFF]/[0.08] pointer-events-none"
        />

        {/* Moving Light / Reflection across the Navbar Glass on Hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/50 dark:via-white/15 to-transparent skew-x-[-20deg]"
        />

        {/* Brand Logo / Monogram */}
        <button
          id="navbar-brand-button"
          onClick={() => {
            if (isMenuOpen) onToggleMenu();
            onNavigate("top");
          }}
          className="relative z-10 font-lobster-two text-sm sm:text-[15.5px] font-normal tracking-wide text-[#34154E] dark:text-[#F5F3FA] hover:text-[#583C7E] dark:hover:text-[#C4B5FD] transition-colors select-none focus-visible:outline-none rounded-full cursor-pointer py-0.5"
        >
          {DESIGNER_NAME}
        </button>

        {/* Subtle Separator */}
        <span className="relative z-10 text-[#583C7E]/25 dark:text-white/20 text-xs select-none">
          |
        </span>

        {/* Theme Atmosphere Toggle */}
        <div className="relative z-10 flex items-center">
          <ThemeToggle />
        </div>

        {/* Subtle Separator */}
        <span className="relative z-10 text-[#583C7E]/25 dark:text-white/20 text-xs select-none">
          |
        </span>

        {/* 
          MINIMAL MENU TRIGGER BUTTON
          Keeps the portfolio understated and minimal when closed.
          Features a polished 150-250ms hover interaction.
          Morphs into close state when the menu is open.
        */}
        <button
          id="navbar-menu-trigger"
          onClick={onToggleMenu}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          className="group/trigger relative z-10 p-1.5 sm:p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[#34154E] dark:text-[#F5F3FA] hover:bg-[#34154E]/[0.06] dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none"
        >
          <div className="relative w-4 h-3.5 flex flex-col justify-between items-center overflow-hidden">
            {/* Top bar / diagonal line */}
            <span
              className={cn(
                "h-[1.75px] bg-current rounded-full transition-all duration-300 ease-out origin-center",
                isMenuOpen
                  ? "w-4 translate-y-[5.8px] rotate-45"
                  : "w-4 group-hover/trigger:w-3.5"
              )}
            />
            {/* Bottom bar / diagonal line */}
            <span
              className={cn(
                "h-[1.75px] bg-current rounded-full transition-all duration-300 ease-out origin-center",
                isMenuOpen
                  ? "w-4 -translate-y-[5.8px] -rotate-45"
                  : "w-3 group-hover/trigger:w-4"
              )}
            />
          </div>
        </button>
      </nav>
    </header>
  );
}
