import type { Metadata } from 'next';
import Link from 'next/link';
import LightingCalculator from '@/components/interactive/LightingCalculator';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_URL = `${siteConfig.url}/tools/lighting-calculator`;

/**
 * Root layout applies the `%s | Bigelow Designs` title template, so the bare
 * title renders as "The Room Ambience Planner | Bigelow Designs".
 */
export const metadata: Metadata = {
  title: 'The Room Ambience Planner: Room Lighting & Kelvin Guide',
  description:
    'How many lumens does your room actually need? Calculate ambient, task, and accent lighting plus the exact Kelvin temperature — free, in seconds.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'The Room Ambience Planner | Bigelow Designs',
    description:
      'How many lumens does your room actually need? Calculate ambient, task, and accent lighting plus the exact Kelvin temperature — free, in seconds.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Room Ambience Planner | Bigelow Designs',
    description:
      'How many lumens does your room actually need? Calculate ambient, task, and accent lighting plus the exact Kelvin temperature — free, in seconds.',
  },
};

/**
 * Answer-engine optimisation: each answer opens with a direct, extractable
 * response before adding context, so it can be lifted cleanly into an AI
 * Overview or featured snippet.
 */
const FAQS = [
  {
    question: 'How many lumens do I need per square foot?',
    answer:
      'Multiply your room’s square footage by its foot-candle target: about 15 for a living room, 12 for a bedroom, 35 for a kitchen, and 40 for a home office. A 220 square foot living room therefore needs roughly 3,300 lumens in total. Reduce that by around 15 percent for a cozy scheme or 40 percent for a deliberately moody one, and add roughly 12 percent for every foot of ceiling above the standard eight.',
  },
  {
    question: 'What are the three layers of light?',
    answer:
      'Ambient, task, and accent. Ambient is your overall foundation, usually overhead, and carries roughly 40 to 50 percent of the total. Task light covers the places you actually do things — worktops, desks, bedsides — and takes 25 to 45 percent depending on the room. Accent light picks out art, shelves, and architecture with the remaining 15 to 25 percent. A room lit by only one of the three always feels flat.',
  },
  {
    question: 'What Kelvin colour temperature is best for each room?',
    answer:
      'Use 2700K in living rooms and bedrooms for a warm, relaxed light. Kitchens work best at 3000K for general lighting with 4000K over work surfaces, and a home office wants 3500K to 4000K to help you stay alert. Lower numbers are warmer and yellower, higher numbers are cooler and bluer. Below 2700K reads candlelit and dramatic; above 5000K reads clinical in a home.',
  },
  {
    question: 'Can you mix different Kelvin bulbs in the same room?',
    answer:
      'No — not within the same sightline. Mixing colour temperatures is the most common lighting mistake in homes, and it makes an otherwise expensive room look cheap, because one cool bulb turns every warm bulb around it visibly yellow. The single exception is dedicated task lighting, such as a 4000K strip under kitchen cabinets, where the cooler light genuinely helps you see. Everything else in the room should match.',
  },
  {
    question: 'How many light fixtures does a room need?',
    answer:
      'Divide each layer’s lumen target by the output of a typical fixture: around 800 lumens for an ambient downlight, 600 for a task lamp, and 300 for an accent fitting. Most rooms end up with three to six ambient sources, two to four task lights, and two or three accent pieces. More small sources always beat one bright ceiling light, because pools of light are what create depth.',
  },
  {
    question: 'Why does my room feel flat even with bright lights?',
    answer:
      'Because it has one layer instead of three. A single overhead fixture flattens everything it touches and pushes the corners into shadow, which reads as harsh and unfinished no matter how many lumens it produces. Add task lighting at the places you sit and work, plus a little accent light on a wall or shelf, and put all of it on dimmers. The room will feel completely different at the same total brightness.',
  },
];

const WHY = [
  {
    eyebrow: '01',
    headline: 'One big light flattens a room.',
    body:
      'A single ceiling fixture throws light from one direction, which erases texture and drops the corners into shadow. It is the reason a room can be bright and still feel unwelcoming. Three layers at lower individual output will always beat one bright source.',
  },
  {
    eyebrow: '02',
    headline: 'Lumens matter, watts do not.',
    body:
      'Wattage tells you what a bulb costs to run, not how much light it gives. LEDs broke that old link entirely. Read the lumen figure on the box and ignore the watt equivalence, or you will keep buying by a number that no longer means anything.',
  },
  {
    eyebrow: '03',
    headline: 'Mixed Kelvins cheapen everything.',
    body:
      'Warm and cool bulbs in the same sightline fight each other, and the eye reads the whole room as slightly wrong without being able to say why. Matching colour temperature costs nothing and is the fastest upgrade most homes can make.',
  },
];

export default function LightingCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'The Room Ambience Planner',
            url: PAGE_URL,
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Any',
            description:
              'Calculate total lumens, the ambient, task, and accent lighting split, and the correct Kelvin colour temperature for any room.',
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
                name: 'The Room Ambience Planner',
                item: PAGE_URL,
              },
            ],
          },
        ]}
      />

      {/* ─── Masthead ─────────────────────────────────────────────────── */}
      <header className="border-b border-ink-100 bg-canvas">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <p className="text-eyebrow uppercase text-brand">The Design Studio</p>
          <h1 className="mt-4 font-serif text-display-lg text-ink-900">
            The Room Ambience Planner
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-600">
            Work out exactly how much light your room needs, how to split it across the three layers
            every designed space uses, and which colour temperature to buy.
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-brand-light" />
        </div>
      </header>

      {/* ─── Why it matters ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-h2 text-ink-900">
            Lighting is the cheapest way to change a room
          </h2>
          <p className="mt-4 text-body text-ink-600">
            It is also the thing most homes get wrong. Not because the fixtures are bad, but because
            there is only one of them — and because nobody reads the numbers on the box.
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
        <LightingCalculator />
      </section>

      {/* ─── FAQ (mirrors the FAQPage schema) ─────────────────────────── */}
      <section className="border-t border-ink-100 bg-sunken">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-center font-serif text-h2 text-ink-900">Common lighting questions</h2>
          <dl className="mt-12 space-y-10">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="font-serif text-h3 text-ink-900">{faq.question}</dt>
                <dd className="mt-3 text-body leading-relaxed text-ink-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-center text-body-sm text-ink-400">
            Measuring for curtains or art next? Visit the{' '}
            <Link
              href="/tools/hanging-calculator"
              className="text-brand underline underline-offset-4 transition-colors duration-quick hover:text-brand-hover"
            >
              Scale &amp; Placement Guide
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
