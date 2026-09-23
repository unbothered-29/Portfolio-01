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
  onBringToFront?: () => void;
}

export function SomeBitsOfMeCard({
  card,
  index,
  className,
  isMobile = false,
  onBringToFront,
}: SomeBitsOfMeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const rotation = card.layout?.rotation ?? card.rotationDeg ?? 0;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      whileDrag={{ scale: 1.03, cursor: "grabbing" }}
      whileHover={{ scale: 1.015 }}
      onPointerDown={() => onBringToFront?.()}
      onDragStart={() => {
        setIsDragging(true);
        onBringToFront?.();
      }}
      onDragEnd={() => setIsDragging(false)}
      initial={{
        opacity: 0,
        scale: 0.94,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className={cn(
        "select-none cursor-grab active:cursor-grabbing touch-none",
        isDragging ? "z-50" : "",
        className
      )}
    >
      {/* 
        LIQUID OPTICAL GLASS LENS SQUIRCLE (Inspired by Apple iOS "Clear" Glass Lens)
        - Ultra-rounded squircle radius (rounded-[32px] sm:rounded-[36px] md:rounded-[38px])
        - Dual-rim specular bevel: crisp outer border + inner 3D refraction rim
        - Chromatic edge dispersion & specular catch-light
        - Crystal-clear optical transparency (letting flower.jpg shine through with refraction)
        - Clean layout without any editable lines
      */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isDragging
            ? "rotate(0deg)"
            : isHovered
            ? `rotate(${rotation * 0.3}deg)`
            : `rotate(${rotation}deg)`,
          width: !isMobile && card.layout?.width ? `${card.layout.width}px` : undefined,
          minHeight: !isMobile && card.layout?.minHeight ? `${card.layout.minHeight}px` : undefined,
        }}
        className={cn(
          "relative group overflow-hidden p-5 sm:p-6 rounded-[32px] sm:rounded-[36px] md:rounded-[38px] transition-shadow duration-300 ease-out flex flex-col justify-between select-none",
          // Crystal Clear Optical Glass (No blur - 100% sharp background visibility, stable on hover)
          "bg-white/[0.06] dark:bg-black/[0.12]",
          "backdrop-saturate-[120%] backdrop-contrast-[104%]",
          "border border-white/70 dark:border-white/55",
          // Specular highlights & deep ambient floating shadow
          isDragging
            ? "shadow-[0_32px_70px_-10px_rgba(0,0,0,0.75),_0_16px_32px_-8px_rgba(0,0,0,0.45),_inset_0_2px_3px_0_rgba(255,255,255,0.95),_inset_0_0_24px_2px_rgba(255,255,255,0.2),_inset_0_-2px_4px_0_rgba(0,0,0,0.3)] border-white/90"
            : "shadow-[0_24px_50px_-10px_rgba(0,0,0,0.65),_0_10px_20px_-6px_rgba(0,0,0,0.35),_inset_0_1.5px_2px_0_rgba(255,255,255,0.85),_inset_0_0_16px_0_rgba(255,255,255,0.15),_inset_0_-2px_4px_0_rgba(0,0,0,0.25)]",
          card.widthClass || "w-full"
        )}
      >
        {/* 1. Inner Curved Bevel Rim (Simulating thick acrylic edge refraction) */}
        <div
          aria-hidden="true"
          className="absolute inset-[2.5px] rounded-[30px] sm:rounded-[34px] md:rounded-[36px] pointer-events-none border border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.65),_inset_0_-2px_4px_rgba(0,0,0,0.25)] z-20"
        />

        {/* 2. Top-Left Specular Glass Catch-Light */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-white/20 blur-xl pointer-events-none z-10"
        />

        {/* 3. Top-edge curved prism glint */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-20"
        />

        {/* 4. Specular diagonal light reflection across lens */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[32px] sm:rounded-[36px] md:rounded-[38px] bg-gradient-to-br from-white/[0.22] via-transparent to-white/[0.04] pointer-events-none z-10"
        />

        {/* Content Area */}
        <div className="relative z-20 flex flex-col flex-1">
          {/* Header: iOS Glass Pill Category Tag */}
          <div className="flex items-center mb-3">
            <span className="font-sora text-[9px] sm:text-[9.5px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              {card.category}
            </span>
          </div>

          {/* Primary Title (Styled with "Clear" prominent clarity) */}
          <h3 className="font-sora text-[17px] sm:text-[18.5px] font-semibold text-white leading-tight tracking-[-0.015em] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {card.title}
          </h3>

          {/* Statement Quote (if present) */}
          {card.statement && (
            <p className="font-sora italic text-[11.5px] sm:text-[12px] text-white/95 leading-relaxed mb-2.5 px-3 py-2 rounded-2xl bg-white/[0.12] border border-white/25 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.8)]">
              {card.statement}
            </p>
          )}

          {/* Description */}
          {card.description && (
            <p className="font-sora text-[11.5px] sm:text-[12px] text-white/90 leading-[1.65] font-normal drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]">
              {card.description}
            </p>
          )}

          {/* Bullet List (if present) */}
          {card.items && card.items.length > 0 && (
            <ul className="mt-2 space-y-1 font-sora text-[11px] sm:text-[11.5px] text-white/95">
              {card.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] text-white/95"
                >
                  <span className="select-none shrink-0 text-[10px] mt-0.5 text-white/80">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
