'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import clsx from 'clsx';

// ─── Shape passed from the server page ────────────────────────
// Articles are serialized to plain objects (no `content`, no fs paths)
// so they cross the server/client boundary cleanly.
export type FilterableArticle = {
  slug:          string;
  href:          string;
  title:         string;
  excerpt:       string;
  categoryLabel: string;
  categoryHref:  string;
  heroImage:     string;
  heroImageAlt:  string;
  readingTime:   number;
  tags:          string[];
};

interface FilterableArticleGridProps {
  /** Pre-defined filter tab labels. First tab is treated as "show all". */
  tabs:         readonly string[];
  /** Serialized articles to filter and render. */
  articles:     FilterableArticle[];
  /** Optional priming label for the empty state. */
  emptyLabel?:  string;
}

/**
 * FilterableArticleGrid
 *
 * Single client component that owns:
 *   • Active-tab state (the first tab is the default — usually "All")
 *   • Filtering (matches activeTab against article.tags)
 *   • The article card grid OR an empty state
 *
 * Used on /reviews, /design-trends, and /room-guides. Each page passes
 * its own tabs and pre-serialized article list — the component handles
 * the rest.
 *
 * Active   → bg-stone-200 text-stone-900 font-medium
 * Inactive → text-stone-500 hover:bg-stone-100 transition-colors
 */
export function FilterableArticleGrid({
  tabs,
  articles,
  emptyLabel,
}: FilterableArticleGridProps) {
  const defaultTab = tabs[0] ?? 'All';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const filtered = useMemo(() => {
    if (activeTab === defaultTab) return articles;
    return articles.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === activeTab.toLowerCase()),
    );
  }, [articles, activeTab, defaultTab]);

  return (
    <>
      {/* ── Sticky tab bar ─────────────────────────────────────── */}
      <div className="sticky top-[var(--header-height,64px)] z-10 border-y border-ink-100 bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Filter articles by category"
            className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    'flex-shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm',
                    'transition-colors duration-150',
                    isActive
                      ? 'bg-stone-200 font-medium text-stone-900'
                      : 'font-normal text-stone-500 hover:bg-stone-100',
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Active-filter confirmation strip — shows when a non-default
              tab is selected AND results exist. Lets the user see at a
              glance which filter is active. */}
          {activeTab !== defaultTab && filtered.length > 0 && (
            <p className="pb-2 text-[11px] tracking-wide text-stone-400">
              Showing:{' '}
              <span className="font-medium text-stone-600">{activeTab}</span>
              {' '}({filtered.length} {filtered.length === 1 ? 'article' : 'articles'})
              <button
                type="button"
                onClick={() => setActiveTab(defaultTab)}
                className="ml-2 text-brand transition-colors hover:text-brand-hover"
              >
                Clear filter
              </button>
            </p>
          )}
        </div>
      </div>

      {/* ── Article grid or empty state ────────────────────────── */}
      <section
        aria-label={`${activeTab} articles`}
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        {filtered.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {filtered.map((article, idx) => (
              <ArticleCard
                key={article.slug}
                article={article}
                priority={idx < 3}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            activeTab={activeTab}
            defaultTab={defaultTab}
            onReset={() => setActiveTab(defaultTab)}
            label={emptyLabel}
          />
        )}
      </section>
    </>
  );
}

// ─── Article card ─────────────────────────────────────────────
function ArticleCard({
  article,
  priority = false,
}: {
  article: FilterableArticle;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <Link href={article.href} className="block" tabIndex={-1} aria-hidden="true">
        <div className="overflow-hidden rounded-2xl bg-stone-100 shadow-md shadow-stone-900/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-stone-900/10">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={article.heroImage}
              alt={article.heroImageAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
        </div>
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        <Link
          href={article.categoryHref}
          className="text-xs font-bold uppercase tracking-widest text-brand transition-colors duration-quick hover:text-brand-hover"
        >
          {article.categoryLabel}
        </Link>

        <h3 className="mt-2.5 flex-1 font-serif text-xl font-bold leading-snug tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-brand lg:text-2xl">
          <Link href={article.href}>{article.title}</Link>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-2">
          {article.excerpt}
        </p>

        <p className="mt-4 text-sm text-stone-400">
          {article.readingTime} min read
        </p>
      </div>
    </article>
  );
}

// ─── Empty state ──────────────────────────────────────────────
// Only rendered when the filtered result is genuinely empty.
function EmptyState({
  activeTab,
  defaultTab,
  onReset,
  label,
}: {
  activeTab:   string;
  defaultTab:  string;
  onReset:     () => void;
  label?:      string;
}) {
  const isFiltering = activeTab !== defaultTab;

  return (
    <div className="mx-auto max-w-xl py-16 text-center lg:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
        {isFiltering ? 'No matches yet' : 'Coming soon'}
      </p>
      <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
        {isFiltering
          ? `No ${activeTab} articles — yet.`
          : label ?? 'New articles in progress.'}
      </h3>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-500">
        {isFiltering
          ? `Our editors are currently working on more ${activeTab.toLowerCase()} coverage. Subscribe to be notified when it lands.`
          : 'Subscribe to the newsletter to be notified when the next batch publishes.'}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {isFiltering && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border-2 border-stone-900 px-6 py-2.5 text-sm font-semibold text-stone-900 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-stone-900 hover:text-white"
          >
            Show all articles
          </button>
        )}
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40"
        >
          Get notified
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
