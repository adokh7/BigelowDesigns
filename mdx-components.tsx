import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { resolveImage } from '@/lib/image-utils';

// ─── Other rich MDX components ────────────────────────────────
import { FAQAccordion }    from '@/components/FAQAccordion';
import { AdSlot, AdSense } from '@/components/AdSlot';

/**
 * Custom MDX component map.
 *
 * The blog [slug] route passes these through to <MDXRemote> so any
 * .mdx file under content/articles/ can embed:
 *
 *   <FAQAccordion items={[...]} />
 *
 * The `a` and `img` overrides apply to every MDX-rendered link / image,
 * upgrading them to next/link and next/image respectively.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = '#', children, ...rest }) => {
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener" {...rest}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    },
    // Standard markdown image syntax ![alt](src) renders as a plain <img>.
    // Using a native <img> instead of next/image avoids the image-optimizer
    // pipeline (which can silently fail when widths are unknown or when src
    // is served from /public without explicit dimensions). The src is run
    // through resolveImage() so a missing file falls back to the global
    // default instead of rendering a broken icon.
    img: ({ src, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        {...props}
        src={resolveImage(src as string)}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-xl my-4"
      />
    ),

    // next/image — exposed to MDX so articles can render optimised product
    // photography with `<Image src="/foo.png" width={1200} height={675} />`
    // without needing a per-file ESM import (MDXRemote does not honour those).
    Image,

    // Other rich MDX components
    FAQAccordion,
    AdSlot,
    AdSense,

    // Editorial table & list enhancements matching Bigelow Designs styling
    table: ({ children, ...props }) => (
      <div className="my-8 w-full overflow-x-auto rounded-xl border border-ink-100 bg-surface shadow-xs">
        <table className="w-full text-left border-collapse text-body-sm text-ink-700" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="border-b border-ink-200 bg-elevated/60 font-serif text-ink-900 uppercase tracking-wider text-xs" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th className="py-3.5 px-4 font-semibold text-ink-900 border-b border-ink-200/80" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="py-3 px-4 border-b border-ink-100/60 leading-relaxed text-ink-700 last:border-b-0" {...props}>
        {children}
      </td>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-6 space-y-3 pl-6 list-disc marker:text-brand text-ink-800 leading-relaxed" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-6 space-y-3 pl-6 list-decimal marker:font-serif marker:font-semibold marker:text-accent-600 text-ink-800 leading-relaxed" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="pl-1 text-body lg:text-body-lg text-ink-800" {...props}>
        {children}
      </li>
    ),

    ...components,
  };
}
