import React from "react";

interface FacadeArchitecturalDetailsProps {
  isDark: boolean;
}

/**
 * FacadeArchitecturalDetails
 * 
 * Provides rich architectural masonry depth and environmental realism:
 * - Corner rusticated ashlar quoins (alternating wide/narrow stone blocks)
 * - Authentic copper rainwater downspout with wall brackets and scupper box
 * - Historic cast-iron anchor tie stars on vertical masonry piers
 * - Fine horizontal stone coursing lines
 * - All adhering strictly to the portfolio's purple color system
 */
export function FacadeArchitecturalDetails({ isDark }: FacadeArchitecturalDetailsProps) {
  // Quoin heights: 24 alternating stone courses along the building height
  const quoinBlocks = [
    { wide: true, h: 32 },
    { wide: false, h: 28 },
    { wide: true, h: 34 },
    { wide: false, h: 30 },
    { wide: true, h: 32 },
    { wide: false, h: 28 },
    { wide: true, h: 34 },
    { wide: false, h: 30 },
    { wide: true, h: 32 },
    { wide: false, h: 28 },
    { wide: true, h: 34 },
    { wide: false, h: 30 },
    { wide: true, h: 32 },
    { wide: false, h: 28 },
    { wide: true, h: 34 },
    { wide: false, h: 30 },
    { wide: true, h: 32 },
    { wide: false, h: 28 },
    { wide: true, h: 34 },
    { wide: false, h: 30 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. LEFT CORNER RUSTICATED ASHLAR QUOINS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute top-0 bottom-0 left-0 w-3.5 sm:w-5 md:w-6 flex flex-col pointer-events-none z-10">
        {quoinBlocks.map((q, idx) => (
          <div
            key={`l-quoin-${idx}`}
            style={{
              width: q.wide ? "100%" : "68%",
              height: `${q.h}px`,
            }}
            className={`border-b border-r transition-colors duration-700 shadow-sm ${
              isDark
                ? "bg-[#181326] border-black/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                : "bg-[#D8CCE6] border-[#A898BC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
            }`}
          >
            {/* Subtle stone bevel highlight */}
            <div
              className={`w-full h-[1px] ${
                isDark ? "bg-white/[0.08]" : "bg-white/70"
              }`}
            />
          </div>
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. RIGHT CORNER RUSTICATED ASHLAR QUOINS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute top-0 bottom-0 right-0 w-3.5 sm:w-5 md:w-6 flex flex-col items-end pointer-events-none z-10">
        {quoinBlocks.map((q, idx) => (
          <div
            key={`r-quoin-${idx}`}
            style={{
              width: q.wide ? "100%" : "68%",
              height: `${q.h}px`,
            }}
            className={`border-b border-l transition-colors duration-700 shadow-sm ${
              isDark
                ? "bg-[#181326] border-black/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                : "bg-[#D8CCE6] border-[#A898BC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
            }`}
          >
            <div
              className={`w-full h-[1px] ${
                isDark ? "bg-white/[0.08]" : "bg-white/70"
              }`}
            />
          </div>
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. ARCHITECTURAL COPPER RAINWATER DOWNSPOUT (LEFT FLANK)
          Authentic drainage pipe running vertically along the building
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute top-0 bottom-2 left-4 sm:left-6 md:left-7 w-2 sm:w-2.5 flex flex-col items-center pointer-events-none z-20">
        {/* Rooftop Hopper / Scupper Collection Box */}
        <div
          className={`w-3.5 sm:w-4.5 h-4 rounded-t-xs border shadow-md flex items-center justify-center transition-colors duration-700 ${
            isDark
              ? "bg-[#2A1D16] border-[#451A03] shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              : "bg-[#8D5B3A] border-[#5E3821] shadow-sm"
          }`}
        >
          {/* Embossed rosette crest on hopper */}
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
        </div>

        {/* Vertical Copper Pipe Body */}
        <div
          className={`w-1.5 sm:w-2 flex-1 relative border-x transition-colors duration-700 shadow-md ${
            isDark
              ? "bg-gradient-to-r from-[#1F1510] via-[#332219] to-[#1C120C] border-black/60 shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              : "bg-gradient-to-r from-[#6B4228] via-[#8D5B3A] to-[#5C3720] border-[#3D2213] shadow-sm"
          }`}
        >
          {/* Subtle verdigris / specular reflection along pipe length */}
          <div className="absolute inset-y-0 left-0.5 w-[0.5px] bg-white/20" />

          {/* Wall-Mounting Standoff Brackets (spaced evenly per floor) */}
          {[60, 220, 380, 540, 680].map((bracketY, i) => (
            <div
              key={`bracket-${i}`}
              style={{ top: `${bracketY}px` }}
              className="absolute -inset-x-1 h-2 rounded-[1px] flex items-center justify-between"
            >
              {/* Left bracket wing & hex bolt */}
              <div
                className={`w-1.5 h-2 rounded-[0.5px] flex items-center justify-center ${
                  isDark ? "bg-[#140E0A]" : "bg-[#452715]"
                }`}
              >
                <div className="w-0.5 h-0.5 rounded-full bg-amber-300" />
              </div>
              {/* Right bracket wing & hex bolt */}
              <div
                className={`w-1.5 h-2 rounded-[0.5px] flex items-center justify-center ${
                  isDark ? "bg-[#140E0A]" : "bg-[#452715]"
                }`}
              >
                <div className="w-0.5 h-0.5 rounded-full bg-amber-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Egress Shoe Elbow (curves outward near ground) */}
        <div
          className={`w-2.5 sm:w-3.5 h-3 rounded-b-sm border-t ${
            isDark ? "bg-[#2A1D16] border-[#140E0A]" : "bg-[#7A4C2E] border-[#452715]"
          }`}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. HISTORIC CAST-IRON STAR TIE-PLATES (PIER ANCHORS)
          Decorative architectural stars on vertical piers between floors
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {[
        // Floor 0 to 1 Beltcourse Pier Stars (between col 0 & 1, col 1 & 2)
        { x: "33.3%", y: "24.5%" },
        { x: "66.6%", y: "24.5%" },
        // Floor 1 to 2 Beltcourse Pier Stars
        { x: "33.3%", y: "49.5%" },
        { x: "66.6%", y: "49.5%" },
        // Floor 2 to 3 Beltcourse Pier Stars
        { x: "33.3%", y: "74.5%" },
        { x: "66.6%", y: "74.5%" },
      ].map((star, idx) => (
        <div
          key={`star-${idx}`}
          style={{ left: star.x, top: star.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-3 sm:w-3.5 h-3 sm:h-3.5 flex items-center justify-center pointer-events-none z-10"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full drop-shadow-sm pointer-events-none"
          >
            {/* 5-Pointed Architectural Cast Iron Star */}
            <polygon
              points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
              fill={isDark ? "#282035" : "#5C4A72"}
              stroke={isDark ? "#0A0810" : "#3F3250"}
              strokeWidth="1.2"
            />
            {/* Center Anchor Pin Bolt */}
            <circle cx="12" cy="12" r="2.4" fill={isDark ? "#D97706" : "#F59E0B"} />
            <circle cx="12" cy="12" r="1.2" fill="#FEF08A" />
          </svg>
        </div>
      ))}
    </div>
  );
}
