import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/types/article';

export function ArticleCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  const href = `/${article.category}/${article.slug}`;
  return (
    <article className="group">
      <Link href={href} className="block overflow-hidden rounded-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-4">
        <Link
          href={`/rooms/${article.category}`}
          className="text-xs font-semibold uppercase tracking-widest text-accent-dark hover:text-accent"
        >
          {article.categoryLabel}
        </Link>
        <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-ink-900">
          <Link href={href} className="hover:text-accent-dark">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-ink-600 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-2 text-xs text-ink-400">
          {article.readingTime} min read
        </div>
      </div>
    </article>
  );
}
