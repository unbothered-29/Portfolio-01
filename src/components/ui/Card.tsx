import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ className, glass = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] overflow-hidden transition-all duration-300",
        glass
          ? "bg-white/52 backdrop-blur-xl border border-white/65 shadow-[0_20px_60px_rgba(30,20,50,0.08)]"
          : "bg-white border border-black/5 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 sm:p-8 flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 sm:p-8 pt-0", className)} {...props}>
      {children}
    </div>
  );
}
