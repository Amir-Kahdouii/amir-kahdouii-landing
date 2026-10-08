import React from "react";
import { HeroSection } from "@/components/hero-section";
import { siteConfig } from "@/lib/site-config";

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

      {/* Main Page Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12 py-6">
        <HeroSection config={siteConfig} />
      </div>
    </main>
  );
}
