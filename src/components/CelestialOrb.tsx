import React from "react";
import { motion } from "motion/react";

interface CelestialOrbProps {
  isDark: boolean;
}

export function CelestialOrb({ isDark }: CelestialOrbProps) {
  return (
    <div
      className="absolute top-6 sm:top-8 md:top-10 right-4 sm:right-12 md:right-20 lg:right-28 pointer-events-none select-none z-10 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center"
      aria-label={isDark ? "Luminous celestial moon" : "Radiant realistic morning sun"}
    >
      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        1. LUNAR CELESTIAL ORB (ACTIVE IN DARK / OBSIDIAN MODE)
        - Spherical silver-to-warm-amber illumination gradient
        - High-resolution lunar basalt maria & crater topography
        - Soft diffuse atmospheric radiance & lunar corona
        - Wispy atmospheric cloud drift
        - Smooth vertical rise/fall parallax and scale transition
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.82,
          y: isDark ? 0 : 12,
        }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Outermost Diffuse Atmospheric Radiance */}
        <motion.div
          animate={{
            opacity: [0.7, 0.92, 0.7],
            scale: [0.96, 1.04, 0.96],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-16 sm:-inset-20 rounded-full bg-[radial-gradient(circle,_rgba(254,243,199,0.22)_0%,_rgba(251,191,36,0.09)_40%,_transparent_75%)] blur-xl pointer-events-none"
        />

        {/* Inner Lunar Corona Ring */}
        <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-[radial-gradient(circle,_rgba(255,253,245,0.45)_0%,_rgba(254,243,199,0.18)_55%,_transparent_72%)] blur-md pointer-events-none" />

        {/* High-Fidelity Vector Moon Disc */}
        <svg
          viewBox="0 0 72 72"
          className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_24px_rgba(254,243,199,0.7)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Spherical illumination gradient: bright silver highlight to soft lunar amber-gray */}
            <radialGradient id="celestialMoonSurface" cx="38%" cy="36%" r="62%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFFDF5" />
              <stop offset="65%" stopColor="#FEF3C7" />
              <stop offset="85%" stopColor="#F5E4B5" />
              <stop offset="100%" stopColor="#E2CCA0" />
            </radialGradient>

            {/* Mare / Crater basalt shading */}
            <radialGradient id="celestialMareTone" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8C7862" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#9C876E" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#AFA089" stopOpacity="0" />
            </radialGradient>

            {/* Subtle limb darkening shadow along eastern edge */}
            <linearGradient id="celestialLimbDarkening" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="70%" stopColor="transparent" />
              <stop offset="100%" stopColor="#2E2419" stopOpacity="0.35" />
            </linearGradient>

            {/* Mask to keep craters inside the moon circle */}
            <clipPath id="celestialMoonClip">
              <circle cx="36" cy="36" r="34" />
            </clipPath>
          </defs>

          {/* Main Celestial Disc */}
          <circle
            cx="36"
            cy="36"
            r="34"
            fill="url(#celestialMoonSurface)"
          />

          {/* Craters & Maria Topography (clipped to moon sphere) */}
          <g clipPath="url(#celestialMoonClip)">
            {/* Oceanus Procellarum & Mare Imbrium (Upper-Left Dark Basalt Region) */}
            <path
              d="M 18 22 C 20 16 29 14 34 18 C 37 21 34 27 28 29 C 22 30 16 26 18 22 Z"
              fill="url(#celestialMareTone)"
            />
            <path
              d="M 23 20 C 26 18 31 19 33 23 C 32 26 27 27 24 25 C 22 23 22 21 23 20 Z"
              fill="#7C6850"
              opacity="0.35"
            />

            {/* Mare Serenitatis & Mare Tranquillitatis (Upper-Right Plains) */}
            <ellipse
              cx="46"
              cy="26"
              rx="7.5"
              ry="6.5"
              fill="url(#celestialMareTone)"
            />
            <ellipse
              cx="51"
              cy="34"
              rx="6.5"
              ry="6"
              fill="url(#celestialMareTone)"
            />
            <path
              d="M 43 27 C 46 25 50 28 49 32 C 46 34 42 32 43 27 Z"
              fill="#74604A"
              opacity="0.25"
            />

            {/* Mare Fecunditatis & Mare Nectaris (Lower-Right Plains) */}
            <ellipse
              cx="47"
              cy="44"
              rx="6"
              ry="5"
              fill="url(#celestialMareTone)"
            />
            <ellipse
              cx="41"
              cy="48"
              rx="5"
              ry="4"
              fill="url(#celestialMareTone)"
            />

            {/* Mare Nubium & Mare Humorum (Lower-Left Plains) */}
            <ellipse
              cx="27"
              cy="43"
              rx="6"
              ry="4.5"
              fill="url(#celestialMareTone)"
            />
            <circle
              cx="20"
              cy="41"
              r="3.5"
              fill="url(#celestialMareTone)"
            />

            {/* Tycho Crater & Ejecta Rays (Lower South bright impact site) */}
            <g opacity="0.6">
              <line x1="33" y1="56" x2="16" y2="46" stroke="#FFFDF8" strokeWidth="0.5" strokeOpacity="0.5" />
              <line x1="33" y1="56" x2="24" y2="64" stroke="#FFFDF8" strokeWidth="0.5" strokeOpacity="0.5" />
              <line x1="33" y1="56" x2="45" y2="52" stroke="#FFFDF8" strokeWidth="0.5" strokeOpacity="0.5" />
              <line x1="33" y1="56" x2="35" y2="38" stroke="#FFFDF8" strokeWidth="0.6" strokeOpacity="0.4" />
              <circle cx="33" cy="56" r="2.2" fill="#EAD7B0" stroke="#FFFDF5" strokeWidth="0.5" />
              <circle cx="33" cy="56" r="1.1" fill="#7A6852" opacity="0.45" />
            </g>

            {/* Copernicus Crater */}
            <circle cx="28" cy="33" r="1.8" fill="#F0DFC0" stroke="#FFFDF5" strokeWidth="0.4" opacity="0.8" />
            <circle cx="28" cy="33" r="0.9" fill="#7A6852" opacity="0.4" />

            {/* Kepler Crater */}
            <circle cx="19" cy="32" r="1.3" fill="#F0DFC0" opacity="0.75" />

            {/* Limb Darkening Sphere Contour */}
            <circle
              cx="36"
              cy="36"
              r="34"
              fill="url(#celestialLimbDarkening)"
            />
          </g>

          {/* Luminous Specular Rim Halo */}
          <circle
            cx="36"
            cy="36"
            r="33.5"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Wispy Atmospheric Cloud Drift passing across the moon base */}
        <motion.div
          animate={{
            x: [-4, 6, -4],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1 left-2 w-20 sm:w-24 h-4 bg-gradient-to-r from-transparent via-[#EDE9FE]/20 to-transparent blur-sm rounded-full pointer-events-none"
        />
      </motion.div>

      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        2. REALISTIC SOLAR CELESTIAL ORB (ACTIVE IN LIGHT / CRYSTAL MODE)
        - Blinding thermonuclear incandescent white-hot core
        - Stellar limb darkening (cooler amber photosphere rim)
        - Realistic active solar regions & sunspots with umbra & penumbra
        - Solar prominences / magnetic plasma arcs looping off the limb
        - Volumetric organic crepuscular coronal light rays (natural, not cartoon triangles)
        - Subtle anamorphic horizontal optical lens streak
        - Multi-stage diffuse atmospheric aureole & solar corona
        - Soft morning cirrus cloud veil passing across the lower disc
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.82 : 1,
          y: isDark ? -12 : 0,
        }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Outermost Diffuse Atmospheric Solar Aureole */}
        <motion.div
          animate={{
            opacity: [0.65, 0.85, 0.65],
            scale: [0.97, 1.05, 0.97],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-16 sm:-inset-20 rounded-full bg-[radial-gradient(circle,_rgba(254,240,138,0.32)_0%,_rgba(251,191,36,0.15)_35%,_rgba(245,158,11,0.04)_58%,_transparent_75%)] blur-2xl pointer-events-none"
        />

        {/* Inner Brilliant Coronal Glow */}
        <div className="absolute -inset-4 sm:-inset-5 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.92)_0%,_rgba(254,243,199,0.55)_35%,_rgba(251,191,36,0.18)_60%,_transparent_80%)] blur-md pointer-events-none" />

        {/* Cinematic Subtle Anamorphic Lens Flare Line (Horizontal Starburst Glare) */}
        <div className="absolute w-36 sm:w-48 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[0.4px] pointer-events-none" />
        <div className="absolute w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-amber-200/50 to-transparent blur-[0.6px] rotate-45 pointer-events-none" />
        <div className="absolute w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-amber-200/50 to-transparent blur-[0.6px] -rotate-45 pointer-events-none" />

        {/* Natural Volumetric Coronal Streamers (Organic Atmospheric Light Shafts) */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -inset-6 sm:-inset-8 flex items-center justify-center pointer-events-none opacity-60"
        >
          <svg
            viewBox="0 0 120 120"
            className="w-28 h-28 sm:w-32 sm:h-32 overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Soft gaussian volumetric light ray falloff */}
              <radialGradient id="solarStreamerGrad" cx="50%" cy="50%" r="50%">
                <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#FEF08A" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 16 Organic Coronal Light Streamers of varying natural lengths and widths */}
            {[
              { angle: 0, length: 56, width: 7, opacity: 0.7 },
              { angle: 22, length: 48, width: 5, opacity: 0.45 },
              { angle: 45, length: 58, width: 8, opacity: 0.8 },
              { angle: 68, length: 44, width: 4, opacity: 0.4 },
              { angle: 90, length: 54, width: 7, opacity: 0.65 },
              { angle: 112, length: 46, width: 5, opacity: 0.5 },
              { angle: 135, length: 60, width: 9, opacity: 0.85 },
              { angle: 158, length: 45, width: 4, opacity: 0.4 },
              { angle: 180, length: 55, width: 7, opacity: 0.7 },
              { angle: 202, length: 47, width: 5, opacity: 0.45 },
              { angle: 225, length: 57, width: 8, opacity: 0.75 },
              { angle: 248, length: 43, width: 4, opacity: 0.35 },
              { angle: 270, length: 54, width: 7, opacity: 0.65 },
              { angle: 292, length: 48, width: 5, opacity: 0.5 },
              { angle: 315, length: 59, width: 8, opacity: 0.8 },
              { angle: 338, length: 45, width: 4, opacity: 0.4 },
            ].map((streamer, idx) => (
              <g key={idx} transform={`rotate(${streamer.angle} 60 60)`}>
                <path
                  d={`M ${60 - streamer.width / 2} 32 Q 60 ${60 - streamer.length} ${
                    60 + streamer.width / 2
                  } 32 Z`}
                  fill="url(#solarStreamerGrad)"
                  opacity={streamer.opacity}
                />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Counter-rotating subtle secondary coronal shimmer */}
        <motion.div
          animate={{
            rotate: [360, 0],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            rotate: { duration: 90, repeat: Infinity, ease: "linear" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -inset-4 sm:-inset-5 flex items-center justify-center pointer-events-none"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[conic-gradient(from_0deg,_rgba(254,240,138,0.3)_0deg,_transparent_30deg,_rgba(251,191,36,0.35)_75deg,_transparent_110deg,_rgba(254,240,138,0.25)_160deg,_transparent_200deg,_rgba(251,191,36,0.35)_250deg,_transparent_290deg,_rgba(254,240,138,0.3)_360deg)] blur-sm" />
        </motion.div>

        {/* High-Fidelity Vector Solar Photosphere Disc */}
        <svg
          viewBox="0 0 72 72"
          className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_28px_rgba(251,191,36,0.9)] z-10 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 
              Multi-stop Photosphere Radiation Profile:
              - Thermonuclear incandescent white-hot core (#FFFFFF)
              - Transitioning to bright solar lemon-white (#FFFDE7)
              - Warm golden photosphere (#FEE440 / #FBBF24)
              - Pronounced solar limb darkening towards outer rim (#D97706 / #B45309)
            */}
            <radialGradient id="solarPhotosphere" cx="44%" cy="42%" r="56%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="18%" stopColor="#FFFFFF" />
              <stop offset="38%" stopColor="#FFFEEA" />
              <stop offset="62%" stopColor="#FEF08A" />
              <stop offset="82%" stopColor="#FBBF24" />
              <stop offset="94%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Astrophysical Solar Limb Darkening: deeper amber attenuation towards edge */}
            <radialGradient id="solarLimbDarkening" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="86%" stopColor="#B45309" stopOpacity="0.25" />
              <stop offset="97%" stopColor="#78350F" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#451A03" stopOpacity="0.75" />
            </radialGradient>

            {/* Sunspot Umbra (deep cool magnetized core) */}
            <radialGradient id="sunspotUmbra" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="70%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#92400E" stopOpacity="0.8" />
            </radialGradient>

            {/* Sunspot Penumbra (filamentary magnetic transition zone) */}
            <radialGradient id="sunspotPenumbra" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#92400E" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#D97706" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Faculae / Magnetic Bright Plage Region */}
            <radialGradient id="solarFaculae" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFFDF0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </radialGradient>

            {/* Prominence Plasma Glow */}
            <linearGradient id="prominenceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F87171" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </linearGradient>

            {/* Photosphere Clip Boundary */}
            <clipPath id="photosphereClip">
              <circle cx="36" cy="36" r="34" />
            </clipPath>
          </defs>

          {/* 
            SOLAR PROMINENCES (Eruptive Magnetic Plasma Arcs Looping over the Limb)
            Natural astrophysical phenomena observed during solar eclipses & H-alpha telescopes!
          */}
          {/* Prominence Loop 1: Upper-Right (~45 degrees) */}
          <path
            d="M 58 15 C 64 11, 68 18, 62 23 C 60 21, 61 17, 58 15 Z"
            fill="url(#prominenceGrad)"
            opacity="0.85"
            filter="drop-shadow(0 0 2px #EF4444)"
          />
          {/* Prominence Flare 2: Lower-Left (~215 degrees) */}
          <path
            d="M 14 53 C 9 57, 8 63, 15 62 C 14 59, 12 56, 14 53 Z"
            fill="url(#prominenceGrad)"
            opacity="0.75"
            filter="drop-shadow(0 0 2px #F59E0B)"
          />
          {/* Prominence Loop 3: Upper-Left (~310 degrees) */}
          <path
            d="M 15 20 C 10 16, 16 11, 21 16 C 19 17, 16 18, 15 20 Z"
            fill="url(#prominenceGrad)"
            opacity="0.8"
            filter="drop-shadow(0 0 2px #EF4444)"
          />

          {/* Main Photosphere Celestial Base */}
          <circle
            cx="36"
            cy="36"
            r="34"
            fill="url(#solarPhotosphere)"
          />

          {/* 
            SOLAR SURFACE FEATURES (Clipped strictly inside the Photosphere)
            Real solar magnetic activity: Sunspot groups & bright faculae!
          */}
          <g clipPath="url(#photosphereClip)">
            {/* Active Region 1: Bright Magnetic Faculae / Plage field */}
            <ellipse
              cx="44"
              cy="31"
              rx="9"
              ry="6"
              fill="url(#solarFaculae)"
            />
            {/* Primary Sunspot Penumbra (striated outer margin) */}
            <ellipse
              cx="43.5"
              cy="31"
              rx="4.2"
              ry="3.2"
              fill="url(#sunspotPenumbra)"
            />
            {/* Primary Sunspot Umbra (deep cool magnetic core) */}
            <ellipse
              cx="43.5"
              cy="31"
              rx="2.1"
              ry="1.5"
              fill="url(#sunspotUmbra)"
            />

            {/* Companion Secondary Sunspot in the dipole group */}
            <ellipse
              cx="47.5"
              cy="33"
              rx="2.4"
              ry="1.8"
              fill="url(#sunspotPenumbra)"
            />
            <circle
              cx="47.5"
              cy="33"
              r="1"
              fill="url(#sunspotUmbra)"
            />

            {/* Active Region 2: Minor equatorial sunspot pore */}
            <ellipse
              cx="26"
              cy="42"
              rx="3"
              ry="2.2"
              fill="url(#sunspotPenumbra)"
            />
            <circle
              cx="26"
              cy="42"
              r="1.2"
              fill="url(#sunspotUmbra)"
            />

            {/* Granulation & Convection Cell Subtle Shading */}
            <circle
              cx="36"
              cy="36"
              r="34"
              fill="url(#solarLimbDarkening)"
            />
          </g>

          {/* Chromosphere Rim Specular Highlight */}
          <circle
            cx="36"
            cy="36"
            r="33.6"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Delicate Morning Cirrus Atmospheric Cloud Drift across lower solar base */}
        <motion.div
          animate={{
            x: [-5, 7, -5],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1.5 left-1 w-24 sm:w-28 h-4 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1.5px] rounded-full pointer-events-none z-20"
        />
        {/* Secondary wispy vapor layer catching morning rim light */}
        <motion.div
          animate={{
            x: [6, -4, 6],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-0.5 right-1 w-16 sm:w-20 h-2.5 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent blur-[1px] rounded-full pointer-events-none z-20"
        />
      </motion.div>
    </div>
  );
}
