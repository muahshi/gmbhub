'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, MessageSquare, Heart } from 'lucide-react';
import { GoogleGLogo } from '@/components/ui/google-brand';

// ─────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────
interface Business {
  name: string;
  google_review_url: string;
  logo_emoji?: string;
}

// ─────────────────────────────────────────────────────────────────────
//  3D Gold Star Component
// ─────────────────────────────────────────────────────────────────────
function GoldStar({ index, selected, hovered, onHover, onLeave, onClick }: {
  index: number;
  selected: boolean;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const lit = hovered || selected;

  return (
    <motion.button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      animate={lit ? { scale: 1.12, y: -3 } : { scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      className="relative focus:outline-none"
      aria-label={`Rate ${index} star${index !== 1 ? 's' : ''}`}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        className="relative z-10"
      >
        <defs>
          {/* 3D gradient fill */}
          <radialGradient id={`star3d-${index}`} cx="42%" cy="22%" r="72%">
            <stop offset="0%" stopColor="#FFF0A0" />
            <stop offset="28%" stopColor="#FFD93D" />
            <stop offset="62%" stopColor="#FBBC05" />
            <stop offset="100%" stopColor="#C87000" />
          </radialGradient>
          {/* Shadow gradient */}
          <radialGradient id={`starShadow-${index}`} cx="50%" cy="85%" r="65%">
            <stop offset="0%" stopColor="#7A4400" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7A4400" stopOpacity="0" />
          </radialGradient>
          {/* Rim light */}
          <linearGradient id={`starRim-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,200,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Bottom glow shadow */}
        {lit && (
          <ellipse cx="26" cy="48" rx="16" ry="3"
            fill={`url(#starShadow-${index})`}
            style={{ filter: 'blur(3px)' }}
          />
        )}

        {/* Main star shape */}
        <polygon
          points="26,4 31.4,18.5 47.5,18.5 34.8,27.6 39.5,42.5 26,33.5 12.5,42.5 17.2,27.6 4.5,18.5 20.6,18.5"
          fill={lit ? `url(#star3d-${index})` : 'rgba(255,255,255,0.12)'}
          style={{
            filter: lit
              ? `drop-shadow(0 0 10px rgba(251,188,5,0.9)) drop-shadow(0 0 24px rgba(251,188,5,0.5)) drop-shadow(0 3px 6px rgba(0,0,0,0.5))`
              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
            transition: 'filter 0.2s, fill 0.15s',
          }}
        />

        {/* Rim light overlay when lit */}
        {lit && (
          <polygon
            points="26,4 31.4,18.5 47.5,18.5 34.8,27.6 39.5,42.5 26,33.5 12.5,42.5 17.2,27.6 4.5,18.5 20.6,18.5"
            fill={`url(#starRim-${index})`}
            opacity={0.45}
          />
        )}

        {/* Sparkle glint when selected */}
        {selected && (
          <>
            <circle cx="18" cy="12" r="1.5" fill="rgba(255,255,220,0.9)" />
            <circle cx="36" cy="10" r="1" fill="rgba(255,255,200,0.7)" />
          </>
        )}
      </svg>

      {/* Floor glow */}
      {lit && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full"
          style={{ background: 'rgba(251,188,5,0.5)', filter: 'blur(4px)' }}
        />
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Mobile Review Funnel Screen
// ─────────────────────────────────────────────────────────────────────
function ReviewScreen({ business, onGoogleClick, onIssueClick }: {
  business: Business;
  onGoogleClick: () => void;
  onIssueClick: () => void;
}) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const handleStarClick = (n: number) => {
    setSelectedStar(n);
    if (n >= 4) {
      setTimeout(onGoogleClick, 600);
    } else {
      setTimeout(onIssueClick, 600);
    }
  };

  return (
    <div className="flex flex-col items-center px-7 py-8 h-full relative">
      {/* Cafe background blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
        <div className="absolute top-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(180deg, rgba(40,20,0,0.8) 0%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)' }} />
        {/* Warm lamp glow */}
        <div className="absolute top-16 right-8 w-28 h-28 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,160,50,0.2) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        <div className="absolute top-32 left-4 w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,140,30,0.15) 0%, transparent 70%)', filter: 'blur(15px)' }} />
      </div>

      {/* Business logo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 16 }}
        className="relative mb-4 z-10"
      >
        <div
          className="w-16 h-16 flex items-center justify-center text-3xl"
          style={{
            background: 'linear-gradient(145deg, rgba(251,188,5,0.15) 0%, rgba(0,0,0,0.4) 100%)',
            border: '1.5px solid rgba(251,188,5,0.35)',
            borderRadius: '20px',
            boxShadow: '0 0 24px rgba(251,188,5,0.25), 0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          ☕
        </div>
        {/* Golden rim glow */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,220,100,0.3)' }}
        />
      </motion.div>

      {/* Business name — Playfair Display */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-xl font-bold text-center mb-1 z-10"
        style={{
          fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
          color: '#F5E6C0',
          letterSpacing: '0.01em',
          textShadow: '0 2px 12px rgba(0,0,0,0.8)',
        }}
      >
        {business.name}
      </motion.h2>

      {/* Decorative divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.28 }}
        className="flex items-center gap-2 mb-4 z-10"
      >
        <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,188,5,0.4))' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(251,188,5,0.5)' }} />
        <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, rgba(251,188,5,0.4), transparent)' }} />
      </motion.div>

      {/* Question — Playfair Display */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-center mb-3 z-10 leading-tight"
        style={{
          fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
          color: '#FFFFFF',
          textShadow: '0 2px 20px rgba(0,0,0,0.9)',
        }}
      >
        How was your<br />experience today?
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.36 }}
        className="text-white/45 text-xs text-center mb-7 z-10 leading-relaxed"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        Your feedback helps us grow and<br />serve you better.
      </motion.p>

      {/* 3D Stars */}
      <motion.div
        className="flex items-center gap-1.5 mb-8 z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, type: 'spring', stiffness: 160, damping: 18 }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <GoldStar
            key={n}
            index={n}
            selected={n <= selectedStar}
            hovered={n <= hoveredStar}
            onHover={() => setHoveredStar(n)}
            onLeave={() => setHoveredStar(0)}
            onClick={() => handleStarClick(n)}
          />
        ))}
      </motion.div>

      {/* Prompt card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full mb-3 z-10"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '14px 16px',
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
            style={{
              background: 'rgba(251,188,5,0.1)',
              border: '1px solid rgba(251,188,5,0.2)',
            }}
          >
            <Heart className="w-4 h-4" style={{ color: '#FBBC05' }} />
          </div>
          <div>
            <p className="text-white text-xs font-semibold mb-0.5">Love our coffee and service?</p>
            <p className="text-white/45 text-xs leading-relaxed">
              Leave a{' '}
              <span className="font-bold" style={{ color: '#FBBC05' }}>5-star review</span>
              {' '}and help others discover us.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Google Review CTA */}
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56 }}
        onClick={onGoogleClick}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm text-white mb-3 z-10 relative overflow-hidden"
        style={{
          background: '#4285F4',
          boxShadow: '0 0 32px rgba(66,133,244,0.55), 0 0 64px rgba(66,133,244,0.15), 0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        <GoogleGLogo size={20} />
        <span className="flex-1 text-center">Leave a Review on Google</span>
        <ArrowRight className="w-4 h-4 opacity-80" />
        {/* Shimmer */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.5s infinite',
        }} />
      </motion.button>

      {/* Issue CTA */}
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62 }}
        onClick={onIssueClick}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm text-white/50 mb-6 z-10 hover:bg-white/[0.06] transition-colors"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <MessageSquare className="w-4 h-4 shrink-0 text-white/30" />
        <span className="flex-1 text-left">I had an issue — Let us make it right</span>
        <ArrowRight className="w-3.5 h-3.5 opacity-40" />
      </motion.button>

      {/* Trust seal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-2 text-[10px] text-[#34A853] z-10"
        style={{ textShadow: '0 0 10px rgba(52,168,83,0.5)' }}
      >
        <Shield className="w-3.5 h-3.5" />
        Verified Secure Google OAuth Node
        <svg className="w-3 h-3 text-white/20 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 16 16">
          <rect x="4" y="7" width="8" height="7" rx="1" />
          <path d="M5 7V5a3 3 0 0 1 6 0v2" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Issue / Private Feedback Screen
// ─────────────────────────────────────────────────────────────────────
function IssueScreen({ business, onBack }: { business: Business; onBack: () => void }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col h-full px-7 py-8 items-center relative">
      <button onClick={onBack} className="self-start text-white/30 text-xs flex items-center gap-1 mb-6 hover:text-white transition-colors">
        ← Back
      </button>

      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(234,67,53,0.1)', border: '1px solid rgba(234,67,53,0.25)' }}>
        <MessageSquare className="w-5 h-5 text-[#EA4335]" />
      </div>

      <h3 className="text-xl font-bold text-center mb-2"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Let us make it right
      </h3>
      <p className="text-white/40 text-xs text-center mb-6 leading-relaxed">
        Your feedback is private and will<br />go directly to the team.
      </p>

      {!sent ? (
        <>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Tell us what happened…"
            rows={5}
            className="w-full text-sm text-white placeholder:text-white/25 outline-none resize-none rounded-xl p-4 mb-4"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          />
          <button
            onClick={() => msg && setSent(true)}
            disabled={!msg}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all disabled:opacity-40"
            style={{
              background: msg ? '#EA4335' : 'rgba(234,67,53,0.4)',
              boxShadow: msg ? '0 0 24px rgba(234,67,53,0.4)' : 'none',
            }}
          >
            Send Private Feedback
          </button>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(52,168,83,0.15)', border: '1px solid rgba(52,168,83,0.3)' }}>
            <span className="text-3xl">✓</span>
          </div>
          <p className="font-bold mb-1">Thank you for your feedback</p>
          <p className="text-white/40 text-xs">We'll be in touch shortly to make things right.</p>
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Phone Chassis Wrapper (desktop view)
// ─────────────────────────────────────────────────────────────────────
function PhoneChassis({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[375px] flex-shrink-0">
      {/* Multi-layer ambient glow behind phone */}
      <div className="absolute inset-0 scale-110 translate-y-8 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(251,188,5,0.25) 0%, rgba(66,133,244,0.12) 35%, transparent 70%)',
          filter: 'blur(55px)',
        }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[30px]"
        style={{
          background: 'rgba(52,168,83,0.35)',
          filter: 'blur(25px)',
          borderRadius: '50%',
        }} />

      {/* Phone body */}
      <div
        className="relative z-10 overflow-hidden flex flex-col"
        style={{
          borderRadius: '50px',
          background: '#000',
          border: '1.5px solid rgba(255,255,255,0.14)',
          boxShadow: `
            0 0 0 0.5px rgba(255,255,255,0.06),
            0 40px 100px rgba(0,0,0,0.95),
            0 0 80px rgba(251,188,5,0.1),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(255,255,255,0.04)
          `,
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-8 pt-4 pb-3 shrink-0"
          style={{ background: 'rgba(0,0,0,0.95)' }}
        >
          <span className="text-[13px] font-bold text-white" style={{ fontFamily: "'SF Pro Display', system-ui" }}>9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <svg width="18" height="12" viewBox="0 0 18 12" fill="white" opacity={0.85}>
              <rect x="0" y="8" width="3" height="4" rx="0.5" />
              <rect x="5" y="5" width="3" height="7" rx="0.5" />
              <rect x="10" y="2" width="3" height="10" rx="0.5" />
              <rect x="15" y="0" width="3" height="12" rx="0.5" />
            </svg>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="white" strokeWidth={1.2} opacity={0.85}>
              <path d="M1 4C3.8 1.5 7 0 8 0s4.2 1.5 7 4" /><path d="M3 7c1.4-1.5 3-2.3 5-2.3s3.6.8 5 2.3" />
              <circle cx="8" cy="10.5" r="1.2" fill="white" stroke="none" />
            </svg>
            {/* Battery */}
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" opacity={0.85}>
              <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="white" strokeOpacity={0.5} />
              <rect x="2" y="2" width="18" height="9" rx="2" fill="white" />
              <path d="M23.5 4.5v4a2 2 0 0 0 0-4z" fill="white" fillOpacity={0.4} />
            </svg>
          </div>
        </div>

        {/* Dynamic island notch */}
        <div className="flex justify-center -mt-1 mb-1 shrink-0">
          <div className="w-24 h-6 rounded-full" style={{ background: '#000' }} />
        </div>

        {/* Screen content with cafe bg */}
        <div
          className="relative overflow-hidden flex-1"
          style={{
            minHeight: '680px',
            background: `
              radial-gradient(ellipse at 70% 25%, rgba(120,60,10,0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 60%, rgba(80,40,5,0.6) 0%, transparent 50%),
              linear-gradient(180deg, #1A0E00 0%, #0A0600 40%, #000000 100%)
            `,
          }}
        >
          {children}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-3 shrink-0" style={{ background: '#000' }}>
          <div className="w-28 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────────
export default function ReviewPage({ params }: { params: { slug: string } }) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState<'review' | 'issue'>('review');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/business/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setBusiness(data.business ?? null);
        }
      } catch (_) {}
      finally { setLoading(false); }
    }
    load();
  }, [params.slug]);

  const fallbackBusiness: Business = {
    name: 'Brewed Bliss Cafe',
    google_review_url: '#',
  };

  const biz = business ?? fallbackBusiness;

  function handleGoogleClick() {
    if (biz.google_review_url && biz.google_review_url !== '#') {
      window.open(biz.google_review_url, '_blank', 'noopener');
    }
  }

  // ── Mobile (narrow viewport) — full screen ──────────────────────────
  const MobileView = (
    <div
      className="min-h-screen flex flex-col funnel-viewport"
      style={{
        background: `
          radial-gradient(ellipse at 70% 25%, rgba(120,60,10,0.8) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 60%, rgba(80,40,5,0.6) 0%, transparent 50%),
          linear-gradient(180deg, #1A0E00 0%, #0A0600 40%, #000000 100%)
        `,
      }}
    >
      <AnimatePresence mode="wait">
        {screen === 'review' ? (
          <motion.div key="review" className="flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
            <ReviewScreen business={biz} onGoogleClick={handleGoogleClick} onIssueClick={() => setScreen('issue')} />
          </motion.div>
        ) : (
          <motion.div key="issue" className="flex-1 flex flex-col" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <IssueScreen business={biz} onBack={() => setScreen('review')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // ── Desktop (wide viewport) — phone chassis ──────────────────────────
  const DesktopView = (
    <div
      className="min-h-screen flex items-center justify-center p-12 relative overflow-hidden"
      style={{ background: '#020204' }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.06) 0%, rgba(251,188,5,0.04) 40%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute top-0 left-0 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(251,188,5,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="animate-float"
      >
        <PhoneChassis>
          <AnimatePresence mode="wait">
            {screen === 'review' ? (
              <motion.div key="review" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
                <ReviewScreen business={biz} onGoogleClick={handleGoogleClick} onIssueClick={() => setScreen('issue')} />
              </motion.div>
            ) : (
              <motion.div key="issue" className="h-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <IssueScreen business={biz} onBack={() => setScreen('review')} />
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneChassis>
      </motion.div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020204' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-2 rounded-full"
          style={{ borderColor: 'rgba(251,188,5,0.2)', borderTopColor: '#FBBC05' }}
        />
      </div>
    );
  }

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">{MobileView}</div>
      {/* Desktop */}
      <div className="hidden md:block">{DesktopView}</div>
    </>
  );
}
