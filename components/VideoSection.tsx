import { ProVideoPlayer } from './ProVideoPlayer';

/**
 * VideoSection
 *
 * Premium homepage video band — sits directly below the hero. The
 * video itself is rendered through <ProVideoPlayer />, which handles
 * the click-to-play overlay, native controls, and preload="metadata"
 * perf defaults. This component is just the editorial chrome (eyebrow
 * + serif title + sub + soft brand glow) around it.
 *
 * Notes for future-me:
 *   - Asset lives at /public/bigelowdesing.mp4. Filename is intentional;
 *     do not "fix" the spelling without first renaming the file.
 *   - Server component on purpose — all interactive state lives inside
 *     <ProVideoPlayer />, so we save the client-bundle round-trip on
 *     the rest of the section.
 */
export default function VideoSection() {
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
            Visual Tour
          </p>
          <h2
            id="video-section-heading"
            className="mt-4 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl"
          >
            A 30-Second{' '}
            <span className="italic text-brand">Visual Tour.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base italic leading-relaxed text-stone-600 md:text-lg">
            Get a quick, real-world look at the texture, scale, and styling.
            Press play for a brief 30-second walk-through to see how the
            piece naturally anchors the space and catches the daylight.
          </p>
        </div>

        {/* ── Video player ──────────────────────────────────────
            Wrapper exists only to host the soft decorative glow;
            ProVideoPlayer brings its own max-w-4xl + framed chrome,
            so we keep this container layout-neutral and unstyled. */}
        <div className="relative mx-auto mt-2 w-full">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-6 -z-10 mx-auto h-72 max-w-3xl rounded-[2rem] bg-gradient-to-br from-brand-light/30 via-transparent to-emerald-100/30 blur-3xl"
          />

          <ProVideoPlayer
            src="/bigelowdesing.mp4"
            label="Play the Bigelow Designs walk-through video"
          />
        </div>
      </div>
    </section>
  );
}
