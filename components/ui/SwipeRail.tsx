'use client';

import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface SwipeRailProps {
  children: React.ReactNode;
  /** Show desktop arrow controls. Default true. */
  arrows?: boolean;
  /** Children width per breakpoint. Default '280px'. */
  itemWidth?: string;
  ariaLabel: string;
  className?: string;
}

/**
 * Native scroll-snap carousel. Zero JS for the gesture itself — the browser
 * does all the swipe work. JS only powers the optional desktop arrows and
 * the scroll-position indicator dots.
 *
 * Why not Framer / Embla / Keen-slider?
 *  - No 30KB+ dependency for what CSS does natively
 *  - Better perf — no JS on touch events
 *  - Built-in inertia, momentum scroll, snap-back
 */
export function SwipeRail({
  children,
  arrows = true,
  itemWidth = '280px',
  ariaLabel,
  className,
}: SwipeRailProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState({ canPrev: false, canNext: true });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = rail;
      setProgress({
        canPrev: scrollLeft > 4,
        canNext: scrollLeft + clientWidth < scrollWidth - 4,
      });
    };
    update();
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      rail.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  function scrollBy(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    const itemWidthPx = rail.firstElementChild?.clientWidth ?? 280;
    rail.scrollBy({
      left: (itemWidthPx + 16) * direction,
      behavior: 'smooth',
    });
  }

  return (
    <div className={clsx('relative', className)}>
      <ul
        ref={railRef}
        aria-label={ariaLabel}
        className="swipe-rail px-4 sm:px-6 lg:px-8"
        style={{ ['--item-w' as string]: itemWidth }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <li
                key={i}
                style={{ flex: `0 0 ${itemWidth}` }}
                className="snap-start"
              >
                {child}
              </li>
            ))
          : (
            <li style={{ flex: `0 0 ${itemWidth}` }} className="snap-start">
              {children}
            </li>
          )}
      </ul>

      {arrows && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-2 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!progress.canPrev}
            aria-label="Previous"
            className={clsx(
              'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full',
              'bg-surface/95 backdrop-blur shadow-md text-ink-800',
              'transition-all duration-quick ease-out',
              'hover:bg-surface hover:shadow-lg active:scale-95',
              'disabled:opacity-0 disabled:pointer-events-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!progress.canNext}
            aria-label="Next"
            className={clsx(
              'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full',
              'bg-surface/95 backdrop-blur shadow-md text-ink-800',
              'transition-all duration-quick ease-out',
              'hover:bg-surface hover:shadow-lg active:scale-95',
              'disabled:opacity-0 disabled:pointer-events-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
