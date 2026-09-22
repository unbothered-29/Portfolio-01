import React, { useState } from "react";
import { motion } from "motion/react";
import { PersonalBitCard } from "../types";
import { cn } from "../lib/utils";

interface SomeBitsOfMeCardProps {
  card: PersonalBitCard;
  index: number;
  className?: string;
  mouseOffset?: { x: number; y: number };
  isMobile?: boolean;
}

export function SomeBitsOfMeCard({
  card,
  index,
  className,
  mouseOffset = { x: 0, y: 0 },
  isMobile = false,
}: SomeBitsOfMeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Subtle desktop parallax when not dragging
  const pFactor = card.parallaxFactor ?? 0.015;
  const parallaxX = !isMobile && !isDragging ? mouseOffset.x * pFactor * 14 : 0;
  const parallaxY = !isMobile && !isDragging ? mouseOffset.y * pFactor * 14 : 0;

  const rotation = card.layout?.rotation ?? card.rotationDeg ?? 0;
  const initialOffset = card.layout?.initialOffset ?? { x: 0, y: 20 };

  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      dragElastic={0.08}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{
        opacity: 0,
        x: initialOffset.x,
        y: initialOffset.y,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
      }}
      className={cn(
        "select-none transition-transform duration-200 ease-out",
        !isMobile ? "cursor-grab active:cursor-grabbing" : "cursor-default",
        isDragging ? "z-50 scale-[1.02]" : "",
        className
      )}
    >
      {/* 
        LIQUID GLASSY TRANSPARENT CARD CONTAINER 
        - High optical clarity & transparency letting aurora borealis shine through
        - Architectural sharp corners: rounded-[3px] (2px–6px max)
        - Intense refraction: backdrop-blur-[24px] backdrop-saturate-[220%]
        - Specular bevel, top-edge prism glint, and liquid ambient shadows
      */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isDragging
            ? "rotate(0deg) translateY(-4px)"
            : isHovered
            ? `rotate(${rotation * 0.3}deg) translateY(-2px)`
            : `rotate(${rotation}deg) translateY(0px)`,
          width: !isMobile && card.layout?.width ? `${card.layout.width}px` : undefined,
          minHeight: !isMobile && card.layout?.minHeight ? `${card.layout.minHeight}px` : undefined,
        }}
        className={cn(
          "relative group overflow-hidden p-3.5 sm:p-4 rounded-[3px] border transition-all duration-200 ease-out flex flex-col justify-between",
          // Liquid Glassy Transparent background (letting the background shine through clearly)
          "bg-white/[0.08] dark:bg-white/[0.07]",
          "backdrop-blur-[24px] backdrop-saturate-[220%]",
          "border-white/[0.32] dark:border-white/[0.28]",
          // Specular highlights & ambient glass shadow
          isDragging || isHovered
            ? "border-white/[0.60] bg-white/[0.14] dark:bg-white/[0.12] shadow-[0_24px_50px_-8px_rgba(0,0,0,0.82),_0_8px_20px_rgba(0,0,0,0.4),_inset_0_2px_1.5px_0_rgba(255,255,255,0.85),_inset_0_-1px_2px_0_rgba(255,255,255,0.25)]"
            : "shadow-[0_16px_40px_-10px_rgba(0,0,0,0.65),_0_4px_16px_rgba(0,0,0,0.3),_inset_0_1.5px_1px_0_rgba(255,255,255,0.65),_inset_0_-1px_1.5px_0_rgba(255,255,255,0.18)]",
          card.widthClass || "w-full"
        )}
      >
        {/* Top edge liquid prism glint */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/85 to-transparent pointer-events-none z-20"
        />

        {/* Specular internal gradient reflection */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/[0.18] via-transparent to-white/[0.02] pointer-events-none"
        />

        {/* Dynamic liquid light sheen across glass on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/[0.22] to-transparent skew-x-[-20deg]"
        />

        {/* Content Area */}
        <div className="relative z-10 flex flex-col flex-1">
          {/* 1. Header: Monospace Category Pill with sharp corners + sparkle */}
          <div className="flex items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-white/[0.15]">
            <span className="font-mono text-[8.5px] font-semibold tracking-[0.16em] uppercase px-1.5 py-0.5 rounded-[2px] bg-white/[0.16] text-white border border-white/[0.38] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
              {card.category}
            </span>
            <span className="text-white/80 text-[9.5px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">✦</span>
          </div>

          {/* 2. Headline */}
          <h3 className="font-fraunces text-[15px] sm:text-[16px] font-medium text-white leading-[1.22] tracking-tight mb-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.92)]">
            {card.title}
          </h3>

          {/* 3. Statement Quote (if present) */}
          {card.statement && (
            <p className="font-fraunces italic text-[11.5px] sm:text-[12px] text-[#F3E8FF] leading-snug mb-2 pl-2 border-l-[1.5px] border-white/70 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.92)]">
              {card.statement}
            </p>
          )}

          {/* 4. Description */}
          {card.description && (
            <p className="font-sora text-[11px] sm:text-[11.5px] text-white/95 leading-[1.6] font-normal drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.9)]">
              {card.description}
            </p>
          )}

          {/* 5. Bullet List (if present) */}
          {card.items && card.items.length > 0 && (
            <ul className="mt-1 space-y-0.5 font-sora text-[10.5px] sm:text-[11px] text-white/90">
              {card.items.map((item, idx) => {
                const isPlaceholder = item.startsWith("[");
                return (
                  <li
                    key={idx}
                    className={cn(
                      "flex items-start gap-1.5 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]",
                      isPlaceholder
                        ? "text-white/60 italic text-[10px] pt-0.5"
                        : "text-white/95"
                    )}
                  >
                    <span
                      className={cn(
                        "select-none shrink-0 text-[8.5px] mt-0.5",
                        isPlaceholder
                          ? "text-white/40"
                          : "text-[#C4B5FD]"
                      )}
                    >
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* 6. Subtle Monospace Placeholder / Move hint */}
        <div className="relative z-10 mt-2.5 pt-1 border-t border-white/[0.12] flex items-center justify-between">
          <span className="font-mono text-[8px] text-white/70 italic tracking-tight truncate max-w-[200px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {card.placeholderNote || "Drag to rearrange"}
          </span>
          <span className="font-mono text-[7.5px] text-white/75 uppercase tracking-wider pl-1.5 flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            <span className="w-1 h-1 rounded-full bg-[#C4B5FD] shadow-[0_0_6px_#C4B5FD]" />
            MOVE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
