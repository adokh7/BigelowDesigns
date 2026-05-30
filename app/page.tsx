import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Reveal } from '@/components/ui/Reveal';
import { getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/lib/site';
import type { Article } from '@/types/article';

// ─── ISR ─────────────────────────────────────────────────────
export const revalidate = 3600;

// ─── Category href helper ─────────────────────────────────────
function categoryHref(category: string): string {
  if (category === 'design-trends') return '/design-trends';
  if (category === 'reviews')       return '/reviews';
  return `/rooms/${category}`;
}

// ─── Page ─────────────────────────────────────────────────────
export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles.slice(0, 3);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. CINEMATIC HERO
             Full-bleed viewport, Ken Burns on image, staggered
             serif headline, glass-morphism CTAs.
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-[96svh] flex-col overflow-hidden bg-ink-900"
      >
        {/* ── Ken Burns image ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/living-room-candid.webp"
            alt="A considered living space — the opening chapter of the 2026 Bigelow Design Edit"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover animate-ken-burns"
          />
          {/* Gradient stack: subtle top vignette + heavy bottom ramp */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent via-[35%] to-ink-900/88"
          />
          {/* Left-side fade for text legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink-900/55 via-ink-900/10 to-transparent"
          />
        </div>

        {/* ── Top strip: issue label ── */}
        <div className="relative z-10 mx-auto w-full max-w-page px-4 pt-8 sm:px-6 lg:px-8">
          <p className="animate-fade-in-slow text-eyebrow uppercase tracking-[0.28em] text-white/40">
            {siteConfig.name} &nbsp;·&nbsp; Volume 2026
          </p>
        </div>

        {/* ── Main hero copy — anchored bottom-left ── */}
        <div className="relative z-10 mt-auto mx-auto w-full max-w-page px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="max-w-[720px]">

            {/* Oversized serif headline — three staggered lines */}
            <h1
              id="hero-heading"
              className="font-serif font-semibold leading-[0.94] tracking-[-0.04em] text-canvas"
              style={{ fontSize: 'clamp(46px, 8.5vw, 104px)' }}
            >
              <span className="block animate-fade-rise-hero [animation-delay:180ms]">
                The 2026
              </span>
              <span className="block animate-fade-rise-hero [animation-delay:360ms] text-accent/95 italic">
                Design Edit
              </span>
              <span className="block animate-fade-rise-hero [animation-delay:540ms]">
                is here.
              </span>
            </h1>

            {/* Deck */}
            <p className="mt-7 max-w-[500px] text-pretty text-body-lg leading-relaxed text-white/65 animate-fade-rise-hero [animation-delay:720ms]">
              Interior design that lives in the real world. Room guides, honest
              furniture reviews, and the trends worth knowing — curated with
              conviction.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-rise-hero [animation-delay:900ms]">
              <Link
                href="/rooms"
                className={clsx(
                  'inline-flex items-center gap-2.5 rounded-full px-8 py-3.5',
                  'bg-accent font-semibold text-white',
                  'transition-all duration-smooth ease-out',
                  'hover:bg-accent-600 hover:-translate-y-0.5 hover:shadow-xl',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                )}
              >
                Explore Guides
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/newsletter"
                className={clsx(
                  'inline-flex items-center gap-2.5 rounded-full px-8 py-3.5',
                  'border border-white/30 bg-white/10 font-semibold text-white backdrop-blur-sm',
                  'transition-all duration-smooth ease-out',
                  'hover:bg-white/20 hover:-translate-y-0.5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2',
                )}
              >
                Get the Edit
              </Link>
            </div>

          </div>
        </div>

        {/* ── Scroll hint (vertical text + animated drop line) ── */}
        <div
          aria-hidden="true"
          className="absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-3 animate-fade-in-slow [animation-delay:1400ms] lg:right-14 lg:flex"
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35"
            style={{ writingMode: 'vertical-lr' }}
          >
            Scroll
          </span>
          <svg width="2" height="48" viewBox="0 0 2 48" className="overflow-visible">
            <line x1="1" y1="0" x2="1" y2="48"
              stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="1" y1="0" x2="1" y2="16"
              stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"
              className="animate-scroll-hint" />
          </svg>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════
          2. MAGAZINE SPREAD — real articles only, asymmetric layout
          ══════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <Reveal>
          <section
            aria-labelledby="articles-heading"
            className="mx-auto max-w-page px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
          >

            {/* Editorial section header */}
            <div className="mb-14 flex items-center gap-5">
              <span aria-hidden="true" className="h-px w-10 flex-shrink-0 bg-accent" />
              <h2
                id="articles-heading"
                className="text-eyebrow uppercase tracking-[0.24em] text-ink-500"
              >
                From the editors
              </h2>
              <span aria-hidden="true" className="hidden h-px flex-1 bg-ink-100 sm:block" />
              <span className="hidden font-serif text-[13px] italic text-ink-400 sm:block">
                May 2026
              </span>
            </div>

            {featured.length === 1 ? (
              <SingleFeature article={featured[0]!} />
            ) : (
              <MagazineGrid articles={featured} />
            )}

          </section>
        </Reveal>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MAGAZINE GRID LAYOUTS
// ─────────────────────────────────────────────────────────────────

/**
 * 2–3 articles: asymmetric magazine spread.
 *
 *  ┌──────────────────────────────────┬────────────────┐
 *  │ COVER CARD  (60 %)               │ SECONDARY (40%)│
 *  │ Large image + serif title        │ Smaller card   │
 *  │                                  ├────────────────┤
 *  │ (spans 2 rows when 3 articles)   │ SECONDARY      │
 *  └──────────────────────────────────┴────────────────┘
 */
function MagazineGrid({ articles }: { articles: Article[] }) {
  const [cover, ...secondaries] = articles;
  const isThree = secondaries.length >= 2;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-10">
      <CoverCard article={cover!} rowSpan={isThree} />
      <div className={clsx('flex flex-col gap-8', isThree && 'lg:gap-10')}>
        {secondaries.map((article) => (
          <SecondaryCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

/**
 * Single article: full-width editorial feature.
 * Image left (60 %), oversized copy right (40 %).
 */
function SingleFeature({ article }: { article: Article }) {
  const href    = `/blog/${article.slug}`;
  const catHref = categoryHref(article.category);

  return (
    <article className="group lg:flex lg:items-start lg:gap-14 xl:gap-20">

      {/* Image */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-2xl lg:flex-[6] xl:flex-[7]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated lg:aspect-[3/2]">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-[transform,filter] duration-[700ms] ease-out saturate-[88%] scale-[1.01] group-hover:saturate-100 group-hover:scale-[1.06]"
          />
        </div>
      </Link>

      {/* Copy */}
      <div className="mt-8 flex flex-col lg:mt-0 lg:flex-[4] xl:flex-[3]">
        <Link
          href={catHref}
          className="text-eyebrow uppercase tracking-[0.18em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {article.categoryLabel}
        </Link>

        <h2 className="mt-4 font-serif text-[clamp(26px,3.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.028em] text-ink-900">
          <Link href={href} className="transition-colors duration-quick hover:text-accent-600">
            {article.title}
          </Link>
        </h2>

        <div aria-hidden="true" className="mt-5 h-px w-10 bg-accent/40" />

        <p className="mt-5 text-body-lg leading-relaxed text-ink-500 line-clamp-4">
          {article.excerpt}
        </p>

        <p className="mt-4 text-body-sm text-ink-400">{article.readingTime} min read</p>

        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 text-body-sm font-semibold text-ink-900 border-b border-ink-300 pb-0.5 transition-colors duration-quick hover:text-accent-600 hover:border-accent-600/40"
        >
          Read the article
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

    </article>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ARTICLE CARDS
// ─────────────────────────────────────────────────────────────────

/**
 * CoverCard — large featured card (left column, 60 %).
 * Plain block element so children stack naturally without flex interference.
 */
function CoverCard({
  article,
  rowSpan = false,
}: {
  article: Article;
  rowSpan?: boolean;
}) {
  const href    = `/blog/${article.slug}`;
  const catHref = categoryHref(article.category);

  return (
    <article className="group">

      {/* Image */}
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-2xl">
        <div className={clsx(
          'relative overflow-hidden bg-elevated',
          rowSpan ? 'aspect-[5/4]' : 'aspect-[3/2]',
        )}>
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-[transform,filter] duration-[700ms] ease-out saturate-[85%] scale-[1.01] group-hover:saturate-100 group-hover:scale-[1.06]"
          />
        </div>
      </Link>

      {/* Category + reading time */}
      <div className="mt-6 flex items-center gap-3">
        <Link
          href={catHref}
          className="flex-shrink-0 text-eyebrow uppercase tracking-[0.18em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {article.categoryLabel}
        </Link>
        <span aria-hidden="true" className="h-px flex-1 bg-ink-100" />
        <span className="flex-shrink-0 text-body-sm text-ink-400">
          {article.readingTime} min read
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 font-serif text-[clamp(24px,2.8vw,38px)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-900">
        <Link href={href} className="transition-colors duration-quick hover:text-accent-600">
          {article.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p className="mt-3 text-body-lg leading-relaxed text-ink-500 line-clamp-3">
        {article.excerpt}
      </p>

      {/* Read link */}
      <div className="mt-5">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink-900 border-b border-ink-300 pb-0.5 transition-colors duration-quick hover:text-accent-600 hover:border-accent-600/40"
        >
          Read the article
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

    </article>
  );
}

/**
 * SecondaryCard — compact supporting card (right column, 40 %).
 * Thumbnail-left + copy-right on mobile; stacked block on desktop.
 */
function SecondaryCard({ article }: { article: Article }) {
  const href    = `/blog/${article.slug}`;
  const catHref = categoryHref(article.category);

  return (
    <article className="group flex gap-5 lg:block">

      {/* Image */}
      <Link href={href} tabIndex={-1} aria-hidden="true"
        className="block flex-shrink-0 overflow-hidden rounded-xl lg:rounded-2xl">
        <div className="relative aspect-square w-28 overflow-hidden bg-elevated sm:w-32 lg:aspect-[3/2] lg:w-auto">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            sizes="(max-width: 1024px) 140px, 40vw"
            className="object-cover transition-[transform,filter] duration-[700ms] ease-out saturate-[85%] scale-[1.01] group-hover:saturate-100 group-hover:scale-[1.06]"
          />
        </div>
      </Link>

      {/* Copy */}
      <div className="min-w-0 flex-1 lg:mt-5">
        <Link
          href={catHref}
          className="text-eyebrow uppercase tracking-[0.15em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {article.categoryLabel}
        </Link>
        <h3 className="mt-1.5 font-serif text-h3 font-semibold leading-snug text-ink-900">
          <Link href={href} className="transition-colors duration-quick hover:text-accent-600">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
          {article.excerpt}
        </p>
        <p className="mt-3 text-body-sm text-ink-400">{article.readingTime} min read</p>
      </div>

    </article>
  );
}
