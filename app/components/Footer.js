import Link from 'next/link';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080a0c] py-12 md:py-16">
      <div className="section-container px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-zinc-500 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Building resilience for the hands that feed us.
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10">
          <Link
            href="https://github.com/your-username/agrisure"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
          >
            <FaGithub className="h-4 w-4" aria-hidden />
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
          >
            <FaLinkedin className="h-4 w-4" aria-hidden />
            LinkedIn
          </Link>
          <Link
            href="mailto:info@veridian-analytics.com"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
          >
            <FaEnvelope className="h-4 w-4" aria-hidden />
            Contact
          </Link>
        </div>
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Veridian Analytics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
