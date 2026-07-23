/**
 * BotanicalAccent
 *
 * Muted single-line botanical sprig used as a decorative background
 * accent (cozy-coastal / personal-blog margins). Always:
 *   - `aria-hidden` — purely decorative, never conveys content
 *   - `pointer-events-none` — never intercepts clicks/taps
 *   - absolutely positioned by the caller via `className` — the SVG
 *     itself has no intrinsic layout footprint, so it can never cause
 *     layout shift (CLS)
 *   - stroke-only, `currentColor`, low opacity by default — reads as
 *     texture, not a design element competing with real content
 */

interface BotanicalAccentProps {
  className?: string;
  /** Flip horizontally — lets one asset serve both left and right margins. */
  flip?: boolean;
}

export function BotanicalAccent({ className, flip = false }: BotanicalAccentProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 240"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main stem */}
      <path d="M20 230 C 24 180, 30 140, 60 100 C 82 70, 90 40, 86 10" />
      {/* Leaf pairs, alternating up the stem */}
      <path d="M42 178 C 30 168, 18 168, 8 176 C 18 182, 32 184, 42 178 Z" />
      <path d="M54 140 C 66 128, 78 128, 88 136 C 78 144, 64 146, 54 140 Z" />
      <path d="M66 96 C 54 86, 42 86, 32 94 C 42 100, 56 102, 66 96 Z" />
      <path d="M78 54 C 90 44, 100 44, 108 52 C 98 58, 86 60, 78 54 Z" />
      {/* Small terminal bud */}
      <circle cx="86" cy="10" r="3.5" />
    </svg>
  );
}
