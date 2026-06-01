import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { ArticleHeader } from '@/components/ArticleHeader';
import { AuthorByline } from '@/components/AuthorByline';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ComparisonTable } from '@/components/ComparisonTable';
import { FAQAccordion } from '@/components/FAQAccordion';
import { JsonLd } from '@/components/JsonLd';
import { RelatedArticles } from '@/components/RelatedArticles';
import { TableOfContents } from '@/components/TableOfContents';
import { AffiliateButton } from '@/components/AffiliateButton';
import { ShopTheLook } from '@/components/ShopTheLook';
import { StickyMiniCompare } from '@/components/ui/StickyMiniCompare';
import { RelatedProductsRail } from '@/components/RelatedProductsRail';

import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildItemListSchema,
} from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) return {};

  const url = `${siteConfig.url}/${article.category}/${article.slug}`;
  const title = article.seo?.metaTitle ?? article.title;
  const description = article.seo?.metaDescription ?? article.excerpt;
  const ogImage = article.seo?.ogImage ?? article.heroImage;

  return {
    title,
    description,
    alternates: { canonical: article.seo?.canonical ?? url },
    robots: article.seo?.noindex
      ? { index: false, follow: true }
      : undefined,
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: ogImage,
          width: article.heroImageWidth ?? 1200,
          height: article.heroImageHeight ?? 630,
          alt: article.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Rooms', url: '/rooms' },
    { name: article.categoryLabel, url: `/rooms/${article.category}` },
    { name: article.title, url: `/${article.category}/${article.slug}` },
  ];

  const schemas: Record<string, unknown>[] = [
    buildArticleSchema(article),
    buildBreadcrumbSchema(breadcrumbItems),
  ];
  if (article.faq?.length) schemas.push(buildFaqSchema(article.faq));
  if (article.products?.length)
    schemas.push(buildItemListSchema(article.products, article.title));

  return (
    <>
      <JsonLd data={schemas} />

      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ArticleHeader article={article} breadcrumbItems={breadcrumbItems} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,640px)_1fr]">
          {/* TOC sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <TableOfContents headings={article.headings} />
          </aside>

          {/* Main content */}
          <div className="prose prose-lg mx-auto w-full max-w-none lg:col-span-1">
            {/* Mobile TOC — collapsible drawer */}
            {article.headings.length >= 3 && (
              <details className="not-prose lg:hidden mb-8 rounded-lg border border-ink-100 bg-elevated/40 p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-2 text-eyebrow text-ink-700">
                  <span>Table of contents</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-quick ease-out [details[open]_&]:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="mt-3">
                  <TableOfContents headings={article.headings} />
                </div>
              </details>
            )}

            <MDXRemote
              source={article.content}
              components={{
                AffiliateButton,
                ComparisonTable,
                ShopTheLook,
                FAQAccordion,
              }}
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

            {article.products && article.products.length > 0 && (
              <ComparisonTable
                products={article.products}
                title="At a glance — our top picks"
              />
            )}

            {article.faq && article.faq.length > 0 && (
              <FAQAccordion items={article.faq} />
            )}

            <AuthorByline author={article.author} />
          </div>

          {/* Right rail (reserved for newsletter / ads) */}
          <aside className="hidden lg:block" aria-hidden="true" />
        </div>

        <RelatedArticles articles={related} />
      </article>

      {/* End-of-article product carousel — horizontal swipe on mobile */}
      {article.products && article.products.length > 0 && (
        <div className="mx-auto max-w-page">
          <RelatedProductsRail products={article.products} />
        </div>
      )}

      {article.products && article.products.length > 0 && (
        <StickyMiniCompare products={article.products} />
      )}
    </>
  );
}
