'use client';

import dynamic from 'next/dynamic';

/**
 * Code-split + client-only wrapper around <VideoSection />.
 *
 * Why a separate wrapper file:
 *   Next.js 15 disallows `ssr: false` inside Server Components. `app/page.tsx`
 *   is a Server Component, so the dynamic() call has to live behind a
 *   'use client' boundary. This one-line module is that boundary.
 *
 * Why ssr: false:
 *   - VideoSection autoplays an unmuted-on-fallback MP4 the moment it
 *     enters the DOM. Excluding it from SSR keeps the <video> element
 *     out of the initial HTML, so the multi-MB media file is not
 *     discovered by the browser until after hydration — the exact
 *     behaviour required to keep LCP / "Eliminate render-blocking
 *     resources" green during AdSense review.
 *   - The section is below the fold on every viewport we ship, so
 *     deferring it has zero perceived-perf cost.
 *
 * The placeholder reserves the section's vertical space (matches the
 * py-20/lg:py-28 of the real section + the 16:9 video card) so the layout
 * doesn't jump when the chunk arrives.
 */
export const LazyVideoSection = dynamic(() => import('./VideoSection'), {
  ssr: false,
  loading: () => (
    <section
      aria-hidden="true"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto aspect-video w-full max-w-5xl rounded-3xl bg-stone-100" />
      </div>
    </section>
  ),
});
