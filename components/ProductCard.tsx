import Image from 'next/image';
import clsx from 'clsx';

interface ProductCardProps {
  image: { src: string; alt: string };
  brand?: string;
  name: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  price?: { amount: number; currency: 'USD' | 'GBP' };
  cta: { label?: string; href: string; network?: string };
  /** "stacked" forces vertical even on desktop. Default is responsive. */
  variant?: 'responsive' | 'stacked';
  badge?: string;
}

const CURRENCY_SYMBOL = { USD: '$', GBP: '£' } as const;

export function ProductCard({
  image,
  brand,
  name,
  description,
  rating,
  reviewCount,
  price,
  cta,
  variant = 'responsive',
  badge,
}: ProductCardProps) {
  const isHorizontal = variant === 'responsive';

  return (
    <article
      className={clsx(
        'group relative overflow-hidden rounded-xl border border-ink-100 bg-surface',
        'transition-all duration-smooth ease-out',
        'hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-md',
        'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2',
        isHorizontal && 'flex flex-col md:flex-row',
      )}
    >
      {badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-canvas/95 px-3 py-1 text-eyebrow text-accent-600 shadow-sm backdrop-blur">
          {badge}
        </span>
      )}

      <div
        className={clsx(
          'relative overflow-hidden bg-elevated',
          isHorizontal
            ? 'aspect-[4/3] md:aspect-auto md:w-2/5 md:shrink-0'
            : 'aspect-[4/3]',
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={isHorizontal ? '(max-width: 768px) 100vw, 320px' : '(max-width: 768px) 100vw, 400px'}
          className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div
        className={clsx(
          'flex flex-col gap-3 p-6',
          isHorizontal && 'md:flex-1 md:p-8',
        )}
      >
        <div>
          {brand && (
            <p className="text-eyebrow text-ink-400">{brand}</p>
          )}
          <h3 className="mt-1 font-serif text-h3 text-ink-900 leading-snug">
            {name}
          </h3>
        </div>

        <p className="text-body text-ink-600 line-clamp-3">{description}</p>

        {rating && (
          <Stars rating={rating} count={reviewCount} />
        )}

        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-3 pt-2">
          {price && (
            <p className="font-serif text-2xl font-semibold text-ink-900">
              {CURRENCY_SYMBOL[price.currency]}
              {price.amount.toLocaleString('en-US')}
            </p>
          )}

          <a
            href={cta.href}
            target="_blank"
            rel="sponsored nofollow noopener"
            data-affiliate-network={cta.network}
            className={clsx(
              'inline-flex items-center justify-center gap-2',
              'h-11 rounded-md px-5',
              'bg-accent font-sans text-body font-semibold text-white',
              'transition-all duration-quick ease-out',
              'hover:bg-accent-600 hover:-translate-y-px hover:shadow-md',
              'active:translate-y-0 active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            )}
          >
            {cta.label ?? 'Shop Now'}
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
              className="transition-transform duration-quick ease-out group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
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
      className="flex items-center gap-2 text-body-sm text-ink-600"
    >
      <span className="inline-flex items-center gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} aria-hidden="true">
            {i + 0.5 < rounded ? '★' : i < rounded ? '★' : '☆'}
          </span>
        ))}
      </span>
      <span className="font-semibold text-ink-800">{rating.toFixed(1)}</span>
      {count && (
        <span className="text-ink-400">({count.toLocaleString()})</span>
      )}
    </p>
  );
}
