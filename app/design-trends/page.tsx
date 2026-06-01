import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { siteConfig } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { getArticlesByCategory } from '@/lib/articles';
import type { Article } from '@/types/article';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Design Trends',
  description:
    'The interior design trends shaping homes in 2026. In-depth coverage of the aesthetics, materials, and movements worth paying attention to.',
  alternates: { canonical: `${siteConfig.url}/design-trends` },
  robots: { index: true, follow: true },
};

// ─── Page ─────────────────────────────────────────────────────
export default function DesignTrendsPage() {
  // Only real, published articles — no placeholder data.
  const articles = getArticlesByCategory('design-trends');

  return (
    <div className="bg-canvas">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
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

      {/* ── Article content ─────────────────────────────────── */}
      {articles.length > 0 ? (
        <Reveal>
          <section
            aria-labelledby="trends-heading"
            className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
          >
            <h2 id="trends-heading" className="sr-only">
              Design Trends articles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {articles.map((article, idx) => (
                <TrendCard key={article.slug} article={article} priority={idx < 3} />
              ))}
            </div>
          </section>
        </Reveal>
      ) : (
        // ── Empty state — shown until real articles exist ──────
        <div className="mx-auto max-w-page px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              Coming soon
            </p>
            <h2 className="mt-4 text-balance font-serif text-h1 text-ink-900">
              Trend coverage is on its way.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-body-lg leading-relaxed text-ink-500">
              Our editors are working on in-depth guides to the aesthetics and
              movements shaping interiors in 2026. Subscribe to the newsletter
              to be notified when new articles publish.
            </p>
            <Link
              href="/newsletter"
              className={clsx(
                'mt-8 inline-flex items-center gap-2',
                'rounded-full bg-ink-900 px-7 py-3',
                'text-body font-semibold text-white',
                'transition-all duration-quick hover:bg-accent hover:-translate-y-px',
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
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── Trend article card ───────────────────────────────────────
// Only rendered for real articles — no coming-soon overlay.
function TrendCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  const href = `/blog/${article.slug}`;

  return (
    <article className="group flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1.5">
      <Link href={href} className="block overflow-hidden rounded-xl transition-shadow duration-300 ease-out group-hover:shadow-lg" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link
          href={`/rooms/${article.category}`}
          className="text-eyebrow uppercase tracking-[0.14em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {article.categoryLabel}
        </Link>
        <h3 className="mt-1.5 flex-1 font-serif text-body-lg font-semibold leading-snug text-ink-900">
          <Link href={href} className="transition-colors duration-quick hover:text-accent-600">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
          {article.excerpt}
        </p>
        <p className="mt-3 text-body-sm text-ink-400">{article.readingTime} min read</p>
      </div>
    </article>
  );
}
