'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCompare } from '@/contexts/CompareContext';

/**
 * Floating bottom drawer showing currently-compared products.
 *
 * Hidden when:
 *   - Cart is empty
 *   - User is on /compare (would be redundant)
 *   - Pre-hydration (prevents SSR mismatch + flicker)
 */
export function CompareDrawer() {
  const { items, hydrated, remove, clear, max } = useCompare();
  const pathname = usePathname();

  if (!hydrated || items.length === 0 || pathname === '/compare') return null;

  return (
    <div
      role="region"
      aria-label="Compare drawer"
      className={clsx(
        'fixed left-1/2 z-sticky w-[min(96vw,720px)] -translate-x-1/2',
        // iOS safe-area: env() returns 0 on non-iOS devices, so this is
        // equivalent to bottom-4 / md:bottom-6 on Android/desktop.
        'bottom-[calc(1rem+env(safe-area-inset-bottom))]',
        'md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]',
        'rounded-2xl border border-ink-100 bg-surface/95 shadow-lg backdrop-blur-md',
        'animate-fade-rise',
      )}
    >
      <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
        {/* Thumbnails */}
        <ul className="flex -space-x-2">
          {items.map((p) => (
            <li key={p.id} className="relative">
              <Image
                src={p.image}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-surface object-cover"
              />
              <button
                type="button"
                onClick={() => remove(p.id)}
                aria-label={`Remove ${p.name}`}
                className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full border border-surface bg-ink-900 text-[10px] font-bold text-white opacity-0 transition-opacity duration-quick ease-out hover:bg-danger focus-visible:opacity-100 group-hover:opacity-100 sm:flex"
              >
                ×
              </button>
            </li>
          ))}
          {/* Empty slots */}
          {Array.from({ length: max - items.length }).map((_, i) => (
            <li
              key={`empty-${i}`}
              aria-hidden="true"
              className="h-10 w-10 rounded-full border-2 border-dashed border-ink-200 bg-elevated/50"
            />
          ))}
        </ul>

        {/* Status */}
        <div className="min-w-0 flex-1">
          <p className="font-serif text-body font-semibold text-ink-900">
            {items.length} of {max} compared
          </p>
          <button
            type="button"
            onClick={clear}
            className="text-body-sm text-ink-400 underline-offset-2 transition-colors duration-quick ease-out hover:text-danger hover:underline"
          >
            Clear all
          </button>
        </div>

        {/* CTA */}
        <Link
          href="/compare"
          className={clsx(
            'inline-flex items-center justify-center gap-1.5 h-11 rounded-md px-4 sm:px-5',
            'bg-accent text-white font-semibold text-body-sm',
            'transition-all duration-quick ease-out',
            'hover:bg-accent-600 hover:-translate-y-px hover:shadow-md',
            'active:translate-y-0 active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          )}
        >
          Compare
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
        </Link>
      </div>
    </div>
  );
}
