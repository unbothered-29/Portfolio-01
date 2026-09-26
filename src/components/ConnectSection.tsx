import React, { useState, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT_INFO } from "../data/portfolioData";

interface ConnectSectionProps {
  onOpenContactModal?: () => void;
}

export function ConnectSection(_props: ConnectSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="connect"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos(null);
      }}
      className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-8 md:px-12 py-24 sm:py-32 md:py-40 font-sora select-none overflow-hidden"
    >
      {/* 1. Delicate Top Fading Architectural Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-8 sm:inset-x-16 h-px bg-gradient-to-r from-transparent via-[#C4B5FD]/45 dark:via-white/12 to-transparent"
      />

      {/* 2. Interactive Spotlight that follows the user's cursor */}
      {mousePos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 -z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(167, 139, 250, 0.22), transparent 70%)`,
          }}
        />
      )}

      {/* 3. Floating Living Ambient Mesh Orbs */}
      {/* Top Left Lavender Orb */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-12 left-1/4 w-[380px] sm:w-[480px] h-[380px] rounded-full blur-[100px] opacity-40 dark:opacity-25 -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(196, 181, 253, 0.7) 0%, rgba(167, 139, 250, 0.3) 50%, transparent 75%)",
        }}
      />

      {/* Bottom Right Amethyst Orb */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-16 right-1/4 w-[420px] sm:w-[520px] h-[420px] rounded-full blur-[110px] opacity-35 dark:opacity-20 -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(216, 180, 254, 0.6) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 75%)",
        }}
      />

      {/* Center Soft Breathing Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[700px] h-[360px] rounded-full blur-[90px] -z-10 opacity-60 dark:opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196,181,253,0.38) 0%, rgba(167,139,250,0.16) 45%, transparent 70%)",
        }}
      />

      {/* 4. Giant Editorial Outline Watermark Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center whitespace-nowrap font-fraunces font-extrabold tracking-[-0.04em] text-[70px] sm:text-[110px] md:text-[150px] lg:text-[180px] leading-none -z-10 select-none overflow-hidden"
        style={{
          WebkitTextStroke: "1.25px currentColor",
          color: "transparent",
          opacity: 0.045,
        }}
      >
        LET'S CONNECT
      </div>

      {/* 5. Concentric Signal Rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full border border-[#D6CBFF]/40 dark:border-white/[0.06] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-[#D6CBFF]/30 dark:border-white/[0.04] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full border border-[#D6CBFF]/20 dark:border-white/[0.03] -z-10"
      />

      {/* 6. Minimal Architectural Dot Grid with Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-[#543673] dark:text-[#A78BFA] opacity-[0.15] dark:opacity-[0.09]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.25px, transparent 1.25px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 75%)",
        }}
      />

      {/* 7. Subtle Constellation Micro-Sparkles */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.2, 0.75, 0.2], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-16 left-[18%] text-[#A78BFA] dark:text-[#C4B5FD] select-none -z-10"
      >
        <Sparkles className="w-4 h-4 stroke-[1.5] opacity-60" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.25, 0.8, 0.25], scale: [1, 1.2, 1] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute bottom-20 right-[16%] text-[#C4B5FD] select-none -z-10"
      >
        <Sparkles className="w-5 h-5 stroke-[1.5] opacity-60" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.85, 1.1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="pointer-events-none absolute top-28 right-[24%] text-[#8B5CF6] dark:text-[#E9D5FF] select-none -z-10"
      >
        <Sparkles className="w-3.5 h-3.5 stroke-[1.5] opacity-50" />
      </motion.div>

      {/* 8. Minimal Architectural Corner Coordinates */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-6 sm:left-12 font-mono text-[11px] text-[#583C7E]/30 dark:text-white/20 select-none"
      >
        +
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-6 sm:right-12 font-mono text-[11px] text-[#583C7E]/30 dark:text-white/20 select-none"
      >
        +
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.65] dark:bg-white/[0.06] backdrop-blur-md border border-[#D6CBFF] dark:border-white/10 shadow-[0_2px_8px_rgba(24,15,46,0.03)] mb-5 sm:mb-6">
          <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#583C7E] dark:text-[#C4B5FD]">
            05 / LET'S CONNECT
          </span>
        </div>

        {/* Headline: Editorial Fraunces Display */}
        <h2 className="font-fraunces text-[34px] sm:text-[50px] md:text-[64px] lg:text-[72px] font-bold tracking-tight text-[#34154E] dark:text-[#F5F3FA] leading-[1.04]">
          Have an idea in mind?{" "}
          <span className="font-fraunces italic font-normal text-[#583C7E] dark:text-[#C4B5FD] block mt-1">
            Let's connect.
          </span>
        </h2>

        {/* Welcoming body paragraph */}
        <p className="mt-5 sm:mt-7 font-sora text-[15px] sm:text-[17px] md:text-[18px] text-[#543673]/85 dark:text-[#A19BAE] leading-relaxed max-w-2xl">
          Whether you're looking to build a modern web application, collaborate on a creative project, discuss a hackathon idea, or explore full-time frontend roles—my inbox is always open.
        </p>

        {/* Action Row - Center Aligned Single Button */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center w-full">
          {/* Directly opens user's email client */}
          <a
            href={`mailto:${CONTACT_INFO.email}?subject=Hello%20Jessicaa%20—%20Inquiry`}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-[12.5px] font-semibold tracking-wider uppercase text-white bg-[#34154E] dark:bg-[#8B5CF6] hover:bg-[#260C3B] dark:hover:bg-[#7C3AED] shadow-[0_8px_25px_rgba(52,21,78,0.22)] dark:shadow-[0_8px_25px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>Drop a message</span>
            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 9. Delicate Bottom Fading Architectural Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-8 sm:inset-x-16 h-px bg-gradient-to-r from-transparent via-[#C4B5FD]/45 dark:via-white/12 to-transparent"
      />
    </section>
  );
}
