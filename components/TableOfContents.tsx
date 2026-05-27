'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { Heading } from '@/types/article';

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px' },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="lg:sticky lg:top-24">
      <h2 className="hidden lg:block text-eyebrow text-ink-400">
        On this page
      </h2>
      <ul className="mt-3 space-y-2 border-l border-ink-100 text-body-sm">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: `${(h.level - 2) * 12 + 12}px` }}
          >
            <a
              href={`#${h.id}`}
              className={clsx(
                '-ml-px block border-l-2 py-1 transition-colors',
                activeId === h.id
                  ? 'border-accent text-accent-dark'
                  : 'border-transparent text-ink-600 hover:text-ink-900',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
