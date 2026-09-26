import React, { useState } from "react";

interface ContactSectionProps {
  onOpenTalk?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  const handleNav = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      id="contact"
      role="contentinfo"
      className="relative z-10 w-full bg-[#FAFAF9] dark:bg-[#09080E] text-[#34154E] dark:text-[#F5F3FA] transition-colors duration-500 overflow-hidden"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. UPPER FOOTER AREA (Spacious White / Off-White)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 md:pt-32 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Branding, Tagline, & "Let's Talk" Button */}
          <div className="lg:col-span-4 xl:col-span-5 flex flex-col items-start">
            {/* Logo Mark + Wordmark */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2.5 select-none focus-visible:outline-none"
            >
              {/* Layered Purple Star Icon */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shrink-0">
                <img
                  src="/star.svg"
                  alt="Star icon"
                  className="w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_6px_rgba(147,112,219,0.35)]"
                />
              </div>
              <span className="font-sora font-semibold text-lg sm:text-xl tracking-tight text-[#34154E] dark:text-[#F5F3FA]">
                JESSICAA
              </span>
            </a>

            {/* Short Tagline */}
            <p className="mt-4 text-sm sm:text-[14.5px] text-[#58506E] dark:text-[#A19BAE] leading-relaxed max-w-[280px]">
              Dedicated Front-end Web Developer crafting responsive, polished digital interfaces.
            </p>
          </div>

          {/* Right Columns: 4 Navigation Columns */}
          <div className="lg:col-span-8 xl:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 lg:gap-10">
            {/* Column 1: WORK */}
            <div className="flex flex-col">
              <h3 className="font-sora text-xs sm:text-[13px] font-semibold tracking-wider text-[#34154E] dark:text-[#F5F3FA] uppercase mb-4 sm:mb-5">
                WORK
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 font-sora text-xs sm:text-[13.5px] text-[#58506E] dark:text-[#A19BAE]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("work")}
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150 text-left cursor-pointer"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("work")}
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150 text-left cursor-pointer"
                  >
                    Case Studies
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: EXPLORE */}
            <div className="flex flex-col">
              <h3 className="font-sora text-xs sm:text-[13px] font-semibold tracking-wider text-[#34154E] dark:text-[#F5F3FA] uppercase mb-4 sm:mb-5">
                EXPLORE
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 font-sora text-xs sm:text-[13.5px] text-[#58506E] dark:text-[#A19BAE]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("about")}
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150 text-left cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("stack")}
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150 text-left cursor-pointer"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("experience")}
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150 text-left cursor-pointer"
                  >
                    Experience
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: CONTACT */}
            <div className="flex flex-col">
              <h3 className="font-sora text-xs sm:text-[13px] font-semibold tracking-wider text-[#34154E] dark:text-[#F5F3FA] uppercase mb-4 sm:mb-5">
                CONTACT
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 font-sora text-xs sm:text-[13.5px] text-[#58506E] dark:text-[#A19BAE]">
                <li>
                  <a
                    href="mailto:chauhanjessicaa27@gmail.com"
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150"
                  >
                    Email
                  </a>
                </li>
                <li className="relative group/resume inline-block">
                  <a
                    href="/Jessicaa_Chauhan_Resume.pdf"
                    download="Jessicaa_Chauhan_Resume.pdf"
                    className="inline-flex items-center gap-1.5 hover:text-[#34154E] dark:hover:text-white transition-colors duration-150 cursor-pointer"
                    aria-label="Download Resume"
                    title="click to download"
                  >
                    <span>Resume</span>
                    <span className="text-[10.5px] font-mono text-[#583C7E]/75 dark:text-[#C4B5FD] group-hover/resume:translate-y-0.5 transition-transform">
                      ↓
                    </span>
                  </a>

                  {/* Hover Tooltip: 'click to download' */}
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute -top-8 left-0 opacity-0 -translate-y-1 group-hover/resume:opacity-100 group-hover/resume:translate-y-0 transition-all duration-200 z-30 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#34154E] text-white dark:bg-[#C4B5FD] dark:text-[#180F2E] shadow-md flex items-center gap-1 border border-white/10"
                  >
                    <span>click to download</span>
                    <span className="text-[9px]">⤓</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: SOCIAL */}
            <div className="flex flex-col">
              <h3 className="font-sora text-xs sm:text-[13px] font-semibold tracking-wider text-[#34154E] dark:text-[#F5F3FA] uppercase mb-4 sm:mb-5">
                SOCIAL
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 font-sora text-xs sm:text-[13.5px] text-[#58506E] dark:text-[#A19BAE]">
                <li>
                  <a
                    href="https://linkedin.com/in/jessicaachauhan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/unbothered-29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#34154E] dark:hover:text-white transition-colors duration-150"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. THIN HORIZONTAL DIVIDER & COPYRIGHT ROW
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="w-full h-px bg-[#EAE5F2] dark:bg-[#251D38] mt-16 sm:mt-24 mb-6 sm:mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-[#766D8E] dark:text-[#9088A5] font-sora select-none">
          <p>© 2026 Jessicaa Chauhan. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveLegalModal("Privacy Policy")}
              className="hover:text-[#34154E] dark:hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal("Terms of Service")}
              className="hover:text-[#34154E] dark:hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3 & 4. LOWER GRADIENT AREA & GIANT BACKGROUND NAME
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative w-full overflow-hidden footer-gradient-canvas">
        {/* Soft, continuous vertical gradient transition matching reference */}
        <div
          className="w-full h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] flex items-end justify-center relative pointer-events-none select-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(250, 250, 249, 1) 0%, rgba(251, 248, 254, 0.95) 15%, rgba(246, 238, 253, 0.95) 35%, rgba(237, 221, 251, 0.95) 60%, rgba(225, 199, 248, 0.95) 85%, rgba(215, 182, 245, 1) 100%)",
          }}
        >
          {/* Dark Mode Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(9, 8, 14, 1) 0%, rgba(18, 13, 31, 0.95) 20%, rgba(32, 20, 58, 0.95) 50%, rgba(51, 28, 92, 0.95) 80%, rgba(65, 33, 118, 1) 100%)",
            }}
          />

          {/* Additional subtle atmospheric pinkish-lavender radial glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[250px] sm:h-[350px] rounded-full pointer-events-none blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center bottom, rgba(235, 185, 255, 0.6) 0%, rgba(200, 160, 245, 0.2) 60%, transparent 80%)",
            }}
          />

          {/* Giant Watermark Background Wordmark "JESSICAA" */}
          <div className="relative z-10 w-full flex justify-center items-end leading-none translate-y-[26%] sm:translate-y-[28%] md:translate-y-[30%]">
            <span
              className="font-fraunces font-bold text-[18vw] sm:text-[19vw] md:text-[20vw] lg:text-[21.5vw] tracking-[-0.035em] uppercase select-none pointer-events-none whitespace-nowrap text-center block"
              style={{
                color: "rgba(255, 255, 255, 0.38)",
                WebkitTextStroke: "1.5px rgba(162, 130, 222, 0.45)",
                textShadow: "0 8px 32px rgba(175, 140, 230, 0.25)",
              }}
            >
              JESSICAA
            </span>
          </div>

          {/* Subtle Mobile/Bottom Home Indicator Handle like in reference */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-28 sm:w-36 h-1 sm:h-1.5 rounded-full bg-[#34154E]/60 dark:bg-white/60 pointer-events-none" />
        </div>
      </div>

      {/* Simple Legal Modal if user clicks Privacy Policy or Terms */}
      {activeLegalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#161125] p-6 sm:p-8 rounded-2xl border border-[#E0D8F0] dark:border-[#382C5A] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-sora font-semibold text-lg text-[#34154E] dark:text-[#F5F3FA] mb-3">
              {activeLegalModal}
            </h3>
            <p className="text-sm text-[#58506E] dark:text-[#A19BAE] leading-relaxed mb-6">
              {activeLegalModal === "Privacy Policy"
                ? "This portfolio does not harvest personal data or track visitors across third-party networks. Any communication sent via email is handled strictly for professional inquiries."
                : "All original visual designs, interactive components, and portfolio media are copyright © 2026 Jessicaa Chauhan. All rights reserved."}
            </p>
            <button
              type="button"
              onClick={() => setActiveLegalModal(null)}
              className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#34154E] dark:bg-[#7758C4] hover:opacity-90 transition-opacity cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
