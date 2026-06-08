/**
 * FacebookCommunityCTA
 *
 * Soft, editorial CTA banner shown at the bottom of every article.
 * Invites the reader to follow the official Bigelow Designs Facebook
 * page after they've finished reading.
 *
 * Design notes:
 *   - Warm beige/neutral surface so it reads as an editorial sidebar,
 *     not an aggressive ad. The brand-light gradient ties it back to
 *     the homepage hero so it feels like part of the site, not bolted
 *     on for monetisation.
 *   - Server component on purpose — zero interactive state. The whole
 *     unit ships as static HTML, so it costs nothing on the perf
 *     budget we've been protecting through AdSense review.
 *   - The "f" mark sits in a soft accented circle to give the banner
 *     a visual anchor that scales gracefully from mobile to desktop.
 *   - Single CTA — link rel="noopener noreferrer" + target="_blank"
 *     so the visitor stays on the article when they pop over to FB.
 */

const FACEBOOK_URL = 'https://www.facebook.com/BigelowDesignsOfficial';

export function FacebookCommunityCTA() {
  return (
    <section
      aria-label="Follow Bigelow Designs on Facebook"
      className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8"
    >
      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-stone-200
          bg-gradient-to-br from-brand-light/30 via-[#FAF8F4] to-emerald-50/30
          p-8 shadow-sm sm:p-10
        "
      >
        {/* Soft decorative blob — very subtle, sits behind the icon */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-light/40 blur-3xl"
        />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          {/* ── Facebook glyph in soft circle ── */}
          <div
            className="
              inline-flex h-16 w-16 shrink-0 items-center justify-center
              rounded-2xl bg-white shadow-md ring-1 ring-stone-200
              sm:h-20 sm:w-20
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="#1877F2"
              aria-hidden="true"
              className="sm:h-10 sm:w-10"
            >
              <path d="M13.5 21v-7.5h2.6l.4-3H13.5V8.6c0-.87.3-1.46 1.55-1.46h1.65V4.46A22 22 0 0 0 14.3 4.3c-2.4 0-4.05 1.47-4.05 4.16V10.5H7.7v3h2.55V21h3.25z" />
            </svg>
          </div>

          {/* ── Copy + CTA ── */}
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Community
            </p>
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight text-stone-900 md:text-3xl">
              Join the Bigelow Designs Community
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-600 md:text-base">
              Get daily interior design inspiration, exclusive styling tips,
              and our latest furniture reviews directly in your feed. Follow
              our official Facebook page to stay connected.
            </p>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6 inline-flex items-center gap-2
                rounded-full bg-[#1877F2] px-6 py-3
                text-sm font-semibold text-white
                shadow-md shadow-[#1877F2]/30
                transition-all duration-300 ease-out
                hover:bg-[#1465c8] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1877F2]/40
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2
              "
            >
              {/* Inline "f" so the button reads as Facebook even before
                  the colour does its work. */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.5 21v-7.5h2.6l.4-3H13.5V8.6c0-.87.3-1.46 1.55-1.46h1.65V4.46A22 22 0 0 0 14.3 4.3c-2.4 0-4.05 1.47-4.05 4.16V10.5H7.7v3h2.55V21h3.25z" />
              </svg>
              Follow Us on Facebook
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
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
