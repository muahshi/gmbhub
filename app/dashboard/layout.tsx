'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, QrCode, BarChart2, Star, MessageSquare,
  Bot, Layers, Users, FileText, Settings, UserCheck, CreditCard,
  ChevronDown, MoreVertical, RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GMBhubLogo } from '@/components/ui/gmbhub-logo';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard', badge: null },
  { label: 'QR Codes', icon: QrCode, href: '/dashboard/qr-codes', badge: null },
  { label: 'Funnel Analytics', icon: BarChart2, href: '/dashboard/analytics', badge: null },
  { label: 'Reviews', icon: Star, href: '/dashboard/reviews', badge: null },
  { label: 'Feedback Inbox', icon: MessageSquare, href: '/dashboard/inbox', badge: 16 },
  { label: 'AI Automations', icon: Bot, href: '/dashboard/automations', badge: null },
  { label: 'Customers', icon: Users, href: '/dashboard/customers', badge: null },
  { label: 'Reports', icon: FileText, href: '/dashboard/reports', badge: null },
  { label: 'Widgets', icon: Layers, href: '/dashboard/widgets', badge: null },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings', badge: null },
  { label: 'Team', icon: UserCheck, href: '/dashboard/team', badge: null },
  { label: 'Billing', icon: CreditCard, href: '/dashboard/billing', badge: null },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[220px] flex flex-col z-40"
      style={{
        background: 'linear-gradient(180deg, #08080E 0%, #060608 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '4px 0 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Ambient top glow inside sidebar */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(66,133,244,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div
        className="relative px-5 h-16 flex items-center shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <GMBhubLogo size="sm" animated />
      </div>

      {/* Business selector */}
      <div className="px-3 py-3 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer group transition-all duration-200 hover:bg-white/[0.04]"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(66,133,244,0.3) 0%, rgba(52,168,83,0.18) 100%)',
              border: '1px solid rgba(66,133,244,0.25)',
              boxShadow: '0 0 12px rgba(66,133,244,0.15)',
            }}
          >
            BB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">BrightBite Cafe</p>
            <p className="text-[10px] text-white/35 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] inline-block animate-pulse" />
              All Locations
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-white/25 shrink-0 group-hover:text-white/50 transition-colors" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-xs font-medium group',
                  active
                    ? 'text-white'
                    : 'text-white/38 hover:text-white/80 hover:bg-white/[0.04]'
                )}
                style={active ? {
                  background: 'linear-gradient(135deg, rgba(66,133,244,0.16) 0%, rgba(66,133,244,0.06) 100%)',
                  border: '1px solid rgba(66,133,244,0.22)',
                  boxShadow: '0 0 20px rgba(66,133,244,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                } : {}}
              >
                {/* Active left capsule indicator */}
                {active && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                    style={{
                      background: '#4285F4',
                      boxShadow: '0 0 8px rgba(66,133,244,0.8), 0 0 16px rgba(66,133,244,0.4)',
                    }}
                  />
                )}

                <item.icon
                  className="w-4 h-4 shrink-0 transition-colors"
                  style={active ? { color: '#4285F4' } : {}}
                />
                <span className="flex-1 tracking-wide">{item.label}</span>

                {item.badge && (
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-black text-white"
                    style={{
                      background: '#4285F4',
                      boxShadow: '0 0 10px rgba(66,133,244,0.5)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Pro plan card */}
      <div className="p-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div
          className="p-3.5 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(66,133,244,0.1) 0%, rgba(52,168,83,0.06) 100%)',
            border: '1px solid rgba(66,133,244,0.18)',
            boxShadow: '0 0 24px rgba(66,133,244,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4285F4]" style={{ textShadow: '0 0 10px rgba(66,133,244,0.5)' }}>
              ◆ Pro Plan
            </span>
            <span className="text-[10px] text-white/30">62%</span>
          </div>
          <p className="text-[10px] text-white/30 mb-2">12,540 / 20,000 Scans</p>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '62%' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #4285F4, #34A853)',
                boxShadow: '0 0 8px rgba(66,133,244,0.5)',
              }}
            />
          </div>
        </div>
      </div>

      {/* User */}
      <div className="p-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,200,255,0.25) 0%, rgba(124,58,237,0.2) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            RC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Rohan Chatterjee</p>
            <p className="text-[10px] text-white/30">Owner</p>
          </div>
          <MoreVertical className="w-4 h-4 text-white/25 group-hover:text-white/50 transition-colors" />
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0"
      style={{
        background: 'rgba(6,6,8,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Chart icon accent */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#4285F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <div>
            <h1 className="text-sm font-black tracking-tight">Overview</h1>
            <p className="text-[10px] text-white/30">Track your GMB growth and reputation in real-time</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Date range */}
        <button
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-white/55 font-medium hover:text-white transition-all hover:bg-white/[0.06]"
          style={{ background: '#0F0F14', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          May 12 – May 18, 2025
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Filter */}
        <button
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-white/55 font-medium hover:text-white transition-all hover:bg-white/[0.06]"
          style={{ background: '#0F0F14', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filter
        </button>

        {/* Refresh */}
        <button
          className="p-2 rounded-xl text-white/35 hover:text-white transition-all hover:bg-white/[0.06]"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Live indicator */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#34A853]"
          style={{
            background: 'rgba(52,168,83,0.08)',
            border: '1px solid rgba(52,168,83,0.2)',
            boxShadow: '0 0 16px rgba(52,168,83,0.1)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" style={{ boxShadow: '0 0 6px #34A853' }} />
          Live
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#020204' }}>
      {/* Global dashboard ambient orb */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(66,133,244,0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-0 left-[220px] w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <Sidebar />
      <div className="ml-[220px] flex flex-col min-h-screen relative z-10">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
