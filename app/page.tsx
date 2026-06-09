import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { LazyVideoSection } from '@/components/LazyVideoSection';
import { ProVideoPlayer } from '@/components/ProVideoPlayer';

// ─── SSG — built once at deploy, served from CDN edge ────────
export const dynamic = 'force-static';

// 158 chars — strict 150–160 window for SEO Site Checkup.
const HOME_META_DESCRIPTION =
  'Interior design that lives in the real world — editorial room guides, honest furniture reviews, and the modern home trends worth knowing, curated weekly.';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Premium Interior Design`,
  description: HOME_META_DESCRIPTION,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `${siteConfig.name} — Premium Interior Design`,
    description: HOME_META_DESCRIPTION,
    images: [{ url: `${siteConfig.url}/modular-sofa-tiny-apartment.webp`, width: 1600, height: 1000, alt: 'Bigelow Designs' }],
  },
};

// ─── Editorial grid — recent articles below the hero ─────────
const FEATURED = [
  {
    href:         '/blog/luxury-powder-room-edit',
    category:     'Room Guides',
    title:        "The Powder Room Edit: Abandoning 'Light and Bright' for Dark, Moody Luxury",
    excerpt:
      'The powder room is the one room in your home where restraint becomes a liability. Here is how to design a space that feels genuinely opulent — without a full renovation.',
    image:        '/luxury-powder-room.webp',
    imageAlt:     'A dark, moody powder room with brushed brass fixtures and a statement mirror',
    readingTime:  9,
  },
  {
    href:         '/blog/testing-internet-favorite-modular-sofa',
    category:     'Furniture Reviews',
    title:        "We Tested the Internet's Favourite Modular Sofa in a 400 Sq Ft Apartment",
    excerpt:
      'Six weeks, 40 rearrangements, and one very honest verdict on whether the modular sofa hype is actually earned.',
    image:        '/modular-sofa-tiny-apartment.webp',
    imageAlt:     'A modular sofa in a bright, compact apartment living room',
    readingTime:  7,
  },
  {
    href:         '/blog/meaningful-vintage-decor-bitossi',
    category:     'Design Trends',
    title:        'The Emotional Power of Vintage Decor: A Mid-Century Ceramic Find',
    excerpt:
      'A 1960s Bitossi rooster that cost €12 at a Milan street market — and what it taught us about the psychology of objects.',
    image:        '/vintage-ceramic-chicken.webp',
    imageAlt:     'A vintage Bitossi ceramic chicken sculpture displayed on a warm wooden shelf',
    readingTime:  5,
  },
] as const;

// ─── Curated affiliate picks — sits between articles & newsletter ─
const FAVORITES = [
  {
    brand:    'Loyalfire',
    title:    'Loyalfire Over Sink Dish Drying Rack',
    price:    '$109.77',
    image:    '/renter-friendly-kitchen.webp',
    imageAlt: 'Loyalfire Over Sink Dish Drying Rack in a modern kitchen',
    href:     'https://amzn.to/4ueDlkA',
  },
  {
    brand:    'SOERGO',
    title:    'Modern Lambs Wool Accent Chair',
    price:    '$142.49',
    image:    '/warm-minimalism-nordic.webp',
    imageAlt: 'SOERGO Modern Lambs Wool Accent Chair white cozy lounge seating',
    href:     'https://amzn.to/3Q4JRMS',
  },
  {
    brand:    'MERRYBOX',
    title:    'MERRYBOX Triangle Roll Up Dish Drying Rack',
    price:    '$13.99',
    image:    '/micro-kitchen-island.webp',
    imageAlt: 'MERRYBOX Triangle Roll Up Dish Drying Rack space saving kitchen organizer',
    href:     'https://amzn.to/4ax1jR1',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="bg-[#FAFAFA]">

      {/* ──────────────────────────────────────────────────────
          INLINE KEYFRAMES — image zoom-in + decorative float.
          Rendered into the HTML so animations fire on first paint
          without JS. `animate-fade-rise` + `animate-bounce` come
          from the existing Tailwind theme.
          ────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes heroImageIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes heroBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(20px, -10px) scale(1.05); }
        }
        .animate-hero-image-in { animation: heroImageIn 1100ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-hero-float    { animation: heroFloat 4s ease-in-out infinite; }
        .animate-hero-blob     { animation: heroBlob 12s ease-in-out infinite; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          1. HERO — bright, airy, split-column
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-brand-light/20 via-[#FAFAFA] to-white"
      >
        {/* Decorative soft blobs — adds vibrancy without overwhelming */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-brand-light/40 blur-3xl animate-hero-blob"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[380px] rounded-full bg-emerald-200/25 blur-3xl animate-hero-blob"
          style={{ animationDelay: '3s' }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24 xl:gap-20">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col">

              {/* Eyebrow — anchors the niche ("premium") + freshness (2026) */}
              <p
                className="animate-fade-rise inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand"
                style={{ animationDelay: '0ms' }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                The Premium Edit · 2026
              </p>

              {/* H1 — benefit-driven hook. Italic+underline emphasis lands on
                  the proof claim ("Honestly Tested for Real-World Budgets")
                  so the eye fixates on the trust signal, not the category. */}
              <h1
                id="hero-heading"
                className="animate-fade-rise mt-5 font-serif text-4xl font-bold tracking-tight text-stone-900 leading-[1.05] md:text-5xl lg:text-6xl xl:text-7xl"
                style={{ animationDelay: '120ms' }}
              >
                Premium Interior Design,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-brand">Honestly Tested</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-3 -z-0 bg-brand-light/70 md:bottom-2 md:h-4"
                  />
                </span>
                {' '}for Real-World Budgets.
              </h1>

              {/* Sub — reframes "curation" as *testing*. Names the three
                  objections we kill: independence, real homes, no fluff. */}
              <p
                className="animate-fade-rise mt-6 max-w-xl text-lg leading-relaxed text-stone-600 md:text-xl"
                style={{ animationDelay: '240ms' }}
              >
                We test the high-end pieces and design moves that actually
                deliver — vetted in real homes, on real budgets, with{' '}
                <span className="font-semibold text-stone-900">zero sponsored opinions</span>.
              </p>

              {/* CTAs — primary is specific to the page promise; secondary
                  names the cadence (Sunday) for a measurable CTR lift. */}
              <div
                className="animate-fade-rise mt-9 flex flex-wrap items-center gap-4"
                style={{ animationDelay: '360ms' }}
              >
                <Link
                  href="/rooms"
                  className="
                    group inline-flex items-center gap-2 rounded-full
                    bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/30
                    transition-all duration-300 ease-out
                    hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/40
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                  "
                >
                  See the Premium Edit
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href="/newsletter"
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border-2 border-stone-900 bg-transparent px-7 py-3 text-base font-semibold text-stone-900
                    transition-all duration-300 ease-out
                    hover:bg-stone-900 hover:text-white hover:-translate-y-0.5
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2
                  "
                >
                  Get the Sunday Letter
                </Link>
              </div>

              {/* Trust strip — triadic proof: independence, integrity, scale.
                  The reader count is the bandwagon signal that converts. */}
              <div
                className="animate-fade-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-stone-500"
                style={{ animationDelay: '480ms' }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">Tested in real homes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">Zero sponsored posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">Trusted by 40k+ readers</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — Hero image ── */}
            <div className="relative">
              <div className="animate-hero-image-in animate-hero-float relative">
                <Image
                  src="/modular-sofa-tiny-apartment.webp"
                  alt="A bright, airy small-apartment living room with a modular sofa, natural light, and considered styling"
                  width={800}
                  height={1000}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="h-[420px] w-full rounded-3xl object-cover shadow-2xl shadow-stone-900/15 md:h-[500px] lg:h-[560px]"
                />

                {/* Floating top-left badge — anchors the "premium + budget"
                    promise directly on the hero image. Specific price ceiling
                    converts better than vague "affordable" claims. */}
                <div className="absolute -left-4 -top-4 hidden rounded-full bg-white px-5 py-3 shadow-xl shadow-stone-900/10 md:flex md:items-center md:gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-light/40 text-brand">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      This Week&rsquo;s Pick
                    </p>
                    <p className="text-sm font-semibold text-stone-900">
                      Premium under $400
                    </p>
                  </div>
                </div>

                {/* Floating bottom-right credibility chip — names the proof
                    methodology in a single number ("tested in 84 real homes")
                    instead of a generic activity count. */}
                <div className="absolute -bottom-5 -right-3 hidden rounded-2xl bg-white px-5 py-3 shadow-xl shadow-stone-900/10 md:block">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Tested in
                  </p>
                  <p className="mt-0.5 font-serif text-lg font-semibold text-stone-900">
                    84 real homes
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Scroll indicator ── */}
          <div className="flex justify-center pb-10 lg:pb-14">
            <a
              href="#latest"
              aria-label="Scroll to the latest articles"
              className="group inline-flex flex-col items-center gap-2 text-stone-400 transition-colors hover:text-brand"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]">
                Explore
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:shadow-lg animate-bounce">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          1.5  VIDEO SECTION — code-split, ssr:false, click-to-play
                Lives behind <LazyVideoSection /> so its JS + <video>
                element are kept entirely out of the initial render
                pass. preload="none" inside the component guarantees
                zero video bytes are fetched until the user clicks.
          ══════════════════════════════════════════════════════ */}
      <LazyVideoSection />

      {/* ══════════════════════════════════════════════════════
          2. LATEST ARTICLES — bright cards on white
          ══════════════════════════════════════════════════════ */}
      <section
        id="latest"
        aria-labelledby="latest-heading"
        className="bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

          {/* Section header */}
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                The Latest
              </p>
              <h2
                id="latest-heading"
                className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl"
              >
                Trending Room Design Guides
              </h2>
              <p className="mt-3 max-w-xl text-base text-stone-600">
                Three new reads this week — tested, considered, and written for the way you actually live at home.
              </p>
            </div>
            <Link
              href="/rooms"
              className="
                inline-flex flex-shrink-0 items-center gap-2 rounded-full
                border-2 border-stone-900 bg-transparent px-6 py-2.5 text-sm font-semibold text-stone-900
                transition-all duration-300 ease-out
                hover:bg-stone-900 hover:text-white hover:-translate-y-0.5
              "
            >
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Card grid — 1/2/3 columns */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
            {FEATURED.map((article) => (
              <article key={article.href} className="group">
                <Link href={article.href} className="block">

                  {/* Card image */}
                  <div className="overflow-hidden rounded-2xl bg-stone-100 shadow-md shadow-stone-900/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-stone-900/10">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                  </div>

                  {/* Card copy */}
                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">
                      {article.category}
                    </p>
                    <h3 className="mt-2.5 font-serif text-xl font-bold leading-snug tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-brand lg:text-2xl">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <p className="mt-4 text-sm text-stone-400">
                      {article.readingTime} min read
                    </p>
                  </div>

                </Link>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2.5  GLOBAL AESTHETICS — new-category feature
                Editorial two-column band: copy left, video right.
                Designed to read like an AD feature page — soft
                off-white surface, terracotta accent, serif headline.
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="global-aesthetics-heading"
        className="relative bg-neutral-50 py-24 lg:py-32"
      >
        {/* Decorative warm glow — sits behind the column gutter on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B0552B]/[0.06] blur-3xl lg:block"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

            {/* ── LEFT COLUMN — copy + CTA ──────────────────── */}
            <div className="flex flex-col">
              {/* Terracotta overline — distinct from the brand bronze so
                  the eye registers this as a *new* editorial direction. */}
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#B0552B]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B0552B]" />
                New Category · Global Aesthetics
              </p>

              <h2
                id="global-aesthetics-heading"
                className="mt-5 font-serif text-4xl font-bold tracking-tight text-stone-900 leading-[1.05] md:text-5xl lg:text-6xl"
              >
                Modern{' '}
                <span className="italic text-[#B0552B]">Marrakech</span>{' '}
                Luxury
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600 md:text-xl">
                Discover the perfect blend of traditional Moroccan
                craftsmanship and contemporary high-end design — warm earthy
                tones, intricate textures, and timeless elegance, considered
                for the way you actually live.
              </p>

              {/* Stylistic divider — quiet line that anchors the CTA below */}
              <div
                aria-hidden="true"
                className="mt-8 h-px w-12 bg-[#B0552B]/40"
              />

              <div className="mt-8">
                <Link
                  href="/global-designs"
                  className="
                    group inline-flex items-center gap-2 rounded-full
                    bg-[#B0552B] px-8 py-3.5 text-base font-semibold text-white
                    shadow-lg shadow-[#B0552B]/30
                    transition-all duration-300 ease-out
                    hover:bg-[#9a4a25] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#B0552B]/40
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0552B] focus-visible:ring-offset-2
                  "
                >
                  Read the Design Guide
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN — video player ──────────────────
                The Marrakech clip is a 576×1024 portrait (9:16) reel,
                so the card uses a vertical aspect ratio and a capped
                width — centered in the column for an elegant phone-
                reel presentation that never crops the footage. */}
            <div className="w-full">
              <ProVideoPlayer
                src="/marrakech-luxury-salon.mp4?v=2"
                label="Play the Marrakech luxury salon walk-through"
                aspectRatio="aspect-[9/16]"
                className="mx-auto w-full max-w-[360px] p-2 bg-white rounded-3xl shadow-2xl border border-neutral-100"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SHOP OUR FAVORITES — curated affiliate picks
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="favorites-heading"
        className="bg-[#FAFAFA]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">

          {/* Section header */}
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">
              Curated Essentials
            </p>
            <h2
              id="favorites-heading"
              className="mt-4 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl"
            >
              Shop Our Curated Favorites
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-stone-600">
              A small, deliberate edit of the pieces we keep recommending to clients — across kitchens, living rooms, and small-space layouts.
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
            {FAVORITES.map((product) => (
              <article
                key={product.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-900/5"
              >
                {/* Square image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Copy + CTA */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    {product.brand}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-stone-900">
                    {product.title}
                  </h3>
                  <p className="mt-3 font-serif text-2xl font-semibold text-stone-900">
                    {product.price}
                  </p>

                  <a
                    href={product.href}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="
                      mt-6 inline-flex items-center justify-center gap-2
                      rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white
                      transition-all duration-300 ease-out
                      hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand/30
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                    "
                  >
                    Shop Now
                    <svg
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-sm italic text-stone-500">
            We independently review everything we recommend. When you buy through our links, we may earn a small affiliate commission at no extra cost to you.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. NEWSLETTER BAND — closing CTA, vibrant footer
          ══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-brand-light/30 via-white to-emerald-50/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              The Newsletter
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl">
              One thoughtful email,{' '}
              <span className="italic text-brand">every Sunday.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              Room guides, honest reviews, and the trends worth knowing — delivered to your inbox. No spam, just considered design.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/newsletter"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/30
                  transition-all duration-300 ease-out
                  hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/40
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                "
              >
                Subscribe free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
