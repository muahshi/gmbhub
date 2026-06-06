'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, TrendingUp, Shield, Star, ChevronRight, Check, Users, BarChart3, Zap, Bot } from 'lucide-react';
import Link from 'next/link';
import { cn, PRICING_PLANS, formatNumber } from '@/lib/utils';
import { formatPrice } from '@/lib/currency';
import type { CurrencyConfig } from '@/types';
import { CURRENCY_MAP } from '@/types';
import { GMBhubLogo, GMBhubBrand } from '@/components/ui/gmbhub-logo';
import { GooglePartnerSeal, GoogleOAuthButton, GoogleColorStripe, GoogleGLogo, GoogleColorDots } from '@/components/ui/google-brand';

// ─────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────
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
        scrolled ? 'glass-dark py-3 border-b border-white/[0.06]' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <GMBhubBrand />

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {['Features', 'How It Works', 'Pricing', 'Resources'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Google Partner seal — compact in nav */}
          <div className="hidden lg:block">
            <GooglePartnerSeal variant="compact" />
          </div>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">
            Log in
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/signup"
              className="px-4 py-2 bg-[#4285F4] text-white font-semibold text-sm rounded-lg transition-all"
              style={{ boxShadow: '0 0 16px rgba(66,133,244,0.35)' }}>
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [gmbUrl, setGmbUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  async function handleGenerate() {
    if (!gmbUrl) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsGenerating(false);
    setGenerated(true);
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Ambient orbs */}
      <div className="orb w-[600px] h-[600px] -top-40 -left-40 animate-orb-drift"
        style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.12) 0%, transparent 70%)' }} />
      <div className="orb w-[500px] h-[500px] -bottom-40 -right-20 animate-orb-drift"
        style={{ background: 'radial-gradient(circle, rgba(52,168,83,0.1) 0%, transparent 70%)', animationDelay: '4s' }} />
      <div className="orb w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(234,67,53,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Top badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex flex-col items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4285F4]/30 bg-[#4285F4]/10 text-[#4285F4] text-xs font-semibold tracking-widest">
            <Zap className="w-3 h-3" fill="currentColor" />
            AI-POWERED GMB REPUTATION MANAGEMENT
          </div>
          {/* Google Partner seal — hero placement */}
          <GooglePartnerSeal variant="full" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
        >
          Turn Foot Traffic into{' '}
          <br />
          <span className="text-[#34A853]" style={{ textShadow: '0 0 30px rgba(52,168,83,0.5)' }}>5-Star</span>{' '}
          Google Reviews.
          <br />
          <span className="text-[#4285F4]" style={{ textShadow: '0 0 30px rgba(66,133,244,0.5)' }}>Instantly.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-lg text-white/55 max-w-2xl mx-auto mb-12 leading-relaxed">
          GMBhub helps local businesses generate more 5-star reviews, boost rankings, and grow trust —{' '}
          <span className="text-[#34A853] font-medium">on autopilot.</span>
        </motion.p>

        {/* GMB Input card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className={cn(
            'relative max-w-2xl mx-auto p-5 rounded-2xl border bg-[#0A0A0C] transition-all duration-500',
            gmbUrl
              ? 'border-[#4285F4]/50 shadow-[0_0_30px_rgba(66,133,244,0.2)]'
              : 'border-[#1A1A1E]'
          )}
        >
          {/* Google color stripe at top of card */}
          <GoogleColorStripe className="mb-4 rounded-full" />

          <p className="text-xs text-white/50 mb-3 text-left font-mono">
            Enter your Google My Business / Maps Link
          </p>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 flex-1 bg-[#111113] border border-[#1A1A1E] rounded-xl px-4 py-3 focus-within:border-[#4285F4]/40 transition-colors">
              <QrCode className="w-4 h-4 text-[#4285F4] shrink-0" />
              <input
                type="url"
                value={gmbUrl}
                onChange={(e) => setGmbUrl(e.target.value)}
                placeholder="https://www.google.com/maps/place/Your-Business"
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25 font-mono"
              />
            </div>

            <motion.button
              onClick={handleGenerate}
              disabled={!gmbUrl || isGenerating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white',
                'disabled:opacity-50 disabled:cursor-not-allowed transition-all',
                generated
                  ? 'bg-[#34A853]'
                  : 'bg-[#4285F4] hover:bg-[#3367D6]',
                gmbUrl && !isGenerating ? 'shadow-[0_0_20px_rgba(66,133,244,0.4)]' : ''
              )}
            >
              {isGenerating ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              ) : generated ? (
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <QrCode className="w-4 h-4" />
              )}
              {isGenerating ? 'Generating...' : generated ? 'Generated!' : 'Generate Smart QR'}
            </motion.button>
          </div>

          {/* Trust micro-badges */}
          <div className="flex flex-wrap items-center gap-5 mt-4 text-xs text-white/35">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#34A853]" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#4285F4]" /> Setup in 30 seconds
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FBBC05]" fill="currentColor" /> AI powered. Results driven.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PHONE MOCKUP
// ─────────────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-0 blur-3xl rounded-full scale-75 translate-y-8"
        style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.2) 0%, rgba(52,168,83,0.1) 50%, transparent 70%)' }} />

      <div className="phone-frame w-[280px] relative z-10">
        {/* Status bar */}
        <div className="bg-black flex items-center justify-between px-6 py-2 text-[10px] text-white/60 font-mono">
          <span>9:41</span>
          <div className="flex items-center gap-1"><span>▪▪▪ WiFi ▓</span></div>
        </div>

        <div className="bg-gradient-to-b from-[#0A1628] to-[#030303] min-h-[560px] p-5 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full border-2 border-[#4285F4]/30 flex items-center justify-center mb-3 bg-[#4285F4]/10">
            <span className="text-2xl">☕</span>
          </div>

          <h3 className="text-lg font-bold mb-1">Brewed Bliss Cafe</h3>
          {/* Google color dots under name */}
          <div className="flex justify-center mb-2">
            <GoogleColorDots />
          </div>
          <p className="text-[#4285F4] text-xs font-semibold mb-2">We'd love your feedback!</p>
          <p className="text-white/45 text-xs leading-relaxed mb-6">
            Your review helps us improve and helps<br />others discover us.
          </p>

          {/* Stars — Google Yellow */}
          <div className="flex gap-2 mb-2">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className="w-8 h-8" viewBox="0 0 24 24">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill="#FBBC05"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(251,188,5,0.6))' }} />
              </svg>
            ))}
          </div>
          <p className="text-white/45 text-xs mb-8">How was your experience with us?</p>

          <div className="w-full space-y-3">
            {/* Google blue review button */}
            <button className="w-full flex items-center justify-center gap-2.5 py-3 text-white font-bold text-sm rounded-xl"
              style={{ background: '#4285F4', boxShadow: '0 0 20px rgba(66,133,244,0.4)' }}>
              <GoogleGLogo size={16} />
              Leave a Review on Google
            </button>
            <button className="w-full py-3 bg-[#1A1A1E] text-white/60 text-sm rounded-xl border border-[#2a2a2a]">
              I had an issue<br /><span className="text-xs text-white/35">Let us make it right</span>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-1 text-[#34A853] text-[10px]">
            <Shield className="w-3 h-3" />
            Your feedback is secure and private.
          </div>
          <p className="text-white/25 text-[10px] mt-1">
            Powered by <span className="text-[#4285F4] font-bold">GMBhub</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: QrCode, title: 'Smart QR Codes', desc: 'AI-generated QR codes that bring customers directly to your review funnel.', color: '#4285F4' },
    { icon: BarChart3, title: 'AI Review Funnel', desc: 'A beautiful, mobile-first experience that makes happy customers leave 5-star reviews.', color: '#34A853' },
    { icon: TrendingUp, title: 'Review Analytics', desc: 'Track reviews, ratings, and growth with real-time insights and smart reports.', color: '#FBBC05' },
    { icon: Bot, title: 'Automated Follow-ups', desc: 'AI sends personalized follow-ups to turn more customers into raving fans.', color: '#4285F4' },
    { icon: Shield, title: 'Reputation Protection', desc: 'Detect negative feedback early and resolve issues before they go public.', color: '#EA4335' },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#34A853]/10 border border-[#34A853]/25 text-[#34A853] text-xs font-semibold tracking-widest mb-6">
              BUILT FOR GROWTH
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-10">
              Everything you need to<br />get more{' '}
              <span className="text-[#34A853]" style={{ textShadow: '0 0 20px rgba(52,168,83,0.4)' }}>5-star reviews</span>
              <br />on Google.
            </h2>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div key={feature.title}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0A0C] border border-[#1A1A1E] hover:border-[#4285F4]/20 transition-all group cursor-default">
                  <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: `${feature.color}18` }}>
                    <feature.icon className="w-4.5 h-4.5" style={{ color: feature.color }} size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{feature.title}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{feature.desc}</p>
                  </div>
                  {/* Google color dot on hover */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feature.color }} />
                  </div>
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

// ─────────────────────────────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Businesses Trust Us', color: '#4285F4' },
    { icon: Star, value: '2M+', label: '5-Star Reviews Generated', color: '#FBBC05' },
    { icon: TrendingUp, value: '4.9★', label: 'Average Rating Increase', color: '#34A853' },
    { icon: Shield, value: '99.3%', label: 'Customer Satisfaction', color: '#4285F4' },
  ];

  return (
    <section className="py-16 border-t border-b border-[#1A1A1E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4">
              <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: `${stat.color}12`, border: `1px solid ${stat.color}22` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs text-white/45">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────────────
function PricingSection({ currency }: { currency: CurrencyConfig }) {
  // Google official colors per plan tier
  const planAccents: Record<string, { border: string; glow: string; btn: string; badge?: string }> = {
    free:       { border: '#34A853', glow: 'rgba(52,168,83,0.15)',  btn: '#34A853' },
    starter:    { border: '#4285F4', glow: 'rgba(66,133,244,0.15)', btn: '#4285F4' },
    pro:        { border: '#FBBC05', glow: 'rgba(251,188,5,0.2)',   btn: '#FBBC05', badge: 'MOST POPULAR' },
    enterprise: { border: '#EA4335', glow: 'rgba(234,67,53,0.15)',  btn: '#EA4335' },
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="orb orb-purple w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4">
            Simple, Transparent Pricing
          </motion.h2>
          <p className="text-white/50 text-lg">
            QR codes are <span className="text-[#34A853] font-semibold">always free</span>.
            Pay only for what you grow into.
          </p>
          {/* Google color stripe under subtitle */}
          <div className="flex justify-center mt-4">
            <GoogleColorStripe className="w-48" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING_PLANS.map((plan, i) => {
            const accent = planAccents[plan.id] ?? planAccents.free;
            return (
              <motion.div key={plan.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border flex flex-col bg-[#0A0A0C] transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${accent.border}40`,
                  boxShadow: plan.highlighted ? `0 0 40px ${accent.glow}` : 'none',
                }}>

                {/* Google color top stripe per plan */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ backgroundColor: accent.border, boxShadow: `0 0 8px ${accent.border}` }} />

                {accent.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-black text-xs font-bold rounded-full"
                    style={{ backgroundColor: accent.btn }}>
                    {accent.badge}
                  </div>
                )}

                <div className="mb-6 pt-2">
                  <p className="text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black">
                      {plan.monthly_price_usd === 0 ? 'Free' : formatPrice(plan.monthly_price_usd, currency)}
                    </span>
                    {plan.monthly_price_usd > 0 && <span className="text-white/35 text-sm mb-1">/mo</span>}
                  </div>
                  <p className="text-xs text-white/35 mt-1">
                    {plan.scan_limit >= 999999 ? 'Unlimited' : formatNumber(plan.scan_limit)} scans/mo
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/65">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent.border }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
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

        {/* Google Partner trust note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex justify-center mt-12">
          <GooglePartnerSeal variant="full" />
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────
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
        <StatsBar />
        <FeaturesSection />
        <PricingSection currency={currency} />

        {/* Final CTA */}
        <section className="py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(66,133,244,0.12) 0%, transparent 60%)',
          }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <div className="flex justify-center mb-6">
              <GMBhubLogo size="lg" animated />
            </div>
            <h2 className="text-5xl font-black mb-6">
              Ready to grow your<br />
              <span className="text-[#34A853]" style={{ textShadow: '0 0 30px rgba(52,168,83,0.4)' }}>
                Google Reviews?
              </span>
            </h2>
            <p className="text-white/50 mb-10 text-lg">
              Join 10,000+ businesses using GMBhub to dominate local search.
            </p>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold text-lg rounded-xl cursor-pointer"
                style={{ background: '#4285F4', boxShadow: '0 0 30px rgba(66,133,244,0.4)' }}>
                Start Free — No Credit Card
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </Link>

            {/* Bottom trust strip */}
            <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
              <GooglePartnerSeal variant="badge" />
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Shield className="w-3.5 h-3.5 text-[#34A853]" />
                SOC 2 Compliant
              </div>
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Check className="w-3.5 h-3.5 text-[#4285F4]" />
                GDPR Ready
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1E] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <GMBhubBrand />
          <p className="text-white/25 text-xs text-center">
            © 2025 GMBhub. All rights reserved. Not affiliated with Google LLC.
            <br />
            <span className="text-white/15">
              "Built with Google Maps API" badge indicates API usage, not official Google partnership.
            </span>
          </p>
          <GooglePartnerSeal variant="compact" />
        </div>
      </footer>
    </>
  );
}
