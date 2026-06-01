'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

// Lightweight article shape — only the fields needed for search display.
// The full `content` field is intentionally excluded to keep the bundle small.
export type SearchArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  heroImage: string;
  heroImageAlt: string;
  readingTime: number;
  publishedAt: string;
  tags: string[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function matchesQuery(article: SearchArticle, query: string): boolean {
  if (!query.trim()) return false;
  const q = query.toLowerCase();
  return (
    article.title.toLowerCase().includes(q) ||
    article.excerpt.toLowerCase().includes(q) ||
    article.categoryLabel.toLowerCase().includes(q) ||
    article.tags.some((t) => t.toLowerCase().includes(q))
  );
}

function SearchResultCard({ article }: { article: SearchArticle }) {
  const href = `/blog/${article.slug}`;
  return (
    <article className="group grid gap-5 sm:grid-cols-[160px_1fr] sm:gap-6">
      {/* Thumbnail */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated sm:aspect-[1/1]">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.05]"
          />
        </div>
      </Link>

      {/* Copy */}
      <div className="flex flex-col justify-center">
        <Link
          href={`/${article.category}`}
          className="text-eyebrow uppercase tracking-[0.14em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {article.categoryLabel}
        </Link>
        <h2 className="mt-1.5 font-serif text-body-lg font-semibold leading-snug text-ink-900">
          <Link
            href={href}
            className="transition-colors duration-quick hover:text-accent-600"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-body-sm text-ink-400">
          <span>{article.readingTime} min read</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}

export function SearchResults({ articles }: { articles: SearchArticle[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const trimmed = query.trim();

  const results = trimmed
    ? articles.filter((a) => matchesQuery(a, trimmed))
    : [];

  return (
    <div className="bg-canvas">

      {/* ── Page header ──────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
            Search
          </p>

          {trimmed ? (
            <>
              <h1 className="mt-3 font-serif text-h1 text-ink-900">
                Results for{' '}
                <span className="text-accent-600">&ldquo;{trimmed}&rdquo;</span>
              </h1>
              <p className="mt-2 text-body-sm text-ink-500">
                {results.length === 0
                  ? 'No articles matched your search.'
                  : `${results.length} article${results.length === 1 ? '' : 's'} found.`}
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-3 font-serif text-h1 text-ink-900">
                Search Bigelow Designs
              </h1>
              <p className="mt-2 text-body-sm text-ink-500">
                Enter a keyword above to search our guides, reviews, and design
                trend articles.
              </p>
            </>
          )}

          {/* ── Search form ── */}
          <SearchForm initialQuery={query} />
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────── */}
      <main className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {!trimmed && (
          <BrowsePrompt />
        )}

        {trimmed && results.length > 0 && (
          <div className="space-y-10 divide-y divide-ink-100">
            {results.map((article) => (
              <div key={article.slug} className="pt-10 first:pt-0">
                <SearchResultCard article={article} />
              </div>
            ))}
          </div>
        )}

        {trimmed && results.length === 0 && (
          <EmptyState query={trimmed} />
        )}

      </main>
    </div>
  );
}

// ─── Search form ─────────────────────────────────────────────────
function SearchForm({ initialQuery }: { initialQuery: string }) {
  return (
    <form
      method="GET"
      action="/search"
      className="mt-6 flex max-w-xl gap-2"
      role="search"
    >
      <div className="relative flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-ink-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="search"
          name="q"
          defaultValue={initialQuery}
          autoComplete="off"
          spellCheck="false"
          placeholder="Search guides, reviews, trends…"
          aria-label="Search articles"
          className={clsx(
            'block w-full rounded-full border border-ink-200 bg-surface',
            'py-3 pl-11 pr-5 text-body text-ink-900 placeholder-ink-300',
            'transition-colors duration-quick',
            'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
          )}
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-ink-900 px-6 py-3 text-body-sm font-semibold text-white transition-colors duration-quick hover:bg-accent"
      >
        Search
      </button>
    </form>
  );
}

// ─── Empty state ─────────────────────────────────────────────────
function EmptyState({ query }: { query: string }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="font-serif text-h2 text-ink-900">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="mt-4 text-body-lg text-ink-500">
        Try a broader keyword, or browse a category below.
      </p>
      <BrowsePrompt />
    </div>
  );
}

// ─── Browse prompt (shown when no query or no results) ───────────
function BrowsePrompt() {
  const suggestions = [
    { label: 'Room Guides',       href: '/rooms'         },
    { label: 'Furniture Reviews', href: '/reviews'       },
    { label: 'Design Trends',     href: '/design-trends' },
    { label: 'Newsletter',        href: '/newsletter'    },
  ];

  return (
    <div className="mt-10 rounded-2xl border border-ink-100 bg-surface p-8">
      <p className="text-eyebrow uppercase tracking-[0.18em] text-ink-400">
        Browse instead
      </p>
      <h2 className="mt-3 font-serif text-h2 text-ink-900">
        Explore by section.
      </h2>
      <p className="mt-2 text-body-sm text-ink-500">
        Our guides, reviews, and trend coverage are organized by topic.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {suggestions.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className={clsx(
                'flex items-center justify-between rounded-xl border border-ink-100',
                'px-5 py-4 text-body font-semibold text-ink-900',
                'transition-colors duration-quick hover:border-accent-200 hover:bg-accent-50 hover:text-accent-600',
              )}
            >
              {s.label}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
