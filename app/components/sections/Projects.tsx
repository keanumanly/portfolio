"use client";

import { useEffect, useRef, useState } from "react";
import { ScreenshotGallery } from '@/components/sections/ScreenshotGallery'
import { projects } from "@/lib/newdata";

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
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="section-index mb-3">~/  03 - work.tsx</div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Selected Projects
            </h2>
            <span className="font-mono text-xs text-[var(--text-tertiary)] hidden md:block">
              More projects coming soon
            </span>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* Placeholder for more projects */}
        <div
          className={`mt-8 sc p-8 flex items-center justify-center transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
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

          <div className="text-center">
            <div className="font-mono text-xs text-[var(--terminal-green)] mb-2">
              // more_projects.push(...)
            </div>
            <p className="font-mono text-xs text-[var(--text-tertiary)]">
              Additional case studies will be added as the Project Manual is completed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <div
      className={`sc overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 150}ms`,
      borderColor: hoveredCard != null ? "var(--terminal-green)" : "var(--border)",
      boxShadow: hoveredCard != null ? `0 0 0 1px $var(--terminal-green) 28, 0 8px 28px rgba(61,219,106,0.12)` : "none", }}
      onMouseEnter={() => setHoveredCard("true")}
      onMouseLeave={() => setHoveredCard(null)}
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
      {/* ── Screenshot gallery — floats inside card with inset padding ── */}
      {false && hasScreenshots && (
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-surface)",
        }}>
          <ScreenshotGallery screenshots={project.screenshots!} />
        </div>
      )}
      
      {/* Card header */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            {/* Status */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === "production"
                    ? "bg-[var(--terminal-green)]"
                    : "bg-[var(--terminal-amber)]"
                }`}
              />
              <span className="font-mono text-xs text-[var(--text-primary)]">
                {project.status} · {project.period}
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
              {project.title}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xl">
              {project.tagline}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-xs px-2.5 py-1 rounded border  ${hoveredCard != null ? "text-[var(--text-primary)]" : "border-[var(--border)] text-[var(--text-tertiary)]"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Problem / Solution grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[var(--bg-surface)] rounded-lg p-4 border border-[var(--border-subtle)]">
            <div className="terminal-label text-[var(--terminal-red)] mb-2">problem</div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] rounded-lg p-4 border border-[var(--border-subtle)]">
            <div className="terminal-label text-[var(--terminal-green)] mb-2">solution</div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center cursor-pointer gap-2 font-mono text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          {expanded ? "Collapse" : "Deep dive — stack, challenges & impact"}
        </button>
      </div>

      {/* Expanded content */}
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
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--terminal-amber)]"
                      >
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
  );
}