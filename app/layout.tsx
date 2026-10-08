import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://amirkahdouii.com"),
  title: {
    default: "امیر کاهدویی | ویترین شخصی و هاب ارتباطی",
    template: "%s | امیر کاهدویی",
  },
  description:
    "ویترین رسمی فعالیت‌های تولید محتوا، کانال یوتیوب، کامیونیتی تلگرام و لینکدین امیر کاهدویی.",
  keywords: [
    "امیر کاهدویی",
    "توسعه‌دهنده نرم‌افزار",
    "مهندسی نرم‌افزار",
    "یوتیوب فارسی",
    "تلگرام برنامه‌نویسان",
    "آموزش Next.js",
    "توسعه وب",
  ],
  authors: [{ name: "امیر کاهدویی", url: "https://amirkahdouii.com" }],
  creator: "امیر کاهدویی",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://amirkahdouii.com",
    siteName: "امیر کاهدویی | ویترین شخصی",
    title: "امیر کاهدویی | ویترین شخصی و هاب ارتباطی",
    description:
      "ویترین رسمی فعالیت‌های تولید محتوا، کانال یوتیوب، کامیونیتی تلگرام و لینکدین امیر کاهدویی.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "امیر کاهدویی - هاب رسمی ارتباطی و آموزشی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "امیر کاهدویی | ویترین شخصی و هاب ارتباطی",
    description:
      "ویترین رسمی فعالیت‌های تولید محتوا، کانال یوتیوب، کامیونیتی تلگرام و لینکدین امیر کاهدویی.",
    creator: "@amirkahdouii",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://amirkahdouii.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-brand/20 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
