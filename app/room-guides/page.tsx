import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { getArticlesByCategory } from '@/lib/articles';
import {
  FilterableArticleGrid,
  type FilterableArticle,
} from '@/components/sections/FilterableArticleGrid';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Room Guides',
  description:
    'Considered, room-by-room design guides for every space in your home. From the powder room to the home office, tested and written by working interior designers.',
  alternates: { canonical: `${siteConfig.url}/room-guides` },
  robots: { index: true, follow: true },
};

// ─── Room Guides filter tabs ──────────────────────────────────
const ROOM_TABS = [
  'All',
  'Living Room',
  'Bedroom',
  'Bathroom',
  'Kitchen',
  'Office',
  'Outdoor',
  'Dining',
] as const;

function toFilterable(
  a: ReturnType<typeof getArticlesByCategory>[number],
): FilterableArticle {
  return {
    slug:          a.slug,
    href:          `/blog/${a.slug}`,
    title:         a.title,
    excerpt:       a.excerpt,
    categoryLabel: a.categoryLabel,
    // Each card's category badge links back to its specific room page
    categoryHref:  `/rooms/${a.category}`,
    heroImage:     a.heroImage,
    heroImageAlt:  a.heroImageAlt,
    readingTime:   a.readingTime,
    tags:          a.tags ?? [],
  };
}

// ─── Page ─────────────────────────────────────────────────────
export default function RoomGuidesPage() {
  // Articles with category === 'room-guides' OR a matching secondaryCategory.
  // The MDX frontmatter on every room-specific article includes
  // `secondaryCategories: ["room-guides"]` so they all surface here.
  const articles = getArticlesByCategory('room-guides').map(toFilterable);

  return (
    <div className="bg-canvas">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-brand">
            Category
          </p>
          <h1 className="mt-3 max-w-xl text-balance font-serif text-h1 text-ink-900">
            Room Guides
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-body-lg text-ink-500">
            Considered, room-by-room design guidance — written by working
            interior designers and tested across real homes. Filter by space to
            find the right guide for the room you are working on.
          </p>
        </div>
      </div>

      {/* ── Filter + grid ───────────────────────────────────── */}
      <FilterableArticleGrid
        tabs={ROOM_TABS}
        articles={articles}
        emptyLabel="Room guides are in progress."
      />

    </div>
  );
}
