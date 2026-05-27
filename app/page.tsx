import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { CategoryGrid, type CategoryItem } from '@/components/sections/CategoryGrid';
import { ProductCard } from '@/components/ProductCard';
import { BudgetEstimator } from '@/components/interactive/BudgetEstimator';
import { ArticleCard } from '@/components/ArticleCard';
import { Reveal } from '@/components/ui/Reveal';
import { getAllArticles } from '@/lib/articles';

// ─── ISR ──────────────────────────────────────────────────────
export const revalidate = 3600;

// ─── Static room cards (curated copy, image, count) ──────────
const ROOM_CATEGORIES: CategoryItem[] = [
  {
    slug: 'living-room',
    label: 'Living Room',
    href: '/rooms/living-room',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=85',
    imageAlt: 'A sunlit minimalist living room with a cream sofa and oak floors',
    caption: 'Where the family gathers — and the sofa earns its keep.',
    articleCount: 42,
  },
  {
    slug: 'kitchen',
    label: 'Kitchen',
    href: '/rooms/kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85',
    imageAlt: 'A modern kitchen with marble counters and brass fixtures',
    caption: 'The hardest-working room, designed to feel effortless.',
    articleCount: 38,
  },
  {
    slug: 'bedroom',
    label: 'Bedroom',
    href: '/rooms/bedroom',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=85',
    imageAlt: 'A serene bedroom with linen bedding and warm morning light',
    caption: 'A quiet room for the loudest decision: rest.',
    articleCount: 31,
  },
];

// ─── Style discovery pills ────────────────────────────────────
const STYLE_TAGS = [
  { label: 'Scandinavian', href: '/styles/scandinavian' },
  { label: 'Japandi', href: '/styles/japandi' },
  { label: 'Mid-Century Modern', href: '/styles/mid-century-modern' },
  { label: 'Farmhouse', href: '/styles/farmhouse' },
  { label: 'Coastal', href: '/styles/coastal' },
];

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const latest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 6);

  // Editor's-pick product = first product of featured article
  const editorPick = featured?.products?.[0];
  const editorPickLink = editorPick?.affiliateLinks[0];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO — above the fold, no Reveal (fades on mount)
          ═══════════════════════════════════════════════════════ */}
      <Hero
        eyebrow="The May Issue · 2026"
        headline="Rooms worth coming home to."
        subhead="Editorial design guides and rigorously tested furniture reviews — for people who'd rather buy once."
        primaryCta={{ label: 'Step inside', href: '/rooms/living-room' }}
        secondaryCta={{ label: 'Read the latest', href: '/guides' }}
        image={{
          src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=85',
          alt: 'A bright minimalist living room with a beige modular sofa, oak floors and an arched window',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          2. ROOM CATEGORY GRID — primary navigation
          ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <CategoryGrid
          eyebrow="Departments"
          heading="Start with a room."
          description="Every room has its own logic. Browse the ideas, mistakes, and pieces that matter most — organized the way you actually live."
          items={ROOM_CATEGORIES}
        />
      </Reveal>

      {/* ═══════════════════════════════════════════════════════
          3. EDITOR'S PICK — featured affiliate moment
          ═══════════════════════════════════════════════════════ */}
      {editorPick && editorPickLink && (
        <Reveal>
          <section
            aria-labelledby="editors-pick-heading"
            className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
          >
            <header className="mx-auto max-w-2xl text-center">
              <p className="text-eyebrow text-accent-600">Editor&apos;s Pick</p>
              <h2
                id="editors-pick-heading"
                className="mt-3 font-serif text-h1 text-ink-900 text-balance"
              >
                The piece we keep recommending.
              </h2>
              <p className="mt-4 text-body-lg text-ink-600 text-pretty">
                Six weeks of testing. Three real homes. One sofa we&apos;d buy
                again — and the only one we tell our friends about.
              </p>
            </header>

            <div className="mx-auto mt-12 max-w-3xl">
              <ProductCard
                badge="Best Overall"
                image={{ src: editorPick.image, alt: editorPick.imageAlt }}
                brand={editorPick.brand}
                name={editorPick.name}
                description={
                  editorPick.pros?.join(' · ') ??
                  'A modular sofa that earns its space in any room — six weeks of testing, zero regrets.'
                }
                rating={editorPick.rating}
                reviewCount={editorPick.reviewCount}
                price={
                  editorPickLink.price !== undefined
                    ? { amount: editorPickLink.price, currency: editorPickLink.currency }
                    : undefined
                }
                cta={{
                  href: editorPickLink.url,
                  network: editorPickLink.network,
                  label: `Shop on ${editorPickLink.network}`,
                }}
              />
            </div>

            {featured && (
              <p className="mt-8 text-center">
                <Link
                  href={`/${featured.category}/${featured.slug}`}
                  className="inline-flex items-center gap-1 text-body font-semibold text-accent-600 transition-colors duration-quick ease-out hover:text-accent-500"
                >
                  Read the full review
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            )}
          </section>
        </Reveal>
      )}

      {/* ═══════════════════════════════════════════════════════
          4. BUDGET ESTIMATOR — interactive engagement
          ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <BudgetEstimator />
        </div>
      </Reveal>

      {/* ═══════════════════════════════════════════════════════
          5. BROWSE BY STYLE — secondary discovery
          ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <section
          aria-labelledby="styles-heading"
          className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-accent-600">By style</p>
            <h2
              id="styles-heading"
              className="mt-3 font-serif text-h1 text-ink-900 text-balance"
            >
              Or follow a feeling.
            </h2>
            <p className="mt-4 text-body-lg text-ink-600 text-pretty">
              From the quiet warmth of Japandi to the unbothered ease of
              Coastal — explore by the aesthetic you keep returning to.
            </p>
          </header>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {STYLE_TAGS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex h-11 items-center rounded-full border border-ink-200 bg-surface px-5 font-sans text-body font-medium text-ink-800 transition-all duration-quick ease-out hover:-translate-y-px hover:border-accent hover:text-accent-600 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* ═══════════════════════════════════════════════════════
          6. LATEST ARTICLES — content depth
          ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <section
          aria-labelledby="latest-heading"
          className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-eyebrow text-accent-600">The Archive</p>
              <h2
                id="latest-heading"
                className="mt-2 font-serif text-h1 text-ink-900 text-balance"
              >
                Latest from the studio.
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-body font-semibold text-accent-600 transition-colors duration-quick ease-out hover:text-accent-500"
            >
              See all →
            </Link>
          </header>

          {latest.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {latest.map((a, idx) => (
                <ArticleCard key={a.slug} article={a} priority={idx === 0} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-body text-ink-400">
              New stories landing soon.
            </p>
          )}
        </section>
      </Reveal>

      {/* ═══════════════════════════════════════════════════════
          Newsletter + Footer are rendered automatically by
          app/layout.tsx (Footer.tsx wraps NewsletterForm
          in its charcoal band).
          ═══════════════════════════════════════════════════════ */}
    </>
  );
}
