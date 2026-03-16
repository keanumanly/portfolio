"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/newdata";
import type { Project } from "@/lib/newdata";

// ─── Screenshot Side Modal ────────────────────────────────────────────────────

function ScreenshotModal({
  screenshots,
  onClose,
}: {
  screenshots: { src: string; alt: string; caption?: string }[];
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") setActive(i => Math.min(i + 1, screenshots.length - 1));
      if (e.key === "ArrowLeft")  setActive(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, screenshots.length]);

  return (
    <>
      <style>{`
        .ssm-backdrop {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease;
        }
        .ssm-panel {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 9001;
          width: min(540px, 92vw);
          background: var(--bg-card);
          border-left: 1px solid var(--border);
          display: flex; flex-direction: column;
          animation: ssm-slide-in 0.32s cubic-bezier(0.16,1,0.3,1);
          box-shadow: -16px 0 48px rgba(0,0,0,0.35);
        }
        @keyframes ssm-slide-in {
          from { transform: translateX(100%); opacity: 0.4; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .ssm-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .ssm-close {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--bg-hover); border: 1px solid var(--border);
          color: var(--text-tertiary); display: flex;
          align-items: center; justify-content: center;
          cursor: pointer; transition: color 0.2s, border-color 0.2s;
        }
        .ssm-close:hover { color: var(--text-primary); border-color: var(--accent-muted); }
        .ssm-img-wrap {
          flex: 1; overflow: hidden; position: relative;
          background: var(--bg-primary);
          display: flex; align-items: center; justify-content: center;
        }
        .ssm-img {
          width: 100%; height: 100%;
          object-fit: contain; display: block;
        }
        .ssm-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 32px; height: 32px; border-radius: 7px;
          background: rgba(0,0,0,0.52); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1); color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; opacity: 0;
          transition: opacity 0.2s, background 0.2s;
        }
        .ssm-img-wrap:hover .ssm-arrow { opacity: 1; }
        .ssm-arrow:disabled { opacity: 0 !important; pointer-events: none; }
        .ssm-arrow:hover { background: rgba(0,0,0,0.78); }
        .ssm-arrow.prev { left: 10px; }
        .ssm-arrow.next { right: 10px; }
        .ssm-footer {
          flex-shrink: 0;
          border-top: 1px solid var(--border);
          background: var(--bg-surface);
        }
        .ssm-caption {
          padding: 10px 16px 6px;
          font-family: var(--font-geist-mono, monospace);
          font-size: 0.62rem; letter-spacing: 0.08em;
          color: var(--text-tertiary);
          display: flex; align-items: center; gap: 7px;
        }
        .ssm-thumbs {
          display: flex; gap: 6px;
          padding: 8px 16px 14px;
          overflow-x: auto; scrollbar-width: none;
        }
        .ssm-thumbs::-webkit-scrollbar { display: none; }
        .ssm-thumb {
          width: 52px; height: 34px; border-radius: 4px;
          overflow: hidden; cursor: pointer; flex-shrink: 0;
          border: 1.5px solid transparent;
          transition: border-color 0.18s, transform 0.18s;
          background: var(--bg-card);
        }
        .ssm-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(0.48); transition: filter 0.18s;
        }
        .ssm-thumb:hover img  { filter: brightness(0.75); }
        .ssm-thumb:hover      { transform: translateY(-2px); }
        .ssm-thumb.active {
          border-color: var(--terminal-green);
          box-shadow: 0 0 0 1px var(--terminal-green), 0 0 8px rgba(61,219,106,0.2);
        }
        .ssm-thumb.active img { filter: brightness(1); }
      `}</style>

      <div className="ssm-backdrop" onClick={onClose} />

      <div className="ssm-panel">
        {/* Header */}
        <div className="ssm-header">
          <span style={{
            fontFamily: "var(--font-geist-mono,monospace)",
            fontSize: "0.65rem", letterSpacing: "0.1em",
            color: "var(--text-tertiary)",
          }}>
            <span style={{ color: "var(--terminal-green)" }}>◈</span>
            {" "}screenshots{" "}
            <span style={{ opacity: 0.45 }}>{active + 1} / {screenshots.length}</span>
          </span>
          <button className="ssm-close" onClick={onClose} aria-label="Close">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Main image */}
        <div className="ssm-img-wrap">
          <img className="ssm-img" src={screenshots[active].src} alt={screenshots[active].alt} />
          <button className="ssm-arrow prev"
            onClick={() => setActive(i => Math.max(i - 1, 0))}
            disabled={active === 0}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="ssm-arrow next"
            onClick={() => setActive(i => Math.min(i + 1, screenshots.length - 1))}
            disabled={active === screenshots.length - 1}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Footer */}
        <div className="ssm-footer">
          {screenshots[active].caption && (
            <div className="ssm-caption">
              <span style={{ color: "var(--terminal-green)" }}>›</span>
              {screenshots[active].caption}
            </div>
          )}
          {screenshots.length > 1 && (
            <div className="ssm-thumbs">
              {screenshots.map((s, i) => (
                <button key={i} className={`ssm-thumb${i === active ? " active" : ""}`}
                  onClick={() => setActive(i)} aria-label={`Screenshot ${i + 1}`}>
                  <img src={s.src} alt={s.alt} draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  production: { dot: "var(--terminal-green)", label: "Production",  pulse: true  },
  wip:        { dot: "var(--terminal-amber)", label: "In Progress", pulse: false },
  archived:   { dot: "var(--text-tertiary)",  label: "Archived",    pulse: false },
};

const INVOLVEMENT_CONFIG = {
  personal:    { icon: "◈", label: "Personal",     color: "var(--terminal-blue)"  },
  collaborated:{ icon: "◎", label: "Collaborated", color: "var(--terminal-amber)" },
  company:     { icon: "⬡", label: "Company",      color: "var(--text-tertiary)"  },
};

// ─── Projects section ─────────────────────────────────────────────────────────

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="py-24 px-6 border-t border-[var(--border)] bg-[var(--bg-surface)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="section-index mb-3">~/ 03 - work.tsx</div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Selected Projects
            </h2>
            <span className="font-mono text-xs text-[var(--text-tertiary)] hidden md:block">
              More projects coming soon
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* Placeholder */}
        <div
          className={`mt-8 sc p-8 flex items-center justify-center transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          onMouseEnter={() => setHoveredCard("more")}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            borderColor: hoveredCard === "more" ? "var(--terminal-green)" : "var(--border)",
            boxShadow:   hoveredCard === "more" ? "0 0 0 1px rgba(61,219,106,0.28), 0 8px 28px rgba(61,219,106,0.12)" : "none",
          }}
        >
          <div className="sc-corner" style={{
            borderColor: `transparent ${hoveredCard === "more" ? "var(--terminal-green)" : "var(--border)"} transparent transparent`,
            opacity: hoveredCard === "more" ? 0.7 : 0.3,
          }} />
          <div className="text-center">
            <div className="font-mono text-xs text-[var(--terminal-green)] mb-2">// more_projects.push(...)</div>
            <p className="font-mono text-xs text-[var(--text-tertiary)]">
              Additional case studies will be added as the Project Manual is completed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
}) {
  const [expanded, setExpanded]             = useState(false);
  const [hoveredCard, setHoveredCard]       = useState(false);
  const [screenshotOpen, setScreenshotOpen] = useState(false);

  const hasScreenshots = (project.screenshots?.length ?? 0) > 0;
  const status      = STATUS_CONFIG[project.status];
  const involvement = INVOLVEMENT_CONFIG[project.involvement ?? "company"];

  return (
    <>
      <div
        className={`sc overflow-hidden transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          transitionDelay: `${index * 150}ms`,
          borderColor: hoveredCard ? "var(--terminal-green)" : "var(--border)",
          boxShadow:   hoveredCard ? "0 0 0 1px rgba(61,219,106,0.28), 0 8px 28px rgba(61,219,106,0.12)" : "none",
        }}
        onMouseEnter={() => setHoveredCard(true)}
        onMouseLeave={() => setHoveredCard(false)}
      >
        {/* Corner mark */}
        <div className="sc-corner" style={{
          borderColor: `transparent ${hoveredCard ? "var(--terminal-green)" : "var(--border)"} transparent transparent`,
          opacity: hoveredCard ? 0.7 : 0.3,
        }} />

        {/* ── Card body ── */}
        <div className="p-6 md:p-8">

          {/* Title + meta row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              {/* Period */}
              <div className="font-mono text-xs text-[var(--text-tertiary)] mb-3">{project.period}</div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                {project.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xl">
                {project.tagline}
              </p>
            </div>

            {/* ── Meta pills — replaces tags ── */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "flex-start", justifyContent: "flex-end", flexShrink: 0, maxWidth: 280 }}>

              {/* Status */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 20,
                border: `1px solid ${status.dot}38`,
                background: `${status.dot}12`,
                fontFamily: "var(--font-geist-mono,monospace)",
                fontSize: "0.58rem", letterSpacing: "0.1em",
                color: status.dot,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: status.dot, flexShrink: 0,
                  boxShadow: status.pulse ? `0 0 6px ${status.dot}` : "none",
                }} />
                {status.label}
              </span>

              {/* Involvement */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 20,
                border: "1px solid var(--border)",
                background: "var(--bg-hover)",
                fontFamily: "var(--font-geist-mono,monospace)",
                fontSize: "0.58rem", letterSpacing: "0.1em",
                color: involvement.color,
              }}>
                <span style={{ fontSize: "0.52rem" }}>{involvement.icon}</span>
                {involvement.label}
              </span>

              {/* Live URL */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "4px 10px", borderRadius: 20,
                    border: "1px solid rgba(61,219,106,0.25)",
                    background: "rgba(61,219,106,0.07)",
                    fontFamily: "var(--font-geist-mono,monospace)",
                    fontSize: "0.58rem", letterSpacing: "0.1em",
                    color: "var(--terminal-green)",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(61,219,106,0.14)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(61,219,106,0.07)")}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live
                </a>
              )}

              {/* Repo URL — omitted for company projects */}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "4px 10px", borderRadius: 20,
                    border: "1px solid var(--border)",
                    background: "var(--bg-hover)",
                    fontFamily: "var(--font-geist-mono,monospace)",
                    fontSize: "0.58rem", letterSpacing: "0.1em",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--accent-muted)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  {project.repoLabel ?? "GitHub"}
                </a>
              )}

              {/* Screenshots trigger */}
              {hasScreenshots && (
                <button
                  onClick={() => setScreenshotOpen(true)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "4px 10px", borderRadius: 20,
                    border: "1px solid var(--border)",
                    background: "var(--bg-hover)",
                    fontFamily: "var(--font-geist-mono,monospace)",
                    fontSize: "0.58rem", letterSpacing: "0.1em",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--accent-muted)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  Screenshots
                  <span style={{ opacity: 0.45 }}>{project.screenshots!.length}</span>
                </button>
              )}
            </div>
          </div>

          {/* Problem / Solution */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--bg-surface)] rounded-lg p-4 border border-[var(--border-subtle)]">
              <div className="terminal-label text-[var(--terminal-red)] mb-2">problem</div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
            </div>
            <div className="bg-[var(--bg-surface)] rounded-lg p-4 border border-[var(--border-subtle)]">
              <div className="terminal-label text-[var(--terminal-green)] mb-2">solution</div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center cursor-pointer gap-2 font-mono text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
            {expanded ? "Collapse" : "Deep dive — stack, challenges & impact"}
          </button>
        </div>

        {/* Expanded section */}
        {expanded && (
          <div className="border-t border-[var(--border)] p-6 md:p-8 space-y-8 animate-fade-in">
            {/* Tech stack */}
            <div>
              <div className="terminal-label mb-4">technical stack</div>
              <div className="grid md:grid-cols-3 gap-4">
                {(["frontend", "backend", "infra"] as const).map((layer) => (
                  <div key={layer} className="space-y-2">
                    <div className="terminal-label text-[var(--terminal-blue)]">{layer}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack[layer].map((tech) => (
                        <span key={tech} className="font-mono text-xs px-2 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--terminal-amber)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="terminal-label mb-4">key features</div>
              <div className="grid md:grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <span className="text-[var(--terminal-green)] font-mono text-xs mt-0.5">→</span>
                    <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <div className="terminal-label mb-4">challenges & learnings</div>
              <div className="space-y-4">
                {project.challenges.map((c) => (
                  <div key={c.title} className="pl-4 border-l-2 border-[var(--terminal-amber)]">
                    <div className="font-mono text-xs text-[var(--terminal-amber)] mb-1">{c.title}</div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div>
              <div className="terminal-label mb-4">impact</div>
              <div className="space-y-2">
                {project.impact.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-[var(--terminal-green)] font-mono text-xs mt-0.5">◆</span>
                    <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screenshot side modal */}
      {screenshotOpen && hasScreenshots && (
        <ScreenshotModal
          screenshots={project.screenshots!}
          onClose={() => setScreenshotOpen(false)}
        />
      )}
    </>
  );
}