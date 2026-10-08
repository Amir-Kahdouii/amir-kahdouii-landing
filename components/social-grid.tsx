import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { SiteConfig, SocialChannelConfig, siteConfig as defaultSiteConfig } from "@/lib/site-config";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { YouTubeIcon, TelegramIcon, LinkedInIcon, GitHubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface SocialGridProps {
  config?: SiteConfig;
  className?: string;
  showGithub?: boolean;
}

interface ChannelMeta {
  key: "youtube" | "telegram" | "linkedin" | "github";
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  borderHover: string;
  actionText: string;
}

const CHANNEL_METAS: Record<string, ChannelMeta> = {
  youtube: {
    key: "youtube",
    icon: YouTubeIcon,
    accentColor: "text-red-600",
    badgeBg: "bg-red-500/10 text-red-600 border-red-500/20 group-hover:bg-red-500/15",
    borderHover: "hover:border-red-500/40 hover:shadow-red-500/5",
    actionText: "مشاهده کانال در یوتیوب",
  },
  telegram: {
    key: "telegram",
    icon: TelegramIcon,
    accentColor: "text-sky-500",
    badgeBg: "bg-sky-500/10 text-sky-500 border-sky-500/20 group-hover:bg-sky-500/15",
    borderHover: "hover:border-sky-500/40 hover:shadow-sky-500/5",
    actionText: "عضویت در کانال تلگرام",
  },
  linkedin: {
    key: "linkedin",
    icon: LinkedInIcon,
    accentColor: "text-blue-600",
    badgeBg: "bg-blue-600/10 text-blue-600 border-blue-600/20 group-hover:bg-blue-600/15",
    borderHover: "hover:border-blue-600/40 hover:shadow-blue-600/5",
    actionText: "اتصال در لینکدین",
  },
  github: {
    key: "github",
    icon: GitHubIcon,
    accentColor: "text-neutral-800",
    badgeBg: "bg-neutral-800/10 text-neutral-800 border-neutral-800/20 group-hover:bg-neutral-800/15",
    borderHover: "hover:border-neutral-500/40 hover:shadow-neutral-500/5",
    actionText: "مشاهده مخازن گیت‌هاب",
  },
};

export function SocialGrid({
  config = defaultSiteConfig,
  className = "",
  showGithub = false,
}: SocialGridProps) {
  const socials = config.socials;

  type TargetKey = "youtube" | "telegram" | "linkedin" | "github";
  const targetKeys: TargetKey[] = ["youtube", "telegram", "linkedin"];

  if (showGithub && socials.github) {
    targetKeys.push("github");
  }

  const channels = targetKeys
    .map((key) => {
      const channel = socials[key];
      if (!channel) return null;
      const meta = CHANNEL_METAS[key];
      return {
        key,
        channel,
        meta,
      };
    })
    .filter(
      (item): item is { key: TargetKey; channel: SocialChannelConfig; meta: ChannelMeta } =>
        Boolean(item)
    );

  return (
    <section
      aria-label="کانال‌ها و شبکه‌های اجتماعی"
      className={cn("w-full py-8 sm:py-12", className)}
    >
      {/* Section Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          شبکه‌های تخصصی و ارتباطی
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base max-w-xl">
          محتوای ویدیویی، تجربیات معماری نرم‌افزار و جامعه فنی را در پلتفرم‌های زیر دنبال کنید
        </p>
      </div>

      {/* Frosted Glass Cards Grid */}
      <div
        className={cn(
          "grid w-full gap-5 sm:gap-6",
          channels.length === 3
            ? "grid-cols-1 md:grid-cols-3"
            : channels.length === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        )}
      >
        {channels.map(({ key, channel, meta }) => {
          const Icon = meta.icon;
          return (
            <Card
              key={key}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden",
                "border-border/80 bg-card/75 backdrop-blur-xl shadow-sm",
                "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl",
                meta.borderHover
              )}
            >
              {/* Subtle top ambient sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 start-1/2 -z-10 h-24 w-40 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/10 to-transparent blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <CardHeader className="gap-3 pb-3">
                {/* Platform Icon & Stat Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={cn(
                      "flex size-11 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105",
                      meta.badgeBg
                    )}
                  >
                    <Icon className="size-5 shrink-0" />
                  </div>

                  {channel.stat && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal text-muted-foreground bg-muted/60 border-border/60"
                    >
                      {channel.stat}
                    </Badge>
                  )}
                </div>

                {/* Identity Titles */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-foreground transition-colors">
                    {channel.label}
                  </h3>
                  <span
                    dir="ltr"
                    className="text-xs font-medium text-muted-foreground self-start tracking-normal"
                  >
                    {channel.handle}
                  </span>
                </div>
              </CardHeader>

              {/* Channel Description */}
              <CardContent className="py-2 flex-1">
                {channel.description && (
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    {channel.description}
                  </p>
                )}
              </CardContent>

              {/* Action Link Footer */}
              <CardFooter className="pt-4">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${meta.actionText} - ${channel.label}`}
                  className={cn(
                    "inline-flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium",
                    "border border-border/70 bg-card/60 text-foreground shadow-xs",
                    "transition-all duration-200",
                    "hover:border-border hover:bg-accent/80 hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                >
                  <span>{meta.actionText}</span>
                  <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1.5" />
                </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
