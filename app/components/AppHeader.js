'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AppHeader({ backHref = '/', backLabel = 'Home' }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0f12]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Veridian Analytics"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-semibold text-white text-sm sm:text-base">
            Veridian<span className="text-emerald-400">.</span>
          </span>
        </Link>
        <Link href={backHref} className="btn-ghost text-sm">
          ← {backLabel}
        </Link>
      </div>
    </header>
  );
}
