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
  title: "The 'No Big Light' Rule: A Guide to Mastering Layered Lighting",
  description:
    "Why interior designers never turn on the overhead light. Discover how to use layered ambient lighting to instantly make your home feel expensive and cozy.",
  alternates: { canonical: `${siteConfig.url}/blog/no-big-light-layered-lighting` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/no-big-light-layered-lighting`,
    title: "The 'No Big Light' Rule: A Guide to Mastering Layered Lighting",
    description:
      "Why interior designers never turn on the overhead light. Discover how to use layered ambient lighting to instantly make your home feel expensive and cozy.",
    images: [
      {
        url: `${siteConfig.url}/layered-lighting-living-room.webp`,
        width: 1200,
        height: 675,
        alt: 'A cozy living room styled with layered ambient lighting including floor lamps and plug-in sconces',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The 'No Big Light' Rule: A Guide to Mastering Layered Lighting",
    description:
      "Why interior designers never turn on the overhead light. Discover how to use layered ambient lighting to instantly make your home feel expensive and cozy.",
    images: [`${siteConfig.url}/layered-lighting-living-room.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "The \"No Big Light\" Rule: How to Master Layered Lighting in Any Space",
  excerpt:
    "Why interior designers never turn on the overhead light. Discover how to use layered ambient lighting to instantly make your home feel expensive and cozy.",
  categoryLabel: 'Design Trends',
  categoryHref: '/design-trends',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T18:52:38Z',
  updatedAt: '2026-06-02T18:52:38Z',
  readingTime: 3,
  heroImage: '/layered-lighting-living-room.webp',
  heroImageAlt:
    'A cozy living room styled with layered ambient lighting including floor lamps and plug-in sconces',
  heroCaption:
    'Relying on low-level, warm-toned illumination to create architectural depth.',
  headings: [
    { id: 'the-three-tiers-of-illumination', text: '1. The Three Tiers of Illumination', level: 2 },
    { id: 'embrace-the-plug-in-sconce', text: '2. Embrace the Plug-In Sconce', level: 2 },
    { id: 'strict-temperature-control-the-2700k-mandate', text: '3. Strict Temperature Control: The 2700K Mandate', level: 2 },
    { id: 'put-everything-on-a-dimmer', text: '4. Put Everything on a Dimmer', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function NoBigLightLayeredLightingPage() {
  const canonicalUrl = `${siteConfig.url}/blog/no-big-light-layered-lighting`;
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
          If you ask any high-end interior designer for the single fastest way to ruin a beautifully decorated room, their answer will be unanimous: turning on the overhead light.
        </p>
        <p>
          On social media, this phenomenon has been affectionately dubbed the &ldquo;No Big Light&rdquo; rule. It is a strict design philosophy that treats the primary ceiling fixture as a utility only to be used when you are actively cleaning or searching for a lost contact lens. For relaxing, entertaining, or simply living, the &ldquo;big light&rdquo; is strictly forbidden.
        </p>
        <p>
          Why? Because standard overhead lighting casts harsh, downward shadows. It illuminates dust, flattens the architectural depth of a room, and makes everyone sitting on your sofa look like they are in a police interrogation room. The secret to a home that feels expensive, cinematic, and deeply calming lies entirely in <strong>layered lighting</strong>. Here is how to execute it flawlessly.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="the-three-tiers-of-illumination">1. The Three Tiers of Illumination</h2>
        <p>
          A luxury room is never lit from a single source. To master layered lighting, you must incorporate three distinct tiers of illumination, distributed evenly across the space:
        </p>
        <ul>
          <li>
            <strong>Ambient Lighting:</strong> The base layer. This replaces the overhead light. It comes from large floor lamps pointing upward or heavily shaded table lamps that cast a soft, diffuse glow across the walls.
          </li>
          <li>
            <strong>Task Lighting:</strong> The functional layer. This is the articulated brass reading lamp positioned directly over your favorite armchair, or the under-cabinet lights illuminating your kitchen cutting board.
          </li>
          <li>
            <strong>Accent Lighting:</strong> The decorative layer. Think picture lights highlighting a piece of art, or small, low-wattage uplights sitting behind a large potted olive tree to cast dramatic shadows on the ceiling.
          </li>
        </ul>

        {/* ─ Section 2 ─ */}
        <h2 id="embrace-the-plug-in-sconce">2. Embrace the Plug-In Sconce</h2>
        <p>
          Historically, achieving a custom, layered lighting scheme required hiring an electrician to hardwire sconces into your drywall&mdash;a massive barrier for renters or those on a tight budget.
        </p>
        <p>
          In 2026, the plug-in wall sconce has completely revolutionized accessible design. You can now mount beautiful, unlacquered brass or woven-rattan sconces on either side of your bed or sofa and simply plug the cord into a standard outlet. To elevate the look further, use a cord cover painted to match the exact color of your walls. It delivers the high-end architectural symmetry of hardwired lighting without the renovation costs.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="strict-temperature-control-the-2700k-mandate">3. Strict Temperature Control: The 2700K Mandate</h2>
        <p>
          You can buy the most expensive designer lamps in the world, but if you put the wrong bulb in them, your room will still feel like a hospital waiting area.
        </p>
        <p>
          The color temperature of a lightbulb is measured in Kelvins (K). Daylight or &ldquo;cool white&rdquo; bulbs typically sit around 4000K to 5000K. These should be banned from your living spaces. To achieve that coveted, warm, boutique-hotel glow, strictly purchase bulbs that are <strong>2700K or 2400K</strong>. This mimics the warmth of candlelight and a setting sun, triggering your brain to wind down and relax.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="put-everything-on-a-dimmer">4. Put Everything on a Dimmer</h2>
        <p>
          Finally, lighting must be adjustable. The mood you want at 6:00 PM on a Tuesday is different from the mood you want at 11:00 PM during a dinner party.
        </p>
        <p>
          If you are using plug-in lamps, invest in a set of smart plugs with built-in dimming capabilities. By connecting your layered lighting to a single remote or smartphone app, you can instantly drop the brightness of the entire room by 50%. This level of environmental control is the ultimate interior luxury, turning a standard apartment into a deeply curated sanctuary.
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
