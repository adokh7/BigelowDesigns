import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { EditorialProduct } from '@/components/EditorialProduct';
import { SidebarNewsletter } from '@/components/sections/SidebarNewsletter';
import { siteConfig } from '@/lib/site';

// ─── Static page ─────────────────────────────────────────────
export const dynamic = 'force-static';

// ─── Metadata ────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'The Powder Room Edit: How We Design High-Impact, Luxury Small Bathrooms',
  description:
    "At Bigelow, the powder room is our favorite design canvas. We abandon the 'make it white and bright' rule in favor of dark moody walls, unlacquered brass hardware, and floating marble vanities that turn the smallest room into the most memorable.",
  alternates: { canonical: `${siteConfig.url}/blog/luxury-powder-room-design` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/luxury-powder-room-design`,
    title: 'The Powder Room Edit: How We Design High-Impact, Luxury Small Bathrooms',
    description:
      'Dark walls, unlacquered brass faucets, floating marble vanities — how Bigelow turns the smallest room in the house into its most luxurious.',
    images: [
      {
        url: `${siteConfig.url}/bathroom-luxury-hero.webp`,
        width: 1200,
        height: 675,
        alt: 'A moody luxury powder room with dark botanical wallpaper, a floating marble vanity, and an unlacquered brass wall-mounted faucet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Powder Room Edit: High-Impact Luxury in a Small Bathroom',
    description:
      'Dark walls, unlacquered brass, floating vanities. The Bigelow approach to turning a powder room into the jewel of the house.',
    images: [`${siteConfig.url}/bathroom-luxury-hero.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    'The Powder Room Edit: How We Design High-Impact, Luxury Small Bathrooms',
  excerpt:
    "When clients come to us wanting to renovate their homes, they often overlook the smallest room: the powder room. At Bigelow, we view the compact restroom not as a design challenge, but as our absolute favorite playground.",
  categoryLabel: 'Bathroom Design',
  categoryHref:  '/rooms/bathroom',
  author: {
    name:        'Bigelow Editorial Team',
    slug:        'team-bigelow',
    avatar:      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio:         'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt:  '2026-05-31T12:00:00Z',
  updatedAt:    '2026-05-31T12:00:00Z',
  readingTime:  5,
  heroImage:    '/bathroom-luxury-hero.webp',
  heroImageAlt:
    'A moody luxury powder room with dark botanical wallpaper, a floating marble vanity, and an unlacquered brass wall-mounted faucet catching the warm glow of flanking wall sconces',
  heroCaption:
    'The powder room is the one room where guests are entirely alone with your design choices. Make it unforgettable.',
  headings: [
    { id: 'embrace-the-dark-side',                   text: 'Embrace the Dark Side',                    level: 2 },
    { id: 'the-power-of-statement-hardware',          text: 'The Power of Statement Hardware',           level: 2 },
    { id: 'floating-vanities-and-visual-floor-space', text: 'Floating Vanities and Visual Floor Space',  level: 2 },
    { id: 'scent-and-lighting-layers',                text: 'Scent and Lighting Layers',                 level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function LuxuryPowderRoomDesignPage() {
  const canonicalUrl    = `${siteConfig.url}/blog/luxury-powder-room-design`;
  const breadcrumbItems = [
    { name: 'Home',                url: '/'                    },
    { name: ARTICLE.categoryLabel, url: ARTICLE.categoryHref   },
    { name: ARTICLE.title,         url: canonicalUrl           },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. ARTICLE HEADER — narrow centred column
          ══════════════════════════════════════════════════════ */}
      <div className="bg-surface">
        <div className="mx-auto max-w-page px-4 pt-6 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <header className="mx-auto max-w-[760px] px-4 pb-12 pt-10 text-center sm:px-6 lg:px-0 lg:pb-16 lg:pt-14">

          {/* Category tag with flanking hairlines */}
          <Link
            href={ARTICLE.categoryHref}
            className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
          >
            <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
            {ARTICLE.categoryLabel}
            <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
          </Link>

          {/* Title */}
          <h1 className="mt-5 text-balance font-serif text-[clamp(28px,5vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
            {ARTICLE.title}
          </h1>

          {/* Deck */}
          <p className="mx-auto mt-5 max-w-[600px] text-pretty text-body-lg leading-relaxed text-ink-600">
            {ARTICLE.excerpt}
          </p>

          {/* Hairline divider */}
          <div aria-hidden="true" className="mx-auto mt-8 h-px w-16 bg-ink-200" />

          {/* Byline */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-body-sm text-ink-500">
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

      {/* ══════════════════════════════════════════════════════
          2. HERO IMAGE — full bleed, cinematic on xl
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-elevated sm:rounded-xl xl:aspect-[21/9] xl:rounded-2xl">
          <Image
            src="/bathroom-luxury-hero.webp"
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
      <div className="mx-auto max-w-[1120px] px-4 pb-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16 xl:gap-20">

          {/* ── Main prose column ── */}
          <main>
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
          <aside className="hidden lg:block" aria-label="Sidebar">
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

              {/* Divider */}
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
        className="mx-auto max-w-[1120px] px-4 pb-20 pt-0 sm:px-6 lg:px-8 lg:pb-28"
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

          <div className={`mt-10 grid gap-8 ${RELATED_ARTICLES.length === 1 ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {RELATED_ARTICLES.map((card) => (
              <RelatedArticleCard key={card.slug} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Article body ─────────────────────────────────────────────
// Structure:
//   • Key Takeaways box (not-prose)
//   • Intro paragraph
//   • Sections 1–2 in first prose block
//   • AffiliateDisclosure + EditorialProduct (not-prose, after section 2)
//   • Sections 3–4 in continuation prose block
// Each <h2> id matches the sidebar TOC anchors exactly.
function ArticleBody() {
  return (
    <>
      {/* ── Key Takeaways ── */}
      <div className="not-prose mb-8 rounded-xl border border-accent/20 bg-elevated/50 px-5 py-5">
        <p className="mb-3 text-eyebrow uppercase tracking-[0.16em] text-accent-600">
          Key Takeaways
        </p>
        <ul className="space-y-2.5">
          {[
            'Small bathrooms are the perfect canvas for bold, dramatic design risks.',
            'We strictly avoid generic white subway tiles in favor of rich, moody textures and wallpaper.',
            'Premium unlacquered brass hardware acts as the jewelry of the room, elevating basic plumbing.',
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-700"
            >
              <span
                aria-hidden="true"
                className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Intro prose ── */}
      <div className="prose max-w-none text-ink-800">
        <p>
          When clients come to us wanting to renovate their homes, they often
          overlook the smallest room: the powder room. At Bigelow, we view the
          compact restroom not as a design challenge, but as our absolute favorite
          playground. Because guests always visit this space, it deserves to have
          the highest design impact. We look past the boring rules of &lsquo;making
          a small room look white and bright&rsquo; and instead lean heavily into
          pure, understated luxury.
        </p>
      </div>

      {/* ── Sections 1–2 ── */}
      <div className="prose max-w-none text-ink-800">

        {/* ─ Section 1 ─ */}
        <h2 id="embrace-the-dark-side">Embrace the Dark Side</h2>
        <p>
          The biggest mistake we see in small bathroom design is painting the
          walls stark white in a desperate attempt to make it feel larger. It
          usually backfires, leaving the room looking sterile and clinical.
          Instead, we embrace the lack of square footage by going dark and moody.
          We specify rich charcoal tones, deep forest greens, or dense, high-end
          botanical wallpaper. A dark wall absorbs boundaries, creating an
          intimate, jewel-box effect that feels incredibly expensive.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="the-power-of-statement-hardware">
          The Power of Statement Hardware
        </h2>
        <p>
          In a small space, every single detail is magnified. You cannot hide
          cheap fixtures. We treat plumbing hardware as the essential jewelry of
          the bathroom. Moving away from standard brushed chrome, we strictly
          install unlacquered brass or matte black wall-mounted faucets.
          Unlacquered brass is particularly luxurious because it develops a
          natural patina over time, telling a story of craftsmanship and
          longevity.
        </p>

      </div>

      {/* ── Affiliate placement — immediately after section 2 ── */}
      <AffiliateDisclosure />
      <EditorialProduct
        title="Unlacquered Brass Faucet"
        brand="Waterworks Inspired"
        price="$340"
        imageUrl="/brass-faucet-detail.webp"
        affiliateUrl="#"
      />

      {/* ── Sections 3–4 ── */}
      <div className="prose max-w-none text-ink-800">

        {/* ─ Section 3 ─ */}
        <h2 id="floating-vanities-and-visual-floor-space">
          Floating Vanities and Visual Floor Space
        </h2>
        <p>
          To prevent a small toilet from feeling cramped, we always look for ways
          to maximize visible floor space. Heavy, blocky floor cabinets choke the
          layout. Our solution is always a custom floating vanity — ideally a solid
          block of heavily veined marble or dark oak. By leaving the floor
          underneath open and installing a clean, hidden bottle trap for the
          plumbing, the eye perceives more physical room while enjoying a sleek
          boutique-hotel aesthetic.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="scent-and-lighting-layers">Scent and Lighting Layers</h2>
        <p>
          True premium design caters to all the senses. Overhead recessed lighting
          is harsh and unflattering in a mirror; we always specify soft, eye-level
          wall sconces flanking a massive custom mirror to bounce warm light onto
          the face. Finally, we finish the space with high-end amber glass reed
          diffusers and luxury hand soaps. The goal is an experience, not just a
          utility room.
        </p>

      </div>
    </>
  );
}

// ─── Related articles ─────────────────────────────────────────
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
