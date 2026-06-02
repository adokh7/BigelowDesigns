'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import clsx from 'clsx';

// ─── Strict logic ─────────────────────────────────────────────
// Single, hard-coded "show everything" sentinel. Every page passes
// 'All' as the first tab; this constant exists so the filter
// invariant is impossible to misread.
const ALL_TAB = 'All';

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
  /** Tab labels. Must include 'All' (the unfiltered default). */
  tabs:         readonly string[];
  /** Serialized articles, all categories merged. */
  articles:     FilterableArticle[];
  /** Optional headline for the genuinely-empty state (no articles at all). */
  emptyLabel?:  string;
}

/**
 * FilterableArticleGrid
 *
 * Single source of truth for the filter UI used on /reviews,
 * /design-trends, and /room-guides. Strictly implements:
 *
 *   1. const [activeTab, setActiveTab] = useState('All');
 *   2. If activeTab === 'All'    → show every article in the list.
 *   3. Else                       → articles.filter(a => a.tags.includes(activeTab))
 *      (case-insensitive so a tag of "Sofas" matches a tab labelled "Sofas").
 *   4. Empty state is rendered ONLY when displayedArticles.length === 0.
 *      Otherwise the article grid is rendered.
 *   5. The active tab gets a distinct visual treatment via dynamic
 *      Tailwind classes (bg-stone-200 / text-stone-900 / font-medium).
 */
export function FilterableArticleGrid({
  tabs,
  articles,
  emptyLabel,
}: FilterableArticleGridProps) {
  // 1. State — defaults to 'All' so every article is visible on first render.
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB);

  // 2-3. The single filter rule.
  const displayedArticles = useMemo<FilterableArticle[]>(() => {
    if (activeTab === ALL_TAB) return articles;
    return articles.filter((article) =>
      article.tags.some(
        (tag) => tag.toLowerCase() === activeTab.toLowerCase(),
      ),
    );
  }, [articles, activeTab]);

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

              // 5. Dynamic styling — active tab is visually distinct.
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

          {/* Active-filter confirmation strip — shown when a specific
              tab is active AND there are results. Helps the user see at
              a glance what's being filtered and offers a one-click reset. */}
          {activeTab !== ALL_TAB && displayedArticles.length > 0 && (
            <p className="pb-2 text-[11px] tracking-wide text-stone-400">
              Showing:{' '}
              <span className="font-medium text-stone-600">{activeTab}</span>
              {' '}({displayedArticles.length}{' '}
              {displayedArticles.length === 1 ? 'article' : 'articles'})
              <button
                type="button"
                onClick={() => setActiveTab(ALL_TAB)}
                className="ml-2 text-brand transition-colors hover:text-brand-hover"
              >
                Clear filter
              </button>
            </p>
          )}
        </div>
      </div>

      {/* ── 4. Grid OR empty state — strictly mutually exclusive ── */}
      <section
        aria-label={`${activeTab} articles`}
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        {displayedArticles.length === 0 ? (
          <EmptyState
            activeTab={activeTab}
            onReset={() => setActiveTab(ALL_TAB)}
            label={emptyLabel}
          />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {displayedArticles.map((article, idx) => (
              <ArticleCard
                key={article.slug}
                article={article}
                priority={idx < 3}
              />
            ))}
          </div>
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
// Only rendered when displayedArticles.length === 0. Has two modes:
//   • isFiltering=true  → the active filter has zero matches
//   • isFiltering=false → 'All' is active but the category has no
//                          articles yet (a genuine "Coming soon")
function EmptyState({
  activeTab,
  onReset,
  label,
}: {
  activeTab: string;
  onReset:   () => void;
  label?:    string;
}) {
  const isFiltering = activeTab !== ALL_TAB;

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
