'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import type { ProductRef } from '@/types/article';

interface StickyMiniCompareProps {
  products: ProductRef[];
  /** Section ID to track for show/hide. */
  triggerSelector?: string;
}

/**
 * Desktop-only mini comparison rail that pins after the user scrolls past the
 * main hero, and unpins when the footer comes into view.
 *
 * Mobile: returns null. The full ComparisonTable is already responsive.
 *
 * Motion contract:
 *  - Enter: opacity 0 → 1 + translateY(8 → 0), elegant 420ms, ease-out
 *  - Exit:  opacity 1 → 0 + translateY(0 → 8), smooth 260ms, ease-in
 */
export function StickyMiniCompare({
  products,
  triggerSelector = '#article-hero',
}: StickyMiniCompareProps) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show after the hero is mostly off-screen
    const hero = document.querySelector(triggerSelector);
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-30% 0px 0px 0px' },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [triggerSelector]);

  if (products.length === 0) return null;

  return (
    <div
      ref={sentinelRef}
      aria-hidden={!visible}
      className={clsx(
        'hidden lg:block',
        'fixed bottom-6 right-6 z-sticky w-[340px]',
        'rounded-2xl bg-surface/95 backdrop-blur-md',
        'border border-ink-100 shadow-lg',
        'transition-[opacity,transform] duration-elegant ease-out',
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-2 opacity-0 pointer-events-none',
      )}
    >
      <header className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
        <p className="text-eyebrow text-ink-600">Top picks at a glance</p>
        <span className="text-body-sm text-ink-400">{products.length}</span>
      </header>

      <ol className="max-h-[60vh] divide-y divide-ink-100 overflow-y-auto">
        {products.map((p, idx) => {
          const link = p.affiliateLinks[0];
          return (
            <li key={p.id}>
              <a
                href={`#product-${p.id}`}
                className="group flex items-center gap-3 px-4 py-3 transition-colors duration-quick ease-out hover:bg-elevated/60"
              >
                <span className="font-serif text-body-sm font-semibold text-ink-400 w-4">
                  {idx + 1}
                </span>
                <Image
                  src={p.image}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-sm font-semibold text-ink-900 group-hover:text-accent-600">
                    {p.name}
                  </p>
                  {p.rating && (
                    <p className="text-body-sm text-ink-400">
                      ★ {p.rating.toFixed(1)}
                      {link?.price && (
                        <span className="ml-1">· ${link.price}</span>
                      )}
                    </p>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ol>

      <footer className="border-t border-ink-100 px-4 py-3">
        <a
          href="#comparison"
          className="text-body-sm font-semibold text-accent-600 hover:text-accent-500"
        >
          See full comparison →
        </a>
      </footer>
    </div>
  );
}
