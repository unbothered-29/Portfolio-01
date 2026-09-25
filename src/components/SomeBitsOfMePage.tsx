import { useState } from "react";
import { GlassNavbar } from "./GlassNavbar";
import { FullscreenNavOverlay } from "./FullscreenNavOverlay";
import { GlassCursor } from "./GlassCursor";
import { CinematicBuildingFacade } from "./CinematicBuildingFacade";
import { ContactSection } from "./ContactSection";
import { useTheme } from "../context/ThemeContext";

interface SomeBitsOfMePageProps {
  onBackToHome: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export function SomeBitsOfMePage({
  onBackToHome,
  onNavigateSection,
  onOpenContact,
}: SomeBitsOfMePageProps) {
  const { theme } = useTheme();
  const isDark = theme === "obsidian";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavMenuClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (sectionId === "contact") {
      window.location.href =
        "mailto:chauhanjessicaa27@gmail.com?subject=Hello%20Jessicaa%20—%20Inquiry";
      return;
    }
    onBackToHome();
    if (onNavigateSection) {
      setTimeout(() => {
        onNavigateSection(sectionId);
      }, 150);
    }
  };

  return (
    <div
      id="some-bits-of-me-root"
      className={`relative w-full min-h-screen font-sora transition-colors duration-700 ${
        isDark
          ? "bg-[#07060A] text-[#F5F3FA] selection:bg-amber-400/30 selection:text-white"
          : "bg-[#F7F5FC] text-[#34154E] selection:bg-purple-200"
      }`}
    >
      {/* Floating Glass Navbar */}
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
        CINEMATIC BUILDING FACADE EXPERIENCE
        - Interactive architectural facade
        - Realistic background buildings with windows, cornices & water towers
        - Street light freestanding on the sidewalk
        - Light mode with airy sunlit window lighting
        - Directly connects to the main page ContactSection footer with NO gap
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}
      <CinematicBuildingFacade
        onBackToHome={onBackToHome}
        onNavigateSection={handleNavMenuClick}
        onOpenContact={onOpenContact}
      />

      {/* Signature Contact & Giant Wordmark Footer */}
      <ContactSection
        onOpenTalk={() => {
          if (onOpenContact) onOpenContact();
        }}
        onNavigate={handleNavMenuClick}
      />

      {/* Glass Cursor */}
      <GlassCursor />
    </div>
  );
}
