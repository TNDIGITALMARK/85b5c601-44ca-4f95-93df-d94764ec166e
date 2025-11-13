'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual authentication logic
      if (email && password) {
        router.push('/dashboard');
      } else {
        throw new Error('Please enter email and password');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--teal-accent))]">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl border border-[hsl(var(--border))] p-8 shadow-card">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-lg bg-[hsl(var(--teal-accent))] flex items-center justify-center text-white font-bold text-2xl">
              TM
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to access your booking system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@theramore.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/signup" className="text-sm text-[hsl(var(--primary))] hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
