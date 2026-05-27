/**
 * BigelowDesigns — Component Style Contracts
 *
 * Each export defines the Props interface + the className recipe for a
 * primitive UI component. Drop these into components/ui/<Name>.tsx.
 *
 * Conventions:
 *   - Tokens come from tailwind.config.ts (single source of truth)
 *   - All variants resolved via `clsx` lookup tables, not ternaries
 *   - Every interactive component has: default, hover, active, focus, disabled
 */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/* ============================================================
   1. BUTTON
   ============================================================ */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}

export const buttonStyles = {
  base: [
    'inline-flex items-center justify-center gap-2',
    'font-sans font-semibold rounded-md',
    'transition-all duration-quick ease-out',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    'focus-visible:outline-none',
  ].join(' '),

  variant: {
    primary: [
      'bg-accent text-white',
      'hover:bg-accent-600 hover:-translate-y-px hover:shadow-md',
      'active:translate-y-0 active:scale-[0.98] active:bg-accent-600',
    ].join(' '),

    secondary: [
      'bg-surface border border-ink-200 text-ink-800',
      'hover:border-accent hover:text-accent-600 hover:bg-elevated/50',
      'active:bg-elevated',
    ].join(' '),

    ghost: [
      'bg-transparent text-ink-800',
      'hover:bg-elevated',
      'active:bg-sunken',
    ].join(' '),
  },

  size: {
    sm: 'h-8 px-3 text-body-sm',
    md: 'h-10 px-5 text-body',
    lg: 'h-12 px-6 text-body',
  },

  fullWidth: 'w-full',
} as const;

/* ============================================================
   2. PRODUCT CARD (affiliate)
   ============================================================ */
export interface ProductCardProps {
  href: string;
  image: { src: string; alt: string; width?: number; height?: number };
  brand?: string;
  name: string;
  rating?: number;
  reviewCount?: number;
  price?: { amount: number; currency: 'USD' | 'GBP' };
  cta?: { label: string; href: string; network: string };
  featured?: boolean;
  outOfStock?: boolean;
  loading?: boolean;
}

export const productCardStyles = {
  container: [
    'group relative flex flex-col',
    'bg-surface rounded-xl overflow-hidden',
    'transition-all duration-smooth ease-out',
    'hover:-translate-y-0.5 hover:shadow-md',
    'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2',
  ].join(' '),

  featured: 'ring-1 ring-accent/30',
  outOfStock: 'opacity-60',

  media: [
    'relative aspect-[4/3] overflow-hidden bg-elevated',
  ].join(' '),

  image: [
    'object-cover',
    'transition-transform duration-smooth ease-out',
    'group-hover:scale-[1.04]',
  ].join(' '),

  body: 'flex flex-col gap-2 p-6',
  brand: 'text-eyebrow text-ink-400',
  name: 'font-serif text-h3 text-ink-900 leading-snug',
  meta: 'flex items-center gap-2 text-body-sm text-ink-600',
  price: 'font-serif text-2xl font-semibold text-ink-900 mt-2',
  cta: 'mt-4',
} as const;

/* ============================================================
   3. PROS / CONS BOX
   ============================================================ */
export interface ProsConsProps {
  pros: string[];
  cons: string[];
  title?: string;
}

export const prosConsStyles = {
  container: [
    'my-8 rounded-lg bg-sunken',
    'grid gap-6 p-6',
    'md:grid-cols-2 md:divide-x md:divide-ink-100',
  ].join(' '),

  column: 'flex flex-col gap-3 md:px-6 md:first:pl-0 md:last:pr-0',

  header: 'text-eyebrow flex items-center gap-2',
  headerPros: 'text-success',
  headerCons: 'text-ink-600',

  list: 'flex flex-col gap-2 text-body text-ink-800',
  item: 'flex items-start gap-2 leading-relaxed',

  iconPros: 'shrink-0 mt-1 text-success',
  iconCons: 'shrink-0 mt-1 text-ink-400',

  // Mobile divider replaces the desktop vertical line
  mobileDivider: 'md:hidden border-t border-ink-100 pt-6',
} as const;

/* ============================================================
   4. CATEGORY LABEL (eyebrow link)
   ============================================================ */
export interface CategoryLabelProps {
  label: string;
  href: string;
  withDot?: boolean;
  withArrow?: boolean;
}

export const categoryLabelStyles = {
  base: [
    'group inline-flex items-center gap-1.5',
    'text-eyebrow text-accent-600',
    'transition-colors duration-quick ease-out',
    'hover:text-accent-500',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-accent focus-visible:ring-offset-4',
    'focus-visible:rounded-sm',
  ].join(' '),

  dot: 'inline-block w-1 h-1 rounded-full bg-current',

  arrow: [
    'inline-block',
    'transition-transform duration-quick ease-out',
    'group-hover:translate-x-0.5',
  ].join(' '),
} as const;

/* ============================================================
   5. NEWSLETTER INPUT
   ============================================================ */
export type NewsletterState = 'idle' | 'loading' | 'success' | 'error';

export interface NewsletterProps {
  heading?: string;
  description?: string;
  placeholder?: string;
  ctaLabel?: string;
  state?: NewsletterState;
  errorMessage?: string;
  onSubmit?: (email: string) => void | Promise<void>;
}

export const newsletterStyles = {
  container: [
    'mx-auto max-w-[560px]',
    'rounded-xl bg-sunken p-8',
    'text-center',
  ].join(' '),

  heading: 'font-serif text-h3 text-ink-900',
  description: 'mt-2 text-body-sm text-ink-600',

  form: 'mt-6 flex flex-col gap-2 sm:flex-row',

  input: [
    'flex-1 h-12 px-4',
    'bg-surface text-body text-ink-900 placeholder:text-ink-400',
    'border border-ink-200 rounded-md',
    'transition-colors duration-quick ease-out',
    'focus:outline-none focus:border-accent',
    'focus:ring-2 focus:ring-accent/20',
    'disabled:opacity-60 disabled:cursor-not-allowed',
  ].join(' '),

  inputError: 'border-danger focus:border-danger focus:ring-danger/20',

  submit: 'h-12 px-6', // pairs with buttonStyles.variant.primary

  helper: 'mt-2 text-body-sm text-ink-600',
  helperError: 'mt-2 text-body-sm text-danger flex items-center gap-1.5',

  successCard: [
    'rounded-xl bg-sunken p-8 text-center',
    'animate-in fade-in duration-elegant',
  ].join(' '),
} as const;

/* ============================================================
   Usage example (drop into components/ui/Button.tsx):
   ────────────────────────────────────────────────────────────
   import clsx from 'clsx';
   import { buttonStyles, type ButtonProps } from '@/design/components';

   export function Button({
     variant = 'primary',
     size = 'md',
     fullWidth,
     className,
     children,
     ...rest
   }: ButtonProps) {
     return (
       <button
         className={clsx(
           buttonStyles.base,
           buttonStyles.variant[variant],
           buttonStyles.size[size],
           fullWidth && buttonStyles.fullWidth,
           className,
         )}
         {...rest}
       >
         {children}
       </button>
     );
   }
   ============================================================ */
