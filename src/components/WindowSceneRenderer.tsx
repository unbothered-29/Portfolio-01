import React from "react";
import { motion } from "motion/react";

export type WindowSceneType =
  | "working-laptop"      // Interactive 01: Working on laptop
  | "music-headphones"    // Interactive 02: Listening to music
  | "travelling-planning" // Interactive 03: Travelling & planning a trip
  | "food-cold-coffee"    // Interactive 04: Food + iced cold coffee
  | "getting-ready"       // Passive: Vanity mirror, everyday self-care
  | "sleeping"            // Passive: Cozy bedroom, sleeping peacefully
  | "watching-movie"      // Passive: Dark room, glowing screen, snacks
  | "reading-novel"       // Passive: Armchair, reading lamp, book
  | "plant-care"          // Passive: Watering can, houseplants, botanical
  | "vintage-camera-sill" // Passive: 35mm camera on sill, photo prints
  | "art-sketching"       // Passive: Drafting desk, sketchpad, creativity
  | "window-daydream"     // Passive: Leaning on sill gazing at night sky with mug
  | "cozy-bookshelf"      // Passive: Bookshelf with candle, warm library
  | "pet-sleeping"        // Passive: Cat napping on windowsill cushion
  | "starry-breeze"       // Passive: Sheer curtains drifting in night breeze
  | "vinyl-turntable";    // Passive: Turntable spinning vinyl on credenza

interface WindowSceneRendererProps {
  scene: WindowSceneType;
  isDark: boolean;
  isLit: boolean;
  windowInstanceId: string;
}

export function WindowSceneRenderer({
  scene,
  isDark,
  isLit,
  windowInstanceId,
}: WindowSceneRendererProps) {
  // Lighting multipliers and base colors:
  // When isLit is true (user hovering interactive window), room light turns on warm and bright!
  // In passive/unlit state: subtle nighttime illumination so the scene has gentle visibility.

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 
        ROOM INTERIOR BACKDROP & WARM AMBIENT GLOW
        Smoothly brightens when room light turns on!
      */}
      <motion.div
        initial={false}
        animate={{
          opacity: isLit ? 1 : 0,
        }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#FEF08A]/25 via-[#F59E0B]/20 to-[#B45309]/15 pointer-events-none z-0"
      />

      {/* Primary Vector Scene Illustration */}
      <svg
        viewBox="0 0 100 75"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <defs>
          {/* Shared Floor / Baseboard Gradient */}
          <linearGradient id={`floorWood_${windowInstanceId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#2A1B14" : "#8A5A36"} />
            <stop offset="100%" stopColor={isDark ? "#170D08" : "#5C381E"} />
          </linearGradient>

          {/* Warm Lamp Radial Bloom Gradient */}
          <radialGradient id={`lampRadialGlow_${windowInstanceId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          {/* Cool Laptop / Screen Glow Radial Gradient */}
          <radialGradient id={`screenCoolGlow_${windowInstanceId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
          </radialGradient>

          {/* Moonlight Silver Gradient */}
          <linearGradient id={`moonlightBeam_${windowInstanceId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
          </linearGradient>

          {/* Soft Reading Lamp Volumetric Cone Gradient */}
          <linearGradient id={`readingLampCone_${windowInstanceId}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#FDE047" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 01: WORKING ON LAPTOP (INTERACTIVE 01)
            Girl sitting at desk, laptop screen glow, articulated lamp, plant
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "working-laptop" && (
          <g id="scene-working-laptop">
            {/* Room Wall & Background Floating Bookshelf */}
            <rect x="0" y="0" width="100" height="75" fill={isDark ? (isLit ? "#1A1524" : "#0D0A14") : (isLit ? "#FDF8ED" : "#E2DCED")} />
            
            {/* Background Shelf with small books */}
            <line x1="8" y1="20" x2="42" y2="20" stroke={isDark ? "#3F324D" : "#BAA9D2"} strokeWidth="1.2" strokeLinecap="round" />
            <rect x="12" y="12" width="3" height="8" rx="0.4" fill={isDark ? "#D97706" : "#B45309"} />
            <rect x="16" y="10" width="3.5" height="10" rx="0.4" fill={isDark ? "#7C3AED" : "#6D28D9"} />
            <rect x="20.5" y="14" width="4" height="6" rx="0.4" fill={isDark ? "#059669" : "#047857"} />
            <rect x="25.5" y="11" width="3" height="9" rx="0.4" fill={isDark ? "#DC2626" : "#B91C1C"} />
            {/* Hanging miniature ivy on shelf */}
            <path d="M 36 20 Q 34 26 37 32" stroke={isDark ? "#10B981" : "#059669"} strokeWidth="0.8" fill="none" />
            <circle cx="35" cy="24" r="1.2" fill={isDark ? "#34D399" : "#10B981"} />
            <circle cx="37" cy="28" r="1.3" fill={isDark ? "#10B981" : "#059669"} />

            {/* Room Baseboard & Timber Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />
            <line x1="0" y1="58" x2="100" y2="58" stroke={isDark ? "#4A3222" : "#9C6D47"} strokeWidth="0.6" />

            {/* Studio Desk */}
            <polygon points="8,44 92,44 88,58 12,58" fill={isDark ? "#3A2417" : "#8A5633"} />
            <line x1="8" y1="44" x2="92" y2="44" stroke="#FDE68A" strokeWidth="0.6" opacity={isLit ? 0.9 : 0.4} />
            <line x1="12" y1="58" x2="12" y2="72" stroke={isDark ? "#22130C" : "#57351D"} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="88" y1="58" x2="88" y2="72" stroke={isDark ? "#22130C" : "#57351D"} strokeWidth="2.4" strokeLinecap="round" />

            {/* Ergonomic Studio Chair */}
            <path d="M 26 42 C 26 30, 34 26, 38 26 C 40 26, 40 42, 40 48" fill={isDark ? "#14101D" : "#362B47"} />
            <line x1="33" y1="48" x2="33" y2="66" stroke={isDark ? "#09070E" : "#21192E"} strokeWidth="2.2" />

            {/* REALISTIC HUMAN CHARACTER: Girl working at desk */}
            <g id="realistic-girl-working">
              {/* Lower body / legs seated at desk under tabletop */}
              <path d="M 32 48 L 44 48 L 46 64 L 38 64 Z" fill={isDark ? "#1E192B" : "#4A3B5C"} />

              {/* Upper Body / Cozy Ribbed Knit Sweater */}
              <path
                d="M 33 46 C 33 39, 37 35, 43 36 C 45 36.5, 47 38, 48 42 L 48 49 L 33 50 Z"
                fill={isDark ? "#3A294F" : "#72538C"}
              />
              {/* Sweater shoulder seam & soft fabric folds */}
              <path d="M 36 43 Q 41 45 46 43" stroke={isDark ? "#281A38" : "#573B70"} strokeWidth="0.8" fill="none" />
              <path d="M 35 47 Q 40 49 46 47" stroke={isDark ? "#281A38" : "#573B70"} strokeWidth="0.8" fill="none" />
              
              {/* Neck & Collar */}
              <path d="M 40 36 L 43 36 L 43 31 L 40 32 Z" fill="#E8B59B" />
              <path d="M 42 36 Q 41 33 42 31" stroke="#D49A7D" strokeWidth="0.5" fill="none" />

              {/* Realistic Head & Facial Profile (3/4 Profile leaning toward screen) */}
              {/* Base Face Contour: Forehead, soft nose bridge, lips, chin, jaw */}
              <path
                d="M 41 24 C 43 24, 44.5 25.5, 44.5 27.5 C 45.2 28.2, 45.4 29, 44.8 29.5 C 45.2 30.2, 44.8 31, 44.2 31.4 C 43.8 32.4, 42.5 33, 41 33 C 39.5 33, 38.5 31.5, 38.5 29 C 38.5 26.5, 39.5 24, 41 24 Z"
                fill="#F7CEB7"
              />
              {/* Ambient shadow under jaw & cheek */}
              <path d="M 41 30.5 Q 43 31 43.8 32 Q 42 32.8 41 32.8 Z" fill="#E2A686" />
              
              {/* Realistic Facial Features */}
              {/* Delicate eyebrow arch */}
              <path d="M 42.5 26 Q 44 26.2 44.6 27" stroke="#3A2016" strokeWidth="0.45" strokeLinecap="round" fill="none" />
              {/* Eyelid looking downward at laptop screen */}
              <path d="M 43 27.5 Q 44.2 28 44.5 28.6" stroke="#26140D" strokeWidth="0.5" strokeLinecap="round" fill="none" />
              <circle cx="44.2" cy="28.4" r="0.4" fill="#26140D" />
              {/* Soft rosy cheek blush */}
              <ellipse cx="42.8" cy="29.5" rx="1.1" ry="0.7" fill="#F472B6" opacity="0.35" />
              {/* Soft lip contour */}
              <path d="M 44.4 30.5 Q 44.8 30.7 44.3 31.2" stroke="#E11D48" strokeWidth="0.4" fill="none" />
              {/* Ear with tiny gold stud earring */}
              <path d="M 39.5 28 C 38.8 28, 38.6 29.5, 39.2 30 C 39.5 30.2, 39.8 29.5, 39.8 28.5 Z" fill="#EBB99F" />
              <circle cx="39.4" cy="29.8" r="0.35" fill="#FBBF24" />

              {/* Realistic Detailed Hair (Brunette with warm caramel highlights & loose wisps) */}
              {/* Main Hair Volume */}
              <path
                d="M 40.5 23.5 C 42.5 23.5, 43.5 24.5, 43.8 26 C 43 25.5, 41.5 25.8, 41 27 C 40 25.5, 38.5 26, 38 27.5 C 37.5 29, 37.5 31, 38.5 32 C 37.5 30.5, 37 28.5, 37.5 26.5 C 38 24.5, 39 23.5, 40.5 23.5 Z"
                fill="#2A1810"
              />
              {/* Messy Top Knot Bun with Hair Clip */}
              <ellipse cx="38.5" cy="23" rx="2.6" ry="2.2" fill="#2A1810" />
              <ellipse cx="38.5" cy="23" rx="1.8" ry="1.5" fill="#3D2418" />
              {/* Tortoiseshell hair clip */}
              <rect x="37" y="22.2" width="2.8" height="1.4" rx="0.4" fill="#D97706" stroke="#92400E" strokeWidth="0.3" transform="rotate(-15 37 22.2)" />
              {/* Loose flyaway hair strands framing temple and neck */}
              <path d="M 43 25 Q 44 26.5 43.2 28" stroke="#3D2418" strokeWidth="0.4" fill="none" />
              <path d="M 38 31 Q 38.5 33.5 39.5 35" stroke="#2A1810" strokeWidth="0.4" fill="none" />

              {/* Realistic Arms & Hands Typing on Laptop */}
              {/* Upper Arm & Forearm extending toward desk */}
              <path d="M 44 40 Q 48 44 54 44.5" stroke={isDark ? "#3A294F" : "#72538C"} strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M 40 42 Q 45 46 51 45.5" stroke={isDark ? "#2E2040" : "#5E4275"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              
              {/* Left & Right Articulated Hands on Keyboard */}
              {/* Right Hand typing */}
              <ellipse cx="54.5" cy="44.2" rx="1.3" ry="0.9" fill="#F7CEB7" />
              <path d="M 54.5 44 L 56.5 43.8" stroke="#E2A686" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M 54.5 44.5 L 56.2 44.6" stroke="#E2A686" strokeWidth="0.45" strokeLinecap="round" />
              {/* Left Hand typing */}
              <ellipse cx="51.5" cy="45" rx="1.2" ry="0.8" fill="#E8B59B" />
              <path d="M 51.5 45 L 53.2 44.8" stroke="#D49A7D" strokeWidth="0.45" strokeLinecap="round" />
            </g>

            {/* Laptop Base & Open Screen */}
            <line x1="50" y1="44" x2="68" y2="44" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
            {/* Screen angled back */}
            <polygon points="61,44 68,31 78,31 71,44" fill="#1E293B" stroke="#475569" strokeWidth="0.6" />
            {/* Glowing Laptop Display */}
            <polygon points="62,43 68.6,32 77,32 70.4,43" fill="#BAE6FD" />
            {/* Realistic Code Editor interface on screen */}
            <line x1="65" y1="34" x2="74" y2="34" stroke="#3B82F6" strokeWidth="0.8" opacity="0.85" />
            <line x1="64" y1="36.5" x2="72" y2="36.5" stroke="#10B981" strokeWidth="0.7" opacity="0.85" />
            <line x1="64.5" y1="39" x2="75" y2="39" stroke="#F59E0B" strokeWidth="0.7" opacity="0.85" />
            <line x1="63.5" y1="41.2" x2="69" y2="41.2" stroke="#8B5CF6" strokeWidth="0.7" opacity="0.85" />

            {/* Screen Ambient Light Cone washing over girl's hands and face */}
            <polygon
              points="68,31 40,25 42,47 61,44"
              fill={`url(#screenCoolGlow_${windowInstanceId})`}
              opacity={isLit ? 0.75 : 0.45}
            />

            {/* Desk Accessories: Steaming Mug, Notebook, Plant */}
            {/* Small Ceramic Coffee Mug */}
            <rect x="76" y="40" width="3.2" height="4" rx="0.6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.4" />
            <path d="M 79.2 41 Q 81 42 79.2 43" stroke="#94A3B8" strokeWidth="0.4" fill="none" />
            {/* Tiny steam trails */}
            <path d="M 77 39 Q 78 37 77 35" stroke="#E2E8F0" strokeWidth="0.4" fill="none" opacity={isLit ? 0.8 : 0.4} />

            {/* Sketchbook / Notebook with Pen */}
            <rect x="18" y="44.5" width="10" height="7" rx="0.5" transform="rotate(-6 18 44.5)" fill={isDark ? "#27272A" : "#F1F5F9"} stroke={isDark ? "#52525B" : "#CBD5E1"} strokeWidth="0.3" />
            <line x1="20" y1="44" x2="26" y2="43.5" stroke="#DC2626" strokeWidth="0.5" />

            {/* Articulated Brass Desk Lamp on Right */}
            <ellipse cx="85" cy="44" rx="3.5" ry="1.2" fill="#D97706" />
            <path d="M 85 44 L 86 28 Q 86 20 80 20 L 76 22" stroke="#F59E0B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Lamp Hood */}
            <path d="M 74 20 L 79 26 L 72 26 Z" fill={isDark ? "#18181B" : "#334155"} stroke="#D97706" strokeWidth="0.4" />
            <circle cx="75.5" cy="26" r="1.6" fill="#FEF08A" />
            {/* Lamp Warm Radiant Light Pool */}
            <ellipse cx="75" cy="43" rx="14" ry="7" fill={`url(#lampRadialGlow_${windowInstanceId})`} opacity={isLit ? 0.95 : 0.6} />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 02: LISTENING TO MUSIC (INTERACTIVE 02)
            Girl relaxed in armchair with over-ear headphones, sound vibes, cozy room
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "music-headphones" && (
          <g id="scene-music-headphones">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? (isLit ? "#1E182A" : "#0D0A14") : (isLit ? "#FAF4FB" : "#E2DAE8")} />
            
            {/* Soundwave Art Frame on Wall */}
            <rect x="14" y="10" width="26" height="15" rx="1" fill={isDark ? "#161122" : "#EDE4F2"} stroke={isDark ? "#4A3B63" : "#C4B2DA"} strokeWidth="0.8" />
            <path d="M 18 17.5 L 21 14 L 24 21 L 27 12 L 30 22 L 33 15 L 36 17.5" stroke="#A855F7" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.85" />

            {/* Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />
            <ellipse cx="50" cy="64" rx="36" ry="6" fill={isDark ? "#382547" : "#C9B5DA"} opacity="0.6" /> {/* Cozy rug */}

            {/* Architectural Mid-Century Lounge Armchair */}
            <g id="music-lounge-armchair">
              {/* Tapered Walnut Legs with Golden Brass Tips */}
              <line x1="33" y1="54" x2="28" y2="67" stroke={isDark ? "#170D08" : "#3E2211"} strokeWidth="2" strokeLinecap="round" />
              <line x1="28.8" y1="65" x2="28" y2="67" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <line x1="67" y1="54" x2="72" y2="67" stroke={isDark ? "#170D08" : "#3E2211"} strokeWidth="2" strokeLinecap="round" />
              <line x1="71.2" y1="65" x2="72" y2="67" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              
              {/* Wooden Sub-Frame */}
              <path d="M 31 57 L 69 57" stroke={isDark ? "#1A0F0A" : "#452410"} strokeWidth="1.6" strokeLinecap="round" />

              {/* Curved Ergonomic Backrest Shell (Plum / Dusty Indigo Boucle) */}
              <path
                d="M 30 46 C 28 32, 34 22, 50 22 C 66 22, 72 32, 70 46 Z"
                fill={isDark ? "#281D3B" : "#5B4375"}
              />
              {/* Flared Wing Contours with subtle shadow */}
              <path d="M 28 28 C 26 34, 27 42, 31 46" stroke={isDark ? "#191124" : "#453259"} strokeWidth="1.2" fill="none" />
              <path d="M 72 28 C 74 34, 73 42, 69 46" stroke={isDark ? "#191124" : "#453259"} strokeWidth="1.2" fill="none" />

              {/* Plush Cushion with Welted Seam */}
              <ellipse cx="50" cy="53" rx="21" ry="6.2" fill={isDark ? "#382950" : "#795C99"} />
              <path d="M 30 53 Q 50 59 70 53" stroke={isDark ? "#1E142B" : "#4A3561"} strokeWidth="1.2" fill="none" />

              {/* Curved Padded Armrests */}
              <path d="M 28 38 C 26 43, 27 51, 31 53 C 34 53, 33 46, 32 38 Z" fill={isDark ? "#322347" : "#694E85"} />
              <path d="M 72 38 C 74 43, 73 51, 69 53 C 66 53, 67 46, 68 38 Z" fill={isDark ? "#322347" : "#694E85"} />
            </g>

            {/* REALISTIC HUMAN CHARACTER: Girl immersed in music */}
            <g id="realistic-girl-music">
              {/* Lower body tucked up comfortably in chair */}
              <path d="M 38 52 C 36 57, 46 61, 58 57 C 64 55, 63 50, 54 49 Z" fill={isDark ? "#2D2644" : "#4A3B66"} />
              <path d="M 40 55 Q 48 59 56 56" stroke={isDark ? "#201A32" : "#382B4F"} strokeWidth="0.8" fill="none" />

              {/* Slouchy Oversized Lavender/Indigo Sweater */}
              <path
                d="M 38 46 C 38 38, 46 34, 56 36 C 62 38, 63 48, 56 52 C 48 54, 40 52, 38 46 Z"
                fill={isDark ? "#4C1D95" : "#8B5CF6"}
              />
              {/* Cozy sweater fabric folds */}
              <path d="M 42 42 Q 48 45 54 42" stroke={isDark ? "#3B1477" : "#7C3AED"} strokeWidth="0.8" fill="none" />
              <path d="M 44 47 Q 50 50 56 46" stroke={isDark ? "#3B1477" : "#7C3AED"} strokeWidth="0.8" fill="none" />

              {/* Graceful Neck leaning back */}
              <path d="M 48 35 L 53 35 L 52 30 L 48 31 Z" fill="#E8B59B" />

              {/* Realistic Head tilted back in blissful relaxation */}
              {/* Facial Contour: tilted upward, delicate nose, relaxed lips, soft chin */}
              <path
                d="M 48 25 C 49.5 24, 52 24, 53.5 25.2 C 54.8 26.2, 55.2 27.5, 54.8 28.5 C 55.4 29.2, 54.8 30.2, 53.8 30.8 C 53 31.5, 51.5 32, 49.5 31.8 C 47.8 31.5, 47 29.5, 47 27.5 C 47 26, 47.5 25.2, 48 25 Z"
                fill="#F7CEB7"
              />
              {/* Serene closed eye with gentle eyelashes */}
              <path d="M 51 27.5 Q 52.5 28.2 53.5 27.4" stroke="#26140D" strokeWidth="0.5" strokeLinecap="round" fill="none" />
              {/* Soft peaceful smile */}
              <path d="M 52 29.8 Q 53.2 30.4 54 29.6" stroke="#BE185D" strokeWidth="0.45" strokeLinecap="round" fill="none" />
              {/* Subtle cheek glow */}
              <ellipse cx="51.8" cy="28.8" rx="1.2" ry="0.8" fill="#F472B6" opacity="0.35" />

              {/* Realistic Long Hair Flowing over Shoulders */}
              <path
                d="M 47 24 C 45 28, 44 34, 46 40 C 47 42, 49 43, 50 42 C 48 37, 48 31, 50 26 Z"
                fill="#26140D"
              />
              <path d="M 48 23 C 51 22, 54 23, 55 25 C 56 28, 56 34, 58 40" stroke="#3D2418" strokeWidth="1.2" fill="none" />
              <path d="M 46 27 Q 45 33 47 38" stroke="#1F0E08" strokeWidth="0.5" fill="none" />

              {/* HIGH-END OVER-EAR HEADPHONES */}
              {/* Cushioned padded headband contouring over head */}
              <path d="M 46 27 C 46 19, 56 19, 56 27" stroke="#334155" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M 47 27 C 47 20.2, 55 20.2, 55 27" stroke="#F1F5F9" strokeWidth="0.8" fill="none" opacity="0.9" />
              {/* Left Earcup with plush cushion */}
              <ellipse cx="46.5" cy="28" rx="2.4" ry="3.6" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.6" />
              <ellipse cx="46.5" cy="28" rx="1.5" ry="2.4" fill="#38BDF8" opacity="0.85" />
              {/* Right Earcup with plush cushion */}
              <ellipse cx="55.5" cy="28" rx="2.4" ry="3.6" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.6" />
              <ellipse cx="55.5" cy="28" rx="1.5" ry="2.4" fill="#38BDF8" opacity="0.85" />

              {/* Realistic Hands holding Smartphone */}
              <path d="M 40 46 Q 44 48 47 48" stroke={isDark ? "#4C1D95" : "#8B5CF6"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Hand with delicate fingers curled around phone */}
              <ellipse cx="47.5" cy="48" rx="1.2" ry="0.9" fill="#F7CEB7" />
              <path d="M 47 47.5 L 48.5 47.2" stroke="#E2A686" strokeWidth="0.4" strokeLinecap="round" />

              {/* Smartphone with glowing music player screen */}
              <rect x="45" y="44" width="4.5" height="7.5" rx="0.8" transform="rotate(-15 45 44)" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.5" />
              <line x1="46" y1="46" x2="48.5" y2="45.5" stroke="#38BDF8" strokeWidth="0.6" />
              <circle cx="47" cy="48" r="0.8" fill="#F472B6" />
              {/* Audio wire running from phone to headphones */}
              <path d="M 46.5 31 Q 44 38 45.5 45" stroke="#94A3B8" strokeWidth="0.45" fill="none" opacity="0.75" />
            </g>

            {/* Subtle floating musical note / rhythm pulses around her */}
            <motion.g
              animate={{ opacity: isLit ? 1 : 0.45, y: isLit ? [0, -2, 0] : 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="34" cy="22" r="1.5" fill="#C084FC" />
              <path d="M 35.5 22 L 35.5 15 L 39 16.5" stroke="#C084FC" strokeWidth="0.8" fill="none" />
              <circle cx="68" cy="18" r="1.3" fill="#F472B6" />
              <path d="M 69.3 18 L 69.3 12 L 72.5 13.5" stroke="#F472B6" strokeWidth="0.8" fill="none" />
            </motion.g>

            {/* Small Side Table with Lamp & Plant */}
            <line x1="82" y1="46" x2="94" y2="46" stroke={isDark ? "#4A3222" : "#8F5E38"} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="88" y1="46" x2="88" y2="68" stroke={isDark ? "#24150B" : "#5C3B21"} strokeWidth="2" strokeLinecap="round" />
            {/* Globe table lamp */}
            <circle cx="88" cy="38" r="4.5" fill="#FEF3C7" className={isLit ? "drop-shadow-[0_0_8px_#F59E0B]" : ""} />
            <circle cx="88" cy="38" r="12" fill={`url(#lampRadialGlow_${windowInstanceId})`} opacity={isLit ? 0.8 : 0.35} />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 03: TRAVELLING (INTERACTIVE 03)
            Girl planning a trip, suitcase, world map, camera, postcards
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "travelling-planning" && (
          <g id="scene-travelling">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? (isLit ? "#1B1822" : "#0D0A14") : (isLit ? "#FDF8F0" : "#E2DCED")} />
            
            {/* World Map Framed on Wall with destination pin lines */}
            <rect x="18" y="8" width="46" height="22" rx="1" fill={isDark ? "#171420" : "#EDE5D8"} stroke={isDark ? "#5C4A38" : "#C4B29E"} strokeWidth="0.8" />
            {/* Continents abstract outlines */}
            <path d="M 23 16 Q 28 14 30 18 Q 33 22 28 26 Q 24 24 23 16 Z" fill={isDark ? "#2D3748" : "#A8A29E"} opacity="0.75" />
            <path d="M 38 13 Q 46 12 50 16 Q 52 24 44 26 Q 40 22 38 13 Z" fill={isDark ? "#2D3748" : "#A8A29E"} opacity="0.75" />
            <path d="M 52 20 Q 58 19 60 23 Q 56 26 52 24 Z" fill={isDark ? "#2D3748" : "#A8A29E"} opacity="0.75" />
            {/* Red Flight Route Dash line */}
            <path d="M 28 18 Q 38 12 48 18" stroke="#EF4444" strokeWidth="0.6" strokeDasharray="1.2,1.2" fill="none" />
            <circle cx="28" cy="18" r="0.9" fill="#EF4444" />
            <circle cx="48" cy="18" r="0.9" fill="#EF4444" />

            {/* Postcards pinned on wall */}
            <rect x="68" y="11" width="7" height="9" rx="0.3" transform="rotate(8 68 11)" fill="#FEF08A" stroke="#D97706" strokeWidth="0.3" />
            <rect x="78" y="14" width="8" height="6" rx="0.3" transform="rotate(-6 78 14)" fill="#BAE6FD" stroke="#0284C7" strokeWidth="0.3" />

            {/* Timber Floor */}
            <polygon points="0,56 100,56 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />

            {/* Open Vintage Suitcase on floor */}
            <g transform="translate(14, 48)">
              {/* Suitcase Base Lid */}
              <rect x="0" y="0" width="30" height="18" rx="2.5" fill="#78350F" stroke="#451A03" strokeWidth="0.8" />
              {/* Brass Corner Protectors */}
              <path d="M 0 3 L 3 0 L 0 0 Z" fill="#F59E0B" />
              <path d="M 30 3 L 27 0 L 30 0 Z" fill="#F59E0B" />
              <path d="M 0 15 L 3 18 L 0 18 Z" fill="#F59E0B" />
              <path d="M 30 15 L 27 18 L 30 18 Z" fill="#F59E0B" />
              {/* Folded pastel travel shirts inside */}
              <rect x="4" y="3" width="10" height="5" rx="1" fill="#FDE68A" />
              <rect x="15" y="3" width="11" height="5" rx="1" fill="#BAE6FD" />
              <rect x="4" y="9" width="12" height="5" rx="1" fill="#FBCFE8" />
              <rect x="17" y="9" width="9" height="5" rx="1" fill="#BBF7D0" />
              {/* Suitcase Leather Straps */}
              <line x1="8" y1="0" x2="8" y2="18" stroke="#451A03" strokeWidth="1" />
              <line x1="22" y1="0" x2="22" y2="18" stroke="#451A03" strokeWidth="1" />
            </g>

            {/* Travel Backpack leaning against wall */}
            <path d="M 72 44 C 72 36, 78 34, 82 34 C 86 34, 88 40, 88 56 L 72 56 Z" fill="#047857" stroke="#064E3B" strokeWidth="0.8" />
            <rect x="74" y="46" width="12" height="7" rx="1" fill="#059669" />
            <line x1="77" y1="36" x2="83" y2="36" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />

            {/* REALISTIC HUMAN CHARACTER: Girl kneeling/packing travel gear */}
            <g id="realistic-girl-travel">
              {/* Lower body: denim jeans, knees tucked on floor */}
              <path d="M 50 48 C 50 44, 56 42, 64 44 C 68 47, 68 56, 62 58 C 54 58, 48 54, 50 48 Z" fill={isDark ? "#1E293B" : "#334155"} />
              {/* Jean seam & pocket detailing */}
              <path d="M 54 50 Q 60 52 64 49" stroke={isDark ? "#0F172A" : "#1E293B"} strokeWidth="0.7" fill="none" />
              <path d="M 56 54 Q 60 56 64 54" stroke={isDark ? "#0F172A" : "#1E293B"} strokeWidth="0.6" fill="none" />

              {/* Upper Body: Casual Olive / Sage Linen Shirt */}
              <path
                d="M 52 42 C 51 36, 56 32, 63 34 L 66 46 L 50 48 Z"
                fill={isDark ? "#334155" : "#64748B"}
              />
              {/* Collar & rolled sleeve creases */}
              <path d="M 55 35 L 59 38 L 62 35" stroke="#CBD5E1" strokeWidth="0.6" fill="none" />
              <path d="M 54 41 Q 59 43 63 41" stroke={isDark ? "#1E293B" : "#475569"} strokeWidth="0.6" fill="none" />

              {/* Graceful Neck */}
              <path d="M 57 32 L 60 32 L 60 27 L 57 28 Z" fill="#E8B59B" />

              {/* Realistic Head & Facial Profile (3/4 Profile looking down at packing) */}
              <path
                d="M 57 23 C 58.5 23, 60.5 24, 61 25.5 C 61.8 26.2, 61.8 27.2, 61.2 27.8 C 61.5 28.5, 61 29.5, 60.2 29.8 C 59.4 30.6, 58 30.8, 56.5 30.5 C 55 30, 54.5 28.5, 54.5 26.5 C 54.5 24.5, 55.5 23, 57 23 Z"
                fill="#F7CEB7"
              />
              {/* Eyelid looking downward with eyelashes */}
              <path d="M 59 26 Q 60.2 26.6 60.5 27.2" stroke="#26140D" strokeWidth="0.45" strokeLinecap="round" fill="none" />
              {/* Rosy cheek */}
              <ellipse cx="58.8" cy="27.8" rx="1" ry="0.6" fill="#F472B6" opacity="0.35" />
              {/* Soft smile */}
              <path d="M 59.5 29 Q 60.2 29.4 59.6 29.8" stroke="#E11D48" strokeWidth="0.35" fill="none" />

              {/* Realistic High Ponytail with Scrunchie */}
              <path
                d="M 56.5 22.5 C 58.5 22.5, 60 23.5, 60.2 25 C 59.5 24.5, 57.5 24.8, 57 26 C 56 24.8, 54.5 25.5, 54.2 27 C 53.5 28.5, 53.5 29.8, 54.5 30.2 C 53.5 28.5, 53.2 26.8, 53.8 25 C 54.5 23.5, 55.5 22.5, 56.5 22.5 Z"
                fill="#2A1810"
              />
              {/* Terracotta Scrunchie */}
              <ellipse cx="53.5" cy="24.8" rx="1.4" ry="1.8" fill="#D97706" />
              {/* Ponytail bouncing back */}
              <path d="M 52.5 24.5 C 48 26, 46 31, 48 35 C 49 33, 49.5 29, 53 26 Z" fill="#2A1810" />
              <path d="M 52 25 Q 47 28 48 33" stroke="#3D2418" strokeWidth="0.6" fill="none" />

              {/* Realistic Arms & Hands holding Passport / Itinerary */}
              <path d="M 60 38 Q 54 44 48 44.5" stroke={isDark ? "#334155" : "#64748B"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Left hand holding passport */}
              <ellipse cx="48" cy="44" rx="1.2" ry="0.8" fill="#F7CEB7" />
              <path d="M 47.5 44 L 49.2 43.8" stroke="#E2A686" strokeWidth="0.4" strokeLinecap="round" />
              {/* Red Travel Passport */}
              <rect x="44" y="42" width="5.5" height="4.2" rx="0.5" fill="#DC2626" stroke="#991B1B" strokeWidth="0.3" />
              <circle cx="46.7" cy="44.1" r="0.8" fill="#FBBF24" />
            </g>

            {/* Retro 35mm Rangefinder Camera on Low Table / Floor */}
            <rect x="46" y="52" width="8" height="5" rx="0.8" fill="#18181B" stroke="#94A3B8" strokeWidth="0.5" />
            <circle cx="50" cy="54.5" r="1.8" fill="#475569" stroke="#E2E8F0" strokeWidth="0.4" />
            {/* Tan strap */}
            <path d="M 46 53 Q 42 56 46 58" stroke="#D97706" strokeWidth="0.6" fill="none" />

            {/* Warm room lamp glow */}
            <ellipse cx="60" cy="25" r="18" fill={`url(#lampRadialGlow_${windowInstanceId})`} opacity={isLit ? 0.85 : 0.4} />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 04: GETTING READY (PASSIVE)
            Girl in front of warm vanity mirror, hairbrush, skincare, clothes
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "getting-ready" && (
          <g id="scene-getting-ready">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#161122" : "#F8F1F9"} />
            
            {/* Hanging Clothes / Wardrobe rail on left */}
            <line x1="8" y1="16" x2="28" y2="16" stroke={isDark ? "#4B3D63" : "#C4B2DA"} strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 12 16 L 15 22 L 9 22 Z" fill="none" stroke="#D97706" strokeWidth="0.6" />
            <rect x="10" y="22" width="9" height="26" rx="1.5" fill={isDark ? "#4C1D95" : "#A855F7"} opacity="0.85" />
            <path d="M 22 16 L 25 22 L 19 22 Z" fill="none" stroke="#D97706" strokeWidth="0.6" />
            <rect x="20" y="22" width="8" height="22" rx="1.5" fill={isDark ? "#BE185D" : "#EC4899"} opacity="0.85" />

            {/* Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />

            {/* Vanity Table */}
            <rect x="42" y="44" width="46" height="4" rx="0.8" fill={isDark ? "#3A281E" : "#8A5C3C"} />
            <line x1="46" y1="48" x2="46" y2="70" stroke={isDark ? "#24160E" : "#5C3A24"} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="84" y1="48" x2="84" y2="70" stroke={isDark ? "#24160E" : "#5C3A24"} strokeWidth="1.8" strokeLinecap="round" />

            {/* Illuminated Arch Vanity Mirror */}
            <path d="M 52 44 L 52 24 C 52 14, 76 14, 76 24 L 76 44 Z" fill={isDark ? "#1C142E" : "#EAD9F2"} stroke="#FDE68A" strokeWidth="1.4" />
            {/* Mirror Glass Sheen */}
            <path d="M 54 43 L 54 25 C 54 17, 74 17, 74 25 L 74 43 Z" fill={isDark ? "#261D3B" : "#F5E8FB"} />
            {/* Vanity Bulbs around mirror frame */}
            <circle cx="52" cy="36" r="1.4" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />
            <circle cx="52" cy="26" r="1.4" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />
            <circle cx="64" cy="15" r="1.5" fill="#FEF08A" className="drop-shadow-[0_0_5px_#F59E0B]" />
            <circle cx="76" cy="26" r="1.4" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />
            <circle cx="76" cy="36" r="1.4" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />

            {/* REALISTIC HUMAN CHARACTER: Girl styling her hair in front of vanity mirror */}
            <g id="realistic-girl-vanity">
              {/* Seated Torso: Soft dusty rose satin camisole */}
              <path
                d="M 58 36 C 57 43, 60 48, 68 48 C 71 44, 70 36, 65 36 Z"
                fill={isDark ? "#9D174D" : "#F472B6"}
              />
              {/* Delicate shoulder straps */}
              <line x1="60" y1="36" x2="61" y2="33" stroke="#F472B6" strokeWidth="0.6" />
              <line x1="66" y1="36" x2="65" y2="33" stroke="#F472B6" strokeWidth="0.6" />

              {/* Graceful Neck & Collarbones */}
              <path d="M 61 34 L 65 34 L 65 29 L 61 29 Z" fill="#E8B59B" />
              <path d="M 60 35 Q 63 36.5 66 35" stroke="#D49A7D" strokeWidth="0.5" fill="none" />

              {/* Realistic Head in Profile toward Mirror */}
              <path
                d="M 61 24 C 62.5 24, 64 25, 64.6 26.5 C 65.2 27.2, 65.2 28.2, 64.8 28.8 C 65 29.5, 64.5 30.2, 63.8 30.5 C 63 31.2, 61.8 31.2, 60.5 30.8 C 59.5 30, 59 28.5, 59 26.5 C 59 24.5, 60 24, 61 24 Z"
                fill="#F7CEB7"
              />
              {/* Styled eye with delicate winged eyelash looking in mirror */}
              <path d="M 63.2 26.8 Q 64.2 27.2 64.6 26.8" stroke="#26140D" strokeWidth="0.45" strokeLinecap="round" fill="none" />
              {/* Lip contour */}
              <path d="M 64.2 29 Q 64.6 29.2 64.2 29.6" stroke="#E11D48" strokeWidth="0.4" fill="none" />
              {/* Rosy blush */}
              <ellipse cx="63.2" cy="28.2" rx="1.1" ry="0.7" fill="#FB7185" opacity="0.4" />

              {/* Realistic Long Waves of Hair Cascading Down Back & Over Shoulder */}
              <path
                d="M 60.5 23.5 C 62.5 23.5, 64 24.5, 64.2 26 C 63.5 25.5, 61.5 25.8, 61 27 C 60 25.5, 58.5 26, 58 27.5 C 57 29, 56 34, 57.5 44 C 58.5 48, 60 48, 60.5 45 C 59 39, 58.5 33, 60 27 Z"
                fill="#2A1810"
              />
              <path d="M 57.5 30 Q 56.5 37 58 44" stroke="#3D2418" strokeWidth="0.8" fill="none" />

              {/* Gracefully Raised Arm Holding Hairbrush */}
              <path d="M 67 39 Q 71 33 68 28.5" stroke="#F7CEB7" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Realistic Hand holding brush */}
              <ellipse cx="67.5" cy="28" rx="1.1" ry="0.8" fill="#F7CEB7" />
              {/* Wooden Hairbrush brushing hair */}
              <rect x="65" y="26.5" width="4.5" height="2.2" rx="0.6" fill="#D97706" stroke="#92400E" strokeWidth="0.4" transform="rotate(-15 65 26.5)" />
              <line x1="65" y1="28.5" x2="62" y2="29.5" stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" />
            </g>

            {/* Vanity Accessories: Perfume bottle, skincare jars */}
            <rect x="45" y="40" width="3" height="4" rx="0.4" fill="#F472B6" stroke="#DB2777" strokeWidth="0.3" />
            <circle cx="46.5" cy="39" r="0.8" fill="#FBBF24" />
            <rect x="50" y="41.5" width="4" height="2.5" rx="0.5" fill="#BAE6FD" />
            <rect x="78" y="39" width="3.5" height="5" rx="0.6" fill="#FDE68A" />

            {/* Warm Vanity Light Radiance */}
            <circle cx="64" cy="28" r="20" fill={`url(#lampRadialGlow_${windowInstanceId})`} opacity="0.65" />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 05: SLEEPING (PASSIVE)
            Cozy bedroom, girl sleeping peacefully under duvet, soft moonlight
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "sleeping" && (
          <g id="scene-sleeping">
            {/* Quiet deep midnight room */}
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#0A0814" : "#DDE5ED"} />

            {/* Soft Pale Moonlight Stream cutting through window */}
            <polygon points="10,0 45,0 85,75 25,75" fill={`url(#moonlightBeam_${windowInstanceId})`} />

            {/* Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={isDark ? "#120D1A" : "#8A94A6"} />

            {/* Bed Headboard */}
            <rect x="18" y="32" width="68" height="28" rx="2" fill={isDark ? "#1E182A" : "#64748B"} />
            <line x1="20" y1="36" x2="84" y2="36" stroke={isDark ? "#35284A" : "#94A3B8"} strokeWidth="1" />

            {/* Bed Mattress & Base */}
            <rect x="14" y="46" width="76" height="18" rx="2.5" fill={isDark ? "#171222" : "#475569"} />

            {/* Soft Fluffy Pillows with realistic natural indent */}
            <ellipse cx="32" cy="42" rx="11" ry="5.5" fill={isDark ? "#312E81" : "#E2E8F0"} />
            <ellipse cx="50" cy="42" rx="11" ry="5.5" fill={isDark ? "#3730A3" : "#F1F5F9"} />

            {/* REALISTIC HUMAN CHARACTER: Girl sleeping peacefully in bed */}
            <g id="realistic-girl-sleeping">
              {/* Natural head contour resting on pillow indent */}
              <path
                d="M 41 38 C 42.5 38, 44.5 39, 45 40.2 C 45.5 41, 45.2 42, 44.6 42.8 C 44 43.5, 42.8 44, 41.5 43.8 C 40 43.5, 39.5 42, 39.5 40.5 C 39.5 39, 40.2 38, 41 38 Z"
                fill="#F7CEB7"
              />
              {/* Delicate closed eyelids with soft eyelashes */}
              <path d="M 42.8 40.8 Q 44.2 41.4 44.8 40.8" stroke="#26140D" strokeWidth="0.45" strokeLinecap="round" fill="none" />
              {/* Soft peaceful lips */}
              <path d="M 43.5 42.5 Q 44.2 42.8 43.8 43.2" stroke="#E11D48" strokeWidth="0.35" fill="none" />
              {/* Soft rosy cheek in moonlight */}
              <ellipse cx="42.5" cy="41.8" rx="1.2" ry="0.7" fill="#F472B6" opacity="0.3" />

              {/* Realistic Hair spread gracefully over the pillow in natural waves */}
              <path
                d="M 37 36 C 35 41, 38 46, 43 45 C 41 45.5, 39 44, 38 42 C 37 40, 36.5 38, 37 36 Z"
                fill="#2A1810"
              />
              <path d="M 39 37 C 41 35, 45 36, 46 39 C 45 38, 43 37.5, 41 38 Z" fill="#3D2418" />
              <path d="M 35 38 Q 33 43 37 47" stroke="#2A1810" strokeWidth="0.8" fill="none" />
              <path d="M 38 36 Q 40 34 43 36" stroke="#45281E" strokeWidth="0.6" fill="none" />
              <path d="M 43 42 Q 44 44 46 45" stroke="#2A1810" strokeWidth="0.5" fill="none" />

              {/* Bare arm resting comfortably outside duvet */}
              <path d="M 42 45 Q 45 47 48 46.5" stroke="#F7CEB7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <ellipse cx="48.5" cy="46.5" rx="0.9" ry="0.7" fill="#F7CEB7" />
            </g>

            {/* Fluffy Duvet Blanket covering the bed with realistic draping & folds */}
            <path
              d="M 16 48 Q 30 43 48 45 Q 64 44 88 49 L 88 64 L 16 64 Z"
              fill={isDark ? "#2E2640" : "#CBD5E1"}
            />
            {/* Duvet fold highlights and shadows in moonlight */}
            <path d="M 20 51 Q 40 47 62 50 Q 76 49 86 53" stroke={isDark ? "#4C3D66" : "#E2E8F0"} strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 24 57 Q 50 53 82 56" stroke={isDark ? "#4C3D66" : "#E2E8F0"} strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 38 46 Q 44 49 48 47" stroke={isDark ? "#1E182A" : "#94A3B8"} strokeWidth="0.8" fill="none" />

            {/* Bedside Nightstand on Left */}
            <rect x="4" y="46" width="12" height="16" rx="1" fill={isDark ? "#1A1426" : "#475569"} />
            {/* Dim Bedside Lamp */}
            <path d="M 8 46 L 8 40 L 12 40 L 12 46" stroke="#D97706" strokeWidth="0.8" fill="none" />
            <path d="M 6 40 L 14 40 L 12 35 L 8 35 Z" fill={isDark ? "#3F3F46" : "#94A3B8"} />
            <circle cx="10" cy="38" r="1.5" fill="#FEF08A" opacity="0.6" />
            {/* Phone face down on nightstand */}
            <rect x="5.5" y="45.2" width="4" height="2" rx="0.3" fill="#0F172A" />

            {/* Moonlit dust motes */}
            <circle cx="34" cy="22" r="0.8" fill="#FFFFFF" opacity="0.6" />
            <circle cx="62" cy="18" r="0.6" fill="#FFFFFF" opacity="0.5" />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 06: WATCHING A MOVIE (PASSIVE)
            Dark room, TV screen glow, girl on couch with blanket & snacks
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "watching-movie" && (
          <g id="scene-watching-movie">
            {/* Deep Dark Room */}
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#06040A" : "#1E1A29"} />

            {/* Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={isDark ? "#0D0A14" : "#2E283F"} />

            {/* Wide TV Screen on wall or stand on Left */}
            <rect x="8" y="18" width="34" height="22" rx="1.5" fill="#020617" stroke="#334155" strokeWidth="0.8" />
            <rect x="9.5" y="19.5" width="31" height="19" rx="0.8" fill="#38BDF8" opacity="0.95" />
            {/* Cinematic scene on TV */}
            <path d="M 9.5 30 Q 20 22 30 28 L 40.5 24 L 40.5 38.5 L 9.5 38.5 Z" fill="#818CF8" />
            <circle cx="20" cy="24" r="3" fill="#FDE047" opacity="0.9" />

            {/* Dynamic Cinematic TV Beam Casting into the Room */}
            <polygon points="9.5,19.5 40.5,19.5 95,68 35,68" fill={`url(#screenCoolGlow_${windowInstanceId})`} opacity="0.85" />

            {/* Comfortable Living Room Sofa on Right */}
            <path d="M 52 40 C 50 32, 60 28, 86 28 C 92 28, 96 34, 94 48 L 94 62 L 48 62 Z" fill={isDark ? "#171224" : "#3B334E"} />
            <ellipse cx="72" cy="56" rx="20" ry="6" fill={isDark ? "#231B36" : "#4D4366"} />

            {/* REALISTIC HUMAN CHARACTER: Girl curled up on sofa watching movie */}
            <g id="realistic-girl-movie">
              {/* Cozy fleece throw blanket wrapped snugly around body & legs */}
              <path
                d="M 55 42 Q 68 37 80 43 Q 86 52 74 57 Q 56 59 55 42 Z"
                fill="#BE123C"
              />
              {/* Blanket folds and cozy creases */}
              <path d="M 57 44 Q 68 40 78 45" stroke="#E11D48" strokeWidth="1" fill="none" />
              <path d="M 60 50 Q 70 48 76 53" stroke="#9F1239" strokeWidth="0.8" fill="none" />

              {/* Head turned watching movie screen */}
              {/* Realistic face contour illuminated by cool blue TV glow */}
              <path
                d="M 62 33 C 63.5 33, 65 34, 65.5 35.5 C 66 36.2, 65.8 37.2, 65.2 37.8 C 65.5 38.5, 65 39.2, 64.2 39.5 C 63.5 40.2, 62 40.2, 61 39.8 C 60 39, 59.5 37.5, 59.5 35.5 C 59.5 33.5, 60.5 33, 62 33 Z"
                fill="#F7CEB7"
              />
              {/* Cool TV highlight on face */}
              <path d="M 60 34 Q 60 38 61 39" stroke="#BAE6FD" strokeWidth="0.6" fill="none" />
              {/* Eye intently focused on TV screen */}
              <circle cx="61.2" cy="35.6" r="0.6" fill="#0F172A" />
              <circle cx="61.4" cy="35.4" r="0.25" fill="#BAE6FD" />
              {/* Soft smile reacting to the film */}
              <path d="M 61.2 38.2 Q 62 38.6 62.8 38.2" stroke="#E11D48" strokeWidth="0.4" fill="none" />

              {/* Realistic Hair resting comfortably against sofa cushion */}
              <path
                d="M 63 32.5 C 65 32.5, 66.5 33.5, 66.8 35 C 67.5 38, 66 43, 64 45 C 63 43, 64 38, 62 36 Z"
                fill="#2A1810"
              />
              <path d="M 64 33 Q 66 37 65 42" stroke="#3D2418" strokeWidth="0.7" fill="none" />

              {/* Hand reaching out from blanket holding popcorn */}
              <path d="M 55 45 Q 52 48 48 49" stroke="#F7CEB7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <ellipse cx="48" cy="49" rx="1.1" ry="0.8" fill="#F7CEB7" />
              <circle cx="47.5" cy="48.5" r="0.6" fill="#FEF08A" />
            </g>

            {/* Low Coffee Table with Bowl of Popcorn / Snacks */}
            <polygon points="40,54 62,54 58,64 36,64" fill={isDark ? "#1E162B" : "#4A3F61"} />
            {/* Popcorn Bowl */}
            <ellipse cx="48" cy="53" rx="4.5" ry="2.5" fill="#DC2626" />
            {/* Puffed yellow popcorn kernels */}
            <circle cx="46" cy="51.5" r="1.2" fill="#FEF08A" />
            <circle cx="48.5" cy="51" r="1.3" fill="#FEF08A" />
            <circle cx="50" cy="52" r="1.1" fill="#FEF08A" />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 07: FOOD + COLD COFFEE (INTERACTIVE 04)
            Girl enjoying casual yummy meal & tall iced coffee with straw
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "food-cold-coffee" && (
          <g id="scene-food-cold-coffee">
            {/* Cozy Cafe / Dining Nook Wall */}
            <rect x="0" y="0" width="100" height="75" fill={isDark ? (isLit ? "#1F1822" : "#0D0A14") : (isLit ? "#FAF2E8" : "#E2D8E8")} />

            {/* Floor */}
            <polygon points="0,56 100,56 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />

            {/* Cafe Artwork on rear wall */}
            <rect x="12" y="10" width="22" height="16" rx="1" fill={isDark ? "#1C1424" : "#F5EBE1"} stroke={isDark ? "#5C4533" : "#CDB8A5"} strokeWidth="0.8" />
            <circle cx="23" cy="18" r="4.5" fill="#F59E0B" opacity="0.85" />
            <path d="M 16 22 Q 23 18 30 22" stroke="#B45309" strokeWidth="0.8" fill="none" />

            {/* Hanging Vintage Brass Cafe Pendant Lamp */}
            <line x1="56" y1="0" x2="56" y2="18" stroke="#D97706" strokeWidth="0.8" />
            <path d="M 48 18 C 48 13, 64 13, 64 18 Z" fill="#D97706" stroke="#92400E" strokeWidth="0.5" />
            <circle cx="56" cy="19.5" r="2" fill="#FEF08A" className="drop-shadow-[0_0_8px_#F59E0B]" />
            {/* Warm Cafe Pendant Light Cone illuminating table */}
            <polygon points="56,18 10,75 95,75" fill={`url(#lampRadialGlow_${windowInstanceId})`} opacity={isLit ? 0.95 : 0.6} />

            {/* Cafe Table (Round timber pedestal table) */}
            <ellipse cx="52" cy="48" rx="34" ry="9" fill={isDark ? "#452C1E" : "#9C6B47"} stroke="#FDE68A" strokeWidth="0.6" />
            <polygon points="18,48 86,48 84,53 20,53" fill={isDark ? "#29180E" : "#634028"} />
            <line x1="52" y1="53" x2="52" y2="70" stroke={isDark ? "#1A0E08" : "#4A2B18"} strokeWidth="4.5" strokeLinecap="round" />

            {/* REALISTIC HUMAN CHARACTER: Girl enjoying delicious meal & iced coffee */}
            <g id="realistic-girl-cafe">
              {/* Seated Torso & Clothing: Warm Terracotta & Cream Striped Knit */}
              <path
                d="M 20 45 C 19 38, 24 34, 32 35 L 35 48 L 19 49 Z"
                fill={isDark ? "#C2410C" : "#EA580C"}
              />
              {/* Chic horizontal shirt stripes */}
              <path d="M 21 38 Q 26 40 31 38" stroke="#FFFDF5" strokeWidth="1" fill="none" opacity="0.9" />
              <path d="M 20 42 Q 26 44 33 42" stroke="#FFFDF5" strokeWidth="1" fill="none" opacity="0.9" />
              <path d="M 20 46 Q 26 48 34 46" stroke="#FFFDF5" strokeWidth="1" fill="none" opacity="0.9" />

              {/* Graceful Neck */}
              <path d="M 26 34 L 29 34 L 29 29 L 26 29 Z" fill="#E8B59B" />

              {/* Realistic Head & Facial Profile in 3/4 View */}
              <path
                d="M 26 24 C 27.5 24, 29.5 25, 30 26.5 C 30.8 27.2, 30.8 28.2, 30.2 28.8 C 30.5 29.5, 30 30.5, 29.2 30.8 C 28.5 31.4, 27 31.5, 25.5 31.2 C 24 30.5, 23.5 29, 23.5 27 C 23.5 25, 24.5 24, 26 24 Z"
                fill="#F7CEB7"
              />
              {/* Happy, lively eye looking toward table */}
              <circle cx="28.2" cy="27" r="0.6" fill="#1C1426" />
              <circle cx="28.4" cy="26.8" r="0.25" fill="#FFFFFF" />
              {/* Soft winged eyelash */}
              <path d="M 27.8 26.5 Q 28.6 26.2 29 26.6" stroke="#26140D" strokeWidth="0.4" fill="none" />
              {/* Rosy warm cheek */}
              <ellipse cx="27.8" cy="28.2" rx="1.2" ry="0.7" fill="#F472B6" opacity="0.4" />
              {/* Delightful warm smile enjoying food */}
              <path d="M 28.5 29.5 Q 29.5 30.2 30.2 29.4" stroke="#BE123C" strokeWidth="0.5" strokeLinecap="round" fill="none" />

              {/* Realistic Wavy Brunette Hair falling over shoulders */}
              <path
                d="M 25.5 23.5 C 27.5 23.5, 29 24.5, 29.5 26 C 28.5 25.5, 26.8 25.8, 26 27 C 25 25.5, 23.5 26, 23 27.5 C 22 29, 21.5 34, 22.5 42 C 23.5 45, 25 45, 25.5 42 C 24 37, 24 32, 25 27 Z"
                fill="#2A1810"
              />
              <path d="M 22.5 28 Q 21.5 35 23 42" stroke="#3D2418" strokeWidth="0.8" fill="none" />

              {/* Realistic Arm & Hand resting naturally on table */}
              <path d="M 26 40 Q 32 43 38 45.5" stroke={isDark ? "#C2410C" : "#EA580C"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Hand with delicate fingers resting next to plate */}
              <ellipse cx="38.5" cy="45.5" rx="1.2" ry="0.8" fill="#F7CEB7" />
              <path d="M 38 45 L 39.8 45.2" stroke="#E2A686" strokeWidth="0.4" strokeLinecap="round" />
            </g>

            {/* ━━━━ YUMMY FOOD & TALL ICED COLD COFFEE ON TABLE ━━━━ */}
            {/* 1. Gourmet Burger / Meal on plate */}
            <ellipse cx="44" cy="46" rx="8" ry="3.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
            {/* Burger Bottom Bun */}
            <path d="M 39 46 Q 44 47 49 46 L 49 45 L 39 45 Z" fill="#D97706" />
            {/* Patty & Melted Cheese */}
            <rect x="38.5" y="43.5" width="11" height="1.5" rx="0.4" fill="#451A03" />
            <path d="M 39 44 L 43 45 L 47 44 L 49 45" stroke="#FBBF24" strokeWidth="0.8" fill="none" />
            {/* Fresh Green Lettuce */}
            <path d="M 38 43 Q 44 41.5 50 43" stroke="#22C55E" strokeWidth="0.9" fill="none" />
            {/* Burger Top Sesame Bun */}
            <path d="M 38.5 43 Q 44 38 49.5 43 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="0.3" />
            <circle cx="43" cy="41" r="0.3" fill="#FFFFFF" />
            <circle cx="45" cy="40.5" r="0.3" fill="#FFFFFF" />

            {/* 2. TALL ICED COLD COFFEE CUP WITH STRAW (Jessica's favorite!) */}
            <g transform="translate(62, 33)">
              {/* Cup Drop Shadow */}
              <ellipse cx="6" cy="15" rx="5" ry="1.4" fill="#000000" opacity="0.4" />
              {/* Clear Plastic Tapered Cup */}
              <polygon points="1.5,0 10.5,0 8.8,14.5 3.2,14.5" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
              {/* Layered Rich Cold Brew & Milk Liquid */}
              <polygon points="2,3 10,3 8.6,14.2 3.4,14.2" fill="#633211" />
              {/* Creamy Swirl Layer */}
              <polygon points="2,3 10,3 9.4,7.5 2.6,7.5" fill="#E6A15C" />
              {/* Crystal Ice Cubes floating inside */}
              <rect x="3.5" y="3.5" width="2.4" height="2.2" rx="0.4" fill="#FFFFFF" opacity="0.85" />
              <rect x="6.2" y="4" width="2.4" height="2.2" rx="0.4" fill="#FFFFFF" opacity="0.75" />
              <rect x="4.5" y="6.5" width="2.6" height="2.4" rx="0.4" fill="#E2E8F0" opacity="0.7" />
              {/* Clear Domed / Flat Plastic Lid Rim */}
              <rect x="0.8" y="-0.8" width="10.4" height="1.6" rx="0.6" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="0.4" />
              {/* Angled Black Straw extending out */}
              <line x1="6" y1="0" x2="3.5" y2="-6" stroke="#09090B" strokeWidth="0.9" strokeLinecap="round" />
            </g>

            {/* Smartphone lying flat beside food */}
            <rect x="74" y="45" width="4.5" height="7" rx="0.6" transform="rotate(12 74 45)" fill="#18181B" stroke="#475569" strokeWidth="0.4" />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 08: READING A NOVEL (PASSIVE)
            Architectural lounge armchair, arched brass floor lamp, novel, cozy book nook
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "reading-novel" && (
          <g id="scene-reading-novel">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#14101E" : "#F4EDFA"} />
            
            {/* Minimalist Art Frame on Wall */}
            <rect x="14" y="10" width="18" height="22" rx="0.8" fill={isDark ? "#1A1526" : "#EDE5F3"} stroke={isDark ? "#382950" : "#CDBADA"} strokeWidth="0.8" />
            <ellipse cx="23" cy="21" rx="5" ry="7" fill={isDark ? "#281D3D" : "#DECBEF"} />
            <path d="M 19 25 C 21 21, 25 21, 27 25" stroke={isDark ? "#4C3866" : "#A78BFA"} strokeWidth="0.8" fill="none" />

            {/* Parquet / Wood Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />
            
            {/* Textured Circular Scandinavian Wool Rug with fringe border */}
            <ellipse cx="48" cy="65" rx="34" ry="7" fill={isDark ? "#251B35" : "#D8C7E7"} />
            <ellipse cx="48" cy="65" rx="31" ry="5.8" fill={isDark ? "#2E2140" : "#E4D6EF"} />
            <ellipse cx="48" cy="65" rx="27" ry="4.8" fill="none" stroke={isDark ? "#44325C" : "#C4B0DB"} strokeWidth="0.6" strokeDasharray="1.5 1.5" />

            {/* ─── ARCHITECTURAL MID-CENTURY READING LOUNGE CHAIR ─── */}
            <g id="architectural-reading-chair">
              {/* Splayed Solid Walnut Tapered Legs with Golden Brass Tips */}
              {/* Rear Legs */}
              <line x1="33" y1="52" x2="28" y2="65" stroke={isDark ? "#22140C" : "#3E2211"} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="28.8" y1="63" x2="28" y2="65" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="67" y1="52" x2="72" y2="65" stroke={isDark ? "#22140C" : "#3E2211"} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="71.2" y1="63" x2="72" y2="65" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
              
              {/* Front Legs with warm cast shadow */}
              <line x1="32" y1="56" x2="29" y2="68" stroke={isDark ? "#381E0D" : "#593318"} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="29.6" y1="65.5" x2="29" y2="68" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="68" y1="56" x2="71" y2="68" stroke={isDark ? "#381E0D" : "#593318"} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="70.4" y1="65.5" x2="71" y2="68" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />

              {/* Wooden Sub-Frame Stretcher */}
              <path d="M 31 56 L 69 56" stroke={isDark ? "#2B160A" : "#4A2813"} strokeWidth="1.6" strokeLinecap="round" />

              {/* Wingback Lounge Backrest Shell (Rich Cognac Saddle Leather) */}
              <path
                d="M 32 48 C 29 36, 27 26, 26 22 C 26 19, 32 17, 50 17 C 68 17, 74 19, 74 22 C 73 26, 71 36, 68 48 Z"
                fill={isDark ? "#7C2D12" : "#B45309"}
              />
              {/* Wingback Sculpted Flares (Left & Right Wings with soft shadow) */}
              <path
                d="M 26 22 C 24 25, 25 34, 29 44 C 31 38, 30 28, 32 20 C 28 19, 26 20, 26 22 Z"
                fill={isDark ? "#62230E" : "#92400E"}
              />
              <path
                d="M 74 22 C 76 25, 75 34, 71 44 C 69 38, 70 28, 68 20 C 72 19, 74 20, 74 22 Z"
                fill={isDark ? "#62230E" : "#92400E"}
              />

              {/* Inner Backrest Channel Tufting & Tailored Seams */}
              <path d="M 43 19 C 42 27, 41 38, 41 47" stroke={isDark ? "#431407" : "#78350F"} strokeWidth="0.9" fill="none" opacity="0.6" />
              <path d="M 50 18 C 50 26, 50 38, 50 47" stroke={isDark ? "#431407" : "#78350F"} strokeWidth="0.9" fill="none" opacity="0.6" />
              <path d="M 57 19 C 58 27, 59 38, 59 47" stroke={isDark ? "#431407" : "#78350F"} strokeWidth="0.9" fill="none" opacity="0.6" />

              {/* Plush Ergonomic Seat Cushion */}
              <ellipse cx="50" cy="52" rx="20" ry="6.2" fill={isDark ? "#9A3412" : "#D97706"} />
              <ellipse cx="50" cy="51" rx="19" ry="5.4" fill={isDark ? "#B45309" : "#F59E0B"} opacity="0.35" />
              {/* Cushion Front Welted Piping & Drop Shadow */}
              <path d="M 31 52 Q 50 58 69 52" stroke={isDark ? "#451A03" : "#78350F"} strokeWidth="1.2" fill="none" />
              <path d="M 31 53 Q 50 59 69 53" stroke={isDark ? "#270E02" : "#451A03"} strokeWidth="0.8" fill="none" opacity="0.6" />

              {/* Ergonomic Curved Armrests */}
              {/* Left Armrest */}
              <path d="M 28 38 C 26 43, 27 50, 31 52 C 34 52, 33 46, 32 38 Z" fill={isDark ? "#9A3412" : "#C2410C"} />
              <path d="M 27 48 Q 29 53 32 52" stroke="#FBBF24" strokeWidth="0.6" fill="none" opacity="0.4" />
              {/* Right Armrest */}
              <path d="M 72 38 C 74 43, 73 50, 69 52 C 66 52, 67 46, 68 38 Z" fill={isDark ? "#9A3412" : "#C2410C"} />
              <path d="M 73 48 Q 71 53 68 52" stroke="#FBBF24" strokeWidth="0.6" fill="none" opacity="0.4" />

              {/* Cozy Draped Boucle Throw Blanket on Left Armrest with soft fringe */}
              <path
                d="M 26 36 C 27 34, 30 36, 30 40 C 30 46, 27 49, 26 55 C 25 58, 28 59, 29 56 C 30 52, 32 46, 32 42 Z"
                fill={isDark ? "#3F3746" : "#FAF5FF"}
                stroke={isDark ? "#2A2330" : "#E9D5FF"}
                strokeWidth="0.4"
              />
              {/* Fringe tassels on throw */}
              <line x1="25.5" y1="57" x2="25" y2="59.5" stroke={isDark ? "#71657A" : "#D8B4FE"} strokeWidth="0.5" />
              <line x1="27" y1="58" x2="26.8" y2="60.5" stroke={isDark ? "#71657A" : "#D8B4FE"} strokeWidth="0.5" />
              <line x1="28.5" y1="57.5" x2="28.5" y2="60" stroke={isDark ? "#71657A" : "#D8B4FE"} strokeWidth="0.5" />
            </g>

            {/* REALISTIC HUMAN CHARACTER: Girl immersed in reading novel */}
            <g id="realistic-girl-reading">
              {/* Relaxed Lower Body tucked in armchair */}
              <path
                d="M 37 47 C 35 52, 42 56, 54 56 C 63 56, 64 50, 58 47 Z"
                fill={isDark ? "#1E293B" : "#475569"}
              />
              {/* Cozy Pant Fabric folds */}
              <path d="M 40 50 Q 48 54 56 51" stroke={isDark ? "#0F172A" : "#334155"} strokeWidth="0.7" fill="none" />

              {/* Cozy Dark Forest Green Cable-Knit Cardigan */}
              <path
                d="M 39 37 C 38 44, 43 49, 53 49 C 60 49, 61 42, 57 37 Z"
                fill={isDark ? "#064E3B" : "#059669"}
              />
              {/* Cardigan cable-knit texture & button placket */}
              <line x1="47.5" y1="38" x2="47.5" y2="48" stroke={isDark ? "#022C22" : "#047857"} strokeWidth="0.8" />
              <circle cx="47.5" cy="41" r="0.55" fill="#D97706" />
              <circle cx="47.5" cy="45" r="0.55" fill="#D97706" />
              <path d="M 43 40 Q 44 45 43 48" stroke={isDark ? "#022C22" : "#047857"} strokeWidth="0.45" fill="none" />
              <path d="M 52 40 Q 51 45 52 48" stroke={isDark ? "#022C22" : "#047857"} strokeWidth="0.45" fill="none" />

              {/* Graceful Neck inclined gently forward */}
              <path d="M 46 36 L 49.5 36 L 49 30.5 L 46 31.5 Z" fill="#E8B59B" />

              {/* Realistic Head inclined toward the novel */}
              <path
                d="M 46.5 24 C 48 24, 49.5 25, 50 26.5 C 50.8 27.2, 50.6 28.2, 50.2 28.8 C 50.5 29.5, 50 30.5, 49.2 30.8 C 48.5 31.4, 47 31.5, 45.8 31 C 44.5 30.2, 44 28.5, 44 27 C 44 25, 45 24, 46.5 24 Z"
                fill="#F7CEB7"
              />
              {/* Reading Eyeglasses with slender tortoiseshell / brass frames */}
              <rect x="47.5" y="26.2" width="2.6" height="2" rx="0.5" fill="none" stroke="#D97706" strokeWidth="0.45" />
              <line x1="46" y1="26.8" x2="47.5" y2="26.8" stroke="#D97706" strokeWidth="0.4" />
              {/* Concentrated eye looking down at page through glasses */}
              <circle cx="48.8" cy="27.4" r="0.45" fill="#1C1426" />
              {/* Rosy cheek & thoughtful gentle lips */}
              <ellipse cx="48.2" cy="28.8" rx="1" ry="0.6" fill="#F472B6" opacity="0.4" />
              <path d="M 48.6 30 Q 49.4 30.2 49 30.6" stroke="#BE123C" strokeWidth="0.4" fill="none" />

              {/* Realistic Dark Brunette Hair pinned softly back */}
              <path
                d="M 46 23.5 C 48 23.5, 49.5 24.5, 50 26 C 49 25.5, 47.5 25.8, 47 27 C 46 25.5, 44.5 26, 44 27.5 C 43 29, 42.5 33, 44 38 C 44.5 35, 45 31, 46 27 Z"
                fill="#2A1810"
              />
              <path d="M 43.5 29 Q 43 35 44.5 39" stroke="#3D2418" strokeWidth="0.7" fill="none" />
              {/* Hair highlights reflecting the warm overhead lamp */}
              <path d="M 46.5 24 C 48 24.2, 49 25, 49.5 26" stroke="#78350F" strokeWidth="0.5" fill="none" />

              {/* Realistic Forearms & Hands holding Hardcover Book */}
              <path d="M 41 41 Q 43 45 46.5 46" stroke={isDark ? "#064E3B" : "#059669"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M 54 41 Q 52 45 49 46" stroke={isDark ? "#064E3B" : "#059669"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Realistic Fingers supporting the open book */}
              <ellipse cx="45" cy="46" rx="1.1" ry="0.8" fill="#F7CEB7" />
              <ellipse cx="50.8" cy="46" rx="1.1" ry="0.8" fill="#F7CEB7" />
            </g>
            
            {/* Open Hardcover Book in hands */}
            <g transform="translate(42, 40)">
              {/* Hardcover Outer Binding visible at edges */}
              <polygon points="7.8,-0.4 -0.4,1.8 0.6,8.4 8,6.4" fill="#991B1B" />
              <polygon points="8.2,-0.4 16.4,1.8 15.4,8.4 8,6.4" fill="#991B1B" />
              {/* Cream Paper Pages */}
              <polygon points="8,0 0,2 1,8 8,6" fill="#FFFDF5" stroke="#E2E8F0" strokeWidth="0.3" />
              <polygon points="8,0 16,2 15,8 8,6" fill="#FFFDF5" stroke="#E2E8F0" strokeWidth="0.3" />
              {/* Ribbon Bookmark trailing down */}
              <path d="M 8 0 Q 7.5 4 8 7 Q 8.5 9 8.2 10.5" stroke="#DC2626" strokeWidth="0.4" fill="none" />
              {/* Spine Stitch */}
              <line x1="8" y1="0" x2="8" y2="6" stroke="#7F1D1D" strokeWidth="0.6" />
              {/* Typography lines */}
              <line x1="2.2" y1="3.5" x2="6.6" y2="2.5" stroke="#71717A" strokeWidth="0.35" />
              <line x1="2.2" y1="5" x2="6.6" y2="4" stroke="#71717A" strokeWidth="0.35" />
              <line x1="9.4" y1="2.5" x2="13.8" y2="3.5" stroke="#71717A" strokeWidth="0.35" />
              <line x1="9.4" y1="4" x2="13.8" y2="5" stroke="#71717A" strokeWidth="0.35" />
            </g>

            {/* Mid-Century Petite Pedestal Side Table */}
            <g id="reading-side-table">
              {/* Cast shadow under table */}
              <ellipse cx="78" cy="65.5" rx="5.5" ry="1.2" fill={isDark ? "#0A0512" : "#3B2252"} opacity="0.3" />
              {/* Brass Tripod/Disc Base */}
              <ellipse cx="78" cy="65" rx="4.5" ry="1.2" fill="#B45309" />
              <ellipse cx="78" cy="64.6" rx="3.8" ry="0.9" fill="#F59E0B" />
              {/* Slender Brass Pedestal Stem */}
              <line x1="78" y1="64.6" x2="78" y2="51" stroke="#F59E0B" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="77.8" y1="64" x2="77.8" y2="51" stroke="#FDE68A" strokeWidth="0.4" />
              {/* Solid Walnut Round Tabletop */}
              <ellipse cx="78" cy="51" rx="6.5" ry="2" fill="#5D4037" />
              <ellipse cx="78" cy="50.5" rx="6.2" ry="1.8" fill="#795548" />
              <ellipse cx="78" cy="50.2" rx="5.8" ry="1.5" fill="#8D6E63" />

              {/* Ceramic Mug of Herbal Tea with Gentle Rising Steam */}
              <rect x="75" y="46.5" width="2.8" height="3.2" rx="0.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.3" />
              {/* Mug handle */}
              <path d="M 77.8 47.5 Q 78.8 48 77.8 49" stroke="#E2E8F0" strokeWidth="0.45" fill="none" />
              {/* Tea surface */}
              <ellipse cx="76.4" cy="46.5" rx="1.2" ry="0.4" fill="#B45309" />
              {/* Subtle gentle steam curls */}
              <motion.path
                d="M 76 45 Q 75.5 43 76.5 41"
                stroke="#FEF08A"
                strokeWidth="0.4"
                strokeLinecap="round"
                fill="none"
                opacity={isLit ? 0.6 : 0.25}
                animate={{ y: [0, -1.5, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Stacked Hardcover Books on Table */}
              <rect x="74" y="49.5" width="4.5" height="1" rx="0.2" fill="#1E3A8A" />
              <rect x="74.2" y="48.7" width="4.2" height="0.8" rx="0.2" fill="#047857" />
            </g>

            {/* ─── ARCHITECTURAL ARCHED BRASS READING FLOOR LAMP ─── */}
            <g id="architectural-floor-lamp">
              {/* Cast shadow under heavy marble base */}
              <ellipse cx="84" cy="67" rx="6.5" ry="1.6" fill={isDark ? "#0A0512" : "#2E1B40"} opacity="0.4" />
              
              {/* Weighted Cylindrical Marble/Brass Plinth Base */}
              <rect x="80" y="63.5" width="8" height="2.5" rx="0.6" fill="#451A03" />
              <rect x="80.2" y="63" width="7.6" height="1.2" rx="0.4" fill="#B45309" />
              <line x1="81" y1="63.2" x2="87" y2="63.2" stroke="#FDE68A" strokeWidth="0.5" />
              
              {/* Vertical Base Socket Collar with knurled lock ring */}
              <rect x="83.2" y="61.5" width="1.6" height="2" rx="0.3" fill="#F59E0B" stroke="#78350F" strokeWidth="0.3" />

              {/* Sweeping Slender Arch Stem (Flos Arco / Architectural Cantilever) */}
              {/* Dark metallic shadow outline for rich depth */}
              <path
                d="M 84 61.5 L 84 32 C 84 15, 74 10, 62 10 C 56 10, 52 12, 50 15"
                stroke={isDark ? "#78350F" : "#92400E"}
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              {/* Gleaming Polished Brass Highlight along the arch */}
              <path
                d="M 84 61.5 L 84 32 C 84 15, 74 10, 62 10 C 56 10, 52 12, 50 15"
                stroke="#FBBF24"
                strokeWidth="1.1"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 83.7 61.5 L 83.7 32 C 83.7 15.5, 73.8 10.5, 62 10.5 C 56.2 10.5, 52.3 12.3, 50.3 15"
                stroke="#FEF08A"
                strokeWidth="0.4"
                fill="none"
                strokeLinecap="round"
              />

              {/* Telescopic Brass Adjustment Knuckle / Thumbscrew at mid-height */}
              <rect x="83" y="32" width="2" height="1.4" rx="0.3" fill="#D97706" />
              <circle cx="85.5" cy="32.7" r="0.6" fill="#FDE68A" />

              {/* Swivel Elbow Fixture & Finial Screw */}
              <circle cx="50" cy="15" r="1.1" fill="#B45309" />
              <circle cx="50" cy="15" r="0.7" fill="#FDE68A" />
              <line x1="50" y1="15" x2="49.5" y2="17.5" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />

              {/* Architectural Dome Shade: Matte Gunmetal with Polished Brass Trim */}
              {/* Outer Dome Shade */}
              <path
                d="M 45 19 C 45 16.5, 47 16, 49.5 16 C 52 16, 54 16.5, 54 19 L 55 21 L 44 21 Z"
                fill={isDark ? "#18181B" : "#27272A"}
                stroke="#B45309"
                strokeWidth="0.5"
              />
              {/* Spun Brass Beveled Rim */}
              <ellipse cx="49.5" cy="21" rx="5.5" ry="1.2" fill="#D97706" />
              {/* Polished Radiant Gold Inner Reflector */}
              <ellipse cx="49.5" cy="21.2" rx="4.8" ry="0.9" fill="#FEF08A" />

              {/* Glowing Warm Edison Filament Bulb */}
              <circle cx="49.5" cy="22" r="1.8" fill="#FFFBEB" />
              <circle cx="49.5" cy="22" r="1.2" fill="#FEF08A" />

              {/* Atmospheric Soft Volumetric Reading Light Beam (Gentle gradient, no harsh edges!) */}
              <polygon
                points="49.5,22 26,58 73,58"
                fill={`url(#readingLampCone_${windowInstanceId})`}
                opacity={isLit ? 0.95 : 0.4}
              />
              {/* Radiant Warm Ambient Bloom at Lamp Head */}
              <circle
                cx="49.5"
                cy="22"
                r="11"
                fill={`url(#lampRadialGlow_${windowInstanceId})`}
                opacity={isLit ? 0.85 : 0.35}
              />
              {/* Soft Golden Light Pool over book & armchair */}
              <ellipse
                cx="49.5"
                cy="46"
                rx="14"
                ry="7"
                fill={`url(#lampRadialGlow_${windowInstanceId})`}
                opacity={isLit ? 0.6 : 0.2}
              />
            </g>
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 09: PLANT CARE / INDOOR BOTANICAL (PASSIVE)
            Watering can, monstera, trailing ivy, fresh green vitality
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "plant-care" && (
          <g id="scene-plant-care">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#0F1713" : "#EDF7F1"} />
            
            {/* Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />

            {/* Hanging Macrame Pothos Ivy from top ceiling */}
            <line x1="22" y1="0" x2="22" y2="16" stroke="#D97706" strokeWidth="0.7" />
            <path d="M 16 16 C 16 21 28 21 28 16 Z" fill="#C2410C" />
            <path d="M 18 20 Q 14 26 16 34" stroke="#10B981" strokeWidth="1" fill="none" />
            <path d="M 24 20 Q 28 26 26 36" stroke="#34D399" strokeWidth="1" fill="none" />
            <circle cx="15" cy="24" r="1.8" fill="#059669" />
            <circle cx="16" cy="30" r="1.6" fill="#10B981" />
            <circle cx="27" cy="25" r="1.8" fill="#34D399" />
            <circle cx="25" cy="32" r="1.6" fill="#059669" />

            {/* Big Potted Monstera Deliciosa on right */}
            <polygon points="74,54 88,54 85,68 77,68" fill="#9A3412" stroke="#7C2D12" strokeWidth="0.6" />
            <rect x="73" y="52" width="16" height="3" rx="0.8" fill="#C2410C" />
            {/* Monstera Stems & Broad Split Leaves */}
            <path d="M 81 52 Q 76 38 68 32" stroke="#059669" strokeWidth="1.6" fill="none" />
            <path d="M 81 52 Q 84 36 86 28" stroke="#059669" strokeWidth="1.6" fill="none" />
            <path d="M 81 52 Q 88 40 94 36" stroke="#059669" strokeWidth="1.6" fill="none" />
            <ellipse cx="68" cy="32" rx="7" ry="5.5" fill="#047857" transform="rotate(-20 68 32)" />
            <ellipse cx="86" cy="28" rx="8" ry="6" fill="#059669" transform="rotate(10 86 28)" />
            <ellipse cx="94" cy="36" rx="6.5" ry="5" fill="#10B981" transform="rotate(30 94 36)" />

            {/* REALISTIC HUMAN CHARACTER: Girl caring for houseplants */}
            <g id="realistic-girl-plant">
              {/* Lower body: Comfortable linen culottes */}
              <path d="M 44 48 L 52 48 L 54 66 L 43 66 Z" fill={isDark ? "#1E293B" : "#475569"} />

              {/* Upper body: Casual denim/linen button-down shirt & florist apron */}
              <path
                d="M 42 38 C 40 46, 44 52, 53 52 L 55 41 Z"
                fill={isDark ? "#0284C7" : "#0369A1"}
              />
              {/* Florist cross-back apron in warm tan canvas */}
              <path d="M 44 40 L 51 40 L 52 52 L 44 52 Z" fill="#D97706" opacity="0.9" />

              {/* Graceful Neck */}
              <path d="M 46 34 L 49 34 L 49 29 L 46 29 Z" fill="#E8B59B" />

              {/* Realistic Head in Profile smiling at plant */}
              <path
                d="M 46 24 C 47.5 24, 49 25, 49.6 26.5 C 50.2 27.2, 50.2 28.2, 49.8 28.8 C 50 29.5, 49.5 30.2, 48.8 30.5 C 48 31.2, 47 31.2, 45.8 30.8 C 44.5 30, 44 28.5, 44 26.5 C 44 24.5, 45 24, 46 24 Z"
                fill="#F7CEB7"
              />
              {/* Gentle caring eye */}
              <circle cx="48.2" cy="27" r="0.5" fill="#1C1426" />
              {/* Affectionate smile */}
              <path d="M 48.2 29.5 Q 49 30 49.6 29.5" stroke="#BE123C" strokeWidth="0.45" fill="none" />
              <ellipse cx="47.8" cy="28.2" rx="1" ry="0.6" fill="#F472B6" opacity="0.35" />

              {/* Realistic Messy Updo Bun with Hairpin */}
              <path
                d="M 45.5 23.5 C 47.5 23.5, 49 24.5, 49.2 26 C 48.5 25.5, 46.8 25.8, 46 27 C 45 25.5, 43.5 26, 43 27.5 C 42 29, 41.5 33, 42.5 37 C 43.5 35, 44 31, 45 27 Z"
                fill="#2A1810"
              />
              <circle cx="44" cy="23" r="2" fill="#2A1810" />
              <line x1="42.5" y1="21.5" x2="46" y2="24.5" stroke="#F59E0B" strokeWidth="0.6" strokeLinecap="round" />

              {/* Realistic Arms & Hands holding Brass Watering Can */}
              <path d="M 48 42 Q 56 44 62 42.5" stroke={isDark ? "#0284C7" : "#0369A1"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Realistic Hand holding handle */}
              <ellipse cx="62" cy="42" rx="1.1" ry="0.8" fill="#F7CEB7" />
              <path d="M 61.5 42 L 63 41.8" stroke="#E2A686" strokeWidth="0.4" strokeLinecap="round" />

              {/* Slender Brass Watering Can */}
              <rect x="62" y="40" width="6" height="5" rx="1" fill="#D97706" />
              <path d="M 68 41 L 74 37" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
              {/* Handle */}
              <path d="M 62 41 Q 60 36 65 37" stroke="#D97706" strokeWidth="0.8" fill="none" />
              {/* Water Droplet Sparkles */}
              <circle cx="75" cy="39" r="0.6" fill="#38BDF8" />
              <circle cx="76.5" cy="41" r="0.5" fill="#38BDF8" />
              <circle cx="78" cy="43.5" r="0.4" fill="#38BDF8" />
            </g>
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 10: VINTAGE CAMERA ON SILL (PASSIVE)
            Studio window with 35mm rangefinder camera on solid sill, photo prints
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "vintage-camera-sill" && (
          <g id="scene-vintage-camera">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#120E18" : "#ECE5F2"} />
            
            {/* Photo String Line with 2 B&W prints */}
            <line x1="8" y1="18" x2="92" y2="18" stroke="#71717A" strokeWidth="0.6" />
            {/* Wooden pegs & prints */}
            <g transform="translate(18, 18)">
              <rect x="4" y="-2" width="1.2" height="3" fill="#D97706" />
              <rect x="0" y="1" width="14" height="16" rx="0.5" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="0.4" />
              <rect x="1" y="2" width="12" height="11" fill="#27272A" />
              <circle cx="7" cy="6" r="2.5" fill="#F4F4F5" />
            </g>
            <g transform="translate(48, 18) rotate(4)">
              <rect x="4" y="-2" width="1.2" height="3" fill="#D97706" />
              <rect x="0" y="1" width="14" height="16" rx="0.5" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="0.4" />
              <rect x="1" y="2" width="12" height="11" fill="#18181B" />
              <polygon points="1,11 6,6 9,9 13,4 13,13 1,13" fill="#A1A1AA" />
            </g>

            {/* Full-width Solid Architectural Wooden Windowsill */}
            <polygon points="0,52 100,52 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />
            <line x1="0" y1="52" x2="100" y2="52" stroke="#FDE68A" strokeWidth="0.8" opacity="0.8" />

            {/* Ground Contact Shadow */}
            <ellipse cx="64" cy="54" rx="20" ry="2" fill="#000000" opacity="0.85" />

            {/* Vintage Rangefinder Camera sitting on the sill */}
            <g transform="translate(45, 32)">
              {/* Draped Tan Leather Strap */}
              <path d="M 4 18 Q -4 21 0 24 Q 6 26 12 24" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Chrome Top & Bottom Plates */}
              <rect x="4" y="6" width="34" height="5" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
              <rect x="4" y="21" width="34" height="2.5" rx="0.6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
              {/* Textured Black Leatherette Body */}
              <rect x="4" y="10.5" width="34" height="11" fill="#18181B" stroke="#09090B" strokeWidth="0.5" />
              {/* Dials & Shutter button */}
              <rect x="8" y="3.5" width="5" height="3" rx="0.5" fill="#CBD5E1" />
              <rect x="26" y="3.5" width="5" height="3" rx="0.5" fill="#CBD5E1" />
              <circle cx="31" cy="3.5" r="1.4" fill="#DC2626" />
              {/* Multi-coated Prime Lens Barrel */}
              <rect x="14" y="9" width="14" height="14" rx="2" fill="#09090B" stroke="#CBD5E1" strokeWidth="0.8" />
              <circle cx="21" cy="16" r="5" fill="#0F172A" />
              {/* Optical Cyan/Violet Coating Glint */}
              <ellipse cx="20" cy="15" rx="3.5" ry="2" fill="#38BDF8" opacity="0.75" transform="rotate(-30 20 15)" />
              <circle cx="22" cy="14" r="0.8" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 11: ART & SKETCHING (PASSIVE)
            Drafting desk, sketchbook, color swatches, creativity
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "art-sketching" && (
          <g id="scene-art-sketching">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#161220" : "#F7F2FA"} />
            
            {/* Color Swatch Strips on Wall */}
            <g transform="translate(14, 12)">
              <rect x="0" y="0" width="5" height="14" rx="0.5" fill="#F43F5E" />
              <rect x="7" y="0" width="5" height="14" rx="0.5" fill="#F59E0B" />
              <rect x="14" y="0" width="5" height="14" rx="0.5" fill="#10B981" />
              <rect x="21" y="0" width="5" height="14" rx="0.5" fill="#3B82F6" />
              <rect x="28" y="0" width="5" height="14" rx="0.5" fill="#8B5CF6" />
            </g>

            {/* Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />

            {/* Angled Drafting Desk */}
            <polygon points="12,46 88,40 85,58 15,64" fill={isDark ? "#3A261A" : "#8A5A38"} />
            <line x1="12" y1="46" x2="88" y2="40" stroke="#FDE68A" strokeWidth="0.8" />

            {/* Big Open Sketchbook on desk */}
            <polygon points="26,45 62,42 60,54 24,57" fill="#FFFDF5" stroke="#CBD5E1" strokeWidth="0.5" />
            {/* Architectural UI Sketch on page */}
            <rect x="28" y="46" width="12" height="8" rx="0.5" fill="none" stroke="#6366F1" strokeWidth="0.4" />
            <circle cx="34" cy="50" r="2" fill="none" stroke="#F43F5E" strokeWidth="0.4" />

            {/* Girl Sketching with Pencil */}
            <circle cx="72" cy="30" r="4.6" fill={isDark ? "#1C1426" : "#4A3258"} />
            <path d="M 68 36 C 64 42, 68 48, 76 48 L 78 38 Z" fill="#6366F1" />
            {/* Hand with pencil leaning onto drafting desk */}
            <path d="M 70 40 Q 64 44 56 46" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" fill="none" />
            <line x1="56" y1="46" x2="52" y2="48" stroke="#D97706" strokeWidth="0.8" strokeLinecap="round" />

            {/* Jar of colored pencils */}
            <rect x="74" y="40" width="6" height="8" rx="1" fill="rgba(255,255,255,0.4)" stroke="#94A3B8" strokeWidth="0.4" />
            <line x1="75.5" y1="36" x2="75.5" y2="41" stroke="#EF4444" strokeWidth="0.8" />
            <line x1="77" y1="34" x2="77" y2="41" stroke="#3B82F6" strokeWidth="0.8" />
            <line x1="78.5" y1="35" x2="78.5" y2="41" stroke="#10B981" strokeWidth="0.8" />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 12: WINDOW DAYDREAMING (PASSIVE)
            Girl leaning on sill with warm steaming mug, looking at stars
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "window-daydream" && (
          <g id="scene-window-daydream">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#0A0714" : "#1B1428"} />

            {/* Night Sky View through window with sparkling stars */}
            <circle cx="24" cy="14" r="1.2" fill="#FEF08A" />
            <circle cx="38" cy="22" r="0.8" fill="#FFFFFF" />
            <circle cx="68" cy="12" r="1.4" fill="#FFFFFF" />
            <circle cx="82" cy="24" r="1" fill="#FEF08A" />
            {/* Crescent Moon */}
            <path d="M 48 8 A 6 6 0 0 0 54 14 A 5 5 0 0 1 48 8 Z" fill="#FEF3C7" className="drop-shadow-[0_0_6px_#FEF3C7]" />

            {/* Wooden Sill */}
            <polygon points="0,50 100,50 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#FDE68A" strokeWidth="0.8" />

            {/* REALISTIC HUMAN CHARACTER: Girl leaning on windowsill daydreaming */}
            <g id="realistic-girl-daydream">
              {/* Torso & cozy ribbed sweater leaning toward window */}
              <path
                d="M 38 52 C 37 46, 42 42, 50 42 C 58 42, 63 46, 62 52 Z"
                fill={isDark ? "#3B2252" : "#7C529E"}
              />

              {/* Graceful Neck */}
              <path d="M 48 42 L 52 42 L 52 35 L 48 35 Z" fill="#E8B59B" />

              {/* Realistic Head looking up dreamily at the night sky */}
              <path
                d="M 47 28 C 49 28, 51.5 29, 52 30.5 C 52.8 31.2, 53 32.2, 52.5 32.8 C 52.8 33.5, 52.2 34.2, 51.5 34.5 C 50.5 35.2, 49 35.2, 47.8 34.8 C 46.5 34, 46 32.5, 46 30.5 C 46 29, 46.5 28, 47 28 Z"
                fill="#F7CEB7"
              />
              {/* Dreamy, starry eye looking upward at constellations */}
              <circle cx="49.8" cy="31" r="0.6" fill="#1C1426" />
              <circle cx="50" cy="30.7" r="0.25" fill="#FFFFFF" />
              {/* Delicate brow */}
              <path d="M 49 30 Q 50.2 29.8 51.2 30.2" stroke="#26140D" strokeWidth="0.4" fill="none" />
              {/* Soft daydreaming smile */}
              <path d="M 49.8 33.5 Q 50.8 34 51.5 33.5" stroke="#BE123C" strokeWidth="0.45" strokeLinecap="round" fill="none" />
              {/* Rosy cheek glow */}
              <ellipse cx="49.2" cy="32.2" rx="1.2" ry="0.7" fill="#F472B6" opacity="0.35" />

              {/* Realistic Long Waves of Hair flowing back over shoulders */}
              <path
                d="M 46.5 27.5 C 49 27.5, 51 28.5, 51.5 30 C 50.5 29.5, 48.5 29.8, 48 31 C 47 29.5, 45 30, 44.5 31.5 C 43.5 33, 42.5 37, 43.5 44 C 44.5 42, 45 38, 46 32 Z"
                fill="#2A1810"
              />
              <path d="M 43.5 32 Q 43 38 44.5 44" stroke="#3D2418" strokeWidth="0.7" fill="none" />

              {/* Forearms resting naturally on the wooden windowsill */}
              <ellipse cx="50" cy="49" rx="14" ry="3.5" fill={isDark ? "#3B2252" : "#7C529E"} />
              
              {/* Realistic Hands cradling a warm steaming ceramic mug */}
              <path d="M 45 48 Q 47 46 49 47" stroke="#F7CEB7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M 55 48 Q 53 46 51 47" stroke="#F7CEB7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Delicate fingers wrapped around mug */}
              <ellipse cx="48.5" cy="47.5" rx="1" ry="0.7" fill="#F7CEB7" />
              <ellipse cx="51.5" cy="47.5" rx="1" ry="0.7" fill="#F7CEB7" />

              {/* Ceramic Mug cradled between hands */}
              <rect x="48" y="44.5" width="4" height="5.5" rx="0.8" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.4" />
              {/* Mug steam trails curling upward into starry night */}
              <path d="M 49 43 Q 48 40 50 37" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.6" />
              <path d="M 51 42 Q 53 39 51 36" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.5" />
            </g>
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 13: COZY BOOKSHELF (PASSIVE)
            Floor-to-ceiling bookshelf with stacked books, flickering candle
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "cozy-bookshelf" && (
          <g id="scene-cozy-bookshelf">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#120D1A" : "#ECE4F2"} />
            
            {/* Floor */}
            <polygon points="0,62 100,62 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />

            {/* Large Wooden Bookcase Framework */}
            <rect x="10" y="8" width="80" height="54" rx="1.5" fill={isDark ? "#24150D" : "#6E4528"} stroke={isDark ? "#120804" : "#4A2B18"} strokeWidth="1" />
            {/* Shelves */}
            <line x1="10" y1="26" x2="90" y2="26" stroke="#D4A373" strokeWidth="1.2" />
            <line x1="10" y1="44" x2="90" y2="44" stroke="#D4A373" strokeWidth="1.2" />

            {/* Top Shelf Books */}
            <g transform="translate(14, 12)">
              <rect x="0" y="2" width="4" height="12" rx="0.4" fill="#DC2626" />
              <rect x="5" y="0" width="5" height="14" rx="0.4" fill="#2563EB" />
              <rect x="11" y="4" width="4" height="10" rx="0.4" fill="#059669" />
              <rect x="16" y="1" width="4.5" height="13" rx="0.4" fill="#D97706" />
              <rect x="21.5" y="3" width="4" height="11" rx="0.4" fill="#7C3AED" />
              {/* Leaning books */}
              <rect x="29" y="3" width="4" height="11" rx="0.4" transform="rotate(18 29 3)" fill="#DB2777" />
            </g>

            {/* Middle Shelf: Flickering Candle & Ceramic Vase */}
            <g transform="translate(14, 30)">
              <rect x="4" y="2" width="4" height="12" rx="0.4" fill="#4B5563" />
              <rect x="9" y="0" width="5" height="14" rx="0.4" fill="#0D9488" />
              {/* Scented Glass Candle */}
              <rect x="36" y="7" width="6" height="7" rx="0.8" fill="rgba(254, 240, 138, 0.4)" stroke="#F59E0B" strokeWidth="0.5" />
              <ellipse cx="39" cy="7" rx="2" ry="0.8" fill="#FBBF24" />
              {/* Candle Flame */}
              <path d="M 39 6 Q 37 3 39 1 Q 41 3 39 6 Z" fill="#FEF08A" />
              <circle cx="39" cy="4" r="6" fill={`url(#lampRadialGlow_${windowInstanceId})`} opacity="0.9" />
              {/* Small Ceramic Jug */}
              <ellipse cx="58" cy="11" rx="3.5" ry="3" fill="#D97706" />
              <rect x="56.5" y="5" width="3" height="4" fill="#B45309" />
            </g>

            {/* Bottom Shelf Books */}
            <g transform="translate(14, 48)">
              <rect x="0" y="2" width="6" height="12" rx="0.4" fill="#1E293B" />
              <rect x="7" y="0" width="5.5" height="14" rx="0.4" fill="#9333EA" />
              <rect x="13.5" y="3" width="5" height="11" rx="0.4" fill="#CA8A04" />
              <rect x="19.5" y="1" width="6" height="13" rx="0.4" fill="#047857" />
              <rect x="42" y="3" width="18" height="3" rx="0.4" fill="#B91C1C" />
              <rect x="44" y="6.5" width="15" height="3" rx="0.4" fill="#1E3A8A" />
            </g>
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 14: PET SLEEPING (PASSIVE)
            Cat napping on window cushion, peaceful domestic moment
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "pet-sleeping" && (
          <g id="scene-pet-sleeping">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#110D1A" : "#ECE5F2"} />

            {/* Moonlit Window Backing */}
            <circle cx="28" cy="16" r="1" fill="#FEF08A" />
            <circle cx="76" cy="20" r="0.8" fill="#FFFFFF" />

            {/* Full-width Wooden Sill */}
            <polygon points="0,52 100,52 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />
            <line x1="0" y1="52" x2="100" y2="52" stroke="#FDE68A" strokeWidth="0.8" />

            {/* Plush Velvet Cushion on sill */}
            <ellipse cx="50" cy="54" rx="28" ry="6" fill={isDark ? "#4C1D95" : "#A855F7"} stroke={isDark ? "#311068" : "#8B5CF6"} strokeWidth="0.6" />

            {/* Ginger/Calico Cat curled up in peaceful crescent ball */}
            <g transform="translate(50, 48)">
              {/* Cat Body */}
              <ellipse cx="0" cy="0" rx="11" ry="7" fill="#EA580C" />
              <ellipse cx="-1" cy="1" rx="9" ry="5.5" fill="#F97316" />
              {/* White belly patch */}
              <ellipse cx="2" cy="1" rx="5" ry="3.5" fill="#FFFDF5" />
              {/* Curled Head with ears */}
              <circle cx="-9" cy="0" r="4.2" fill="#EA580C" />
              <polygon points="-12,-3 -8,-6 -9,-1" fill="#C2410C" />
              <polygon points="-8,-3 -5,-6 -6,-1" fill="#C2410C" />
              {/* Sleeping eye curve */}
              <path d="M -11 0 Q -9.5 1.2 -8 0" stroke="#7C2D12" strokeWidth="0.5" fill="none" />
              {/* Curled Tail wrapping around paws */}
              <path d="M 8 1 C 14 3, 12 8, 4 7" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>

            {/* Terracotta flower pot on left */}
            <polygon points="12,46 20,46 18,54 14,54" fill="#C2410C" />
            <circle cx="16" cy="42" r="3" fill="#10B981" />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 15: STARRY BREEZE & SHEER CURTAINS (PASSIVE)
            Deep midnight room, sheer curtains billowed by cool night breeze
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "starry-breeze" && (
          <g id="scene-starry-breeze">
            {/* Deep Midnight Blue Sanctuary */}
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#06050C" : "#1B1728"} />

            {/* Starlit Sky through window with twinkling constellations */}
            <circle cx="22" cy="14" r="1.4" fill="#FEF08A" />
            <circle cx="36" cy="22" r="0.9" fill="#FFFFFF" />
            <circle cx="48" cy="12" r="1" fill="#FFFFFF" />
            <circle cx="64" cy="20" r="1.3" fill="#FEF08A" />
            <circle cx="82" cy="16" r="0.9" fill="#FFFFFF" />

            {/* Fairy Lights string across upper window header */}
            <line x1="4" y1="8" x2="96" y2="8" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="18" cy="10" r="1.2" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />
            <circle cx="34" cy="11" r="1.2" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />
            <circle cx="50" cy="10" r="1.2" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />
            <circle cx="66" cy="11" r="1.2" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />
            <circle cx="82" cy="10" r="1.2" fill="#FEF08A" className="drop-shadow-[0_0_4px_#F59E0B]" />

            {/* Open Night Breeze: Twinkling Constellations & Crescent Moon */}
            <path d="M 48 18 A 8 8 0 0 0 56 26 A 7 7 0 0 1 48 18 Z" fill="#FEF3C7" className="drop-shadow-[0_0_8px_#FEF3C7]" />
            <circle cx="58" cy="16" r="1.5" fill="#FEF08A" />
            <circle cx="72" cy="24" r="1" fill="#FFFFFF" />
            <circle cx="28" cy="28" r="0.8" fill="#FFFFFF" />

            {/* Small Terracotta Potted Succulent on sill */}
            <polygon points="18,52 26,52 24,58 20,58" fill="#B45309" />
            <ellipse cx="22" cy="50" rx="3.5" ry="2.5" fill="#10B981" />

            {/* Window Sill */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCENE 16: VINYL RECORD TURNTABLE (PASSIVE)
            Mid-century credenza, spinning vinyl, warm lamp, album propped
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {scene === "vinyl-turntable" && (
          <g id="scene-vinyl-turntable">
            <rect x="0" y="0" width="100" height="75" fill={isDark ? "#171220" : "#F4ECF7"} />

            {/* Propped Album Cover Art on wall */}
            <g transform="translate(16, 16) rotate(-6)">
              <rect x="0" y="0" width="20" height="20" rx="1" fill="#18181B" stroke="#52525B" strokeWidth="0.6" />
              {/* Psychedelic Sunset Art */}
              <circle cx="10" cy="10" r="6" fill="#F43F5E" />
              <path d="M 0 14 Q 10 10 20 14 L 20 20 L 0 20 Z" fill="#3B82F6" />
              <circle cx="10" cy="10" r="2" fill="#FEF08A" />
            </g>

            {/* Floor */}
            <polygon points="0,58 100,58 100,75 0,75" fill={`url(#floorWood_${windowInstanceId})`} />

            {/* Mid-Century Credenza Console Table */}
            <rect x="42" y="38" width="50" height="24" rx="2" fill={isDark ? "#3A2417" : "#8A5633"} stroke={isDark ? "#1F120A" : "#57351D"} strokeWidth="1" />
            {/* Tapered credenza legs */}
            <line x1="48" y1="62" x2="44" y2="72" stroke={isDark ? "#1A0E08" : "#4A2B18"} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="86" y1="62" x2="90" y2="72" stroke={isDark ? "#1A0E08" : "#4A2B18"} strokeWidth="2.2" strokeLinecap="round" />

            {/* Vintage Turntable Base */}
            <rect x="48" y="32" width="34" height="6.5" rx="1" fill={isDark ? "#18181B" : "#E2E8F0"} stroke="#94A3B8" strokeWidth="0.6" />
            {/* Spinning Black Vinyl Record */}
            <circle cx="62" cy="35" r="9" fill="#09090B" stroke="#27272A" strokeWidth="0.6" />
            {/* Vinyl Spiral Grooves */}
            <circle cx="62" cy="35" r="7.5" fill="none" stroke="#27272A" strokeWidth="0.4" />
            <circle cx="62" cy="35" r="6" fill="none" stroke="#3F3F46" strokeWidth="0.3" />
            {/* Center Record Label */}
            <circle cx="62" cy="35" r="3" fill="#DC2626" />
            <circle cx="62" cy="35" r="0.8" fill="#F8FAFC" />
            {/* Brass Tonearm resting on record */}
            <circle cx="78" cy="35" r="1.5" fill="#D97706" />
            <line x1="78" y1="35" x2="68" y2="33" stroke="#F59E0B" strokeWidth="0.8" strokeLinecap="round" />

            {/* Warm Edison Bulb Lamp beside turntable */}
            <rect x="85" y="30" width="3.5" height="8" rx="0.6" fill="#D97706" />
            <circle cx="86.7" cy="24" r="3.5" fill="#FEF08A" className="drop-shadow-[0_0_8px_#F59E0B]" />
            <circle cx="86.7" cy="24" r="10" fill={`url(#lampRadialGlow_${windowInstanceId})`} opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
}
