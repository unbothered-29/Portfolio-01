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
        COMPACT DARK LIQUID GLASS CARD CONTAINER 
        - Architectural sharp corners: rounded-[3px] (2px–6px max)
        - Reduced compact proportions to let the aurora background breathe
        - Translucent dark violet / deep navy / lavender glass
        - Specular inner highlights, soft atmospheric shadow, and subtle luminous edge
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
          "relative overflow-hidden p-3.5 sm:p-4 rounded-[3px] border transition-all duration-200 ease-out flex flex-col justify-between",
          // Dark Liquid Glass palette matching aurora borealis
          "bg-[#0D081B]/[0.72] dark:bg-[#0A0617]/[0.80]",
          "backdrop-blur-[24px] backdrop-saturate-[180%]",
          "border-white/[0.20] dark:border-white/[0.18]",
          // Specular highlights & ambient glass shadow
          isDragging || isHovered
            ? "border-white/[0.38] shadow-[0_20px_45px_-8px_rgba(0,0,0,0.88),_0_6px_16px_rgba(20,10,38,0.4),_inset_0_1.5px_1px_0_rgba(255,255,255,0.4),_inset_0_-1px_1.5px_0_rgba(196,181,253,0.25)]"
            : "shadow-[0_14px_32px_-10px_rgba(0,0,0,0.72),_0_3px_12px_rgba(10,5,22,0.25),_inset_0_1px_1px_0_rgba(255,255,255,0.22),_inset_0_-1px_1px_0_rgba(196,181,253,0.14)]",
          card.widthClass || "w-full"
        )}
      >
        {/* Specular internal gradient reflection */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-[#8B5CF6]/[0.08] pointer-events-none"
        />

        {/* Dynamic liquid light sheen across glass on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-700 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/[0.12] to-transparent skew-x-[-20deg]"
        />

        {/* Content Area */}
        <div className="relative z-10 flex flex-col flex-1">
          {/* 1. Header: Monospace Category Pill with sharp corners + sparkle */}
          <div className="flex items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-white/[0.08]">
            <span className="font-mono text-[8.5px] font-semibold tracking-[0.16em] uppercase px-1.5 py-0.5 rounded-[2px] bg-[#7C3AED]/25 text-[#E9D5FF] border border-[#A78BFA]/25">
              {card.category}
            </span>
            <span className="text-[#C4B5FD]/60 text-[9.5px]">✦</span>
          </div>

          {/* 2. Headline */}
          <h3 className="font-fraunces text-[15px] sm:text-[16px] font-medium text-white leading-[1.22] tracking-tight mb-1.5">
            {card.title}
          </h3>

          {/* 3. Statement Quote (if present) */}
          {card.statement && (
            <p className="font-fraunces italic text-[11.5px] sm:text-[12px] text-[#DDD6FE] leading-snug mb-2 pl-2 border-l-[1.5px] border-[#A78BFA]/80">
              {card.statement}
            </p>
          )}

          {/* 4. Description */}
          {card.description && (
            <p className="font-sora text-[11px] sm:text-[11.5px] text-[#D8D2EB] leading-[1.6] font-normal">
              {card.description}
            </p>
          )}

          {/* 5. Bullet List (if present) */}
          {card.items && card.items.length > 0 && (
            <ul className="mt-1 space-y-0.5 font-sora text-[10.5px] sm:text-[11px] text-[#DDD6FE]">
              {card.items.map((item, idx) => {
                const isPlaceholder = item.startsWith("[");
                return (
                  <li
                    key={idx}
                    className={cn(
                      "flex items-start gap-1.5 leading-snug",
                      isPlaceholder
                        ? "text-[#9D93B8] italic text-[10px] pt-0.5"
                        : ""
                    )}
                  >
                    <span
                      className={cn(
                        "select-none shrink-0 text-[8.5px] mt-0.5",
                        isPlaceholder
                          ? "text-[#C4B5FD]/40"
                          : "text-[#A78BFA]"
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
        <div className="relative z-10 mt-2.5 pt-1 border-t border-white/[0.06] flex items-center justify-between">
          <span className="font-mono text-[8px] text-[#A69BBF] italic tracking-tight truncate max-w-[200px]">
            {card.placeholderNote || "Drag to rearrange"}
          </span>
          <span className="font-mono text-[7.5px] text-[#8678A7] uppercase tracking-wider pl-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#A78BFA]/70" />
            MOVE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
