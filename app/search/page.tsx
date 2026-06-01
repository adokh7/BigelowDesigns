import { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllArticles } from '@/lib/articles';
import { SearchResults } from './SearchResults';
import type { SearchArticle } from './SearchResults';

// ─── Static shell ─────────────────────────────────────────────
// The page itself is pre-rendered statically at build time.
// All article metadata is serialized into the bundle.
// The SearchResults client component reads the `?q=` URL param
// via useSearchParams() and filters client-side — no server
// roundtrip needed, no cold-start risk, SSG-safe.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Search the Bigelow Designs archive of interior design guides, furniture reviews, and design trend articles.',
  alternates: { canonical: `${siteConfig.url}/search` },
  robots: { index: false, follow: true }, // Search pages should not be indexed
};

export default function SearchPage() {
  // Serialize only the fields needed for search — exclude full MDX content
  // to keep the client bundle compact.
  const articles: SearchArticle[] = getAllArticles().map((a) => ({
    slug:          a.slug,
    title:         a.title,
    excerpt:       a.excerpt,
    category:      a.category,
    categoryLabel: a.categoryLabel,
    heroImage:     a.heroImage,
    heroImageAlt:  a.heroImageAlt,
    readingTime:   a.readingTime,
    publishedAt:   a.publishedAt,
    tags:          a.tags ?? [],
  }));

  return (
    // Suspense is required by Next.js when a client component
    // in the subtree calls useSearchParams().
    <Suspense fallback={<SearchSkeleton />}>
      <SearchResults articles={articles} />
    </Suspense>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────
function SearchSkeleton() {
  return (
    <div className="bg-canvas">
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="h-4 w-16 animate-pulse rounded bg-ink-100" />
          <div className="mt-4 h-9 w-64 animate-pulse rounded-lg bg-ink-100" />
          <div className="mt-3 h-4 w-40 animate-pulse rounded bg-ink-100" />
          <div className="mt-6 h-12 max-w-xl animate-pulse rounded-full bg-ink-100" />
        </div>
      </div>
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-10 grid gap-5 sm:grid-cols-[160px_1fr] sm:gap-6">
            <div className="aspect-square animate-pulse rounded-xl bg-ink-100" />
            <div className="space-y-3">
              <div className="h-3 w-24 animate-pulse rounded bg-ink-100" />
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-ink-100" />
              <div className="h-4 w-full animate-pulse rounded bg-ink-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-ink-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
