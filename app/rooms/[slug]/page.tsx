import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/JsonLd';

import { getArticlesByCategory } from '@/lib/articles';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import type { Article } from '@/types/article';

// ─── Room types (formerly in lib/pricing) ────────────────────
type RoomType = 'kitchen' | 'living-room' | 'bedroom' | 'bathroom' | 'home-office' | 'outdoor-guides';

const ROOM_LABELS: Record<RoomType, string> = {
  kitchen:       'Kitchen',
  'living-room': 'Living Room',
  bedroom:       'Bedroom',
  bathroom:      'Bathroom',
  'home-office': 'Home Office',
  'outdoor-guides': 'Outdoor Guides',
};

// Only slugs returned by generateStaticParams are valid; everything else → 404
export const dynamic = 'force-static';
export const dynamicParams = false;

// ─── Room editorial data ──────────────────────────────────────
type RoomMeta = {
  headline: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
};

const ROOM_META: Record<RoomType, RoomMeta> = {
  'living-room': {
    headline: 'Where the day finally unwinds.',
    description:
      'From the sofa that anchors the room to the lamp that sets the mood — every piece we cover is tested, considered, and chosen for how real people actually live.',
    heroImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=85',
    heroImageAlt: 'A sunlit minimalist living room with a cream modular sofa and oak floors',
  },
  kitchen: {
    headline: 'The room that earns every square foot.',
    description:
      'Cabinet hardware, countertop choices, bar stools that survive breakfast. We cover the kitchen decisions that compound — the ones you only want to make once.',
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85',
    heroImageAlt: 'A modern kitchen with marble counters, brass fixtures, and open shelving',
  },
  bedroom: {
    headline: 'Designed for the sleep you actually deserve.',
    description:
      'Bed frames built to last, bedding that ages like fine linen, lighting that doesn\'t betray you at 10pm. The bedroom is where design decisions matter most.',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=85',
    heroImageAlt: 'A serene bedroom with linen bedding, warm morning light, and oak floors',
  },
  bathroom: {
    headline: 'A few quiet minutes. Make them count.',
    description:
      'Vanities built for daily use, tiles that age with dignity, hardware worth spending on. The bathroom is small in footprint and large in impact — and we treat it that way.',
    heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=85',
    heroImageAlt: 'A clean bathroom with white marble tiles and polished brass fixtures',
  },
  'home-office': {
    headline: 'Work from home. Actually live there too.',
    description:
      'A desk that respects your back, a chair you don\'t need to justify, lighting that doesn\'t turn you into a ghost on video calls. The home office, done properly.',
    heroImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&q=85',
    heroImageAlt: 'A clean, minimal home office with a wooden desk, a task lamp, and a plant',
  },
  'outdoor-guides': {
    headline: 'The room without a ceiling.',
    description:
      'Teak furniture that weathers seasons with grace, planters that belong in the ground, lighting that keeps the evening alive. Outdoor design, taken seriously.',
    heroImage: '/outdoor-balcony-oasis.webp',
    heroImageAlt: 'A beautifully designed outdoor balcony oasis with warm ambient lighting and soft seating',
  },
};

const VALID_SLUGS = Object.keys(ROOM_LABELS) as RoomType[];

// ─── Static params ────────────────────────────────────────────
export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as RoomType)) return {};

  const room = slug as RoomType;
  const meta = ROOM_META[room];
  const label = ROOM_LABELS[room];
  const title = `${label} Ideas, Guides & Tested Picks | ${siteConfig.name}`;
  const url = `${siteConfig.url}/rooms/${slug}`;

  return {
    title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description: meta.description,
      images: [{ url: meta.heroImage, width: 1600, height: 900, alt: meta.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
      images: [meta.heroImage],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────
export default async function RoomCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as RoomType)) notFound();

  const room = slug as RoomType;
  const meta = ROOM_META[room];
  const label = ROOM_LABELS[room];
  const articles = getArticlesByCategory(room);

  const breadcrumbItems = [
    { name: 'Home',  url: '/'      },
    { name: 'Rooms', url: '/rooms' },
    { name: label,   url: `/rooms/${slug}` },
  ];

  return (
    <>
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbItems)]} />

      {/* ═══════════════════════════════════════════════════════
          PAGE HEADER — constrained container, premium editorial
          ═══════════════════════════════════════════════════════ */}
      <div className="bg-surface border-b border-ink-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <div className="flex flex-col gap-4 mb-10 mt-6 max-w-3xl">
            {/* Category eyebrow */}
            <p className="text-eyebrow uppercase tracking-[0.2em] text-accent-600">
              Room Guide
            </p>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink-900 leading-tight text-balance">
              {meta.headline}
            </h1>

            <p className="text-pretty text-body-lg text-ink-600">
              {meta.description}
            </p>

            {/* Trust stats */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-ink-400">
              {articles.length > 0 && (
                <>
                  <span>
                    {articles.length} {articles.length === 1 ? 'guide' : 'guides'}
                  </span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <span>Independently tested</span>
              <span aria-hidden="true">·</span>
              <span>0 sponsored reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image — premium responsive aspect ratio with max-height */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative w-full aspect-video max-h-[60vh] overflow-hidden rounded-2xl bg-stone-50">
          <Image
            src={meta.heroImage}
            alt={meta.heroImageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          GUIDES GRID — real articles or editorial placeholders
          ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <section
          aria-labelledby="guides-heading"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-eyebrow uppercase tracking-[0.16em] text-accent-600">
                The essential reads
              </p>
              <h2
                id="guides-heading"
                className="mt-2 text-balance font-serif text-h1 text-ink-900"
              >
                {articles.length > 0
                  ? `${label} guides from the studio.`
                  : `${label} guides — in progress.`}
              </h2>
            </div>
            {articles.length > 0 && (
              <Link
                href="/guides"
                className="flex-shrink-0 text-body font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500"
              >
                See all guides →
              </Link>
            )}
          </header>

          {articles.length > 0 ? (
            <RealArticleGrid articles={articles} room={room} label={label} />
          ) : (
            <EmptyState label={label} />
          )}
        </section>
      </Reveal>

    </>
  );
}

// ─── Real article grid ────────────────────────────────────────
// First article gets a featured hero treatment; the rest fill a 3-col grid.
function RealArticleGrid({
  articles,
  room,
  label,
}: {
  articles: Article[];
  room: RoomType;
  label: string;
}) {
  const [featured, ...rest] = articles;

  return (
    <div className="mt-10 space-y-10">
      {/* Featured — large format */}
      <FeaturedArticleCard article={featured} />

      {/* Remaining — standard 3-col grid */}
      {rest.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {rest.map((a, idx) => (
            <ArticleCard key={a.slug} article={a} priority={idx === 0} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Featured article card (large format) ────────────────────
function FeaturedArticleCard({ article }: { article: Article }) {
  // Canonical article path — see ArticleCard.tsx; avoids the 301 hop.
  const href = `/blog/${article.slug}`;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <article className="group grid gap-8 md:grid-cols-2 md:items-center">
      {/* Image */}
      <Link href={href} className="block overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      {/* Copy */}
      <div>
        <p className="text-eyebrow uppercase tracking-[0.16em] text-accent-600">
          {article.categoryLabel}
        </p>
        <h2 className="mt-3 text-balance font-serif text-h1 text-ink-900">
          <Link href={href} className="transition-colors duration-quick hover:text-accent-600">
            {article.title}
          </Link>
        </h2>
        <p className="mt-4 text-pretty text-body-lg text-ink-600 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-ink-400">
          <span>{article.readingTime} min read</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.updatedAt ?? article.publishedAt}>
            {fmt(article.updatedAt ?? article.publishedAt)}
          </time>
        </div>
        <Link
          href={href}
          className={clsx(
            'mt-6 inline-flex items-center gap-2',
            'text-body font-semibold text-accent-600',
            'transition-colors duration-quick hover:text-accent-500',
          )}
        >
          Read the guide
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// ─── Empty state ──────────────────────────────────────────────
// Shown when no real articles exist yet for this room category.
function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-10 flex items-start gap-4 rounded-2xl border border-ink-100 bg-elevated/40 p-6 sm:items-center">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-50">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-600"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </span>
      <div>
        <p className="font-semibold text-ink-900">
          {label} guides are in progress.
        </p>
        <p className="mt-1 text-body-sm text-ink-600">
          Our editors are testing and writing now — subscribe to be notified when
          they publish.{' '}
          <Link
            href="/newsletter"
            className="font-medium text-accent-600 transition-colors duration-quick hover:text-accent-500"
          >
            Get notified →
          </Link>
        </p>
      </div>
    </div>
  );
}
