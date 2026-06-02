import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
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
    img: ({ src = '', alt = '', width, height, ...rest }) => (
      <Image
        src={src as string}
        alt={alt}
        width={Number(width) || 1200}
        height={Number(height) || 800}
        sizes="(max-width: 768px) 100vw, 768px"
        className="my-6 h-auto w-full rounded-lg"
        {...rest}
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
