import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Bigelow Designs is an independent editorial studio producing honest interior design guides, furniture reviews, and design trend coverage for modern homes.',
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/about`,
    title: 'About Bigelow Designs',
    description:
      'An independent editorial studio producing honest interior design guides, furniture reviews, and design trend coverage.',
  },
};

const VALUES = [
  {
    eyebrow: '01',
    headline: 'Honest above everything.',
    body:
      'We never accept payment for coverage. Every piece of furniture we review is purchased at full price or borrowed for testing — never gifted with the expectation of a positive write-up. Our affiliate commissions are disclosed clearly and never influence our ratings.',
  },
  {
    eyebrow: '02',
    headline: 'Real homes, not showrooms.',
    body:
      "We test furniture and design decisions in the kinds of spaces most people actually live in — city apartments, terraced houses, open-plan flats — not magazine-perfect showrooms with perfect light. If a piece doesn't survive a real household, we say so.",
  },
  {
    eyebrow: '03',
    headline: 'Long-form, not listicle.',
    body:
      'We believe the best design advice takes space to breathe. Our guides are researched, written, and edited to last years — not to chase an algorithm. If it is worth knowing, it deserves more than a bullet point.',
  },
  {
    eyebrow: '04',
    headline: 'Sustainability without preaching.',
    body:
      'We flag materials, supply chains, and longevity in every product we cover. The most sustainable piece of furniture is the one you buy once and keep for decades. We help you find those pieces.',
  },
];

const CATEGORIES = [
  {
    label: 'Room Guides',
    href: '/rooms',
    description:
      'In-depth, room-by-room advice on furniture, layout, lighting, and the design decisions that compound over time.',
  },
  {
    label: 'Furniture Reviews',
    href: '/reviews',
    description:
      'Long-term, honest assessments of sofas, beds, tables, and more — tested in real homes over real time.',
  },
  {
    label: 'Design Trends',
    href: '/design-trends',
    description:
      'Considered coverage of the movements and aesthetics shaping how we design our homes, without the hype.',
  },
  {
    label: 'The Newsletter',
    href: '/newsletter',
    description:
      'A weekly edit of the most interesting ideas in interior design, delivered directly to your inbox.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-canvas">

      {/* ── Page header ────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              About
            </p>
            <h1 className="mt-3 text-balance font-serif text-display-lg leading-tight text-ink-900">
              An independent voice for the considered home.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-body-lg leading-relaxed text-ink-500">
              Bigelow Designs is an editorial studio built on a simple premise: most interior
              design advice on the internet is either aspirational fantasy or thinly disguised
              advertising. We set out to make something different — genuinely useful,
              rigorously honest, and designed for the homes people actually live in.
            </p>
          </div>
        </div>
      </div>

      {/* ── Hero image ─────────────────────────────────────── */}
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-elevated">
          <Image
            src="https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1600&q=85"
            alt="A clean, sunlit editorial workspace with open design books, a plant, and warm oak surfaces"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* ── Mission ────────────────────────────────────────── */}
      <section
        aria-labelledby="mission-heading"
        className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              Our mission
            </p>
            <div
              aria-hidden="true"
              className="mt-4 h-0.5 w-10 bg-accent-600/40"
            />
          </div>
          <div className="space-y-5 text-body-lg leading-relaxed text-ink-700">
            <p>
              We founded Bigelow in 2024 with a straightforward conviction: that the people
              designing their homes deserve the same quality of editorial rigor applied to
              other major purchase decisions — cars, electronics, financial products — but
              almost never applied to interiors.
            </p>
            <p>
              The interior design media landscape is dominated by aspirational content that
              serves advertisers first and readers second. Furniture brands, retailers, and
              PR agencies exert enormous influence over what gets covered, how it is framed,
              and which products are recommended. The result is a category full of
              &ldquo;reviews&rdquo; that are really just rewritten press releases, and
              &ldquo;guides&rdquo; that are actually affiliate catalogues.
            </p>
            <p>
              We think readers deserve better. Bigelow exists to provide it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="mx-auto max-w-page border-t border-ink-100 px-4 sm:px-6 lg:px-8"
      />

      {/* ── Editorial values ───────────────────────────────── */}
      <section
        aria-labelledby="values-heading"
        className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <h2
          id="values-heading"
          className="mb-12 font-serif text-h1 text-ink-900"
        >
          What we stand for.
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
          {VALUES.map((v) => (
            <div
              key={v.eyebrow}
              className="rounded-2xl border border-ink-100 bg-surface p-7"
            >
              <p className="text-eyebrow uppercase tracking-[0.2em] text-accent-600/70">
                {v.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-body-lg font-semibold text-ink-900">
                {v.headline}
              </h3>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-600">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="mx-auto max-w-page border-t border-ink-100 px-4 sm:px-6 lg:px-8"
      />

      {/* ── What we cover ──────────────────────────────────── */}
      <section
        aria-labelledby="coverage-heading"
        className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              What we cover
            </p>
            <div
              aria-hidden="true"
              className="mt-4 h-0.5 w-10 bg-accent-600/40"
            />
          </div>
          <div>
            <p className="mb-10 text-body-lg leading-relaxed text-ink-700">
              Our editorial output spans four main areas. In each one, the same standard
              applies: if we wouldn&apos;t recommend it to a close friend redecorating their
              home, we won&apos;t recommend it here.
            </p>
            <ul className="space-y-6">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat.href}
                  className="grid gap-1 border-l-2 border-accent-600/30 pl-5 sm:grid-cols-[180px_1fr]"
                >
                  <Link
                    href={cat.href}
                    className="font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
                  >
                    {cat.label}
                  </Link>
                  <p className="text-body-sm leading-relaxed text-ink-500">
                    {cat.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="mx-auto max-w-page border-t border-ink-100 px-4 sm:px-6 lg:px-8"
      />

      {/* ── Editorial team ─────────────────────────────────── */}
      <section
        aria-labelledby="team-heading"
        className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              The team
            </p>
            <div
              aria-hidden="true"
              className="mt-4 h-0.5 w-10 bg-accent-600/40"
            />
          </div>
          <div className="space-y-5 text-body-lg leading-relaxed text-ink-700">
            <p>
              Bigelow Designs is produced by a small editorial team of interior designers,
              design journalists, and long-form writers. Our contributors have worked across
              residential and commercial interiors in New York, London, and Copenhagen, and
              have written for or consulted with publications including Dwell, Apartment
              Therapy, and Wallpaper*.
            </p>
            <p>
              We are proudly independent. We have no investors with design industry ties, no
              exclusive retailer relationships, and no advertising revenue from the brands we
              cover. Our only commercial relationships are the affiliate commissions disclosed
              transparently on every page.
            </p>
            <p>
              Questions, pitches, or corrections?{' '}
              <Link
                href="/contact"
                className="font-medium text-accent-600 transition-colors duration-quick hover:text-accent-500"
              >
                We&apos;d love to hear from you.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ─────────────────────────────────── */}
      <div className="border-t border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              Stay in the loop
            </p>
            <h2 className="mt-3 font-serif text-h1 text-ink-900">
              The Bigelow Edit, weekly.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-body-lg text-ink-500">
              Interior trends, honest reviews, and considered styling tips — distilled into
              a single, well-edited weekly email. No spam. No advertorials.
            </p>
            <Link
              href="/newsletter"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-3.5 text-body font-semibold text-white shadow-md transition-all duration-quick hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
            >
              Subscribe free
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
