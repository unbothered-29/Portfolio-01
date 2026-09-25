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
    | "cold-coffee-cup"
    | "cold-coffee-can"
    | "books-coffee"
    | "glow-lamp"
    | "lush-monstera"
    | "art-easel"
    | "vintage-camera"
    | "desk-headphones"
    | "clock-turntable"
    | "flower-box";
  specularAngle: string;
}

const WINDOW_DETAILS: WindowDetailConfig[][] = [
  // Floor 0 (Top floor)
  [
    { blindStyle: "drapes-ochre", silhouette: "lush-monstera", specularAngle: "125deg" }, // Royal Purple Velvet Split Drapes with Potted Monstera
    { blindStyle: "blinds-half", specularAngle: "135deg" }, // Interactive Blue
    { blindStyle: "shade-half", silhouette: "cold-coffee-cup", specularAngle: "145deg" }, // Minimalist Roller Shade with Iced Cold Coffee Cup
    { blindStyle: "blinds-three-quarter", silhouette: "hanging-ivy", specularAngle: "130deg" }, // Architectural Horizontal Blinds
  ],
  // Floor 1 (Second row)
  [
    { blindStyle: "shade-half", silhouette: "vintage-camera", specularAngle: "140deg" }, // Studio Roller Shade with Vintage Camera on Window Sill
    { blindStyle: "drapes-terracotta", silhouette: "lush-monstera", specularAngle: "120deg" }, // Purple Left-Swept Drape
    { blindStyle: "minimal", silhouette: "desk-headphones", specularAngle: "135deg" }, // Warmly Lit Studio with Solid Oak Desk & Headphones
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
    { blindStyle: "drapes-navy", silhouette: "glow-lamp", specularAngle: "120deg" }, // Purple Right-Swept Drape with Warm Glow Lamp
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
            : detail.silhouette === "desk-headphones"
            ? isDark
              ? "bg-gradient-to-b from-[#1C1425] via-[#2A1D1A] to-[#362217] shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] border-[#D97706]/45"
              : "bg-gradient-to-b from-[#FEF9EE] via-[#FBF0D9] to-[#F5E2C4] shadow-[inset_0_1px_5px_rgba(52,21,78,0.1)] border-[#B45309]/50"
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

            {/* 4. Chilled Iced Cold Coffee Cup (Jessica's Favorite Drink - Matching Photo) */}
            {(detail.silhouette === "cold-coffee-cup" ||
              detail.silhouette === "cold-coffee-can" ||
              detail.silhouette === "books-coffee") && (
              <div
                className="absolute bottom-0 right-2 z-10 pointer-events-auto group/coffeecup"
                title="Iced Cold Coffee • Jessica's Favorite Drink"
              >
                {/* Subtle Chilled Condensation Aura / Cool Frost Glow */}
                <div className="absolute -inset-1 rounded-full bg-amber-400/10 dark:bg-cyan-400/10 blur-sm pointer-events-none opacity-60 group-hover/coffeecup:opacity-100 transition-opacity" />

                <svg viewBox="0 0 54 84" className="w-5 sm:w-6 md:w-7 h-7.5 sm:h-9 md:h-10.5 overflow-visible drop-shadow-md">
                  <defs>
                    {/* Clear Cup Body Clip */}
                    <clipPath id="icedCupLiquidClip">
                      <path d="M 6.8 20 L 14.2 75.5 Q 27 77.8 39.8 75.5 L 47.2 20 Z" />
                    </clipPath>

                    {/* Rich Creamy Iced Latte / Cold Coffee Liquid Gradient */}
                    <linearGradient id="icedLatteFluidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E6A15C" />
                      <stop offset="6%" stopColor="#D98836" />
                      <stop offset="16%" stopColor="#B86924" />
                      <stop offset="35%" stopColor="#874719" />
                      <stop offset="60%" stopColor="#633211" />
                      <stop offset="85%" stopColor="#48220A" />
                      <stop offset="100%" stopColor="#2D1305" />
                    </linearGradient>

                    {/* Cream Marbling Gradient for swirling coffee waves */}
                    <linearGradient id="creamySwirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F5D09D" stopOpacity="0.85" />
                      <stop offset="40%" stopColor="#D98A3B" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#8A481B" stopOpacity="0" />
                    </linearGradient>

                    {/* Transparent Plastic Sheen Gradient */}
                    <linearGradient id="clearPlasticSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                      <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.2" />
                      <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.03" />
                      <stop offset="75%" stopColor="#BAE6FD" stopOpacity="0.08" />
                      <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    </linearGradient>

                    {/* Clear Ice Cube Crystalline Shading */}
                    <linearGradient id="crystalIceTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.4" />
                    </linearGradient>

                    <linearGradient id="crystalIceSideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.75" />
                      <stop offset="45%" stopColor="#92400E" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#451A03" stopOpacity="0.9" />
                    </linearGradient>

                    <linearGradient id="iceCubeDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3E1A07" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#1C0A02" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#451A03" stopOpacity="0.75" />
                    </linearGradient>

                    {/* Black Straw Cylinder Gradient */}
                    <linearGradient id="blackStrawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#111827" />
                      <stop offset="30%" stopColor="#374151" />
                      <stop offset="60%" stopColor="#4B5563" />
                      <stop offset="85%" stopColor="#1F2937" />
                      <stop offset="100%" stopColor="#0B0F17" />
                    </linearGradient>

                    {/* Clear Plastic Lid Rim Gradient */}
                    <linearGradient id="clearLidRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
                      <stop offset="25%" stopColor="#BAE6FD" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
                      <stop offset="80%" stopColor="#BAE6FD" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  {/* ━━━━ GROUND CONTACT SHADOW ━━━━ */}
                  <ellipse cx="27" cy="78" rx="14" ry="2.8" fill="#000000" opacity={isDark ? "0.65" : "0.35"} />

                  {/* ━━━━ MATTE BLACK STRAW (Extending from top-left through lid) ━━━━ */}
                  <g>
                    {/* Straw Body - Angled leaning left as shown in photo */}
                    <polygon
                      points="16,24 13.5,24 4.5,2.5 7.5,1.5"
                      fill="url(#blackStrawGrad)"
                      stroke="#09090B"
                      strokeWidth="0.3"
                    />
                    {/* Straw Top Cut Opening */}
                    <ellipse cx="6" cy="2" rx="1.6" ry="0.6" transform="rotate(-24 6 2)" fill="#27272A" stroke="#18181B" strokeWidth="0.3" />
                    {/* Specular Ridge on Straw */}
                    <line x1="14.8" y1="24" x2="6.2" y2="2" stroke="#9CA3AF" strokeWidth="0.35" opacity="0.6" />
                  </g>

                  {/* ━━━━ CUP INTERIOR COFFEE LIQUID & ICE (Clipped to cup silhouette) ━━━━ */}
                  <g clipPath="url(#icedCupLiquidClip)">
                    {/* Base Coffee Liquid Fill */}
                    <rect x="5" y="19" width="44" height="60" fill="url(#icedLatteFluidGrad)" />

                    {/* Darker Submerged Ice Cubes visible through translucent iced coffee */}
                    {/* Submerged Ice Cube 1 (mid left) */}
                    <polygon
                      points="10,43 14,39 21,41 18,52 11,50"
                      fill="url(#iceCubeDeepGrad)"
                      stroke="#5C2607"
                      strokeWidth="0.4"
                    />
                    {/* Submerged Ice Cube 2 (upper center) */}
                    <polygon
                      points="23,31 30,29 33,38 27,43 21,37"
                      fill="url(#iceCubeDeepGrad)"
                      stroke="#632B09"
                      strokeWidth="0.4"
                    />
                    {/* Submerged Ice Cube 3 (mid right) */}
                    <polygon
                      points="36,44 42,42 43,54 37,56 34,48"
                      fill="url(#iceCubeDeepGrad)"
                      stroke="#4D2005"
                      strokeWidth="0.4"
                    />
                    {/* Submerged Ice Cube 4 (lower center) */}
                    <polygon
                      points="22,57 30,55 32,65 24,67 20,61"
                      fill="url(#iceCubeDeepGrad)"
                      stroke="#3B1804"
                      strokeWidth="0.4"
                    />
                    {/* Submerged Ice Cube 5 (lower left) */}
                    <polygon
                      points="14,60 19,59 19,68 13,67"
                      fill="url(#iceCubeDeepGrad)"
                      stroke="#3B1804"
                      strokeWidth="0.35"
                    />

                    {/* Cream Marbling Waves (Natural Latte Swirls) */}
                    <path
                      d="M 6.8 25 Q 16 23 27 26 Q 38 29 47.2 24 L 47.2 30 Q 36 34 25 30 Q 15 28 6.8 31 Z"
                      fill="url(#creamySwirlGrad)"
                    />
                    <path
                      d="M 8 36 Q 18 39 30 35 Q 40 33 46 38 L 45 41 Q 38 36 28 38 Q 16 42 9 39 Z"
                      fill="#F5D09D"
                      opacity="0.28"
                    />
                    <path
                      d="M 12 48 Q 22 51 32 47 Q 40 45 44 49 L 43 51 Q 38 48 30 49 Q 20 53 13 50 Z"
                      fill="#FDE68A"
                      opacity="0.2"
                    />
                  </g>

                  {/* ━━━━ GLISTENING CRYSTAL ICE CUBES FLOATING AT TOP (Under Lid) ━━━━ */}
                  {/* Floating Ice Cube 1 (Front Left) */}
                  <g>
                    {/* Top facet */}
                    <polygon points="12,22 17,19 25,20 20,24" fill="url(#crystalIceTopGrad)" stroke="#FFFFFF" strokeWidth="0.4" />
                    {/* Left front facet */}
                    <polygon points="12,22 20,24 19,29 11,27" fill="url(#crystalIceSideGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
                    {/* Right facet */}
                    <polygon points="20,24 25,20 24,26 19,29" fill="url(#crystalIceSideGrad)" stroke="#E0F2FE" strokeWidth="0.3" />
                  </g>

                  {/* Floating Ice Cube 2 (Center Peak - Large faceted crystal) */}
                  <g>
                    <polygon points="21,17 28,14 36,16 30,20" fill="url(#crystalIceTopGrad)" stroke="#FFFFFF" strokeWidth="0.45" />
                    <polygon points="21,17 30,20 29,27 20,23" fill="url(#crystalIceSideGrad)" stroke="#FFFFFF" strokeWidth="0.35" />
                    <polygon points="30,20 36,16 35,23 29,27" fill="url(#crystalIceSideGrad)" stroke="#FED7AA" strokeWidth="0.35" />
                  </g>

                  {/* Floating Ice Cube 3 (Top Right Peak) */}
                  <g>
                    <polygon points="33,18 39,15 45,17 39,21" fill="url(#crystalIceTopGrad)" stroke="#FFFFFF" strokeWidth="0.45" />
                    <polygon points="33,18 39,21 38,26 32,23" fill="url(#crystalIceSideGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
                    <polygon points="39,21 45,17 44,24 38,26" fill="url(#crystalIceSideGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
                  </g>

                  {/* Floating Ice Cube 4 (Far Left against rim) */}
                  <polygon points="8,23 13,20 14,26 9,28" fill="url(#crystalIceTopGrad)" stroke="#FFFFFF" strokeWidth="0.35" opacity="0.9" />

                  {/* Floating Ice Cube 5 (Far Right against rim) */}
                  <polygon points="41,20 46,22 45,28 39,26" fill="url(#crystalIceTopGrad)" stroke="#FFFFFF" strokeWidth="0.35" opacity="0.9" />

                  {/* Crystalline Specular Sparkles / Ice Highlights on cubes */}
                  <circle cx="21" cy="17" r="0.6" fill="#FFFFFF" />
                  <circle cx="30" cy="20" r="0.6" fill="#FFFFFF" />
                  <circle cx="39" cy="15" r="0.55" fill="#FFFFFF" />
                  <circle cx="17" cy="19" r="0.5" fill="#FFFFFF" />
                  <circle cx="36" cy="16" r="0.5" fill="#FFFFFF" />

                  {/* ━━━━ CLEAR PLASTIC TAKEAWAY CUP STRUCTURAL RIDGES ━━━━ */}
                  {/* Outer Cup Boundary / Glass Transparency Layer */}
                  <path
                    d="M 6.8 20 L 14.2 75.5 Q 27 77.8 39.8 75.5 L 47.2 20 Z"
                    fill="url(#clearPlasticSheen)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.4"
                  />

                  {/* Upper Horizontal Recessed Ridge Ring on Cup (Identical to photo) */}
                  <g>
                    <path
                      d="M 9.5 35 Q 27 38.5 44.5 35"
                      stroke="#FFFFFF"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.8"
                    />
                    <path
                      d="M 9.7 36 Q 27 39.5 44.3 36"
                      stroke="#2E1308"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.45"
                    />
                  </g>

                  {/* Lower Subtle Structural Plastic Groove */}
                  <path
                    d="M 12.8 62 Q 27 64.5 41.2 62"
                    stroke="#FFFFFF"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.45"
                  />

                  {/* Base Rolled Bottom Lip */}
                  <path
                    d="M 14.2 75.5 Q 27 77.8 39.8 75.5"
                    stroke="#FFFFFF"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />

                  {/* ━━━━ CLEAR PLASTIC TAKEAWAY LID & FLANGED RIM ━━━━ */}
                  {/* Flat/Domed Takeaway Lid Rim (Protruding clear plastic flange) */}
                  <ellipse
                    cx="27"
                    cy="19"
                    rx="22.5"
                    ry="3.2"
                    fill="url(#clearLidRimGrad)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="0.6"
                  />
                  {/* Upper Lid Step Rim */}
                  <ellipse
                    cx="27"
                    cy="17.6"
                    rx="20.5"
                    ry="2.7"
                    fill="rgba(255,255,255,0.2)"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="0.5"
                  />
                  {/* Inner Lid Basin Opening Collar */}
                  <ellipse
                    cx="27"
                    cy="16.5"
                    rx="17.5"
                    ry="2.2"
                    fill="none"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="0.4"
                  />

                  {/* ━━━━ VERTICAL SPECULAR GLOSS HIGHLIGHTS (Curved Plastic Reflection) ━━━━ */}
                  {/* Left Edge Long Sheen */}
                  <path
                    d="M 9.2 21 L 15.6 74 L 17.2 74 L 11.2 21 Z"
                    fill="#FFFFFF"
                    opacity="0.25"
                  />
                  <line x1="8.5" y1="21" x2="15" y2="74" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.6" />

                  {/* Right Edge Reflection */}
                  <path
                    d="M 44.8 21 L 38.4 74 L 37.2 74 L 43.2 21 Z"
                    fill="#FFFFFF"
                    opacity="0.15"
                  />
                  <line x1="45.5" y1="21" x2="39" y2="74" stroke="#FFFFFF" strokeWidth="0.35" opacity="0.5" />

                  {/* ━━━━ REALISTIC CHILLED CONDENSATION DROPLETS & MIST ━━━━ */}
                  {/* Fine condensation dots across the cup surface (matching photo) */}
                  {/* Upper Left Droplet Cluster */}
                  <circle cx="12" cy="27" r="0.45" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="13.2" cy="28.5" r="0.3" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="11.5" cy="30" r="0.4" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="14" cy="32" r="0.55" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="14.2" cy="32.2" r="0.25" fill="#38BDF8" opacity="0.6" />

                  {/* Upper Center Droplets */}
                  <circle cx="22" cy="28" r="0.4" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="26" cy="30" r="0.5" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="31" cy="29" r="0.35" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="35" cy="31" r="0.45" fill="#FFFFFF" opacity="0.85" />

                  {/* Upper Right Droplet Cluster */}
                  <circle cx="41" cy="28" r="0.5" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="42.5" cy="30" r="0.3" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="40" cy="33" r="0.4" fill="#FFFFFF" opacity="0.85" />

                  {/* Mid-Cup Condensation Trickles & Beads (Right below horizontal ridge) */}
                  <circle cx="13" cy="40" r="0.5" fill="#FFFFFF" opacity="0.9" />
                  <ellipse cx="13.1" cy="42" rx="0.35" ry="0.65" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="13.2" cy="44" r="0.3" fill="#FFFFFF" opacity="0.75" />

                  <circle cx="18" cy="39" r="0.4" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="20.5" cy="43" r="0.5" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="24" cy="41" r="0.35" fill="#FFFFFF" opacity="0.8" />

                  {/* Center Dense Condensation Pattern */}
                  <circle cx="27" cy="45" r="0.55" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="27.2" cy="45.2" r="0.3" fill="#38BDF8" opacity="0.6" />
                  <ellipse cx="27" cy="48" rx="0.4" ry="0.8" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="29" cy="52" r="0.35" fill="#FFFFFF" opacity="0.8" />

                  <circle cx="33" cy="42" r="0.45" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="36" cy="45" r="0.5" fill="#FFFFFF" opacity="0.9" />
                  <ellipse cx="36.1" cy="47.5" rx="0.35" ry="0.7" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="38" cy="41" r="0.4" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="42" cy="44" r="0.5" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="41" cy="48" r="0.35" fill="#FFFFFF" opacity="0.8" />

                  {/* Lower Cup Droplets */}
                  <circle cx="17" cy="53" r="0.4" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="19" cy="56" r="0.45" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="23" cy="58" r="0.5" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="28" cy="57" r="0.35" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="32" cy="56" r="0.45" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="35" cy="59" r="0.4" fill="#FFFFFF" opacity="0.8" />

                  {/* Near Base Droplets */}
                  <circle cx="18" cy="67" r="0.4" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="23" cy="70" r="0.45" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="27" cy="68" r="0.5" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="31" cy="71" r="0.4" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="36" cy="67" r="0.45" fill="#FFFFFF" opacity="0.85" />

                  {/* Chilled Ambient Mist Wisps */}
                  <g opacity="0.45" className="animate-pulse">
                    <path
                      d="M 17 12 Q 14 7 18 3 Q 21 0 18 -4"
                      stroke={isDark ? "#BAE6FD" : "#7DD3FC"}
                      strokeWidth="0.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 35 13 Q 38 8 35 4 Q 32 0 36 -3"
                      stroke={isDark ? "#E0F2FE" : "#38BDF8"}
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      fill="none"
                    />
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

            {/* 6.5. Creative Studio Work Desk with Over-Ear Headphones */}
            {detail.silhouette === "desk-headphones" && (
              <div
                className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-auto group/desk overflow-hidden"
                title="Creative Studio Desk • Headphones & Late-Night Soundtracks"
              >
                {/* 1. Warm Ambient Workspace Glow from Desk Lamp */}
                <div className="absolute -top-4 -right-2 w-28 h-28 rounded-full bg-amber-300/25 dark:bg-amber-400/20 blur-xl pointer-events-none opacity-80 group-hover/desk:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-amber-200/20 dark:bg-amber-300/15 blur-lg pointer-events-none" />

                <svg viewBox="0 0 100 64" preserveAspectRatio="none" className="w-full h-full overflow-visible drop-shadow-lg">
                  <defs>
                    {/* Rich Honey-Walnut Desktop Surface Gradient */}
                    <linearGradient id={`deskSurfaceGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8C5027" />
                      <stop offset="30%" stopColor="#A35D2D" />
                      <stop offset="70%" stopColor="#7B3E18" />
                      <stop offset="100%" stopColor="#5E2F12" />
                    </linearGradient>

                    {/* Desk Beveled Front Edge Apron */}
                    <linearGradient id={`deskFrontApronGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3E1C0A" />
                      <stop offset="60%" stopColor="#2A1206" />
                      <stop offset="100%" stopColor="#140802" />
                    </linearGradient>

                    {/* Premium Slate/Leather Desk Mat Gradient */}
                    <linearGradient id={`deskMatGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3F3F46" />
                      <stop offset="50%" stopColor="#27272A" />
                      <stop offset="100%" stopColor="#18181B" />
                    </linearGradient>

                    {/* Gleaming Spun Aluminum / Silver Metal for Headphone Gimbals & Sliders */}
                    <linearGradient id={`hpMetalGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="25%" stopColor="#E2E8F0" />
                      <stop offset="50%" stopColor="#FFFFFF" />
                      <stop offset="75%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>

                    {/* Headphone Ear Cushion & Headband Leather */}
                    <linearGradient id={`hpLeatherGrad_${windowInstanceId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#52525B" />
                      <stop offset="40%" stopColor="#27272A" />
                      <stop offset="100%" stopColor="#09090B" />
                    </linearGradient>

                    {/* Spun Aluminum Earcup Center Cap (Catches light) */}
                    <radialGradient id={`hpSpunAlum_${windowInstanceId}`} cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="40%" stopColor="#E2E8F0" />
                      <stop offset="70%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#475569" />
                    </radialGradient>

                    {/* Warm Desk Lamp Ambient Light Cone */}
                    <radialGradient id={`hpDeskLampGlow_${windowInstanceId}`} cx="50%" cy="30%" r="65%">
                      <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
                      <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.5" />
                      <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* ━━━━ 1. THE STUDIO WORK DESK ━━━━ */}
                  {/* Top Solid Walnut Desktop Surface - Spanning full 100 width */}
                  <polygon
                    points="0,32 100,32 100,44 0,44"
                    fill={`url(#deskSurfaceGrad_${windowInstanceId})`}
                  />
                  {/* Polished woodgrain sheen lines across desktop */}
                  <line x1="0" y1="32.5" x2="100" y2="32.5" stroke="#FDE68A" strokeWidth="0.6" opacity="0.6" />
                  <line x1="2" y1="35" x2="98" y2="35" stroke="#FBBF24" strokeWidth="0.3" opacity="0.3" />
                  <line x1="5" y1="38" x2="95" y2="38" stroke="#FBBF24" strokeWidth="0.3" opacity="0.2" />

                  {/* Desk Front Chamfer Edge Highlight */}
                  <line x1="0" y1="44" x2="100" y2="44" stroke="#FDE68A" strokeWidth="0.8" opacity="0.9" />

                  {/* Desk Front Apron Face */}
                  <rect
                    x="0"
                    y="44.4"
                    width="100"
                    height="19.6"
                    fill={`url(#deskFrontApronGrad_${windowInstanceId})`}
                  />
                  <line x1="0" y1="45" x2="100" y2="45" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.25" />

                  {/* ━━━━ 2. LEATHER DESK MAT ━━━━ */}
                  {/* Ground Shadow under desk pad */}
                  <rect x="12" y="34.5" width="76" height="10" rx="1.5" fill="#000000" opacity="0.45" />
                  {/* Slate/Leather Desk Mat Surface */}
                  <rect
                    x="12"
                    y="33.5"
                    width="76"
                    height="9.8"
                    rx="1.5"
                    fill={`url(#deskMatGrad_${windowInstanceId})`}
                    stroke="#52525B"
                    strokeWidth="0.5"
                  />
                  {/* Desk Mat Precision Edge Stitching */}
                  <rect
                    x="13.2"
                    y="34.2"
                    width="73.6"
                    height="8.4"
                    rx="1"
                    fill="none"
                    stroke="#A1A1AA"
                    strokeWidth="0.25"
                    strokeDasharray="1,1"
                    opacity="0.6"
                  />

                  {/* ━━━━ 3. DESK ACCESSORIES ━━━━ */}
                  {/* Left: Minimal Hardcover Journal / Sketchbook */}
                  <g transform="translate(14, 34) rotate(-3)">
                    <rect x="0" y="0" width="13" height="8.5" rx="0.6" fill="#18181B" opacity="0.4" />
                    <rect x="-0.4" y="-0.4" width="13" height="8.5" rx="0.6" fill={isDark ? "#27272A" : "#F8FAFC"} stroke={isDark ? "#52525B" : "#CBD5E1"} strokeWidth="0.4" />
                    {/* Ribbon bookmark */}
                    <line x1="3" y1="-0.4" x2="3" y2="7.8" stroke="#EF4444" strokeWidth="0.5" />
                    {/* Brass Pen resting on book */}
                    <line x1="12" y1="0.5" x2="12" y2="7.5" stroke="#F59E0B" strokeWidth="0.7" strokeLinecap="round" />
                  </g>

                  {/* Right: Modern Brass Desk Lamp Illuminating Scene */}
                  <g transform="translate(82, 18)">
                    {/* Lamp Radial Glow Pool on desk */}
                    <ellipse cx="2" cy="18" rx="16" ry="8" fill={`url(#hpDeskLampGlow_${windowInstanceId})`} />
                    {/* Solid Brass Base */}
                    <ellipse cx="2" cy="21" rx="4.5" ry="1.6" fill="#D97706" stroke="#92400E" strokeWidth="0.4" />
                    <ellipse cx="2" cy="20.5" rx="3.5" ry="1" fill="#FBBF24" opacity="0.6" />
                    {/* Slender Arched Brass Stem */}
                    <path d="M 2 21 L 2 10 Q 2 3 7 3 L 10 3" stroke="#F59E0B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    {/* Conical Lamp Shade */}
                    <path d="M 8 3 L 14 10 L 4 10 Z" fill={isDark ? "#18181B" : "#334155"} stroke="#D97706" strokeWidth="0.5" />
                    {/* Glowing LED Light Bulb */}
                    <circle cx="9" cy="10" r="1.8" fill="#FEF08A" className="drop-shadow-[0_0_6px_#FBBF24]" />
                  </g>

                  {/* ━━━━ 4. OVER-EAR STUDIO HEADPHONES (THE HERO CENTERPIECE) ━━━━ */}
                  {/* Ground Contact Shadows where Earcups and Headband touch desk */}
                  <ellipse cx="37" cy="40.5" rx="7.5" ry="2.2" fill="#000000" opacity="0.85" />
                  <ellipse cx="63" cy="40.5" rx="7.5" ry="2.2" fill="#000000" opacity="0.85" />
                  <ellipse cx="50" cy="38" rx="14" ry="1.8" fill="#000000" opacity="0.5" />

                  {/* Coiled Audio Cable Draped on Desk */}
                  <g>
                    {/* Cable Drop Shadow */}
                    <path d="M 37 40 Q 34 43 38 45 Q 42 47 46 44 Q 50 42 54 45 Q 58 48 64 45" fill="none" stroke="#000000" strokeWidth="1.6" opacity="0.5" />
                    {/* Coiled Studio Rubber Cable */}
                    <path d="M 37 40 Q 34 43 38 45 Q 42 47 46 44 Q 50 42 54 45 Q 58 48 64 45" fill="none" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" />
                    {/* Cable Highlight */}
                    <path d="M 37 40 Q 34 43 38 45 Q 42 47 46 44 Q 50 42 54 45 Q 58 48 64 45" fill="none" stroke="#A1A1AA" strokeWidth="0.35" strokeLinecap="round" opacity="0.7" />
                    {/* Gold-plated 1/4" Studio Headphone Jack Connector */}
                    <rect x="64" y="44" width="5.5" height="1.8" rx="0.4" fill="#F59E0B" stroke="#B45309" strokeWidth="0.3" />
                    <line x1="68" y1="44.2" x2="68" y2="45.6" stroke="#18181B" strokeWidth="0.3" />
                  </g>

                  {/* ARCHED PADDED HEADBAND (Top arch) */}
                  <g>
                    {/* Outer Spring-Steel Arch */}
                    <path
                      d="M 37 30 C 37 13, 63 13, 63 30"
                      fill="none"
                      stroke="#09090B"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                    />
                    {/* Padded Leatherette Comfort Cushion */}
                    <path
                      d="M 39 29 C 39 15.5, 61 15.5, 61 29"
                      fill="none"
                      stroke={`url(#hpLeatherGrad_${windowInstanceId})`}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Segmented Comfort Pleat Lines */}
                    <path
                      d="M 40 28 C 40 16, 60 16, 60 28"
                      fill="none"
                      stroke="#71717A"
                      strokeWidth="0.5"
                      strokeDasharray="1.5,1.5"
                      opacity="0.8"
                    />
                    {/* Top Gleaming Specular Arc Highlight */}
                    <path
                      d="M 43 17.5 Q 50 14 57 17.5"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="0.6"
                      opacity="0.75"
                    />
                  </g>

                  {/* BRUSHED ALUMINUM ADJUSTMENT SLIDERS & GIMBAL YOKE FORKS */}
                  {/* Left Slider & Yoke */}
                  <g>
                    {/* Extension Slider Rod */}
                    <line x1="37" y1="27" x2="37" y2="33" stroke={`url(#hpMetalGrad_${windowInstanceId})`} strokeWidth="1.8" strokeLinecap="round" />
                    {/* Micro Calibration Ticks */}
                    <line x1="36" y1="28.5" x2="38" y2="28.5" stroke="#1E293B" strokeWidth="0.3" />
                    <line x1="36" y1="30" x2="38" y2="30" stroke="#1E293B" strokeWidth="0.3" />
                    {/* Aluminum Yoke Fork */}
                    <path d="M 32 33 Q 37 32 42 33" stroke={`url(#hpMetalGrad_${windowInstanceId})`} strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </g>

                  {/* Right Slider & Yoke */}
                  <g>
                    <line x1="63" y1="27" x2="63" y2="33" stroke={`url(#hpMetalGrad_${windowInstanceId})`} strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="62" y1="28.5" x2="64" y2="28.5" stroke="#1E293B" strokeWidth="0.3" />
                    <line x1="62" y1="30" x2="64" y2="30" stroke="#1E293B" strokeWidth="0.3" />
                    <path d="M 58 33 Q 63 32 68 33" stroke={`url(#hpMetalGrad_${windowInstanceId})`} strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </g>

                  {/* LEFT OVER-EAR EARPAD & CUP (Angled) */}
                  <g transform="translate(37, 36) rotate(-14)">
                    {/* Thick Leather Memory Foam Cushion */}
                    <ellipse cx="0" cy="0" rx="6.5" ry="9.5" fill="#18181B" stroke="#09090B" strokeWidth="0.8" />
                    <ellipse cx="0" cy="0" rx="5.2" ry="7.8" fill={`url(#hpLeatherGrad_${windowInstanceId})`} />
                    {/* Leather Creases */}
                    <path d="M -5 0 Q -3 1 -4.5 2.5" stroke="#52525B" strokeWidth="0.4" fill="none" />
                    <path d="M 5 0 Q 3 1 4.5 2.5" stroke="#52525B" strokeWidth="0.4" fill="none" />
                    {/* Outer Cup Back Shell */}
                    <ellipse cx="0" cy="0" rx="4.2" ry="6.2" fill="#09090B" stroke="#3F3F46" strokeWidth="0.4" />
                    {/* Spun Aluminum Center Logo Disc (Brilliant Glint) */}
                    <circle cx="0" cy="0" r="2.8" fill={`url(#hpSpunAlum_${windowInstanceId})`} stroke="#CBD5E1" strokeWidth="0.3" />
                    {/* Acoustic Mesh Pattern */}
                    <circle cx="0" cy="0" r="3.4" fill="none" stroke="#71717A" strokeWidth="0.25" strokeDasharray="0.6,0.6" />
                    {/* Crisp Specular Light Glint */}
                    <ellipse cx="-1" cy="-2" rx="1.6" ry="0.8" fill="#FFFFFF" opacity="0.65" transform="rotate(-20 -1 -2)" />
                  </g>

                  {/* RIGHT OVER-EAR EARPAD & CUP (Angled) */}
                  <g transform="translate(63, 36) rotate(14)">
                    <ellipse cx="0" cy="0" rx="6.5" ry="9.5" fill="#18181B" stroke="#09090B" strokeWidth="0.8" />
                    <ellipse cx="0" cy="0" rx="5.2" ry="7.8" fill={`url(#hpLeatherGrad_${windowInstanceId})`} />
                    <path d="M -5 0 Q -3 1 -4.5 2.5" stroke="#52525B" strokeWidth="0.4" fill="none" />
                    <path d="M 5 0 Q 3 1 4.5 2.5" stroke="#52525B" strokeWidth="0.4" fill="none" />
                    <ellipse cx="0" cy="0" rx="4.2" ry="6.2" fill="#09090B" stroke="#3F3F46" strokeWidth="0.4" />
                    <circle cx="0" cy="0" r="2.8" fill={`url(#hpSpunAlum_${windowInstanceId})`} stroke="#CBD5E1" strokeWidth="0.3" />
                    <circle cx="0" cy="0" r="3.4" fill="none" stroke="#71717A" strokeWidth="0.25" strokeDasharray="0.6,0.6" />
                    <ellipse cx="1" cy="-2" rx="1.6" ry="0.8" fill="#FFFFFF" opacity="0.65" transform="rotate(20 1 -2)" />
                  </g>
                </svg>
              </div>
            )}

            {/* 7. Realistic Vintage Rangefinder Camera on Full Sill (Photography Interest) */}
            {(detail.silhouette === "vintage-camera" || detail.silhouette === "art-easel") && (
              <div
                className="absolute bottom-0 inset-x-0 z-10 pointer-events-auto group/camera"
                title="Vintage Camera • Photography & Visual Storytelling"
              >
                {/* Continuous full-width architectural wooden windowsill shelf spanning entire window base */}
                <div
                  className={`w-full h-2.5 sm:h-3 border-t transition-colors duration-500 relative shadow-inner ${
                    isDark
                      ? "bg-gradient-to-b from-[#3D2517] via-[#2A170E] to-[#1A0D07] border-[#8C5027]/70"
                      : "bg-gradient-to-b from-[#C28254] via-[#A66738] to-[#7D4620] border-[#EAD4BA]/80"
                  }`}
                >
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white/30" />
                </div>

                {/* Camera resting directly on top of the sill with deep occlusion shadow */}
                <div className="absolute bottom-1 sm:bottom-1.5 left-2 sm:left-3 z-10">
                  {/* Subtle Amber Glow / Presence */}
                  <div className="absolute -inset-1 rounded-full bg-amber-400/10 blur-sm pointer-events-none opacity-50 group-hover/camera:opacity-90 transition-opacity" />

                  <svg viewBox="0 0 54 44" className="w-10 sm:w-12 md:w-13 h-8.5 sm:h-10 md:h-11 overflow-visible drop-shadow-md">
                    <defs>
                      {/* Architectural Walnut Windowsill Shelf Surface */}
                      <linearGradient id="cameraSillWoodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4A2E1D" />
                        <stop offset="40%" stopColor="#352014" />
                        <stop offset="100%" stopColor="#24140B" />
                      </linearGradient>
                      <linearGradient id="cameraSillFrontBevel" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1B0E07" />
                        <stop offset="100%" stopColor="#0B0502" />
                      </linearGradient>

                      {/* Brushed Chrome / Silver Top & Base Plate Gradient */}
                      <linearGradient id="cameraSilverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="25%" stopColor="#E2E8F0" />
                        <stop offset="60%" stopColor="#CBD5E1" />
                        <stop offset="100%" stopColor="#94A3B8" />
                      </linearGradient>

                      {/* Textured Leatherette Body Gradient */}
                      <linearGradient id="cameraBodyLeatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#27272A" />
                        <stop offset="40%" stopColor="#18181B" />
                        <stop offset="100%" stopColor="#09090B" />
                      </linearGradient>

                      {/* Optical Multi-Coated Lens Element Gradient */}
                      <radialGradient id="cameraLensGlassGrad" cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#0F172A" />
                        <stop offset="45%" stopColor="#020617" />
                        <stop offset="70%" stopColor="#1E1B4B" />
                        <stop offset="90%" stopColor="#312E81" />
                        <stop offset="100%" stopColor="#020617" />
                      </radialGradient>

                      {/* Multi-Coat Glare (Cyan & Violet Anti-Reflective Coating) */}
                      <linearGradient id="lensCoatGlareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                        <stop offset="40%" stopColor="#818CF8" stopOpacity="0.5" />
                        <stop offset="70%" stopColor="#C084FC" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                      </linearGradient>

                      {/* Camera Strap Leather Gradient */}
                      <linearGradient id="cameraStrapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#78350F" />
                        <stop offset="50%" stopColor="#92400E" />
                        <stop offset="100%" stopColor="#451A03" />
                      </linearGradient>

                      {/* Knurled Dial Metal Gradient */}
                      <linearGradient id="cameraDialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#64748B" />
                        <stop offset="35%" stopColor="#E2E8F0" />
                        <stop offset="65%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                    </defs>

                    {/* ━━━━ SOLID ARCHITECTURAL WINDOWSILL LEDGE ━━━━ */}
                    {/* Top Wooden Sill Surface */}
                    <rect x="0" y="34.5" width="54" height="9.5" fill="url(#cameraSillWoodGrad)" />
                    {/* Sill Front Beveled Edge Highlight */}
                    <line x1="0" y1="34.6" x2="54" y2="34.6" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.35" />
                    <line x1="0" y1="37.5" x2="54" y2="37.5" stroke="#D4A373" strokeWidth="0.4" opacity="0.5" />
                    {/* Lower Sill Front Thickness */}
                    <rect x="0" y="37.8" width="54" height="6.2" fill="url(#cameraSillFrontBevel)" />

                    {/* ━━━━ GROUND CONTACT OCCLUSION SHADOW (Firmly Anchored to Sill) ━━━━ */}
                    <ellipse cx="26" cy="35" rx="19" ry="1.5" fill="#000000" opacity={isDark ? "0.95" : "0.75"} />
                    <rect x="7" y="34.2" width="38" height="1" fill="#000000" opacity="0.9" />

                  {/* Draped Vintage Tan/Brown Leather Camera Strap (Resting on Sill) */}
                  <g>
                    {/* Strap shadow on wood sill */}
                    <path d="M 6 24 C 2 28 3 34.5 10 35.5 C 17 36.2 24 35 28 35.8" fill="none" stroke="#000000" strokeWidth="2.5" opacity="0.35" />
                    {/* Leather Strap */}
                    <path d="M 6 24 C 2 28 3 34.5 10 35.5 C 17 36.2 24 35 28 35.8" fill="none" stroke="url(#cameraStrapGrad)" strokeWidth="2.2" strokeLinecap="round" />
                    {/* Strap Edge Stitching (Micro dash) */}
                    <path d="M 6 24 C 2 28 3 34.5 10 35.5 C 17 36.2 24 35 28 35.8" fill="none" stroke="#FDE68A" strokeWidth="0.3" strokeDasharray="0.8,0.8" opacity="0.75" />
                    {/* Brass Eyelet / Split Ring on Lug */}
                    <circle cx="6" cy="23.5" r="1.4" fill="none" stroke="#D97706" strokeWidth="0.5" />
                  </g>

                  {/* CAMERA BODY MAIN RECTANGLE */}
                  {/* Textured Leatherette Center Section */}
                  <rect x="7" y="16" width="38" height="20" rx="2.5" fill="url(#cameraBodyLeatherGrad)" stroke="#09090B" strokeWidth="0.6" />
                  {/* Micro-texture pebbled grain pattern on leatherette */}
                  <g opacity="0.15">
                    <line x1="8" y1="18" x2="44" y2="18" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="20" x2="44" y2="20" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="22" x2="44" y2="22" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="24" x2="44" y2="24" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="26" x2="44" y2="26" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="28" x2="44" y2="28" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="30" x2="44" y2="30" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="32" x2="44" y2="32" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                    <line x1="8" y1="34" x2="44" y2="34" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="0.5,0.7" />
                  </g>

                  {/* Bottom Chrome Baseplate */}
                  <path d="M 7 34 L 7 35.5 Q 7 36.5 8 36.5 L 44 36.5 Q 45 36.5 45 35.5 L 45 34 Z" fill="url(#cameraSilverGrad)" stroke="#64748B" strokeWidth="0.4" />

                  {/* TOP CHROME PLATE (Classic Rangefinder Step) */}
                  <path
                    d="M 7 17 L 7 12 Q 7 11 8 11 L 44 11 Q 45 11 45 12 L 45 17 Z"
                    fill="url(#cameraSilverGrad)"
                    stroke="#64748B"
                    strokeWidth="0.5"
                  />
                  {/* Beveled Top Edge Reflection */}
                  <line x1="8" y1="11.5" x2="44" y2="11.5" stroke="#FFFFFF" strokeWidth="0.6" />
                  <line x1="7.5" y1="16.5" x2="44.5" y2="16.5" stroke="#334155" strokeWidth="0.4" />

                  {/* TOP CONTROLS & DIALS */}
                  {/* Left Dial: ISO / Film Rewind Knob */}
                  <rect x="10" y="8" width="5.5" height="3.2" rx="0.6" fill="url(#cameraDialGrad)" stroke="#475569" strokeWidth="0.3" />
                  <line x1="11.5" y1="8.2" x2="11.5" y2="11" stroke="#334155" strokeWidth="0.3" />
                  <line x1="13" y1="8.2" x2="13" y2="11" stroke="#334155" strokeWidth="0.3" />
                  <line x1="14.5" y1="8.2" x2="14.5" y2="11" stroke="#334155" strokeWidth="0.3" />

                  {/* Center Hot Shoe Flash Mount */}
                  <rect x="23" y="9.5" width="6" height="1.8" rx="0.3" fill="#334155" stroke="#1E293B" strokeWidth="0.3" />
                  <rect x="24.2" y="9.2" width="3.6" height="0.6" fill="#94A3B8" />

                  {/* Right Dial: Shutter Speed Selector Dial */}
                  <rect x="31" y="8" width="6.5" height="3.2" rx="0.6" fill="url(#cameraDialGrad)" stroke="#475569" strokeWidth="0.3" />
                  <line x1="32.5" y1="8.2" x2="32.5" y2="11" stroke="#334155" strokeWidth="0.3" />
                  <line x1="34.2" y1="8.2" x2="34.2" y2="11" stroke="#334155" strokeWidth="0.3" />
                  <line x1="36" y1="8.2" x2="36" y2="11" stroke="#334155" strokeWidth="0.3" />

                  {/* Shutter Release Button with Red Soft-Release Collar */}
                  <rect x="39" y="8.5" width="3.5" height="2.8" rx="0.5" fill="url(#cameraDialGrad)" stroke="#475569" strokeWidth="0.3" />
                  {/* Red Soft-Release Button Cap (Iconic Leica style) */}
                  <ellipse cx="40.75" cy="8.4" rx="1.5" ry="0.6" fill="#DC2626" stroke="#991B1B" strokeWidth="0.25" />

                  {/* FRONT FACING WINDOWS & EMBLEMS */}
                  {/* Optical Viewfinder Window (Right side of top plate) */}
                  <rect x="37" y="12.4" width="5.5" height="3.4" rx="0.5" fill="#0284C7" stroke="#0369A1" strokeWidth="0.35" />
                  <rect x="37.5" y="12.9" width="4.5" height="2.4" fill="#0C4A6E" />
                  {/* Glass Glare in Viewfinder */}
                  <polygon points="37.5,12.9 39.5,12.9 38.5,15.3 37.5,15.3" fill="#BAE6FD" opacity="0.85" />

                  {/* Rangefinder Illumination Frame Window */}
                  <rect x="18" y="12.8" width="4" height="2.6" rx="0.4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.3" />
                  <line x1="18.5" y1="13.2" x2="21.5" y2="13.2" stroke="#64748B" strokeWidth="0.25" />
                  <line x1="18.5" y1="14.1" x2="21.5" y2="14.1" stroke="#64748B" strokeWidth="0.25" />
                  <line x1="18.5" y1="15" x2="21.5" y2="15" stroke="#64748B" strokeWidth="0.25" />

                  {/* Self-Timer Lever on Front Plate */}
                  <g transform="translate(13, 20)">
                    <circle cx="0" cy="0" r="1.3" fill="url(#cameraSilverGrad)" stroke="#475569" strokeWidth="0.25" />
                    <rect x="-0.5" y="0" width="1" height="5" rx="0.4" fill="url(#cameraSilverGrad)" stroke="#475569" strokeWidth="0.2" transform="rotate(-15)" />
                  </g>

                  {/* Red Dot Brand / Aesthetic Accent */}
                  <circle cx="16" cy="18.5" r="1.4" fill="#DC2626" stroke="#B91C1C" strokeWidth="0.2" />

                  {/* ━━━━ PROMINENT PRIME CAMERA LENS ━━━━ */}
                  {/* Lens Barrel Outer Shadow on Body */}
                  <ellipse cx="28" cy="26" rx="9" ry="9" fill="#000000" opacity="0.45" />

                  {/* Outer Silver Aperture Ring */}
                  <circle cx="27" cy="25" r="8.2" fill="url(#cameraSilverGrad)" stroke="#475569" strokeWidth="0.4" />
                  {/* Micro Aperture Knurls */}
                  <g opacity="0.7">
                    <circle cx="27" cy="25" r="8.2" fill="none" stroke="#334155" strokeWidth="0.4" strokeDasharray="0.6,1.2" />
                  </g>

                  {/* Black Anodized Lens Barrel */}
                  <circle cx="27" cy="25" r="7.2" fill="#09090B" stroke="#27272A" strokeWidth="0.4" />

                  {/* Inner Thread Bezel Ring with Text Markings */}
                  <circle cx="27" cy="25" r="6.2" fill="#18181B" stroke="#3F3F46" strokeWidth="0.3" />
                  <text x="27" y="20.4" fill="#A1A1AA" fontSize="1.1" fontWeight="700" textAnchor="middle" letterSpacing="0.04em">f=35mm</text>
                  <text x="27" y="30.2" fill="#A1A1AA" fontSize="1.1" fontWeight="700" textAnchor="middle" letterSpacing="0.04em">1:1.4</text>

                  {/* Deep Multi-Coated Optical Glass Lens Element */}
                  <circle cx="27" cy="25" r="4.6" fill="url(#cameraLensGlassGrad)" stroke="#09090B" strokeWidth="0.4" />

                  {/* Aperture Iris Blades (Subtle polygonal aperture opening) */}
                  <polygon points="26,24 28,24 29,25 28,26.5 26,26.5 25,25" fill="#020617" opacity="0.85" />

                  {/* Multi-Coating Optical Reflection 1 (Violet/Cyan Curved Flare) */}
                  <path
                    d="M 23.5 22.5 Q 26 21 29 22.5 Q 31 24.5 30 27 Q 27.5 24 23.5 22.5 Z"
                    fill="url(#lensCoatGlareGrad)"
                    opacity="0.8"
                  />

                  {/* Multi-Coating Optical Reflection 2 (Secondary Emerald/Blue Glint) */}
                  <ellipse cx="25" cy="27" rx="1.6" ry="0.9" transform="rotate(-30 25 27)" fill="#34D399" opacity="0.6" />

                  {/* Pure Specular Pinpoint Highlight on Front Element */}
                  <circle cx="25.5" cy="23" r="0.6" fill="#FFFFFF" opacity="0.95" />
                  <circle cx="28.8" cy="26.8" r="0.35" fill="#FFFFFF" opacity="0.75" />
                </svg>
              </div>
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

                    {/* Botanical Floral Petal Gradients for Tulips */}
                    {/* 1. Classic Crimson / Ruby Red Dutch Tulip */}
                    <linearGradient id={`fbTulipRuby_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FB7185" />
                      <stop offset="25%" stopColor="#F43F5E" />
                      <stop offset="65%" stopColor="#E11D48" />
                      <stop offset="100%" stopColor="#9F1239" />
                    </linearGradient>

                    {/* 2. Soft Powder Pink / Rose Blush Tulip */}
                    <linearGradient id={`fbTulipPink_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFF1F2" />
                      <stop offset="30%" stopColor="#FDA4AF" />
                      <stop offset="70%" stopColor="#FB7185" />
                      <stop offset="100%" stopColor="#BE123C" />
                    </linearGradient>

                    {/* 3. Golden Yellow / Sunset Apricot Tulip */}
                    <linearGradient id={`fbTulipYellow_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FEF08A" />
                      <stop offset="30%" stopColor="#FDE047" />
                      <stop offset="65%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>

                    {/* 4. Imperial Royal Purple Tulip */}
                    <linearGradient id={`fbTulipPurple_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E9D5FF" />
                      <stop offset="30%" stopColor="#C084FC" />
                      <stop offset="70%" stopColor="#9333EA" />
                      <stop offset="100%" stopColor="#581C87" />
                    </linearGradient>

                    {/* 5. Pure White / Cream Dutch Tulip with soft green blush */}
                    <linearGradient id={`fbTulipWhite_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="45%" stopColor="#F8FAFC" />
                      <stop offset="80%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#CBD5E1" />
                    </linearGradient>
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

                  {/* Slender Arched Botanical Green Stems for Tulips */}
                  <path d="M 22 26 Q 21 16 23 11" stroke="#228555" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M 36 26 Q 34 14 37 7" stroke="#2A925E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M 50 26 Q 51 15 50 6" stroke="#1D6F47" strokeWidth="1.35" fill="none" strokeLinecap="round" />
                  <path d="M 64 26 Q 66 14 65 8" stroke="#228555" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M 78 26 Q 76 15 79 7" stroke="#2A925E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M 92 26 Q 94 16 93 10" stroke="#1D6F47" strokeWidth="1.25" fill="none" strokeLinecap="round" />
                  <path d="M 102 26 Q 101 17 103 12" stroke="#228555" strokeWidth="1.15" fill="none" strokeLinecap="round" />

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      C. STATELY DUTCH TULIP FOLIAGE (BROAD SWORD LEAVES)
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {/* Broad upright lanceolate tulip leaves with graceful curving tips */}
                  {/* Left leaf 1 */}
                  <path
                    d="M 18 26 Q 15 15 20 8 Q 23 15 24 26 Z"
                    fill={`url(#fbFoliageBright_${windowInstanceId})`}
                    opacity="0.9"
                  />
                  <path d="M 19 23 Q 17 14 20 9" stroke="#A7F3D0" strokeWidth="0.4" fill="none" opacity="0.75" />

                  {/* Leaf between Tulip 1 & 2 */}
                  <path
                    d="M 28 26 Q 26 12 32 5 Q 33 13 31 26 Z"
                    fill={`url(#fbFoliageMid_${windowInstanceId})`}
                    opacity="0.92"
                  />
                  <path d="M 29 22 Q 28 13 32 6" stroke="#A7F3D0" strokeWidth="0.4" fill="none" opacity="0.6" />

                  {/* Center-left tall curving leaf */}
                  <path
                    d="M 42 26 Q 40 10 46 4 Q 47 12 45 26 Z"
                    fill={`url(#fbFoliageBright_${windowInstanceId})`}
                    opacity="0.95"
                  />
                  <path d="M 43 21 Q 42 11 46 5" stroke="#A7F3D0" strokeWidth="0.45" fill="none" opacity="0.8" />

                  {/* Center-right arching leaf */}
                  <path
                    d="M 55 26 Q 58 9 54 3 Q 59 11 58 26 Z"
                    fill={`url(#fbFoliageMid_${windowInstanceId})`}
                    opacity="0.9"
                  />
                  <path d="M 56 22 Q 57 11 55 4" stroke="#BEF264" strokeWidth="0.4" fill="none" opacity="0.7" />

                  {/* Right tall leaf */}
                  <path
                    d="M 70 26 Q 73 11 72 4 Q 76 12 74 26 Z"
                    fill={`url(#fbFoliageBright_${windowInstanceId})`}
                    opacity="0.95"
                  />
                  <path d="M 72 20 Q 74 11 73 5" stroke="#A7F3D0" strokeWidth="0.4" fill="none" opacity="0.75" />

                  {/* Right-center leaf */}
                  <path
                    d="M 85 26 Q 89 12 86 6 Q 89 15 88 26 Z"
                    fill={`url(#fbFoliageMid_${windowInstanceId})`}
                    opacity="0.9"
                  />
                  <path d="M 86 21 Q 88 12 87 7" stroke="#A7F3D0" strokeWidth="0.4" fill="none" opacity="0.7" />

                  {/* Far right curving leaf */}
                  <path
                    d="M 96 26 Q 100 14 98 8 Q 102 16 100 26 Z"
                    fill={`url(#fbFoliageBright_${windowInstanceId})`}
                    opacity="0.88"
                  />

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      D. BESPOKE SCULPTED DUTCH TULIP BLOSSOMS (CUP SHAPES)
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

                  {/* TULIP 1 (Far Left): Soft Rose-Blush Pink Tulip (x=23, y=10) */}
                  <g transform="translate(23, 10)">
                    {/* Shadow Behind Blossom */}
                    <ellipse cx="0" cy="2" rx="4" ry="5.5" fill="#000000" opacity="0.25" />
                    {/* Rear Petal Layer */}
                    <path d="M -3 3 C -4.5 -1, -3 -6, 0 -6.5 C 3 -6, 4.5 -1, 3 3 Z" fill="#E11D48" />
                    {/* Left Cup Petal (curving in) */}
                    <path d="M -4.2 2 C -5 -2, -3.5 -6, -0.8 -6 C -0.5 -1, -2.5 3.5, -4.2 2 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
                    {/* Right Cup Petal (overlapping) */}
                    <path d="M 4.2 2 C 5 -2, 3.5 -6, 0.8 -6 C 0.5 -1, 2.5 3.5, 4.2 2 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
                    {/* Center Front Petal (dominant chalice face) */}
                    <path d="M -2.8 2.5 C -3.5 -1.5, -2 -6.2, 0 -6.8 C 2 -6.2, 3.5 -1.5, 2.8 2.5 C 2 4.2, -2 4.2, -2.8 2.5 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
                    {/* Petal Edge Specular Highlight */}
                    <path d="M 0 -6.8 Q 1.5 -2.5 1.2 2" stroke="#FFFFFF" strokeWidth="0.4" fill="none" opacity="0.75" />
                    {/* Stem Calyx Connection */}
                    <path d="M -1.2 3.2 C -1 4.5, 1 4.5, 1.2 3.2 Z" fill="#228555" />
                  </g>

                  {/* TULIP 2 (Left Center): Radiant Crimson Ruby Dutch Tulip (x=37, y=6) */}
                  <g transform="translate(37, 6)">
                    {/* Shadow Behind Blossom */}
                    <ellipse cx="0" cy="2.5" rx="4.5" ry="6" fill="#000000" opacity="0.28" />
                    {/* Back Petals */}
                    <path d="M -3.5 3 C -5 -1, -3.5 -7, 0 -7.5 C 3.5 -7, 5 -1, 3.5 3 Z" fill="#881337" />
                    {/* Left Petal */}
                    <path d="M -4.8 2.5 C -5.8 -2, -4 -7, -1 -7 C -0.5 -1, -3 4, -4.8 2.5 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
                    {/* Right Petal */}
                    <path d="M 4.8 2.5 C 5.8 -2, 4 -7, 1 -7 C 0.5 -1, 3 4, 4.8 2.5 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
                    {/* Center Prominent Petal */}
                    <path d="M -3.2 2.8 C -4 -1.5, -2.2 -7.2, 0 -7.8 C 2.2 -7.2, 4 -1.5, 3.2 2.8 C 2.2 4.8, -2.2 4.8, -3.2 2.8 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
                    {/* Tulip Petal Curve Highlights */}
                    <path d="M -0.2 -7.8 Q 1.5 -2.5 1.2 2.5" stroke="#FECDD3" strokeWidth="0.45" fill="none" opacity="0.8" />
                    <path d="M -0.2 -7.8 Q -1.8 -3 -1.5 2.2" stroke="#FDA4AF" strokeWidth="0.35" fill="none" opacity="0.5" />
                    {/* Calyx Base */}
                    <path d="M -1.3 3.8 C -1 5, 1 5, 1.3 3.8 Z" fill="#1D6F47" />
                  </g>

                  {/* TULIP 3 (Center Majestic): Golden Sunset Yellow Tulip (x=50, y=5) */}
                  <g transform="translate(50, 5)">
                    {/* Shadow Behind Blossom */}
                    <ellipse cx="0" cy="2.5" rx="4.8" ry="6.5" fill="#000000" opacity="0.3" />
                    {/* Back Petal Layer */}
                    <path d="M -3.8 3 C -5.2 -1.5, -3.8 -7.5, 0 -8.2 C 3.8 -7.5, 5.2 -1.5, 3.8 3 Z" fill="#B45309" />
                    {/* Left Petal */}
                    <path d="M -5 2.5 C -6 -2, -4.2 -7.5, -1 -7.5 C -0.5 -1, -3 4.2, -5 2.5 Z" fill={`url(#fbTulipYellow_${windowInstanceId})`} />
                    {/* Right Petal */}
                    <path d="M 5 2.5 C 6 -2, 4.2 -7.5, 1 -7.5 C 0.5 -1, 3 4.2, 5 2.5 Z" fill={`url(#fbTulipYellow_${windowInstanceId})`} />
                    {/* Center Cup Petal */}
                    <path d="M -3.4 3 C -4.2 -1.8, -2.4 -7.8, 0 -8.5 C 2.4 -7.8, 4.2 -1.8, 3.4 3 C 2.4 5, -2.4 5, -3.4 3 Z" fill={`url(#fbTulipYellow_${windowInstanceId})`} />
                    {/* Golden Glaze Highlight */}
                    <path d="M 0 -8.5 Q 1.8 -3 1.4 2.8" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.9" />
                    <path d="M 0 -8.5 Q -1.6 -3.5 -1.2 2.2" stroke="#FEF08A" strokeWidth="0.35" fill="none" opacity="0.6" />
                    {/* Calyx */}
                    <path d="M -1.4 4 C -1 5.2, 1 5.2, 1.4 4 Z" fill="#1D6F47" />
                  </g>

                  {/* TULIP 4 (Center Right): Imperial Royal Purple Tulip (x=65, y=7) */}
                  <g transform="translate(65, 7)">
                    {/* Shadow Behind Blossom */}
                    <ellipse cx="0" cy="2.2" rx="4.5" ry="6" fill="#000000" opacity="0.28" />
                    {/* Back Petals */}
                    <path d="M -3.5 3 C -5 -1, -3.5 -6.8, 0 -7.2 C 3.5 -6.8, 5 -1, 3.5 3 Z" fill="#3B0764" />
                    {/* Left Petal */}
                    <path d="M -4.6 2.2 C -5.5 -2, -3.8 -6.8, -0.8 -6.8 C -0.5 -1, -2.8 3.8, -4.6 2.2 Z" fill={`url(#fbTulipPurple_${windowInstanceId})`} />
                    {/* Right Petal */}
                    <path d="M 4.6 2.2 C 5.5 -2, 3.8 -6.8, 0.8 -6.8 C 0.5 -1, 2.8 3.8, 4.6 2.2 Z" fill={`url(#fbTulipPurple_${windowInstanceId})`} />
                    {/* Center Petal */}
                    <path d="M -3 2.6 C -3.8 -1.5, -2.2 -6.8, 0 -7.5 C 2.2 -6.8, 3.8 -1.5, 3 2.6 C 2 4.5, -2 4.5, -3 2.6 Z" fill={`url(#fbTulipPurple_${windowInstanceId})`} />
                    {/* Velvet Lavender Sheen */}
                    <path d="M 0 -7.5 Q 1.5 -2.5 1.2 2.2" stroke="#F3E8FF" strokeWidth="0.45" fill="none" opacity="0.85" />
                    {/* Calyx */}
                    <path d="M -1.3 3.6 C -1 4.8, 1 4.8, 1.3 3.6 Z" fill="#174A2E" />
                  </g>

                  {/* TULIP 5 (Right Center): Pure White / Ivory Silk Tulip with green throat (x=79, y=6) */}
                  <g transform="translate(79, 6)">
                    {/* Shadow Behind Blossom */}
                    <ellipse cx="0" cy="2.5" rx="4.5" ry="6" fill="#000000" opacity="0.25" />
                    {/* Back Petals */}
                    <path d="M -3.5 3 C -5 -1, -3.5 -7, 0 -7.5 C 3.5 -7, 5 -1, 3.5 3 Z" fill="#94A3B8" />
                    {/* Left Petal */}
                    <path d="M -4.8 2.2 C -5.8 -2, -4 -7, -1 -7 C -0.5 -1, -3 4, -4.8 2.2 Z" fill={`url(#fbTulipWhite_${windowInstanceId})`} />
                    {/* Right Petal */}
                    <path d="M 4.8 2.2 C 5.8 -2, 4 -7, 1 -7 C 0.5 -1, 3 4, 4.8 2.2 Z" fill={`url(#fbTulipWhite_${windowInstanceId})`} />
                    {/* Center Petal */}
                    <path d="M -3.2 2.6 C -4 -1.5, -2.2 -7.2, 0 -7.8 C 2.2 -7.2, 4 -1.5, 3.2 2.6 C 2.2 4.6, -2.2 4.6, -3.2 2.6 Z" fill={`url(#fbTulipWhite_${windowInstanceId})`} />
                    {/* Pristine White Specular Ridge */}
                    <path d="M 0 -7.8 Q 1.5 -2.5 1.2 2.2" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.95" />
                    {/* Delicate spring green blush at base */}
                    <path d="M -1.8 1.5 C -1 3, 1 3, 1.8 1.5 C 1 0.5, -1 0.5, -1.8 1.5 Z" fill="#86EFAC" opacity="0.6" />
                    {/* Calyx */}
                    <path d="M -1.3 3.8 C -1 5, 1 5, 1.3 3.8 Z" fill="#228555" />
                  </g>

                  {/* TULIP 6 (Far Right): Deep Ruby Crimson Tulip (x=93, y=9) */}
                  <g transform="translate(93, 9)">
                    <ellipse cx="0" cy="2.2" rx="4.2" ry="5.5" fill="#000000" opacity="0.25" />
                    <path d="M -3 3 C -4.5 -1, -3 -6, 0 -6.5 C 3 -6, 4.5 -1, 3 3 Z" fill="#881337" />
                    <path d="M -4.2 2 C -5 -2, -3.5 -6, -0.8 -6 C -0.5 -1, -2.5 3.5, -4.2 2 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
                    <path d="M 4.2 2 C 5 -2, 3.5 -6, 0.8 -6 C 0.5 -1, 2.5 3.5, 4.2 2 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
                    <path d="M -2.8 2.5 C -3.5 -1.5, -2 -6.2, 0 -6.8 C 2 -6.2, 3.5 -1.5, 2.8 2.5 C 2 4.2, -2 4.2, -2.8 2.5 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
                    <path d="M 0 -6.8 Q 1.5 -2.5 1.2 2" stroke="#FECDD3" strokeWidth="0.4" fill="none" opacity="0.75" />
                    <path d="M -1.2 3.2 C -1 4.5, 1 4.5, 1.2 3.2 Z" fill="#1D6F47" />
                  </g>

                  {/* TULIP 7 (Accent Right): Petite Rosebud Tulip (x=103, y=11) */}
                  <g transform="translate(103, 11)">
                    <ellipse cx="0" cy="1.8" rx="3.5" ry="4.8" fill="#000000" opacity="0.2" />
                    <path d="M -2.5 2.5 C -3.8 -1, -2.5 -5, 0 -5.5 C 2.5 -5, 3.8 -1, 2.5 2.5 Z" fill="#BE123C" />
                    <path d="M -3.5 1.8 C -4.2 -1.5, -3 -5, -0.6 -5 C -0.4 -1, -2 2.8, -3.5 1.8 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
                    <path d="M 3.5 1.8 C 4.2 -1.5, 3 -5, 0.6 -5 C 0.4 -1, 2 2.8, 3.5 1.8 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
                    <path d="M -2.2 2 C -2.8 -1.2, -1.6 -5.2, 0 -5.8 C 1.6 -5.2, 2.8 -1.2, 2.2 2 C 1.6 3.5, -1.6 3.5, -2.2 2 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
                    <path d="M 0 -5.8 Q 1 -2 0.8 1.5" stroke="#FFFFFF" strokeWidth="0.35" fill="none" opacity="0.7" />
                    <path d="M -1 2.8 C -0.8 3.8, 0.8 3.8, 1 2.8 Z" fill="#228555" />
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
