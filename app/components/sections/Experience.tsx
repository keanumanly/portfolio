"use client";

import { useEffect, useRef, useState } from "react";
import { experience, education } from "@/lib/newdata";

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverEduCard, setHoverEduCard] = useState<string | null>(null);
  const [hoverExpCard, setHoverExpCard] = useState<string | null>(null);

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
      id="experience"
      ref={ref}
      className="py-24 px-6 border-t border-[var(--border)] bg-[var(--bg-surface)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          {/* Left sticky header */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="lg:sticky lg:top-24">
              <div className="section-index mb-3">~/ 05 - experience.tsx</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8">
                Career
                <br />
                Timeline
              </h2>

              {/* Education card */}
              <div className="sc p-5" 
                onMouseEnter={() => setHoverEduCard("true")}
                onMouseLeave={() => setHoverEduCard(null)}
                style={{
                  borderColor: hoverEduCard != null ? "var(--terminal-green)" : "var(--border)",
                  boxShadow: hoverEduCard != null ? `0 0 0 1px $var(--terminal-green) 28, 0 8px 28px rgba(61,219,106,0.12)` : "none",
                }}>
                {/* Glow overlay */}
                {/* <div className="sc-glow" style={{ background: "rgba(61,219,106,0.12)" }} /> */}
  
                {/* Corner mark */}
                <div
                  className="sc-corner"
                  style={{
                    borderColor: `transparent ${hoverEduCard != null ? "var(--terminal-green)" : "var(--border)"} transparent transparent`,
                    opacity: hoverEduCard != null ? 0.7 : 0.3,
                  }}
                />
                <div className="terminal-label text-[var(--terminal-blue)] mb-3">education</div>
                <div className="font-display text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {education.degree}
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)] mb-0.5">
                  {education.school}
                </div>
                <div className="font-mono text-xs text-[var(--text-tertiary)]">
                  {education.period}
                </div>
              </div>

              {/* Total experience */}
              <div className="mt-4 sc p-5"
                onMouseEnter={() => setHoverExpCard("true")}
                onMouseLeave={() => setHoverExpCard(null)}
                style={{
                  borderColor: hoverExpCard != null ? "var(--terminal-green)" : "var(--border)",
                  boxShadow: hoverExpCard != null ? `0 0 0 1px $var(--terminal-green) 28, 0 8px 28px rgba(61,219,106,0.12)` : "none",
                }}>
                {/* Glow overlay */}
                {/* <div className="sc-glow" style={{ background: "rgba(61,219,106,0.12)" }} /> */}
  
                {/* Corner mark */}
                <div
                  className="sc-corner"
                  style={{
                    borderColor: `transparent ${hoverExpCard != null ? "var(--terminal-green)" : "var(--border)"} transparent transparent`,
                    opacity: hoverExpCard != null ? 0.7 : 0.3,
                  }}
                />
                <div className="terminal-label mb-2">total experience</div>
                <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
                  6
                  <span className="font-mono text-sm text-[var(--text-tertiary)] ml-1">yrs</span>
                </div>
                <div className="font-mono text-xs text-[var(--text-tertiary)] mt-1">
                  2019 → present
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border)] hidden md:block" />

            <div className="space-y-0">
              {experience.map((job, i) => (
                <TimelineItem
                  key={`${job.company}-${i}`}
                  job={job}
                  index={i}
                  visible={visible}
                  isLast={i === experience.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  job,
  index,
  visible,
  isLast,
}: {
  job: (typeof experience)[0];
  index: number;
  visible: boolean;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div
      className={`relative md:pl-10 pb-10 transition-all duration-700 ${
        isLast ? "pb-0" : ""
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[var(--terminal-green)] border-2 border-[var(--bg-surface)] hidden md:block -translate-x-[3.5px]" />

      {/* Card */}
      <div className="sc p-6"
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
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div>
            <div className="font-mono text-xs text-[var(--terminal-green)] mb-1">
              {job.period}
            </div>
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)] leading-tight">
              {job.title}
            </h3>
            <div className="font-mono text-xs text-[var(--text-secondary)] mt-0.5">
              {job.company}
            </div>
          </div>

          <button className="self-start">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
              className={`transition-transform duration-300 cursor-pointer ${expanded ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* Highlights */}
        {expanded && (
          <div className="mt-5 pt-5 border-t border-[var(--border)] space-y-2 animate-fade-in">
            {job.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-[var(--terminal-green)] font-mono text-xs mt-0.5 flex-shrink-0">
                  →
                </span>
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}