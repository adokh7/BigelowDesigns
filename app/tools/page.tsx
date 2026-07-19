import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_URL = `${siteConfig.url}/tools`;

/**
 * Root layout applies the `%s | Bigelow Designs` title template, so the
 * bare title below renders as "Design Tools & Calculators | Bigelow Designs".
 */
export const metadata: Metadata = {
  title: 'Design Tools & Calculators',
  description:
    'Free, designer-approved calculators for your home. Work out exact curtain rod heights, art hanging heights, and more — no guesswork, no measuring twice.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Design Tools & Calculators | Bigelow Designs',
    description:
      'Free, designer-approved calculators for your home. Exact curtain rod heights, art hanging heights, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Tools & Calculators | Bigelow Designs',
    description:
      'Free, designer-approved calculators for your home. Exact curtain rod heights, art hanging heights, and more.',
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
    name: 'Curtain & Art Hanging Height Calculator',
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
    name: 'Lighting Layers & Kelvin Calculator',
    blurb:
      'How many lumens a room actually needs, how to split them across ambient, task, and accent light, and the exact colour temperature to buy — sized to your square footage and ceiling height.',
    covers: [
      'Target lumens by room type & mood',
      'The three-layer blueprint with fixture counts',
      'Kelvin guidance, and what never to mix',
    ],
    href: '/tools/lighting-calculator',
    status: 'live',
  },
  {
    slug: 'paint-lrv-calculator',
    eyebrow: 'Colour',
    name: 'Paint LRV & Light Reflectance Tool',
    blurb:
      'Whether a paint colour will actually work in your room. Light Reflectance Value tells you how much light a shade gives back — the reason the same white reads warm in one room and grey in another.',
    covers: ['LRV by orientation', 'North vs south-facing rooms', 'Undertone pairing'],
    status: 'soon',
  },
];

export default function ToolsPage() {
  const live = TOOLS.filter((t) => t.status === 'live');
  const soon = TOOLS.filter((t) => t.status === 'soon');

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Design Tools & Calculators',
            url: PAGE_URL,
            description:
              'Free, designer-approved calculators for your home — curtain rod heights, art hanging heights, and more.',
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
              { '@type': 'ListItem', position: 2, name: 'Tools', item: PAGE_URL },
            ],
          },
        ]}
      />

      {/* ─── Masthead ─────────────────────────────────────────────────── */}
      <header className="border-b border-ink-100 bg-canvas">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <p className="text-eyebrow uppercase text-brand">The Toolkit</p>
          <h1 className="mt-4 font-serif text-display-lg text-ink-900">Design Tools</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-600">
            Free calculators that replace guesswork with the exact number. Built on the same rules
            we use on real projects — with more on the way, including paint LRV.
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-brand-light" />
        </div>
      </header>

      {/* ─── Featured tool ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {live.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href ?? '#'}
            className="group block overflow-hidden rounded-2xl border border-ink-100 bg-surface
                       shadow-md transition-all duration-smooth ease-out
                       hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
              {/* Copy */}
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="text-eyebrow uppercase text-brand">{tool.eyebrow}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/[0.08] px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span className="text-eyebrow uppercase text-brand">Live</span>
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-h1 text-ink-900">{tool.name}</h2>
                <p className="mt-4 text-body leading-relaxed text-ink-600">{tool.blurb}</p>

                <span
                  className="mt-8 inline-flex items-center gap-2 text-body font-medium text-brand
                             transition-colors duration-quick group-hover:text-brand-hover"
                >
                  Open the calculator
                  <span
                    aria-hidden
                    className="transition-transform duration-smooth ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>

              {/* Spec list */}
              <div className="border-t border-ink-100 bg-sunken p-8 sm:p-10 md:border-l md:border-t-0">
                <p className="text-eyebrow uppercase text-ink-400">What it works out</p>
                <ul className="mt-5 space-y-4">
                  {tool.covers.map((c) => (
                    <li key={c} className="flex gap-3 text-body-sm leading-relaxed text-ink-600">
                      <span aria-hidden className="mt-2 h-1 w-4 shrink-0 rounded-full bg-brand-light" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ─── Coming soon ──────────────────────────────────────────────── */}
      <section className="border-t border-ink-100 bg-sunken">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-h2 text-ink-900">In the workshop</h2>
            <p className="mt-4 text-body text-ink-600">
              What we are building next. Each one answers a question we get asked constantly — and
              that is surprisingly hard to find an honest answer to.
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

                <ul className="mt-6 space-y-2.5">
                  {tool.covers.map((c) => (
                    <li key={c} className="flex gap-3 text-body-sm text-ink-400">
                      <span aria-hidden className="mt-2 h-1 w-3 shrink-0 rounded-full bg-ink-100" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-14 text-center text-body-sm text-ink-400">
            Want to be told when these land?{' '}
            <Link
              href="/newsletter"
              className="text-brand underline underline-offset-4 transition-colors duration-quick hover:text-brand-hover"
            >
              Join the newsletter
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
