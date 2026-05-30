'use client';

/**
 * SplitHero — asymmetric split-screen hero
 *
 * Desktop: 70 / 30 side-by-side
 *   Left  — auto-playing crossfade image carousel with pause/play toggle
 *           and editorial headline at bottom-left
 *   Right — deep slate panel with large serif CTA and circular arrow
 *
 * Mobile: stacks vertically (left image on top, right CTA below)
 *
 * Uses Framer Motion AnimatePresence for crossfade.
 * All interactive state is client-side only — no hydration mismatch.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ─── Slide data ───────────────────────────────────────────────
const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=85',
    alt: 'A warm contemporary living room with organic textures and considered lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85',
    alt: 'A modern kitchen with warm wood cabinetry, a marble island, and pendant lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=85',
    alt: 'A serene, considered bedroom with warm tones and clean architectural lines',
  },
  {
    src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=85',
    alt: 'A modern dining room with sculptural furniture and soft natural light',
  },
  {
    src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&q=85',
    alt: 'A minimal living room with an elegant coffee table arrangement',
  },
] as const;

const INTERVAL_MS = 3800;

// ─── Component ───────────────────────────────────────────────
export function SplitHero() {
  const [index, setIndex]     = useState(0);
  const [playing, setPlaying] = useState(true);

  // Auto-advance
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [playing]);

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  return (
    <section
      aria-label="The 2026 Design Edit — featured hero"
      className="flex min-h-[88vh] flex-col lg:flex-row"
    >
      {/* ════════════════════════════════════════════════════════
          LEFT PANEL — image carousel (70 % desktop, full top mobile)
          ════════════════════════════════════════════════════════ */}
      <div className="relative h-[58vw] max-h-[560px] overflow-hidden bg-stone-100 lg:h-auto lg:max-h-none lg:min-h-[88vh] lg:flex-[7]">

        {/* ── Crossfade images ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index].src}
              alt={SLIDES[index].alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom gradient — darkens for text readability ── */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 to-transparent"
        />

        {/* ── Bottom-left: editorial headline ── */}
        <div className="absolute bottom-0 left-0 p-6 lg:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Bigelow Designs · 2026
          </p>
          <p
            className="mt-2 font-serif font-semibold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}
          >
            The 2026 Design<br />Edit is here.
          </p>
        </div>

        {/* ── Slide dots — bottom-centre ── */}
        <div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 lg:bottom-10"
          role="tablist"
          aria-label="Slide navigation"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { setIndex(i); setPlaying(false); }}
              className={[
                'h-[5px] rounded-full transition-all duration-400 ease-out',
                i === index
                  ? 'w-6 bg-white'
                  : 'w-[5px] bg-white/40 hover:bg-white/65',
              ].join(' ')}
            />
          ))}
        </div>

        {/* ── Bottom-right: pause / play toggle ── */}
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          className={[
            'absolute bottom-5 right-5 lg:bottom-9 lg:right-9',
            'flex h-11 w-11 items-center justify-center rounded-full',
            'border border-white/30 bg-black/20 text-white backdrop-blur-md',
            'transition-all duration-200 hover:border-white/60 hover:bg-black/35',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
          ].join(' ')}
        >
          {playing ? (
            // Pause — two vertical bars
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-3 w-3"
            >
              <rect x="5"  y="4" width="5" height="16" rx="1.5" />
              <rect x="14" y="4" width="5" height="16" rx="1.5" />
            </svg>
          ) : (
            // Play — filled triangle
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-3 w-3 translate-x-[1px]"
            >
              <polygon points="6,3 20,12 6,21" />
            </svg>
          )}
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════
          RIGHT PANEL — CTA (30 % desktop, full bottom mobile)
          Entire panel is a link — IKEA-style full-surface CTA.
          ════════════════════════════════════════════════════════ */}
      <Link
        href="/design-trends"
        aria-label="Explore 2026 interior design trends"
        className="group relative flex min-h-[280px] flex-col items-start justify-between overflow-hidden bg-[#1c2027] px-8 py-9 lg:min-h-0 lg:flex-[3] lg:px-12 lg:py-14"
      >
        {/* Warm radial glow — purely decorative */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] transition-opacity duration-700 group-hover:opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 20% 80%, #c8a97a 0%, transparent 60%)',
          }}
        />

        {/* ── Eyebrow ── */}
        <p className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
          Bigelow Designs
        </p>

        {/* ── Main text ── */}
        <div className="relative mt-auto">
          <p
            className="font-serif font-semibold leading-[1.0] tracking-tight text-white"
            style={{ fontSize: 'clamp(38px, 4.2vw, 68px)' }}
          >
            Explore<br />Trends.
          </p>

          <p className="mt-4 max-w-[200px] text-[13px] leading-[1.6] text-white/45">
            Interior design stories, furniture reviews and styling ideas for 2026.
          </p>

          {/* ── Circular arrow — IKEA-style ── */}
          <div
            aria-hidden="true"
            className={[
              'mt-8 flex h-[52px] w-[52px] items-center justify-center rounded-full',
              'border border-white/20 bg-white/8',
              'transition-all duration-300',
              'group-hover:scale-110 group-hover:border-white/50 group-hover:bg-white/15',
            ].join(' ')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* ── Bottom issue line ── */}
        <p className="relative mt-auto pt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/20">
          The May Issue · 2026
        </p>
      </Link>
    </section>
  );
}
