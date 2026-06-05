import Image from 'next/image';
import clsx from 'clsx';
import { resolveImage } from '@/lib/image-utils';

/**
 * AffiliateProductGrid
 *
 * Drop-in "Get The Look" / "Shop The Trend" section for MDX articles.
 *
 * Renders an editorial section heading + a responsive grid of 2-3
 * contextual product cards with affiliate links. Designed to match the
 * site's premium aesthetic (brand-coloured CTAs, soft shadows, serif
 * headings, generous spacing).
 *
 * Usage inside .mdx:
 *
 *   <AffiliateProductGrid
 *     heading="Get The Look"
 *     caption="Hand-picked pieces to bring this aesthetic home."
 *     products={[
 *       {
 *         name: "Low Profile Walnut Bed Frame",
 *         brand: "Article",
 *         description: "A 9-inch platform bed in solid walnut...",
 *         image: "/japandi-bedroom.webp",
 *         price: { amount: 1099, currency: "USD" },
 *         href: "https://amazon.com/dp/B08X?tag=bigelow-20",
 *         network: "amazon",
 *       },
 *       ...
 *     ]}
 *   />
 *
 * All affiliate links open in a new tab with `rel="sponsored nofollow
 * noopener"` for FTC compliance + SEO best practice.
 */

type Currency = 'USD' | 'GBP';

type AffiliateProduct = {
  name:         string;
  brand?:       string;
  description:  string;
  image:        string;
  imageAlt?:    string;
  price?:       { amount: number; currency: Currency };
  href:         string;
  network?:     string;
  badge?:       string;
};

interface AffiliateProductGridProps {
  heading?:  string;
  caption?:  string;
  products:  AffiliateProduct[];
}

const CURRENCY_SYMBOL: Record<Currency, string> = { USD: '$', GBP: '£' };

export function AffiliateProductGrid({
  heading = 'Get The Look',
  caption = 'A few hand-picked pieces to bring this aesthetic into your own home.',
  products = [],
}: AffiliateProductGridProps) {
  // Render nothing if no products were supplied — keeps MDX safe even if
  // an author forgets the prop, and avoids server-side crashes when the
  // RSC serializer is comparing props.
  if (!Array.isArray(products) || products.length === 0) return null;

  // Choose column count based on how many products were provided.
  const gridCols =
    products.length === 2
      ? 'sm:grid-cols-2'
      : products.length >= 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      aria-labelledby="shop-the-look-heading"
      className="not-prose my-14 lg:my-20"
    >
      {/* ── Editorial header ──────────────────────────────────── */}
      <div className="mb-8 max-w-2xl">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          Shop The Look
        </p>
        <h2
          id="shop-the-look-heading"
          className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl"
        >
          {heading}
        </h2>
        {caption && (
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            {caption}
          </p>
        )}

        {/* Inline disclosure pill — FTC-compliant, low visual weight */}
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1.5 text-[11px] leading-relaxed text-stone-500">
          <svg
            width="11" height="11" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
            className="flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Some links may earn us a commission — at no extra cost to you.
        </p>
      </div>

      {/* ── Product grid ─────────────────────────────────────── */}
      <div className={clsx('grid gap-6 lg:gap-8', gridCols)}>
        {products.map((product, idx) => (
          <ProductGridCard key={`${product.name}-${idx}`} product={product} />
        ))}
      </div>
    </section>
  );
}

// ─── Individual card ──────────────────────────────────────────
function ProductGridCard({ product }: { product: AffiliateProduct }) {
  const affiliateProps = {
    href:        product.href,
    target:      '_blank' as const,
    rel:         'sponsored nofollow noopener' as const,
    'data-affiliate-network': product.network,
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm shadow-stone-900/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/10">

      {/* Image */}
      <a
        {...affiliateProps}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden bg-stone-100"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={resolveImage(product.image)}
            alt={product.imageAlt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand shadow-sm backdrop-blur">
              {product.badge}
            </span>
          )}
        </div>
      </a>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-5">
        {product.brand && (
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
            {product.brand}
          </p>
        )}

        <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-stone-900">
          <a
            {...affiliateProps}
            className="transition-colors duration-300 hover:text-brand"
          >
            {product.name}
          </a>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">
          {product.description}
        </p>

        {/* Footer: price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {product.price ? (
            <p className="font-serif text-xl font-semibold text-stone-900">
              {CURRENCY_SYMBOL[product.price.currency]}
              {product.price.amount.toLocaleString('en-US')}
            </p>
          ) : (
            <span aria-hidden="true" className="text-xs font-medium text-stone-400">
              See price
            </span>
          )}

          <a
            {...affiliateProps}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Shop
            <svg
              width="11" height="11" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
