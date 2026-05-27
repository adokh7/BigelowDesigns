'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import type { ProductRef } from '@/types/article';
import { AffiliateButton } from './AffiliateButton';
import { ProductQuickView } from './ProductQuickView';

interface ComparisonTableProps {
  products: ProductRef[];
  title?: string;
  /** Section ID for sticky-mini-compare jump links. */
  id?: string;
}

const CURRENCY_SYMBOL = { USD: '$', GBP: '£' } as const;

export function ComparisonTable({
  products,
  title = 'Top Picks',
  id = 'comparison',
}: ComparisonTableProps) {
  const [quickView, setQuickView] = useState<ProductRef | null>(null);

  return (
    <>
      <section
        id={id}
        aria-label={title}
        className="my-10 overflow-hidden rounded-xl border border-ink-100 bg-surface"
      >
        <header className="flex items-center justify-between border-b border-ink-100 bg-elevated/40 px-5 py-3">
          <h2 className="font-serif text-h3 text-ink-900">{title}</h2>
          <p className="text-body-sm text-ink-400">
            {products.length} compared
          </p>
        </header>

        {/* ─── Desktop table ─── */}
        <div className="hidden md:block">
          <table className="w-full text-left text-body-sm">
            <thead className="border-b border-ink-100 bg-elevated/30 text-eyebrow text-ink-600">
              <tr>
                <th scope="col" className="px-5 py-3">Product</th>
                <th scope="col" className="px-5 py-3">Rating</th>
                <th scope="col" className="px-5 py-3">Highlights</th>
                <th scope="col" className="px-5 py-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {products.map((p) => {
                const link =
                  p.affiliateLinks.find((l) => l.region === 'US') ??
                  p.affiliateLinks[0];
                return (
                  <tr
                    key={p.id}
                    id={`product-${p.id}`}
                    className="group align-top transition-colors duration-quick ease-out hover:bg-elevated/40"
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setQuickView(p)}
                        aria-label={`Quick view ${p.name}`}
                        className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
                      >
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          width={72}
                          height={72}
                          className="h-[72px] w-[72px] rounded-md object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
                        />
                        <div>
                          <div className="font-serif text-h3 font-semibold text-ink-900 leading-tight group-hover:text-accent-600 transition-colors duration-quick ease-out">
                            {p.name}
                          </div>
                          {p.brand && (
                            <div className="mt-0.5 text-eyebrow text-ink-400">
                              {p.brand}
                            </div>
                          )}
                          <div className="mt-1 text-body-sm text-accent-600">
                            Quick view →
                          </div>
                        </div>
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      {p.rating !== undefined && <Stars rating={p.rating} />}
                    </td>
                    <td className="px-5 py-4">
                      {p.pros && (
                        <ul className="space-y-1 text-ink-600">
                          {p.pros.slice(0, 3).map((pro) => (
                            <li key={pro} className="flex gap-1.5">
                              <span
                                aria-hidden="true"
                                className="text-accent shrink-0"
                              >
                                ✓
                              </span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex flex-col items-end gap-2">
                        {link.price !== undefined && (
                          <p className="font-serif text-body font-semibold text-ink-900">
                            {CURRENCY_SYMBOL[link.currency]}
                            {link.price.toLocaleString('en-US')}
                          </p>
                        )}
                        <AffiliateButton
                          href={link.url}
                          network={link.network}
                          price={link.price}
                          currency={link.currency}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ─── Mobile cards ─── */}
        <ol className="divide-y divide-ink-100 md:hidden">
          {products.map((p, idx) => {
            const link =
              p.affiliateLinks.find((l) => l.region === 'US') ??
              p.affiliateLinks[0];
            return (
              <li key={p.id} id={`product-${p.id}-mobile`} className="p-4">
                <button
                  type="button"
                  onClick={() => setQuickView(p)}
                  aria-label={`Quick view ${p.name}`}
                  className="flex w-full gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
                >
                  <span className="font-serif text-body-sm font-semibold text-ink-400 shrink-0 w-5">
                    {idx + 1}
                  </span>
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-body font-semibold text-ink-900 leading-snug">
                      {p.name}
                    </h3>
                    {p.brand && (
                      <p className="text-eyebrow text-ink-400">{p.brand}</p>
                    )}
                    {p.rating !== undefined && (
                      <div className="mt-1">
                        <Stars rating={p.rating} size="sm" />
                      </div>
                    )}
                  </div>
                </button>
                {p.pros && (
                  <ul className="mt-3 space-y-1 text-body-sm text-ink-600">
                    {p.pros.slice(0, 3).map((pro) => (
                      <li key={pro} className="flex gap-1.5">
                        <span
                          aria-hidden="true"
                          className="text-accent shrink-0"
                        >
                          ✓
                        </span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="font-serif text-body font-semibold text-ink-900">
                    {link.price !== undefined &&
                      `${CURRENCY_SYMBOL[link.currency]}${link.price.toLocaleString('en-US')}`}
                  </p>
                  <AffiliateButton
                    href={link.url}
                    network={link.network}
                    price={link.price}
                    currency={link.currency}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setQuickView(p)}
                  className="mt-3 w-full rounded-md border border-ink-200 px-3 py-2 text-body-sm font-semibold text-ink-800 transition-colors duration-quick ease-out hover:border-accent hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Quick view
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <ProductQuickView
        product={quickView}
        onClose={() => setQuickView(null)}
      />
    </>
  );
}

// ─── Stars ────────────────────────────────────────────────────
function Stars({
  rating,
  size = 'md',
}: {
  rating: number;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      aria-label={`Rating: ${rating} out of 5`}
      className={clsx(
        'inline-flex items-center gap-0.5 text-accent',
        size === 'sm' ? 'text-body-sm' : 'text-body',
      )}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          {i < Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
      <span
        className={clsx(
          'ml-1 font-semibold text-ink-800',
          size === 'sm' ? 'text-body-sm' : 'text-body-sm',
        )}
      >
        {rating.toFixed(1)}
      </span>
    </span>
  );
}
