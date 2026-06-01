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
  title: '7 Ways to Turn Your Tiny Balcony into a Luxury Oasis (2026 Guide)',
  description:
    'Small apartment balcony ideas 2026: transform a tiny concrete ledge into a luxury outdoor oasis with smart, space-saving design.',
  alternates: { canonical: `${siteConfig.url}/blog/tiny-balcony-luxury-oasis` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/tiny-balcony-luxury-oasis`,
    title: '7 Ways to Turn Your Tiny Balcony into a Luxury Oasis (2026 Guide)',
    description:
      'Small apartment balcony ideas 2026: transform a tiny concrete ledge into a luxury outdoor oasis with smart, space-saving design.',
    images: [
      {
        url: `${siteConfig.url}/outdoor-balcony-oasis.webp`,
        width: 1200,
        height: 675,
        alt: 'A beautifully designed outdoor balcony oasis with warm ambient lighting and soft seating',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 Ways to Turn Your Tiny Balcony into a Luxury Oasis (2026 Guide)',
    description:
      'Small apartment balcony ideas 2026: transform a tiny concrete ledge into a luxury outdoor oasis with smart, space-saving design.',
    images: [`${siteConfig.url}/outdoor-balcony-oasis.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "7 Ways to Transform Your Tiny Apartment Balcony into a Luxury Oasis",
  excerpt:
    "If you’re staring at a tiny concrete balcony that mostly collects dust, dead plants, and the odd Amazon box, you’re not alone. Most city apartments come with a “balcony” that feels more like an afterthought than a bonus room. The good news: with the right tiny balcony outdoor design approach, that bland slab can become a private lounge, garden, or mini wine bar.",
  categoryLabel: 'Outdoor Guides',
  categoryHref: '/rooms/outdoor-guides',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-01T16:00:00Z',
  updatedAt: '2026-06-01T16:00:00Z',
  readingTime: 6,
  heroImage: '/outdoor-balcony-oasis.webp',
  heroImageAlt:
    'A beautifully designed outdoor balcony oasis with warm ambient lighting and soft seating',
  heroCaption:
    'A private outdoor lounge that commands its tiny floor plan. Your balcony is a room with sky for a ceiling.',
  headings: [
    { id: 'start-with-vision', text: '1. Start with a Vision, Not Just Furniture', level: 2 },
    { id: 'upgrade-floor', text: '2. Upgrade the Floor: Deck Tiles and Layered Rugs', level: 2 },
    { id: 'go-vertical', text: '3. Go Vertical with Greenery and Rail Planters', level: 2 },
    { id: 'space-saving-furniture', text: '4. Choose Space-Saving Furniture That Feels Luxe', level: 2 },
    { id: 'layer-lighting', text: '5. Layer Lighting for Evening “Rooftop Bar” Energy', level: 2 },
    { id: 'use-textiles', text: '6. Use Textiles and Color to Create a Lounge-Level Atmosphere', level: 2 },
    { id: 'add-privacy', text: '7. Add Privacy, Personality, and Multi-Use Details', level: 2 },
    { id: 'conclusion', text: 'Conclusion: Your Tiny Balcony Is a Room, Not a Bonus', level: 2 },
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
      <div className="prose prose-lg max-w-none">
        <p>
          If you&apos;re staring at a tiny concrete balcony that mostly collects dust, dead plants, and the odd Amazon box, you&apos;re not alone. Most city apartments come with a &ldquo;balcony&rdquo; that feels more like an afterthought than a bonus room.
        </p>
        <p>
          The good news: with the right tiny balcony outdoor design approach, that bland slab can become a private lounge, garden, or mini wine bar that feels like a premium extension of your living room. Think layered textures, clever storage, and compact luxury outdoor furniture for small spaces instead of random folding chairs.
        </p>
        <p>
          If you&apos;re searching for small apartment balcony ideas 2026, this guide walks you through seven practical, design-led moves you can actually pull off in a rental.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 id="start-with-vision">1. Start with a Vision, Not Just Furniture</h2>
        <p>
          Before you buy a single plant or chair, decide what you want this balcony to do for you. Designers often treat small balconies as a continuation of the interior: same mood, same color story, just with more sky and plants.
        </p>
        <p><strong>Ask yourself:</strong></p>
        <ul>
          <li>Is this a morning coffee nook, evening cocktail spot, or plant jungle?</li>
          <li>Do you need it to double as a tiny outdoor office?</li>
          <li>Do you care more about lounging or dining?</li>
        </ul>
        <p>
          In 2026, the most successful small balcony designs echo indoor style&mdash;materials, palette, and even silhouettes&mdash;so the space feels like one cohesive room spilling outdoors. Once the purpose is clear, every centimeter starts working harder instead of becoming random decor storage.
        </p>

        <h2 id="upgrade-floor">2. Upgrade the Floor: Deck Tiles and Layered Rugs</h2>
        <p>
          Nothing kills the luxury mood faster than raw grey concrete. Swapping the floor is one of the fastest upgrades you can make&mdash;and most deck tiles are renter-friendly and sit right on top of the existing surface.
        </p>
        <p><strong>Smart flooring moves:</strong></p>
        <ul>
          <li>Interlocking deck tiles (wood, composite, or stone look) instantly create a spa-deck feel and hide stains or uneven patches.</li>
          <li>Outdoor rugs or runners add softness underfoot and help zone the seating area, especially if you&apos;re dealing with a long, narrow balcony.</li>
          <li>For a high-end look, stick to one calm palette: warm woods plus sand, taupe, or charcoal textiles feel timeless in urban settings.</li>
          <li>Lay tiles in a pattern that pulls the eye outward (for example, planks running perpendicular to the door) to visually widen the balcony.</li>
        </ul>

        <h2 id="go-vertical">3. Go Vertical with Greenery and Rail Planters</h2>
        <p>
          With tiny balconies, floor space is scarce&mdash;but you have a ton of vertical real estate. Designers are leaning heavily into vertical gardens, wall planters, and railing boxes to get that lush, cocooned feeling without sacrificing circulation.
        </p>
        <p><strong>Tiny balcony outdoor design planting ideas:</strong></p>
        <ul>
          <li>Rail planters along the edge soften metal railings, improve privacy, and create a green frame for your city views.</li>
          <li>Wall-mounted pockets or trellises turn a plain wall into a living feature; climbing plants, herbs, or trailing perennials work especially well.</li>
          <li>Tiered plant stands create height variation and a &ldquo;mini jungle&rdquo; effect, even on a deeply shallow balcony.</li>
        </ul>
        <p>
          If you&apos;re wondering how to decorate a small balcony on a budget, plants are your best friend&mdash;mix affordable nursery basics with one or two statement pots to keep costs low but visuals rich.
        </p>

        <h2 id="space-saving-furniture">4. Choose Space-Saving Furniture That Feels Luxe</h2>
        <p>
          You don&apos;t need bulky lounge sets to achieve a luxury vibe. What you&apos;re looking for is compact, well-proportioned pieces with good materials and comfortable cushions. Many 2025&ndash;2026 outdoor trends highlight modern wicker, powder-coated metal, and performance fabrics that survive weather without looking &ldquo;plastic.&rdquo;
        </p>
        <p><strong>Luxury outdoor furniture for small spaces:</strong></p>
        <ul>
          <li>Slim bistro sets (round table + 2 chairs) are perfect for narrow balconies and can still feel upscale in black metal, teak, or woven finishes.</li>
          <li>Modular benches with storage along one wall give you extra seating, hide cushions, and keep the floor clear&mdash;huge in tiny spaces.</li>
          <li>Compact lounge chairs with deep, weatherproof cushions bring that hotel-rooftop feel to even the smallest ledge.</li>
        </ul>
        <p>
          Prioritize clean lines and low-profile silhouettes. On a tiny balcony, one high-quality lounge chair and side table almost always looks more luxurious than four flimsy fold-up pieces.
        </p>

        <h2 id="layer-lighting">5. Layer Lighting for Evening &ldquo;Rooftop Bar&rdquo; Energy</h2>
        <p>
          Lighting is the secret weapon that turns &ldquo;nice balcony&rdquo; into &ldquo;I live at a boutique hotel.&rdquo; Current outdoor lighting trends favor warm, indirect light: think string lights, solar lanterns, and hidden glow rather than harsh overhead glare.
        </p>
        <p><strong>Lighting ideas that work hard:</strong></p>
        <ul>
          <li>String lights draped along the railing or ceiling instantly create a cozy canopy&mdash;especially at dusk.</li>
          <li>Solar lanterns or LED candles on the floor, table, or plant stands add soft, flickering points of light without wiring or outlets.</li>
          <li>Smart garden lights let you control brightness and color from your phone, so you can shift from &ldquo;WFH balcony&rdquo; to &ldquo;evening oasis&rdquo; with one tap.</li>
        </ul>
        <p>
          Stick to warm white (around 2200&ndash;2700K) for a relaxed, flattering glow. Cool light feels more supermarket than sanctuary.
        </p>

        <h2 id="use-textiles">6. Use Textiles and Color to Create a Lounge-Level Atmosphere</h2>
        <p>
          Designers often talk about a balcony as an &ldquo;outdoor room,&rdquo; and nothing drives that home more than textiles. The right cushions, throws, and fabrics can completely change the mood&mdash;even on a micro budget.
        </p>
        <p><strong>Soft-layer strategy:</strong></p>
        <ul>
          <li>Outdoor cushions and throws in layered textures (linen, cotton, chunky knits) make even simple chairs feel indulgent.</li>
          <li>Weatherproof seat pads on benches or built-in ledges dramatically boost comfort and keep you outside longer.</li>
          <li>A tight color palette&mdash;two main neutrals plus one accent (olive, terracotta, deep blue)&mdash;keeps the space chic rather than chaotic.</li>
        </ul>
        <p>
          If you&apos;re focused on how to decorate a small balcony on a budget, textiles are where you can cheat the look: choose affordable inserts but spend slightly more on covers that look and feel elevated.
        </p>

        <h2 id="add-privacy">7. Add Privacy, Personality, and Multi-Use Details</h2>
        <p>
          The final layer is what makes your balcony feel like yours, not a Pinterest copy. In dense city blocks, privacy and noise control also play a big role in how often you actually use the space.
        </p>
        <p><strong>Details that finish the oasis:</strong></p>
        <ul>
          <li>Privacy screens or bamboo reed panels along one side or against the railing soften views and reduce the feeling of being &ldquo;on display&rdquo; to neighbors.</li>
          <li>Compact side tables or a fold-down wall shelf give you a dedicated place for coffee, wine, or a laptop without eating floor space.</li>
          <li>Scent and sound: a small Bluetooth speaker, a candle or citronella, and a couple of fragrant plants (lavender, jasmine, rosemary) turn the balcony into a complete sensory retreat.</li>
        </ul>
        <p>
          Look for pieces that can flex through the day&mdash;a stool that doubles as a plant stand, a storage box that acts as extra seating, a tray that moves from kitchen to balcony and back.
        </p>

        <h2 id="conclusion">Conclusion: Your Tiny Balcony Is a Room, Not a Bonus</h2>
        <p>
          That narrow strip of concrete outside your sliding door is not dead space&mdash;it&apos;s a room with sky for a ceiling. Once you define its purpose, update the flooring, add vertical greenery, and layer in lighting, textiles, and compact luxury outdoor furniture for small spaces, it starts to feel less like an afterthought and more like a private outdoor lounge.
        </p>
        <p>
          If you&apos;ve been collecting small apartment balcony ideas 2026 and saving them for &ldquo;someday,&rdquo; pick one of these seven steps to start this week&mdash;lay a rug, hang a string of lights, or install a single rail planter. Tiny changes stack quickly, and before long, your balcony becomes the place you gravitate to first thing in the morning and last thing at night.
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
