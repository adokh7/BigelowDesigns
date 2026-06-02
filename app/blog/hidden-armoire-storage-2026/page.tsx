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
  title: "The Return of the Armoire: Why Concealed Storage is 2026's Best Trend",
  description:
    "Open shelving is officially out. Discover why heavy, beautiful, closed-door armoires are the ultimate solution for hiding WFH clutter and tech in modern apartments.",
  alternates: { canonical: `${siteConfig.url}/blog/hidden-armoire-storage-2026` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/hidden-armoire-storage-2026`,
    title: "The Return of the Armoire: Why Concealed Storage is 2026's Best Trend",
    description:
      "Open shelving is officially out. Discover why heavy, beautiful, closed-door armoires are the ultimate solution for hiding WFH clutter and tech in modern apartments.",
    images: [
      {
        url: `${siteConfig.url}/hidden-armoire-storage.webp`,
        width: 1200,
        height: 675,
        alt: 'A beautiful freestanding design armoire with tactile fluted wood panels in a minimalist home setup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Return of the Armoire: Why Concealed Storage is 2026's Best Trend",
    description:
      "Open shelving is officially out. Discover why heavy, beautiful, closed-door armoires are the ultimate solution for hiding WFH clutter and tech in modern apartments.",
    images: [`${siteConfig.url}/hidden-armoire-storage.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "The Return of the Armoire: Why Concealed Storage is 2026’s Best Design Trend",
  excerpt:
    "Open shelving is officially out. Discover why heavy, beautiful, closed-door armoires are the ultimate solution for hiding WFH clutter and tech in modern apartments.",
  categoryLabel: 'Design Trends',
  categoryHref: '/design-trends',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T18:05:15Z',
  updatedAt: '2026-06-02T18:05:15Z',
  readingTime: 3,
  heroImage: '/hidden-armoire-storage.webp',
  heroImageAlt:
    'A beautiful freestanding design armoire with tactile fluted wood panels in a minimalist home setup',
  heroCaption:
    'Tactile finishes and architectural weight. The armoire is the correction to visual fatigue.',
  headings: [
    { id: 'the-5-pm-wfh-disappearing-act', text: '1. The 5 PM WFH Disappearing Act', level: 2 },
    { id: 'hiding-the-black-hole-of-tech', text: '2. Hiding the "Black Hole" of Tech', level: 2 },
    { id: 'adding-architectural-weight-without-renovation', text: '3. Adding Architectural Weight Without Renovation', level: 2 },
    { id: 'the-material-palette-burl-fluting-and-woven-cane', text: '4. The Material Palette: Burl, Fluting, and Woven Cane', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function HiddenArmoireStoragePage() {
  const canonicalUrl = `${siteConfig.url}/blog/hidden-armoire-storage-2026`;
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: ARTICLE.categoryLabel, url: ARTICLE.categoryHref },
    { name: ARTICLE.title, url: canonicalUrl },
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
              <span aria-hidden="true" className="text-ink-300">&middot;</span>
              <time dateTime={ARTICLE.publishedAt}>{formatDate(ARTICLE.publishedAt)}</time>
              <span aria-hidden="true" className="text-ink-300">&middot;</span>
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
              All room guides &rarr;
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-8">
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
function ArticleBody() {
  return (
    <>
      {/* ── Intro prose ── */}
      <div className="prose prose-lg max-w-none">
        <p>
          For the better part of a decade, interior design was dominated by the &ldquo;open shelving&rdquo; movement. We were told to display our curated ceramics, our color-coordinated books, and our perfectly styled pantry jars for all the world to see.
        </p>
        <p>
          But as our homes increasingly became our offices, our gyms, and our entire worlds, the aesthetic of &ldquo;displaying everything&rdquo; quickly morphed into overwhelming visual fatigue. We don&apos;t want to look at our curated clutter anymore. We just want it to disappear.
        </p>
        <p>
          Enter the undisputed hero of 2026 interior design: the freestanding armoire. The heavy, closed-door cabinet has returned with a vengeance, trading its dated, chunky &rsquo;90s reputation for sleek, architectural profiles. Here is why investing in concealed storage is the smartest design decision you can make this year.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="the-5-pm-wfh-disappearing-act">1. The 5 PM WFH Disappearing Act</h2>
        <p>
          The biggest challenge of the modern apartment is the permanent integration of the home office. When your desk is in your living room or bedroom, the psychological boundary between &ldquo;work&rdquo; and &ldquo;rest&rdquo; is completely destroyed. You are constantly staring at your monitors.
        </p>
        <p>
          The modern armoire solves this beautifully. &ldquo;Clóffices&rdquo; (closet offices) built into large freestanding wardrobes allow you to set up a highly functional workstation&mdash;complete with ergonomic monitors and corkboards&mdash;that can be instantly erased. At 5:00 PM, you simply shut the heavy wooden doors. The glowing screens vanish, and your living room reverts back into a sanctuary of relaxation.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="hiding-the-black-hole-of-tech">2. Hiding the &ldquo;Black Hole&rdquo; of Tech</h2>
        <p>
          Interior designers have long hated the television. When turned off, a large TV is essentially a massive, glossy black hole that absorbs light and ruins the aesthetic composition of a room. While frame TVs have attempted to solve this, nothing beats physical concealment.
        </p>
        <p>
          A beautifully crafted media armoire completely hides your television, soundbars, and gaming consoles. By hiding the tech behind fluted oak or reeded glass doors, the technology serves you when you need it, but refuses to dominate the room&apos;s design narrative when you don&apos;t.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="adding-architectural-weight-without-renovation">3. Adding Architectural Weight Without Renovation</h2>
        <p>
          If you live in a newer, &ldquo;builder-grade&rdquo; apartment, your space likely lacks architectural character. There are no built-in bookcases, no crown molding, and no interesting alcoves.
        </p>
        <p>
          A massive, high-quality armoire instantly injects historical weight and gravity into a blank, drywall box. Because of its sheer size, it acts as a piece of standalone architecture. It draws the eye upward, highlighting the height of the ceilings, and grounds the room in a way that a series of flimsy, floating shelves never could.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="the-material-palette-burl-fluting-and-woven-cane">4. The Material Palette: Burl, Fluting, and Woven Cane</h2>
        <p>
          The armoires of 2026 are not your grandmother&apos;s heavy, ornate mahogany wardrobes. Today&apos;s concealed storage pieces are tactile and heavily textured.
        </p>
        <p>
          We are seeing a massive resurgence in Burl wood, which adds a stunning, organic swirl pattern that functions as a piece of art in its own right. Fluted and ribbed woods are incredibly popular for their ability to play with light and shadow, while woven cane or rattan doors offer a slightly lighter, more coastal approach to concealment. Whichever material you choose, the mandate remains the same: close the doors, hide the mess, and reclaim your visual peace.
        </p>
      </div>
    </>
  );
}

// ─── Related articles ──────────────────────────────────────────
type RelatedCard = {
  slug: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  categoryHref: string;
  href: string;
  image: string;
  imageAlt: string;
  readingTime: number;
};

const RELATED_ARTICLES: RelatedCard[] = [
  {
    slug: 'small-home-feel-huge',
    title: '6 Honest Ways to Make a Small Home Feel Huge (Without Tearing Down Walls)',
    excerpt:
      'Six real design decisions that make even the tightest spaces feel beautifully expansive. No renovation required — just honest tricks from the Bigelow Design Team.',
    categoryLabel: 'Room Guides',
    categoryHref: '/rooms/living-room',
    href: '/blog/small-home-feel-huge',
    image: '/living-room-candid.webp',
    imageAlt: 'A real living room feeling spacious and airy through deliberate furniture placement',
    readingTime: 4,
  },
  {
    slug: 'space-saving-dining-tables',
    title: '7 Best Space-Saving Dining Tables for Small Apartments (2026)',
    excerpt:
      'Small dining room? These 7 space-saving dining tables keep your apartment stylish, functional, and guest-ready in 2026.',
    categoryLabel: 'Room Guides',
    categoryHref: '/rooms/living-room',
    href: '/blog/space-saving-dining-tables',
    image: '/space-saving-tables.webp',
    imageAlt: 'A compact apartment dining area with a slim extendable dining table and open chairs',
    readingTime: 8,
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
