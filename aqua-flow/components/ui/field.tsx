"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const baseField =
  "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foam placeholder:text-foam/35 transition-colors duration-200 focus:outline-none focus:border-aqua/60 focus:bg-white/[0.07]";

export const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "mb-2 block text-[13px] font-semibold text-foam/70",
      className,
    )}
    {...props}
  />
);

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(baseField, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(baseField, "min-h-[110px] resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(baseField, "appearance-none cursor-pointer", className)}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
