'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Modal } from '@/components/ui/Modal';
import { AddToCompareButton } from '@/components/AddToCompareButton';
import { track } from '@/lib/analytics';
import type { ProductRef } from '@/types/article';

interface ProductQuickViewProps {
  product: ProductRef | null;
  onClose: () => void;
}

const CURRENCY_SYMBOL = { USD: '$', GBP: '£' } as const;
const REGION_LABEL    = { US: 'United States', UK: 'United Kingdom' } as const;

/**
 * Reusable Quick View modal for any ProductRef.
 *
 * Uses native <dialog> via the <Modal> wrapper, which gives us:
 *   - Focus trap (native browser behavior)
 *   - ESC to close (native)
 *   - Click-outside to close (handled in Modal)
 *   - Proper aria roles
 *   - Inert background
 *
 * Passing `product={null}` closes the modal. The product object stays
 * mounted during the close animation phase so content doesn't flash.
 */
export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  // Fire analytics when modal opens with a product
  useEffect(() => {
    if (product) {
      track('quick_view_open', {
        product_id: product.id,
        product_name: product.name,
        brand: product.brand,
      });
    }
  }, [product]);

  return (
    <Modal
      open={product !== null}
      onClose={onClose}
      title={product?.name ?? 'Product details'}
      hideTitle
      size="lg"
    >
      {product && <QuickViewBody product={product} />}
    </Modal>
  );
}

function QuickViewBody({ product }: { product: ProductRef }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-8">
      {/* Image column */}
      <figure className="relative aspect-square overflow-hidden rounded-xl bg-elevated md:aspect-auto md:self-start">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
        />
      </figure>

      {/* Detail column */}
      <div className="flex flex-col gap-5">
        <header>
          {product.brand && (
            <p className="text-eyebrow text-ink-400">{product.brand}</p>
          )}
          <h2 className="mt-1 font-serif text-h2 text-ink-900 leading-tight">
            {product.name}
          </h2>
          {product.rating !== undefined && (
            <p className="mt-2 flex items-center gap-2 text-body-sm text-ink-600">
              <span aria-hidden="true" className="text-accent">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className="font-semibold text-ink-800">
                {product.rating.toFixed(1)}
              </span>
              {product.reviewCount && (
                <span className="text-ink-400">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              )}
            </p>
          )}
        </header>

        {/* Pros */}
        {product.pros && product.pros.length > 0 && (
          <section>
            <h3 className="text-eyebrow text-success">Why we love it</h3>
            <ul className="mt-2 space-y-1.5 text-body text-ink-800">
              {product.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-success"
                  >
                    ✓
                  </span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Cons */}
        {product.cons && product.cons.length > 0 && (
          <section>
            <h3 className="text-eyebrow text-ink-600">Worth noting</h3>
            <ul className="mt-2 space-y-1.5 text-body text-ink-800">
              {product.cons.map((con) => (
                <li key={con} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-ink-400"
                  >
                    —
                  </span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Affiliate links — region-grouped */}
        <section className="mt-2 border-t border-ink-100 pt-5">
          <h3 className="text-eyebrow text-ink-600">Where to buy</h3>
          <ul className="mt-3 space-y-2">
            {product.affiliateLinks.map((link) => (
              <li
                key={`${link.region}-${link.network}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-ink-100 px-4 py-3 transition-colors duration-quick ease-out hover:border-accent/40 hover:bg-elevated/50"
              >
                <div className="min-w-0">
                  <p className="text-body-sm font-semibold text-ink-900">
                    {link.network}
                  </p>
                  <p className="text-body-sm text-ink-400">
                    {REGION_LABEL[link.region]}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {link.price !== undefined && (
                    <p className="font-serif text-body font-semibold text-ink-900 whitespace-nowrap">
                      {CURRENCY_SYMBOL[link.currency]}
                      {link.price.toLocaleString('en-US')}
                    </p>
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    data-affiliate-network={link.network}
                    className={clsx(
                      'inline-flex items-center gap-1.5 h-10 rounded-md px-4',
                      'bg-accent text-white font-semibold text-body-sm',
                      'transition-all duration-quick ease-out',
                      'hover:bg-accent-600 hover:-translate-y-px hover:shadow-md',
                      'active:translate-y-0 active:scale-[0.98]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                    )}
                  >
                    View
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
              </li>
            ))}
          </ul>
          <p className="mt-3 text-body-sm text-ink-400">
            We earn a small commission on purchases — at no cost to you.
          </p>
        </section>

        {/* Add to compare */}
        <div className="border-t border-ink-100 pt-5">
          <AddToCompareButton
            product={product}
            source="quick_view"
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  );
}
