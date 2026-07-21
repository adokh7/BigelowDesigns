import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import type { Article } from '@/types/article';
import { getCategoryHref } from '@/lib/articles';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Magazine-style full-bleed hero for the featured article.
 *
 * Layout:
 *   • Article heroImage fills the viewport (object-cover)
 *   • Two stacked gradient layers darken the left/bottom for readability
 *   • Editorial text sits bottom-left — category pill, headline, excerpt,
 *     author byline, and a "Read the story" CTA
 *
 * Intentionally has no Reveal / scroll animation: the hero must be fully
 * visible and readable on first paint with zero JS dependency.
 */

// ─── Main export ──────────────────────────────────────────────
export function EditorialHero({ article }: { article: Article | null }) {
  if (!article) return <HeroPlaceholder />;

  const href = `/${article.category}/${article.slug}`;
  const date = formatDate(article.updatedAt ?? article.publishedAt);

  return (
    <section
      aria-label={`Featured article: ${article.title}`}
      className="relative min-h-[88vh] overflow-hidden bg-ink-900"
    >
      {/* ── Background image ─────────────────────────────────── */}
      <Image
        src={article.heroImage}
        alt={article.heroImageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />

      {/* ── Gradient layer 1 — left-to-right ─────────────────── */}
      {/* Darkens the left pane where text lives */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-900/92 via-ink-900/55 to-ink-900/10"
      />

      {/* ── Gradient layer 2 — bottom vignette ───────────────── */}
      {/* Adds depth beneath the text block */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900/65 to-transparent"
      />

      {/* ── Issue line — top-left ─────────────────────────────── */}
      <div className="absolute left-0 right-0 top-0 px-4 pt-6 sm:px-6 lg:px-8 animate-fade-in [animation-delay:120ms]">
        <div className="mx-auto max-w-page">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-white/40">
            The May Issue · 2026
          </p>
        </div>
      </div>

      {/* ── Editorial content — bottom-left ─────────────────── */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-page">
          <div className="max-w-2xl animate-fade-rise [animation-delay:380ms]">

            {/* Category pill */}
            <Link
              href={getCategoryHref(article.category)}
              className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-white/60 transition-colors duration-quick hover:text-white"
            >
              <span
                aria-hidden="true"
                className="h-px w-6 bg-white/40"
              />
              {article.categoryLabel}
            </Link>

            {/* Headline */}
            <h1 className="mt-4 text-balance font-serif text-h1 leading-tight text-white md:text-display-lg">
              <Link
                href={href}
                className="transition-colors duration-quick hover:text-white/85"
              >
                {article.title}
              </Link>
            </h1>

            {/* Excerpt */}
            <p className="mt-5 max-w-xl text-pretty text-body-lg leading-relaxed text-white/70 line-clamp-2">
              {article.excerpt}
            </p>

            {/* Byline row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm text-white/55">
              {article.author.avatar && (
                <Image
                  src={article.author.avatar}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-full opacity-90"
                />
              )}
              <span className="font-medium text-white/80">
                {article.author.name}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.updatedAt ?? article.publishedAt}>
                {date}
              </time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime} min read</span>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href={href}
                className={clsx(
                  'inline-flex items-center gap-2.5',
                  'rounded-full bg-white px-7 py-3',
                  'text-body font-semibold text-ink-900',
                  'transition-all duration-quick ease-out',
                  'hover:bg-accent hover:text-white hover:-translate-y-px hover:shadow-lg',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900',
                )}
              >
                Read the story
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll nudge — desktop ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-white/30 md:flex"
      >
        <span className="text-eyebrow uppercase tracking-widest">Scroll</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ─── Placeholder (no articles yet) ───────────────────────────
function HeroPlaceholder() {
  return (
    <section
      aria-label="Coming soon"
      className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink-900"
    >
      {/* Warm gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-ink-900 via-[#2a1f14] to-[#1a1208]"
      />

      <div className="relative mx-auto w-full max-w-page px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <p className="text-eyebrow uppercase tracking-[0.2em] text-white/40">
          Coming soon
        </p>
        <h1 className="mt-4 max-w-2xl text-balance font-serif text-display-lg leading-tight text-white">
          Interior design stories worth reading.
        </h1>
        <p className="mt-5 max-w-lg text-body-lg text-white/60">
          Editorial guides, honest reviews, and rooms that inspire — launching
          shortly. Subscribe to be first in.
        </p>
        <div className="mt-8">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3 text-body font-semibold text-ink-900 transition-all duration-quick hover:bg-accent hover:text-white"
          >
            Get early access
          </Link>
        </div>
      </div>
    </section>
  );
}
