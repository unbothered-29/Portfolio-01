import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { ContactSection } from "./ContactSection";
import { WavingGirlCharacter } from "./WavingGirlCharacter";
import { CelestialOrb } from "./CelestialOrb";

export type WindowColor = "blue" | "green" | "yellow" | "red";

export interface InteractiveWindowData {
  id: string;
  floor: number; // 0 to 3 (0 is top floor, 3 is ground floor)
  col: number; // 0 to 3 (4 columns)
  color: WindowColor;
  kicker: string;
  title: string;
  note: string;
}

export const INTERACTIVE_WINDOWS: InteractiveWindowData[] = [
  {
    id: "window-blue",
    floor: 0, // Row 1 (Top floor), Col 1 (2nd from left)
    col: 1,
    color: "blue",
    kicker: "01 · FRONTEND ARCHITECTURE",
    title: "Interface Engineering",
    note: "Crafting fluid, physics-grounded interactions, responsive layouts, and 60fps systems in React 19 & TypeScript.",
  },
  {
    id: "window-green",
    floor: 1, // Row 2, Col 3 (4th from left)
    col: 3,
    color: "green",
    kicker: "02 · SYSTEMS & LEADERSHIP",
    title: "Executive Operations",
    note: "Directed operations for 30+ team members at RGIT FE-SAHYOG; crafted brand narratives for Roamevo.",
  },
  {
    id: "window-yellow",
    floor: 2, // Row 3, Col 0 (1st from left)
    col: 0,
    color: "yellow",
    kicker: "03 · CAMPUS PATHFINDING",
    title: "To The Exact Chair",
    note: "“Maps ends at the gate — we take you to the chair.” Offline-first A* graph pathfinding down to individual desks.",
  },
  {
    id: "window-red",
    floor: 3, // Row 4 (Ground floor), Col 2 (3rd from left)
    col: 2,
    color: "red",
    kicker: "04 · SPATIAL OBSERVER",
    title: "Beyond The Screen",
    note: "Exploring how natural illumination, spatial geometry, and typography interact across physical architecture.",
  },
];

export interface WindowColorThemeConfig {
  wallBackground: string;
  beamGradient: string;
  lampBulb: string;
  lampGlow: string;
  railColor: string;
  kickerColor: string;
  titleColor: string;
  noteColor: string;
  borderActive: string;
  windowGlow: string;
  sillGlow: string;
  badgeDot: string;
  textCardBg: string;
  soffitGradient: string;
}

export interface WindowColorConfig {
  name: string;
  dark: WindowColorThemeConfig;
  light: WindowColorThemeConfig;
}

export const COLOR_CONFIGS: Record<WindowColor, WindowColorConfig> = {
  blue: {
    name: "Cerulean Blue",
    dark: {
      wallBackground: "#07233B",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(224, 242, 254, 0.98) 0%, rgba(56, 189, 248, 0.92) 24%, rgba(14, 165, 233, 0.85) 52%, rgba(2, 132, 199, 0.72) 78%, rgba(8, 47, 73, 0.95) 100%)",
      lampBulb: "#FFFFFF",
      lampGlow: "rgba(56, 189, 248, 0.95)",
      railColor: "#0C4A6E",
      kickerColor: "#7DD3FC",
      titleColor: "#FFFFFF",
      noteColor: "rgba(255, 255, 255, 0.95)",
      borderActive: "rgba(56, 189, 248, 0.85)",
      windowGlow: "0 0 35px 8px rgba(56, 189, 248, 0.45)",
      sillGlow: "#0284C7",
      badgeDot: "#38BDF8",
      textCardBg: "bg-gradient-to-t from-black/85 via-black/45 to-transparent",
      soffitGradient: "from-black/60 to-transparent",
    },
    light: {
      wallBackground: "#F0F9FF",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(255, 255, 255, 1) 0%, rgba(224, 242, 254, 0.96) 28%, rgba(186, 230, 253, 0.88) 55%, rgba(125, 211, 252, 0.65) 80%, rgba(240, 249, 255, 0.95) 100%)",
      lampBulb: "#FFFFFF",
      lampGlow: "rgba(56, 189, 248, 0.55)",
      railColor: "#0284C7",
      kickerColor: "#0369A1",
      titleColor: "#0C4A6E",
      noteColor: "#1E293B",
      borderActive: "rgba(14, 165, 233, 0.9)",
      windowGlow: "0 0 24px 4px rgba(56, 189, 248, 0.3)",
      sillGlow: "#0284C7",
      badgeDot: "#0284C7",
      textCardBg: "bg-gradient-to-t from-white/95 via-white/80 to-transparent",
      soffitGradient: "from-black/15 to-transparent",
    },
  },
  green: {
    name: "Emerald Green",
    dark: {
      wallBackground: "#022C22",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(236, 253, 245, 0.98) 0%, rgba(52, 211, 153, 0.92) 24%, rgba(16, 185, 129, 0.85) 52%, rgba(5, 150, 105, 0.72) 78%, rgba(2, 44, 34, 0.95) 100%)",
      lampBulb: "#FFFFFF",
      lampGlow: "rgba(52, 211, 153, 0.95)",
      railColor: "#064E3B",
      kickerColor: "#6EE7B7",
      titleColor: "#FFFFFF",
      noteColor: "rgba(255, 255, 255, 0.95)",
      borderActive: "rgba(52, 211, 153, 0.85)",
      windowGlow: "0 0 35px 8px rgba(52, 211, 153, 0.45)",
      sillGlow: "#059669",
      badgeDot: "#34D399",
      textCardBg: "bg-gradient-to-t from-black/85 via-black/45 to-transparent",
      soffitGradient: "from-black/60 to-transparent",
    },
    light: {
      wallBackground: "#F0FDF4",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(255, 255, 255, 1) 0%, rgba(236, 253, 245, 0.96) 28%, rgba(167, 243, 208, 0.88) 55%, rgba(110, 231, 183, 0.65) 80%, rgba(240, 253, 244, 0.95) 100%)",
      lampBulb: "#FFFFFF",
      lampGlow: "rgba(52, 211, 153, 0.55)",
      railColor: "#059669",
      kickerColor: "#047857",
      titleColor: "#064E3B",
      noteColor: "#1E293B",
      borderActive: "rgba(16, 185, 129, 0.9)",
      windowGlow: "0 0 24px 4px rgba(52, 211, 153, 0.3)",
      sillGlow: "#059669",
      badgeDot: "#059669",
      textCardBg: "bg-gradient-to-t from-white/95 via-white/80 to-transparent",
      soffitGradient: "from-black/15 to-transparent",
    },
  },
  yellow: {
    name: "Golden Amber",
    dark: {
      wallBackground: "#3D1704",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(254, 243, 199, 0.98) 0%, rgba(251, 191, 36, 0.94) 24%, rgba(245, 158, 11, 0.88) 52%, rgba(217, 119, 6, 0.78) 78%, rgba(69, 26, 3, 0.95) 100%)",
      lampBulb: "#FFFBEB",
      lampGlow: "rgba(251, 191, 36, 0.98)",
      railColor: "#991B1B",
      kickerColor: "#FDE047",
      titleColor: "#FFFFFF",
      noteColor: "rgba(255, 255, 255, 0.95)",
      borderActive: "rgba(251, 191, 36, 0.85)",
      windowGlow: "0 0 35px 8px rgba(251, 191, 36, 0.48)",
      sillGlow: "#D97706",
      badgeDot: "#FBBF24",
      textCardBg: "bg-gradient-to-t from-black/85 via-black/45 to-transparent",
      soffitGradient: "from-black/60 to-transparent",
    },
    light: {
      wallBackground: "#FEFCE8",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(255, 255, 255, 1) 0%, rgba(254, 249, 195, 0.96) 28%, rgba(253, 224, 71, 0.88) 55%, rgba(250, 204, 21, 0.65) 80%, rgba(254, 252, 232, 0.95) 100%)",
      lampBulb: "#FFFBEB",
      lampGlow: "rgba(251, 191, 36, 0.55)",
      railColor: "#B45309",
      kickerColor: "#B45309",
      titleColor: "#78350F",
      noteColor: "#1E293B",
      borderActive: "rgba(245, 158, 11, 0.9)",
      windowGlow: "0 0 24px 4px rgba(251, 191, 36, 0.3)",
      sillGlow: "#D97706",
      badgeDot: "#D97706",
      textCardBg: "bg-gradient-to-t from-white/95 via-white/80 to-transparent",
      soffitGradient: "from-black/15 to-transparent",
    },
  },
  red: {
    name: "Ruby Red",
    dark: {
      wallBackground: "#3A0808",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(254, 242, 242, 0.98) 0%, rgba(248, 113, 113, 0.92) 24%, rgba(239, 68, 68, 0.85) 52%, rgba(220, 38, 38, 0.72) 78%, rgba(69, 10, 10, 0.95) 100%)",
      lampBulb: "#FFFFFF",
      lampGlow: "rgba(248, 113, 113, 0.95)",
      railColor: "#7F1D1D",
      kickerColor: "#FCA5A5",
      titleColor: "#FFFFFF",
      noteColor: "rgba(255, 255, 255, 0.95)",
      borderActive: "rgba(248, 113, 113, 0.85)",
      windowGlow: "0 0 35px 8px rgba(248, 113, 113, 0.45)",
      sillGlow: "#DC2626",
      badgeDot: "#F87171",
      textCardBg: "bg-gradient-to-t from-black/85 via-black/45 to-transparent",
      soffitGradient: "from-black/60 to-transparent",
    },
    light: {
      wallBackground: "#FEF2F2",
      beamGradient:
        "radial-gradient(ellipse 115% 105% at 82% 14%, rgba(255, 255, 255, 1) 0%, rgba(254, 226, 226, 0.96) 28%, rgba(252, 165, 165, 0.88) 55%, rgba(248, 113, 113, 0.65) 80%, rgba(254, 242, 242, 0.95) 100%)",
      lampBulb: "#FFFFFF",
      lampGlow: "rgba(248, 113, 113, 0.55)",
      railColor: "#DC2626",
      kickerColor: "#B91C1C",
      titleColor: "#7F1D1D",
      noteColor: "#1E293B",
      borderActive: "rgba(239, 68, 68, 0.9)",
      windowGlow: "0 0 24px 4px rgba(248, 113, 113, 0.3)",
      sillGlow: "#DC2626",
      badgeDot: "#DC2626",
      textCardBg: "bg-gradient-to-t from-white/95 via-white/80 to-transparent",
      soffitGradient: "from-black/15 to-transparent",
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INDIVIDUAL WINDOW ARCHITECTURAL DETAILS MATRIX (4x4)
// Adds natural architectural variation so windows don't look robotic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface WindowDetailConfig {
  blindStyle: "drapes-split" | "drapes-left" | "blinds-half" | "blinds-three-quarter" | "shade-half" | "minimal";
  silhouette?: "plant" | "lamp-off" | "books" | "frame";
  specularAngle: string;
}

const WINDOW_DETAILS: WindowDetailConfig[][] = [
  // Floor 0 (Top floor)
  [
    { blindStyle: "drapes-split", silhouette: "plant", specularAngle: "125deg" },
    { blindStyle: "blinds-half", specularAngle: "135deg" }, // Interactive Blue
    { blindStyle: "shade-half", silhouette: "books", specularAngle: "145deg" },
    { blindStyle: "blinds-three-quarter", specularAngle: "130deg" },
  ],
  // Floor 1
  [
    { blindStyle: "shade-half", silhouette: "frame", specularAngle: "140deg" },
    { blindStyle: "drapes-left", silhouette: "plant", specularAngle: "120deg" },
    { blindStyle: "blinds-half", specularAngle: "135deg" },
    { blindStyle: "drapes-split", specularAngle: "150deg" }, // Interactive Green
  ],
  // Floor 2
  [
    { blindStyle: "blinds-three-quarter", silhouette: "plant", specularAngle: "130deg" }, // Interactive Yellow
    { blindStyle: "shade-half", specularAngle: "145deg" },
    { blindStyle: "drapes-split", silhouette: "lamp-off", specularAngle: "125deg" },
    { blindStyle: "blinds-half", specularAngle: "140deg" },
  ],
  // Floor 3 (Ground floor)
  [
    { blindStyle: "blinds-half", specularAngle: "135deg" },
    { blindStyle: "drapes-left", silhouette: "books", specularAngle: "120deg" },
    { blindStyle: "shade-half", specularAngle: "140deg" }, // Interactive Red
    { blindStyle: "drapes-split", silhouette: "plant", specularAngle: "130deg" },
  ],
];

interface CinematicBuildingFacadeProps {
  onBackToHome?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export function CinematicBuildingFacade({
  onNavigateSection,
  onOpenContact,
}: CinematicBuildingFacadeProps) {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleWindowEnter = (id: string) => {
    if (!isMobile) {
      setActiveWindowId(id);
    }
  };

  const handleWindowLeave = () => {
    if (!isMobile) {
      setActiveWindowId(null);
    }
  };

  const handleWindowClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveWindowId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveWindowId((prev) => (prev === id ? null : id));
    } else if (e.key === "Escape") {
      setActiveWindowId(null);
    }
  };

  const TOTAL_ROWS = 4;
  const TOTAL_COLS = 4;

  return (
    <div
      ref={containerRef}
      onClick={() => setActiveWindowId(null)}
      className={`relative w-full min-h-screen flex flex-col items-center justify-between overflow-x-hidden font-sora select-none transition-colors duration-700 ${
        isDark
          ? "bg-[#07060A] text-[#F5F3FA] selection:bg-amber-400/20"
          : "bg-[#F7F5FC] text-[#34154E] selection:bg-purple-200"
      }`}
    >
      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        REALISTIC ARCHITECTURAL BACKGROUND (CITYSCAPE IN DEPTH OF FIELD)
        - Left & Right neighboring buildings with glowing windows at night!
        - Warm interior lamps and TV screens in the background
        - Distant city horizon towers with scattered warm lights
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-700"
      >
        {/* 1. DEEP ATMOSPHERIC NIGHT SKY LAYER (Fades smoothly across modes) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isDark ? "opacity-100 pointer-events-none" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* 1. Deep Atmospheric Night Sky Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030206] via-[#080612] to-[#120D1F]" />

            {/* 2. Soft Ambient City Glow on Horizon */}
            <div className="absolute bottom-0 inset-x-0 h-[55vh] bg-[radial-gradient(ellipse_at_50%_100%,_rgba(251,191,36,0.09)_0%,_rgba(139,92,246,0.06)_40%,_transparent_75%)]" />

            {/* 3. Volumetric Fog / Nocturnal Haze at Street Level */}
            <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-[#08060E] via-[#0E0B1A]/85 to-transparent opacity-90" />

            {/* 4. REALISTIC NEIGHBORING CITY BUILDINGS WITH GLOWING WINDOWS (Left & Right Flanks) */}
            <div className="absolute bottom-28 inset-x-0 h-[480px] pointer-events-none flex justify-between px-2 sm:px-6 md:px-10 opacity-70 blur-[0.6px]">
              {/* Left Background Building: Historic 4-Story Brick Apartment */}
              <div className="w-32 sm:w-48 md:w-60 h-full flex flex-col justify-end">
                {/* Rooftop Water Tower & Chimneys */}
                <div className="flex items-end justify-between px-4 pb-1">
                  <div className="w-8 sm:w-10 h-10 border-t-2 border-x border-white/20 bg-[#141022] rounded-t-sm" />
                  <div className="w-4 h-6 border-t border-x border-white/15 bg-[#171226]" />
                </div>
                {/* Decorative Cornice */}
                <div className="w-full h-3 bg-[#191428] border-y border-white/10" />
                {/* Building Facade with Glowing & Dark Windows */}
                <div className="w-full flex-1 bg-[#100D1C] border-r border-white/10 p-3 flex flex-col justify-around">
                  {/* Floor 3 */}
                  <div className="flex justify-around">
                    {/* Glowing warm window */}
                    <div className="relative w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#FEF08A] shadow-[0_0_14px_5px_rgba(254,240,138,0.7)] flex items-center justify-center">
                      <div className="w-[1px] h-full bg-black/40" />
                    </div>
                    {/* Dark window */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/70 bg-[#080610]" />
                    {/* Soft amber glow */}
                    <div className="relative w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#FDE047]/90 shadow-[0_0_12px_4px_rgba(253,224,71,0.6)] flex items-center justify-center">
                      <div className="w-[1px] h-full bg-black/30" />
                    </div>
                  </div>
                  {/* Floor 2 */}
                  <div className="flex justify-around">
                    {/* Dark window */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/70 bg-[#080610]" />
                    {/* Glowing warm incandescent window */}
                    <div className="relative w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#FBBF24] shadow-[0_0_16px_6px_rgba(251,191,36,0.65)] flex items-center justify-center">
                      <div className="w-[1px] h-full bg-black/40" />
                    </div>
                    {/* Cool television screen glow */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#BAE6FD]/80 shadow-[0_0_10px_3px_rgba(186,230,253,0.5)]" />
                  </div>
                  {/* Floor 1 */}
                  <div className="flex justify-around">
                    {/* Soft warm lamp */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#FEF3C7]/80 shadow-[0_0_10px_3px_rgba(254,243,199,0.5)]" />
                    {/* Dark window */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/70 bg-[#080610]" />
                    {/* Soft amber window */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#F59E0B]/75 shadow-[0_0_10px_3px_rgba(245,158,11,0.5)]" />
                  </div>
                </div>
              </div>

              {/* Right Background Building: Loft with Fire Escape & Radio Mast */}
              <div className="w-32 sm:w-48 md:w-60 h-full flex flex-col justify-end">
                {/* Radio Mast with blinking red beacon */}
                <div className="relative w-full h-10 flex flex-col items-center justify-end">
                  <div className="w-[1.5px] h-9 bg-white/30 relative">
                    <span className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444] animate-pulse" />
                  </div>
                </div>
                {/* Parapet */}
                <div className="w-full h-3 bg-[#191428] border-y border-white/10" />
                {/* Facade with Windows & Fire Escape */}
                <div className="w-full flex-1 bg-[#100D1C] border-l border-white/10 p-3 relative flex flex-col justify-around">
                  {/* Fire Escape Zig-zag silhouette */}
                  <div className="absolute inset-y-2 right-3 w-8 flex flex-col justify-between pointer-events-none opacity-70 z-10">
                    <div className="w-full h-1 bg-[#251F36] border-b border-black" />
                    <div className="w-full h-1 bg-[#251F36] border-b border-black" />
                    <div className="w-full h-1 bg-[#251F36] border-b border-black" />
                  </div>
                  {/* Windows with Warm Night Glows */}
                  <div className="flex justify-around pr-6">
                    {/* Warm glow shining through fire escape */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#FEF08A] shadow-[0_0_15px_5px_rgba(254,240,138,0.65)]" />
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/70 bg-[#080610]" />
                  </div>
                  <div className="flex justify-around pr-6">
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/70 bg-[#080610]" />
                    {/* Warm living room light */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#FBBF24] shadow-[0_0_14px_4px_rgba(251,191,36,0.6)]" />
                  </div>
                  <div className="flex justify-around pr-6">
                    {/* Cozy reading light */}
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/80 bg-[#FDE047]/80 shadow-[0_0_10px_3px_rgba(253,224,71,0.5)]" />
                    <div className="w-5 sm:w-6 h-7 rounded-[1px] border border-black/70 bg-[#080610]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Distant Skyline Towers with Scattered City Lights */}
            <div className="absolute bottom-28 inset-x-0 h-44 pointer-events-none flex items-end justify-center gap-4 opacity-40 blur-[1px]">
              <div className="relative w-16 h-36 bg-[#090714] border-t border-white/5 flex flex-col justify-around py-3 px-1">
                <div className="flex justify-around">
                  <span className="w-1 h-1 bg-amber-200 shadow-[0_0_4px_#FDE047]" />
                  <span className="w-1 h-1 bg-amber-200/50" />
                </div>
                <div className="flex justify-around">
                  <span className="w-1 h-1 bg-sky-200/40" />
                  <span className="w-1 h-1 bg-amber-200 shadow-[0_0_4px_#FDE047]" />
                </div>
              </div>
              <div className="relative w-20 h-44 bg-[#0B0918] border-t border-white/5 flex flex-col justify-around py-4 px-1.5">
                <div className="flex justify-around">
                  <span className="w-1 h-1 bg-amber-100 shadow-[0_0_4px_#FEF08A]" />
                  <span className="w-1 h-1 bg-amber-200/40" />
                  <span className="w-1 h-1 bg-amber-100 shadow-[0_0_4px_#FEF08A]" />
                </div>
                <div className="flex justify-around">
                  <span className="w-1 h-1 bg-amber-200/30" />
                  <span className="w-1 h-1 bg-sky-200/60" />
                </div>
              </div>
              <div className="w-14 h-32 bg-[#080610] border-t border-white/5" />
            </div>

            {/* Subtle Stars in Upper Atmosphere */}
            <div className="absolute inset-0 opacity-45 pointer-events-none">
              <div className="absolute top-[8%] left-[12%] w-[1.5px] h-[1.5px] rounded-full bg-white/70 shadow-[0_0_4px_white]" />
              <div className="absolute top-[14%] left-[26%] w-[1px] h-[1px] rounded-full bg-white/50" />
              <div className="absolute top-[6%] left-[44%] w-[2px] h-[2px] rounded-full bg-amber-100/80 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <div className="absolute top-[11%] left-[62%] w-[1.5px] h-[1.5px] rounded-full bg-white/60" />
              <div className="absolute top-[18%] left-[78%] w-[1px] h-[1px] rounded-full bg-white/40" />
              <div className="absolute top-[9%] left-[88%] w-[2px] h-[2px] rounded-full bg-white/80 shadow-[0_0_5px_white]" />
              <div className="absolute top-[5%] left-[20%] w-[1.5px] h-[1.5px] rounded-full bg-amber-200/60 shadow-[0_0_3px_#FEF08A]" />
              <div className="absolute top-[22%] left-[34%] w-[1px] h-[1px] rounded-full bg-white/40" />
              <div className="absolute top-[4%] left-[72%] w-[1.5px] h-[1.5px] rounded-full bg-white/70 shadow-[0_0_4px_white]" />
            </div>

            {/* 7. Realistic Film Grain / Nocturnal Haze */}
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none shadow-[inset_0_0_160px_rgba(0,0,0,0.85)]" />
        </div>

        {/* 2. REALISTIC DAYLIGHT SKY LAYER (Fades smoothly across modes) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            !isDark ? "opacity-100 pointer-events-none" : "opacity-0 pointer-events-none"
          }`}
        >
            {/* 1. Realistic Daylight Sky Gradient (Soft Morning Atmosphere) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#B8D5FA] via-[#DCE8F7] to-[#EAE4F5]" />

            {/* 2. REALISTIC DAYTIME NEIGHBORING BUILDINGS */}
            <div className="absolute bottom-28 inset-x-0 h-[480px] pointer-events-none flex justify-between px-2 sm:px-6 md:px-10 opacity-35 blur-[0.6px]">
              {/* Left Background Townhouse */}
              <div className="w-32 sm:w-48 md:w-60 h-full flex flex-col justify-end">
                <div className="flex items-end justify-between px-4 pb-1">
                  <div className="w-8 sm:w-10 h-10 border-t-2 border-x border-[#8D7D9F] bg-[#B0A2C3] rounded-t-sm" />
                  <div className="w-4 h-6 border-t border-x border-[#8D7D9F] bg-[#A294B6]" />
                </div>
                <div className="w-full h-3 bg-[#9C8EAFA] border-y border-[#7D6E90]" />
                <div className="w-full flex-1 bg-[#C5B9D8] border-r border-[#9687AB] p-3 flex flex-col justify-around shadow-sm">
                  <div className="flex justify-around">
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70 shadow-inner" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-[#A294B6]/60" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70" />
                  </div>
                  <div className="flex justify-around">
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-[#A294B6]/60" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-[#A294B6]/60" />
                  </div>
                  <div className="flex justify-around">
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-[#A294B6]/60" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70" />
                  </div>
                </div>
              </div>

              {/* Right Background Loft Building */}
              <div className="w-32 sm:w-48 md:w-60 h-full flex flex-col justify-end">
                <div className="relative w-full h-10 flex flex-col items-center justify-end">
                  <div className="w-[1.5px] h-9 bg-[#6D5D82] relative" />
                </div>
                <div className="w-full h-3 bg-[#9C8EAFA] border-y border-[#7D6E90]" />
                <div className="w-full flex-1 bg-[#C5B9D8] border-l border-[#9687AB] p-3 relative flex flex-col justify-around">
                  <div className="flex justify-around pr-4">
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-[#A294B6]/60" />
                  </div>
                  <div className="flex justify-around pr-4">
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-[#A294B6]/60" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70" />
                  </div>
                  <div className="flex justify-around pr-4">
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-white/70" />
                    <div className="w-5 h-7 rounded-[1px] border border-[#6D5D82] bg-[#A294B6]/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Distant Skyline Towers in Center Gap */}
            <div className="absolute bottom-28 inset-x-0 h-44 pointer-events-none flex items-end justify-center gap-4 opacity-20 blur-[1px]">
              <div className="w-16 h-36 bg-[#8F82A8] border-t border-[#7A6D92]" />
              <div className="w-20 h-44 bg-[#7D6F96] border-t border-[#6B5D84]" />
              <div className="w-14 h-32 bg-[#8F82A8] border-t border-[#7A6D92]" />
            </div>
        </div>

        {/* 
          3. CELESTIAL ORB (MOON IN DARK MODE / SUN IN LIGHT MODE)
          Exact same celestial position in both modes, with ultra-smooth cross-fade, 
          scale, and gentle rise/fall parallax transitions when switching modes!
        */}
        <CelestialOrb isDark={isDark} />
      </div>

      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        TOP SECTION HEADER
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <header className="relative z-20 w-full max-w-5xl mx-auto pt-24 pb-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1
            className={`font-fraunces text-[30px] sm:text-[38px] md:text-[46px] font-bold tracking-tight leading-tight transition-colors duration-500 ${
              isDark
                ? "text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
                : "text-[#34154E] drop-shadow-[0_2px_10px_rgba(52,21,78,0.06)]"
            }`}
          >
            Some Bits Of Me
          </h1>
        </motion.div>
      </header>

      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CINEMATIC 4x4 BUILDING WITH REALISTIC ROOFTOP TERRACE LIGHTS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <main className="relative z-10 w-full max-w-5xl lg:max-w-6xl px-3 sm:px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[860px] sm:max-w-[940px] md:max-w-[1000px] flex flex-col items-center"
        >
          {/* 
            ROOFTOP PARAPET & TERRACE WITH REALISTIC ARCHITECTURAL WATER TOWER & BISTRO LIGHTS
            - Authentic NYC cedar water tank on cross-braced steel dunnage trestle (left)
            - Continuous wrought-iron terrace balustrade with corner newel posts
            - Vertical light stanchions firmly anchored to railing
            - Mathematically aligned catenary suspension cable starting and ending at posts (NO clipping into water tower)
            - Glowing Edison festoon bulbs with tungsten filaments & ambient radiance
            - Staircase bulkhead penthouse with warm sconce lantern (center)
            - Brick chimney stack with twin terracotta flue pots & vintage TV antenna (right)
          */}
          <div className="relative w-[94%] sm:w-[96%] flex items-end justify-center pointer-events-none z-20">
            <svg
              viewBox="0 0 840 70"
              className="w-full h-14 sm:h-17 md:h-20 overflow-visible pointer-events-none select-none"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Cedar water tank wood gradient */}
                <linearGradient id="rfWaterTank" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isDark ? "#2A1F1B" : "#8A6D58"} />
                  <stop offset="35%" stopColor={isDark ? "#3D2E28" : "#A6866E"} />
                  <stop offset="70%" stopColor={isDark ? "#281D19" : "#7D604C"} />
                  <stop offset="100%" stopColor={isDark ? "#1B1310" : "#5C4535"} />
                </linearGradient>

                {/* Water tank conical roof gradient */}
                <linearGradient id="rfWaterRoof" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#3A2A23" : "#9C7960"} />
                  <stop offset="100%" stopColor={isDark ? "#1C1411" : "#634A38"} />
                </linearGradient>

                {/* Steel trestle legs gradient */}
                <linearGradient id="rfWaterSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#1E1A29" : "#4A3E5C"} />
                  <stop offset="100%" stopColor={isDark ? "#0E0B14" : "#2D243A"} />
                </linearGradient>

                {/* Masonry / Bulkhead / Chimney brick gradient */}
                <linearGradient id="rfBrick" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#241D2C" : "#988AA8"} />
                  <stop offset="100%" stopColor={isDark ? "#15101A" : "#6E607E"} />
                </linearGradient>

                {/* Terracotta flue pots gradient */}
                <linearGradient id="rfTerracotta" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isDark ? "#6E2D19" : "#C25E3E"} />
                  <stop offset="50%" stopColor={isDark ? "#9A4025" : "#DB7958"} />
                  <stop offset="100%" stopColor={isDark ? "#521F10" : "#9E472A"} />
                </linearGradient>

                {/* Bistro Bulb Radial Glow Filter */}
                <radialGradient id="bistroGlowCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="30%" stopColor="#FEF3C7" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#FBBF24" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                1. AUTHENTIC ARCHITECTURAL WATER TOWER (LEFT SIDE)
                Completely isolated from the string lights (Ends at x=72)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              */}
              <g id="water-tower-assembly">
                {/* Concrete Dunnage Footing Beams on Rooftop */}
                <rect
                  x="18"
                  y="62"
                  width="54"
                  height="4"
                  rx="1"
                  fill={isDark ? "#181422" : "#5E5074"}
                  stroke={isDark ? "rgba(255,255,255,0.08)" : "#433757"}
                  strokeWidth="0.8"
                />

                {/* Steel Dunnage I-Beams */}
                <path
                  d="M 22 62 L 22 57 L 68 57 L 68 62"
                  stroke={isDark ? "#251F33" : "#4D3F65"}
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* Structural Cross-Braced Trestle Legs */}
                {/* Main vertical/slanted steel columns */}
                <line
                  x1="26"
                  y1="57"
                  x2="29"
                  y2="36"
                  stroke="url(#rfWaterSteel)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <line
                  x1="64"
                  y1="57"
                  x2="61"
                  y2="36"
                  stroke="url(#rfWaterSteel)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Center support column */}
                <line
                  x1="45"
                  y1="57"
                  x2="45"
                  y2="36"
                  stroke="url(#rfWaterSteel)"
                  strokeWidth="1.6"
                />
                {/* Horizontal trestle ledger bars */}
                <line
                  x1="27.5"
                  y1="47"
                  x2="62.5"
                  y2="47"
                  stroke={isDark ? "#231B30" : "#4B3D63"}
                  strokeWidth="1.4"
                />
                {/* Diagonal steel tension cross bracing */}
                <line
                  x1="27"
                  y1="57"
                  x2="62.5"
                  y2="47"
                  stroke={isDark ? "rgba(255,255,255,0.15)" : "#5D4E75"}
                  strokeWidth="0.9"
                />
                <line
                  x1="63"
                  y1="57"
                  x2="27.5"
                  y2="47"
                  stroke={isDark ? "rgba(255,255,255,0.15)" : "#5D4E75"}
                  strokeWidth="0.9"
                />
                <line
                  x1="28"
                  y1="47"
                  x2="61"
                  y2="36"
                  stroke={isDark ? "rgba(255,255,255,0.15)" : "#5D4E75"}
                  strokeWidth="0.9"
                />
                <line
                  x1="62"
                  y1="47"
                  x2="29"
                  y2="36"
                  stroke={isDark ? "rgba(255,255,255,0.15)" : "#5D4E75"}
                  strokeWidth="0.9"
                />

                {/* Upper Platform Base Plate */}
                <rect
                  x="23"
                  y="34.5"
                  width="44"
                  height="2.5"
                  rx="0.5"
                  fill={isDark ? "#171322" : "#3F3255"}
                />

                {/* Cedar Wooden Water Tank Cylinder */}
                <rect
                  x="24"
                  y="16"
                  width="42"
                  height="19"
                  rx="1"
                  fill="url(#rfWaterTank)"
                  stroke={isDark ? "rgba(0,0,0,0.8)" : "#4A3A2C"}
                  strokeWidth="0.8"
                />
                {/* Vertical wood stave seams */}
                <line x1="30" y1="16" x2="30" y2="35" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
                <line x1="36" y1="16" x2="36" y2="35" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
                <line x1="42" y1="16" x2="42" y2="35" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
                <line x1="48" y1="16" x2="48" y2="35" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
                <line x1="54" y1="16" x2="54" y2="35" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
                <line x1="60" y1="16" x2="60" y2="35" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />

                {/* 3 Horizontal Galvanized Steel Hoops */}
                <rect
                  x="23.5"
                  y="19"
                  width="43"
                  height="1.2"
                  fill={isDark ? "#38314A" : "#55466C"}
                />
                <rect
                  x="23.5"
                  y="25.5"
                  width="43"
                  height="1.2"
                  fill={isDark ? "#38314A" : "#55466C"}
                />
                <rect
                  x="23.5"
                  y="32"
                  width="43"
                  height="1.2"
                  fill={isDark ? "#38314A" : "#55466C"}
                />
                {/* Hoop tension turnbuckles */}
                <rect x="33" y="18.5" width="2" height="2.2" fill="#1C1428" />
                <rect x="33" y="25" width="2" height="2.2" fill="#1C1428" />
                <rect x="33" y="31.5" width="2" height="2.2" fill="#1C1428" />

                {/* Conical Wooden Roof Cap */}
                <polygon
                  points="21,16 45,4 69,16"
                  fill="url(#rfWaterRoof)"
                  stroke={isDark ? "rgba(0,0,0,0.7)" : "#4A3A2C"}
                  strokeWidth="0.8"
                />
                {/* Roof apex finial ball */}
                <circle cx="45" cy="3.5" r="1.5" fill={isDark ? "#C4B5FD" : "#5B4A72"} />
                {/* Eaves fascia trim */}
                <rect
                  x="20.5"
                  y="15.2"
                  width="49"
                  height="1.5"
                  rx="0.4"
                  fill={isDark ? "#281D19" : "#684E3C"}
                />

                {/* Tank inspection ladder */}
                <line
                  x1="62"
                  y1="16"
                  x2="62"
                  y2="35"
                  stroke={isDark ? "#251F33" : "#4A3E5C"}
                  strokeWidth="0.9"
                />
                <line
                  x1="65"
                  y1="16"
                  x2="65"
                  y2="35"
                  stroke={isDark ? "#251F33" : "#4A3E5C"}
                  strokeWidth="0.9"
                />
                {Array.from({ length: 6 }).map((_, idx) => (
                  <line
                    key={idx}
                    x1="62"
                    y1={19 + idx * 3}
                    x2="65"
                    y2={19 + idx * 3}
                    stroke={isDark ? "#251F33" : "#4A3E5C"}
                    strokeWidth="0.8"
                  />
                ))}
              </g>

              {/* 
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                2. CENTER ROOFTOP BULKHEAD PENTHOUSE (x = 385..455)
                Stairwell access door with warm carriage sconce
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              */}
              <g id="bulkhead-assembly">
                {/* Masonry Enclosure */}
                <rect
                  x="386"
                  y="26"
                  width="68"
                  height="40"
                  rx="1"
                  fill="url(#rfBrick)"
                  stroke={isDark ? "rgba(255,255,255,0.08)" : "#5C4E72"}
                  strokeWidth="1"
                />
                {/* Stone Coping Roof */}
                <rect
                  x="383"
                  y="24"
                  width="74"
                  height="3"
                  rx="1"
                  fill={isDark ? "#2B243B" : "#B2A4C6"}
                  stroke={isDark ? "rgba(255,255,255,0.15)" : "#7F6F94"}
                  strokeWidth="0.6"
                />

                {/* Arched Access Doorway */}
                <path
                  d="M 405 66 L 405 38 C 405 34 435 34 435 38 L 435 66 Z"
                  fill={isDark ? "#0B0912" : "#382B4E"}
                  stroke={isDark ? "#1E1929" : "#55466E"}
                  strokeWidth="1"
                />
                {/* Semi-circular Transom Window */}
                <path
                  d="M 408 38 C 408 35 432 35 432 38 Z"
                  fill={isDark ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.7)"}
                  stroke={isDark ? "rgba(251,191,36,0.5)" : "#55466E"}
                  strokeWidth="0.8"
                />
                {/* Solid Mahogany Door Leaf */}
                <rect
                  x="407"
                  y="39"
                  width="26"
                  height="27"
                  fill={isDark ? "#17121F" : "#4B3A64"}
                />
                <circle cx="411" cy="52" r="1" fill="#FBBF24" />

                {/* Warm Bulkhead Sconce Lantern */}
                <circle cx="396" cy="38" r="2.2" fill={isDark ? "#FEF3C7" : "#5B4A72"} />
                {isDark && (
                  <>
                    <circle cx="396" cy="38" r="7" fill="url(#bistroGlowCore)" opacity="0.85" />
                    <circle cx="396" cy="38" r="14" fill="#FBBF24" opacity="0.18" />
                  </>
                )}
                {/* Sconce bracket */}
                <path
                  d="M 396 38 L 392 38 L 392 41"
                  stroke={isDark ? "rgba(255,255,255,0.4)" : "#433658"}
                  strokeWidth="1"
                  fill="none"
                />
              </g>

              {/* 
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                3. RIGHT ROOFTOP ELEMENTS (x = 745..815)
                Classic brick chimney with terracotta pots & TV antenna
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              */}
              <g id="right-rooftop-elements">
                {/* Brick Chimney Stack */}
                <rect
                  x="745"
                  y="26"
                  width="38"
                  height="40"
                  rx="1"
                  fill="url(#rfBrick)"
                  stroke={isDark ? "rgba(255,255,255,0.08)" : "#5C4E72"}
                  strokeWidth="1"
                />
                {/* Corbelled Brick Chimney Cap */}
                <rect
                  x="742"
                  y="24"
                  width="44"
                  height="3"
                  rx="0.6"
                  fill={isDark ? "#2B243B" : "#B2A4C6"}
                />
                {/* Left Terracotta Chimney Pot */}
                <rect
                  x="749"
                  y="16"
                  width="9"
                  height="8.5"
                  rx="1"
                  fill="url(#rfTerracotta)"
                  stroke={isDark ? "rgba(0,0,0,0.6)" : "#803820"}
                  strokeWidth="0.6"
                />
                <rect x="748" y="15" width="11" height="1.8" rx="0.5" fill="#803820" />
                <ellipse cx="753.5" cy="15.5" rx="3.5" ry="0.8" fill="#1C0A05" />

                {/* Right Terracotta Chimney Pot */}
                <rect
                  x="766"
                  y="16"
                  width="9"
                  height="8.5"
                  rx="1"
                  fill="url(#rfTerracotta)"
                  stroke={isDark ? "rgba(0,0,0,0.6)" : "#803820"}
                  strokeWidth="0.6"
                />
                <rect x="765" y="15" width="11" height="1.8" rx="0.5" fill="#803820" />
                <ellipse cx="770.5" cy="15.5" rx="3.5" ry="0.8" fill="#1C0A05" />

                {/* Vintage Steel TV Antenna Mast */}
                <line
                  x1="804"
                  y1="66"
                  x2="804"
                  y2="8"
                  stroke={isDark ? "rgba(255,255,255,0.4)" : "#4E3E66"}
                  strokeWidth="1.5"
                />
                {/* Horizontal Crossbars */}
                <line
                  x1="795"
                  y1="13"
                  x2="813"
                  y2="13"
                  stroke={isDark ? "rgba(255,255,255,0.35)" : "#4E3E66"}
                  strokeWidth="1.1"
                />
                <line
                  x1="797"
                  y1="20"
                  x2="811"
                  y2="20"
                  stroke={isDark ? "rgba(255,255,255,0.3)" : "#4E3E66"}
                  strokeWidth="1"
                />
                <line
                  x1="799"
                  y1="28"
                  x2="809"
                  y2="28"
                  stroke={isDark ? "rgba(255,255,255,0.25)" : "#4E3E66"}
                  strokeWidth="0.9"
                />
                {/* Guy-wire tension support */}
                <line
                  x1="804"
                  y1="32"
                  x2="788"
                  y2="66"
                  stroke={isDark ? "rgba(255,255,255,0.18)" : "rgba(80,60,105,0.3)"}
                  strokeWidth="0.7"
                />
              </g>

              {/* 
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                4. TERRACE WROUGHT-IRON PERIMETER BALUSTRADE
                Spanning cleanly between x = 86 and x = 734
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              */}
              <g id="terrace-balustrade">
                {/* Top Moulded Handrail Bar */}
                <rect
                  x="84"
                  y="42"
                  width="652"
                  height="2.5"
                  rx="1"
                  fill={isDark ? "#282236" : "#55466E"}
                  stroke={isDark ? "#171322" : "#3E3154"}
                  strokeWidth="0.6"
                />
                {/* Handrail Specular Highlight */}
                <line
                  x1="85"
                  y1="42.5"
                  x2="735"
                  y2="42.5"
                  stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.4)"}
                  strokeWidth="0.6"
                />

                {/* Bottom Footrail Bar */}
                <rect
                  x="84"
                  y="62"
                  width="652"
                  height="2"
                  rx="0.5"
                  fill={isDark ? "#1E1929" : "#4A3D62"}
                />

                {/* 46 Evenly-Spaced Vertical Balusters with Decorative Ring Collars */}
                {Array.from({ length: 46 }).map((_, i) => {
                  const bx = 88 + i * 14.3;
                  if (bx > 730) return null;
                  return (
                    <g key={i}>
                      <line
                        x1={bx}
                        y1="44.5"
                        x2={bx}
                        y2="62"
                        stroke={isDark ? "#251F33" : "#6E5D87"}
                        strokeWidth="1.1"
                      />
                      {/* Forged center ring collar on alternating spindles */}
                      {i % 2 === 0 && (
                        <circle
                          cx={bx}
                          cy="53"
                          r="1.2"
                          fill={isDark ? "#3B324D" : "#4E3E66"}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Left End Newel Post */}
                <rect x="84" y="38" width="4" height="26" rx="0.8" fill={isDark ? "#352B47" : "#503E6B"} />
                <circle cx="86" cy="37" r="2.2" fill={isDark ? "#483B5E" : "#69558A"} />

                {/* Right End Newel Post */}
                <rect x="732" y="38" width="4" height="26" rx="0.8" fill={isDark ? "#352B47" : "#503E6B"} />
                <circle cx="734" cy="37" r="2.2" fill={isDark ? "#483B5E" : "#69558A"} />
              </g>

              {/* 
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                5. VERTICAL STANCHION POSTS & CATENARY BISTRO STRING LIGHTS
                - 6 Vertical Stanchion Posts at x = 90, 218, 346, 474, 602, 730
                - Catenary suspension cable starts EXACTLY at (90, 18) and terminates at (730, 18)
                - NO OVERHANG OR CLIPPING INTO WATER TOWER!
                - Sockets & glowing Edison bulbs at catenary low points
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              */}
              <g id="stanchions-and-bistro-lights">
                {/* 6 Sturdy Cast-Iron Stanchion Light Posts */}
                {[90, 218, 346, 474, 602, 730].map((px, idx) => (
                  <g key={idx}>
                    {/* Parapet Base Anchor Flange */}
                    <rect
                      x={px - 2.5}
                      y="61"
                      width="5"
                      height="3.5"
                      rx="0.8"
                      fill={isDark ? "#171322" : "#3A2E4E"}
                      stroke={isDark ? "#0A0710" : "#281F37"}
                      strokeWidth="0.6"
                    />
                    {/* Anchor Bolt Hex Rivets */}
                    <circle cx={px - 1.5} cy="63" r="0.4" fill="#000000" />
                    <circle cx={px + 1.5} cy="63" r="0.4" fill="#000000" />

                    {/* Fluted Vertical Iron Post (y = 18..62) */}
                    <line
                      x1={px}
                      y1="18"
                      x2={px}
                      y2="62"
                      stroke={isDark ? "#2A2338" : "#4A3D63"}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    {/* Decorative Mid-Collar at Handrail intersection */}
                    <rect
                      x={px - 2}
                      y="41"
                      width="4"
                      height="2"
                      rx="0.5"
                      fill={isDark ? "#3D3450" : "#60507D"}
                    />

                    {/* Top Cable Suspension Eyelet Ring (Center at y = 18) */}
                    <circle
                      cx={px}
                      cy="18"
                      r="1.8"
                      fill="none"
                      stroke={isDark ? "#483C60" : "#655383"}
                      strokeWidth="1.2"
                    />
                    {/* Spherical Acorn Finial Cap at Apex (y = 14.5) */}
                    <circle
                      cx={px}
                      cy="14.5"
                      r="2.2"
                      fill={isDark ? "#3F3454" : "#5B4A74"}
                      stroke={isDark ? "rgba(255,255,255,0.15)" : "#7B6896"}
                      strokeWidth="0.6"
                    />
                  </g>
                ))}

                {/* 
                  MATHEMATICALLY ACCURATE CATENARY SUSPENSION WIRE
                  Starts at (90, 18), connects all 6 posts at y=18, ends at (730, 18)
                  Graceful catenary dip with subtle organic breeze sway
                */}
                <motion.path
                  d="M 90 18 Q 154 31 218 18 Q 282 31 346 18 Q 410 31 474 18 Q 538 31 602 18 Q 666 31 730 18"
                  fill="none"
                  stroke={isDark ? "rgba(255,255,255,0.55)" : "rgba(35,25,50,0.65)"}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  animate={{
                    d: [
                      "M 90 18 Q 154 31 218 18 Q 282 31 346 18 Q 410 31 474 18 Q 538 31 602 18 Q 666 31 730 18",
                      "M 90 18 Q 154 31.8 218 18 Q 282 31.8 346 18 Q 410 31.8 474 18 Q 538 31.8 602 18 Q 666 31.8 730 18",
                      "M 90 18 Q 154 31 218 18 Q 282 31 346 18 Q 410 31 474 18 Q 538 31 602 18 Q 666 31 730 18",
                    ],
                  }}
                  transition={{
                    duration: 4.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* 
                  15 HANGING EDISON FESTOON BISTRO LIGHT FIXTURES
                  Clamped DIRECTLY onto the suspension wire, gently swaying in the evening breeze
                */}
                {[
                  // Span 1 (x: 90 -> 218)
                  { x: 122, wy: 22.9 },
                  { x: 154, wy: 24.5 },
                  { x: 186, wy: 22.9 },
                  // Span 2 (x: 218 -> 346)
                  { x: 250, wy: 22.9 },
                  { x: 282, wy: 24.5 },
                  { x: 314, wy: 22.9 },
                  // Span 3 (x: 346 -> 474)
                  { x: 378, wy: 22.9 },
                  { x: 410, wy: 24.5 },
                  { x: 442, wy: 22.9 },
                  // Span 4 (x: 474 -> 602)
                  { x: 506, wy: 22.9 },
                  { x: 538, wy: 24.5 },
                  { x: 570, wy: 22.9 },
                  // Span 5 (x: 602 -> 730)
                  { x: 634, wy: 22.9 },
                  { x: 666, wy: 24.5 },
                  { x: 698, wy: 22.9 },
                ].map((bulb, idx) => (
                  <motion.g
                    key={idx}
                    id={`bulb-${idx}`}
                    animate={{
                      rotate: [-3.2, 3.2, -3.2],
                    }}
                    transition={{
                      duration: 2.8 + (idx % 4) * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (idx * 0.22) % 1.8,
                    }}
                    style={{
                      transformOrigin: `${bulb.x}px ${bulb.wy}px`,
                    }}
                  >
                    {/* Molded Weatherproof Socket Clamp - Wraps directly around the catenary wire */}
                    <rect
                      x={bulb.x - 2}
                      y={bulb.wy - 1.2}
                      width="4"
                      height="3.2"
                      rx="0.8"
                      fill={isDark ? "#0A0812" : "#251D33"}
                      stroke={isDark ? "rgba(255,255,255,0.18)" : "#181223"}
                      strokeWidth="0.5"
                    />

                    {/* Glowing Teardrop Edison Bistro Glass Bulb */}
                    <ellipse
                      cx={bulb.x}
                      cy={bulb.wy + 5.2}
                      rx="2.6"
                      ry="3.3"
                      fill={isDark ? "#FEF3C7" : "rgba(255,255,255,0.88)"}
                      stroke={isDark ? "#FBBF24" : "#7A6894"}
                      strokeWidth={isDark ? "0.6" : "0.7"}
                    />

                    {/* Tungsten Filament Glow Core & Atmospheric Night Radiance Bloom */}
                    {isDark ? (
                      <>
                        {/* High-intensity golden filament core */}
                        <line
                          x1={bulb.x}
                          y1={bulb.wy + 4.0}
                          x2={bulb.x}
                          y2={bulb.wy + 6.4}
                          stroke="#F59E0B"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        {/* Radial Glow Halo Bloom */}
                        <circle
                          cx={bulb.x}
                          cy={bulb.wy + 5.2}
                          r="9"
                          fill="url(#bistroGlowCore)"
                          opacity="0.92"
                        />
                        <circle
                          cx={bulb.x}
                          cy={bulb.wy + 5.2}
                          r="19"
                          fill="#FBBF24"
                          opacity="0.22"
                        />
                        {/* Warm terrace reflection wash pool onto railing */}
                        <ellipse
                          cx={bulb.x}
                          cy={43}
                          rx="8"
                          ry="2.5"
                          fill="#FBBF24"
                          opacity="0.25"
                        />
                      </>
                    ) : (
                      /* Daytime glass reflection glint */
                      <line
                        x1={bulb.x - 0.8}
                        y1={bulb.wy + 4.2}
                        x2={bulb.x - 0.8}
                        y2={bulb.wy + 6.2}
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                      />
                    )}
                  </motion.g>
                ))}
              </g>
            </svg>
          </div>

          {/* MAIN ARCHITECTURAL CORNICE */}
          <div className="w-full relative z-20">
            {/* Top stone coping ledge with warm terrace glow wash at night */}
            <div
              className={`h-2.5 w-full border-t transition-colors duration-700 relative overflow-hidden ${
                isDark
                  ? "bg-[#201D2D] border-white/15 shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                  : "bg-[#D6CDE3] border-white shadow-[0_2px_6px_rgba(52,21,78,0.12)]"
              }`}
            >
              {isDark && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-[1px]" />
              )}
            </div>
            {/* Dentil molding frieze */}
            <div
              className={`h-3.5 w-full border-y flex items-center justify-between px-2 overflow-hidden transition-colors duration-700 ${
                isDark
                  ? "bg-[#181524] border-black/50"
                  : "bg-[#C4B7D6] border-[#A898BC]"
              }`}
            >
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-2 border-x transition-colors duration-700 ${
                    isDark
                      ? "bg-[#120F1D] border-black/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                      : "bg-[#B4A5C9] border-[#9383A9] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                  }`}
                />
              ))}
            </div>
            {/* Lower projecting cornice shelf with ambient shadow */}
            <div
              className={`h-2 w-full border-b transition-colors duration-700 ${
                isDark
                  ? "bg-[#1A1727] border-black shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
                  : "bg-[#BCADCFA] border-[#8D7D9F] shadow-[0_6px_12px_rgba(52,21,78,0.15)]"
              }`}
            />
          </div>

          {/* 
            BUILDING FACADE WALL (Masonry)
            - 4 Floors x 4 Columns
          */}
          <div
            className={`relative w-full border-x py-4 sm:py-6 px-3 sm:px-6 transition-colors duration-700 ${
              isDark
                ? "bg-[#12101A] border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.95),_inset_0_1px_2px_rgba(255,255,255,0.08)]"
                : "bg-[#EAE5F3] border-[#C8BED8] shadow-[0_25px_60px_rgba(52,21,78,0.09),_inset_0_1px_2px_rgba(255,255,255,0.85)]"
            }`}
          >
            {/* Subtle masonry texture & courses */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isDark
                  ? "opacity-25 bg-[radial-gradient(#2A253A_1px,transparent_1px)]"
                  : "opacity-35 bg-[radial-gradient(#BCADCFA_1px,transparent_1px)]"
              } [background-size:16px_16px]`}
            />

            {/* Subtle vertical piers separating bays */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-3 sm:px-6 opacity-35">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-[1px] h-full bg-gradient-to-b ${
                    isDark
                      ? "from-white/15 via-white/5 to-transparent"
                      : "from-white via-[#C8BED8] to-transparent"
                  }`}
                />
              ))}
            </div>

            {/* 4 FLOORS GRID (4 ROWS) */}
            <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
              {Array.from({ length: TOTAL_ROWS }).map((_, floorIdx) => {
                return (
                  <div key={floorIdx} className="relative">
                    {/* Horizontal stone floor beltcourse separator */}
                    {floorIdx > 0 && (
                      <div
                        className={`h-[2px] w-full mb-4 sm:mb-6 shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-colors duration-700 ${
                          isDark
                            ? "bg-black/80 border-t border-white/[0.06]"
                            : "bg-[#C4B7D6] border-t border-white"
                        }`}
                      />
                    )}

                    {/* Window Row (4 Columns) with Individual Detailing */}
                    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                      {Array.from({ length: TOTAL_COLS }).map((_, colIdx) => {
                        const interactiveData = INTERACTIVE_WINDOWS.find(
                          (w) => w.floor === floorIdx && w.col === colIdx
                        );
                        const isInteractive = Boolean(interactiveData);
                        const isActive =
                          isInteractive && activeWindowId === interactiveData?.id;
                        const windowDetail = WINDOW_DETAILS[floorIdx][colIdx];

                        return (
                          <BuildingWideWindow
                            key={colIdx}
                            isDark={isDark}
                            isInteractive={isInteractive}
                            isActive={isActive}
                            data={interactiveData}
                            detail={windowDetail}
                            onMouseEnter={() =>
                              interactiveData && handleWindowEnter(interactiveData.id)
                            }
                            onMouseLeave={handleWindowLeave}
                            onClick={(e) =>
                              interactiveData && handleWindowClick(e, interactiveData.id)
                            }
                            onKeyDown={(e) =>
                              interactiveData && handleKeyDown(e, interactiveData.id)
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            BUILDING GROUND FLOOR & GRAND ENTRANCE PORTICO
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
          */}
          <div
            className={`w-full relative z-20 border-t-2 border-x pt-4 pb-0 px-4 sm:px-8 transition-colors duration-700 ${
              isDark
                ? "bg-[#0E0C16] border-black border-x-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
                : "bg-[#DFD8EC] border-[#A898BC] border-x-[#C8BED8] shadow-[0_15px_40px_rgba(52,21,78,0.12)]"
            }`}
          >
            <div className="relative flex items-end justify-between max-w-xl mx-auto pb-2">
              {/* Left Ground Floor Basement Casement Grate */}
              <div
                className={`w-14 sm:w-20 h-10 rounded-t-sm border shadow-inner flex flex-col justify-around py-1.5 px-1.5 mb-1 transition-colors duration-700 ${
                  isDark
                    ? "bg-[#08060E] border-white/10"
                    : "bg-[#8E7EAA] border-[#685980]"
                }`}
              >
                <div className={`w-full h-[1px] ${isDark ? "bg-white/20" : "bg-white/40"}`} />
                <div className={`w-full h-[1px] ${isDark ? "bg-white/20" : "bg-white/40"}`} />
                <div className={`w-full h-[1px] ${isDark ? "bg-white/20" : "bg-white/40"}`} />
              </div>

              {/* 
                GRAND ARCHITECTURAL BROWNSTONE ENTRANCE & STOOP
                - Neoclassical carved stone arch with radiating voussoirs and keystone
                - Deep recessed vestibule with fanlight transom
                - Solid mahogany paneled double doors with brass hardware & "27" plaque
                - Twin vintage cast-iron carriage lanterns
                - 4-step limestone stoop with cast-iron ornamental balustrades & topiaries
              */}
              <div className="relative flex flex-col items-center mx-auto z-20">
                {/* Portico Cornice & Keystone with Auspicious Om (ॐ) Symbol */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-5.5 sm:w-6.5 h-4.5 sm:h-5 z-30 -mb-1 rounded-t-sm border-t border-x shadow-md flex items-center justify-center p-0.5 overflow-hidden transition-all duration-700 ${
                      isDark
                        ? "bg-[#221A2D] border-amber-400/40 shadow-[0_1px_8px_rgba(0,0,0,0.7),_0_0_10px_rgba(239,68,68,0.3)]"
                        : "bg-[#F3ECFA] border-[#9E8EB4] shadow-sm"
                    }`}
                    title="ॐ Auspicious Om Hindu Religious Symbol"
                  >
                    <img
                      src="/images/om-symbol.png"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = "1";
                          target.src = "https://img.magnific.com/premium-vector/om-hindu-religious-symbol-red-color-icon-vector_34480-1231.jpg";
                        }
                      }}
                      alt="Om Hindu Religious Symbol"
                      className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.35)]"
                    />
                  </div>

                  {/* Arched Stone Surround with deep 3D reveals */}
                  <div
                    className={`w-38 sm:w-46 h-30 sm:h-34 rounded-t-full border-t-[4px] border-x-[4px] p-2 flex flex-col items-center justify-end shadow-2xl transition-colors duration-700 ${
                      isDark ? "bg-[#0A0714] border-[#2C263E]" : "bg-[#D3C7E3] border-[#9E8EB4]"
                    }`}
                  >
                    {/* Semi-circular Fanlight Transom Window with central architectural sunburst medallion (no numbers) */}
                    <div
                      className={`relative w-full h-12 sm:h-14 border-b rounded-t-full overflow-hidden flex items-center justify-center transition-colors duration-700 ${
                        isDark ? "bg-[#181424] border-white/20" : "bg-white/85 border-[#7A6B92]"
                      }`}
                    >
                      {/* Warm interior vestibule ambient light in dark mode */}
                      {isDark && (
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/40 via-amber-300/15 to-transparent blur-[1px]" />
                      )}

                      {/* Precision Fanlight Transom Muntins & Leaded Glass Medallion */}
                      <svg
                        viewBox="0 0 160 52"
                        className="w-full h-full pointer-events-none select-none overflow-visible"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient id="transomGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
                            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* Outer Arched Rim Border */}
                        <path
                          d="M 2 52 A 78 50 0 0 1 158 52"
                          fill="none"
                          stroke={isDark ? "rgba(0,0,0,0.85)" : "#5C4A70"}
                          strokeWidth="2"
                        />

                        {/* Central Circular Medallion (divided in two halves) */}
                        <circle
                          cx="80"
                          cy="30"
                          r="18"
                          fill={isDark ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.75)"}
                          stroke={isDark ? "rgba(0,0,0,0.9)" : "#433554"}
                          strokeWidth="2"
                        />
                        {/* Inner delicate trim ring */}
                        <circle
                          cx="80"
                          cy="30"
                          r="16"
                          fill="none"
                          stroke={isDark ? "rgba(251,191,36,0.3)" : "rgba(100,80,120,0.3)"}
                          strokeWidth="0.8"
                        />

                        {/* Radiating Sunburst Muntin Spokes extending outward from circle */}
                        <line
                          x1="66"
                          y1="18"
                          x2="32"
                          y2="10"
                          stroke={isDark ? "rgba(0,0,0,0.85)" : "#5C4A70"}
                          strokeWidth="1.6"
                        />
                        <line
                          x1="62"
                          y1="30"
                          x2="16"
                          y2="30"
                          stroke={isDark ? "rgba(0,0,0,0.85)" : "#5C4A70"}
                          strokeWidth="1.6"
                        />
                        <line
                          x1="66"
                          y1="42"
                          x2="18"
                          y2="48"
                          stroke={isDark ? "rgba(0,0,0,0.85)" : "#5C4A70"}
                          strokeWidth="1.6"
                        />

                        <line
                          x1="94"
                          y1="18"
                          x2="128"
                          y2="10"
                          stroke={isDark ? "rgba(0,0,0,0.85)" : "#5C4A70"}
                          strokeWidth="1.6"
                        />
                        <line
                          x1="98"
                          y1="30"
                          x2="144"
                          y2="30"
                          stroke={isDark ? "rgba(0,0,0,0.85)" : "#5C4A70"}
                          strokeWidth="1.6"
                        />
                        <line
                          x1="94"
                          y1="42"
                          x2="142"
                          y2="48"
                          stroke={isDark ? "rgba(0,0,0,0.85)" : "#5C4A70"}
                          strokeWidth="1.6"
                        />

                        {/* Vertical Center Dividing Mullion Bar (Splits circle into two halves) */}
                        <line
                          x1="80"
                          y1="0"
                          x2="80"
                          y2="52"
                          stroke={isDark ? "rgba(0,0,0,0.95)" : "#382B46"}
                          strokeWidth="2"
                        />

                        {/* NUMBER "2" IN LEFT HALF OF THE CIRCLE */}
                        <text
                          x="70.5"
                          y="30"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontFamily="Fraunces, 'Playfair Display', Georgia, serif"
                          fontSize="15"
                          fontWeight="bold"
                          fill={isDark ? "#FEF08A" : "#3B1E08"}
                          stroke={isDark ? "#D97706" : "none"}
                          strokeWidth={isDark ? "0.4" : "0"}
                          style={{
                            filter: isDark
                              ? "drop-shadow(0 0 2.5px rgba(251,191,36,0.8)) drop-shadow(0 1px 2px rgba(0,0,0,0.9))"
                              : "drop-shadow(0 1px 1px rgba(255,255,255,0.7))",
                          }}
                        >
                          2
                        </text>

                        {/* NUMBER "7" IN RIGHT HALF OF THE CIRCLE */}
                        <text
                          x="89.5"
                          y="30"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontFamily="Fraunces, 'Playfair Display', Georgia, serif"
                          fontSize="15"
                          fontWeight="bold"
                          fill={isDark ? "#FEF08A" : "#3B1E08"}
                          stroke={isDark ? "#D97706" : "none"}
                          strokeWidth={isDark ? "0.4" : "0"}
                          style={{
                            filter: isDark
                              ? "drop-shadow(0 0 2.5px rgba(251,191,36,0.8)) drop-shadow(0 1px 2px rgba(0,0,0,0.9))"
                              : "drop-shadow(0 1px 1px rgba(255,255,255,0.7))",
                          }}
                        >
                          7
                        </text>
                      </svg>
                    </div>

                    {/* Rich Mahogany Double Entrance Doors Container (Interactive Click to Open / Close) */}
                    <div
                      className="relative w-full h-18 sm:h-20 [perspective:700px] cursor-pointer group/door select-none"
                      onClick={() => setIsDoorOpen((prev) => !prev)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setIsDoorOpen((prev) => !prev);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={isDoorOpen ? "Close entrance door" : "Open entrance door"}
                      aria-expanded={isDoorOpen}
                    >
                      {/* Interactive Hover Tooltip */}
                      <div
                        className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-40 px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase border shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover/door:opacity-100 pointer-events-none scale-95 group-hover/door:scale-100 ${
                          isDark
                            ? "bg-[#181424]/95 text-amber-200 border-amber-400/40 shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                            : "bg-white/95 text-[#34154E] border-[#C4B5FD] shadow-[0_4px_16px_rgba(52,21,78,0.2)]"
                        }`}
                      >
                        {isDoorOpen ? "Click to close" : "Click to open door"}
                      </div>

                      {/* 
                        INTERIOR VESTIBULE & FOYER
                        Visible strictly only when double doors are opened
                      */}
                      <div
                        className={`absolute inset-0 border overflow-hidden flex flex-col justify-between transition-opacity duration-500 z-10 ${
                          isDoorOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        } ${
                          isDark
                            ? "bg-[#140D18] border-black"
                            : "bg-[#F5EDE4] border-[#3D2217]"
                        }`}
                        style={{
                          visibility: isDoorOpen ? "visible" : "hidden",
                        }}
                        aria-hidden={!isDoorOpen}
                      >
                        {/* Vestibule ambient illumination */}
                        <div
                          className={`absolute inset-0 transition-opacity duration-700 ${
                            isDark
                              ? "bg-[radial-gradient(ellipse_at_50%_20%,_rgba(254,240,138,0.95)_0%,_rgba(251,191,36,0.65)_35%,_rgba(180,83,9,0.45)_70%,_rgba(20,13,24,0.95)_100%)]"
                              : "bg-[radial-gradient(ellipse_at_50%_20%,_rgba(255,255,255,1)_0%,_rgba(254,243,199,0.9)_40%,_rgba(253,230,138,0.55)_75%,_rgba(230,215,200,0.9)_100%)]"
                          }`}
                        />

                        {/* Vestibule Ceiling & Mini Hanging Brass Chandelier */}
                        <div className="relative z-10 w-full h-3 border-b border-black/30 flex items-center justify-center">
                          <div className="w-[1px] h-1.5 bg-amber-400" />
                          <div className="w-2.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#FBBF24] flex items-center justify-center -mt-0.5">
                            <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                          </div>
                        </div>

                        {/* Foyer Back Wall with Gilded Mirror / Art Frame */}
                        <div className="relative z-10 w-full flex-1 flex items-center justify-center px-3">
                          <div className="w-7 h-5 rounded-[1px] border border-amber-400/80 bg-gradient-to-br from-amber-900/60 to-amber-950/80 p-0.5 shadow-sm flex items-center justify-center">
                            <div className="w-full h-full bg-gradient-to-tr from-amber-200/30 to-white/40 rounded-[0.5px]" />
                          </div>
                        </div>

                        {/* Parquet Herringbone Hardwood Floor & Oriental Hallway Runner Rug */}
                        <div className="relative z-10 w-full h-4 bg-[#45220C] border-t border-black/40 flex items-center justify-center">
                          <div className="w-6 h-full bg-[#881337] border-x border-[#F59E0B] shadow-inner flex items-center justify-center">
                            <div className="w-3.5 h-[1px] bg-amber-300/80" />
                          </div>
                        </div>
                      </div>

                      {/* 
                        3D DOUBLE DOORS (Left Leaf & Right Leaf)
                        Swinging realistically inward into the brownstone vestibule when opened
                      */}
                      <div className="absolute inset-0 flex divide-x pointer-events-none [transform-style:preserve-3d] z-20">
                        {/* Left Door Leaf */}
                        <motion.div
                          animate={{
                            rotateY: isDoorOpen ? -82 : 0,
                          }}
                          transition={{
                            duration: 0.65,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{
                            transformOrigin: "left center",
                          }}
                          className={`w-1/2 h-full p-1 flex flex-col justify-between relative border border-r-0 shadow-md [backface-visibility:hidden] z-20 transition-colors duration-700 ${
                            isDark
                              ? "bg-[#201512] border-black shadow-inner"
                              : "bg-[#4E2719] border-[#2A150D] shadow-md"
                          }`}
                        >
                          {/* Upper wood recessed panel */}
                          <div
                            className={`w-full h-7 rounded-sm border shadow-inner relative overflow-hidden flex items-center justify-center ${
                              isDark ? "bg-[#18110F] border-black/80" : "bg-[#5C3222] border-[#3D2217]"
                            }`}
                          >
                            <div className="w-[85%] h-[75%] rounded-[1px] border border-black/25 bg-black/10 shadow-inner" />
                          </div>
                          {/* Lower wood recessed panel with brass knob */}
                          <div
                            className={`w-full h-8 rounded-sm border shadow-inner relative flex items-center justify-end pr-1.5 ${
                              isDark ? "bg-[#160E0B] border-black" : "bg-[#3D2015] border-[#24130C]"
                            }`}
                          >
                            <div className="absolute inset-1 rounded-[1px] border border-black/20 bg-black/10" />
                            {/* Polished brass lever handle & keyhole escutcheon */}
                            <div className="relative z-10 w-1.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_4px_#F59E0B] flex flex-col items-center justify-center">
                              <div className="w-[1px] h-1 bg-black/70" />
                            </div>
                          </div>
                          {/* Brass kickplate */}
                          <div className="w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-[1px] shadow-sm -mt-0.5" />
                        </motion.div>

                        {/* Right Door Leaf */}
                        <motion.div
                          animate={{
                            rotateY: isDoorOpen ? 82 : 0,
                          }}
                          transition={{
                            duration: 0.65,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{
                            transformOrigin: "right center",
                          }}
                          className={`w-1/2 h-full p-1 flex flex-col justify-between relative border border-l-0 shadow-md [backface-visibility:hidden] z-20 transition-colors duration-700 ${
                            isDark
                              ? "bg-[#201512] border-black shadow-inner"
                              : "bg-[#4E2719] border-[#2A150D] shadow-md"
                          }`}
                        >
                          {/* Upper wood recessed panel */}
                          <div
                            className={`w-full h-7 rounded-sm border shadow-inner relative overflow-hidden flex items-center justify-center ${
                              isDark ? "bg-[#18110F] border-black/80" : "bg-[#5C3222] border-[#3D2217]"
                            }`}
                          >
                            <div className="w-[85%] h-[75%] rounded-[1px] border border-black/25 bg-black/10 shadow-inner" />
                          </div>
                          {/* Lower wood recessed panel with mail slot & knob */}
                          <div
                            className={`w-full h-8 rounded-sm border shadow-inner relative flex items-center justify-between px-1 ${
                              isDark ? "bg-[#160E0B] border-black" : "bg-[#3D2015] border-[#24130C]"
                            }`}
                          >
                            <div className="absolute inset-1 rounded-[1px] border border-black/20 bg-black/10" />
                            {/* Brass mail slot */}
                            <div className="relative z-10 w-4 h-1 rounded-[0.5px] bg-amber-500 shadow-[inset_0_0.5px_0.5px_black]" />
                            {/* Brass handle */}
                            <div className="relative z-10 w-1.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_4px_#F59E0B] flex flex-col items-center justify-center">
                              <div className="w-[1px] h-1 bg-black/70" />
                            </div>
                          </div>
                          {/* Brass kickplate */}
                          <div className="w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-[1px] shadow-sm -mt-0.5" />
                        </motion.div>
                      </div>

                      {/* Warm light spill spilling forward onto the stoop when open */}
                      <AnimatePresence>
                        {isDoorOpen && (
                          <motion.div
                            initial={{ opacity: 0, scaleY: 0.7 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0.7 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-32 sm:w-44 h-10 pointer-events-none z-30"
                            style={{
                              background: isDark
                                ? "radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.7) 0%, rgba(251, 191, 36, 0.4) 40%, transparent 75%)"
                                : "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.8) 0%, rgba(254, 243, 199, 0.5) 45%, transparent 75%)",
                              filter: "blur(2px)",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Left Vintage Wall Carriage Lantern */}
                <div className="absolute top-16 -left-6 z-30 flex items-center">
                  <div className={`w-2 h-[1.5px] ${isDark ? "bg-white/40" : "bg-[#4C3F6D]"}`} />
                  <div
                    className={`w-3.5 h-5 rounded-t-sm border flex flex-col items-center justify-around p-0.5 transition-colors duration-700 ${
                      isDark ? "bg-black border-amber-400/40" : "bg-[#3D3352] border-[#5E4E7E]"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-2 rounded-full transition-all duration-700 ${
                        isDark ? "bg-[#FEF08A] shadow-[0_0_12px_4px_#FBBF24,_0_0_24px_8px_rgba(251,191,36,0.5)]" : "bg-white/80"
                      }`}
                    />
                  </div>
                </div>

                {/* Right Vintage Wall Carriage Lantern */}
                <div className="absolute top-16 -right-6 z-30 flex items-center flex-row-reverse">
                  <div className={`w-2 h-[1.5px] ${isDark ? "bg-white/40" : "bg-[#4C3F6D]"}`} />
                  <div
                    className={`w-3.5 h-5 rounded-t-sm border flex flex-col items-center justify-around p-0.5 transition-colors duration-700 ${
                      isDark ? "bg-black border-amber-400/40" : "bg-[#3D3352] border-[#5E4E7E]"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-2 rounded-full transition-all duration-700 ${
                        isDark ? "bg-[#FEF08A] shadow-[0_0_12px_4px_#FBBF24,_0_0_24px_8px_rgba(251,191,36,0.5)]" : "bg-white/80"
                      }`}
                    />
                  </div>
                </div>

                {/* 
                  REALISTIC 4-STEP LIMESTONE BROWNSTONE STOOP
                  With Cast-Iron Railings & Topiary Planter Urns
                */}
                <div className="relative flex flex-col items-center w-full mt-0">
                  {/* Coir Welcome Mat on Top Landing */}
                  <div className="w-20 h-1 rounded-sm bg-[#B45309]/80 border border-[#92400E] shadow-inner mb-0.5 flex items-center justify-center">
                    <span className="text-[5px] uppercase font-bold text-amber-200 tracking-widest scale-75">
                      WELCOME
                    </span>
                  </div>

                  {/* Step 1 */}
                  <div
                    className={`w-42 sm:w-50 h-2 rounded-t-[1px] border-t shadow-sm transition-colors duration-700 ${
                      isDark ? "bg-[#252033] border-white/20" : "bg-[#BAACCE] border-white"
                    }`}
                  />
                  {/* Step 2 */}
                  <div
                    className={`w-46 sm:w-54 h-2 border-t shadow-sm transition-colors duration-700 ${
                      isDark ? "bg-[#201B2E] border-white/15" : "bg-[#B0A1C4] border-white/80"
                    }`}
                  />
                  {/* Step 3 */}
                  <div
                    className={`w-50 sm:w-58 h-2.5 border-t shadow-sm transition-colors duration-700 ${
                      isDark ? "bg-[#1B1727] border-white/10" : "bg-[#A595B9] border-white/60"
                    }`}
                  />
                  {/* Step 4 (Bottom Step) */}
                  <div
                    className={`w-54 sm:w-62 h-2.5 border-t shadow-md transition-colors duration-700 ${
                      isDark ? "bg-[#161222] border-white/10" : "bg-[#9A8AA9] border-white/50"
                    }`}
                  />

                  {/* Left & Right Wrought-Iron Stoop Handrail Posts */}
                  <div className="absolute inset-y-0 left-0 w-3 flex flex-col justify-between items-center pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-sm" />
                    <div className="w-[1.5px] h-full bg-black/80" />
                  </div>
                  <div className="absolute inset-y-0 right-0 w-3 flex flex-col justify-between items-center pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-sm" />
                    <div className="w-[1.5px] h-full bg-black/80" />
                  </div>

                  {/* Left Topiary Boxwood Urn */}
                  <div className="absolute -bottom-1 -left-5 z-20 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-700 border border-emerald-900 shadow-md" />
                    <div className="w-3.5 h-2.5 rounded-b-sm bg-[#9A3412] border-t border-[#7C2D12]" />
                  </div>

                  {/* Right Topiary Boxwood Urn */}
                  <div className="absolute -bottom-1 -right-5 z-20 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-700 border border-emerald-900 shadow-md" />
                    <div className="w-3.5 h-2.5 rounded-b-sm bg-[#9A3412] border-t border-[#7C2D12]" />
                  </div>
                </div>
              </div>

              {/* Right Ground Floor Basement Casement Grate */}
              <div
                className={`w-14 sm:w-20 h-10 rounded-t-sm border shadow-inner flex flex-col justify-around py-1.5 px-1.5 mb-1 transition-colors duration-700 ${
                  isDark ? "bg-[#08060E] border-white/10" : "bg-[#8E7EAA] border-[#685980]"
                }`}
              >
                <div className={`w-full h-[1px] ${isDark ? "bg-white/20" : "bg-white/40"}`} />
                <div className={`w-full h-[1px] ${isDark ? "bg-white/20" : "bg-white/40"}`} />
                <div className={`w-full h-[1px] ${isDark ? "bg-white/20" : "bg-white/40"}`} />
              </div>
            </div>
          </div>

          {/* 
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            REALISTIC STREET & SIDEWALK WITH WAVING GIRL
            - Scored concrete sidewalk flags & expansion control joints
            - Manhole cover plate & utility water cap
            - Grounded cast-iron street lamp with anchor bolts
            - Real girl standing on sidewalk smiling and waving her hand
            - Granite curb with storm sewer drain
            - Asphalt road surface with painted markings & reflections
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
          */}
          <div className="relative w-full z-30 select-none">
            {/* 1. Sidewalk Concrete Pavement */}
            <div
              className={`relative w-full h-18 sm:h-20 border-t shadow-inner flex items-end justify-between px-4 sm:px-10 transition-colors duration-700 overflow-visible ${
                isDark ? "bg-[#110F1C] border-[#221C30]" : "bg-[#D8D0E5] border-[#BFB2D1]"
              }`}
            >
              {/* Expansion control joint scoring lines */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 pointer-events-none opacity-30 ${
                  isDark
                    ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px)]"
                    : "bg-[linear-gradient(to_right,rgba(0,0,0,0.18)_1px,transparent_1px)]"
                } [background-size:64px_100%]`}
              />

              {/* Longitudinal sidewalk pavement seam */}
              <div
                className={`absolute top-1/2 inset-x-0 h-[1px] ${
                  isDark ? "bg-white/10" : "bg-black/15"
                }`}
              />

              {/* Circular Cast-Iron Utility Manhole Cover */}
              <div className="absolute bottom-3 left-1/4 sm:left-1/3 w-8 sm:w-10 h-3 rounded-full border border-black/60 bg-[#1F1B2E] shadow-inner flex items-center justify-center opacity-85">
                <div className="w-5 sm:w-6 h-1.5 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-black/80" />
                </div>
              </div>

              {/* Rectangular "WATER" Utility Cap */}
              <div className="absolute bottom-4 left-1/2 -translate-x-12 w-4 h-2 rounded-[1px] border border-black/70 bg-[#251F33] flex items-center justify-center opacity-75">
                <div className="w-2 h-0.5 bg-black/60" />
              </div>

              {/* 
                FREESTANDING VICTORIAN STREET LIGHT
                Firmly anchored into sidewalk with pedestal & mounting bolts
              */}
              <div className="absolute -top-34 sm:-top-42 left-4 sm:left-8 md:left-14 z-40 flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  {/* Spire Finial */}
                  <div
                    className={`w-1 sm:w-1.5 h-3 sm:h-4 rounded-t-full transition-colors duration-700 ${
                      isDark ? "bg-[#352F44]" : "bg-[#4C3F6D]"
                    }`}
                  />
                  {/* Lantern Hood Roof */}
                  <div
                    className={`w-8 sm:w-10 h-2.5 sm:h-3 rounded-t-sm border-t transition-colors duration-700 ${
                      isDark ? "bg-[#1E1B28] border-white/20" : "bg-[#3E3355] border-[#5E4E7E]"
                    }`}
                  />
                  {/* Lantern Glass Chamber */}
                  <div
                    className={`relative w-7 sm:w-9 h-9 sm:h-11 border-x border-b rounded-b-sm flex items-center justify-center overflow-hidden transition-all duration-700 ${
                      isDark
                        ? "bg-amber-400/25 border-amber-300/40 shadow-[0_0_26px_9px_rgba(251,191,36,0.5)]"
                        : "bg-white/40 border-[#4C3F6D]/50 shadow-sm"
                    }`}
                  >
                    {/* Glowing Filament Bulb */}
                    <div
                      className={`rounded-full transition-all duration-700 ${
                        isDark
                          ? "w-3 h-3.5 bg-white shadow-[0_0_14px_4px_#FBBF24,_0_0_32px_10px_rgba(251,191,36,0.7)]"
                          : "w-1.5 h-2.5 bg-[#6E5D87]/70"
                      }`}
                    />
                    {/* Glass pane dividers */}
                    <div className="absolute inset-0 flex justify-between pointer-events-none px-1.5">
                      <div className={`w-[1px] h-full ${isDark ? "bg-black/40" : "bg-[#4C3F6D]/30"}`} />
                      <div className={`w-[1px] h-full ${isDark ? "bg-black/40" : "bg-[#4C3F6D]/30"}`} />
                    </div>
                  </div>

                  {/* Volumetric street light cone in dark mode */}
                  {isDark && (
                    <div
                      aria-hidden="true"
                      className="absolute top-12 -left-22 -right-22 h-60 pointer-events-none opacity-85"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 75% at 50% 0%, rgba(251,191,36,0.45) 0%, rgba(245,158,11,0.22) 48%, transparent 75%)",
                        clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)",
                      }}
                    />
                  )}
                </div>

                {/* Lantern Base Ring */}
                <div
                  className={`w-7 sm:w-9 h-1.5 rounded-full -mt-0.5 transition-colors duration-700 ${
                    isDark ? "bg-[#252132]" : "bg-[#4C3F6D]"
                  }`}
                />

                {/* Fluted Cast-Iron Pole */}
                <div
                  className={`w-2 sm:w-2.5 h-28 sm:h-38 rounded-t-sm shadow-md transition-colors duration-700 relative flex items-center justify-center ${
                    isDark
                      ? "bg-gradient-to-r from-[#171422] via-[#2A253A] to-[#171422]"
                      : "bg-gradient-to-r from-[#3C3252] via-[#5C4D78] to-[#3C3252]"
                  }`}
                >
                  {/* Decorative horizontal ladder rest bar */}
                  <div
                    className={`absolute top-5 w-6 sm:w-7 h-[1.5px] rounded-full ${
                      isDark ? "bg-[#3D354E]" : "bg-[#6D5D85]"
                    }`}
                  />
                </div>

                {/* Fluted Octagonal Pedestal Base */}
                <div
                  className={`w-5 sm:w-6 h-6 sm:h-7 rounded-b-sm border-t shadow-2xl transition-colors duration-700 ${
                    isDark ? "bg-[#181524] border-white/10" : "bg-[#43385B] border-white/20"
                  }`}
                />

                {/* Anchor Plate with Hex Mounting Bolts */}
                <div
                  className={`w-8 sm:w-9 h-1.5 rounded-sm border-t flex justify-around items-center px-1 transition-colors duration-700 ${
                    isDark ? "bg-[#211D30] border-black" : "bg-[#4E3F68] border-[#302544]"
                  }`}
                >
                  <div className="w-1 h-1 rounded-full bg-black/80" />
                  <div className="w-1 h-1 rounded-full bg-black/80" />
                </div>

                {/* Ground Light Radiance Pool on Sidewalk */}
                <div
                  className={`w-14 h-3 rounded-full blur-[2px] -mt-1 ${
                    isDark
                      ? "bg-amber-400/35 shadow-[0_0_14px_rgba(251,191,36,0.6)]"
                      : "bg-black/15"
                  }`}
                />
              </div>

              {/* 
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                GIRL ON THE STREET STANDING & SMILING & WAVING!
                - Standing firmly on the concrete sidewalk pavement
                - Warm friendly smile, animated waving hand
                - Interactive greeting speech bubble on hover/tap
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              */}
              <div className="absolute bottom-2 sm:bottom-2.5 right-20 sm:right-32 md:right-44 z-40">
                <WavingGirlCharacter isDark={isDark} />
              </div>

              {/* VINTAGE FIRE HYDRANT */}
              <div className="absolute bottom-2 right-4 sm:right-10 md:right-14 z-30 flex flex-col items-center">
                <div className="w-2 h-1 bg-amber-400/80 rounded-t-sm" />
                <div
                  className={`w-5 h-2.5 rounded-t-sm border-t transition-colors duration-700 ${
                    isDark ? "bg-[#881337] border-red-400/30" : "bg-[#9F1239] border-red-300"
                  }`}
                />
                <div className="relative flex items-center">
                  <div className="w-1 h-2 bg-amber-400/80 -mr-0.5" />
                  <div
                    className={`w-4 h-6 transition-colors duration-700 ${
                      isDark ? "bg-[#9F1239]" : "bg-[#BE123C]"
                    }`}
                  />
                  <div className="w-1 h-2 bg-amber-400/80 -ml-0.5" />
                </div>
                <div
                  className={`w-6 h-1.5 rounded-sm transition-colors duration-700 ${
                    isDark ? "bg-[#4C0519]" : "bg-[#881337]"
                  }`}
                />
              </div>
            </div>

            {/* 2. Heavy Granite Curb with Storm Sewer Drain */}
            <div
              className={`w-full h-3.5 border-t transition-colors duration-700 shadow-md relative flex items-center justify-between px-10 ${
                isDark ? "bg-[#1E1B2C] border-[#2E283F]" : "bg-[#BAAFD0] border-[#9F91B8]"
              }`}
            >
              {/* Curbstone Vertical Joint Seams */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 pointer-events-none opacity-40 ${
                  isDark
                    ? "bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_1px,transparent_1px)]"
                    : "bg-[linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_1px)]"
                } [background-size:90px_100%]`}
              />

              {/* Built-in Cast-Iron Storm Sewer Curb Inlet Drain */}
              <div className="absolute right-32 sm:right-48 w-12 h-2 rounded-[1px] bg-black/90 border border-white/10 flex items-center justify-around px-1 z-10 shadow-inner">
                <div className="w-1 h-full bg-white/20" />
                <div className="w-1 h-full bg-white/20" />
                <div className="w-1 h-full bg-white/20" />
              </div>
            </div>

            {/* 
              3. Asphalt Street Roadway
              - Realistic dark aggregate texture
              - Painted white pedestrian road markings
              - Wet-street specular light puddles in dark mode
            */}
            <div
              className={`w-full h-12 sm:h-14 transition-colors duration-700 shadow-[inset_0_4px_12px_rgba(0,0,0,0.85)] relative overflow-hidden flex items-center justify-around px-4 ${
                isDark ? "bg-[#090710]" : "bg-[#9284A8]"
              }`}
            >
              <div className="absolute inset-0 bg-noise opacity-25 pointer-events-none" />

              {/* Painted White Road Markings (Weathered Crosswalk / Lane Stripes) */}
              <div className="w-full flex justify-around opacity-60">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 sm:w-10 h-1.5 rounded-[1px] transition-colors duration-700 ${
                      isDark ? "bg-white/40 shadow-[0_0_4px_rgba(255,255,255,0.15)]" : "bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Wet Asphalt Specular Radiance Reflection from Street Lamp */}
              {isDark && (
                <div className="absolute top-0 left-4 sm:left-8 md:left-14 w-36 sm:w-52 h-full bg-gradient-to-b from-amber-400/25 via-amber-400/8 to-transparent blur-[3px]" />
              )}

              {/* Wet Asphalt Specular Radiance from Entrance Lanterns */}
              {isDark && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 sm:w-60 h-full bg-gradient-to-b from-amber-400/15 via-amber-400/5 to-transparent blur-[4px]" />
              )}
            </div>
          </div>
        </motion.div>
      </main>

      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        MAIN PAGE FOOTER SECTION (ATTACHED DIRECTLY WITH NO GAP)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <div className="w-full relative z-30 mt-0 pt-0">
        <ContactSection
          onOpenTalk={onOpenContact || (() => {})}
          onNavigate={onNavigateSection}
        />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WIDE BUILDING WINDOW COMPONENT
// - Detailed unlit appearance: unique curtains, blinds, & silhouettes
// - When hovered: Directional colored downlight beam & editorial text
// - Light mode: Airy pastel sunlit room & crisp dark text
// - Night mode: Cinematic illuminated room with radiant beam
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface BuildingWideWindowProps {
  isDark: boolean;
  isInteractive: boolean;
  isActive: boolean;
  data?: InteractiveWindowData;
  detail: WindowDetailConfig;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

function BuildingWideWindow({
  isDark,
  isInteractive,
  isActive,
  data,
  detail,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
}: BuildingWideWindowProps) {
  const config = data
    ? isDark
      ? COLOR_CONFIGS[data.color].dark
      : COLOR_CONFIGS[data.color].light
    : null;

  return (
    <div
      tabIndex={isInteractive ? 0 : -1}
      role={isInteractive ? "button" : "presentation"}
      aria-label={
        isInteractive && data ? `${data.title} - ${data.kicker}` : "Building window"
      }
      aria-expanded={isInteractive ? isActive : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`group relative w-full aspect-[1.32/1] rounded-[4px] select-none outline-none transition-all duration-700 ease-out ${
        isInteractive
          ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12101A]"
          : "pointer-events-none"
      }`}
    >
      {/* 0. ARCHITECTURAL STONE LINTEL & KEYSTONE ABOVE WINDOW */}
      <div
        className={`absolute -top-1.5 inset-x-[-2px] h-[3px] rounded-t-[1px] border-t transition-colors duration-700 pointer-events-none z-10 ${
          isDark
            ? "bg-[#252033] border-white/15 shadow-[0_-1px_2px_rgba(0,0,0,0.8)]"
            : "bg-[#BAACCE] border-white shadow-[0_-1px_2px_rgba(52,21,78,0.08)]"
        }`}
      />
      <div
        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 sm:w-3 h-[4px] rounded-t-[1px] border-t border-x transition-colors duration-700 pointer-events-none z-20 ${
          isDark
            ? "bg-[#2A243A] border-white/20"
            : "bg-[#C4B7D6] border-white"
        }`}
      />

      {/* 1. RECESSED STONE REVEAL SPLAY & CASING */}
      <div
        style={{
          boxShadow: isActive && config ? config.windowGlow : undefined,
          borderColor:
            isActive && config
              ? config.borderActive
              : isDark
              ? "rgba(142,126,168,0.35)"
              : "rgba(109,85,138,0.45)",
        }}
        className={`absolute inset-0 rounded-[4px] transition-all duration-700 ease-out border-[2px] ${
          isActive
            ? "border-opacity-100"
            : isDark
            ? "border-[#4A3D63] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),_0_1px_3px_rgba(255,255,255,0.05)]"
            : "border-[#85769D] shadow-[inset_0_3px_8px_rgba(52,21,78,0.2)]"
        }`}
      />

      {/* 2. GLASS SURFACE & ROOM INTERIOR */}
      <div
        className={`absolute inset-[3px] rounded-[3px] overflow-hidden transition-all duration-700 ease-out border ${
          isActive && config
            ? isDark
              ? "border-[#A798C5]/60"
              : "border-[#4C3F6D]/50"
            : isDark
            ? "bg-[#090810] opacity-95 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] border-[#8E7EA8]/45"
            : "bg-gradient-to-br from-[#E2E8F0]/90 via-[#CBD5E1]/85 to-[#94A3B8]/90 opacity-95 shadow-[inset_0_1px_5px_rgba(52,21,78,0.15)] border-[#5E4F77]/60"
        }`}
        style={{
          backgroundColor: isActive && config ? config.wallBackground : undefined,
        }}
      >
        {/* 
          UNLIT STATE: INDIVIDUALIZED ARCHITECTURAL DETAILS PER WINDOW
          - Unique drapery, blinds, roller shades, and silhouettes
        */}
        {!isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Specular glass reflection angle */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: `linear-gradient(${detail.specularAngle}, rgba(255,255,255,${
                  isDark ? "0.06" : "0.55"
                }) 0%, transparent 60%)`,
              }}
            />

            {/* A. Curtains & Blind Variations */}
            {detail.blindStyle === "drapes-split" && (
              <>
                {/* Left Drape with gentle folds */}
                <div
                  className={`absolute top-0 bottom-0 left-0 w-3 sm:w-4 z-10 transition-colors duration-500 border-r border-black/20 ${
                    isDark
                      ? "bg-gradient-to-r from-[#171422] via-[#14121E] to-transparent"
                      : "bg-gradient-to-r from-[#8E7EAA] via-[#8E7EAA]/80 to-transparent"
                  }`}
                />
                {/* Right Drape with gentle folds */}
                <div
                  className={`absolute top-0 bottom-0 right-0 w-3 sm:w-4 z-10 transition-colors duration-500 border-l border-black/20 ${
                    isDark
                      ? "bg-gradient-to-l from-[#171422] via-[#14121E] to-transparent"
                      : "bg-gradient-to-l from-[#8E7EAA] via-[#8E7EAA]/80 to-transparent"
                  }`}
                />
              </>
            )}

            {detail.blindStyle === "drapes-left" && (
              <div
                className={`absolute top-0 bottom-0 left-0 w-4.5 sm:w-6 z-10 transition-colors duration-500 border-r border-black/20 ${
                  isDark
                    ? "bg-gradient-to-r from-[#1A1626] to-transparent"
                    : "bg-gradient-to-r from-[#7D6D99]/90 to-transparent"
                }`}
              />
            )}

            {detail.blindStyle === "blinds-half" && (
              <div
                className={`absolute top-0 inset-x-0 h-1/2 z-10 transition-opacity duration-500 ${
                  isDark ? "opacity-60" : "opacity-45"
                } bg-[repeating-linear-gradient(to_bottom,transparent,transparent_4px,rgba(255,255,255,0.45)_4px,rgba(255,255,255,0.45)_5px)] border-b border-[#8E7EA8]/40`}
              />
            )}

            {detail.blindStyle === "blinds-three-quarter" && (
              <div
                className={`absolute top-0 inset-x-0 h-3/4 z-10 transition-opacity duration-500 ${
                  isDark ? "opacity-60" : "opacity-45"
                } bg-[repeating-linear-gradient(to_bottom,transparent,transparent_4px,rgba(255,255,255,0.45)_4px,rgba(255,255,255,0.45)_5px)] border-b border-[#8E7EA8]/40`}
              />
            )}

            {detail.blindStyle === "shade-half" && (
              <div
                className={`absolute top-0 inset-x-0 h-2/5 z-10 border-b flex justify-center items-end pb-0.5 transition-colors duration-500 ${
                  isDark
                    ? "bg-[#181424] border-black/80 shadow-sm"
                    : "bg-[#D1C5E2] border-[#8D7D9F] shadow-sm"
                }`}
              >
                {/* Pull ring string */}
                <div
                  className={`w-[1px] h-2.5 ${isDark ? "bg-white/35" : "bg-black/35"}`}
                />
              </div>
            )}

            {/* B. Subtle Window Sill Silhouettes */}
            {detail.silhouette === "plant" && (
              <div className="absolute bottom-1 right-2 z-10 flex flex-col items-center opacity-75">
                <div
                  className={`w-2.5 sm:w-3 h-2 rounded-t-full ${
                    isDark ? "bg-[#06050A]" : "bg-[#524467]"
                  }`}
                />
                <div
                  className={`w-2 sm:w-2.5 h-1.5 rounded-b-sm ${
                    isDark ? "bg-[#161220]" : "bg-[#71618A]"
                  }`}
                />
              </div>
            )}

            {detail.silhouette === "lamp-off" && (
              <div className="absolute bottom-1 left-2 z-10 flex flex-col items-start opacity-75">
                <div
                  className={`w-2 h-1.5 -rotate-12 rounded-t-sm ${
                    isDark ? "bg-[#06050A]" : "bg-[#524467]"
                  }`}
                />
                <div
                  className={`w-[1px] h-2.5 ml-1 ${
                    isDark ? "bg-[#161220]" : "bg-[#71618A]"
                  }`}
                />
              </div>
            )}

            {detail.silhouette === "books" && (
              <div className="absolute bottom-1 right-2 z-10 flex flex-col items-end opacity-75">
                <div
                  className={`w-3.5 h-1 rounded-sm mb-0.5 ${
                    isDark ? "bg-[#141020]" : "bg-[#6D5D85]"
                  }`}
                />
                <div
                  className={`w-4 h-1 rounded-sm ${
                    isDark ? "bg-[#0B0912]" : "bg-[#544669]"
                  }`}
                />
              </div>
            )}

            {detail.silhouette === "frame" && (
              <div className="absolute bottom-1 left-3 z-10 opacity-75">
                <div
                  className={`w-2.5 h-3 rounded-[1px] border ${
                    isDark ? "border-white/10 bg-[#07050D]" : "border-[#524467] bg-[#B0A2C3]"
                  }`}
                />
              </div>
            )}
          </div>
        )}

        {/* ACTIVE STATE: DIRECTIONAL LIGHT BEAM & AIRY INTERIOR */}
        {isActive && config && data && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-600 ease-out">
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: config.beamGradient,
              }}
            />

            <div
              className={`absolute top-0 inset-x-0 h-4 bg-gradient-to-b ${config.soffitGradient} border-b border-black/20`}
            />

            {/* Ceiling Lamp Fixture */}
            <div className="absolute top-1.5 sm:top-2 right-3 sm:right-5 flex flex-col items-center">
              <div
                className={`w-8 sm:w-10 h-3 sm:h-3.5 rounded-full border flex items-center justify-center shadow-lg transition-colors duration-500 ${
                  isDark ? "bg-black/75 border-white/20" : "bg-[#3D3352]/85 border-white/40"
                }`}
              >
                <div
                  className="w-5 sm:w-6 h-2 sm:h-2.5 rounded-full bg-white transition-all duration-500"
                  style={{
                    backgroundColor: config.lampBulb,
                    boxShadow: `0 0 12px 3px ${config.lampGlow}, 0 0 24px 6px ${config.lampGlow}`,
                  }}
                />
              </div>
            </div>

            {/* Directional Conical Light Beam */}
            <div
              className="absolute inset-0 pointer-events-none opacity-85 transition-opacity duration-700"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 35%, transparent 75%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.25) 35%, transparent 75%)",
                clipPath: "polygon(82% 10%, 0% 32%, 0% 100%, 100% 100%, 100% 14%)",
              }}
            />

            {/* Stair Railing Foreground Silhouette */}
            <div className="absolute -bottom-2 -left-2 right-0 h-10 pointer-events-none opacity-80 flex flex-col justify-end">
              <div
                className="w-[110%] h-1 sm:h-1.5 -rotate-[11deg] origin-bottom-left shadow-md transition-colors duration-500"
                style={{ backgroundColor: config.railColor }}
              />
              <div className="w-full flex justify-between px-2 pb-0.5">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[1px] sm:w-[1.5px] h-6 sm:h-7 opacity-70"
                    style={{ backgroundColor: config.railColor }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />

            {/* Text Overlay */}
            <div className="absolute inset-0 p-2 sm:p-3 md:p-3.5 flex flex-col justify-between z-20 pointer-events-none select-none">
              <div className="flex items-center justify-between">
                <span
                  className="font-sora text-[8px] sm:text-[9.5px] md:text-[10px] font-bold uppercase tracking-[0.18em] drop-shadow-sm"
                  style={{ color: config.kickerColor }}
                >
                  {data.kicker}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                  style={{ backgroundColor: config.badgeDot, color: config.badgeDot }}
                />
              </div>

              <div
                className={`mt-auto -mx-2 -mb-2 sm:-mx-3 sm:-mb-3 md:-mx-3.5 md:-mb-3.5 p-2 sm:p-2.5 md:p-3 pt-3 sm:pt-4 rounded-b-[3px] ${config.textCardBg}`}
              >
                <h3
                  className="font-fraunces text-[12px] sm:text-[14px] md:text-[15px] font-bold tracking-tight leading-tight drop-shadow-sm"
                  style={{ color: config.titleColor }}
                >
                  {data.title}
                </h3>
                <p
                  className="mt-1 font-sora text-[9.5px] sm:text-[11px] md:text-[11.5px] leading-[1.32] sm:leading-[1.38] font-normal line-clamp-3 sm:line-clamp-4"
                  style={{ color: config.noteColor }}
                >
                  {data.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. DOUBLE-HUNG SASH MUNTINS & CHECK RAIL */}
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col divide-y-[2px] z-10 transition-colors duration-700 ${
            isActive && !isDark
              ? "divide-[#4C3F6D]/60"
              : isActive
              ? "divide-[#A798C5]"
              : isDark
              ? "divide-[#8E7EA8] shadow-[0_0_2px_rgba(0,0,0,0.95)]"
              : "divide-[#5E4F77]/80"
          }`}
        >
          {/* Upper Sash with Central Muntin */}
          <div
            className={`flex-1 flex divide-x-[2px] relative ${
              isActive && !isDark
                ? "divide-[#4C3F6D]/60"
                : isActive
                ? "divide-[#A798C5]"
                : isDark
                ? "divide-[#8E7EA8]"
                : "divide-[#5E4F77]/80"
            }`}
          >
            <div className="flex-1" />
            <div className="flex-1" />
          </div>

          {/* Lower Sash with Meeting Check Rail & Central Muntin */}
          <div
            className={`flex-1 flex divide-x-[2px] relative ${
              isActive && !isDark
                ? "divide-[#4C3F6D]/60"
                : isActive
                ? "divide-[#A798C5]"
                : isDark
                ? "divide-[#8E7EA8]"
                : "divide-[#5E4F77]/80"
            }`}
          >
            {/* Center Brass Sash Cam Lock Accent */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-full bg-amber-400/90 shadow-[0_0_3px_black] z-20 pointer-events-none" />
            <div className="flex-1" />
            <div className="flex-1" />
          </div>
        </div>
      </div>

      {/* 4. PROTRUDING ARCHITECTURAL STONE WINDOW SILL */}
      <div
        className="absolute -bottom-1.5 inset-x-[-3px] h-[4px] rounded-[1px] transition-all duration-700 ease-out z-20"
        style={{
          backgroundColor:
            isActive && config
              ? config.sillGlow
              : isDark
              ? "#1E1A29"
              : "#B0A2C5",
          boxShadow:
            isActive && config
              ? `0 2px 8px ${config.sillGlow}`
              : isDark
              ? "0 3px 5px rgba(0,0,0,0.95)"
              : "0 2px 4px rgba(52,21,78,0.25)",
          borderTop:
            isActive && config
              ? "1px solid rgba(255,255,255,0.7)"
              : isDark
              ? "1px solid rgba(255,255,255,0.18)"
              : "1px solid rgba(255,255,255,0.9)",
        }}
      />
    </div>
  );
}
