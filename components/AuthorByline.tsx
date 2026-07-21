import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/types/article';

export function AuthorByline({ author }: { author: Article['author'] }) {
  return (
    <aside className="mt-12 flex gap-4 rounded-xl border border-ink-100 bg-ink-50 p-5">
      {author.avatar ? (
        <Image
          src={author.avatar}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
      ) : (
        /* Minimalist initials avatar — no stock photography. */
        <span
          role="img"
          aria-label={`${author.name} author avatar`}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand/10 font-serif text-xl font-semibold text-brand ring-1 ring-brand/20"
        >
          {author.name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')}
        </span>
      )}
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-ink-400">
          Written by
        </div>
        <Link
          href="/about/sarah-bigelow"
          className="text-lg font-semibold text-ink-900 hover:text-accent-dark"
        >
          {author.name}
        </Link>
        {author.credentials?.length ? (
          <div className="mt-0.5 text-xs text-ink-600">
            {author.credentials.join(' · ')}
          </div>
        ) : null}
        {author.bio && (
          <p className="mt-2 text-sm text-ink-600">{author.bio}</p>
        )}
      </div>
    </aside>
  );
}
