import React from "react";
import { DESIGNER_METADATA } from "../data/portfolioData";
import { GlassCard } from "./GlassCard";
import { LavenderFolder } from "./LavenderFolder";

interface AboutSectionProps {
  onNavigateToBits?: () => void;
}

export function AboutSection({ onNavigateToBits }: AboutSectionProps = {}) {
  const handleClickBits = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigateToBits) {
      onNavigateToBits();
    } else {
      window.history.pushState({}, "", "/some-bits-of-me");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <section id="about" className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-28">
      {/* Large Translucent Glass Panel */}
      <GlassCard className="p-6 sm:p-10 md:p-14 lg:p-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          
          {/* Left Side: Heading & Lavender Folder */}
          <div className="lg:col-span-5 flex flex-col justify-between font-sora">
            <div>
              <span className="font-sora text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-[#583C7E]/75 dark:text-[#8D879C] block mb-2 sm:mb-3">
                04 / ABOUT ME
              </span>
              <h2 className="font-fraunces text-[30px] sm:text-[42px] md:text-[54px] font-bold tracking-tight text-[#34154E] dark:text-[#F5F3FA] leading-[1.1]">
                A little <span className="font-fraunces italic font-normal text-[#583C7E] dark:text-[#C4B5FD]">about me.</span>
              </h2>
            </div>

            {/* Lavender Folder with 3 photos half-inside */}
            <div className="mt-8 lg:mt-12">
              <LavenderFolder />
            </div>
          </div>

          {/* Right Side: Biography & Compact Metadata */}
          <div className="lg:col-span-7 flex flex-col justify-between font-sora">
            {/* Short Designer Biography */}
            <div className="space-y-4 sm:space-y-5 text-[14.5px] sm:text-[16px] md:text-[17px] text-[#34154E]/90 dark:text-[#F5F3FA]/90 font-normal leading-[1.7] max-w-2xl font-sora">
              <p>
                I am a multidisciplinary visual designer working at the intersection of brand identity, digital craft, and art direction. I believe in designing interfaces and experiences that feel natural, quiet, and enduring.
              </p>
              <p className="text-[#583C7E]/85 dark:text-[#A19BAE]">
                Over the past seven years, I have collaborated with global architectural studios, sound engineering labs, and modern technology companies to translate complex ideas into clear visual systems with mathematical rigor and aesthetic warmth.
              </p>
            </div>

            {/* Compact Metadata Table */}
            <div className="mt-8 sm:mt-12 pt-8 sm:pt-10 border-t border-[#D6CBFF] dark:border-white/10 font-sora">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-8 gap-x-8 sm:gap-x-10">
                <div className="flex flex-col gap-1.5">
                  <dt className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Based in
                  </dt>
                  <dd className="text-[15px] sm:text-[16px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    {DESIGNER_METADATA.basedIn}
                  </dd>
                </div>

                <div className="flex flex-col gap-1.5">
                  <dt className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Specialty
                  </dt>
                  <dd className="text-[15px] sm:text-[16px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    {DESIGNER_METADATA.specialty}
                  </dd>
                </div>

                <div className="flex flex-col gap-1.5">
                  <dt className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Experience
                  </dt>
                  <dd className="text-[15px] sm:text-[16px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    {DESIGNER_METADATA.experience}
                  </dd>
                </div>

                <div className="flex flex-col gap-1.5">
                  <dt className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Focus
                  </dt>
                  <dd className="text-[15px] sm:text-[16px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    {DESIGNER_METADATA.focus}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Subtle Editorial Link to "Some Bits of Me" */}
            <div className="mt-8 pt-6 border-t border-[#D6CBFF]/40 dark:border-white/5 flex items-center justify-start">
              <a
                href="/some-bits-of-me"
                onClick={handleClickBits}
                id="link-more-about-me"
                className="group inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-medium text-[#583C7E] dark:text-[#C4B5FD] hover:text-[#34154E] dark:hover:text-white transition-colors duration-200 cursor-pointer font-sora select-none"
              >
                <span className="relative">
                  More about me
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#583C7E] dark:bg-[#C4B5FD] group-hover:bg-[#34154E] dark:group-hover:white transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-base leading-none">
                  ↗
                </span>
              </a>
            </div>

          </div>
        </div>
      </GlassCard>
    </section>
  );
}
