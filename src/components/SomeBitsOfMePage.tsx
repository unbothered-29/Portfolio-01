import React, { useState, useEffect, useRef } from "react";
import { Upload, Check } from "lucide-react";
import { GlassNavbar } from "./GlassNavbar";
import { FullscreenNavOverlay } from "./FullscreenNavOverlay";
import { GlassCursor } from "./GlassCursor";
import { SomeBitsOfMeCard } from "./SomeBitsOfMeCard";
import {
  PERSONAL_BITS_DATA,
  PERSONAL_BITS_INTRO,
} from "../data/personalBitsData";
import {
  saveAuroraImage,
  getAuroraImage,
} from "../utils/imageStorage";

interface SomeBitsOfMePageProps {
  onBackToHome: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

// Default background image (flower.jpg)
const DEFAULT_BG_IMAGE = "/flower.jpg";

export function SomeBitsOfMePage({
  onBackToHome,
  onNavigateSection,
  onOpenContact,
}: SomeBitsOfMePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragOverCanvas, setIsDragOverCanvas] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Background image state initialized with flower.jpg
  const [bgImage, setBgImage] = useState<string>(DEFAULT_BG_IMAGE);
  const [topCardId, setTopCardId] = useState<string | null>(null);

  // Load custom saved background image from IndexedDB / localStorage on mount
  useEffect(() => {
    getAuroraImage().then((saved) => {
      // If a custom image exists and is not the previous aurora wallpaper, use it; otherwise use flower.jpg
      if (saved && !saved.includes("aurora") && saved !== "/aurora.jpg") {
        setBgImage(saved);
      } else {
        setBgImage(DEFAULT_BG_IMAGE);
      }
    });
  }, []);

  // Central title interactive state (Figma-style drag and 8-handle resize)
  const [isSelected, setIsSelected] = useState(false);
  const [titleState, setTitleState] = useState({
    x: 0,
    y: 0,
    width: 320,
    height: 170,
  });

  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    handle: string | null;
  } | null>(null);

  // Mouse tracking for subtle desktop parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const normX = (e.clientX - centerX) / centerX;
      const normY = (e.clientY - centerY) / centerY;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Global pointer tracking for dragging & 8-point resizing of the central title
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current) return;
      const {
        startX,
        startY,
        initialX,
        initialY,
        initialWidth,
        initialHeight,
        handle,
      } = dragStartRef.current;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (handle === "drag") {
        setTitleState((prev) => ({
          ...prev,
          x: initialX + dx,
          y: initialY + dy,
        }));
      } else if (handle) {
        let newWidth = initialWidth;
        let newHeight = initialHeight;
        let newX = initialX;
        let newY = initialY;

        // Horizontal sizing
        if (handle.includes("e")) {
          newWidth = Math.max(220, Math.min(600, initialWidth + dx));
        }
        if (handle.includes("w")) {
          const potentialW = initialWidth - dx;
          if (potentialW >= 220 && potentialW <= 600) {
            newWidth = potentialW;
            newX = initialX + dx;
          }
        }

        // Vertical sizing
        if (handle.includes("s")) {
          newHeight = Math.max(110, Math.min(360, initialHeight + dy));
        }
        if (handle.includes("n")) {
          const potentialH = initialHeight - dy;
          if (potentialH >= 110 && potentialH <= 360) {
            newHeight = potentialH;
            newY = initialY + dy;
          }
        }

        // Proportional constraint for corner handles
        if (
          handle === "se" ||
          handle === "nw" ||
          handle === "ne" ||
          handle === "sw"
        ) {
          const ratio = initialHeight / initialWidth;
          newHeight = Math.round(newWidth * ratio);
        }

        setTitleState({
          width: Math.round(newWidth),
          height: Math.round(newHeight),
          x: Math.round(newX),
          y: Math.round(newY),
        });
      }
    };

    const handlePointerUp = () => {
      dragStartRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const handleStartResize = (e: React.PointerEvent, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSelected(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: titleState.x,
      initialY: titleState.y,
      initialWidth: titleState.width,
      initialHeight: titleState.height,
      handle,
    };
  };

  const handleTitlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: titleState.x,
      initialY: titleState.y,
      initialWidth: titleState.width,
      initialHeight: titleState.height,
      handle: "drag",
    };
  };

  const handleNavMenuClick = (sectionId: string) => {
    setIsMenuOpen(false);
    onBackToHome();
    if (onNavigateSection) {
      setTimeout(() => {
        onNavigateSection(sectionId);
      }, 150);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Process image file and persist across IndexedDB + LocalStorage + Server File
  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        setBgImage(result);
        await saveAuroraImage(result);
        showToast("✨ Background image applied and saved!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCanvas(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

  // Dynamically scale title typography to perfectly match box dimensions
  const titleFontSize = Math.max(
    30,
    Math.min(64, Math.round(titleState.width * 0.165))
  );

  return (
    <div
      id="some-bits-of-me-root"
      onClick={() => {
        setIsSelected(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOverCanvas(true);
      }}
      onDragLeave={() => setIsDragOverCanvas(false)}
      onDrop={handleDrop}
      className="relative w-full h-screen max-h-screen overflow-hidden text-[#34154E] dark:text-[#F5F3FA] font-sora selection:bg-[#C4B5FD]/40 selection:text-[#34154E] dark:selection:bg-[#A78BFA]/30 dark:selection:text-white"
    >
      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        FLOWER BACKGROUND (flower.jpg)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src={bgImage}
          alt="Flower background for Some Bits of Me"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.01] transition-all duration-700 ease-out"
        />
        {/* Subtle dark vignette allowing the cards & text to pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55 pointer-events-none" />
      </div>

      {/* Drag & drop visual highlight */}
      {isDragOverCanvas && (
        <div className="absolute inset-0 z-50 pointer-events-none border-2 border-dashed border-[#C4B5FD] bg-[#7C3AED]/35 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-black/90 px-7 py-4 rounded-xl border border-white/25 text-white font-mono text-sm flex items-center gap-3 shadow-2xl">
            <Upload className="w-6 h-6 text-[#C4B5FD] animate-bounce" />
            <span>Drop your image file here to set as background</span>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#0D081B]/95 backdrop-blur-xl border border-white/25 shadow-2xl text-white font-sora text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#34D399]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Glass Navbar */}
      <GlassNavbar
        onNavigate={(sectionId) => {
          if (sectionId === "top" || sectionId === "hero") {
            onBackToHome();
          } else {
            handleNavMenuClick(sectionId);
          }
        }}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* Fullscreen Navigation Overlay */}
      <FullscreenNavOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavMenuClick}
        onContactClick={() => {
          setIsMenuOpen(false);
          onBackToHome();
          if (onOpenContact) onOpenContact();
        }}
      />

      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        FREEFORM DESKTOP EDITORIAL CANVAS
        - Decreased card sizes allowing the aurora sky to breathe
        - All cards are movable / draggable with cursor-grab
        - Overlapping depth layers
        - Central Typographic Anchor: Draggable + 8-Point Design Editor Resizing
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <main
        id="canvas-click-catcher"
        className="hidden lg:block relative z-10 w-full h-full max-h-screen overflow-hidden"
      >
        {/* 
          1. CENTRAL TYPOGRAPHIC ANCHOR
          - Distinct from normal information cards
          - Features Fraunces display typography
          - Draggable & resizable via 8 handles when selected
        */}
        <div
          style={{
            position: "absolute",
            top: "43%",
            left: "47%",
            transform: `translate(calc(-50% + ${titleState.x}px), calc(-50% + ${titleState.y}px))`,
            width: `${titleState.width}px`,
            height: `${titleState.height}px`,
            zIndex: 25,
          }}
          onPointerDown={handleTitlePointerDown}
          onClick={(e) => {
            e.stopPropagation();
            setIsSelected(true);
          }}
          className="group/title absolute select-none flex flex-col items-center justify-center cursor-move"
        >
          {/* Liquid optical glass lens squircle backdrop (Crystal clear, zero blur) */}
          <div className="absolute inset-0 bg-white/[0.06] backdrop-saturate-[120%] backdrop-contrast-[104%] border border-white/60 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.65),_inset_0_1.5px_2px_0_rgba(255,255,255,0.85),_inset_0_0_24px_0_rgba(255,255,255,0.18)] rounded-[32px] sm:rounded-[36px] -z-10" />
          <div className="absolute inset-[2.5px] rounded-[30px] sm:rounded-[34px] pointer-events-none border border-white/35 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] -z-10" />

          {/* 8 Transform Handles for Adjusting (Clean, borderless handles visible when selected) */}
          {isSelected && (
            <>
              {/* Corner Handles */}
              <span
                onPointerDown={(e) => handleStartResize(e, "nw")}
                title="Resize Top-Left"
                className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-nwse-resize hover:scale-125 transition-transform z-30"
              />
              <span
                onPointerDown={(e) => handleStartResize(e, "ne")}
                title="Resize Top-Right"
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-nesw-resize hover:scale-125 transition-transform z-30"
              />
              <span
                onPointerDown={(e) => handleStartResize(e, "sw")}
                title="Resize Bottom-Left"
                className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-nesw-resize hover:scale-125 transition-transform z-30"
              />
              <span
                onPointerDown={(e) => handleStartResize(e, "se")}
                title="Resize Bottom-Right"
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-nwse-resize hover:scale-125 transition-transform z-30"
              />

              {/* Edge Handles */}
              <span
                onPointerDown={(e) => handleStartResize(e, "n")}
                title="Resize Top"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-ns-resize hover:scale-125 transition-transform z-30"
              />
              <span
                onPointerDown={(e) => handleStartResize(e, "s")}
                title="Resize Bottom"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-ns-resize hover:scale-125 transition-transform z-30"
              />
              <span
                onPointerDown={(e) => handleStartResize(e, "w")}
                title="Resize Left"
                className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-ew-resize hover:scale-125 transition-transform z-30"
              />
              <span
                onPointerDown={(e) => handleStartResize(e, "e")}
                title="Resize Right"
                className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] cursor-ew-resize hover:scale-125 transition-transform z-30"
              />
            </>
          )}

          {/* Central Editorial Display Typography */}
          <div className="p-2.5 text-center flex flex-col items-center justify-center">
            <h1
              style={{ fontSize: `${titleFontSize}px` }}
              className="font-fraunces font-bold text-white text-center leading-[0.92] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.92)] select-none pointer-events-none"
            >
              Some Bits
              <br />
              Of Me
            </h1>
          </div>
        </div>

        {/* 
          2. FREEFORM MOVABLE ASYMMETRICAL LIQUID GLASS CARDS
          - Decreased compact sizes
          - Freely draggable across the canvas
          - Retains individual x/y coordinates, subtle rotation, and intentional z-index overlap.
        */}
        {PERSONAL_BITS_DATA.map((card, index) => {
          const layout = card.layout;
          const isTop = topCardId === card.id;
          return (
            <div
              key={card.id}
              style={{
                position: "absolute",
                top: layout?.top,
                left: layout?.left,
                right: layout?.right,
                bottom: layout?.bottom,
                zIndex: isTop ? 50 : (layout?.zIndex || 10),
              }}
              onClick={(e) => {
                e.stopPropagation();
                setTopCardId(card.id);
              }}
              className="pointer-events-auto"
            >
              <SomeBitsOfMeCard
                card={card}
                index={index}
                isMobile={false}
                onBringToFront={() => setTopCardId(card.id)}
              />
            </div>
          );
        })}
      </main>

      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        MOBILE / TABLET STAGGERED VERTICAL LAYOUT (< lg)
        - Clean vertical rhythm with organic asymmetry
        - Sharp corners & dark liquid glass
        - Prominent central typography header
        - Zero horizontal overflow
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <div className="lg:hidden h-full overflow-y-auto px-4 sm:px-6 pt-24 pb-20 space-y-6">
        {/* Prominent Editorial Header */}
        <div className="flex flex-col items-center justify-center pt-2 pb-2">
          <div className="relative border border-white/60 px-6 py-4 bg-white/[0.06] backdrop-saturate-[120%] backdrop-contrast-[104%] rounded-[28px] sm:rounded-[32px] text-center shadow-[0_20px_45px_rgba(0,0,0,0.65),_inset_0_1.5px_2px_0_rgba(255,255,255,0.85),_inset_0_0_20px_0_rgba(255,255,255,0.18)]">
            <h1 className="font-fraunces text-[34px] sm:text-[40px] font-bold text-white leading-[0.95] drop-shadow-md">
              Some Bits
              <br />
              Of Me
            </h1>
            <p className="mt-1.5 font-mono text-[9.5px] text-[#DDD6FE]/80 tracking-widest uppercase">
              {PERSONAL_BITS_INTRO.subtitle}
            </p>
          </div>
        </div>

        {/* Staggered Vertical Cards with Intentional Asymmetry */}
        <div className="space-y-5">
          {PERSONAL_BITS_DATA.map((card, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={card.id}
                className={`w-full flex ${
                  isEven ? "justify-start pl-1" : "justify-end pr-1"
                }`}
              >
                <div className="w-full max-w-[340px]">
                  <SomeBitsOfMeCard
                    card={card}
                    index={idx}
                    isMobile={true}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Liquid Glass Isometric Cursor */}
      <GlassCursor />
    </div>
  );
}
