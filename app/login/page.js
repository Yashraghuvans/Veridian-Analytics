'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppHeader from '../components/AppHeader';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (username === 'farmer' && password === '12345') {
        router.push('/insurances');
      } else {
        setError('Invalid credentials. Demo: farmer / 12345');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0c0f12] flex flex-col">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="card-surface p-8 sm:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Sign in to manage your crop insurance
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-xs font-medium text-zinc-400 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c0f12] text-white placeholder-zinc-600 text-sm transition-colors focus:border-emerald-500/50 focus:ring-0"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-zinc-400 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c0f12] text-white placeholder-zinc-600 text-sm transition-colors focus:border-emerald-500/50 focus:ring-0"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-400/90 text-sm text-center bg-red-500/10 rounded-lg py-2 px-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-zinc-600">
              Demo access:{' '}
              <span className="text-zinc-400 font-mono">farmer</span> /{' '}
              <span className="text-zinc-400 font-mono">12345</span>
            </p>
          </div>

          <p className="mt-6 text-center">
            <Link href="/" className="btn-ghost text-sm">
              Back to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
