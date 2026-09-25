import React from "react";
import { motion } from "motion/react";

export type CurtainStyle =
  | "none"
  | "left-sheer"
  | "right-sheer"
  | "both-sheer"
  | "roman-blind"
  | "venetian-blind"
  | "cafe-curtain";

export type AmbientGlowType =
  | "warm-amber"
  | "soft-lavender"
  | "dim-purple"
  | "faint-night";

export type SillItemType =
  | "none"
  | "succulent-pot"
  | "vintage-books"
  | "steaming-mug"
  | "hanging-ivy";

interface WindowArchitecturalOverlayProps {
  isDark: boolean;
  isActive: boolean;
  curtainStyle?: CurtainStyle;
  ambientGlow?: AmbientGlowType;
  sillItem?: SillItemType;
  specularAngle?: string;
}

/**
 * WindowArchitecturalOverlay
 * 
 * Injects high architectural detail density and lived-in environmental storytelling
 * to the windows:
 * - Ceiling ambient drop shadow
 * - Varied atmospheric interior glow (warm amber, soft lavender, dim purple, faint night)
 * - Architectural curtains (sheer linen drapes, Roman fabric blinds, Venetian blinds, cafe drapes)
 * - Double-hung sash meeting rail with center brass cam-lock hardware
 * - Inner sill decorative storytelling objects (succulents, books, steaming mug, hanging ivy)
 * - Multi-layered specular glass reflections
 */
export function WindowArchitecturalOverlay({
  isDark,
  isActive,
  curtainStyle = "none",
  ambientGlow = "soft-lavender",
  sillItem = "none",
  specularAngle = "135deg",
}: WindowArchitecturalOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. INTERIOR AMBIENT ATMOSPHERE GLOW
          Gives individual rooms living character even before hover/click
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {!isActive && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            ambientGlow === "warm-amber"
              ? isDark
                ? "bg-[radial-gradient(ellipse_at_50%_65%,_rgba(251,191,36,0.18)_0%,_rgba(245,158,11,0.06)_45%,_transparent_75%)]"
                : "bg-[radial-gradient(ellipse_at_50%_65%,_rgba(251,191,36,0.12)_0%,_transparent_65%)]"
              : ambientGlow === "soft-lavender"
              ? isDark
                ? "bg-[radial-gradient(ellipse_at_50%_60%,_rgba(196,181,253,0.22)_0%,_rgba(167,139,250,0.07)_50%,_transparent_80%)]"
                : "bg-[radial-gradient(ellipse_at_50%_60%,_rgba(196,181,253,0.15)_0%,_transparent_70%)]"
              : ambientGlow === "dim-purple"
              ? isDark
                ? "bg-[radial-gradient(ellipse_at_50%_60%,_rgba(147,51,234,0.14)_0%,_transparent_70%)]"
                : "bg-[radial-gradient(ellipse_at_50%_60%,_rgba(147,51,234,0.08)_0%,_transparent_70%)]"
              : /* faint-night */ isDark
              ? "bg-[#050409]/45"
              : "bg-[#251B38]/05"
          }`}
        />
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. CEILING REVEAL DROP SHADOW
          Creates realistic 3D room interior depth
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className={`absolute top-0 inset-x-0 h-6 pointer-events-none transition-opacity duration-500 ${
          isDark
            ? "bg-gradient-to-b from-black/65 via-black/25 to-transparent"
            : "bg-gradient-to-b from-[#34154E]/30 via-[#34154E]/10 to-transparent"
        }`}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. ARCHITECTURAL CURTAINS & BLINDS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 3A. BOTH SHEER CURTAINS */}
      {curtainStyle === "both-sheer" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Left Sheer Drapery */}
          <path
            d="M 0 0 L 14 0 C 12 18, 15 36, 12 55 C 10 65, 14 75, 11 75 L 0 75 Z"
            fill={isDark ? "#FFFFFF" : "#FAF5FF"}
            opacity={isDark ? 0.22 : 0.55}
          />
          <path
            d="M 4 0 Q 3 36 4.5 75"
            stroke="#FFFFFF"
            strokeWidth="0.5"
            opacity={isDark ? 0.3 : 0.65}
            fill="none"
          />
          <path
            d="M 9 0 Q 8 38 9.5 75"
            stroke="#FFFFFF"
            strokeWidth="0.5"
            opacity={isDark ? 0.25 : 0.55}
            fill="none"
          />

          {/* Right Sheer Drapery */}
          <path
            d="M 86 0 L 100 0 L 100 75 L 89 75 C 86 65, 90 36, 88 18 Z"
            fill={isDark ? "#FFFFFF" : "#FAF5FF"}
            opacity={isDark ? 0.22 : 0.55}
          />
          <path
            d="M 91 0 Q 92 36 90.5 75"
            stroke="#FFFFFF"
            strokeWidth="0.5"
            opacity={isDark ? 0.25 : 0.55}
            fill="none"
          />
          <path
            d="M 96 0 Q 97 38 95.5 75"
            stroke="#FFFFFF"
            strokeWidth="0.5"
            opacity={isDark ? 0.3 : 0.65}
            fill="none"
          />
        </svg>
      )}

      {/* 3B. LEFT SHEER CURTAIN (WITH SUBTLE TIEBACK) */}
      {curtainStyle === "left-sheer" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d="M 0 0 L 18 0 C 16 16, 11 32, 10 42 C 9 48, 14 62, 16 75 L 0 75 Z"
            fill={isDark ? "#FFFFFF" : "#FAF5FF"}
            opacity={isDark ? 0.26 : 0.58}
          />
          {/* Vertical drapery folds */}
          <path d="M 4 0 Q 3 35 4.5 75" stroke="#FFFFFF" strokeWidth="0.5" opacity={isDark ? 0.3 : 0.6} fill="none" />
          <path d="M 9 0 Q 7 38 10 75" stroke="#FFFFFF" strokeWidth="0.5" opacity={isDark ? 0.25 : 0.5} fill="none" />
          {/* Brass tieback clip */}
          <rect x="0" y="41" width="11" height="1.6" rx="0.5" fill="#D97706" opacity="0.85" />
          <circle cx="10.5" cy="41.8" r="1.1" fill="#FBBF24" />
        </svg>
      )}

      {/* 3C. RIGHT SHEER CURTAIN */}
      {curtainStyle === "right-sheer" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d="M 82 0 L 100 0 L 100 75 L 84 75 C 86 62, 89 48, 90 42 C 89 32, 84 16, 82 0 Z"
            fill={isDark ? "#FFFFFF" : "#FAF5FF"}
            opacity={isDark ? 0.26 : 0.58}
          />
          <path d="M 96 0 Q 97 35 95.5 75" stroke="#FFFFFF" strokeWidth="0.5" opacity={isDark ? 0.3 : 0.6} fill="none" />
          <path d="M 91 0 Q 93 38 90 75" stroke="#FFFFFF" strokeWidth="0.5" opacity={isDark ? 0.25 : 0.5} fill="none" />
          <rect x="89" y="41" width="11" height="1.6" rx="0.5" fill="#D97706" opacity="0.85" />
          <circle cx="89.5" cy="41.8" r="1.1" fill="#FBBF24" />
        </svg>
      )}

      {/* 3D. ROMAN FABRIC BLIND (PULLED DOWN 22% AT TOP) */}
      {curtainStyle === "roman-blind" && (
        <div className="absolute top-0 inset-x-0 h-[22%] pointer-events-none z-10 flex flex-col shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
          {/* Main Fabric Shade with subtle horizontal pleats */}
          <div
            className={`w-full h-full relative border-b transition-colors duration-500 ${
              isDark
                ? "bg-[#251F33] border-[#3F3356]"
                : "bg-[#E2D8ED] border-[#B8A6CE]"
            }`}
          >
            {/* Horizontal pleat seam lines */}
            <div className="absolute top-[32%] inset-x-0 h-[1px] bg-black/25" />
            <div className="absolute top-[65%] inset-x-0 h-[1px] bg-black/25" />
            {/* Bottom Hem Rail with weight rod */}
            <div
              className={`absolute bottom-0 inset-x-0 h-1.5 border-t ${
                isDark ? "bg-[#1B1626] border-white/10" : "bg-[#D3C4E3] border-white/60"
              }`}
            />
            {/* Slender Pull-Cord Tassel */}
            <div className="absolute top-[80%] right-3 w-[1px] h-4 bg-white/50" />
            <div className="absolute top-[80%] right-[10.5px] w-1.5 h-2 rounded-b-sm bg-amber-400 shadow-sm" />
          </div>
        </div>
      )}

      {/* 3E. VENETIAN MINI-BLINDS (UPPER THIRD SLATS TILTED) */}
      {curtainStyle === "venetian-blind" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute top-0 inset-x-0 w-full h-[32%] pointer-events-none"
        >
          {/* Headrail */}
          <rect x="0" y="0" width="100" height="3" fill={isDark ? "#282038" : "#D4C5E6"} />
          {/* 7 Slender Horizontal Louvers */}
          {Array.from({ length: 7 }).map((_, idx) => (
            <g key={idx}>
              <line
                x1="2"
                y1={5 + idx * 3}
                x2="98"
                y2={5 + idx * 3}
                stroke={isDark ? "#43375C" : "#EDE5F7"}
                strokeWidth="1.6"
              />
              <line
                x1="2"
                y1={4.4 + idx * 3}
                x2="98"
                y2={4.4 + idx * 3}
                stroke={isDark ? "rgba(255,255,255,0.15)" : "#FFFFFF"}
                strokeWidth="0.5"
              />
            </g>
          ))}
          {/* Vertical ladder cords */}
          <line x1="22" y1="0" x2="22" y2="24" stroke={isDark ? "#1C142A" : "#B2A0C8"} strokeWidth="0.6" strokeDasharray="1 1" />
          <line x1="78" y1="0" x2="78" y2="24" stroke={isDark ? "#1C142A" : "#B2A0C8"} strokeWidth="0.6" strokeDasharray="1 1" />
        </svg>
      )}

      {/* 3F. CAFE PRIVACY HALF-CURTAIN */}
      {curtainStyle === "cafe-curtain" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute bottom-0 inset-x-0 w-full h-[38%] pointer-events-none"
        >
          {/* Brass Cafe Tension Rod */}
          <line x1="0" y1="3" x2="100" y2="3" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="2" cy="3" r="1.4" fill="#FBBF24" />
          <circle cx="98" cy="3" r="1.4" fill="#FBBF24" />
          {/* Scalloped Linen Cafe Drape */}
          <path
            d="M 0 3 Q 12 5 25 3 Q 37 5 50 3 Q 62 5 75 3 Q 87 5 100 3 L 100 75 L 0 75 Z"
            fill={isDark ? "#1F1A2C" : "#FAF5FF"}
            opacity={isDark ? 0.75 : 0.88}
            stroke={isDark ? "#382E4E" : "#E2D4F0"}
            strokeWidth="0.5"
          />
          {/* Vertical drape ripple stitches */}
          <line x1="25" y1="4" x2="25" y2="75" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(100,70,130,0.15)"} strokeWidth="0.6" />
          <line x1="50" y1="4" x2="50" y2="75" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(100,70,130,0.15)"} strokeWidth="0.6" />
          <line x1="75" y1="4" x2="75" y2="75" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(100,70,130,0.15)"} strokeWidth="0.6" />
        </svg>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. SILL STORYTELLING OBJECTS
          Small personal items discovered when looking closer
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 4A. POTTED SUCCULENT ON SILL */}
      {sillItem === "succulent-pot" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          {/* Cast shadow under pot on sill */}
          <ellipse cx="85" cy="73.5" rx="4.5" ry="1.2" fill="#000000" opacity="0.35" />
          {/* Ceramic Pot */}
          <polygon points="81,66 89,66 87.5,73 82.5,73" fill={isDark ? "#D97706" : "#EA580C"} />
          <rect x="80.5" y="65" width="9" height="1.5" rx="0.4" fill={isDark ? "#B45309" : "#C2410C"} />
          {/* Succulent Echeveria rosette leaves */}
          <ellipse cx="85" cy="62" rx="3.5" ry="2" fill="#15803D" />
          <ellipse cx="83.5" cy="63.5" rx="2.2" ry="1.4" fill="#22C55E" />
          <ellipse cx="86.5" cy="63.5" rx="2.2" ry="1.4" fill="#16A34A" />
          <ellipse cx="85" cy="61" rx="1.5" ry="1.2" fill="#86EFAC" />
        </svg>
      )}

      {/* 4B. VINTAGE BOOKS ON SILL */}
      {sillItem === "vintage-books" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <ellipse cx="16" cy="73.5" rx="6" ry="1.2" fill="#000000" opacity="0.35" />
          {/* Bottom Book: Deep Navy */}
          <rect x="10" y="70" width="12" height="2.5" rx="0.4" fill="#1E3A8A" stroke="#172554" strokeWidth="0.3" />
          <line x1="12" y1="71.2" x2="20" y2="71.2" stroke="#FBBF24" strokeWidth="0.4" />
          {/* Top Book: Crimson Red */}
          <rect x="11.5" y="67.5" width="10" height="2.5" rx="0.4" fill="#991B1B" stroke="#7F1D1D" strokeWidth="0.3" />
          <line x1="13.5" y1="68.7" x2="19.5" y2="68.7" stroke="#FDE68A" strokeWidth="0.4" />
        </svg>
      )}

      {/* 4C. STEAMING MUG ON SILL */}
      {sillItem === "steaming-mug" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <ellipse cx="86" cy="73.5" rx="3.5" ry="1" fill="#000000" opacity="0.35" />
          {/* Ceramic Mug Body */}
          <rect x="83" y="67" width="5" height="5.5" rx="0.6" fill={isDark ? "#F8FAFC" : "#FFFFFF"} stroke="#CBD5E1" strokeWidth="0.4" />
          {/* Handle */}
          <path d="M 88 68 Q 90.5 69.5 88 71" stroke="#CBD5E1" strokeWidth="0.7" fill="none" />
          {/* Steaming hot tea/coffee surface */}
          <ellipse cx="85.5" cy="67" rx="2.2" ry="0.6" fill="#78350F" />
          {/* Subtle rising steam vapor */}
          <motion.path
            d="M 85 65 Q 84 62 86 59"
            stroke="#FEF08A"
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
            animate={{ y: [0, -2, 0], opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      )}

      {/* 4D. TRAILING ENGLISH IVY */}
      {sillItem === "hanging-ivy" && (
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          {/* Hanging planter ropes from top right */}
          <line x1="88" y1="0" x2="88" y2="12" stroke={isDark ? "#713F12" : "#A16207"} strokeWidth="0.5" />
          <line x1="92" y1="0" x2="92" y2="12" stroke={isDark ? "#713F12" : "#A16207"} strokeWidth="0.5" />
          {/* Ceramic pot bowl */}
          <path d="M 86 12 C 86 16, 94 16, 94 12 Z" fill="#D97706" />
          {/* Trailing cascading ivy leaves */}
          <path d="M 90 14 Q 88 22 91 30" stroke="#15803D" strokeWidth="0.7" fill="none" />
          <circle cx="89" cy="18" r="1.5" fill="#16A34A" />
          <circle cx="92" cy="22" r="1.4" fill="#22C55E" />
          <circle cx="89" cy="26" r="1.2" fill="#15803D" />
          <circle cx="91" cy="30" r="1.0" fill="#4ADE80" />
        </svg>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. DOUBLE-HUNG SASH MEETING RAIL & SASH LOCK
          Authentic architectural mullion division at upper third
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute top-[38%] inset-x-0 h-[2px] pointer-events-none z-10 flex items-center justify-center">
        {/* Subtle Horizontal Sash Divider Line */}
        <div
          className={`w-full h-[1.5px] transition-colors duration-500 ${
            isDark ? "bg-white/[0.18]" : "bg-[#4A3960]/30"
          }`}
        />
        {/* Center Antique Brass Cam-Action Sash Lock */}
        <div
          className="absolute w-2 h-1.5 rounded-[0.5px] flex items-center justify-center shadow-sm"
          style={{
            backgroundColor: isDark ? "#D97706" : "#B45309",
            border: "0.5px solid rgba(254, 240, 138, 0.6)",
          }}
        >
          <div className="w-0.5 h-0.5 rounded-full bg-[#FEF08A]" />
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. MULTI-STOP SPECULAR GLASS REFLECTIONS
          Subtle diagonal double-sheen giving true glass presence
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700"
        style={{
          background: `linear-gradient(${specularAngle}, rgba(255,255,255,${
            isDark ? "0.06" : "0.35"
          }) 0%, transparent 35%, rgba(255,255,255,${
            isDark ? "0.03" : "0.18"
          }) 55%, transparent 80%)`,
        }}
      />
    </div>
  );
}
