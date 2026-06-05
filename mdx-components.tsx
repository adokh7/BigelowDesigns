import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

// ─── Affiliate / monetization components ──────────────────────
import { AffiliateButton }       from '@/components/AffiliateButton';
import { AffiliateDisclosure }   from '@/components/AffiliateDisclosure';
import { AffiliateProductGrid }  from '@/components/AffiliateProductGrid';
import { ProductCard }           from '@/components/ProductCard';

// ─── Other rich MDX components ────────────────────────────────
import { ComparisonTable } from '@/components/ComparisonTable';
import { ShopTheLook }     from '@/components/ShopTheLook';
import { FAQAccordion }    from '@/components/FAQAccordion';

/**
 * Custom MDX component map.
 *
 * The blog [slug] route passes these through to <MDXRemote> so any
 * .mdx file under content/articles/ can embed:
 *
 *   <AffiliateDisclosure />
 *   <AffiliateProductGrid heading="..." products={[...]} />
 *   <ProductCard {...} />
 *   <AffiliateButton href="..." network="amazon" />
 *   <ShopTheLook image="..." hotspots={[...]} />
 *   <FAQAccordion items={[...]} />
 *   <ComparisonTable products={[...]} />
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
    // is served from /public without explicit dimensions). Tailwind classes
    // give it a consistent, responsive look across all articles.
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        {...props}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-xl my-4"
      />
    ),

    // Affiliate / monetization
    AffiliateButton,
    AffiliateDisclosure,
    AffiliateProductGrid,
    ProductCard,

    // Other rich MDX components
    ComparisonTable,
    ShopTheLook,
    FAQAccordion,

    ...components,
  };
}
