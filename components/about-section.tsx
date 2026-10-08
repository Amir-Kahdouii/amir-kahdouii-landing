import * as React from "react";
import { SiteConfig, siteConfig as defaultSiteConfig } from "@/lib/site-config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface AboutSectionProps {
  config?: SiteConfig;
  className?: string;
}

export function AboutSection({
  config = defaultSiteConfig,
  className = "",
}: AboutSectionProps) {
  const about = config.about;

  if (!about || !about.paragraphs || about.paragraphs.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="درباره من"
      className={cn("w-full py-8 sm:py-12", className)}
    >
      <Card
        className={cn(
          "relative overflow-hidden",
          "border-border/80 bg-card/75 backdrop-blur-xl shadow-sm",
          "p-6 sm:p-8 md:p-10"
        )}
      >
        {/* Subtle top ambient sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 start-1/2 -z-10 h-32 w-64 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/10 to-transparent blur-2xl opacity-60"
        />

        <CardHeader className="p-0 pb-6 text-center sm:text-start">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {about.heading}
          </h2>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base text-foreground/85 leading-[1.85] sm:text-lg"
            >
              {paragraph}
            </p>
          ))}

          {about.focusAreas && about.focusAreas.length > 0 && (
            <div className="pt-4 flex flex-wrap gap-2 items-center">
              {about.focusAreas.map((area, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-muted/70 text-foreground/80 border-border/60 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                >
                  {area}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
