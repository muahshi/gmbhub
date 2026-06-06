"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";

// ── Sparkline mini chart ──────────────────────────────────────────────
function Sparkline({ color = "#4285F4", data }: { color?: string; data?: number[] }) {
  const pts = data || [20, 35, 28, 45, 38, 55, 48, 62, 58, 70, 65, 80];
  const w = 80, h = 32;
  const max = Math.max(...pts), min = Math.min(...pts);
  const points = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

// ── Google G Logo ─────────────────────────────────────────────────────
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ── Ambient Background ────────────────────────────────────────────────
function AmbientBg() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "-20%", left: "-15%", width: "800px", height: "800px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(66,133,244,0.16) 0%, rgba(66,133,244,0.04) 45%, transparent 75%)",
        filter: "blur(100px)", animation: "orbDrift 20s ease-in-out infinite alternate"
      }} />
      <div style={{
        position: "absolute", bottom: "-25%", right: "-20%", width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, rgba(52,168,83,0.05) 40%, transparent 75%)",
        filter: "blur(120px)", animation: "orbDrift 26s ease-in-out infinite alternate-reverse"
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,188,5,0.05) 0%, transparent 70%)",
        filter: "blur(90px)"
      }} />
      {/* Fine dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px", opacity: 0.4
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(0,0,0,0.65) 100%)"
      }} />
      <style>{`
        @keyframes orbDrift { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,30px) scale(1.08); } }
        @keyframes pulse { 0%,100%{box-shadow:0 0 24px rgba(66,133,244,0.55),0 0 48px rgba(66,133,244,0.15);} 50%{box-shadow:0 0 40px rgba(66,133,244,0.8),0 0 80px rgba(66,133,244,0.3);} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes starPop { 0%{transform:scale(0) rotate(-20deg)} 100%{transform:scale(1) rotate(0)} }
      `}</style>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? "12px 0" : "20px 0",
      transition: "all 0.4s",
      background: scrolled ? "rgba(5,5,7,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(66,133,244,0.4)"
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#fff" }}>GMB</span><span style={{ color: "#4285F4" }}>hub</span>
            {" "}<span style={{ color: "#34A853", fontSize: 13, fontWeight: 700 }}>AI</span>
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: 32, fontSize: 14 }}>
          {["Features","How It Works","Pricing","Resources"].map(item => (
            <a key={item} href="#" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontWeight: 500, letterSpacing: "0.02em", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#fff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.45)"}>
              {item}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#fff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.4)"}>
            Log in
          </a>
          <button style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
            background: "#4285F4", color: "#fff", border: "none", borderRadius: 12,
            fontWeight: 700, fontSize: 14, cursor: "pointer",
            animation: "pulse 2.5s ease-in-out infinite",
            position: "relative", overflow: "hidden"
          }}>
            Start Free Trial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Phone Mockup ─────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div style={{ position: "relative", width: 300, flexShrink: 0, animation: "float 6s ease-in-out infinite" }}>
      {/* Glow halos */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%", transform: "scale(0.85) translateY(60px)",
        background: "radial-gradient(ellipse at 50% 60%, rgba(66,133,244,0.4) 0%, rgba(52,168,83,0.2) 40%, transparent 70%)",
        filter: "blur(50px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 200, height: 35, borderRadius: "50%",
        background: "rgba(52,168,83,0.45)", filter: "blur(30px)", pointerEvents: "none"
      }} />

      {/* Phone body */}
      <div style={{
        position: "relative", zIndex: 10, borderRadius: 44,
        background: "#060608",
        border: "1.5px solid rgba(255,255,255,0.14)",
        boxShadow: "0 0 0 0.5px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.9), 0 0 80px rgba(66,133,244,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
        overflow: "hidden"
      }}>
        {/* Status bar */}
        <div style={{ background: "#060608", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 6px", fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: 5, fontSize: 9, alignItems: "center" }}>
            <span>▪▪▪▪</span><span>WiFi</span><span>▓</span>
          </div>
        </div>

        {/* Screen */}
        <div style={{
          background: "#060608", minHeight: 540, padding: "20px 24px",
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
        }}>
          {/* Logo icon */}
          <div style={{
            width: 64, height: 64, borderRadius: 18, fontSize: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, rgba(66,133,244,0.18) 0%, rgba(52,168,83,0.12) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 24px rgba(66,133,244,0.18)", marginBottom: 16
          }}>☕</div>

          <h3 style={{ fontSize: 15, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Brewed Bliss Cafe</h3>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#4285F4", marginBottom: 6, textShadow: "0 0 12px rgba(66,133,244,0.6)" }}>
            We'd love your feedback!
          </p>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 20 }}>
            Your review helps us improve<br/>and helps others discover us.
          </p>

          {/* Stars */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="34" height="34" viewBox="0 0 24 24" style={{ animation: `starPop 0.4s ${i*0.08}s both ease-out` }}>
                <defs>
                  <radialGradient id={`sg${i}`} cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFE066"/>
                    <stop offset="60%" stopColor="#FBBC05"/>
                    <stop offset="100%" stopColor="#F09000"/>
                  </radialGradient>
                </defs>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={`url(#sg${i})`}
                  style={{ filter: "drop-shadow(0 0 8px rgba(251,188,5,0.8))" }}/>
              </svg>
            ))}
          </div>

          {/* Google CTA */}
          <button style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "14px 16px", borderRadius: 16, border: "none", cursor: "pointer",
            background: "#4285F4", color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 10,
            boxShadow: "0 0 28px rgba(66,133,244,0.55), 0 4px 12px rgba(0,0,0,0.4)",
            position: "relative", overflow: "hidden"
          }}>
            <GoogleG size={18}/>
            <span style={{ flex: 1, textAlign: "center" }}>Leave a Review on Google</span>
          </button>

          {/* Issue CTA */}
          <button style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "11px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer", marginBottom: 16
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 10a1.3 1.3 0 0 1-1.3 1.3H4.7l-2.7 2.7V3.3A1.3 1.3 0 0 1 3.3 2h9.4A1.3 1.3 0 0 1 14 3.3z"/>
            </svg>
            <span>I had an issue — Let us know privately</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#34A853" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Your feedback is private and secure.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────
function HeroSection() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState("idle"); // idle | generating | done

  const handleGenerate = () => {
    if (!url) return;
    setState("generating");
    setTimeout(() => setState("done"), 1800);
  };

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

        {/* Left */}
        <div>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 999, marginBottom: 28,
            background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.22)",
            boxShadow: "0 0 20px rgba(66,133,244,0.08)"
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#4285F4"/>
            </svg>
            <span style={{ color: "#4285F4", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>AI-POWERED GOOGLE BUSINESS GROWTH</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "3.75rem", fontWeight: 900, lineHeight: 1.06, marginBottom: 20, letterSpacing: "-0.03em" }}>
            Turn Foot Traffic<br/>
            into{" "}
            <span style={{ color: "#34A853", textShadow: "0 0 32px rgba(52,168,83,0.7), 0 0 64px rgba(52,168,83,0.3)" }}>5-Star</span>
            {" "}Google Reviews.
            <br/>
            <span style={{ color: "#4285F4", textShadow: "0 0 32px rgba(66,133,244,0.8), 0 0 64px rgba(66,133,244,0.35)" }}>Instantly.</span>
          </h1>

          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", marginBottom: 36, lineHeight: 1.65, maxWidth: 480 }}>
            GMBhub AI helps local businesses rank higher, attract more customers,
            and build a 5-star reputation on{" "}
            <span style={{ color: "#34A853", fontWeight: 600, textShadow: "0 0 12px rgba(52,168,83,0.5)" }}>autopilot.</span>
          </p>

          {/* Input Card */}
          <div style={{
            padding: 1, borderRadius: 20, marginBottom: 28,
            background: url ? "linear-gradient(135deg, rgba(66,133,244,0.5), rgba(52,168,83,0.3))" : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
          }}>
            <div style={{
              padding: 18, borderRadius: 19,
              background: "#08080C",
              boxShadow: url ? "0 0 40px rgba(66,133,244,0.12), 0 12px 40px rgba(0,0,0,0.6)" : "0 12px 40px rgba(0,0,0,0.5)"
            }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, flex: 1,
                  padding: "12px 16px", borderRadius: 12,
                  background: "#0F0F14",
                  border: url ? "1px solid rgba(66,133,244,0.35)" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: url ? "0 0 0 3px rgba(66,133,244,0.06)" : "none"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285F4">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <input
                    type="url" value={url} onChange={e => { setUrl(e.target.value); setState("idle"); }}
                    placeholder="Paste your Google Business Profile / Maps link"
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 13.5 }}
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={!url || state === "generating"}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "12px 20px", borderRadius: 12, border: "none", cursor: url ? "pointer" : "not-allowed",
                    background: state === "done" ? "#34A853" : "#4285F4",
                    color: "#fff", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap",
                    boxShadow: url ? `0 0 24px ${state === "done" ? "rgba(52,168,83,0.6)" : "rgba(66,133,244,0.6)"}, 0 0 48px ${state === "done" ? "rgba(52,168,83,0.15)" : "rgba(66,133,244,0.15)"}` : "none",
                    opacity: !url ? 0.5 : 1, transition: "all 0.3s"
                  }}>
                  {state === "generating" ? (
                    <div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }}/>
                  ) : state === "done" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                    </svg>
                  )}
                  {state === "generating" ? "Generating..." : state === "done" ? "Generated!" : "Generate Smart QR"}
                </button>
              </div>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

              {/* Trust micro-badges */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[
                  { icon: "✓", color: "#34A853", text: "No credit card required" },
                  { icon: "⚡", color: "#FBBC05", text: "Setup in 30 seconds" },
                  { icon: "✦", color: "#4285F4", text: "AI-powered funnel" },
                ].map(b => (
                  <span key={b.text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                    <span style={{ color: b.color }}>{b.icon}</span> {b.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            {[
              { v: "10,000+", l: "Businesses Trust Us" },
              { v: "2M+", l: "Reviews Generated" },
              { v: "4.9★", l: "Avg Rating Increase" },
              { v: "99.3%", l: "Satisfaction" },
            ].map((s, i) => (
              <div key={s.v} style={{ paddingRight: 28, paddingLeft: i > 0 ? 28 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Phone */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <PhoneMockup/>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: "👥", v: "10,000+", l: "Businesses Trust Us", c: "#4285F4" },
    { icon: "⭐", v: "2M+", l: "5-Star Reviews Generated", c: "#FBBC05" },
    { icon: "📈", v: "4.9★", l: "Average Rating Increase", c: "#34A853" },
    { icon: "🛡", v: "99.3%", l: "Customer Satisfaction", c: "#4285F4" },
  ];
  return (
    <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,8,12,0.6)", padding: "36px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {stats.map(s => (
          <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              background: `${s.c}12`, border: `1px solid ${s.c}22`, boxShadow: `0 0 16px ${s.c}12`
            }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{s.l}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: "⬛", color: "#4285F4", title: "Smart QR Codes", desc: "AI-generated QR codes that route customers directly to your 5-star review funnel, instantly." },
    { icon: "🤖", color: "#34A853", title: "AI Review Funnel", desc: "Mobile-first experience converting happy customers into 5-star Google reviews automatically." },
    { icon: "📊", color: "#FBBC05", title: "Real-time Analytics", desc: "Live insights, growth tracking, and smart performance reports with trend visualization." },
    { icon: "⚡", color: "#4285F4", title: "Automated Follow-ups", desc: "AI sends personalized follow-ups turning satisfied customers into loyal brand advocates." },
    { icon: "🛡", color: "#EA4335", title: "Reputation Protection", desc: "Detect and route negative feedback privately before it reaches public review platforms." },
  ];
  return (
    <section style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{
            display: "inline-flex", padding: "6px 12px", borderRadius: 8, marginBottom: 24,
            background: "rgba(52,168,83,0.08)", border: "1px solid rgba(52,168,83,0.2)",
            color: "#34A853", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em"
          }}>BUILT FOR LOCAL GROWTH</div>
          <h2 style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1.1, marginBottom: 32 }}>
            Everything you need<br/>to dominate{" "}
            <span style={{ color: "#34A853", textShadow: "0 0 24px rgba(52,168,83,0.6)" }}>local search</span>
            <br/>on Google.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {features.map(f => (
              <div key={f.title} style={{
                display: "flex", alignItems: "flex-start", gap: 14, padding: 14, borderRadius: 16,
                background: "#08080C", border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.35)", cursor: "default", transition: "border-color 0.2s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor=`${f.color}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"}
              >
                <div style={{ padding: 8, borderRadius: 10, background: `${f.color}12`, border: `1px solid ${f.color}22`, fontSize: 16, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PhoneMockup/>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>
          <span>GMB</span><span style={{ color: "#4285F4" }}>hub</span> <span style={{ color: "#34A853", fontSize: 12 }}>AI</span>
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", textAlign: "center" }}>
          © 2025 GMBhub. All rights reserved. Not affiliated with Google LLC.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Built Securely using Google Maps API V3
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ background: "#020204", color: "#fff", fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif", minHeight: "100vh", position: "relative" }}>
      <AmbientBg/>
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar/>
        <HeroSection/>
        <StatsBar/>
        <FeaturesSection/>

        {/* CTA */}
        <section style={{ padding: "80px 24px", textAlign: "center", position: "relative" }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 50% 0%, rgba(66,133,244,0.12) 0%, transparent 60%)"
          }}/>
          <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: 20 }}>
              Ready to grow your<br/>
              <span style={{ color: "#34A853", textShadow: "0 0 32px rgba(52,168,83,0.6)" }}>Google Reviews?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 36, fontSize: 16 }}>
              Join 10,000+ businesses using GMBhub to dominate local search.
            </p>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 36px", borderRadius: 18, border: "none", cursor: "pointer",
              background: "#4285F4", color: "#fff", fontWeight: 700, fontSize: 16,
              animation: "pulse 2.5s ease-in-out infinite"
            }}>
              Start Free — No Credit Card
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        <Footer/>
      </div>
    </div>
  );
}
