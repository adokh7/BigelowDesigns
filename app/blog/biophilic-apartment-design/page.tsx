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
  title: "Biophilic Apartment Design: Beyond the Houseplant Jungle",
  description:
    "True biophilic design is about more than just buying houseplants. Learn how to architecturally integrate nature into your urban apartment for ultimate mental well-being.",
  alternates: { canonical: `${siteConfig.url}/blog/biophilic-apartment-design` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/biophilic-apartment-design`,
    title: "Biophilic Apartment Design: Beyond the Houseplant Jungle",
    description:
      "True biophilic design is about more than just buying houseplants. Learn how to architecturally integrate nature into your urban apartment for ultimate mental well-being.",
    images: [
      {
        url: `${siteConfig.url}/biophilic-apartment.webp`,
        width: 1200,
        height: 675,
        alt: 'A beautiful light-filled urban apartment styled with sophisticated biophilic design elements',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Biophilic Apartment Design: Beyond the Houseplant Jungle",
    description:
      "True biophilic design is about more than just buying houseplants. Learn how to architecturally integrate nature into your urban apartment for ultimate mental well-being.",
    images: [`${siteConfig.url}/biophilic-apartment.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "Biophilic Apartment Design: Moving Beyond the Houseplant Jungle",
  excerpt:
    "True biophilic design is about more than just buying houseplants. Learn how to architecturally integrate nature into your urban apartment for ultimate mental well-being.",
  categoryLabel: 'Design Trends',
  categoryHref: '/design-trends',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T18:46:32Z',
  updatedAt: '2026-06-02T18:46:32Z',
  readingTime: 3,
  heroImage: '/biophilic-apartment.webp',
  heroImageAlt:
    'A beautiful light-filled urban apartment styled with sophisticated biophilic design elements',
  heroCaption:
    'Architectural greenery and organic shapes. Connecting humans with nature on a subconscious level.',
  headings: [
    { id: 'architectural-greenery-over-potted-clutter', text: '1. Architectural Greenery over Potted Clutter', level: 2 },
    { id: 'maximize-dynamic-natural-light', text: '2. Maximize Dynamic Natural Light', level: 2 },
    { id: 'embrace-organic-biomorphic-shapes', text: '3. Embrace Organic, Biomorphic Shapes', level: 2 },
    { id: 'the-power-of-tactile-natural-materials', text: '4. The Power of Tactile, Natural Materials', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function BiophilicApartmentDesignPage() {
  const canonicalUrl = `${siteConfig.url}/blog/biophilic-apartment-design`;
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
          Over the last few years, the desire to connect with nature inside our homes reached a fever pitch. In response, apartment dwellers began filling every available windowsill, shelf, and floor space with potted plants. While the intention was good, the execution often resulted in spaces that felt chaotic, cluttered, and incredibly stressful to maintain.
        </p>
        <p>
          In 2026, the approach to bringing the outdoors inside has matured. We are moving away from the &ldquo;houseplant hoarding&rdquo; aesthetic and embracing true <strong>biophilic design</strong>.
        </p>
        <p>
          Biophilic design is an architectural framework that seeks to connect humans with nature on a subconscious level. It is not just about placing a fern on a desk; it is about mimicking the textures, lighting, and shapes found in the natural world. Here is how we apply sophisticated biophilic principles to modern urban apartments.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="architectural-greenery-over-potted-clutter">1. Architectural Greenery over Potted Clutter</h2>
        <p>
          Instead of scattering twenty small pots across your living room, treat greenery as a single, high-impact architectural element.
        </p>
        <p>
          If your budget and lighting permit, installing a vertical living green wall is the ultimate biophilic statement. It acts as a piece of living artwork and naturally purifies the air without eating up valuable floor space. If a living wall is too complex, opt for a single, massive statement tree&mdash;like an established Ficus Audrey or a Black Olive tree&mdash;housed in a heavy, textured stone planter. One large tree provides a stronger psychological connection to a forest canopy than a dozen small succulents ever could.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="maximize-dynamic-natural-light">2. Maximize Dynamic Natural Light</h2>
        <p>
          In the natural world, light is never static. It shifts, filters through leaves, and changes color temperature throughout the day. Our circadian rhythms are deeply tied to these subtle changes.
        </p>
        <p>
          To mimic this in an apartment, you must optimize your window treatments. Heavy, blackout drapes should be restricted to the bedroom. In the living spaces, utilize sheer linen or loose-weave cotton curtains. These materials act like a tree canopy, diffusing the harsh afternoon sun and allowing dappled, dynamic shadows to dance across your walls. If your apartment lacks natural light, investing in smart LED bulbs that automatically adjust their color temperature from cool morning white to warm evening amber is a crucial biophilic upgrade.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="embrace-organic-biomorphic-shapes">3. Embrace Organic, Biomorphic Shapes</h2>
        <p>
          Nature does not build in perfect right angles. The human brain interprets sharp, rigid corners as man-made and inherently less relaxing.
        </p>
        <p>
          To soften a concrete apartment box, introduce biomorphic shapes&mdash;furniture and decor that mimic the organic curves found in nature. Swap a rectangular glass coffee table for a kidney-shaped table crafted from a solid slab of burl wood. Look for sofas with curved, sloping backs rather than rigid mid-century boxes. Even small additions, like an asymmetrical, pebble-shaped mirror or hand-thrown, imperfect ceramics, help break up the rigid geometry of the room.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="the-power-of-tactile-natural-materials">4. The Power of Tactile, Natural Materials</h2>
        <p>
          Finally, biophilic design relies heavily on touch. When everything in an apartment is made of smooth plastic, synthetic polyester, or cold laminate, we feel entirely disconnected from the earth.
        </p>
        <p>
          Focus on sourcing raw, tactile materials. A heavy jute or sisal rug underfoot provides the same sensory feedback as walking on dry grass. Opt for unvarnished, matte-finish woods where you can actually feel the grain. Choose bedding made of organic, stonewashed linen. By surrounding yourself with materials that look and feel as though they were plucked directly from the outdoors, your apartment transforms from a sterile box into a deeply grounding sanctuary.
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
