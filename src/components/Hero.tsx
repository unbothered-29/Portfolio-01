import React from "react";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { InteractiveGlassGrid } from "./InteractiveGlassGrid";
import { useTheme } from "../context/ThemeContext";

interface HeroProps {
  onExploreClick?: () => void;
  onContactClick: () => void;
}

export function Hero({
  onContactClick,
}: HeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-center items-center text-center px-5 sm:px-8 pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20 overflow-hidden select-none font-helvetica">
      {/* Clean Background Canvas & Bottom Fade */}
      <HeroAtmosphere />

      {/* Main Centered Typography & Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center my-auto py-6 sm:py-8 w-full">
        
        {/* 
          CENTRAL BREATHING AURA:
          Ultra-wide and deeply expansive aura brought to the middle of the hero text,
          with height scaled equally to its width (circular/spherical proportions)
          and multi-layered organic breathing effect visible in both themes.
        */}
        <div
          aria-hidden="true"
          className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none w-[100vw] max-w-[1700px] h-[850px] sm:h-[1100px] md:h-[1400px] flex items-center justify-center select-none opacity-80 sm:opacity-85"
        >
          {/* Layer 0: Concentrated Radiant Nucleus Pulse Heart */}
          <div
            className="absolute rounded-full w-[360px] sm:w-[500px] md:w-[680px] h-[360px] sm:h-[500px] md:h-[680px] transform-gpu will-change-transform animate-aura-heart pointer-events-none"
            style={{
              background: isDark
                ? `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.48) 0%, rgba(139, 92, 246, 0.30) 40%, transparent 75%)`
                : `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.44) 0%, rgba(168, 85, 247, 0.32) 38%, rgba(192, 132, 252, 0.16) 65%, transparent 80%)`,
              filter: "blur(55px)",
            }}
          />

          {/* Layer 1: Vivid Amethyst & Electric Purple Core Breathing Glow */}
          <div
            className="absolute rounded-full w-[540px] sm:w-[760px] md:w-[1050px] lg:w-[1250px] h-[540px] sm:h-[760px] md:h-[1050px] lg:h-[1250px] transform-gpu will-change-transform animate-aura-core pointer-events-none"
            style={{
              background: isDark
                ? `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.38) 0%, rgba(139, 92, 246, 0.26) 35%, rgba(124, 58, 237, 0.11) 65%, transparent 80%)`
                : `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.42) 0%, rgba(192, 132, 252, 0.32) 32%, rgba(216, 180, 254, 0.18) 65%, transparent 80%)`,
              filter: "blur(75px)",
            }}
          />

          {/* Layer 2: Wide Soft Lavender Atmospheric Breathing Diffuser */}
          <div
            className="absolute rounded-full w-[700px] sm:w-[980px] md:w-[1320px] lg:w-[1550px] h-[700px] sm:h-[980px] md:h-[1320px] lg:h-[1550px] transform-gpu will-change-transform animate-aura-breathe pointer-events-none"
            style={{
              background: isDark
                ? `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.25) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 75%)`
                : `radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.30) 0%, rgba(216, 180, 254, 0.20) 45%, transparent 78%)`,
              filter: "blur(95px)",
            }}
          />

          {/* Layer 3: Ultra-Wide Ambient Mist Halo */}
          <div
            className="absolute rounded-full w-[850px] sm:w-[1150px] md:w-[1500px] lg:w-[1750px] h-[850px] sm:h-[1150px] md:h-[1500px] lg:h-[1750px] transform-gpu pointer-events-none opacity-40"
            style={{
              background: isDark
                ? `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, rgba(109, 61, 245, 0.08) 50%, transparent 75%)`
                : `radial-gradient(circle at 50% 50%, rgba(216, 180, 254, 0.24) 0%, rgba(233, 213, 255, 0.14) 50%, transparent 75%)`,
              filter: "blur(130px)",
            }}
          />
        </div>

        {/* Dominant Headline: 3 Rows - Fraunces Headline + Fraunces Italic */}
        <h1 className="text-[clamp(44px,8.5vw,144px)] sm:text-[clamp(56px,8.5vw,144px)] text-[#180F2E] dark:text-[#F5F3FA] leading-[0.92] sm:leading-[0.95] transition-all duration-300 drop-shadow-[0_20px_50px_rgba(66,55,100,0.08)] dark:drop-shadow-[0_20px_50px_rgba(196,181,253,0.22)] select-none">
          <span className="block font-fraunces font-bold tracking-tight uppercase">
            BUILD
          </span>
          <span className="block font-fraunces italic font-normal sm:font-medium tracking-[-0.02em] text-[#423764] dark:text-[#C4B5FD] py-1 sm:py-1.5 normal-case">
            Digital
          </span>
          <span className="block font-fraunces font-bold tracking-tight uppercase">
            EXPERIENCES.
          </span>
        </h1>

        {/* Supporting Text in Refined Sora */}
        <p className="mt-8 sm:mt-10 md:mt-12 font-sora text-[15px] sm:text-[17px] md:text-[18px] font-normal text-[#423764]/80 dark:text-[#A19BAE] max-w-xl leading-relaxed tracking-normal px-2">
          Front-end developer focused on creating responsive, polished interfaces that turn ideas into usable products.
        </p>

        {/* Liquid Glass Action Pill */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center font-sora">
          {/* Action Pill */}
          <button
            onClick={onContactClick}
            className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full overflow-hidden text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-[#180F2E] dark:text-[#F5F3FA] bg-white/[0.80] hover:bg-white dark:bg-white/[0.08] dark:hover:bg-white/[0.16] backdrop-blur-[20px] backdrop-saturate-[180%] border border-[#D6CBFF] dark:border-white/15 hover:border-[#C4B5FD] dark:hover:border-white/30 shadow-[0_8px_25px_rgba(66,55,100,0.08),_0_2px_6px_rgba(30,20,50,0.03),_inset_0_1px_1.5px_0_rgba(255,255,255,0.98),_inset_0_-1px_2px_0_rgba(214,203,255,0.3)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.5),_inset_0_1px_1.5px_0_rgba(255,255,255,0.18),_inset_0_-1px_2px_0_rgba(196,181,253,0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(66,55,100,0.14)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.7)] active:translate-y-0 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]/70 min-h-[42px]"
          >
            {/* Fluid Reflection Inside Pill */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C4B5FD]/[0.22] dark:via-[#A78BFA]/[0.2] to-transparent pointer-events-none"
            />
            <span className="relative z-10">Book a call or contact me</span>
          </button>
        </div>

      </div>

      {/* Small Supporting Metadata */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-5 sm:left-8 md:left-12 lg:left-16 z-20 text-left pointer-events-none select-none">
        <div className="font-sora text-[9.5px] sm:text-[10px] md:text-[10.5px] leading-[1.65] tracking-[0.2em] uppercase font-medium text-[#423764]/60 dark:text-[#8E879B] flex flex-col">
          <span>FRONT-END DEVELOPER</span>
          <span>MUMBAI / INDIA</span>
          <span>2026</span>
        </div>
      </div>

      {/* Interactive Liquid Glass Tile Grid (Hidden at rest, illuminates on mouse hover) */}
      <InteractiveGlassGrid />
    </section>
  );
}
