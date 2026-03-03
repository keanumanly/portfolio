"use client";

import { useEffect, useRef, useState } from "react";
import { meta, education } from "@/lib/newdata";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-6 border-t border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="section-index mb-3">~/ 02 - about.tsx</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8">
              The engineer
              <br />
              behind the work.
            </h2>

            {/* Info card */}
            <div className="sc p-5 space-y-3 mb-6 "
                onMouseEnter={() => setHoveredCard("true")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderColor: hoveredCard != null ? "var(--terminal-green)" : "var(--border)",
                  boxShadow: hoveredCard != null ? `0 0 0 1px $var(--terminal-green) 28, 0 8px 28px rgba(61,219,106,0.12)` : "none",
                }}
              >
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
              {[
                { label: "location", value: meta.location },
                { label: "email", value: meta.email },
                { label: "education", value: education.degree },
                { label: "school", value: education.school },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="terminal-label text-[var(--terminal-green)]">{item.label}</span>
                  <span className="font-mono text-xs text-[var(--text-primary)] font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <div className="terminal-label mb-2">certifications</div>
              {education.certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)] font-semibold"
                >
                  <span className="text-[var(--terminal-amber)]">◆</span>
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* Right — paragraphs */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="space-y-6">
              {meta.summary.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[var(--text-secondary)] leading-[1.8] text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-10 pt-8 border-t border-[var(--border)]">
              <div className="terminal-label mb-3">languages</div>
              <div className="flex gap-3">
                {education.languages.map((lang) => (
                  <span
                    key={lang}
                    className="font-mono text-xs px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-primary)]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}