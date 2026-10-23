import { FeaturedVideoConfig } from "./site-config";

export interface ParsedDuration {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

export interface YouTubeSnippet {
  title: string;
  description: string;
  publishedAt?: string;
  thumbnails?: YouTubeThumbnails;
  tags?: string[];
  channelTitle?: string;
}

export interface YouTubeContentDetails {
  duration: string;
}

export interface YouTubeVideoItem {
  id: string;
  snippet: YouTubeSnippet;
  contentDetails: YouTubeContentDetails;
}

/**
 * Converts English digits (0-9) to Persian numerals (۰-۹).
 */
export function toPersianDigits(input: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

/**
 * Parses an ISO 8601 duration string (e.g. "PT1H15M30S", "PT24M", "PT45S") into duration components.
 */
export function parseIsoDuration(durationStr: string): ParsedDuration {
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) {
    return { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  }

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return { hours, minutes, seconds, totalSeconds };
}

/**
 * Formats a duration in seconds into a natural Persian description,
 * e.g., "۲۴ دقیقه" or "۱ ساعت و ۱۵ دقیقه".
 */
export function formatPersianDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) {
    return "۰ دقیقه";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const minutes = Math.round(remainingSeconds / 60);

  if (hours > 0) {
    const hoursPart = `${toPersianDigits(hours)} ساعت`;
    if (minutes > 0) {
      return `${hoursPart} و ${toPersianDigits(minutes)} دقیقه`;
    }
    return hoursPart;
  }

  const normalizedMinutes = Math.max(1, minutes);
  return `${toPersianDigits(normalizedMinutes)} دقیقه`;
}

/**
 * Checks whether a video is a YouTube Short (<= 60 seconds duration or tagged/titled with #shorts).
 */
export function isYouTubeShort(
  totalSeconds: number,
  title: string = "",
  description: string = ""
): boolean {
  if (totalSeconds > 0 && totalSeconds <= 60) {
    return true;
  }
  const shortsPattern = /#shorts?\b/i;
  return shortsPattern.test(title) || shortsPattern.test(description);
}

/**
 * Cleans up and truncates YouTube descriptions to fit featured card presentations.
 */
export function cleanDescription(rawDescription: string, maxLength: number = 220): string {
  if (!rawDescription) return "";

  // Split into non-empty lines and ignore URLs, timestamps, or social link lines at the top
  const lines = rawDescription
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("http") && !l.startsWith("🔗"));

  const firstParagraph = lines.slice(0, 2).join(" ");
  if (!firstParagraph) {
    return rawDescription.slice(0, maxLength).trim();
  }

  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }

  return firstParagraph.slice(0, maxLength).trim() + "…";
}

/**
 * Maps a YouTube API Video Item into a FeaturedVideoConfig object.
 */
export function mapYouTubeVideoToConfig(
  video: YouTubeVideoItem,
  indexFallback: number = 1
): FeaturedVideoConfig {
  const { totalSeconds } = parseIsoDuration(video.contentDetails?.duration || "");
  const durationText = formatPersianDuration(totalSeconds);

  const thumbs = video.snippet?.thumbnails || {};
  const thumbnailUrl =
    thumbs.maxres?.url ||
    thumbs.standard?.url ||
    thumbs.high?.url ||
    thumbs.medium?.url ||
    thumbs.default?.url ||
    `/thumbnails/video-${indexFallback}.svg`;

  const tag =
    video.snippet?.tags?.[0] ||
    "آموزش";

  return {
    id: `video-${video.id}`,
    title: video.snippet?.title?.trim() || "ویدیوی جدید یوتیوب",
    description: cleanDescription(video.snippet?.description || "آموزش تخصصی مهندسی نرم‌افزار در یوتیوب"),
    youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnailUrl,
    duration: durationText,
    tag,
  };
}

/**
 * Fetches the latest long-form YouTube videos using YouTube Data API v3.
 * Quota cost: ~3 units per execution.
 */
export async function fetchLatestLongYouTubeVideos({
  apiKey,
  channelId,
  channelHandle = "amirkahdouii",
  limit = 2,
}: {
  apiKey: string;
  channelId?: string;
  channelHandle?: string;
  limit?: number;
}): Promise<FeaturedVideoConfig[]> {
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is required to fetch YouTube videos.");
  }

  // 1. Resolve Uploads Playlist ID
  let uploadsPlaylistId = "";
  if (channelId) {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${encodeURIComponent(
      channelId
    )}&key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(channelUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch channel details: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    uploadsPlaylistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  } else {
    // Resolve via handle (strip leading @ if present)
    const handle = channelHandle.startsWith("@") ? channelHandle.slice(1) : channelHandle;
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(
      handle
    )}&key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(channelUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch channel details for handle @${handle}: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    uploadsPlaylistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  }

  if (!uploadsPlaylistId) {
    throw new Error("Could not find uploads playlist for the specified channel.");
  }

  // 2. Fetch recent items from uploads playlist (fetch up to 15 to ensure we get enough long videos after filtering Shorts)
  const playlistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${encodeURIComponent(
    uploadsPlaylistId
  )}&maxResults=15&key=${encodeURIComponent(apiKey)}`;

  const playlistRes = await fetch(playlistItemsUrl);
  if (!playlistRes.ok) {
    throw new Error(`Failed to fetch playlist items: ${playlistRes.status} ${playlistRes.statusText}`);
  }
  const playlistData = await playlistRes.json();
  const items = playlistData.items || [];
  if (items.length === 0) {
    return [];
  }

  const videoIds = items
    .map((item: { contentDetails?: { videoId?: string } }) => item.contentDetails?.videoId)
    .filter(Boolean);

  if (videoIds.length === 0) {
    return [];
  }

  // 3. Fetch video details to retrieve exact duration, tags, and high-res thumbnails
  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${encodeURIComponent(
    videoIds.join(",")
  )}&key=${encodeURIComponent(apiKey)}`;

  const videosRes = await fetch(videosUrl);
  if (!videosRes.ok) {
    throw new Error(`Failed to fetch video details: ${videosRes.status} ${videosRes.statusText}`);
  }
  const videosData = await videosRes.json();
  const rawVideos: YouTubeVideoItem[] = videosData.items || [];

  // 4. Filter out YouTube Shorts and keep only long videos
  const longVideos: YouTubeVideoItem[] = [];
  for (const video of rawVideos) {
    const { totalSeconds } = parseIsoDuration(video.contentDetails?.duration || "");
    const title = video.snippet?.title || "";
    const description = video.snippet?.description || "";

    if (!isYouTubeShort(totalSeconds, title, description)) {
      longVideos.push(video);
      if (longVideos.length >= limit) {
        break;
      }
    }
  }

  // 5. Map to FeaturedVideoConfig format
  return longVideos.map((video, idx) => mapYouTubeVideoToConfig(video, idx + 1));
}
