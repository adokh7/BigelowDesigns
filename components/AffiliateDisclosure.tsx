import Link from 'next/link';

/**
 * AffiliateDisclosure
 *
 * A subtle, editorial-grade disclosure note for use at the top of any
 * article or section that contains affiliate product links.
 *
 * Usage — inside a prose block:
 *   <AffiliateDisclosure />
 *
 * Usage — standalone (outside prose):
 *   <AffiliateDisclosure />
 *
 * The `not-prose` class on the root element prevents Tailwind Typography
 * from overriding the component's own styles when nested inside a
 * `prose` container.
 */
export function AffiliateDisclosure() {
  return (
    <aside
      aria-label="Affiliate disclosure"
      className={[
        'not-prose',
        'flex items-start gap-3',
        'rounded-lg border-l-2 border-accent/35',
        'bg-elevated/50 px-4 py-3',
        'my-8',
      ].join(' ')}
    >
      {/* Info icon — inline SVG, zero JS, perfect a11y */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="mt-0.5 flex-shrink-0 text-accent/60"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>

      <p className="text-[13px] italic leading-relaxed text-ink-400">
        <span className="not-italic font-semibold text-ink-500">
          Editor&apos;s Note:
        </span>{' '}
        We only recommend products we genuinely love. If you purchase through
        our links, we may earn a small affiliate commission — at no extra cost
        to you.{' '}
        <Link
          href="/affiliate-disclosure"
          className="underline underline-offset-2 decoration-ink-300 transition-colors duration-quick hover:text-ink-600 hover:decoration-ink-500"
        >
          Full disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
