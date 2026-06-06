// components/ui/gmbhub-logo.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GoogleColorDots } from './google-brand';

export function GMBhubLogo({
  size = 'md',
  animated = false,
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: { icon: 18, text: 'text-base', gap: 'gap-1.5' },
    md: { icon: 22, text: 'text-xl', gap: 'gap-2' },
    lg: { icon: 28, text: 'text-2xl', gap: 'gap-2.5' },
    xl: { icon: 36, text: 'text-4xl', gap: 'gap-3' },
  };

  const s = sizes[size];

  const Icon = (
    <div className="relative">
      {/* Hub icon: stylized G + signal arcs */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 32 32" fill="none">
        {/* Outer arc — Google Blue */}
        <path
          d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4"
          stroke="#4285F4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Middle arc — Google Green */}
        <path
          d="M24 16c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8"
          stroke="#34A853"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Inner dot — Google Yellow */}
        <circle cx="16" cy="16" r="3" fill="#FBBC05" />
        {/* Top right pulse — Google Red */}
        <circle cx="26" cy="6" r="3" fill="#EA4335" />
        <circle cx="26" cy="6" r="5" fill="#EA4335" opacity="0.2" />
      </svg>

      {/* Glow behind icon */}
      {animated && (
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 blur-lg"
          style={{
            background: 'radial-gradient(circle, rgba(66,133,244,0.5) 0%, rgba(52,168,83,0.3) 50%, transparent 70%)',
          }}
        />
      )}
    </div>
  );

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      {Icon}
      <span className={cn('font-black tracking-tight leading-none', s.text)}>
        <span className="text-white">GMB</span>
        <span style={{ color: '#4285F4' }}>hub</span>
      </span>
    </div>
  );
}

// ── Tagline variant ───────────────────────────────────────────────────
export function GMBhubBrand({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <GMBhubLogo size="md" animated />
      <div className="flex items-center gap-1.5 mt-1 ml-[30px]">
        <GoogleColorDots />
        <span className="text-[9px] text-white/30 font-mono tracking-widest">
          MAPS API V3
        </span>
      </div>
    </div>
  );
}
