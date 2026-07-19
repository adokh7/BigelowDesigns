import type { Metadata } from 'next';
import Link from 'next/link';
import HangingCalculator from '@/components/interactive/HangingCalculator';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_URL = `${siteConfig.url}/tools/hanging-calculator`;

/**
 * Note: the root layout applies the title template `%s | Bigelow Designs`,
 * so the bare title below renders as
 * "The Scale & Placement Guide | Bigelow Designs".
 */
export const metadata: Metadata = {
  title: 'The Scale & Placement Guide: Curtain & Art Hanging Heights',
  description:
    'Stop guessing. Calculate the exact, designer-approved height for your curtains, curtain rods, and wall art in seconds.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'The Scale & Placement Guide | Bigelow Designs',
    description:
      'Stop guessing. Calculate the exact, designer-approved height for your curtains, curtain rods, and wall art in seconds.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Scale & Placement Guide | Bigelow Designs',
    description:
      'Stop guessing. Calculate the exact, designer-approved height for your curtains, curtain rods, and wall art in seconds.',
  },
};

/** Targets the long-tail "how high should I hang…" queries this tool ranks for. */
const FAQS = [
  {
    question: 'How high should you hang curtains?',
    answer:
      'Mount the rod roughly two-thirds of the way up the wall between the top of the window frame and the ceiling, and never less than four inches above the frame. When the gap is under ten inches, take the rod almost to the ceiling instead. Hanging high draws the eye upward and makes the window — and the whole room — read taller.',
  },
  {
    question: 'How wide should a curtain rod be?',
    answer:
      'Extend the rod eight to twelve inches past the window frame on each side, so roughly sixteen to twenty-four inches wider than the window overall. That extra width gives the open panels somewhere to stack, which keeps the glass unblocked and lets in the maximum amount of daylight.',
  },
  {
    question: 'How high should you hang art on a wall?',
    answer:
      'Centre the piece between 57 and 60 inches from the floor — the gallery standard, set at average eye level. Work out the nail height by taking the centre line, adding half the height of the piece, then subtracting the drop from the top of the frame down to its taut hanging wire or D-ring.',
  },
  {
    question: 'How high should art hang above a sofa?',
    answer:
      'Leave six to eight inches between the top of the sofa back and the bottom of the frame. Any higher and the art floats away from the furniture; any lower and it feels cramped. Aim for a piece around 60 to 75 percent of the width of the sofa so the two read as a single, deliberate group.',
  },
];

const WHY = [
  {
    eyebrow: '01',
    headline: 'Height is what reads as expensive.',
    body:
      'Curtains hung level with the window frame cut a room in half and make the ceiling feel low. The same panels mounted high and wide draw the eye upward and add visual height for no extra money. It is the cheapest way to make a room feel taller, and almost nobody does it.',
  },
  {
    eyebrow: '02',
    headline: 'Art hung too high is the most common mistake.',
    body:
      'Most people hang art at their own eye level while standing at the wall, which lands far too high. Galleries centre work at 57 to 60 inches from the floor because that is average seated and standing eye level combined. Drop your art a few inches and the whole wall settles.',
  },
  {
    eyebrow: '03',
    headline: 'The nail never goes where the maths says.',
    body:
      'This is the step that ruins good measurements. Your hanging wire or D-ring sits some distance below the top of the frame, and that drop has to come off the final number. Skip it and the piece hangs high by exactly that amount — which is why so many walls end up with two holes.',
  },
];

export default function HangingCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'The Scale & Placement Guide',
            url: PAGE_URL,
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Any',
            description:
              'Calculate the exact, designer-approved height for curtains, curtain rods, and wall art.',
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
              { '@type': 'ListItem', position: 2, name: 'The Design Studio', item: `${siteConfig.url}/tools` },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'The Scale & Placement Guide',
                item: PAGE_URL,
              },
            ],
          },
        ]}
      />

      {/* ─── Editorial header ─────────────────────────────────────────── */}
      <header className="border-b border-ink-100 bg-canvas">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <p className="text-eyebrow uppercase text-brand">The Design Studio</p>
          <h1 className="mt-4 font-serif text-display-lg text-ink-900">
            The Scale &amp; Placement Guide
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-600">
            Stop guessing. Enter your ceiling height, window, or artwork and get the exact number to
            mark on the wall — the same measurements a designer would use.
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-brand-light" />
        </div>
      </header>

      {/* ─── Why it matters ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-h2 text-ink-900">
            Why a few inches change the whole room
          </h2>
          <p className="mt-4 text-body text-ink-600">
            Nothing dates a room faster than curtains hung too low and art hung too high. Both are
            free to fix, and both are the difference between a space that looks styled and one that
            looks almost right.
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
        <HangingCalculator />
      </section>

      {/* ─── FAQ (mirrors the FAQPage schema above) ───────────────────── */}
      <section className="border-t border-ink-100 bg-sunken">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-center font-serif text-h2 text-ink-900">
            Common hanging questions
          </h2>
          <dl className="mt-12 space-y-10">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="font-serif text-h3 text-ink-900">{faq.question}</dt>
                <dd className="mt-3 text-body leading-relaxed text-ink-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-center text-body-sm text-ink-400">
            Want the reasoning behind the numbers? Read our{' '}
            <Link
              href="/rooms/living-room"
              className="text-brand underline underline-offset-4 transition-colors duration-quick hover:text-brand-hover"
            >
              living room guides
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
