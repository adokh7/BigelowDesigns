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
  title: '7 Space-Saving Kitchen Island Alternatives for Small Apartments (2026)',
  description:
    'No room for a bulky island? Discover 7 smart, space-saving kitchen island alternatives perfect for small apartment kitchen layouts in 2026 — from rolling carts to fold-down tables.',
  alternates: { canonical: `${siteConfig.url}/blog/space-saving-kitchen-islands` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/space-saving-kitchen-islands`,
    title: '7 Space-Saving Kitchen Island Alternatives for Small Apartments (2026)',
    description:
      'Discover 7 smart, space-saving kitchen island alternatives perfect for small apartment kitchen layouts in 2026 — from rolling carts to fold-down tables.',
    images: [
      {
        url: `${siteConfig.url}/kitchen-island-alternatives.webp`,
        width: 1200,
        height: 675,
        alt: 'A beautifully styled space-saving kitchen with an alternative kitchen island',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 Space-Saving Kitchen Island Alternatives for Small Apartments (2026)',
    description:
      'No room for a bulky island? Discover 7 smart, space-saving kitchen island alternatives perfect for small apartment kitchen layouts in 2026 — from rolling carts to fold-down tables.',
    images: [`${siteConfig.url}/kitchen-island-alternatives.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "7 Space-Saving Kitchen Island Alternatives for Small Apartments",
  excerpt:
    "If you've ever stood in your tiny apartment kitchen, coffee in hand, staring at a countertop barely large enough to open a laptop — you already know the frustration. Urban apartments in 2026 are smarter, sleeker, and more expensive than ever, but they haven't magically gotten bigger. And while that gorgeous marble kitchen island you pinned looks stunning in a 400-square-foot Pinterest kitchen, real life says otherwise.",
  categoryLabel: 'Kitchen',
  categoryHref: '/rooms/kitchen',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-01T15:00:00Z',
  updatedAt: '2026-06-01T15:00:00Z',
  readingTime: 6,
  heroImage: '/kitchen-island-alternatives.webp',
  heroImageAlt:
    'A beautifully styled space-saving kitchen with an alternative kitchen island',
  heroCaption:
    'An alternative kitchen island provides all of the utility with none of the permanent footprint.',
  headings: [
    { id: 'rolling-carts', text: '1. Rolling Kitchen Carts — The MVP of Small Kitchens', level: 2 },
    { id: 'drop-leaf', text: '2. Drop-Leaf Tables — Fold It When You Don\'t Need It', level: 2 },
    { id: 'peninsula', text: '3. Peninsula Extensions — Turn a Wall Into an Island', level: 2 },
    { id: 'over-sink', text: '4. Over-the-Sink Cutting Boards — Instant Counter Real Estate', level: 2 },
    { id: 'narrow-console', text: '5. Narrow Console Tables — Stylish and Surprisingly Functional', level: 2 },
    { id: 'butcher-block', text: '6. Butcher Block Cart with Seating Overhang', level: 2 },
    { id: 'stackable-storage', text: '7. Stackable Storage Units as a DIY Island', level: 2 },
    { id: 'conclusion', text: 'Conclusion — Small Kitchen, Big Possibilities', level: 2 },
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
      <div className="bg-surface">
        <div className="mx-auto max-w-page px-4 pt-6 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <header className="mx-auto max-w-[760px] px-4 pb-12 pt-10 text-center sm:px-6 lg:px-0 lg:pb-16 lg:pt-14">

          {/* Category tag */}
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

          {/* Hairline */}
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
            <span aria-hidden="true" className="text-ink-300">&middot;</span>
            <time dateTime={ARTICLE.publishedAt}>{formatDate(ARTICLE.publishedAt)}</time>
            <span aria-hidden="true" className="text-ink-300">&middot;</span>
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
      <div className="prose max-w-none text-ink-800">
        <p>
          If you&apos;ve ever stood in your tiny apartment kitchen, coffee in hand, staring at a countertop barely large enough to open a laptop &mdash; you already know the frustration. Urban apartments in 2026 are smarter, sleeker, and more expensive than ever, but they haven&apos;t magically gotten bigger. And while that gorgeous marble kitchen island you pinned looks stunning in a 400-square-foot Pinterest kitchen, real life says otherwise.
        </p>
        <p>
          The good news? You don&apos;t need a traditional island to get more prep space, storage, and style. There are brilliant <strong>space-saving kitchen island alternatives</strong> that work beautifully in compact city apartments &mdash; without requiring a sledgehammer or a new lease. Whether you&apos;re reworking your <strong>small apartment kitchen layout ideas for 2026</strong> or just desperate for more room to chop vegetables, these seven solutions have you covered.
        </p>
      </div>

      <div className="prose max-w-none text-ink-800">
        <h2 id="rolling-carts">1. Rolling Kitchen Carts &mdash; The MVP of Small Kitchens</h2>
        <p>
          When it comes to <strong>rolling kitchen carts and narrow islands</strong>, the rolling cart is the undisputed champion of flexibility. These mobile units give you extra counter space exactly when and where you need it &mdash; and tuck away the moment you don&apos;t.
        </p>
        <p><strong>Why it works:</strong></p>
        <ul>
          <li>Rolls into the kitchen during cooking, out during dinner parties</li>
          <li>Many models feature built-in shelves, hooks, and even wine racks</li>
          <li>Available in butcher block, stainless steel, or marble-look finishes</li>
          <li>Fits easily in a hallway or dining area when not in use</li>
        </ul>
        <p>
          <strong>Pro tip:</strong> Look for carts with locking wheels so it stays put while you&apos;re chopping. Brands like IKEA&apos;s <strong>RÅSKOG</strong> and <strong>Seville Classics</strong> offer solid options under €80.
        </p>

        <h2 id="drop-leaf">2. Drop-Leaf Tables &mdash; Fold It When You Don&apos;t Need It</h2>
        <p>
          A drop-leaf table is one of the most underrated ways to <strong>add counter space in a tiny kitchen</strong>. Wall-mounted or freestanding, these tables feature hinged extensions that fold flat when not in use, saving precious floor space.
        </p>
        
        <h3>Wall-Mounted Fold-Down Versions</h3>
        <p>
          These attach directly to the wall and fold completely flat &mdash; some are less than 10 cm deep when closed. They&apos;re perfect along a narrow wall or even the back of a kitchen door.
        </p>
        
        <h3>Freestanding Drop-Leaf Tables</h3>
        <p>
          If drilling into walls isn&apos;t an option (hello, rental apartments), a freestanding version gives you the same benefit with no commitment. Extend one or both leaves for prep work, then fold them back for a clean look.
        </p>
        <p>
          <strong>Best for:</strong> Renters, studio apartments, and kitchens with no natural extension points.
        </p>

        <h2 id="peninsula">3. Peninsula Extensions &mdash; Turn a Wall Into an Island</h2>
        <p>
          If your kitchen has an open layout that connects to a living or dining area, a <strong>peninsula extension</strong> can effectively mimic an island &mdash; without floating in the middle of the room.
        </p>
        <p>
          A peninsula is essentially a counter that extends from an existing wall or cabinet run, creating an L- or U-shaped layout. It adds prep space, can incorporate seating with bar stools, and defines the kitchen zone without stealing square footage.
        </p>
        <p><strong>Key advantages:</strong></p>
        <ul>
          <li>Shares one side with existing cabinets, reducing cost</li>
          <li>Creates a natural dining bar or breakfast nook</li>
          <li>Adds storage below with built-in shelves or drawers</li>
          <li>Works especially well in open-plan <strong>small apartment kitchen layouts</strong></li>
        </ul>
        <p>
          This is one of the most permanent and high-impact solutions on this list, making it ideal if you own your apartment or have landlord approval for renovations.
        </p>

        <h2 id="over-sink">4. Over-the-Sink Cutting Boards &mdash; Instant Counter Real Estate</h2>
        <p>
          Here&apos;s a genius, zero-footprint hack: an <strong>over-the-sink cutting board</strong>. These fit directly over your sink basin, instantly creating a prep surface from otherwise wasted space.
        </p>
        <p>
          Most modern versions are made from <strong>bamboo or food-safe plastic</strong> and include a built-in colander, strainer holes, or a side tray. You chop vegetables, let the scraps fall straight into the colander below, and rinse without moving a step.
        </p>
        <p><strong>Why it&apos;s brilliant:</strong></p>
        <ul>
          <li>Costs between €20&ndash;€50</li>
          <li>No installation required</li>
          <li>Doubles your usable prep space in seconds</li>
          <li>Easy to clean and store vertically in a cabinet</li>
        </ul>
        <p>
          If you&apos;re looking for <strong>how to add counter space in a tiny kitchen</strong> without spending much, start here.
        </p>

        <h2 id="narrow-console">5. Narrow Console Tables &mdash; Stylish and Surprisingly Functional</h2>
        <p>
          Most people think of console tables as hallway furniture &mdash; but a slim, sturdy console table placed along a kitchen wall is a sleek and stylish <strong>space-saving kitchen island alternative</strong> that doubles as prep space and display area.
        </p>
        <p>
          Choose a console with a surface height of <strong>90&ndash;92 cm</strong> (standard counter height) so it integrates naturally with your workflow. Add bar stools on the open side and you have a breakfast bar. Place baskets or small appliances underneath and you have bonus storage.
        </p>
        <p><strong>What to look for:</strong></p>
        <ul>
          <li>Solid wood or metal frame for stability</li>
          <li>Depth of 35&ndash;50 cm to avoid blocking traffic flow</li>
          <li>A smooth, easy-to-clean surface</li>
          <li>Open shelving or hooks underneath for added utility</li>
        </ul>
        <p>
          This option works especially well in Scandinavian or minimalist-style kitchens, which are very on-trend for <strong>2026 small apartment kitchen layouts</strong>.
        </p>

        <h2 id="butcher-block">6. Butcher Block Cart with Seating Overhang</h2>
        <p>
          A step above the standard rolling cart, a <strong>butcher block cart with a seating overhang</strong> gives you prep space <em>and</em> a casual dining spot in one compact unit. The extended countertop on one side accommodates one or two bar stools, making it both a cooking station and a breakfast bar.
        </p>
        <p><strong>Features to prioritize:</strong></p>
        <ul>
          <li>Overhang of at least <strong>25&ndash;30 cm</strong> for comfortable knee clearance</li>
          <li>Locking casters for stability while in use</li>
          <li>Towel bars, spice racks, or magnetic knife strips on the sides</li>
          <li>Closed cabinet storage below rather than open shelves (cleaner look in small spaces)</li>
        </ul>
        <p>
          This is particularly popular in <strong>rolling kitchen carts and narrow islands</strong> searches because it bridges the gap between a cart and a real kitchen island elegantly.
        </p>

        <h2 id="stackable-storage">7. Stackable Storage Units as a DIY Island</h2>
        <p>
          Finally, one of the most creative solutions for 2026: <strong>building your own island</strong> from stackable modular storage units. Brands like IKEA (<strong>KALLAX</strong>, <strong>SEKTION</strong>), String Furniture, and USM Haller let you combine cube units, add a solid wood countertop on top, and suddenly you have a custom island at a fraction of the cost.
        </p>
        <h3>How to Build It:</h3>
        <ol>
          <li>Choose two matching cube storage units (ideally 40&times;40 cm or 60&times;60 cm)</li>
          <li>Place them back-to-back or side-by-side for your desired depth and width</li>
          <li>Secure them together with furniture connectors</li>
          <li>Top with a butcher block, solid oak panel, or quartz slab cut to size</li>
          <li>Add hairpin legs or a toe-kick panel to finish the look</li>
        </ol>
        <p><strong>Why it works for small kitchens:</strong></p>
        <ul>
          <li>Fully customizable to your exact dimensions</li>
          <li>The interior cubes double as pantry, dish, or appliance storage</li>
          <li>Looks intentional and designed, not makeshift</li>
          <li>Easy to disassemble and take with you when you move</li>
        </ul>

        <h2 id="conclusion">Conclusion &mdash; Small Kitchen, Big Possibilities</h2>
        <p>
          A cramped kitchen doesn&apos;t have to mean a compromised cooking experience. From a <strong>rolling cart you can wheel onto your balcony</strong> to a <strong>fold-flat wall table that disappears in seconds</strong>, there are smart, affordable, and stylish solutions for every type of small apartment in 2026.
        </p>
        <p>
          The best approach? <strong>Start with your pain point.</strong> Need more prep space? Go for the over-the-sink board or rolling cart first. Want seating and storage? A butcher block cart with overhang or a peninsula extension might be your answer.
        </p>
        <p>
          <strong>Ready to reclaim your kitchen?</strong> Pick one solution from this list, measure your space, and make the upgrade this week. Your future self &mdash; the one who can actually cook a proper meal without elbowing the spice rack &mdash; will thank you.
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
