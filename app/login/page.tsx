'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, ChevronRight, Lock, Heart, Star, MessageCircle } from 'lucide-react';
import { cn, REVIEW_SUGGESTIONS, NEGATIVE_TAGS } from '@/lib/utils';
import { GoogleGLogo, GooglePartnerSeal } from '@/components/ui/google-brand';

type FunnelPhase = 'rating' | 'positive' | 'negative' | 'submitted';

interface BusinessConfig {
  name: string;
  logo: string;
  primaryColor: string;
  accentColor: string;
  googleReviewUrl: string;
  category: string;
  whatsappNumber?: string;
}

const DEMO_BUSINESS: BusinessConfig = {
  name: 'Brewed Bliss Cafe',
  logo: '☕',
  primaryColor: '#D4AF37',
  accentColor: '#FFFFFF',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=DEMO',
  category: 'cafe',
  whatsappNumber: '919876543210',
};

const RATING_LABELS = ['Terrible', 'Poor', 'Okay', 'Good', 'Amazing'];

// ── Star Rating ───────────────────────────────────────────────────────
function StarRatingPicker({ value, onChange, color }: { value: number; onChange: (v: number) => void; color: string }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= (hovered || value);
        return (
          <motion.button
            key={i}
            onClick={() => onChange(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            whileTap={{ scale: 0.85 }}
            animate={filled ? { scale: [1, 1.28, 1.12] } : { scale: 1 }}
            transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
            className="cursor-pointer focus:outline-none"
          >
            <svg viewBox="0 0 24 24" className="w-14 h-14">
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={filled ? color : 'rgba(255,255,255,0.1)'}
                style={filled ? {
                  filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}50)`,
                } : {}}
              />
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Phase 1: Rating ───────────────────────────────────────────────────
function RatingPhase({ business, onRate }: { business: BusinessConfig; onRate: (rating: number) => void }) {
  const [selected, setSelected] = useState(0);

  function handleRate(r: number) {
    setSelected(r);
    setTimeout(() => onRate(r), 450);
  }

  return (
    <motion.div
      key="rating"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-8 py-10"
    >
      {/* Business logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 280 }}
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5"
        style={{
          background: `linear-gradient(135deg, ${business.primaryColor}20 0%, ${business.primaryColor}08 100%)`,
          border: `1px solid ${business.primaryColor}30`,
          boxShadow: `0 0 32px ${business.primaryColor}15`,
        }}
      >
        {business.logo}
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="text-xl font-black mb-1" style={{ color: business.primaryColor }}>
        {business.name}
      </motion.h2>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-white/40 text-xs mb-10">
        Thank you for visiting us today!
      </motion.p>

      <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="text-3xl font-black leading-tight mb-3">
        How was your<br />experience today?
      </motion.h1>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="text-white/45 text-sm mb-10 leading-relaxed">
        Your feedback helps us grow and<br />serve you better.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 250 }}
        className="mb-5"
      >
        <StarRatingPicker value={selected} onChange={handleRate} color={business.primaryColor} />
      </motion.div>

      <AnimatePresence mode="wait">
        {selected > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-6 py-2 rounded-full text-sm font-bold mb-2"
            style={{
              backgroundColor: `${business.primaryColor}18`,
              color: business.primaryColor,
              border: `1px solid ${business.primaryColor}35`,
            }}
          >
            {RATING_LABELS[selected - 1]}
          </motion.div>
        )}
      </AnimatePresence>

      {selected > 0 && (
        <p className="text-white/35 text-xs">You rated us {selected} out of 5 stars</p>
      )}

      <div className="mt-auto pt-12 flex items-center gap-1.5 text-xs text-white/25">
        <Shield className="w-3 h-3" />
        Verified Secure Google OAuth Node
        <Lock className="w-3 h-3" />
      </div>
    </motion.div>
  );
}

// ── Phase 2A: Positive ────────────────────────────────────────────────
function PositivePath({ business, rating, onSubmit }: { business: BusinessConfig; rating: number; onSubmit: () => void }) {
  const suggestions = REVIEW_SUGGESTIONS[business.category] ?? REVIEW_SUGGESTIONS.default;
  const [copied, setCopied] = useState<number | null>(null);
  const [selectedText, setSelectedText] = useState('');

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text).catch(() => {});
    setSelectedText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 3000);
  }

  return (
    <motion.div
      key="positive"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-8 py-10"
    >
      {/* Heart icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center mb-5"
      >
        <Heart className="w-8 h-8 text-[#D4AF37]" fill="currentColor" style={{ filter: 'drop-shadow(0 0 8px #D4AF37)' }} />
      </motion.div>

      <h2 className="text-2xl font-black mb-2">Love our coffee and service?</h2>
      <p className="text-white/45 text-sm mb-8 leading-relaxed">
        Leave a <span className="text-[#FBBC05] font-bold">5-star review</span> and help<br />others discover us.
      </p>

      {/* Review suggestions */}
      <div className="w-full mb-6">
        <p className="text-[10px] font-bold tracking-widest text-white/40 mb-3 text-left uppercase">
          Quick review suggestions
        </p>
        <div className="space-y-2.5">
          {suggestions.map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + idx * 0.07 }}
              onClick={() => handleCopy(text, idx)}
              className={cn(
                'relative p-4 rounded-2xl border text-left cursor-pointer transition-all',
                copied === idx
                  ? 'border-[#34A853]/50 bg-[#34A853]/10'
                  : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/6'
              )}
            >
              <p className="text-sm text-white/75 leading-relaxed pr-8">{text}</p>
              <AnimatePresence>
                {copied === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-[#34A853] text-white text-[10px] rounded-lg font-bold"
                  >
                    <Check className="w-2.5 h-2.5" />
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Google CTA */}
      <motion.a
        href={business.googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-3 py-4 text-white font-bold text-base rounded-2xl mb-3 transition-all"
        style={{ background: '#4285F4', boxShadow: '0 0 32px rgba(66,133,244,0.5), 0 4px 16px rgba(0,0,0,0.4)' }}
      >
        <GoogleGLogo size={20} />
        Leave a Review on Google
        <ChevronRight className="w-5 h-5" />
      </motion.a>

      <p className="text-white/25 text-xs">Opens Google Maps in a new tab</p>
    </motion.div>
  );
}

// ── Phase 2B: Negative ────────────────────────────────────────────────
function NegativePath({ business, onSubmit }: { business: BusinessConfig; onSubmit: () => void }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    const msg = `🔔 New Internal Feedback\nBusiness: ${business.name}\nIssues: ${selectedTags.join(', ')}\nDetails: ${feedbackText || 'No details provided'}`;
    const encoded = encodeURIComponent(msg);
    if (business.whatsappNumber) {
      window.open(`https://wa.me/${business.whatsappNumber}?text=${encoded}`, '_blank');
    }
    await new Promise((r) => setTimeout(r, 1000));
    onSubmit();
  }

  return (
    <motion.div
      key="negative"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-8 py-10"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        className="w-16 h-16 rounded-2xl bg-[#EA4335]/12 border border-[#EA4335]/25 flex items-center justify-center mb-5"
      >
        <MessageCircle className="w-8 h-8 text-[#EA4335]" style={{ filter: 'drop-shadow(0 0 8px #EA4335)' }} />
      </motion.div>

      <h2 className="text-2xl font-black mb-2">I had an issue</h2>
      <p className="text-white/45 text-sm mb-8 leading-relaxed">
        We're sorry to hear that! Let us know<br />what went wrong and we'll make it right.
      </p>

      <div className="w-full mb-5">
        <p className="text-[10px] font-bold tracking-widest text-white/40 mb-3 text-left uppercase">
          What went wrong?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {NEGATIVE_TAGS.map(({ label, icon }) => (
            <motion.button
              key={label}
              onClick={() => toggleTag(label)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                selectedTags.includes(label)
                  ? 'border-[#EA4335]/40 bg-[#EA4335]/12 text-white'
                  : 'border-white/8 bg-white/3 text-white/55 hover:border-white/15'
              )}
            >
              <span>{icon}</span>
              {label}
              {selectedTags.includes(label) && <Check className="w-3 h-3 ml-auto text-[#EA4335]" />}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-full mb-6">
        <p className="text-[10px] font-bold tracking-widest text-white/40 mb-3 text-left uppercase">
          Tell us more (optional)
        </p>
        <div className="relative">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value.slice(0, 500))}
            placeholder="Please share more details so we can make things right..."
            rows={4}
            className="w-full p-4 bg-white/3 border border-white/8 rounded-2xl text-sm text-white/80 placeholder:text-white/25 outline-none resize-none focus:border-[#EA4335]/30 transition-colors"
          />
          <span className="absolute bottom-3 right-4 text-xs text-white/20 font-mono">
            {feedbackText.length}/500
          </span>
        </div>
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={submitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white mb-3 transition-all disabled:opacity-70"
        style={{ background: '#EA4335', boxShadow: '0 0 24px rgba(234,67,53,0.35)' }}
      >
        <Lock className="w-4 h-4" />
        {submitting ? 'Submitting...' : 'Submit Feedback Privately'}
      </motion.button>

      <p className="text-white/25 text-xs">This feedback is private and not posted publicly.</p>
    </motion.div>
  );
}

// ── Thank You ─────────────────────────────────────────────────────────
function ThankYouPhase({ business }: { business: BusinessConfig }) {
  return (
    <motion.div
      key="submitted"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center text-center px-8 py-20"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="text-7xl mb-8"
      >
        🙏
      </motion.div>
      <h2 className="text-3xl font-black mb-3">Thank You!</h2>
      <p className="text-white/45 text-sm leading-relaxed">
        Your feedback has been received.<br />We'll use it to improve your next visit.
      </p>
      <div className="mt-10 flex items-center gap-1.5 text-xs text-white/20">
        Powered by <span style={{ color: '#4285F4' }} className="font-bold">GMBhub</span> AI
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function ReviewFunnelPage({ params }: { params: { slug: string } }) {
  const [phase, setPhase] = useState<FunnelPhase>('rating');
  const [rating, setRating] = useState(0);
  const business = DEMO_BUSINESS;

  function handleRate(r: number) {
    setRating(r);
    setPhase(r >= 4 ? 'positive' : 'negative');
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 55%), #020204' }}>
      <div className="absolute -top-60 -left-60 w-96 h-96 rounded-full bg-[#D4AF37]/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -right-60 w-96 h-96 rounded-full bg-[#4285F4]/6 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

      <motion.div
        layout
        className="funnel-viewport relative z-10 min-h-screen bg-[#060608]"
        style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
        transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* Top bar */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
            <span className="text-[10px] text-white/30 font-mono">Verified Secure Google OAuth Node</span>
            <Lock className="w-2.5 h-2.5 text-white/20" />
          </div>
          <div className="flex gap-1.5">
            {(['rating', 'positive', 'negative'] as const).map((p) => (
              <div key={p} className={cn(
                'h-1 rounded-full transition-all duration-300',
                phase === p ? 'w-4 bg-white' : 'w-1.5 bg-white/20'
              )} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'rating' && <RatingPhase key="rating" business={business} onRate={handleRate} />}
          {phase === 'positive' && <PositivePath key="positive" business={business} rating={rating} onSubmit={() => setPhase('submitted')} />}
          {phase === 'negative' && <NegativePath key="negative" business={business} onSubmit={() => setPhase('submitted')} />}
          {phase === 'submitted' && <ThankYouPhase key="submitted" business={business} />}
        </AnimatePresence>

        {phase !== 'submitted' && (
          <div className="px-6 pb-6 text-center border-t border-white/5 pt-4">
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/20">
              Powered by <span className="font-bold" style={{ color: '#4285F4' }}>GMBhub</span> AI
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
