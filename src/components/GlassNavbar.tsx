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
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      {/* Hidden SVG Definitions for Precision S-Curve Clip-Paths */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="navbar-left-ear-clip" clipPathUnits="userSpaceOnUse">
            <path d="M 0 0 C 32 0, 36 52, 68 52 L 68 0 Z" />
          </clipPath>
          <clipPath id="navbar-right-ear-clip" clipPathUnits="userSpaceOnUse">
            <path d="M 0 52 C 32 52, 36 0, 68 0 L 0 0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Hanging Inverted Notch / Shelf Shell with Seamless Liquid Glass Shoulders */}
      <div className="relative pointer-events-auto filter drop-shadow-[0_12px_30px_rgba(24,15,46,0.10)] dark:drop-shadow-[0_14px_36px_rgba(0,0,0,0.65)]">
        {/* Left Liquid Glass Shoulder (S-Curve, with matching backdrop blur) */}
        <div
          aria-hidden="true"
          style={{ clipPath: "url(#navbar-left-ear-clip)" }}
          className={cn(
            "absolute top-0 right-[calc(100%-0.5px)] w-[68px] h-[52px] pointer-events-none select-none z-10 transition-colors duration-200",
            "backdrop-blur-[24px] backdrop-saturate-[180%]",
            isScrolled
              ? "bg-white/85 dark:bg-[#12101D]/85"
              : "bg-white/75 dark:bg-[#12101D]/75"
          )}
        />

        {/* Right Liquid Glass Shoulder (S-Curve, with matching backdrop blur) */}
        <div
          aria-hidden="true"
          style={{ clipPath: "url(#navbar-right-ear-clip)" }}
          className={cn(
            "absolute top-0 left-[calc(100%-0.5px)] w-[68px] h-[52px] pointer-events-none select-none z-10 transition-colors duration-200",
            "backdrop-blur-[24px] backdrop-saturate-[180%]",
            isScrolled
              ? "bg-white/85 dark:bg-[#12101D]/85"
              : "bg-white/75 dark:bg-[#12101D]/75"
          )}
        />

        {/* Central Hanging Notch Body (Frosted Translucent Liquid Glass) */}
        <nav
          aria-label="Main Navigation Shell"
          className={cn(
            "group relative flex items-center justify-between gap-3.5 sm:gap-4 md:gap-5 px-4 sm:px-6 h-[52px] border-0 rounded-none transition-all duration-200 ease-out select-none font-sora",
            "backdrop-blur-[24px] backdrop-saturate-[180%]",
            isScrolled
              ? "bg-white/85 dark:bg-[#12101D]/85"
              : "bg-white/75 dark:bg-[#12101D]/75"
          )}
        >
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
      </div>
    </header>
  );
}
