import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SidebarNewsletter } from '@/components/sections/SidebarNewsletter';
import { siteConfig } from '@/lib/site';

// ─── Static page ─────────────────────────────────────────────
export const dynamic = 'force-static';

// ─── Metadata ────────────────────────────────────────────────
export const metadata: Metadata = {
  title: '6 Honest Ways to Make a Small Home Feel Huge (Without Tearing Down Walls)',
  description:
    'Six real design decisions that make even the tightest spaces feel beautifully expansive. No renovation required — just honest tricks from the Bigelow Design Team.',
  alternates: { canonical: `${siteConfig.url}/blog/small-home-feel-huge` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/small-home-feel-huge`,
    title: '6 Honest Ways to Make a Small Home Feel Huge (Without Tearing Down Walls)',
    description:
      'Six real design decisions that make even the tightest spaces feel beautifully expansive. No renovation required.',
    images: [
      {
        url: `${siteConfig.url}/living-room-candid.webp`,
        width: 1200,
        height: 675,
        alt: 'A candid living room that feels spacious and airy through considered furniture placement and natural light',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '6 Honest Ways to Make a Small Home Feel Huge',
    description:
      'Mirrors, paint, furniture legs, double-duty pieces, vertical shelving, and the curtain trick. Six moves that actually work.',
    images: [`${siteConfig.url}/living-room-candid.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    '6 Honest Ways to Make a Small Home Feel Huge (Without Tearing Down Walls)',
  excerpt:
    "You can't magically create more square footage. But over our years of designing at Bigelow, we've learned a few genuine tricks that trick the eye and make even the tightest spaces feel beautifully expansive. Here are six design decisions that actually work.",
  categoryLabel: 'Room Guides',
  categoryHref:  '/rooms',
  author: {
    name:        'The Bigelow Design Team',
    slug:        'team-bigelow',
    avatar:      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio:         'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt:  '2026-05-29T08:00:00Z',
  updatedAt:    '2026-05-29T08:00:00Z',
  readingTime:  4,
  heroImage:    '/living-room-candid.webp',
  heroImageAlt:
    'A real, lived-in living room feeling open and airy — wide sofa on legs, mirrors opposite windows, and pale walls that let the natural light breathe',
  heroCaption:
    'A real living room, not a showroom. The sense of breathing room comes entirely from deliberate decisions — not additional square footage.',
  headings: [
    { id: 'fake-it-with-mirrors',          text: '1. Fake It With Mirrors (And Good Light)',     level: 2 },
    { id: 'breathable-paint-job',          text: "2. Give Your Walls a 'Breathable' Paint Job",  level: 2 },
    { id: 'furniture-that-shows-some-leg', text: "3. Buy Furniture That 'Shows Some Leg'",        level: 2 },
    { id: 'furniture-double-shifts',       text: '4. Make Your Furniture Work Double Shifts',     level: 2 },
    { id: 'use-your-vertical-space',       text: '5. Look Up: Use Your Vertical Space',           level: 2 },
    { id: 'the-curtain-trick',             text: '6. The Curtain Trick You Need to Try',          level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function SmallHomeFeelHugePage() {
  const canonicalUrl    = `${siteConfig.url}/blog/small-home-feel-huge`;
  const breadcrumbItems = [
    { name: 'Home',                url: '/'                  },
    { name: ARTICLE.categoryLabel, url: ARTICLE.categoryHref },
    { name: ARTICLE.title,         url: canonicalUrl         },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. ARTICLE HEADER — narrow centred column
          ══════════════════════════════════════════════════════ */}
      <div className="bg-surface border-b border-ink-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

        <header className="flex flex-col gap-4 mb-10 mt-6 max-w-3xl">

          {/* Category tag */}
          <Link
            href={ARTICLE.categoryHref}
            className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-accent-600 transition-colors duration-quick hover:text-accent-500 w-fit"
          >
            <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
            {ARTICLE.categoryLabel}
          </Link>

          {/* Title */}
          <h1 className="text-balance font-serif text-[clamp(28px,5vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
            {ARTICLE.title}
          </h1>

          {/* Deck */}
          <p className="text-pretty text-body-lg leading-relaxed text-ink-600">
            {ARTICLE.excerpt}
          </p>

          {/* Hairline */}
          <div aria-hidden="true" className="h-px w-16 bg-ink-200" />

          {/* Byline */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body-sm text-ink-500">
            <Image
              src={ARTICLE.author.avatar}
              alt=""
              width={32}
              height={32}
              className="rounded-full ring-2 ring-ink-100"
            />
            <Link
              href={`/authors/${ARTICLE.author.slug}`}
              className="font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
            >
              {ARTICLE.author.name}
            </Link>
            <span aria-hidden="true" className="text-ink-300">·</span>
            <time dateTime={ARTICLE.publishedAt}>{formatDate(ARTICLE.publishedAt)}</time>
            <span aria-hidden="true" className="text-ink-300">·</span>
            <span>{ARTICLE.readingTime} min read</span>
          </div>

        </header>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. HERO IMAGE — full bleed, cinematic on xl
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-elevated">
          <Image
            src={ARTICLE.heroImage}
            alt={ARTICLE.heroImageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-center text-[12px] italic leading-5 text-ink-400">
          {ARTICLE.heroCaption}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. READING LAYOUT — prose left, sticky sidebar right
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* ── Main prose column ── */}
          <main className="lg:col-span-8">
            <ArticleBody />

            {/* Author card */}
            <div className="mt-12 flex gap-4 rounded-2xl border border-ink-100 bg-elevated/40 p-6 lg:mt-16">
              <Image
                src={ARTICLE.author.avatar}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 flex-shrink-0 rounded-full ring-2 ring-ink-100"
              />
              <div>
                <p className="text-eyebrow uppercase tracking-[0.14em] text-ink-400">
                  Written by
                </p>
                <Link
                  href={`/authors/${ARTICLE.author.slug}`}
                  className="mt-0.5 block font-serif text-body-lg font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
                >
                  {ARTICLE.author.name}
                </Link>
                <p className="mt-0.5 text-body-sm text-ink-500">
                  {ARTICLE.author.credentials.join(' · ')}
                </p>
                <p className="mt-2 text-body-sm leading-relaxed text-ink-600">
                  {ARTICLE.author.bio}
                </p>
              </div>
            </div>
          </main>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block lg:col-span-4" aria-label="Sidebar">
            <div className="sticky top-24 space-y-8">

              {/* Table of contents */}
              <nav aria-label="Table of contents">
                <p className="mb-4 text-eyebrow uppercase tracking-[0.16em] text-ink-400">
                  In this article
                </p>
                <ol className="space-y-2 border-l border-ink-100 pl-4">
                  {ARTICLE.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={clsx(
                          'block text-[13px] leading-5 text-ink-600',
                          'transition-colors duration-quick hover:text-accent-600',
                        )}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div aria-hidden="true" className="h-px bg-ink-100" />

              {/* Newsletter mini-CTA */}
              <SidebarNewsletter />

            </div>
          </aside>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4. RELATED ARTICLES
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="related-heading"
        className="mx-auto max-w-7xl px-4 pb-20 pt-0 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="border-t border-ink-100 pt-12 lg:pt-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
                Keep reading
              </p>
              <h2 id="related-heading" className="mt-1.5 font-serif text-h2 text-ink-900">
                You might also like.
              </h2>
            </div>
            <Link
              href="/rooms"
              className="hidden flex-shrink-0 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500 sm:block"
            >
              All room guides →
            </Link>
          </div>

          <div className={`mt-10 grid gap-8 lg:gap-8 ${RELATED_ARTICLES.length === 1 ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {RELATED_ARTICLES.map((card) => (
              <RelatedArticleCard key={card.slug} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Article body ──────────────────────────────────────────────
// Each <h2> id matches the sidebar TOC exactly.
// The secondary image /bedroom-curtains.webp uses explicit width/height
// (800×500) so it flows naturally in the prose column as a <figure>,
// with w-full + h-auto making it fully responsive.
function ArticleBody() {
  return (
    <>
      {/* ── Intro prose ── */}
      <div className="prose prose-lg max-w-none">
        <p>
          Let&apos;s be real for a second. Living in a small house or
          apartment is incredibly cozy, but we&apos;ve all experienced that
          moment of frustration where you just want a little more room to
          breathe (and maybe stop bumping your knee on the coffee table).
          Unless you have the budget to start knocking down walls, you
          can&apos;t magically create more square footage. But over our years
          of designing at Bigelow, we&apos;ve learned a few genuine tricks
          that trick the eye and make even the tightest spaces feel
          beautifully expansive. Here are six design decisions that
          actually work.
        </p>
      </div>

      {/* ── Main body prose — all six h2 sections in one block ── */}
      <div className="prose prose-lg max-w-none">

        {/* ─ Section 1 ─ */}
        <h2 id="fake-it-with-mirrors">
          1. Fake It With Mirrors (And Good Light)
        </h2>
        <p>
          Everyone tells you to &lsquo;use more natural light,&rsquo; but
          the real secret weapon here is where you put your mirrors. We
          always recommend taking the biggest, simplest wall mirror you can
          find and placing it directly across from your main window. It
          essentially acts as a second window, bouncing light into the dark
          corners of the room and instantly doubling the visual depth.
          It&apos;s the oldest trick in the book because it never fails.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="breathable-paint-job">
          2. Give Your Walls a &lsquo;Breathable&rsquo; Paint Job
        </h2>
        <p>
          We love a moody, dark room, but if your goal is strictly to make
          a small space look bigger, dark paint is not your friend. Dark
          colors draw hard lines and tell your brain exactly where the room
          ends. Instead, reach for crisp whites, warm soft beiges, or very
          faint pastels. Here is an extra tip we use on almost every
          project: paint your ceiling the exact same white as your walls.
          It erases the line where the wall meets the ceiling, making the
          room feel taller.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="furniture-that-shows-some-leg">
          3. Buy Furniture That &lsquo;Shows Some Leg&rsquo;
        </h2>
        <p>
          This is probably the biggest mistake we see in small living
          rooms: massive, blocky sofas that sit flat on the floor. They
          swallow the room whole. When shopping, look for sofas, accent
          chairs, and beds that are elevated on slender wooden or metal
          legs. Exposing that extra floor space underneath the furniture
          tricks your brain into thinking there&apos;s more room than there
          actually is. Also, try pulling your couch just two inches away
          from the wall&mdash;it creates a sense of airiness.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="furniture-double-shifts">
          4. Make Your Furniture Work Double Shifts
        </h2>
        <p>
          In a tiny home, every single piece of furniture needs to earn its
          keep. If a piece only does one thing, it might be taking up too
          much space. We always try to source beautiful storage ottomans
          that can act as a coffee table, a place to hide extra blankets,
          and a seat for a guest. Look for media consoles with deep, closed
          doors so you can hide the clutter. Less visual clutter equals
          more visual space.
        </p>

        {/* ─ Section 5 ─ */}
        <h2 id="use-your-vertical-space">
          5. Look Up: Use Your Vertical Space
        </h2>
        <p>
          When you run out of floor space, the only way to go is up. Most
          people ignore the top half of their walls! We love installing
          tall, narrow shelving units or simple floating wooden shelves.
          You can use them to display your favorite books, a trailing
          houseplant, or some nice pottery. It draws the eye upward, making
          the ceiling feel higher while keeping your floor totally clear.
        </p>

        {/* ─ Inline image between sections 5 and 6 ─ */}
        <figure>
          <Image
            src="/bedroom-curtains.webp"
            alt="Floor-length sheer linen curtains mounted at ceiling height beside a sunlit window, dramatically increasing the perceived room height"
            width={800}
            height={500}
            className="w-full rounded-xl object-cover"
          />
          <figcaption>
            Floor-to-ceiling sheers, the rod installed as close to the
            cornice as possible. This one change transforms how tall a
            room feels.
          </figcaption>
        </figure>

        {/* ─ Section 6 ─ */}
        <h2 id="the-curtain-trick">
          6. The Curtain Trick You Need to Try
        </h2>
        <p>
          Hanging window treatments is where a lot of people accidentally
          shrink their rooms. If you hang a curtain rod right above the
          window frame, you are cutting the wall in half. Here is what you
          should do instead: install that curtain rod as close to the
          ceiling as you possibly can, and let the fabric fall all the way
          down to the floor. Swap out heavy drapes for sheer, lightweight
          linen. It&apos;s a simple weekend DIY project, but it will make
          your windows look massive and your ceilings look impossibly high.
        </p>

      </div>
    </>
  );
}

// ─── Related articles ──────────────────────────────────────────
// Only real, published articles. No links to non-existent pages.
type RelatedCard = {
  slug:          string;
  title:         string;
  excerpt:       string;
  categoryLabel: string;
  categoryHref:  string;
  href:          string;
  image:         string;
  imageAlt:      string;
  readingTime:   number;
};

const RELATED_ARTICLES: RelatedCard[] = [
  {
    slug:          'japandi-bedroom-design',
    title:         "The Japandi Bedroom: Why We're Leaving Heavy Furniture Behind in 2026",
    excerpt:
      "The design hybrid that marries wabi-sabi Japanese elegance with Scandinavian hygge — and the bedroom philosophy that actively lowers your heart rate.",
    categoryLabel: 'Bedroom Guides',
    categoryHref:  '/rooms/bedroom',
    href:          '/blog/japandi-bedroom-design',
    image:         '/japandi-hero.webp',
    imageAlt:      'A serene Japandi bedroom with a low platform bed and warm washi paper lamp',
    readingTime:   5,
  },
  {
    slug:          'hidden-armoire-storage-2026',
    title:         "The Secret Armoire: Why Hidden Storage is 2026's Ultimate Luxury",
    excerpt:
      'Custom millwork and invisible storage are redefining what it means for a room to feel truly calm. Here is the case for hiding everything.',
    categoryLabel: 'Design Trends',
    categoryHref:  '/design-trends',
    href:          '/blog/hidden-armoire-storage-2026',
    image:         'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    imageAlt:      'Elegant room with seamless custom wooden cabinetry concealing storage',
    readingTime:   7,
  },
];

function RelatedArticleCard({ card }: { card: RelatedCard }) {
  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={card.href}
        className="block overflow-hidden rounded-xl"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col">
        <Link
          href={card.categoryHref}
          className="text-eyebrow uppercase tracking-[0.14em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {card.categoryLabel}
        </Link>
        <h3 className="mt-1.5 flex-1 font-serif text-body-lg font-semibold leading-snug text-ink-900">
          <Link
            href={card.href}
            className="transition-colors duration-quick hover:text-accent-600"
          >
            {card.title}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
          {card.excerpt}
        </p>
        <p className="mt-3 text-body-sm text-ink-400">{card.readingTime} min read</p>
      </div>
    </article>
  );
}
