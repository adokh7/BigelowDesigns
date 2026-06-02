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
  title: "The Powder Room Edit: How We Design High-Impact, Luxury Half-Baths",
  description:
    "At Bigelow, the powder room is our favorite design canvas. We abandon the 'make it white and bright' rule in favor of dark moody walls and dramatic textures.",
  alternates: { canonical: `${siteConfig.url}/blog/luxury-powder-room-edit` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/luxury-powder-room-edit`,
    title: "The Powder Room Edit: How We Design High-Impact, Luxury Half-Baths",
    description:
      "At Bigelow, the powder room is our favorite design canvas. We abandon the 'make it white and bright' rule in favor of dark moody walls and dramatic textures.",
    images: [
      {
        url: `${siteConfig.url}/luxury-powder-room.webp`,
        width: 1200,
        height: 675,
        alt: 'A moody, luxury powder room with dark walls and face-level wall sconces',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Powder Room Edit: How We Design High-Impact, Luxury Half-Baths",
    description:
      "At Bigelow, the powder room is our favorite design canvas. We abandon the 'make it white and bright' rule in favor of dark moody walls and dramatic textures.",
    images: [`${siteConfig.url}/luxury-powder-room.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "The Powder Room Edit: Abandoning \"Light and Bright\" for Dark, Moody Luxury",
  excerpt:
    "At Bigelow, the powder room is our favorite design canvas. We abandon the 'make it white and bright' rule in favor of dark moody walls and dramatic textures.",
  categoryLabel: 'Room Guides',
  categoryHref: '/room-guides',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T17:18:01Z',
  updatedAt: '2026-06-02T17:18:01Z',
  readingTime: 3,
  heroImage: '/luxury-powder-room.webp',
  heroImageAlt:
    'A moody, luxury powder room with dark walls and face-level wall sconces',
  heroCaption:
    'Abandoning the white and bright rule for high-impact, moody luxury.',
  headings: [
    { id: 'embrace-dark-moody-walls', text: '1. Embrace Dark, Moody Walls', level: 2 },
    { id: 'invest-in-dramatic-stone', text: '2. Invest in Dramatic Stone', level: 2 },
    { id: 'unlacquered-brass-living-finishes', text: '3. Unlacquered Brass and Living Finishes', level: 2 },
    { id: 'atmospheric-face-level-lighting', text: '4. Atmospheric, Face-Level Lighting', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function LuxuryPowderRoomEditPage() {
  const canonicalUrl = `${siteConfig.url}/blog/luxury-powder-room-edit`;
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
          If there is one outdated interior design rule that needs to be permanently retired in 2026, it is the idea that small spaces must be painted white to make them feel larger.
        </p>
        <p>
          Nowhere is this fallacy more obvious than in the powder room. A half-bath on the main floor is inherently tiny. Slapping a coat of bright white paint on the walls does not trick the human eye into believing it is suddenly a sprawling spa; it simply makes it feel like a sterile, slightly claustrophobic closet.
        </p>
        <p>
          At our studio, the powder room is actually our favorite design canvas. Because it is a transitional space where guests spend only a few minutes, you can take massive visual risks that might feel exhausting in a primary living room. Our signature approach? We lean heavily into the lack of square footage to create a dramatic, deeply atmospheric &ldquo;jewel box&rdquo; effect.
        </p>
        <p>
          Here is exactly how we execute high-impact, <strong>luxury powder room ideas</strong> without knocking down a single wall.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="embrace-dark-moody-walls">1. Embrace Dark, Moody Walls</h2>
        <p>
          The foundation of a luxury powder room is depth. We immediately abandon the light and bright approach in favor of heavily saturated, <strong>dark moody walls</strong>.
        </p>
        <p>
          Think rich aubergine, deep forest green, or even a soft, chalky charcoal black. When you paint the walls, the baseboards, the trim, and the ceiling in the exact same dark shade (a technique known as color drenching), the sharp corners of the tiny room begin to blur and recede. It completely eliminates the choppy visual lines of standard white trim, making the space feel endless and incredibly sophisticated.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="invest-in-dramatic-stone">2. Invest in Dramatic Stone</h2>
        <p>
          If you are only outfitting a 20-square-foot room, you do not need much material. This is where you allocate the budget.
        </p>
        <p>
          Instead of a standard porcelain pedestal sink, we almost exclusively use heavily veined, dramatic natural stone. A floating marble vanity featuring Calacatta Viola or dark Nero Marquina immediately elevates the room from a basic utility space to a high-end experience. Because you are buying a remnant slab rather than outfitting an entire kitchen, this level of <strong>high-impact bathroom decor</strong> is surprisingly attainable.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="unlacquered-brass-living-finishes">3. Unlacquered Brass and Living Finishes</h2>
        <p>
          Hardware is the jewelry of the room. In a dark, moody space, polished chrome feels entirely too cold and clinical.
        </p>
        <p>
          Instead, we specify unlacquered brass for the wall-mounted faucets and the P-trap plumbing beneath the floating sink. Unlacquered brass is a &ldquo;living finish,&rdquo; meaning it will tarnish, patina, and age over time depending on how it is touched and exposed to water. Against a dark wall, the warm, slightly imperfect gold tones of aging brass add a layer of historical elegance and soul that mass-produced finishes simply cannot replicate.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="atmospheric-face-level-lighting">4. Atmospheric, Face-Level Lighting</h2>
        <p>
          Finally, never rely on a single overhead recessed light in a powder room. Overhead lighting casts harsh, unflattering shadows down the face, which is the last thing you want when a guest is looking in the mirror.
        </p>
        <p>
          We always flank the vanity mirror with two beautiful sconces at eye level. By using low-wattage, warm-toned bulbs (around 2700K) paired with linen or frosted glass shades, the lighting becomes atmospheric and incredibly flattering. It creates a soft, ambient glow that bounces beautifully off the brass hardware and the polished stone, finalizing the luxurious jewel-box aesthetic.
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
    slug: 'japandi-bedroom-design',
    title: "The Japandi Bedroom: Why We're Leaving Heavy Furniture Behind in 2026",
    excerpt:
      "The design hybrid that marries wabi-sabi Japanese elegance with Scandinavian hygge — and the bedroom philosophy that actively lowers your heart rate.",
    categoryLabel: 'Bedroom Guides',
    categoryHref: '/rooms/bedroom',
    href: '/blog/japandi-bedroom-design',
    image: '/japandi-hero.webp',
    imageAlt: 'A serene Japandi bedroom with a low platform bed and warm washi paper lamp',
    readingTime: 5,
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
