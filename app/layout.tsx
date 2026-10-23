import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
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
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | ویترین شخصی و هاب ارتباطی`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  keywords: [
    siteConfig.name,
    siteConfig.title,
    "توسعه‌دهنده نرم‌افزار",
    "مهندسی نرم‌افزار",
    "یوتیوب فارسی",
    "تلگرام برنامه‌نویسان",
    "آموزش Next.js",
    "توسعه وب",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} | ویترین شخصی`,
    title: `${siteConfig.name} | ویترین شخصی و هاب ارتباطی`,
    description: siteConfig.bio,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - هاب رسمی ارتباطی و آموزشی`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ویترین شخصی و هاب ارتباطی`,
    description: siteConfig.bio,
    creator: siteConfig.socials.youtube.handle || `@${siteConfig.name}`,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
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
