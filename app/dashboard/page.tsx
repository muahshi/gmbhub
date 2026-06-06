"use client";
import React, { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// ── Mock Data ─────────────────────────────────────────────────────────
const chartData = [
  { date: "May 12", scans: 4100, redirects: 2050, intercepted: 310 },
  { date: "May 13", scans: 5200, redirects: 2700, intercepted: 520 },
  { date: "May 14", scans: 6100, redirects: 3400, intercepted: 620 },
  { date: "May 15", scans: 6500, redirects: 3600, intercepted: 740 },
  { date: "May 16", scans: 8942, redirects: 4248, intercepted: 982 },
  { date: "May 17", scans: 9200, redirects: 4800, intercepted: 1050 },
  { date: "May 18", scans: 8200, redirects: 4100, intercepted: 920 },
];

const feedbackData = [
  { time: "May 18, 10:24 AM", customer: "Jacob Smith", avatar: "JS", rating: 5.0, type: "Positive", outcome: "Posted on Google", source: "QR Code Scan", link: "Front Desk QR" },
  { time: "May 18, 09:58 AM", customer: "Lily Wang", avatar: "LW", rating: 4.0, type: "Positive", outcome: "Posted on Google", source: "Direct Link", link: "bit.ly/brightbite" },
  { time: "May 18, 09:41 AM", customer: "Michael Patel", avatar: "MP", rating: 5.0, type: "Positive", outcome: "Posted on Google", source: "WhatsApp Share", link: "wa.me/brightbite" },
  { time: "May 18, 09:16 AM", customer: "Sophia Chen", avatar: "SC", rating: 2.0, type: "Negative", outcome: "Internal Feedback", source: "QR Code Scan", link: "Table Tent QR" },
  { time: "May 18, 08:57 AM", customer: "Daniel Thompson", avatar: "DT", rating: 5.0, type: "Positive", outcome: "Posted on Google", source: "Direct Link", link: "bit.ly/brightbite" },
];

const navItems = [
  { icon: "⊞", label: "Overview", active: true, badge: null },
  { icon: "⬛", label: "QR Codes", active: false, badge: null },
  { icon: "📊", label: "Funnel Analytics", active: false, badge: null },
  { icon: "⭐", label: "Reviews", active: false, badge: null },
  { icon: "💬", label: "Feedback Inbox", active: false, badge: 16 },
  { icon: "🤖", label: "AI Automations", active: false, badge: null },
  { icon: "👥", label: "Customers", active: false, badge: null },
  { icon: "📈", label: "Reports", active: false, badge: null },
  { icon: "🔧", label: "Widgets", active: false, badge: null },
  { icon: "⚙", label: "Settings", active: false, badge: null },
  { icon: "👤", label: "Team", active: false, badge: null },
  { icon: "💳", label: "Billing", active: false, badge: null },
];

// ── Google G Logo ─────────────────────────────────────────────────────
function GoogleG({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ── Animated Sparkline ────────────────────────────────────────────────
function Sparkline({ color, pts }: { color: string; pts?: number[] }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      setProgress(Math.min((now - start) / dur, 1));
      if ((now - start) < dur) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const data = pts || [0, 10, 8, 20, 15, 28, 25, 35, 32, 42, 38, 50];
  const visCount = Math.max(2, Math.round(progress * data.length));
  const visible = data.slice(0, visCount);
  const w = 80, h = 32;
  const max = Math.max(...data), min = Math.min(...data);
  const points = visible.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      {visible.length > 1 && (
        <polyline points={points} fill="none" stroke={color} strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}/>
      )}
    </svg>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i <= rating ? "#FBBC05" : "rgba(255,255,255,0.12)"}
            style={i <= rating ? { filter: "drop-shadow(0 0 3px rgba(251,188,5,0.7))" } : {}}
          />
        </svg>
      ))}
      <span style={{ fontSize: 12, fontWeight: 700, marginLeft: 4, color: i => i <= rating ? "#fff" : "rgba(255,255,255,0.4)" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ── Metric Card ───────────────────────────────────────────────────────
function MetricCard({ icon, iconBg, title, value, change, sparkColor, sparkPts }: {
  icon: React.ReactNode; iconBg: string; title: string; value: string | number;
  change: string; sparkColor: string; sparkPts?: number[];
}) {
  return (
    <div style={{
      flex: 1, padding: "18px 20px", borderRadius: 16,
      background: "#0A0A0E", border: "1px solid rgba(255,255,255,0.05)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            background: iconBg, flexShrink: 0
          }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{title}</div>
            <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2 }}>{value}</div>
          </div>
        </div>
        <Sparkline color={sparkColor} pts={sparkPts}/>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
        <span style={{ color: "#34A853", fontWeight: 700 }}>↑ {change}</span>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>vs May 5 – May 11</span>
      </div>
    </div>
  );
}

// ── Custom Tooltip ────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: "#12121A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
      padding: "12px 16px", fontSize: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
    }}>
      <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, boxShadow: `0 0 6px ${p.color}` }}/>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>{p.name}:</span>
          <span style={{ color: "#fff", fontWeight: 700 }}>{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────
function Sidebar() {
  const [active, setActive] = useState("Overview");
  return (
    <div style={{
      width: 220, flexShrink: 0, height: "100vh", position: "sticky", top: 0,
      background: "#07070B", borderRight: "1px solid rgba(255,255,255,0.05)",
      display: "flex", flexDirection: "column", overflow: "hidden"
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(66,133,244,0.4)", flexShrink: 0
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 900, fontSize: 16 }}>
            <span style={{ color: "#fff" }}>GMB</span><span style={{ color: "#4285F4" }}>hub</span>
            {" "}<span style={{ color: "#34A853", fontSize: 11 }}>AI</span>
          </span>
        </div>

        {/* Business selector */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer"
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #4285F4, #34A853)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0
          }}>☕</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>BrightBite Cafe</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>All Locations</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 10px", overflowY: "auto" }}>
        {navItems.map(item => (
          <button key={item.label} onClick={() => setActive(item.label)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 10, border: "none", cursor: "pointer",
              marginBottom: 2, transition: "all 0.2s", textAlign: "left",
              background: active === item.label
                ? "rgba(66,133,244,0.15)"
                : "transparent",
              color: active === item.label ? "#fff" : "rgba(255,255,255,0.45)",
              position: "relative"
            }}
            onMouseEnter={e => { if (active !== item.label) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { if (active !== item.label) e.currentTarget.style.background = "transparent"; }}
          >
            {/* Active indicator */}
            {active === item.label && (
              <div style={{
                position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                width: 3, height: 20, borderRadius: 2, background: "#4285F4",
                boxShadow: "0 0 8px rgba(66,133,244,0.8)"
              }}/>
            )}
            <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: 13, fontWeight: active === item.label ? 700 : 500, flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{
                minWidth: 20, height: 20, borderRadius: 10, background: "#4285F4", color: "#fff",
                fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px"
              }}>{item.badge}</span>
            )}
            {active === item.label && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            )}
          </button>
        ))}
      </nav>

      {/* Pro plan badge */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{
          padding: "10px 12px", borderRadius: 12, marginBottom: 12,
          background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.2)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 12 }}>💎</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#4285F4" }}>Pro Plan</span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Scans this month</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>12,540 / 20,000</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg, #4285F4, #34A853)", borderRadius: 2 }}/>
          </div>
        </div>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #4285F4, #EA4335)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700
          }}>RC</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rohan Chatterjee</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Owner</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────────
export default function Dashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: "flex", background: "#060608", color: "#fff", minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      fontSize: 13
    }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#07070B}
        ::-webkit-scrollbar-thumb{background:#1E1E28;border-radius:2px}
      `}</style>

      <Sidebar/>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(6,6,8,0.92)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>Overview</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Track your GMB growth and reputation in real-time</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Date picker */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10,
              background: "#0F0F14", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontSize: 12
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              May 12 – May 18, 2025
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
              background: "#0F0F14", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 12
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
            </button>
            <button style={{
              width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: "#0F0F14", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", color: "rgba(255,255,255,0.5)"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 8, background: "rgba(52,168,83,0.1)", border: "1px solid rgba(52,168,83,0.2)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34A853", boxShadow: "0 0 6px #34A853" }}/>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#34A853" }}>Live</span>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* Metric Cards */}
          <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
            <MetricCard icon="⬛" iconBg="rgba(66,133,244,0.15)" title="Total Scans" value="12,842" change="12.4%" sparkColor="#4285F4" sparkPts={[20,28,35,42,38,52,48,58,62,70,68,80]}/>
            <MetricCard icon="↗" iconBg="rgba(168,85,247,0.15)" title="Google Redirects" value="6,421" change="15.7%" sparkColor="#A855F7" sparkPts={[15,22,28,35,30,42,38,48,52,58,55,65]}/>
            <MetricCard icon="💬" iconBg="rgba(245,158,11,0.15)" title="Intercepted Feedbacks" value="1,248" change="8.3%" sparkColor="#F59E0B" sparkPts={[10,14,12,18,16,22,20,25,24,28,26,30]}/>
            <MetricCard icon="💵" iconBg="rgba(52,168,83,0.15)" title="Estimated ROI" value="$8,642" change="18.9%" sparkColor="#34A853" sparkPts={[12,18,22,30,26,38,34,44,40,52,48,58]}/>
          </div>

          {/* Main content row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, marginBottom: 20 }}>
            {/* Chart */}
            <div style={{
              padding: "20px 24px", borderRadius: 16,
              background: "#09090D", border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>Performance Overview</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <select style={{
                    background: "#0F0F14", border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", outline: "none"
                  }}>
                    <option>Daily</option><option>Weekly</option><option>Monthly</option>
                  </select>
                  <button style={{ padding: "6px 10px", borderRadius: 8, background: "#0F0F14", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                      <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-4"/>
                    </svg>
                  </button>
                  <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(66,133,244,0.15)", border: "1px solid rgba(66,133,244,0.3)", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2">
                      <rect x="3" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="17" y="5" width="4" height="16"/>
                    </svg>
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                  <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Line type="monotone" dataKey="scans" name="Total Scans" stroke="#4285F4" strokeWidth={2.5} dot={{ fill: "#4285F4", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#4285F4", boxShadow: "0 0 12px #4285F4" }}
                    style={{ filter: "drop-shadow(0px 4px 10px rgba(66,133,244,0.7))" }}/>
                  <Line type="monotone" dataKey="redirects" name="Google Redirects" stroke="#34A853" strokeWidth={2.5} dot={{ fill: "#34A853", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }}
                    style={{ filter: "drop-shadow(0px 4px 10px rgba(52,168,83,0.7))" }}/>
                  <Line type="monotone" dataKey="intercepted" name="Intercepted Feedbacks" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }}
                    style={{ filter: "drop-shadow(0px 4px 10px rgba(245,158,11,0.7))" }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Right panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Donut */}
              <div style={{
                padding: 18, borderRadius: 16, background: "#09090D",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 14 }}>Scan to Review Rate</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
                      <circle cx="36" cy="36" r="28" fill="none" stroke="#4285F4" strokeWidth="10"
                        strokeDasharray={`${0.526 * 175.9} ${175.9}`} strokeLinecap="round"
                        transform="rotate(-90 36 36)"
                        style={{ filter: "drop-shadow(0 0 6px rgba(66,133,244,0.8))" }}/>
                      <circle cx="36" cy="36" r="28" fill="none" stroke="#34A853" strokeWidth="10"
                        strokeDasharray={`${0.474 * 175.9} ${175.9}`} strokeLinecap="round"
                        transform={`rotate(${-90 + 0.526*360} 36 36)`}
                        style={{ filter: "drop-shadow(0 0 6px rgba(52,168,83,0.5))" }}/>
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>52.6%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#34A853" }}>↑ 14.6%</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>vs last 7 days</div>
                  </div>
                </div>
              </div>

              {/* Traffic sources */}
              <div style={{
                padding: 18, borderRadius: 16, background: "#09090D",
                border: "1px solid rgba(255,255,255,0.05)", flex: 1
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 14 }}>Top Traffic Sources</div>
                {[
                  { icon: "⬛", label: "QR Code Scan", val: "6,842", pct: "53%", color: "#4285F4" },
                  { icon: "🔗", label: "Direct Link", val: "3,421", pct: "26%", color: "#34A853" },
                  { icon: "💬", label: "SMS / WhatsApp", val: "1,987", pct: "15%", color: "#FBBC05" },
                  { icon: "···", label: "Other", val: "592", pct: "6%", color: "#6B7280" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: `${s.color}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>{s.label}</div>
                      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 3 }}>
                        <div style={{ width: s.pct, height: "100%", background: s.color, borderRadius: 2 }}/>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textAlign: "right" }}>
                      <div>{parseInt(s.val).toLocaleString()}</div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{s.pct}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Table */}
          <div style={{
            borderRadius: 16, background: "#09090D",
            border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden"
          }}>
            {/* Table header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 800 }}>Live Feedback Inbox</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 20, background: "rgba(52,168,83,0.1)", border: "1px solid rgba(52,168,83,0.2)" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34A853", boxShadow: "0 0 6px #34A853" }}/>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#34A853" }}>Live</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 9,
                  background: "#0F0F14", border: "1px solid rgba(255,255,255,0.07)", fontSize: 11
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  <input placeholder="Search feedback..." style={{ background: "transparent", border: "none", outline: "none", color: "rgba(255,255,255,0.6)", fontSize: 11, width: 120 }}/>
                </div>
                <select style={{ background: "#0F0F14", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "7px 10px", fontSize: 11, cursor: "pointer", outline: "none" }}>
                  <option>All Status</option><option>Positive</option><option>Negative</option>
                </select>
                <button style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 9,
                  background: "#0F0F14", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 11
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Export CSV
                </button>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9,
                  background: "#4285F4", border: "none", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 11,
                  boxShadow: "0 0 16px rgba(66,133,244,0.4)"
                }}>
                  View All Feedbacks
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* Column headers */}
            <div style={{
              display: "grid", gridTemplateColumns: "200px 160px 140px 130px 160px 150px 150px 100px",
              padding: "10px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)",
              fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600
            }}>
              {["Time","Customer","Rating","Feedback Type","Outcome","Source","QR / Link","Action"].map(h => (
                <div key={h}>{h}</div>
              ))}
            </div>

            {/* Rows */}
            {feedbackData.map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "200px 160px 140px 130px 160px 150px 150px 100px",
                padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.03)",
                alignItems: "center", transition: "background 0.15s",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"}
              >
                {/* Time */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34A853", boxShadow: "0 0 5px #34A853", flexShrink: 0 }}/>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{row.time}</span>
                </div>

                {/* Customer */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: `hsl(${row.customer.charCodeAt(0) * 5},60%,40%)`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700
                  }}>{row.avatar}</div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{row.customer}</span>
                </div>

                {/* Rating */}
                <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="11" height="11" viewBox="0 0 24 24">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        fill={s <= row.rating ? "#FBBC05" : "rgba(255,255,255,0.12)"}
                        style={s <= row.rating ? { filter: "drop-shadow(0 0 2px rgba(251,188,5,0.8))" } : {}}/>
                    </svg>
                  ))}
                  <span style={{ fontSize: 11, fontWeight: 700, marginLeft: 4 }}>{row.rating.toFixed(1)}</span>
                </div>

                {/* Type badge */}
                <div>
                  <span style={{
                    padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700,
                    background: row.type === "Positive" ? "rgba(52,168,83,0.15)" : "rgba(234,67,53,0.15)",
                    color: row.type === "Positive" ? "#34A853" : "#EA4335",
                    border: `1px solid ${row.type === "Positive" ? "rgba(52,168,83,0.3)" : "rgba(234,67,53,0.3)"}`
                  }}>
                    {row.type} {row.type === "Positive" ? "😊" : "😞"}
                  </span>
                </div>

                {/* Outcome */}
                <div>
                  {row.outcome === "Posted on Google" ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 8, background: "rgba(66,133,244,0.1)", border: "1px solid rgba(66,133,244,0.2)", width: "fit-content" }}>
                      <GoogleG size={12}/>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#4285F4" }}>Posted on Google</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 8, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", width: "fit-content" }}>
                      <span style={{ fontSize: 10 }}>⚡</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B" }}>Internal Feedback</span>
                    </div>
                  )}
                </div>

                {/* Source */}
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{row.source}</div>

                {/* Link */}
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{row.link}</div>

                {/* Action */}
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{
                    padding: "4px 10px", borderRadius: 7, background: "#0F0F14",
                    border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 10
                  }}>View Details</button>
                  <button style={{
                    width: 26, height: 26, borderRadius: 7, background: "#0F0F14",
                    border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                  }}>⋮</button>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Showing 5 of 16 recent feedbacks</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34A853", boxShadow: "0 0 5px #34A853" }}/>
                Auto-updated 10s ago
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
