/**
 * Provider-agnostic analytics dispatcher.
 *
 * Fires the event to every detected provider:
 *   - Plausible          (window.plausible)
 *   - Vercel Analytics   (window.va)
 *   - Google Tag Manager (window.dataLayer)
 *   - Console log        (dev only)
 *
 * Never throws — analytics must never break the page.
 */

export type AnalyticsEvent =
  | 'compare_add'
  | 'compare_remove'
  | 'compare_clear'
  | 'compare_view'
  | 'affiliate_click'
  | 'quick_view_open'
  | 'estimator_complete'
  | 'newsletter_subscribe'
  | 'search_query'
  | 'article_scroll_complete';

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: EventProps; callback?: () => void }) => void;
    dataLayer?: Record<string, unknown>[];
    va?: (event: 'event', props: { name: string } & EventProps) => void;
  }
}

function safe<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}

export function track(event: AnalyticsEvent, props?: EventProps): void {
  if (typeof window === 'undefined') return;

  // Strip undefined values (avoid sending "undefined" strings)
  const clean: EventProps = {};
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v !== undefined) clean[k] = v;
    }
  }

  safe(() => window.plausible?.(event, Object.keys(clean).length ? { props: clean } : undefined));
  safe(() => window.va?.('event', { name: event, ...clean }));
  safe(() => window.dataLayer?.push({ event, ...clean }));

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${event}`, clean);
  }
}

/**
 * Global affiliate-link click tracker.
 *
 * Attaches one delegated listener to the document. Any <a> with
 * `data-affiliate-network` triggers a track('affiliate_click') call,
 * including links rendered via dangerouslySetInnerHTML or third-party
 * MDX content.
 *
 * Returns a cleanup function. Call once in a root client component.
 */
export function initAffiliateTracking(): () => void {
  if (typeof window === 'undefined') return () => {};

  function handler(e: MouseEvent) {
    const target = (e.target as Element | null)?.closest<HTMLAnchorElement>(
      'a[data-affiliate-network]',
    );
    if (!target) return;
    track('affiliate_click', {
      network: target.dataset.affiliateNetwork ?? 'unknown',
      href: target.href,
      product_id: target.dataset.productId,
      placement: target.dataset.placement ?? 'inline',
    });
  }

  document.addEventListener('click', handler, { passive: true, capture: true });
  return () => document.removeEventListener('click', handler, true);
}
