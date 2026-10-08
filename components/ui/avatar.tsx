import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-lg",
  "2xl": "size-28 sm:size-32 text-2xl",
};

export function Avatar({
  src,
  alt,
  fallbackText,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const initial = fallbackText || (alt.trim().charAt(0) || "ا");

  return (
    <span
      title={alt}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold select-none shadow-md",
        "bg-secondary border-2 border-border/60",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="size-full rounded-full object-cover"
        />
      ) : (
        <span className="text-foreground/80 font-bold">{initial}</span>
      )}
    </span>
  );
}
