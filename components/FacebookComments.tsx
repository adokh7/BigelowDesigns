/**
 * FacebookComments
 *
 * Renders the Facebook Comments Plugin under an article.
 *
 * How this works:
 *   1. The Facebook SDK is loaded once globally (see app/layout.tsx —
 *      it ships with `xfbml=1` so the SDK auto-scans the DOM for
 *      `.fb-comments` elements once it finishes downloading).
 *   2. This component emits the static markup the SDK looks for —
 *      `data-href` is the canonical URL Facebook uses to key the
 *      conversation thread, and `data-width="100%"` makes the
 *      embed fluid across viewports.
 *   3. The first time a visitor reaches a fresh article URL, the
 *      SDK boots an iframe from facebook.com and renders the
 *      thread inside it.
 *
 * Server component on purpose:
 *   - The markup is fully static (no useState / refs / handlers).
 *   - Rendering server-side means the `fb-comments` div is in the
 *     SSR'd HTML on first byte, so the SDK can find it on its
 *     first XFBML scan after `lazyOnload` fires — no flash, no
 *     hydration round-trip needed.
 *
 * Required: the URL passed in must be **publicly crawlable**.
 * Facebook fetches OG metadata from the URL to key the thread.
 * The site already emits a full og: tag set per article, so this
 * works out of the box for every published piece.
 */

import type { CSSProperties } from 'react';

export interface FacebookCommentsProps {
  /** Absolute, canonical URL of the article (e.g. https://www.bigelowdesigns.com/blog/foo). */
  url: string;
  /**
   * How many comments to display before "View more comments" appears.
   * Default 5 matches the Facebook plugin default.
   */
  numPosts?: number;
  /**
   * Comment thread colour scheme. The site is light-themed across
   * every page so 'light' is the right default; documented here so
   * a future dark-mode launch only needs to flip this one prop.
   */
  colorScheme?: 'light' | 'dark';
}

export function FacebookComments({
  url,
  numPosts = 5,
  colorScheme = 'light',
}: FacebookCommentsProps) {
  // The `fb-comments` div is what the SDK looks for. The wrapping
  // <section> handles spacing + the editorial section header so the
  // plugin slots cleanly into the article typography.
  const fluidWidth: CSSProperties = { width: '100%' };

  return (
    <section
      aria-label="Reader comments"
      className="mx-auto mt-20 max-w-3xl border-t border-ink-100 px-4 pt-12 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
          Join the conversation
        </p>
        <h2 className="mt-2 font-serif text-h2 text-ink-900">
          Comments
        </h2>
        <p className="mt-2 text-body-sm text-ink-500">
          Thoughts, questions, or your own experience with this piece? Sign in
          with your Facebook profile to reply.
        </p>
      </div>

      <div
        className="fb-comments"
        data-href={url}
        data-width="100%"
        data-numposts={numPosts}
        data-colorscheme={colorScheme}
        data-order-by="reverse_time"
        style={fluidWidth}
      />
    </section>
  );
}
