# GMBhub 🚀

**AI-Powered Review Interception & Local SEO Growth SaaS**

Turn foot traffic into 5-star Google Reviews. Instantly.

---

## 📁 Project Structure

```
gmbhub/
├── app/
│   ├── page.tsx                    # Public landing page
│   ├── layout.tsx                  # Root layout
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard sidebar + topbar
│   │   └── page.tsx                # Overview: metrics, chart, inbox
│   ├── review/
│   │   └── [slug]/
│   │       └── page.tsx            # Customer-facing funnel
│   └── api/
│       ├── scan/route.ts           # POST: record scan/rating event
│       ├── generate-qr/route.ts    # POST: generate QR code SVG/PNG
│       └── business/[slug]/route.ts # GET: public business config
│
├── components/                     # Modular reusable components
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   └── server.ts               # Server Supabase client
│   ├── currency.ts                 # Geo-aware currency formatting
│   └── utils.ts                    # cn(), mock data, formatters
│
├── types/index.ts                  # All TypeScript types + pricing plans
├── styles/globals.css              # Global CSS, design tokens, animations
├── supabase/schema.sql             # Full PostgreSQL schema with RLS
├── middleware.ts                   # Auth protection
└── .env.example                    # Required environment variables
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | Tailwind CSS + Custom CSS vars |
| Animation | Framer Motion |
| Charts | Recharts |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| QR Generation | qrcode npm package |
| Icons | Lucide React |
| State | React hooks + Zustand |
| Deployment | Vercel |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_ORG/gmbhub
cd gmbhub
npm install
```

### 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in your SQL editor
3. Enable Row Level Security (already in schema)
4. Copy your project URL and anon key

### 3. Environment Variables

```bash
cp .env.example .env.local
# Fill in your Supabase credentials
```

### 4. Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

---

## 🏗️ Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Public landing page with GMB input & QR generator |
| `/dashboard` | Business metrics overview |
| `/dashboard/qr-codes` | QR code management |
| `/dashboard/analytics` | Funnel analytics |
| `/dashboard/inbox` | Live feedback inbox |
| `/review/[slug]` | Customer-facing review funnel |

---

## 💳 Pricing Model

| Plan | Price (USD) | Scans/mo | QR Free? |
|------|-------------|----------|----------|
| Free | $0 | 50 | ✅ Always |
| Starter | $29 | 1,000 | ✅ |
| Pro | $79 | 10,000 | ✅ |
| Enterprise | $199 | Unlimited | ✅ |

**QR codes are ALWAYS free** — paid plans unlock higher scan limits, analytics, AI features, and branding.

### 🌍 Currency Support
Prices auto-convert based on user's country:
- 🇺🇸 USD ($) — base rate
- 🇮🇳 INR (₹) — ×83.5
- 🇯🇵 JPY (¥) — ×155
- 🇬🇧 GBP (£) — ×0.79
- 🇪🇺 EUR (€) — ×0.92
- + AU, CA, SG, AE, BR

---

## 🔄 Funnel Logic

```
Customer scans QR
        ↓
    Rate (1–5 stars)
        ↓
   ≥ 4 stars?
  ↙         ↘
YES          NO
  ↓           ↓
Positive    Negative
Path        Path
  ↓           ↓
Copy AI     Select
review      issue tags
text          ↓
  ↓        Submit via
Post to    WhatsApp or
Google     internal inbox
```

---

## 📊 Supabase Tables

| Table | Purpose |
|-------|---------|
| `users` | Auth context, roles |
| `businesses` | Multi-tenant configs, brand, subscription |
| `qr_codes` | Per-business QR tracking |
| `reviews_analytics` | Every scan/rating event |
| `landing_pages` | Premium mini-website feature |
| `team_members` | Multi-seat access control |

---

## 🚢 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard matching `.env.example`.

---

## 📝 License

MIT — Built with ❤️ using GMBhub
