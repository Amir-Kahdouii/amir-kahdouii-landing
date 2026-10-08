import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { siteConfig } from "@/lib/site-config";
import { FeaturedVideos } from "@/components/featured-videos";

describe("Featured Video Highlights Showcase (Issue 04)", () => {
  describe("Component Rendering & Visual Hierarchy", () => {
    it("renders the featured videos section with an accessible heading and description", () => {
      render(<FeaturedVideos config={siteConfig} />);

      const section = screen.getByRole("region", {
        name: /ویدیوهای برگزیده|آموزش‌های ویدیویی/i,
      });
      expect(section).toBeInTheDocument();

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBeTruthy();
    });

    it("renders each featured video defined in site configuration", () => {
      render(<FeaturedVideos config={siteConfig} />);

      const videos = siteConfig.featuredVideos || [];
      expect(videos.length).toBeGreaterThan(0);

      videos.forEach((video) => {
        expect(screen.getByText(video.title)).toBeInTheDocument();
        expect(screen.getByText(video.description)).toBeInTheDocument();
        expect(screen.getByText(video.tag)).toBeInTheDocument();
        expect(screen.getByText(video.duration)).toBeInTheDocument();

        // Check thumbnail image
        const img = screen.getByAltText(video.title);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", video.thumbnailUrl);
      });
    });

    it("renders secure external watch links with target=_blank and rel=noopener noreferrer", () => {
      render(<FeaturedVideos config={siteConfig} />);

      const videos = siteConfig.featuredVideos || [];

      videos.forEach((video) => {
        const watchLinks = screen.getAllByRole("link").filter(
          (link) => link.getAttribute("href") === video.youtubeUrl
        );
        expect(watchLinks.length).toBeGreaterThanOrEqual(1);

        watchLinks.forEach((link) => {
          expect(link).toHaveAttribute("target", "_blank");
          expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
      });
    });

    it("renders play or watch action button on each video card", () => {
      render(<FeaturedVideos config={siteConfig} />);

      const watchButtons = screen.getAllByRole("link", {
        name: /تماشا در یوتیوب|مشاهده ویدیو/i,
      });
      expect(watchButtons.length).toBe((siteConfig.featuredVideos || []).length);
    });
  });

  describe("Configuration Decoupling", () => {
    it("dynamically renders custom video configuration items", () => {
      const customConfig = {
        ...siteConfig,
        featuredVideos: [
          {
            id: "custom-vid-1",
            title: "تست ویدیوی اختصاصی یک",
            description: "توضیحات ویدیوی تستی اول",
            youtubeUrl: "https://youtube.com/watch?v=custom1",
            thumbnailUrl: "/thumbnails/custom-1.jpg",
            duration: "۱۵ دقیقه",
            tag: "React 19",
          },
        ],
      };

      render(<FeaturedVideos config={customConfig} />);

      expect(screen.getByText("تست ویدیوی اختصاصی یک")).toBeInTheDocument();
      expect(screen.getByText("توضیحات ویدیوی تستی اول")).toBeInTheDocument();
      expect(screen.getByText("React 19")).toBeInTheDocument();
      expect(screen.getByText("۱۵ دقیقه")).toBeInTheDocument();

      const watchLink = screen.getByRole("link", {
        name: /تست ویدیوی اختصاصی یک|تماشا در یوتیوب/i,
      });
      expect(watchLink).toHaveAttribute("href", "https://youtube.com/watch?v=custom1");
    });

    it("renders nothing or empty state gracefully if featuredVideos is empty or undefined", () => {
      const emptyConfig = {
        ...siteConfig,
        featuredVideos: [],
      };

      const { container } = render(<FeaturedVideos config={emptyConfig} />);
      expect(container.firstChild).toBeNull();
    });
  });
});
