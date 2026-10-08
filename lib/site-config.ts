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
  statusBadge: {
    text: string;
    active: boolean;
  };
  avatar: {
    src: string;
    alt: string;
    fallbackText?: string;
  };
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
  };
  footer?: {
    copyright: string;
    links: Array<{ label: string; href: string }>;
  };
}

export const siteConfig: SiteConfig = {
  name: "امیر کاهدویی",
  title: "توسعه‌دهنده نرم‌افزار، تولیدکننده محتوا و مربی مهندسی",
  headline: "خلق تجربیات مدرن وب و آموزش عمیق مهندسی نرم‌افزار",
  bio: "توسعه‌دهنده فول‌استک متمرکز بر اکوسیستم وب، معماری نرم‌افزار، و انتقال دانش فنی از طریق ویدیوهای آموزشی در یوتیوب و کانال تلگرام.",
  statusBadge: {
    text: "فعال در تولید محتوای تخصصی و منتورشیپ",
    active: true,
  },
  avatar: {
    src: "/avatar.svg",
    alt: "تصویر پرتره امیر کاهدویی",
    fallbackText: "اک",
  },
  primaryCta: {
    label: "سابسکرایب در یوتیوب",
    href: "https://youtube.com/@amirkahdouii",
    icon: "youtube",
    description: "آموزش‌های ویدیویی تخصصی، کدنویسی زنده و تحلیل معماری",
  },
  secondaryCta: {
    label: "عضویت در کانال تلگرام",
    href: "https://t.me/amirkahdouii",
    icon: "send",
    description: "اطلاعیه‌ها، نکات روزانه، پرسش‌وپاسخ و کامیونیتی برنامه‌نویسان",
  },
  socials: {
    youtube: {
      url: "https://youtube.com/@amirkahdouii",
      handle: "@amirkahdouii",
      label: "یوتیوب (YouTube)",
      stat: "ویدیوهای جامع تخصصی",
      description: "ویدیوهای پروژه‌محور فرانت‌اند و بک‌اند، تحلیل معماری و لایو استریم‌ها",
    },
    telegram: {
      url: "https://t.me/amirkahdouii",
      handle: "@amirkahdouii",
      label: "تلگرام (Telegram)",
      stat: "کامیونیتی برنامه‌نویسان",
      description: "اشتراک‌گذاری منابع کاربردی، کدهای نمونه و اطلاعیه‌های جدید",
    },
    linkedin: {
      url: "https://linkedin.com/in/amirkahdouii",
      handle: "in/amirkahdouii",
      label: "لینکدین (LinkedIn)",
      stat: "ارتباطات حرفه‌ای",
      description: "شبکه‌سازی تخصصی، دستاوردهای شغلی و تجربیات مهندسی نرم‌افزار",
    },
    github: {
      url: "https://github.com/amirkahdouii",
      handle: "amirkahdouii",
      label: "گیت‌هاب (GitHub)",
      stat: "کدهای متن‌باز",
      description: "مخازن پروژه‌های آموزشی، کتابخانه‌ها و سورس‌کدهای عمومی",
    },
  },
  featuredVideos: [
    {
      id: "video-1",
      title: "معماری اصولی وب‌اپلیکیشن‌ها با Next.js و TypeScript",
      description: "بررسی الگوهای معماری تمیز، مدیریت ساختار پوشه‌ها و بهترین تجارب توسعه مقیاس‌پذیر.",
      youtubeUrl: "https://youtube.com/@amirkahdouii",
      thumbnailUrl: "/thumbnails/video-1.svg",
      duration: "۲۴ دقیقه",
      tag: "Next.js",
    },
    {
      id: "video-2",
      title: "طراحی رابط‌های کاربری مدرن راست‌چین با Tailwind CSS",
      description: "راهنمای جامع پیاده‌سازی سیستم دیزاین فارسی، فونت‌های بهینه و انیمیشن‌های روان.",
      youtubeUrl: "https://youtube.com/@amirkahdouii",
      thumbnailUrl: "/thumbnails/video-2.svg",
      duration: "۱۸ دقیقه",
      tag: "Tailwind CSS",
    },
  ],
  about: {
    heading: "درباره امیر کاهدویی",
    paragraphs: [
      "بیش از چند سال است که در زمینه مهندسی نرم‌افزار، توسعه وب و طراحی سیستم‌های مدرن فعالیت می‌کنم.",
      "هدف من از راه‌اندازی این هاب، ایجاد پلی ارتباطی میان توسعه‌دهندگان، اشتراک‌گذاری تجربیات واقعی پروژه‌ها و ارتقای استاندارد فنی جامعه مهندسی نرم‌افزار فارسی‌زبان است.",
    ],
  },
  footer: {
    copyright: "تمامی حقوق برای امیر کاهدویی محفوظ است.",
    links: [
      { label: "یوتیوب", href: "https://youtube.com/@amirkahdouii" },
      { label: "تلگرام", href: "https://t.me/amirkahdouii" },
      { label: "لینکدین", href: "https://linkedin.com/in/amirkahdouii" },
    ],
  },
};
