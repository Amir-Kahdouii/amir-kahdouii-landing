<div align="center" dir="rtl">

# 🌟 هاب ارتباطی و ویترین شخصی متن‌باز (Personal Tech Showcase & Landing Hub)

**یک وب‌سایت لندینگ و ویترین مدرن، فوق‌العاده سریع و سبک برای توسعه‌دهندگان، مهندسان نرم‌افزار و تولیدکنندگان محتوا**

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat-square&logo=react)](https://react.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0-729B1B?style=flat-square&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[ویژگی‌ها](#-ویژگی‌های-کلیدی) • [راه‌اندازی سریع](#-راه‌اندازی-سریع) • [تنظیم متغیرها](#-شخصی‌سازی-از-طریق-متغیرهای-محیطی-env) • [استقرار خودکار](#-استقرار-روی-github-pages) • [تست‌ها](#-تست‌های-خودکار)

</div>

---

## 📖 درباره پروژه

این پروژه یک قالب وب‌سایت شخصی و هاب ارتباطی مدرن است که با هدف برطرف کردن نیاز توسعه‌دهندگان به داشتن یک وب‌سایت پرسرعت، زیبا و بدون هزینه سرور طراحی شده است. 

با این پروژه می‌توانید کانال یوتیوب، تلگرام، پروفایل لینکدین، گیت‌هاب و ویدیوهای برگزیده آموزشی خود را در قالب کارت‌های شیشه‌ای مات (**Glassmorphism**) با پشتیبانی بومی از زبان فارسی (**RTL**) و فونت زیبای **وزیرمتن** نمایش دهید.

> **ویژگی مهم:** برای شخصی‌سازی این سایت **نیازی به تغییر کدهای کامپوننت‌ها ندارید!** تمامی اطلاعات، نام، لینک‌ها، عکس‌ها و حتی ویدیوها از طریق فایل `.env.local` به عنوان متغیر محیطی تنظیم می‌شوند.

---

## ✨ ویژگی‌های کلیدی

- ⚡ **تکنولوژی‌های روز وب**: ساخته شده با **Next.js 16** (App Router)، **React 19** و **Tailwind CSS v4**.
- 🎨 **سیستم طراحی مدرن**: طراحی شده با کارت‌های شیشه‌ای مات و مینیمال (Frosted Glass / Glassmorphism) و میکروانیمیشن‌های روان.
- 🇮🇷 **پشتیبانی بومی راست‌چین (RTL)**: تایپوگرافی استاندارد فارسی با فونت **وزیرمتن (Vazirmatn)** از گوگل فونتز.
- ⚙️ **۱۰۰٪ شخصی‌سازی با متغیرهای محیطی**: بدون تغییر در کد، تمام محتوا از طریق `.env.local` کنترل می‌شود.
- 🚀 **خروجی کاملاً استاتیک (Static Export)**: قابل اجرا روی هر نوع هاست رایگان (GitHub Pages، Cloudflare Pages، Vercel، Netlify و سرورهای شخصی).
- 🤖 **ورک‌فلو آماده GitHub Actions**: انتشار و استقرار خودکار روی **GitHub Pages** با هر کامیت.
- 🔍 **سئوی بهینه و پیش‌نمایش اجتماعی**: تگ‌های کامل OpenGraph و Twitter Card بر اساس اطلاعات کانفیگ.
- 🧪 **تست‌های خودکار جامع**: شامل بیش از ۳۵ تست واحد و تست دودکش (Smoke Test) با Vitest و Testing Library.

---

## 🚀 راه‌اندازی سریع (Quick Start)

### ۱. کلون کردن مخزن
```bash
git clone https://github.com/amirkahdouii/amirkahdouii.git
cd amirkahdouii
```

### ۲. نصب وابستگی‌ها
```bash
npm install
```

### ۳. ایجاد فایل پیکربندی محیطی
فایل نمونه `.env.example` را به عنوان `.env.local` کپی کنید:
```bash
cp .env.example .env.local
```
سپس فایل `.env.local` را با اطلاعات و لینک‌های شخصی خود ویرایش نمایید.

### ۴. اجرای نسخه توسعه محلی
```bash
npm run dev
```
اکنون می‌توانید مرورگر خود را باز کرده و به آدرس [http://localhost:3000](http://localhost:3000) بروید.

---

## 🛠 شخصی‌سازی از طریق متغیرهای محیطی (.env)

تمام متغیرها با پیشوند `NEXT_PUBLIC_*` تعریف شده‌اند تا در بیلد استاتیک اعمال شوند. نمونه متغیرهای کلیدی:

| متغیر | توضیحات | مقدار نمونه |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_NAME` | نام و نام‌خانوادگی | `"امیر کاهدویی"` |
| `NEXT_PUBLIC_SITE_TITLE` | عنوان شغلی | `"توسعه‌دهنده نرم‌افزار"` |
| `NEXT_PUBLIC_SITE_HEADLINE` | شعار یا تیتر صفحه | `"خلق تجربیات مدرن وب..."` |
| `NEXT_PUBLIC_SITE_BIO` | بیوگرافی کوتاه | `"توسعه‌دهنده فول‌استک متمرکز بر..."` |
| `NEXT_PUBLIC_SITE_URL` | دامنه رسمی سایت | `"https://amirkahdouii.com"` |
| `NEXT_PUBLIC_AVATAR_SRC` | مسیر تصویر پرتره | `"/avatar.svg"` یا آدرس آنلاین |
| `NEXT_PUBLIC_YOUTUBE_URL` | لینک کانال یوتیوب | `"https://youtube.com/@channel"` |
| `NEXT_PUBLIC_TELEGRAM_URL` | لینک کانال یا گروه تلگرام | `"https://t.me/channel"` |
| `NEXT_PUBLIC_LINKEDIN_URL` | لینک صفحه لینکدین | `"https://linkedin.com/in/username"` |
| `NEXT_PUBLIC_GITHUB_URL` | لینک پروفایل گیت‌هاب | `"https://github.com/username"` |
| `NEXT_PUBLIC_FEATURED_VIDEOS_JSON` | لیست ویدیوهای برگزیده | آرایه JSON شامل عنوان، لینک و کاور |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ایمیل تماس فوتر | `"contact@example.com"` |

برای مشاهده لیست کامل متغیرها، فایل [`.env.example`](.env.example) را بررسی نمایید.

---

## 🔄 همگام‌سازی خودکار ویدیوهای یوتیوب (YouTube Auto-Sync)

این مخزن به یک اکشن خودکار در [`.github/workflows/sync-youtube.yml`](.github/workflows/sync-youtube.yml) مجهز است که به صورت زمان‌بندی‌شده (هر ۲۴ ساعت یک‌بار) و همچنین با اجرای دستی (**workflow_dispatch**)، آخرین ۲ ویدیوی لانگ کانال یوتیوب را دریافت و مشخصات آن را در [`data/featured-videos.json`](data/featured-videos.json) به‌روزرسانی می‌کند:
- **فیلتر هوشمند Shorts**: ویدیوهای زیر ۶۰ ثانیه نادیده گرفته می‌شوند و تنها آموزش‌های اصلی و بلند استخراج می‌شوند.
- **تبدیل هوشمند زمان**: طول ویدیو به دقیقه یا ساعت فارسی تبدیل می‌شود (مانند «۲۴ دقیقه»).
- **کاور باکیفیت و متادیتا**: تصویر تام‌نیل در بالاترین کیفیت، عنوان، لینک مستقیم یوتیوب و تگ اختصاصی ذخیره می‌شوند.
- **امنیت API Key**: کلید در سکرت‌های گیت‌هاب نگهداری شده و هرگز در فرانت‌اند یا ریپو ثبت نمی‌شود.
- **انتشار خودکار**: در صورت تغییر ویدیوها، اکشن تغییرات را کامیت و پوش کرده و این امر به صورت خودکار وب‌سایت شما را بازنشر می‌کند.

### نحوه فعال‌سازی در گیت‌هاب:
1. در مخزن گیت‌هاب خود به مسیر **Settings** > **Secrets and variables** > **Actions** بروید.
2. روی **New repository secret** کلیک کرده و نام آن را `YOUTUBE_API_KEY` قرار داده و کلید YouTube Data API v3 خود را وارد کنید.
3. (اختیاری) اگر هندل یوتیوب شما متفاوت از `@amirkahdouii` است، متغیر `YOUTUBE_CHANNEL_HANDLE` یا `YOUTUBE_CHANNEL_ID` را در تب **Variables** تنظیم کنید.
4. برای تست اجرای همگام‌سازی به تب **Actions** رفته، ورک‌فلو **Sync Latest YouTube Videos** را انتخاب کرده و دکمه **Run workflow** را بزنید.

اجرای دستی اسکریپت در محیط توسعه لوکال:
```bash
YOUTUBE_API_KEY="کلید_یوتیوب_شما" npm run sync:youtube
```

---

## 🌐 استقرار روی GitHub Pages

این پروژه به همراه یک ورک‌فلو آماده برای انتشار خودکار روی گیت‌هاب پیجز در مسیر [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) عرضه شده است.

### مراحل فعال‌سازی در مخزن گیت‌هاب خود:
1. پروژه را به مخزن گیت‌هاب خود پوش کنید (`git push origin main`).
2. در صفحه گیت‌هاب مخزن به مسیر **Settings** > **Pages** بروید.
3. در بخش **Build and deployment** گزینه **Source** را روی **GitHub Actions** تنظیم نمایید.
4. (اختیاری) اگر می‌خواهید متغیرهای اختصاصی در محیط GitHub Actions اعمال شوند، متغیرهای مورد نظر را در **Settings** > **Environments** > **github-pages** تعریف کنید.
5. با پوش کامیت جدید به برنچ `main`، ورک‌فلو به طور خودکار اجرا شده و سایت شما در آدرس `https://<username>.github.io/<repo>/` منتشر خواهد شد!

---

## 🧪 تست‌های خودکار

اجرای تمامی تست‌های واحد و تست‌های یکپارچگی:
```bash
npm test
```

اجرای بررسی کدهای پروژه با Linter:
```bash
npm run lint
```

بررسی تولید خروجی استاتیک پروژه:
```bash
npm run build
```

---

## 📜 ساختار فایل‌های پروژه

```text
├── app/                  # روت‌ها، لایه‌ها و متادیتای سئو (Next.js App Router)
├── components/           # کامپوننت‌های رابط کاربری (Hero, Socials, Videos, Footer)
├── data/                 # داده‌های ویدیوهای برگزیده (featured-videos.json)
├── lib/
│   ├── site-config.ts    # هسته بارگذاری متغیرهای محیطی و پیکربندی داده‌ها
│   ├── youtube.ts        # توابع دریافت داده از یوتیوب، فیلتر شورتز و فرمت زمان
│   └── utils.ts          # توابع کمکی استایل‌دهی Tailwind
├── scripts/              # اسکریپت‌های سیستمی و همگام‌سازی (sync-youtube-videos.mjs)
├── public/               # آیکون‌ها، تصاویر و کاورهای استاتیک
├── __tests__/            # مجموعه تست‌های خودکار Vitest
├── .github/workflows/    # ورک‌فلوهای انتشار GitHub Pages و همگام‌سازی یوتیوب
├── .env.example          # فایل نمونه متغیرهای محیطی با توضیحات کامل
└── README.md             # مستندات پروژه
```

---

## 📄 مجوز (License)

این پروژه تحت مجوز [MIT](LICENSE) به صورت متن‌باز منتشر شده است. استفاده، ویرایش و توسعه مجدد آن برای تمامی افراد آزاد است.
