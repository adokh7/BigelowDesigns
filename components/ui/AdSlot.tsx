/**
 * AdSlot — placeholder for Google AdSense units.
 *
 * To activate a real ad:
 *   1. Add your AdSense <script> tag to app/layout.tsx
 *   2. Replace the inner placeholder <div> with the AdSense <ins> snippet
 *      (keeping the "Advertisement" label and outer wrapper for GDPR compliance)
 *
 * AdSense policy requires a visible "Advertisement" label on every unit.
 */

import clsx from 'clsx';

type AdVariant = 'leaderboard' | 'rectangle' | 'responsive';

// Standard IAB ad sizes
const VARIANTS: Record<AdVariant, { label: string; className: string }> = {
  leaderboard: {
    label: '728 × 90',
    // Horizontally centered, capped at leaderboard width
    className: 'h-[90px] w-full max-w-[728px]',
  },
  rectangle: {
    label: '336 × 280',
    className: 'h-[280px] w-full max-w-[336px]',
  },
  responsive: {
    label: 'Responsive',
    // Collapses to 60 px on mobile, standard banner height on sm+
    className: 'h-[60px] w-full sm:h-[90px]',
  },
};

interface AdSlotProps {
  variant?: AdVariant;
  /** Extra classes on the outer wrapper (e.g. margins) */
  className?: string;
  /** Whether to centre the slot or leave it left-aligned */
  align?: 'center' | 'start';
}

export function AdSlot({
  variant = 'responsive',
  className,
  align = 'center',
}: AdSlotProps) {
  const v = VARIANTS[variant];

  return (
    <div
      className={clsx(
        'flex flex-col',
        align === 'center' ? 'items-center' : 'items-start',
        className,
      )}
      aria-label="Advertisement"
    >
      {/* Required "Advertisement" label — keep even with real ads */}
      <p className="mb-1.5 select-none text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-300">
        Advertisement
      </p>

      {/*
       * ── PLACEHOLDER ──────────────────────────────────────────
       * Replace this <div> with your AdSense <ins> element.
       * Keep the outer wrapper and the label above.
       * ─────────────────────────────────────────────────────────
       */}
      <div
        className={clsx(
          v.className,
          'flex items-center justify-center',
          'rounded border border-dashed border-ink-100 bg-elevated/40',
        )}
      >
        <p className="select-none text-[11px] text-ink-300">
          AdSense · {v.label}
        </p>
      </div>
    </div>
  );
}
