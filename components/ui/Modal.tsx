'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Visually hide the title bar. Title still announced to AT. */
  hideTitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Native <dialog>-backed modal. Free a11y (focus trap, ESC, role).
 * Animations come from globals.css (`dialog[open]` + `dialog::backdrop`).
 *
 * Why <dialog>?
 *  - Native focus trap (no fighting with React)
 *  - ESC closes for free
 *  - Inert background, screen-reader correct
 *  - `::backdrop` pseudo-element saves a wrapper div
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  hideTitle = false,
  size = 'md',
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Forward native dialog close (ESC, backdrop click) to React state
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  // Close on backdrop click (clicking the dialog *element* itself, not its content)
  function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current) ref.current?.close();
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClick={handleClick}
      className={clsx(
        'rounded-2xl bg-surface p-0 shadow-xl backdrop:bg-ink-900/40',
        'max-h-[90vh] overflow-hidden',
        'open:flex open:flex-col',
        {
          sm: 'w-[min(90vw,420px)]',
          md: 'w-[min(90vw,560px)]',
          lg: 'w-[min(92vw,800px)]',
        }[size],
      )}
    >
      <header
        className={clsx(
          'flex items-center justify-between gap-4 px-6 py-4',
          hideTitle ? 'absolute right-0 top-0 z-10' : 'border-b border-ink-100',
        )}
      >
        <h2
          id="modal-title"
          className={clsx(
            'font-serif text-h3 text-ink-900',
            hideTitle && 'sr-only',
          )}
        >
          {title}
        </h2>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-600 transition-colors duration-quick ease-out hover:bg-elevated hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div className="overflow-y-auto px-6 py-5">{children}</div>
    </dialog>
  );
}
