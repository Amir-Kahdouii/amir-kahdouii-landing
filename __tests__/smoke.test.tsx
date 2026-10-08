import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import { metadata } from "../app/layout";

describe("Comprehensive Landing Page Hub Smoke Test (Issue 05)", () => {
  describe("Complete Landing Page Component Integration", () => {
    it("renders the base Persian RTL page container without errors", () => {
      render(<Home />);

      const mainContainer = screen.getByRole("main");
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveAttribute("dir", "rtl");
      expect(mainContainer).toHaveAttribute("lang", "fa");
    });

    it("renders all four primary showcase sections and footer in the DOM", () => {
      render(<Home />);

      // 1. Hero Section
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading).toHaveTextContent("امیر کاهدویی");

      // 2. Social Channels Grid Section
      const socialSection = screen.getByRole("region", {
        name: /شبکه‌های تخصصی و ارتباطی|کانال‌ها و شبکه‌های اجتماعی/i,
      });
      expect(socialSection).toBeInTheDocument();

      // 3. Featured Video Highlights Showcase Section
      const videoSection = screen.getByRole("region", {
        name: /ویدیوهای برگزیده آموزشی/i,
      });
      expect(videoSection).toBeInTheDocument();

      // 4. About Section
      const aboutSection = screen.getByRole("region", {
        name: /درباره من/i,
      });
      expect(aboutSection).toBeInTheDocument();
      const aboutHeading = screen.getByRole("heading", {
        name: /درباره امیر کاهدویی/i,
      });
      expect(aboutHeading).toBeInTheDocument();

      // 5. Contact & Copyright Footer
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
      expect(
        screen.getByText(/تمامی حقوق برای امیر کاهدویی محفوظ است/i)
      ).toBeInTheDocument();
    });

    it("ensures all rendered images have descriptive alt attributes", () => {
      render(<Home />);

      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);

      images.forEach((img) => {
        // SVG or img tag
        if (img.tagName.toLowerCase() === "img") {
          expect(img).toHaveAttribute("alt");
          expect(img.getAttribute("alt")?.trim()).not.toBe("");
        }
      });
    });

    it("ensures all external outbound links have rel='noopener noreferrer' and target='_blank'", () => {
      render(<Home />);

      const links = screen.getAllByRole("link");
      const externalLinks = links.filter((link) => {
        const href = link.getAttribute("href") || "";
        return href.startsWith("http://") || href.startsWith("https://");
      });

      expect(externalLinks.length).toBeGreaterThan(0);
      externalLinks.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  describe("OpenGraph and Twitter Card Metadata Verification", () => {
    it("exports complete root layout metadata with OpenGraph and Twitter card configuration", () => {
      expect(metadata).toBeDefined();

      // Title & Description
      const titleObj = metadata.title as { default: string; template: string };
      expect(titleObj?.default || metadata.title).toContain("امیر کاهدویی");
      expect(metadata.description).toBeTruthy();

      // OpenGraph
      const og = metadata.openGraph as Record<string, unknown>;
      expect(og).toBeDefined();
      expect(og.type).toBe("website");
      expect(og.locale).toBe("fa_IR");
      expect(og.siteName).toBeTruthy();
      expect(og.title).toBeTruthy();
      expect(og.description).toBeTruthy();
      expect(Array.isArray(og.images)).toBe(true);

      const ogImages = og.images as Array<{ url: string; alt?: string }>;
      expect(ogImages.length).toBeGreaterThan(0);
      expect(ogImages[0].url).toBe("/og-image.svg");

      // Twitter Card
      const twitter = metadata.twitter as Record<string, unknown>;
      expect(twitter).toBeDefined();
      expect(twitter.card).toBe("summary_large_image");
      expect(twitter.creator).toBe("@amirkahdouii");
      expect(twitter.title).toBeTruthy();
      expect(twitter.description).toBeTruthy();
      expect(Array.isArray(twitter.images)).toBe(true);
    });
  });
});
