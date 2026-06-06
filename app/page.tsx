'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, TrendingUp, Shield, Star, ChevronRight, Check, Users, BarChart3, Zap, Bot, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn, formatNumber } from '@/lib/utils';
import { formatPrice } from '@/lib/currency';
import type { CurrencyConfig } from '@/types';
import { CURRENCY_MAP, PRICING_PLANS } from '@/types';
import { GMBhubLogo, GMBhubBrand } from '@/components/ui/gmbhub-logo';
import { GooglePartnerSeal, GoogleOAuthButton, GoogleColorStripe, GoogleGLogo, GoogleColorDots } from '@/components/ui/google-brand';

// ── Navbar ──────────────────────────────────────────────────────────
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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'glass-dark py-3 border-b border-white/[0.06]' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <GMBhubBrand />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {['Features', 'How It Works', 'Pricing', 'Resources'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-white/50 hover:text-white transition-colors font-medium">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors hidden md:block font-medium">
            Log in
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/signup"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#4285F4] text-white font-semibold text-sm rounded-xl transition-all"
              style={{ boxShadow: '0 0 20px rgba(66,133,244,0.4), 0 2px 8px rgba(0,0,0,0.3)' }}>
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

// ── Phone Mockup ────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative w-[300px]">
      {/* Glow halo */}
      <div className="absolute inset-0 blur-3xl rounded-full scale-75 translate-y-12 opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.3) 0%, rgba(52,168,83,0.15) 50%, transparent 70%)' }} />

      <div className="phone-frame relative z-10">
        {/* Status bar */}
        <div className="bg-[#060608] flex items-center justify-between px-6 py-2.5 text-[10px] text-white/50 font-mono">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-[8px]">
            <span>▪▪▪▪</span>
            <span>WiFi</span>
            <span>▓</span>
          </div>
        </div>

        <div className="bg-[#060608] min-h-[580px] px-6 py-6 flex flex-col items-center text-center">
          {/* Business logo */}
          <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-3xl mb-4"
            style={{ background: 'linear-gradient(135deg, rgba(66,133,244,0.15) 0%, rgba(52,168,83,0.1) 100%)' }}>
            ☕
          </div>

          <h3 className="text-base font-bold mb-1 text-white">Brewed Bliss Cafe</h3>
          <p className="text-[#4285F4] text-xs font-semibold mb-1">We'd love your feedback!</p>
          <p className="text-white/40 text-xs leading-relaxed mb-6">
            Your review helps us improve and<br />helps others discover us.
          </p>

          {/* Stars */}
          <div className="flex gap-1.5 mb-8">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className="w-9 h-9" viewBox="0 0 24 24">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill="#FBBC05"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(251,188,5,0.7))' }} />
              </svg>
            ))}
          </div>

          <div className="w-full space-y-3">
            <button className="w-full flex items-center justify-center gap-2.5 py-3.5 text-white font-bold text-sm rounded-2xl"
              style={{ background: '#4285F4', boxShadow: '0 0 24px rgba(66,133,244,0.5)' }}>
              <GoogleGLogo size={16} />
              Leave a Review on Google
            </button>
            <button className="w-full py-3 bg-white/5 text-white/60 text-sm rounded-2xl border border-white/8 hover:bg-white/8 transition-colors">
              I had an issue<br /><span className="text-xs text-white/35">Let us make it right</span>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-1.5 text-[#34A853] text-[10px]">
            <Shield className="w-3 h-3" />
            Your feedback is private and secure.
          </div>
          <p className="text-white/20 text-[10px] mt-1">
            Powered by <span className="text-[#4285F4] font-bold">GMBhub</span> AI
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [gmbUrl, setGmbUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  async function handleGenerate() {
    if (!gmbUrl) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsGenerating(false);
    setGenerated(true);
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Ambient background */}
      <div className="orb w-[700px] h-[700px] -top-60 -left-60 animate-orb-drift"
        style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.1) 0%, transparent 70%)' }} />
      <div className="orb w-[600px] h-[600px] -bottom-40 -right-40 animate-orb-drift"
        style={{ background: 'radial-gradient(circle, rgba(52,168,83,0.08) 0%, transparent 70%)', animationDelay: '6s' }} />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text + CTA */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4285F4]/25 bg-[#4285F4]/8 text-[#4285F4] text-xs font-semibold tracking-widest mb-8">
              <Sparkles className="w-3 h-3" />
              AI-POWERED GOOGLE BUSINESS GROWTH
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-black leading-[1.08] mb-6 tracking-tight"
            >
              Turn Foot Traffic<br />into{' '}
              <span className="text-[#34A853] text-glow-green">5-Star</span>{' '}
              Google Reviews.
              <br />
              <span className="text-[#4285F4] text-glow-blue">Instantly.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-lg text-white/50 max-w-lg mb-10 leading-relaxed">
              GMBhub helps local businesses rank higher, attract more customers,
              and build a 5-star reputation on{' '}
              <span className="text-[#34A853] font-semibold">autopilot.</span>
            </motion.p>

            {/* Input card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className={cn(
                'p-5 rounded-2xl border transition-all duration-500',
                gmbUrl
                  ? 'border-[#4285F4]/40 bg-[#08080C]'
                  : 'border-white/8 bg-[#08080C]'
              )}
              style={gmbUrl ? { boxShadow: '0 0 0 1px rgba(66,133,244,0.15), 0 8px 32px rgba(0,0,0,0.4)' } : { boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <div className="flex gap-3 mb-4">
                <div className="flex items-center gap-2 flex-1 bg-[#0F0F14] border border-white/8 rounded-xl px-4 py-3 focus-within:border-[#4285F4]/40 transition-colors">
                  <QrCode className="w-4 h-4 text-[#4285F4] shrink-0" />
                  <input
                    type="url"
                    value={gmbUrl}
                    onChange={(e) => setGmbUrl(e.target.value)}
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
                    'disabled:opacity-50 disabled:cursor-not-allowed transition-all',
                    generated ? 'bg-[#34A853]' : 'bg-[#4285F4] hover:bg-[#3367D6]'
                  )}
                  style={gmbUrl && !isGenerating ? { boxShadow: '0 0 20px rgba(66,133,244,0.45)' } : {}}
                >
                  {isGenerating ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  ) : generated ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <QrCode className="w-4 h-4" />
                  )}
                  {isGenerating ? 'Generating...' : generated ? 'Generated!' : 'Generate Smart QR'}
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-xs text-white/35">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#34A853]" /> No credit card required</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#FBBC05]" fill="currentColor" /> Setup in 30 seconds</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#4285F4]" /> AI-powered funnel</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex items-center gap-8 mt-8">
              {[
                { v: '10,000+', l: 'Businesses Trust Us' },
                { v: '2M+', l: 'Reviews Generated' },
                { v: '4.9★', l: 'Avg Rating Increase' },
                { v: '99.3%', l: 'Satisfaction' },
              ].map((s) => (
                <div key={s.v}>
                  <p className="text-xl font-black text-white">{s.v}</p>
                  <p className="text-xs text-white/40">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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

// ── Features ─────────────────────────────────────────────────────────
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#34A853]/10 border border-[#34A853]/20 text-[#34A853] text-xs font-bold tracking-widest mb-6">
              BUILT FOR LOCAL GROWTH
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-10">
              Everything you need to<br />dominate{' '}
              <span className="text-[#34A853] text-glow-green">local search</span>
              <br />on Google.
            </h2>

            <div className="space-y-3">
              {features.map((feature, i) => (
                <motion.div key={feature.title}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#08080C] border border-white/6 hover:border-white/12 transition-all group cursor-default"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
                  <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}20` }}>
                    <feature.icon className="w-4.5 h-4.5" style={{ color: feature.color }} size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm mb-1">{feature.title}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{feature.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex justify-center">
            <div className="animate-float">
              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing ──────────────────────────────────────────────────────────
function PricingSection({ currency }: { currency: CurrencyConfig }) {
  const planAccents: Record<string, { border: string; glow: string; btn: string; badge?: string }> = {
    free:       { border: '#34A853', glow: 'rgba(52,168,83,0.12)',  btn: '#34A853' },
    starter:    { border: '#4285F4', glow: 'rgba(66,133,244,0.12)', btn: '#4285F4' },
    pro:        { border: '#FBBC05', glow: 'rgba(251,188,5,0.18)',   btn: '#FBBC05', badge: 'MOST POPULAR' },
    enterprise: { border: '#EA4335', glow: 'rgba(234,67,53,0.12)',  btn: '#EA4335' },
  };

  return (
    <section id="pricing" className="py-28 relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.1) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-bold tracking-widest mb-6">
            SIMPLE PRICING
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4">
            Transparent Pricing
          </motion.h2>
          <p className="text-white/45 text-lg">
            QR codes are <span className="text-[#34A853] font-semibold">always free</span>. Pay only when you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING_PLANS.map((plan, i) => {
            const accent = planAccents[plan.id] ?? planAccents.free;
            return (
              <motion.div key={plan.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${accent.border}30`,
                  background: '#08080C',
                  boxShadow: plan.highlighted ? `0 0 40px ${accent.glow}, 0 8px 32px rgba(0,0,0,0.5)` : '0 4px 24px rgba(0,0,0,0.4)',
                }}>

                {/* Top accent stripe */}
                <div className="absolute top-0 left-6 right-6 h-px rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)` }} />

                {accent.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-black text-[10px] font-black rounded-full tracking-widest"
                    style={{ backgroundColor: accent.btn }}>
                    {accent.badge}
                  </div>
                )}

                <div className="mb-6 pt-2">
                  <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-widest">{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black">
                      {plan.monthly_price_usd === 0 ? 'Free' : formatPrice(plan.monthly_price_usd, currency)}
                    </span>
                    {plan.monthly_price_usd > 0 && <span className="text-white/30 text-sm mb-1.5">/mo</span>}
                  </div>
                  <p className="text-xs text-white/30 mt-1">
                    {plan.scan_limit >= 999999 ? 'Unlimited' : formatNumber(plan.scan_limit)} scans/mo
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/60">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent.border }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                  style={{
                    backgroundColor: accent.btn,
                    color: plan.id === 'pro' ? '#000' : '#fff',
                    boxShadow: `0 0 16px ${accent.glow}`,
                  }}>
                  {plan.monthly_price_usd === 0 ? 'Get Started Free' : 'Start Trial'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [currency, setCurrency] = useState<CurrencyConfig>({ code: 'USD', symbol: '$', locale: 'en-US', rate: 1 });

  useEffect(() => {
    const locale = navigator.language || 'en-US';
    const country = locale.split('-')[1] || 'US';
    if (CURRENCY_MAP[country]) setCurrency(CURRENCY_MAP[country]);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Stats bar */}
        <section className="py-10 border-t border-b border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, v: '10,000+', l: 'Businesses Trust Us', c: '#4285F4' },
                { icon: Star, v: '2M+', l: '5-Star Reviews Generated', c: '#FBBC05' },
                { icon: TrendingUp, v: '4.9★', l: 'Average Rating Increase', c: '#34A853' },
                { icon: Shield, v: '99.3%', l: 'Customer Satisfaction', c: '#4285F4' },
              ].map((s, i) => (
                <motion.div key={s.l}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4">
                  <div className="p-3 rounded-xl shrink-0"
                    style={{ backgroundColor: `${s.c}10`, border: `1px solid ${s.c}20` }}>
                    <s.icon className="w-5 h-5" style={{ color: s.c }} />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{s.v}</p>
                    <p className="text-xs text-white/40">{s.l}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FeaturesSection />
        <PricingSection currency={currency} />

        {/* Final CTA */}
        <section className="py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(66,133,244,0.1) 0%, transparent 60%)' }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <GMBhubLogo size="lg" animated />
            </div>
            <h2 className="text-5xl font-black mb-6">
              Ready to grow your<br />
              <span className="text-[#34A853] text-glow-green">Google Reviews?</span>
            </h2>
            <p className="text-white/45 mb-10 text-lg">
              Join 10,000+ businesses using GMBhub to dominate local search.
            </p>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-2xl cursor-pointer"
                style={{ background: '#4285F4', boxShadow: '0 0 32px rgba(66,133,244,0.45), 0 4px 16px rgba(0,0,0,0.4)' }}>
                Start Free — No Credit Card
                <ArrowRight className="w-5 h-5" />
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

      <footer className="border-t border-white/6 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <GMBhubBrand />
          <p className="text-white/20 text-xs text-center">
            © 2025 GMBhub. All rights reserved. Not affiliated with Google LLC.
          </p>
          <GooglePartnerSeal variant="compact" />
        </div>
      </footer>
    </>
  );
}
