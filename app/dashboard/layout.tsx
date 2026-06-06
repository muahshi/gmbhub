'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, QrCode, BarChart2, Star, MessageSquare,
  Bot, Layers, Users, FileText, Settings, UserCheck, CreditCard,
  ChevronDown, MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GMBhubLogo } from '@/components/ui/gmbhub-logo';
import { GooglePartnerSeal, GoogleColorDots } from '@/components/ui/google-brand';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard', badge: null },
  { label: 'QR Codes', icon: QrCode, href: '/dashboard/qr-codes', badge: null },
  { label: 'Funnel Analytics', icon: BarChart2, href: '/dashboard/analytics', badge: null },
  { label: 'Reviews', icon: Star, href: '/dashboard/reviews', badge: null },
  { label: 'Feedback Inbox', icon: MessageSquare, href: '/dashboard/inbox', badge: 12 },
  { label: 'AI Automations', icon: Bot, href: '/dashboard/automations', badge: null },
  { label: 'Widgets', icon: Layers, href: '/dashboard/widgets', badge: null },
  { label: 'Customers', icon: Users, href: '/dashboard/customers', badge: null },
  { label: 'Reports', icon: FileText, href: '/dashboard/reports', badge: null },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings', badge: null },
  { label: 'Team', icon: UserCheck, href: '/dashboard/team', badge: null },
  { label: 'Billing', icon: CreditCard, href: '/dashboard/billing', badge: null },
];

function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-full bg-[#0A0A0C] border-r border-[#1A1A1E] z-40 flex flex-col',
      'transition-all duration-300',
      collapsed ? 'w-16' : 'w-[200px]'
    )}>
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#1A1A1E] flex items-center h-16">
        {collapsed
          ? <div className="w-7 h-7"><svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="3" fill="#FBBC05"/><path d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round"/><circle cx="26" cy="6" r="3" fill="#EA4335"/></svg></div>
          : <GMBhubLogo size="sm" animated />
        }
      </div>

      {/* Business selector */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-[#1A1A1E]">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#1A1A1E] cursor-pointer transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF]/20 to-[#7C3AED]/20 border border-[#1A1A1E] flex items-center justify-center text-xs font-bold text-[#00D4FF] shrink-0">
              BB
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">BrightBite Cafe</p>
              <p className="text-[10px] text-white/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] inline-block" />
                All Locations
              </p>
            </div>
            <ChevronDown className="w-3 h-3 text-white/40 shrink-0" />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 cursor-pointer transition-all text-sm',
                  active
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20'
                    : 'text-white/50 hover:text-white hover:bg-[#1A1A1E]'
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-xs font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-[#00D4FF] text-black text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Plan badge */}
      {!collapsed && (
        <div className="p-3 border-t border-[#1A1A1E]">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#4285F4]/15 to-[#34A853]/10 border border-[#4285F4]/25">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <GoogleColorDots />
                <span className="text-xs font-bold text-[#4285F4]">Pro Plan</span>
              </div>
            </div>
            <p className="text-[10px] text-white/35 mb-2">Renews on May 28, 2025</p>
            <p className="text-[10px] text-white/45 mb-1.5">7,250 / 10,000 Scans</p>
            <div className="h-1 rounded-full bg-[#1A1A1E] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '72.5%', background: 'linear-gradient(90deg, #4285F4, #34A853)' }} />
            </div>
          </div>
        </div>
      )}

      {/* User */}
      <div className="p-3 border-t border-[#1A1A1E]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF]/30 to-[#7C3AED]/30 border border-[#1A1A1E] flex items-center justify-center text-xs font-bold shrink-0">
            RC
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">Rohan Chatterjee</p>
                <p className="text-[10px] text-white/40">Owner</p>
              </div>
              <MoreVertical className="w-4 h-4 text-white/40" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="h-16 border-b border-[#1A1A1E] bg-[#0A0A0C]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold">Overview</h1>
        <p className="text-xs text-white/40">Track your Google Reviews funnel performance</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Google Partner seal in topbar */}
        <div className="hidden xl:block">
          <GooglePartnerSeal variant="compact" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#1A1A1E] bg-[#111113] text-xs text-white/70 hover:border-[#4285F4]/30 transition-all">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          May 12 – May 18, 2025
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#1A1A1E] bg-[#111113] text-xs text-white/70 hover:border-[#4285F4]/30 transition-all">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filter
        </button>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303]">
      <Sidebar />
      <div className="ml-[200px] flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
