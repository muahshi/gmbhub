'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GMBhubLogo } from '@/components/ui/gmbhub-logo';
import {
  GoogleOAuthButton,
  GooglePartnerSeal,
  GoogleColorStripe,
  GoogleColorDots,
} from '@/components/ui/google-brand';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setError('');
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message ?? 'Google sign-in failed');
      setGoogleLoading(false);
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError('');
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message ?? 'Login failed');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden px-4">
      {/* Ambient bg */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(66,133,244,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(52,168,83,0.06) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Back to home */}
      <Link href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to GMBhub
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#0A0A0C] border border-[#1A1A1E] rounded-3xl overflow-hidden shadow-2xl">
          {/* Google 4-color stripe at top */}
          <GoogleColorStripe />

          <div className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <GMBhubLogo size="lg" animated />
              <p className="text-white/40 text-sm mt-2">Welcome back</p>
            </div>

            {/* ─── Google Sign In (PRIMARY) ─────────────────────────── */}
            <div className="mb-6">
              <GoogleOAuthButton
                onClick={handleGoogleSignIn}
                loading={googleLoading}
                label="Continue with Google"
              />

              {/* Trust micro-text */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                <Shield className="w-3 h-3 text-[#34A853]" />
                <p className="text-[10px] text-white/30 text-center">
                  Secured via Google OAuth 2.0 — we never see your Google password
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#1A1A1E]" />
              <span className="text-xs text-white/25 font-mono">or sign in with email</span>
              <div className="flex-1 h-px bg-[#1A1A1E]" />
            </div>

            {/* Email / Password form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5 font-medium">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full px-4 py-3 bg-[#111113] border border-[#1A1A1E] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#4285F4]/50 transition-colors font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-white/40 font-medium">Password</label>
                  <Link href="/forgot-password" className="text-xs text-[#4285F4] hover:text-[#3367D6] transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 bg-[#111113] border border-[#1A1A1E] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#4285F4]/50 transition-colors font-mono"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error state */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 px-3 py-2.5 bg-[#EA4335]/10 border border-[#EA4335]/30 rounded-xl text-[#EA4335] text-xs"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 7a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={!email || !password || loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: '#4285F4', boxShadow: '0 0 20px rgba(66,133,244,0.3)' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            {/* Sign up link */}
            <p className="text-center text-xs text-white/35 mt-6">
              New to GMBhub?{' '}
              <Link href="/signup" className="text-[#4285F4] hover:text-[#3367D6] font-semibold transition-colors">
                Create free account
              </Link>
            </p>
          </div>

          {/* Bottom trust bar */}
          <div className="px-8 py-4 bg-[#111113] border-t border-[#1A1A1E] flex items-center justify-center gap-3">
            <GooglePartnerSeal variant="compact" />
            <div className="w-px h-4 bg-[#1A1A1E]" />
            <div className="flex items-center gap-1.5 text-[10px] text-white/25">
              <Shield className="w-3 h-3 text-[#34A853]" />
              256-bit SSL
            </div>
          </div>
        </div>

        {/* Floating disclaimer */}
        <p className="text-center text-[10px] text-white/15 mt-4 px-4">
          By continuing, you agree to GMBhub's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
