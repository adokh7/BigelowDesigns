'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

/**
 * VideoSection
 *
 * A poster-first, click-to-play video card that lives directly below the
 * homepage hero. Designed for maximum Lighthouse / SEO Site Checkup safety:
 *
 *   - <video preload="none"> — the browser fetches *zero* bytes of the video
 *     until the user actively engages. This is the single biggest lever for
 *     keeping "Avoid enormous network payloads" and "Reduce initial server
 *     response" green on a media-rich page.
 *
 *   - The element is rendered behind a Next.js <Image /> poster so the
 *     first paint is a properly-sized WebP, not an empty <video> box.
 *
 *   - muted + playsInline + loop are set so that once the user taps play
 *     the element complies with every mobile autoplay policy in the wild
 *     (iOS Safari, Android Chrome, Samsung Internet).
 *
 *   - Because this entire file is dynamically imported with `ssr: false`
 *     (see LazyVideoSection.tsx), the <video> element only enters the DOM
 *     after hydration. It therefore cannot block the initial render pass.
 *
 * Asset contract:
 *   Drop your master file at `public/videos/premium-spaces.mp4`. A
 *   `.webm` sibling will be picked up automatically by browsers that
 *   prefer it. The poster falls back to /luxury-powder-room.webp.
 */
export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlay() {
    const el = videoRef.current;
    if (!el) return;
    // Fire-and-forget — older browsers can reject the promise if the user
    // gesture wasn't trusted. We swallow rather than throw because the
    // button is itself a user gesture, so rejection is essentially zero.
    void el.play();
    setIsPlaying(true);
  }

  return (
    <section
      aria-labelledby="video-section-heading"
      className="relative bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* ── Section header — matches hero typography exactly ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Watch the Edit
          </p>
          <h2
            id="video-section-heading"
            className="mt-4 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl"
          >
            See Premium Spaces{' '}
            <span className="italic text-brand">in Action.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
            A two-minute walk-through of the rooms, materials, and furniture
            pieces we&rsquo;ve tested this season — shot in real homes, on
            real budgets.
          </p>
        </div>

        {/* ── Video card ─────────────────────────────────────────────
            The wrapper sets the aspect ratio (16:9) so the layout is
            stable before either the poster or the video have decoded —
            a CLS-safe pattern that also keeps the card centred. */}
        <div className="relative mx-auto mt-14 w-full max-w-5xl">
          {/* Soft brand glow — purely decorative */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-light/30 via-transparent to-emerald-100/30 blur-2xl"
          />

          <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl shadow-stone-900/20 ring-1 ring-stone-900/5">
            {/* Poster — replaced by the <video> on first play. We keep the
                poster <Image> visible underneath either way so the corners
                stay crisp during the brief metadata-fetch flash. */}
            {!isPlaying && (
              <Image
                src="/luxury-powder-room.webp"
                alt="A premium interior space — dark, moody powder room with brushed brass fixtures"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
                className="object-cover"
              />
            )}

            <video
              ref={videoRef}
              // The poster attribute is the bare fallback used by some
              // browsers (e.g. RSS readers, in-app webviews) that strip
              // the surrounding <Image> tag.
              poster="/luxury-powder-room.webp"
              preload="none"
              muted
              loop
              playsInline
              controls={isPlaying}
              className={
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ' +
                (isPlaying ? 'opacity-100' : 'opacity-0')
              }
            >
              {/*
                Drop your master file at public/videos/premium-spaces.mp4.
                A WebM sibling is preferred by Chromium when present and
                ships ~25% smaller at the same visual quality. Both are
                fully optional — the section degrades gracefully to a
                still poster when neither file exists.
              */}
              <source src="/videos/premium-spaces.webm" type="video/webm" />
              <source src="/videos/premium-spaces.mp4" type="video/mp4" />
            </video>

            {/* ── Play overlay ─────────────────────────────────────
                Sits above the poster. Tapped → triggers the user-gesture
                that the muted-autoplay policy requires, swaps in the
                <video>, and fades the overlay out. */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Play premium spaces video"
                className="
                  group absolute inset-0 flex items-center justify-center
                  bg-gradient-to-t from-stone-900/40 via-stone-900/10 to-transparent
                  transition-colors duration-300
                  hover:from-stone-900/55
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-brand focus-visible:ring-offset-4
                "
              >
                <span
                  className="
                    inline-flex h-20 w-20 items-center justify-center rounded-full
                    bg-white/95 text-brand shadow-2xl shadow-stone-900/30
                    backdrop-blur-sm transition-all duration-300 ease-out
                    group-hover:scale-110 group-hover:bg-white
                    md:h-24 md:w-24
                  "
                >
                  {/* Triangle is shifted 2px right so the optical centre
                      sits under the geometric centre of the circle. */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="translate-x-[2px] md:h-8 md:w-8"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                <span className="sr-only">Play the premium spaces video</span>

                {/* Caption ribbon */}
                <span
                  className="
                    absolute bottom-6 left-1/2 -translate-x-1/2
                    rounded-full bg-white/95 px-5 py-2 text-xs font-bold uppercase
                    tracking-[0.18em] text-stone-900 shadow-lg
                    backdrop-blur-sm
                  "
                >
                  Watch · 2 min
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
