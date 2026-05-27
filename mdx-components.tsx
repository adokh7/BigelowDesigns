import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { AffiliateButton } from '@/components/AffiliateButton';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ShopTheLook } from '@/components/ShopTheLook';
import { FAQAccordion } from '@/components/FAQAccordion';

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
    AffiliateButton,
    ComparisonTable,
    ShopTheLook,
    FAQAccordion,
    ...components,
  };
}
