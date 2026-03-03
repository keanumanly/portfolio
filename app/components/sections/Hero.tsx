"use client";

import { useEffect, useState } from "react";
import { meta } from "@/lib/newdata";

const roles = [
  "Software Engineer",
  "Full-Stack Engineer",
  "Front End Developer",
  "Backend Developer"
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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
      // accent: "var(--terminal-blue)",
      // glow: "rgba(91,184,245,0.12)",
      accent: "var(--terminal-green)",
      glow: "rgba(61,219,106,0.12)",
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
      // accent: "var(--terminal-blue)",
      // glow: "rgba(91,184,245,0.12)",
      accent: "var(--terminal-green)",
      glow: "rgba(61,219,106,0.12)",
    },
    {
      id: "response",
      value: "3",
      unit: "",
      label: "Certifications",
      sub: "Boomcamp | AWS",
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
      // accent: "var(--terminal-amber)",
      // glow: "rgba(245,166,35,0.12)",
      accent: "var(--terminal-green)",
      glow: "rgba(61,219,106,0.12)",
    },
  ];

  
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const anim = (delay = 0): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "none" : "translateY(18px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 grid-bg overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[var(--terminal-green)] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[var(--terminal-blue)] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
        {/* Terminal path */}
        <div
          className={`font-mono text-xs text-[var(--text-tertiary)] mb-8 flex items-center gap-2 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="text-[var(--terminal-green)]">~/ 01 - portfolio.tsx</span>
          {/* <span>portfolio</span>
          <span className="text-[var(--border)]">/</span>
          <span className="text-[var(--text-tertiary)]">index.tsx</span> */}
        </div>

        {/* Name */}
        <h1
          className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] leading-[0.95] tracking-tight mb-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Keanu
          <br />
          <span className="text-[var(--text-secondary)]">Manly</span>
          {/* <span className="text-[var(--terminal-green)]">Manly</span> */}
        </h1>

        {/* Typewriter role */}
        <div
          className={`font-mono text-sm md:text-base text-[var(--text-tertiary)] mb-10 h-6 flex items-center gap-1 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <span className="text-[var(--terminal-green)]">~/</span>
          <span className="ml-2 text-[var(--text-primary)] font-bold">{displayed}</span>
          <span className="animate-cursor-blink text-[var(--terminal-green)] text-xs">█</span>
        </div>

        {/* Value proposition */}
        {/* <p
          className={`max-w-2xl text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {meta.heroStatement}
        </p> */}
        <h1 className={`statement-hero`} style={{
            ...anim(220),
          }}>
            {meta.heroStatement.map((seg, i) =>
              seg.highlight
                ? <span key={i} className="hero-hl">{seg.text}</span>
                : <span key={i}>{seg.text}</span>
            )}
          </h1>

        {/* Stats row */}
        <div className={`csc`} style={{ ...anim(520) }}>
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
        
        {/* <div
          className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {meta.stats.map((stat) => (
            <div
              key={stat.label}
              className="bento-card px-4 py-3 flex flex-col items-center gap-0.5 min-w-[110px]"
            >
              <span className="font-display text-xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </span>
              <span className="terminal-label">{stat.label}</span>
            </div>
          ))}
        </div> */}

        <div
          className={`flex flex-wrap gap-3 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <button
            onClick={() => scrollToSection("work")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md cursor-pointer bg-[var(--accent)] text-[var(--accent-fg)] font-mono text-xs tracking-wider hover:opacity-90 transition-opacity"
          >
            View Work
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </button>
          <button  onClick={() => scrollToSection("contact")} className="cta-hire">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Hire Me
          </button>
          <a
            href="/cv/KEANU ELY GILBERT MANLY.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[var(--border)] text-[var(--text-secondary)] font-mono text-xs tracking-wider hover:border-[var(--terminal-green)] hover:text-[var(--terminal-green)] transition-all"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--terminal-green)"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div> */}
    </section>
  );
}