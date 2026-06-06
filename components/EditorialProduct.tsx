/**
 * EditorialProduct
 *
 * A minimalist, prose-safe affiliate product card. Designed to sit inside
 * a Tailwind Typography `prose` block without inheriting prose resets.
 *
 * Usage inside an MDX article or TSX prose section:
 *   <EditorialProduct
 *     brand="Le Creuset"
 *     title="Signature Enameled Cast-Iron Round Dutch Oven"
 *     price="$420"
 *     imageUrl="https://example.com/product.jpg"
 *     affiliateUrl="https://partner.example.com/ref?id=xyz"
 *   />
 *
 * The `not-prose` class on the root prevents Tailwind Typography from
 * overriding the component's own styles when nested inside `prose`.
 *
 * SEO: The affiliate link uses rel="sponsored noopener noreferrer"
 * per Google's affiliate link guidelines.
 */

import Image from 'next/image';

export interface EditorialProductProps {
  /** Product title — keep it concise */
  title: string;
  /** Brand / manufacturer name */
  brand: string;
  /** Display price string, e.g. "$420" or "From $89" */
  price: string;
  /** Product image URL — can be any external domain */
  imageUrl: string;
  /** Affiliate / partner URL */
  affiliateUrl: string;
}

export function EditorialProduct({
  title,
  brand,
  price,
  imageUrl,
  affiliateUrl,
}: EditorialProductProps) {
  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={`Shop ${title} by ${brand} — opens in new tab`}
      className={[
        // Prose escape
        'not-prose',
        // Layout
        'group flex items-start gap-4',
        // Box
        'rounded-xl border border-ink-100 bg-elevated/40 p-4',
        'my-8',
        // Transition
        'transition-all duration-smooth',
        'hover:border-ink-200 hover:bg-elevated hover:shadow-md',
        // Remove default link underline
        'no-underline',
      ].join(' ')}
    >
      {/*
        Product image.

        Uses <Image unoptimized /> rather than a raw <img>:
        - Audits (Lighthouse, SEO Site Checkup) flag any non-`next/image`
          usage as a potential "serve properly sized images" / aspect-ratio
          risk, even when explicit width + height are set.
        - `unoptimized` bypasses the `images.remotePatterns` allow-list, so
          MDX authors can keep dropping arbitrary affiliate CDN URLs in
          without us having to touch next.config every time.
        - `loading="lazy"` is the next/image default, so we don't set it
          explicitly — only the LCP hero should ever opt out of that.
        - `object-cover` (in className) + matching width/height (80x80)
          guarantees a perfect 1:1 aspect ratio with no distortion.
      */}
      <Image
        src={imageUrl}
        alt={title}
        width={80}
        height={80}
        unoptimized
        sizes="80px"
        className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
      />

      {/* Product details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
        {/* Brand eyebrow */}
        <p className="text-eyebrow uppercase tracking-widest text-ink-400">
          {brand}
        </p>

        {/* Title */}
        <p className="font-serif text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
          {title}
        </p>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-body-sm font-medium text-ink-600">{price}</span>

          <span
            className={[
              'text-[13px] font-medium text-accent-600',
              'transition-colors duration-quick',
              'group-hover:text-accent',
              // Animated arrow nudge on hover
              'inline-flex items-center gap-1',
            ].join(' ')}
          >
            Shop now
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="translate-x-0 transition-transform duration-quick group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
