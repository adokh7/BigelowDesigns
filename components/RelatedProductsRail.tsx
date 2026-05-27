'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { SwipeRail } from '@/components/ui/SwipeRail';
import { ProductQuickView } from '@/components/ProductQuickView';
import type { ProductRef } from '@/types/article';

interface RelatedProductsRailProps {
  products: ProductRef[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

const CURRENCY_SYMBOL = { USD: '$', GBP: '£' } as const;

/**
 * End-of-article horizontal product carousel.
 *
 * Architecture:
 *  - <SwipeRail> handles all gesture work via CSS scroll-snap (zero JS on
 *    the touch path)
 *  - Each card opens <ProductQuickView> on click — same modal as the
 *    comparison table
 *  - Cards have direct affiliate CTA so users who don't need details
 *    can convert in one tap
 */
export function RelatedProductsRail({
  products,
  eyebrow = 'Editor’s picks',
  heading = 'More from this guide',
  description = 'The pieces we keep returning to — tested, photographed, and worth your time.',
}: RelatedProductsRailProps) {
  const [quickView, setQuickView] = useState<ProductRef | null>(null);

  if (products.length === 0) return null;

  return (
    <>
      <section
        aria-labelledby="related-products-heading"
        className="my-16 lg:my-24"
      >
        <header className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {eyebrow && (
            <p className="text-eyebrow text-accent-600">{eyebrow}</p>
          )}
          <h2
            id="related-products-heading"
            className="mt-2 font-serif text-h1 text-ink-900 text-balance"
          >
            {heading}
          </h2>
          {description && (
            <p className="mt-3 max-w-xl text-body-lg text-ink-600 text-pretty">
              {description}
            </p>
          )}
        </header>

        <div className="mt-10">
          <SwipeRail
            ariaLabel="Related products carousel"
            itemWidth="min(85vw, 300px)"
          >
            {products.map((p) => (
              <MiniProductCard
                key={p.id}
                product={p}
                onQuickView={() => setQuickView(p)}
              />
            ))}
          </SwipeRail>
        </div>

        {/* Mobile scroll hint — only on touch devices, first paint only */}
        <p className="mt-4 px-4 text-center text-body-sm text-ink-400 md:hidden">
          Swipe to explore →
        </p>
      </section>

      <ProductQuickView
        product={quickView}
        onClose={() => setQuickView(null)}
      />
    </>
  );
}

// ─── Mini Product Card ────────────────────────────────────────
interface MiniProductCardProps {
  product: ProductRef;
  onQuickView: () => void;
}

function MiniProductCard({ product, onQuickView }: MiniProductCardProps) {
  const link =
    product.affiliateLinks.find((l) => l.region === 'US') ??
    product.affiliateLinks[0];

  return (
    <article
      className={clsx(
        'group flex h-full w-full flex-col overflow-hidden rounded-xl',
        'border border-ink-100 bg-surface',
        'transition-[transform,box-shadow] duration-smooth ease-out',
        'hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-md',
        'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2',
      )}
    >
      <button
        type="button"
        onClick={onQuickView}
        aria-label={`Quick view ${product.name}`}
        className="relative aspect-[4/3] overflow-hidden bg-elevated focus-visible:outline-none"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 85vw, 300px"
          className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
        />
        {/* Soft overlay on hover, hints at clickability */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-gradient-to-t from-ink-900/70 to-transparent pb-4 pt-10 text-body-sm font-semibold text-white opacity-0 transition-opacity duration-smooth ease-out group-hover:opacity-100"
        >
          Quick view
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
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.brand && (
          <p className="text-eyebrow text-ink-400">{product.brand}</p>
        )}
        <h3 className="font-serif text-body font-semibold text-ink-900 leading-snug">
          <button
            type="button"
            onClick={onQuickView}
            className="text-left transition-colors duration-quick ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </button>
        </h3>

        {product.rating !== undefined && (
          <p className="flex items-center gap-1.5 text-body-sm text-ink-600">
            <span aria-hidden="true" className="text-accent">
              {'★'.repeat(Math.round(product.rating))}
            </span>
            <span className="font-semibold text-ink-800">
              {product.rating.toFixed(1)}
            </span>
            {product.reviewCount && (
              <span className="text-ink-400">
                ({product.reviewCount.toLocaleString()})
              </span>
            )}
          </p>
        )}

        <div className="mt-auto flex items-baseline justify-between gap-2 pt-2">
          {link.price !== undefined && (
            <p className="font-serif text-body font-semibold text-ink-900">
              {CURRENCY_SYMBOL[link.currency]}
              {link.price.toLocaleString('en-US')}
            </p>
          )}
          <a
            href={link.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            data-affiliate-network={link.network}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              'inline-flex items-center justify-center gap-1.5 h-9 rounded-md px-3',
              'bg-accent text-white text-body-sm font-semibold',
              'transition-all duration-quick ease-out',
              'hover:bg-accent-600 hover:-translate-y-px hover:shadow-md',
              'active:translate-y-0 active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            )}
          >
            Shop
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
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
