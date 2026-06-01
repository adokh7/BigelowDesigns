import { Fragment } from 'react';
import clsx from 'clsx';

interface TrustStat {
  /** The headline number/figure, e.g. "50,000+" */
  value: string;
  /** The supporting caption, e.g. "monthly readers" */
  label: string;
}

interface TrustStripProps {
  /** Small caps label above the publications row. */
  eyebrow?: string;
  /** Publications shown in editorial masthead style. */
  publications?: string[];
  /** Optional inline stats row below publications. Pass `null` to hide. */
  stats?: TrustStat[] | null;
  /** Visual emphasis. `subtle` = bg-elevated tint, `bare` = no fill. */
  variant?: 'subtle' | 'bare';
  className?: string;
}

const DEFAULT_PUBLICATIONS = [
  'Dwell',
  'Apartment Therapy',
  'Domino',
  'The Spruce',
  'House Beautiful',
];

const DEFAULT_STATS: TrustStat[] = [
  { value: '50,000+', label: 'monthly readers' },
  { value: '600+', label: 'hours of testing' },
  { value: '0', label: 'sponsored reviews' },
];

/**
 * Editorial trust signal band — designed to sit directly below <Hero>.
 *
 * Two stacked elements:
 *   1. "AS FEATURED IN" + masthead-style publication names
 *   2. Quiet hairline divider + inline stats row
 *
 * Renders without scroll-reveal: trust must be visible immediately to
 * reinforce E-E-A-T on first paint, before the user scrolls.
 */
export function TrustStrip({
  eyebrow = 'As featured in',
  publications = DEFAULT_PUBLICATIONS,
  stats = DEFAULT_STATS,
  variant = 'subtle',
  className,
}: TrustStripProps) {
  return (
    <section
      aria-label="Trust signals"
      className={clsx(
        'border-y border-ink-100',
        variant === 'subtle' && 'bg-elevated/40',
        className,
      )}
    >
      <div className="mx-auto max-w-page px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* ── Eyebrow ── */}
        <p className="text-center text-eyebrow text-ink-400">{eyebrow}</p>

        {/* ── Publication masthead row ── */}
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 lg:gap-x-14">
          {publications.map((pub) => (
            <li
              key={pub}
              className={clsx(
                'font-serif font-medium uppercase tracking-[0.18em] text-ink-700',
                'text-[15px] leading-tight sm:text-body-lg',
                // Subtle hover state — feels alive without being interactive
                'transition-colors duration-quick ease-out hover:text-ink-900',
              )}
            >
              {pub}
            </li>
          ))}
        </ul>

        {/* ── Stats row (optional) ── */}
        {stats && stats.length > 0 && (
          <>
            <div
              aria-hidden="true"
              className="mx-auto mt-8 h-px w-16 bg-ink-200"
            />
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-body-sm text-ink-600 sm:gap-x-6">
              {stats.map((stat, idx) => (
                <Fragment key={stat.label}>
                  {idx > 0 && (
                    <li
                      aria-hidden="true"
                      className="hidden text-ink-200 sm:inline"
                    >
                      ·
                    </li>
                  )}
                  <li className="flex items-baseline gap-1.5">
                    <span className="font-serif text-body font-semibold text-ink-900 sm:text-body-lg">
                      {stat.value}
                    </span>
                    <span>{stat.label}</span>
                  </li>
                </Fragment>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
