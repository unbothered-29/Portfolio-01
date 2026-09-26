import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FolderOpen,
  FileCode,
  X,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "../lib/utils";

interface ExperienceItem {
  id: string;
  fileName: string;
  tabLabel: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  overview: string;
  responsibilities: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "rgit-fe-sahyog",
    fileName: "rgit-sahyog.jsx",
    tabLabel: "rgit-sahyog.jsx",
    company: "RGIT FE-SAHYOG",
    role: "President",
    duration: "Aug 2026 — Present",
    location: "Mumbai, India",
    type: "Executive Leadership",
    overview:
      "Directing organizational strategy, cross-functional operations, and institutional initiatives for a committee of 30+ members across academic and student development programs.",
    responsibilities: [
      "Leading an executive team of 30+ members, setting strategic vision, priorities, and operations for the academic year.",
      "Spearheading end-to-end event planning and execution for 2+ major institutional student initiatives.",
      "Establishing accountability frameworks and cross-vertical workflows across technical, logistical, and creative teams.",
    ],
    skills: [
      "Strategic Vision",
      "Executive Governance",
      "Cross-Functional Ops",
      "Event Planning",
    ],
  },
  {
    id: "roamevo",
    fileName: "roamevo.jsx",
    tabLabel: "roamevo.jsx",
    company: "Roamevo Private Limited",
    role: "Content Team Head",
    duration: "Feb 2026 — Present",
    location: "Remote / Hybrid",
    type: "Brand & Creative Direction",
    overview:
      "Leading visual brand storytelling, promotional collateral production, and multi-channel marketing campaigns focused on community engagement and traveler acquisition.",
    responsibilities: [
      "Architected 10+ comprehensive travel itineraries aligned with brand standards and traveler engagement goals.",
      "Designed marketing collateral including flyers, banners, posters, and social media creative for company promotions.",
      "Collaborated with founding leadership to refine content cadence, tone-of-voice, and organic reach.",
    ],
    skills: [
      "Brand Storytelling",
      "Collateral Design",
      "Content Cadence",
      "Creative Direction",
    ],
  },
];

export function ExperienceSection() {
  const [openTabIds, setOpenTabIds] = useState<string[]>(
    EXPERIENCES.map((e) => e.id)
  );
  const [activeId, setActiveId] = useState<string | null>(EXPERIENCES[0].id);
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activeExp = activeId
    ? EXPERIENCES.find((exp) => exp.id === activeId) || null
    : null;

  const handleOpenFile = (id: string) => {
    if (!openTabIds.includes(id)) {
      setOpenTabIds((prev) => [...prev, id]);
    }
    setActiveId(id);
  };

  const handleCloseTab = (idToClose: string) => {
    const nextTabs = openTabIds.filter((id) => id !== idToClose);
    setOpenTabIds(nextTabs);

    if (activeId === idToClose) {
      if (nextTabs.length > 0) {
        const closedIdx = openTabIds.indexOf(idToClose);
        const nextActiveId = nextTabs[Math.min(closedIdx, nextTabs.length - 1)];
        setActiveId(nextActiveId);
      } else {
        setActiveId(null);
      }
    }
  };

  // Dynamically calculate exact number of code lines
  const totalCodeLines = activeExp
    ? 7 + // comment, const, company, role, type, duration, location
      1 + // blank
      2 + // overview key & string
      1 + // blank
      1 + // responsibilities [
      activeExp.responsibilities.length +
      1 + // ]
      1 + // blank
      1 + // skills [
      activeExp.skills.length +
      1 + // ]
      1 + // };
      1 + // blank
      1 // export default experience;
    : 0;

  const handleCopyCode = () => {
    if (!activeExp) return;
    const rawCode = `// Professional Experience · ${activeExp.company}
const experience = {
  company: "${activeExp.company}",
  role: "${activeExp.role}",
  type: "${activeExp.type}",
  duration: "${activeExp.duration}",
  location: "${activeExp.location}",

  overview:
    "${activeExp.overview}",

  responsibilities: [
${activeExp.responsibilities.map((r) => `    "${r}"`).join(",\n")}
  ],

  skills: [
${activeExp.skills.map((s) => `    "${s}"`).join(",\n")}
  ]
};

export default experience;`;

    navigator.clipboard.writeText(rawCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-24 md:py-32"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. SECTION INTRO: Consistent with portfolio hierarchy
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="pb-8 sm:pb-12 border-b border-[#D6CBFF] dark:border-[#201D2A] mb-10 sm:mb-14 md:mb-16 font-sora">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-sora text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-[#583C7E]/75 dark:text-[#8D879C]">
              03 / EXPERIENCE
            </span>
            <h2 className="mt-2.5 sm:mt-3 font-fraunces text-[32px] sm:text-[46px] md:text-[60px] font-bold tracking-tight text-[#34154E] dark:text-[#F5F3FA] leading-[1.04]">
              Professional{" "}
              <span className="font-fraunces italic font-normal text-[#583C7E] dark:text-[#C4B5FD]">
                experience.
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. MAIN EXPERIENCE EDITOR (VS Code Inspiration + Luxury)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className={cn(
          "relative rounded-2xl sm:rounded-3xl overflow-hidden font-sora transition-all duration-300",
          "bg-white/[0.88] dark:bg-[#110E1C]/[0.85]",
          "border border-[#E2DCF0] dark:border-[#2C2340]",
          "backdrop-blur-[24px]",
          "shadow-[0_16px_50px_rgba(24,15,46,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        )}
      >
        {/* Editor Window Top Title Bar */}
        <div className="h-11 sm:h-12 px-4 sm:px-5 border-b border-[#E8E2F2] dark:border-[#241D35] bg-[#FAF8FD] dark:bg-[#0D0B16] flex items-center justify-between select-none">
          {/* Left: Window Control Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF8080]/80 border border-[#E06666]/50 shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-[#FFD166]/80 border border-[#DEAC44]/50 shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-[#06D6A0]/80 border border-[#05AB80]/50 shadow-inner" />
            <span className="ml-3 font-mono text-[11px] sm:text-xs text-[#7B7095] dark:text-[#8D82A5] hidden sm:inline-flex items-center gap-1.5">
              <span>workspace</span>
              <span className="text-[#C4B5FD]/70">/</span>
              <span>experience</span>
              {activeExp && (
                <>
                  <span className="text-[#C4B5FD]/70">/</span>
                  <span className="text-[#34154E] dark:text-[#F5F3FA] font-medium">
                    {activeExp.fileName}
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Right: Quick Action Pill (Copy Code) */}
          {activeExp && (
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy experience code snippet"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#58506E] dark:text-[#B4A8D0] hover:text-[#34154E] dark:hover:text-white bg-white dark:bg-[#1E1730] hover:bg-[#F3EEFC] dark:hover:bg-[#2A2044] border border-[#E2DCF0] dark:border-[#382C5A] transition-all cursor-pointer shadow-xs"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500 stroke-[2.5]" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 stroke-[2]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            MOBILE HORIZONTAL SELECTOR (< md screens)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="md:hidden border-b border-[#E8E2F2] dark:border-[#241D35] bg-[#F7F4FC] dark:bg-[#0D0B16] px-3 py-2.5">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#6B5E87] dark:text-[#9084AA]">
              EXPLORER · FILES
            </span>
            <span className="text-[10px] font-mono text-[#9B90B5]">
              {EXPERIENCES.length} entries
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Selectable Experience Files"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {EXPERIENCES.map((exp) => {
              const isActive = exp.id === activeId;
              const isOpen = openTabIds.includes(exp.id);
              return (
                <button
                  key={exp.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleOpenFile(exp.id)}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border select-none",
                    isActive
                      ? "bg-[#EDE6FB] dark:bg-[#251B3D] text-[#34154E] dark:text-[#F5F3FA] border-[#7C3AED]/40 dark:border-[#A78BFA]/50 shadow-xs font-semibold"
                      : "bg-white dark:bg-[#151022] text-[#58506E] dark:text-[#A19BAE] border-[#E8E2F2] dark:border-[#2C2340] hover:bg-[#F9F6FE] dark:hover:bg-[#1D1630]"
                  )}
                >
                  <FileCode
                    className={cn(
                      "w-3.5 h-3.5 stroke-[2]",
                      isActive
                        ? "text-[#7C3AED] dark:text-[#C4B5FD]"
                        : "text-[#8D82A5]"
                    )}
                  />
                  <span>{exp.fileName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            DESKTOP WORKSPACE GRID (Sidebar + Editor)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] sm:min-h-[520px]">
          {/* 3. LEFT EXPLORER PANEL (Desktop) */}
          <aside
            aria-label="File Explorer"
            className="hidden md:flex md:col-span-4 lg:col-span-3 border-r border-[#E8E2F2] dark:border-[#241D35] bg-[#FBF9FE]/95 dark:bg-[#0D0B16]/95 p-4 flex-col justify-between select-none"
          >
            <div>
              {/* Explorer Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAE3F5] dark:border-[#1E1730]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#6B5E87] dark:text-[#8D82A5]">
                  EXPLORER
                </span>
                <span className="font-mono text-[10px] text-[#A196BC] dark:text-[#675C80]">
                  PORTFOLIO
                </span>
              </div>

              {/* Folder Tree Toggle */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setIsFolderOpen((prev) => !prev)}
                  className="w-full flex items-center gap-1.5 py-1 px-1.5 rounded-lg text-xs font-mono text-[#58506E] dark:text-[#B4A8D0] hover:bg-[#F2EDFB] dark:hover:bg-[#1B152A] transition-colors cursor-pointer text-left"
                >
                  {isFolderOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#C4B5FD] stroke-[2.2]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#C4B5FD] stroke-[2.2]" />
                  )}
                  {isFolderOpen ? (
                    <FolderOpen className="w-4 h-4 text-[#7C3AED] dark:text-[#C4B5FD] stroke-[2]" />
                  ) : (
                    <Folder className="w-4 h-4 text-[#7C3AED] dark:text-[#C4B5FD] stroke-[2]" />
                  )}
                  <span className="font-semibold uppercase tracking-wider text-[11px] text-[#34154E] dark:text-[#F5F3FA]">
                    EXPERIENCE
                  </span>
                </button>

                {/* Sub-files inside the folder */}
                {isFolderOpen && (
                  <div
                    role="tablist"
                    aria-label="Experience Files"
                    className="pl-4 space-y-1 pt-1"
                  >
                    {EXPERIENCES.map((exp) => {
                      const isActive = exp.id === activeId;
                      const isOpen = openTabIds.includes(exp.id);
                      return (
                        <button
                          key={exp.id}
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => handleOpenFile(exp.id)}
                          className={cn(
                            "w-full group flex items-center justify-between px-3 py-2 rounded-xl font-mono text-xs sm:text-[12.5px] transition-all duration-200 cursor-pointer text-left border",
                            isActive
                              ? "bg-[#EDE6FB] dark:bg-[#251B3D] text-[#34154E] dark:text-[#F5F3FA] font-medium border-[#7C3AED]/40 dark:border-[#A78BFA]/50 shadow-xs"
                              : "border-transparent text-[#58506E] dark:text-[#9F94B8] hover:bg-[#F4EFFC] dark:hover:bg-[#1A1428] hover:text-[#34154E] dark:hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileCode
                              className={cn(
                                "w-3.5 h-3.5 stroke-[2] shrink-0",
                                isActive
                                  ? "text-[#7C3AED] dark:text-[#C4B5FD]"
                                  : "text-[#8D82A5] group-hover:text-[#58506E]"
                              )}
                            />
                            <span className="truncate">{exp.fileName}</span>
                          </div>

                          {isActive && (
                            <span className="w-1.5 h-3.5 rounded-full bg-[#7C3AED] dark:bg-[#C4B5FD] shrink-0 ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Explorer Metadata */}
            <div className="pt-3 border-t border-[#EAE3F5] dark:border-[#1E1730] font-mono text-[10px] text-[#8D82A5] flex items-center justify-between">
              <span>{EXPERIENCES.length} files loaded</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ready
              </span>
            </div>
          </aside>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              RIGHT EDITOR PANE (Tabs + Syntax Code + Status Bar)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <main
            role="tabpanel"
            aria-label={
              activeExp
                ? `${activeExp.company} Code Editor View`
                : "Empty Code Editor View"
            }
            className="md:col-span-8 lg:col-span-9 flex flex-col justify-between bg-white dark:bg-[#110E1C] overflow-hidden"
          >
            <div>
              {/* 6. EDITOR TABS BAR */}
              <div className="h-10 sm:h-11 border-b border-[#E8E2F2] dark:border-[#241D35] bg-[#F7F5FC] dark:bg-[#0E0C16] flex items-center overflow-x-auto no-scrollbar">
                {openTabIds.length > 0 ? (
                  openTabIds.map((tabId) => {
                    const exp = EXPERIENCES.find((e) => e.id === tabId);
                    if (!exp) return null;
                    const isActive = exp.id === activeId;
                    return (
                      <div
                        key={exp.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveId(exp.id)}
                        className={cn(
                          "group relative h-full inline-flex items-center gap-2 px-3.5 sm:px-4.5 font-mono text-xs sm:text-[12.5px] border-r border-[#E8E2F2] dark:border-[#241D35] transition-all cursor-pointer select-none",
                          isActive
                            ? "bg-white dark:bg-[#110E1C] text-[#34154E] dark:text-[#F5F3FA] font-medium"
                            : "bg-transparent text-[#7B7095] dark:text-[#8D82A5] hover:bg-[#F2EDFB] dark:hover:bg-[#171124] hover:text-[#34154E] dark:hover:text-white"
                        )}
                      >
                        {/* Active Top Line Indicator */}
                        {isActive && (
                          <span className="absolute top-0 inset-x-0 h-0.5 bg-[#7C3AED] dark:bg-[#C4B5FD]" />
                        )}
                        <FileCode
                          className={cn(
                            "w-3.5 h-3.5 stroke-[2] shrink-0",
                            isActive
                              ? "text-[#7C3AED] dark:text-[#C4B5FD]"
                              : "text-[#8D82A5]"
                          )}
                        />
                        <span className="truncate">{exp.tabLabel}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseTab(exp.id);
                          }}
                          aria-label={`Close ${exp.fileName}`}
                          className="p-1 rounded-md hover:bg-[#E4DCF5] dark:hover:bg-[#251B3D] text-[#9E92B5] hover:text-[#34154E] dark:hover:text-white transition-all ml-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-4 font-mono text-xs text-[#8D82A5] italic select-none">
                    No editors open
                  </div>
                )}
              </div>

              {/* 4 & 5. EDITOR CODE CONTENT with Syntax Highlighting OR Empty State */}
              <div className="p-4 sm:p-6 lg:p-8 overflow-x-auto min-h-[380px]">
                {activeExp ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeExp.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="font-mono text-xs sm:text-[13.5px] leading-relaxed flex items-start"
                    >
                      {/* Line Numbers Column */}
                      <div className="select-none text-[#94A3B8] dark:text-[#524968] text-right pr-4 sm:pr-6 shrink-0 space-y-1 font-mono">
                        {Array.from({ length: totalCodeLines }).map((_, idx) => (
                          <div key={idx} className="leading-relaxed">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                        ))}
                      </div>

                      {/* Syntax Code Body */}
                      <div className="flex-1 space-y-1 overflow-x-auto text-[#34154E] dark:text-[#F5F3FA]">
                        {/* Line 01: Comment */}
                        <div className="text-[#16A34A] dark:text-[#6A9955] italic leading-relaxed">
                          // Professional Experience · {activeExp.company}
                        </div>

                        {/* Line 02: Declaration */}
                        <div className="leading-relaxed">
                          <span className="text-[#AF00DB] dark:text-[#C586C0] font-semibold">
                            const
                          </span>{" "}
                          <span className="text-[#001080] dark:text-[#4FC1FF] font-medium">
                            experience
                          </span>{" "}
                          <span className="text-[#64748B] dark:text-[#CBD5E1]">
                            =
                          </span>{" "}
                          <span className="text-[#D97706] dark:text-[#FFD700] font-bold">
                            &#123;
                          </span>
                        </div>

                        {/* Line 03: Company */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#0284C7] dark:text-[#9CDCFE]">
                            company:
                          </span>{" "}
                          <span className="text-[#B91C1C] dark:text-[#CE9178]">
                            "{activeExp.company}"
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ,
                          </span>
                        </div>

                        {/* Line 04: Role */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#0284C7] dark:text-[#9CDCFE]">
                            role:
                          </span>{" "}
                          <span className="text-[#B91C1C] dark:text-[#CE9178] font-medium">
                            "{activeExp.role}"
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ,
                          </span>
                        </div>

                        {/* Line 05: Type */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#0284C7] dark:text-[#9CDCFE]">
                            type:
                          </span>{" "}
                          <span className="text-[#B91C1C] dark:text-[#CE9178]">
                            "{activeExp.type}"
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ,
                          </span>
                        </div>

                        {/* Line 06: Duration */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#0284C7] dark:text-[#9CDCFE]">
                            duration:
                          </span>{" "}
                          <span className="text-[#B91C1C] dark:text-[#CE9178]">
                            "{activeExp.duration}"
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ,
                          </span>
                        </div>

                        {/* Line 07: Location */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#0284C7] dark:text-[#9CDCFE]">
                            location:
                          </span>{" "}
                          <span className="text-[#B91C1C] dark:text-[#CE9178]">
                            "{activeExp.location}"
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ,
                          </span>
                        </div>

                        {/* Line 08: Empty separator */}
                        <div className="leading-relaxed">&nbsp;</div>

                        {/* Line 09: Overview Key (Warm Amber / Gold Highlight) */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#D97706] dark:text-[#FBBF24] font-semibold">
                            overview:
                          </span>
                        </div>

                        {/* Line 10: Overview Value (Warm Amber String) */}
                        <div className="pl-8 sm:pl-10 leading-relaxed text-[#B45309] dark:text-[#FCD34D]">
                          "{activeExp.overview}"
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ,
                          </span>
                        </div>

                        {/* Line 11: Empty separator */}
                        <div className="leading-relaxed">&nbsp;</div>

                        {/* Line 12: Responsibilities array opening (Fuchsia / Purple Highlight) */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#9333EA] dark:text-[#E879F9] font-semibold">
                            responsibilities:
                          </span>{" "}
                          <span className="text-[#9333EA] dark:text-[#DA70D6] font-bold">
                            [
                          </span>
                        </div>

                        {/* Lines 13-15: Responsibilities items (Vibrant Emerald / Mint Green Impact Strings) */}
                        {activeExp.responsibilities.map((resp, rIdx) => (
                          <div
                            key={rIdx}
                            className="pl-8 sm:pl-10 leading-relaxed text-[#15803D] dark:text-[#4ADE80]"
                          >
                            "{resp}"
                            {rIdx < activeExp.responsibilities.length - 1 && (
                              <span className="text-[#64748B] dark:text-[#94A3B8]">
                                ,
                              </span>
                            )}
                          </div>
                        ))}

                        {/* Line 16: Responsibilities closing */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#9333EA] dark:text-[#DA70D6] font-bold">
                            ]
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ,
                          </span>
                        </div>

                        {/* Line 17: Empty separator */}
                        <div className="leading-relaxed">&nbsp;</div>

                        {/* Line 18: Skills array opening (Electric Teal / Cyan Highlight) */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#0D9488] dark:text-[#2DD4BF] font-semibold">
                            skills:
                          </span>{" "}
                          <span className="text-[#0284C7] dark:text-[#60A5FA] font-bold">
                            [
                          </span>
                        </div>

                        {/* Lines 19-22: Skills items (Electric Sky Blue Strings) */}
                        {activeExp.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="pl-8 sm:pl-10 leading-relaxed text-[#0284C7] dark:text-[#38BDF8]"
                          >
                            "{skill}"
                            {sIdx < activeExp.skills.length - 1 && (
                              <span className="text-[#64748B] dark:text-[#94A3B8]">
                                ,
                              </span>
                            )}
                          </div>
                        ))}

                        {/* Line 23: Skills closing */}
                        <div className="pl-4 sm:pl-6 leading-relaxed">
                          <span className="text-[#0284C7] dark:text-[#60A5FA] font-bold">
                            ]
                          </span>
                        </div>

                        {/* Line 24: Object closing (Gold outer bracket matching opening) */}
                        <div className="leading-relaxed">
                          <span className="text-[#D97706] dark:text-[#FFD700] font-bold">
                            &#125;
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ;
                          </span>
                        </div>

                        {/* Line 25: Empty separator */}
                        <div className="leading-relaxed">&nbsp;</div>

                        {/* Line 26: Export default */}
                        <div className="leading-relaxed">
                          <span className="text-[#AF00DB] dark:text-[#C586C0] font-semibold">
                            export default
                          </span>{" "}
                          <span className="text-[#001080] dark:text-[#4FC1FF] font-medium">
                            experience
                          </span>
                          <span className="text-[#64748B] dark:text-[#94A3B8]">
                            ;
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center select-none py-12">
                    <div className="w-13 h-13 rounded-2xl bg-[#F0EBFA] dark:bg-[#1E1730] border border-[#D6CBFF] dark:border-[#382C5A] flex items-center justify-center text-[#7C3AED] dark:text-[#C4B5FD] mb-4 shadow-xs">
                      <FileCode className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h4 className="font-mono text-sm font-semibold text-[#34154E] dark:text-[#F5F3FA]">
                      No Open Editors
                    </h4>
                    <p className="mt-1.5 font-mono text-xs text-[#7B7095] dark:text-[#8D82A5] max-w-sm leading-relaxed">
                      Select an experience file from the EXPLORER to inspect Jessicaa's career details.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                      {EXPERIENCES.map((exp) => (
                        <button
                          key={exp.id}
                          type="button"
                          onClick={() => handleOpenFile(exp.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-[#FAF8FE] dark:bg-[#1A1428] hover:bg-[#F0EBFA] dark:hover:bg-[#251B3D] text-[#58506E] dark:text-[#C4B5FD] border border-[#E0D8F0] dark:border-[#382C5A] transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                        >
                          <FileCode className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#C4B5FD]" />
                          <span>Open {exp.fileName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 10. EDITOR STATUS BAR */}
            <div className="h-7 sm:h-8 border-t border-[#E8E2F2] dark:border-[#241D35] bg-[#FAF8FD] dark:bg-[#0D0B16] px-4 font-mono text-[10.5px] sm:text-[11px] text-[#7B7095] dark:text-[#8D82A5] flex items-center justify-between select-none">
              <div className="flex items-center gap-3 sm:gap-4">
                <span>{activeExp ? `Ln ${totalCodeLines}, Col 2` : "Ln 0, Col 0"}</span>
                <span className="hidden sm:inline">Spaces: 2</span>
                <span>UTF-8</span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-[#7C3AED] dark:text-[#C4B5FD] font-medium">
                  {activeExp ? "JavaScript JSX" : "Plain Text"}
                </span>
                <span className="hidden sm:inline">Prettier</span>
                <span className="text-[#583C7E] dark:text-[#C4B5FD] flex items-center gap-1 font-semibold">
                  <span>✦</span>
                  <span>experience</span>
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
