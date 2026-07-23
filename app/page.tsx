import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { LazyVideoSection } from '@/components/LazyVideoSection';
import { ProVideoPlayer } from '@/components/ProVideoPlayer';
import { ScrollReveal } from '@/components/ui/Reveal';
import { BotanicalAccent } from '@/components/decor/BotanicalAccent';

// ─── SSG — built once at deploy, served from CDN edge ────────
export const dynamic = 'force-static';

// 158 chars — strict 150–160 window for SEO Site Checkup.
const HOME_META_DESCRIPTION =
  'Interior design that lives in the real world — editorial room guides, honest furniture reviews, and the modern home trends worth knowing, curated weekly.';

export const metadata: Metadata = {
  // `absolute` opts out of the layout's `%s | Bigelow Designs` template —
  // a plain string here rendered the brand twice in the tab title.
  title: { absolute: `${siteConfig.name} — Premium Interior Design` },
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
    href:         '/blog/luxury-powder-room-design',
    category:     'Room Guides',
    title:        'The Powder Room Edit: How We Design High-Impact, Luxury Small Bathrooms',
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



// ─── Decorating Mood Boards — horizontal inspiration rail ─────
// All images are existing, git-tracked assets already used elsewhere
// on the site; nothing new was added to public/.
const MOOD_BOARDS = [
  {
    tag: 'Design Trends',
    title: 'Warm Modern',
    href: '/design-trends',
    image: '/interior-design-trends-2026-warm-modern-heritage.webp',
    imageAlt: 'A warm modern interior with earthy tones, mixed wood textures, and heritage-inspired styling',
  },
  {
    tag: 'Bedroom',
    title: 'Japandi Calm',
    href: '/rooms/bedroom',
    image: '/japandi-bedroom.webp',
    imageAlt: 'A serene Japandi bedroom with a low platform bed and natural linen textures',
  },
  {
    tag: 'Design Trends',
    title: 'Biophilic Green',
    href: '/design-trends',
    image: '/biophilic-design.webp',
    imageAlt: 'A plant-filled biophilic interior with layered greenery and natural light',
  },
  {
    tag: 'Bedroom',
    title: 'Playful & Bold',
    href: '/rooms/bedroom',
    image: '/dopamine-decor-colorful-bedroom.webp',
    imageAlt: 'A playful, colorful bedroom with bold dopamine-decor styling and layered textures',
  },
  {
    tag: 'Design Trends',
    title: 'Rustic Charm',
    href: '/design-trends',
    image: '/rustic-vintage-home-decor.webp',
    imageAlt: 'A rustic interior with reclaimed wood, woven textures, and warm vintage decor',
  },
  {
    tag: 'Living Room',
    title: 'Cozy & Collected',
    href: '/rooms/living-room',
    image: '/cozy-eclectic-tv-lounge.webp',
    imageAlt: 'A cozy, collected living room lounge with layered textiles and warm lighting',
  },
] as const;

// ─── Come Inside My Home — room tour grid ─────────────────────
// Same six categories and hero imagery as /rooms/[slug] (Unsplash host
// is already allow-listed in next.config.mjs), so nothing new to vet.
const HOME_TOUR_ROOMS = [
  {
    label: 'Living Room',
    href: '/rooms/living-room',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=80',
    imageAlt: 'A sunlit minimalist living room with a cream modular sofa and oak floors',
  },
  {
    label: 'Kitchen',
    href: '/rooms/kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
    imageAlt: 'A modern kitchen with marble counters, brass fixtures, and open shelving',
  },
  {
    label: 'Bedroom',
    href: '/rooms/bedroom',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80',
    imageAlt: 'A serene bedroom with linen bedding, warm morning light, and oak floors',
  },
  {
    label: 'Bathroom',
    href: '/rooms/bathroom',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80',
    imageAlt: 'A clean bathroom with white marble tiles and polished brass fixtures',
  },
  {
    label: 'Home Office',
    href: '/rooms/home-office',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80',
    imageAlt: 'A clean, minimal home office with a wooden desk, a task lamp, and a plant',
  },
  {
    label: 'Outdoor',
    href: '/rooms/outdoor-guides',
    image: '/outdoor-balcony-oasis.webp',
    imageAlt: 'A beautifully designed outdoor balcony oasis with warm ambient lighting',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────
/** The Design Studio — our interactive styling guides. */
const STUDIO_GUIDES = [
  {
    numeral: 'I',
    name: 'The Scale & Placement Guide',
    blurb:
      'Where curtains and artwork actually belong. The exact height to mark on the wall, including the detail almost every guide leaves out.',
    cta: 'Find your height',
    href: '/tools/hanging-calculator',
  },
  {
    numeral: 'II',
    name: 'The Room Ambience Planner',
    blurb:
      'How much light a room needs, layered the way designers build it — and the one thing you should never mix in a single space.',
    cta: 'Plan your light',
    href: '/tools/lighting-calculator',
  },
  {
    numeral: 'III',
    name: 'The Paint & Light Harmony Studio',
    blurb:
      'Why the same white reads warm in one room and cold in the next. See how a colour will behave before you commit to it.',
    cta: 'Test your colour',
    href: '/tools/paint-lrv-predictor',
  },
] as const;

export default function HomePage() {
  return (
    <div className="bg-[#FAF9F5]">

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
          1. HERO — warm, welcoming, cozy-coastal editorial intro
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-brand-light/15 via-[#FAF9F5] to-white"
      >
        {/* Decorative soft blobs — warm terracotta + soft coastal mist */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-brand-light/40 blur-3xl animate-hero-blob"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[380px] rounded-full bg-accent-50/70 blur-3xl animate-hero-blob"
          style={{ animationDelay: '3s' }}
        />

        {/* Botanical line-art — muted margin accents, purely decorative */}
        <BotanicalAccent
          className="pointer-events-none absolute -left-6 top-8 hidden h-64 w-32 text-ink-200/70 lg:block"
        />
        <BotanicalAccent
          flip
          className="pointer-events-none absolute -right-6 bottom-8 hidden h-64 w-32 text-ink-200/70 lg:block"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24 xl:gap-20">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col">

              {/* Handwritten personal greeting — the script-font "someone
                  actually wrote this" touch, sitting above the real H1. */}
              <p
                className="animate-fade-rise font-script text-3xl leading-none text-accent-600 md:text-4xl"
                style={{ animationDelay: '0ms' }}
              >
                Hello, welcome in
              </p>

              {/* H1 — warm, personal, still carries the "tested/honest"
                  trust claim that matters for both readers and E-E-A-T. */}
              <h1
                id="hero-heading"
                className="animate-fade-rise mt-3 font-serif text-4xl font-bold tracking-tight text-stone-900 leading-[1.08] md:text-5xl lg:text-6xl xl:text-[64px]"
                style={{ animationDelay: '120ms' }}
              >
                Helping you create{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-brand">a home you love</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-3 -z-0 bg-brand-light/70 md:bottom-2 md:h-4"
                  />
                </span>
                , one honest room at a time.
              </h1>

              {/* Sub — keeps the trust claims (real homes, no sponsored
                  bias) but in a warmer, first-person editorial voice. */}
              <p
                className="animate-fade-rise mt-6 max-w-xl text-lg leading-relaxed text-stone-600 md:text-xl"
                style={{ animationDelay: '240ms' }}
              >
                Practical layout rules, cozy styling ideas, and honest reviews —
                all tested in real homes, all written like a friend explaining
                what actually works. No showroom fantasies, no sponsored praise.
              </p>

              {/* CTA — prominent, softly rounded "Start Here" entry point */}
              <div
                className="animate-fade-rise mt-9 flex flex-wrap items-center gap-5"
                style={{ animationDelay: '360ms' }}
              >
                <Link
                  href="/rooms"
                  className="
                    group inline-flex items-center gap-2.5 rounded-full
                    bg-brand px-9 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-brand/30
                    transition-all duration-300 ease-out
                    hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/40
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                  "
                >
                  Start Here
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
                  className="text-sm font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4 transition-colors duration-300 hover:text-accent-600 hover:decoration-accent-600"
                >
                  or get the Sunday letter →
                </Link>
              </div>

              {/* Trust strip — same three proof points, recast in the
                  new coastal-navy accent instead of green. */}
              <div
                className="animate-fade-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-stone-500"
                style={{ animationDelay: '480ms' }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">Tested in real homes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">Zero sponsored posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-50 text-accent-600">
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
                  className="h-[420px] w-full rounded-[2rem] object-cover shadow-2xl shadow-stone-900/15 md:h-[500px] lg:h-[560px]"
                />

                {/* Floating top-left badge */}
                <div className="absolute -left-4 -top-4 hidden rounded-full bg-white px-5 py-3 shadow-xl shadow-stone-900/10 md:flex md:items-center md:gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-light/40 text-brand">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Featured
                    </p>
                    <p className="text-sm font-semibold text-stone-900">
                      DESIGN TIPS
                    </p>
                  </div>
                </div>

                {/* Floating bottom-right credibility chip */}
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
          1.2  DECORATING MOOD BOARDS — horizontal scroll-snap rail
          ══════════════════════════════════════════════════════ */}
      <section aria-labelledby="moodboards-heading" className="relative overflow-hidden bg-white py-20 lg:py-24">
        <BotanicalAccent
          className="pointer-events-none absolute -right-8 -top-6 hidden h-56 w-28 text-ink-200/60 md:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-10 max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              For Your Inspiration
            </p>
            <h2
              id="moodboards-heading"
              className="mt-2 font-script text-5xl leading-none text-accent-600 md:text-6xl"
            >
              Decorating Mood Boards
            </h2>
            <p className="mt-4 text-base text-stone-600 md:text-lg">
              A little visual inspiration for whatever room is on your mind this week.
              Scroll through, save what you love.
            </p>
          </ScrollReveal>

          {/* Horizontal scroll-snap rail — native scroll, no JS carousel
              library needed. Cards are fixed-width so peeking the next
              card is always visible as an affordance to scroll. */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-width:thin]">
            {MOOD_BOARDS.map((board) => (
              <Link
                key={board.title}
                href={board.href}
                className="group relative w-[76vw] flex-shrink-0 snap-start overflow-hidden rounded-3xl shadow-md shadow-stone-900/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-stone-900/10 sm:w-[46vw] md:w-[32vw] lg:w-[23vw]"
              >
                <div className="relative aspect-[4/5] w-full bg-stone-100">
                  <Image
                    src={board.image}
                    alt={board.imageAlt}
                    fill
                    sizes="(max-width: 640px) 76vw, (max-width: 768px) 46vw, (max-width: 1024px) 32vw, 23vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/0 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                      {board.tag}
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-white">
                      {board.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          1.4  COME INSIDE MY HOME — room-category tour grid
          ══════════════════════════════════════════════════════ */}
      <section aria-labelledby="hometour-heading" className="relative overflow-hidden bg-[#FAF9F5] py-20 lg:py-24">
        <BotanicalAccent
          flip
          className="pointer-events-none absolute -left-8 bottom-0 hidden h-56 w-28 text-ink-200/60 md:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              The Grand Tour
            </p>
            <h2
              id="hometour-heading"
              className="mt-2 font-script text-5xl leading-none text-accent-600 md:text-6xl"
            >
              Come inside my home
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-stone-600 md:text-lg">
              Every room, tested and considered. Pick a space and see what actually works.
            </p>
          </ScrollReveal>

          {/* Rendered statically (no per-item ScrollReveal) — six
              simultaneous IntersectionObserver instances proved unreliable
              in testing, occasionally sticking at opacity-0. The section
              header above still reveals on scroll; these tiles are always
              visible and rely on the hover lift for interactivity instead. */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {HOME_TOUR_ROOMS.map((room) => (
              <Link
                key={room.href}
                href={room.href}
                className="group block overflow-hidden rounded-3xl bg-stone-100 shadow-sm shadow-stone-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/10"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-stone-900/55 via-stone-900/0 to-transparent"
                  />
                  <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-lg font-semibold text-white sm:text-xl">
                    {room.label}
                  </p>
                </div>
              </Link>
            ))}
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

          {/* Section header — soft fade-up as it enters the viewport */}
          <ScrollReveal className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
          </ScrollReveal>

          {/* Card grid — 1/2/3 columns, cards stagger in 120 ms apart */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
            {FEATURED.map((article, idx) => (
              <ScrollReveal
                key={article.href}
                as="article"
                delay={idx * 120}
                className="group"
              >
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
              </ScrollReveal>
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
            <ScrollReveal className="flex flex-col">
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
            </ScrollReveal>

            {/* ── RIGHT COLUMN — video player ──────────────────
                The Marrakech clip is a 576×1024 portrait (9:16) reel,
                so the card uses a vertical aspect ratio and a capped
                width — centered in the column for an elegant phone-
                reel presentation that never crops the footage.
                Trails the copy column by 150 ms for editorial pacing. */}
            <ScrollReveal delay={150} className="w-full">
              <ProVideoPlayer
                src="/marrakech-salon-hd.mp4"
                label="Play the Marrakech luxury salon walk-through"
                aspectRatio="aspect-[9/16]"
                className="mx-auto w-full max-w-[360px] p-2 bg-white rounded-3xl shadow-2xl border border-neutral-100"
              />
            </ScrollReveal>

          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════════════════
          3.5 THE DESIGN STUDIO — interactive styling service
          ══════════════════════════════════════════════════════ */}
      <section className="border-y border-ink-100/70 bg-sunken/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              The Design Studio
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl">
              Your room,{' '}
              <span className="italic text-brand">measured properly.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              Three interactive guides that answer the questions every project runs into — how high,
              how bright, and which colour. The same rules we work to, applied to your space in
              seconds.
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {STUDIO_GUIDES.map((guide, i) => (
              <ScrollReveal key={guide.href} delay={i * 80}>
                <Link
                  href={guide.href}
                  className="
                    group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-8
                    shadow-sm transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                  "
                >
                  <p className="font-serif text-2xl text-brand">{guide.numeral}</p>
                  <h3 className="mt-4 font-serif text-xl font-bold tracking-tight text-stone-900">
                    {guide.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-stone-600">
                    {guide.blurb}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors duration-300 group-hover:text-brand-hover">
                    {guide.cta}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <Link
              href="/tools"
              className="
                inline-flex items-center gap-2 rounded-full border border-stone-300 px-7 py-3
                text-sm font-semibold text-stone-800
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
              "
            >
              Enter the Design Studio
              <span aria-hidden>→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. NEWSLETTER BAND — closing CTA, vibrant footer
          ══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-brand-light/30 via-white to-accent-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
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
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
