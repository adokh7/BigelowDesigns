import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import type { Article } from '@/types/article';
import { getCategoryHref } from '@/lib/articles';
import { Breadcrumbs, BreadcrumbItem } from '@/components/Breadcrumbs';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Article header with motion-choreographed entrance.
 */
export function ArticleHeader({ 
  article,
  breadcrumbItems
}: { 
  article: Article;
  breadcrumbItems: BreadcrumbItem[];
}) {
  return (
    <header id="article-hero" className="mx-auto max-w-3xl flex flex-col gap-4 mb-10 mt-6">
      <div className="pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <Link
        href={getCategoryHref(article.category)}
        className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-accent-600 hover:text-accent-500 animate-fade-rise w-fit"
        style={{ animationDelay: '0ms' }}
      >
        <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
        {article.categoryLabel}
      </Link>

      <h1
        className="text-balance font-serif text-[clamp(28px,5vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 animate-fade-rise"
        style={{ animationDelay: '60ms' }}
      >
        {article.title}
      </h1>

      <p
        className="text-pretty text-body-lg leading-relaxed text-ink-600 animate-fade-rise"
        style={{ animationDelay: '120ms' }}
      >
        {article.excerpt}
      </p>

      <div
        className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm text-ink-600 animate-fade-rise"
        style={{ animationDelay: '180ms' }}
      >
        <div className="flex items-center gap-2">
          {article.author.avatar && (
            <Image
              src={article.author.avatar}
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <Link
            href="/about/sarah-bigelow"
            className="font-medium text-ink-800 hover:text-accent-600"
          >
            {article.author.name}
          </Link>
        </div>
        <span aria-hidden="true">·</span>
        <time dateTime={article.updatedAt ?? article.publishedAt}>
          Updated {formatDate(article.updatedAt ?? article.publishedAt)}
        </time>
        <span aria-hidden="true">·</span>
        <span>{article.readingTime} min read</span>
      </div>

      <figure
        className={clsx(
          'relative mt-8 overflow-hidden animate-fade-zoom bg-stone-50 w-full max-h-[60vh]',
          // Mobile: full-bleed (-mx-4 escapes article px-4)
          // Tablet+: contained with px-6 gutter, 16:9 natural ratio, rounded
          'aspect-video -mx-4 md:mx-0 md:rounded-2xl',
        )}
        style={{ animationDelay: '240ms' }}
      >
        <Image
          src={article.heroImage}
          alt={article.heroImageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
          className="object-contain"
        />
      </figure>
    </header>
  );
}
