/**
 * PremiumSocialClub
 *
 * Editorial "social club" CTA shown at the foot of every article. Invites
 * the reader into the two owned communities — TikTok (behind-the-scenes
 * room tours) and Facebook (daily design discussion).
 *
 * Design notes:
 *   - Soft glassmorphism over a warm beige (bg-stone-50) so it reads as an
 *     Architectural-Digest sidebar, not an ad. A faint backdrop-blur veil
 *     + decorative blobs give the premium depth.
 *   - Serif headline (the site's Fraunces face) at large scale; relaxed
 *     subtext for an unhurried, magazine cadence.
 *   - Two equal, side-by-side pill buttons: TikTok in near-black, Facebook
 *     in its brand blue. Both lift on hover for a tactile, clickable feel.
 *   - Server component on purpose — zero interactive state, so it ships as
 *     static HTML with no client-bundle cost (keeps the perf budget we've
 *     guarded through AdSense review intact).
 *
 * Both links open in a new tab with rel="noopener noreferrer".
 */

const TIKTOK_URL = 'https://www.tiktok.com/@bigelowdesignsofficial';
const FACEBOOK_URL = 'https://www.facebook.com/BigelowDesignsOfficial';

export function PremiumSocialClub() {
  return (
    <section
      aria-label="Join the Bigelow Insider community"
      className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8"
    >
      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-stone-200/80
          bg-stone-50/80 backdrop-blur-xl
          px-8 py-12 text-center shadow-sm sm:px-12 sm:py-14
        "
      >
        {/* Decorative soft blobs — warm, very subtle, frame the content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-light/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-emerald-100/40 blur-3xl"
        />

        <div className="relative">
          {/* Overline */}
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand">
            The Insider Circle
          </p>

          {/* Heading */}
          <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-bold leading-tight tracking-tight text-stone-900 md:text-4xl">
            Join the Bigelow Insider Community
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-stone-600 md:text-lg">
            Craving more interior inspiration? Watch our exclusive
            behind-the-scenes room tours on TikTok and join our Facebook
            community for daily design secrets.
          </p>

          {/* Buttons */}
          <div className="mx-auto mt-9 flex max-w-md flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
            {/* TikTok — sleek near-black */}
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex flex-1 items-center justify-center gap-2.5
                rounded-full bg-stone-900 px-7 py-4
                text-sm font-semibold text-white
                shadow-lg shadow-stone-900/20
                transition-all duration-300 ease-out
                hover:bg-black hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-900/30
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2
              "
            >
              <TikTokIcon />
              Watch on TikTok
            </a>

            {/* Facebook — brand blue */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex flex-1 items-center justify-center gap-2.5
                rounded-full bg-[#1877F2] px-7 py-4
                text-sm font-semibold text-white
                shadow-lg shadow-[#1877F2]/25
                transition-all duration-300 ease-out
                hover:bg-[#1465c8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1877F2]/35
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2
              "
            >
              <FacebookIcon />
              Join Facebook Group
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Brand glyphs (inline SVG — zero JS, crisp at any size) ───────────
function TikTokIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.6c.27 0 .53.04.78.12V9.66a5.7 5.7 0 0 0-.78-.05c-3.14 0-5.69 2.55-5.69 5.7s2.55 5.69 5.69 5.69 5.69-2.55 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.5h2.6l.4-3H13.5V8.6c0-.87.3-1.46 1.55-1.46h1.65V4.46A22 22 0 0 0 14.3 4.3c-2.4 0-4.05 1.47-4.05 4.16V10.5H7.7v3h2.55V21h3.25z" />
    </svg>
  );
}
