import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { siteConfig } from "@/lib/site-config";
import { Footer } from "@/components/footer";

describe("Contact Footer (Issue 05)", () => {
  describe("Component Rendering & Visual Hierarchy", () => {
    it("renders the footer container with semantic role contentinfo", () => {
      render(<Footer config={siteConfig} />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    it("renders the copyright statement from site configuration", () => {
      render(<Footer config={siteConfig} />);

      expect(
        screen.getByText(siteConfig.footer!.copyright)
      ).toBeInTheDocument();
    });

    it("renders quick contact links with secure attributes", () => {
      render(<Footer config={siteConfig} />);

      const links = siteConfig.footer!.links;
      expect(links.length).toBeGreaterThan(0);

      links.forEach((link) => {
        const renderedLink = screen.getByRole("link", { name: new RegExp(link.label, "i") });
        expect(renderedLink).toBeInTheDocument();
        expect(renderedLink).toHaveAttribute("href", link.href);

        if (link.href.startsWith("http")) {
          expect(renderedLink).toHaveAttribute("target", "_blank");
          expect(renderedLink).toHaveAttribute("rel", "noopener noreferrer");
        }
      });
    });

    it("renders email contact link when contactEmail is provided", () => {
      render(<Footer config={siteConfig} />);

      if (siteConfig.footer?.contactEmail) {
        const emailLink = screen.getByRole("link", {
          name: /ایمیل|تماس|ارتباط|contact/i,
        });
        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute(
          "href",
          `mailto:${siteConfig.footer.contactEmail}`
        );
      }
    });
  });

  describe("Configuration Decoupling & Graceful Fallbacks", () => {
    it("renders custom footer links dynamically", () => {
      const customConfig = {
        ...siteConfig,
        footer: {
          copyright: "حقوق کپی‌رایت آزمایشی",
          contactEmail: "test@example.com",
          links: [
            { label: "پلتفرم آزمایشی", href: "https://example.com/custom" },
          ],
        },
      };

      render(<Footer config={customConfig} />);

      expect(screen.getByText("حقوق کپی‌رایت آزمایشی")).toBeInTheDocument();
      const customLink = screen.getByRole("link", { name: /پلتفرم آزمایشی/i });
      expect(customLink).toHaveAttribute("href", "https://example.com/custom");
      expect(customLink).toHaveAttribute("target", "_blank");
      expect(customLink).toHaveAttribute("rel", "noopener noreferrer");

      const emailLink = screen.getByRole("link", {
        name: /test@example.com|ایمیل/i,
      });
      expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
    });

    it("returns null or graceful fallback if footer is undefined", () => {
      const emptyConfig = {
        ...siteConfig,
        footer: undefined,
      };

      const { container } = render(<Footer config={emptyConfig} />);
      expect(container.firstChild).toBeNull();
    });
  });
});
