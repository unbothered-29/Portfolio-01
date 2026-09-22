import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

const FOLDER_PHOTOS: PhotoItem[] = [
  {
    id: "photo-left",
    title: "Exploration & Moments",
    caption: "Himachal & Trails",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1790003221/img-left_kejqyt.webp",
    rotation: -10,
    offsetX: -54,
    offsetY: -10,
  },
  {
    id: "photo-mid",
    title: "Visuals & Design",
    caption: "Late Nights & Systems",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1790003219/img-middle_ba52qx.webp",
    rotation: 0,
    offsetX: 0,
    offsetY: -38,
  },
  {
    id: "photo-right",
    title: "Spatial & Architecture",
    caption: "Tactile Architecture",
    image: "https://res.cloudinary.com/av9pwzc8/image/upload/v1790003222/img-right_sw0hpg.webp",
    rotation: 10,
    offsetX: 54,
    offsetY: -10,
  },
];

export function LavenderFolder() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const folderRef = useRef<HTMLDivElement>(null);

  // Close opened photo when clicking outside the folder
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (folderRef.current && !folderRef.current.contains(e.target as Node)) {
        setSelectedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={folderRef}
      className="relative w-full max-w-[380px] sm:max-w-[410px] mx-auto lg:mx-0 pt-32 sm:pt-36 pb-4 select-none"
    >
      {/* 
        CLEAN, REALISTIC CSS LAVENDER FOLDER
      */}
      <div className="relative w-full h-[200px] sm:h-[215px]">
        
        {/* BACK FOLDER TAB (Top Left) */}
        <div className="absolute -top-6 left-0 w-28 sm:w-32 h-7 rounded-t-2xl bg-[#C8B3F9] dark:bg-[#32234C] border-t border-l border-r border-[#B89EF5] dark:border-[#7C3AED]/40 z-0" />

        {/* BACK FOLDER BODY */}
        <div className="absolute inset-0 rounded-2xl rounded-tl-none bg-[#C8B3F9] dark:bg-[#32234C] border border-[#B89EF5] dark:border-[#7C3AED]/40 shadow-[0_12px_32px_rgba(147,112,219,0.18)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.55)] z-0" />

        {/* 
          THREE PHOTOS TUCKED INSIDE FOLDER
          - Hover / Click: smoothly pulls up, comes out of sleeve, expands to 3:4 portrait
          - Rest: tucked inside the lavender pocket
        */}
        <div className="absolute inset-x-0 bottom-4 flex items-end justify-center pointer-events-auto z-10">
          {FOLDER_PHOTOS.map((photo) => {
            const isSelected = selectedId === photo.id;
            const isHovered = hoveredId === photo.id;
            const isOut = isHovered || isSelected;
            const isMid = photo.id === "photo-mid";

            return (
              <motion.div
                key={photo.id}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId((prev) => (prev === photo.id ? null : photo.id));
                }}
                style={{
                  zIndex: isOut ? 40 : isMid ? 14 : 10,
                }}
                animate={{
                  rotate: isOut ? photo.rotation * 0.1 : photo.rotation,
                  x: photo.offsetX,
                  y: isOut ? photo.offsetY - 110 : photo.offsetY,
                  scale: isOut ? 1.06 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.6,
                }}
                className="absolute cursor-pointer select-none origin-bottom transform-gpu will-change-transform"
              >
                {/* 
                  Extended hover catch-zone:
                  When card slides up by 110px, this invisible bridge stays over the resting area
                  so the mouse NEVER prematurely leaves the card, eliminating jitter and lag loops.
                */}
                <div className="absolute inset-x-0 -bottom-28 h-28 pointer-events-auto" />

                {/* Clean Polaroid Style Card - Zero Text with GPU-accelerated box shadow */}
                <div
                  className={`relative w-[148px] sm:w-[160px] bg-white dark:bg-[#1C1A28] p-2 sm:p-2.5 pb-3 sm:pb-3.5 rounded-xl border border-black/8 dark:border-white/10 transition-shadow duration-300 ${
                    isOut
                      ? "shadow-[0_20px_45px_rgba(0,0,0,0.28)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
                      : "shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
                  }`}
                >
                  {/* Photo Frame - Smoothly animates to 3:4 portrait on hover or click */}
                  <motion.div
                    className="w-full overflow-hidden rounded-lg bg-[#ECEAF2] dark:bg-[#252233]"
                    animate={{
                      height: isOut ? 186 : 112,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                      mass: 0.6,
                    }}
                  >
                    <img
                      src={photo.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 
          FRONT FOLDER POCKET (Clean, Minimalist Lavender Sleeve - ZERO text)
          Sits at the bottom, holding the photos half-inside
        */}
        <div
          onClick={() => setSelectedId(null)}
          className="absolute inset-x-0 bottom-0 h-[120px] sm:h-[130px] rounded-b-2xl rounded-t-xl bg-[#DDD0FC] dark:bg-[#3B2956] border-t-2 border-white/60 dark:border-white/20 border-x border-b border-[#C4B5FD] dark:border-[#7C3AED]/40 shadow-[0_14px_30px_rgba(124,58,237,0.14)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] z-20 pointer-events-none"
        />
      </div>
    </div>
  );
}
