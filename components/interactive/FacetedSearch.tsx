'use client';

import { useState, useMemo, useDeferredValue, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import type { Article } from '@/types/article';

// ─── Types ────────────────────────────────────────────────────
export type Style = 'minimalist' | 'mid-century' | 'scandinavian' | 'japandi' | 'farmhouse' | 'coastal';
export type PriceTier = '$' | '$$' | '$$$';

interface Filters {
  room: string;
  style: Style | '';
  price: PriceTier | '';
  query: string;
}

const EMPTY_FILTERS: Filters = { room: '', style: '', price: '', query: '' };

interface FacetedSearchProps {
  articles: Article[];
  rooms: { value: string; label: string }[];
  styles?: { value: Style; label: string }[];
  initialFilters?: Partial<Filters>;
}

const DEFAULT_STYLES: { value: Style; label: string }[] = [
  { value: 'minimalist',   label: 'Minimalist' },
  { value: 'mid-century',  label: 'Mid-Century' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'japandi',      label: 'Japandi' },
  { value: 'farmhouse',    label: 'Farmhouse' },
  { value: 'coastal',      label: 'Coastal' },
];

const PRICE_TIERS: PriceTier[] = ['$', '$$', '$$$'];

// ─── Pure filter logic (testable, no hooks) ───────────────────
function normalize(s: string): string {
  return s.toLowerCase().normalize('NFKC').trim();
}

export function applyFilters(articles: Article[], filters: Filters): Article[] {
  const q = normalize(filters.query).slice(0, 100);
  return articles.filter((a) => {
    if (filters.room && a.category !== filters.room) return false;
    if (filters.style && !a.tags?.includes(filters.style)) return false;
    if (filters.price && !a.tags?.includes(filters.price)) return false;
    if (q) {
      const haystack = normalize(
        `${a.title} ${a.excerpt} ${a.categoryLabel} ${(a.tags ?? []).join(' ')}`,
      );
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

// ─── Component ────────────────────────────────────────────────
export function FacetedSearch({
  articles,
  rooms,
  styles = DEFAULT_STYLES,
  initialFilters = {},
}: FacetedSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => ({
    ...EMPTY_FILTERS,
    room:  searchParams.get('room')  ?? initialFilters.room  ?? '',
    style: (searchParams.get('style') as Style)     ?? initialFilters.style ?? '',
    price: (searchParams.get('price') as PriceTier) ?? initialFilters.price ?? '',
    query: searchParams.get('q') ?? initialFilters.query ?? '',
  }));

  const [, startTransition] = useTransition();
  const deferredFilters = useDeferredValue(filters);

  // Sync URL with filters (debounced via startTransition)
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.room)  params.set('room', filters.room);
    if (filters.style) params.set('style', filters.style);
    if (filters.price) params.set('price', filters.price);
    if (filters.query) params.set('q', filters.query);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '?', { scroll: false });
  }, [filters, router]);

  const results = useMemo(
    () => applyFilters(articles, deferredFilters),
    [articles, deferredFilters],
  );

  const visibleResults = results.slice(0, 24);
  const hasActiveFilter =
    filters.room || filters.style || filters.price || filters.query;

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    startTransition(() => setFilters((f) => ({ ...f, [key]: value })));

  return (
    <section aria-labelledby="search-heading" className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Filter rail */}
      <aside aria-label="Filters" className="lg:sticky lg:top-24 lg:self-start">
        <h2 id="search-heading" className="text-eyebrow text-ink-600">
          Refine
        </h2>

        {/* Query */}
        <div className="mt-4">
          <label htmlFor="search-query" className="sr-only">Search articles</label>
          <input
            id="search-query"
            type="search"
            inputMode="search"
            placeholder="Search ideas, brands, products…"
            value={filters.query}
            onChange={(e) => update('query', e.target.value.slice(0, 100))}
            onKeyDown={(e) => e.key === 'Escape' && update('query', '')}
            maxLength={100}
            autoComplete="off"
            className="w-full h-11 px-4 bg-surface text-body text-ink-900 placeholder:text-ink-400 border border-stone-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <FilterGroup
          label="Room"
          options={rooms}
          value={filters.room}
          onChange={(v) => update('room', v)}
        />

        <FilterGroup
          label="Style"
          options={styles}
          value={filters.style}
          onChange={(v) => update('style', v as Style | '')}
        />

        <FilterGroup
          label="Price"
          options={PRICE_TIERS.map((p) => ({
            value: p,
            label: p,
            hint: { '$': 'Budget', '$$': 'Mid-range', '$$$': 'Luxury' }[p],
          }))}
          value={filters.price}
          onChange={(v) => update('price', v as PriceTier | '')}
        />

        {hasActiveFilter && (
          <button
            type="button"
            onClick={() => startTransition(() => setFilters(EMPTY_FILTERS))}
            className="mt-6 text-body-sm font-medium text-accent-600 hover:text-accent-500"
          >
            Clear all filters
          </button>
        )}
      </aside>

      {/* Results */}
      <div>
        <div className="flex items-baseline justify-between">
          <p className="text-body-sm text-ink-600">
            {results.length === 0
              ? 'No matches yet.'
              : `${results.length} ${results.length === 1 ? 'article' : 'articles'}`}
          </p>
          {results.length > visibleResults.length && (
            <p className="text-body-sm text-ink-400">
              Showing first {visibleResults.length}
            </p>
          )}
        </div>

        {results.length === 0 ? (
          <EmptyState filters={filters} onClear={() => startTransition(() => setFilters(EMPTY_FILTERS))} />
        ) : (
          <ul className="mt-6 grid gap-8 sm:grid-cols-2">
            {visibleResults.map((a) => (
              <li key={a.slug}>
                <ResultCard article={a} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────
interface FilterGroupProps {
  label: string;
  options: { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (v: string) => void;
}

function FilterGroup({ label, options, value, onChange }: FilterGroupProps) {
  return (
    <fieldset className="mt-6">
      <legend className="text-eyebrow text-ink-600">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? '' : opt.value)}
              className={clsx(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
                'text-body-sm border transition-colors duration-quick ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                active
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink-200 bg-surface text-ink-800 hover:border-accent/50',
              )}
            >
              {opt.label}
              {opt.hint && !active && (
                <span className="text-ink-400">· {opt.hint}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ResultCard({ article }: { article: Article }) {
  return (
    <article className="group">
      <Link href={`/${article.category}/${article.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-elevated">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
          />
        </div>
        <p className="mt-3 text-eyebrow text-accent-600">{article.categoryLabel}</p>
        <h3 className="mt-1 font-serif text-h3 text-ink-900 leading-snug group-hover:text-accent-600">
          {article.title}
        </h3>
        <p className="mt-1 text-body-sm text-ink-600 line-clamp-2">{article.excerpt}</p>
      </Link>
    </article>
  );
}

function EmptyState({
  filters,
  onClear,
}: {
  filters: Filters;
  onClear: () => void;
}) {
  // Heuristic: suggest dropping the most-recently-added filter
  const dropSuggestion =
    filters.style ? 'Style'
    : filters.price ? 'Price'
    : filters.room ? 'Room'
    : 'your search';

  return (
    <div className="mt-12 rounded-xl border border-ink-100 bg-sunken p-10 text-center">
      <p className="font-serif text-h2 text-ink-900">Nothing found — yet.</p>
      <p className="mt-2 text-body text-ink-600">
        Try removing the <strong>{dropSuggestion}</strong> filter, or browse our
        trending articles.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center justify-center h-10 px-5 rounded-md bg-accent text-white text-body font-semibold hover:bg-accent-600 transition-colors duration-quick ease-out"
      >
        Clear all filters
      </button>
    </div>
  );
}
