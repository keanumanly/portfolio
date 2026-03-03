"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Screenshot } from "@/lib/newdata";

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
    const trackRef        = useRef<HTMLDivElement>(null);
    const [active, setActive]       = useState(0);
    const [dragging, setDragging]   = useState(false);
    const [lightbox, setLightbox]   = useState<number | null>(null);
    const dragStart  = useRef(0);
    const dragDelta  = useRef(0);
    const isDragging = useRef(false);
    const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  
    const scrollTo = useCallback((index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const slide = track.children[index] as HTMLElement;
      if (!slide) return;
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
      setActive(index);
    }, []);
  
    // Dot sync on scroll
    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      const onScroll = () => {
        const { scrollLeft, clientWidth } = track;
        const index = Math.round(scrollLeft / clientWidth);
        setActive(Math.min(index, screenshots.length - 1));
      };
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => track.removeEventListener("scroll", onScroll);
    }, [screenshots.length]);
  
    // Keyboard nav when lightbox open
    useEffect(() => {
      if (lightbox === null) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") setLightbox(i => i !== null ? Math.min(i + 1, screenshots.length - 1) : null);
        if (e.key === "ArrowLeft")  setLightbox(i => i !== null ? Math.max(i - 1, 0) : null);
        if (e.key === "Escape")     setLightbox(null);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [lightbox, screenshots.length]);
  
    // Pointer drag handlers
    const onPointerDown = (e: React.PointerEvent) => {
      dragStart.current  = e.clientX;
      dragDelta.current  = 0;
      isDragging.current = false;
      setDragging(false);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
      dragDelta.current = e.clientX - dragStart.current;
      if (Math.abs(dragDelta.current) > 4) {
        isDragging.current = true;
        setDragging(true);
      }
    };
    const onPointerUp = () => {
      if (isDragging.current) {
        if (dragDelta.current < -40 && active < screenshots.length - 1) scrollTo(active + 1);
        if (dragDelta.current >  40 && active > 0)                       scrollTo(active - 1);
      }
      isDragging.current = false;
      setDragging(false);
    };
    const onClick = (index: number) => {
      if (!isDragging.current) setLightbox(index);
    };
  

    return (
        <>
        {/* ── Floating shell ── */}
        <div className="fg-shell">
          {/* Main track */}
          <div
            ref={trackRef}
            className={`fg-track${dragging ? " dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {screenshots.map((shot, i) => (
              <div
                key={i}
                className="fg-slide"
                onClick={() => onClick(i)}
              >
                {/* Image with fallback */}
                <ImageWithFallback shot={shot} />
  
                {/* Bottom gradient scrim */}
                <div className="fg-scrim" />
  
                {/* Slide-up label */}
                <div className="fg-label">
                  <span className="fg-label-dot" />
                  <span className="fg-label-text">
                    {shot.caption ?? shot.alt}
                  </span>
                </div>
  
                {/* Expand button */}
                <button
                  className="fg-expand"
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  aria-label="Expand image"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9"/>
                    <polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/>
                    <line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
  
          {/* Floating prev/next arrows */}
          <button
            className="fg-arrow fg-prev"
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            className="fg-arrow fg-next"
            onClick={() => scrollTo(active + 1)}
            disabled={active === screenshots.length - 1}
            aria-label="Next"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
  
        {/* ── Thumbnail strip ── */}
        <div className="fg-thumbs">
          {screenshots.map((shot, i) => (
            <button
              key={i}
              className={`fg-thumb${i === active ? " active" : ""}`}
              onClick={() => scrollTo(i)}
              onMouseEnter={() => setHoveredThumb(i)}
              onMouseLeave={() => setHoveredThumb(null)}
              aria-label={`Go to screenshot ${i + 1}`}
            >
              <ThumbImage shot={shot} />
              {/* Index badge on inactive thumbs */}
              {i !== active && (
                <div className="fg-thumb-badge">{i + 1}</div>
              )}
            </button>
          ))}
  
          {/* Counter at end of strip */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              paddingRight: 2,
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.55rem",
              letterSpacing: "0.14em",
              color: "var(--text-tertiary)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {active + 1}&thinsp;/&thinsp;{screenshots.length}
          </div>
        </div>
  
        {/* ── Lightbox ── */}
        {lightbox !== null && (
          <div
            className="fg-lightbox"
            onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
          >
            <button className="fg-lb-close" onClick={() => setLightbox(null)}>✕</button>
  
            <button
              className="fg-lb-nav"
              style={{ left: 16 }}
              onClick={() => setLightbox(Math.max(lightbox - 1, 0))}
              disabled={lightbox === 0}
            >‹</button>
  
            <img
              className="fg-lightbox-img"
              src={screenshots[lightbox].src}
              alt={screenshots[lightbox].alt}
            />
  
            <button
              className="fg-lb-nav"
              style={{ right: 16 }}
              onClick={() => setLightbox(Math.min(lightbox + 1, screenshots.length - 1))}
              disabled={lightbox === screenshots.length - 1}
            >›</button>
  
            <div className="fg-lb-counter">
              {lightbox + 1} / {screenshots.length}
            </div>
  
            {screenshots[lightbox].caption && (
              <div className="fg-lb-caption">
                <span style={{ color: "var(--terminal-green)" }}>◈</span>
                {screenshots[lightbox].caption}
              </div>
            )}
          </div>
        )}
        </>
    );
}


function ImageWithFallback({ shot }: { shot: Screenshot }) {
    const [failed, setFailed] = useState(false);
  
    if (failed) {
      return (
        <div className="fg-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span style={{ fontFamily: "var(--font-geist-mono,monospace)", fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--text-tertiary)" }}>
            {shot.caption ?? shot.alt}
          </span>
        </div>
      );
    }
  
    return (
      <img
        src={shot.src}
        alt={shot.alt}
        className="fg-img"
        draggable={false}
        onError={() => setFailed(true)}
      />
    );
  }
  
  function ThumbImage({ shot }: { shot: Screenshot }) {
    const [failed, setFailed] = useState(false);
  
    if (failed) {
      return (
        <div className="fg-thumb-ph">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      );
    }
  
    return (
      <img
        src={shot.src}
        alt={shot.alt}
        draggable={false}
        onError={() => setFailed(true)}
      />
    );
  }
  