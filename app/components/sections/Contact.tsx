"use client";

import { useEffect, useRef, useState } from "react";
import { meta } from "@/lib/newdata";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(meta.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6 border-t border-[var(--border)] grid-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="section-index mb-3">~/ 06 - contact.tsx</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            Let&apos;s build
            <br />
            something great.
          </h2>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-10 max-w-lg">
            Open to remote roles: <span className="text-[var(--text-primary)]">full stack Developer, software engineer, frontend developer, backend developer</span>.
            If you&apos;re building something that needs to hold under real workloads,
            I&apos;d like to hear about it.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-[var(--accent)] text-[var(--accent-fg)] font-mono text-xs tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              {copied ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Copied to clipboard
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" >
                    <path d="M4 4h11l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  {meta.email}
                </>
              )}
            </button>

            <a
              href={`mailto:${meta.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[var(--border)] text-[var(--terminal-green)] font-mono text-xs tracking-wider hover:border-[var(--terminal-green)] hover:text-[var(--text-primary)] transition-all"
            >
              Open in Mail
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>

          {/* Terminal-style availability status */}
          <div className="sc p-5 font-mono text-xs space-y-1.5"
                onMouseEnter={() => setHoveredCard("true")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderColor: hoveredCard != null ? "var(--terminal-green)" : "var(--border)",
                  boxShadow: hoveredCard != null ? `0 0 0 1px $var(--terminal-green) 28, 0 8px 28px rgba(61,219,106,0.12)` : "none",
          }}>
                {/* Glow overlay */}
                {/* <div className="sc-glow" style={{ background: "rgba(61,219,106,0.12)" }} /> */}
  
                {/* Corner mark */}
                <div
                  className="sc-corner"
                  style={{
                    borderColor: `transparent ${hoveredCard != null ? "var(--terminal-green)" : "var(--border)"} transparent transparent`,
                    opacity: hoveredCard != null ? 0.7 : 0.3,
                  }}
                />
            <div className="text-[var(--text-tertiary)]">
              <span className="text-[var(--terminal-green)]">$</span>{" "}
              curl -s api.keanumanly.dev/status
            </div>
            <div className="pl-4 space-y-1">
              <div>
                <span className="text-[var(--text-tertiary)]">availability:</span>{" "}
                <span className="text-[var(--terminal-green)]">&quot;open_to_opportunities&quot;</span>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">timezone:</span>{" "}
                <span className="text-[var(--text-secondary)]">&quot;Asia/Manila (UTC+8)&quot;</span>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">preferred:</span>{" "}
                <span className="text-[var(--text-secondary)]">&quot;remote&quot;</span>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">response_time:</span>{" "}
                <span className="text-[var(--text-secondary)]">&quot;within 24h&quot;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}