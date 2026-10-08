import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { siteConfig } from "@/lib/site-config";
import { AboutSection } from "@/components/about-section";

describe("About Section (Issue 05)", () => {
  describe("Component Rendering & Narrative Content", () => {
    it("renders the about section with an accessible region and heading", () => {
      render(<AboutSection config={siteConfig} />);

      const section = screen.getByRole("region", {
        name: /درباره امیر کاهدویی|درباره من|پیشینه و بیوگرافی/i,
      });
      expect(section).toBeInTheDocument();

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(siteConfig.about!.heading);
    });

    it("renders all narrative paragraphs from configuration", () => {
      render(<AboutSection config={siteConfig} />);

      const paragraphs = siteConfig.about!.paragraphs;
      expect(paragraphs.length).toBeGreaterThan(0);

      paragraphs.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      });
    });

    it("renders focus area badges when provided in configuration", () => {
      const configWithPills = {
        ...siteConfig,
        about: {
          ...siteConfig.about!,
          focusAreas: ["معماری وب", "توسعه فول‌استک", "آموزش تخصصی"],
        },
      };

      render(<AboutSection config={configWithPills} />);

      expect(screen.getByText("معماری وب")).toBeInTheDocument();
      expect(screen.getByText("توسعه فول‌استک")).toBeInTheDocument();
      expect(screen.getByText("آموزش تخصصی")).toBeInTheDocument();
    });
  });

  describe("Configuration Decoupling & Graceful Fallbacks", () => {
    it("renders custom narrative without hardcoding", () => {
      const customConfig = {
        ...siteConfig,
        about: {
          heading: "درباره من - نسخه آزمایشی",
          paragraphs: [
            "پاراگراف آزمایشی اول درباره تجربیات من.",
            "پاراگراف آزمایشی دوم درباره چشم‌انداز آینده.",
          ],
        },
      };

      render(<AboutSection config={customConfig} />);

      expect(screen.getByText("درباره من - نسخه آزمایشی")).toBeInTheDocument();
      expect(
        screen.getByText("پاراگراف آزمایشی اول درباره تجربیات من.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("پاراگراف آزمایشی دوم درباره چشم‌انداز آینده.")
      ).toBeInTheDocument();
    });

    it("returns null gracefully if about is undefined or empty", () => {
      const emptyConfig = {
        ...siteConfig,
        about: undefined,
      };

      const { container } = render(<AboutSection config={emptyConfig} />);
      expect(container.firstChild).toBeNull();
    });
  });
});
