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
  title: "The Anti-Cubicle: Designing a Luxury Home Office You Actually Want to Work In",
  description:
    "Stop facing the wall. Discover our expert interior design strategies for creating a sophisticated, high-end home office that fosters creativity and focus.",
  alternates: { canonical: `${siteConfig.url}/blog/luxury-home-office-design` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/luxury-home-office-design`,
    title: "The Anti-Cubicle: Designing a Luxury Home Office You Actually Want to Work In",
    description:
      "Stop facing the wall. Discover our expert interior design strategies for creating a sophisticated, high-end home office that fosters creativity and focus.",
    images: [
      {
        url: `${siteConfig.url}/luxury-home-office.webp`,
        width: 1200,
        height: 675,
        alt: 'A beautiful luxury home office design featuring a floating desk in the center of the room and ambient library lighting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Anti-Cubicle: Designing a Luxury Home Office You Actually Want to Work In",
    description:
      "Stop facing the wall. Discover our expert interior design strategies for creating a sophisticated, high-end home office that fosters creativity and focus.",
    images: [`${siteConfig.url}/luxury-home-office.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "The Anti-Cubicle: Designing a Luxury Home Office You Actually Want to Work In",
  excerpt:
    "Stop facing the wall. Discover our expert interior design strategies for creating a sophisticated, high-end home office that fosters creativity and focus.",
  categoryLabel: 'Room Guides',
  categoryHref: '/room-guides',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T18:13:04Z',
  updatedAt: '2026-06-02T18:13:04Z',
  readingTime: 3,
  heroImage: '/luxury-home-office.webp',
  heroImageAlt:
    'A beautiful luxury home office design featuring a floating desk in the center of the room and ambient library lighting',
  heroCaption:
    'Fostering focus and creativity in the command position.',
  headings: [
    { id: 'master-the-command-position', text: '1. Master the "Command Position"', level: 2 },
    { id: 'ditch-the-mesh-ergonomic-chair', text: '2. Ditch the Mesh Ergonomic Chair', level: 2 },
    { id: 'curate-the-cinematic-zoom-background', text: '3. Curate the Cinematic Zoom Background', level: 2 },
    { id: 'layer-warm-ambient-task-lighting', text: '4. Layer Warm, Ambient Task Lighting', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function LuxuryHomeOfficeDesignPage() {
  const canonicalUrl = `${siteConfig.url}/blog/luxury-home-office-design`;
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
          The era of the makeshift home office is officially over. We have moved past the days of answering emails from the kitchen island or balancing a laptop on a stack of books. In 2026, the work-from-home setup is a permanent architectural fixture in our lives.
        </p>
        <p>
          Yet, when designing these spaces, many people accidentally recreate the sterile, soul-crushing aesthetic of a corporate cubicle right inside their own homes. They buy the black mesh chairs, the cold white desks, and the harsh fluorescent desk lamps.
        </p>
        <p>
          Your home office should be the most inspiring room in your house. It should feel like the private study of a boutique hotel, not a satellite branch of a tech conglomerate. Here is our blueprint for designing a high-end, luxury home office that actually fuels your creativity.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="master-the-command-position">1. Master the &ldquo;Command Position&rdquo;</h2>
        <p>
          The most common, and most tragic, mistake in home office design is shoving a desk flat against a blank wall. Sitting with your back to the door and your face inches away from drywall is psychologically restrictive and aesthetically punishing.
        </p>
        <p>
          Instead, we strictly utilize the &ldquo;Command Position.&rdquo; Pull the desk away from the wall and float it in the center of the room, facing the doorway. This instantly gives the room a sense of executive authority. When you sit down, you have a full view of the space and the natural light from the windows, which drastically reduces visual fatigue over an eight-hour workday.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="ditch-the-mesh-ergonomic-chair">2. Ditch the Mesh Ergonomic Chair</h2>
        <p>
          We will say it: standard ergonomic mesh office chairs ruin the aesthetic of a residential room. While spinal support is undeniably important, you do not have to sacrifice beauty for comfort.
        </p>
        <p>
          The market has finally caught up to the WFH demand. We recommend sourcing vintage, mid-century executive chairs upholstered in rich, cognac leather, or modern, high-backed armchairs swathed in durable bouclé or heavy linen. Look for chairs that offer tilt-mechanisms and hidden lumbar support without looking like a piece of medical equipment.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="curate-the-cinematic-zoom-background">3. Curate the Cinematic Zoom Background</h2>
        <p>
          In the modern working world, the wall behind your desk is your professional storefront. It is the backdrop for every video call, negotiation, and presentation you make.
        </p>
        <p>
          Instead of a blank white wall or a distracting virtual background, build in physical depth. A floor-to-ceiling bookshelf painted in a deeply saturated color&mdash;like a rich library green, aubergine, or charcoal&mdash;creates an incredible cinematic frame. We advise filling these shelves intentionally: two-thirds books (organized slightly imperfectly) and one-third sculptural objects, vintage ceramics, and framed artwork to add personality and warmth.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="layer-warm-ambient-task-lighting">4. Layer Warm, Ambient Task Lighting</h2>
        <p>
          Overhead lighting is the enemy of a peaceful workspace. It creates harsh shadows across your keyboard and causes severe eye strain as it competes with the glow of your monitors.
        </p>
        <p>
          A luxury office relies entirely on layered, ambient lighting. Start with a heavy, architectural desk lamp&mdash;perhaps in unlacquered brass or honed travertine&mdash;outfitted with a warm 2700K bulb. Complement this with a small library sconce mounted above your bookshelves and a shaded floor lamp in the corner. This creates a soft, moody, and highly focused environment that makes you actually want to stay at your desk long after the day is done.
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
