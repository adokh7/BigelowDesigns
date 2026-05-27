'use client';

import { useEffect } from 'react';
import { initAffiliateTracking } from '@/lib/analytics';

/**
 * Mounts the global affiliate-click delegation listener.
 *
 * Renders nothing. Placed inside <CompareProvider> in the root layout
 * so a single document-level listener covers every page and every
 * affiliate link — including those inside MDX, modals, and dynamic
 * components.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const cleanup = initAffiliateTracking();
    return cleanup;
  }, []);

  return null;
}
