import * as React from "react";
import { ArrowLeft, Play } from "lucide-react";
import { SiteConfig, siteConfig as defaultSiteConfig } from "@/lib/site-config";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YouTubeIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface FeaturedVideosProps {
  config?: SiteConfig;
  className?: string;
}

export function FeaturedVideos({
  config = defaultSiteConfig,
  className = "",
}: FeaturedVideosProps) {
  const videos = config.featuredVideos;

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="ویدیوهای برگزیده آموزشی"
      className={cn("w-full py-8 sm:py-12", className)}
    >
      {/* Section Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          ویدیوهای برگزیده آموزشی
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base max-w-xl">
          منتخبی از آموزش‌های عمیق مهندسی نرم‌افزار، معماری وب و کدنویسی کاربردی در یوتیوب
        </p>
      </div>

      {/* Featured Video Cards Grid */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {videos.map((video) => (
          <Card
            key={video.id}
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden h-full",
              "border-border/80 bg-card/75 backdrop-blur-xl shadow-sm",
              "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-red-500/30"
            )}
          >
            {/* Subtle top ambient red sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 start-1/2 -z-10 h-24 w-48 -translate-x-1/2 rounded-full bg-gradient-to-b from-red-500/10 to-transparent blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div>
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Dark gradient scrim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                />

                {/* Topic Tag on Thumbnail */}
                <div className="absolute top-3 end-3 z-10">
                  <Badge
                    variant="secondary"
                    className="border-white/20 bg-black/60 text-white backdrop-blur-md text-xs font-semibold px-2.5 py-0.5"
                  >
                    {video.tag}
                  </Badge>
                </div>

                {/* Video Duration Badge */}
                <div className="absolute bottom-3 start-3 z-10 flex items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-md border border-white/10">
                  <span>{video.duration}</span>
                </div>

                {/* Play Button Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="flex size-12 sm:size-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600">
                    <Play className="size-5 sm:size-6 fill-white text-white translate-x-[-1px]" />
                  </div>
                </div>
              </div>

              {/* Card Header & Content */}
              <CardHeader className="gap-2 p-5 pb-2">
                <CardTitle className="text-base sm:text-lg font-bold text-foreground leading-normal group-hover:text-red-600 transition-colors line-clamp-2">
                  {video.title}
                </CardTitle>
                <CardDescription className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                  {video.description}
                </CardDescription>
              </CardHeader>
            </div>

            {/* Watch Link CTA in Footer */}
            <CardFooter className="p-5 pt-4">
              <Button
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`تماشا در یوتیوب: ${video.title}`}
                className={cn(
                  "inline-flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium",
                  "border border-border/70 bg-card/60 text-foreground shadow-xs",
                  "transition-all duration-200",
                  "hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-600",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <span className="flex items-center gap-2">
                  <YouTubeIcon className="size-4 shrink-0 text-red-600" />
                  <span>تماشا در یوتیوب</span>
                </span>
                <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1.5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
