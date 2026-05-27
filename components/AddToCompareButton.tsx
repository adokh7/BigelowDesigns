'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useCompare } from '@/contexts/CompareContext';
import type { ProductRef } from '@/types/article';

interface AddToCompareButtonProps {
  product: ProductRef;
  /** For analytics: where on the page was this triggered from? */
  source: 'comparison_table' | 'quick_view' | 'product_card' | 'rail';
  variant?: 'inline' | 'icon';
  className?: string;
}

export function AddToCompareButton({
  product,
  source,
  variant = 'inline',
  className,
}: AddToCompareButtonProps) {
  const { add, remove, isInCompare, isFull, hydrated } = useCompare();
  const [justAdded, setJustAdded] = useState(false);

  const active = isInCompare(product.id);
  const disabled = !hydrated || (isFull && !active);

  function handleClick() {
    if (active) {
      remove(product.id);
      return;
    }
    if (isFull) return;
    const ok = add(product, source);
    if (ok) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1400);
    }
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-pressed={active}
        aria-label={
          active
            ? `Remove ${product.name} from compare`
            : `Add ${product.name} to compare`
        }
        title={
          isFull && !active
            ? 'Compare list is full (4 products max)'
            : active
              ? 'Remove from compare'
              : 'Add to compare'
        }
        className={clsx(
          'inline-flex h-9 w-9 items-center justify-center rounded-full',
          'border transition-all duration-quick ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          active
            ? 'border-accent bg-accent-50 text-accent-600'
            : 'border-ink-200 bg-surface text-ink-600 hover:border-accent hover:text-accent-600',
          className,
        )}
      >
        {active ? <CheckIcon /> : <PlusIcon />}
      </button>
    );
  }

  // Inline (default)
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={active}
      className={clsx(
        'inline-flex items-center gap-2 h-10 px-4 rounded-md',
        'text-body-sm font-semibold border',
        'transition-all duration-quick ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        active
          ? 'border-accent bg-accent-50 text-accent-600 hover:bg-accent hover:text-white'
          : 'border-ink-200 bg-surface text-ink-800 hover:border-accent hover:text-accent-600',
        justAdded && 'animate-fade-rise',
        className,
      )}
    >
      {active ? (
        <>
          <CheckIcon />
          {justAdded ? 'Added' : 'In compare'}
        </>
      ) : (
        <>
          <PlusIcon />
          {isFull ? 'Compare full' : 'Add to compare'}
        </>
      )}
    </button>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
