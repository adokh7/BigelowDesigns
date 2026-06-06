import dynamic from 'next/dynamic';

/**
 * Code-split wrapper around the real <Footer />.
 *
 * The footer lives below the fold on every page and carries an interactive
 * NewsletterForm client island. Pulling it behind next/dynamic moves that
 * client chunk out of the route's initial JS payload, shrinking the work
 * the browser has to do during LCP/TBT.
 *
 * No `ssr: false` — we *want* the footer HTML in the server response so
 * crawlers see the link graph and the newsletter CTA on first paint.
 */
export const LazyFooter = dynamic(
  () => import('./Footer').then((m) => m.Footer),
);
