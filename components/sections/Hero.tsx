import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: { src: string; alt: string };
}

export function Hero({
  eyebrow = 'The Spring Issue',
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  image,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-canvas"
    >
      {/* Subtle terracotta orb — adds editorial warmth without dominating */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          {/* TEXT — appears second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-bottom-3 duration-editorial">
            <p className="text-eyebrow text-accent-600">{eyebrow}</p>

            <h1
              id="hero-heading"
              className="mt-4 font-serif text-h1 text-ink-900 text-balance md:text-display-lg lg:text-display-lg"
            >
              {headline}
            </h1>

            <p className="mt-6 max-w-xl font-sans text-body-lg text-ink-600 text-pretty">
              {subhead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={primaryCta.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-sans font-semibold text-white transition-all duration-quick ease-out hover:-translate-y-px hover:bg-accent-600 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {primaryCta.label}
                <ArrowRight />
              </Link>

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex h-12 items-center gap-1.5 text-body font-semibold text-ink-800 underline-offset-4 transition-colors duration-quick ease-out hover:text-accent-600 hover:underline"
                >
                  {secondaryCta.label}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-quick ease-out group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              )}
            </div>

            {/* Trust strip */}
            <p className="mt-12 text-eyebrow text-ink-400">
              <span className="mr-3">Featured in</span>
              <span className="font-serif text-body-sm font-normal tracking-normal normal-case text-ink-600">
                Dwell · Apartment Therapy · Domino · The Spruce
              </span>
            </p>
          </div>

          {/* IMAGE — appears first on mobile */}
          <div className="order-1 lg:order-2">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-elevated md:aspect-[4/5] lg:aspect-[5/6]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Floating caption — magazine-style */}
              <figcaption className="absolute -bottom-3 left-4 right-4 rounded-xl bg-surface px-4 py-3 shadow-md sm:left-6 sm:max-w-[280px]">
                <p className="text-eyebrow text-accent-600">Featured Room</p>
                <p className="mt-0.5 font-serif text-body font-semibold text-ink-900">
                  A Brooklyn brownstone, reimagined.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className="hidden justify-center pb-8 lg:flex"
        >
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-ink-200 p-1.5">
            <span className="block h-2 w-1 animate-bounce rounded-full bg-ink-400" />
          </span>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
