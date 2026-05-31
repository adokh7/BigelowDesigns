import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { siteConfig } from '@/lib/site';
import { AdSlot } from '@/components/ui/AdSlot';
import { Reveal } from '@/components/ui/Reveal';
import { getArticlesByCategory } from '@/lib/articles';
import { ReviewsFilterTabs } from '@/components/ReviewsFilterTabs';
import type { Article } from '@/types/article';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Furniture Reviews',
  description:
    'Honest furniture reviews tested across real homes. No sponsored posts, no affiliate bias — just the pieces worth buying and the ones to skip.',
  alternates: { canonical: `${siteConfig.url}/reviews` },
  robots: { index: true, follow: true },
};

// ─── Verdict colours — design framework, used when real review
//     articles supply a `verdict` tag in their frontmatter.
const VERDICT_STYLES = {
  'Highly recommended': 'bg-green-50 text-green-700 border-green-100',
  Recommended:          'bg-accent-50 text-accent-600 border-accent/20',
  'Worth considering':  'bg-amber-50 text-amber-700 border-amber-100',
  'Skip it':            'bg-ink-50 text-ink-500 border-ink-100',
} as const;

// ─── Page ─────────────────────────────────────────────────────
export default function FurnitureReviewsPage() {
  // Only real, published review articles — no placeholder data.
  const articles = getArticlesByCategory('reviews');

  return (
    <div className="bg-canvas">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
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
        </div>
      </div>

      {/* ── Filter tabs — client component (useState for active category) */}
      <ReviewsFilterTabs />

      {/* ── Article content ─────────────────────────────────── */}
      {articles.length > 0 ? (
        <Reveal>
          <section
            aria-labelledby="reviews-heading"
            className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
          >
            <h2 id="reviews-heading" className="sr-only">
              All furniture reviews
            </h2>

            {/* Affiliate disclosure */}
            <p className="mb-10 rounded-xl border border-ink-100 bg-elevated/40 px-5 py-4 text-body-sm text-ink-500">
              <span className="font-semibold text-ink-700">About our reviews.</span>{' '}
              We purchase all test products ourselves and earn a small commission if
              you buy through our links. This never influences our ratings or
              recommendations.{' '}
              <Link
                href="/affiliate-disclosure"
                className="font-medium text-accent-600 transition-colors duration-quick hover:text-accent-500"
              >
                Full disclosure →
              </Link>
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {articles.map((article, idx) => (
                <ReviewCard key={article.slug} article={article} priority={idx < 3} />
              ))}
            </div>
          </section>
        </Reveal>
      ) : (
        // ── Empty state — shown until real review articles exist ──
        <div className="mx-auto max-w-page px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              Coming soon
            </p>
            <h2 className="mt-4 text-balance font-serif text-h1 text-ink-900">
              Reviews are in progress.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-body-lg leading-relaxed text-ink-500">
              Our editors are currently testing furniture across real homes. Subscribe
              to the newsletter to be notified when the first reviews publish.
            </p>
            <Link
              href="/newsletter"
              className={clsx(
                'group mt-8 inline-flex items-center gap-2',
                'rounded-full bg-ink-900 px-7 py-3',
                'text-body font-semibold text-white',
                'shadow-md',
                'transition-all duration-quick',
                'hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg',
              )}
            >
              Get notified
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-quick group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* ── Mid-page AdSense ─────────────────────────────────── */}
      <div className="border-y border-ink-100 bg-elevated/30 py-6">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <AdSlot variant="leaderboard" />
        </div>
      </div>

    </div>
  );
}

// ─── Star rating — design framework component ─────────────────
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={i < rating ? 'text-amber-400' : 'text-ink-200'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Review article card ──────────────────────────────────────
// Rendered only for real articles — no fake ratings or overlays.
function ReviewCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  const href = `/blog/${article.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-surface transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl">

      {/* Image */}
      <Link href={href} className="block overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <div className="relative aspect-[4/3] bg-elevated">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
          />
          {/* Category badge */}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-700 backdrop-blur-sm">
            {article.categoryLabel}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">

        {/* Star rating — only shown when article frontmatter provides a rating */}
        {article.rating != null && (
          <div className="flex items-center gap-2">
            <StarRating rating={article.rating} />
            <span className="text-[12px] font-semibold text-ink-600">
              {article.rating}.0/5
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className={clsx(
          'flex-1 font-serif text-body-lg font-semibold leading-snug text-ink-900',
          article.rating != null ? 'mt-3' : 'mt-0',
        )}>
          <Link
            href={href}
            className="transition-colors duration-quick hover:text-accent-600"
          >
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-ink-50 pt-4">
          <span className="text-body-sm text-ink-400">
            {article.readingTime} min read
          </span>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500"
          >
            Read review
            <svg
              width="12"
              height="12"
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

      </div>
    </article>
  );
}

