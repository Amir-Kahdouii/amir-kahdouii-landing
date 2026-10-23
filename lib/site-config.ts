import featuredVideosData from "@/data/featured-videos.json";

export interface CtaAction {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

export interface SocialChannelConfig {
  url: string;
  handle: string;
  label: string;
  stat?: string;
  description?: string;
}

export interface FeaturedVideoConfig {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: string;
  tag: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  headline: string;
  bio: string;
  siteUrl: string;
  avatar: {
    src: string;
    alt: string;
    fallbackText?: string;
  };
  ogImage: string;
  primaryCta: CtaAction;
  secondaryCta: CtaAction;
  socials: {
    youtube: SocialChannelConfig;
    telegram: SocialChannelConfig;
    linkedin: SocialChannelConfig;
    github?: SocialChannelConfig;
  };
  featuredVideos?: FeaturedVideoConfig[];
  about?: {
    heading: string;
    paragraphs: string[];
    focusAreas?: string[];
  };
  footer?: {
    copyright: string;
    contactEmail?: string;
    links: Array<{ label: string; href: string; icon?: string }>;
  };
}

function parseJsonEnv<T>(value: string | undefined, fallback: T): T {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return fallback;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

const rawFeaturedVideos = (featuredVideosData || []) as FeaturedVideoConfig[];
const loadedFeaturedVideos: FeaturedVideoConfig[] | undefined =
  Array.isArray(rawFeaturedVideos) && rawFeaturedVideos.length > 0
    ? rawFeaturedVideos
    : undefined;

const defaultAboutParagraphs: string[] = [
  "بیش از چند سال است که در زمینه مهندسی نرم‌افزار، توسعه وب و طراحی سیستم‌های مدرن فعالیت می‌کنم.",
  "هدف من از راه‌اندازی این هاب، ایجاد پلی ارتباطی میان توسعه‌دهندگان، اشتراک‌گذاری تجربیات واقعی پروژه‌ها و ارتقای استاندارد فنی جامعه مهندسی نرم‌افزار فارسی‌زبان است.",
];

const defaultFocusAreas: string[] = [
  "معماری وب مدرن",
  "توسعه فول‌استک",
  "تولید محتوای آموزشی",
  "کامیونیتی مهندسی",
];

export function getSiteConfig(): SiteConfig {
  const name = process.env.NEXT_PUBLIC_SITE_NAME || "امیر کاهدویی";
  const title =
    process.env.NEXT_PUBLIC_SITE_TITLE ||
    "توسعه‌دهنده نرم‌افزار، تولیدکننده محتوا و مربی مهندسی";
  const headline =
    process.env.NEXT_PUBLIC_SITE_HEADLINE ||
    "خلق تجربیات مدرن وب و آموزش عمیق مهندسی نرم‌افزار";
  const bio =
    process.env.NEXT_PUBLIC_SITE_BIO ||
    "توسعه‌دهنده فول‌استک متمرکز بر اکوسیستم وب، معماری نرم‌افزار، و انتقال دانش فنی از طریق ویدیوهای آموزشی در یوتیوب و کانال تلگرام.";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amirkahdouii.com";
  const avatarSrc = process.env.NEXT_PUBLIC_AVATAR_SRC || "/avatar.svg";
  const avatarAlt =
    process.env.NEXT_PUBLIC_AVATAR_ALT || `تصویر پرتره ${name}`;
  const avatarFallback =
    process.env.NEXT_PUBLIC_AVATAR_FALLBACK ||
    name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") ||
    "اک";

  const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE || "/og-image.svg";

  const youtubeUrl =
    process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@amirkahdouii";
  const youtubeHandle =
    process.env.NEXT_PUBLIC_YOUTUBE_HANDLE || "@amirkahdouii";
  const youtubeLabel =
    process.env.NEXT_PUBLIC_YOUTUBE_LABEL || "یوتیوب (YouTube)";
  const youtubeStat =
    process.env.NEXT_PUBLIC_YOUTUBE_STAT || "ویدیوهای جامع تخصصی";
  const youtubeDesc =
    process.env.NEXT_PUBLIC_YOUTUBE_DESC ||
    "ویدیوهای پروژه‌محور فرانت‌اند و بک‌اند، تحلیل معماری و لایو استریم‌ها";

  const telegramUrl =
    process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/amirkahdouii";
  const telegramHandle =
    process.env.NEXT_PUBLIC_TELEGRAM_HANDLE || "@amirkahdouii";
  const telegramLabel =
    process.env.NEXT_PUBLIC_TELEGRAM_LABEL || "تلگرام (Telegram)";
  const telegramStat =
    process.env.NEXT_PUBLIC_TELEGRAM_STAT || "کامیونیتی برنامه‌نویسان";
  const telegramDesc =
    process.env.NEXT_PUBLIC_TELEGRAM_DESC ||
    "اشتراک‌گذاری منابع کاربردی، کدهای نمونه و اطلاعیه‌های جدید";

  const linkedinUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://linkedin.com/in/amirkahdouii";
  const linkedinHandle =
    process.env.NEXT_PUBLIC_LINKEDIN_HANDLE || "in/amirkahdouii";
  const linkedinLabel =
    process.env.NEXT_PUBLIC_LINKEDIN_LABEL || "لینکدین (LinkedIn)";
  const linkedinStat =
    process.env.NEXT_PUBLIC_LINKEDIN_STAT || "ارتباطات حرفه‌ای";
  const linkedinDesc =
    process.env.NEXT_PUBLIC_LINKEDIN_DESC ||
    "شبکه‌سازی تخصصی، دستاوردهای شغلی و تجربیات مهندسی نرم‌افزار";

  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/amirkahdouii";
  const githubHandle =
    process.env.NEXT_PUBLIC_GITHUB_HANDLE || "amirkahdouii";
  const githubLabel =
    process.env.NEXT_PUBLIC_GITHUB_LABEL || "گیت‌هاب (GitHub)";
  const githubStat =
    process.env.NEXT_PUBLIC_GITHUB_STAT || "کدهای متن‌باز";
  const githubDesc =
    process.env.NEXT_PUBLIC_GITHUB_DESC ||
    "مخازن پروژه‌های آموزشی، کتابخانه‌ها و سورس‌کدهای عمومی";

  const primaryCta: CtaAction = {
    label:
      process.env.NEXT_PUBLIC_PRIMARY_CTA_LABEL || "سابسکرایب در یوتیوب",
    href: process.env.NEXT_PUBLIC_PRIMARY_CTA_URL || youtubeUrl,
    icon: process.env.NEXT_PUBLIC_PRIMARY_CTA_ICON || "youtube",
    description:
      process.env.NEXT_PUBLIC_PRIMARY_CTA_DESC ||
      "آموزش‌های ویدیویی تخصصی، کدنویسی زنده و تحلیل معماری",
  };

  const secondaryCta: CtaAction = {
    label:
      process.env.NEXT_PUBLIC_SECONDARY_CTA_LABEL || "عضویت در کانال تلگرام",
    href: process.env.NEXT_PUBLIC_SECONDARY_CTA_URL || telegramUrl,
    icon: process.env.NEXT_PUBLIC_SECONDARY_CTA_ICON || "send",
    description:
      process.env.NEXT_PUBLIC_SECONDARY_CTA_DESC ||
      "اطلاعیه‌ها، نکات روزانه، پرسش‌وپاسخ و کامیونیتی برنامه‌نویسان",
  };

  const featuredVideos = loadedFeaturedVideos;

  const aboutHeading =
    process.env.NEXT_PUBLIC_ABOUT_HEADING || `درباره ${name}`;
  const aboutParagraphs = parseJsonEnv<string[]>(
    process.env.NEXT_PUBLIC_ABOUT_PARAGRAPHS_JSON,
    defaultAboutParagraphs
  );
  const aboutFocusAreas = parseJsonEnv<string[]>(
    process.env.NEXT_PUBLIC_ABOUT_FOCUS_AREAS_JSON,
    defaultFocusAreas
  );

  const copyright =
    process.env.NEXT_PUBLIC_FOOTER_COPYRIGHT ||
    `تمامی حقوق برای ${name} محفوظ است.`;
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@amirkahdouii.com";

  return {
    name,
    title,
    headline,
    bio,
    siteUrl,
    avatar: {
      src: avatarSrc,
      alt: avatarAlt,
      fallbackText: avatarFallback,
    },
    ogImage,
    primaryCta,
    secondaryCta,
    socials: {
      youtube: {
        url: youtubeUrl,
        handle: youtubeHandle,
        label: youtubeLabel,
        stat: youtubeStat,
        description: youtubeDesc,
      },
      telegram: {
        url: telegramUrl,
        handle: telegramHandle,
        label: telegramLabel,
        stat: telegramStat,
        description: telegramDesc,
      },
      linkedin: {
        url: linkedinUrl,
        handle: linkedinHandle,
        label: linkedinLabel,
        stat: linkedinStat,
        description: linkedinDesc,
      },
      github: {
        url: githubUrl,
        handle: githubHandle,
        label: githubLabel,
        stat: githubStat,
        description: githubDesc,
      },
    },
    featuredVideos,
    about: {
      heading: aboutHeading,
      paragraphs: aboutParagraphs,
      focusAreas: aboutFocusAreas,
    },
    footer: {
      copyright,
      contactEmail,
      links: [
        { label: "یوتیوب", href: youtubeUrl, icon: "youtube" },
        { label: "تلگرام", href: telegramUrl, icon: "telegram" },
        { label: "لینکدین", href: linkedinUrl, icon: "linkedin" },
        { label: "گیت‌هاب", href: githubUrl, icon: "github" },
      ],
    },
  };
}

export const siteConfig: SiteConfig = getSiteConfig();
