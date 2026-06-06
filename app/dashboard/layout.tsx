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
    <aside className="fixed left-0 top-0 h-full w-[220px] flex flex-col z-40"
      style={{ background: '#08080C', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Logo area */}
      <div className="px-5 h-16 flex items-center border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <GMBhubLogo size="sm" animated />
      </div>

      {/* Business selector */}
      <div className="px-3 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/4 cursor-pointer transition-colors group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(66,133,244,0.25) 0%, rgba(52,168,83,0.15) 100%)', border: '1px solid rgba(66,133,244,0.2)' }}>
            BB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">BrightBite Cafe</p>
            <p className="text-[10px] text-white/35 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] inline-block" />
              All Locations
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-white/30 shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 cursor-pointer transition-all text-sm',
                active
                  ? 'bg-[#4285F4]/12 text-[#4285F4] border border-[#4285F4]/20'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/4'
              )}>
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-xs font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#4285F4] text-white text-[9px] font-black">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Pro plan card */}
      <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="p-3.5 rounded-xl" style={{
          background: 'linear-gradient(135deg, rgba(66,133,244,0.1) 0%, rgba(52,168,83,0.06) 100%)',
          border: '1px solid rgba(66,133,244,0.2)',
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4285F4]">Pro Plan</span>
            <span className="text-[10px] text-white/30">62%</span>
          </div>
          <p className="text-[10px] text-white/35 mb-2">12,540 / 20,000 Scans</p>
          <div className="h-1 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '62%', background: 'linear-gradient(90deg, #4285F4, #34A853)' }} />
          </div>
        </div>
      </div>

      {/* User */}
      <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/4 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(0,200,255,0.25) 0%, rgba(124,58,237,0.2) 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
            RC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Rohan Chatterjee</p>
            <p className="text-[10px] text-white/35">Owner</p>
          </div>
          <MoreVertical className="w-4 h-4 text-white/30" />
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-30"
      style={{ background: 'rgba(8,8,12,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div>
        <h1 className="text-base font-black">Overview</h1>
        <p className="text-xs text-white/35">Track your GMB growth and reputation in real-time</p>
      </div>
      <div className="flex items-center gap-2">
        {/* Date range */}
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-white/60 font-medium hover:text-white transition-colors"
          style={{ background: '#0F0F14', border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          May 12 – May 18, 2025
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Filter */}
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-white/60 font-medium hover:text-white transition-colors"
          style={{ background: '#0F0F14', border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filter
        </button>

        {/* Refresh */}
        <button className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/6 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#34A853]"
          style={{ background: 'rgba(52,168,83,0.1)', border: '1px solid rgba(52,168,83,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
          Live
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#020204' }}>
      <Sidebar />
      <div className="ml-[220px] flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
