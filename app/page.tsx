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

              {/* Eyebrow */}
              <p
                className="animate-fade-rise inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand"
                style={{ animationDelay: '0ms' }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                Volume 2026 · The Edit
              </p>

              {/* H1 */}
              <h1
                id="hero-heading"
                className="animate-fade-rise mt-5 font-serif text-4xl font-bold tracking-tight text-stone-900 leading-[1.05] md:text-5xl lg:text-6xl xl:text-7xl"
                style={{ animationDelay: '120ms' }}
              >
                Interior design that{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-brand">feels like home</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-3 -z-0 bg-brand-light/70 md:bottom-2 md:h-4"
                  />
                </span>
                .
              </h1>

              {/* Sub */}
              <p
                className="animate-fade-rise mt-6 max-w-xl text-lg leading-relaxed text-stone-600 md:text-xl"
                style={{ animationDelay: '240ms' }}
              >
                Honest furniture reviews, considered room guides, and the trends
                worth knowing — curated for the way you actually live.
              </p>

              {/* CTAs */}
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
                  Explore Guides
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
                  Get the Newsletter
                </Link>
              </div>

              {/* Stats row */}
              <div
                className="animate-fade-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-stone-500"
                style={{ animationDelay: '480ms' }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">100% independent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">0 sponsored posts</span>
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

                {/* Floating "Editor's Pick" badge */}
                <div className="absolute -left-4 -top-4 hidden rounded-full bg-white px-5 py-3 shadow-xl shadow-stone-900/10 md:flex md:items-center md:gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-light/40 text-brand">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Editor&rsquo;s Pick
                    </p>
                    <p className="text-sm font-semibold text-stone-900">
                      Small-space wins
                    </p>
                  </div>
                </div>

                {/* Floating bottom-right rating chip */}
                <div className="absolute -bottom-5 -right-3 hidden rounded-2xl bg-white px-5 py-3 shadow-xl shadow-stone-900/10 md:block">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    This week
                  </p>
                  <p className="mt-0.5 font-serif text-lg font-semibold text-stone-900">
                    24 new guides
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
                Fresh from the studio.
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
              Shop Our Favorites
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
