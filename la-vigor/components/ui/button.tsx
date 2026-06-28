"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-caramel to-caramel-bright text-choco shadow-[0_18px_45px_-12px_rgba(201,138,75,0.7)] hover:shadow-[0_24px_60px_-10px_rgba(224,164,94,0.9)] hover:-translate-y-0.5",
        whatsapp:
          "bg-[#25D366] text-white shadow-[0_18px_45px_-14px_rgba(37,211,102,0.7)] hover:brightness-105 hover:-translate-y-0.5",
        glass: "glass text-espresso hover:-translate-y-0.5",
        outline:
          "border border-cream/40 text-cream hover:bg-cream/10 hover:-translate-y-0.5",
        outlineDark:
          "border border-espresso/25 text-espresso hover:bg-espresso/5 hover:-translate-y-0.5",
        ghost: "text-cream/80 hover:text-cream hover:bg-cream/10",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9 text-[15px]",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

/** Same visual styles, rendered as an anchor for links. */
export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
LinkButton.displayName = "LinkButton";

export { Button, LinkButton, buttonVariants };
