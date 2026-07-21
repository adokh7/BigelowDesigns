import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { ArticleHeader } from '@/components/ArticleHeader';
import { AuthorByline } from '@/components/AuthorByline';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQAccordion } from '@/components/FAQAccordion';
import { JsonLd } from '@/components/JsonLd';
import { RelatedArticles } from '@/components/RelatedArticles';
import { FacebookComments } from '@/components/FacebookComments';
import { PremiumSocialClub } from '@/components/PremiumSocialClub';
import { TableOfContents } from '@/components/TableOfContents';

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

  // Self-URL of *this* route — used only for og:url so social cards link
  // back to the page the user is actually on.
  const url = `${siteConfig.url}/${article.category}/${article.slug}`;
  // The **canonical primary** URL for every article is /blog/[slug]. We
  // point this duplicate route's canonical there so Google consolidates
  // signals on a single indexable URL instead of treating the two
  // routes as competing duplicates.
  const canonicalUrl = article.seo?.canonical ?? `${siteConfig.url}/blog/${article.slug}`;
  const title = article.seo?.metaTitle ?? article.title;
  const description = article.seo?.metaDescription ?? article.excerpt;
  const ogImage = article.seo?.ogImage ?? article.heroImage;

  // Explicit robots block (rather than relying on the root layout merge)
  // so per-page SEO auditors see "index,follow" emitted on every article
  // response, with the same googleBot directives the homepage uses.
  const robots = article.seo?.noindex
    ? { index: false, follow: true }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      };

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots,
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
    // Canonical /blog path — the category-path variant now 301s there, so
    // the schema must not reference the redirecting URL.
    { name: article.title, url: `/blog/${article.slug}` },
  ];

  const schemas: Record<string, unknown>[] = [
    buildArticleSchema(article),
    buildBreadcrumbSchema(breadcrumbItems),
  ];
  if (article.faq?.length) schemas.push(buildFaqSchema(article.faq));

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
                // next/image — exposed to MDX so articles can embed
                // optimised product photography with `<Image .../>` directly.
                Image,
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

      {/* Editorial social-club CTA (TikTok + Facebook) above the comments. */}
      <PremiumSocialClub />

      {/* ══════════════════════════════════════════════════════
          COMMENTS
          Facebook Comments Plugin keyed to the canonical
          /blog/[slug] URL so this duplicate route shares the same
          thread as the canonical one (Facebook keys conversations
          by data-href).
          ══════════════════════════════════════════════════════ */}
      <FacebookComments url={`${siteConfig.url}/blog/${article.slug}`} />
    </>
  );
}
