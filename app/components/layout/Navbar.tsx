"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-40px 0px -40% 0px"
      }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setActive(id)
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          // href="#"
          onClick={() => scrollToSection("hero")}
          className={`font-mono text-xs cursor-pointer
          tracking-widest hover:text-[var(--terminal-green)] transition-colors
          ${active === 'hero'? 'text-[var(--terminal-green)] font-bold' : 'text-[var(--text-tertiary)] '}`}
        >
          <span className="text-[var(--terminal-green)]">~/</span>Keanu
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              // href={link.href}
              onClick={() => scrollToSection(link.id)}
              className={`font-mono text-xs cursor-pointer
              tracking-wider hover:text-[var(--terminal-green)] transition-colors link-hover
              ${active === link.label.toLocaleLowerCase()? 'text-[var(--terminal-green)] font-bold' : 'text-[var(--text-tertiary)] '}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* CV download */}
          <a
            href="/cv/KEANU ELY GILBERT MANLY.pdf"
            download
            className="hidden md:flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--terminal-green)] hover:text-[var(--text-primary)] hover:border-[var(--terminal-green)] transition-all"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            resume.pdf
          </a>

          {/* Mobile menu */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--text-tertiary)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                // href={link.href}
                onClick={() =>{ 
                  setMenuOpen(false) 
                  scrollToSection(link.id)
                }}
                // className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                className={`font-mono text-sm cursor-pointer
                tracking-wider hover:text-[var(--terminal-green)] transition-colors link-hover
                ${active === link.label.toLocaleLowerCase()? 'text-[var(--terminal-green)] font-bold' : 'text-[var(--text-tertiary)] '}`}
              >
                {link.label}
              </button>
            ))}
            <button
            onClick={() => {
              const link = document.createElement("a");
              link.href="/cv/KEANU ELY GILBERT MANLY.pdf"
              link.download = "keanu-manly-cv.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="font-mono text-sm text-[var(--terminal-green)]"
          >
            Download CV
          </button>
          </div>
        </div>
      )}
    </header>
  );
}