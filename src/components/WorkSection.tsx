import React from "react";
import { Project } from "../types";
import { PROJECTS } from "../data/portfolioData";
import { ProjectCard } from "./ProjectCard";

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export function WorkSection({ onSelectProject }: WorkSectionProps) {
  // 4 Curated Real-World Projects
  const curatedProjects = PROJECTS;

  return (
    <section
      id="work"
      className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-36"
    >
      {/* 
        Clean Minimal Section Header: "My projects."
        Strictly NO icons, NO emojis, NO glass, NO gradients
      */}
      <div className="pb-8 sm:pb-14 border-b border-[#D6CBFF] dark:border-[#201D2A] mb-10 sm:mb-16 md:mb-24">
        <span className="font-sora text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-[#583C7E]/80 dark:text-[#8D879C]">
          01 / MY PROJECTS
        </span>
        <h2 className="mt-2.5 sm:mt-3 font-fraunces text-[32px] sm:text-[46px] md:text-[60px] font-bold tracking-tight text-[#34154E] dark:text-[#F5F3FA] leading-[1.04]">
          My <span className="font-fraunces italic font-normal text-[#583C7E] dark:text-[#C4B5FD]">projects.</span>
        </h2>
      </div>

      {/* 
        Alternating Editorial Showcase of 5 Projects with Scroll Stacking Effect
        Each card sticks on scroll and stacks with the subsequent project
      */}
      <div className="relative space-y-12 sm:space-y-20 pb-16 sm:pb-28">
        {curatedProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
