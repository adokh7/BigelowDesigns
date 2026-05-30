/**
 * BrandLogo
 *
 * Renders the Bigelow Interior Design brand mark using the Next.js
 * <Image /> component, sourced from the public/ folder.
 *
 * Why public/ and not components/?
 * Static assets served directly by Next.js (images, fonts, favicons) must
 * live under public/. Files inside components/ are bundled by webpack and
 * are never accessible at a stable URL. Placing a binary asset inside
 * components/ would prevent it from being:
 *   • served at /bigelow-interior-design-logo.webp
 *   • referenced in Organisation JSON-LD schema
 *   • cached correctly by CDN / Next.js Image optimisation
 *
 * Usage:
 *   <BrandLogo />                        — header (default, priority)
 *   <BrandLogo variant="lg" theme="dark" /> — footer (larger, white)
 *   <BrandLogo variant="sm" />           — compact contexts
 *
 * Props:
 *   variant  — controls rendered height ('sm' | 'default' | 'lg')
 *   theme    — 'auto' keeps original colours; 'dark' inverts to white
 *              via CSS filter (works because the logo is dark-on-alpha)
 *   priority — forwarded to <Image priority />; set true for above-the-fold
 *   className — applied to the outer <span> wrapper
 */

import Image from 'next/image';
import clsx from 'clsx';

// ─── Types ────────────────────────────────────────────────────
type Variant = 'sm' | 'default' | 'lg';
type Theme   = 'auto' | 'dark';

interface BrandLogoProps {
  variant?:  Variant;
  theme?:    Theme;
  priority?: boolean;
  className?: string;
}

// ─── Logo source ──────────────────────────────────────────────
/** Absolute path from the public/ root — becomes /bigelow-interior-design-logo.webp */
const LOGO_SRC = '/bigelow-interior-design-logo.webp';

/**
 * Intrinsic pixel dimensions of the source file (612 × 408, 3 : 2).
 * Next.js Image uses these for aspect-ratio calculation and to build
 * the optimised srcset. They do NOT control the rendered display size —
 * that is governed by the height / width values in `DISPLAY_HEIGHT` below.
 */
const LOGO_INTRINSIC_W = 612;
const LOGO_INTRINSIC_H = 408;

// ─── Rendered size scale ──────────────────────────────────────
/**
 * Display WIDTH (px) for each variant — height follows automatically
 * via `height: 'auto'` so the 3 : 2 intrinsic ratio is always preserved
 * with zero layout shift.
 *
 * Why width-first (not height-first)?
 * Logos are perceived and judged by their horizontal footprint. Specifying
 * the width lets you match an explicit design spec ("the logo should be
 * ~160 px wide in the header") rather than reasoning backwards from a
 * height value. The corresponding rendered heights at 3 : 2 are noted below.
 *
 * sm      — 110 px wide  (~73 px tall)   compact / scrolled header state
 * default — 160 px wide  (~107 px tall)  full header (top of page)
 * lg      — 200 px wide  (~133 px tall)  footer brand column, hero lockups
 */
const DISPLAY_WIDTH: Record<Variant, number> = {
  sm:      110,
  default: 160,
  lg:      200,
};

// ─── Component ────────────────────────────────────────────────
export function BrandLogo({
  variant  = 'default',
  theme    = 'auto',
  priority = false,
  className,
}: BrandLogoProps) {
  const w = DISPLAY_WIDTH[variant];

  return (
    /*
     * The <span> wrapper with lineHeight: 0 removes the phantom
     * descender space browsers add to inline-block images, keeping
     * the logo pixel-perfect inside flex containers.
     */
    <span
      className={clsx('inline-flex items-center', className)}
      style={{ lineHeight: 0 }}
    >
      <Image
        src={LOGO_SRC}
        alt="Bigelow Interior Design"
        /**
         * Intrinsic source dimensions — used by Next.js to:
         *   1. Compute the correct aspect ratio for the <img> element
         *   2. Generate appropriately-sized srcset entries
         *   3. Reserve layout space before the image loads (CLS = 0)
         * These do NOT set the rendered display size; that is handled below
         * via the `style` prop.
         */
        width={LOGO_INTRINSIC_W}
        height={LOGO_INTRINSIC_H}
        priority={priority}
        /**
         * `sizes` tells Next.js the actual rendered pixel width so it
         * requests the smallest sufficient optimised variant — not the
         * full 612 px source file — saving bandwidth on every page load.
         */
        sizes={`${w}px`}
        style={{
          width:    `${w}px`,
          height:   'auto',      // browser derives height from intrinsic ratio
          maxWidth: 'none',      // prevents Tailwind prose / container from capping it
          /**
           * Smooth resize used when the Header switches between
           * variant="default" (top of page) and variant="sm" (scrolled).
           * The transition runs in CSS so there is no React re-render cost.
           */
          transition: 'width 0.25s ease',
          /**
           * theme="dark" → brightness(0) collapses all channels to black,
           * invert(1) flips black to white. Works correctly on VP8X logos
           * that have an alpha channel — transparent areas remain transparent
           * throughout the filter chain.
           */
          ...(theme === 'dark' && {
            filter: 'brightness(0) invert(1)',
          }),
        }}
      />
    </span>
  );
}
