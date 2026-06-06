// types/index.ts

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise';
export type OutcomeStatus = 'posted_to_google' | 'internal_intercept';
export type UserRole = 'master_admin' | 'business_owner' | 'team_member';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface BusinessBrandConfig {
  primary_brand_color: string;
  accent_color: string;
  business_bg: string | null;
  logo_url: string | null;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  slug: string; // e.g. "brewed-bliss"
  place_id: string; // Google Maps place_id
  google_review_url: string;
  brand_config: BusinessBrandConfig;
  subscription_plan: SubscriptionPlan;
  subscription_renews_at: string;
  scan_limit: number;
  scans_used: number;
  whatsapp_number: string | null;
  category: string; // e.g. 'cafe', 'restaurant', 'gym'
  landing_page_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewAnalytics {
  id: string;
  business_id: string;
  scanned_at: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  outcome: OutcomeStatus | null;
  source: string; // 'Google Search' | 'Direct Scan' | 'Google Maps' | 'Social Media'
  qr_code_label: string; // 'Front Desk QR' | 'Table Tent QR' etc.
  customer_name: string | null;
  customer_avatar_initials: string | null;
  customer_avatar_color: string | null;
  feedback_text: string | null;
  feedback_tags: string[] | null;
  metadata: Record<string, unknown>;
}

export interface LandingPage {
  id: string;
  business_id: string;
  subdomain: string;
  headline: string;
  subheadline: string;
  hero_image_url: string | null;
  features: string[];
  testimonials: Testimonial[];
  cta_text: string;
  published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface DashboardMetrics {
  total_scans: number;
  total_scans_prev: number;
  google_redirects: number;
  google_redirects_prev: number;
  intercepted_feedbacks: number;
  intercepted_feedbacks_prev: number;
  estimated_roi: number;
  estimated_roi_prev: number;
}

export interface ChartDataPoint {
  date: string;
  totalScans: number;
  googleReviews: number;
  interceptedFeedbacks: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthly_price_usd: number;
  scan_limit: number;
  features: string[];
  highlighted: boolean;
}

// Currency config for geo-pricing
export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
  rate: number; // relative to USD
}

export const CURRENCY_MAP: Record<string, CurrencyConfig> = {
  US: { code: 'USD', symbol: '$', locale: 'en-US', rate: 1 },
  IN: { code: 'INR', symbol: '₹', locale: 'en-IN', rate: 83.5 },
  JP: { code: 'JPY', symbol: '¥', locale: 'ja-JP', rate: 155 },
  GB: { code: 'GBP', symbol: '£', locale: 'en-GB', rate: 0.79 },
  EU: { code: 'EUR', symbol: '€', locale: 'en-DE', rate: 0.92 },
  AU: { code: 'AUD', symbol: 'A$', locale: 'en-AU', rate: 1.53 },
  CA: { code: 'CAD', symbol: 'C$', locale: 'en-CA', rate: 1.36 },
  SG: { code: 'SGD', symbol: 'S$', locale: 'en-SG', rate: 1.35 },
  AE: { code: 'AED', symbol: 'AED', locale: 'ar-AE', rate: 3.67 },
  BR: { code: 'BRL', symbol: 'R$', locale: 'pt-BR', rate: 5.1 },
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    monthly_price_usd: 0,
    scan_limit: 50,
    features: [
      'QR Code Generator',
      'Basic Review Funnel',
      'Up to 50 scans/mo',
      'Email Feedback Inbox',
    ],
    highlighted: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    monthly_price_usd: 29,
    scan_limit: 1000,
    features: [
      'Everything in Free',
      'Custom Branding',
      'Up to 1,000 scans/mo',
      'WhatsApp Integration',
      'AI Review Suggestions',
      'Basic Analytics',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly_price_usd: 79,
    scan_limit: 10000,
    features: [
      'Everything in Starter',
      'Up to 10,000 scans/mo',
      'Advanced Analytics',
      'AI Automations',
      'Priority Support',
      'Multiple QR Codes',
      'Team Access (3 seats)',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly_price_usd: 199,
    scan_limit: 999999,
    features: [
      'Everything in Pro',
      'Unlimited scans',
      'Premium Landing Page ($999 value)',
      'White-label Ready',
      'Dedicated Account Manager',
      'Custom Integrations',
      'Unlimited Team Seats',
      'SLA Guarantee',
    ],
    highlighted: false,
  },
];
