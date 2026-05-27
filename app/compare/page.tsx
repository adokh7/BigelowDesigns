'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useCompare } from '@/contexts/CompareContext';
import { track } from '@/lib/analytics';
import type { ProductRef } from '@/types/article';

const CURRENCY_SYMBOL = { USD: '$', GBP: '£' } as const;

export default function ComparePage() {
  const { items, hydrated, remove, clear } = useCompare();

  // Fire view event after hydration (avoids SSR/CSR mismatch)
  useEffect(() => {
    if (!hydrated) return;
    track('compare_view', {
      count: items.length,
      product_ids: items.map((p) => p.id).join(','),
    });
  }, [hydrated, items.length, items]);

  // Pre-hydration placeholder
  if (!hydrated) {
    return (
      <main className="mx-auto max-w-page px-4 py-20 sm:px-6 lg:px-8">
        <div className="skeleton h-12 w-2/3 max-w-md" />
        <div className="mt-4 skeleton h-6 w-1/2 max-w-sm" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-96" />
          ))}
        </div>
      </main>
    );
  }

  // Empty state
  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <main className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-eyebrow text-accent-600">Your Selection</p>
          <h1 className="mt-2 font-serif text-display-lg text-ink-900 text-balance">
            Side by side.
          </h1>
          <p className="mt-3 max-w-xl text-body-lg text-ink-600 text-pretty">
            Compare {items.length} piece{items.length === 1 ? '' : 's'} you&apos;ve saved while
            reading. Specs, prices, and our honest verdict — all in one place.
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="self-start rounded-md border border-ink-200 px-4 py-2 text-body-sm font-semibold text-ink-700 transition-colors duration-quick ease-out hover:border-danger hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Clear all
        </button>
      </header>

      {/* Comparison grid */}
      <CompareGrid items={items} onRemove={remove} />

      {/* Continue */}
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-body font-semibold text-accent-600 hover:text-accent-500"
        >
          ← Keep exploring
        </Link>
      </div>
    </main>
  );
}

/* ───────────────────────────────────────────────────────────
   Empty State
   ─────────────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-600"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </div>
      <h1 className="mt-6 font-serif text-h1 text-ink-900">
        Nothing to compare — yet.
      </h1>
      <p className="mt-4 text-body-lg text-ink-600">
        While reading any review, tap <strong className="text-ink-800">Add to
        compare</strong> on the pieces you&apos;re weighing. Up to four can be lined
        up here, side by side.
      </p>
      <Link
        href="/reviews"
        className="mt-8 inline-flex items-center gap-1.5 h-12 rounded-md bg-accent px-6 font-semibold text-white transition-all duration-quick ease-out hover:bg-accent-600 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Browse our reviews
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}

/* ───────────────────────────────────────────────────────────
   CompareGrid — sticky-label horizontal scroll table
   ─────────────────────────────────────────────────────────── */
interface CompareGridProps {
  items: ProductRef[];
  onRemove: (id: string) => void;
}

function CompareGrid({ items, onRemove }: CompareGridProps) {
  // Build spec rows that exist for at least one product
  const hasRating = items.some((p) => p.rating !== undefined);
  const hasUSPrice = items.some((p) =>
    p.affiliateLinks.some((l) => l.region === 'US' && l.price !== undefined),
  );
  const hasUKPrice = items.some((p) =>
    p.affiliateLinks.some((l) => l.region === 'UK' && l.price !== undefined),
  );
  const hasPros = items.some((p) => (p.pros?.length ?? 0) > 0);
  const hasCons = items.some((p) => (p.cons?.length ?? 0) > 0);

  return (
    <div className="mt-12 -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        className="grid min-w-fit gap-px rounded-2xl bg-ink-100"
        style={{
          gridTemplateColumns: `140px repeat(${items.length}, minmax(240px, 1fr))`,
        }}
      >
        {/* ─── Row: hero image + remove ─── */}
        <Cell label sticky />
        {items.map((p) => (
          <Cell key={`img-${p.id}`} className="relative p-0">
            <button
              type="button"
              onClick={() => onRemove(p.id)}
              aria-label={`Remove ${p.name}`}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface/95 text-ink-700 shadow-sm backdrop-blur transition-colors duration-quick ease-out hover:bg-danger hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(max-width: 768px) 50vw, 240px"
                className="object-cover"
              />
            </div>
          </Cell>
        ))}

        {/* ─── Row: name + brand ─── */}
        <Cell label sticky />
        {items.map((p) => (
          <Cell key={`name-${p.id}`}>
            {p.brand && <p className="text-eyebrow text-ink-400">{p.brand}</p>}
            <h2 className="mt-1 font-serif text-h3 text-ink-900 leading-snug">
              {p.name}
            </h2>
          </Cell>
        ))}

        {/* ─── Row: Rating ─── */}
        {hasRating && (
          <>
            <Cell label sticky>Rating</Cell>
            {items.map((p) => (
              <Cell key={`rate-${p.id}`}>
                {p.rating !== undefined ? (
                  <p className="flex items-center gap-1.5 text-body">
                    <span aria-hidden="true" className="text-accent">
                      {'★'.repeat(Math.round(p.rating))}
                    </span>
                    <span className="font-semibold text-ink-900">
                      {p.rating.toFixed(1)}
                    </span>
                    {p.reviewCount && (
                      <span className="text-body-sm text-ink-400">
                        ({p.reviewCount.toLocaleString()})
                      </span>
                    )}
                  </p>
                ) : (
                  <Em />
                )}
              </Cell>
            ))}
          </>
        )}

        {/* ─── Row: Price US ─── */}
        {hasUSPrice && (
          <>
            <Cell label sticky>Price (US)</Cell>
            {items.map((p) => {
              const link = p.affiliateLinks.find((l) => l.region === 'US');
              return (
                <Cell key={`us-${p.id}`}>
                  {link?.price !== undefined ? (
                    <p className="font-serif text-h3 font-semibold text-ink-900">
                      {CURRENCY_SYMBOL[link.currency]}
                      {link.price.toLocaleString('en-US')}
                    </p>
                  ) : (
                    <Em />
                  )}
                </Cell>
              );
            })}
          </>
        )}

        {/* ─── Row: Price UK ─── */}
        {hasUKPrice && (
          <>
            <Cell label sticky>Price (UK)</Cell>
            {items.map((p) => {
              const link = p.affiliateLinks.find((l) => l.region === 'UK');
              return (
                <Cell key={`uk-${p.id}`}>
                  {link?.price !== undefined ? (
                    <p className="font-serif text-h3 font-semibold text-ink-900">
                      {CURRENCY_SYMBOL[link.currency]}
                      {link.price.toLocaleString('en-US')}
                    </p>
                  ) : (
                    <Em />
                  )}
                </Cell>
              );
            })}
          </>
        )}

        {/* ─── Row: Pros ─── */}
        {hasPros && (
          <>
            <Cell label sticky>Highlights</Cell>
            {items.map((p) => (
              <Cell key={`pros-${p.id}`}>
                {p.pros && p.pros.length > 0 ? (
                  <ul className="space-y-1.5 text-body-sm text-ink-700">
                    {p.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-1.5">
                        <span className="mt-1 shrink-0 text-success" aria-hidden="true">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Em />
                )}
              </Cell>
            ))}
          </>
        )}

        {/* ─── Row: Cons ─── */}
        {hasCons && (
          <>
            <Cell label sticky>Worth noting</Cell>
            {items.map((p) => (
              <Cell key={`cons-${p.id}`}>
                {p.cons && p.cons.length > 0 ? (
                  <ul className="space-y-1.5 text-body-sm text-ink-700">
                    {p.cons.map((con) => (
                      <li key={con} className="flex items-start gap-1.5">
                        <span className="mt-1 shrink-0 text-ink-400" aria-hidden="true">—</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Em />
                )}
              </Cell>
            ))}
          </>
        )}

        {/* ─── Row: CTA ─── */}
        <Cell label sticky />
        {items.map((p) => {
          const link =
            p.affiliateLinks.find((l) => l.region === 'US') ?? p.affiliateLinks[0];
          return (
            <Cell key={`cta-${p.id}`}>
              <a
                href={link.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                data-affiliate-network={link.network}
                data-product-id={p.id}
                data-placement="compare_page"
                className="inline-flex w-full items-center justify-center gap-1.5 h-11 rounded-md bg-accent px-4 text-body-sm font-semibold text-white transition-all duration-quick ease-out hover:bg-accent-600 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Check {CURRENCY_SYMBOL[link.currency]}
                {link.price?.toLocaleString('en-US')} on {link.network}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                </svg>
              </a>
            </Cell>
          );
        })}
      </div>

      <p className="mt-3 px-1 text-body-sm text-ink-400 lg:hidden">
        Scroll horizontally to compare →
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   Cell primitive — sticky-left label cells use bg-elevated
   ─────────────────────────────────────────────────────────── */
function Cell({
  children,
  label,
  sticky,
  className,
}: {
  children?: React.ReactNode;
  label?: boolean;
  sticky?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'bg-surface p-5',
        label && 'text-eyebrow text-ink-600 flex items-center',
        sticky && 'sticky left-0 z-[1] bg-elevated',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Em() {
  return <span className="text-body-sm text-ink-400">—</span>;
}
