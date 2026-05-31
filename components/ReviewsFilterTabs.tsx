'use client';

import { useState } from 'react';

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

/**
 * ReviewsFilterTabs
 *
 * Client component: tracks the active category with useState.
 * Extracted from the Reviews page so the parent can remain a
 * server component (getArticlesByCategory reads from the filesystem).
 *
 * Active  → bg-[#FDF3EE]  text-[#C25E29]  font-semibold
 * Hover   → bg-[#FDF3EE]/50  text-[#C25E29]  (no default gray)
 * Both transitions are smooth via duration-quick.
 */
export function ReviewsFilterTabs() {
  const [active, setActive] = useState<string>('All');

  return (
    <div className="border-b border-ink-100 bg-surface">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div
          className="flex gap-1 overflow-x-auto pb-px pt-1 scrollbar-none"
          role="tablist"
          aria-label="Filter reviews by category"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = active === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab)}
                className={[
                  'flex-shrink-0 rounded-md px-4 py-2.5 text-body-sm',
                  'transition-colors duration-quick',
                  isActive
                    ? 'bg-[#FDF3EE] font-semibold text-[#C25E29]'
                    : 'font-medium text-ink-600 hover:bg-[#FDF3EE]/50 hover:text-[#C25E29]',
                ].join(' ')}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
