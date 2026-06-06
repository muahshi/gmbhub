'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, TrendingUp, Shield, Star, ChevronRight, Check, Users, BarChart3, Zap, Bot, ArrowRight, Sparkles, Download, X } from 'lucide-react';
import Link from 'next/link';
import { cn, formatNumber } from '@/lib/utils';
import { formatPrice } from '@/lib/currency';
import type { CurrencyConfig } from '@/types';
import { CURRENCY_MAP, PRICING_PLANS } from '@/types';
import { GMBhubLogo, GMBhubBrand } from '@/components/ui/gmbhub-logo';
import { GooglePartnerSeal, GoogleOAuthButton, GoogleColorStripe, GoogleGLogo, GoogleColorDots } from '@/components/ui/google-brand';

// ── Ambient Background Layer ──────────────────────────────────────────
function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      {/* Primary blue orb – top left */}
      <div className="absolute -top-40 -left-40 w-[900px] h-[900px] rounded-full animate-orb-drift"
        style={{
          background: 'radial-gradient(circle, rgba(66,133,244,0.15) 0%, rgba(66,133,244,0.04) 45%, transparent 75%)',
          filter: 'blur(100px)',
        }} />
      {/* Emerald orb – bottom right */}
      <div className="absolute -bottom-60 -right-60 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(52,168,83,0.05) 40%, transparent 75%)',
          filter: 'blur(120px)',
          animationDelay: '8s',
        }} />
      {/* Amber orb – mid center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251,188,5,0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }} />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      {/* Vignette edges */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-3 border-b border-white/[0.05]'
          : 'py-5 bg-transparent'
      )}
      style={scrolled ? {
        background: 'rgba(5,5,7,0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <GMBhubBrand />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {['Features', 'How It Works', 'Pricing', 'Resources'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-white/45 hover:text-white transition-colors duration-200 font-medium tracking-wide">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/40 hover:text-white transition-colors hidden md:block font-medium">
            Log in
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/signup"
              className="relative flex items-center gap-2 px-5 py-2.5 text-white font-semibold text-sm rounded-xl overflow-hidden"
              style={{
                background: '#4285F4',
                boxShadow: '0 0 24px rgba(66,133,244,0.5), 0 0 48px rgba(66,133,244,0.15), 0 2px 8px rgba(0,0,0,0.4)',
              }}>
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </span>
              {/* Shimmer sweep */}
              <div className="absolute inset-0 shimmer opacity-60" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

// ── Phone Mockup ─────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative w-[300px] select-none">
      {/* Multi-layer glow halo */}
      <div className="absolute inset-0 rounded-full scale-[0.85] translate-y-16 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(66,133,244,0.35) 0%, rgba(52,168,83,0.18) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[40px] rounded-full"
        style={{
          background: 'rgba(52,168,83,0.4)',
          filter: 'blur(30px)',
        }} />

      <div className="relative z-10 phone-frame">
        {/* Status bar */}
        <div className="bg-[#060608] flex items-center justify-between px-6 pt-3 pb-2 text-[10px] text-white/50 font-mono">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1.5 text-[8px]">
            <span style={{ letterSpacing: '-1px' }}>▪▪▪▪</span>
            <span>WiFi</span>
            <span>▓</span>
          </div>
        </div>

        <div className="bg-[#060608] min-h-[580px] px-6 py-5 flex flex-col items-center text-center">
          {/* Business logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 relative"
            style={{
              background: 'linear-gradient(135deg, rgba(66,133,244,0.18) 0%, rgba(52,168,83,0.12) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 0 24px rgba(66,133,244,0.15)',
            }}>
            ☕
          </motion.div>

          <h3 className="text-base font-black mb-1 text-white tracking-tight">Brewed Bliss Cafe</h3>
          <p className="text-[#4285F4] text-xs font-bold mb-1" style={{ textShadow: '0 0 12px rgba(66,133,244,0.6)' }}>
            We'd love your feedback!
          </p>
          <p className="text-white/35 text-[11px] leading-relaxed mb-5">
            Your review helps us improve and<br />helps others discover us.
          </p>

          {/* Stars with glow */}
          <div className="flex gap-1.5 mb-7">
            {[1,2,3,4,5].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 260, damping: 14 }}
              >
                <svg className="w-9 h-9" viewBox="0 0 24 24">
                  <defs>
                    <radialGradient id={`sg${i}`} cx="50%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFE066" />
                      <stop offset="60%" stopColor="#FBBC05" />
                      <stop offset="100%" stopColor="#F09000" />
                    </radialGradient>
                  </defs>
                  <polygon
                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                    fill={`url(#sg${i})`}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(251,188,5,0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          <div className="w-full space-y-3">
            {/* Google CTA */}
            <motion.button
              className="w-full flex items-center gap-2.5 py-3.5 px-4 text-white font-bold text-sm rounded-2xl relative overflow-hidden"
              style={{
                background: '#4285F4',
                boxShadow: '0 0 28px rgba(66,133,244,0.55), 0 0 56px rgba(66,133,244,0.15), 0 4px 12px rgba(0,0,0,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <GoogleGLogo size={18} />
              <span className="flex-1 text-center">Leave a Review on Google</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
              <div className="absolute inset-0 shimmer opacity-40" />
            </motion.button>

            {/* Issue CTA */}
            <button className="w-full flex items-center gap-2.5 py-3 px-4 text-white/50 text-sm rounded-2xl transition-colors hover:bg-white/[0.07]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
              <svg className="w-4 h-4 shrink-0 text-white/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
                <path d="M14 10a1.3 1.3 0 0 1-1.3 1.3H4.7l-2.7 2.7V3.3A1.3 1.3 0 0 1 3.3 2h9.4A1.3 1.3 0 0 1 14 3.3z" />
              </svg>
              <span className="flex-1 text-left text-xs">I had an issue — Let us make it right</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-1.5 text-[#34A853] text-[10px]"
            style={{ textShadow: '0 0 10px rgba(52,168,83,0.5)' }}>
            <Shield className="w-3 h-3" />
            Verified Secure Google OAuth Node
          </div>
          <p className="text-white/20 text-[10px] mt-1">
            Powered by <span className="text-[#4285F4] font-bold">GMBhub</span> AI
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────
function HeroSection() {
  const [gmbUrl, setGmbUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [qrPng, setQrPng] = useState<string | null>(null);
  const [qrError, setQrError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!gmbUrl) return;
    setIsGenerating(true);
    setQrError(null);
    setQrSvg(null);
    setQrPng(null);
    setGenerated(false);
    try {
      const res = await fetch('/api/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: gmbUrl, label: 'Landing Page QR' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? 'QR generation failed');
      setQrSvg(data.svg);
      setQrPng(data.png_data_url);
      setGenerated(true);
    } catch (err: any) {
      setQrError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDownload() {
    if (!qrPng) return;
    const a = document.createElement('a');
    a.href = qrPng;
    a.download = 'gmbhub-review-qr.png';
    a.click();
  }

  function handleReset() {
    setGenerated(false);
    setQrSvg(null);
    setQrPng(null);
    setQrError(null);
    setGmbUrl('');
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(66,133,244,0.08)',
                border: '1px solid rgba(66,133,244,0.2)',
                boxShadow: '0 0 20px rgba(66,133,244,0.08)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
              <span className="text-[#4285F4] text-xs font-bold tracking-widest">AI-POWERED GOOGLE BUSINESS GROWTH</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-[3.75rem] font-black leading-[1.06] mb-6 tracking-tight"
            >
              Turn Foot Traffic<br />
              into{' '}
              <span
                className="text-[#34A853]"
                style={{ textShadow: '0 0 32px rgba(52,168,83,0.7), 0 0 64px rgba(52,168,83,0.3)' }}
              >
                5-Star
              </span>{' '}
              Google Reviews.
              <br />
              <span
                className="text-[#4285F4]"
                style={{ textShadow: '0 0 32px rgba(66,133,244,0.8), 0 0 64px rgba(66,133,244,0.35)' }}
              >
                Instantly.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="text-lg text-white/45 max-w-lg mb-10 leading-relaxed"
            >
              GMBhub AI helps local businesses rank higher, attract more customers,
              and build a 5-star reputation on{' '}
              <span className="text-[#34A853] font-semibold" style={{ textShadow: '0 0 12px rgba(52,168,83,0.5)' }}>autopilot.</span>
            </motion.p>

            {/* Input card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              className="p-[1px] rounded-2xl mb-8"
              style={{
                background: gmbUrl
                  ? 'linear-gradient(135deg, rgba(66,133,244,0.5), rgba(52,168,83,0.3))'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              }}
            >
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: '#08080C',
                  boxShadow: gmbUrl
                    ? '0 0 40px rgba(66,133,244,0.12), 0 12px 40px rgba(0,0,0,0.6)'
                    : '0 12px 40px rgba(0,0,0,0.5)',
                }}
              >
                <div className="flex gap-3 mb-4">
                  <div
                    className="flex items-center gap-2.5 flex-1 rounded-xl px-4 py-3 transition-all duration-300 focus-within:border-[#4285F4]/40"
                    style={{
                      background: '#0F0F14',
                      border: gmbUrl ? '1px solid rgba(66,133,244,0.35)' : '1px solid rgba(255,255,255,0.07)',
                      boxShadow: gmbUrl ? '0 0 0 3px rgba(66,133,244,0.06)' : 'none',
                    }}
                  >
                    <svg className="w-4 h-4 text-[#4285F4] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                    </svg>
                    <input
                      type="url"
                      value={gmbUrl}
                      onChange={(e) => { setGmbUrl(e.target.value); setGenerated(false); setQrSvg(null); setQrPng(null); setQrError(null); }}
                      placeholder="Paste your Google Business Profile / Maps link"
                      className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                    />
                  </div>

                  <motion.button
                    onClick={handleGenerate}
                    disabled={!gmbUrl || isGenerating}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      'flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white',
                      'disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden',
                      generated ? 'bg-[#34A853]' : 'bg-[#4285F4] hover:bg-[#3367D6]'
                    )}
                    style={gmbUrl && !isGenerating ? {
                      boxShadow: generated
                        ? '0 0 24px rgba(52,168,83,0.55), 0 0 48px rgba(52,168,83,0.15)'
                        : '0 0 24px rgba(66,133,244,0.55), 0 0 48px rgba(66,133,244,0.15)',
                    } : {}}
                  >
                    {isGenerating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : generated ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <QrCode className="w-4 h-4" />
                    )}
                    <span className="whitespace-nowrap">
                      {isGenerating ? 'Generating...' : generated ? 'Generated!' : 'Generate Smart QR'}
                    </span>
                    {gmbUrl && !isGenerating && <div className="absolute inset-0 shimmer opacity-50" />}
                  </motion.button>
                </div>

                {/* QR Result */}
                <AnimatePresence>
                  {(qrSvg || qrError) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {qrError ? (
                        <div className="flex items-start gap-3 p-4 rounded-xl"
                          style={{ background: 'rgba(234,67,53,0.08)', border: '1px solid rgba(234,67,53,0.2)' }}>
                          <X className="w-4 h-4 text-[#EA4335] shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-[#EA4335] text-xs font-semibold mb-0.5">Generation failed</p>
                            <p className="text-white/50 text-xs">{qrError}</p>
                          </div>
                          <button onClick={handleReset} className="text-white/30 hover:text-white/60 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : qrSvg ? (
                        <div className="flex items-center gap-4 p-4 rounded-xl"
                          style={{ background: 'rgba(52,168,83,0.08)', border: '1px solid rgba(52,168,83,0.2)' }}>
                          <div
                            className="w-20 h-20 shrink-0 rounded-lg overflow-hidden p-1.5"
                            style={{ background: '#0A0A0C', border: '1px solid rgba(52,168,83,0.3)' }}
                            dangerouslySetInnerHTML={{ __html: qrSvg }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Check className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                              <p className="text-white text-sm font-bold">QR Code Ready!</p>
                            </div>
                            <p className="text-white/35 text-xs mb-3 truncate">{gmbUrl}</p>
                            <div className="flex items-center gap-3">
                              <motion.button
                                onClick={handleDownload}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-black"
                                style={{ background: '#34A853', boxShadow: '0 0 14px rgba(52,168,83,0.45)' }}
                              >
                                <Download className="w-3 h-3" />
                                Download PNG
                              </motion.button>
                              <button onClick={handleReset} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                                Generate another →
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-5 text-xs text-white/30">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#34A853]" />
                    No credit card required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#FBBC05]" fill="currentColor" />
                    Setup in 30 seconds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#4285F4]" />
                    AI-powered funnel
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {[
                { v: '10,000+', l: 'Businesses Trust Us' },
                { v: '2M+', l: 'Reviews Generated' },
                { v: '4.9★', l: 'Avg Rating Increase' },
                { v: '99.3%', l: 'Satisfaction' },
              ].map((s, i) => (
                <div key={s.v} className="relative">
                  {i > 0 && (
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10" />
                  )}
                  <p className="text-xl font-black text-white">{s.v}</p>
                  <p className="text-xs text-white/35 mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: phone */}
          <motion.div
            initial={{ opacity: 0, x: 48, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.28, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="animate-float">
              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: QrCode, title: 'Smart QR Codes', desc: 'AI-generated QR codes that route customers directly to your review funnel.', color: '#4285F4' },
    { icon: BarChart3, title: 'AI Review Funnel', desc: 'Mobile-first experience that converts happy customers into 5-star reviews.', color: '#34A853' },
    { icon: TrendingUp, title: 'Review Analytics', desc: 'Real-time insights, growth tracking, and smart performance reports.', color: '#FBBC05' },
    { icon: Bot, title: 'Automated Follow-ups', desc: 'AI sends personalized follow-ups to turn customers into raving fans.', color: '#4285F4' },
    { icon: Shield, title: 'Reputation Protection', desc: 'Detect and resolve negative feedback privately before it goes public.', color: '#EA4335' },
  ];

  return (
    <section id="features" className="py-28 relative overflow-hidden">
      {/* Section orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,168,83,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6 text-[#34A853] text-xs font-bold tracking-widest"
              style={{ background: 'rgba(52,168,83,0.08)', border: '1px solid rgba(52,168,83,0.2)' }}>
              BUILT FOR LOCAL GROWTH
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-10">
              Everything you need to<br />dominate{' '}
              <span className="text-[#34A853]" style={{ textShadow: '0 0 24px rgba(52,168,83,0.6)' }}>local search</span>
              <br />on Google.
            </h2>

            <div className="space-y-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-2xl cursor-default group transition-all duration-300"
                  style={{
                    background: '#08080C',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = `1px solid ${feature.color}25`;
                    e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${feature.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.35)';
                  }}
                >
                  <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: `${feature.color}12`, border: `1px solid ${feature.color}20` }}>
                    <feature.icon className="w-[18px] h-[18px]" style={{ color: feature.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm mb-1">{feature.title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{feature.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="animate-float" style={{ animationDelay: '3s' }}>
              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="py-10 relative overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(8,8,12,0.6)',
      }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, v: '10,000+', l: 'Businesses Trust Us', c: '#4285F4' },
            { icon: Star, v: '2M+', l: '5-Star Reviews Generated', c: '#FBBC05' },
            { icon: TrendingUp, v: '4.9★', l: 'Average Rating Increase', c: '#34A853' },
            { icon: Shield, v: '99.3%', l: 'Customer Satisfaction', c: '#4285F4' },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="p-3 rounded-xl shrink-0"
                style={{
                  backgroundColor: `${s.c}10`,
                  border: `1px solid ${s.c}20`,
                  boxShadow: `0 0 16px ${s.c}10`,
                }}>
                <s.icon className="w-5 h-5" style={{ color: s.c }} />
              </div>
              <div>
                <p className="text-2xl font-black">{s.v}</p>
                <p className="text-xs text-white/35">{s.l}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────
function PricingSection({ currency }: { currency: CurrencyConfig }) {
  const planAccents: Record<string, { border: string; glow: string; btn: string; badge?: string }> = {
    free:       { border: '#34A853', glow: 'rgba(52,168,83,0.15)',  btn: '#34A853' },
    starter:    { border: '#4285F4', glow: 'rgba(66,133,244,0.15)', btn: '#4285F4' },
    pro:        { border: '#FBBC05', glow: 'rgba(251,188,5,0.22)',  btn: '#FBBC05', badge: 'MOST POPULAR' },
    enterprise: { border: '#EA4335', glow: 'rgba(234,67,53,0.15)',  btn: '#EA4335' },
  };

  return (
    <section id="pricing" className="py-28 relative overflow-hidden">
      {/* Top center orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(66,133,244,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6 text-[#4285F4] text-xs font-bold tracking-widest"
            style={{ background: 'rgba(66,133,244,0.08)', border: '1px solid rgba(66,133,244,0.2)' }}
          >
            SIMPLE PRICING
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Transparent Pricing
          </motion.h2>
          <p className="text-white/40 text-lg">
            QR codes are <span className="text-[#34A853] font-semibold">always free</span>. Pay only when you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING_PLANS.map((plan, i) => {
            const accent = planAccents[plan.id] ?? planAccents.free;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-6 rounded-2xl border flex flex-col"
                style={{
                  borderColor: `${accent.border}25`,
                  background: plan.highlighted
                    ? 'linear-gradient(160deg, rgba(16,16,22,1) 0%, rgba(8,8,12,1) 100%)'
                    : '#08080C',
                  boxShadow: plan.highlighted
                    ? `0 0 50px ${accent.glow}, 0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${accent.border}15`
                    : '0 4px 24px rgba(0,0,0,0.4)',
                }}
              >
                {/* Top accent stripe */}
                <div className="absolute top-0 left-6 right-6 h-px rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent.border}80, transparent)` }} />

                {accent.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-black text-[10px] font-black rounded-full tracking-widest"
                    style={{ backgroundColor: accent.btn, boxShadow: `0 0 20px ${accent.glow}` }}>
                    {accent.badge}
                  </div>
                )}

                <div className="mb-6 pt-2">
                  <p className="text-xs font-bold text-white/35 mb-2 uppercase tracking-widest">{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black">
                      {plan.monthly_price_usd === 0 ? 'Free' : formatPrice(plan.monthly_price_usd, currency)}
                    </span>
                    {plan.monthly_price_usd > 0 && <span className="text-white/25 text-sm mb-1.5">/mo</span>}
                  </div>
                  <p className="text-xs text-white/25 mt-1">
                    {plan.scan_limit >= 999999 ? 'Unlimited' : formatNumber(plan.scan_limit)} scans/mo
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent.border }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all relative overflow-hidden"
                  style={{
                    backgroundColor: accent.btn,
                    color: plan.id === 'pro' ? '#000' : '#fff',
                    boxShadow: `0 0 20px ${accent.glow}, 0 4px 12px rgba(0,0,0,0.3)`,
                  }}
                >
                  <span className="relative z-10">
                    {plan.monthly_price_usd === 0 ? 'Get Started Free' : 'Start Trial'}
                  </span>
                  <div className="absolute inset-0 shimmer opacity-50" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [currency, setCurrency] = useState<CurrencyConfig>({ code: 'USD', symbol: '$', locale: 'en-US', rate: 1 });

  useEffect(() => {
    const locale = navigator.language || 'en-US';
    const country = locale.split('-')[1] || 'US';
    if (CURRENCY_MAP[country]) setCurrency(CURRENCY_MAP[country]);
  }, []);

  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <PricingSection currency={currency} />

        {/* Final CTA */}
        <section className="py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(66,133,244,0.12) 0%, transparent 60%)' }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <GMBhubLogo size="lg" animated />
            </div>
            <h2 className="text-5xl font-black mb-6">
              Ready to grow your<br />
              <span className="text-[#34A853]" style={{ textShadow: '0 0 32px rgba(52,168,83,0.6)' }}>
                Google Reviews?
              </span>
            </h2>
            <p className="text-white/40 mb-10 text-lg">
              Join 10,000+ businesses using GMBhub to dominate local search.
            </p>
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-2xl cursor-pointer relative overflow-hidden"
                style={{
                  background: '#4285F4',
                  boxShadow: '0 0 40px rgba(66,133,244,0.5), 0 0 80px rgba(66,133,244,0.15), 0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Free — No Credit Card
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 shimmer" />
              </motion.div>
            </Link>

            <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
              {[
                { icon: Shield, label: 'SOC 2 Compliant', color: '#34A853' },
                { icon: Check, label: 'GDPR Ready', color: '#4285F4' },
                { icon: Zap, label: 'Setup in 30 seconds', color: '#FBBC05' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/30 text-xs">
                  <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t py-10 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <GMBhubBrand />
          <p className="text-white/18 text-xs text-center">
            © 2025 GMBhub. All rights reserved. Not affiliated with Google LLC.
          </p>
          <GooglePartnerSeal variant="compact" />
        </div>
      </footer>
    </>
  );
}
