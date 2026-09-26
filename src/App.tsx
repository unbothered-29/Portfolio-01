import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AtmosphericBackground } from "./components/BlurOrb";
import { GlassNavbar } from "./components/GlassNavbar";
import { FullscreenNavOverlay } from "./components/FullscreenNavOverlay";
import { Hero } from "./components/Hero";
import { WorkSection } from "./components/WorkSection";
import { StackSection } from "./components/StackSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { AboutSection } from "./components/AboutSection";
import { ConnectSection } from "./components/ConnectSection";
import { ContactSection } from "./components/ContactSection";
import { ContactModal } from "./components/ContactModal";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { GlassCursor } from "./components/GlassCursor";
import { Project } from "./types";

function MainPortfolioContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "contact" || sectionId === "connect") {
      executeScroll("connect");
      return;
    }
    executeScroll(sectionId);
  };

  const executeScroll = (sectionId: string) => {
    if (sectionId === "top" || sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const targetY = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#FAFAFA] dark:bg-[#09080E] text-[#34154E] dark:text-[#F5F3FA] font-sora selection:bg-[#C4B5FD]/40 selection:text-[#34154E] dark:selection:bg-[#A78BFA]/30 dark:selection:text-white overflow-x-clip transition-colors duration-500"
    >
      {/* 1. Atmospheric Soft Blur Glow Background */}
      <AtmosphericBackground />

      {/* 2. Floating Glass Navbar with Understated Menu Trigger */}
      <GlassNavbar
        onNavigate={handleNavigate}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* 3. Fullscreen Editorial Navigation Overlay */}
      <FullscreenNavOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      {/* 4. Main Page Content Structure */}
      <main className="relative z-10 flex flex-col">
        {/* Section 1: Spacious Editorial Hero */}
        <Hero
          onExploreClick={() => handleNavigate("work")}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        {/* Section 2: Selected Work (5 Curated Works) */}
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 3: My Stack (Frosted Glass Cards with Actual Icons, No Gradients) */}
        <StackSection />

        {/* Section 4: Professional Experience (Frosted Glass Timeline Cards) */}
        <ExperienceSection />

        {/* Section 5: About Me (Translucent Glass Panel & Lavender Folder) */}
        <AboutSection />

        {/* Section 6: Connect ("Have an idea in mind? Let's connect.") */}
        <ConnectSection />

        {/* Section 7: Signature Editorial Contact & Giant Wordmark Footer */}
        <ContactSection
          onOpenTalk={() => setIsContactModalOpen(true)}
          onNavigate={handleNavigate}
        />
      </main>

      {/* Direct Inquiry Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 3D Liquid Glass Isometric Cursor */}
      <GlassCursor />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainPortfolioContent />
    </ThemeProvider>
  );
}
