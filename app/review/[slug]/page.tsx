'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, ChevronRight, Lock, Heart } from 'lucide-react';
import { cn, REVIEW_SUGGESTIONS, NEGATIVE_TAGS } from '@/lib/utils';
import { GoogleGLogo, GooglePartnerSeal } from '@/components/ui/google-brand';

// ── Types ─────────────────────────────────────────────────────────────
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

// ── Star Rating Component ─────────────────────────────────────────────
function StarRatingPicker({
  value, onChange, color,
}: { value: number; onChange: (v: number) => void; color: string }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-3 justify-center">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= (hovered || value);
        return (
          <motion.button
            key={i}
            onClick={() => onChange(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            whileTap={{ scale: 0.85 }}
            animate={filled ? { scale: [1, 1.3, 1.15] } : { scale: 1 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="cursor-pointer focus:outline-none"
          >
            <svg viewBox="0 0 24 24" className="w-12 h-12">
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={filled ? color : 'rgba(255,255,255,0.15)'}
                style={filled ? { filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}60)` } : {}}
              />
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Phase 1: Rating ───────────────────────────────────────────────────
function RatingPhase({
  business, onRate,
}: { business: BusinessConfig; onRate: (rating: number) => void }) {
  const [selected, setSelected] = useState(0);

  function handleRate(r: number) {
    setSelected(r);
    setTimeout(() => onRate(r), 400);
  }

  return (
    <motion.div
      key="rating"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6 py-8"
    >
      {/* Business logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
        className="w-20 h-20 rounded-full border-2 flex items-center justify-center text-4xl mb-5"
        style={{ borderColor: `${business.primaryColor}60`, backgroundColor: `${business.primaryColor}15` }}
      >
        {business.logo}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-xl font-black mb-1"
        style={{ color: business.primaryColor }}
      >
        {business.name}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white/50 text-xs mb-8"
      >
        Thank you for visiting us!
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-3xl font-black leading-tight mb-3"
      >
        How was your
        <br />experience today?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/50 text-sm mb-8 leading-relaxed"
      >
        Your feedback helps us grow and
        <br />serve you better.
      </motion.p>

      {/* Stars */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
        className="mb-4"
      >
        <StarRatingPicker
          value={selected}
          onChange={handleRate}
          color={business.primaryColor}
        />
      </motion.div>

      {/* Rating label */}
      <AnimatePresence mode="wait">
        {selected > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-5 py-2 rounded-full text-sm font-bold mb-3"
            style={{ backgroundColor: `${business.primaryColor}20`, color: business.primaryColor, border: `1px solid ${business.primaryColor}40` }}
          >
            {RATING_LABELS[selected - 1]}
          </motion.div>
        )}
      </AnimatePresence>

      {selected > 0 && (
        <p className="text-white/40 text-xs">You rated us {selected} out of 5</p>
      )}

      {/* Security note */}
      <div className="mt-auto pt-10 flex items-center gap-1.5 text-xs text-white/30">
        <Shield className="w-3 h-3" />
        Your feedback is private and secure.
      </div>
    </motion.div>
  );
}

// ── Phase 2A: Positive Path ───────────────────────────────────────────
function PositivePath({
  business, rating, onSubmit,
}: { business: BusinessConfig; rating: number; onSubmit: () => void }) {
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6 py-8"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-5"
      >
        <Check className="w-8 h-8 text-emerald-400" strokeWidth={3} />
      </motion.div>

      <h2 className="text-2xl font-black mb-2">Thanks for the great rating!</h2>
      <p className="text-white/50 text-sm mb-8">
        Mind sharing your experience on Google?
        <br />It means the world to us!
      </p>

      {/* Review suggestions */}
      <div className="w-full mb-6">
        <p className="text-xs font-bold tracking-widest text-emerald-400 mb-3 text-left">
          CHOOSE A REVIEW TO COPY
        </p>
        <div className="space-y-3">
          {suggestions.map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.08 }}
              onClick={() => handleCopy(text, idx)}
              className={cn(
                'relative p-4 rounded-xl border text-left cursor-pointer transition-all group',
                copied === idx
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : selectedText === text
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-[#2a2a2a] bg-[#1a1a1e] hover:border-emerald-500/30 hover:bg-emerald-500/5'
              )}
            >
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 text-xl shrink-0 mt-0.5">"</span>
                <p className="text-sm text-white/80 leading-relaxed">{text}</p>
              </div>

              <AnimatePresence>
                {copied === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white text-xs rounded-lg font-semibold"
                  >
                    <Check className="w-3 h-3" />
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Post to Google CTA — Official Google Blue */}
      <motion.a
        href={business.googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-3 py-4 text-white font-bold text-base rounded-2xl mb-3 transition-all"
        style={{
          background: '#4285F4',
          boxShadow: '0 0 30px rgba(66,133,244,0.45), 0 0 60px rgba(66,133,244,0.15)',
        }}
      >
        <GoogleGLogo size={20} />
        Post Review on Google
        <ChevronRight className="w-5 h-5" />
      </motion.a>

      <p className="text-white/30 text-xs mb-6">It only takes a few seconds!</p>

      <div className="flex items-center gap-1.5 text-xs text-emerald-400/60">
        <Shield className="w-3 h-3" />
        You'll be redirected to Google securely.
      </div>
    </motion.div>
  );
}

// ── Phase 2B: Negative Path ───────────────────────────────────────────
function NegativePath({
  business, onSubmit,
}: { business: BusinessConfig; onSubmit: () => void }) {
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
    // Build WhatsApp message
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6 py-8"
    >
      {/* Broken heart icon */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-16 h-16 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center mb-5"
      >
        <Heart className="w-8 h-8 text-[#7C3AED]" style={{ filter: 'drop-shadow(0 0 8px #7C3AED)' }} />
      </motion.div>

      <h2 className="text-2xl font-black mb-3">We're sorry to hear that.</h2>
      <p className="text-white/50 text-sm mb-8 leading-relaxed">
        Your feedback helps us improve.
        <br />Would you mind telling us more?
      </p>

      {/* Issue tags */}
      <div className="w-full mb-6">
        <p className="text-xs font-bold tracking-widest text-[#7C3AED] mb-3 text-left">
          WHAT WENT WRONG?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {NEGATIVE_TAGS.map(({ label, icon }) => (
            <motion.button
              key={label}
              onClick={() => toggleTag(label)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
                selectedTags.includes(label)
                  ? 'border-[#7C3AED]/60 bg-[#7C3AED]/20 text-white'
                  : 'border-[#2a2a2a] bg-[#1a1a1e] text-white/60 hover:border-[#7C3AED]/30'
              )}
            >
              <span>{icon}</span>
              {label}
              {selectedTags.includes(label) && (
                <Check className="w-3 h-3 ml-auto text-[#7C3AED]" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="w-full mb-6">
        <p className="text-xs font-bold tracking-widest text-[#7C3AED] mb-3 text-left">
          TELL US MORE (OPTIONAL)
        </p>
        <div className="relative">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value.slice(0, 500))}
            placeholder="Please share more details so we can make things right..."
            rows={4}
            className="w-full p-4 bg-[#111113] border border-[#2a2a2a] rounded-xl text-sm text-white/80 placeholder:text-white/25 outline-none resize-none focus:border-[#7C3AED]/50 transition-colors"
          />
          <span className="absolute bottom-2 right-3 text-xs text-white/20 font-mono">
            {feedbackText.length}/500
          </span>
        </div>
      </div>

      {/* Submit button */}
      <motion.button
        onClick={handleSubmit}
        disabled={submitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white mb-4 transition-all disabled:opacity-70"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
          boxShadow: '0 0 30px rgba(124,58,237,0.4)',
        }}
      >
        <Lock className="w-4 h-4" />
        {submitting ? 'Submitting...' : 'Submit Feedback Privately'}
      </motion.button>

      <p className="text-white/30 text-xs mb-2">This feedback is private and not posted publicly.</p>
      <div className="flex items-center gap-1.5 text-xs text-[#7C3AED]/60">
        <Heart className="w-3 h-3" />
        Thank you for helping us improve!
      </div>
    </motion.div>
  );
}

// ── Thank You ─────────────────────────────────────────────────────────
function ThankYouPhase({ business }: { business: BusinessConfig }) {
  return (
    <motion.div
      key="submitted"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center text-center px-6 py-16"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="text-7xl mb-6"
      >
        🙏
      </motion.div>
      <h2 className="text-3xl font-black mb-3">Thank You!</h2>
      <p className="text-white/50 text-sm leading-relaxed">
        Your feedback has been received.
        <br />We'll use it to improve your next visit.
      </p>
      <div className="mt-8 flex items-center gap-1.5 text-xs text-white/25">
        <Zap className="w-3 h-3 text-[#00D4FF]" fill="currentColor" />
        Powered by <span className="text-[#00D4FF]">ReviewPulse AI</span>
      </div>
    </motion.div>
  );
}

// ── Main Funnel Page ──────────────────────────────────────────────────
export default function ReviewFunnelPage({ params }: { params: { slug: string } }) {
  const [phase, setPhase] = useState<FunnelPhase>('rating');
  const [rating, setRating] = useState(0);
  const business = DEMO_BUSINESS; // In production: fetch by params.slug from Supabase

  function handleRate(r: number) {
    setRating(r);
    setPhase(r >= 4 ? 'positive' : 'negative');
  }

  // Background gradient based on phase
  const bgGradient = {
    rating: 'from-[#0D1117] via-[#050508] to-[#030303]',
    positive: 'from-[#071210] via-[#050508] to-[#030303]',
    negative: 'from-[#100A18] via-[#080510] to-[#030303]',
    submitted: 'from-[#0D1117] via-[#050508] to-[#030303]',
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(124,58,237,0.15) 0%, transparent 60%), #030303' }}>
      {/* Ambient blurs outside viewport */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#7C3AED]/10 blur-3xl pointer-events-none animate-orb-drift" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#00D4FF]/10 blur-3xl pointer-events-none animate-orb-drift" style={{ animationDelay: '5s' }} />

      {/* Main funnel card */}
      <motion.div
        layout
        className={cn(
          'funnel-viewport relative z-10 min-h-screen',
          'bg-gradient-to-b',
          bgGradient[phase]
        )}
        transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* Top bar */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
            <span className="text-[10px] text-white/30">Secure Review Portal</span>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {(['rating', 'positive', 'negative'] as const).map((p) => (
              <div
                key={p}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all',
                  phase === p ? 'bg-white scale-125' : 'bg-white/20'
                )}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'rating' && (
            <RatingPhase key="rating" business={business} onRate={handleRate} />
          )}
          {phase === 'positive' && (
            <PositivePath key="positive" business={business} rating={rating} onSubmit={() => setPhase('submitted')} />
          )}
          {phase === 'negative' && (
            <NegativePath key="negative" business={business} onSubmit={() => setPhase('submitted')} />
          )}
          {phase === 'submitted' && (
            <ThankYouPhase key="submitted" business={business} />
          )}
        </AnimatePresence>

        {/* Footer */}
        {phase !== 'submitted' && (
          <div className="px-6 pb-6 text-center space-y-2">
            {/* Google Partner seal on funnel */}
            <div className="flex justify-center">
              <GooglePartnerSeal variant="badge" />
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/20">
              Powered by{' '}
              <span className="font-bold" style={{ color: '#4285F4' }}>GMBhub</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
