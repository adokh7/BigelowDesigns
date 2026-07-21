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
  title: '7 Best Space-Saving Dining Tables for Small Apartments (2026)',
  description:
    'Small dining room? These 7 space-saving dining tables keep your apartment stylish, functional, and guest-ready in 2026.',
  alternates: { canonical: `${siteConfig.url}/blog/space-saving-dining-tables` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/space-saving-dining-tables`,
    title: '7 Best Space-Saving Dining Tables for Small Apartments (2026)',
    description:
      'Seven types of space-saving dining table that actually work in small apartments — with layout tips for each.',
    images: [
      {
        url: `${siteConfig.url}/space-saving-tables.webp`,
        width: 1200,
        height: 675,
        alt: 'A compact apartment dining area with a slim extendable dining table and open chairs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 Best Space-Saving Dining Tables for Small Apartments (2026)',
    description:
      'Drop-leaf, gate-leg, round extendable, convertible lift — the definitive guide to dining tables that work in tight city apartments.',
    images: [`${siteConfig.url}/space-saving-tables.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "The 7 Best Space-Saving Dining Tables for Small Apartments (2026 Buyer’s Guide)",
  excerpt:
    'Creating a proper dining spot in a small apartment is a puzzle: you need a surface that works for meals, laptop sessions, and the occasional guest night, without hijacking your entire floor plan. Here is what the market offers in 2026.',
  categoryLabel: 'Room Guides',
  categoryHref: '/rooms/living-room',
  author: {
    name: 'Sarah Bigelow',
    slug: 'sarah-bigelow',
    bio: 'Sarah Bigelow is the lead designer and founder of Bigelow Designs. With over 15 years of experience in residential interiors, she tests every layout, material, and fixture in real homes before recommending them.',
    credentials: ['Lead Designer & Founder, Bigelow Designs'],
  },
  publishedAt: '2026-06-01T09:00:00Z',
  updatedAt: '2026-06-01T09:00:00Z',
  readingTime: 8,
  heroImage: '/space-saving-tables.webp',
  heroImageAlt:
    'A compact apartment dining area with a slim extendable dining table, open chairs, and a single pendant light creating an intentional dining zone',
  heroCaption:
    'A compact dining zone that earns its floor plan. The right table does not just fit — it transforms how the entire room functions.',
  headings: [
    { id: 'how-to-choose', text: 'How to Choose a Space-Saving Dining Table in 2026', level: 2 },
    { id: 'the-7-best', text: 'The 7 Best Space-Saving Dining Tables', level: 2 },
    { id: 'styling-tips', text: 'Styling Tips: Keep Your Dining Area Light and Airy', level: 2 },
    { id: 'quick-size-cheats', text: 'Quick Size Cheats for Small Apartments', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function SpaceSavingDiningTablesPage() {
  const canonicalUrl = `${siteConfig.url}/blog/space-saving-dining-tables`;
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
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 font-serif text-xs font-semibold text-brand ring-1 ring-brand/20"
              >
                SB
              </span>
              <Link
                href="/about/sarah-bigelow"
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
          2. HERO IMAGE — Responsive aspect ratio with max-height
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative w-full aspect-video max-h-[60vh] overflow-hidden rounded-2xl bg-stone-50">
          <Image
            src={ARTICLE.heroImage}
            alt={ARTICLE.heroImageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
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
              <span
                aria-hidden="true"
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 font-serif text-lg font-semibold text-brand ring-1 ring-brand/20"
              >
                SB
              </span>
              <div>
                <p className="text-eyebrow uppercase tracking-[0.14em] text-ink-400">
                  Written by
                </p>
                <Link
                  href="/about/sarah-bigelow"
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
// Each <h2> id matches the sidebar TOC exactly.
function ArticleBody() {
  return (
    <>
      {/* ── Intro prose ── */}
      <div className="prose prose-lg max-w-none">
        <p>
          Creating a proper dining spot in a small apartment is a bit of a
          puzzle: you need a surface that works for meals, laptop sessions,
          and the occasional guest night, without hijacking your entire floor
          plan. A good space-saving dining table behaves like a
          transformer&mdash;compact day to day, generous when you need it,
          and visually calm enough not to overwhelm the room.
        </p>
        <p>
          In 2026, manufacturers are leaning into this brief with smart
          extendable dining tables, wall-mounted drop-leaf solutions, and
          compact dining sets that double as workstations or console tables.
          The trick is choosing a piece that suits your spatial flow, not
          just the catalog photo.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">

        {/* ─ How to Choose ─ */}
        <h2 id="how-to-choose">
          How to Choose a Space-Saving Dining Table in 2026
        </h2>
        <p>
          Before we get into specific pieces, it helps to understand a few
          fundamentals: circulation, table shape, and how the table will
          actually live in your layout.
        </p>

        <h3>Think in circulation, not only in centimeters</h3>
        <p>
          When you&apos;re working with a small floor plan, the
          &ldquo;breathing room&rdquo; around the table often matters more
          than the table size itself. As a rule of thumb, aim for about 90 cm
          of clear space on each side where people need to move and pull out
          chairs. This keeps the room from feeling cramped and helps avoid
          that sideways shuffle between chair backs and walls.
        </p>
        <p>
          If your apartment can&apos;t spare that much on all four sides,
          prioritize the main circulation paths&mdash;leave the full corridor
          behind the chairs you&apos;ll use most, and allow the table to sit
          closer to a wall or window on the low-traffic side.
        </p>

        <h3>Choose shapes that soften tight rooms</h3>
        <p>
          In compact homes, table shape can visually expand or shrink the
          room. Round and oval tables have become particularly popular for
          small apartments in 2026 because they soften corners and make it
          easier to slip around in tight zones. Rectangular pieces still work
          beautifully in open-plan spaces, especially when you use them to
          define a dining zone between kitchen and living area.
        </p>
        <p>
          A pedestal base (single central leg) is often more forgiving than
          four chunky corner legs because it gives you more flexibility in
          chair placement. That matters when every centimeter counts.
        </p>

        <h3>Look for multifunction and &ldquo;disappearing acts&rdquo;</h3>
        <p>
          The most effective space-saving dining tables either disappear when
          not in use or confidently perform double duty. Wall-mounted
          drop-leaf tables fold flat against the wall after a meal, while
          console-style extendable dining tables live as slim hallway
          furniture until you pull them out for guests. Convertible
          coffee-to-dining tables are another smart move in studios where the
          living room has to handle everything.
        </p>

        {/* ─ The 7 Best ─ */}
        <h2 id="the-7-best">
          The 7 Best Space-Saving Dining Tables for Small Apartments
        </h2>
        <p>
          Below are seven table types I recommend over and over in
          small-city apartments&mdash;each with specific layout tips so you
          can place them like a designer, not just push them against the
          nearest wall.
        </p>

        {/* 1. Wall-Mounted Drop-Leaf */}
        <h3>1. Wall-Mounted Drop-Leaf Table: The Disappearing Dining Nook</h3>
        <p>
          A wall-mounted drop-leaf table is the purest expression of
          &ldquo;now you see it, now you don&apos;t.&rdquo; It folds flat
          against the wall when closed, then flips up to create a dining
          surface big enough for two to three people.
        </p>
        <p><strong>Why it works in a small apartment</strong></p>
        <ul>
          <li>
            It occupies almost zero floor space when folded down, turning
            even a slim corridor or micro-kitchen into a meal spot.
          </li>
          <li>
            The wall mount visually anchors the table, so it reads like
            built-in millwork rather than a random piece of small apartment
            furniture cluttering the room.
          </li>
        </ul>
        <p><strong>Design &amp; positioning tips</strong></p>
        <ul>
          <li>
            Mount the table so the top sits around standard dining height
            (about 74&ndash;75 cm from the floor) to work with regular
            chairs or low stools.
          </li>
          <li>
            Center it on a quiet wall and frame it with a slim sconce or a
            small gallery of art so that, when folded, it still feels
            intentional.
          </li>
          <li>
            Keep at least 80&ndash;90 cm of free space in front so you can
            pull out chairs without blocking a doorway.
          </li>
        </ul>

        {/* 2. Gate-Leg */}
        <h3>2. Narrow Gate-Leg Table: From Console to Dinner Party</h3>
        <p>
          Gate-leg tables are classics for a reason: their side panels drop
          down to create a slim console, then swing up when you need a full
          dining surface. Modern versions often fold to a width of around
          10&ndash;30 cm, meaning they can live almost invisibly against a
          wall.
        </p>
        <p><strong>Why it works in a small apartment</strong></p>
        <ul>
          <li>
            It can serve as a hallway console, sofa-back surface, or bar
            setup day to day, then expand for four to six guests on special
            occasions.
          </li>
          <li>
            The legs that swing out provide stability only when needed, so
            you&apos;re not tripping over them when the table is in
            &ldquo;slim mode.&rdquo;
          </li>
        </ul>
        <p><strong>Design &amp; positioning tips</strong></p>
        <ul>
          <li>
            Park the collapsed gate-leg behind a sofa or along a wall near
            the kitchen; style it with lamps and books so it always looks
            intentional.
          </li>
          <li>
            When extended, rotate it perpendicular to the wall so one long
            side faces the room; this keeps circulation open on three sides.
          </li>
        </ul>

        {/* 3. Round Extendable */}
        <h3>3. Round Extendable Dining Table: Soft Edges, Smart Expansion</h3>
        <p>
          A round extendable dining table gives you the best of both worlds:
          a compact circular footprint for daily life and an extendable leaf
          for guests. Many 2026 designs hide the leaf inside the table, so
          you don&apos;t have to store extra panels under the bed.
        </p>
        <p><strong>Why it works in a small apartment</strong></p>
        <ul>
          <li>
            The absence of sharp corners helps circulation and reduces visual
            clutter in tight rooms.
          </li>
          <li>
            An extendable dining table lets you move seamlessly from a
            two-person breakfast to a four- or six-person dinner without
            buying a second piece.
          </li>
        </ul>
        <p><strong>Design &amp; positioning tips</strong></p>
        <ul>
          <li>
            Float a round table slightly off-center rather than gluing it to
            a wall; this often improves spatial flow and makes the room feel
            larger.
          </li>
          <li>
            Consider a pedestal base in a light wood or matte black; it
            reads sculptural but stays visually calm.
          </li>
        </ul>

        {/* 4. Convertible Lift Table */}
        <h3>4. Convertible Coffee-to-Dining Lift Table: One Piece, Two Lives</h3>
        <p>
          Convertible coffee tables that lift and extend into dining tables
          are workhorses in small studios. They live in front of your sofa
          at coffee-table height, then rise and often expand horizontally to
          seat four.
        </p>
        <p><strong>Why it works in a small apartment</strong></p>
        <ul>
          <li>
            You reclaim the center of your living room as both lounge and
            dining zone; no need for a second dedicated dining area.
          </li>
          <li>
            The adjustable height makes it useful as a work-from-sofa desk,
            which is very real-life small apartment behavior.
          </li>
        </ul>
        <p><strong>Design &amp; positioning tips</strong></p>
        <ul>
          <li>
            Choose a top that visually aligns with your
            flooring&mdash;similar wood tone or a quiet stone
            finish&mdash;so the piece doesn&apos;t dominate the room when
            in coffee-table mode.
          </li>
          <li>
            Avoid very heavy, bulky bases; a sleeker frame will feel less
            intrusive.
          </li>
        </ul>

      </div>

      <div className="prose prose-lg max-w-none">

        {/* 5. Compact Set with Nesting Stools */}
        <h3>5. Compact Dining Set with Nesting Stools or Benches</h3>
        <p>
          Compact dining sets are designed as a self-contained unit: a small
          dining table with stools or benches that tuck entirely underneath
          when not in use.
        </p>
        <p><strong>Why it works in a small apartment</strong></p>
        <ul>
          <li>
            When the stools nest under the table, the footprint becomes
            almost as small as the table top itself, freeing up valuable
            floor area.
          </li>
          <li>
            Because the chairs are integrated into the design, the whole set
            reads as one piece of small apartment furniture.
          </li>
        </ul>
        <p><strong>Design &amp; positioning tips</strong></p>
        <ul>
          <li>
            Push the table against a wall for day-to-day use and pull it
            away only when you need all sides; this creates a flexible
            dining/work zone.
          </li>
          <li>
            Opt for rounded or chamfered corners on the table top if it will
            sit close to circulation.
          </li>
        </ul>

        {/* 6. Slim Rectangular / Desk */}
        <h3>6. Slim Rectangular Dining Table That Doubles as a Desk</h3>
        <p>
          A slim rectangular table&mdash;around 60&ndash;75 cm
          deep&mdash;can comfortably serve as both desk and dining table for
          two.
        </p>
        <p><strong>Why it works in a small apartment</strong></p>
        <ul>
          <li>
            It uses the wall as a visual anchor, functioning like a console
            when not in full dining use.
          </li>
          <li>
            With the right chair pair, it transitions elegantly from laptop
            zone to plated dinner.
          </li>
        </ul>
        <p><strong>Design &amp; positioning tips</strong></p>
        <ul>
          <li>
            Place it on the longest uninterrupted wall in your living room
            or bedroom, ideally opposite a window.
          </li>
          <li>
            Keep the styling minimal: a slim lamp, one tray, and perhaps a
            single framed print above.
          </li>
        </ul>

        {/* 7. Fold-Out Console */}
        <h3>7. Fold-Out Console-to-Dining Table: Hallway Hero</h3>
        <p>
          Console tables that expand into full dining tables are some of the
          most impressive space-saving pieces on the market. Collapsed, they
          sit shallow against a wall, acting as an entry console.
        </p>
        <p><strong>Why it works in a small apartment</strong></p>
        <ul>
          <li>
            It keeps your main living area open 95% of the time, then turns
            the room into a full dining space for gatherings.
          </li>
          <li>
            Many 2026 designs use integrated or stored leaves, so all the
            components live in one place.
          </li>
        </ul>
        <p><strong>Design &amp; positioning tips</strong></p>
        <ul>
          <li>
            Position the console along the longest wall; during dinner mode,
            swing it out perpendicular to create a clear dining island.
          </li>
          <li>
            Store stackable chairs in a closet or hallway; they can quickly
            migrate around the table when needed.
          </li>
        </ul>

        {/* ─ Styling Tips ─ */}
        <h2 id="styling-tips">
          Styling Tips to Keep Your Small Dining Area Light and Airy
        </h2>
        <p>
          Even the most compact dining table can feel heavy if it&apos;s
          styled poorly.
        </p>
        <ul>
          <li>
            <strong>Go for visually light bases and open chairs.</strong>{' '}
            Favor open chair backs, slim legs, and minimal armrests. They
            allow more views through the room and reduce visual clutter.
          </li>
          <li>
            <strong>Use lighting to &ldquo;frame&rdquo; the dining zone.</strong>{' '}
            A single pendant or linear light over the table instantly
            creates a dining atmosphere. Hang it low enough to feel intimate
            (often 70&ndash;85 cm above the table top).
          </li>
          <li>
            <strong>Treat your table as multi-functional.</strong>{' '}
            Store a flat tray with a small vase and a candle; during work
            sessions, slide the tray to one side for a clean laptop surface.
          </li>
        </ul>

        {/* ─ Quick Size Cheats ─ */}
        <h2 id="quick-size-cheats">Quick Size Cheats for Small Apartments</h2>
        <ul>
          <li>
            <strong>Two-person wall or desk-style table:</strong>{' '}
            70&ndash;80 cm wide and 60&ndash;75 cm deep.
          </li>
          <li>
            <strong>Compact round table for two to three:</strong>{' '}
            80&ndash;95 cm diameter, extendable to 110&ndash;120 cm.
          </li>
          <li>
            <strong>Clearance:</strong>{' '}
            Aim for 90 cm behind each chair where people need to move.
          </li>
        </ul>

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
      'Six real design decisions that make even the tightest spaces feel beautifully expansive. No renovation required — just honest tricks from designer Sarah Bigelow.',
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
