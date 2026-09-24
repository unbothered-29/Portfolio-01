import React, { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { WavingGirlCharacter } from "./WavingGirlCharacter";
import { CelestialOrb } from "./CelestialOrb";

export interface InteractiveWindowData {
  id: string;
  floor: number; // 0 to 3 (0 is top floor, 3 is ground floor)
  col: number; // 0 to 3 (4 columns)
  number: string;
  label: string;
  sentence: string;
  accessibleLabel: string;
}

export const INTERACTIVE_WINDOWS: InteractiveWindowData[] = [
  {
    id: "window-builder",
    floor: 0, // Row 1 (Top floor), Col 1 (2nd from left)
    col: 1,
    number: "01",
    label: "BUILDER",
    sentence: "I like turning ideas into interfaces.",
    accessibleLabel: "Discover bit 1: Builder",
  },
  {
    id: "window-detail",
    floor: 1, // Row 2, Col 3 (4th from left)
    col: 3,
    number: "02",
    label: "DETAIL",
    sentence: "I care about the little things people notice later.",
    accessibleLabel: "Discover bit 2: Detail",
  },
  {
    id: "window-collaborator",
    floor: 2, // Row 3, Col 0 (1st from left)
    col: 0,
    number: "03",
    label: "COLLABORATOR",
    sentence: "Some of my best ideas start with other people.",
    accessibleLabel: "Discover bit 3: Collaborator",
  },
  {
    id: "window-elsewhere",
    floor: 3, // Row 4 (Ground floor), Col 2 (3rd from left)
    col: 2,
    number: "04",
    label: "ELSEWHERE",
    sentence: "Some ideas are found outside the screen.",
    accessibleLabel: "Discover bit 4: Elsewhere",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INDIVIDUAL WINDOW ARCHITECTURAL DETAILS MATRIX (4x4)
// Adds natural architectural variation so windows don't look robotic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface WindowDetailConfig {
  blindStyle:
    | "drapes-ochre"
    | "drapes-emerald"
    | "drapes-terracotta"
    | "drapes-navy"
    | "curtains-sheer"
    | "curtains-cafe"
    | "curtains-austrian"
    | "drapes-split"
    | "drapes-left"
    | "blinds-half"
    | "blinds-three-quarter"
    | "shade-half"
    | "minimal";
  silhouette?:
    | "hanging-ivy"
    | "books-coffee"
    | "glow-lamp"
    | "lush-monstera"
    | "art-easel"
    | "clock-turntable"
    | "flower-box";
  specularAngle: string;
}

const WINDOW_DETAILS: WindowDetailConfig[][] = [
  // Floor 0 (Top floor)
  [
    { blindStyle: "drapes-ochre", silhouette: "lush-monstera", specularAngle: "125deg" }, // Royal Purple Velvet Split Drapes with Potted Monstera
    { blindStyle: "blinds-half", specularAngle: "135deg" }, // Interactive Blue
    { blindStyle: "shade-half", silhouette: "books-coffee", specularAngle: "145deg" }, // Minimalist Roller Shade
    { blindStyle: "blinds-three-quarter", silhouette: "hanging-ivy", specularAngle: "130deg" }, // Architectural Horizontal Blinds
  ],
  // Floor 1
  [
    { blindStyle: "shade-half", silhouette: "art-easel", specularAngle: "140deg" }, // Studio Roller Shade
    { blindStyle: "drapes-terracotta", silhouette: "lush-monstera", specularAngle: "120deg" }, // Purple Left-Swept Drape
    { blindStyle: "blinds-half", silhouette: "glow-lamp", specularAngle: "135deg" }, // Horizontal Blinds with Warm Lamp
    { blindStyle: "curtains-sheer", specularAngle: "150deg" }, // Interactive Green - Romantic Lavender Lace Curtains & Scalloped Pelmet
  ],
  // Floor 2
  [
    { blindStyle: "blinds-three-quarter", specularAngle: "130deg" }, // Interactive Yellow
    { blindStyle: "curtains-cafe", silhouette: "clock-turntable", specularAngle: "145deg" }, // European Bistro Half-Window Cafe Curtains
    { blindStyle: "drapes-emerald", silhouette: "glow-lamp", specularAngle: "125deg" }, // Deep Plum Velvet Drapes with Banker's Lamp
    { blindStyle: "blinds-half", silhouette: "hanging-ivy", specularAngle: "140deg" }, // Half Blinds
  ],
  // Floor 3 (Ground floor)
  [
    { blindStyle: "blinds-half", silhouette: "flower-box", specularAngle: "135deg" }, // Flower Box Balcony
    { blindStyle: "drapes-navy", silhouette: "books-coffee", specularAngle: "120deg" }, // Purple Right-Swept Drape
    { blindStyle: "shade-half", specularAngle: "140deg" }, // Interactive Red
    { blindStyle: "curtains-austrian", silhouette: "flower-box", specularAngle: "130deg" }, // Scalloped Austrian Balloon Cloud Valance with Flowers
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
  const hoverIntentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (hoverIntentTimerRef.current) {
        clearTimeout(hoverIntentTimerRef.current);
      }
    };
  }, []);

  const handleWindowEnter = (id: string) => {
    // Clear any existing pending hover-intent timer
    if (hoverIntentTimerRef.current) {
      clearTimeout(hoverIntentTimerRef.current);
      hoverIntentTimerRef.current = null;
    }

    if (activeWindowId === id) return;

    // Desktop: Enforce 400ms hover-intent delay.
    // If user quickly sweeps cursor over window, nothing triggers.
    if (!isMobile) {
      hoverIntentTimerRef.current = setTimeout(() => {
        setActiveWindowId(id);
        hoverIntentTimerRef.current = null;
      }, 400);
    }
  };

  const handleWindowLeave = (id?: string) => {
    // Cancel any pending hover timer if cursor leaves before 400ms
    if (hoverIntentTimerRef.current) {
      clearTimeout(hoverIntentTimerRef.current);
      hoverIntentTimerRef.current = null;
    }

    if (!isMobile) {
      if (!id || activeWindowId === id) {
        setActiveWindowId(null);
      }
    }
  };

  const handleWindowClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (hoverIntentTimerRef.current) {
      clearTimeout(hoverIntentTimerRef.current);
      hoverIntentTimerRef.current = null;
    }
    // Mobile tap or desktop click toggle
    setActiveWindowId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (hoverIntentTimerRef.current) {
        clearTimeout(hoverIntentTimerRef.current);
        hoverIntentTimerRef.current = null;
      }
      setActiveWindowId((prev) => (prev === id ? null : id));
    } else if (e.key === "Escape") {
      if (hoverIntentTimerRef.current) {
        clearTimeout(hoverIntentTimerRef.current);
        hoverIntentTimerRef.current = null;
      }
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
                            onMouseLeave={() =>
                              interactiveData && handleWindowLeave(interactiveData.id)
                            }
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
  const windowInstanceId = useId().replace(/:/g, "_");
  const [isCurtainClosed, setIsCurtainClosed] = useState(false);

  const CURTAIN_STYLES = [
    "drapes-ochre",
    "drapes-emerald",
    "drapes-terracotta",
    "drapes-navy",
    "curtains-cafe",
    "curtains-austrian",
    "drapes-split",
    "drapes-left",
  ];
  const hasInteractiveCurtains = !isInteractive && CURTAIN_STYLES.includes(detail.blindStyle);

  const handleWindowClick = (e: React.MouseEvent) => {
    if (isInteractive) {
      onClick(e);
    } else if (hasInteractiveCurtains) {
      e.stopPropagation();
      setIsCurtainClosed((prev) => !prev);
    }
  };

  const handleWindowKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive) {
      onKeyDown(e);
    } else if (hasInteractiveCurtains) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        setIsCurtainClosed((prev) => !prev);
      }
    }
  };

  return (
    <div
      tabIndex={isInteractive || hasInteractiveCurtains ? 0 : -1}
      role={isInteractive || hasInteractiveCurtains ? "button" : "presentation"}
      aria-label={
        isInteractive && data
          ? data.accessibleLabel
          : hasInteractiveCurtains
          ? isCurtainClosed
            ? "Open curtains"
            : "Close curtains"
          : "Building window"
      }
      aria-expanded={
        isInteractive ? isActive : hasInteractiveCurtains ? isCurtainClosed : undefined
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleWindowClick}
      onKeyDown={handleWindowKeyDown}
      className={`group relative w-full aspect-[1.32/1] rounded-[4px] select-none outline-none transition-all duration-700 ease-out ${
        isInteractive
          ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12101A]"
          : hasInteractiveCurtains
          ? "cursor-pointer pointer-events-auto focus-visible:ring-1 focus-visible:ring-purple-400/50"
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
          boxShadow: isActive
            ? isDark
              ? "0 0 24px rgba(251, 191, 36, 0.45), inset 0 0 12px rgba(251, 191, 36, 0.2)"
              : "0 0 20px rgba(245, 158, 11, 0.35)"
            : undefined,
          borderColor: isActive
            ? isDark
              ? "rgba(251, 191, 36, 0.75)"
              : "rgba(245, 158, 11, 0.85)"
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
          isActive
            ? isDark
              ? "border-amber-300/40 bg-[#16120C]"
              : "border-amber-400/50 bg-[#FFFDF5]"
            : isDark
            ? "bg-[#090810] opacity-95 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] border-[#8E7EA8]/45"
            : "bg-gradient-to-br from-[#E2E8F0]/90 via-[#CBD5E1]/85 to-[#94A3B8]/90 opacity-95 shadow-[inset_0_1px_5px_rgba(52,21,78,0.15)] border-[#5E4F77]/60"
        }`}
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

            {/* Soft room dimming when curtains are closed */}
            {hasInteractiveCurtains && (
              <div
                className="absolute inset-0 pointer-events-none z-10 bg-black/45 transition-opacity duration-700"
                style={{ opacity: isCurtainClosed ? 1 : 0 }}
              />
            )}

            {/* A. Curtains & Blind Variations (All unified in elegant purple & lavender palette) */}
            {/* 1. Royal Purple Velvet Drapes (Split) */}
            {detail.blindStyle === "drapes-ochre" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {/* Upper Curtain Rod */}
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-30 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="purpleLeftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#281E3B" : "#8976A3"} />
                      <stop offset="40%" stopColor={isDark ? "#382C50" : "#A696BF"} />
                      <stop offset="70%" stopColor={isDark ? "#2D2242" : "#9280AC"} />
                      <stop offset="100%" stopColor={isDark ? "#211833" : "#76648F"} />
                    </linearGradient>
                    <linearGradient id="purpleRightGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#281E3B" : "#8976A3"} />
                      <stop offset="40%" stopColor={isDark ? "#382C50" : "#A696BF"} />
                      <stop offset="70%" stopColor={isDark ? "#2D2242" : "#9280AC"} />
                      <stop offset="100%" stopColor={isDark ? "#211833" : "#76648F"} />
                    </linearGradient>
                  </defs>
                  {/* Left Gathered / Closed Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 0 0 L 51 0 Q 51 42 51 54 Q 51 78 51 100 L 0 100 Z"
                        : "M 0 0 L 37 0 Q 34 42 22 54 Q 31 78 33 100 L 0 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#purpleLeftGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 14 0 Q 14 44 14 54 Q 14 76 14 100"
                        : "M 12 0 Q 11 44 7 54 Q 11 76 10 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 32 0 Q 32 44 32 54 Q 32 76 32 100"
                        : "M 25 0 Q 22 44 15 54 Q 22 76 22 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.75 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 44 0 Q 44 44 44 54 Q 44 76 44 100"
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {/* Tie-back Sash */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1, scale: isCurtainClosed ? 0.8 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 0 53 Q 11 57 22 53"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2.2"
                    fill="none"
                  />

                  {/* Right Gathered / Closed Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 100 0 L 49 0 Q 49 42 49 54 Q 49 78 49 100 L 100 100 Z"
                        : "M 100 0 L 63 0 Q 66 42 78 54 Q 69 78 67 100 L 100 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#purpleRightGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 86 0 Q 86 44 86 54 Q 86 76 86 100"
                        : "M 88 0 Q 89 44 93 54 Q 89 76 90 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 68 0 Q 68 44 68 54 Q 68 76 68 100"
                        : "M 75 0 Q 78 44 85 54 Q 78 76 78 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.75 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 56 0 Q 56 44 56 54 Q 56 76 56 100"
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {/* Tie-back Sash */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1, scale: isCurtainClosed ? 0.8 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 100 53 Q 89 57 78 53"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2.2"
                    fill="none"
                  />

                  {/* Subtle Center Overlap Shadow Line when closed */}
                  <motion.line
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.6 : 0 }}
                    transition={{ duration: 0.5 }}
                    x1="49.5"
                    y1="0"
                    x2="49.5"
                    y2="100"
                    stroke={isDark ? "#0A0512" : "#382352"}
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
            )}

            {/* 2. Deep Plum / Violet Velvet Drapes (Split) */}
            {detail.blindStyle === "drapes-emerald" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-30 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="plumLeftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#2D2045" : "#8D7BA8"} />
                      <stop offset="40%" stopColor={isDark ? "#3F2E5C" : "#AD9EC4"} />
                      <stop offset="75%" stopColor={isDark ? "#302447" : "#9584AD"} />
                      <stop offset="100%" stopColor={isDark ? "#221835" : "#796791"} />
                    </linearGradient>
                    <linearGradient id="plumRightGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#2D2045" : "#8D7BA8"} />
                      <stop offset="40%" stopColor={isDark ? "#3F2E5C" : "#AD9EC4"} />
                      <stop offset="75%" stopColor={isDark ? "#302447" : "#9584AD"} />
                      <stop offset="100%" stopColor={isDark ? "#221835" : "#796791"} />
                    </linearGradient>
                  </defs>
                  {/* Left Gathered / Closed Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 0 0 L 51 0 Q 51 44 51 55 Q 51 78 51 100 L 0 100 Z"
                        : "M 0 0 L 35 0 Q 32 44 20 55 Q 29 78 31 100 L 0 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#plumLeftGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 14 0 Q 14 44 14 55 Q 14 76 14 100"
                        : "M 11 0 Q 10 44 7 55 Q 11 76 10 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#5D4978" : "#C7B9DD"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 32 0 Q 32 44 32 55 Q 32 76 32 100"
                        : "M 23 0 Q 20 44 14 55 Q 20 76 20 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.75 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 44 0 Q 44 44 44 55 Q 44 76 44 100"
                    stroke={isDark ? "#5D4978" : "#C7B9DD"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {/* Tie-back Sash */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1, scale: isCurtainClosed ? 0.8 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 0 54 Q 10 58 20 54"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2.2"
                    fill="none"
                  />

                  {/* Right Gathered / Closed Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 100 0 L 49 0 Q 49 44 49 55 Q 49 78 49 100 L 100 100 Z"
                        : "M 100 0 L 65 0 Q 68 44 80 55 Q 71 78 69 100 L 100 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#plumRightGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 86 0 Q 86 44 86 55 Q 86 76 86 100"
                        : "M 89 0 Q 90 44 93 55 Q 89 76 90 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#5D4978" : "#C7B9DD"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 68 0 Q 68 44 68 55 Q 68 76 68 100"
                        : "M 77 0 Q 80 44 86 55 Q 80 76 80 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.75 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 56 0 Q 56 44 56 55 Q 56 76 56 100"
                    stroke={isDark ? "#5D4978" : "#C7B9DD"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {/* Tie-back Sash */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1, scale: isCurtainClosed ? 0.8 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 100 54 Q 90 58 80 54"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2.2"
                    fill="none"
                  />

                  {/* Subtle Center Overlap Shadow Line when closed */}
                  <motion.line
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.6 : 0 }}
                    transition={{ duration: 0.5 }}
                    x1="49.5"
                    y1="0"
                    x2="49.5"
                    y2="100"
                    stroke={isDark ? "#0A0512" : "#382352"}
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
            )}

            {/* 3. Purple Left-Swept Drape */}
            {detail.blindStyle === "drapes-terracotta" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-30 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="purpleSweepLeftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#281E3B" : "#8976A3"} />
                      <stop offset="35%" stopColor={isDark ? "#382C50" : "#A696BF"} />
                      <stop offset="70%" stopColor={isDark ? "#2D2242" : "#9280AC"} />
                      <stop offset="100%" stopColor={isDark ? "#1C142B" : "#6E5B87"} />
                    </linearGradient>
                  </defs>
                  {/* Left Swept / Fully Closed Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 0 0 L 100 0 Q 100 42 100 54 Q 100 78 100 100 L 0 100 Z"
                        : "M 0 0 L 46 0 Q 40 42 26 54 Q 36 78 38 100 L 0 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#purpleSweepLeftGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 16 0 Q 16 44 16 54 Q 16 76 16 100"
                        : "M 13 0 Q 12 44 8 54 Q 12 76 11 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 38 0 Q 38 44 38 54 Q 38 76 38 100"
                        : "M 26 0 Q 22 44 17 54 Q 25 76 25 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 60 0 Q 60 44 60 54 Q 60 76 60 100"
                        : "M 36 0 Q 30 44 21 54 Q 31 76 31 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Additional closed pleats across right side */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.8 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 78 0 Q 78 44 78 54 Q 78 76 78 100"
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.7 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 92 0 Q 92 44 92 54 Q 92 76 92 100"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {/* Tie-Back */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1, scale: isCurtainClosed ? 0.8 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 0 53 Q 14 57 26 53"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {/* 4. Purple Right-Swept Drape */}
            {detail.blindStyle === "drapes-navy" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-30 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="purpleSweepRightGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#281E3B" : "#8976A3"} />
                      <stop offset="35%" stopColor={isDark ? "#382C50" : "#A696BF"} />
                      <stop offset="70%" stopColor={isDark ? "#2D2242" : "#9280AC"} />
                      <stop offset="100%" stopColor={isDark ? "#1C142B" : "#6E5B87"} />
                    </linearGradient>
                  </defs>
                  {/* Right Swept / Fully Closed Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 100 0 L 0 0 Q 0 42 0 54 Q 0 78 0 100 L 100 100 Z"
                        : "M 100 0 L 54 0 Q 60 42 74 54 Q 64 78 62 100 L 100 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#purpleSweepRightGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 84 0 Q 84 44 84 54 Q 84 76 84 100"
                        : "M 87 0 Q 88 44 92 54 Q 88 76 89 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 62 0 Q 62 44 62 54 Q 62 76 62 100"
                        : "M 74 0 Q 78 44 83 54 Q 75 76 75 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 40 0 Q 40 44 40 54 Q 40 76 40 100"
                        : "M 64 0 Q 70 44 79 54 Q 69 76 69 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Additional closed pleats across left side */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.8 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 22 0 Q 22 44 22 54 Q 22 76 22 100"
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.7 : 0 }}
                    transition={{ duration: 0.4 }}
                    d="M 8 0 Q 8 44 8 54 Q 8 76 8 100"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {/* Tie-Back */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1, scale: isCurtainClosed ? 0.8 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 100 53 Q 86 57 74 53"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {/* 5. European Bistro Half-Window Cafe Curtains (Purple Linen) */}
            {detail.blindStyle === "curtains-cafe" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {/* Mid-Height Rod & Hanging Rings */}
                <div className="absolute top-[46%] inset-x-1 flex items-center justify-between z-30">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8E7EA8] shadow-[0_0_2px_black]" />
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#6D5A85] via-[#A896C2] to-[#6D5A85] shadow-[0_1px_2px_black]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8E7EA8] shadow-[0_0_2px_black]" />
                </div>
                {/* Cafe Curtain Panels spanning lower half in purple linen */}
                <svg viewBox="0 0 100 54" preserveAspectRatio="none" className="absolute top-[48%] inset-x-0 w-full h-[52%] pointer-events-none">
                  <defs>
                    <linearGradient id="purpleCafeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#35294E" : "#9887B2"} />
                      <stop offset="50%" stopColor={isDark ? "#453664" : "#B7A8CF"} />
                      <stop offset="100%" stopColor={isDark ? "#2A2040" : "#8B7AA3"} />
                    </linearGradient>
                  </defs>
                  {/* Left Cafe Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 2 0 L 52 0 L 52 50 Q 42 53 32 50 Q 20 53 12 50 Q 6 53 2 50 Z"
                        : "M 2 0 L 44 0 L 44 50 Q 36 53 28 50 Q 20 53 12 50 Q 6 53 2 50 Z",
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#purpleCafeGrad)"
                    stroke={isDark ? "#211833" : "#6E5C88"}
                    strokeWidth="0.5"
                    opacity="0.95"
                  />
                  {/* Purple accent hem on left */}
                  <motion.line
                    initial={false}
                    animate={{ x2: isCurtainClosed ? 52 : 44 }}
                    transition={{ duration: 0.6 }}
                    x1="2"
                    y1="44"
                    y2="44"
                    stroke={isDark ? "#8B7AA3" : "#563A75"}
                    strokeWidth="0.8"
                    opacity="0.75"
                  />
                  <motion.line
                    initial={false}
                    animate={{ x2: isCurtainClosed ? 52 : 44 }}
                    transition={{ duration: 0.6 }}
                    x1="2"
                    y1="46"
                    y2="46"
                    stroke={isDark ? "#6D5A85" : "#4A2F68"}
                    strokeWidth="0.6"
                    opacity="0.75"
                  />
                  {/* Ruffled Pinch Pleats at top */}
                  <path d="M 7 0 L 7 12 M 15 0 L 15 12 M 23 0 L 23 12 M 31 0 L 31 12 M 39 0 L 39 12" stroke={isDark ? "#52416C" : "#C4B6DB"} strokeWidth="0.6" opacity="0.6" />

                  {/* Right Cafe Panel */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 48 0 L 98 0 L 98 50 Q 94 53 88 50 Q 80 53 70 50 Q 58 53 48 50 Z"
                        : "M 56 0 L 98 0 L 98 50 Q 94 53 88 50 Q 80 53 72 50 Q 64 53 56 50 Z",
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#purpleCafeGrad)"
                    stroke={isDark ? "#211833" : "#6E5C88"}
                    strokeWidth="0.5"
                    opacity="0.95"
                  />
                  {/* Purple accent hem on right */}
                  <motion.line
                    initial={false}
                    animate={{ x1: isCurtainClosed ? 48 : 56 }}
                    transition={{ duration: 0.6 }}
                    x2="98"
                    y1="44"
                    y2="44"
                    stroke={isDark ? "#8B7AA3" : "#563A75"}
                    strokeWidth="0.8"
                    opacity="0.75"
                  />
                  <motion.line
                    initial={false}
                    animate={{ x1: isCurtainClosed ? 48 : 56 }}
                    transition={{ duration: 0.6 }}
                    x2="98"
                    y1="46"
                    y2="46"
                    stroke={isDark ? "#6D5A85" : "#4A2F68"}
                    strokeWidth="0.6"
                    opacity="0.75"
                  />
                  {/* Ruffled Pinch Pleats at top */}
                  <path d="M 61 0 L 61 12 M 69 0 L 69 12 M 77 0 L 77 12 M 85 0 L 85 12 M 93 0 L 93 12" stroke={isDark ? "#52416C" : "#C4B6DB"} strokeWidth="0.6" opacity="0.6" />

                  {/* Overlap shadow seam line */}
                  <motion.line
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.6 : 0 }}
                    transition={{ duration: 0.5 }}
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="50"
                    stroke={isDark ? "#0E0717" : "#3F265C"}
                    strokeWidth="1"
                  />
                </svg>
              </div>
            )}

            {/* 6. Romantic Lavender Lace Curtains & Scalloped Valance Pelmet */}
            {detail.blindStyle === "curtains-sheer" && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-20 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Top Scalloped Lace Arch Pelmet in Lavender/Plum */}
                  <path
                    d="M 0 0 L 100 0 L 100 16 Q 88 22 75 14 Q 62 22 50 14 Q 38 22 25 14 Q 12 22 0 16 Z"
                    fill={isDark ? "rgba(67, 51, 92, 0.85)" : "rgba(221, 214, 254, 0.85)"}
                    stroke={isDark ? "#8B78A8" : "#A78BFA"}
                    strokeWidth="0.5"
                  />
                  {/* Lace scallop dots */}
                  <circle cx="25" cy="14" r="1" fill={isDark ? "#C4B5FD" : "#7C3AED"} />
                  <circle cx="50" cy="14" r="1" fill={isDark ? "#C4B5FD" : "#7C3AED"} />
                  <circle cx="75" cy="14" r="1" fill={isDark ? "#C4B5FD" : "#7C3AED"} />

                  {/* Left Translucent Voile Curtain Body in Lavender Mist */}
                  <path
                    d="M 0 16 L 30 14 Q 28 46 18 55 Q 26 78 28 100 L 0 100 Z"
                    fill={isDark ? "rgba(40, 30, 59, 0.65)" : "rgba(221, 214, 254, 0.55)"}
                    stroke={isDark ? "#6D5A8C" : "#C4B5FD"}
                    strokeWidth="0.4"
                  />
                  {/* Left Tie-Back */}
                  <path d="M 0 54 Q 9 57 18 54" stroke={isDark ? "#F59E0B" : "#5B4379"} strokeWidth="1.8" fill="none" />
                  <circle cx="18" cy="54" r="1.5" fill={isDark ? "#F59E0B" : "#5B4379"} />

                  {/* Right Translucent Voile Curtain Body in Lavender Mist */}
                  <path
                    d="M 100 16 L 70 14 Q 72 46 82 55 Q 74 78 72 100 L 100 100 Z"
                    fill={isDark ? "rgba(40, 30, 59, 0.65)" : "rgba(221, 214, 254, 0.55)"}
                    stroke={isDark ? "#6D5A8C" : "#C4B5FD"}
                    strokeWidth="0.4"
                  />
                  {/* Right Tie-Back */}
                  <path d="M 100 54 Q 91 57 82 54" stroke={isDark ? "#F59E0B" : "#5B4379"} strokeWidth="1.8" fill="none" />
                  <circle cx="82" cy="54" r="1.5" fill={isDark ? "#F59E0B" : "#5B4379"} />
                </svg>
              </div>
            )}

            {/* 7. Scalloped Austrian Balloon Cloud Valance (Purple Silk) */}
            {detail.blindStyle === "curtains-austrian" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-30 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="austrianPurpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#43335A" : "#8A76A6"} />
                      <stop offset="50%" stopColor={isDark ? "#5D497B" : "#B2A3CC"} />
                      <stop offset="100%" stopColor={isDark ? "#352749" : "#6E5B87"} />
                    </linearGradient>
                  </defs>
                  {/* Cloud Balloon Swags - expands down when closed */}
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 0 0 L 100 0 L 100 94 Q 75 106 50 94 Q 25 106 0 94 Z"
                        : "M 0 0 L 100 0 L 100 24 Q 75 42 50 24 Q 25 42 0 24 Z",
                    }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#austrianPurpleGrad)"
                    stroke={isDark ? "#281D3B" : "#56446E"}
                    strokeWidth="0.6"
                  />
                  {/* Upper Shirring Gather Folds */}
                  <path d="M 2 12 Q 25 22 48 12" stroke={isDark ? "#9A88BA" : "#DDD4ED"} strokeWidth="0.7" fill="none" opacity="0.8" />
                  <path d="M 2 18 Q 25 30 48 18" stroke={isDark ? "#9A88BA" : "#DDD4ED"} strokeWidth="0.7" fill="none" opacity="0.8" />
                  <path d="M 52 12 Q 75 22 98 12" stroke={isDark ? "#9A88BA" : "#DDD4ED"} strokeWidth="0.7" fill="none" opacity="0.8" />
                  <path d="M 52 18 Q 75 30 98 18" stroke={isDark ? "#9A88BA" : "#DDD4ED"} strokeWidth="0.7" fill="none" opacity="0.8" />

                  {/* Mid & Lower Folds that reveal when closed */}
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.8 : 0 }}
                    transition={{ duration: 0.5 }}
                    d="M 2 38 Q 25 50 48 38 M 52 38 Q 75 50 98 38"
                    stroke={isDark ? "#9A88BA" : "#DDD4ED"}
                    strokeWidth="0.7"
                    fill="none"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.8 : 0 }}
                    transition={{ duration: 0.5 }}
                    d="M 2 58 Q 25 70 48 58 M 52 58 Q 75 70 98 58"
                    stroke={isDark ? "#9A88BA" : "#DDD4ED"}
                    strokeWidth="0.7"
                    fill="none"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0.8 : 0 }}
                    transition={{ duration: 0.5 }}
                    d="M 2 78 Q 25 90 48 78 M 52 78 Q 75 90 98 78"
                    stroke={isDark ? "#9A88BA" : "#DDD4ED"}
                    strokeWidth="0.7"
                    fill="none"
                  />

                  {/* Vertical Pull Tapes & Hanging Rosette Pompoms */}
                  <motion.line
                    initial={false}
                    animate={{ y2: isCurtainClosed ? 98 : 28 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    x1="50"
                    y1="0"
                    x2="50"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="1"
                  />
                  <motion.circle
                    initial={false}
                    animate={{ cy: isCurtainClosed ? 98 : 28 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    cx="50"
                    r="1.8"
                    fill={isDark ? "#F59E0B" : "#563A75"}
                  />
                  <motion.circle
                    initial={false}
                    animate={{ cy: isCurtainClosed ? 95 : 25 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    cx="0"
                    r="1.5"
                    fill={isDark ? "#F59E0B" : "#563A75"}
                  />
                  <motion.circle
                    initial={false}
                    animate={{ cy: isCurtainClosed ? 95 : 25 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    cx="100"
                    r="1.5"
                    fill={isDark ? "#F59E0B" : "#563A75"}
                  />
                </svg>
              </div>
            )}

            {/* 8. Fallback Classic Drapes */}
            {detail.blindStyle === "drapes-split" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-30 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="curtainLeftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#281E3B" : "#8976A3"} />
                      <stop offset="40%" stopColor={isDark ? "#382C50" : "#A696BF"} />
                      <stop offset="70%" stopColor={isDark ? "#2D2242" : "#9280AC"} />
                      <stop offset="100%" stopColor={isDark ? "#211833" : "#76648F"} />
                    </linearGradient>
                    <linearGradient id="curtainRightGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#281E3B" : "#8976A3"} />
                      <stop offset="40%" stopColor={isDark ? "#382C50" : "#A696BF"} />
                      <stop offset="70%" stopColor={isDark ? "#2D2242" : "#9280AC"} />
                      <stop offset="100%" stopColor={isDark ? "#211833" : "#76648F"} />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 0 0 L 51 0 Q 51 42 51 54 Q 51 78 51 100 L 0 100 Z"
                        : "M 0 0 L 36 0 Q 33 42 22 54 Q 30 78 32 100 L 0 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#curtainLeftGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 14 0 Q 14 44 14 54 Q 14 76 14 100"
                        : "M 12 0 Q 11 44 8 54 Q 11 76 10 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 32 0 Q 32 44 32 54 Q 32 76 32 100"
                        : "M 24 0 Q 21 44 15 54 Q 21 76 21 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 0 53 Q 11 57 22 53"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2"
                    fill="none"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 100 0 L 49 0 Q 49 42 49 54 Q 49 78 49 100 L 100 100 Z"
                        : "M 100 0 L 64 0 Q 67 42 78 54 Q 70 78 68 100 L 100 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#curtainRightGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 86 0 Q 86 44 86 54 Q 86 76 86 100"
                        : "M 88 0 Q 89 44 92 54 Q 89 76 90 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 68 0 Q 68 44 68 54 Q 68 76 68 100"
                        : "M 76 0 Q 79 44 85 54 Q 79 76 79 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 100 53 Q 89 57 78 53"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {detail.blindStyle === "drapes-left" && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <div
                  className={`absolute top-0 inset-x-0.5 h-[2px] z-30 transition-colors duration-500 rounded-full ${
                    isDark ? "bg-[#5D4E75] shadow-[0_1px_2px_black]" : "bg-[#4D3E64]"
                  }`}
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="curtainSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#281E3B" : "#8976A3"} />
                      <stop offset="35%" stopColor={isDark ? "#382C50" : "#A696BF"} />
                      <stop offset="70%" stopColor={isDark ? "#2D2242" : "#9280AC"} />
                      <stop offset="100%" stopColor={isDark ? "#1C142B" : "#6E5B87"} />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 0 0 L 100 0 Q 100 42 100 54 Q 100 78 100 100 L 0 100 Z"
                        : "M 0 0 L 48 0 Q 42 42 28 54 Q 38 78 40 100 L 0 100 Z",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    fill="url(#curtainSweepGrad)"
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.5"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 16 0 Q 16 44 16 54 Q 16 76 16 100"
                        : "M 14 0 Q 13 44 9 54 Q 13 76 12 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 38 0 Q 38 44 38 54 Q 38 76 38 100"
                        : "M 28 0 Q 24 44 18 54 Q 26 76 26 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#52416C" : "#C4B6DB"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d: isCurtainClosed
                        ? "M 60 0 Q 60 44 60 54 Q 60 76 60 100"
                        : "M 38 0 Q 32 44 23 54 Q 33 76 33 100",
                    }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                    stroke={isDark ? "#171024" : "#625078"}
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <motion.path
                    initial={false}
                    animate={{ opacity: isCurtainClosed ? 0 : 1 }}
                    transition={{ duration: 0.35 }}
                    d="M 0 53 Q 14 57 28 53"
                    stroke={isDark ? "#F59E0B" : "#563A75"}
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
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

            {/* B. Varied Architectural Window Elements & Silhouettes */}
            {/* 1. Trailing Macrame Hanging Ivy Plant */}
            {detail.silhouette === "hanging-ivy" && (
              <div className="absolute top-0 right-2.5 z-10 pointer-events-none opacity-95">
                <svg viewBox="0 0 24 46" className="w-5 sm:w-6 h-10 sm:h-12 overflow-visible">
                  {/* Hanging macrame rope cords */}
                  <line x1="12" y1="0" x2="6" y2="16" stroke={isDark ? "#8B7AA5" : "#5D4C75"} strokeWidth="0.6" />
                  <line x1="12" y1="0" x2="18" y2="16" stroke={isDark ? "#8B7AA5" : "#5D4C75"} strokeWidth="0.6" />
                  <line x1="12" y1="0" x2="12" y2="17" stroke={isDark ? "#A090BA" : "#716089"} strokeWidth="0.6" />
                  {/* Terracotta/Ceramic Pot */}
                  <path
                    d="M 4 16 C 4 21 20 21 20 16 Z"
                    fill={isDark ? "#D97706" : "#C2410C"}
                    opacity={isDark ? 0.9 : 0.8}
                  />
                  <circle cx="12" cy="22" r="1.5" fill={isDark ? "#F59E0B" : "#B45309"} />
                  {/* Trailing ivy vines */}
                  <path
                    d="M 7 20 Q 4 28 6 36 Q 8 42 7 46"
                    stroke={isDark ? "#34D399" : "#059669"}
                    strokeWidth="0.9"
                    fill="none"
                  />
                  <path
                    d="M 17 20 Q 19 26 16 34 Q 14 40 16 44"
                    stroke={isDark ? "#6EE7B7" : "#10B981"}
                    strokeWidth="0.9"
                    fill="none"
                  />
                  {/* Green leaves */}
                  <circle cx="5" cy="26" r="2" fill={isDark ? "#10B981" : "#059669"} />
                  <circle cx="8" cy="33" r="2.2" fill={isDark ? "#34D399" : "#10B981"} />
                  <circle cx="5" cy="40" r="1.8" fill={isDark ? "#059669" : "#047857"} />
                  <circle cx="18" cy="28" r="2.2" fill={isDark ? "#34D399" : "#10B981"} />
                  <circle cx="15" cy="36" r="2" fill={isDark ? "#10B981" : "#059669"} />
                  <circle cx="17" cy="42" r="1.5" fill={isDark ? "#059669" : "#047857"} />
                </svg>
              </div>
            )}

            {/* 4. Books Stack with Steaming Ceramic Coffee Cup & Saucer */}
            {detail.silhouette === "books-coffee" && (
              <div className="absolute bottom-1 right-1.5 z-10 pointer-events-none opacity-95">
                <svg viewBox="0 0 44 38" className="w-9 sm:w-11 h-8 sm:h-10 overflow-visible">
                  <defs>
                    {/* Ceramic Glaze Gradient */}
                    <linearGradient id="ceramicCupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={isDark ? "#D8D3E8" : "#FFFFFF"} />
                      <stop offset="40%" stopColor={isDark ? "#EDE8FA" : "#F8FAFC"} />
                      <stop offset="80%" stopColor={isDark ? "#B9B0D1" : "#E2E8F0"} />
                      <stop offset="100%" stopColor={isDark ? "#9A8FB8" : "#CBD5E1"} />
                    </linearGradient>

                    {/* Dark Roast Coffee Crema */}
                    <radialGradient id="coffeeCremaGrad" cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#C4844D" />
                      <stop offset="35%" stopColor="#8A481B" />
                      <stop offset="75%" stopColor="#45210D" />
                      <stop offset="100%" stopColor="#2E1305" />
                    </radialGradient>

                    {/* Book Spines Gradients */}
                    <linearGradient id="bookBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#1E3A8A" : "#1E40AF"} />
                      <stop offset="50%" stopColor={isDark ? "#1D4ED8" : "#2563EB"} />
                      <stop offset="100%" stopColor={isDark ? "#172554" : "#1E3A8A"} />
                    </linearGradient>

                    <linearGradient id="bookMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#9A3412" : "#C2410C"} />
                      <stop offset="50%" stopColor={isDark ? "#C2410C" : "#EA580C"} />
                      <stop offset="100%" stopColor={isDark ? "#7C2D12" : "#9A3412"} />
                    </linearGradient>

                    <linearGradient id="bookTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#581C87" : "#7E22CE"} />
                      <stop offset="50%" stopColor={isDark ? "#6B21A8" : "#9333EA"} />
                      <stop offset="100%" stopColor={isDark ? "#3B0764" : "#6B21A8"} />
                    </linearGradient>
                  </defs>

                  {/* Rising Steam Wisps */}
                  <g opacity="0.65" className="animate-pulse">
                    <path
                      d="M 23 9 Q 21 5 24 2 Q 27 0 25 -2"
                      stroke={isDark ? "#E2E8F0" : "#94A3B8"}
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 27 9 Q 29 6 27 3 Q 25 1 28 -1"
                      stroke={isDark ? "#E2E8F0" : "#94A3B8"}
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>

                  {/* Ceramic Saucer */}
                  <ellipse cx="25" cy="18.5" rx="10" ry="2.2" fill="url(#ceramicCupGrad)" stroke={isDark ? "#7C6F99" : "#94A3B8"} strokeWidth="0.5" />
                  <ellipse cx="25" cy="18" rx="7.5" ry="1.4" fill={isDark ? "#AFA5C7" : "#E2E8F0"} />

                  {/* Ceramic Cup Body */}
                  <path
                    d="M 18 11 L 32 11 Q 31 17.5 25 18 Q 19 17.5 18 11 Z"
                    fill="url(#ceramicCupGrad)"
                    stroke={isDark ? "#7C6F99" : "#94A3B8"}
                    strokeWidth="0.5"
                  />
                  {/* Cup Rim Highlight */}
                  <ellipse cx="25" cy="11" rx="7" ry="1.8" fill="url(#ceramicCupGrad)" stroke={isDark ? "#7C6F99" : "#94A3B8"} strokeWidth="0.4" />
                  {/* Steaming Coffee Liquid */}
                  <ellipse cx="25" cy="11.2" rx="6.2" ry="1.4" fill="url(#coffeeCremaGrad)" />
                  {/* Specular Coffee Reflection */}
                  <ellipse cx="23" cy="10.8" rx="2" ry="0.5" fill="#FFFFFF" opacity="0.45" />

                  {/* Ceramic Cup Handle */}
                  <path
                    d="M 31 12 C 35 12 35 16.5 30 16.5"
                    stroke="url(#ceramicCupGrad)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* ━━━━ STACK OF 3 REALISTIC HARDCOVER BOOKS ━━━━ */}
                  {/* 1. Top Book (Purple Plum with Gold Gilded Titling) */}
                  <g transform="rotate(-2 22 23)">
                    {/* Shadow under book */}
                    <rect x="6" y="21" width="32" height="4.5" rx="1" fill="#000000" opacity="0.25" />
                    {/* Book spine */}
                    <rect x="7" y="20.5" width="28" height="4.2" rx="1" fill="url(#bookTopGrad)" stroke={isDark ? "#2E1065" : "#581C87"} strokeWidth="0.4" />
                    {/* Gilded spine bands & gold title emboss */}
                    <line x1="9" y1="20.5" x2="9" y2="24.7" stroke="#FDE047" strokeWidth="0.5" opacity="0.85" />
                    <line x1="11" y1="20.5" x2="11" y2="24.7" stroke="#FDE047" strokeWidth="0.5" opacity="0.85" />
                    <line x1="15" y1="22.6" x2="27" y2="22.6" stroke="#FEF08A" strokeWidth="0.7" strokeDasharray="1.5,1" opacity="0.9" />
                    <line x1="31" y1="20.5" x2="31" y2="24.7" stroke="#FDE047" strokeWidth="0.5" opacity="0.85" />
                    {/* Pages block on right */}
                    <rect x="34" y="21" width="3" height="3.2" rx="0.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.3" />
                  </g>

                  {/* Red Silk Ribbon Bookmark draping out */}
                  <path
                    d="M 17 25 Q 16 29 18 33 Q 19 35 17 37"
                    stroke="#EF4444"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* 2. Middle Book (Terracotta Leather Bound) */}
                  <g transform="rotate(1.5 22 28)">
                    {/* Book spine */}
                    <rect x="4" y="25" width="34" height="4.5" rx="1" fill="url(#bookMidGrad)" stroke={isDark ? "#431407" : "#7C2D12"} strokeWidth="0.4" />
                    {/* Gold bands */}
                    <line x1="7" y1="25" x2="7" y2="29.5" stroke="#FEF08A" strokeWidth="0.5" opacity="0.8" />
                    <line x1="13" y1="27.2" x2="28" y2="27.2" stroke="#FEF08A" strokeWidth="0.8" strokeDasharray="2,1" opacity="0.8" />
                    <line x1="34" y1="25" x2="34" y2="29.5" stroke="#FEF08A" strokeWidth="0.5" opacity="0.8" />
                    {/* Pages block on right */}
                    <rect x="36" y="25.5" width="4" height="3.5" rx="0.5" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="0.3" />
                  </g>

                  {/* 3. Bottom Book (Deep Navy Buckram Hardcover) */}
                  <g>
                    {/* Shadow on sill */}
                    <rect x="2" y="33" width="38" height="2.5" rx="1" fill="#000000" opacity="0.35" />
                    {/* Book spine */}
                    <rect x="2" y="29.5" width="38" height="5.2" rx="1.2" fill="url(#bookBottomGrad)" stroke={isDark ? "#0F172A" : "#1E3A8A"} strokeWidth="0.5" />
                    {/* Textured cloth spine ribbing */}
                    <line x1="5" y1="29.5" x2="5" y2="34.7" stroke="#93C5FD" strokeWidth="0.6" opacity="0.75" />
                    <line x1="6" y1="29.5" x2="6" y2="34.7" stroke="#60A5FA" strokeWidth="0.5" opacity="0.6" />
                    <line x1="12" y1="32.1" x2="31" y2="32.1" stroke="#FDE047" strokeWidth="0.9" strokeDasharray="2.5,1.2" opacity="0.9" />
                    <line x1="36" y1="29.5" x2="36" y2="34.7" stroke="#93C5FD" strokeWidth="0.6" opacity="0.75" />
                    {/* Pages block */}
                    <rect x="38" y="30.2" width="4.5" height="3.8" rx="0.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.3" />
                  </g>
                </svg>
              </div>
            )}

            {/* 5. Glowing Banker's Desk Lamp */}
            {detail.silhouette === "glow-lamp" && (
              <div className="absolute bottom-1 left-2.5 z-10 flex flex-col items-center pointer-events-none">
                {/* Ambient Warm Glow */}
                <div
                  className={`absolute -top-1 w-10 h-10 rounded-full blur-md pointer-events-none transition-opacity duration-500 ${
                    isDark ? "bg-amber-400/35 opacity-100" : "bg-amber-200/20 opacity-50"
                  }`}
                />
                <svg viewBox="0 0 24 28" className="w-5 sm:w-6 h-6 sm:h-7 overflow-visible z-10">
                  {/* Curved Emerald Banker's Shade */}
                  <path
                    d="M 4 8 C 4 3 20 3 20 8 Z"
                    fill={isDark ? "#059669" : "#047857"}
                    stroke={isDark ? "#34D399" : "#10B981"}
                    strokeWidth="0.6"
                  />
                  {/* Glowing Bulb */}
                  <circle
                    cx="12"
                    cy="9"
                    r="2"
                    fill="#FEF08A"
                    className={isDark ? "drop-shadow-[0_0_5px_#F59E0B]" : ""}
                  />
                  {/* Brass Gooseneck Stand */}
                  <path
                    d="M 12 10 L 12 18 C 12 21 15 21 15 24"
                    stroke={isDark ? "#F59E0B" : "#B45309"}
                    strokeWidth="1.3"
                    fill="none"
                  />
                  {/* Base */}
                  <ellipse
                    cx="15"
                    cy="25"
                    rx="5"
                    ry="1.8"
                    fill={isDark ? "#D97706" : "#92400E"}
                  />
                </svg>
              </div>
            )}

            {/* 6. Lush Potted Monstera Plant */}
            {detail.silhouette === "lush-monstera" && (
              <div className="absolute bottom-1 right-2 z-10 flex flex-col items-center pointer-events-none opacity-95">
                <svg viewBox="0 0 32 36" className="w-6 sm:w-7 h-7 sm:h-8 overflow-visible">
                  {/* Terracotta Pot */}
                  <polygon
                    points="10,24 22,24 20,34 12,34"
                    fill={isDark ? "#C2410C" : "#9A3412"}
                    stroke={isDark ? "#EA580C" : "#7C2D12"}
                    strokeWidth="0.6"
                  />
                  <rect
                    x="9"
                    y="22"
                    width="14"
                    height="3"
                    rx="1"
                    fill={isDark ? "#EA580C" : "#C2410C"}
                  />
                  {/* Plant Stems */}
                  <path d="M 16 22 Q 13 14 7 11" stroke={isDark ? "#10B981" : "#059669"} strokeWidth="1.2" fill="none" />
                  <path d="M 16 22 Q 16 11 16 4" stroke={isDark ? "#10B981" : "#059669"} strokeWidth="1.2" fill="none" />
                  <path d="M 16 22 Q 20 15 26 12" stroke={isDark ? "#10B981" : "#059669"} strokeWidth="1.2" fill="none" />
                  {/* Broad Leaves */}
                  <ellipse cx="16" cy="5" rx="6" ry="5" fill={isDark ? "#059669" : "#047857"} />
                  <ellipse cx="6" cy="10" rx="5.5" ry="4.5" fill={isDark ? "#10B981" : "#059669"} transform="rotate(-20 6 10)" />
                  <ellipse cx="26" cy="11" rx="5.5" ry="4.5" fill={isDark ? "#34D399" : "#10B981"} transform="rotate(25 26 11)" />
                </svg>
              </div>
            )}

            {/* 7. Realistic Standing Framed Photo Print on Sill */}
            {detail.silhouette === "art-easel" && (
              <div className="absolute bottom-1 left-2 z-10 pointer-events-none opacity-95">
                <svg viewBox="0 0 36 34" className="w-8 sm:w-9.5 h-8 sm:h-9 overflow-visible">
                  <defs>
                    {/* Walnut Frame Wood Gradient */}
                    <linearGradient id="walnutFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#451A03" : "#78350F"} />
                      <stop offset="40%" stopColor={isDark ? "#78350F" : "#92400E"} />
                      <stop offset="100%" stopColor={isDark ? "#2A0E02" : "#451A03"} />
                    </linearGradient>

                    <clipPath id="photoInnerClip">
                      <rect x="7" y="11" width="18" height="15" rx="0.5" />
                    </clipPath>
                  </defs>

                  {/* Ground Contact Shadow */}
                  <ellipse cx="17" cy="30.5" rx="14" ry="2" fill="#000000" opacity="0.35" />

                  {/* Rear Kickstand Strut */}
                  <polygon
                    points="24,20 28,30 25,30 21,20"
                    fill={isDark ? "#1C142B" : "#451A03"}
                    opacity="0.85"
                  />

                  {/* Outer Beveled Walnut Picture Frame */}
                  <rect
                    x="3"
                    y="7"
                    width="26"
                    height="23"
                    rx="1.5"
                    fill="url(#walnutFrameGrad)"
                    stroke={isDark ? "#170C04" : "#451A03"}
                    strokeWidth="0.8"
                  />
                  {/* Gold Inner Fillet Trim */}
                  <rect
                    x="4.2"
                    y="8.2"
                    width="23.6"
                    height="20.6"
                    rx="0.5"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="0.4"
                    opacity="0.8"
                  />

                  {/* Archival Off-White Mat Board (Passe-Partout) */}
                  <rect
                    x="5"
                    y="9"
                    width="22"
                    height="19"
                    rx="0.5"
                    fill={isDark ? "#201A2C" : "#FAF8F5"}
                  />
                  {/* Beveled Mat Inner Edge */}
                  <rect
                    x="6.8"
                    y="10.8"
                    width="18.4"
                    height="15.4"
                    rx="0.4"
                    fill="none"
                    stroke={isDark ? "#130E1C" : "#D4CEBE"}
                    strokeWidth="0.6"
                  />

                  {/* Authentic Monochrome Fine-Art Photograph (Clipped) */}
                  <g clipPath="url(#photoInnerClip)">
                    {/* Photo Paper Base */}
                    <rect x="7" y="11" width="18" height="15" fill={isDark ? "#0F0B18" : "#E2E8F0"} />
                    {/* Misty Atmospheric Gradient */}
                    <rect x="7" y="11" width="18" height="9" fill={isDark ? "#2D243D" : "#CBD5E1"} />
                    {/* Distant Misty Horizon & Clouds */}
                    <ellipse cx="16" cy="18" rx="10" ry="3" fill={isDark ? "#3E3254" : "#E2E8F0"} opacity="0.6" />
                    {/* Iconic Suspension Bridge / Pier Silhouette */}
                    <path
                      d="M 7 21 L 11 15 L 12 15 L 14 21 L 17 14 L 18 14 L 21 21 L 25 17 L 25 21 Z"
                      fill={isDark ? "#09060E" : "#1E293B"}
                    />
                    {/* Bridge cables & suspension wires */}
                    <line x1="11.5" y1="15" x2="7" y2="19" stroke={isDark ? "#09060E" : "#1E293B"} strokeWidth="0.4" />
                    <line x1="11.5" y1="15" x2="14" y2="19" stroke={isDark ? "#09060E" : "#1E293B"} strokeWidth="0.4" />
                    <line x1="17.5" y1="14" x2="14" y2="19" stroke={isDark ? "#09060E" : "#1E293B"} strokeWidth="0.4" />
                    <line x1="17.5" y1="14" x2="21" y2="19" stroke={isDark ? "#09060E" : "#1E293B"} strokeWidth="0.4" />
                    {/* Water / Harbor Reflection with ripples */}
                    <rect x="7" y="21" width="18" height="5" fill={isDark ? "#161124" : "#94A3B8"} />
                    <line x1="9" y1="23" x2="15" y2="23" stroke={isDark ? "#2D243D" : "#E2E8F0"} strokeWidth="0.4" />
                    <line x1="16" y1="24" x2="22" y2="24" stroke={isDark ? "#2D243D" : "#E2E8F0"} strokeWidth="0.4" />

                    {/* Protective Glass Diagonal Glare */}
                    <polygon points="7,11 11,11 18,26 14,26" fill="#FFFFFF" opacity="0.22" />
                    <polygon points="13,11 15,11 23,26 21,26" fill="#FFFFFF" opacity="0.12" />
                  </g>

                  {/* Small Brass Flower Bud Vase on the side of the photo */}
                  <g transform="translate(29, 18)">
                    {/* Brass Bud Vase */}
                    <path
                      d="M 1 7 C 0 11 0 12 2 12 L 4 12 C 6 12 6 11 5 7 L 4.2 4 L 4.8 2 L 1.2 2 L 1.8 4 Z"
                      fill={isDark ? "#D97706" : "#B45309"}
                      stroke={isDark ? "#F59E0B" : "#78350F"}
                      strokeWidth="0.4"
                    />
                    {/* Stem & Flower */}
                    <path d="M 3 2 Q 1 -3 3 -6" stroke={isDark ? "#10B981" : "#059669"} strokeWidth="0.6" fill="none" />
                    <circle cx="3" cy="-6" r="1.5" fill="#F43F5E" />
                    <circle cx="3" cy="-6" r="0.6" fill="#FEF08A" />
                  </g>
                </svg>
              </div>
            )}

            {/* 8. Realistic Vertical CD Player & Album Jewel Case */}
            {detail.silhouette === "clock-turntable" && (
              <div className="absolute bottom-1 right-2 z-10 pointer-events-none opacity-95">
                <svg viewBox="0 0 46 36" className="w-10 sm:w-12 h-8 sm:h-9 overflow-visible">
                  <defs>
                    {/* Polycarbonate CD Disc Mirror Gradient */}
                    <radialGradient id="cdMirrorBase" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.1" />
                      <stop offset="28%" stopColor="#A8B4C4" stopOpacity="0.95" />
                      <stop offset="85%" stopColor="#E2E8F0" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.85" />
                    </radialGradient>

                    {/* Rainbow Prismatic Flare 1 */}
                    <linearGradient id="cdRainbowFlare1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                      <stop offset="25%" stopColor="#818CF8" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#F472B6" stopOpacity="0.85" />
                      <stop offset="75%" stopColor="#FDE047" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Rainbow Prismatic Flare 2 */}
                    <linearGradient id="cdRainbowFlare2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F472B6" stopOpacity="0.8" />
                      <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.75" />
                      <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
                    </linearGradient>

                    {/* CD Clip for diffraction fans */}
                    <clipPath id="cdDiscClip">
                      <circle cx="31" cy="18" r="10" />
                    </clipPath>
                  </defs>

                  {/* Ground Contact Shadows on windowsill */}
                  <ellipse cx="14" cy="33" rx="11" ry="1.8" fill="#000000" opacity="0.35" />
                  <ellipse cx="32" cy="33" rx="10" ry="1.8" fill="#000000" opacity="0.4" />

                  {/* ━━━━ 1. PROPPED STANDING CD JEWEL CASE ━━━━ */}
                  <g transform="rotate(-7 12 22)">
                    {/* Shadow behind jewel case */}
                    <rect x="2" y="11" width="18" height="19" rx="1" fill="#000000" opacity="0.25" />
                    {/* Clear Acrylic Outer Jewel Case */}
                    <rect
                      x="1"
                      y="10"
                      width="18"
                      height="20"
                      rx="1"
                      fill={isDark ? "rgba(35, 27, 48, 0.7)" : "rgba(255, 255, 255, 0.65)"}
                      stroke={isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(100, 116, 139, 0.45)"}
                      strokeWidth="0.6"
                    />
                    {/* CD Jewel Case Spine Ribbing on Left */}
                    <rect x="1" y="10" width="2" height="20" rx="0.5" fill={isDark ? "#4C1D95" : "#1E3A8A"} />
                    <line x1="2" y1="12" x2="2" y2="28" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.6" />

                    {/* Printed Album Artwork Booklet */}
                    <rect x="3.2" y="11.2" width="15" height="17.6" rx="0.5" fill={isDark ? "#1E1B4B" : "#0F172A"} />
                    {/* Album Art Graphic: Sunset Sun & Ocean */}
                    <circle cx="10" cy="17" r="3.2" fill="#F43F5E" />
                    <path d="M 3.2 21 Q 8 18 12 21 Q 15 23 18.2 20 L 18.2 28.8 L 3.2 28.8 Z" fill="#3B82F6" opacity="0.9" />
                    <circle cx="10" cy="17" r="1.2" fill="#FEF08A" />

                    {/* Jewel Case Specular Plastic Glare Line */}
                    <line x1="2" y1="11" x2="17" y2="28" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.45" />
                  </g>

                  {/* ━━━━ 2. VERTICAL CD PLAYER STAND ━━━━ */}
                  {/* Desktop Chrome Wire Stand Legs */}
                  <line x1="26" y1="28" x2="24" y2="33" stroke={isDark ? "#A8B4C4" : "#64748B"} strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="36" y1="28" x2="38" y2="33" stroke={isDark ? "#A8B4C4" : "#64748B"} strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="23" y1="33" x2="39" y2="33" stroke={isDark ? "#A8B4C4" : "#64748B"} strokeWidth="1.2" strokeLinecap="round" />

                  {/* Vertical CD Player Main Body */}
                  <rect
                    x="21"
                    y="7"
                    width="20"
                    height="23"
                    rx="3"
                    fill={isDark ? "#171222" : "#F1F5F9"}
                    stroke={isDark ? "#4C3B63" : "#CBD5E1"}
                    strokeWidth="0.8"
                  />
                  {/* Subtle Speaker Grille perforations at bottom */}
                  <g opacity="0.5">
                    <circle cx="26" cy="27" r="0.5" fill={isDark ? "#8B78A8" : "#94A3B8"} />
                    <circle cx="28" cy="27" r="0.5" fill={isDark ? "#8B78A8" : "#94A3B8"} />
                    <circle cx="30" cy="27" r="0.5" fill={isDark ? "#8B78A8" : "#94A3B8"} />
                    <circle cx="32" cy="27" r="0.5" fill={isDark ? "#8B78A8" : "#94A3B8"} />
                    <circle cx="34" cy="27" r="0.5" fill={isDark ? "#8B78A8" : "#94A3B8"} />
                    <circle cx="36" cy="27" r="0.5" fill={isDark ? "#8B78A8" : "#94A3B8"} />
                  </g>
                  {/* Power status indicator LED */}
                  <circle cx="38" cy="10" r="0.6" fill="#10B981" className={isDark ? "drop-shadow-[0_0_2px_#34D399]" : ""} />

                  {/* Recessed Circular CD Well */}
                  <circle cx="31" cy="18" r="10.5" fill={isDark ? "#0A0812" : "#1E293B"} stroke={isDark ? "#382C4C" : "#94A3B8"} strokeWidth="0.6" />

                  {/* ━━━━ 3. REALISTIC COMPACT DISC (CD) ━━━━ */}
                  {/* Base Silver Polycarbonate Disc */}
                  <circle cx="31" cy="18" r="10" fill="url(#cdMirrorBase)" stroke="#CBD5E1" strokeWidth="0.4" />

                  {/* Natural Angular Diffraction Rainbow Fans (Clipped to CD) */}
                  <g clipPath="url(#cdDiscClip)">
                    {/* Opposing Butterfly Rainbow Diffraction Wings */}
                    <path
                      d="M 31 18 L 22 10 A 10 10 0 0 1 40 10 Z"
                      fill="url(#cdRainbowFlare1)"
                    />
                    <path
                      d="M 31 18 L 40 26 A 10 10 0 0 1 22 26 Z"
                      fill="url(#cdRainbowFlare2)"
                    />
                  </g>

                  {/* Fine Audio Spiral Track Rings */}
                  <circle cx="31" cy="18" r="8.8" fill="none" stroke="#FFFFFF" strokeWidth="0.25" opacity="0.5" />
                  <circle cx="31" cy="18" r="7.2" fill="none" stroke="#FFFFFF" strokeWidth="0.25" opacity="0.4" />
                  <circle cx="31" cy="18" r="5.6" fill="none" stroke="#FFFFFF" strokeWidth="0.25" opacity="0.4" />

                  {/* Inner Mirror Clamping Ring (Clear Polycarbonate Band) */}
                  <circle cx="31" cy="18" r="3.8" fill={isDark ? "#171222" : "#E2E8F0"} stroke="#94A3B8" strokeWidth="0.4" />
                  {/* Transparent Inner Gap */}
                  <circle cx="31" cy="18" r="2.8" fill={isDark ? "#0A0812" : "#CBD5E1"} />
                  {/* Center Spindle Hole / Motor Hub */}
                  <circle cx="31" cy="18" r="1.3" fill={isDark ? "#1A1526" : "#475569"} stroke="#94A3B8" strokeWidth="0.3" />

                  {/* Clear Acrylic Bay Reflection */}
                  <path
                    d="M 23 11 Q 31 8 39 12"
                    stroke="#FFFFFF"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
                  />
                </svg>
              </div>
            )}

            {/* 9. Realistic Architectural Windowsill Flower Box with Natural Botanical Flora */}
            {detail.silhouette === "flower-box" && (
              <div className="absolute bottom-0 inset-x-1 sm:inset-x-2 z-10 flex flex-col items-center pointer-events-none">
                <svg
                  viewBox="0 0 120 48"
                  className="w-[94%] sm:w-[92%] h-7 sm:h-9 md:h-10 overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.38)]"
                >
                  <defs>
                    {/* Hand-Molded Weathered Terracotta Trough Gradients */}
                    <linearGradient id={`fbTroughGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#74432C" : "#A25F3E"} />
                      <stop offset="25%" stopColor={isDark ? "#5C3320" : "#8A4C2E"} />
                      <stop offset="70%" stopColor={isDark ? "#442416" : "#6E391F"} />
                      <stop offset="100%" stopColor={isDark ? "#2C150B" : "#4D2412"} />
                    </linearGradient>

                    <linearGradient id={`fbRimGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#92593D" : "#BA7651"} />
                      <stop offset="40%" stopColor={isDark ? "#6B3C26" : "#985536"} />
                      <stop offset="100%" stopColor={isDark ? "#3E1E11" : "#61311C"} />
                    </linearGradient>

                    {/* Rich Fertile Loam Soil Bed */}
                    <linearGradient id={`fbSoilGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#140C07" />
                      <stop offset="60%" stopColor="#22150E" />
                      <stop offset="100%" stopColor="#120904" />
                    </linearGradient>

                    {/* Patinated Forged Iron Sill Mounting Brackets */}
                    <linearGradient id={`fbIronGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={isDark ? "#3A3545" : "#4A4557"} />
                      <stop offset="50%" stopColor={isDark ? "#221E2C" : "#2E2A3A"} />
                      <stop offset="100%" stopColor={isDark ? "#120F19" : "#191522"} />
                    </linearGradient>

                    {/* Realistic Botanical Foliage Gradients */}
                    <linearGradient id={`fbFoliageDeep_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#143D28" />
                      <stop offset="100%" stopColor="#081E13" />
                    </linearGradient>

                    <linearGradient id={`fbFoliageMid_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2E6F4D" />
                      <stop offset="65%" stopColor="#1B4D33" />
                      <stop offset="100%" stopColor="#0E2F1F" />
                    </linearGradient>

                    <linearGradient id={`fbFoliageBright_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#489B6E" />
                      <stop offset="70%" stopColor="#27734C" />
                      <stop offset="100%" stopColor="#174A2E" />
                    </linearGradient>

                    <linearGradient id={`fbOlive_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5E832D" />
                      <stop offset="100%" stopColor="#354D16" />
                    </linearGradient>

                    {/* Botanical Floral Petal Gradients */}
                    {/* 1. Deep French Lavender & Salvia */}
                    <linearGradient id={`fbLavenderSpike_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C4B5FD" />
                      <stop offset="30%" stopColor="#9375E0" />
                      <stop offset="75%" stopColor="#6D41BA" />
                      <stop offset="100%" stopColor="#45217D" />
                    </linearGradient>

                    {/* 2. Trailing European Periwinkle / Violet Verbena */}
                    <radialGradient id={`fbPeriwinklePetal_${windowInstanceId}`} cx="50%" cy="40%" r="65%">
                      <stop offset="0%" stopColor="#DDD6FE" />
                      <stop offset="35%" stopColor="#A855F7" />
                      <stop offset="75%" stopColor="#6B21A8" />
                      <stop offset="100%" stopColor="#3B0764" />
                    </radialGradient>

                    {/* 3. Heirloom Soft Coral Rose / Camellia */}
                    <radialGradient id={`fbCoralRose_${windowInstanceId}`} cx="45%" cy="40%" r="65%">
                      <stop offset="0%" stopColor="#FECDD3" />
                      <stop offset="35%" stopColor="#FB7185" />
                      <stop offset="75%" stopColor="#BE123C" />
                      <stop offset="100%" stopColor="#710B23" />
                    </radialGradient>
                  </defs>

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      A. WINDOWSILL CONTACT SHADOW & ARCHITECTURAL BRACKETS
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {/* Diffuse Windowsill Drop Shadow */}
                  <ellipse cx="60" cy="46.5" rx="55" ry="2.2" fill="#000000" opacity={isDark ? "0.65" : "0.38"} />
                  {/* Direct Contact Ambient Occlusion Seam */}
                  <ellipse cx="60" cy="44.8" rx="51" ry="1.2" fill="#000000" opacity={isDark ? "0.82" : "0.52"} />

                  {/* Forged Wrought Iron Sill Brackets (Clamped to stone ledge) */}
                  {/* Left Bracket with classical scroll hook */}
                  <g>
                    <path
                      d="M 18 38 C 16.5 43, 20.2 46.5, 25 46 L 25.8 44.2 C 22.2 44.5, 19.2 42.5, 19.6 38 Z"
                      fill={`url(#fbIronGrad_${windowInstanceId})`}
                      stroke="#16131F"
                      strokeWidth="0.4"
                    />
                    <circle cx="19.4" cy="40" r="0.75" fill="#64748B" />
                    <circle cx="23.2" cy="45" r="0.6" fill="#64748B" />
                  </g>

                  {/* Right Bracket with classical scroll hook */}
                  <g>
                    <path
                      d="M 102 38 C 103.5 43, 99.8 46.5, 95 46 L 94.2 44.2 C 97.8 44.5, 100.8 42.5, 100.4 38 Z"
                      fill={`url(#fbIronGrad_${windowInstanceId})`}
                      stroke="#16131F"
                      strokeWidth="0.4"
                    />
                    <circle cx="100.6" cy="40" r="0.75" fill="#64748B" />
                    <circle cx="96.8" cy="45" r="0.6" fill="#64748B" />
                  </g>

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      B. LAYERED BACKGROUND CANOPY & BOTANICAL STEMS
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {/* Deep Background Foliage Mound (Dense volumetric mass behind blossoms) */}
                  <path
                    d="M 11 27 C 10 18, 17 14, 25 16 C 30 11, 42 8, 52 13 C 61 7, 75 9, 84 13 C 93 8, 104 12, 109 27 Z"
                    fill={`url(#fbFoliageDeep_${windowInstanceId})`}
                    opacity="0.94"
                  />
                  {/* Secondary Mid-Shadow Foliage Masses */}
                  <path
                    d="M 16 26 C 14 19, 23 15, 29 20 C 36 14, 46 12, 53 18 C 64 12, 76 13, 83 19 C 91 14, 100 17, 104 26 Z"
                    fill={`url(#fbFoliageMid_${windowInstanceId})`}
                    opacity="0.88"
                  />

                  {/* Slender Arched Botanical Green Stems */}
                  <path d="M 23 26 Q 24 18 26 12" stroke="#228555" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                  <path d="M 37 26 Q 36 17 38 6" stroke="#2A925E" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                  <path d="M 50 26 Q 49 19 50 14" stroke="#1D6F47" strokeWidth="1.1" fill="none" strokeLinecap="round" />
                  <path d="M 68 26 Q 66 18 69 11" stroke="#228555" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                  <path d="M 83 26 Q 84 17 83 7" stroke="#2A925E" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                  <path d="M 97 26 Q 99 19 96 13" stroke="#228555" strokeWidth="0.8" fill="none" strokeLinecap="round" />

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      C. FRENCH LAVENDER / SALVIA FLORAL SPIKES
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {/* Lavender Spike 1 (Left-Center, towering gracefully at x=37) */}
                  <g>
                    {/* Tiered whorls of delicate calyxes & florets */}
                    {/* Bottom Whorl */}
                    <path d="M 35 15 C 33 13, 36 12, 37 14 C 38 12, 41 13, 39 15 C 38 16, 36 16, 35 15 Z" fill={`url(#fbLavenderSpike_${windowInstanceId})`} />
                    {/* Second Whorl */}
                    <path d="M 35.5 12 C 33.8 10.5, 36.5 9.5, 37.2 11.2 C 38.2 9.5, 40.5 10.5, 39 12 C 38 13, 36.2 13, 35.5 12 Z" fill={`url(#fbLavenderSpike_${windowInstanceId})`} />
                    {/* Third Whorl */}
                    <path d="M 36 9.5 C 34.5 8, 36.8 7.2, 37.4 8.6 C 38.2 7.2, 40.2 8, 38.8 9.5 C 38 10.3, 36.6 10.3, 36 9.5 Z" fill={`url(#fbLavenderSpike_${windowInstanceId})`} />
                    {/* Tapered Crown Floret */}
                    <path d="M 36.5 7.2 C 35.5 5.8, 37.5 4.8, 37.8 6 C 38.5 5, 39.8 6, 38.8 7.2 Z" fill="#DDD6FE" />
                    {/* Tiny stem leaves hugging the stalk */}
                    <path d="M 35 18 Q 32 17 33 15" stroke="#27734C" strokeWidth="0.6" fill="none" />
                    <path d="M 39 17 Q 42 16 41 14" stroke="#27734C" strokeWidth="0.6" fill="none" />
                  </g>

                  {/* Lavender Spike 2 (Right-Center, towering gracefully at x=83) */}
                  <g>
                    <path d="M 81 16 C 79 14, 82 13, 83 15 C 84 13, 87 14, 85 16 C 84 17, 82 17, 81 16 Z" fill={`url(#fbLavenderSpike_${windowInstanceId})`} />
                    <path d="M 81.5 13 C 79.8 11.5, 82.5 10.5, 83.2 12.2 C 84.2 10.5, 86.5 11.5, 85 13 C 84 14, 82.2 14, 81.5 13 Z" fill={`url(#fbLavenderSpike_${windowInstanceId})`} />
                    <path d="M 82 10.2 C 80.5 8.8, 82.8 8, 83.4 9.4 C 84.2 8, 86.2 8.8, 84.8 10.2 Z" fill={`url(#fbLavenderSpike_${windowInstanceId})`} />
                    <path d="M 82.5 7.8 C 81.5 6.5, 83.5 5.5, 83.8 6.8 C 84.5 5.8, 85.8 6.8, 84.8 7.8 Z" fill="#DDD6FE" />
                    <path d="M 81 19 Q 78 18 79 16" stroke="#27734C" strokeWidth="0.6" fill="none" />
                    <path d="M 85 18 Q 88 17 87 15" stroke="#27734C" strokeWidth="0.6" fill="none" />
                  </g>

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      D. SCULPTED BOTANICAL LEAF SPRAYS WITH VEIN HIGHLIGHTS
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {/* Left Ivy Leaves */}
                  <g>
                    {/* Broad 3-lobed leaf */}
                    <path
                      d="M 18 24 C 13 18, 17 13, 22 17 C 24 13, 28 16, 27 20 C 26 24, 21 26, 18 24 Z"
                      fill={`url(#fbFoliageBright_${windowInstanceId})`}
                    />
                    <path d="M 21 21 Q 23 17 24 15" stroke="#A7F3D0" strokeWidth="0.4" fill="none" opacity="0.8" />
                    <path d="M 21 20 Q 18 18 16 18" stroke="#A7F3D0" strokeWidth="0.3" fill="none" opacity="0.6" />
                    <path d="M 22 19 Q 25 18 26 18" stroke="#A7F3D0" strokeWidth="0.3" fill="none" opacity="0.6" />
                  </g>

                  {/* Center-Left Olive Sprig */}
                  <g>
                    <path
                      d="M 43 23 C 39 16, 47 13, 50 18 C 48 22, 45 25, 43 23 Z"
                      fill={`url(#fbOlive_${windowInstanceId})`}
                    />
                    <path d="M 45 20 Q 47 16 49 16" stroke="#BEF264" strokeWidth="0.35" fill="none" opacity="0.75" />
                  </g>

                  {/* Center-Right Lush Leaves */}
                  <g>
                    <path
                      d="M 60 24 C 56 17, 64 14, 67 19 C 65 23, 62 25, 60 24 Z"
                      fill={`url(#fbFoliageBright_${windowInstanceId})`}
                    />
                    <path d="M 62 20 Q 64 16 66 17" stroke="#A7F3D0" strokeWidth="0.35" fill="none" opacity="0.7" />
                  </g>

                  {/* Right Foliage Cluster */}
                  <g>
                    <path
                      d="M 88 23 C 85 16, 92 13, 95 18 C 94 22, 90 25, 88 23 Z"
                      fill={`url(#fbOlive_${windowInstanceId})`}
                    />
                    <path d="M 90 20 Q 92 16 94 16" stroke="#BEF264" strokeWidth="0.35" fill="none" opacity="0.75" />
                    <path
                      d="M 99 24 C 95 18, 102 14, 106 19 C 104 23, 101 25, 99 24 Z"
                      fill={`url(#fbFoliageBright_${windowInstanceId})`}
                    />
                    <path d="M 101 20 Q 103 16 105 17" stroke="#A7F3D0" strokeWidth="0.35" fill="none" opacity="0.7" />
                  </g>

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      E. REALISTIC NON-CARTOON BOTANICAL FLOWER BLOSSOMS
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

                  {/* FLOWER 1 (Left): European Periwinkle / Vinca (Organic 5-petal pinwheel at x=25, y=14) */}
                  <g transform="translate(25, 14)">
                    {/* Natural curved petals overlapping organically (not mechanical circles!) */}
                    {/* Petal 1 (Top) */}
                    <path d="M 0 -1.5 C -2.5 -5, 2.5 -6, 2 -1.8 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    {/* Petal 2 (Top Right) */}
                    <path d="M 1 -0.8 C 4.5 -2.8, 5.8 1.8, 1.8 1.2 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    {/* Petal 3 (Bottom Right) */}
                    <path d="M 0.8 0.8 C 3 4.2, -1 5.4, -0.4 1.8 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    {/* Petal 4 (Bottom Left) */}
                    <path d="M -0.8 0.8 C -4.2 3.2, -5.2 -0.8, -1.6 -0.2 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    {/* Petal 5 (Top Left) */}
                    <path d="M -1 -0.8 C -3.8 -4, -0.8 -4.5, -0.4 -1.6 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    {/* Deep Inky-Violet Star Throat Core */}
                    <circle cx="0" cy="0" r="1.3" fill="#2E0854" />
                    {/* Pale Cream Stamen Eye */}
                    <circle cx="0" cy="0" r="0.6" fill="#FEF08A" />
                    <circle cx="-0.3" cy="-0.2" r="0.25" fill="#FFFFFF" opacity="0.9" />
                  </g>
                  {/* Delicate curved periwinkle bud on stalk */}
                  <path d="M 17 14 C 15 11, 18 9, 19 12 C 18 14, 17 16, 17 14 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                  <path d="M 17 15 Q 16 18 18 22" stroke="#1D6F47" strokeWidth="0.7" fill="none" />

                  {/* FLOWER 2 (Center): Heirloom English Tea Rose / Coral Camellia (x=50, y=13) */}
                  <g transform="translate(50, 13)">
                    {/* Multi-layered natural petal cups with realistic curled margins */}
                    {/* Outer Petals */}
                    <path d="M -5.2 -1.2 C -6.5 -5, 0.5 -6.5, 3.2 -4 C 6.5 -1.5, 5 4.5, 0 5.2 C -5 4.5, -6 2.5, -5.2 -1.2 Z" fill={`url(#fbCoralRose_${windowInstanceId})`} />
                    {/* Mid Ruffled Petal Layers */}
                    <path d="M -3.8 -2.5 C -4.5 -4.5, 1.5 -4.8, 3.5 -2.2 C 4.5 1, 1.5 3.8, -1.8 3.5 C -4.2 2.5, -4.5 -0.5, -3.8 -2.5 Z" fill="#E11D48" opacity="0.9" />
                    {/* Inner Curled Petal Fold */}
                    <path d="M -2.2 -1 C -2.5 -2.8, 1.8 -3, 2.2 -0.8 C 2.5 1.5, -0.5 2.5, -1.8 1.8 Z" fill="#FDA4AF" />
                    <path d="M -1.2 -0.4 C -1 -1.5, 1 -1.5, 1.2 -0.2 C 1 1, -0.5 1.2, -1.2 -0.4 Z" fill="#BE123C" />
                    {/* Glimmering Stamen Pistil */}
                    <circle cx="0" cy="0" r="0.65" fill="#FEF08A" />
                  </g>
                  {/* Tender unopened rosebud beside the main bloom */}
                  <g>
                    <path d="M 57 15 C 55 12, 59 10, 60 13 C 59 15, 57 17, 57 15 Z" fill="#FB7185" />
                    <path d="M 56 16 C 55 14, 57 13, 58 14" stroke="#1D6F47" strokeWidth="0.6" fill="none" />
                    <path d="M 57 16 Q 56 20 55 24" stroke="#1D6F47" strokeWidth="0.7" fill="none" />
                  </g>

                  {/* FLOWER 3 (Center-Right): Deep Royal Violet Verbena / Periwinkle (x=69, y=13) */}
                  <g transform="translate(69, 13)">
                    <path d="M 0 -1.5 C -2.2 -4.8, 2.4 -5.5, 1.8 -1.6 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    <path d="M 1 -0.6 C 4.2 -2.5, 5.4 1.6, 1.6 1 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    <path d="M 0.6 0.8 C 2.8 4, -1 5, -0.4 1.6 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    <path d="M -0.8 0.6 C -4 3, -4.8 -0.8, -1.4 -0.2 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    <path d="M -0.8 -0.8 C -3.5 -3.6, -0.6 -4.2, -0.2 -1.4 Z" fill={`url(#fbPeriwinklePetal_${windowInstanceId})`} />
                    <circle cx="0" cy="0" r="1.2" fill="#2E0854" />
                    <circle cx="0" cy="0" r="0.55" fill="#FEF08A" />
                  </g>

                  {/* FLOWER 4 (Far-Right): Soft English Tea Rose Bud & Opening Bloom (x=98, y=14) */}
                  <g transform="translate(98, 14)">
                    <path d="M -4 -1 C -5 -4, 0.5 -5, 2.5 -3 C 5 -1, 4 3.5, 0 4 C -4 3.5, -4.5 1.5, -4 -1 Z" fill={`url(#fbCoralRose_${windowInstanceId})`} />
                    <path d="M -2.5 -1.8 C -3 -3.5, 1 -3.8, 2.5 -1.5 C 3 0.8, 1 2.8, -1 2.5 C -2.8 1.8, -3 -0.2, -2.5 -1.8 Z" fill="#E11D48" opacity="0.85" />
                    <path d="M -1.5 -0.8 C -1.8 -2, 1.2 -2.2, 1.5 -0.5 C 1.5 1, -0.2 1.5, -1 1 Z" fill="#FDA4AF" />
                    <circle cx="0" cy="0" r="0.5" fill="#FEF08A" />
                  </g>

                  {/* Delicate Wild Jasmine / Sweet Alyssum Starlets Nestled in Foliage */}
                  {/* Starlet Cluster 1 (between 1 & Rose at x=31, y=18) */}
                  <g transform="translate(31, 18)">
                    <path d="M 0 -2.2 L 0.5 -0.6 L 2 -0.6 L 0.8 0.4 L 1.2 2 L 0 1 L -1.2 2 L -0.8 0.4 L -2 -0.6 L -0.5 -0.6 Z" fill="#F8FAFC" opacity="0.95" />
                    <circle cx="0" cy="0" r="0.4" fill="#F59E0B" />
                  </g>
                  {/* Starlet Cluster 2 (beside Rose at x=62, y=17) */}
                  <g transform="translate(62, 17)">
                    <path d="M 0 -2 L 0.5 -0.5 L 1.8 -0.5 L 0.7 0.4 L 1.1 1.8 L 0 0.9 L -1.1 1.8 L -0.7 0.4 L -1.8 -0.5 L -0.5 -0.5 Z" fill="#F8FAFC" opacity="0.95" />
                    <circle cx="0" cy="0" r="0.4" fill="#F59E0B" />
                  </g>
                  {/* Starlet Cluster 3 (near Lavender at x=76, y=17) */}
                  <g transform="translate(76, 17)">
                    <path d="M 0 -1.8 L 0.4 -0.5 L 1.6 -0.5 L 0.6 0.3 L 1 1.6 L 0 0.8 L -1 1.6 L -0.6 0.3 L -1.6 -0.5 L -0.4 -0.5 Z" fill="#F8FAFC" opacity="0.9" />
                    <circle cx="0" cy="0" r="0.35" fill="#F59E0B" />
                  </g>

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      F. ARCHITECTURAL HAND-CRAFTED TERRACOTTA PLANTER TROUGH
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {/* Rich Fertile Loam Soil Bed (visible at aperture lip) */}
                  <ellipse cx="60" cy="26.8" rx="50" ry="2.6" fill={`url(#fbSoilGrad_${windowInstanceId})`} />
                  {/* Tiny organic peat textures */}
                  <ellipse cx="40" cy="26.8" rx="6" ry="1.2" fill="#0A0604" opacity="0.7" />
                  <ellipse cx="80" cy="26.8" rx="7" ry="1.1" fill="#0A0604" opacity="0.7" />

                  {/* Main Planter Box Body (Tuscan tapered profile) */}
                  <polygon
                    points="11,28 109,28 106.5,43 13.5,43"
                    fill={`url(#fbTroughGrad_${windowInstanceId})`}
                    stroke={isDark ? "#231107" : "#4A2412"}
                    strokeWidth="0.7"
                  />

                  {/* Molded Upper Architectural Beveled Rim Lip */}
                  <rect
                    x="8"
                    y="24.8"
                    width="104"
                    height="4"
                    rx="1.2"
                    fill={`url(#fbRimGrad_${windowInstanceId})`}
                    stroke={isDark ? "#231107" : "#4A2412"}
                    strokeWidth="0.65"
                  />
                  {/* Specular Ambient Rim Edge Highlight */}
                  <line
                    x1="9"
                    y1="25.5"
                    x2="111"
                    y2="25.5"
                    stroke={isDark ? "#AF6B48" : "#E29A72"}
                    strokeWidth="0.55"
                    opacity="0.8"
                  />
                  {/* Underside Cast Shadow Beneath Upper Rim */}
                  <line
                    x1="10"
                    y1="29.1"
                    x2="110"
                    y2="29.1"
                    stroke={isDark ? "#120803" : "#2E1509"}
                    strokeWidth="0.8"
                    opacity="0.9"
                  />

                  {/* Classical Architectural Recessed Panel Relief */}
                  <rect
                    x="15"
                    y="31"
                    width="90"
                    height="9.5"
                    rx="0.8"
                    fill="none"
                    stroke={isDark ? "#180A04" : "#36190B"}
                    strokeWidth="0.7"
                    opacity="0.9"
                  />
                  <rect
                    x="15.5"
                    y="31.5"
                    width="89"
                    height="8.5"
                    rx="0.5"
                    fill="none"
                    stroke={isDark ? "#522C17" : "#874D2B"}
                    strokeWidth="0.35"
                    opacity="0.6"
                  />

                  {/* Subtle Tuscan Hand-Chiseled Horizontal Terracotta Seam Line */}
                  <line
                    x1="16"
                    y1="35.8"
                    x2="104"
                    y2="35.8"
                    stroke={isDark ? "#2A140A" : "#542D18"}
                    strokeWidth="0.45"
                    opacity="0.65"
                  />

                  {/* Classical Center Rosette / Seal Motif on Trough Panel */}
                  <g transform="translate(60, 35.8)">
                    <circle cx="0" cy="0" r="2.2" fill={isDark ? "#3F2112" : "#6E391D"} stroke={isDark ? "#1B0B04" : "#3D1D0D"} strokeWidth="0.4" />
                    <circle cx="0" cy="0" r="1.3" fill={isDark ? "#58301B" : "#8F4F2B"} />
                    <circle cx="0" cy="0" r="0.5" fill={isDark ? "#824B2D" : "#B86C40"} />
                  </g>

                  {/* Lower Base Molding Trim */}
                  <rect
                    x="12"
                    y="42"
                    width="96"
                    height="1.8"
                    rx="0.5"
                    fill={`url(#fbRimGrad_${windowInstanceId})`}
                    stroke={isDark ? "#231107" : "#4A2412"}
                    strokeWidth="0.45"
                  />

                  {/* Classical Bronzed Wrought Corner Straps */}
                  {/* Left Strap */}
                  <rect x="13.2" y="28.5" width="2.8" height="13.8" rx="0.3" fill={`url(#fbIronGrad_${windowInstanceId})`} />
                  <circle cx="14.6" cy="30.5" r="0.6" fill="#94A3B8" />
                  <circle cx="14.6" cy="40.5" r="0.6" fill="#94A3B8" />
                  {/* Right Strap */}
                  <rect x="104" y="28.5" width="2.8" height="13.8" rx="0.3" fill={`url(#fbIronGrad_${windowInstanceId})`} />
                  <circle cx="105.4" cy="30.5" r="0.6" fill="#94A3B8" />
                  <circle cx="105.4" cy="40.5" r="0.6" fill="#94A3B8" />

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      G. ORGANIC ENGLISH IVY CASCADE (TUMBLES OVER FRONT RIM)
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {/* Cascading Vine 1 (Weeps gracefully over Left Rim down to y=43) */}
                  <g>
                    <path d="M 23 26 C 24 30, 20.5 35, 22.5 43" stroke="#174A2E" strokeWidth="0.75" fill="none" strokeLinecap="round" />
                    {/* Ivy Leaf A (Spilling over lip) */}
                    <path d="M 23 29 C 26 27, 28 31, 25 33 C 23.5 33, 22.5 31, 23 29 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
                    <path d="M 24 29.5 Q 26 31 25.5 32" stroke="#A7F3D0" strokeWidth="0.3" fill="none" opacity="0.75" />
                    {/* Ivy Leaf B (Mid-cascade) */}
                    <path d="M 21 34 C 17.5 33, 18.5 38, 21.5 38 C 22.5 37, 22.5 35, 21 34 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
                    {/* Ivy Leaf C (Lowest tip) */}
                    <path d="M 22.5 42 C 25 41, 26 44.5, 23.5 45.5 C 22 45, 21.8 43, 22.5 42 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
                  </g>

                  {/* Cascading Vine 2 (Center-Left small spillover at x=44) */}
                  <g>
                    <path d="M 44 26 C 45 29, 43 32, 45 36" stroke="#174A2E" strokeWidth="0.7" fill="none" strokeLinecap="round" />
                    <path d="M 44 30 C 47 28.5, 48 32.5, 45.5 33.5 C 44 33, 43.5 31.5, 44 30 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
                    <path d="M 45 35 C 47.5 34, 48 37.5, 45.8 38 C 44.5 37.5, 44.2 36, 45 35 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
                  </g>

                  {/* Cascading Vine 3 (Center-Right dramatic drape across panel at x=73) */}
                  <g>
                    <path d="M 73 26 C 74.5 31, 71 36, 74 44" stroke="#174A2E" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                    <path d="M 74 31 C 77 29, 79 33.5, 76 35.5 C 74 35.5, 73 33.5, 74 31 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
                    <path d="M 75 32 Q 77 33.5 76.5 34.5" stroke="#A7F3D0" strokeWidth="0.3" fill="none" opacity="0.75" />
                    <path d="M 72 37 C 68 36, 69.5 41, 72.5 41 C 73.5 40, 73.5 38, 72 37 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
                    <path d="M 74 43 C 77 42, 78 46, 75 46.8 C 73 46, 73 44, 74 43 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
                  </g>

                  {/* Cascading Vine 4 (Far-Right tumbling sprig past the bracket at x=95) */}
                  <g>
                    <path d="M 95 26 C 97 30, 93.5 34, 96 41" stroke="#174A2E" strokeWidth="0.75" fill="none" strokeLinecap="round" />
                    <path d="M 96 30 C 99 28.5, 101 32.5, 98 34.5 C 96 34.5, 95 32.5, 96 30 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
                    <path d="M 94.5 36 C 91.5 35, 92.5 39.5, 95.5 39.5 C 96.5 38.5, 96.5 37, 94.5 36 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
                  </g>
                </svg>
              </div>
            )}
          </div>
        )}

        {/* ACTIVE STATE: WARM CINEMATIC ROOM INTERIOR WITH BESPOKE SPATIAL OBJECTS */}
        {isActive && data && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-700 ease-out">
            {/* Ambient Warm Room Lighting (Fills the chamber naturally) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute inset-0 transition-colors duration-700 ${
                isDark
                  ? "bg-gradient-to-b from-[#1C1610] via-[#2A1E14] to-[#18110B]"
                  : "bg-gradient-to-b from-[#FFFDF8] via-[#FFF5E6] to-[#FCECD2]"
              }`}
            />

            {/* Motivated Warm Table/Desk Lamp Light Source with Radial Spread */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              className="absolute top-1 sm:top-2 right-2 sm:right-3 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.55)_0%,_rgba(245,158,11,0.25)_45%,_transparent_75%)] pointer-events-none blur-sm"
            />

            {/* Bespoke Room Objects Silhouette & Spatial Setup */}
            {data.id === "window-builder" && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              >
                {/* Desk Surface */}
                <div className={`absolute bottom-3 inset-x-2 h-1 rounded-sm ${isDark ? "bg-[#3A2A1E]" : "#8C6345"}`} />
                {/* Laptop with Cool Screen Glow */}
                <div className="absolute bottom-4 left-6 w-7 h-5 rounded-t-[1px] bg-slate-800 border border-slate-600 shadow-[0_0_12px_rgba(147,197,253,0.6)] flex items-center justify-center">
                  <div className="w-5 h-3.5 bg-blue-100/90 rounded-[1px] shadow-[0_0_8px_rgba(219,234,254,0.9)]" />
                </div>
                {/* Laptop Base */}
                <div className="absolute bottom-3.5 left-5 w-9 h-[2px] bg-slate-700 rounded-full" />
                {/* Brass Desk Lamp with Soft Cone */}
                <div className="absolute bottom-4 right-7 w-2 h-7 border-r-2 border-amber-300/80 rounded-tr" />
                <div className="absolute bottom-10 right-6 w-4 h-2 rounded-t-full bg-amber-400 shadow-[0_0_10px_#F59E0B]" />
                {/* Studio Chair Silhouette */}
                <div className="absolute bottom-0 left-16 w-6 h-9 rounded-t-lg bg-black/40" />
              </motion.div>
            )}

            {data.id === "window-detail" && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              >
                {/* Solid Drafting Desk */}
                <div className={`absolute bottom-3 inset-x-2 h-1 rounded-sm ${isDark ? "bg-[#38261A]" : "#7D5438"}`} />
                {/* Sketchbook with Pencil */}
                <div className="absolute bottom-4 left-5 w-8 h-5 -rotate-3 bg-amber-50 rounded-[1px] border border-amber-200/80 shadow-sm flex flex-col justify-around p-0.5">
                  <div className="w-4 h-[1px] bg-slate-400" />
                  <div className="w-6 h-[1px] bg-slate-400" />
                  <div className="w-5 h-[1px] bg-slate-400" />
                </div>
                {/* Small potted desk plant */}
                <div className="absolute bottom-4 left-15 w-3 h-3 rounded-b-sm bg-amber-700" />
                <div className="absolute bottom-7 left-14.5 w-4 h-3 rounded-full bg-emerald-600/90 shadow-sm" />
                {/* Warm reading lamp */}
                <div className="absolute bottom-4 right-6 w-1.5 h-8 border-r border-amber-400/90" />
                <div className="absolute bottom-11 right-5 w-3.5 h-3 rounded-t-md bg-amber-200/95 shadow-[0_0_12px_#FBBF24]" />
              </motion.div>
            )}

            {data.id === "window-collaborator" && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              >
                {/* Meeting table */}
                <div className={`absolute bottom-3 inset-x-3 h-1.5 rounded-sm ${isDark ? "bg-[#3D2C20]" : "#8F6649"}`} />
                {/* Sticky notes on wall board in background */}
                <div className="absolute top-2 left-4 flex gap-1">
                  <div className="w-2.5 h-2.5 bg-yellow-300 shadow-sm rotate-2" />
                  <div className="w-2.5 h-2.5 bg-rose-300 shadow-sm -rotate-3" />
                  <div className="w-2.5 h-2.5 bg-emerald-300 shadow-sm rotate-1" />
                </div>
                {/* Two chairs on sides */}
                <div className="absolute bottom-1 left-2 w-4 h-7 rounded-t bg-black/45" />
                <div className="absolute bottom-1 right-3 w-4 h-7 rounded-t bg-black/45" />
                {/* Coffee mugs on table */}
                <div className="absolute bottom-4.5 left-10 w-2 h-2.5 bg-stone-200 rounded-sm" />
                <div className="absolute bottom-4.5 right-11 w-2 h-2.5 bg-amber-200 rounded-sm" />
              </motion.div>
            )}

            {data.id === "window-elsewhere" && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              >
                {/* Wooden shelf / ledge */}
                <div className={`absolute bottom-3 inset-x-2 h-1 rounded-sm ${isDark ? "bg-[#332216]" : "#784F32"}`} />
                {/* World map silhouette on rear wall */}
                <div className="absolute top-2 left-6 right-6 h-7 opacity-25 border border-amber-300/40 rounded flex items-center justify-around">
                  <div className="w-3 h-2 rounded-full border border-amber-300/60" />
                  <div className="w-4 h-3 rounded-full border border-amber-300/60" />
                </div>
                {/* Vintage Camera */}
                <div className="absolute bottom-4 left-6 w-4.5 h-3 bg-stone-800 rounded-[1px] border border-stone-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-300 border border-stone-900" />
                </div>
                {/* Leather valise / small suitcase */}
                <div className="absolute bottom-4 right-7 w-6 h-4.5 rounded-[2px] bg-amber-800 border border-amber-950 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1 border-t-2 border-amber-950" />
                </div>
              </motion.div>
            )}

            {/* Cinematic Discovered Editorial Typography */}
            <div className="absolute inset-0 p-2 sm:p-2.5 md:p-3 flex flex-col justify-between z-20 pointer-events-none select-none">
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex items-center gap-1.5"
              >
                <span className="font-sora text-[8px] sm:text-[9.5px] font-bold tracking-[0.16em] uppercase drop-shadow-sm text-amber-200">
                  {data.number} / {data.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className={`mt-auto -mx-1 -mb-1 p-2 sm:p-2.5 rounded-[2px] backdrop-blur-[2px] border ${
                  isDark
                    ? "bg-[#0A0704]/80 border-amber-500/20 text-[#FEF3C7]"
                    : "bg-[#FFFFFF]/90 border-amber-600/25 text-[#451A03]"
                }`}
              >
                <p className="font-fraunces text-[10.5px] sm:text-[12px] md:text-[12.5px] font-medium leading-[1.3] drop-shadow-sm italic">
                  “{data.sentence}”
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* 4-Pane Architectural Window Muntins & Center Astragal Lock */}
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
            {/* Center Brass Window Latch */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-full bg-amber-400/90 shadow-[0_0_3px_black] z-20 pointer-events-none" />
            <div className="flex-1" />
            <div className="flex-1" />
          </div>
        </div>
      </div>

      {/* Architectural Window Sill Ledge */}
      <div
        className="absolute -bottom-1.5 inset-x-[-3px] h-[4px] rounded-[1px] transition-all duration-700 ease-out z-20"
        style={{
          backgroundColor: isActive
            ? isDark
              ? "#543015"
              : "#D4A373"
            : isDark
            ? "#1E1A29"
            : "#B0A2C5",
          boxShadow: isActive
            ? "0 2px 8px rgba(251, 191, 36, 0.45)"
            : isDark
            ? "0 3px 5px rgba(0,0,0,0.95)"
            : "0 2px 4px rgba(52,21,78,0.25)",
          borderTop: isActive
            ? "1px solid rgba(254, 240, 138, 0.85)"
            : isDark
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid rgba(255,255,255,0.9)",
        }}
      />
    </div>
  );
}
