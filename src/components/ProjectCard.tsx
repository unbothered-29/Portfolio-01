import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../types";
import { cn } from "../lib/utils";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onSelect, index }: ProjectCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 1;

  return (
    <article
      id={`project-item-${project.id}`}
      onClick={() => onSelect(project)}
      style={{
        top: `clamp(64px, 9vh, 84px)`,
        zIndex: index + 1,
      }}
      className={cn(
        "group cursor-pointer select-none sticky",
        "bg-[#FAFAFA] dark:bg-[#09080E]",
        "py-6 sm:py-10 md:py-14 px-3 sm:px-6 md:px-8 -mx-3 sm:-mx-6 md:-mx-8 rounded-2xl sm:rounded-3xl",
        "shadow-[0_-8px_30px_rgba(24,15,46,0.03)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.45)]",
        "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center",
        "transition-shadow duration-300 font-sora"
      )}
    >
      {/* 
        Image Column (7 Cols on desktop)
        Alternates order: Even items display image on the right (order-1 lg:order-2)
      */}
      <div
        className={cn(
          "w-full lg:col-span-7",
          isEven ? "lg:order-2" : "lg:order-1"
        )}
      >
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-[#EBE8F0] dark:bg-[#15141D] border border-[#D6CBFF]/60 dark:border-white/[0.08] transition-all duration-500 group-hover:border-[#C4B5FD] dark:group-hover:border-white/20 group-hover:shadow-[0_20px_50px_rgba(24,15,46,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <img
            src={project.image}
            alt={project.altText}
            loading="lazy"
            className="w-full h-full object-cover object-top transform transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Frosted Glass Floating Indicator on Hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/0 group-hover:bg-black/15 dark:group-hover:bg-black/35 transition-colors duration-300">
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out px-4 py-2 rounded-full bg-white/95 dark:bg-[#181622]/90 backdrop-blur-md border border-[#D6CBFF] dark:border-white/15 shadow-[0_8px_24px_rgba(24,15,46,0.15)] flex items-center gap-2 text-xs font-sora tracking-wider uppercase text-[#34154E] dark:text-white font-medium">
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#583C7E] dark:text-[#C4B5FD]" />
            </div>
          </div>
        </div>
      </div>

      {/* 
        Editorial Narrative Column (5 Cols on desktop)
        Alternates order: Even items display text on the left (order-2 lg:order-1)
      */}
      <div
        className={cn(
          "w-full lg:col-span-5 flex flex-col justify-center",
          isEven ? "lg:order-1" : "lg:order-2"
        )}
      >
        {/* Index and Year */}
        <div className="flex items-center gap-3 font-sora text-xs text-[#7E788B] dark:text-[#888295] tracking-widest uppercase mb-3">
          <span className="font-semibold text-[#34154E] dark:text-white">
            {formattedIndex}
          </span>
          <span>/</span>
          <span>{project.year}</span>
        </div>

        {/* Project Title */}
        <h3 className="font-fraunces text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#34154E] dark:text-[#F5F3FA] leading-[1.1] group-hover:text-[#583C7E] dark:group-hover:text-[#C4B5FD] transition-colors duration-200">
          {project.title}
        </h3>

        {/* Category & Client */}
        <p className="mt-2 text-sm sm:text-base text-[#583C7E]/90 dark:text-[#A099AD] font-medium font-sora">
          <span className="font-fraunces italic font-normal text-[#34154E] dark:text-[#DDD6FE]">
            {project.category}
          </span>
          <span className="mx-2 text-[#D6CBFF] dark:text-[#4B4557]">—</span>
          <span>{project.client}</span>
        </p>

        {/* Project Narrative */}
        <p className="mt-4 text-sm sm:text-base text-[#583C7E]/80 dark:text-[#8E879B] leading-relaxed line-clamp-3 font-sora">
          {project.brief}
        </p>

        {/* Deliverables tags: clean minimal text list, no glass, no icons, no badges */}
        {project.deliverables && project.deliverables.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#7B7587] dark:text-[#7C7689] font-sora tracking-wider uppercase">
            {project.deliverables.slice(0, 3).map((item, idx) => (
              <span key={item}>
                {item}
                {idx < 2 && idx < project.deliverables.length - 1 && (
                  <span className="ml-4 text-[#D6CBFF] dark:text-[#413C4D]">·</span>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Minimal Text Action */}
        <div className="mt-8 pt-4">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#34154E] dark:text-white border-b border-[#34154E] dark:border-white pb-1 group-hover:border-[#583C7E] dark:group-hover:border-[#C4B5FD] group-hover:text-[#583C7E] dark:group-hover:text-[#C4B5FD] transition-colors duration-200">
            View Case Study
          </span>
        </div>
      </div>
    </article>
  );
}
