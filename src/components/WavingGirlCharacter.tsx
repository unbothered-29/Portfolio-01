import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface WavingGirlCharacterProps {
  isDark: boolean;
  className?: string;
}

export function WavingGirlCharacter({ isDark, className = "" }: WavingGirlCharacterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div
      className={`relative flex flex-col items-center select-none cursor-pointer group ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setHasInteracted(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setHasInteracted((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label="Jessica standing gracefully on the sidewalk smiling and waving"
    >
      {/* 
        SPEECH BUBBLE / GREETING TOOLTIP
        Floating above her head, animated on hover or tap
      */}
      <AnimatePresence>
        {(isHovered || !hasInteracted) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 px-3.5 py-1.5 rounded-full border shadow-2xl backdrop-blur-md pointer-events-none transition-colors duration-500 ${
              isDark
                ? "bg-[#181426]/95 border-amber-400/50 text-[#FEF3C7] shadow-[0_6px_25px_rgba(0,0,0,0.85),_0_0_20px_rgba(251,191,36,0.3)]"
                : "bg-white/95 border-[#C4B5FD] text-[#34154E] shadow-[0_6px_25px_rgba(52,21,78,0.18)]"
            }`}
          >
            <div className="flex items-center gap-2 font-sora text-[11px] sm:text-[12px] font-semibold tracking-wide">
              <span className="animate-waving-hand inline-block text-sm">👋</span>
              <span>Hi, I&apos;m Jessica! Welcome to my world!</span>
            </div>
            {/* Speech bubble beak */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 transition-colors duration-500 ${
                isDark ? "border-t-amber-400/50" : "border-t-[#C4B5FD]"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        REALISTIC ILLUSTRATED CHARACTER
        - Natural contrapposto stance (weight shifted on left leg)
        - Rich multi-tone shading, realistic facial anatomy with eyes, eyelashes, lips, nose
        - Dimensional layered brunette hair with glossy specular highlights
        - Tailored wool trench coat with collar lapels, fabric belt knot, stitching & pocket flaps
        - Cozy knitted cream turtleneck scarf
        - Slim tailored dark trousers with natural cloth folds
        - Polished Chelsea leather boots with stacked heels & elastic gore
        - Articulated waving hand with natural fingers & gold bracelet
        - Directional ambient street light glow
      */}
      <svg
        viewBox="0 0 140 240"
        className="w-20 sm:w-24 md:w-28 h-auto filter drop-shadow-md overflow-visible transition-transform duration-300 group-hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Natural Skin Tones: Base, highlights & subsurface warmth */}
          <linearGradient id="realSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE3CE" />
            <stop offset="45%" stopColor="#F9CFB2" />
            <stop offset="85%" stopColor="#EAB592" />
            <stop offset="100%" stopColor="#DD9F78" />
          </linearGradient>

          <linearGradient id="realSkinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2A682" />
            <stop offset="100%" stopColor="#C98661" />
          </linearGradient>

          {/* Hair: Dark espresso with rich mocha highlights */}
          <linearGradient id="realHair" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#35201B" />
            <stop offset="35%" stopColor="#1E110E" />
            <stop offset="70%" stopColor="#2A1713" />
            <stop offset="100%" stopColor="#150B09" />
          </linearGradient>

          <linearGradient id="realHairShine" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#4A2F27" />
            <stop offset="50%" stopColor="#6E483D" />
            <stop offset="100%" stopColor="#3A221C" />
          </linearGradient>

          {/* Trench Coat: Camel / Chestnut Wool with rich lighting */}
          <linearGradient id="realCoat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#A06B42" : "#B78155"} />
            <stop offset="40%" stopColor={isDark ? "#82502B" : "#9E673D"} />
            <stop offset="80%" stopColor={isDark ? "#61381A" : "#7E4E29"} />
            <stop offset="100%" stopColor={isDark ? "#482610" : "#63391A"} />
          </linearGradient>

          {/* Coat Lapel / Inner Fold */}
          <linearGradient id="realCoatDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#704120" : "#8A542D"} />
            <stop offset="100%" stopColor={isDark ? "#43210C" : "#553016"} />
          </linearGradient>

          {/* Scarf / Knit Sweater */}
          <linearGradient id="realScarf" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#F5EFE6" : "#FFFFFF"} />
            <stop offset="50%" stopColor={isDark ? "#E6DACB" : "#F3EDE4"} />
            <stop offset="100%" stopColor={isDark ? "#CDBEB0" : "#DDD1C4"} />
          </linearGradient>

          {/* Trousers: Charcoal navy with leg crease contour */}
          <linearGradient id="realPants" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? "#171F2C" : "#2D3748"} />
            <stop offset="50%" stopColor={isDark ? "#242F42" : "#3F4D63"} />
            <stop offset="100%" stopColor={isDark ? "#111722" : "#222B38"} />
          </linearGradient>

          {/* Boots: Polished calfskin leather */}
          <linearGradient id="realBoots" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#282330" : "#3C3247"} />
            <stop offset="50%" stopColor={isDark ? "#16131D" : "#261E30"} />
            <stop offset="100%" stopColor={isDark ? "#0A080E" : "#140F1A"} />
          </linearGradient>

          {/* Leather Crossbody Bag */}
          <linearGradient id="realBag" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#48281B" : "#5E3725"} />
            <stop offset="60%" stopColor={isDark ? "#301A11" : "#422316"} />
            <stop offset="100%" stopColor={isDark ? "#1C0D07" : "#2A140B"} />
          </linearGradient>

          {/* Street light warm rim glow for dark mode */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 
          1. REALISTIC DUAL-LAYER GROUND SHADOW 
          Direct contact shadow + diffuse ambient occlusion on pavement
        */}
        <g id="ground-shadows">
          {/* Diffuse directional shadow */}
          <ellipse
            cx="66"
            cy="234"
            rx="32"
            ry="4.5"
            fill={isDark ? "rgba(0,0,0,0.65)" : "rgba(52,21,78,0.18)"}
            className="transition-colors duration-700"
          />
          {/* Tight contact shadow directly under boots */}
          <ellipse
            cx="54"
            cy="233"
            rx="11"
            ry="2.2"
            fill={isDark ? "rgba(0,0,0,0.9)" : "rgba(35,12,55,0.4)"}
          />
          <ellipse
            cx="78"
            cy="232.5"
            rx="10"
            ry="2.2"
            fill={isDark ? "rgba(0,0,0,0.9)" : "rgba(35,12,55,0.4)"}
          />
        </g>

        {/* 
          2. LEGS & TAILORED TROUSERS (Natural relaxed stance)
          Left leg bearing primary weight; right leg slightly relaxed
        */}
        <g id="legs-and-pants">
          {/* Left Leg (Straight, weight-bearing) */}
          <path
            d="M 50 148 
               L 48 185 
               C 47 198 46 215 47 225 
               L 59 225 
               C 59 215 60 198 60 185 
               L 62 148 Z"
            fill="url(#realPants)"
          />
          {/* Left leg vertical pressed crease highlight */}
          <path
            d="M 54 152 L 53 222"
            stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.22)"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Right Leg (Slightly relaxed, turned outward) */}
          <path
            d="M 64 148 
               L 68 185 
               C 70 198 73 214 74 225 
               L 86 224 
               C 84 214 80 198 77 185 
               L 74 148 Z"
            fill="url(#realPants)"
          />
          {/* Right leg crease highlight */}
          <path
            d="M 72 153 L 80 221"
            stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.22)"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Subtle knee fold shadow */}
          <path
            d="M 48 186 C 53 189 57 189 60 186"
            stroke={isDark ? "#0A0D14" : "#171D26"}
            strokeWidth="0.9"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 69 187 C 73 190 77 190 79 187"
            stroke={isDark ? "#0A0D14" : "#171D26"}
            strokeWidth="0.9"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* 
          3. REALISTIC CHELSEA ANKLE BOOTS
          Polished leather, stacked block heel, elastic side gusset, welt stitching
        */}
        <g id="boots">
          {/* Left Boot */}
          <g id="left-boot">
            {/* Boot Shaft & Vamp */}
            <path
              d="M 46 222 
                 L 46 230 
                 C 46 232 47 233 49 233.5 
                 L 61 233.5 
                 C 63 233.5 64 231.5 63 229 
                 L 60 222 Z"
              fill="url(#realBoots)"
            />
            {/* Elastic triangular side gusset */}
            <polygon
              points="51,222 55,228 54,222"
              fill={isDark ? "#0D0A12" : "#181320"}
              opacity="0.9"
            />
            {/* Leather shine specular curve */}
            <path
              d="M 48 226 C 52 230 58 230 60 227"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
            />
            {/* Stacked leather heel & rubber tread sole */}
            <rect
              x="45.5"
              y="231.5"
              width="6.5"
              height="2.5"
              rx="0.5"
              fill={isDark ? "#08060B" : "#100B17"}
            />
            <path
              d="M 45 233 L 62 233"
              stroke={isDark ? "#382F45" : "#4A3E5C"}
              strokeWidth="0.8"
            />
          </g>

          {/* Right Boot (Angled slightly right) */}
          <g id="right-boot">
            <path
              d="M 73 221 
                 L 74 229.5 
                 C 74 231.5 75.5 233 78 233 
                 L 89 233 
                 C 91 233 91.5 231 90.5 228.5 
                 L 87 221 Z"
              fill="url(#realBoots)"
            />
            {/* Elastic side gusset */}
            <polygon
              points="78,221 82,227 81,221"
              fill={isDark ? "#0D0A12" : "#181320"}
              opacity="0.9"
            />
            <path
              d="M 76 226 C 80 230 85 230 88 227"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
            />
            <rect
              x="73.5"
              y="231"
              width="6.5"
              height="2.5"
              rx="0.5"
              fill={isDark ? "#08060B" : "#100B17"}
            />
            <path
              d="M 73 232.5 L 90 232.5"
              stroke={isDark ? "#382F45" : "#4A3E5C"}
              strokeWidth="0.8"
            />
          </g>
        </g>

        {/* 
          4. BACK HAIR FLOW
          Layered rich brown locks falling gracefully behind shoulders
        */}
        <g id="hair-back">
          <path
            d="M 46 44 
               C 38 60 36 82 40 98 
               C 44 94 48 84 49 76 
               C 50 64 49 52 46 44 Z"
            fill="url(#realHair)"
          />
          <path
            d="M 82 44 
               C 90 60 92 82 88 98 
               C 84 94 80 84 79 76 
               C 78 64 79 52 82 44 Z"
            fill="url(#realHair)"
          />
          {/* Hair shine highlights */}
          <path
            d="M 40 68 C 39 80 41 90 42 94"
            stroke="url(#realHairShine)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 88 68 C 89 80 87 90 86 94"
            stroke="url(#realHairShine)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* 
          5. TORSO & TAILORED WOOL TRENCH COAT
          - Elegant tailored silhouette, belted waist knot, lapels, buttons, pocket flaps
        */}
        <g id="torso-and-coat">
          {/* Inner Knit Turtleneck Sweater */}
          <path
            d="M 54 58 L 74 58 L 76 96 L 52 96 Z"
            fill="url(#realScarf)"
          />
          {/* Knit ribbing fine lines */}
          <path
            d="M 58 64 L 58 76 M 64 64 L 64 76 M 70 64 L 70 76"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="0.6"
          />

          {/* Main Trench Coat Body */}
          <path
            d="M 44 65 
               C 54 62 74 62 84 65 
               L 92 148 
               C 78 152 50 152 36 148 
               L 44 65 Z"
            fill="url(#realCoat)"
          />

          {/* Left Lapel (Dramatic tailored collar) */}
          <path
            d="M 47 65 
               L 57 95 
               L 63 65 
               L 55 64 Z"
            fill="url(#realCoatDark)"
          />
          {/* Lapel Pick Stitching */}
          <path
            d="M 49 67 L 57 93 L 62 67"
            stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.18)"}
            strokeWidth="0.6"
            strokeDasharray="1.2,1.2"
            fill="none"
          />

          {/* Right Lapel */}
          <path
            d="M 81 65 
               L 71 95 
               L 65 65 
               L 73 64 Z"
            fill="url(#realCoatDark)"
          />
          <path
            d="M 79 67 L 71 93 L 66 67"
            stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.18)"}
            strokeWidth="0.6"
            strokeDasharray="1.2,1.2"
            fill="none"
          />

          {/* Horn / Tortoise Buttons */}
          <circle cx="68" cy="80" r="1.8" fill="#2E1C12" stroke="#8A542D" strokeWidth="0.5" />
          <circle cx="67" cy="94" r="1.8" fill="#2E1C12" stroke="#8A542D" strokeWidth="0.5" />

          {/* Waist Fabric Belt with Knot & Draped Ends */}
          <g id="coat-belt">
            {/* Belt strap */}
            <path
              d="M 41 103 C 55 101 73 101 87 103 L 86 109 C 72 107 56 107 42 109 Z"
              fill={isDark ? "#522D13" : "#6E401E"}
            />
            {/* Belt buckle / fabric knot */}
            <ellipse
              cx="63"
              cy="106"
              rx="4.5"
              ry="3.5"
              fill={isDark ? "#3D1F0B" : "#552F15"}
            />
            <rect
              x="60"
              y="103.5"
              width="6"
              height="5"
              rx="1"
              fill="none"
              stroke="#D97706"
              strokeWidth="0.9"
            />
            {/* Draped belt tie ends */}
            <path
              d="M 61 108 C 60 116 59 126 58 132 L 62 133 C 63 126 64 116 64 108 Z"
              fill={isDark ? "#48260F" : "#613719"}
            />
            <path
              d="M 64 108 C 65 114 66 122 66 127 L 69 127 C 69 121 68 114 67 108 Z"
              fill={isDark ? "#3E1E09" : "#552F15"}
            />
          </g>

          {/* Left Pocket Welt Flap */}
          <path
            d="M 44 118 L 52 119 L 51 123 L 43 122 Z"
            fill={isDark ? "#48260F" : "#63391A"}
          />
          {/* Right Pocket Welt Flap */}
          <path
            d="M 76 119 L 84 118 L 85 122 L 77 123 Z"
            fill={isDark ? "#48260F" : "#63391A"}
          />

          {/* 
            CHIC LEATHER CROSSBODY SADDLE BAG
            Slung naturally from right shoulder down to left hip
          */}
          <g id="crossbody-bag">
            {/* Leather strap */}
            <path
              d="M 76 66 L 40 122 L 43 124 L 79 68 Z"
              fill={isDark ? "#1C0D07" : "#2E180E"}
            />
            {/* Brass strap buckle */}
            <rect
              x="62"
              y="88"
              width="3.5"
              height="4.5"
              rx="0.6"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="0.8"
              transform="rotate(-52, 63.5, 90)"
            />
            {/* Saddle Bag Body at Left Hip */}
            <path
              d="M 33 120 
                 L 43 120 
                 C 44 126 44 135 38 137 
                 C 32 135 32 126 33 120 Z"
              fill="url(#realBag)"
              stroke={isDark ? "#120804" : "#200E07"}
              strokeWidth="0.8"
            />
            {/* Bag flap contour */}
            <path
              d="M 33 120 C 38 128 43 123 43 120"
              fill="none"
              stroke={isDark ? "#5C341F" : "#7C472E"}
              strokeWidth="0.7"
            />
            {/* Gold metal lock clasp */}
            <circle cx="38" cy="128" r="1.2" fill="#FBBF24" />
          </g>

          {/* 
            LEFT ARM (Relaxed at side, gently touching bag strap / coat pocket)
          */}
          <g id="left-arm">
            {/* Coat Sleeve */}
            <path
              d="M 43 68 
                 C 36 82 34 104 36 122 
                 L 41 122 
                 C 40 106 42 86 48 72 Z"
              fill="url(#realCoat)"
            />
            {/* Sleeve cuff band */}
            <path
              d="M 36 118 L 41 118"
              stroke={isDark ? "#48260F" : "#63391A"}
              strokeWidth="1.2"
            />
            {/* Left Hand / Gracefully resting near coat pocket */}
            <path
              d="M 36.5 120 
                 C 35 124 35.5 129 37.5 133 
                 C 38.5 134 40.5 133 40.5 131 
                 C 40.5 128 41.5 124 41 120 Z"
              fill="url(#realSkin)"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.4"
            />
            {/* Relaxed finger separations */}
            <path
              d="M 37.5 127 C 38 129 38 132 38.5 133"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />
            <path
              d="M 39 126 C 39.5 128 39.5 131 40 132"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* 
          6. HEAD, EXPRESSIVE FACE & STYLED HAIR
          - Realistic anatomical proportions, warm smile, almond eyes with pupils & catchlights
        */}
        <g id="head-and-face">
          {/* Slender Neck */}
          <path
            d="M 59 48 L 69 48 L 71 62 L 57 62 Z"
            fill="url(#realSkin)"
          />
          {/* Soft shadow under chin */}
          <path
            d="M 59 48 C 64 53 66 53 69 48 L 70 52 C 66 55 62 55 58 52 Z"
            fill="url(#realSkinShadow)"
            opacity="0.85"
          />

          {/* Head & Jaw Contour (Soft oval, feminine taper) */}
          <path
            d="M 52 36 
               C 52 23 76 23 76 36 
               C 76 45 72 52 64 52 
               C 56 52 52 45 52 36 Z"
            fill="url(#realSkin)"
          />

          {/* Rosy Cheek Blush (Soft atmospheric warmth) */}
          <circle cx="56.5" cy="40.5" r="3.2" fill="#FB7185" opacity={isDark ? "0.28" : "0.35"} />
          <circle cx="71.5" cy="40.5" r="3.2" fill="#FB7185" opacity={isDark ? "0.28" : "0.35"} />

          {/* 
            REALISTIC EYES: Almond shape, iris, pupils & dual catchlights
          */}
          {/* Left Eye */}
          <g id="left-eye">
            {/* White of eye */}
            <path
              d="M 55 35 Q 58.5 32 62 35 Q 58.5 37 55 35 Z"
              fill="#FFFFFF"
            />
            {/* Warm Hazel-Brown Iris */}
            <circle cx="58.5" cy="34.8" r="1.8" fill="#452718" />
            <circle cx="58.5" cy="34.8" r="1.1" fill="#1C0E07" />
            {/* Specular Catchlight */}
            <circle cx="59.1" cy="34.2" r="0.5" fill="#FFFFFF" />
            <circle cx="58" cy="35.3" r="0.25" fill="#FFFFFF" />
            {/* Upper Lash Line with subtle corner wing */}
            <path
              d="M 54.5 35 Q 58.5 31.8 62.5 34.5"
              stroke="#1C100E"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Right Eye */}
          <g id="right-eye">
            <path
              d="M 66 35 Q 69.5 32 73 35 Q 69.5 37 66 35 Z"
              fill="#FFFFFF"
            />
            <circle cx="69.5" cy="34.8" r="1.8" fill="#452718" />
            <circle cx="69.5" cy="34.8" r="1.1" fill="#1C0E07" />
            <circle cx="70.1" cy="34.2" r="0.5" fill="#FFFFFF" />
            <circle cx="69" cy="35.3" r="0.25" fill="#FFFFFF" />
            <path
              d="M 65.5 34.5 Q 69.5 31.8 73.5 35"
              stroke="#1C100E"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Soft Arched Eyebrows */}
          <path
            d="M 54 31.5 Q 58 29.8 62 31.2"
            stroke="#2E1B16"
            strokeWidth="0.85"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 66 31.2 Q 70 29.8 74 31.5"
            stroke="#2E1B16"
            strokeWidth="0.85"
            fill="none"
            strokeLinecap="round"
          />

          {/* Delicate Sculpted Nose with Tip Highlight */}
          <path
            d="M 64 33 L 63.8 39 Q 64.8 40.5 65.5 39"
            stroke="url(#realSkinShadow)"
            strokeWidth="0.75"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="64" cy="38.5" r="0.4" fill="rgba(255,255,255,0.4)" />

          {/* 
            REALISTIC RADIANT SMILE
            Upper lip with cupid's bow, subtle white teeth, plump lower lip
          */}
          <g id="smile">
            {/* Smile shadow */}
            <path
              d="M 59 43.5 Q 64 48 69 43.5"
              stroke="#831843"
              strokeWidth="0.8"
              fill="#BE185D"
              opacity="0.3"
            />
            {/* Visible smile opening with subtle teeth highlight */}
            <path
              d="M 60 43.2 Q 64 47 68 43.2 Q 64 44.5 60 43.2 Z"
              fill="#FFFFFF"
            />
            {/* Rosy Upper Lip */}
            <path
              d="M 59.5 43 Q 61.8 42.2 64 42.6 Q 66.2 42.2 68.5 43"
              stroke="#9D174D"
              strokeWidth="0.75"
              fill="none"
              strokeLinecap="round"
            />
            {/* Lower Lip fullness highlight */}
            <path
              d="M 61 45.2 Q 64 46.8 67 45.2"
              stroke="#F472B6"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Delicate Gold Hoop Earring on Left Ear */}
          <circle
            cx="52"
            cy="39"
            r="1.4"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="0.6"
          />

          {/* 
            FRONT HAIR & SOFT WAVES
            Rich glossy volume, side-swept bangs, textured individual strand highlights
          */}
          <g id="hair-front">
            {/* Top crown hair volume */}
            <path
              d="M 50 35 
                 C 50 20 78 20 78 35 
                 C 78 26 72 23 64 23 
                 C 56 23 50 27 50 35 Z"
              fill="url(#realHair)"
            />
            {/* Side-swept front bang swooping across forehead */}
            <path
              d="M 51 28 
                 C 58 26 68 28 72 34 
                 C 66 31 58 31 52 35 Z"
              fill="#261511"
            />
            {/* Soft wave strands framing cheeks */}
            <path
              d="M 50 32 C 48 40 49 48 51 54 C 52 48 51 40 52 34 Z"
              fill="url(#realHair)"
            />
            <path
              d="M 77 32 C 79 40 78 48 76 54 C 75 48 76 40 75 34 Z"
              fill="url(#realHair)"
            />
            {/* Specular ribbon shine across hair crown */}
            <path
              d="M 54 26 C 60 24 68 24 74 27"
              stroke="url(#realHairShine)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </g>
        </g>

        {/* 
          7. RIGHT ARM & ARTICULATED WAVING HAND
          - Upper arm raised gracefully outward
          - Forearm anchored firmly with tailored trench coat sleeve and knit cuff
          - Waving hand animated smoothly at the wrist joint with motion.g
          - Sculpted anatomical fingers, palm contours, manicured nails & polished gold jewelry
        */}
        <g id="waving-arm-assembly">
          {/* Upper Arm & Shoulder Sleeve */}
          <path
            d="M 83 67 
               C 89 66 98 62 105 53 
               L 110 58 
               C 102 68 94 74 85 72 Z"
            fill="url(#realCoat)"
          />
          {/* Shoulder seam stitch line */}
          <path
            d="M 83 67 C 85 70 85 71 85 72"
            stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.18)"}
            strokeWidth="0.6"
            strokeDasharray="1,1"
          />

          {/* Forearm Coat Sleeve (Anchored firmly to upper arm elbow) */}
          <path
            d="M 104 54 
               C 107 46 109 38 111 31 
               L 117 33 
               C 115 42 113 50 110 59 Z"
            fill="url(#realCoat)"
          />
          {/* Trench sleeve fabric crease */}
          <path
            d="M 106 50 C 109 49 112 51 113 54"
            stroke={isDark ? "#48260F" : "#63391A"}
            strokeWidth="0.8"
            fill="none"
          />
          {/* Tailored sleeve cuff band */}
          <path
            d="M 110.5 32 L 117 34"
            stroke={isDark ? "#48260F" : "#63391A"}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Inner cozy knit sweater cuff peeking out */}
          <path
            d="M 111 31 L 116.5 32.8 L 116.8 30.8 L 111.3 29 Z"
            fill="url(#realScarf)"
          />
          {/* Delicate Polished Gold Bangle Bracelet */}
          <path
            d="M 111.2 28.5 L 116.8 30.2"
            stroke="#F59E0B"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Small gold charm on bracelet */}
          <circle cx="114" cy="30.2" r="0.8" fill="#FBBF24" />

          {/* 
            ARTICULATED WAVING HAND & SCULPTED FINGERS
            Pivoting naturally at the wrist joint (113px, 28px) via motion.g
          */}
          <motion.g
            animate={{
              rotate: isHovered ? [-13, 14, -13] : [-8, 9, -8],
            }}
            transition={{
              duration: isHovered ? 1.0 : 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "113px 28px",
            }}
          >
            {/* Wrist contact area */}
            <path
              d="M 111.5 28 C 111.5 25 116 25 116 28 Z"
              fill="url(#realSkin)"
            />

            {/* Seamless, Anatomically Sculpted Palm & Fingers */}
            <path
              d="M 111.5 27 
                 C 109 25 106.5 22.5 106 19.5 
                 C 105.5 17.5 107.5 17 108.8 18.5 
                 C 109.8 19.8 111 21.5 111.5 21 
                 L 112 11.5 
                 C 112 10 113.8 10 114 11.5 
                 L 114.2 18.5 
                 L 114.6 9.8 
                 C 114.7 8.3 116.5 8.3 116.7 9.8 
                 L 116.8 18.5 
                 L 117.2 11 
                 C 117.3 9.6 119 9.6 119.2 11 
                 L 119.2 19 
                 L 119.8 13.5 
                 C 120 12.3 121.6 12.5 121.6 13.8 
                 C 121.5 17 121 21 119.5 24 
                 C 118 26.5 116.5 27.5 115.5 27 Z"
              fill="url(#realSkin)"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.4"
            />

            {/* Palm Crease Lines & Natural Anatomy */}
            <path
              d="M 110.8 22 C 112.5 23.5 114 24.5 114.5 26"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.55"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Finger separation shadow crevices */}
            <line
              x1="114"
              y1="13"
              x2="114"
              y2="19.5"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />
            <line
              x1="116.7"
              y1="12"
              x2="116.7"
              y2="19.5"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />
            <line
              x1="119.2"
              y1="13.5"
              x2="119.2"
              y2="20"
              stroke="url(#realSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />

            {/* Subtle Rosy Finger & Palm Warmth */}
            <circle cx="107.5" cy="18.5" r="1.1" fill="#FB7185" opacity="0.3" />
            <circle cx="113" cy="11" r="1.1" fill="#FB7185" opacity="0.3" />
            <circle cx="115.6" cy="9.5" r="1.1" fill="#FB7185" opacity="0.3" />
            <circle cx="118.2" cy="10.8" r="1.1" fill="#FB7185" opacity="0.3" />
            <circle cx="120.7" cy="13.5" r="0.9" fill="#FB7185" opacity="0.3" />

            {/* Delicate Manicured Fingernail Glints */}
            <path
              d="M 112.4 11.2 Q 113 10.6 113.6 11.2"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M 115 9.7 Q 115.6 9.1 116.2 9.7"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M 117.6 11 Q 118.2 10.4 118.8 11"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Chic Minimalist Gold Ring on Middle Finger */}
            <path
              d="M 114.5 15.2 L 116.7 15.2"
              stroke="#F59E0B"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
