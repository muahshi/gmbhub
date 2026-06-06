// components/ui/google-brand.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ── Official Google G SVG ─────────────────────────────────────────────
export function GoogleGLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ── Google Maps API Partner Seal ──────────────────────────────────────
export function GooglePartnerSeal({
  variant = 'full',
  className,
}: {
  variant?: 'full' | 'compact' | 'badge';
  className?: string;
}) {
  if (variant === 'badge') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
          'bg-white/[0.04] border border-white/10',
          'hover:border-[#4285F4]/30 transition-all cursor-default select-none',
          className
        )}
      >
        <GoogleGLogo size={14} />
        <span className="text-[10px] text-white/50 font-medium tracking-wide">
          Built with Google Maps API
        </span>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A0A0C] border border-[#1A1A1E]">
          <GoogleGLogo size={12} />
          <span className="text-[10px] text-white/40 font-mono">Maps API v3</span>
        </div>
      </div>
    );
  }

  // Full variant — for footer / trust sections
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'inline-flex items-center gap-3 px-4 py-2.5 rounded-xl',
        'bg-[#0A0A0C] border border-[#1A1A1E]',
        'hover:border-[#4285F4]/25 transition-all duration-300',
        className
      )}
    >
      {/* Google G icon with subtle glow */}
      <div className="relative">
        <GoogleGLogo size={18} />
        <div className="absolute inset-0 blur-sm opacity-30">
          <GoogleGLogo size={18} />
        </div>
      </div>

      <div className="border-l border-white/10 pl-3">
        <p className="text-[10px] text-white/30 leading-none mb-0.5 font-mono uppercase tracking-widest">
          Secured with
        </p>
        <p className="text-xs text-white/70 font-semibold leading-none">
          Google Maps API V3
        </p>
      </div>

      {/* Verified checkmark */}
      <div className="w-5 h-5 rounded-full bg-[#34A853]/20 border border-[#34A853]/40 flex items-center justify-center ml-1">
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#34A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

// ── "Sign in with Google" OAuth Button ───────────────────────────────
export function GoogleOAuthButton({
  onClick,
  loading = false,
  label = 'Continue with Google',
  className,
}: {
  onClick?: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.01, boxShadow: '0 0 0 1px rgba(66,133,244,0.5), 0 4px 20px rgba(66,133,244,0.15)' }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative w-full flex items-center justify-center gap-3',
        'px-6 py-3.5 rounded-xl font-semibold text-sm',
        'bg-white text-[#1f1f1f]',
        'border border-white/20',
        'transition-all duration-200',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'shadow-[0_2px_12px_rgba(0,0,0,0.3)]',
        className
      )}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="w-5 h-5 border-2 border-[#4285F4]/30 border-t-[#4285F4] rounded-full"
        />
      ) : (
        <GoogleGLogo size={20} />
      )}
      <span>{loading ? 'Connecting...' : label}</span>
    </motion.button>
  );
}

// ── Google Review CTA Button (with exact Google colors) ───────────────
export function GoogleReviewButton({
  href,
  onClick,
  size = 'lg',
  className,
}: {
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-xs gap-2',
    md: 'px-5 py-3 text-sm gap-2.5',
    lg: 'px-6 py-4 text-base gap-3',
  };

  const iconSize = { sm: 16, md: 18, lg: 20 };

  const inner = (
    <>
      <GoogleGLogo size={iconSize[size]} />
      <span className="font-bold">Post Review on Google</span>
      <svg className="w-4 h-4 opacity-70" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  const classes = cn(
    'relative flex items-center justify-center rounded-2xl font-semibold',
    'transition-all duration-200',
    // Google Blue → Google Green gradient on hover
    'bg-[#4285F4] text-white',
    'hover:bg-[#3367D6]',
    'shadow-[0_0_20px_rgba(66,133,244,0.35),0_0_40px_rgba(66,133,244,0.15)]',
    'hover:shadow-[0_0_30px_rgba(66,133,244,0.5),0_0_60px_rgba(66,133,244,0.2)]',
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {inner}
    </motion.button>
  );
}

// ── Google Multi-color divider (4-dot brand indicator) ────────────────
export function GoogleColorDots({ className }: { className?: string }) {
  const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {colors.map((c) => (
        <div
          key={c}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: c, boxShadow: `0 0 4px ${c}80` }}
        />
      ))}
    </div>
  );
}

// ── Google color accent stripe (4-color line) ─────────────────────────
export function GoogleColorStripe({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-0.5 rounded-full overflow-hidden', className)}>
      {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c) => (
        <div key={c} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}
