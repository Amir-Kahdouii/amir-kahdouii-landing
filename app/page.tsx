import React from "react";

export default function Home() {
  return (
    <main
      dir="rtl"
      lang="fa"
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-background text-foreground px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Ambient background light gradients for frosted glass aesthetics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand/10 to-accent/20 blur-3xl opacity-70"
      />

      {/* Base Page Shell Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-10 text-center">
        <header className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md shadow-sm">
            <span className="inline-block size-2 rounded-full bg-success animate-pulse" />
            <span>ویترین شخصی و ارتباطی</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            امیر کاهدویی
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            توسعه‌دهنده نرم‌افزار، تولیدکننده محتوای تخصصی و راهنمای مسیر مهندسی کامپیوتر
          </p>
        </header>

        {/* Foundation container for sections */}
        <section
          data-testid="shell-content-container"
          className="w-full rounded-2xl border border-border bg-card/75 p-6 backdrop-blur-md shadow-sm sm:p-8"
        >
          <p className="text-sm text-muted-foreground">
            پایه‌ی پروژه و ساختار راست‌چین (RTL) با موفقیت راه‌اندازی شد.
          </p>
        </section>
      </div>
    </main>
  );
}
