-- ============================================================
-- ReviewPulse AI — Supabase PostgreSQL Schema
-- Multi-tenant, RLS-protected, optimized for scale
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. USERS (Auth context — wraps Supabase auth.users)
-- ============================================================
CREATE TABLE public.users (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT NOT NULL UNIQUE,
  full_name    TEXT,
  avatar_url   TEXT,
  role         TEXT NOT NULL DEFAULT 'business_owner'
                  CHECK (role IN ('master_admin', 'business_owner', 'team_member')),
  country_code TEXT DEFAULT 'US',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- 2. BUSINESSES (Multi-tenant core)
-- ============================================================
CREATE TABLE public.businesses (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id               UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name                   TEXT NOT NULL,
  slug                   TEXT NOT NULL UNIQUE,     -- /review/{slug}
  place_id               TEXT,                    -- Google Maps place_id
  google_review_url      TEXT NOT NULL,
  category               TEXT DEFAULT 'restaurant',
  
  -- Brand config (JSONB for flexibility)
  brand_config           JSONB NOT NULL DEFAULT '{
    "primary_brand_color": "#00D4FF",
    "accent_color": "#00FF87",
    "business_bg": null,
    "logo_url": null
  }',
  
  -- Review text suggestions (per business type)
  review_suggestions     JSONB DEFAULT '[]',
  
  -- Subscription
  subscription_plan      TEXT NOT NULL DEFAULT 'free'
                           CHECK (subscription_plan IN ('free', 'starter', 'pro', 'enterprise')),
  subscription_renews_at TIMESTAMPTZ,
  scan_limit             INTEGER NOT NULL DEFAULT 50,
  scans_used             INTEGER NOT NULL DEFAULT 0,
  
  -- Integrations
  whatsapp_number        TEXT,
  
  -- Features
  landing_page_enabled   BOOLEAN DEFAULT FALSE,
  is_active              BOOLEAN DEFAULT TRUE,
  
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_businesses_owner_id ON public.businesses(owner_id);
CREATE INDEX idx_businesses_slug     ON public.businesses(slug);
CREATE INDEX idx_businesses_place_id ON public.businesses(place_id);

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage their businesses"
  ON public.businesses FOR ALL
  USING (auth.uid() = owner_id);

CREATE POLICY "Public can read business by slug (for funnel)"
  ON public.businesses FOR SELECT
  USING (is_active = TRUE);

-- ============================================================
-- 3. QR CODES
-- ============================================================
CREATE TABLE public.qr_codes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  label       TEXT NOT NULL,   -- 'Front Desk QR', 'Table Tent QR', etc.
  qr_url      TEXT NOT NULL,   -- The encoded URL
  scan_count  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_qr_codes_business_id ON public.qr_codes(business_id);

ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners manage their QR codes"
  ON public.qr_codes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.businesses b
      WHERE b.id = business_id AND b.owner_id = auth.uid()
    )
  );

-- ============================================================
-- 4. REVIEWS ANALYTICS (Core tracking table)
-- ============================================================
CREATE TABLE public.reviews_analytics (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id            UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  qr_code_id             UUID REFERENCES public.qr_codes(id),
  
  -- Scan data
  scanned_at             TIMESTAMPTZ DEFAULT NOW(),
  
  -- Customer interaction
  rating                 SMALLINT CHECK (rating BETWEEN 1 AND 5),
  outcome                TEXT CHECK (outcome IN ('posted_to_google', 'internal_intercept', 'abandoned')),
  
  -- Attribution
  source                 TEXT DEFAULT 'Direct Scan',
  qr_code_label          TEXT,
  
  -- Customer info (optional, privacy-first)
  customer_name          TEXT,
  customer_avatar_color  TEXT,
  
  -- Feedback (for negative path)
  feedback_text          TEXT,
  feedback_tags          TEXT[] DEFAULT '{}',
  
  -- Tracking
  ip_hash                TEXT,  -- hashed for privacy
  user_agent             TEXT,
  metadata               JSONB DEFAULT '{}',
  
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_business_id  ON public.reviews_analytics(business_id);
CREATE INDEX idx_analytics_scanned_at   ON public.reviews_analytics(scanned_at DESC);
CREATE INDEX idx_analytics_outcome      ON public.reviews_analytics(outcome);
CREATE INDEX idx_analytics_rating       ON public.reviews_analytics(rating);

ALTER TABLE public.reviews_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners view their analytics"
  ON public.reviews_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.businesses b
      WHERE b.id = business_id AND b.owner_id = auth.uid()
    )
  );

-- Allow public inserts (scan tracking — no auth needed)
CREATE POLICY "Public can insert analytics (scan events)"
  ON public.reviews_analytics FOR INSERT
  WITH CHECK (TRUE);

-- ============================================================
-- 5. LANDING PAGES ($999/mo premium feature)
-- ============================================================
CREATE TABLE public.landing_pages (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id    UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
  subdomain      TEXT UNIQUE NOT NULL,
  headline       TEXT DEFAULT 'Welcome to Our Business',
  subheadline    TEXT,
  hero_image_url TEXT,
  features       JSONB DEFAULT '[]',
  testimonials   JSONB DEFAULT '[]',
  cta_text       TEXT DEFAULT 'Leave Us a Review',
  seo_title      TEXT,
  seo_description TEXT,
  published      BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_landing_pages_business_id ON public.landing_pages(business_id);
CREATE INDEX idx_landing_pages_subdomain   ON public.landing_pages(subdomain);

ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners manage their landing pages"
  ON public.landing_pages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.businesses b
      WHERE b.id = business_id AND b.owner_id = auth.uid()
    )
  );

-- ============================================================
-- 6. TEAM MEMBERS
-- ============================================================
CREATE TABLE public.team_members (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'viewer'
                CHECK (role IN ('admin', 'manager', 'viewer')),
  invited_at  TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  UNIQUE(business_id, user_id)
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view their membership"
  ON public.team_members FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.businesses b
      WHERE b.id = business_id AND b.owner_id = auth.uid()
    )
  );

-- ============================================================
-- 7. UTILITY FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_businesses
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_landing_pages
  BEFORE UPDATE ON public.landing_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-increment scans_used on new analytics insert
CREATE OR REPLACE FUNCTION increment_scan_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.businesses
  SET scans_used = scans_used + 1
  WHERE id = NEW.business_id;

  -- Also update QR code scan count if linked
  IF NEW.qr_code_id IS NOT NULL THEN
    UPDATE public.qr_codes
    SET scan_count = scan_count + 1
    WHERE id = NEW.qr_code_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_scan
  AFTER INSERT ON public.reviews_analytics
  FOR EACH ROW EXECUTE FUNCTION increment_scan_count();

-- ============================================================
-- 8. SEED: Demo business for dev
-- ============================================================
-- Run this after user creation in auth:
/*
INSERT INTO public.businesses (owner_id, name, slug, google_review_url, category, subscription_plan, scan_limit, brand_config)
VALUES (
  '<your-user-uuid>',
  'Brewed Bliss Cafe',
  'brewed-bliss',
  'https://search.google.com/local/writereview?placeid=ChIJ_DEMO',
  'cafe',
  'pro',
  10000,
  '{"primary_brand_color": "#D4AF37", "accent_color": "#FFFFFF", "business_bg": null, "logo_url": null}'
);
*/
