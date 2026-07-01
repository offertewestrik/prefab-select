import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white shadow-sm hover:bg-primary-600 hover:shadow-md",
        accent: "bg-accent-500 text-white shadow-md hover:bg-accent-600 hover:shadow-lg",
        outline:
          "border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 hover:border-neutral-300",
        ghost: "text-neutral-900 hover:bg-neutral-100",
        navy: "bg-navy-800 text-white shadow-sm hover:bg-navy-700 hover:shadow-md",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
