'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

/**
 * SmoothScroll
 *
 * Site-wide luxurious smooth scrolling via Lenis (~4 kB gzipped — the
 * maintained successor to @studio-freight/react-lenis, same author).
 *
 * Why Lenis and not scroll-behavior or a heavier library:
 *   - It interpolates window scroll on a rAF loop using transform math
 *     only — no layout thrash, no scroll-jacking of native semantics
 *     (keyboard, anchors, find-in-page all keep working).
 *   - `root` mode hooks the window scroller, so no extra wrapper div,
 *     no nested scroll containers, no CLS.
 *
 * Tuning:
 *   - lerp 0.1 → the slow, weighted "editorial magazine" glide.
 *   - wheelMultiplier 1 → respect the user's hardware scroll speed.
 *
 * Accessibility:
 *   - If the visitor has `prefers-reduced-motion: reduce`, we skip
 *     Lenis entirely and return native scrolling. (Lenis does not do
 *     this automatically; the global CSS kill-switch only handles CSS
 *     transitions, not JS-driven scroll interpolation.)
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
