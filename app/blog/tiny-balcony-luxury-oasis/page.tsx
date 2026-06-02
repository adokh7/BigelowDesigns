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
  title: "How to Turn a Tiny Concrete Balcony into a Luxury Oasis",
  description:
    "Expert design strategies to transform a small, bleak apartment balcony into a high-end Mediterranean-inspired outdoor living space.",
  alternates: { canonical: `${siteConfig.url}/blog/tiny-balcony-luxury-oasis` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/tiny-balcony-luxury-oasis`,
    title: "How to Turn a Tiny Concrete Balcony into a Luxury Oasis",
    description:
      "Expert design strategies to transform a small, bleak apartment balcony into a high-end Mediterranean-inspired outdoor living space.",
    images: [
      {
        url: `${siteConfig.url}/tiny-balcony-oasis.webp`,
        width: 1200,
        height: 675,
        alt: 'A beautifully designed outdoor balcony oasis with Mediterranean style, olive tree, terracotta pots, and warm ambient lighting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "How to Turn a Tiny Concrete Balcony into a Luxury Oasis",
    description:
      "Expert design strategies to transform a small, bleak apartment balcony into a high-end Mediterranean-inspired outdoor living space.",
    images: [`${siteConfig.url}/tiny-balcony-oasis.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "Transforming a Tiny Concrete Balcony into a Luxury Mediterranean Oasis",
  excerpt:
    "Expert design strategies to transform a small, bleak apartment balcony into a high-end Mediterranean-inspired outdoor living space.",
  categoryLabel: 'Room Guides',
  categoryHref: '/room-guides',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T17:51:11Z',
  updatedAt: '2026-06-02T17:51:11Z',
  readingTime: 3,
  heroImage: '/tiny-balcony-oasis.webp',
  heroImageAlt:
    'A beautifully designed outdoor balcony oasis with Mediterranean style, olive tree, terracotta pots, and warm ambient lighting',
  heroCaption:
    'Transforming a stark urban balcony into a rich, Mediterranean-inspired outdoor sanctuary.',
  headings: [
    { id: 'hide-the-concrete-immediately', text: '1. Hide the Concrete Immediately', level: 2 },
    { id: 'scale-your-furniture-ruthlessly', text: '2. Scale Your Furniture Ruthlessly', level: 2 },
    { id: 'think-vertically-with-greenery', text: '3. Think Vertically with Greenery', level: 2 },
    { id: 'ditch-the-dorm-room-string-lights', text: '4. Ditch the Dorm-Room String Lights', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function TinyBalconyLuxuryOasisPage() {
  const canonicalUrl = `${siteConfig.url}/blog/tiny-balcony-luxury-oasis`;
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
          For most apartment dwellers, the balcony is the most neglected real estate in the home. It often becomes a graveyard for dead houseplants, an awkward storage space for a bicycle, or simply a barren slab of concrete that goes unused for nine months of the year.
        </p>
        <p>
          But when treated with the same intentionality as a living room, even the smallest outdoor space can become a profound luxury. You do not need a sprawling suburban backyard to enjoy an evening breeze with a glass of wine.
        </p>
        <p>
          Here is our editorial guide to elevating a stark urban balcony into a rich, Mediterranean-inspired outdoor sanctuary that feels miles away from the city below.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="hide-the-concrete-immediately">1. Hide the Concrete Immediately</h2>
        <p>
          The biggest mistake you can make with a small balcony is leaving the original builder-grade concrete floor exposed. It immediately makes the space feel cold, industrial, and unfinished.
        </p>
        <p>
          To instantly warm up the area, the flooring must be addressed. If your building allows it, laying down interlocking acacia wood decking tiles is a weekend project that completely changes the visual temperature of the space. For a more elevated, Roman-villa aesthetic, consider laying an outdoor rug that mimics the texture of natural sisal or seagrass. By covering the bleak foundation, you trick the eye into perceiving the balcony as a true extension of your interior living space.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="scale-your-furniture-ruthlessly">2. Scale Your Furniture Ruthlessly</h2>
        <p>
          When dealing with a 4x8 foot space, proportion is everything. Shoving a standard, bulky patio dining set onto a tiny balcony creates a claustrophobic obstacle course.
        </p>
        <p>
          Instead of forcing a dining scenario, optimize the balcony for lounging. Invest in one incredibly beautiful, low-profile teak lounge chair paired with an upholstered, weather-resistant cushion in a sophisticated oatmeal or ivory. Pair it with a heavy ceramic or concrete side table just large enough to hold a book and a drink. A single, high-quality seating moment always looks more luxurious than cramped, cheap seating for four.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="think-vertically-with-greenery">3. Think Vertically with Greenery</h2>
        <p>
          Floor space is your most precious commodity, so do not clutter it with dozens of tiny plant pots. To create a lush, oasis-like atmosphere, you need height, not volume.
        </p>
        <p>
          We recommend sourcing one &ldquo;statement&rdquo; tree&mdash;like a hardy Olive tree or a slender Cypress&mdash;and potting it in a heavily textured, oversized terracotta planter tucked into the furthest corner. Then, utilize your vertical space by installing a subtle wooden trellis or tension rod to train climbing vines like Star Jasmine. This draws the eye upward, giving the illusion of a much taller space while naturally blocking unsightly views of neighboring buildings.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="ditch-the-dorm-room-string-lights">4. Ditch the Dorm-Room String Lights</h2>
        <p>
          Lighting is the final, crucial layer of luxury outdoor design. The default for apartment balconies is often a haphazard string of exposed fairy lights, which can quickly veer into dorm-room territory.
        </p>
        <p>
          For a more sophisticated ambiance, rely on layered, low-level lighting. Invest in oversized, brass or blackened steel floor lanterns equipped with battery-operated LED pillar candles. Place a small, rechargeable, mushroom-style ambient lamp on your side table. By keeping the light sources below eye level, you create an intimate, moody glow that feels incredibly high-end and relaxing after the sun goes down.
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
