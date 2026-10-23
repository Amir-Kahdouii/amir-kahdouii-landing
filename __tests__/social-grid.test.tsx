import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { siteConfig } from "@/lib/site-config";
import { SocialGrid } from "@/components/social-grid";

describe("Frosted Glass Social Channels Grid (Issue 03)", () => {
  describe("Component Rendering & Visual Hierarchy", () => {
    it("renders the social section with an accessible heading and description", () => {
      render(<SocialGrid config={siteConfig} />);

      const section = screen.getByRole("region", { name: /شبکه‌های اجتماعی|ارتباط و شبکه‌ها/i });
      expect(section).toBeInTheDocument();

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBeTruthy();
    });

    it("renders individual cards for configured social channels (YouTube, Telegram, LinkedIn, GitHub)", () => {
      render(<SocialGrid config={siteConfig} />);

      // YouTube card
      expect(screen.getByText(siteConfig.socials.youtube.label)).toBeInTheDocument();
      expect(screen.getAllByText(siteConfig.socials.youtube.handle).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(siteConfig.socials.youtube.description!)).toBeInTheDocument();

      // Telegram card
      expect(screen.getByText(siteConfig.socials.telegram.label)).toBeInTheDocument();
      expect(screen.getAllByText(siteConfig.socials.telegram.handle).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(siteConfig.socials.telegram.description!)).toBeInTheDocument();

      // LinkedIn card
      expect(screen.getByText(siteConfig.socials.linkedin.label)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.socials.linkedin.handle)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.socials.linkedin.description!)).toBeInTheDocument();

      // GitHub card
      expect(screen.getByText(siteConfig.socials.github!.label)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.socials.github!.handle)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.socials.github!.description!)).toBeInTheDocument();
    });

    it("renders platform stat or community tags when provided", () => {
      render(<SocialGrid config={siteConfig} />);

      expect(screen.getByText(siteConfig.socials.youtube.stat!)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.socials.telegram.stat!)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.socials.linkedin.stat!)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.socials.github!.stat!)).toBeInTheDocument();
    });

    it("renders secure external links with noopener, noreferrer, and target=_blank for all channels", () => {
      render(<SocialGrid config={siteConfig} />);

      const youtubeLinks = screen.getAllByRole("link").filter(
        (link) => link.getAttribute("href") === siteConfig.socials.youtube.url
      );
      expect(youtubeLinks.length).toBeGreaterThanOrEqual(1);
      expect(youtubeLinks[0]).toHaveAttribute("target", "_blank");
      expect(youtubeLinks[0]).toHaveAttribute("rel", "noopener noreferrer");

      const telegramLinks = screen.getAllByRole("link").filter(
        (link) => link.getAttribute("href") === siteConfig.socials.telegram.url
      );
      expect(telegramLinks.length).toBeGreaterThanOrEqual(1);
      expect(telegramLinks[0]).toHaveAttribute("target", "_blank");
      expect(telegramLinks[0]).toHaveAttribute("rel", "noopener noreferrer");

      const linkedinLinks = screen.getAllByRole("link").filter(
        (link) => link.getAttribute("href") === siteConfig.socials.linkedin.url
      );
      expect(linkedinLinks.length).toBeGreaterThanOrEqual(1);
      expect(linkedinLinks[0]).toHaveAttribute("target", "_blank");
      expect(linkedinLinks[0]).toHaveAttribute("rel", "noopener noreferrer");

      const githubLinks = screen.getAllByRole("link").filter(
        (link) => link.getAttribute("href") === siteConfig.socials.github!.url
      );
      expect(githubLinks.length).toBeGreaterThanOrEqual(1);
      expect(githubLinks[0]).toHaveAttribute("target", "_blank");
      expect(githubLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("hides GitHub card when showGithub is set to false", () => {
      render(<SocialGrid config={siteConfig} showGithub={false} />);
      expect(screen.queryByText(siteConfig.socials.github!.label)).not.toBeInTheDocument();
    });

    it("renders a 2-column responsive grid layout for 4 social channels", () => {
      const { container } = render(<SocialGrid config={siteConfig} />);
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass("sm:grid-cols-2");
      expect(grid).not.toHaveClass("lg:grid-cols-4");
    });
  });

  describe("Configuration Decoupling", () => {
    it("dynamically reflects custom configuration changes without code modification", () => {
      const customConfig = {
        ...siteConfig,
        socials: {
          youtube: {
            url: "https://youtube.com/@custom-test",
            handle: "@custom-test",
            label: "کانال تست یوتیوب",
            stat: "۱۰۰۰ دنبال‌کننده",
            description: "توضیحات کانال آزمایشی",
          },
          telegram: {
            url: "https://t.me/custom_tg",
            handle: "@custom_tg",
            label: "کانال تست تلگرام",
            stat: "۵۰۰ عضو",
            description: "توضیحات کانال تلگرام آزمایشی",
          },
          linkedin: {
            url: "https://linkedin.com/in/custom-in",
            handle: "in/custom-in",
            label: "پروفایل تست لینکدین",
            stat: "ارتباطات فعال",
            description: "توضیحات پروفایل لینکدین آزمایشی",
          },
        },
      };

      render(<SocialGrid config={customConfig} />);

      expect(screen.getByText("کانال تست یوتیوب")).toBeInTheDocument();
      expect(screen.getByText("@custom-test")).toBeInTheDocument();
      expect(screen.getByText("توضیحات کانال آزمایشی")).toBeInTheDocument();

      const customLink = screen.getByRole("link", { name: /کانال تست یوتیوب|مشاهده کانال یوتیوب|دنبال کردن یوتیوب/i });
      expect(customLink).toHaveAttribute("href", "https://youtube.com/@custom-test");
    });
  });
});
