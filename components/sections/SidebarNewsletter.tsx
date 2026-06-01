'use client';

import { useState } from 'react';
import clsx from 'clsx';

/**
 * SidebarNewsletter
 *
 * A compact, self-contained newsletter form designed for the 280px
 * article sidebar. Matches the existing sidebar widget's outer styling
 * exactly (rounded-2xl, border-ink-100, p-5) but replaces the static
 * navigation link with a real form submission.
 *
 * On submit:
 *   • Prevents default page reload
 *   • POSTs to /api/newsletter (same route used by the footer form)
 *   • Transitions the form area to a subtle serif success message
 *
 * The container (heading, body copy, border) is always visible; only
 * the form/success area swaps out on completion.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SidebarNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim().toLowerCase();

    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'sidebar-article' }),
      });

      // 409 = already subscribed — treat as success
      if (res.ok || res.status === 409) {
        setStatus('success');
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus('error');
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMsg('');
    }
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-elevated/40 p-5">
      {/* ── Static header copy — always visible ── */}
      <p className="text-eyebrow uppercase tracking-[0.14em] text-ink-400">
        The Bigelow Edit
      </p>
      <p className="mt-2 font-serif text-[17px] font-semibold leading-snug text-ink-900">
        Design inspiration, delivered weekly.
      </p>
      <p className="mt-2 text-[13px] leading-5 text-ink-600">
        Weekly interior trends, honest furniture reviews, and
        considered styling tips — delivered to your inbox.
      </p>

      {/* ── Form / Success swap ── */}
      {status === 'success' ? (
        <SuccessState />
      ) : (
        <SubscribeForm
          email={email}
          status={status}
          errorMsg={errorMsg}
          onEmailChange={handleEmailChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

// ─── Success state ─────────────────────────────────────────────
function SuccessState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 animate-fade-in rounded-xl border border-accent/20 bg-accent-50 px-4 py-4"
    >
      {/* Subtle checkmark */}
      <div className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent/10">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-accent-600"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <p className="font-serif text-[15px] font-semibold leading-snug text-ink-900">
        Thank you for subscribing.
      </p>
      <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
        Welcome to the Bigelow Edit.
      </p>
    </div>
  );
}

// ─── Subscribe form ────────────────────────────────────────────
interface SubscribeFormProps {
  email: string;
  status: Status;
  errorMsg: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SubscribeForm({
  email,
  status,
  errorMsg,
  onEmailChange,
  onSubmit,
}: SubscribeFormProps) {
  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 space-y-3">
      <label htmlFor="sidebar-newsletter-email" className="sr-only">
        Email address
      </label>

      <input
        id="sidebar-newsletter-email"
        type="email"
        name="email"
        value={email}
        onChange={onEmailChange}
        inputMode="email"
        autoComplete="email"
        required
        placeholder="your@email.com"
        disabled={isSubmitting}
        aria-invalid={status === 'error' || undefined}
        aria-describedby={errorMsg ? 'sidebar-newsletter-error' : undefined}
        className={clsx(
          'w-full bg-transparent border rounded-md py-2.5 px-4 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed',
          status === 'error'
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-gray-300 focus:border-black'
        )}
      />

      {errorMsg && (
        <p
          id="sidebar-newsletter-error"
          role="alert"
          className="text-[12px] text-danger"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center whitespace-nowrap bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subscribing…' : 'Subscribe free'}
      </button>

      <p className="text-center text-[11px] leading-4 text-ink-400">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
