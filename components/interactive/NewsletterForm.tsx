'use client';

import { useRef, useState, useTransition } from 'react';
import clsx from 'clsx';

// ─── State machine ────────────────────────────────────────────
type NewsletterStatus =
  | { kind: 'idle' }
  | { kind: 'error-validation'; message: string }
  | { kind: 'error-network'; message: string }
  | { kind: 'submitting' }
  | { kind: 'success' };

// ─── Email validation ─────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BLOCKED_DOMAINS = new Set([
  'mailinator.com',
  '10minutemail.com',
  'guerrillamail.com',
  'tempmail.com',
  'trashmail.com',
]);

function validateEmail(raw: string): { ok: true } | { ok: false; message: string } {
  const email = raw.trim().toLowerCase();
  if (!email) return { ok: false, message: 'Please enter your email.' };
  if (email.length > 254) return { ok: false, message: 'That email is too long.' };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "That doesn't look like an email." };
  const domain = email.split('@')[1];
  if (BLOCKED_DOMAINS.has(domain)) {
    return { ok: false, message: 'We require a permanent inbox.' };
  }
  return { ok: true };
}

// ─── Component ────────────────────────────────────────────────
interface NewsletterFormProps {
  heading?: string;
  description?: string;
  ctaLabel?: string;
  endpoint?: string;
  source?: string; // analytics tag
  variant?: 'light' | 'dark';
}

export function NewsletterForm({
  heading = 'Stay in the room.',
  description = 'One thoughtful email each Sunday. Zero spam — ever.',
  ctaLabel = 'Subscribe',
  endpoint = '/api/newsletter',
  source = 'inline',
  variant = 'light',
}: NewsletterFormProps) {
  const isDark = variant === 'dark';
  const inputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<NewsletterStatus>({ kind: 'idle' });
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = inputRef.current?.value ?? '';

    // Bot check
    if (honeypotRef.current?.value) {
      setStatus({ kind: 'success' }); // pretend success, ignore silently
      return;
    }

    const validation = validateEmail(raw);
    if (!validation.ok) {
      setStatus({ kind: 'error-validation', message: validation.message });
      inputRef.current?.focus();
      return;
    }

    setStatus({ kind: 'submitting' });

    startTransition(async () => {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: raw.trim().toLowerCase(), source }),
        });
        if (res.status === 409) {
          // Already subscribed — treat as success
          setStatus({ kind: 'success' });
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus({ kind: 'success' });
      } catch (err) {
        setStatus({
          kind: 'error-network',
          message: "Something's off on our end. Try again?",
        });
      }
    });
  }

  // Success — replace form entirely
  if (status.kind === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={clsx(
          'mx-auto max-w-[560px] rounded-xl p-8 text-center animate-in fade-in duration-elegant',
          isDark ? 'bg-white/5' : 'bg-sunken',
        )}
      >
        <p className={clsx('font-serif text-h3', isDark ? 'text-canvas' : 'text-ink-900')}>
          Thank you for subscribing.
        </p>
        <p className={clsx('mt-2 text-body', isDark ? 'text-canvas/70' : 'text-ink-600')}>
          Welcome to the Bigelow Edit.
        </p>
      </div>
    );
  }

  const errorMessage =
    status.kind === 'error-validation' || status.kind === 'error-network'
      ? status.message
      : null;

  const isSubmitting = status.kind === 'submitting' || isPending;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="newsletter-heading"
      className={clsx(
        'mx-auto max-w-[560px] rounded-2xl px-4 py-6 text-center sm:p-8',
        isDark ? 'bg-transparent' : 'bg-sunken',
      )}
    >
      {heading && (
        <h2
          id="newsletter-heading"
          className={clsx('font-serif text-h3', isDark ? 'text-canvas' : 'text-ink-900')}
        >
          {heading}
        </h2>
      )}
      {description && (
        <p
          className={clsx(
            'mt-2 text-body-sm',
            heading ? 'mt-2' : 'mt-0',
            isDark ? 'text-canvas/70' : 'text-ink-600',
          )}
        >
          {description}
        </p>
      )}

      {/* Honeypot — invisible to humans, attractive to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Don&apos;t fill this out
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className={clsx('flex flex-col sm:flex-row gap-3', (heading || description) && 'mt-6')}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          ref={inputRef}
          id="newsletter-email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="your@email.com"
          aria-invalid={status.kind === 'error-validation'}
          aria-describedby={errorMessage ? 'newsletter-error' : undefined}
          disabled={isSubmitting}
          onChange={() => {
            if (status.kind === 'error-validation' || status.kind === 'error-network') {
              setStatus({ kind: 'idle' });
            }
          }}
          className={clsx(
            isDark
              ? 'w-full bg-transparent border border-white/20 rounded-md py-2.5 px-4 text-sm text-white placeholder-white/40 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all'
              : 'w-full bg-transparent border border-gray-300 rounded-md py-2.5 px-4 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            status.kind === 'error-validation' && (isDark ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-danger focus:ring-danger focus:border-danger')
          )}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            'inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
            isDark
              ? 'w-full sm:w-auto whitespace-nowrap bg-white text-black px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors'
              : 'w-full sm:w-auto whitespace-nowrap bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors'
          )}
        >
          {isSubmitting ? (
            <>
              <Spinner /> Subscribing…
            </>
          ) : (
            ctaLabel
          )}
        </button>
      </div>

      {errorMessage && (
        <p
          id="newsletter-error"
          role="alert"
          className={clsx(
            'mt-3 flex items-center justify-center gap-1.5 text-body-sm',
            isDark ? 'text-red-300' : 'text-danger',
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {errorMessage}
          {status.kind === 'error-network' && (
            <button
              type="button"
              onClick={() => setStatus({ kind: 'idle' })}
              className="ml-2 underline underline-offset-2 hover:no-underline"
            >
              Retry
            </button>
          )}
        </p>
      )}

      <p
        className={clsx(
          'mt-4 text-[13px] tracking-wide',
          isDark ? 'text-canvas/45' : 'text-ink-400',
        )}
      >
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
