import type { Metadata } from 'next';
import Link from 'next/link';
import PaintLRVPredictor from '@/components/interactive/PaintLRVPredictor';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_URL = `${siteConfig.url}/tools/paint-lrv-predictor`;

/**
 * Root layout applies the `%s | Bigelow Designs` title template, so the bare
 * title renders as "Paint LRV & Light Predictor | Bigelow Designs".
 */
export const metadata: Metadata = {
  title: 'Paint LRV & Light Predictor',
  description:
    'Will that paint colour work in your room? Predict how any LRV and undertone behaves in north, south, east, or west light — before you buy the tin.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Paint LRV & Light Predictor | Bigelow Designs',
    description:
      'Will that paint colour work in your room? Predict how any LRV and undertone behaves in north, south, east, or west light — before you buy the tin.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paint LRV & Light Predictor | Bigelow Designs',
    description:
      'Will that paint colour work in your room? Predict how any LRV and undertone behaves in north, south, east, or west light — before you buy the tin.',
  },
};

/**
 * Answer-engine optimisation: every answer leads with a directly extractable
 * response, then adds the reasoning underneath.
 */
const FAQS = [
  {
    question: 'What is LRV in paint?',
    answer:
      'LRV stands for Light Reflectance Value, a scale from 1 to 100 measuring how much light a colour reflects. A value of 1 is close to pure black and absorbs almost all light; 100 is close to pure white and reflects almost all of it. Most manufacturers print the LRV on the back of the colour card. As a rough guide, anything above 65 reads light and airy, 45 to 65 reads mid-tone, and below 30 reads genuinely dark.',
  },
  {
    question: 'What LRV is best for a north-facing room?',
    answer:
      'Choose an LRV above 60 with a warm undertone. North-facing rooms never receive direct sun, so the light arriving is cool and blue, and it drains warmth from everything it touches. A higher LRV compensates for the lower light level, while the warm undertone counteracts the blue cast. For a bright, airy result, aim for LRV 65 to 80.',
  },
  {
    question: 'Why does grey paint look purple or blue in my room?',
    answer:
      'Because the room almost certainly faces north. Cool grey has a blue or violet undertone, and north light is itself blue, so the two compound instead of cancelling out. The result reads dingy across the main wall and turns visibly violet in corners and shadows. The fix is not a different grey but a warmer one — a greige or warm neutral gives the light something to work against.',
  },
  {
    question: 'What paint colours work in a south-facing room?',
    answer:
      'Muted, slightly cooler shades with a mid-range LRV, roughly 55 to 72. South-facing rooms get intense warm sun for most of the day, which washes pale colours out to plain white and amplifies any yellow already in the paint. Greige and soft grey behave particularly well here, because the warm light neutralises their coolness rather than leaving them bleak.',
  },
  {
    question: 'Can a paint colour be too bright or reflective?',
    answer:
      'Yes. In a south or west-facing room, an LRV above about 78 will glare in direct sun, becoming uncomfortable to sit opposite and bleaching the colour out entirely. This is why brilliant whites often disappoint in sunny rooms: there is nothing left to see. Dropping ten to twenty LRV points lets the wall absorb some of that intensity and hold onto its character.',
  },
  {
    question: 'How does light change paint colour through the day?',
    answer:
      'East and west-facing rooms shift the most. An east-facing room is warm and golden in the morning, then flat and cool from midday onward. A west-facing room is cool through the morning and intensely warm and orange by late afternoon. North light stays consistently cool all day, and south light stays warm. Always judge a sample at the time of day you actually use the room.',
  },
  {
    question: 'Should you test paint samples on the wall?',
    answer:
      'Paint a large sheet of card instead, then move it around the room. Testing directly on the wall traps you: the existing colour underneath skews what you see, and patches influence each other. A separate board can be held against each wall, viewed in morning, midday and evening light, and propped beside your flooring and furniture — which is where most colour decisions are actually won or lost.',
  },
];

const WHY = [
  {
    eyebrow: '01',
    headline: 'The chip is lying to you.',
    body:
      'A colour card is viewed under shop lighting, at two inches square, against white paper. On four walls, under your own window, it becomes a different colour entirely. That gap is not bad luck — it is predictable physics, and it is what this tool models.',
  },
  {
    eyebrow: '02',
    headline: 'Your window has a colour.',
    body:
      'North light is blue. South light is golden. East and west swing across the day. Paint does not sit apart from that cast — it either compounds it or balances it. Choose a cool grey for a north room and you compound the blue, which is why it turns violet.',
  },
  {
    eyebrow: '03',
    headline: 'LRV is the number nobody reads.',
    body:
      'It is printed on almost every colour card and it tells you more than the name ever will. Two colours that look identical on paper can behave completely differently on a wall if their reflectance values are twenty points apart.',
  },
];

export default function PaintLRVPredictorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Paint LRV & Light Predictor',
            url: PAGE_URL,
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Any',
            description:
              'Predict how a paint colour’s LRV and undertone will behave in north, south, east, or west-facing light, with safer alternative shades.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: {
              '@type': 'Organization',
              name: siteConfig.publisher.name,
              url: siteConfig.url,
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
              { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/tools` },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Paint LRV & Light Predictor',
                item: PAGE_URL,
              },
            ],
          },
        ]}
      />

      {/* ─── Masthead ─────────────────────────────────────────────────── */}
      <header className="border-b border-ink-100 bg-canvas">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <p className="text-eyebrow uppercase text-brand">Free Tool</p>
          <h1 className="mt-4 font-serif text-display-lg text-ink-900">
            Paint LRV &amp; Light Predictor
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-600">
            The same white reads warm in one room and cold grey in the next. Tell us which way your
            room faces and what you are considering — we will tell you how it will really look.
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-brand-light" />
        </div>
      </header>

      {/* ─── Why it matters ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-h2 text-ink-900">
            Why your paint never looks like the sample
          </h2>
          <p className="mt-4 text-body text-ink-600">
            It is almost never the paint's fault, and almost always the window's. Once you know
            which way a room faces, most colour disasters become entirely predictable.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {WHY.map((item) => (
            <article key={item.eyebrow}>
              <p className="font-serif text-h3 text-brand">{item.eyebrow}</p>
              <h3 className="mt-3 font-serif text-h3 text-ink-900">{item.headline}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── The tool ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <PaintLRVPredictor />
      </section>

      {/* ─── FAQ (mirrors the FAQPage schema) ─────────────────────────── */}
      <section className="border-t border-ink-100 bg-sunken">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-center font-serif text-h2 text-ink-900">Common paint questions</h2>
          <dl className="mt-12 space-y-10">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="font-serif text-h3 text-ink-900">{faq.question}</dt>
                <dd className="mt-3 text-body leading-relaxed text-ink-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-center text-body-sm text-ink-400">
            Planning the lighting too? Colour and light are the same decision — try the{' '}
            <Link
              href="/tools/lighting-calculator"
              className="text-brand underline underline-offset-4 transition-colors duration-quick hover:text-brand-hover"
            >
              lighting layers calculator
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
