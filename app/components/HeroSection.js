'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const DashboardPlayer = dynamic(() => import('./remotion/DashboardPlayer'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0c0f12]">
      <span className="h-10 w-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const scrollToNextSection = () => {
    const el = document.getElementById('problem-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[100dvh] w-full flex items-center overflow-hidden"
    >
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f12]/95 via-[#0c0f12]/90 to-[#0c0f12]" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute top-1/3 right-0 w-[min(100%,560px)] h-[420px] rounded-full bg-emerald-500/15 blur-[100px] hero-glow pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left order-1">
            <p
              className="animate-fade-up section-label opacity-0"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              Climate-resilient agriculture
            </p>
            <h1
              className="animate-fade-up text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-semibold tracking-tight text-white leading-[1.1] opacity-0"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Smart insurance built on{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
                trust &amp; data
              </span>
            </h1>
            <p
              className="animate-fade-up mt-5 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0"
              style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
            >
              Veridian Analytics empowers farmers with AI-driven crop protection—live risk,
              satellite verification, and payouts you can track in real time.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 opacity-0"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              <button type="button" onClick={scrollToNextSection} className="btn-primary">
                Explore the platform
              </button>
              <Link href="/login" className="btn-secondary text-center">
                Get started
              </Link>
            </div>
            <p
              className="animate-fade-in mt-8 text-xs sm:text-sm text-zinc-500 opacity-0 hidden sm:block"
              style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
            >
              Satellite verification · Dynamic premiums · Automated payouts
            </p>
          </div>

          <div
            className="order-2 w-full animate-fade-up opacity-0"
            style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}
          >
            <div className="relative mx-auto lg:mx-0 max-w-xl lg:max-w-none">
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/10 to-transparent blur-md pointer-events-none"
                aria-hidden
              />
              <div className="relative rounded-2xl border border-white/10 bg-[#0c0f12]/80 backdrop-blur-sm shadow-2xl shadow-black/50 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[#080a0c]/90">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[10px] sm:text-xs text-zinc-500 font-mono truncate">
                    app.veridian.farm/dashboard
                  </span>
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-emerald-500/90 font-medium">
                    Live demo
                  </span>
                </div>
                <div className="relative aspect-video w-full min-h-[200px] sm:min-h-[240px] bg-[#0c0f12]">
                  <DashboardPlayer />
                </div>
              </div>
              <p className="mt-3 text-center lg:text-left text-[11px] text-zinc-600">
                Remotion preview · KPIs, NDVI chart, claims &amp; satellite map
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToNextSection}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-zinc-500 hover:text-emerald-400 transition-colors animate-bounce hidden lg:block"
        aria-label="Scroll to content"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}
