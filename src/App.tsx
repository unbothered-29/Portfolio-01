import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AtmosphericBackground } from "./components/BlurOrb";
import { GlassNavbar } from "./components/GlassNavbar";
import { FullscreenNavOverlay } from "./components/FullscreenNavOverlay";
import { Hero } from "./components/Hero";
import { WorkSection } from "./components/WorkSection";
import { StackSection } from "./components/StackSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { AboutSection } from "./components/AboutSection";
import { ContactModal } from "./components/ContactModal";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { GlassCursor } from "./components/GlassCursor";
import { SomeBitsOfMePage } from "./components/SomeBitsOfMePage";
import { Project } from "./types";

function getInitialRoute(): string {
  if (typeof window !== "undefined") {
    if (window.location.pathname === "/some-bits-of-me") {
      return "/some-bits-of-me";
    }
  }
  return "/";
}

function MainPortfolioContent() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialRoute);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute =
        window.location.pathname === "/some-bits-of-me"
          ? "/some-bits-of-me"
          : "/";
      setCurrentPath(nextRoute);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "contact") {
      setIsContactModalOpen(true);
      return;
    }
    if (currentPath !== "/") {
      navigateTo("/");
      setTimeout(() => {
        executeScroll(sectionId);
      }, 150);
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

  // If user is on the dedicated "Some Bits of Me" page route
  if (currentPath === "/some-bits-of-me") {
    return (
      <>
        <SomeBitsOfMePage
          onBackToHome={() => navigateTo("/")}
          onNavigateSection={(sectionId) => handleNavigate(sectionId)}
          onOpenContact={() => setIsContactModalOpen(true)}
        />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </>
    );
  }

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

        {/* Section 5: About (Translucent Glass Panel) */}
        <AboutSection
          onNavigateToBits={() => navigateTo("/some-bits-of-me")}
        />

        {/* Clean, minimal unobtrusive footer */}
        <footer className="relative z-10 w-full py-10 sm:py-12 text-center text-xs text-[#766D8E] dark:text-[#9088A5] font-sora select-none border-t border-[#EAE5F2] dark:border-[#251D38]/60 mt-12">
          <p>© 2026 Jessicaa Chauhan. All rights reserved.</p>
        </footer>
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
