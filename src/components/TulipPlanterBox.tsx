import React from "react";

interface TulipPlanterBoxProps {
  windowInstanceId: string;
  isDark: boolean;
}

export function TulipPlanterBox({ windowInstanceId, isDark }: TulipPlanterBoxProps) {
  return (
    <div className="absolute bottom-[-2px] inset-x-0.5 sm:inset-x-1.5 z-25 flex flex-col items-center pointer-events-none">
      <svg
        viewBox="0 0 120 48"
        className="w-[96%] sm:w-[94%] h-7 sm:h-9 md:h-10 overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
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
        <ellipse cx="60" cy="46.5" rx="55" ry="2.2" fill="#000000" opacity={isDark ? 0.65 : 0.38} />
        {/* Direct Contact Ambient Occlusion Seam */}
        <ellipse cx="60" cy="44.8" rx="51" ry="1.2" fill="#000000" opacity={isDark ? 0.82 : 0.52} />

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
          <ellipse cx="0" cy="2" rx="4" ry="5.5" fill="#000000" opacity="0.25" />
          <path d="M -3 3 C -4.5 -1, -3 -6, 0 -6.5 C 3 -6, 4.5 -1, 3 3 Z" fill="#E11D48" />
          <path d="M -4.2 2 C -5 -2, -3.5 -6, -0.8 -6 C -0.5 -1, -2.5 3.5, -4.2 2 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
          <path d="M 4.2 2 C 5 -2, 3.5 -6, 0.8 -6 C 0.5 -1, 2.5 3.5, 4.2 2 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
          <path d="M -2.8 2.5 C -3.5 -1.5, -2 -6.2, 0 -6.8 C 2 -6.2, 3.5 -1.5, 2.8 2.5 C 2 4.2, -2 4.2, -2.8 2.5 Z" fill={`url(#fbTulipPink_${windowInstanceId})`} />
          <path d="M 0 -6.8 Q 1.5 -2.5 1.2 2" stroke="#FFFFFF" strokeWidth="0.4" fill="none" opacity="0.75" />
          <path d="M -1.2 3.2 C -1 4.5, 1 4.5, 1.2 3.2 Z" fill="#228555" />
        </g>

        {/* TULIP 2 (Left Center): Radiant Crimson Ruby Dutch Tulip (x=37, y=6) */}
        <g transform="translate(37, 6)">
          <ellipse cx="0" cy="2.5" rx="4.5" ry="6" fill="#000000" opacity="0.28" />
          <path d="M -3.5 3 C -5 -1, -3.5 -7, 0 -7.5 C 3.5 -7, 5 -1, 3.5 3 Z" fill="#881337" />
          <path d="M -4.8 2.5 C -5.8 -2, -4 -7, -1 -7 C -0.5 -1, -3 4, -4.8 2.5 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
          <path d="M 4.8 2.5 C 5.8 -2, 4 -7, 1 -7 C 0.5 -1, 3 4, 4.8 2.5 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
          <path d="M -3.2 2.8 C -4 -1.5, -2.2 -7.2, 0 -7.8 C 2.2 -7.2, 4 -1.5, 3.2 2.8 C 2.2 4.8, -2.2 4.8, -3.2 2.8 Z" fill={`url(#fbTulipRuby_${windowInstanceId})`} />
          <path d="M -0.2 -7.8 Q 1.5 -2.5 1.2 2.5" stroke="#FECDD3" strokeWidth="0.45" fill="none" opacity="0.8" />
          <path d="M -0.2 -7.8 Q -1.8 -3 -1.5 2.2" stroke="#FDA4AF" strokeWidth="0.35" fill="none" opacity="0.5" />
          <path d="M -1.3 3.8 C -1 5, 1 5, 1.3 3.8 Z" fill="#1D6F47" />
        </g>

        {/* TULIP 3 (Center Majestic): Golden Sunset Yellow Tulip (x=50, y=5) */}
        <g transform="translate(50, 5)">
          <ellipse cx="0" cy="2.5" rx="4.8" ry="6.5" fill="#000000" opacity="0.3" />
          <path d="M -3.8 3 C -5.2 -1.5, -3.8 -7.5, 0 -8.2 C 3.8 -7.5, 5.2 -1.5, 3.8 3 Z" fill="#B45309" />
          <path d="M -5 2.5 C -6 -2, -4.2 -7.5, -1 -7.5 C -0.5 -1, -3 4.2, -5 2.5 Z" fill={`url(#fbTulipYellow_${windowInstanceId})`} />
          <path d="M 5 2.5 C 6 -2, 4.2 -7.5, 1 -7.5 C 0.5 -1, 3 4.2, 5 2.5 Z" fill={`url(#fbTulipYellow_${windowInstanceId})`} />
          <path d="M -3.4 3 C -4.2 -1.8, -2.4 -7.8, 0 -8.5 C 2.4 -7.8, 4.2 -1.8, 3.4 3 C 2.4 5, -2.4 5, -3.4 3 Z" fill={`url(#fbTulipYellow_${windowInstanceId})`} />
          <path d="M 0 -8.5 Q 1.8 -3 1.4 2.8" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.9" />
          <path d="M 0 -8.5 Q -1.6 -3.5 -1.2 2.2" stroke="#FEF08A" strokeWidth="0.35" fill="none" opacity="0.6" />
          <path d="M -1.4 4 C -1 5.2, 1 5.2, 1.4 4 Z" fill="#1D6F47" />
        </g>

        {/* TULIP 4 (Center Right): Imperial Royal Purple Tulip (x=65, y=7) */}
        <g transform="translate(65, 7)">
          <ellipse cx="0" cy="2.2" rx="4.5" ry="6" fill="#000000" opacity="0.28" />
          <path d="M -3.5 3 C -5 -1, -3.5 -6.8, 0 -7.2 C 3.5 -6.8, 5 -1, 3.5 3 Z" fill="#3B0764" />
          <path d="M -4.6 2.2 C -5.5 -2, -3.8 -6.8, -0.8 -6.8 C -0.5 -1, -2.8 3.8, -4.6 2.2 Z" fill={`url(#fbTulipPurple_${windowInstanceId})`} />
          <path d="M 4.6 2.2 C 5.5 -2, 3.8 -6.8, 0.8 -6.8 C 0.5 -1, 2.8 3.8, 4.6 2.2 Z" fill={`url(#fbTulipPurple_${windowInstanceId})`} />
          <path d="M -3 2.6 C -3.8 -1.5, -2.2 -6.8, 0 -7.5 C 2.2 -6.8, 3.8 -1.5, 3 2.6 C 2 4.5, -2 4.5, -3 2.6 Z" fill={`url(#fbTulipPurple_${windowInstanceId})`} />
          <path d="M 0 -7.5 Q 1.5 -2.5 1.2 2.2" stroke="#F3E8FF" strokeWidth="0.45" fill="none" opacity="0.85" />
          <path d="M -1.3 3.6 C -1 4.8, 1 4.8, 1.3 3.6 Z" fill="#174A2E" />
        </g>

        {/* TULIP 5 (Right Center): Pure White / Ivory Silk Tulip with green throat (x=79, y=6) */}
        <g transform="translate(79, 6)">
          <ellipse cx="0" cy="2.5" rx="4.5" ry="6" fill="#000000" opacity="0.25" />
          <path d="M -3.5 3 C -5 -1, -3.5 -7, 0 -7.5 C 3.5 -7, 5 -1, 3.5 3 Z" fill="#94A3B8" />
          <path d="M -4.8 2.2 C -5.8 -2, -4 -7, -1 -7 C -0.5 -1, -3 4, -4.8 2.2 Z" fill={`url(#fbTulipWhite_${windowInstanceId})`} />
          <path d="M 4.8 2.2 C 5.8 -2, 4 -7, 1 -7 C 0.5 -1, 3 4, 4.8 2.2 Z" fill={`url(#fbTulipWhite_${windowInstanceId})`} />
          <path d="M -3.2 2.6 C -4 -1.5, -2.2 -7.2, 0 -7.8 C 2.2 -7.2, 4 -1.5, 3.2 2.6 C 2.2 4.6, -2.2 4.6, -3.2 2.6 Z" fill={`url(#fbTulipWhite_${windowInstanceId})`} />
          <path d="M 0 -7.8 Q 1.5 -2.5 1.2 2.2" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.95" />
          <path d="M -1.8 1.5 C -1 3, 1 3, 1.8 1.5 C 1 0.5, -1 0.5, -1.8 1.5 Z" fill="#86EFAC" opacity="0.6" />
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
        {/* Rich Fertile Loam Soil Bed */}
        <ellipse cx="60" cy="26.8" rx="50" ry="2.6" fill={`url(#fbSoilGrad_${windowInstanceId})`} />
        <ellipse cx="40" cy="26.8" rx="6" ry="1.2" fill="#0A0604" opacity="0.7" />
        <ellipse cx="80" cy="26.8" rx="7" ry="1.1" fill="#0A0604" opacity="0.7" />

        {/* Main Planter Box Body */}
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
        <line
          x1="9"
          y1="25.5"
          x2="111"
          y2="25.5"
          stroke={isDark ? "#AF6B48" : "#E29A72"}
          strokeWidth="0.55"
          opacity="0.8"
        />
        <line
          x1="10"
          y1="29.1"
          x2="110"
          y2="29.1"
          stroke={isDark ? "#120803" : "#2E1509"}
          strokeWidth="0.8"
          opacity="0.9"
        />

        {/* Recessed Panel Relief */}
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

        {/* Hand-Chiseled Horizontal Terracotta Seam Line */}
        <line
          x1="16"
          y1="35.8"
          x2="104"
          y2="35.8"
          stroke={isDark ? "#2A140A" : "#542D18"}
          strokeWidth="0.45"
          opacity="0.65"
        />

        {/* Center Rosette / Seal Motif on Trough Panel */}
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
        <rect x="13.2" y="28.5" width="2.8" height="13.8" rx="0.3" fill={`url(#fbIronGrad_${windowInstanceId})`} />
        <circle cx="14.6" cy="30.5" r="0.6" fill="#94A3B8" />
        <circle cx="14.6" cy="40.5" r="0.6" fill="#94A3B8" />
        <rect x="104" y="28.5" width="2.8" height="13.8" rx="0.3" fill={`url(#fbIronGrad_${windowInstanceId})`} />
        <circle cx="105.4" cy="30.5" r="0.6" fill="#94A3B8" />
        <circle cx="105.4" cy="40.5" r="0.6" fill="#94A3B8" />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            G. ORGANIC ENGLISH IVY CASCADE (TUMBLES OVER FRONT RIM)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g>
          <path d="M 23 26 C 24 30, 20.5 35, 22.5 43" stroke="#174A2E" strokeWidth="0.75" fill="none" strokeLinecap="round" />
          <path d="M 23 29 C 26 27, 28 31, 25 33 C 23.5 33, 22.5 31, 23 29 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
          <path d="M 24 29.5 Q 26 31 25.5 32" stroke="#A7F3D0" strokeWidth="0.3" fill="none" opacity="0.75" />
          <path d="M 21 34 C 17.5 33, 18.5 38, 21.5 38 C 22.5 37, 22.5 35, 21 34 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
          <path d="M 22.5 42 C 25 41, 26 44.5, 23.5 45.5 C 22 45, 21.8 43, 22.5 42 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
        </g>
        <g>
          <path d="M 44 26 C 45 29, 43 32, 45 36" stroke="#174A2E" strokeWidth="0.7" fill="none" strokeLinecap="round" />
          <path d="M 44 30 C 47 28.5, 48 32.5, 45.5 33.5 C 44 33, 43.5 31.5, 44 30 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
          <path d="M 45 35 C 47.5 34, 48 37.5, 45.8 38 C 44.5 37.5, 44.2 36, 45 35 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
        </g>
        <g>
          <path d="M 73 26 C 74.5 31, 71 36, 74 44" stroke="#174A2E" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <path d="M 74 31 C 77 29, 79 33.5, 76 35.5 C 74 35.5, 73 33.5, 74 31 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
          <path d="M 75 32 Q 77 33.5 76.5 34.5" stroke="#A7F3D0" strokeWidth="0.3" fill="none" opacity="0.75" />
          <path d="M 72 37 C 68 36, 69.5 41, 72.5 41 C 73.5 40, 73.5 38, 72 37 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
          <path d="M 74 43 C 77 42, 78 46, 75 46.8 C 73 46, 73 44, 74 43 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
        </g>
        <g>
          <path d="M 95 26 C 97 30, 93.5 34, 96 41" stroke="#174A2E" strokeWidth="0.75" fill="none" strokeLinecap="round" />
          <path d="M 96 30 C 99 28.5, 101 32.5, 98 34.5 C 96 34.5, 95 32.5, 96 30 Z" fill={`url(#fbOlive_${windowInstanceId})`} />
          <path d="M 94.5 36 C 91.5 35, 92.5 39.5, 95.5 39.5 C 96.5 38.5, 96.5 37, 94.5 36 Z" fill={`url(#fbFoliageBright_${windowInstanceId})`} />
        </g>
      </svg>
    </div>
  );
}
