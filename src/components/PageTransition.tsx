import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePageTransition } from "../context/PageTransitionContext";
import { useTheme } from "../context/ThemeContext";

// Exact 5-column vertical shutter count
const COLUMNS = [0, 1, 2, 3, 4];

export function PageTransition() {
  const { isTransitioning, phase, title, subtitle, category } = usePageTransition();
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  return (
    <div
      aria-hidden={!isTransitioning}
      className={`fixed inset-0 z-[999] overflow-hidden select-none ${
        isTransitioning ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <div className="relative w-full h-full">
            {/* 
              LAYER 1: PRE-RUNNER WAVE CURTAIN (Soft Lavender)
              Sweeps down first to create multi-tone depth before the main columns arrive
            */}
            <motion.div
              key="wave-lavender"
              initial={{ y: "-100%" }}
              animate={
                phase === "entering" || phase === "peak"
                  ? { y: "0%" }
                  : { y: "100%" }
              }
              exit={{ y: "100%" }}
              transition={{
                duration: 0.52,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 z-10 bg-[#B9A7FF]/90 dark:bg-[#7C3AED]/85 backdrop-blur-md transform-gpu will-change-transform"
            />

            {/* 
              LAYER 2: SECOND RUNNER WAVE CURTAIN (Electric Purple / Midnight Violet)
              Slightly behind Layer 1 to create dimensional chromatic layering
            */}
            <motion.div
              key="wave-violet"
              initial={{ y: "-100%" }}
              animate={
                phase === "entering" || phase === "peak"
                  ? { y: "0%" }
                  : { y: "100%" }
              }
              exit={{ y: "100%" }}
              transition={{
                duration: 0.55,
                delay: 0.04,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 z-20 bg-[#6D3DF5]/95 dark:bg-[#1E1433]/95 transform-gpu will-change-transform"
            />

            {/* 
              LAYER 3: 5 STAGGERED VERTICAL SHUTTER COLUMNS
              The primary architectural columns in our canvas colors (#F8F7FC light, #09080E dark)
            */}
            <div className="absolute inset-0 z-30 flex w-full h-full pointer-events-none">
              {COLUMNS.map((colIdx) => {
                // Stagger calculations
                const enterDelay = 0.08 + colIdx * 0.04;
                const exitDelay = colIdx * 0.035;

                return (
                  <div
                    key={`column-${colIdx}`}
                    className="relative h-full w-[20%] overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: "-100%" }}
                      animate={
                        phase === "entering" || phase === "peak"
                          ? { y: "0%" }
                          : { y: "100%" }
                      }
                      transition={{
                        duration: 0.5,
                        delay:
                          phase === "entering" || phase === "peak"
                            ? enterDelay
                            : exitDelay,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                      className={`w-full h-full transform-gpu will-change-transform ${
                        isDark
                          ? "bg-[#09080E] border-r border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
                          : "bg-[#F8F7FC] border-r border-[#B9A7FF]/35 shadow-[0_12px_40px_rgba(109,61,245,0.08)]"
                      }`}
                    >
                      {/* Subtle Glass Surface Glow on column */}
                      <div
                        className="absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-[#B9A7FF]/15 dark:from-white/5 dark:to-[#8B5CF6]/10"
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* 
              LAYER 4: EDITORIAL TYPOGRAPHY & FLOATING STAR STAGE
              Appears cleanly at the peak veil, then dissolves gracefully as columns exit
            */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
              <AnimatePresence mode="wait">
                {(phase === "peak" || phase === "entering") && (
                  <motion.div
                    key="transition-content"
                    initial={{ opacity: 0, y: 22, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.02 }}
                    transition={{
                      duration: 0.38,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex flex-col items-center max-w-xl mx-auto"
                  >
                    {/* Atmospheric Ambient Glow behind badge */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-16 inset-x-0 w-72 h-72 mx-auto rounded-full bg-gradient-to-r from-[#6D3DF5]/30 via-[#B9A7FF]/40 to-[#C8D5FF]/20 dark:from-[#8B5CF6]/35 dark:via-[#6D28D9]/40 dark:to-transparent blur-3xl pointer-events-none -z-10"
                    />

                    {/* Glowing Star Icon / Badge */}
                    <div className="relative mb-5 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/80 dark:border-white/20 shadow-[0_8px_30px_rgba(109,61,245,0.18)] dark:shadow-[0_8px_30px_rgba(139,92,246,0.3)]">
                        <img
                          src="/star.svg"
                          alt=""
                          className="w-7 h-7 object-contain animate-spin transform-gpu"
                          style={{ animationDuration: "14s" }}
                        />
                      </div>
                    </div>

                    {/* Category / Scope Pill */}
                    {category && (
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.24em] font-semibold text-[#6D3DF5] dark:text-[#C4B5FD] bg-[#B9A7FF]/20 dark:bg-[#8B5CF6]/20 border border-[#B9A7FF]/40 dark:border-[#8B5CF6]/40 mb-3 shadow-sm">
                        ✦ {category} ✦
                      </span>
                    )}

                    {/* Main Headline Title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-helvetica tracking-tight text-[#111015] dark:text-[#F5F3FA] leading-[1.08]">
                      {title}
                    </h2>

                    {/* Subtitle / Narrative */}
                    {subtitle && (
                      <p className="mt-2 text-xs sm:text-sm font-mono tracking-wider text-[#6E6978] dark:text-[#9E98AB] uppercase max-w-md">
                        {subtitle}
                      </p>
                    )}

                    {/* Progress Hairline Line Animation */}
                    <div className="mt-7 w-44 sm:w-56 h-[2px] bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 0.45,
                          ease: "easeInOut",
                        }}
                        className="w-full h-full origin-left bg-gradient-to-r from-[#6D3DF5] via-[#8B5CF6] to-[#B9A7FF] dark:from-[#8B5CF6] dark:via-[#A78BFA] dark:to-[#DDD6FE]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
