'use client';

import { useState } from 'react';
import clsx from 'clsx';

// ─── Category tabs ───────────────────────────────────────────
const FILTER_TABS = [
  'All',
  'Sofas',
  'Beds',
  'Dining',
  'Lighting',
  'Storage',
  'Outdoor',
  'Office',
] as const;

type FilterTab = (typeof FILTER_TABS)[number];

/**
 * ReviewsFilterTabs
 *
 * Client component: tracks `activeCategory` with useState.
 * Extracted from the Reviews page so the parent can stay a
 * static server component (getArticlesByCategory reads the FS).
 *
 * Active   → bg-stone-200 text-stone-900 font-medium
 * Inactive → text-stone-500 hover:bg-stone-100 transition-colors
 *
 * When real review articles exist, the parent page can accept
 * `activeCategory` as a prop (or lift state higher) to filter
 * the article grid. For now the tabs are purely visual.
 */
export function ReviewsFilterTabs() {
  const [activeCategory, setActiveCategory] = useState<FilterTab>('All');

  return (
    <div className="sticky top-[var(--header-height,64px)] z-10 border-b border-ink-100 bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        {/* Scrollable tab row — hidden scrollbar on all browsers */}
        <div
          role="tablist"
          aria-label="Filter reviews by category"
          className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab)}
                className={clsx(
                  // Base
                  'flex-shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm',
                  'transition-colors duration-150',
                  // Active state
                  isActive && 'bg-stone-200 font-medium text-stone-900',
                  // Inactive state
                  !isActive && 'font-normal text-stone-500 hover:bg-stone-100',
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Active category label — subtle confirmation below the tabs */}
        {activeCategory !== 'All' && (
          <p className="pb-2 text-[11px] tracking-wide text-stone-400">
            Showing: <span className="font-medium text-stone-600">{activeCategory}</span>
            {' '}— reviews coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
