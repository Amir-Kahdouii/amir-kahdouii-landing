import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getSiteConfig } from "@/lib/site-config";
import featuredVideosData from "@/data/featured-videos.json";

describe("Site Configuration Environment Variables Integration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("loads fallback default configuration when environment variables are not set", () => {
    delete process.env.NEXT_PUBLIC_SITE_NAME;
    delete process.env.NEXT_PUBLIC_SITE_TITLE;
    delete process.env.NEXT_PUBLIC_SITE_BIO;
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const config = getSiteConfig();
    expect(config.name).toBe("امیر کاهدویی");
    expect(config.title).toBe("توسعه‌دهنده نرم‌افزار، تولیدکننده محتوا و مربی مهندسی");
    expect(config.avatar.src).toBe("/avatar.svg");
    expect(config.socials.youtube.url).toBe("https://youtube.com/@amirkahdouii");
    expect(config.socials.telegram.url).toBe("https://t.me/amirkahdouii");
    expect(config.socials.linkedin.url).toBe("https://linkedin.com/in/amirkahdouii");
    expect(config.socials.github?.url).toBe("https://github.com/amirkahdouii");
    expect(config.footer?.contactEmail).toBe("contact@amirkahdouii.com");
  });

  it("overrides personal identity and titles when env variables are provided", () => {
    process.env.NEXT_PUBLIC_SITE_NAME = "سارا رضایی";
    process.env.NEXT_PUBLIC_SITE_TITLE = "طراح ارشد رابط کاربری";
    process.env.NEXT_PUBLIC_SITE_HEADLINE = "خلق تجربیات کاربری بی‌نظیر";
    process.env.NEXT_PUBLIC_SITE_BIO = "طراح محصول و متخصص UI/UX با بیش از ۸ سال تجربه";
    process.env.NEXT_PUBLIC_SITE_URL = "https://sararezaei.dev";
    process.env.NEXT_PUBLIC_AVATAR_SRC = "https://images.example.com/sara.jpg";
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "hello@sararezaei.dev";

    const config = getSiteConfig();
    expect(config.name).toBe("سارا رضایی");
    expect(config.title).toBe("طراح ارشد رابط کاربری");
    expect(config.headline).toBe("خلق تجربیات کاربری بی‌نظیر");
    expect(config.bio).toBe("طراح محصول و متخصص UI/UX با بیش از ۸ سال تجربه");
    expect(config.siteUrl).toBe("https://sararezaei.dev");
    expect(config.avatar.src).toBe("https://images.example.com/sara.jpg");
    expect(config.avatar.alt).toContain("سارا رضایی");
    expect(config.footer?.contactEmail).toBe("hello@sararezaei.dev");
    expect(config.footer?.copyright).toContain("سارا رضایی");
  });

  it("overrides social channel URLs and handles via env variables", () => {
    process.env.NEXT_PUBLIC_YOUTUBE_URL = "https://youtube.com/@customchannel";
    process.env.NEXT_PUBLIC_YOUTUBE_HANDLE = "@customchannel";
    process.env.NEXT_PUBLIC_TELEGRAM_URL = "https://t.me/customtelegram";
    process.env.NEXT_PUBLIC_TELEGRAM_HANDLE = "@customtelegram";
    process.env.NEXT_PUBLIC_LINKEDIN_URL = "https://linkedin.com/in/customlinkedin";
    process.env.NEXT_PUBLIC_LINKEDIN_HANDLE = "in/customlinkedin";
    process.env.NEXT_PUBLIC_GITHUB_URL = "https://github.com/customgithub";
    process.env.NEXT_PUBLIC_GITHUB_HANDLE = "customgithub";

    const config = getSiteConfig();
    expect(config.socials.youtube.url).toBe("https://youtube.com/@customchannel");
    expect(config.socials.youtube.handle).toBe("@customchannel");
    expect(config.socials.telegram.url).toBe("https://t.me/customtelegram");
    expect(config.socials.telegram.handle).toBe("@customtelegram");
    expect(config.socials.linkedin.url).toBe("https://linkedin.com/in/customlinkedin");
    expect(config.socials.linkedin.handle).toBe("in/customlinkedin");
    expect(config.socials.github?.url).toBe("https://github.com/customgithub");
    expect(config.socials.github?.handle).toBe("customgithub");
  });

  it("loads featured videos directly from data/featured-videos.json", () => {
    const config = getSiteConfig();
    expect(config.featuredVideos).toBeDefined();
    expect(config.featuredVideos?.length).toBeGreaterThan(0);
    expect(config.featuredVideos).toEqual(featuredVideosData);
  });

  it("does not read featured videos from NEXT_PUBLIC_FEATURED_VIDEOS_JSON", () => {
    process.env.NEXT_PUBLIC_FEATURED_VIDEOS_JSON = JSON.stringify([
      {
        id: "env-video",
        title: "Env Video Title",
        description: "Env description",
        youtubeUrl: "https://youtube.com/watch?v=env",
        thumbnailUrl: "/thumb.jpg",
        duration: "۱۰ دقیقه",
        tag: "Test",
      },
    ]);

    const config = getSiteConfig();
    // Must still load from data/featured-videos.json, not env
    expect(config.featuredVideos).toEqual(featuredVideosData);
    expect(config.featuredVideos?.[0].id).not.toBe("env-video");
  });
});
