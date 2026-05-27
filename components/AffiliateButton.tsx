import clsx from 'clsx';

interface AffiliateButtonProps {
  href: string;
  network?: string;
  price?: number;
  currency?: 'USD' | 'GBP';
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

const CURRENCY_SYMBOL = { USD: '$', GBP: '£' } as const;

export function AffiliateButton({
  href,
  network = 'Amazon',
  price,
  currency = 'USD',
  variant = 'primary',
  children,
}: AffiliateButtonProps) {
  const label =
    children ??
    (price
      ? `Check ${CURRENCY_SYMBOL[currency]}${price} on ${network}`
      : `View on ${network}`);

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      data-affiliate-network={network}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors',
        variant === 'primary'
          ? 'bg-accent text-white hover:bg-accent-dark'
          : 'border border-ink-200 bg-white text-ink-800 hover:border-accent hover:text-accent-dark',
      )}
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </a>
  );
}
