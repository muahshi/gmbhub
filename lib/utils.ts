// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ChartDataPoint, DashboardMetrics } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function formatPercent(n: number, prev: number): string {
  if (prev === 0) return '+0%';
  const pct = ((n - prev) / prev) * 100;
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
}

export function isPositiveGrowth(n: number, prev: number): boolean {
  return n >= prev;
}

// Mock data generators for demo/dev
export function generateMockChartData(days = 7): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const baseDate = new Date('2025-05-12');

  for (let i = 0; i < days; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const scans = 1000 + Math.floor(Math.random() * 1500);
    const google = Math.floor(scans * (0.45 + Math.random() * 0.1));
    const intercepted = Math.floor(scans * (0.15 + Math.random() * 0.1));

    data.push({ date: label, totalScans: scans, googleReviews: google, interceptedFeedbacks: intercepted });
  }

  return data;
}

export const MOCK_METRICS: DashboardMetrics = {
  total_scans: 12842,
  total_scans_prev: 11432,
  google_redirects: 6421,
  google_redirects_prev: 5544,
  intercepted_feedbacks: 1248,
  intercepted_feedbacks_prev: 1152,
  estimated_roi: 8642,
  estimated_roi_prev: 7260,
};

export const MOCK_FEEDBACK_ROWS = [
  {
    id: '1',
    timestamp: 'May 18, 2025  10:24 AM',
    customer_name: 'Jacob Smith',
    customer_avatar_color: '#4285F4',
    rating: 5,
    outcome: 'posted_to_google' as const,
    source: 'Google Search',
    qr_code_label: 'Front Desk QR',
  },
  {
    id: '2',
    timestamp: 'May 18, 2025  09:58 AM',
    customer_name: 'Lily Wang',
    customer_avatar_color: '#7C3AED',
    rating: 4,
    outcome: 'internal_intercept' as const,
    source: 'Direct Scan',
    qr_code_label: 'Table Tent QR',
  },
  {
    id: '3',
    timestamp: 'May 18, 2025  09:41 AM',
    customer_name: 'Michael Patel',
    customer_avatar_color: '#34A853',
    rating: 5,
    outcome: 'posted_to_google' as const,
    source: 'Google Maps',
    qr_code_label: 'Window Sticker QR',
  },
  {
    id: '4',
    timestamp: 'May 18, 2025  09:16 AM',
    customer_name: 'Sophia Chen',
    customer_avatar_color: '#EA4335',
    rating: 2,
    outcome: 'internal_intercept' as const,
    source: 'Social Media',
    qr_code_label: 'Instagram Bio QR',
  },
  {
    id: '5',
    timestamp: 'May 18, 2025  08:57 AM',
    customer_name: 'Daniel Thompson',
    customer_avatar_color: '#FBBC05',
    rating: 5,
    outcome: 'posted_to_google' as const,
    source: 'Google Search',
    qr_code_label: 'Front Desk QR',
  },
];

export const REVIEW_SUGGESTIONS: Record<string, string[]> = {
  cafe: [
    'Amazing food, cozy ambiance, and super friendly staff. We had a wonderful experience!',
    'The coffee was perfect and the service was top-notch. Highly recommend Brewed Bliss Cafe!',
    'A hidden gem! Everything we tried was delicious. Can\'t wait to visit again.',
  ],
  restaurant: [
    'Outstanding food and exceptional service. Every dish was perfectly prepared!',
    'Best dining experience in the city. Fresh ingredients, great atmosphere, wonderful staff.',
    'Incredible flavors and attentive service. This place never disappoints!',
  ],
  gym: [
    'Amazing facility with top-notch equipment and incredibly supportive trainers!',
    'Best gym experience ever. The coaches are motivating and the environment is energizing.',
    'Clean, well-equipped, and the staff genuinely cares about your progress.',
  ],
  default: [
    'Absolutely fantastic experience! Highly recommend to everyone.',
    'Exceptional service and great value. Will definitely be back!',
    'Outstanding quality and professionalism. 5 stars without hesitation!',
  ],
};

export const NEGATIVE_TAGS = [
  { label: 'Taste Issue', icon: '🍽️' },
  { label: 'Service Delay', icon: '⏱️' },
  { label: 'Hygiene', icon: '🧹' },
  { label: 'Pricing', icon: '💰' },
  { label: 'Portion Size', icon: '📏' },
  { label: 'Ambience', icon: '🎭' },
  { label: 'Other', icon: '💬' },
];

export const AVATAR_COLORS = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444',
  '#10B981', '#F59E0B', '#06B6D4', '#84CC16',
];
