import * as React from "react";
import { Mail } from "lucide-react";
import { SiteConfig, siteConfig as defaultSiteConfig } from "@/lib/site-config";
import { YouTubeIcon, TelegramIcon, LinkedInIcon, GitHubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface FooterProps {
  config?: SiteConfig;
  className?: string;
}

function getLinkIcon(iconName?: string, label?: string) {
  const normalized = (iconName || label || "").toLowerCase();
  if (normalized.includes("youtube") || normalized.includes("یوتیوب")) {
    return YouTubeIcon;
  }
  if (normalized.includes("telegram") || normalized.includes("تلگرام")) {
    return TelegramIcon;
  }
  if (normalized.includes("linkedin") || normalized.includes("لینکدین")) {
    return LinkedInIcon;
  }
  if (
    normalized.includes("github") ||
    normalized.includes("گیت‌هاب") ||
    normalized.includes("گیتهاب")
  ) {
    return GitHubIcon;
  }
  return null;
}

export function Footer({
  config = defaultSiteConfig,
  className = "",
}: FooterProps) {
  const footer = config.footer;

  if (!footer) {
    return null;
  }

  return (
    <footer
      role="contentinfo"
      className={cn(
        "w-full mt-12 pt-8 pb-12 border-t border-border/60",
        "flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-start",
        className
      )}
    >
      {/* Copyright Notice */}
      <div className="flex flex-col items-center sm:items-start gap-1">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {footer.copyright}
        </p>
      </div>

      {/* Quick Contact & Navigation Links */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {footer.links.map((link, idx) => {
          const Icon = getLinkIcon(link.icon, link.label);
          const isExternal = link.href.startsWith("http");

          return (
            <a
              key={idx}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium",
                "text-muted-foreground hover:text-foreground transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
              aria-label={link.label}
            >
              {Icon && <Icon className="size-3.5 shrink-0" />}
              <span>{link.label}</span>
            </a>
          );
        })}

        {/* Email Direct Contact */}
        {footer.contactEmail && (
          <a
            href={`mailto:${footer.contactEmail}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium",
              "text-muted-foreground hover:text-foreground transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label={`ایمیل: ${footer.contactEmail}`}
          >
            <Mail className="size-3.5 shrink-0" />
            <span>ایمیل ارتباطی</span>
          </a>
        )}
      </div>
    </footer>
  );
}
