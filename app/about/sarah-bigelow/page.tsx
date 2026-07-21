import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { JsonLd } from '@/components/JsonLd';
import { getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_URL = `${siteConfig.url}/about/sarah-bigelow`;

const BIO =
  'Sarah Bigelow is the lead designer and founder of Bigelow Designs. With over 15 years of experience in residential interiors, she tests every layout, material, and fixture in real homes before recommending them.';

/**
 * Root layout applies the `%s | Bigelow Designs` title template.
 */
export const metadata: Metadata = {
  title: 'Sarah Bigelow — Lead Designer & Founder',
  description: BIO,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'profile',
    url: PAGE_URL,
    title: 'Sarah Bigelow — Lead Designer & Founder | Bigelow Designs',
    description: BIO,
  },
  twitter: {
    card: 'summary',
    title: 'Sarah Bigelow — Lead Designer & Founder | Bigelow Designs',
    description: BIO,
  },
};

const PRINCIPLES = [
  {
    eyebrow: '01',
    headline: 'Tested, never assumed.',
    body: 'Every layout rule, paint pairing, and fixture recommendation is lived with in a real home first — under real light, real clutter, and real daily use.',
  },
  {
    eyebrow: '02',
    headline: 'Honest above everything.',
    body: 'No sponsored praise, no showroom fantasy. If a trend wastes your money or a product fails after a month, the article says so.',
  },
  {
    eyebrow: '03',
    headline: 'Real homes, real budgets.',
    body: 'The advice is written for apartments, rentals, and normal houses — spaces with landlords, budgets, and lives happening inside them.',
  },
];

export default function SarahBigelowPage() {
  const latest = getAllArticles().slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${PAGE_URL}#profilepage`,
            url: PAGE_URL,
            name: 'Sarah Bigelow — Lead Designer & Founder',
            isPartOf: {
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
            },
            /* The entity this page profiles. Linking the Person to the
               Organization (founder + worksFor) ties the knowledge graph
               together: article author → this Person → the publisher. */
            mainEntity: {
              '@type': 'Person',
              '@id': `${PAGE_URL}#person`,
              name: 'Sarah Bigelow',
              url: PAGE_URL,
              jobTitle: 'Lead Designer & Founder',
              description: BIO,
              knowsAbout: [
                'Interior design',
                'Residential interiors',
                'Space planning',
                'Lighting design',
                'Color and paint selection',
              ],
              /* External corroboration profiles. Placeholder brand URLs —
                 swap for Sarah's real profiles when they exist. */
              sameAs: [
                'https://www.pinterest.com/bigelowdesigns',
                'https://www.instagram.com/bigelowdesigns',
              ],
              worksFor: {
                '@type': 'Organization',
                name: siteConfig.publisher.name,
                url: siteConfig.url,
                logo: siteConfig.publisher.logo,
              },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
              { '@type': 'ListItem', position: 2, name: 'About', item: `${siteConfig.url}/about` },
              { '@type': 'ListItem', position: 3, name: 'Sarah Bigelow', item: PAGE_URL },
            ],
          },
        ]}
      />

      {/* ─── Profile masthead ─────────────────────────────────────────── */}
      <header className="border-b border-ink-100 bg-canvas">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          {/* SB initials chip — the brand's no-stock-photography avatar */}
          <span
            aria-hidden="true"
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand/10 font-serif text-3xl font-semibold text-brand ring-1 ring-brand/20"
          >
            SB
          </span>

          <p className="mt-8 text-eyebrow uppercase text-brand">Lead Designer &amp; Founder</p>
          <h1 className="mt-3 font-serif text-display-lg text-ink-900">Sarah Bigelow</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg leading-relaxed text-ink-600">{BIO}</p>

          <div className="mx-auto mt-10 h-px w-16 bg-brand-light" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-body-sm text-ink-400">
            <span>15+ years in residential interiors</span>
            <span aria-hidden="true">·</span>
            <span>Independently tested</span>
            <span aria-hidden="true">·</span>
            <span>0 sponsored reviews</span>
          </div>
        </div>
      </header>

      {/* ─── How Sarah works ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-h2 text-ink-900">How the work gets done</h2>
          <p className="mt-4 text-body text-ink-600">
            Every guide on this site follows the same three rules — the ones that separate advice
            you can act on from advice that just photographs well.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {PRINCIPLES.map((item) => (
            <article key={item.eyebrow}>
              <p className="font-serif text-h3 text-brand">{item.eyebrow}</p>
              <h3 className="mt-3 font-serif text-h3 text-ink-900">{item.headline}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Latest from Sarah ────────────────────────────────────────── */}
      <section className="border-t border-ink-100 bg-sunken">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-serif text-h2 text-ink-900">Latest from Sarah</h2>
            <Link
              href="/rooms"
              className="text-body-sm font-semibold text-brand underline-offset-4 transition-colors duration-quick hover:text-brand-hover hover:underline"
            >
              Browse all guides →
            </Link>
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact band ─────────────────────────────────────────────── */}
      <section className="border-t border-ink-100">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
          <h2 className="font-serif text-h2 text-ink-900">Questions or corrections?</h2>
          <p className="mt-4 text-body text-ink-600">
            Sarah reads every message. If a guide missed something, or a recommendation failed in
            your home, she wants to know.
          </p>
          <p className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-7 py-3 text-body-sm font-semibold text-ink-800 transition-all duration-quick hover:border-brand hover:bg-brand hover:text-white"
            >
              Get in touch
              <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
