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
  title: "امیر کاهدویی | ویترین شخصی و هاب ارتباطی",
  description:
    "ویترین رسمی فعالیت‌های تولید محتوا، کانال یوتیوب، کامیونیتی تلگرام و لینکدین امیر کاهدویی.",
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
