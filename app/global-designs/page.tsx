import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { getArticlesByCategory } from '@/lib/articles';
import {
  FilterableArticleGrid,
  type FilterableArticle,
} from '@/components/sections/FilterableArticleGrid';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Global Designs',
  description:
    'Premium interior design coverage rooted in cultural craft — from modern Marrakech salons to Japandi bedrooms and Mediterranean courtyards. Considered, written for the way you live.',
  alternates: { canonical: `${siteConfig.url}/global-designs` },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/global-designs`,
    title: 'Global Designs | Bigelow Designs',
    description:
      'Premium interior design coverage rooted in cultural craft — from modern Marrakech salons to Japandi bedrooms and Mediterranean courtyards. Considered, written for the way you live.',
  },
  robots: { index: true, follow: true },
};

// ─── Global Designs filter tabs ───────────────────────────────
// Curated regional aesthetics we intend to publish into. "All" must
// remain first — it is treated as the unfiltered default.
const GLOBAL_TABS = [
  'All',
  'Moroccan',
  'Japanese',
  'Mediterranean',
  'Scandinavian',
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
    categoryHref:  '/global-designs',
    heroImage:     a.heroImage,
    heroImageAlt:  a.heroImageAlt,
    readingTime:   a.readingTime,
    tags:          a.tags ?? [],
  };
}

// ─── Page ─────────────────────────────────────────────────────
export default function GlobalDesignsPage() {
  // Articles with category === 'global-designs' OR a matching
  // secondaryCategory will surface here.
  const articles = getArticlesByCategory('global-designs').map(toFilterable);

  return (
    <div className="bg-canvas">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-[#B0552B]">
            New Category
          </p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-h1 text-ink-900">
            Global Designs
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-body-lg text-ink-500">
            Premium interior design rooted in cultural craft. Modern Marrakech
            salons, Japandi bedrooms, Mediterranean courtyards — high-end
            traditions, considered for the way you actually live.
          </p>
        </div>
      </div>

      {/* ── Filter + grid ───────────────────────────────────── */}
      <FilterableArticleGrid
        tabs={GLOBAL_TABS}
        articles={articles}
        emptyLabel="Global design coverage is on its way."
      />

    </div>
  );
}
