'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { resolveImage } from '@/lib/image-utils';

/**
 * ProductCard
 *
 * Premium affiliate card used by MDX articles and section components.
 *
 * Visual upgrade (June 2026):
 *   - White surface with hairline gray-100 border and rounded-xl corners.
 *   - Soft shadow that bloom-grows on hover, paired with a 2px lift.
 *   - Image floats on a bg-gray-50 plate (object-contain) so product
 *     shots photographed on white backgrounds blend into the card.
 *   - Serif title (matches the site's editorial typography) and a
 *     large, weighted price that anchors the conversion eye-path.
 *   - Brand-accent (bronze) "Shop Now" pill with a smooth hover lift
 *     and a soft accent-tinted shadow.
 *
 * Prop contract is unchanged — every existing call site (MDX articles
 * using <ProductCard image="..." title="..." price="..." link="..." />,
 * the AffiliateProductGrid passing rich objects, etc.) keeps working
 * exactly as before.
 */
interface ProductCardProps {
  image: { src: string; alt: string } | string;
  brand?: string;
  name?: string;
  title?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  price?: { amount: number; currency: 'USD' | 'GBP' } | string;
  cta?: { label?: string; href: string; network?: string };
  link?: string;
  /** "stacked" forces vertical even on desktop. Default is responsive. */
  variant?: 'responsive' | 'stacked';
  badge?: string;
  /**
   * Accepted but not used directly — the affiliate CTA anchor already
   * hardcodes `rel="sponsored nofollow noopener"`. Declared here so MDX
   * authors can pass `rel="sponsored"` without TypeScript warnings.
   */
  rel?: string;
}

const CURRENCY_SYMBOL = { USD: '$', GBP: '£' } as const;

export function ProductCard({
  image,
  brand,
  name,
  title,
  description = '',
  rating,
  reviewCount,
  price,
  cta,
  link,
  variant = 'responsive',
  badge,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const isHorizontal = variant === 'responsive';

  const displayName = name || title || '';

  let imgSrc = '';
  let imgAlt = '';
  if (typeof image === 'string') {
    imgSrc = image;
    imgAlt = displayName;
  } else if (image && typeof image === 'object') {
    imgSrc = image.src;
    imgAlt = image.alt;
  }

  let ctaHref = '';
  let ctaLabel = 'Shop Now';
  let ctaNetwork: string | undefined = undefined;
  if (typeof link === 'string') {
    ctaHref = link;
  } else if (cta && typeof cta === 'object') {
    ctaHref = cta.href;
    ctaLabel = cta.label ?? 'Shop Now';
    ctaNetwork = cta.network;
  }

  let displayPrice: string | null = null;
  if (typeof price === 'string') {
    displayPrice = price;
  } else if (price && typeof price === 'object') {
    displayPrice = `${CURRENCY_SYMBOL[price.currency] || '$'}${price.amount.toLocaleString('en-US')}`;
  }

  return (
    <article
      className={clsx(
        // Core card surface — premium feel, conversion-focused
        'group relative my-6 overflow-hidden rounded-xl',
        'border border-gray-100 bg-white',
        'shadow-sm transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 hover:shadow-xl hover:border-gray-200',
        'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2',
        // Layout: stacked on mobile, side-by-side on desktop (when responsive)
        isHorizontal ? 'flex flex-col md:flex-row' : 'flex flex-col',
      )}
    >
      {badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-600 shadow-sm backdrop-blur">
          {badge}
        </span>
      )}

      {/* ── Image plate ─────────────────────────────────────────────
          Subtle gray background so product shots on white backgrounds
          read as floating objects rather than washed-out cards. The
          object-contain + inner padding give the catalog-shot feel. */}
      <div
        className={clsx(
          'relative overflow-hidden bg-gray-50 flex items-center justify-center',
          isHorizontal
            ? 'aspect-[4/3] w-full md:aspect-auto md:w-2/5 md:shrink-0 md:self-stretch'
            : 'aspect-[4/3] w-full',
        )}
      >
        {imgError || !imgSrc ? (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg
              className="h-10 w-10 mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">No Image</span>
          </div>
        ) : (
          <Image
            src={resolveImage(imgSrc)}
            alt={imgAlt}
            fill
            sizes={
              isHorizontal
                ? '(max-width: 768px) 100vw, 360px'
                : '(max-width: 768px) 100vw, 480px'
            }
            className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* ── Copy + CTA column ─────────────────────────────────────── */}
      <div
        className={clsx(
          'flex flex-col gap-3 p-6',
          isHorizontal && 'md:flex-1 md:gap-4 md:p-8',
        )}
      >
        <div>
          {brand && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              {brand}
            </p>
          )}
          <h3 className="mt-1.5 font-serif text-xl font-bold leading-snug tracking-tight text-gray-900 md:text-2xl">
            {displayName}
          </h3>
        </div>

        {description && (
          <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
            {description}
          </p>
        )}

        {rating && <Stars rating={rating} count={reviewCount} />}

        {/* ── Price + CTA row — pinned to bottom of the column ── */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-3">
          {displayPrice && (
            <p className="font-serif text-3xl font-bold leading-none tracking-tight text-gray-900">
              {displayPrice}
            </p>
          )}

          {ctaHref && (
            <a
              href={ctaHref}
              target="_blank"
              rel="sponsored nofollow noopener"
              data-affiliate-network={ctaNetwork}
              className={clsx(
                'inline-flex items-center justify-center gap-2',
                'rounded-full px-6 py-3',
                'bg-accent text-sm font-semibold text-white',
                'shadow-md shadow-accent/30',
                'transition-all duration-300 ease-out',
                'hover:bg-accent-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/40',
                'active:translate-y-0 active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              )}
            >
              {ctaLabel}
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
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Stars({ rating, count }: { rating: number; count?: number }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <p
      aria-label={`Rated ${rating} out of 5${count ? ` from ${count} reviews` : ''}`}
      className="flex items-center gap-2 text-sm text-gray-600"
    >
      <span className="inline-flex items-center gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} aria-hidden="true">
            {i + 0.5 < rounded ? '★' : i < rounded ? '★' : '☆'}
          </span>
        ))}
      </span>
      <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
      {count && (
        <span className="text-gray-400">({count.toLocaleString()})</span>
      )}
    </p>
  );
}
