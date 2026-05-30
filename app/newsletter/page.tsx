import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { NewsletterForm } from '@/components/interactive/NewsletterForm';

// Static page — no dynamic data.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'The Bigelow Edit — Subscribe',
  description:
    'Get weekly interior trends, honest furniture reviews, and considered styling tips from Bigelow Designs — delivered directly to your inbox.',
  alternates: { canonical: `${siteConfig.url}/newsletter` },
  robots: { index: true, follow: true },
};

// ─── What subscribers receive ─────────────────────────────────
const BENEFITS = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    heading: 'One room, every Sunday',
    body: 'A deeply considered room from our editors — the decisions behind it, the pieces in it, and the thing that makes it work.',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    heading: 'One product worth knowing',
    body: 'Not a sponsored mention. One piece of furniture or décor that genuinely impressed us — with the honest case for why.',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    heading: 'Zero noise',
    body: 'No daily noise. No clickbait. One focused, beautifully curated issue per week — then silence until the next one.',
  },
] as const;

// ─── Past issue previews ──────────────────────────────────────
const PAST_ISSUES = [
  {
    number: '#042',
    date: 'May 18',
    title: 'A Kitchen in Copenhagen That Does Everything Right',
    teaser: 'Warm oak, Calacatta marble, and a layout that puts the island exactly where it needs to be.',
  },
  {
    number: '#041',
    date: 'May 11',
    title: 'The Bedroom That Took Three Years to Finish',
    teaser: 'Why one designer waited two years before committing to a headboard — and what happened when she finally did.',
  },
  {
    number: '#040',
    date: 'May 4',
    title: 'An Outdoor Room in Brooklyn That Earns Its Keep Year-Round',
    teaser: 'A 180-square-foot terrace, four seasons, and the pergola decision that made it all possible.',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────
export default function NewsletterPage() {
  return (
    <div className="bg-canvas">
      {/* ══════════════════════════════════════════════════════
          HERO — dark, full-height, editorial
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="newsletter-hero-heading"
        className="relative overflow-hidden bg-ink-900"
      >
        {/* Warm gradient background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-ink-900 via-[#1c150d] to-[#0f0b07]"
        />
        {/* Subtle grain texture via radial gradient spots */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 35%, #c8a97a 0%, transparent 60%), radial-gradient(circle at 75% 65%, #a07850 0%, transparent 60%)',
          }}
        />

        <div className="relative mx-auto max-w-page px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            {/* Eyebrow */}
            <p className="text-eyebrow uppercase tracking-[0.22em] text-white/40 animate-fade-in [animation-delay:80ms]">
              {siteConfig.name}
            </p>

            {/* Heading */}
            <h1
              id="newsletter-hero-heading"
              className="mt-5 text-balance font-serif text-display-lg leading-tight text-white animate-fade-rise [animation-delay:160ms]"
            >
              The Bigelow Edit.
            </h1>

            {/* Deck */}
            <p className="mx-auto mt-6 max-w-lg text-pretty text-body-lg leading-relaxed text-white/60 animate-fade-rise [animation-delay:240ms]">
              Weekly interior trends, honest furniture reviews, and considered
              styling tips — delivered directly to your inbox.
            </p>

            {/* Form */}
            <div className="mt-12 animate-fade-rise [animation-delay:320ms]">
              <NewsletterForm
                variant="dark"
                source="newsletter-page"
                heading=""
                description=""
                ctaLabel="Subscribe"
              />
            </div>

            {/* Disclaimer */}
            <p className="mt-5 text-[13px] text-white/30 animate-fade-in [animation-delay:440ms]">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BENEFITS — what you actually get
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="benefits-heading"
        className="border-b border-ink-100 bg-surface"
      >
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2
            id="benefits-heading"
            className="mb-12 text-center font-serif text-h2 text-ink-900"
          >
            What lands in your inbox
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.heading} className="flex flex-col items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                  {benefit.icon}
                </div>
                <h3 className="mt-5 font-serif text-h3 text-ink-900">
                  {benefit.heading}
                </h3>
                <p className="mt-3 text-body text-ink-600 leading-relaxed">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PAST ISSUES — social proof through content
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="past-issues-heading"
        className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="flex items-end justify-between border-b border-ink-100 pb-6">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              Recent issues
            </p>
            <h2
              id="past-issues-heading"
              className="mt-1.5 font-serif text-h2 text-ink-900"
            >
              A look inside
            </h2>
          </div>
        </div>

        <div className="mt-8 space-y-0">
          {PAST_ISSUES.map((issue, idx) => (
            <div
              key={issue.number}
              className={`flex gap-6 py-7 ${
                idx < PAST_ISSUES.length - 1
                  ? 'border-b border-ink-100'
                  : ''
              }`}
            >
              {/* Issue number */}
              <div className="hidden w-16 flex-shrink-0 sm:block">
                <span className="font-serif text-[22px] font-semibold text-ink-200">
                  {issue.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-body-sm font-semibold text-ink-400">
                    {issue.date}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-ink-100 sm:hidden"
                  />
                </div>
                <h3 className="mt-1.5 font-serif text-h3 text-ink-900">
                  {issue.title}
                </h3>
                <p className="mt-2 text-body text-ink-500 leading-relaxed">
                  {issue.teaser}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CTA — dark panel
          ══════════════════════════════════════════════════════ */}
      <div className="bg-ink-900">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="font-serif text-h2 text-canvas text-balance">
              Stay ahead of every trend that matters.
            </p>
            <p className="mt-4 text-body-lg text-canvas/60">
              Interior trends, honest furniture reviews, and styling tips —
              every week, no spam.
            </p>
            <div className="mt-8">
              <NewsletterForm
                variant="dark"
                source="newsletter-page-bottom"
                heading=""
                description=""
                ctaLabel="Subscribe"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="border-t border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500"
          >
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
