import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import type { Article } from '@/types/article';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Article header with motion-choreographed entrance.
 *
 * Stagger sequence (60ms beat):
 *   0ms  – category eyebrow
 *   60ms – H1 headline
 *   120ms – excerpt
 *   180ms – byline row
 *   240ms – hero figure (uses fade-zoom — 1.02 → 1)
 *
 * Each child opts into the timing via its own animate-* class.
 * Server-rendered: no JS, animations fire on first paint.
 */
export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header id="article-hero" className="mx-auto max-w-3xl">
      <Link
        href={`/rooms/${article.category}`}
        className="inline-block text-eyebrow text-accent-600 hover:text-accent-500 animate-fade-rise"
        style={{ animationDelay: '0ms' }}
      >
        {article.categoryLabel}
      </Link>

      <h1
        className="mt-3 font-serif text-h1 text-ink-900 leading-tight md:text-display-lg animate-fade-rise text-balance"
        style={{ animationDelay: '60ms' }}
      >
        {article.title}
      </h1>

      <p
        className="mt-4 text-body-lg text-ink-600 animate-fade-rise text-pretty"
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
            href={`/authors/${article.author.slug}`}
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
          'relative mt-8 overflow-hidden animate-fade-zoom',
          // Mobile: full-bleed (-mx-4 escapes article px-4), 4:3 portrait crop
          //         No rounded corners — image touches viewport edges
          // Tablet+: contained with px-6 gutter, 16:9 natural ratio, rounded
          'aspect-[4/3] -mx-4 md:mx-0 md:aspect-video md:rounded-2xl',
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
          className="object-cover"
        />
      </figure>
    </header>
  );
}
