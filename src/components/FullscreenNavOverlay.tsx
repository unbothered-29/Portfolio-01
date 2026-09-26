import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { DESIGNER_NAME, SOCIAL_LINKS } from "../data/portfolioData";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  id: string;
  label: string;
  number: string;
  subtitle: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "work", label: "WORK", number: "01", subtitle: "Selected Projects & Systems" },
  { id: "stack", label: "STACK", number: "02", subtitle: "Architecture & Capabilities" },
  { id: "experience", label: "EXPERIENCE", number: "03", subtitle: "Career Timeline & Growth" },
  { id: "about", label: "ABOUT", number: "04", subtitle: "Philosophy & Background" },
  { id: "contact", label: "CONTACT", number: "05", subtitle: "Inquiries & Collaboration" },
  { id: "resume", label: "RESUME", number: "06", subtitle: "Curriculum Vitae · Download PDF" },
];

interface FullscreenNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onContactClick?: () => void;
}

// Sophisticated custom easing curve for architectural, controlled motion
const PANEL_EASE = [0.76, 0, 0.24, 1] as const;
const TEXT_EASE = [0.16, 1, 0.3, 1] as const;

export function FullscreenNavOverlay({
  isOpen,
  onClose,
  onNavigate,
  onContactClick,
}: FullscreenNavOverlayProps) {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Prevent background scrolling and preserve layout when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleItemClick = useCallback(
    (id: string) => {
      onClose();
      // Delay navigation slightly so the closing animation initiates cleanly
      setTimeout(() => {
        if (id === "contact") {
          window.location.href =
            "mailto:chauhanjessicaa27@gmail.com?subject=Hello%20Jessicaa%20—%20Inquiry";
        } else {
          onNavigate(id);
        }
      }, 180);
    },
    [onClose, onNavigate]
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          id="fullscreen-nav-root"
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Navigation Menu"
        >
          {/* Subtle Ambient Dimming Backdrop */}
          <motion.div
            id="nav-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
          />

          {/* 
            EXPANDING GEOMETRIC NAVIGATION PANEL
            Expands down from the top into the viewport with rounded corners,
            sitting framed within the window with generous margin like in the reference frames.
          */}
          <motion.div
            id="fullscreen-nav-panel"
            initial={{
              scaleY: 0,
              opacity: 0.95,
              transformOrigin: "top center",
            }}
            animate={{
              scaleY: 1,
              opacity: 1,
              transformOrigin: "top center",
            }}
            exit={{
              scaleY: 0,
              opacity: 0.98,
              transformOrigin: "top center",
            }}
            transition={{
              duration: 0.48,
              ease: PANEL_EASE,
            }}
            className={`relative w-[calc(100vw-16px)] sm:w-[calc(100vw-28px)] md:w-[calc(100vw-40px)] h-[calc(100dvh-16px)] sm:h-[calc(100dvh-28px)] md:h-[calc(100dvh-40px)] max-w-[1580px] rounded-[24px] sm:rounded-[32px] md:rounded-[38px] overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 border shadow-[0_30px_90px_rgba(24,15,46,0.18)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-colors duration-300 ${
              isDark
                ? "bg-[#0E0C17] text-[#F5F3FA] border-white/[0.12]"
                : "bg-[#FAFAFA] text-[#34154E] border-[#D6CBFF]"
            }`}
          >
            {/* 
              SUBTLE 8-COLUMN VERTICAL GRID
              Faithfully reflects the faint vertical column dividers spanning the panel 
              visible across Reference Frames 2, 3, 4, 5, 6, 7!
            */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid grid-cols-8 pointer-events-none z-0"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-full border-r last:border-r-0 ${
                    isDark ? "border-white/[0.035]" : "border-[#D6CBFF]/30"
                  }`}
                />
              ))}
            </div>

            {/* TOP HEADER BAR (Inside Panel) */}
            <div className="relative z-10 w-full flex items-center justify-between font-sora">
              {/* Brand & Monogram */}
              <div className="flex items-center gap-3">
                <button
                  id="nav-brand-title"
                  onClick={() => {
                    onClose();
                    onNavigate("top");
                  }}
                  className="group flex flex-col items-start text-left cursor-pointer focus-visible:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase transition-colors group-hover:text-[#583C7E] dark:group-hover:text-[#C4B5FD]">
                    {DESIGNER_NAME.toUpperCase()}
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs tracking-wider uppercase font-sora mt-0.5 ${
                      isDark ? "text-[#9E98AB]" : "text-[#583C7E]/75"
                    }`}
                  >
                    01 / Mumbai, IN · Portfolio
                  </span>
                </button>
              </div>

              {/* Right Controls: Theme Toggle + Close Button */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:block">
                  <ThemeToggle />
                </div>

                <button
                  id="nav-close-trigger"
                  onClick={onClose}
                  aria-label="Close navigation"
                  className={`group p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none ${
                    isDark
                      ? "bg-white/[0.06] border-white/15 text-[#F5F3FA] hover:bg-white/[0.14] active:scale-95"
                      : "bg-[#FAFAFA] border-[#D6CBFF] text-[#34154E] hover:bg-[#34154E]/[0.05] active:scale-95"
                  }`}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2] transition-transform duration-200 group-hover:rotate-90" />
                </button>
              </div>
            </div>

            {/* 
              CENTER NAVIGATION TYPOGRAPHY
              Arranged vertically around the center of the viewport,
              with smooth editorial entrance and pristine visibility!
            */}
            <nav
              aria-label="Fullscreen Navigation Links"
              className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-1 sm:py-2"
            >
              <ul className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5 list-none p-0 m-0 w-full max-w-3xl">
                {NAV_ITEMS.map((item, index) => {
                  const isHovered = hoveredIndex === index;
                  const isAnyHovered = hoveredIndex !== null;
                  const isDimmed = isAnyHovered && !isHovered;

                  return (
                    <li key={item.id} className="relative w-full flex justify-center">
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: -25,
                          opacity: 0,
                          transition: {
                            duration: 0.2,
                            delay: index * 0.02,
                            ease: [0.76, 0, 0.24, 1],
                          },
                        }}
                        transition={{
                          duration: 0.48,
                          delay: 0.18 + index * 0.05, // Fast, sophisticated stagger
                          ease: TEXT_EASE,
                        }}
                        className="w-full flex justify-center"
                      >
                        {item.id === "resume" ? (
                          <a
                            id={`nav-link-${item.id}`}
                            href="/Jessicaa_Chauhan_Resume.pdf"
                            download="Jessicaa_Chauhan_Resume.pdf"
                            title="click to download"
                            onClick={() => onClose()}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onFocus={() => setHoveredIndex(index)}
                            onBlur={() => setHoveredIndex(null)}
                            className="group relative flex items-center justify-center px-4 sm:px-8 py-0.5 sm:py-1 cursor-pointer select-none focus-visible:outline-none"
                          >
                            {/* Subtle Dashed Editorial Hairline Above */}
                            {isHovered && (
                              <motion.div
                                layoutId="nav-hover-hairline-top"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`absolute -top-0.5 sm:-top-1 inset-x-2 border-t border-dashed pointer-events-none ${
                                  isDark ? "border-[#A78BFA]/70" : "border-[#C4B5FD]"
                                }`}
                              />
                            )}

                            {/* Floating Tooltip Pill: 'click to download' */}
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                transition={{ duration: 0.18 }}
                                className="absolute -top-7 sm:-top-8 px-3 py-0.5 rounded-full text-[10.5px] sm:text-[11.5px] font-sora font-medium tracking-wide bg-[#34154E] text-white dark:bg-[#C4B5FD] dark:text-[#180F2E] shadow-[0_4px_16px_rgba(0,0,0,0.22)] flex items-center gap-1.5 pointer-events-none whitespace-nowrap z-30"
                              >
                                <span>click to download</span>
                                <span className="text-[10px]">⤓</span>
                              </motion.div>
                            )}

                            {/* Full, Unclipped High-End Fraunces Typography */}
                            <span
                              className={`block text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold uppercase tracking-[-0.02em] font-fraunces leading-[1.1] transition-all duration-200 ease-out ${
                                isHovered
                                  ? "text-[#583C7E] dark:text-[#C4B5FD] scale-[1.02]"
                                  : isDimmed
                                  ? isDark
                                    ? "opacity-25 text-current"
                                    : "opacity-30 text-current"
                                  : "opacity-100 text-current"
                              }`}
                            >
                              {item.label}
                            </span>

                            {/* Subtle Dashed Editorial Hairline Below */}
                            {isHovered && (
                              <motion.div
                                layoutId="nav-hover-hairline-bottom"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`absolute -bottom-0.5 sm:-bottom-1 inset-x-2 border-b border-dashed pointer-events-none ${
                                  isDark ? "border-[#A78BFA]/70" : "border-[#C4B5FD]"
                                }`}
                              />
                            )}
                          </a>
                        ) : item.id === "contact" ? (
                          <a
                            id={`nav-link-${item.id}`}
                            href="mailto:chauhanjessicaa27@gmail.com?subject=Hello%20Jessicaa%20—%20Inquiry"
                            onClick={() => onClose()}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onFocus={() => setHoveredIndex(index)}
                            onBlur={() => setHoveredIndex(null)}
                            className="group relative flex items-center justify-center px-4 sm:px-8 py-0.5 sm:py-1 cursor-pointer select-none focus-visible:outline-none"
                          >
                            {/* Subtle Dashed Editorial Hairline Above */}
                            {isHovered && (
                              <motion.div
                                layoutId="nav-hover-hairline-top"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`absolute -top-0.5 sm:-top-1 inset-x-2 border-t border-dashed pointer-events-none ${
                                  isDark ? "border-[#A78BFA]/70" : "border-[#C4B5FD]"
                                }`}
                              />
                            )}

                            {/* Full, Unclipped High-End Fraunces Typography */}
                            <span
                              className={`block text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold uppercase tracking-[-0.02em] font-fraunces leading-[1.1] transition-all duration-200 ease-out ${
                                isHovered
                                  ? "text-[#583C7E] dark:text-[#C4B5FD] scale-[1.02]"
                                  : isDimmed
                                  ? isDark
                                    ? "opacity-25 text-current"
                                    : "opacity-30 text-current"
                                  : "opacity-100 text-current"
                              }`}
                            >
                              {item.label}
                            </span>

                            {/* Subtle Dashed Editorial Hairline Below */}
                            {isHovered && (
                              <motion.div
                                layoutId="nav-hover-hairline-bottom"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`absolute -bottom-0.5 sm:-bottom-1 inset-x-2 border-b border-dashed pointer-events-none ${
                                  isDark ? "border-[#A78BFA]/70" : "border-[#C4B5FD]"
                                }`}
                              />
                            )}
                          </a>
                        ) : (
                          <button
                            id={`nav-link-${item.id}`}
                            onClick={() => handleItemClick(item.id)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onFocus={() => setHoveredIndex(index)}
                            onBlur={() => setHoveredIndex(null)}
                            className="group relative flex items-center justify-center px-4 sm:px-8 py-0.5 sm:py-1 cursor-pointer select-none focus-visible:outline-none"
                          >
                            {/* Subtle Dashed Editorial Hairline Above (as in Screenshot 6) */}
                            {isHovered && (
                              <motion.div
                                layoutId="nav-hover-hairline-top"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`absolute -top-0.5 sm:-top-1 inset-x-2 border-t border-dashed pointer-events-none ${
                                  isDark ? "border-[#A78BFA]/70" : "border-[#C4B5FD]"
                                }`}
                              />
                            )}

                            {/* Full, Unclipped High-End Fraunces Typography */}
                            <span
                              className={`block text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold uppercase tracking-[-0.02em] font-fraunces leading-[1.1] transition-all duration-200 ease-out ${
                                isHovered
                                  ? "text-[#583C7E] dark:text-[#C4B5FD] scale-[1.02]"
                                  : isDimmed
                                  ? isDark
                                    ? "opacity-25 text-current"
                                    : "opacity-30 text-current"
                                  : "opacity-100 text-current"
                              }`}
                            >
                              {item.label}
                            </span>

                            {/* Subtle Dashed Editorial Hairline Below (as in Screenshot 6) */}
                            {isHovered && (
                              <motion.div
                                layoutId="nav-hover-hairline-bottom"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`absolute -bottom-0.5 sm:-bottom-1 inset-x-2 border-b border-dashed pointer-events-none ${
                                  isDark ? "border-[#A78BFA]/70" : "border-[#C4B5FD]"
                                }`}
                              />
                            )}
                          </button>
                        )}
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* 
              BOTTOM METADATA FOOTER (Screenshots 3, 4, 5, 6)
              Minimalist horizontal metadata row matching the reference frames!
            */}
            <motion.div
              id="nav-footer-meta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
              transition={{ delay: 0.44, duration: 0.4, ease: "easeOut" }}
              className={`relative z-10 w-full pt-3 sm:pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs sm:text-[13px] tracking-wide font-sora transition-colors ${
                isDark
                  ? "border-white/[0.08] text-[#9E98AB]"
                  : "border-[#D6CBFF] text-[#583C7E]/80"
              }`}
            >
              {/* Left Social Links */}
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#8B5CF6] dark:hover:text-[#A78BFA] transition-colors inline-flex items-center gap-1"
                >
                  Instagram <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#8B5CF6] dark:hover:text-[#A78BFA] transition-colors inline-flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>

              {/* Center / Right Email Direct */}
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${SOCIAL_LINKS[0]?.label || "chauhanjessicaa27@gmail.com"}`}
                  className="hover:text-[#8B5CF6] dark:hover:text-[#A78BFA] transition-colors"
                >
                  {SOCIAL_LINKS[0]?.label || "chauhanjessicaa27@gmail.com"}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
