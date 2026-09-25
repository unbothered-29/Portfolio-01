import React from "react";
import { motion } from "motion/react";

interface BuildingVeilOfLightsProps {
  isDark: boolean;
}

/**
 * BuildingVeilOfLights
 * 
 * An elegant, architectural "veil of lights" extending naturally from the rooftop terrace
 * and cascading down along the vertical piers and bays of the building facade.
 * 
 * Features:
 * - Fine, delicate hanging festoon cables with natural catenary swags and vertical drops
 * - Small clustered micro-bulbs in warm amber (#FEF3C7 / #FBBF24) and soft lavender (#F5EEFF / #C4B5FD)
 * - Soft radial halo bloom in dark mode that washes gently over the purple masonry
 * - Organic, subtle breeze sway without looking like chaotic fairy lights or Christmas clutter
 * - Fully responsive vector coordinates that align with the 3-column architectural bays
 */
export function BuildingVeilOfLights({ isDark }: BuildingVeilOfLightsProps) {
  // Bulb palette definitions
  const AMBER_GLOW = {
    bulb: isDark ? "#FEF3C7" : "rgba(255,255,255,0.92)",
    filament: isDark ? "#F59E0B" : "#D97706",
    halo: "rgba(251, 191, 36, 0.45)",
    ambient: "rgba(251, 191, 36, 0.15)",
  };

  const LAVENDER_GLOW = {
    bulb: isDark ? "#F5EEFF" : "rgba(255,255,255,0.92)",
    filament: isDark ? "#A78BFA" : "#7C3AED",
    halo: "rgba(196, 181, 253, 0.45)",
    ambient: "rgba(167, 139, 250, 0.16)",
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-30 overflow-visible select-none"
    >
      <svg
        viewBox="0 0 1000 860"
        className="w-full h-full overflow-visible pointer-events-none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Amber Bulb Glow Filter */}
          <radialGradient id="veilGlowAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#FEF3C7" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#FBBF24" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          {/* Lavender Bulb Glow Filter */}
          <radialGradient id="veilGlowLavender" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#F5EEFF" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#C4B5FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. FAR LEFT QUOIN PIER VERTICAL STRAND
            Cascades from terrace left post down the edge of the facade
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g id="veil-strand-far-left">
          {/* Main vertical hanging wire with slight natural curvature */}
          <path
            d="M 22 -6 Q 26 80, 23 180 Q 20 280, 24 370 Q 25 430, 22 470"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.45)" : "rgba(45,35,65,0.55)"}
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          {/* Gentle terminal curl */}
          <path
            d="M 22 470 Q 20 482, 23 488"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(45,35,65,0.4)"}
            strokeWidth="0.7"
          />

          {/* Hanging Micro-Bulbs along Strand 1 */}
          {[
            { x: 23, y: 32, type: "amber", delay: 0 },
            { x: 25, y: 95, type: "lavender", delay: 0.4 },
            { x: 24, y: 162, type: "amber", delay: 0.8 },
            { x: 22, y: 230, type: "lavender", delay: 1.2 },
            { x: 21, y: 300, type: "amber", delay: 1.6 },
            { x: 24, y: 375, type: "lavender", delay: 2.0 },
            { x: 23, y: 445, type: "amber", delay: 2.4 },
          ].map((b, idx) => {
            const isAmber = b.type === "amber";
            return (
              <motion.g
                key={`left-b-${idx}`}
                animate={{
                  rotate: [-2.2, 2.2, -2.2],
                  x: [-0.5, 0.5, -0.5],
                }}
                transition={{
                  duration: 3.4 + (idx % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }}
                style={{ transformOrigin: `${b.x}px ${b.y}px` }}
              >
                {/* Weatherproof Socket Clip */}
                <rect
                  x={b.x - 1.2}
                  y={b.y - 1}
                  width="2.4"
                  height="2"
                  rx="0.4"
                  fill={isDark ? "#0D0A14" : "#2E243D"}
                />
                {/* Teardrop Glass Bulb */}
                <ellipse
                  cx={b.x}
                  cy={b.y + 3.2}
                  rx="1.8"
                  ry="2.4"
                  fill={isAmber ? AMBER_GLOW.bulb : LAVENDER_GLOW.bulb}
                  stroke={isAmber ? AMBER_GLOW.filament : LAVENDER_GLOW.filament}
                  strokeWidth="0.4"
                />
                {/* Dark Mode Halo & Filament */}
                {isDark && (
                  <>
                    <line
                      x1={b.x}
                      y1={b.y + 2.2}
                      x2={b.x}
                      y2={b.y + 4.2}
                      stroke={isAmber ? "#F59E0B" : "#DDD6FE"}
                      strokeWidth="0.8"
                    />
                    <circle
                      cx={b.x}
                      cy={b.y + 3.2}
                      r="6.5"
                      fill={isAmber ? "url(#veilGlowAmber)" : "url(#veilGlowLavender)"}
                      opacity="0.88"
                    />
                    <circle
                      cx={b.x}
                      cy={b.y + 3.2}
                      r="13"
                      fill={isAmber ? AMBER_GLOW.halo : LAVENDER_GLOW.halo}
                      opacity="0.22"
                    />
                  </>
                )}
              </motion.g>
            );
          })}
        </g>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. LEFT BAY DRAPED SWAG (BETWEEN QUOIN & CENTER-LEFT BAY)
            Drapes gently beneath the Floor 0 cornice ledge
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g id="veil-strand-left-swag">
          <path
            d="M 24 35 Q 90 68, 170 52 Q 250 36, 320 44"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(45,35,65,0.5)"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Bulbs along Swag 1 */}
          {[
            { x: 80, y: 56, type: "amber", delay: 0.3 },
            { x: 135, y: 58, type: "lavender", delay: 0.9 },
            { x: 200, y: 47, type: "amber", delay: 1.5 },
            { x: 265, y: 41, type: "lavender", delay: 2.1 },
          ].map((b, idx) => {
            const isAmber = b.type === "amber";
            return (
              <motion.g
                key={`lswag-b-${idx}`}
                animate={{ rotate: [-2.5, 2.5, -2.5] }}
                transition={{
                  duration: 3.2 + (idx % 2) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }}
                style={{ transformOrigin: `${b.x}px ${b.y}px` }}
              >
                <rect x={b.x - 1.2} y={b.y - 1} width="2.4" height="2" rx="0.4" fill={isDark ? "#0D0A14" : "#2E243D"} />
                <ellipse cx={b.x} cy={b.y + 3.2} rx="1.8" ry="2.4" fill={isAmber ? AMBER_GLOW.bulb : LAVENDER_GLOW.bulb} stroke={isAmber ? AMBER_GLOW.filament : LAVENDER_GLOW.filament} strokeWidth="0.4" />
                {isDark && (
                  <>
                    <circle cx={b.x} cy={b.y + 3.2} r="6" fill={isAmber ? "url(#veilGlowAmber)" : "url(#veilGlowLavender)"} opacity="0.85" />
                    <circle cx={b.x} cy={b.y + 3.2} r="12" fill={isAmber ? AMBER_GLOW.halo : LAVENDER_GLOW.halo} opacity="0.2" />
                  </>
                )}
              </motion.g>
            );
          })}
        </g>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. CENTER-LEFT VERTICAL CASCADE (BETWEEN WINDOW COL 0 & COL 1)
            Drops from terrace stanchion 2 down between window bays
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g id="veil-strand-center-left-drop">
          <path
            d="M 334 -4 Q 338 60, 335 150 Q 331 230, 336 310"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.42)" : "rgba(45,35,65,0.52)"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {[
            { x: 335, y: 38, type: "lavender", delay: 0.2 },
            { x: 337, y: 105, type: "amber", delay: 0.7 },
            { x: 334, y: 175, type: "lavender", delay: 1.3 },
            { x: 333, y: 245, type: "amber", delay: 1.8 },
            { x: 336, y: 305, type: "lavender", delay: 2.3 },
          ].map((b, idx) => {
            const isAmber = b.type === "amber";
            return (
              <motion.g
                key={`cldrop-b-${idx}`}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{
                  duration: 3.5 + (idx % 2) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }}
                style={{ transformOrigin: `${b.x}px ${b.y}px` }}
              >
                <rect x={b.x - 1.2} y={b.y - 1} width="2.4" height="2" rx="0.4" fill={isDark ? "#0D0A14" : "#2E243D"} />
                <ellipse cx={b.x} cy={b.y + 3.2} rx="1.8" ry="2.4" fill={isAmber ? AMBER_GLOW.bulb : LAVENDER_GLOW.bulb} stroke={isAmber ? AMBER_GLOW.filament : LAVENDER_GLOW.filament} strokeWidth="0.4" />
                {isDark && (
                  <>
                    <circle cx={b.x} cy={b.y + 3.2} r="6" fill={isAmber ? "url(#veilGlowAmber)" : "url(#veilGlowLavender)"} opacity="0.85" />
                    <circle cx={b.x} cy={b.y + 3.2} r="12" fill={isAmber ? AMBER_GLOW.halo : LAVENDER_GLOW.halo} opacity="0.2" />
                  </>
                )}
              </motion.g>
            );
          })}
        </g>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. CENTER SWAG & GRACEFUL DRAPED LOOP (BELOW PENTHOUSE)
            Festoon swag looping under the central bulkhead
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g id="veil-strand-center-swag">
          <path
            d="M 346 22 Q 500 52, 654 22"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.45)" : "rgba(45,35,65,0.55)"}
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          {[
            { x: 400, y: 34, type: "amber", delay: 0.4 },
            { x: 450, y: 44, type: "lavender", delay: 1.0 },
            { x: 500, y: 47, type: "amber", delay: 1.6 },
            { x: 550, y: 44, type: "lavender", delay: 2.2 },
            { x: 600, y: 34, type: "amber", delay: 0.6 },
          ].map((b, idx) => {
            const isAmber = b.type === "amber";
            return (
              <motion.g
                key={`cswag-b-${idx}`}
                animate={{ rotate: [-2.6, 2.6, -2.6] }}
                transition={{
                  duration: 3.3 + (idx % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }}
                style={{ transformOrigin: `${b.x}px ${b.y}px` }}
              >
                <rect x={b.x - 1.2} y={b.y - 1} width="2.4" height="2" rx="0.4" fill={isDark ? "#0D0A14" : "#2E243D"} />
                <ellipse cx={b.x} cy={b.y + 3.2} rx="1.8" ry="2.4" fill={isAmber ? AMBER_GLOW.bulb : LAVENDER_GLOW.bulb} stroke={isAmber ? AMBER_GLOW.filament : LAVENDER_GLOW.filament} strokeWidth="0.4" />
                {isDark && (
                  <>
                    <circle cx={b.x} cy={b.y + 3.2} r="6.5" fill={isAmber ? "url(#veilGlowAmber)" : "url(#veilGlowLavender)"} opacity="0.88" />
                    <circle cx={b.x} cy={b.y + 3.2} r="13" fill={isAmber ? AMBER_GLOW.halo : LAVENDER_GLOW.halo} opacity="0.22" />
                  </>
                )}
              </motion.g>
            );
          })}
        </g>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. CENTER-RIGHT VERTICAL CASCADE (BETWEEN WINDOW COL 1 & COL 2)
            Drops from terrace stanchion 4 down between window bays
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g id="veil-strand-center-right-drop">
          <path
            d="M 664 -4 Q 661 70, 665 160 Q 668 240, 663 325"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.42)" : "rgba(45,35,65,0.52)"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {[
            { x: 663, y: 42, type: "amber", delay: 0.5 },
            { x: 662, y: 112, type: "lavender", delay: 1.1 },
            { x: 665, y: 180, type: "amber", delay: 1.7 },
            { x: 667, y: 250, type: "lavender", delay: 2.2 },
            { x: 664, y: 318, type: "amber", delay: 0.8 },
          ].map((b, idx) => {
            const isAmber = b.type === "amber";
            return (
              <motion.g
                key={`crdrop-b-${idx}`}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{
                  duration: 3.6 + (idx % 2) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }}
                style={{ transformOrigin: `${b.x}px ${b.y}px` }}
              >
                <rect x={b.x - 1.2} y={b.y - 1} width="2.4" height="2" rx="0.4" fill={isDark ? "#0D0A14" : "#2E243D"} />
                <ellipse cx={b.x} cy={b.y + 3.2} rx="1.8" ry="2.4" fill={isAmber ? AMBER_GLOW.bulb : LAVENDER_GLOW.bulb} stroke={isAmber ? AMBER_GLOW.filament : LAVENDER_GLOW.filament} strokeWidth="0.4" />
                {isDark && (
                  <>
                    <circle cx={b.x} cy={b.y + 3.2} r="6" fill={isAmber ? "url(#veilGlowAmber)" : "url(#veilGlowLavender)"} opacity="0.85" />
                    <circle cx={b.x} cy={b.y + 3.2} r="12" fill={isAmber ? AMBER_GLOW.halo : LAVENDER_GLOW.halo} opacity="0.2" />
                  </>
                )}
              </motion.g>
            );
          })}
        </g>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6. FAR RIGHT QUOIN PIER VERTICAL STRAND
            Cascades from terrace right post down the edge of the facade
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g id="veil-strand-far-right">
          <path
            d="M 978 -6 Q 974 80, 977 180 Q 980 280, 976 370 Q 975 430, 978 470"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.45)" : "rgba(45,35,65,0.55)"}
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <path
            d="M 978 470 Q 980 482, 977 488"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(45,35,65,0.4)"}
            strokeWidth="0.7"
          />

          {[
            { x: 977, y: 32, type: "lavender", delay: 0.1 },
            { x: 975, y: 95, type: "amber", delay: 0.6 },
            { x: 976, y: 162, type: "lavender", delay: 1.1 },
            { x: 978, y: 230, type: "amber", delay: 1.5 },
            { x: 979, y: 300, type: "lavender", delay: 1.9 },
            { x: 976, y: 375, type: "amber", delay: 2.3 },
            { x: 977, y: 445, type: "lavender", delay: 0.7 },
          ].map((b, idx) => {
            const isAmber = b.type === "amber";
            return (
              <motion.g
                key={`right-b-${idx}`}
                animate={{
                  rotate: [-2.2, 2.2, -2.2],
                  x: [-0.5, 0.5, -0.5],
                }}
                transition={{
                  duration: 3.4 + (idx % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }}
                style={{ transformOrigin: `${b.x}px ${b.y}px` }}
              >
                <rect
                  x={b.x - 1.2}
                  y={b.y - 1}
                  width="2.4"
                  height="2"
                  rx="0.4"
                  fill={isDark ? "#0D0A14" : "#2E243D"}
                />
                <ellipse
                  cx={b.x}
                  cy={b.y + 3.2}
                  rx="1.8"
                  ry="2.4"
                  fill={isAmber ? AMBER_GLOW.bulb : LAVENDER_GLOW.bulb}
                  stroke={isAmber ? AMBER_GLOW.filament : LAVENDER_GLOW.filament}
                  strokeWidth="0.4"
                />
                {isDark && (
                  <>
                    <line
                      x1={b.x}
                      y1={b.y + 2.2}
                      x2={b.x}
                      y2={b.y + 4.2}
                      stroke={isAmber ? "#F59E0B" : "#DDD6FE"}
                      strokeWidth="0.8"
                    />
                    <circle
                      cx={b.x}
                      cy={b.y + 3.2}
                      r="6.5"
                      fill={isAmber ? "url(#veilGlowAmber)" : "url(#veilGlowLavender)"}
                      opacity="0.88"
                    />
                    <circle
                      cx={b.x}
                      cy={b.y + 3.2}
                      r="13"
                      fill={isAmber ? AMBER_GLOW.halo : LAVENDER_GLOW.halo}
                      opacity="0.22"
                    />
                  </>
                )}
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
