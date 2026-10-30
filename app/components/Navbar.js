'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '#problem-section', label: 'Problem' },
  { href: '#solution-section', label: 'Solution' },
  { href: '#how-it-works-section', label: 'How it works' },
  { href: '#dashboard-preview', label: 'Dashboard' },
  { href: '#benefits-section', label: 'Benefits' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-[#0c0f12]/85 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[4.25rem] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={handleNavClick}>
          <Image
            src="/logo.png"
            alt="Veridian Analytics"
            width={36}
            height={36}
            className="rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-semibold text-white text-sm sm:text-base tracking-tight">
            Veridian<span className="text-emerald-400">.</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="btn-secondary text-sm py-2.5 px-5">
            Sign in
          </Link>
          <Link href="/insurances" className="btn-primary text-sm py-2.5 px-5">
            View plans
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-zinc-300 hover:text-white transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 top-16 bg-[#0c0f12]/98 backdrop-blur-xl transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col p-6 gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="block py-3 text-lg text-zinc-300 hover:text-emerald-400 transition-colors border-b border-white/[0.06]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-6 flex flex-col gap-3">
            <Link href="/login" className="btn-secondary w-full text-center" onClick={handleNavClick}>
              Sign in
            </Link>
            <Link href="/insurances" className="btn-primary w-full text-center" onClick={handleNavClick}>
              View plans
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
