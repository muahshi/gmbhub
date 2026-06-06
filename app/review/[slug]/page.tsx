'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Info, ExternalLink,
  ChevronDown, MoreHorizontal, Download, Search, BarChart3, LineChart,
} from 'lucide-react';
import { cn, formatNumber, formatPercent, isPositiveGrowth, MOCK_METRICS, MOCK_FEEDBACK_ROWS, generateMockChartData, getInitials } from '@/lib/utils';
import type { OutcomeStatus } from '@/types';

// ── Animated counter ──────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', decimals = 0 }: { value: number; prefix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1100;
    function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(0 + (value) * eased));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <span>{prefix}{display.toLocaleString('en-US')}</span>;
}

// ── Mini sparkline ────────────────────────────────────────────────────
function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28, pad = 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + ((1 - (v - min) / range) * (h - pad * 2));
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = [
    `${pad},${h}`,
    ...data.map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = pad + ((1 - (v - min) / range) * (h - pad * 2));
      return `${x},${y}`;
    }),
    `${w - pad},${h}`,
  ].join(' ');

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#sg-${color.replace('#','')})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
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
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className="p-5 rounded-2xl flex flex-col gap-3 transition-all cursor-default"
      style={{
        background: '#0F0F14',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: iconBg, border: `1px solid ${iconColor}20` }}>
            {IconSVG}
          </div>
          <div>
            <p className="text-xs text-white/40 flex items-center gap-1 mb-0.5">
              {title}
              <Info className="w-3 h-3 text-white/20" />
            </p>
            <p className="text-2xl font-black tracking-tight">
              <AnimatedNumber value={value} prefix={prefix} />
            </p>
          </div>
        </div>
        <MiniSparkline data={sparkData} color={sparkColor} />
      </div>

      <div className={cn('flex items-center gap-1.5 text-xs font-semibold', growth ? 'text-[#34A853]' : 'text-[#EA4335]')}>
        {growth ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {pct}
        <span className="text-white/25 font-normal">vs May 5 – May 11</span>
      </div>
    </motion.div>
  );
}

// ── Custom tooltip ────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-4 py-3 rounded-2xl text-sm"
      style={{ background: '#16161D', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
      <p className="text-xs text-white/40 mb-2.5 font-mono">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2.5 text-xs mb-1.5 last:mb-0">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 6px ${entry.color}` }} />
          <span className="text-white/60">{entry.name}:</span>
          <span className="font-bold text-white">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ── Donut ─────────────────────────────────────────────────────────────
function DonutChart({ value, label, sublabel, color }: { value: number; label: string; sublabel: string; color: string }) {
  const r = 38, circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black">{value}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-bold">{label}</p>
        <p className="text-[10px] text-white/35 flex items-center gap-1">
          <TrendingUp className="w-2.5 h-2.5 text-[#34A853]" />
          {sublabel}
        </p>
      </div>
    </div>
  );
}

// ── Performance chart ─────────────────────────────────────────────────
function PerformanceChart() {
  const data = generateMockChartData(7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      className="p-6 rounded-2xl mb-6"
      style={{ background: '#0F0F14', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-sm">Performance Overview</h3>
          <p className="text-xs text-white/35 mt-0.5">Total Scans · Google Redirects · Intercepted Feedbacks</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 rounded-xl text-xs text-white/60 outline-none hover:text-white transition-colors"
            style={{ background: '#16161D', border: '1px solid rgba(255,255,255,0.08)' }}>
            <option>Daily</option><option>Weekly</option><option>Monthly</option>
          </select>
          <div className="flex items-center gap-1">
            {[LineChart, BarChart3, MoreHorizontal].map((Icon, i) => (
              <button key={i} className={cn(
                'p-1.5 rounded-lg transition-all',
                i === 0 ? 'text-[#4285F4] bg-[#4285F4]/12' : 'text-white/25 hover:text-white/60 hover:bg-white/6'
              )}>
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-5 text-xs text-white/50">
        {[
          { color: '#4285F4', label: 'Total Scans' },
          { color: '#34A853', label: 'Google Redirects' },
          { color: '#FBBC05', label: 'Intercepted Feedbacks' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
            {item.label}
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                {[
                  { id: 'blue', color: '#4285F4' },
                  { id: 'green', color: '#34A853' },
                  { id: 'gold', color: '#FBBC05' },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={`dash-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="totalScans" name="Total Scans"
                stroke="#4285F4" strokeWidth={2} fill="url(#dash-blue)"
                dot={{ fill: '#4285F4', r: 3.5, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#4285F4', strokeWidth: 2, stroke: '#fff' }}
              />
              <Area type="monotone" dataKey="googleReviews" name="Google Redirects"
                stroke="#34A853" strokeWidth={2} fill="url(#dash-green)"
                dot={{ fill: '#34A853', r: 3.5, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#34A853', strokeWidth: 2, stroke: '#fff' }}
              />
              <Area type="monotone" dataKey="interceptedFeedbacks" name="Intercepted Feedbacks"
                stroke="#FBBC05" strokeWidth={2} fill="url(#dash-gold)"
                dot={{ fill: '#FBBC05', r: 3.5, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#FBBC05', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right: donut + top sources */}
        <div className="w-64 flex flex-col gap-6 border-l border-white/6 pl-6">
          <DonutChart value={52.6} label="Scan to Review Rate" sublabel="+14.6% vs last 7 days" color="#4285F4" />

          <div>
            <p className="text-xs font-bold mb-3">Top Traffic Sources</p>
            {[
              { label: 'QR Code Scan', value: 6842, pct: 53, color: '#4285F4' },
              { label: 'Direct Link', value: 3421, pct: 26, color: '#34A853' },
              { label: 'SMS / WhatsApp', value: 1987, pct: 15, color: '#FBBC05' },
              { label: 'Other', value: 592, pct: 6, color: '#EA4335' },
            ].map((s) => (
              <div key={s.label} className="mb-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/60">{s.label}</span>
                  <span className="text-xs text-white/40 font-mono">{s.value.toLocaleString()} ({s.pct}%)</span>
                </div>
                <div className="h-1 rounded-full bg-white/6 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}60` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Star rating ───────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20">
          <polygon
            points="10,1 12.4,7.3 19.5,7.3 14,11.7 16.2,18 10,14 3.8,18 6,11.7 0.5,7.3 7.6,7.3"
            fill={i <= rating ? '#FBBC05' : 'rgba(255,255,255,0.1)'}
            style={i <= rating ? { filter: 'drop-shadow(0 0 3px #FBBC0580)' } : {}}
          />
        </svg>
      ))}
      <span className="text-xs text-white/50 ml-1 font-mono">{rating.toFixed(1)}</span>
    </div>
  );
}

// ── Outcome badge ─────────────────────────────────────────────────────
function OutcomeBadge({ outcome }: { outcome: OutcomeStatus }) {
  const isGoogle = outcome === 'posted_to_google';
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold',
      isGoogle
        ? 'bg-[#34A853]/12 text-[#34A853] border border-[#34A853]/20'
        : 'bg-[#FBBC05]/12 text-[#FBBC05] border border-[#FBBC05]/20'
    )}>
      {isGoogle ? (
        <>
          <div className="w-3 h-3 rounded-sm bg-[#4285F4] flex items-center justify-center text-white text-[8px] font-black shrink-0">G</div>
          Posted on Google
        </>
      ) : (
        <>
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
            <path d="M14 10a1.3 1.3 0 0 1-1.3 1.3H4.7l-2.7 2.7V3.3A1.3 1.3 0 0 1 3.3 2h9.4A1.3 1.3 0 0 1 14 3.3z"/>
          </svg>
          Internal Feedback
        </>
      )}
    </span>
  );
}

// ── Source badge ──────────────────────────────────────────────────────
function SourceBadge({ source }: { source: string }) {
  const isQR = source.toLowerCase().includes('qr');
  const isSMS = source.toLowerCase().includes('whatsapp') || source.toLowerCase().includes('sms');
  return (
    <span className="inline-flex items-center gap-1 text-xs text-white/45">
      {isQR ? (
        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
          <rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/><rect x="1" y="9" width="6" height="6"/>
          <path d="M9 9h2v2H9z M11 11h2v2h-2z" fill="currentColor" stroke="none"/>
        </svg>
      ) : isSMS ? (
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v8H9.5l-3 2.5V11H2z" opacity=".7"/></svg>
      ) : (
        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
          <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z"/><path d="M2 8h12M8 2s-2 2.5-2 6 2 6 2 6M8 2s2 2.5 2 6-2 6-2 6"/>
        </svg>
      )}
      {source}
    </span>
  );
}

// ── Feedback table ────────────────────────────────────────────────────
function FeedbackInbox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? MOCK_FEEDBACK_ROWS : MOCK_FEEDBACK_ROWS.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0F0F14', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
    >
      {/* Table header */}
      <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-sm">Live Feedback Inbox</h3>
          <span className="flex items-center gap-1.5 text-xs text-[#34A853] font-semibold px-2 py-0.5 rounded-full bg-[#34A853]/10 border border-[#34A853]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback..."
              className="pl-8 pr-4 py-1.5 text-xs text-white outline-none placeholder:text-white/25 rounded-xl w-44 transition-all focus:w-56"
              style={{ background: '#16161D', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <select className="px-3 py-1.5 rounded-xl text-xs text-white/60 outline-none"
            style={{ background: '#16161D', border: '1px solid rgba(255,255,255,0.08)' }}>
            <option>All Status</option><option>Positive</option><option>Negative</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white/60 hover:text-white transition-colors"
            style={{ background: '#16161D', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white font-semibold"
            style={{ background: '#4285F4', boxShadow: '0 0 12px rgba(66,133,244,0.3)' }}>
            View All Feedbacks →
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['Time', 'Customer', 'Rating', 'Feedback Type', 'Outcome', 'Source', 'QR / Link', 'Action'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[11px] text-white/30 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.04 }}
                  className="group transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] shrink-0" />
                      <span className="text-xs text-white/45 font-mono whitespace-nowrap">{row.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                        style={{ backgroundColor: row.customer_avatar_color }}>
                        {getInitials(row.customer_name)}
                      </div>
                      <span className="text-sm font-semibold whitespace-nowrap">{row.customer_name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><StarRating rating={row.rating} /></td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold',
                      row.rating >= 4
                        ? 'bg-[#34A853]/12 text-[#34A853] border border-[#34A853]/20'
                        : 'bg-[#EA4335]/12 text-[#EA4335] border border-[#EA4335]/20'
                    )}>
                      {row.rating >= 4 ? '😊 Positive' : '😞 Negative'}
                    </span>
                  </td>
                  <td className="px-5 py-4"><OutcomeBadge outcome={row.outcome} /></td>
                  <td className="px-5 py-4"><SourceBadge source={row.source} /></td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-white/40 font-mono">{row.qr_code_label}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-xs text-[#4285F4] hover:text-white transition-colors font-medium whitespace-nowrap">
                        View Details
                      </button>
                      <button className="p-1 rounded-lg text-white/25 hover:text-white hover:bg-white/8 transition-all">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3.5 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p className="text-xs text-white/30">
          Showing {rows.length} of {MOCK_FEEDBACK_ROWS.length} recent feedbacks
          <span className="ml-3 text-[#34A853]">● Auto-updated 10s ago ↺</span>
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
        >
          {expanded ? 'Show less' : `View all ${MOCK_FEEDBACK_ROWS.length} feedbacks`}
          <ChevronDown className={cn('w-3 h-3 transition-transform', expanded && 'rotate-180')} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Dashboard page ────────────────────────────────────────────────────
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
      iconBg: 'rgba(66,133,244,0.1)', iconColor: '#4285F4',
      sparkData: spark.scans, sparkColor: '#4285F4',
      IconSVG: (
        <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          <path d="M14 14h3v3h-3z M17 17h3v3h-3z" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      title: 'Google Redirects', value: m.google_redirects, prev: m.google_redirects_prev,
      iconBg: 'rgba(52,168,83,0.1)', iconColor: '#34A853',
      sparkData: spark.google, sparkColor: '#34A853',
      IconSVG: (
        <svg className="w-5 h-5 text-[#34A853]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
    {
      title: 'Intercepted Feedbacks', value: m.intercepted_feedbacks, prev: m.intercepted_feedbacks_prev,
      iconBg: 'rgba(251,188,5,0.1)', iconColor: '#FBBC05',
      sparkData: spark.intercept, sparkColor: '#FBBC05',
      IconSVG: (
        <svg className="w-5 h-5 text-[#FBBC05]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      title: 'Estimated ROI', value: m.estimated_roi, prev: m.estimated_roi_prev, prefix: '$',
      iconBg: 'rgba(52,168,83,0.1)', iconColor: '#34A853',
      sparkData: spark.roi, sparkColor: '#34A853',
      IconSVG: (
        <svg className="w-5 h-5 text-[#34A853]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <MetricCard {...m} />
          </motion.div>
        ))}
      </div>

      <PerformanceChart />
      <FeedbackInbox />
    </div>
  );
}
