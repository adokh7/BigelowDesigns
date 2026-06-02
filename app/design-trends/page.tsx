import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { getArticlesByCategory } from '@/lib/articles';
import {
  FilterableArticleGrid,
  type FilterableArticle,
} from '@/components/sections/FilterableArticleGrid';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Design Trends',
  description:
    'The interior design trends shaping homes in 2026. In-depth coverage of the aesthetics, materials, and movements worth paying attention to.',
  alternates: { canonical: `${siteConfig.url}/design-trends` },
  robots: { index: true, follow: true },
};

// ─── Design Trends filter tabs ────────────────────────────────
const TREND_TABS = [
  'All',
  'Decor',
  'Lighting',
  'Storage',
  'Beds',
  'Sustainability',
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
    categoryHref:  '/design-trends',
    heroImage:     a.heroImage,
    heroImageAlt:  a.heroImageAlt,
    readingTime:   a.readingTime,
    tags:          a.tags ?? [],
  };
}

// ─── Page ─────────────────────────────────────────────────────
export default function DesignTrendsPage() {
  const articles = getArticlesByCategory('design-trends').map(toFilterable);

  return (
    <div className="bg-canvas">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-brand">
            Category
          </p>
          <h1 className="mt-3 max-w-xl text-balance font-serif text-h1 text-ink-900">
            Design Trends
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-body-lg text-ink-500">
            The movements, aesthetics, and materials shaping how we design our
            homes right now. Analysed honestly, without trend-chasing hype.
          </p>
        </div>
      </div>

      {/* ── Filter + grid ───────────────────────────────────── */}
      <FilterableArticleGrid
        tabs={TREND_TABS}
        articles={articles}
        emptyLabel="Trend coverage is on its way."
      />

    </div>
  );
}
