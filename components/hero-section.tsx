import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { SiteConfig, siteConfig as defaultSiteConfig } from "@/lib/site-config";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YouTubeIcon, TelegramIcon } from "@/components/icons";

export interface HeroSectionProps {
  config?: SiteConfig;
  className?: string;
}

export function HeroSection({
  config = defaultSiteConfig,
  className = "",
}: HeroSectionProps) {
  return (
    <section
      aria-label="بخش معرفی اصلی"
      className={`relative flex w-full flex-col items-center text-center pt-8 pb-12 sm:pt-14 sm:pb-16 ${className}`}
    >
      {/* Ambient background bloom behind avatar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 start-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl opacity-80"
      />

      {/* Status / Availability badge */}
      {config.statusBadge && (
        <div className="mb-6 flex items-center justify-center">
          <Badge
            variant="outline"
            className="border-border/80 bg-card/80 px-3.5 py-1 text-xs font-normal text-muted-foreground shadow-sm"
          >
            {config.statusBadge.active && (
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
            )}
            <span>{config.statusBadge.text}</span>
          </Badge>
        </div>
      )}

      {/* Avatar Container with glowing ring */}
      <div className="relative mb-6 group">
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand/30 via-accent/40 to-primary/20 blur-md opacity-70 transition duration-300 group-hover:opacity-100"
        />
        <Avatar
          src={config.avatar.src}
          alt={config.avatar.alt}
          fallbackText={config.avatar.fallbackText}
          size="2xl"
          className="relative ring-4 ring-background shadow-lg"
        />
      </div>

      {/* Identity Typography */}
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
        <h1
          id="hero-title"
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-[1.2]"
        >
          {config.name}
        </h1>

        <p className="text-base font-medium text-foreground/85 sm:text-lg">
          {config.title}
        </p>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base leading-relaxed max-w-xl">
          {config.bio}
        </p>
      </div>

      {/* Primary Action Buttons (YouTube & Telegram) */}
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
        {/* YouTube Primary CTA */}
        <Button
          href={config.primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          className="w-full sm:w-auto min-w-[200px] bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 gap-2.5 rounded-full px-6"
        >
          <YouTubeIcon className="size-4 shrink-0 text-white" />
          <span>{config.primaryCta.label}</span>
          <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
        </Button>

        {/* Telegram Secondary CTA */}
        <Button
          href={config.secondaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="lg"
          className="w-full sm:w-auto min-w-[200px] border-border bg-card/70 hover:bg-sky-500/10 hover:text-sky-600 hover:border-sky-500/40 text-foreground shadow-sm gap-2.5 rounded-full px-6"
        >
          <TelegramIcon className="size-4 shrink-0 text-sky-500" />
          <span>{config.secondaryCta.label}</span>
        </Button>
      </div>
    </section>
  );
}
