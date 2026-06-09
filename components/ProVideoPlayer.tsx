'use client';

import { useRef, useState } from 'react';

/**
 * ProVideoPlayer
 *
 * Premium custom video shell with a glassmorphism play overlay.
 * Designed to replace the basic <video controls> tag while keeping
 * the same perf-friendly defaults (preload="metadata" → only header
 * bytes are fetched until the user clicks play).
 *
 * Interaction:
 *   - On first paint: poster (if provided) renders behind a soft
 *     gradient veil + a large central glass play button.
 *   - On play-button click: the overlay fades out, the video starts,
 *     and the native browser controls become available so the user
 *     can pause / seek / fullscreen normally.
 *   - Click on the video frame *after* play has started → standard
 *     browser behaviour (pause/resume).
 *
 * Perf:
 *   - `preload="metadata"` means the browser fetches ~64 KB of header
 *     bytes (codec info + duration + dimensions), not the full file.
 *     A 10 MB MP4 stays a 10 MB MP4 until the visitor decides to play.
 *   - The component is a client island, but it's so small (one piece
 *     of state, one ref) that the JS cost is negligible — well under
 *     1 kB after gzip.
 */

export interface ProVideoPlayerProps {
  /** Public path or absolute URL of the video file (e.g. "/bigelowdesing.mp4"). */
  src: string;
  /** MIME type — defaults to "video/mp4". Override for WebM / HLS, etc. */
  type?: string;
  /** Optional poster image shown before the user presses play. */
  poster?: string;
  /** Accessible label announced by the play button. */
  label?: string;
  /** Optional override for the outer container className. */
  className?: string;
}

export function ProVideoPlayer({
  src,
  type = 'video/mp4',
  poster,
  label = 'Play video',
  className,
}: ProVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  function handlePlay() {
    const el = videoRef.current;
    if (!el) return;
    // Fire-and-forget — the button click is itself a trusted user
    // gesture, so play() resolves on every modern browser. The
    // optional chain on .catch quiets the lint rule for the rare
    // case where a user mashes the button mid-decode.
    void el.play().catch(() => {});
    setHasStarted(true);
  }

  return (
    <div
      className={
        className ??
        'mx-auto my-12 w-full max-w-4xl p-2 bg-white rounded-3xl shadow-2xl border border-neutral-100'
      }
    >
      {/* Inner frame.
          - `aspect-video` locks the box to a 16:9 ratio *before* the
            browser knows the video's intrinsic dimensions. Without
            this the frame collapsed to 0 px tall on slow networks
            and dragged the glass play overlay (absolute inset-0)
            with it — the bug that produced the "black screen, no
            play button" report.
          - `overflow-hidden + rounded-2xl` clips both the video and
            the overlay to the premium edge that matches the outer
            chrome. */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900">
        <video
          ref={videoRef}
          // `absolute inset-0` + `object-cover` lets the video fill
          // whatever 16:9 box the aspect-ratio gives us, regardless
          // of the source file's actual dimensions.
          className="absolute inset-0 h-full w-full object-cover"
          preload="metadata"
          // `muted` + `playsInline` keep mobile browsers (and
          // autoplay policies on desktop) from refusing to even
          // start loading the file. The native controls UI exposes
          // an unmute toggle the moment the visitor presses play.
          muted
          playsInline
          controls={hasStarted}
          poster={poster}
          onEnded={() => setHasStarted(false)}
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>

        {/* ── Glassmorphism play overlay ────────────────────────
            Only mounted while hasStarted === false. `z-10` keeps it
            above the <video> element even when the browser decodes
            its own native poster. Pointer events stay on the button
            alone; the rest of the surface is decorative. */}
        {!hasStarted && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={label}
            className="
              group absolute inset-0 z-10 flex items-center justify-center
              bg-gradient-to-t from-stone-900/55 via-stone-900/15 to-transparent
              transition-colors duration-300
              hover:from-stone-900/65
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-stone-900
            "
          >
            <span
              className="
                relative inline-flex h-20 w-20 items-center justify-center rounded-full
                bg-white/25 backdrop-blur-md
                ring-2 ring-white/40
                shadow-2xl shadow-stone-900/40
                transition-all duration-300 ease-out
                group-hover:scale-110 group-hover:bg-white/35
                md:h-28 md:w-28
              "
            >
              {/* Subtle inner highlight — sells the glass feel */}
              <span
                aria-hidden="true"
                className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent"
              />
              {/* Play triangle — shifted 2 px right so the optical
                  centre lands under the geometric centre of the
                  circle. White fill reads cleanly over any video
                  poster underneath. */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
                className="relative translate-x-[2px] drop-shadow-md md:h-10 md:w-10"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>

            <span className="sr-only">{label}</span>
          </button>
        )}
      </div>
    </div>
  );
}
