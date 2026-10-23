#!/usr/bin/env node

/**
 * Generate OpenGraph Image (SVG and PNG) from Environment Variables
 *
 * Reads values from .env.local, .env, or system environment variables
 * and generates a pixel-perfect, modern OpenGraph banner at `public/og-image.svg` and `public/og-image.png`.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_SVG_PATH = path.join(ROOT_DIR, "public/og-image.svg");
const OUTPUT_PNG_PATH = path.join(ROOT_DIR, "public/og-image.png");

// Simple .env parser to avoid extra runtime dependencies
async function loadEnvConfig() {
  const envFiles = [".env.local", ".env", ".env.example"];
  const parsedEnv = {};

  for (const filename of envFiles) {
    try {
      const fullPath = path.join(ROOT_DIR, filename);
      const content = await fs.readFile(fullPath, "utf-8");
      const lines = content.split("\n");

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
        if (match) {
          const key = match[1];
          let val = match[2].trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (parsedEnv[key] === undefined) {
            parsedEnv[key] = val;
          }
        }
      }
    } catch {
      // file may not exist, skip
    }
  }

  return { ...parsedEnv, ...process.env };
}

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function extractDomain(urlStr, fallback = "amirkahdouii.com") {
  try {
    const url = new URL(urlStr);
    return url.hostname;
  } catch {
    return fallback;
  }
}

async function loadAvatarBase64(avatarSrc) {
  if (!avatarSrc) return null;
  try {
    let filePath = avatarSrc;
    if (avatarSrc.startsWith("/")) {
      filePath = path.join(ROOT_DIR, "public", avatarSrc.slice(1));
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "image/svg+xml";
    const data = await fs.readFile(filePath);
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export function buildOgSvg(config, avatarDataUri = null) {
  const name = escapeXml(config.NEXT_PUBLIC_SITE_NAME || "امیر مهدی کهدویی");
  const title = escapeXml(config.NEXT_PUBLIC_SITE_TITLE || "Software Engineer");
  const headline = escapeXml(
    config.NEXT_PUBLIC_SITE_HEADLINE || "مهندس نرم افزار و تولید کننده محتوا"
  );
  const bio = escapeXml(
    config.NEXT_PUBLIC_SITE_BIO || "توسعه نرم افزار و تولید محتوای تخصصی"
  );
  const siteUrl = config.NEXT_PUBLIC_SITE_URL || "https://amirkahdouii.com";
  const domain = escapeXml(extractDomain(siteUrl));
  const initials = escapeXml(
    (name.split(" ").slice(0, 2).map((w) => w[0]).join("") || "AK").toUpperCase()
  );

  const youtubeHandle = escapeXml(config.NEXT_PUBLIC_YOUTUBE_HANDLE || "@amirkahdouii");
  const telegramHandle = escapeXml(config.NEXT_PUBLIC_TELEGRAM_HANDLE || "@amirkahdouii");
  const githubHandle = escapeXml(config.NEXT_PUBLIC_GITHUB_HANDLE || "amirkahdouii");

  const avatarMarkup = avatarDataUri
    ? `
      <!-- Avatar with Rounded Clipping -->
      <g>
        <defs>
          <clipPath id="avatarClip">
            <rect x="940" y="175" width="135" height="135" rx="30" />
          </clipPath>
        </defs>
        <rect x="940" y="175" width="135" height="135" rx="30" fill="url(#avatarGlow)" />
        <image href="${avatarDataUri}" x="940" y="175" width="135" height="135" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice" />
        <rect x="940" y="175" width="135" height="135" rx="30" fill="none" stroke="url(#borderGlow)" stroke-width="2.5" />
      </g>`
    : `
      <!-- Monogram Fallback Avatar -->
      <g>
        <rect x="940" y="175" width="135" height="135" rx="30" fill="url(#avatarGlow)" stroke="url(#borderGlow)" stroke-width="2.5" />
        <text x="1007" y="258" font-size="44" font-weight="800" fill="#FFFFFF" text-anchor="middle">${initials}</text>
      </g>`;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080C14" />
      <stop offset="50%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#090D18" />
    </linearGradient>

    <!-- Glowing Orbs -->
    <radialGradient id="glowIndigo" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.38" />
      <stop offset="100%" stop-color="#4F46E5" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowCyan" cx="15%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowViolet" cx="45%" cy="25%" r="45%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0" />
    </radialGradient>

    <!-- Glass Card Gradient & Borders -->
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.82" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.90" />
    </linearGradient>
    <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.65" />
      <stop offset="50%" stop-color="#818CF8" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#C084FC" stop-opacity="0.2" />
    </linearGradient>

    <!-- Pill Backgrounds -->
    <linearGradient id="pillBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.85" />
    </linearGradient>
    <linearGradient id="avatarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>

    <!-- Drop Shadows -->
    <filter id="shadowCard" x="-10%" y="-10%" width="120%" height="125%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="24" stdDeviation="32" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Base Canvas -->
  <rect width="1200" height="630" fill="url(#bgDark)" />

  <!-- Ambient Light Orbs -->
  <circle cx="1020" cy="110" r="450" fill="url(#glowIndigo)" />
  <circle cx="160" cy="530" r="420" fill="url(#glowCyan)" />
  <circle cx="500" cy="200" r="350" fill="url(#glowViolet)" />

  <!-- Background Tech Grid Lines -->
  <g opacity="0.04" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105" />
    <line x1="0" y1="210" x2="1200" y2="210" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="525" x2="1200" y2="525" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Central Glassmorphism Card Frame -->
  <rect x="60" y="50" width="1080" height="530" rx="30" fill="url(#cardBg)" stroke="url(#borderGlow)" stroke-width="1.8" filter="url(#shadowCard)" />

  <!-- Top Accent Neon Bar -->
  <rect x="60" y="50" width="1080" height="4" rx="2" fill="url(#avatarGlow)" />

  <!-- ================= TOP BAR ================= -->
  <!-- Top-Left: Website Domain Pill -->
  <g transform="translate(110, 95)">
    <rect x="0" y="0" width="220" height="40" rx="20" fill="#151F32" stroke="#334155" stroke-width="1.2" />
    <circle cx="22" cy="20" r="5" fill="#38BDF8" />
    <text x="38" y="26" font-family="'Vazirmatn', -apple-system, sans-serif" font-size="16" font-weight="600" fill="#CBD5E1">${domain}</text>
  </g>

  <!-- Top-Right: Official Hub Status Badge -->
  <g transform="translate(840, 95)">
    <rect x="0" y="0" width="235" height="40" rx="20" fill="#151F32" stroke="#334155" stroke-width="1.2" />
    <circle cx="210" cy="20" r="5" fill="#10B981" />
    <circle cx="210" cy="20" r="10" fill="#10B981" opacity="0.25" />
    <text x="190" y="26" font-family="'Vazirmatn', -apple-system, sans-serif" font-size="15" font-weight="600" fill="#94A3B8" text-anchor="start" direction="rtl">هاب رسمی و ویترین کار</text>
  </g>

  <!-- ================= PROFILE / IDENTITY SECTION ================= -->
  <!-- User Avatar (Right) -->
  ${avatarMarkup}

  <!-- Creator Name & Title (Left of Avatar, Flows to the left) -->
  <g transform="translate(905, 230)">
    <text x="0" y="0" font-family="'Vazirmatn', -apple-system, sans-serif" font-size="46" font-weight="800" fill="#F8FAFC" text-anchor="start" direction="rtl">${name}</text>
    <text x="0" y="44" font-family="'Vazirmatn', -apple-system, sans-serif" font-size="22" font-weight="600" fill="#38BDF8" text-anchor="start" direction="rtl">${title}</text>
  </g>

  <!-- Headline & Bio Block (Right-aligned, Flows to the left) -->
  <g transform="translate(1075, 350)">
    <text x="0" y="0" font-family="'Vazirmatn', -apple-system, sans-serif" font-size="24" font-weight="600" fill="#E2E8F0" text-anchor="start" direction="rtl">${headline}</text>
    <text x="0" y="44" font-family="'Vazirmatn', -apple-system, sans-serif" font-size="18" font-weight="400" fill="#94A3B8" text-anchor="start" direction="rtl">${bio}</text>
  </g>

  <!-- ================= BOTTOM SOCIAL PILLS ================= -->
  <!-- Pill 1: YouTube (Right) -->
  <g transform="translate(775, 470)">
    <rect x="0" y="0" width="300" height="54" rx="16" fill="url(#pillBg)" stroke="#334155" stroke-width="1.2" />
    <!-- YouTube Red Icon -->
    <rect x="16" y="13" width="38" height="28" rx="8" fill="#DC2626" />
    <polygon points="31,21 31,33 42,27" fill="#FFFFFF" />
    <!-- Label (LTR) -->
    <text x="64" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#F8FAFC">YouTube</text>
    <!-- Handle (Right Aligned) -->
    <text x="282" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500" fill="#94A3B8" text-anchor="end">${youtubeHandle}</text>
  </g>

  <!-- Pill 2: Telegram (Center) -->
  <g transform="translate(442, 470)">
    <rect x="0" y="0" width="300" height="54" rx="16" fill="url(#pillBg)" stroke="#334155" stroke-width="1.2" />
    <!-- Telegram Blue Icon -->
    <circle cx="32" cy="27" r="16" fill="#0284C7" />
    <path d="M24 26.5 L39 20 L35 34 L30 29.5 L27 32 L27 28.5 Z" fill="#FFFFFF" />
    <!-- Label (LTR) -->
    <text x="60" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#F8FAFC">Telegram</text>
    <!-- Handle (Right Aligned) -->
    <text x="282" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500" fill="#94A3B8" text-anchor="end">${telegramHandle}</text>
  </g>

  <!-- Pill 3: GitHub (Left) -->
  <g transform="translate(110, 470)">
    <rect x="0" y="0" width="300" height="54" rx="16" fill="url(#pillBg)" stroke="#334155" stroke-width="1.2" />
    <!-- GitHub Dark Icon -->
    <circle cx="32" cy="27" r="16" fill="#0F172A" stroke="#475569" stroke-width="1" />
    <text x="32" y="32" font-family="monospace" font-size="14" font-weight="700" fill="#38BDF8" text-anchor="middle">&lt;/&gt;</text>
    <!-- Label (LTR) -->
    <text x="60" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#F8FAFC">GitHub</text>
    <!-- Handle (Right Aligned) -->
    <text x="282" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500" fill="#94A3B8" text-anchor="end">${githubHandle}</text>
  </g>
</svg>
`;
}

async function main() {
  try {
    const envConfig = await loadEnvConfig();
    const avatarDataUri = await loadAvatarBase64(
      envConfig.NEXT_PUBLIC_AVATAR_SRC || "/amirkahdouii.png"
    );
    const svgContent = buildOgSvg(envConfig, avatarDataUri);

    await fs.writeFile(OUTPUT_SVG_PATH, svgContent, "utf-8");
    console.log(`[og-image] Successfully generated: ${OUTPUT_SVG_PATH}`);

    // Generate PNG via sharp if available
    try {
      const sharpModule = await import("sharp");
      const sharp = sharpModule.default || sharpModule;
      await sharp(Buffer.from(svgContent)).png().toFile(OUTPUT_PNG_PATH);
      console.log(`[og-image] Successfully generated PNG: ${OUTPUT_PNG_PATH}`);
    } catch {
      console.log("[og-image] sharp not available, skipped PNG export.");
    }
  } catch (err) {
    console.error("[og-image] Error generating og-image:", err);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
