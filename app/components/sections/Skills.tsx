"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/newdata";

const categoryConfig: Record<string, { color: string; icon: string }> = {
  Frontend:        { color: "var(--terminal-blue)",  icon: "◈" },
  Backend:         { color: "var(--terminal-green)", icon: "⬡" },
  Databases:       { color: "var(--terminal-amber)", icon: "◉" },
  "Cloud & Infra": { color: "var(--terminal-red)",   icon: "◎" },
  "AI & APIs":     { color: "var(--terminal-green)", icon: "◆" },
  "Dev Tools":     { color: "var(--text-tertiary)",  icon: "○" },
  Architecture:    { color: "var(--terminal-blue)",  icon: "◇" },
};

export function Skills() {
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

  const categories = Object.entries(skills);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-6 border-t border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="section-index mb-3">~/ 04 - skills.tsx</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Skill Matrix
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(([category, items], i) => {
            const config = categoryConfig[category] ?? {
              color: "var(--text-tertiary)",
              icon: "○",
            };

            // Make Architecture span full width on the last row
            const isWide = category === "Architecture";
            const hovered = hoveredCard === category;

            return (
              <div
                key={category}
                className={`sc p-5 transition-all duration-700 ${
                  isWide ? "md:col-span-2 lg:col-span-3" : ""
                } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 80}ms`, 
                borderColor: hovered ? "var(--terminal-green)" : "var(--border)",
                boxShadow: hovered ? `0 0 0 1px $var(--terminal-green) 28, 0 8px 28px rgba(61,219,106,0.12)` : "none", }}
                onMouseEnter={() => setHoveredCard(category)}
                onMouseLeave={() => setHoveredCard(null)}
              >

              {/* Glow overlay */}
              {/* <div className="sc-glow" style={{ background: "rgba(61,219,106,0.12)" }} /> */}

              {/* Corner mark */}
              <div
                className="sc-corner"
                style={{
                  borderColor: `transparent ${hovered ? "var(--terminal-green)" : "var(--border)"} transparent transparent`,
                  opacity: hovered ? 0.7 : 0.3,
                }}
              />
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-mono text-sm"
                    style={{ color: config.color }}
                  >
                    {config.icon}
                  </span>
                  <span
                    className="terminal-label"
                    style={{ color: config.color }}
                  >
                    {category}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className={`font-mono text-xs px-2.5 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-muted)] hover:text-[var(--text-primary)] transition-all cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}