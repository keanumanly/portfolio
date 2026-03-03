"use client";

import { useEffect, useState } from "react";

// ─── Stat card data ──────────────────────────────────────────────────────────
const statCards = [
  {
    id: "exp",
    value: "6",
    unit: "years",
    label: "Experience",
    sub: "Production systems",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    accent: "var(--terminal-green)",
    glow: "rgba(61,219,106,0.12)",
  },
  {
    id: "projects",
    value: "10+",
    unit: "",
    label: "Projects Shipped",
    sub: "End-to-end ownership",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    accent: "var(--terminal-blue)",
    glow: "rgba(91,184,245,0.12)",
  },
  {
    id: "stack",
    value: "8",
    unit: "layers",
    label: "Stack Depth",
    sub: "Front → Infra",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.12)",
  },
  {
    id: "avail",
    value: "Open",
    unit: "",
    label: "Availability",
    sub: "Full-time · Contract",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    accent: "var(--terminal-green)",
    glow: "rgba(61,219,106,0.12)",
    pulse: true,
  },
  {
    id: "rate",
    value: "$30",
    unit: "/hr",
    label: "Starting Rate",
    sub: "Negotiable · Project-based",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    accent: "var(--terminal-amber)",
    glow: "rgba(245,166,35,0.12)",
  },
  {
    id: "tz",
    value: "UTC+8",
    unit: "",
    label: "Time Zone",
    sub: "Remote-ready · Async",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    accent: "var(--terminal-blue)",
    glow: "rgba(91,184,245,0.12)",
  },
  {
    id: "response",
    value: "<24h",
    unit: "",
    label: "Response Time",
    sub: "Mon–Sat · Fast replies",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    accent: "var(--terminal-green)",
    glow: "rgba(61,219,106,0.12)",
  },
  {
    id: "delivery",
    value: "100%",
    unit: "",
    label: "Delivery Rate",
    sub: "On-time · Production-ready",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    accent: "var(--terminal-amber)",
    glow: "rgba(245,166,35,0.12)",
  },
];

// ─── Highlighted hero statement segments ─────────────────────────────────────
const heroHeadline: { text: string; highlight: boolean }[] = [
  { text: "I build full-stack systems that ", highlight: false },
  { text: "ship to production,", highlight: true },
  { text: " scale under load,", highlight: false },
  { text: " and ", highlight: false },
  { text: "solve real business problems.", highlight: true },
];

const heroSub =
  "Senior engineer available for full-time roles, contract work, and technical consulting. Six years of end-to-end ownership — from database schema to cloud deployment.";

const roles = [
  "Full-Stack Engineer",
  "System Architect",
  "API Designer",
  "Team Lead",
  "Cloud Engineer",
  "Technical Consultant",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);
  const [visible, setVisible]     = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 72);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2600);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 38);
    } else {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const anim = (delay = 0): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "none" : "translateY(18px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <>
      <style>{`
        /* Hero headline highlight */
        .hero-hl {
          position: relative;
          color: var(--text-primary);
        }
        .hero-hl::after {
          content: '';
          position: absolute;
          left: -3px; right: -3px;
          bottom: 2px; top: 2px;
          background: rgba(61,219,106,0.11);
          border-bottom: 1.5px solid rgba(61,219,106,0.5);
          border-radius: 3px;
          z-index: -1;
        }

        /* Pulse dot */
        .pulse-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--terminal-green);
          margin-right: 4px;
          position: relative; top: -1px;
          flex-shrink: 0;
        }
        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: -3px; border-radius: 50%;
          background: var(--terminal-green);
          opacity: 0.35;
          animation: rpulse 2s ease-out infinite;
        }
        @keyframes rpulse {
          0%   { transform: scale(1);   opacity: 0.35; }
          100% { transform: scale(2.6); opacity: 0; }
        }

        /* Stat card */
        .sc {
          position: relative;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px 18px 14px;
          flex: 1 1 148px;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          cursor: default;
        }
        .sc:hover { transform: translateY(-4px); }

        /* Glow fill */
        .sc-glow {
          position: absolute; inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.22s ease;
          pointer-events: none;
        }
        .sc:hover .sc-glow { opacity: 1; }

        /* Top-right corner clip */
        .sc-corner {
          position: absolute;
          top: 0; right: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 14px 14px 0;
          border-color: transparent var(--border) transparent transparent;
          border-radius: 0 8px 0 0;
          transition: border-color 0.22s ease, opacity 0.22s ease;
          opacity: 0.35;
        }

        /* CTA buttons */
        .cta-hire {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--terminal-green);
          color: #0a0a0f;
          border: none;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em;
          padding: 12px 26px;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .cta-hire:hover { opacity: 0.86; transform: translateY(-2px); }

        .cta-ghost {
          position: relative; overflow: hidden; z-index: 0;
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          padding: 12px 26px;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.25s, border-color 0.25s;
        }
        .cta-ghost::before {
          content: '';
          position: absolute; inset: 0; z-index: -1;
          background: rgba(255,255,255,0.04);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-ghost:hover { color: var(--text-primary); border-color: var(--accent-muted); }
        .cta-ghost:hover::before { transform: scaleX(1); }

        /* Role badge */
        .role-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(61,219,106,0.2);
          background: rgba(61,219,106,0.05);
          border-radius: 20px;
          padding: 5px 14px 5px 10px;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        /* Scroll bounce */
        @keyframes sbounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(7px); }
        }

        /* Cursor blink */
        @keyframes cblink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cblink { animation: cblink 1.1s step-end infinite; }
      `}</style>

      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 24px",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        {/* Ambient glows */}
        <div style={{ position:"absolute", pointerEvents:"none", width:600, height:400, top:-100, left:-150, background:"radial-gradient(ellipse, rgba(61,219,106,0.06) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", pointerEvents:"none", width:500, height:400, bottom:0, right:-100, background:"radial-gradient(ellipse, rgba(91,184,245,0.05) 0%, transparent 70%)" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", paddingTop:100, paddingBottom:80 }}>

          {/* ── Badge row: path + typewriter role ── */}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:12, marginBottom:32, ...anim(100) }}>
            <span style={{ fontFamily:"var(--font-mono,monospace)", fontSize:"0.68rem", color:"var(--text-tertiary)", letterSpacing:"0.08em" }}>
              <span style={{ color:"var(--terminal-green)" }}>●</span>{" "}~/portfolio
            </span>
            <span style={{ color:"var(--border)", fontSize:"0.6rem" }}>—</span>
            <div className="role-badge">
              <span style={{ color:"var(--terminal-green)", fontSize:"0.55rem" }}>▶</span>
              <span style={{ color:"var(--text-primary)" }}>{displayed}</span>
              <span className="cblink" style={{ color:"var(--terminal-green)", fontSize:"0.75rem", lineHeight:1 }}>█</span>
            </div>
          </div>

          {/* ── Headline with highlighted phrases ── */}
          <h1 style={{
            fontFamily: "var(--font-display, var(--font-syne, sans-serif))",
            fontSize: "clamp(34px, 5.2vw, 66px)",
            lineHeight: 1.13,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-secondary)",
            maxWidth: 800,
            marginBottom: 24,
            ...anim(220),
          }}>
            {heroHeadline.map((seg, i) =>
              seg.highlight
                ? <span key={i} className="hero-hl">{seg.text}</span>
                : <span key={i}>{seg.text}</span>
            )}
          </h1>

          {/* ── Sub-headline ── */}
          <p style={{
            fontSize: "clamp(0.88rem, 1.3vw, 1.02rem)",
            color: "var(--text-tertiary)",
            lineHeight: 1.78,
            maxWidth: 540,
            marginBottom: 44,
            ...anim(340),
          }}>
            {heroSub}
          </p>

          {/* ── CTA row ── */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:56, ...anim(420) }}>
            <a href="#contact" className="cta-hire">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Hire Me
            </a>
            <a href="#projects" className="cta-ghost">
              View My Work
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
            <a href="/cv/keanu-manly-cv.pdf" download className="cta-ghost">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume.pdf
            </a>
          </div>

          {/* ── Stat cards ── */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, ...anim(520) }}>
            {statCards.map((card) => {
              const hovered = hoveredCard === card.id;
              return (
                <div
                  key={card.id}
                  className="sc"
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderColor: hovered ? card.accent : "var(--border)",
                    boxShadow: hovered ? `0 0 0 1px ${card.accent}28, 0 8px 28px ${card.glow}` : "none",
                  }}
                >
                  {/* Glow overlay */}
                  <div className="sc-glow" style={{ background: card.glow }} />

                  {/* Corner mark */}
                  <div
                    className="sc-corner"
                    style={{
                      borderColor: `transparent ${hovered ? card.accent : "var(--border)"} transparent transparent`,
                      opacity: hovered ? 0.7 : 0.3,
                    }}
                  />

                  {/* Icon */}
                  <div style={{ color: hovered ? card.accent : "var(--text-tertiary)", marginBottom:10, transition:"color 0.22s ease", position:"relative", zIndex:1 }}>
                    {card.icon}
                  </div>

                  {/* Value */}
                  <div style={{
                    fontFamily: "var(--font-display, var(--font-syne, sans-serif))",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: hovered ? card.accent : "var(--text-primary)",
                    marginBottom: 5,
                    transition: "color 0.22s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    position: "relative", zIndex: 1,
                  }}>
                    {card.pulse && <span className="pulse-dot" />}
                    {card.value}
                    {card.unit && (
                      <span style={{ fontSize:"0.6rem", fontFamily:"var(--font-mono,monospace)", fontWeight:400, color:"var(--text-tertiary)", letterSpacing:"0.06em" }}>
                        {card.unit}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div style={{ fontFamily:"var(--font-mono,monospace)", fontSize:"0.61rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-tertiary)", marginBottom:2, position:"relative", zIndex:1 }}>
                    {card.label}
                  </div>

                  {/* Sub */}
                  <div style={{ fontFamily:"var(--font-mono,monospace)", fontSize:"0.57rem", color:"var(--text-tertiary)", opacity:0.55, position:"relative", zIndex:1 }}>
                    {card.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div style={{
          position:"absolute", bottom:28, left:"50%",
          display:"flex", flexDirection:"column", alignItems:"center", gap:5,
          animation:"sbounce 2.2s ease-in-out infinite",
          opacity: visible ? 0.45 : 0,
          transition:"opacity 0.6s ease 1.2s",
        }}>
          <span style={{ fontFamily:"var(--font-mono,monospace)", fontSize:"0.54rem", letterSpacing:"0.22em", color:"var(--text-tertiary)" }}>SCROLL</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>
    </>
  );
}