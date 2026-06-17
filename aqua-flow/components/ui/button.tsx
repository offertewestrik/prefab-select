"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-aqua to-aqua-bright text-ink shadow-[0_18px_45px_-12px_rgba(34,211,238,0.65)] hover:shadow-[0_24px_60px_-10px_rgba(34,211,238,0.85)] hover:-translate-y-0.5",
        glass:
          "glass text-foam hover:bg-white/10 hover:-translate-y-0.5",
        outline:
          "border border-aqua/40 text-aqua hover:bg-aqua/10 hover:-translate-y-0.5",
        ghost: "text-foam/80 hover:text-foam hover:bg-white/5",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9 text-[13px]",
        icon: "h-12 w-12 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
