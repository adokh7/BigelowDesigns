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
  title: "Japandi Bedroom Design: The 2026 Guide to a Calming Sleep Space",
  description:
    "Master the Japandi bedroom trend. Discover how blending Japanese minimalism with Scandinavian warmth creates the ultimate resting sanctuary for modern homes.",
  alternates: { canonical: `${siteConfig.url}/blog/japandi-bedroom-design` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/japandi-bedroom-design`,
    title: "Japandi Bedroom Design: The 2026 Guide to a Calming Sleep Space",
    description:
      "Master the Japandi bedroom trend. Discover how blending Japanese minimalism with Scandinavian warmth creates the ultimate resting sanctuary for modern homes.",
    images: [
      {
        url: `${siteConfig.url}/japandi-bedroom.webp`,
        width: 1200,
        height: 675,
        alt: 'A serene Japandi bedroom with a low platform bed, linen sheets, and raw natural textures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Japandi Bedroom Design: The 2026 Guide to a Calming Sleep Space",
    description:
      "Master the Japandi bedroom trend. Discover how blending Japanese minimalism with Scandinavian warmth creates the ultimate resting sanctuary for modern homes.",
    images: [`${siteConfig.url}/japandi-bedroom.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    "Japandi Bedroom Design: How to Build the Ultimate Rest Sanctuary",
  excerpt:
    "Master the Japandi bedroom trend. Discover how blending Japanese minimalism with Scandinavian warmth creates the ultimate resting sanctuary for modern homes.",
  categoryLabel: 'Design Trends',
  categoryHref: '/design-trends',
  author: {
    name: 'Bigelow Editorial Team',
    slug: 'team-bigelow',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio: 'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt: '2026-06-02T17:58:13Z',
  updatedAt: '2026-06-02T17:58:13Z',
  readingTime: 3,
  heroImage: '/japandi-bedroom.webp',
  heroImageAlt:
    'A serene Japandi bedroom with a low platform bed, linen sheets, and raw natural textures',
  heroCaption:
    'Blending Japanese minimalism with Scandinavian functionality for a quiet rest sanctuary.',
  headings: [
    { id: 'ground-the-room-with-low-profile-furniture', text: '1. Ground the Room with Low-Profile Furniture', level: 2 },
    { id: 'layer-imperfect-natural-textures', text: '2. Layer Imperfect, Natural Textures', level: 2 },
    { id: 'embrace-the-philosophy-of-wabi-sabi', text: '3. Embrace the Philosophy of Wabi-Sabi', level: 2 },
    { id: 'master-the-art-of-concealed-storage', text: '4. Master the Art of Concealed Storage', level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function JapandiBedroomDesignPage() {
  const canonicalUrl = `${siteConfig.url}/blog/japandi-bedroom-design`;
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
          If the outside world feels increasingly chaotic, interior design trends will naturally swing toward extreme comfort and quiet isolation. This explains exactly why &ldquo;Japandi&rdquo;&mdash;the brilliant hybrid of Japanese minimalism and Scandinavian functionality&mdash;has completely taken over the bedroom design landscape in 2026.
        </p>
        <p>
          For years, minimalist bedrooms felt a bit too stark, often resembling clinical modern art galleries rather than places to actually sleep. On the other end of the spectrum, traditional cozy bedrooms could easily veer into cluttered, suffocating territory.
        </p>
        <p>
          Japandi is the perfect architectural middle ground. It strips away the visual noise but layers in profound, tactile warmth. As interior editors, this is our absolute favorite design directive for a primary suite. Here is exactly how we execute a flawless Japandi bedroom that instantly lowers your heart rate the moment you walk through the door.
        </p>
      </div>

      {/* ── Main body prose ── */}
      <div className="prose prose-lg max-w-none">
        {/* ─ Section 1 ─ */}
        <h2 id="ground-the-room-with-low-profile-furniture">1. Ground the Room with Low-Profile Furniture</h2>
        <p>
          The foundation of Japanese interior architecture is proximity to the earth. Standard western beds are often positioned high off the floor, dominating the visual plane of the room.
        </p>
        <p>
          To achieve the Japandi aesthetic, we immediately lower the horizon line. Swap out the bulky box spring and massive headboard for a low-profile wooden platform bed. By keeping the heaviest piece of furniture close to the ground, you expose more empty wall space. This visual trick instantly makes standard eight-foot ceilings feel vault-like and gives the room a deep sense of grounding and stability.
        </p>

        {/* ─ Section 2 ─ */}
        <h2 id="layer-imperfect-natural-textures">2. Layer Imperfect, Natural Textures</h2>
        <p>
          Because a Japandi room restricts the use of loud colors and chaotic patterns, the design relies entirely on texture to prevent the space from feeling flat.
        </p>
        <p>
          This is where the Scandinavian influence shines. We layer the bed with organic, stonewashed linen sheets in shades of oatmeal, bone, or soft sage. Do not iron them; the natural, slightly rumpled texture of high-quality linen is essential. Underfoot, we introduce warmth with a thick, nubby wool rug. The contrast between the smooth wood of the bedframe and the heavy, tactile textiles creates a space that feels curated but incredibly lived-in.
        </p>

        {/* ─ Section 3 ─ */}
        <h2 id="embrace-the-philosophy-of-wabi-sabi">3. Embrace the Philosophy of Wabi-Sabi</h2>
        <p>
          &ldquo;Wabi-Sabi&rdquo; is the Japanese philosophy of finding profound beauty in imperfection and nature. In a bedroom context, this means stepping away from highly polished, factory-perfect decor.
        </p>
        <p>
          Instead of mass-produced metal lamps or symmetrical gallery walls, we source asymmetrical, hand-thrown ceramic table lamps with raw, unglazed finishes. We decorate with branches foraging from the yard rather than tight, perfectly spherical floral arrangements. Introducing items that show the hand of the maker&mdash;complete with slight variations and organic flaws&mdash;infuses the room with a quiet, organic soul.
        </p>

        {/* ─ Section 4 ─ */}
        <h2 id="master-the-art-of-concealed-storage">4. Master the Art of Concealed Storage</h2>
        <p>
          You cannot relax in a room if you are staring at a pile of laundry or a cluttered vanity. True Japandi design demands strict visual silence, which means your storage game must be flawless.
        </p>
        <p>
          We avoid open shelving in the bedroom entirely. Instead, we invest in beautiful, closed-door armoires featuring slatted wood or reeded glass. Everything&mdash;from the charging cables to the half-read novels&mdash;must have a designated, hidden home. When the visual clutter is entirely removed, the mind is finally given permission to turn off.
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
