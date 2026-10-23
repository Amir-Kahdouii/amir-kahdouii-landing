# 06: Automated YouTube Video Sync via GitHub Actions

**What to build:** An automated workflow running via GitHub Actions every 24 hours (or on manual dispatch) that uses the YouTube Data API v3 and GitHub Secrets (`YOUTUBE_API_KEY`) to retrieve the latest 2 long-form videos (excluding YouTube Shorts) from the channel, extracts their metadata (title, high-resolution thumbnail, duration formatted in Persian, description, watch URL, tag), and syncs them to `data/featured-videos.json`. If new videos are detected, the workflow automatically commits and pushes the updated data to the repository, triggering the static build and deployment on GitHub Pages.

**Blocked by:** 04 (Featured Video Highlights Showcase)

**Status:** resolved

- [x] Data layer created at `data/featured-videos.json` and integrated into `lib/site-config.ts`
- [x] Core YouTube sync module and duration parser created with ISO 8601 to Persian conversion
- [x] YouTube Shorts exclusion logic implemented (skipping videos <= 60 seconds)
- [x] Node.js sync script implemented in `scripts/sync-youtube-videos.mjs`
- [x] GitHub Actions workflow created at `.github/workflows/sync-youtube.yml` with secure secret handling
- [x] Unit tests for duration formatting, Shorts filtering, and video mapping in `__tests__/youtube-sync.test.ts`
- [x] Documentation updated in `README.md` with GitHub Secret setup instructions
