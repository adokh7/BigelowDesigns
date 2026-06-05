import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

/**
 * Custom 404 page.
 *
 * In the App Router this file is automatically served when no route
 * matches, and Next.js automatically returns an HTTP 404 status — no
 * manual status header required. The page is fully static, so bots
 * and abusive crawlers receive a cheap, fast response with the
 * correct status code and a `noindex, nofollow` directive that tells
 * them this URL has no value and they should stop revisiting.
 *
 * The inline GA snippet pushes a `page_not_found` event instead of
 * the default page_view, so 404 traffic does NOT inflate engagement
 * metrics. Filter the event in GA → Configure → Events to exclude
 * `page_not_found` from your engaged-sessions report.
 */

export const metadata: Metadata = {
  title: 'Page Not Found · Bigelow Designs',
  description:
    'The page you were looking for doesn’t exist. Explore our interior design guides, furniture reviews, and styling inspiration instead.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function NotFound() {
  return (
    <>
      {/*
        Tag this hit as a 404 instead of a normal pageview so the
        bounce / engagement metrics on the main reports stay clean.
        Runs once on mount; harmless if gtag hasn't loaded.
      */}
      <Script id="ga-404-event" strategy="afterInteractive">
        {`
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'page_not_found', {
              page_path: window.location.pathname,
              non_interaction: true,
            });
          }
        `}
      </Script>

      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-white via-stone-50 to-brand-light/20">
        {/* Decorative soft blob — purely visual, hidden from a11y tree */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-15%] left-[-8%] h-[24rem] w-[24rem] rounded-full bg-emerald-200/30 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-3xl px-6 py-24 text-center lg:py-32">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-brand">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Error 404
          </p>

          {/* Display 404 — large, editorial */}
          <p
            aria-hidden="true"
            className="mt-6 font-serif text-[8rem] font-bold leading-none tracking-tight text-stone-900 sm:text-[10rem]"
          >
            4<span className="italic text-brand">0</span>4
          </p>

          {/* Headline */}
          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl">
            This page wandered off the mood board.
          </h1>

          {/* Sub */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
            The page you were looking for doesn&rsquo;t exist, was moved, or
            never quite made it past the design phase. Let&rsquo;s get you
            somewhere beautiful instead.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/rooms"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white
                shadow-md shadow-brand/25
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/35
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
              "
            >
              Explore Luxury Design Guides
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-900
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-sm
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2
              "
            >
              Back to Homepage
            </Link>
          </div>

          {/* Quiet helper links — keep the bot dwell time short, give humans a path */}
          <nav
            aria-label="Popular sections"
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-500"
          >
            <Link href="/reviews"       className="transition-colors hover:text-brand">Furniture Reviews</Link>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <Link href="/design-trends" className="transition-colors hover:text-brand">Design Trends</Link>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <Link href="/blog"          className="transition-colors hover:text-brand">The Edit</Link>
          </nav>
        </div>
      </section>
    </>
  );
}
