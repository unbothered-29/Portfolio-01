import React, { useState } from "react";
import {
  DESIGNER_METADATA,
  RESUME_SUMMARY,
  EDUCATION_DATA,
  AWARDS_DATA,
  CERTIFICATIONS_DATA,
  LANGUAGES_DATA,
  CONTACT_INFO,
} from "../data/portfolioData";
import { GlassCard } from "./GlassCard";
import { LavenderFolder } from "./LavenderFolder";
import {
  GraduationCap,
  Trophy,
  Award,
  Globe,
  BookOpen,
  MapPin,
  ExternalLink,
} from "lucide-react";

type ActiveTab = "education" | "awards" | "certifications" | "languages";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("education");

  return (
    <section
      id="about"
      className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-28 font-sora"
    >
      {/* Large Translucent Glass Panel */}
      <GlassCard className="p-6 sm:p-10 md:p-14 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* Left Side: Heading & Lavender Folder */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-sora text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-[#583C7E]/75 dark:text-[#8D879C] block mb-2 sm:mb-3">
                04 / ABOUT ME
              </span>
              <h2 className="font-fraunces text-[30px] sm:text-[42px] md:text-[52px] font-bold tracking-tight text-[#34154E] dark:text-[#F5F3FA] leading-[1.08]">
                A little{" "}
                <span className="font-fraunces italic font-normal text-[#583C7E] dark:text-[#C4B5FD]">
                  about me.
                </span>
              </h2>

              <div className="mt-3 flex items-center gap-2 text-xs text-[#583C7E]/80 dark:text-[#A19BAE]">
                <MapPin className="w-3.5 h-3.5 text-[#583C7E] dark:text-[#C4B5FD]" />
                <span>{CONTACT_INFO.location}</span>
                <span className="text-black/20 dark:text-white/20">·</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  Available for roles
                </span>
              </div>
            </div>

            {/* Lavender Folder with 3 photos half-inside */}
            <div className="mt-8 lg:mt-12">
              <LavenderFolder />
            </div>
          </div>

          {/* Right Side: Professional Summary, Metadata Table & Resume Tabs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Professional Summary from Resume */}
            <div className="text-[14.5px] sm:text-[15.5px] md:text-[16.5px] text-[#34154E]/90 dark:text-[#F5F3FA]/90 font-normal leading-[1.7] max-w-2xl">
              <p>{RESUME_SUMMARY}</p>
            </div>

            {/* Compact Metadata Table */}
            <div className="mt-6 pt-6 border-t border-[#D6CBFF] dark:border-white/10">
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-4">
                <div className="flex flex-col gap-1">
                  <dt className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Based in
                  </dt>
                  <dd className="text-[13.5px] sm:text-[14.5px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    {DESIGNER_METADATA.basedIn}
                  </dd>
                </div>

                <div className="flex flex-col gap-1">
                  <dt className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Degree & CGPA
                  </dt>
                  <dd className="text-[13.5px] sm:text-[14.5px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    B.E. AI & DS (8.5)
                  </dd>
                </div>

                <div className="flex flex-col gap-1">
                  <dt className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Specialty
                  </dt>
                  <dd className="text-[13.5px] sm:text-[14.5px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    Front-end Web Dev
                  </dd>
                </div>

                <div className="flex flex-col gap-1">
                  <dt className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
                    Leadership
                  </dt>
                  <dd className="text-[13.5px] sm:text-[14.5px] font-medium text-[#34154E] dark:text-[#F5F3FA]">
                    President @ FE-SAHYOG
                  </dd>
                </div>
              </dl>
            </div>

            {/* Interactive Resume Highlights: Tabs */}
            <div className="mt-8 pt-6 border-t border-[#D6CBFF] dark:border-white/10">
              {/* Tab Selector Buttons */}
              <div className="flex flex-wrap items-center gap-2 pb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("education")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "education"
                      ? "bg-[#34154E] text-white dark:bg-[#C4B5FD] dark:text-[#180F2E] shadow-sm"
                      : "bg-white/60 dark:bg-white/[0.06] text-[#583C7E] dark:text-[#A19BAE] hover:bg-white dark:hover:bg-white/10 border border-[#D6CBFF]/60 dark:border-white/10"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Education</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("awards")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "awards"
                      ? "bg-[#34154E] text-white dark:bg-[#C4B5FD] dark:text-[#180F2E] shadow-sm"
                      : "bg-white/60 dark:bg-white/[0.06] text-[#583C7E] dark:text-[#A19BAE] hover:bg-white dark:hover:bg-white/10 border border-[#D6CBFF]/60 dark:border-white/10"
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Awards & Hackathons</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("certifications")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "certifications"
                      ? "bg-[#34154E] text-white dark:bg-[#C4B5FD] dark:text-[#180F2E] shadow-sm"
                      : "bg-white/60 dark:bg-white/[0.06] text-[#583C7E] dark:text-[#A19BAE] hover:bg-white dark:hover:bg-white/10 border border-[#D6CBFF]/60 dark:border-white/10"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Certifications</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("languages")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "languages"
                      ? "bg-[#34154E] text-white dark:bg-[#C4B5FD] dark:text-[#180F2E] shadow-sm"
                      : "bg-white/60 dark:bg-white/[0.06] text-[#583C7E] dark:text-[#A19BAE] hover:bg-white dark:hover:bg-white/10 border border-[#D6CBFF]/60 dark:border-white/10"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Languages</span>
                </button>

                {/* Direct Resume Download Button with hover tooltip */}
                <div className="relative group/aboutresume sm:ml-auto">
                  <a
                    href="/Jessicaa_Chauhan_Resume.pdf"
                    download="Jessicaa_Chauhan_Resume.pdf"
                    title="click to download"
                    aria-label="Download Resume"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#34154E]/[0.08] dark:bg-white/10 hover:bg-[#34154E] hover:text-white dark:hover:bg-[#C4B5FD] dark:hover:text-[#180F2E] text-[#34154E] dark:text-[#F5F3FA] border border-[#D6CBFF] dark:border-white/15 transition-all cursor-pointer"
                  >
                    <span>Resume</span>
                    <span className="text-[10px] font-mono group-hover/aboutresume:translate-y-0.5 transition-transform">↓</span>
                  </a>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute -top-8 right-0 opacity-0 -translate-y-1 group-hover/aboutresume:opacity-100 group-hover/aboutresume:translate-y-0 transition-all duration-200 z-30 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#34154E] text-white dark:bg-[#C4B5FD] dark:text-[#180F2E] shadow-md flex items-center gap-1 border border-white/10"
                  >
                    <span>click to download</span>
                    <span className="text-[9px]">⤓</span>
                  </span>
                </div>
              </div>

              {/* Tab Content Display Area */}
              <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-white/[0.65] dark:bg-white/[0.04] border border-[#D6CBFF]/70 dark:border-white/10 backdrop-blur-sm min-h-[140px] flex flex-col justify-center">
                {activeTab === "education" && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="font-semibold text-sm sm:text-[15px] text-[#34154E] dark:text-[#F5F3FA]">
                        {EDUCATION_DATA.institution}
                      </h4>
                      <span className="text-xs font-mono text-[#583C7E]/80 dark:text-[#C4B5FD]">
                        {EDUCATION_DATA.duration}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13.5px] text-[#583C7E] dark:text-[#A19BAE]">
                      {EDUCATION_DATA.degree} ·{" "}
                      <span className="font-semibold text-[#34154E] dark:text-white">
                        {EDUCATION_DATA.cgpa}
                      </span>
                    </p>

                    <div>
                      <span className="text-[11px] font-medium uppercase tracking-wider text-[#583C7E]/75 dark:text-[#8D879C] block mb-1.5">
                        Relevant Coursework:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {EDUCATION_DATA.coursework.map((course, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md text-[11.5px] bg-[#E8E1F8]/70 dark:bg-white/10 text-[#34154E] dark:text-[#E2DCF0] border border-[#D6CBFF]/60 dark:border-white/5"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "awards" && (
                  <div className="space-y-3">
                    {AWARDS_DATA.map((award, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 pb-2.5 border-b border-[#D6CBFF]/40 dark:border-white/5 last:border-b-0 last:pb-0"
                      >
                        <Trophy className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-1">
                            <span className="text-xs sm:text-[13px] font-semibold text-[#34154E] dark:text-white">
                              {award.title}
                            </span>
                            {award.year && (
                              <span className="text-[11px] font-mono text-[#583C7E]/70 dark:text-[#9A94A8]">
                                {award.year}
                              </span>
                            )}
                          </div>
                          <p className="text-[11.5px] sm:text-xs text-[#583C7E]/85 dark:text-[#A19BAE] mt-0.5">
                            {award.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "certifications" && (
                  <div className="space-y-2.5">
                    {CERTIFICATIONS_DATA.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/50 dark:bg-white/[0.03] border border-[#D6CBFF]/40 dark:border-white/5"
                      >
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#583C7E] dark:text-[#C4B5FD] shrink-0" />
                          <span className="text-xs sm:text-[12.5px] font-medium text-[#34154E] dark:text-white">
                            {cert.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono shrink-0 px-2 py-0.5 rounded bg-[#E8E1F8] dark:bg-white/10 text-[#583C7E] dark:text-[#C4B5FD]">
                          {cert.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "languages" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {LANGUAGES_DATA.map((lang, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-0.5 p-3 rounded-xl bg-white/50 dark:bg-white/[0.03] border border-[#D6CBFF]/40 dark:border-white/5 text-center"
                      >
                        <span className="text-sm font-semibold text-[#34154E] dark:text-white">
                          {lang.language}
                        </span>
                        <span className="text-xs text-[#583C7E] dark:text-[#C4B5FD]">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
