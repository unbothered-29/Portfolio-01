import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "glass" | "darkGlass" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "glass", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98BFF]/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles = {
      default:
        "bg-[#18171C] text-white hover:bg-[#2A2931] shadow-sm active:scale-[0.98]",
      glass:
        "bg-white/60 hover:bg-white/80 text-[#18171C] border border-white/70 shadow-[0_8px_24px_rgba(30,20,50,0.06)] hover:shadow-[0_12px_32px_rgba(30,20,50,0.1)] active:scale-[0.98] backdrop-blur-md",
      darkGlass:
        "bg-[#14121C]/85 hover:bg-[#14121C] text-white border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.18)] active:scale-[0.98] backdrop-blur-md",
      ghost:
        "text-[#18171C] hover:bg-white/40 active:bg-white/60",
      outline:
        "border border-white/70 bg-white/30 text-[#18171C] hover:bg-white/50",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs tracking-wider uppercase rounded-full",
      md: "h-11 px-6 text-sm tracking-wide rounded-full",
      lg: "h-14 px-8 text-sm md:text-base font-medium tracking-wide rounded-full",
      icon: "h-10 w-10 rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
