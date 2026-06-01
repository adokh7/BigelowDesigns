import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import {
  getAllArticles,
  getArticleBySlugOnly,
  getRelatedArticles,
} from '@/lib/articles';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import type { Article } from '@/types/article';

// ─── SSG — all slugs pre-rendered at build; unknown → 404 ────
export const dynamic = 'force-static';
export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

// Pre-render all real article slugs at build time.
export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug }  = await params;
  const article   = getArticleBySlugOnly(slug);
  if (!article)   return {};

  const title       = article.seo?.metaTitle       ?? article.title;
  const description = article.seo?.metaDescription  ?? article.excerpt;
  const heroImage   = article.seo?.ogImage          ?? article.heroImage;
  const url         = `${siteConfig.url}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: article.seo?.canonical ?? url },
    robots: article.seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: article.publishedAt,
      modifiedTime:  article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
      images: [{
        url:    heroImage,
        width:  article.heroImageWidth  ?? 1600,
        height: article.heroImageHeight ?? 900,
        alt:    article.heroImageAlt,
      }],
    },
    twitter: {
      card:   'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
  };
}

// ─── Related card shape ───────────────────────────────────────
type RelatedCard = {
  slug: string; title: string; excerpt: string;
  categoryLabel: string; categoryHref: string;
  href: string; image: string; imageAlt: string; readingTime: number;
};

// ─── Helpers ─────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default async function BlogArticlePage({ params }: PageProps) {
  const { slug }  = await params;
  const article   = getArticleBySlugOnly(slug);

  // No real article → 404. Never show fake/demo content.
  if (!article) notFound();

  const categoryHref  = `/rooms/${article.category}`;
  const relatedReal   = getRelatedArticles(article, 3);

  // ── JSON-LD ──
  const canonicalUrl    = `${siteConfig.url}/blog/${slug}`;
  const breadcrumbItems = [
    { name: 'Home',                   url: '/'           },
    { name: article.categoryLabel,    url: categoryHref  },
    { name: article.title,            url: canonicalUrl  },
  ];

  const schemas: Record<string, unknown>[] = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildArticleSchema(article),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* ══════════════════════════════════════════════════════
          1.  ARTICLE HEADER
              Narrow, centred column — purely typographic.
              No hero image yet; that follows below.
          ══════════════════════════════════════════════════════ */}
      <div className="bg-surface">
        <header className="mx-auto max-w-[760px] px-4 pb-12 pt-10 text-center sm:px-6 lg:px-0 lg:pt-14 lg:pb-16">
          <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-8 mb-6 text-center items-center">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Category tag */}
            <Link
              href={categoryHref}
              className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
            >
              <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
              {article.categoryLabel}
              <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink-900 leading-tight text-balance">
              {article.title}
            </h1>
          </div>

          {/* Deck */}
          <p className="mx-auto mt-5 max-w-[600px] text-pretty text-body-lg leading-relaxed text-ink-600">
            {article.excerpt}
          </p>

          {/* Hairline rule */}
          <div aria-hidden="true" className="mx-auto mt-8 h-px w-16 bg-ink-200" />

          {/* Byline */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-body-sm text-ink-500">
            {article.author.avatar && (
              <Image
                src={article.author.avatar}
                alt=""
                width={32}
                height={32}
                className="rounded-full ring-2 ring-ink-100"
              />
            )}
            <Link
              href={`/authors/${article.author.slug}`}
              className="font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
            >
              {article.author.name}
            </Link>

            <span aria-hidden="true" className="text-ink-300">·</span>

            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>

            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <>
                <span aria-hidden="true" className="text-ink-300">·</span>
                <span className="text-ink-400">
                  Updated{' '}
                  <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                </span>
              </>
            )}

            <span aria-hidden="true" className="text-ink-300">·</span>

            <span>{article.readingTime} min read</span>
          </div>
        </header>
      </div>

      {/* ══════════════════════════════════════════════════════
          2.  HERO IMAGE
              Full bleed within page container. Ultra-wide on xl.
              Rounded corners on md+ for a card-like editorial feel.
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-elevated sm:rounded-xl xl:aspect-[21/9] xl:rounded-2xl">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3.  READING LAYOUT
              Two columns on lg:
              • Main  — prose column, max ~700 px of text
              • Right — sticky sidebar with ad + newsletter
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[1120px] px-4 pb-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16 xl:gap-20">

          {/* ── Main prose column ── */}
          <main>
            <div className="prose max-w-none text-ink-800">
              <MDXRemote
                source={article.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    ],
                  },
                }}
              />
            </div>

            {/* ── Author card — bottom of article ── */}
            <div className="mt-12 flex gap-4 rounded-2xl border border-ink-100 bg-elevated/40 p-6 lg:mt-16">
              {article.author.avatar && (
                <Image
                  src={article.author.avatar}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 flex-shrink-0 rounded-full ring-2 ring-ink-100"
                />
              )}
              <div>
                <p className="text-eyebrow uppercase tracking-[0.14em] text-ink-400">
                  Written by
                </p>
                <Link
                  href={`/authors/${article.author.slug}`}
                  className="mt-0.5 block font-serif text-body-lg font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
                >
                  {article.author.name}
                </Link>
                {article.author.credentials && article.author.credentials.length > 0 && (
                  <p className="mt-0.5 text-body-sm text-ink-500">
                    {article.author.credentials.join(' · ')}
                  </p>
                )}
                {article.author.bio && (
                  <p className="mt-2 text-body-sm leading-relaxed text-ink-600">
                    {article.author.bio}
                  </p>
                )}
              </div>
            </div>
          </main>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block" aria-label="Sidebar">
            <div className="sticky top-24 space-y-8">

              {/* Table of contents */}
              {article.headings.length >= 2 && (
                <nav aria-label="Table of contents">
                  <p className="mb-4 text-eyebrow uppercase tracking-[0.16em] text-ink-400">
                    In this article
                  </p>
                  <ol className="space-y-2 border-l border-ink-100 pl-4">
                    {article.headings
                      .filter((h) => h.level === 2)
                      .map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className={clsx(
                              'block text-[13px] leading-5 text-ink-600',
                              'transition-colors duration-quick',
                              'hover:text-accent-600',
                            )}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                  </ol>
                </nav>
              )}

              {/* Divider */}
              <div aria-hidden="true" className="h-px bg-ink-100" />

              {/* Newsletter mini-CTA */}
              <div className="rounded-2xl border border-ink-100 bg-elevated/40 p-5">
                <p className="text-eyebrow uppercase tracking-[0.14em] text-ink-400">
                  The Bigelow Edit
                </p>
                <p className="mt-2 font-serif text-[17px] font-semibold leading-snug text-ink-900">
                  Design inspiration, delivered weekly.
                </p>
                <p className="mt-2 text-[13px] leading-5 text-ink-600">
                  Weekly interior trends, honest furniture reviews, and
                  considered styling tips — delivered to your inbox.
                </p>
                <Link
                  href="/newsletter"
                  className={clsx(
                    'mt-4 flex w-full items-center justify-center',
                    'rounded-full bg-ink-900 py-2.5',
                    'text-[13px] font-semibold text-white',
                    'transition-colors duration-quick hover:bg-accent',
                  )}
                >
                  Subscribe
                </Link>
                <p className="mt-2 text-center text-[11px] text-ink-400">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4.  RELATED ARTICLES
              3-column card grid. Uses real related articles when
              available, fills the rest with demo placeholders.
          ══════════════════════════════════════════════════════ */}
      <RelatedSection realArticles={relatedReal} />
    </>
  );
}

// ─── Related articles section ────────────────────────────────
// Only real articles — no demo padding. Section is hidden when empty.
function RelatedSection({ realArticles }: { realArticles: Article[] }) {
  if (realArticles.length === 0) return null;

  const cards: RelatedCard[] = realArticles.map((a) => ({
    slug:          a.slug,
    title:         a.title,
    excerpt:       a.excerpt,
    categoryLabel: a.categoryLabel,
    categoryHref:  `/rooms/${a.category}`,
    href:          `/blog/${a.slug}`,
    image:         a.heroImage,
    imageAlt:      a.heroImageAlt,
    readingTime:   a.readingTime,
  }));

  return (
    <section
      aria-labelledby="related-heading"
      className="mx-auto max-w-[1120px] px-4 pb-20 pt-0 sm:px-6 lg:px-8 lg:pb-28"
    >
      {/* Border + header */}
      <div className="border-t border-ink-100 pt-12 lg:pt-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              Keep reading
            </p>
            <h2
              id="related-heading"
              className="mt-1.5 font-serif text-h2 text-ink-900"
            >
              You might also like.
            </h2>
          </div>
          <Link
            href="/guides"
            className="hidden flex-shrink-0 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500 sm:block"
          >
            All articles →
          </Link>
        </div>

        {/* Card grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <RelatedArticleCard key={card.slug} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Related article card ─────────────────────────────────────
function RelatedArticleCard({ card }: { card: RelatedCard }) {
  return (
    <article className="group flex flex-col gap-4">
      {/* Image */}
      <Link
        href={card.href}
        className="block overflow-hidden rounded-xl"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      {/* Copy */}
      <div className="flex flex-1 flex-col">
        <Link
          href={card.categoryHref}
          className="text-eyebrow uppercase tracking-[0.14em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {card.categoryLabel}
        </Link>
        <h3 className="mt-1.5 flex-1 font-serif text-body-lg font-semibold leading-snug text-ink-900">
          <Link
            href={card.href}
            className="transition-colors duration-quick hover:text-accent-600"
          >
            {card.title}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
          {card.excerpt}
        </p>
        <p className="mt-3 text-body-sm text-ink-400">
          {card.readingTime} min read
        </p>
      </div>
    </article>
  );
}
