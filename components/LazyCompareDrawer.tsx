'use client';

import dynamic from 'next/dynamic';

/**
 * Client-side dynamic import of <CompareDrawer />.
 *
 * The drawer is below-the-fold *and* invisible until the user adds at least
 * one product to compare. Pulling it out of the initial bundle removes the
 * Image + clsx + CompareContext consumer code from the critical JS path
 * served to first-time visitors.
 *
 * ssr:false is safe here — the real component already early-returns until
 * its hydration sentinel flips, so there is nothing to render server-side.
 */
export const LazyCompareDrawer = dynamic(
  () => import('./CompareDrawer').then((m) => m.CompareDrawer),
  { ssr: false },
);
