import React from "react";
import { cn } from "../lib/utils";

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left",
        className
      )}
    >
      {badge && (
        <div className="mb-4">
          <span className="font-helvetica text-[11px] font-medium tracking-[0.14em] uppercase text-[#77747E] dark:text-[#A19BAE]">
            {badge}
          </span>
        </div>
      )}
      <h2 className="font-helvetica text-[36px] sm:text-[44px] md:text-[52px] font-bold tracking-tight text-[#18171C] dark:text-[#F5F3FA] leading-[1.08]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 font-helvetica text-base md:text-lg text-[#77747E] dark:text-[#A19BAE] font-normal max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
