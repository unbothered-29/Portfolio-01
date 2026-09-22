import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiVite,
  SiHtml5,
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

interface TechLogo {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROW_1: TechLogo[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Vite", icon: SiVite },
];

const ROW_2: TechLogo[] = [
  { name: "Java", icon: FaJava },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
  { name: "Figma", icon: SiFigma },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
];

// Replicated arrays to ensure continuous infinite loop
const ROW_1_ITEMS = [...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1];
const ROW_2_ITEMS = [...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2];

export function StackSection() {
  return (
    <section
      id="stack"
      className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-20 sm:pb-28 md:pb-36 overflow-hidden"
    >
      {/* Section Header: Minimal, matching the site style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#D6CBFF] dark:border-[#201D2A] mb-10 sm:mb-14">
        <div>
          <span className="font-sora text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-[#423764]/70 dark:text-[#8D879C]">
            02 / MY STACK
          </span>
          <h2 className="mt-2.5 sm:mt-3 font-fraunces text-[32px] sm:text-[46px] md:text-[60px] font-bold tracking-tight text-[#180F2E] dark:text-[#F5F3FA] leading-[1.04]">
            My <span className="font-fraunces italic font-normal text-[#423764] dark:text-[#C4B5FD]">stack.</span>
          </h2>
        </div>

        <span className="font-sora text-[11px] sm:text-xs text-[#423764]/70 dark:text-[#888295] tracking-widest uppercase md:text-right">
          Technologies & Tools
        </span>
      </div>

      {/* Marquee Wrapper with Edge Blur & Fade Curtain, with generous bottom spacing for the 2nd row */}
      <div className="marquee-container relative w-full overflow-hidden pt-3 pb-12 sm:pb-16 md:pb-20 select-none">
        {/* Left Edge Blur & Fade Out */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/80 dark:from-[#09080E] dark:via-[#09080E]/80 to-transparent backdrop-blur-[2px]"
        />

        {/* Right Edge Blur & Fade Out */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/80 dark:from-[#09080E] dark:via-[#09080E]/80 to-transparent backdrop-blur-[2px]"
        />

        {/* Container for Both Moving Rows with bottom breathing room */}
        <div className="flex flex-col gap-4 sm:gap-5 marquee-fade-mask pb-6 sm:pb-8">
          {/* Row 1: Marquee Moving Towards Right */}
          <div className="flex w-max gap-4 sm:gap-5 animate-marquee-right">
            {ROW_1_ITEMS.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`row1-${tech.name}-${idx}`}
                  className="w-[145px] sm:w-[170px] shrink-0 group relative flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-2xl bg-white/[0.80] dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.09] backdrop-blur-[20px] backdrop-saturate-[180%] border border-[#D6CBFF] dark:border-white/10 shadow-[0_8px_30px_rgba(24,15,46,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(66,55,100,0.14)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Actual Official Logo */}
                  <div className="text-[#180F2E] dark:text-[#F5F3FA] group-hover:text-[#423764] dark:group-hover:text-[#C4B5FD] transition-colors">
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>

                  {/* Technology Name */}
                  <span className="font-sora text-[12px] sm:text-[13px] font-medium tracking-tight text-[#423764]/80 dark:text-[#A099AD] group-hover:text-[#180F2E] dark:group-hover:text-white transition-colors text-center">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Row 2: Marquee Moving Towards Left */}
          <div className="flex w-max gap-4 sm:gap-5 animate-marquee-left">
            {ROW_2_ITEMS.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`row2-${tech.name}-${idx}`}
                  className="w-[145px] sm:w-[170px] shrink-0 group relative flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-2xl bg-white/[0.80] dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.09] backdrop-blur-[20px] backdrop-saturate-[180%] border border-[#D6CBFF] dark:border-white/10 shadow-[0_8px_30px_rgba(24,15,46,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(66,55,100,0.14)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Actual Official Logo */}
                  <div className="text-[#180F2E] dark:text-[#F5F3FA] group-hover:text-[#423764] dark:group-hover:text-[#C4B5FD] transition-colors">
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>

                  {/* Technology Name */}
                  <span className="font-sora text-[12px] sm:text-[13px] font-medium tracking-tight text-[#423764]/80 dark:text-[#A099AD] group-hover:text-[#180F2E] dark:group-hover:text-white transition-colors text-center">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
