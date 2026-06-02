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
  title: "The Micro-Island: Space-Saving Kitchen Islands That Actually Work",
  description:
    "You don't need a suburban mansion to have a kitchen island. Discover expert design strategies for space-saving kitchen islands in small apartments.",
  alternates: { canonical: `${siteConfig.url}/blog/space-saving-kitchen-islands` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/space-saving-kitchen-islands`,
    title: "The Micro-Island: Space-Saving Kitchen Islands That Actually Work",
    description:
      "You don't need a suburban mansion to have a kitchen island. Discover expert design strategies for space-saving kitchen islands in small apartments.",
    images: [
      {
        url: `${siteConfig.url}/micro-kitchen-island.webp`,
        width: 1200,
        height: 675,
        alt: 'A modern, space-saving micro-kitchen island with waterfall edges and backless barstools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Micro-Island: Space-Saving Kitchen Islands That Actually Work",
    description:
      "You don't need a suburban mansion to have a kitchen island. Discover expert design strategies for space-saving kitchen islands in small apartments.",
    images: [`${siteConfig.url}/micro-kitchen-island.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "The Micro-Island: Space-Saving Kitchen Islands That Actually Work",
  excerpt:
    "You don't need a suburban mansion to have a kitchen island. Discover expert design strategies for space-saving kitchen islands in small apartments.",
  categoryLabel: 'Room Guides',
  categoryHref: '/room-guides',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T18:38:48Z',
  updatedAt: '2026-06-02T18:38:48Z',
  readingTime: 3,
  heroImage: '/micro-kitchen-island.webp',
  heroImageAlt:
    'A modern, space-saving micro-kitchen island with waterfall edges and backless barstools',
  heroCaption:
    'Prep and casual dining without suffocating the small-scale kitchen.',
  headings: [
    { id: 'the-freestanding-worktable', text: '1. The Freestanding Worktable', level: 2 },
    { id: 'the-skinny-waterfall-edge', text: '2. The Skinny Waterfall Edge', level: 2 },
    { id: 'strict-seating-discipline', text: '3. Strict Seating Discipline', level: 2 },
    { id: 'move-the-appliances-out', text: '4. Move the Appliances Out', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function SpaceSavingKitchenIslandsPage() {
  const canonicalUrl = `${siteConfig.url}/blog/space-saving-kitchen-islands`;
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
          For the last two decades, the ultimate symbol of a successful kitchen renovation was a massive, aircraft-carrier-sized island. But if you live in a metropolitan apartment or a historic pre-war building, trying to force a ten-foot slab of marble into your floor plan is a recipe for spatial disaster.
        </p>
        <p>
          When you cram an oversized island into a small kitchen, you destroy the flow of the room. You end up constantly bumping your hips on sharp stone corners and struggling to open the dishwasher.
        </p>
        <p>
          Thankfully, the design industry in 2026 has fully embraced the &ldquo;micro-island.&rdquo; A well-designed, space-saving kitchen island offers the essential prep space and casual seating you crave, without suffocating the room. Here is our editorial guide to executing a small-scale island perfectly.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="the-freestanding-worktable">1. The Freestanding Worktable</h2>
        <p>
          The smartest way to introduce an island into a tight kitchen is to abandon the idea of heavy, built-in cabinetry. A solid block of wood and stone anchored to the floor feels visually heavy and stops the flow of light.
        </p>
        <p>
          Instead, we source vintage or custom freestanding worktables. Picture a beautifully crafted walnut or oak table with four sturdy legs and an open slatted shelf at the bottom for storing heavy cast-iron pots. Because you can see the floor continuing underneath the piece, the kitchen feels infinitely larger. It provides the necessary chopping space without acting as a visual barricade.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="the-skinny-waterfall-edge">2. The Skinny Waterfall Edge</h2>
        <p>
          If you prefer a modern, built-in look, you have to manipulate the proportions. The standard kitchen island depth is 36 to 42 inches. For a small space, we routinely design custom &ldquo;skinny islands&rdquo; that are only 18 to 24 inches deep.
        </p>
        <p>
          To make a narrow island look intentional and luxurious rather than skimpy, we utilize a waterfall edge. By carrying the countertop material (like heavily veined marble or durable sintered stone) down the sides to the floor, you create a striking, monolithic piece of architecture. It feels like a deliberate sculpture rather than a compromised piece of furniture.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="strict-seating-discipline">3. Strict Seating Discipline</h2>
        <p>
          A common mistake in small kitchens is trying to fit too many barstools around a tiny island. Cramming four massive, upholstered stools around a 40-inch counter makes the room look instantly cluttered and chaotic.
        </p>
        <p>
          If you are working with a micro-island, practice strict seating discipline. Opt for a maximum of two stools, and choose backless, low-profile designs that can be pushed entirely underneath the counter when not in use. Backless stools in natural materials&mdash;like woven leather or solid teak&mdash;keep the sightlines clear across the room.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="move-the-appliances-out">4. Move the Appliances Out</h2>
        <p>
          A standard large island often houses the sink, the dishwasher, or a microwave drawer. When designing for a small space, you must strip the island back to its purest function: prep space and dining.
        </p>
        <p>
          Do not attempt to run plumbing or heavy electrical to a micro-island. Keep your work triangle (the sink, stove, and fridge) strictly on the perimeter walls. Leaving the island surface completely uninterrupted maximizes your usable counter space and keeps the installation budget significantly lower.
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
