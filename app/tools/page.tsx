import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_URL = `${siteConfig.url}/tools`;

/**
 * Root layout applies the `%s | Bigelow Designs` title template, so the
 * bare title below renders as "The Design Studio | Bigelow Designs".
 */
export const metadata: Metadata = {
  title: 'The Design Studio',
  description:
    'Three interactive design guides. Calculate exact curtain and art heights, plan your room lighting, and see how a paint colour will behave in your light.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'The Design Studio | Bigelow Designs',
    description:
      'Three interactive design guides — hanging heights, room lighting, and paint colour in your light.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Design Studio | Bigelow Designs',
    description:
      'Three interactive design guides — hanging heights, room lighting, and paint colour in your light.',
  },
};

interface Tool {
  slug: string;
  eyebrow: string;
  name: string;
  blurb: string;
  /** Short capability lines shown as a spec list on the card. */
  covers: string[];
  href?: string;
  status: 'live' | 'soon';
}

const TOOLS: Tool[] = [
  {
    slug: 'hanging-calculator',
    eyebrow: 'Measuring',
    name: 'The Scale & Placement Guide',
    blurb:
      'The two measurements people get wrong most often. Enter your ceiling, window, or artwork and get the exact number to mark on the wall — including the hardware drop almost every guide forgets.',
    covers: [
      'Curtain rod height, width & panel drop',
      'Art nail height at the 57–60" gallery line',
      'Spacing for art hung above a sofa or console',
    ],
    href: '/tools/hanging-calculator',
    status: 'live',
  },
  {
    slug: 'lighting-calculator',
    eyebrow: 'Lighting',
    name: 'The Room Ambience Planner',
    blurb:
      'How many lumens a room actually needs, how to split them across ambient, task, and accent light, and the exact colour temperature to buy.',
    covers: [
      'Target lumens by room type & mood',
      'Three-layer blueprint with fixture counts',
      'Kelvin guidance, and what never to mix',
    ],
    href: '/tools/lighting-calculator',
    status: 'live',
  },
  {
    slug: 'paint-lrv-predictor',
    eyebrow: 'Colour',
    name: 'The Paint & Light Harmony Studio',
    blurb:
      'Whether a paint colour will actually work in your room. Predicts how any undertone and LRV behaves in north, south, east, or west light — and suggests safer shades.',
    covers: [
      'Verdict by room orientation',
      'Why cool greys turn violet in north light',
      'Three safer alternative shades',
    ],
    href: '/tools/paint-lrv-predictor',
    status: 'live',
  },
];

export default function ToolsPage() {
  const live = TOOLS.filter((t) => t.status === 'live');
  const soon = TOOLS.filter((t) => t.status === 'soon');
  const [featured, ...rest] = live;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'The Design Studio',
            url: PAGE_URL,
            description:
              'Three interactive design guides — hanging heights, room lighting, and paint colour in your light.',
            isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: live.map((tool, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: tool.name,
              url: `${siteConfig.url}${tool.href}`,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
              { '@type': 'ListItem', position: 2, name: 'The Design Studio', item: PAGE_URL },
            ],
          },
        ]}
      />

      {/* ─── Masthead ─────────────────────────────────────────────────── */}
      <header className="border-b border-ink-100 bg-canvas">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <p className="text-eyebrow uppercase text-brand">Bigelow Designs</p>
          <h1 className="mt-4 font-serif text-display-lg text-ink-900">The Design Studio</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-600">
            Three interactive guides that replace guesswork with the exact number. Height, light,
            and colour — the decisions that make a room work, drawn from the same rules we apply on
            real projects.
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-brand-light" />
        </div>
      </header>

      {/* ─── Featured tool ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pt-16 sm:pt-20">
        <Link
          href={featured.href ?? '#'}
          className="group block overflow-hidden rounded-2xl border border-ink-100 bg-surface
                     shadow-md transition-all duration-smooth ease-out
                     hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="text-eyebrow uppercase text-brand">{featured.eyebrow}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/[0.08] px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  <span className="text-eyebrow uppercase text-brand">Live</span>
                </span>
              </div>

              <h2 className="mt-4 font-serif text-h1 text-ink-900">{featured.name}</h2>
              <p className="mt-4 text-body leading-relaxed text-ink-600">{featured.blurb}</p>

              <span
                className="mt-8 inline-flex items-center gap-2 text-body font-medium text-brand
                           transition-colors duration-quick group-hover:text-brand-hover"
              >
                Explore the guide
                <span
                  aria-hidden
                  className="transition-transform duration-smooth ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>

            <div className="border-t border-ink-100 bg-sunken p-8 sm:p-10 md:border-l md:border-t-0">
              <p className="text-eyebrow uppercase text-ink-400">What this guide covers</p>
              <ul className="mt-5 space-y-4">
                {featured.covers.map((c) => (
                  <li key={c} className="flex gap-3 text-body-sm leading-relaxed text-ink-600">
                    <span aria-hidden className="mt-2 h-1 w-4 shrink-0 rounded-full bg-brand-light" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Link>
      </section>

      {/* ─── The rest of the toolkit ──────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-8 sm:py-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href ?? '#'}
                className="group flex flex-col rounded-2xl border border-ink-100 bg-surface p-8
                           shadow-sm transition-all duration-smooth ease-out
                           hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-eyebrow uppercase text-brand">{tool.eyebrow}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/[0.08] px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span className="text-eyebrow uppercase text-brand">Live</span>
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-h3 text-ink-900">{tool.name}</h2>
                <p className="mt-3 text-body-sm leading-relaxed text-ink-600">{tool.blurb}</p>

                <ul className="mt-5 space-y-2.5">
                  {tool.covers.map((c) => (
                    <li key={c} className="flex gap-3 text-body-sm text-ink-600">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-3 shrink-0 rounded-full bg-brand-light"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-brand
                             transition-colors duration-quick group-hover:text-brand-hover"
                >
                  Open
                  <span
                    aria-hidden
                    className="transition-transform duration-smooth ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── In the workshop (only when something is pending) ─────────── */}
      {soon.length > 0 && (
        <section className="border-t border-ink-100 bg-sunken">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-h2 text-ink-900">In the workshop</h2>
              <p className="mt-4 text-body text-ink-600">
                What we are building next. Each one answers a question we get asked constantly.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {soon.map((tool) => (
                <article
                  key={tool.slug}
                  className="rounded-2xl border border-dashed border-ink-100 bg-canvas p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-eyebrow uppercase text-ink-400">{tool.eyebrow}</span>
                    <span className="rounded-full border border-ink-100 px-2.5 py-1 text-eyebrow uppercase text-ink-400">
                      Coming soon
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-h3 text-ink-900">{tool.name}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-ink-600">{tool.blurb}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Closing note ─────────────────────────────────────────────── */}
      <section className="border-t border-ink-100 bg-sunken">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
          <h2 className="font-serif text-h2 text-ink-900">More guides are coming</h2>
          <p className="mt-4 text-body text-ink-600">
            We add to the studio as the same questions keep arriving. If there is a decision you
            keep guessing at, tell us — it may well be next.
          </p>
          <p className="mt-8 text-body-sm text-ink-400">
            <Link
              href="/newsletter"
              className="text-brand underline underline-offset-4 transition-colors duration-quick hover:text-brand-hover"
            >
              Join the newsletter
            </Link>{' '}
            to hear when they land.
          </p>
        </div>
      </section>
    </>
  );
}
