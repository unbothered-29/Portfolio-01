import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export function GlassCursor() {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";

  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only activate custom cursor if pointer is fine (mouse/trackpad, not touch-only)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) {
      return;
    }

    // Hide native cursor only when custom cursor is active on fine pointer device
    document.documentElement.classList.add("custom-glass-cursor-active");

    const updateInnerScale = () => {
      const innerEl = innerRef.current;
      if (!innerEl) return;
      if (isMouseDownRef.current) {
        innerEl.style.transform = "scale(0.88)";
      } else if (isHoveringRef.current) {
        innerEl.style.transform = "scale(1.18)";
      } else {
        innerEl.style.transform = "scale(1)";
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const cursorEl = cursorRef.current;
      if (!cursorEl) return;

      // Direct zero-lag 1:1 hardware coordinate positioning
      cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursorEl.style.opacity = "1";
      }

      // Check if target or ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            "button, a, input, textarea, select, [role='button'], [data-cursor='pointer'], .cursor-pointer"
          )
        );

        if (isHoveringRef.current !== isInteractive) {
          isHoveringRef.current = isInteractive;
          updateInnerScale();
        }
      }
    };

    const onMouseDown = () => {
      isMouseDownRef.current = true;
      updateInnerScale();
    };

    const onMouseUp = () => {
      isMouseDownRef.current = false;
      updateInnerScale();
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-glass-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        opacity: 0,
        transition: "opacity 0.12s ease",
      }}
    >
      {/* 
        Inner container for hover/click scaling.
        Negative offset aligns the sharp tip of the arrow (coordinate ~6.5, ~5.5)
        precisely with the client mouse coordinate.
      */}
      <div
        ref={innerRef}
        className="relative -top-[5.5px] -left-[6.5px] transition-transform duration-150 ease-out will-change-transform pointer-events-none"
        style={{
          transform: "scale(1)",
        }}
      >
        {/* ================================================================
            3D ISOMETRIC BEVELED LIQUID GLASS POINTER ARROW
            Luminous Lavender & Amethyst Purple Crystal Glass:
            - Prismatic luminous lavender & purple refraction
            - Specular crystal highlights on the ridges & borders
            - 3D beveled thickness with floating shadow
           ================================================================ */}
        <div className="relative w-[44px] h-[44px] pointer-events-none">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible drop-shadow-[0_8px_16px_rgba(168,85,247,0.45)] dark:drop-shadow-[0_8px_18px_rgba(168,85,247,0.65)] pointer-events-none"
          >
            <defs>
              {/* Soft Physical Ambient Shadow under Glass Pointer */}
              <filter id="glassPointerDepth" x="-20%" y="-20%" width="160%" height="160%">
                <feDropShadow
                  dx="2"
                  dy="4"
                  stdDeviation="2.5"
                  floodColor={isDark ? "rgba(0,0,0,0.75)" : "rgba(124, 58, 237, 0.35)"}
                />
              </filter>

              {/* 3D Extrusion Bevel Gradient (Glass Thickness in Lavender/Purple) */}
              <linearGradient id="glass3DThickness" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#DDD6FE" stopOpacity="0.90" />
                <stop offset="70%" stopColor="#A855F7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.80" />
              </linearGradient>

              {/* Top Face Liquid Glass Gradient: Luminous Crystal Lavender to Radiant Lilac */}
              <linearGradient id="glassTopFacet" x1="15%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#F5F3FF" stopOpacity="0.92" />
                <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.85" />
              </linearGradient>

              {/* Specular White Ridge Gleam */}
              <linearGradient id="specularGleam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.3" />
              </linearGradient>

              {/* Prismatic Inner Caustic Reflection (Lavender Glow) */}
              <radialGradient id="innerCaustic" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#EDE9FE" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.0" />
              </radialGradient>
            </defs>

            {/* Layer A: 3D Beveled Bottom Thickness (Extruded physical depth) */}
            <path
              d="M 6.5 5.5 L 29 17.5 L 32.5 21 L 22.5 25 L 18 35.5 L 14 32.5 L 18.5 22.5 L 6.5 5.5 Z"
              fill="url(#glass3DThickness)"
              filter="url(#glassPointerDepth)"
            />

            {/* Layer B: Right Bevel Edge Highlight (Lavender-Violet crystal) */}
            <path
              d="M 29 17.5 L 32.5 21 L 22.5 25 L 20 22 L 29 17.5 Z"
              fill="#A855F7"
              fillOpacity="0.95"
            />

            {/* Layer C: Bottom Bevel Edge Highlight (Deep Amethyst reflection) */}
            <path
              d="M 20 22 L 22.5 25 L 18 35.5 L 15.5 32 L 20 22 Z"
              fill="#7E22CE"
              fillOpacity="0.85"
            />

            {/* Layer D: Main Top Face Liquid Glass Prism (Lavender & Crystal) */}
            <path
              d="M 6.5 5.5 L 29 17.5 L 20 22 L 15.5 32 L 6.5 5.5 Z"
              fill="url(#glassTopFacet)"
              stroke="url(#specularGleam)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Layer E: Internal Caustic Light Spot */}
            <path
              d="M 8 8 L 24 16 L 19 20 L 15 26 L 8 8 Z"
              fill="url(#innerCaustic)"
              pointerEvents="none"
            />

            {/* Layer F: Specular Edge Reflection Arc (Crisp glass ridge) */}
            <path
              d="M 7 6 L 27.5 17 M 7 6 L 15 30"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeOpacity="0.95"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
