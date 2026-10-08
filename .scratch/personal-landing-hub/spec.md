Status: ready-for-agent

# Personal Showcase & Landing Hub (V1)

## Problem Statement

As a tech creator actively producing content on YouTube, Telegram, and LinkedIn, I lack a single, high-polish personal web presence ("ویترین کار"). Visitors discovering me across social platforms have no centralized hub that clearly presents my brand identity, directs them to my key community channels, and highlights my top technical videos. Attempting to build a full-scale blog with database backends and administrative dashboards introduces excessive operational overhead, server costs, and maintenance burdens that distract from shipping a fast, beautiful landing page immediately.

## Solution

A fast, lightweight, and aesthetically refined personal landing page hub built with Next.js, Tailwind CSS, and VibeFarsi RTL components. The interface follows a minimalist light aesthetic ("تم روشن مینیمال") featuring subtle frosted-glass cards (Glassmorphism), modern Persian typography with Vazirmatn, and native RTL alignment. Content is decoupled from the user interface and managed via a centralized configuration object, eliminating database requirements while enabling instant static rendering, zero hosting costs, and straightforward updates.

## User Stories

1. As a visitor arriving from YouTube, I want to see a clear personal headline and bio, so that I immediately understand the creator's background and core expertise.
2. As a visitor arriving from LinkedIn, I want direct access to the creator's technical YouTube channel and Telegram community, so that I can follow their ongoing technical output.
3. As a mobile visitor, I want a fully responsive layout with native RTL alignment, so that navigation and reading feel natural on handheld devices.
4. As a visitor, I want to see distinct glassmorphic cards for YouTube, Telegram, and LinkedIn, so that I can choose which platform to connect with.
5. As a visitor, I want to see a curated showcase of top technical videos with thumbnails and titles, so that I can sample the creator's highest-value content without leaving the page.
6. As a visitor clicking a featured video or social channel card, I want external links to open securely in a new tab, so that my position on the showcase page is preserved.
7. As a visitor, I want fast page load speeds and smooth micro-interactions on hover, so that the site feels premium and delightful.
8. As a content creator, I want to update my social links, bio text, and featured video roster in a single structured configuration file, so that I can publish updates in seconds without modifying UI components.
9. As a search engine or social media crawler (Telegram, LinkedIn preview bot), I want rich OpenGraph metadata and Persian title/description tags, so that links shared in messaging apps render attractive preview cards.
10. As a visitor, I want to read a concise "About Me" summary and find contact options in the footer, so that I can reach out for professional inquiries or collaborations.

## Implementation Decisions

- **Framework & Rendering Strategy**: Built with Next.js (App Router) targeting static export for maximum speed, security, and effortless deployment to static hosts or CDNs.
- **RTL & Design System Integration**: Utilizes VibeFarsi RTL components and design tokens with Tailwind CSS, ensuring proper Persian typography spacing, Jalali-friendly foundations, and native right-to-left layout flow.
- **Visual Aesthetic & Styling**: Clean light theme with soft neutral backgrounds, layered frosted-glass surfaces (`backdrop-blur` with subtle translucent borders), and micro-interactions on cards and buttons.
- **Typography**: Vazirmatn font family loaded as the primary sans-serif typeface, optimized for Persian legibility.
- **Content Decoupling**: Centralized site configuration model containing personal metadata, social profile URLs, and featured media items.
- **Component Architecture**:
  - `HeroSection`: Avatar/portrait display, title/headline, bio description, and primary CTA buttons.
  - `SocialGrid`: Card grid highlighting primary platforms (YouTube, Telegram, LinkedIn) with channel descriptions and follower/community action links.
  - `FeaturedHighlights`: Grid displaying curated technical videos with poster previews, duration/topic badges, titles, and direct watch links.
  - `AboutAndFooter`: Concise professional background summary and contact links.

## Testing Decisions

- **Testing Principles**: Tests focus strictly on external behavior and user-visible outcomes rather than implementation details or CSS styling minutiae.
- **Configuration Contract Validation**: Validate that the configuration data structure complies with the site schema and includes all required fields (valid URLs, non-empty labels, image paths).
- **Core View Smoke & Accessibility**: Verify that the landing page renders without runtime errors, that all four primary sections exist in the DOM, that social links have valid `href` attributes with `rel="noopener noreferrer"`, and that images have descriptive `alt` attributes.
- **Build & Static Export Smoke**: Verify that the production build and static export complete successfully without missing asset links or hydration mismatches.

## Out of Scope

- Dynamic database integration (PostgreSQL, SQLite, Supabase).
- Administrative dashboard, CMS login, or authentication systems.
- Dynamic blog engine, Markdown post reader, or commenting systems (planned for V2).
- Server-side contact form processing or email dispatch backends.

## Further Notes

- The project configuration is ready to incorporate additional VibeFarsi RTL blocks as needed.
- In V2, the structure easily scales to include a `/blog` directory with MDX content or headless CMS integration without breaking the landing hub.
