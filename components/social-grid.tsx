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
  glowColor: string;
  borderHover: string;
  btnHover: string;
  dotColor: string;
  actionText: string;
}

const CHANNEL_METAS: Record<string, ChannelMeta> = {
  youtube: {
    key: "youtube",
    icon: YouTubeIcon,
    accentColor: "text-red-600",
    badgeBg: "bg-red-500/10 text-red-600 border-red-500/20 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:shadow-md group-hover:shadow-red-500/20",
    glowColor: "from-red-500/20 via-red-500/5 to-transparent",
    borderHover: "hover:border-red-500/40 hover:shadow-red-500/10",
    btnHover: "group-hover:border-red-500/30 group-hover:bg-red-500/5 group-hover:text-red-600",
    dotColor: "bg-red-500",
    actionText: "مشاهده کانال در یوتیوب",
  },
  telegram: {
    key: "telegram",
    icon: TelegramIcon,
    accentColor: "text-sky-500",
    badgeBg: "bg-sky-500/10 text-sky-500 border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 group-hover:shadow-md group-hover:shadow-sky-500/20",
    glowColor: "from-sky-500/20 via-sky-500/5 to-transparent",
    borderHover: "hover:border-sky-500/40 hover:shadow-sky-500/10",
    btnHover: "group-hover:border-sky-500/30 group-hover:bg-sky-500/5 group-hover:text-sky-600",
    dotColor: "bg-sky-500",
    actionText: "عضویت در کانال تلگرام",
  },
  linkedin: {
    key: "linkedin",
    icon: LinkedInIcon,
    accentColor: "text-blue-600",
    badgeBg: "bg-blue-600/10 text-blue-600 border-blue-600/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-md group-hover:shadow-blue-600/20",
    glowColor: "from-blue-600/20 via-blue-600/5 to-transparent",
    borderHover: "hover:border-blue-600/40 hover:shadow-blue-600/10",
    btnHover: "group-hover:border-blue-600/30 group-hover:bg-blue-600/5 group-hover:text-blue-600",
    dotColor: "bg-blue-600",
    actionText: "اتصال در لینکدین",
  },
  github: {
    key: "github",
    icon: GitHubIcon,
    accentColor: "text-neutral-900",
    badgeBg: "bg-neutral-900/10 text-neutral-900 border-neutral-900/20 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 group-hover:shadow-md group-hover:shadow-neutral-900/20",
    glowColor: "from-neutral-700/20 via-neutral-700/5 to-transparent",
    borderHover: "hover:border-neutral-500/40 hover:shadow-neutral-500/10",
    btnHover: "group-hover:border-neutral-700/30 group-hover:bg-neutral-800/5 group-hover:text-neutral-900",
    dotColor: "bg-neutral-700",
    actionText: "مشاهده مخازن گیت‌هاب",
  },
};

export function SocialGrid({
  config = defaultSiteConfig,
  className = "",
  showGithub = true,
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

      {/* Frosted Glass Cards Grid - Responsive 2x2 Layout */}
      <div
        className={cn(
          "grid w-full gap-5 sm:gap-6",
          channels.length === 3
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        )}
      >
        {channels.map(({ key, channel, meta }) => {
          const Icon = meta.icon;
          return (
            <Card
              key={key}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden",
                "border-border/80 bg-card/75 backdrop-blur-xl shadow-xs",
                "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl",
                meta.borderHover
              )}
            >
              {/* Subtle top ambient colored sheen */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -top-16 start-1/2 -z-10 h-32 w-56 -translate-x-1/2 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b",
                  meta.glowColor
                )}
              />

              <CardHeader className="gap-4 p-6 pb-3">
                {/* Platform Icon & Stat Tag */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105",
                      meta.badgeBg
                    )}
                  >
                    <Icon className="size-6 shrink-0" />
                  </div>

                  {channel.stat && (
                    <Badge
                      variant="secondary"
                      className="inline-flex items-center gap-1.5 rounded-full border-border/70 bg-muted/60 px-3 py-1 text-xs font-normal text-muted-foreground whitespace-nowrap shadow-xs backdrop-blur-xs"
                    >
                      <span
                        className={cn("size-1.5 rounded-full shrink-0", meta.dotColor)}
                        aria-hidden="true"
                      />
                      {channel.stat}
                    </Badge>
                  )}
                </div>

                {/* Identity Titles */}
                <div className="flex flex-col gap-1 items-start text-start">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors">
                    {channel.label}
                  </h3>
                  <span
                    dir="ltr"
                    className="text-xs sm:text-sm font-medium text-muted-foreground tracking-normal"
                  >
                    {channel.handle}
                  </span>
                </div>
              </CardHeader>

              {/* Channel Description */}
              <CardContent className="px-6 py-2 flex-1">
                {channel.description && (
                  <p className="text-sm sm:text-[14.5px] text-foreground/80 leading-relaxed">
                    {channel.description}
                  </p>
                )}
              </CardContent>

              {/* Action Link Footer */}
              <CardFooter className="p-6 pt-4">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${meta.actionText} - ${channel.label}`}
                  className={cn(
                    "group/btn inline-flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium",
                    "border border-border/80 bg-background/60 text-foreground shadow-xs backdrop-blur-sm",
                    "transition-all duration-200",
                    "hover:border-border hover:bg-accent/80 hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    meta.btnHover
                  )}
                >
                  <span className="font-medium">{meta.actionText}</span>
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
