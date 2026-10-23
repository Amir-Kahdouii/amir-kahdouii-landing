#!/usr/bin/env node

/**
 * Sync Featured YouTube Videos Script
 *
 * Fetches the latest 2 long-form videos from the YouTube channel via YouTube Data API v3,
 * filters out Shorts (duration <= 60s), formats duration to Persian, and updates `data/featured-videos.json`.
 *
 * Requirements:
 * - YOUTUBE_API_KEY in environment variables
 * - Optional: YOUTUBE_CHANNEL_HANDLE (default: "@amirkahdouii") or YOUTUBE_CHANNEL_ID
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.resolve(__dirname, "../data/featured-videos.json");

// Persian digits converter
function toPersianDigits(input) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/[0-9]/g, (d) => persianDigits[parseInt(d, 10)]);
}

// ISO 8601 duration parser (PT1H15M30S -> seconds)
function parseIsoDuration(durationStr) {
  const match = (durationStr || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

// Natural Persian duration formatter
function formatPersianDuration(totalSeconds) {
  if (totalSeconds <= 0) return "۰ دقیقه";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0
      ? `${toPersianDigits(hours)} ساعت و ${toPersianDigits(minutes)} دقیقه`
      : `${toPersianDigits(hours)} ساعت`;
  }
  return `${toPersianDigits(Math.max(1, minutes))} دقیقه`;
}

// Shorts detector
function isYouTubeShort(totalSeconds, title = "", description = "") {
  if (totalSeconds > 0 && totalSeconds <= 60) return true;
  const pattern = /#shorts?\b/i;
  return pattern.test(title) || pattern.test(description);
}

// Clean description
function cleanDescription(raw, maxLength = 220) {
  if (!raw) return "";
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("http") && !l.startsWith("🔗"));
  const firstParagraph = lines.slice(0, 2).join(" ");
  if (!firstParagraph) return raw.slice(0, maxLength).trim();
  if (firstParagraph.length <= maxLength) return firstParagraph;
  return firstParagraph.slice(0, maxLength).trim() + "…";
}

async function main() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelHandle = (process.env.YOUTUBE_CHANNEL_HANDLE || "amirkahdouii").replace(/^@/, "");
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey) {
    console.error("❌ Error: YOUTUBE_API_KEY environment variable is missing.");
    console.error("Please configure YOUTUBE_API_KEY in your GitHub Secrets or environment.");
    process.exit(1);
  }

  console.log("▶ Starting YouTube sync...");
  console.log(`Target: ${channelId ? `Channel ID: ${channelId}` : `Handle: @${channelHandle}`}`);

  // 1. Resolve Uploads Playlist ID
  let uploadsPlaylistId = "";
  if (channelId) {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${encodeURIComponent(
      channelId
    )}&key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(channelUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch channel (status ${res.status}): ${await res.text()}`);
    }
    const data = await res.json();
    uploadsPlaylistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  } else {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(
      channelHandle
    )}&key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(channelUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch channel for @${channelHandle} (status ${res.status}): ${await res.text()}`);
    }
    const data = await res.json();
    uploadsPlaylistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  }

  if (!uploadsPlaylistId) {
    throw new Error("Could not find uploads playlist ID for this channel.");
  }

  console.log(`✓ Uploads playlist resolved: ${uploadsPlaylistId}`);

  // 2. Fetch up to 15 items from the uploads playlist (Cost: 1 unit)
  const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${encodeURIComponent(
    uploadsPlaylistId
  )}&maxResults=15&key=${encodeURIComponent(apiKey)}`;

  const playlistRes = await fetch(playlistUrl);
  if (!playlistRes.ok) {
    throw new Error(`Failed to fetch playlist items (status ${playlistRes.status}): ${await playlistRes.text()}`);
  }
  const playlistData = await playlistRes.json();
  const items = playlistData.items || [];
  const videoIds = items.map((i) => i.contentDetails?.videoId).filter(Boolean);

  if (videoIds.length === 0) {
    console.log("No videos found in uploads playlist.");
    return;
  }

  // 3. Fetch video details for duration & high-res thumbnails (Cost: 1 unit)
  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${encodeURIComponent(
    videoIds.join(",")
  )}&key=${encodeURIComponent(apiKey)}`;

  const videosRes = await fetch(videosUrl);
  if (!videosRes.ok) {
    throw new Error(`Failed to fetch video details (status ${videosRes.status}): ${await videosRes.text()}`);
  }
  const videosData = await videosRes.json();
  const rawVideos = videosData.items || [];

  // 4. Filter out Shorts, keep latest 2 long videos
  const longVideos = [];
  for (const video of rawVideos) {
    const durationStr = video.contentDetails?.duration || "";
    const totalSeconds = parseIsoDuration(durationStr);
    const title = video.snippet?.title || "";
    const description = video.snippet?.description || "";

    if (isYouTubeShort(totalSeconds, title, description)) {
      console.log(`- Skipping Short / short video: "${title}" (${totalSeconds}s)`);
      continue;
    }

    const thumbs = video.snippet?.thumbnails || {};
    const thumbnailUrl =
      thumbs.maxres?.url ||
      thumbs.standard?.url ||
      thumbs.high?.url ||
      thumbs.medium?.url ||
      thumbs.default?.url ||
      `/thumbnails/video-${longVideos.length + 1}.svg`;

    const tag = video.snippet?.tags?.[0] || "آموزش";

    longVideos.push({
      id: `video-${video.id}`,
      title: title.trim(),
      description: cleanDescription(description) || "آموزش تخصصی مهندسی نرم‌افزار در یوتیوب",
      youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnailUrl,
      duration: formatPersianDuration(totalSeconds),
      tag,
    });

    if (longVideos.length >= 2) break;
  }

  if (longVideos.length === 0) {
    console.log("⚠️ No long videos found to sync.");
    return;
  }

  console.log(`✓ Retrieved ${longVideos.length} latest long-form video(s):`);
  longVideos.forEach((v, idx) => {
    console.log(`  ${idx + 1}. [${v.duration}] ${v.title} (${v.youtubeUrl})`);
  });

  // 5. Compare with existing data in data/featured-videos.json
  let existingContent = "";
  try {
    existingContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
  } catch {
    // file doesn't exist yet
  }

  const newContent = JSON.stringify(longVideos, null, 2) + "\n";

  if (existingContent.trim() === newContent.trim()) {
    console.log("✨ Data is already up to date. No changes to write.");
    return;
  }

  await fs.writeFile(DATA_FILE_PATH, newContent, "utf-8");
  console.log(`💾 Successfully updated ${DATA_FILE_PATH}`);
}

main().catch((err) => {
  console.error("❌ Fatal sync error:", err.message);
  process.exit(1);
});
