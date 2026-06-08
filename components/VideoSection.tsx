/**
 * VideoSection
 *
 * Premium homepage video band — autoplay, muted, looping. Sits directly
 * below the hero.
 *
 * Notes for future-me:
 *   - autoPlay only fires when the video is `muted`. iOS Safari + most
 *     mobile browsers enforce this; do not drop the `muted` attribute.
 *   - `playsInline` keeps mobile Safari from kicking the video into
 *     fullscreen the moment it starts.
 *   - Asset lives at /public/bigelowdesing.mp4. Filename is intentional;
 *     do not "fix" the spelling without first renaming the file.
 *   - Server component on purpose — there is no interactive state any
 *     more, so we save the client-bundle round-trip the click-to-play
 *     prototype used to cost.
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

        {/* ── Video card ────────────────────────────────────────── */}
        <div className="relative mx-auto mt-14 w-full max-w-5xl">
          {/* Soft brand glow — purely decorative */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-light/30 via-transparent to-emerald-100/30 blur-2xl"
          />

          <video width="100%" autoPlay loop muted playsInline className="rounded-xl shadow-lg my-8">
            <source src="/bigelowdesing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
