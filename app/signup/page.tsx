'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, ArrowLeft, Building2, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GMBhubLogo } from '@/components/ui/gmbhub-logo';
import {
  GoogleOAuthButton,
  GooglePartnerSeal,
  GoogleColorStripe,
  GoogleGLogo,
  GoogleColorDots,
} from '@/components/ui/google-brand';

const PERKS = [
  { icon: Building2, text: 'Setup your business in 60 seconds', color: '#4285F4' },
  { icon: TrendingUp, text: 'Start generating 5-star reviews instantly', color: '#34A853' },
  { icon: Users, text: '10,000+ businesses already growing with GMBhub', color: '#FBBC05' },
];

export default function SignupPage() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  async function handleGoogleSignUp() {
    setGoogleLoading(true);
    setError('');
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?onboarding=true`,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message ?? 'Google sign-up failed');
      setGoogleLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?onboarding=true` },
      });
      if (error) throw error;
      setEmailSent(true);
    } catch (err: any) {
      setError(err.message ?? 'Failed to send magic link');
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex relative overflow-hidden">
      {/* Left panel — value prop */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] p-12 relative overflow-hidden border-r border-[#1A1A1E]">
        {/* BG */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(66,133,244,0.1) 0%, transparent 60%), radial-gradient(ellipse at 100% 80%, rgba(52,168,83,0.08) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <GMBhubLogo size="md" animated />
        </div>

        {/* Main value prop */}
        <div className="relative z-10">
          <h2 className="text-4xl font-black leading-tight mb-6">
            Your Google Reviews
            <br />
            <span className="text-[#34A853]" style={{ textShadow: '0 0 20px rgba(52,168,83,0.4)' }}>
              on autopilot.
            </span>
          </h2>

          <div className="space-y-4 mb-10">
            {PERKS.map((perk, i) => (
              <motion.div key={perk.text}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${perk.color}18`, border: `1px solid ${perk.color}25` }}>
                  <perk.icon className="w-4 h-4" style={{ color: perk.color }} />
                </div>
                <span className="text-sm text-white/65">{perk.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Mini testimonial */}
          <div className="p-4 rounded-xl bg-[#0A0A0C] border border-[#1A1A1E]">
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                    fill="#FBBC05" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-white/60 italic mb-2">
              "GMBhub doubled our Google reviews in 3 weeks. Completely changed our local ranking."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#4285F4]/30 flex items-center justify-center text-xs font-bold">R</div>
              <span className="text-xs text-white/40">Rohan M. — Cafe Owner, Mumbai</span>
            </div>
          </div>
        </div>

        {/* Bottom Google seal */}
        <div className="relative z-10">
          <GooglePartnerSeal variant="full" />
        </div>
      </div>

      {/* Right panel — signup form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

        <Link href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/35 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <GMBhubLogo size="md" animated />
          </div>

          <div className="bg-[#0A0A0C] border border-[#1A1A1E] rounded-3xl overflow-hidden shadow-2xl">
            <GoogleColorStripe />

            <div className="p-7">
              <h1 className="text-2xl font-black mb-1">Create free account</h1>
              <p className="text-white/40 text-sm mb-7">No credit card required. QR always free.</p>

              {/* ─── Google Sign Up (BIG PRIMARY) ─────────────────── */}
              <div className="mb-5">
                <GoogleOAuthButton
                  onClick={handleGoogleSignUp}
                  loading={googleLoading}
                  label="Sign up with Google"
                />

                {/* Google trust copy */}
                <div className="flex items-center justify-center gap-2 mt-3 p-2.5 rounded-lg bg-[#4285F4]/8 border border-[#4285F4]/15">
                  <GoogleGLogo size={14} />
                  <p className="text-[10px] text-white/45 text-center leading-relaxed">
                    Uses Google OAuth 2.0 — instant setup, your data stays protected
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-[#1A1A1E]" />
                <span className="text-xs text-white/25 font-mono whitespace-nowrap">or use magic link</span>
                <div className="flex-1 h-px bg-[#1A1A1E]" />
              </div>

              {/* Magic link / email signup */}
              <AnimatePresence mode="wait">
                {emailSent ? (
                  <motion.div key="sent"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-[#34A853]/20 border border-[#34A853]/40 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-[#34A853]" />
                    </div>
                    <p className="font-semibold text-sm mb-1">Check your inbox!</p>
                    <p className="text-xs text-white/40">We sent a magic link to <span className="text-white/70">{email}</span></p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleMagicLink} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-[#111113] border border-[#1A1A1E] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#4285F4]/50 transition-colors font-mono"
                    />

                    <AnimatePresence>
                      {error && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="text-xs text-[#EA4335] px-1">{error}</motion.p>
                      )}
                    </AnimatePresence>

                    <button type="submit" disabled={!email}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#111113] border border-[#242428] hover:border-[#4285F4]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                      Send Magic Link →
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* What you get */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#111113] border border-[#1A1A1E]">
                <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-2">Free plan includes</p>
                {[
                  { text: 'QR code generator — forever free', color: '#34A853' },
                  { text: '50 scans/month included', color: '#4285F4' },
                  { text: 'AI review funnel', color: '#FBBC05' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-white/30 mt-5">
                Already have an account?{' '}
                <Link href="/login" className="text-[#4285F4] hover:text-[#3367D6] font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Bottom bar */}
            <div className="px-7 py-3.5 bg-[#111113] border-t border-[#1A1A1E] flex items-center justify-between">
              <GoogleColorDots />
              <p className="text-[10px] text-white/20 font-mono">maps.googleapis.com v3</p>
            </div>
          </div>

          <p className="text-center text-[10px] text-white/12 mt-4 px-4 leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            Google and the Google logo are trademarks of Google LLC.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
