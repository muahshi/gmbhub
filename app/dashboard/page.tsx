'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GMBhubLogo } from '@/components/ui/gmbhub-logo';
import {
  GoogleOAuthButton,
  GooglePartnerSeal,
  GoogleColorStripe,
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ background: '#020204' }}>
      {/* Ambient */}
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.06) 0%, transparent 65%)' }} />

      {/* Back */}
      <Link href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/35 hover:text-white text-sm transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to GMBhub
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl overflow-hidden"
          style={{
            background: '#08080C',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
          }}>
          {/* Top stripe */}
          <div className="h-px w-full" style={{
            background: 'linear-gradient(90deg, transparent, #4285F4 25%, #34A853 50%, #FBBC05 75%, transparent)',
          }} />

          <div className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <GMBhubLogo size="lg" animated />
              <p className="text-white/35 text-sm mt-2">Welcome back</p>
            </div>

            {/* Google OAuth */}
            <div className="mb-6">
              <GoogleOAuthButton
                onClick={handleGoogleSignIn}
                loading={googleLoading}
                label="Continue with Google"
              />
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                <Shield className="w-3 h-3 text-[#34A853]" />
                <p className="text-[10px] text-white/25 text-center">
                  Secured via Google OAuth 2.0 — we never see your Google password
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/6" />
              <span className="text-xs text-white/20 font-mono">or sign in with email</span>
              <div className="flex-1 h-px bg-white/6" />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5 font-semibold">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                  style={{
                    background: '#0F0F14',
                    border: email ? '1px solid rgba(66,133,244,0.35)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-white/40 font-semibold">Password</label>
                  <Link href="/forgot-password" className="text-xs text-[#4285F4] hover:text-[#6BA7FF] transition-colors font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                    style={{
                      background: '#0F0F14',
                      border: password ? '1px solid rgba(66,133,244,0.35)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#EA4335] text-xs"
                    style={{ background: 'rgba(234,67,53,0.08)', border: '1px solid rgba(234,67,53,0.25)' }}
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
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: '#4285F4',
                  boxShadow: email && password ? '0 0 24px rgba(66,133,244,0.4)' : 'none',
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  {loading ? 'Signing in...' : 'Sign In'}
                </span>
              </motion.button>
            </form>

            <p className="text-center text-xs text-white/30 mt-6">
              New to GMBhub?{' '}
              <Link href="/signup" className="text-[#4285F4] hover:text-[#6BA7FF] font-bold transition-colors">
                Create free account
              </Link>
            </p>
          </div>

          {/* Bottom trust bar */}
          <div className="px-8 py-4 flex items-center justify-center gap-4 border-t" style={{ background: '#0F0F14', borderColor: 'rgba(255,255,255,0.06)' }}>
            <GooglePartnerSeal variant="compact" />
            <div className="w-px h-4 bg-white/8" />
            <div className="flex items-center gap-1.5 text-[10px] text-white/25">
              <Shield className="w-3 h-3 text-[#34A853]" />
              256-bit SSL Encrypted
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-white/12 mt-4 px-4">
          By continuing, you agree to GMBhub's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
