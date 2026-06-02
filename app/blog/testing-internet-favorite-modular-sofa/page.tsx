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
  title: "We Tested the Internet's Favorite Modular Sofa in a 400 Sq Ft Apartment",
  description:
    "An honest 6-month review of the internet's most viral modular sofa. Is it the best modular sofa for small spaces in 2026, or just good marketing?",
  alternates: { canonical: `${siteConfig.url}/blog/testing-internet-favorite-modular-sofa` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/testing-internet-favorite-modular-sofa`,
    title: "We Tested the Internet's Favorite Modular Sofa in a 400 Sq Ft Apartment",
    description:
      "An honest 6-month review of the internet's most viral modular sofa. Is it the best modular sofa for small spaces in 2026, or just good marketing?",
    images: [
      {
        url: `${siteConfig.url}/modular-sofa-tiny-apartment.webp`,
        width: 1200,
        height: 675,
        alt: 'A modular sofa in a compact, stylish apartment living room setup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "We Tested the Internet's Favorite Modular Sofa in a 400 Sq Ft Apartment",
    description:
      "An honest 6-month review of the internet's most viral modular sofa. Is it the best modular sofa for small spaces in 2026, or just good marketing?",
    images: [`${siteConfig.url}/modular-sofa-tiny-apartment.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "We Tested the Internet’s Favorite Modular Sofa in a 400 Sq Ft Apartment",
  excerpt:
    "An honest 6-month review of the internet's most viral modular sofa. Is it the best modular sofa for small spaces in 2026, or just good marketing?",
  categoryLabel: 'Furniture Reviews',
  categoryHref: '/reviews',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T17:08:16Z',
  updatedAt: '2026-06-02T17:08:16Z',
  readingTime: 5,
  heroImage: '/modular-sofa-tiny-apartment.webp',
  heroImageAlt:
    'A modular sofa in a compact, stylish apartment living room setup',
  heroCaption:
    'Six months of daily testing in a 400-square-foot footprint.',
  headings: [
    { id: 'the-promise-vs-reality', text: 'The Promise vs. The Reality of "Small Space" Furniture', level: 2 },
    { id: 'comfort-and-construction', text: 'Comfort and Construction: Does It Hold Up?', level: 2 },
    { id: 'what-we-actually-hated', text: 'What We Actually Hated', level: 2 },
    { id: 'the-final-verdict', text: 'The Final Verdict', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function ModularSofaReviewPage() {
  const canonicalUrl = `${siteConfig.url}/blog/testing-internet-favorite-modular-sofa`;
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
          If you’ve spent more than five minutes on interior design TikTok or Instagram this year, you’ve seen <em>the</em> sofa. You know the one: low to the ground, impossibly plush, covered in performance fabric, and seemingly capable of fitting into any floor plan thanks to its modular magic.
        </p>
        <p>
          But as furniture editors, we have a healthy skepticism of anything that looks a little <em>too</em> perfect online. We’ve seen enough &ldquo;viral&rdquo; couches arrive feeling like cardboard boxes wrapped in cheap polyester to know that good marketing doesn't always equal good manufacturing.
        </p>
        <p>
          So, we decided to put our money where our mouth is. We bought the internet's reigning modular champion and squeezed it into a narrow, 400-square-foot apartment in the city to see if it truly is the <strong>best modular sofa for small spaces in 2026</strong>. After six months of daily lounging, spilled coffee, and weekend naps, here is our entirely unfiltered review.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="the-promise-vs-reality">
          The Promise vs. The Reality of &ldquo;Small Space&rdquo; Furniture
        </h2>
        <p>
          When shopping for <strong>space-saving apartment furniture</strong>, you usually have to compromise. You either get a sofa that fits your tiny living room but feels as stiff as a dentist's waiting room chair, or you get a ridiculously comfortable lounger that completely swallows your floor plan.
        </p>
        <p>
          The promise of this modular system is that you don't have to choose. Because the arms are slim and the pieces connect seamlessly, it claims to maximize seating area without adding visual bulk.
        </p>
        <p>
          <strong>The Reality:</strong> The delivery process was genuinely renter-friendly. It arrived in manageable boxes that actually fit through a standard pre-war apartment door frame&mdash;a massive win. Assembly took two of us about 45 minutes, mostly spent wrestling with the cushion covers. Once set up, the low profile did exactly what it promised: it made the ceiling feel higher and didn't block the light from the single living room window.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="comfort-and-construction">
          Comfort and Construction: Does It Hold Up?
        </h2>
        <p>
          An <strong>honest sofa review</strong> has to address the foam. In the showroom, everything feels great. Six months later, the truth comes out.
        </p>
        <p>
          We opted for the deep-seat configuration. The cushions are constructed with a high-density foam core wrapped in a generous layer of down alternative.
        </p>
        <ul>
          <li>
            <strong>The Sit Test:</strong> It is unapologetically a &ldquo;lounging&rdquo; sofa, not a &ldquo;sitting up straight to drink tea with your mother-in-law&rdquo; sofa. You sink into it, but the foam core prevents you from bottoming out against the frame.
          </li>
          <li>
            <strong>The Fabric:</strong> We chose the performance bouclé in &ldquo;Oatmeal.&rdquo; To test its mettle, we &ldquo;accidentally&rdquo; dropped a spoonful of chili on it during month two. With a damp cloth and a drop of dish soap, the stain lifted completely in under three minutes without leaving a water ring.
          </li>
        </ul>

        {/* ─ Section 3 ─ */}
        <h2 id="what-we-actually-hated">
          What We Actually Hated
        </h2>
        <p>
          No piece of furniture is flawless, especially when forced into a tight layout. Here are the genuine drawbacks we found:
        </p>
        <ul>
          <li>
            <strong>The Connectors:</strong> While the modularity is great for moving, the metal clips that hold the sections together have a slight amount of play in them. If you launch yourself onto the couch, you can occasionally feel the pieces shift a fraction of an inch.
          </li>
          <li>
            <strong>Cushion Maintenance:</strong> Because the back cushions are so plush, they require religious fluffing. If you don't aggressively punch them back into shape every few days, they start to look sad and deflated, instantly ruining the premium aesthetic of your living room.
          </li>
          <li>
            <strong>The Price Tag:</strong> While cheaper than bespoke designer brands, it’s still a significant investment. Squeezing this into a tiny apartment budget requires commitment.
          </li>
        </ul>

        {/* ─ Section 4 ─ */}
        <h2 id="the-final-verdict">
          The Final Verdict
        </h2>
        <p>
          Finding the right proportions for a small living room is incredibly difficult. After living with it for half a year, we can confidently say this modular system isn't just a social media mirage.
        </p>
        <p>
          It succeeds where so many &ldquo;apartment sofas&rdquo; fail because it scales down the overall footprint without scaling down the depth of the seat or the quality of the materials. It is a genuine investment piece that you won't have to leave behind when you eventually move to a larger space&mdash;you can simply buy another module and snap it on.
        </p>
        <p>
          If you are willing to commit to the regular cushion-fluffing routine, this might just be the smartest seating purchase you can make for a tiny apartment right now.
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
    slug: 'hidden-armoire-storage-2026',
    title: "The Secret Armoire: Why Hidden Storage is 2026’s Ultimate Luxury",
    excerpt:
      'Custom millwork and invisible storage are redefining what it means for a room to feel truly calm. Here is the case for hiding everything.',
    categoryLabel: 'Design Trends',
    categoryHref: '/design-trends',
    href: '/blog/hidden-armoire-storage-2026',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    imageAlt: 'Elegant room with seamless custom wooden cabinetry concealing storage',
    readingTime: 7,
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
