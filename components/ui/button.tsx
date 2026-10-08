import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "outline" | "ghost" | "brand" | "destructive";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm active:translate-y-[1px]",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border shadow-sm active:translate-y-[1px]",
  outline:
    "border border-border/70 bg-card/60 backdrop-blur-md text-foreground hover:bg-accent/80 hover:text-accent-foreground shadow-sm active:translate-y-[1px]",
  ghost:
    "text-foreground hover:bg-accent/80 hover:text-accent-foreground active:translate-y-[1px]",
  brand:
    "bg-brand text-brand-foreground hover:bg-brand/90 shadow-md shadow-brand/20 active:translate-y-[1px]",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 shadow-sm active:translate-y-[1px]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "size-10",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant = "default", size = "md", href, ...props }, ref) => {
  const commonClasses = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium cursor-pointer transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={commonClasses}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={(props.type as "button" | "submit" | "reset") || "button"}
      className={commonClasses}
      {...props}
    />
  );
});

Button.displayName = "Button";
