import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

// Rich lavender glass luster grades for subtle organic variation
type LavenderGrade = "pure-lavender" | "soft-lilac" | "deep-amethyst-lavender";

interface GlassBoxItem {
  id: string;
  col: number;
  row: number;
  totalInCol: number;
  heightClass: string;
  grade: LavenderGrade;
}

export function InteractiveGlassGrid() {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";
  const containerRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [numCols, setNumCols] = useState(18);

  // Measure full screen width edge-to-edge with dense, rich columns
  useEffect(() => {
    const calculateCols = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth || window.innerWidth;
      // Tile width approx 48px-64px for a denser, richer architectural mosaic
      const colWidth = width < 640 ? 46 : width < 1024 ? 56 : 64;
      const cols = Math.max(8, Math.floor(width / colWidth));
      setNumCols(cols);
    };

    calculateCols();
    window.addEventListener("resize", calculateCols);
    return () => window.removeEventListener("resize", calculateCols);
  }, []);

  // Window-level mouse & touch tracking across the bottom hero area throttled via RAF
  useEffect(() => {
    let rafId: number | null = null;

    const handleMove = (clientX: number, clientY: number) => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const padding = 70;

        if (
          clientX >= rect.left - padding &&
          clientX <= rect.right + padding &&
          clientY >= rect.top - padding &&
          clientY <= rect.bottom + padding
        ) {
          setMousePos({
            x: clientX - rect.left,
            y: clientY - rect.top,
          });
          setIsHovered(true);
        } else {
          setIsHovered(false);
          setMousePos(null);
        }
      });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      setIsHovered(false);
      setMousePos(null);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Staggered, non-uniform columns across full width
  const columnsData = useMemo(() => {
    const cols: GlassBoxItem[][] = [];

    // Stepped undulating skyline silhouette
    const heightProfile = [
      2, 3, 3, 4, 3, 4, 5, 5, 4, 5, 4, 3, 4, 3, 3, 2, 3, 4, 3, 2, 3, 4, 3, 4
    ];

    const grades: LavenderGrade[] = [
      "pure-lavender",
      "soft-lilac",
      "deep-amethyst-lavender",
    ];

    for (let c = 0; c < numCols; c++) {
      const profileIndex = c % heightProfile.length;
      const count = heightProfile[profileIndex];

      const colBoxes: GlassBoxItem[] = [];

      for (let r = 0; r < count; r++) {
        const grade = grades[(c * 3 + r * 5) % grades.length];

        // Slight organic variation in aspect ratios
        const isSlightlyTall = (c + r) % 6 === 0;
        const isSlightlyWide = (c * 2 + r) % 8 === 0;

        const heightClass = isSlightlyTall
          ? "aspect-[1/1.10]"
          : isSlightlyWide
          ? "aspect-[1.08/1]"
          : "aspect-square";

        colBoxes.push({
          id: `lavender-box-${c}-${r}`,
          col: c,
          row: r,
          totalInCol: count,
          heightClass,
          grade,
        });
      }

      cols.push(colBoxes);
    }

    return cols;
  }, [numCols]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute bottom-0 inset-x-0 w-full h-[240px] sm:h-[285px] md:h-[330px] pointer-events-none select-none overflow-hidden flex items-end justify-center z-[5]"
    >
      {/* 
        Full-width Rich Lavender Glass Mosaic Container:
        - Spans 100% edge-to-edge
        - Tight micro-spacing (gap-[2px] to gap-[3.5px]) for an ultra-dense, rich look
        - Masked vertically to fade smoothly into the hero atmosphere at the top
      */}
      <div
        className="w-full h-full flex items-end justify-between gap-[2px] sm:gap-[3px] md:gap-[3.5px] px-1 sm:px-1.5 md:px-2 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
        }}
      >
        {columnsData.map((colBoxes, colIndex) => {
          // Staggered vertical shift per column (running bond / non-uniform seams)
          const isShifted = colIndex % 2 === 1;
          const shiftClass = isShifted ? "mb-1 sm:mb-1.5" : "mb-0";

          return (
            <div
              key={`col-${colIndex}`}
              className={`flex-1 flex flex-col justify-end gap-[2px] sm:gap-[3px] md:gap-[3.5px] min-w-0 ${shiftClass}`}
            >
              {colBoxes.map((box) => {
                let proximity = 0;

                if (isHovered && mousePos && containerRef.current) {
                  const containerWidth = containerRef.current.offsetWidth || window.innerWidth;
                  const containerHeight = containerRef.current.offsetHeight;

                  const colWidth = containerWidth / numCols;
                  const boxCenterX = (box.col + 0.5) * colWidth;

                  const boxHeight = colWidth;
                  const boxCenterY = containerHeight - (box.totalInCol - box.row - 0.5) * (boxHeight + 4);

                  const distance = Math.hypot(boxCenterX - mousePos.x, boxCenterY - mousePos.y);
                  const maxRadius = 240; // Interaction wave radius

                  if (distance < maxRadius) {
                    const normalized = distance / maxRadius;
                    proximity = Math.max(0, Math.cos(normalized * (Math.PI / 2)));
                  }
                }

                // Invisible when away, reveals rich lavender glass on hover
                const activeOpacity = proximity > 0.02
                  ? (isDark ? Math.min(1, proximity * 1.15) : Math.min(1, proximity * 1.35))
                  : 0;
                const scale = 1 + proximity * 0.055;

                // Ultra-light, airy Lavender Palette across themes
                let bgGradient = "";
                let borderColor = "";
                let shadowGlow = "";

                if (isDark) {
                  // Obsidian Dark: Luminous light-amethyst lavender smoke glass
                  if (box.grade === "pure-lavender") {
                    bgGradient = "bg-gradient-to-br from-[#534080]/60 via-[#402F68]/50 to-[#2A1D4B]/40";
                  } else if (box.grade === "soft-lilac") {
                    bgGradient = "bg-gradient-to-br from-[#4C3A75]/58 via-[#38285C]/48 to-[#241740]/38";
                  } else {
                    bgGradient = "bg-gradient-to-br from-[#5C478D]/62 via-[#493577]/52 to-[#312154]/42";
                  }
                  borderColor = "border-[#DDD6FE]/30";
                  shadowGlow = `0 8px 24px -4px rgba(196, 181, 253, ${proximity * 0.35}), 0 2px 8px rgba(0, 0, 0, 0.45)`;
                } else {
                  // Crystal Light: Crisp, luminous lavender frosted crystal glass with distinct edge definition
                  if (box.grade === "pure-lavender") {
                    bgGradient = "bg-gradient-to-br from-white/95 via-[#EFE7FE]/90 to-[#DDD0FC]/80";
                  } else if (box.grade === "soft-lilac") {
                    bgGradient = "bg-gradient-to-br from-white/98 via-[#F4EEFF]/92 to-[#E4D7FE]/82";
                  } else {
                    bgGradient = "bg-gradient-to-br from-[#FCFAFF]/95 via-[#EBE0FE]/90 to-[#D7C5FD]/82";
                  }
                  borderColor = "border-[#C4B5FD]/75";
                  shadowGlow = `0 14px 32px -4px rgba(139, 92, 246, ${Math.min(0.48, proximity * 0.45 + 0.08)}), 0 4px 14px rgba(109, 61, 245, 0.15), 0 1px 3px rgba(30, 20, 50, 0.06)`;
                }

                return (
                  <div
                    key={box.id}
                    // Sleek, modern micro-radius rounded-[3px] sm:rounded-[4px] md:rounded-[5px]
                    className={`relative w-full ${box.heightClass} rounded-[3px] sm:rounded-[4px] md:rounded-[5px] transition-all duration-300 ease-out will-change-transform`}
                    style={{
                      opacity: activeOpacity,
                      transform: `scale(${scale})`,
                    }}
                  >
                    {/* 1. Rich Lavender Liquid Glass Frosted Surface */}
                    <div
                      className={`absolute inset-0 rounded-[3px] sm:rounded-[4px] md:rounded-[5px] ${bgGradient} transition-colors duration-300`}
                      style={{
                        boxShadow: shadowGlow,
                      }}
                    />

                    {/* 2. Precision Crystal Bevel Hairline Border */}
                    <div
                      className={`absolute inset-0 rounded-[3px] sm:rounded-[4px] md:rounded-[5px] border ${borderColor} pointer-events-none transition-colors duration-300`}
                      style={{
                        boxShadow: isDark
                          ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.28), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.5)"
                          : "inset 0 1.5px 2px 0 rgba(255, 255, 255, 1), inset 0 -1.5px 2px 0 rgba(147, 51, 234, 0.30), inset 0 0 0 1px rgba(255, 255, 255, 0.75)",
                      }}
                    />

                    {/* 3. Top Specular High-Luminance Glass Sheen */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-1 top-0.5 h-[42%] rounded-t-[2px] sm:rounded-t-[3px] pointer-events-none ${
                        isDark
                          ? "bg-gradient-to-b from-white/[0.28] via-white/[0.10] to-transparent"
                          : "bg-gradient-to-b from-white via-white/60 to-transparent"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
