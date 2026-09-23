import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface BlockData {
  intensity: number;
  colorType?: number; // small variation in violet/lavender tint
}

export function HeroAtmosphere() {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Block Grid Configuration
    const BLOCK_SIZE = 52; // 52px square cells
    let cols = 0;
    let rows = 0;

    // Map storing currently active/illuminated blocks: key = `${col}_${row}`
    const activeBlocks = new Map<string, BlockData>();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / BLOCK_SIZE);
      rows = Math.ceil(height / BLOCK_SIZE);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pointer tracking across the parent hero section
    const activateBlock = (col: number, row: number, power: number = 1.0) => {
      if (col < 0 || col >= cols || row < 0 || row >= rows) return;
      const key = `${col}_${row}`;
      const existing = activeBlocks.get(key);
      const newIntensity = Math.min(1.0, (existing?.intensity || 0) + power);
      activeBlocks.set(key, {
        intensity: newIntensity,
        colorType: existing?.colorType ?? Math.floor(Math.random() * 3),
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > width || y < 0 || y > height) return;

      const centerCol = Math.floor(x / BLOCK_SIZE);
      const centerRow = Math.floor(y / BLOCK_SIZE);

      // Light up central block and soft cross-neighbor blocks
      activateBlock(centerCol, centerRow, 0.95);
      activateBlock(centerCol - 1, centerRow, 0.45);
      activateBlock(centerCol + 1, centerRow, 0.45);
      activateBlock(centerCol, centerRow - 1, 0.45);
      activateBlock(centerCol, centerRow + 1, 0.45);
    };

    // Attach pointer listener to parent or window for smooth tracking across whole Hero
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Ambient random block pulses
    let lastAmbientTime = 0;

    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const dt = Math.min(now - lastTimestamp, 50); // clamp delta
      lastTimestamp = now;

      // Random ambient blocks (every ~350ms)
      if (now - lastAmbientTime > 350) {
        lastAmbientTime = now;
        if (cols > 0 && rows > 0) {
          // Weighted towards central area
          const randomCol = Math.floor(cols * (0.2 + Math.random() * 0.6));
          const randomRow = Math.floor(rows * (0.2 + Math.random() * 0.6));
          activateBlock(randomCol, randomRow, 0.35 + Math.random() * 0.35);
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Center coordinates for radial mask falloff
      const cx = width / 2;
      const cy = height * 0.46;
      const rx = width * 0.58;
      const ry = height * 0.58;

      // Draw Grid Lines & Active Blocks
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * BLOCK_SIZE;
          const by = r * BLOCK_SIZE;

          // Compute radial distance falloff from center
          const dx = (bx + BLOCK_SIZE / 2 - cx) / rx;
          const dy = (by + BLOCK_SIZE / 2 - cy) / ry;
          const distSq = dx * dx + dy * dy;
          if (distSq > 1.35) continue; // Outside radial mask

          const radialFactor = Math.max(0, 1 - distSq / 1.35);

          const key = `${c}_${r}`;
          const block = activeBlocks.get(key);

          // 1. Draw Subtle Base Grid Block Border
          const baseBorderAlpha = isDark
            ? 0.045 * radialFactor
            : 0.065 * radialFactor;

          ctx.strokeStyle = isDark
            ? `rgba(196, 181, 253, ${baseBorderAlpha})`
            : `rgba(88, 60, 126, ${baseBorderAlpha})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(bx + 0.5, by + 0.5, BLOCK_SIZE, BLOCK_SIZE);

          // 2. Draw Active / Illuminated State
          if (block && block.intensity > 0) {
            const intensity = block.intensity * Math.min(1, radialFactor + 0.2);

            // Theme-adjusted vivid fill colors
            if (isDark) {
              // Obsidian Dark: Radiant electric amethyst / soft lavender glow
              const fillAlpha = intensity * 0.28;
              const strokeAlpha = intensity * 0.55;

              if (block.colorType === 0) {
                ctx.fillStyle = `rgba(168, 85, 247, ${fillAlpha})`;
                ctx.strokeStyle = `rgba(196, 181, 253, ${strokeAlpha})`;
              } else if (block.colorType === 1) {
                ctx.fillStyle = `rgba(139, 92, 246, ${fillAlpha})`;
                ctx.strokeStyle = `rgba(216, 180, 254, ${strokeAlpha})`;
              } else {
                ctx.fillStyle = `rgba(192, 132, 252, ${fillAlpha})`;
                ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha * 0.8})`;
              }
            } else {
              // Lavender Light: Fresh luminous purple-lavender blocks
              const fillAlpha = intensity * 0.32;
              const strokeAlpha = intensity * 0.6;

              if (block.colorType === 0) {
                ctx.fillStyle = `rgba(196, 181, 253, ${fillAlpha})`;
                ctx.strokeStyle = `rgba(139, 92, 246, ${strokeAlpha})`;
              } else if (block.colorType === 1) {
                ctx.fillStyle = `rgba(216, 180, 254, ${fillAlpha})`;
                ctx.strokeStyle = `rgba(168, 85, 247, ${strokeAlpha})`;
              } else {
                ctx.fillStyle = `rgba(185, 167, 255, ${fillAlpha})`;
                ctx.strokeStyle = `rgba(124, 58, 237, ${strokeAlpha})`;
              }
            }

            // Fill block with inner margin of 1px for clean separated tile feel
            ctx.fillRect(bx + 1, by + 1, BLOCK_SIZE - 1, BLOCK_SIZE - 1);

            // Glowing border
            ctx.lineWidth = 1;
            ctx.strokeRect(bx + 0.5, by + 0.5, BLOCK_SIZE, BLOCK_SIZE);

            // Decay block intensity smoothly over time (~900ms)
            block.intensity -= (dt / 1000) * 1.15;
            if (block.intensity <= 0.005) {
              activeBlocks.delete(key);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
    >
      {/* Base ambient gradient background that smoothly blends with body */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-[#09080E] via-[#0D0A16] to-[#09080E]"
            : "bg-gradient-to-b from-[#FAFAFA] via-[#F8F5FF]/70 to-[#FAFAFA]"
        }`}
      />

      {/* Interactive Block Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Soft Vignette Mask to blend edges into the page */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_50%_48%,transparent_35%,#09080E_85%)]"
            : "bg-[radial-gradient(ellipse_at_50%_48%,transparent_35%,#FAFAFA_85%)]"
        }`}
      />
    </div>
  );
}
