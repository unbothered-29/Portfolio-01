import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface WavingGirlCharacterProps {
  isDark: boolean;
  className?: string;
}

export function WavingGirlCharacter({ isDark, className = "" }: WavingGirlCharacterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Natural periodic blinking (every 3.6 to 4.8 seconds for 180ms)
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    let unblinkTimer: NodeJS.Timeout;

    const scheduleNextBlink = () => {
      const delay = 3400 + Math.random() * 1800;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        unblinkTimer = setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 180);
      }, delay);
    };

    scheduleNextBlink();
    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(unblinkTimer);
    };
  }, []);

  // Subtle cursor interaction: calculate relative angle toward mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.25; // Focus around eye/head level

    const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.4);
    const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.4);

    // Clamp to very subtle micro-movements to never distort or break silhouette
    const clampedX = Math.max(-1, Math.min(1, deltaX));
    const clampedY = Math.max(-1, Math.min(1, deltaY));

    setMouseOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Micro adjustments based on cursor
  const headTilt = mouseOffset.x * 2.2; // Max 2.2 deg tilt
  const headShiftX = mouseOffset.x * 1.0; // Max 1.0px shift
  const headShiftY = mouseOffset.y * 0.6; // Max 0.6px shift
  const pupilShiftX = mouseOffset.x * 0.75; // Max 0.75px pupil gaze
  const pupilShiftY = mouseOffset.y * 0.5; // Max 0.5px pupil gaze

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none cursor-pointer group ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setHasInteracted(true);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
        CLEAN, POLISHED 2D COMIC / VECTOR-STYLE CHARACTER
        - Master reference preservation:
          * Same face, oval contours, almond eyes, soft arched eyebrows, gentle closed-mouth smile
          * Long dark brown wavy hair with volume, layered wave curls & gloss highlights
          * Gold hoop earrings
          * Gold pendant necklace with fine chain and circular medallion
          * Dark teal sleeveless top with scoop neckline and smooth cel-shading
          * Cream / off-white high-waisted trousers with tailored front pleat creases
          * Natural standing pose, left arm relaxed at hip, right arm in friendly articulated wave
        - Subtle idle animation:
          * Gentle breathing cycle (torso expansion & vertical float)
          * Natural eyelid blinking
          * Hair subtle sway in the breeze
          * Cursor tracking (slight head tilt and eye gaze parallax)
          * Articulated wrist-waving hand
      */}
      <svg
        viewBox="0 0 140 240"
        className="w-20 sm:w-24 md:w-28 h-auto filter drop-shadow-md overflow-visible transition-transform duration-300 group-hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Natural Skin Cel-Shading & Warmth */}
          <linearGradient id="comicSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE6D5" />
            <stop offset="45%" stopColor="#FBD5BE" />
            <stop offset="85%" stopColor="#F0BC9C" />
            <stop offset="100%" stopColor="#E4A783" />
          </linearGradient>

          <linearGradient id="comicSkinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E6A785" />
            <stop offset="100%" stopColor="#CE8865" />
          </linearGradient>

          {/* Hair: Rich Espresso Brown with Warm Chocolate Cel Highlights */}
          <linearGradient id="comicHairBase" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#301A15" />
            <stop offset="35%" stopColor="#1C0E0B" />
            <stop offset="70%" stopColor="#24130F" />
            <stop offset="100%" stopColor="#140A08" />
          </linearGradient>

          <linearGradient id="comicHairShine" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#4A2D25" />
            <stop offset="50%" stopColor="#714A3D" />
            <stop offset="100%" stopColor="#3F251E" />
          </linearGradient>

          {/* Dark Teal Sleeveless Top: Deep pine-teal cel gradient */}
          <linearGradient id="comicTealTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#175C61" : "#1B696F"} />
            <stop offset="40%" stopColor={isDark ? "#0F464A" : "#135156"} />
            <stop offset="80%" stopColor={isDark ? "#0A3337" : "#0D3C40"} />
            <stop offset="100%" stopColor={isDark ? "#062225" : "#08282B"} />
          </linearGradient>

          <linearGradient id="comicTealHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#287D84" : "#308F97"} />
            <stop offset="100%" stopColor={isDark ? "#124B50" : "#17585E"} />
          </linearGradient>

          {/* Cream / Off-White High-Waisted Trousers */}
          <linearGradient id="comicCreamPants" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? "#EFE8DC" : "#FAF6EE"} />
            <stop offset="45%" stopColor={isDark ? "#E3DBD0" : "#F2EBE0"} />
            <stop offset="80%" stopColor={isDark ? "#D2C7B7" : "#E2D7C7"} />
            <stop offset="100%" stopColor={isDark ? "#BEB2A0" : "#CFC2AF"} />
          </linearGradient>

          <linearGradient id="comicCreamShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#C0B4A2" : "#D4C7B4"} />
            <stop offset="100%" stopColor={isDark ? "#9E907E" : "#B2A38F"} />
          </linearGradient>

          {/* Polished Gold Jewelry: Hoops, Necklace Chain & Pendant */}
          <linearGradient id="comicGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Shoes: Chic Espresso Minimalist Flats/Loafers */}
          <linearGradient id="comicShoes" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#2C1B14" : "#3D271D"} />
            <stop offset="50%" stopColor={isDark ? "#1B0F0B" : "#241610"} />
            <stop offset="100%" stopColor={isDark ? "#0E0705" : "#140C09"} />
          </linearGradient>

          {/* Soft atmospheric ambient glow for night scene */}
          <filter id="comicGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 
          1. REALISTIC DUAL-LAYER GROUND SHADOW
          Grounded on sidewalk pavement with direct contact shadow
        */}
        <g id="ground-shadows">
          <ellipse
            cx="66"
            cy="234"
            rx="30"
            ry="4.2"
            fill={isDark ? "rgba(0,0,0,0.65)" : "rgba(52,21,78,0.18)"}
            className="transition-colors duration-700"
          />
          <ellipse
            cx="54"
            cy="233"
            rx="10"
            ry="2.2"
            fill={isDark ? "rgba(0,0,0,0.88)" : "rgba(35,12,55,0.4)"}
          />
          <ellipse
            cx="76"
            cy="232.5"
            rx="9.5"
            ry="2.2"
            fill={isDark ? "rgba(0,0,0,0.88)" : "rgba(35,12,55,0.4)"}
          />
        </g>

        {/* 
          2. LEGS & CREAM HIGH-WAISTED TROUSERS
          - Clean high-waisted tailoring with pressed vertical pleat creases
          - Left leg straight weight-bearing; right leg naturally relaxed
        */}
        <g id="legs-and-trousers">
          {/* Left Leg (Tailored cream trouser) */}
          <path
            d="M 50 114 
               L 48 165 
               C 47 185 45 208 47 225 
               L 59 225 
               C 60 208 61 185 61 165 
               L 63 115 Z"
            fill="url(#comicCreamPants)"
            stroke={isDark ? "#A39684" : "#B8A995"}
            strokeWidth="0.6"
          />
          {/* Left leg pressed vertical crease line */}
          <path
            d="M 54 118 L 53 223"
            stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.7)"}
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          {/* Subtle trouser inner seam shadow */}
          <path
            d="M 61 125 C 60 155 59 190 59 224"
            stroke={isDark ? "rgba(0,0,0,0.15)" : "rgba(100,75,50,0.12)"}
            strokeWidth="0.6"
          />

          {/* Right Leg (Tailored cream trouser, slightly relaxed) */}
          <path
            d="M 64 115 
               L 67 165 
               C 69 185 71 208 72 225 
               L 84 224 
               C 82 208 79 185 77 165 
               L 75 114 Z"
            fill="url(#comicCreamPants)"
            stroke={isDark ? "#A39684" : "#B8A995"}
            strokeWidth="0.6"
          />
          {/* Right leg pressed vertical crease line */}
          <path
            d="M 72 118 L 78 222"
            stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.7)"}
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* High-waistband seam & trouser crotch fold */}
          <path
            d="M 62 114 C 63 128 64 135 65 140"
            stroke={isDark ? "#9A8D7C" : "#B0A28E"}
            strokeWidth="0.75"
            fill="none"
          />
          {/* Subtle soft knee fold shadows */}
          <path
            d="M 48 174 C 52 177 56 177 60 174"
            stroke={isDark ? "#A39684" : "#B8A995"}
            strokeWidth="0.7"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 68 175 C 72 178 75 178 78 175"
            stroke={isDark ? "#A39684" : "#B8A995"}
            strokeWidth="0.7"
            fill="none"
            opacity="0.5"
          />

          {/* High-Rise Waistband with clean tailored edge */}
          <path
            d="M 49 104 C 55 102 70 102 76 104 L 76 115 C 69 113 56 113 49 115 Z"
            fill="url(#comicCreamPants)"
            stroke={isDark ? "#948775" : "#AA9B87"}
            strokeWidth="0.7"
          />
          {/* Clean waistband top stitch & center tab */}
          <path
            d="M 50 105 C 56 103 69 103 75 105"
            stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)"}
            strokeWidth="0.6"
          />
          {/* Tailored waistband center belt loop */}
          <rect
            x="62.5"
            y="104"
            width="2"
            height="10"
            rx="0.5"
            fill={isDark ? "#D2C7B7" : "#E2D7C7"}
            stroke={isDark ? "#948775" : "#AA9B87"}
            strokeWidth="0.5"
          />
        </g>

        {/* 
          3. CHIC FOOTWEAR
          Polished espresso minimalist loafers grounded cleanly on the street
        */}
        <g id="shoes">
          {/* Left Shoe */}
          <g id="left-shoe">
            <path
              d="M 46 224 
                 L 46 230 
                 C 46 232.5 47.5 233.5 50 233.5 
                 L 60 233.5 
                 C 62 233.5 63 231.5 62 228 
                 L 59 224 Z"
              fill="url(#comicShoes)"
              stroke="#1A100C"
              strokeWidth="0.5"
            />
            {/* Shoe vamp highlight & top trim */}
            <path
              d="M 48 227 C 52 230 57 230 59 227"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Clean sole line */}
            <rect
              x="45.5"
              y="232"
              width="15"
              height="1.5"
              rx="0.4"
              fill="#0B0604"
            />
          </g>

          {/* Right Shoe */}
          <g id="right-shoe">
            <path
              d="M 72 223 
                 L 73 229.5 
                 C 73 232 75 233 77.5 233 
                 L 86 233 
                 C 88 233 88.5 231 87.5 227.5 
                 L 84 223 Z"
              fill="url(#comicShoes)"
              stroke="#1A100C"
              strokeWidth="0.5"
            />
            <path
              d="M 74 226 C 78 229 83 229 85 226"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
            />
            <rect
              x="72.5"
              y="231.5"
              width="14.5"
              height="1.5"
              rx="0.4"
              fill="#0B0604"
            />
          </g>
        </g>

        {/* 
          4. BACK HAIR FLOW & WAVES
          Dark brown locks cascading behind shoulders with natural wavy volume
        */}
        <motion.g
          id="hair-back"
          animate={{
            rotate: isHovered ? [-1.2, 1.2, -1.2] : [-0.6, 0.6, -0.6],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "64px 45px" }}
        >
          {/* Left cascading wavy hair volume behind shoulder */}
          <path
            d="M 46 42 
               C 36 55 33 74 36 94 
               C 38 104 43 112 47 114 
               C 49 108 46 98 47 88 
               C 48 76 50 62 48 42 Z"
            fill="url(#comicHairBase)"
            stroke="#190B08"
            strokeWidth="0.6"
          />
          {/* Right cascading wavy hair volume behind shoulder */}
          <path
            d="M 81 42 
               C 91 55 94 74 91 94 
               C 89 104 84 112 80 114 
               C 78 108 81 98 80 88 
               C 79 76 77 62 79 42 Z"
            fill="url(#comicHairBase)"
            stroke="#190B08"
            strokeWidth="0.6"
          />
          {/* Hair wave sheen & strand accents */}
          <path
            d="M 38 64 C 36 78 38 90 42 102"
            stroke="url(#comicHairShine)"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 89 64 C 91 78 89 90 85 102"
            stroke="url(#comicHairShine)"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        {/* 
          5. TORSO & DARK TEAL SLEEVELESS TOP
          - Subtle idle breathing cycle animation
          - Natural feminine silhouette, clean sleeveless armholes, scoop neckline
          - Smooth cel shading on chest and rib contour
        */}
        <motion.g
          id="torso-and-top"
          animate={{
            y: [0, -1.2, 0],
            scaleY: [1, 1.008, 1],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "64px 105px" }}
        >
          {/* Natural Bare Shoulders & Clavicle (under sleeveless top) */}
          <path
            d="M 44 65 
               C 48 60 55 58 64 58 
               C 73 58 80 60 84 65 
               L 83 75 
               L 45 75 Z"
            fill="url(#comicSkin)"
          />

          {/* Dark Teal Sleeveless Top Body */}
          <path
            d="M 47 66 
               C 52 64 64 64 71 66 
               C 75 66 79 68 81 72 
               C 79 84 78 95 76 105 
               C 68 104 57 104 49 105 
               C 47 95 46 84 44 72 
               C 46 68 46 66 47 66 Z"
            fill="url(#comicTealTop)"
            stroke={isDark ? "#08272A" : "#0D3C40"}
            strokeWidth="0.7"
          />

          {/* Clean Scoop Neckline Edge with Subtle Hem Highlight */}
          <path
            d="M 52 65 C 57 71 71 71 76 65"
            stroke={isDark ? "#287D84" : "#3297A0"}
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Subtle inner neckline shadow */}
          <path
            d="M 53 66 C 58 72 70 72 75 66"
            stroke={isDark ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.2)"}
            strokeWidth="0.6"
            fill="none"
          />

          {/* Sleeveless Armhole Contours */}
          <path
            d="M 47 66 C 45 70 44 76 46 82"
            stroke={isDark ? "#287D84" : "#3297A0"}
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 76 66 C 78 70 79 76 77 82"
            stroke={isDark ? "#287D84" : "#3297A0"}
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />

          {/* Subtle Bust & Waist Cel-Shading Contours */}
          <path
            d="M 49 84 C 54 88 59 89 63 87"
            stroke={isDark ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.18)"}
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 74 84 C 69 88 65 89 62 87"
            stroke={isDark ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.18)"}
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />

          {/* Left Bare Arm (Sleeveless - relaxed at side, hand resting gently) */}
          <g id="left-arm">
            <path
              d="M 45 68 
                 C 40 78 38 92 39 108 
                 L 44 109 
                 C 43 95 44 80 48 70 Z"
              fill="url(#comicSkin)"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.5"
            />
            {/* Natural elbow contour */}
            <path
              d="M 38.5 90 C 39.5 92 40.5 94 40 96"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.45"
              fill="none"
              opacity="0.6"
            />
            {/* Left Forearm & Gracefully Curved Hand */}
            <path
              d="M 39 108 
                 C 38 116 38 124 39.5 130 
                 C 40.5 133 42.5 133 43.5 130 
                 C 44.5 125 44 117 44 109 Z"
              fill="url(#comicSkin)"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.45"
            />
            {/* Delicate resting finger lines */}
            <path
              d="M 39.5 125 C 40 128 40.5 130 41 131"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
            <path
              d="M 41.5 124 C 42 127 42.5 129 43 130"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
          </g>

          {/* 
            HEAD, NECK, EXPRESSIVE COMIC FACE & LUXURIOUS WAVY HAIR
            - Cursor parallax tilt & micro-translation
            - Natural blinking eyes with specular catchlights
            - Gentle closed-mouth warm smile
            - Gold hoop earrings & gold pendant necklace
          */}
          <motion.g
            id="head-and-neck-group"
            animate={{
              rotate: headTilt,
              x: headShiftX,
              y: headShiftY,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            style={{ transformOrigin: "64px 50px" }}
          >
            {/* Slender Neck */}
            <path
              d="M 59 46 L 69 46 L 71 63 L 57 63 Z"
              fill="url(#comicSkin)"
            />
            {/* Soft Shadow under Chin */}
            <path
              d="M 59 47 C 64 52 66 52 69 47 L 70 51 C 66 54 62 54 58 51 Z"
              fill="url(#comicSkinShadow)"
              opacity="0.8"
            />

            {/* Collarbone / Clavicle Contours */}
            <path
              d="M 54 62 Q 59 64 63 62"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M 65 62 Q 69 64 74 62"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.7"
            />

            {/* 
              GOLD PENDANT NECKLACE
              - Fine delicate chain contouring the neck
              - Small elegant gold disc pendant nestled at collarbone
            */}
            <g id="gold-necklace">
              {/* Gold chain arc */}
              <path
                d="M 58 50 C 61 58 67 58 70 50"
                stroke="url(#comicGold)"
                strokeWidth="0.65"
                fill="none"
                strokeLinecap="round"
              />
              {/* Gold pendant disc */}
              <circle
                cx="64"
                cy="56"
                r="1.4"
                fill="url(#comicGold)"
                stroke="#B45309"
                strokeWidth="0.3"
              />
              {/* Specular pendant shine */}
              <circle cx="63.6" cy="55.6" r="0.4" fill="#FFFFFF" />
            </g>

            {/* Head & Jaw Contour (Soft feminine oval silhouette) */}
            <path
              d="M 52 35 
                 C 52 22 76 22 76 35 
                 C 76 44 72 52 64 52 
                 C 56 52 52 44 52 35 Z"
              fill="url(#comicSkin)"
              stroke="#D49975"
              strokeWidth="0.5"
            />

            {/* Rosy Peach Cheek Blush */}
            <ellipse cx="56.5" cy="40.5" rx="3.2" ry="2.2" fill="#FB7185" opacity={isDark ? "0.26" : "0.32"} />
            <ellipse cx="71.5" cy="40.5" rx="3.2" ry="2.2" fill="#FB7185" opacity={isDark ? "0.26" : "0.32"} />

            {/* 
              EXPRESSIVE COMIC EYES:
              - Almond shape, crisp upper lash line with delicate wing
              - Warm hazel-brown iris with pupil
              - Specular dual catchlights
              - Animated eyelid blink
            */}
            {/* Left Eye */}
            <g id="left-eye">
              {isBlinking ? (
                // Closed eyelid line during natural blink
                <path
                  d="M 55 35 Q 58.5 37.5 62 35"
                  stroke="#1C0E0B"
                  strokeWidth="0.9"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  {/* Eye Sclera (White) */}
                  <path
                    d="M 55 35 Q 58.5 31.8 62 35 Q 58.5 37.2 55 35 Z"
                    fill="#FFFFFF"
                  />
                  {/* Warm Hazel-Brown Iris with dynamic gaze parallax */}
                  <circle
                    cx={58.5 + pupilShiftX}
                    cy={34.8 + pupilShiftY}
                    r="1.75"
                    fill="#432619"
                  />
                  {/* Deep Pupil */}
                  <circle
                    cx={58.5 + pupilShiftX}
                    cy={34.8 + pupilShiftY}
                    r="1.0"
                    fill="#150A07"
                  />
                  {/* Specular Catchlights */}
                  <circle
                    cx={59.1 + pupilShiftX}
                    cy={34.2 + pupilShiftY}
                    r="0.5"
                    fill="#FFFFFF"
                  />
                  <circle
                    cx={58.0 + pupilShiftX}
                    cy={35.3 + pupilShiftY}
                    r="0.25"
                    fill="#FFFFFF"
                  />
                  {/* Crisp Upper Lash Line with subtle feminine corner wing */}
                  <path
                    d="M 54.5 35 Q 58.5 31.4 62.5 34.5"
                    stroke="#1C0E0B"
                    strokeWidth="0.95"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>

            {/* Right Eye */}
            <g id="right-eye">
              {isBlinking ? (
                <path
                  d="M 66 35 Q 69.5 37.5 73 35"
                  stroke="#1C0E0B"
                  strokeWidth="0.9"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path
                    d="M 66 35 Q 69.5 31.8 73 35 Q 69.5 37.2 66 35 Z"
                    fill="#FFFFFF"
                  />
                  <circle
                    cx={69.5 + pupilShiftX}
                    cy={34.8 + pupilShiftY}
                    r="1.75"
                    fill="#432619"
                  />
                  <circle
                    cx={69.5 + pupilShiftX}
                    cy={34.8 + pupilShiftY}
                    r="1.0"
                    fill="#150A07"
                  />
                  <circle
                    cx={70.1 + pupilShiftX}
                    cy={34.2 + pupilShiftY}
                    r="0.5"
                    fill="#FFFFFF"
                  />
                  <circle
                    cx={69.0 + pupilShiftX}
                    cy={35.3 + pupilShiftY}
                    r="0.25"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M 65.5 34.5 Q 69.5 31.4 73.5 35"
                    stroke="#1C0E0B"
                    strokeWidth="0.95"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>

            {/* Soft Arched Dark Brown Eyebrows */}
            <path
              d="M 54 31.2 Q 58 29.5 62 31.0"
              stroke="#26140F"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 66 31.0 Q 70 29.5 74 31.2"
              stroke="#26140F"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
            />

            {/* Delicate Sculpted Nose with Tip Highlight */}
            <path
              d="M 64 32.5 L 63.8 38.8 Q 64.8 40.2 65.5 38.8"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="64" cy="38.4" r="0.35" fill="rgba(255,255,255,0.45)" />

            {/* 
              GENTLE CLOSED-MOUTH WARM SMILE
              - Gentle closed-mouth expression from reference image
              - Soft rosy lips, cupid's bow, subtle corner dimple creases
            */}
            <g id="gentle-smile">
              {/* Smile boundary line */}
              <path
                d="M 59.8 43.8 Q 64 47.0 68.2 43.8"
                stroke="#9F1239"
                strokeWidth="0.75"
                fill="none"
                strokeLinecap="round"
              />
              {/* Upper lip contour */}
              <path
                d="M 60.5 43.5 Q 62.2 42.6 64 43.0 Q 65.8 42.6 67.5 43.5"
                stroke="#BE123C"
                strokeWidth="0.7"
                fill="none"
                strokeLinecap="round"
              />
              {/* Lower lip soft fullness glow */}
              <path
                d="M 61.5 45.0 Q 64 46.5 66.5 45.0"
                stroke="#FDA4AF"
                strokeWidth="0.65"
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* 
              GOLD HOOP EARRINGS
              - Delicate polished gold hoops shining through hair locks
            */}
            <g id="gold-hoop-earrings">
              {/* Left Ear Hoop */}
              <circle
                cx="51.8"
                cy="38.5"
                r="1.6"
                fill="none"
                stroke="url(#comicGold)"
                strokeWidth="0.75"
              />
              {/* Right Ear Hoop */}
              <circle
                cx="76.2"
                cy="38.5"
                r="1.6"
                fill="none"
                stroke="url(#comicGold)"
                strokeWidth="0.75"
              />
            </g>

            {/* 
              FRONT HAIR & VOLUMINOUS WAVES
              - Side-swept soft bangs framing forehead
              - S-curve wavy locks flowing past cheeks onto shoulders
              - Polished specular gloss ribbons
            */}
            <g id="hair-front">
              {/* Top crown hair volume */}
              <path
                d="M 49 35 
                   C 49 19 79 19 79 35 
                   C 79 25 73 22 64 22 
                   C 55 22 49 26 49 35 Z"
                fill="url(#comicHairBase)"
              />
              {/* Side-swept front bang swooping naturally across forehead */}
              <path
                d="M 50 27 
                   C 58 25 68 27 73 34 
                   C 67 30 58 30 51 34 Z"
                fill="#1C0E0B"
              />
              {/* Soft wave locks framing cheeks & falling over shoulders */}
              <path
                d="M 50 32 C 47 41 48 52 51 62 C 52 54 50 43 52 35 Z"
                fill="url(#comicHairBase)"
              />
              <path
                d="M 77 32 C 80 41 79 52 76 62 C 75 54 77 43 75 35 Z"
                fill="url(#comicHairBase)"
              />
              {/* Cascading wave strands over top of teal shirt */}
              <path
                d="M 51 60 C 50 70 48 80 50 90 C 52 82 52 70 53 62 Z"
                fill="url(#comicHairBase)"
              />
              <path
                d="M 76 60 C 77 70 79 80 77 90 C 75 82 75 70 74 62 Z"
                fill="url(#comicHairBase)"
              />

              {/* Specular gloss ribbon across crown */}
              <path
                d="M 54 25 C 60 23 68 23 74 26"
                stroke="url(#comicHairShine)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
            </g>
          </motion.g>
        </motion.g>

        {/* 
          6. RIGHT ARM & ARTICULATED WAVING HAND
          - Upper arm gracefully angled outward
          - Forearm angled toward the viewer in a warm, friendly vector wave
          - Articulated waving hand smoothly pivoting at the wrist (113px, 28px)
          - Subtle idle wave + responsive lively wave on hover
        */}
        <g id="waving-arm-assembly">
          {/* Bare Upper Arm & Shoulder (Sleeveless top cutout) */}
          <path
            d="M 80 70 
               C 88 68 97 63 105 53 
               L 109 58 
               C 101 68 92 75 82 74 Z"
            fill="url(#comicSkin)"
            stroke="url(#comicSkinShadow)"
            strokeWidth="0.5"
          />

          {/* Bare Forearm (Angled gracefully upward toward hand) */}
          <path
            d="M 104 54 
               C 107 46 109 38 111 31 
               L 116.5 33 
               C 114.5 42 112 50 109 59 Z"
            fill="url(#comicSkin)"
            stroke="url(#comicSkinShadow)"
            strokeWidth="0.5"
          />

          {/* Delicate Gold Bangle Bracelet on Right Wrist */}
          <path
            d="M 111.0 29.5 L 116.5 31.5"
            stroke="url(#comicGold)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="113.8" cy="30.5" r="0.75" fill="#FEF08A" />

          {/* 
            ARTICULATED WAVING HAND & SCULPTED FINGERS
            Pivoting smoothly at the wrist joint (113px, 28px) via motion.g
          */}
          <motion.g
            animate={{
              rotate: isHovered ? [-13, 14, -13] : [-6, 8, -6],
            }}
            transition={{
              duration: isHovered ? 0.95 : 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "113px 28px",
            }}
          >
            {/* Wrist contact area */}
            <path
              d="M 111.2 28 C 111.2 25 116.2 25 116.2 28 Z"
              fill="url(#comicSkin)"
            />

            {/* Seamless Anatomically Sculpted Comic Palm & Fingers */}
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
              fill="url(#comicSkin)"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.45"
            />

            {/* Palm Crease Lines */}
            <path
              d="M 110.8 22 C 112.5 23.5 114 24.5 114.5 26"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Finger separation lines */}
            <line
              x1="114"
              y1="13"
              x2="114"
              y2="19.5"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />
            <line
              x1="116.7"
              y1="12"
              x2="116.7"
              y2="19.5"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />
            <line
              x1="119.2"
              y1="13.5"
              x2="119.2"
              y2="20"
              stroke="url(#comicSkinShadow)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />

            {/* Soft Rosy Fingertip Warmth */}
            <circle cx="107.5" cy="18.5" r="1.1" fill="#FB7185" opacity="0.28" />
            <circle cx="113" cy="11" r="1.1" fill="#FB7185" opacity="0.28" />
            <circle cx="115.6" cy="9.5" r="1.1" fill="#FB7185" opacity="0.28" />
            <circle cx="118.2" cy="10.8" r="1.1" fill="#FB7185" opacity="0.28" />
            <circle cx="120.7" cy="13.5" r="0.9" fill="#FB7185" opacity="0.28" />

            {/* Delicate Fingernail Glints */}
            <path
              d="M 112.4 11.2 Q 113 10.6 113.6 11.2"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.45"
              fill="none"
            />
            <path
              d="M 115 9.7 Q 115.6 9.1 116.2 9.7"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.45"
              fill="none"
            />
            <path
              d="M 117.6 11 Q 118.2 10.4 118.8 11"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.45"
              fill="none"
            />

            {/* Minimalist Gold Ring on Middle Finger */}
            <path
              d="M 114.5 15.2 L 116.7 15.2"
              stroke="url(#comicGold)"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
