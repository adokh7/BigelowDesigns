import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { getArticlesByCategory, getCategoryHref } from '@/lib/articles';
import {
  FilterableArticleGrid,
  type FilterableArticle,
} from '@/components/sections/FilterableArticleGrid';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Furniture Reviews',
  description:
    'Honest furniture reviews tested across real homes. No sponsored posts, no affiliate bias — just the pieces worth buying and the ones to skip.',
  alternates: { canonical: `${siteConfig.url}/reviews` },
  robots: { index: true, follow: true },
};

// ─── Reviews filter tabs ──────────────────────────────────────
// "All" must remain first — it is treated as the unfiltered default.
const REVIEW_TABS = [
  'All',
  'Sofas',
  'Beds',
  'Dining',
  'Lighting',
  'Storage',
  'Outdoor',
  'Office',
] as const;

// ─── Map an Article to the lightweight client shape ───────────
function toFilterable(category: string) {
  return (a: ReturnType<typeof getArticlesByCategory>[number]): FilterableArticle => ({
    slug:          a.slug,
    href:          `/blog/${a.slug}`,
    title:         a.title,
    excerpt:       a.excerpt,
    categoryLabel: a.categoryLabel,
    categoryHref:  getCategoryHref(a.category),
    heroImage:     a.heroImage,
    heroImageAlt:  a.heroImageAlt,
    readingTime:   a.readingTime,
    tags:          a.tags ?? [],
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function FurnitureReviewsPage() {
  const articles = getArticlesByCategory('reviews').map(toFilterable('reviews'));

  return (
    <div className="bg-canvas">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-brand">
            Reviews
          </p>
          <h1 className="mt-3 max-w-xl text-balance font-serif text-h1 text-ink-900">
            Furniture Reviews
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-body-lg text-ink-500">
            Tested across real homes over real time. We buy the pieces ourselves,
            live with them, and tell you exactly what we found — including the
            things that disappoint.
          </p>

          {/* Affiliate disclosure */}
          <p className="mt-6 max-w-2xl rounded-xl border border-ink-100 bg-elevated/40 px-5 py-4 text-body-sm text-ink-500">
            <span className="font-semibold text-ink-700">About our reviews.</span>{' '}
            We purchase all test products ourselves and earn a small commission if
            you buy through our links. This never influences our ratings.{' '}
            <Link
              href="/affiliate-disclosure"
              className="font-medium text-brand transition-colors duration-quick hover:text-brand-hover"
            >
              Full disclosure →
            </Link>
          </p>
        </div>
      </div>

      {/* ── Filter + grid ───────────────────────────────────── */}
      <FilterableArticleGrid
        tabs={REVIEW_TABS}
        articles={articles}
        emptyLabel="Reviews are in progress."
      />

    </div>
  );
}
