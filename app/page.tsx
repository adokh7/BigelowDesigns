import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

// ─── SSG — built once at deploy, served from CDN edge ────────
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Premium Interior Design`,
  description:
    'Interior design that lives in the real world. Room guides, honest furniture reviews, and the trends worth knowing — curated with conviction.',
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `${siteConfig.name} — Premium Interior Design`,
    description:
      'Interior design that lives in the real world. Room guides, honest furniture reviews, and the trends worth knowing.',
    images: [{ url: `${siteConfig.url}/luxury-powder-room.webp`, width: 1600, height: 800, alt: 'Bigelow Designs' }],
  },
};

// ─── Editorial content — curated homepage selections ─────────
const HERO = {
  href:         '/blog/luxury-powder-room-edit',
  categoryHref: '/rooms/bathroom',
  category:     'Room Guides',
  title:        "The Powder Room Edit: Abandoning 'Light and Bright' for Dark, Moody Luxury",
  excerpt:
    'The powder room is the one room in your home where restraint becomes a liability. Here is how to design a space that feels genuinely opulent — without a full renovation.',
  image:        '/luxury-powder-room.webp',
  imageAlt:     'A dark, moody powder room with brushed brass fixtures, deep olive walls, and a statement mirror',
  readingTime:  9,
} as const;

const GRID = [
  {
    href:         '/blog/testing-internet-favorite-modular-sofa',
    categoryHref: '/reviews',
    category:     'Furniture Reviews',
    title:        "We Tested the Internet's Favourite Modular Sofa in a 400 Sq Ft Apartment",
    excerpt:
      'Six weeks, 40 rearrangements, and one very honest verdict on whether the modular sofa hype is actually earned.',
    image:        '/modular-sofa-tiny-apartment.webp',
    imageAlt:     'A compact modular sofa arranged in a small apartment living room with natural light',
    readingTime:  7,
  },
  {
    href:         '/blog/meaningful-vintage-decor-bitossi',
    categoryHref: '/design-trends',
    category:     'Design Trends',
    title:        'The Emotional Power of Vintage Decor: A Mid-Century Ceramic Find',
    excerpt:
      'A 1960s Bitossi rooster that cost €12 at a Milan street market — and what it taught us about the psychology of objects.',
    image:        '/vintage-ceramic-chicken.webp',
    imageAlt:     'A vintage mid-century Bitossi ceramic chicken sculpture displayed on a warm wooden shelf',
    readingTime:  5,
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="bg-canvas">

      {/* ══════════════════════════════════════════════════════
          MASTHEAD BAR — thin editorial header, magazine feel
          ══════════════════════════════════════════════════════ */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-300">
              Vol. 2026
            </p>
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-300 sm:block">
              Premium Interior Design
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-300">
              June 2026
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          FEATURED HERO — large featured article, full-width
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16"
      >
        <Link href={HERO.href} className="group block">

          {/* Hero image — aspect-[2/1] for a wide cinematic spread */}
          <div className="overflow-hidden rounded-2xl bg-elevated">
            <div className="relative aspect-[16/9] w-full lg:aspect-[2/1]">
              <Image
                src={HERO.image}
                alt={HERO.imageAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* Hero copy */}
          <div className="mt-7 max-w-3xl">

            {/* Category eyebrow */}
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-stone-500">
              {HERO.category}
            </p>

            {/* H1 headline — clamp for responsive luxury scaling */}
            <h1
              id="hero-heading"
              className="font-serif font-semibold tracking-tight text-ink-900 text-balance leading-[1.07] mb-4"
              style={{ fontSize: 'clamp(30px, 4.5vw, 60px)' }}
            >
              {HERO.title}
            </h1>

            {/* Excerpt */}
            <p className="text-body-lg leading-relaxed text-ink-500 max-w-2xl">
              {HERO.excerpt}
            </p>

            {/* Meta */}
            <p className="mt-4 inline-flex items-center gap-2 text-body-sm text-ink-400">
              <span>{HERO.readingTime} min read</span>
              <span aria-hidden="true" className="text-ink-200">·</span>
              <span className="font-medium text-accent-600 transition-colors duration-quick group-hover:text-accent-500">
                Read the article →
              </span>
            </p>

          </div>
        </Link>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION DIVIDER — editorial "The Latest" separator
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-20 flex items-center gap-5 md:mt-24">
          <span aria-hidden="true" className="h-px w-10 flex-shrink-0 bg-accent" />
          <p className="text-eyebrow uppercase tracking-[0.28em] text-ink-400">
            The latest
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-ink-100" />
          <Link
            href="/rooms"
            className="hidden flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-400 transition-colors duration-quick hover:text-accent-600 sm:block"
          >
            Browse all guides →
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ARTICLE GRID — 2-column with image zoom on hover
          ══════════════════════════════════════════════════════ */}
      <section
        aria-label="Recent articles"
        className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {GRID.map((article) => (
            <article key={article.href} className="group">
              <Link href={article.href} className="block">

                {/* Card image */}
                <div className="overflow-hidden rounded-xl bg-elevated">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                </div>

                {/* Card copy */}
                <div className="mt-5">
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-stone-500">
                    {article.category}
                  </p>
                  <h2 className="font-serif text-[clamp(19px,2.2vw,24px)] font-semibold leading-snug tracking-tight text-ink-900 text-balance transition-colors duration-quick group-hover:text-accent-600">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <p className="mt-3 text-body-sm text-ink-400">
                    {article.readingTime} min read
                  </p>
                </div>

              </Link>
            </article>
          ))}
        </div>

        {/* Mobile "browse all" link */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-2.5 text-body-sm font-semibold text-ink-600 transition-all duration-quick hover:border-accent hover:text-accent-600"
          >
            Browse all guides →
          </Link>
        </div>
      </section>

    </div>
  );
}
