import React, { useEffect } from "react";
import { X, ArrowUpRight, ArrowRight, Code2 } from "lucide-react";
import { Project } from "../types";
import { PROJECTS } from "../data/portfolioData";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export function CaseStudyModal({ project, onClose, onSelectProject }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject =
    currentIndex >= 0 && currentIndex < PROJECTS.length - 1
      ? PROJECTS[currentIndex + 1]
      : PROJECTS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto bg-black/50 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Click Outside Backdrop */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Clean Minimal Editorial Modal Shell */}
      <div
        className="relative z-10 w-full max-w-4xl my-auto max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#FAFAFA] dark:bg-[#12101A] border border-[#D6CBFF] dark:border-white/10 shadow-2xl p-6 sm:p-10 md:p-12 text-[#34154E] dark:text-[#F5F3FA] font-sora transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Category, Year, and Minimal Close */}
        <div className="flex items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-2 font-sora text-xs text-[#583C7E]/75 dark:text-[#9A94A8] tracking-widest uppercase">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-[#34154E]/[0.05] dark:hover:bg-white/10 text-[#583C7E]/75 dark:text-[#9A94A8] hover:text-[#34154E] dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h2
            id="case-study-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-fraunces tracking-tight text-[#34154E] dark:text-white leading-[1.08]"
          >
            {project.title}
          </h2>

          {project.altText && project.altText !== project.title && (
            <p className="mt-2 text-sm sm:text-base text-[#583C7E]/85 dark:text-[#ABA4BA] leading-relaxed max-w-2xl font-sora">
              {project.altText}
            </p>
          )}
        </div>

        {/* Hero Image */}
        <div className="mt-8 overflow-hidden rounded-xl sm:rounded-2xl border border-black/8 dark:border-white/10 bg-[#EAE8F0] dark:bg-[#181523] aspect-[16/10]">
          <img
            src={project.image}
            alt={project.altText || project.title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Metadata Strip: Client, Deliverables, Stack & Actions */}
        <div className="mt-8 py-6 border-y border-black/8 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-widest text-[#888295] dark:text-[#8D879C] mb-1.5">
              Client / Organization
            </span>
            <span className="text-sm font-medium text-[#18171C] dark:text-white">
              {project.client}
            </span>
          </div>

          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-widest text-[#888295] dark:text-[#8D879C] mb-1.5">
              Deliverables
            </span>
            <span className="text-sm text-[#4A4456] dark:text-[#C5BED0] leading-relaxed">
              {project.deliverables.join(", ")}
            </span>
          </div>

          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-widest text-[#888295] dark:text-[#8D879C] mb-1.5">
              Tech Stack
            </span>
            <span className="text-xs font-mono text-[#4A4456] dark:text-[#C5BED0] leading-relaxed">
              {project.techStack?.join(" · ") || "—"}
            </span>
          </div>

          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-widest text-[#888295] dark:text-[#8D879C] mb-1.5">
              Links
            </span>
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#7C3AED] dark:text-[#C084FC] hover:underline"
                >
                  <span>Visit Experience</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#18171C] dark:text-white hover:underline"
                >
                  <span>Code</span>
                  <Code2 className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="mt-8 space-y-8">
          {/* Project Brief */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#716A80] dark:text-[#9F98AE] mb-3">
              Project Brief
            </h3>
            <p className="text-base sm:text-lg text-[#1A1724] dark:text-[#F3F1F8] leading-relaxed">
              {project.brief}
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-black/8 dark:border-white/10">
            <div>
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#716A80] dark:text-[#9F98AE] mb-2.5">
                The Challenge
              </h4>
              <p className="text-sm text-[#4A4456] dark:text-[#BCB5C8] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#716A80] dark:text-[#9F98AE] mb-2.5">
                The Solution
              </h4>
              <p className="text-sm text-[#4A4456] dark:text-[#BCB5C8] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features & Architecture */}
          {project.features && project.features.length > 0 && (
            <div className="pt-6 border-t border-black/8 dark:border-white/10">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#716A80] dark:text-[#9F98AE] mb-3.5">
                Key Features & Architecture
              </h4>
              <ul className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#383344] dark:text-[#D4CFDF] leading-relaxed"
                  >
                    <span className="text-[#7C3AED] dark:text-[#C084FC] font-mono select-none">
                      —
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Actions: Next Case Study & Visit Experience */}
          <div className="pt-8 border-t border-black/8 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            {onSelectProject && nextProject && (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7C3AED] dark:text-[#C084FC] hover:opacity-80 transition-opacity cursor-pointer py-2"
              >
                <span>Next Case Study: <span className="font-semibold text-[#18171C] dark:text-white group-hover:text-[#7C3AED] dark:group-hover:text-[#C084FC] transition-colors">{nextProject.title}</span></span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18171C] hover:bg-black dark:bg-[#7C3AED] dark:hover:bg-[#6D28D9] text-white text-xs font-mono uppercase tracking-widest transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ml-auto"
              >
                <span>Visit Experience</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
