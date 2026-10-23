import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  toPersianDigits,
  parseIsoDuration,
  formatPersianDuration,
  isYouTubeShort,
  cleanDescription,
  mapYouTubeVideoToConfig,
  fetchLatestLongYouTubeVideos,
  YouTubeVideoItem,
} from "@/lib/youtube";

describe("YouTube Utility & Sync Module", () => {
  describe("toPersianDigits", () => {
    it("converts Western digits to Persian numerals correctly", () => {
      expect(toPersianDigits("0123456789")).toBe("۰۱۲۳۴۵۶۷۸۹");
      expect(toPersianDigits(42)).toBe("۴۲");
      expect(toPersianDigits("Next.js 16")).toBe("Next.js ۱۶");
    });
  });

  describe("parseIsoDuration", () => {
    it("parses hours, minutes, and seconds from ISO 8601 strings", () => {
      expect(parseIsoDuration("PT1H20M15S")).toEqual({
        hours: 1,
        minutes: 20,
        seconds: 15,
        totalSeconds: 4815,
      });

      expect(parseIsoDuration("PT24M")).toEqual({
        hours: 0,
        minutes: 24,
        seconds: 0,
        totalSeconds: 1440,
      });

      expect(parseIsoDuration("PT45S")).toEqual({
        hours: 0,
        minutes: 0,
        seconds: 45,
        totalSeconds: 45,
      });
    });

    it("returns zeros on invalid ISO string", () => {
      expect(parseIsoDuration("invalid")).toEqual({
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
      });
    });
  });

  describe("formatPersianDuration", () => {
    it("formats minutes in Persian string", () => {
      expect(formatPersianDuration(1440)).toBe("۲۴ دقیقه");
      expect(formatPersianDuration(90)).toBe("۲ دقیقه");
    });

    it("formats hours and minutes in Persian string", () => {
      expect(formatPersianDuration(4500)).toBe("۱ ساعت و ۱۵ دقیقه");
      expect(formatPersianDuration(7200)).toBe("۲ ساعت");
    });

    it("handles zero or negative duration gracefully", () => {
      expect(formatPersianDuration(0)).toBe("۰ دقیقه");
    });
  });

  describe("isYouTubeShort", () => {
    it("detects videos <= 60 seconds as Shorts", () => {
      expect(isYouTubeShort(58, "ویدیو سریع", "")).toBe(true);
      expect(isYouTubeShort(60, "آموزش در یک دقیقه", "")).toBe(true);
    });

    it("detects videos with #shorts in title or description", () => {
      expect(isYouTubeShort(120, "ترفند سریع CSS #Shorts", "")).toBe(true);
      expect(isYouTubeShort(120, "ترفند سریع CSS", "لینک به #shorts")).toBe(true);
    });

    it("identifies long-form videos correctly", () => {
      expect(isYouTubeShort(1200, "آموزش جامع معماری Next.js", "بررسی ساختار")).toBe(false);
    });
  });

  describe("cleanDescription", () => {
    it("cleans links and extracts first meaningful paragraph", () => {
      const raw = `
        در این ویدیو به بررسی عمیق معماری فرانت‌اند می‌پردازیم.
        همه کدهای نوشته شده در گیت‌هاب قرار دارند.
        https://github.com/example
        🔗 لینک تلگرام
      `;
      const cleaned = cleanDescription(raw);
      expect(cleaned).toContain("در این ویدیو به بررسی عمیق");
      expect(cleaned).not.toContain("https://github.com");
    });
  });

  describe("mapYouTubeVideoToConfig", () => {
    it("maps a raw YouTube item to FeaturedVideoConfig structure", () => {
      const mockItem: YouTubeVideoItem = {
        id: "xyz123",
        snippet: {
          title: "آموزش تست‌نویسی با Vitest در Next.js",
          description: "بررسی نوشتن تست‌های واحد و کامپوننت با کتابخانه تستینگ لایبرری",
          tags: ["Vitest", "Next.js"],
          thumbnails: {
            maxres: { url: "https://i.ytimg.com/vi/xyz123/maxresdefault.jpg" },
          },
        },
        contentDetails: {
          duration: "PT22M10S",
        },
      };

      const result = mapYouTubeVideoToConfig(mockItem);
      expect(result.id).toBe("video-xyz123");
      expect(result.title).toBe("آموزش تست‌نویسی با Vitest در Next.js");
      expect(result.youtubeUrl).toBe("https://www.youtube.com/watch?v=xyz123");
      expect(result.thumbnailUrl).toBe("https://i.ytimg.com/vi/xyz123/maxresdefault.jpg");
      expect(result.duration).toBe("۲۲ دقیقه");
      expect(result.tag).toBe("Vitest");
    });
  });

  describe("fetchLatestLongYouTubeVideos", () => {
    const originalFetch = globalThis.fetch;

    beforeEach(() => {
      vi.resetAllMocks();
    });

    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it("throws error if API key is not provided", async () => {
      await expect(fetchLatestLongYouTubeVideos({ apiKey: "" })).rejects.toThrow(
        /YOUTUBE_API_KEY is required/
      );
    });

    it("fetches, filters shorts, and returns top 2 long videos", async () => {
      const mockChannelResponse = {
        items: [
          {
            contentDetails: {
              relatedPlaylists: {
                uploads: "UU_test_channel_uploads",
              },
            },
          },
        ],
      };

      const mockPlaylistResponse = {
        items: [
          { contentDetails: { videoId: "short1" } },
          { contentDetails: { videoId: "long1" } },
          { contentDetails: { videoId: "long2" } },
          { contentDetails: { videoId: "long3" } },
        ],
      };

      const mockVideosResponse = {
        items: [
          {
            id: "short1",
            snippet: { title: "Short Video #Shorts", description: "Quick tip" },
            contentDetails: { duration: "PT45S" },
          },
          {
            id: "long1",
            snippet: {
              title: "ویدیوی لانگ اول",
              description: "توضیحات ویدیوی اول",
              tags: ["Next.js"],
              thumbnails: {
                high: { url: "https://example.com/thumb1.jpg" },
              },
            },
            contentDetails: { duration: "PT25M" },
          },
          {
            id: "long2",
            snippet: {
              title: "ویدیوی لانگ دوم",
              description: "توضیحات ویدیوی دوم",
              tags: ["TypeScript"],
              thumbnails: {
                high: { url: "https://example.com/thumb2.jpg" },
              },
            },
            contentDetails: { duration: "PT18M" },
          },
        ],
      };

      globalThis.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes("/channels")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockChannelResponse),
          });
        }
        if (url.includes("/playlistItems")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockPlaylistResponse),
          });
        }
        if (url.includes("/videos")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockVideosResponse),
          });
        }
        return Promise.reject(new Error("Unknown URL"));
      });

      const videos = await fetchLatestLongYouTubeVideos({
        apiKey: "fake_test_key",
        channelHandle: "amirkahdouii",
        limit: 2,
      });

      expect(videos).toHaveLength(2);
      expect(videos[0].id).toBe("video-long1");
      expect(videos[0].title).toBe("ویدیوی لانگ اول");
      expect(videos[0].duration).toBe("۲۵ دقیقه");
      expect(videos[1].id).toBe("video-long2");
      expect(videos[1].title).toBe("ویدیوی لانگ دوم");
      expect(videos[1].duration).toBe("۱۸ دقیقه");
    });
  });
});
