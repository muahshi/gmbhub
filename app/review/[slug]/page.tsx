"use client";
import React from "react";
import { useState, useEffect } from "react";

// ── Google G Logo ─────────────────────────────────────────────────────
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ── 3D Gold Star ──────────────────────────────────────────────────────
function GoldStar({ index, lit, onClick, onHover, onLeave }: { index: number; lit: boolean; onClick: () => void; onHover: (i: number) => void; onLeave: () => void }) {
  return (
    <button
      onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}
      style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        transform: lit ? "scale(1.18) translateY(-4px)" : "scale(1)",
        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        position: "relative"
      }}
      aria-label={`Rate ${index} stars`}
    >
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <defs>
          <radialGradient id={`s3d-${index}`} cx="42%" cy="22%" r="72%">
            <stop offset="0%" stopColor="#FFF0A0"/>
            <stop offset="28%" stopColor="#FFD93D"/>
            <stop offset="62%" stopColor="#FBBC05"/>
            <stop offset="100%" stopColor="#C87000"/>
          </radialGradient>
          <linearGradient id={`srim-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,200,0.6)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
        </defs>
        {lit && (
          <ellipse cx="26" cy="50" rx="16" ry="3" fill="rgba(251,188,5,0.35)"
            style={{ filter: "blur(4px)" }}/>
        )}
        <polygon
          points="26,4 31.4,18.5 47.5,18.5 34.8,27.6 39.5,42.5 26,33.5 12.5,42.5 17.2,27.6 4.5,18.5 20.6,18.5"
          fill={lit ? `url(#s3d-${index})` : "rgba(255,255,255,0.1)"}
          style={{
            filter: lit
              ? "drop-shadow(0 0 12px rgba(251,188,5,1)) drop-shadow(0 0 28px rgba(251,188,5,0.6)) drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
              : "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
            transition: "filter 0.2s, fill 0.15s"
          }}
        />
        {lit && (
          <>
            <polygon
              points="26,4 31.4,18.5 47.5,18.5 34.8,27.6 39.5,42.5 26,33.5 12.5,42.5 17.2,27.6 4.5,18.5 20.6,18.5"
              fill={`url(#srim-${index})`} opacity={0.5}
            />
            <circle cx="18" cy="12" r="1.8" fill="rgba(255,255,220,0.95)"/>
            <circle cx="36" cy="10" r="1.2" fill="rgba(255,255,200,0.75)"/>
          </>
        )}
      </svg>
      {lit && (
        <div style={{
          position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
          width: 36, height: 8, borderRadius: "50%",
          background: "rgba(251,188,5,0.55)", filter: "blur(5px)"
        }}/>
      )}
    </button>
  );
}

// ── Positive Flow — Review Cards ──────────────────────────────────────
const reviewCards = [
  { id: 1, text: "Absolutely loved the atmosphere and the coffee was perfect. The staff was so friendly and made us feel right at home!" },
  { id: 2, text: "Best café experience I've had in a long time. The espresso was rich and the ambiance was just right. Highly recommend!" },
  { id: 3, text: "Brewed Bliss is our go-to spot now. Amazing service, delicious pastries, and wonderful coffee. 5 stars every time!" },
];

function PositiveFlow({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCopy = (card) => {
    setSelectedCard(card.id);
    navigator.clipboard.writeText(card.text).catch(() => {});
    setCopied(card.id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button onClick={onBack} style={{
        alignSelf: "flex-start", background: "none", border: "none", color: "rgba(255,255,255,0.4)",
        fontSize: 12, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 4
      }}>← Back</button>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16, margin: "0 auto 12px",
          background: "rgba(52,168,83,0.15)", border: "1px solid rgba(52,168,83,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
          boxShadow: "0 0 24px rgba(52,168,83,0.2)"
        }}>🎉</div>
        <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6, fontFamily: "'Playfair Display', Georgia, serif" }}>
          You loved it!
        </h3>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
          Choose a review or write your own,<br/>then post it on Google.
        </p>
      </div>

      {/* Review cards */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {reviewCards.map(card => (
          <div key={card.id}
            onClick={() => handleCopy(card)}
            style={{
              padding: "14px 16px", borderRadius: 14, cursor: "pointer", transition: "all 0.2s",
              background: selectedCard === card.id ? "rgba(52,168,83,0.12)" : "rgba(255,255,255,0.04)",
              border: selectedCard === card.id ? "1px solid rgba(52,168,83,0.4)" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: selectedCard === card.id ? "0 0 20px rgba(52,168,83,0.15)" : "none"
            }}
          >
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 8 }}>"{card.text}"</p>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700,
              color: copied === card.id ? "#34A853" : "rgba(255,255,255,0.4)"
            }}>
              {copied === card.id ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  Tap to copy & use this review
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Google CTA */}
      <a href="#" style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10,
        padding: "16px 18px", borderRadius: 18, textDecoration: "none",
        background: selectedCard ? "#4285F4" : "rgba(66,133,244,0.4)",
        boxShadow: selectedCard ? "0 0 32px rgba(66,133,244,0.6), 0 4px 16px rgba(0,0,0,0.5)" : "none",
        color: "#fff", fontWeight: 700, fontSize: 14, transition: "all 0.3s",
        justifyContent: "center", position: "relative", overflow: "hidden"
      }}>
        <GoogleG size={20}/>
        Leave a Review on Google
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4 }}>
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>

      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 12, textAlign: "center" }}>
        Copy a review above, then paste it in Google when prompted
      </p>
    </div>
  );
}

// ── Negative Flow — Private Feedback ─────────────────────────────────
const issueTags = ["Taste Issue", "Service Delay", "Hygiene", "Pricing", "Ambience", "Wait Time", "Cleanliness", "Staff"];

function NegativeFlow({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState([]);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const toggleTag = tag => setSelected(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);

  return (
    <div style={{ padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button onClick={onBack} style={{
        alignSelf: "flex-start", background: "none", border: "none", color: "rgba(255,255,255,0.4)",
        fontSize: 12, cursor: "pointer", marginBottom: 20
      }}>← Back</button>

      {!sent ? (
        <>
          <div style={{
            width: 52, height: 52, borderRadius: 16, margin: "0 auto 14px",
            background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
            boxShadow: "0 0 24px rgba(139,92,246,0.2)"
          }}>💬</div>

          <h3 style={{ fontSize: 19, fontWeight: 900, marginBottom: 6, textAlign: "center", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Let us make it right
          </h3>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: 20, lineHeight: 1.6 }}>
            Your feedback goes directly to our team.<br/>We'll reach out to resolve this personally.
          </p>

          {/* Issue tags */}
          <div style={{ width: "100%", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>What went wrong? (select all that apply)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {issueTags.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  style={{
                    padding: "6px 14px", borderRadius: 999, fontSize: 12, cursor: "pointer", transition: "all 0.2s", fontWeight: 600,
                    background: selected.includes(tag) ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.05)",
                    border: selected.includes(tag) ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    color: selected.includes(tag) ? "#A78BFA" : "rgba(255,255,255,0.55)",
                    boxShadow: selected.includes(tag) ? "0 0 12px rgba(139,92,246,0.25)" : "none"
                  }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <textarea
            value={msg} onChange={e => setMsg(e.target.value)}
            placeholder="Tell us what happened in detail…"
            rows={4}
            style={{
              width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 14, padding: "14px 16px", color: "#fff", fontSize: 13, outline: "none",
              resize: "none", marginBottom: 14, fontFamily: "inherit", lineHeight: 1.6
            }}
          />

          {/* WhatsApp + Send */}
          <div style={{ width: "100%", display: "flex", gap: 10, marginBottom: 16 }}>
            <a href="https://wa.me/919999999999" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px", borderRadius: 14, textDecoration: "none",
              background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366", fontWeight: 700, fontSize: 13
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M20.52 3.449A11.92 11.92 0 0012.004 0C5.454 0 .113 5.341.11 11.892a11.86 11.86 0 001.587 5.948L0 24l6.335-1.652a11.95 11.95 0 005.669 1.44h.005c6.549 0 11.89-5.341 11.893-11.892a11.82 11.82 0 00-3.381-8.447z"/>
              </svg>
              WhatsApp Us
            </a>
            <button onClick={() => (selected.length > 0 || msg) && setSent(true)}
              disabled={selected.length === 0 && !msg}
              style={{
                flex: 2, padding: "13px", borderRadius: 14, border: "none", cursor: "pointer",
                background: (selected.length > 0 || msg) ? "rgba(139,92,246,0.9)" : "rgba(139,92,246,0.25)",
                color: "#fff", fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                boxShadow: (selected.length > 0 || msg) ? "0 0 24px rgba(139,92,246,0.4)" : "none"
              }}>
              Send Private Feedback
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#34A853" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Your feedback is completely private and secure.
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
            background: "rgba(52,168,83,0.15)", border: "1px solid rgba(52,168,83,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
            boxShadow: "0 0 32px rgba(52,168,83,0.25)"
          }}>✓</div>
          <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif" }}>Thank you!</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            We've received your feedback.<br/>Our team will reach out shortly to make things right.
          </p>
          <button onClick={onBack} style={{
            marginTop: 24, padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer",
            background: "#0F0F14", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: 13
          }}>← Back to Review</button>
        </div>
      )}
    </div>
  );
}

// ── Main Review Screen ────────────────────────────────────────────────
function ReviewScreen({ onPositive, onNegative }: { onPositive: () => void; onNegative: () => void }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleStar = n => {
    setSelected(n);
    if (n >= 4) setTimeout(onPositive, 500);
    else setTimeout(onNegative, 500);
  };

  return (
    <div style={{ padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: 680, position: "relative" }}>
      {/* Warm cafe ambient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 70% 20%, rgba(120,60,10,0.7) 0%, transparent 55%)"
      }}/>
      <div style={{
        position: "absolute", top: 80, right: 20, width: 80, height: 80, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,160,50,0.25) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none"
      }}/>
      <div style={{
        position: "absolute", top: 180, left: 10, width: 60, height: 60, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,140,30,0.18) 0%, transparent 70%)", filter: "blur(16px)", pointerEvents: "none"
      }}/>

      {/* Business logo */}
      <div style={{
        width: 68, height: 68, borderRadius: 22, fontSize: 30, flexShrink: 0, zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
        background: "linear-gradient(145deg, rgba(251,188,5,0.18) 0%, rgba(0,0,0,0.5) 100%)",
        border: "1.5px solid rgba(251,188,5,0.38)", boxShadow: "0 0 28px rgba(251,188,5,0.25), 0 8px 24px rgba(0,0,0,0.6)"
      }}>☕</div>

      {/* Business name */}
      <h2 style={{
        fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 4, zIndex: 2,
        fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
        color: "#F5E6C0", textShadow: "0 2px 16px rgba(0,0,0,0.8)"
      }}>Brewed Bliss Cafe</h2>

      {/* Decorative divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, zIndex: 2 }}>
        <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, rgba(251,188,5,0.45))" }}/>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(251,188,5,0.55)" }}/>
        <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, rgba(251,188,5,0.45), transparent)" }}/>
      </div>

      {/* Question */}
      <h3 style={{
        fontSize: 26, fontWeight: 700, textAlign: "center", marginBottom: 10, zIndex: 2, lineHeight: 1.3,
        fontFamily: "'Playfair Display', Georgia, serif", textShadow: "0 2px 20px rgba(0,0,0,0.9)"
      }}>How was your<br/>experience today?</h3>

      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: 28, zIndex: 2, lineHeight: 1.65 }}>
        Your feedback helps us grow and<br/>serve you better.
      </p>

      {/* Stars */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, zIndex: 2 }}>
        {[1,2,3,4,5].map(n => (
          <GoldStar key={n} index={n} lit={n <= (hovered || selected)}
            onClick={() => handleStar(n)}
            onHover={() => setHovered(n)} onLeave={() => setHovered(0)}
          />
        ))}
      </div>

      {/* Prompt card */}
      <div style={{
        width: "100%", padding: "14px 16px", borderRadius: 16, marginBottom: 14, zIndex: 2,
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(251,188,5,0.12)", border: "1px solid rgba(251,188,5,0.22)"
          }}>❤️</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>Love our coffee and service?</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
              Leave a <span style={{ color: "#FBBC05", fontWeight: 700 }}>5-star review</span> and help others discover us.
            </div>
          </div>
        </div>
      </div>

      {/* Google CTA */}
      <button onClick={onPositive}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12,
          padding: "16px 18px", borderRadius: 18, border: "none", cursor: "pointer",
          background: "#4285F4", color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 12, zIndex: 2,
          boxShadow: "0 0 32px rgba(66,133,244,0.6), 0 4px 16px rgba(0,0,0,0.5)",
          position: "relative", overflow: "hidden"
        }}>
        <GoogleG size={20}/>
        <span style={{ flex: 1, textAlign: "center" }}>Leave a Review on Google</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        {/* Shimmer */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
          backgroundSize: "200%", animation: "shimmer 2.5s ease infinite"
        }}/>
      </button>

      {/* Issue CTA */}
      <button onClick={onNegative}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "14px 18px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, marginBottom: 24, zIndex: 2
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span style={{ flex: 1, textAlign: "left" }}>I had an issue — Let us make it right</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>

      {/* Trust seal */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#34A853", zIndex: 2, textShadow: "0 0 10px rgba(52,168,83,0.5)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        Verified Secure Google OAuth Node
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
          <rect x="3" y="7" width="10" height="8" rx="1.5"/>
          <path d="M5 7V5a3 3 0 0 1 6 0v2"/>
        </svg>
      </div>
    </div>
  );
}

// ── Phone Chassis ─────────────────────────────────────────────────────
function PhoneChassis({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: 390, flexShrink: 0 }}>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, transform: "scale(1.1) translateY(10%)",
        background: "radial-gradient(ellipse at 50% 60%, rgba(251,188,5,0.3) 0%, rgba(66,133,244,0.15) 40%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none"
      }}/>
      <div style={{
        position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
        width: 240, height: 30, borderRadius: "50%",
        background: "rgba(52,168,83,0.4)", filter: "blur(28px)", pointerEvents: "none"
      }}/>
      {/* Body */}
      <div style={{
        position: "relative", zIndex: 10, borderRadius: 52,
        background: "#020204", border: "1.5px solid rgba(255,255,255,0.15)",
        boxShadow: "0 0 0 0.5px rgba(255,255,255,0.07), 0 50px 120px rgba(0,0,0,0.95), 0 0 80px rgba(251,188,5,0.1), inset 0 1px 0 rgba(255,255,255,0.12)",
        overflow: "hidden"
      }}>
        {/* Status bar */}
        <div style={{ background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px 8px" }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="rgba(255,255,255,0.85)">
              <rect x="0" y="8" width="3" height="4" rx="0.5"/><rect x="5" y="5" width="3" height="7" rx="0.5"/>
              <rect x="10" y="2" width="3" height="10" rx="0.5"/><rect x="15" y="0" width="3" height="12" rx="0.5"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2">
              <path d="M1 4C3.8 1.5 7 0 8 0s4.2 1.5 7 4"/><path d="M3 7c1.4-1.5 3-2.3 5-2.3s3.6.8 5 2.3"/>
              <circle cx="8" cy="10.5" r="1.2" fill="rgba(255,255,255,0.85)" stroke="none"/>
            </svg>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
              <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="rgba(255,255,255,0.5)"/>
              <rect x="2" y="2" width="18" height="9" rx="2" fill="rgba(255,255,255,0.85)"/>
              <path d="M23.5 4.5v4a2 2 0 0 0 0-4z" fill="rgba(255,255,255,0.4)"/>
            </svg>
          </div>
        </div>
        {/* Dynamic island */}
        <div style={{ display: "flex", justifyContent: "center", background: "rgba(0,0,0,0.9)", paddingBottom: 4 }}>
          <div style={{ width: 120, height: 32, borderRadius: 999, background: "#000" }}/>
        </div>
        {/* Screen */}
        <div style={{
          minHeight: 680, overflow: "auto",
          background: "linear-gradient(180deg, #1A0E00 0%, #0A0600 40%, #000000 100%)"
        }}>
          {children}
        </div>
        {/* Home bar */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0", background: "#000" }}>
          <div style={{ width: 130, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.28)" }}/>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function ReviewFunnel() {
  const [screen, setScreen] = useState("review"); // review | positive | negative

  return (
    <div style={{
      background: "#020204", minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      color: "#fff"
    }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>

      {/* Mobile view */}
      <div style={{ display: "block" }}>
        <div style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #1A0E00 0%, #0A0600 40%, #000000 100%)"
        }}>
          {screen === "review" && <ReviewScreen onPositive={() => setScreen("positive")} onNegative={() => setScreen("negative")}/>}
          {screen === "positive" && <PositiveFlow onBack={() => setScreen("review")}/>}
          {screen === "negative" && <NegativeFlow onBack={() => setScreen("review")}/>}
        </div>
      </div>

      {/* Desktop: phone mockup (shown above mobile on large screens via media query) */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-view { display: none !important; }
          .desktop-view { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-view { display: none !important; }
        }
      `}</style>

      {/* Desktop wrapper */}
      <div className="desktop-view" style={{
        display: "none", position: "fixed", inset: 0,
        background: "#020204", alignItems: "center", justifyContent: "center",
        zIndex: 100
      }}>
        {/* Ambient orbs */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(66,133,244,0.06) 0%, rgba(251,188,5,0.04) 40%, transparent 70%)",
          filter: "blur(100px)", pointerEvents: "none"
        }}/>
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,168,83,0.07) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none"
        }}/>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px", opacity: 0.4, pointerEvents: "none"
        }}/>

        <div style={{ animation: "float 6s ease-in-out infinite" }}>
          <PhoneChassis>
            {screen === "review" && <ReviewScreen onPositive={() => setScreen("positive")} onNegative={() => setScreen("negative")}/>}
            {screen === "positive" && <PositiveFlow onBack={() => setScreen("review")}/>}
            {screen === "negative" && <NegativeFlow onBack={() => setScreen("review")}/>}
          </PhoneChassis>
        </div>
      </div>
    </div>
  );
}
