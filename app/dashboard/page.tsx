'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, Info, ExternalLink,
  ChevronDown, MoreHorizontal
} from 'lucide-react';
import { cn, formatNumber, formatPercent, isPositiveGrowth, MOCK_METRICS, MOCK_FEEDBACK_ROWS, generateMockChartData, getInitials } from '@/lib/utils';
import type { OutcomeStatus } from '@/types';

// ── Animated counter ─────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', decimals = 0 }: { value: number; prefix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1200;
    const startVal = 0;

    function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(startVal + (value - startVal) * eased));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return (
    <span>
      {prefix}
      {decimals > 0
        ? display.toLocaleString('en-US', { maximumFractionDigits: decimals })
        : display.toLocaleString('en-US')}
    </span>
  );
}

// ── Mini sparkline ────────────────────────────────────────────────────
function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32, pad = 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + ((1 - (v - min) / range) * (h - pad * 2));
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <filter id={`glow-${color.replace('#', '')}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#glow-${color.replace('#', '')})`}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

// ── Metric Card ───────────────────────────────────────────────────────
interface MetricCardProps {
  title: string;
  value: number;
  prev: number;
  prefix?: string;
  iconBg: string;
  iconColor: string;
  sparkData: number[];
  sparkColor: string;
  IconSVG: React.ReactNode;
}

function MetricCard({ title, value, prev, prefix = '', iconBg, iconColor, sparkData, sparkColor, IconSVG }: MetricCardProps) {
  const growth = isPositiveGrowth(value, prev);
  const pct = formatPercent(value, prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="p-5 rounded-2xl bg-[#0A0A0C] border border-[#1A1A1E] hover:border-[#242428] transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
            {IconSVG}
          </div>
          <div>
            <p className="text-xs text-white/50 flex items-center gap-1">
              {title}
              <Info className="w-3 h-3 text-white/30" />
            </p>
            <p className="text-2xl font-black tracking-tight mt-0.5">
              <AnimatedNumber value={value} prefix={prefix} />
            </p>
          </div>
        </div>
        <MiniSparkline data={sparkData} color={sparkColor} />
      </div>

      <div className={cn(
        'flex items-center gap-1.5 text-xs font-semibold',
        growth ? 'text-[#00FF87]' : 'text-red-400'
      )}>
        {growth ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {pct}
        <span className="text-white/30 font-normal">vs May 5 – May 11</span>
      </div>
    </motion.div>
  );
}

// ── Custom Chart Tooltip ──────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-dark px-4 py-3 rounded-xl border border-[#242428]">
      <p className="text-xs text-white/50 mb-2 font-mono">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-white/70">{entry.name}:</span>
          <span className="font-bold">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ── Performance Chart ─────────────────────────────────────────────────
function PerformanceChart() {
  const data = generateMockChartData(7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-6 rounded-2xl bg-[#0A0A0C] border border-[#1A1A1E] mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold">Scans vs Reviews Over Time</h3>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 rounded-lg bg-[#111113] border border-[#1A1A1E] text-xs text-white/70 outline-none">
            <option>Daily</option><option>Weekly</option><option>Monthly</option>
          </select>
          <div className="flex items-center gap-1">
            {[
              <svg key="line" className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M2 12L6 8L10 10L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              <svg key="bar" className="w-4 h-4" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="3" height="8" fill="currentColor" opacity="0.6"/><rect x="6.5" y="3" width="3" height="11" fill="currentColor" opacity="0.6"/><rect x="11" y="5" width="3" height="9" fill="currentColor" opacity="0.6"/></svg>,
              <svg key="grid" className="w-4 h-4" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/></svg>,
            ].map((icon, i) => (
              <button key={i} className={cn(
                'p-1.5 rounded-lg transition-all',
                i === 0 ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 'text-white/30 hover:text-white/60 hover:bg-[#1A1A1E]'
              )}>
                {icon}
              </button>
            ))}
            <button className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-[#1A1A1E] transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4 text-xs text-white/60">
        {[
          { color: '#00D4FF', label: 'Total Scans' },
          { color: '#00FF87', label: 'Google Reviews (Posted)' },
          { color: '#F59E0B', label: 'Intercepted Feedbacks' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
            {item.label}
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            {[
              { id: 'cyan', color: '#00D4FF' },
              { id: 'green', color: '#00FF87' },
              { id: 'gold', color: '#F59E0B' },
            ].map(({ id, color }) => (
              <linearGradient key={id} id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="date" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} />
          <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />

          <Area type="monotone" dataKey="totalScans" name="Total Scans"
            stroke="#00D4FF" strokeWidth={2.5} fill="url(#grad-cyan)"
            dot={{ fill: '#00D4FF', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#00D4FF', strokeWidth: 0 }}
            style={{ filter: 'drop-shadow(0 0 8px #00D4FF)' }}
          />
          <Area type="monotone" dataKey="googleReviews" name="Google Reviews"
            stroke="#00FF87" strokeWidth={2.5} fill="url(#grad-green)"
            dot={{ fill: '#00FF87', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#00FF87', strokeWidth: 0 }}
            style={{ filter: 'drop-shadow(0 0 8px #00FF87)' }}
          />
          <Area type="monotone" dataKey="interceptedFeedbacks" name="Intercepted"
            stroke="#F59E0B" strokeWidth={2.5} fill="url(#grad-gold)"
            dot={{ fill: '#F59E0B', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#F59E0B', strokeWidth: 0 }}
            style={{ filter: 'drop-shadow(0 0 8px #F59E0B)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ── Star Rating ───────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20">
          <polygon
            points="10,1 12.4,7.3 19.5,7.3 14,11.7 16.2,18 10,14 3.8,18 6,11.7 0.5,7.3 7.6,7.3"
            fill={i <= rating ? '#F59E0B' : 'rgba(255,255,255,0.15)'}
            style={i <= rating ? { filter: 'drop-shadow(0 0 3px #F59E0B)' } : {}}
          />
        </svg>
      ))}
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────
function StatusBadge({ outcome }: { outcome: OutcomeStatus }) {
  const isGoogle = outcome === 'posted_to_google';
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
      isGoogle
        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
        : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
    )}>
      {isGoogle ? (
        <>
          <svg className="w-3 h-3" viewBox="0 0 24 24"><text y="18" fontSize="14">G</text></svg>
          Posted on Google
        </>
      ) : (
        <>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          Internal Feedback Saved
        </>
      )}
    </span>
  );
}

// ── Feedback Table ────────────────────────────────────────────────────
function FeedbackInbox() {
  const [expanded, setExpanded] = useState(false);
  const displayRows = expanded ? MOCK_FEEDBACK_ROWS : MOCK_FEEDBACK_ROWS.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl bg-[#0A0A0C] border border-[#1A1A1E] overflow-hidden"
    >
      <div className="px-6 py-4 flex items-center justify-between border-b border-[#1A1A1E]">
        <div className="flex items-center gap-3">
          <h3 className="font-bold">Live Feedback Inbox</h3>
          <span className="flex items-center gap-1.5 text-xs text-[#00FF87]">
            <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
            Live
          </span>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
          View All Feedbacks <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A1A1E]">
              {['Timestamp', 'Customer', 'Rating', 'Outcome Status', 'Source', 'QR Code', 'Action'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {displayRows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-[#111113] hover:bg-[#111113]/50 transition-colors group"
                >
                  <td className="px-5 py-3.5 text-xs text-white/50 font-mono whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: row.customer_avatar_color }}
                      >
                        {getInitials(row.customer_name)}
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">{row.customer_name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><StarRating rating={row.rating} /></td>
                  <td className="px-5 py-3.5"><StatusBadge outcome={row.outcome} /></td>
                  <td className="px-5 py-3.5 text-xs text-white/50">{row.source}</td>
                  <td className="px-5 py-3.5 text-xs text-white/50 font-mono">{row.qr_code_label}</td>
                  <td className="px-5 py-3.5">
                    <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00D4FF] transition-colors">
                      View Details <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 text-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mx-auto"
        >
          {expanded ? 'Show less' : 'View more feedbacks'}
          <ChevronDown className={cn('w-3 h-3 transition-transform', expanded && 'rotate-180')} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────
export default function DashboardPage() {
  const m = MOCK_METRICS;

  const spark = {
    scans: [900, 1100, 1400, 1600, 2000, 1800, 1900, 2100],
    google: [400, 550, 700, 800, 1050, 950, 1000, 1050],
    intercept: [150, 180, 200, 250, 300, 280, 290, 310],
    roi: [3000, 4000, 5500, 6200, 7800, 7100, 7600, 8100],
  };

  const metrics: MetricCardProps[] = [
    {
      title: 'Total Scans', value: m.total_scans, prev: m.total_scans_prev,
      iconBg: 'rgba(0,212,255,0.1)', iconColor: '#00D4FF',
      sparkData: spark.scans, sparkColor: '#00D4FF',
      IconSVG: (
        <svg className="w-5 h-5 text-[#00D4FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          <path d="M14 14h3v3h-3z M17 17h3v3h-3z M14 17h3v3h-3z" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      title: 'Google Redirects', value: m.google_redirects, prev: m.google_redirects_prev,
      iconBg: 'rgba(124,58,237,0.1)', iconColor: '#7C3AED',
      sparkData: spark.google, sparkColor: '#7C3AED',
      IconSVG: (
        <svg className="w-5 h-5 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      ),
    },
    {
      title: 'Intercepted Feedbacks', value: m.intercepted_feedbacks, prev: m.intercepted_feedbacks_prev,
      iconBg: 'rgba(245,158,11,0.1)', iconColor: '#F59E0B',
      sparkData: spark.intercept, sparkColor: '#F59E0B',
      IconSVG: (
        <svg className="w-5 h-5 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      title: 'Estimated ROI', value: m.estimated_roi, prev: m.estimated_roi_prev, prefix: '$',
      iconBg: 'rgba(0,255,135,0.1)', iconColor: '#00FF87',
      sparkData: spark.roi, sparkColor: '#00FF87',
      IconSVG: (
        <svg className="w-5 h-5 text-[#00FF87]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <MetricCard {...m} />
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <PerformanceChart />

      {/* Feedback inbox */}
      <FeedbackInbox />
    </div>
  );
}
