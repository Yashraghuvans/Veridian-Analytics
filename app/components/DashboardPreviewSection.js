'use client';

import dynamic from 'next/dynamic';
import AnimatedSection from './AnimatedSection';

const DashboardPlayer = dynamic(() => import('./remotion/DashboardPlayer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video w-full rounded-2xl border border-white/[0.08] bg-[#141920] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-zinc-500">
        <span className="h-8 w-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
        <span className="text-sm">Loading dashboard preview…</span>
      </div>
    </div>
  ),
});

const highlights = [
  {
    title: 'Live risk metrics',
    detail: 'KPI cards animate from satellite and weather feeds—acres covered, risk score, and open claims.',
  },
  {
    title: 'NDVI yield curve',
    detail: 'Forecast line draws in real time as the season progresses, compared to historical baselines.',
  },
  {
    title: 'Automated claims',
    detail: 'Watch a claim move from detection to payout with satellite verification and instant alerts.',
  },
  {
    title: 'Peril breakdown',
    detail: 'Drought, flood, and pest exposure bars update as hyperlocal models refresh every pass.',
  },
];

export default function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="section-padding bg-[#0a0d10] overflow-hidden">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12 md:mb-14">
          <span className="section-label">Product preview</span>
          <h2 className="section-title">Your farm command center</h2>
          <p className="section-subtitle mx-auto">
            A Remotion-powered demo of the Veridian dashboard—metrics, maps, and claims in one
            responsive view farmers and insurers can trust.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <AnimatedSection className="lg:col-span-7 xl:col-span-8" delayClass="stagger-1">
            <div className="relative group">
              <div
                className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-sky-500/10 opacity-80 blur-sm pointer-events-none"
                aria-hidden
              />
              <div className="relative aspect-video w-full rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl shadow-black/40 bg-[#0c0f12]">
                <DashboardPlayer />
              </div>
              <p className="mt-3 text-center text-xs text-zinc-600">
                15s loop · 1280×720 · Built with Remotion Player
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-5 xl:col-span-4 space-y-4" delayClass="stagger-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="card-surface p-5 md:p-6 border-l-2 border-l-emerald-500/40"
              >
                <h3 className="text-base font-medium text-white mb-1.5">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}

            <div className="card-surface p-5 md:p-6 mt-2">
              <h3 className="text-sm font-medium text-zinc-300 mb-3">What the animation shows</h3>
              <ul className="space-y-2 text-xs text-zinc-500">
                <li className="flex gap-2">
                  <span className="text-emerald-500/80">●</span>
                  Sidebar navigation cycles through Overview → Reports
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500/80">●</span>
                  Satellite scan line and plot health pulses on Field 7A
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500/80">●</span>
                  Toast notification when a drought payout is initiated
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500/80">●</span>
                  Activity feed streams weather and premium events
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
