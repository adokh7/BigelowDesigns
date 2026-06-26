'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
// NOTE: do NOT import `resolveImage` from '@/lib/image-utils' here.
// This is a client component, and image-utils uses node:fs/node:path
// (server-only) — pulling it into the client bundle breaks the build
// (UnhandledSchemeError on Vercel). The `onError` handler below already
// covers missing/broken images at runtime, which is strictly better
// than a build-time fs existence check anyway.

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

  const Component = ctaHref ? 'a' : 'article';
  const wrapperProps = ctaHref
    ? {
        href: ctaHref,
        target: '_blank',
        rel: 'sponsored nofollow noopener',
        'data-affiliate-network': ctaNetwork,
      }
    : {};

  return (
    <Component
      {...wrapperProps}
      className={clsx(
        // Core card surface — premium feel, conversion-focused
        'group relative my-6 overflow-hidden rounded-xl bg-white border border-neutral-100',
        'shadow-sm hover:shadow-md transition-all duration-300 ease-out',
        'focus-within:ring-2 focus-within:ring-neutral-900 focus-within:ring-offset-2',
        // Layout: stacked on mobile, side-by-side on desktop (when responsive)
        isHorizontal ? 'flex flex-col md:flex-row' : 'flex flex-col h-full',
      )}
    >
      {badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-600 shadow-sm backdrop-blur">
          {badge}
        </span>
      )}

      {/* ── Image plate ─────────────────────────────────────────────
          Subtle off-white background (bg-neutral-50) so product shots
          on white backgrounds read as floating objects. aspect-square
          w-full keeps images contained within a clean square container. */}
      <div
        className={clsx(
          'relative overflow-hidden bg-neutral-50 flex items-center justify-center aspect-square w-full',
          isHorizontal && 'md:w-2/5 md:shrink-0 md:self-stretch md:aspect-auto',
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
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes={
              isHorizontal
                ? '(max-width: 768px) 100vw, 360px'
                : '(max-width: 768px) 100vw, 480px'
            }
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* ── Copy + CTA column ─────────────────────────────────────── */}
      <div
        className={clsx(
          'flex flex-col flex-grow gap-3 p-6',
          isHorizontal && 'md:flex-1 md:gap-4 md:p-8',
        )}
      >
        <div>
          {brand && (
            <p className="text-xs tracking-widest text-neutral-400 font-medium uppercase">
              {brand}
            </p>
          )}
          <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-800">
            {displayName}
          </h3>
        </div>

        {description && (
          <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">
            {description}
          </p>
        )}

        {rating && <Stars rating={rating} count={reviewCount} />}

        {/* ── Price + CTA row — pinned to bottom of the column ── */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-3">
          {displayPrice && (
            <p className="font-serif text-2xl font-bold leading-none tracking-tight text-neutral-900">
              {displayPrice}
            </p>
          )}

          {ctaHref && (
            <span
              className={clsx(
                'inline-block text-center text-white bg-neutral-900 group-hover:bg-neutral-800 text-sm font-medium py-2.5 px-4 rounded-lg transition-colors',
                !displayPrice && 'w-full',
              )}
            >
              {ctaLabel}
            </span>
          )}
        </div>
      </div>
    </Component>
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
