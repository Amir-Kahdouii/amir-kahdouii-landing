import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { siteConfig } from "@/lib/site-config";
import { HeroSection } from "@/components/hero-section";

describe("Typed Site Configuration & Hero Showcase (Issue 02)", () => {
  describe("Site Configuration Contract", () => {
    it("exports a valid and complete siteConfig schema", () => {
      expect(siteConfig).toBeDefined();
      expect(siteConfig.name).toBe("امیر کاهدویی");
      expect(siteConfig.title).toBeTruthy();
      expect(siteConfig.bio).toBeTruthy();
      expect(siteConfig.avatar).toBeDefined();
      expect(siteConfig.avatar.src).toBeTruthy();
      expect(siteConfig.avatar.alt).toContain("امیر کاهدویی");

      // Primary Call to Action buttons
      expect(siteConfig.primaryCta).toBeDefined();
      expect(siteConfig.primaryCta.label).toBeTruthy();
      expect(siteConfig.primaryCta.href).toMatch(/^https?:\/\//);

      expect(siteConfig.secondaryCta).toBeDefined();
      expect(siteConfig.secondaryCta.label).toBeTruthy();
      expect(siteConfig.secondaryCta.href).toMatch(/^https?:\/\//);

      // Social links
      expect(siteConfig.socials).toBeDefined();
      expect(siteConfig.socials.youtube).toBeTruthy();
      expect(siteConfig.socials.telegram).toBeTruthy();
    });
  });

  describe("HeroSection Component", () => {
    it("renders the creator personal identity (name, title, bio, avatar)", () => {
      render(<HeroSection config={siteConfig} />);

      // Name must be rendered as heading
      const heading = screen.getByRole("heading", { name: siteConfig.name, level: 1 });
      expect(heading).toBeInTheDocument();

      // Title/Headline and Bio must be visible
      expect(screen.getByText(siteConfig.title)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.bio)).toBeInTheDocument();

      // Avatar must be rendered
      const avatarImg = screen.getByAltText(siteConfig.avatar.alt);
      expect(avatarImg).toBeInTheDocument();
      expect(avatarImg).toHaveAttribute("src", siteConfig.avatar.src);
    });

    it("renders YouTube and Telegram call-to-action buttons with valid links and security attributes", () => {
      render(<HeroSection config={siteConfig} />);

      const youtubeLink = screen.getByRole("link", { name: new RegExp(siteConfig.primaryCta.label, "i") });
      expect(youtubeLink).toBeInTheDocument();
      expect(youtubeLink).toHaveAttribute("href", siteConfig.primaryCta.href);
      expect(youtubeLink).toHaveAttribute("target", "_blank");
      expect(youtubeLink).toHaveAttribute("rel", "noopener noreferrer");

      const telegramLink = screen.getByRole("link", { name: new RegExp(siteConfig.secondaryCta.label, "i") });
      expect(telegramLink).toBeInTheDocument();
      expect(telegramLink).toHaveAttribute("href", siteConfig.secondaryCta.href);
      expect(telegramLink).toHaveAttribute("target", "_blank");
      expect(telegramLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("immediately propagates config updates without modifying component code", () => {
      const customConfig = {
        ...siteConfig,
        name: "تست کاهدویی",
        title: "مهندس ارشد نرم‌افزار",
        bio: "توضیحات آزمایشی برای بررسی تفکیک‌پذیری پیکربندی",
        primaryCta: {
          label: "مشاهده کانال آزمایشی",
          href: "https://youtube.com/@custom-channel",
        },
        secondaryCta: {
          label: "ورود به گروه آزمایشی",
          href: "https://t.me/custom-group",
        },
      };

      render(<HeroSection config={customConfig} />);

      expect(screen.getByRole("heading", { name: "تست کاهدویی", level: 1 })).toBeInTheDocument();
      expect(screen.getByText("مهندس ارشد نرم‌افزار")).toBeInTheDocument();
      expect(screen.getByText("توضیحات آزمایشی برای بررسی تفکیک‌پذیری پیکربندی")).toBeInTheDocument();

      const customPrimary = screen.getByRole("link", { name: /مشاهده کانال آزمایشی/i });
      expect(customPrimary).toHaveAttribute("href", "https://youtube.com/@custom-channel");

      const customSecondary = screen.getByRole("link", { name: /ورود به گروه آزمایشی/i });
      expect(customSecondary).toHaveAttribute("href", "https://t.me/custom-group");
    });
  });
});
