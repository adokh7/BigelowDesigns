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
  title: "The Secret Armoire: Why Hidden Storage is 2026's Ultimate Luxury",
  description:
    "We are moving away from open shelving. Discover how custom millwork and 'secret' armoires are transforming cluttered rooms into serene, minimalist sanctuaries.",
  alternates: { canonical: `${siteConfig.url}/blog/hidden-armoire-storage-2026` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/hidden-armoire-storage-2026`,
    title: "The Secret Armoire: Why Hidden Storage is 2026's Ultimate Luxury",
    description:
      "We are moving away from open shelving. Discover how custom millwork and 'secret' armoires are transforming cluttered rooms into serene, minimalist sanctuaries.",
    images: [{
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      width: 1200,
      height: 800,
      alt: 'Elegant room with seamless custom wooden cabinetry',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Secret Armoire: Why Hidden Storage is 2026's Ultimate Luxury",
    description:
      "Discover how custom millwork and 'secret' armoires are transforming cluttered rooms into serene, minimalist sanctuaries.",
    images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'],
  },
};

// ─── Article data ────────────────────────────────────────────
const ARTICLE = {
  title:         "The Secret Armoire: Why Hidden Storage is 2026's Ultimate Luxury",
  excerpt:       "We are moving away from open shelving. Discover how custom millwork and 'secret' armoires are transforming cluttered rooms into serene, minimalist sanctuaries.",
  categoryLabel: 'Design Trends',
  categoryHref:  '/design-trends',
  author: {
    name:        'Team Bigelow',
    slug:        'team-bigelow',
    avatar:      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio:         'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt:  '2026-05-28T09:00:00Z',
  updatedAt:    '2026-05-28T09:00:00Z',
  readingTime:  7,
  heroImage:    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=90',
  heroImageAlt: 'Elegant room with seamless floor-to-ceiling custom wooden cabinetry concealing storage',
  heroCaption:  'Floor-to-ceiling millwork that hides an entire home office. The illusion is perfect — until you press a panel.',
  headings: [
    { id: 'end-of-curated-shelf',       text: "The End of the 'Curated' Shelf", level: 2 },
    { id: 'architecture-of-concealment', text: 'The Architecture of Concealment', level: 2 },
    { id: 'what-to-hide',               text: 'What to Hide (And How to Do It)', level: 2 },
    { id: 'investing-in-millwork',       text: 'Investing in Millwork',           level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function HiddenArmoireStoragePage() {
  const canonicalUrl    = `${siteConfig.url}/blog/hidden-armoire-storage-2026`;
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

          {/* Hairline divider */}
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
            <span aria-hidden="true" className="text-ink-300">·</span>
            <time dateTime={ARTICLE.publishedAt}>{formatDate(ARTICLE.publishedAt)}</time>
            <span aria-hidden="true" className="text-ink-300">·</span>
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
              href="/design-trends"
              className="hidden flex-shrink-0 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500 sm:block"
            >
              All articles →
            </Link>
          </div>

          <div className={`mt-10 grid gap-8 lg:gap-8 ${RELATED_ARTICLES.length === 1 ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
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
// Each <h2> has an id matching the sidebar TOC exactly.
// Sub-sections inside "What to Hide" use <h3> (not <dl>) so the
// Tailwind Typography plugin styles them correctly as serif
// sub-headings — no browser-default definition-list rendering.
function ArticleBody() {
  return (
    <>
      {/* ── Intro prose ── */}
      <div className="prose prose-lg max-w-none">
        <p>
          For the last decade, we have been obsessed with displaying our lives.
          Open shelving in the kitchen, glass-front cabinets in the living room,
          and exposed clothing racks in the bedroom were all badges of a curated
          existence — an outward signal that our possessions were considered
          enough to be seen. But as our homes have worked harder — serving as
          offices, gyms, schools, and sanctuaries simultaneously — the visual
          noise has reached a breaking point.
        </p>
        <p>
          The counter-movement is already well under way in the studios of
          the designers whose work appears in the magazines we actually trust.
          The solution is deceptively simple, architecturally satisfying, and
          deeply, quietly luxurious. It is the secret armoire.
        </p>
      </div>

      {/* ── Main body prose — all four h2 sections in one block ── */}
      <div className="prose prose-lg max-w-none">

        {/* ─ Section 1 ─ */}
        <h2 id="end-of-curated-shelf">The End of the &lsquo;Curated&rsquo; Shelf</h2>
        <p>
          The shift toward hidden storage is not purely aesthetic — it is
          psychological. Interior designers in 2026 are increasingly framing
          their work in terms of cognitive load: the unconscious effort our
          brains expend registering, categorising, and suppressing the objects
          in our peripheral vision. An open shelf filled with books, trinkets,
          and miscellany might be photographically charming; over time, it is
          cognitively exhausting.
        </p>
        <p>
          The response is a return to something older than modernism: the
          armoire, the cabinet, the chest. The difference today is that these
          containers are not freestanding pieces of furniture slid against a
          wall. They <em>are</em> the wall. A surface that appears to be
          rich, textured timber panelling, painted plaster, or fluted stone
          suddenly opens — through touch, or the press of a finger — to
          reveal a television, a home bar, a home office, or six months of
          clothing. The room does not change its appearance; it simply reveals
          another of its characters.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="architecture-of-concealment">The Architecture of Concealment</h2>
        <p>
          The magic of a secret armoire lies in its integration with the
          architecture of the room rather than its addition to it. Unlike a
          standalone wardrobe or a bookcase placed against a wall, these
          storage solutions are built from the skirting board to the ceiling
          cornice, with joints that align with the rhythm of the room&apos;s
          existing detailing. The cabinetmaker and the architect work together
          from the first drawings — the storage is not retrofitted, it is
          designed in.
        </p>
        <p>
          The primary technique is colour-drenching: the cabinet doors are
          painted the exact same shade as the surrounding walls, ceiling, and
          architrave. Push-to-open magnetic hardware eliminates handles
          entirely, leaving the surface completely uninterrupted. From three
          metres away — or in the compressed perspective of a photograph — the
          storage is simply not visible. It reads as a wall.
        </p>
        <p>
          A secondary technique is material matching. Oak panelling that covers
          the walls continues unbroken across the cabinet doors, with vertical
          grain aligned at every join. Stone-effect plaster applied to both wall
          and door face with the same trowel produces an effect that is not so
          much concealment as total integration — the storage is not hidden
          behind the wall; it <em>is</em> the wall.
        </p>

        {/* Inline image — real Unsplash photography */}
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=85"
            alt="Minimalist built-in wardrobe with seamless wooden doors perfectly flush with the surrounding wall"
            width={1200}
            height={800}
            className="w-full rounded-xl object-cover"
          />
          <figcaption>
            Push-to-open hardware and grain-matched timber: when the doors are
            closed, the cabinet disappears entirely into the wall.
          </figcaption>
        </figure>

        {/* ─ Section 3 ─ */}
        <h2 id="what-to-hide">What to Hide (And How to Do It)</h2>
        <p>
          The most resolved applications of the secret armoire concept target a
          specific, identifiable pain point in a home&apos;s daily life. The
          following three have become reliable staples in contemporary interior
          design practice.
        </p>

        {/* Sub-sections use h3 so prose plugin applies correct serif styling */}
        <h3>The Drop Zone</h3>
        <p>
          The console table at the front door — piled with keys, mail, bags,
          and charging cables — is one of the most reliably chaotic surfaces in
          any home. The armoire solution is a shallow, floor-to-ceiling cabinet,
          perhaps 200 mm deep, that lines the entrance-hall wall entirely.
          Inside: hooks, a small key shelf, a mail slot, and a concealed charging
          point. Outside: a seamless, unbroken wall. Arriving home becomes the
          act of pressing a panel, placing everything precisely in its designated
          place, and pressing the panel closed again. The ritual imposes order;
          the concealment maintains calm.
        </p>

        <h3>The Appliance Garage</h3>
        <p>
          In the kitchen, the secret armoire takes the form of a pantry cabinet
          tall enough and deep enough to house the toaster, coffee machine, stand
          mixer, and microwave — all on appliance lifts or pull-out shelves, with
          power sockets concealed inside. The kitchen is fully operational behind
          closed doors; with them shut, the counter is completely bare. This
          single intervention transforms the visual experience of a kitchen more
          dramatically than any new splashback or lighting scheme could.
        </p>

        <h3>The Media Wall</h3>
        <p>
          The television remains the most persistent design dilemma in a living
          room. Bi-fold or pocket doors — sliding back cleanly into the surrounding
          cabinetry on concealed tracks — allow the screen to be revealed only
          when in active use. When closed, the wall is simply a wall: a
          composition of timber, plaster, or art. The room changes character
          depending on whether the doors are open or shut — a genuinely rare
          quality in domestic architecture.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="investing-in-millwork">Investing in Millwork</h2>
        <p>
          Custom cabinetry carries a significant upfront cost, but it should be
          understood differently from furniture expenditure. A bespoke armoire
          installation does not merely store things — it maximises every
          centimetre of vertical space (the most under-used dimension in most
          homes), it is fixed to the fabric of the building (which increases
          property value in a way that a sofa never can), and it is designed
          never to be replaced. A well-made millwork installation outlasts
          several generations of everything placed in front of it.
        </p>
        <p>
          If the budget for custom work is not available right now, the modular
          route is more viable than it has ever been. IKEA&apos;s Pax wardrobe and
          Bestå storage systems, fitted with elevated slab door fronts in painted
          MDF or real wood veneer, and framed floor-to-ceiling with a custom
          plywood surround that fills the wall edge to edge, can achieve eighty
          per cent of the integrated look at a fraction of the custom cost. The
          joins are hidden by the frame; the handles are replaced with
          push-to-open hardware; the baseboard detail is matched. From across
          the room, the provenance is invisible.
        </p>

        <blockquote>
          <p>
            &ldquo;The ultimate luxury in a modern home is not what you put on
            display. It is what you have the discipline — and the craftsmanship
            — to hide.&rdquo;
          </p>
        </blockquote>

      </div>
    </>
  );
}

// ─── Related articles ─────────────────────────────────────────
type RelatedCard = {
  slug: string; title: string; excerpt: string;
  categoryLabel: string; categoryHref: string;
  href: string; image: string; imageAlt: string; readingTime: number;
};

// Only real, published articles. No links to non-existent pages.
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
    slug:          'small-home-feel-huge',
    title:         '6 Honest Ways to Make a Small Home Feel Huge (Without Tearing Down Walls)',
    excerpt:
      "You can't magically create more square footage. But we've learned a few genuine tricks that make even the tightest spaces feel beautifully expansive.",
    categoryLabel: 'Room Guides',
    categoryHref:  '/rooms',
    href:          '/blog/small-home-feel-huge',
    image:         '/living-room-candid.webp',
    imageAlt:      'A real living room feeling open and airy through considered furniture placement and natural light',
    readingTime:   4,
  },
];

function RelatedArticleCard({ card }: { card: RelatedCard }) {
  return (
    <article className="group flex flex-col gap-4">
      <Link href={card.href} className="block overflow-hidden rounded-xl" tabIndex={-1} aria-hidden="true">
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
          <Link href={card.href} className="transition-colors duration-quick hover:text-accent-600">
            {card.title}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">{card.excerpt}</p>
        <p className="mt-3 text-body-sm text-ink-400">{card.readingTime} min read</p>
      </div>
    </article>
  );
}
