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
  title: "The Emotional Power of Vintage Decor: A Mid-Century Ceramic Find",
  description:
    "Discover why decorating with meaningful vintage finds and mid-century Italian ceramics transforms a modern apartment from a mere showroom into a curated, personal home.",
  alternates: { canonical: `${siteConfig.url}/blog/meaningful-vintage-decor-bitossi` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/meaningful-vintage-decor-bitossi`,
    title: "The Emotional Power of Vintage Decor: A Mid-Century Ceramic Find",
    description:
      "Discover why decorating with meaningful vintage finds and mid-century Italian ceramics transforms a modern apartment from a mere showroom into a curated, personal home.",
    images: [
      {
        url: `${siteConfig.url}/vintage-ceramic-chicken.webp`,
        width: 1200,
        height: 1200,
        alt: 'A beautiful mid-century Aldo Londi ceramic chicken by Bitossi on a modern coffee table',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Emotional Power of Vintage Decor: A Mid-Century Ceramic Find",
    description:
      "Discover why decorating with meaningful vintage finds and mid-century Italian ceramics transforms a modern apartment from a mere showroom into a curated, personal home.",
    images: [`${siteConfig.url}/vintage-ceramic-chicken.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "Why Meaningful Vintage Decor is the Ultimate Interior Design Luxury",
  excerpt:
    "As an interior design writer, my apartment is curated to the millimeter. It is filled with a mix of highly functional modern pieces and striking decorative objects. Some of these items were purchased after months of careful planning, while others were lucky flea market scores. But the most valuable piece in my home isn’t a high-end designer sofa or a modern art print. It is a small, quirky ceramic chicken that bridges the gap between mid-century design history and my own childhood.",
  categoryLabel: 'Design Trends',
  categoryHref: '/design-trends',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-01T15:00:00Z',
  updatedAt: '2026-06-01T15:00:00Z',
  readingTime: 5,
  heroImage: '/vintage-ceramic-chicken.webp',
  heroImageAlt:
    'A beautiful mid-century Aldo Londi ceramic chicken by Bitossi on a modern coffee table next to Architectural Digest and Bitossi Ceramics books',
  heroCaption:
    'Londi’s ceramic animals balance high-end artisanal sophistication with a distinct sense of humor and whimsy.',
  headings: [
    { id: 'memory-glazed', text: 'A Memory Glazed in Orange and Brown', level: 2 },
    { id: 'antique-shop', text: 'The Antique Shop Encounter', level: 2 },
    { id: 'londi-bitossi', text: 'The Pedigree of Aldo Londi and Bitossi Ceramiche', level: 2 },
    { id: 'curating-antiques', text: 'The True Value of Curating with Antiques', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function MeaningfulVintageDecorBitossiPage() {
  const canonicalUrl = `${siteConfig.url}/blog/meaningful-vintage-decor-bitossi`;
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
          When we talk about <strong>vintage home decor ideas</strong> in 2026, the conversation often revolves around sustainability or achieving a specific aesthetic. We forget that the true luxury of vintage lies in its emotional resonance—the ability of an inanimate object to tether us to a specific time, place, and feeling.
        </p>

        <h2 id="memory-glazed">A Memory Glazed in Orange and Brown</h2>
        <p>
          My grandparents passed away when I was quite young, leaving me with only a handful of vivid memories of their home on Long Island. I remember my grandfather singing on the front steps, and my grandmother handing out cookie-filled &ldquo;goody bags&rdquo; for the short drive back to our house. But the clearest visual memory I have is of the chicken.
        </p>
        <p>
          It wasn&apos;t a live animal, of course. It was a small ceramic chicken, no more than 10 inches long, painted in a vibrant, slightly chaotic mix of orange, brown, and yellow glazes. It sat prominently on their coffee table for as long as any of my cousins or I could remember. To a child, it looked incredibly strange—a bright, unevenly rocking splotch of color that somehow managed to survive the chaos of a dozen grandkids horsing around it. Despite taking a few accidental tumbles over the years, it never chipped.
        </p>
        <p>
          When my grandparents&apos; home was eventually cleared out, the chicken was instantly claimed by my eldest cousin. It was the ultimate family heirloom—not because it was made of gold, but because it was a tangible piece of our shared history.
        </p>

        <h2 id="antique-shop">The Antique Shop Encounter</h2>
        <p>
          For over two decades, I didn&apos;t think much about that quirky piece of pottery. That was until a completely routine walk home from the subway changed everything.
        </p>
        <p>
          Glancing into the window of my local neighborhood antique store, I stopped dead in my tracks. Sitting perfectly under the display lights was a ceramic chicken identical to the one from my childhood. It had the same beady eyes, the same rounded silhouette, and the same earthy, vibrant glaze.
        </p>
        <p>
          I immediately walked in, snapped a photo, and texted my cousin to confirm my suspicions. While waiting for a reply, I struck up a conversation with the antique dealer. As it turns out, this wasn&apos;t just a random, kitschy tchotchke my grandmother had picked up at a local hardware store in the seventies. It was a piece of highly collectible <strong>mid-century Italian ceramics</strong>.
        </p>

        <h2 id="londi-bitossi">The Pedigree of Aldo Londi and Bitossi Ceramiche</h2>
        <p>
          The dealer explained that the piece was designed in the 1960s by <strong>Aldo Londi</strong>, the legendary creative director of <strong>Bitossi Ceramiche</strong>. For those unfamiliar with mid-century pottery, Bitossi is an iconic Italian company famous for its richly textured, hand-glazed ceramics that often feature bold geometric patterns and deep, earthy tones.
        </p>
        <p>
          Londi’s ceramic animals—especially his birds and cats—have become incredibly sought after in the world of interior design. They are the perfect example of why <strong>decorating with meaningful vintage finds</strong> is so popular today: they balance high-end artisanal sophistication with a distinct sense of humor and whimsy. They don&apos;t take themselves too seriously, yet they elevate any room they sit in.
        </p>
        <p>
          A few minutes later, my cousin’s text came through with a photo of the original family heirloom. I showed it to the dealer. It was an exact match.
        </p>

        <h2 id="curating-antiques">The True Value of Curating with Antiques</h2>
        <p>
          Two hundred dollars later, the Bitossi chicken was wrapped in brown paper and coming home with me. To some, $200 might seem steep for a spur-of-the-moment ceramic bird purchase. But in the context of curating an apartment with antiques, it was the find of a lifetime.
        </p>
        <p>
          Out of curiosity, I later scoured auction sites and high-end vintage marketplaces. I haven&apos;t been able to find another exact match for sale since. Historical listings show that this specific Aldo Londi design has sold to collectors for anywhere between $1,200 and $2,000.
        </p>
        <p>
          But its market value is entirely beside the point. I will never sell it.
        </p>
        <p>
          When you place a piece like this on a modern coffee table, it does more than just add color or texture to the room. It sparks conversations. It adds a layer of soul that cannot be bought off a showroom floor. Ultimately, the best interior design isn&apos;t about creating a space that looks like a catalogue; it’s about surrounding yourself with objects that tell a story.
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
  {
    slug: 'japandi-bedroom-design',
    title: "The Japandi Bedroom: Why We're Leaving Heavy Furniture Behind in 2026",
    excerpt:
      'Japandi design is more than a trend — it is a methodology for the bedroom. Discover how low-profile furniture, raw natural textures, and layered paper lighting create a room that actively lowers your heart rate.',
    categoryLabel: 'Bedroom Guides',
    categoryHref: '/rooms/bedroom',
    href: '/blog/japandi-bedroom-design',
    image: '/japandi-hero.webp',
    imageAlt: 'A serene Japandi bedroom with a low platform bed and warm washi paper lamp',
    readingTime: 5,
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
