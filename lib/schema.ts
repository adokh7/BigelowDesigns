import type { Article, ProductRef } from '@/types/article';
import { siteConfig } from './site';

const abs = (pathOrUrl: string): string =>
  pathOrUrl.startsWith('http')
    ? pathOrUrl
    : `${siteConfig.url}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;

export function buildArticleSchema(article: Article) {
  const url = abs(`/${article.category}/${article.slug}`);
  const isReview = article.schemaType === 'Review';
  const type = article.schemaType ?? 'Article';

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: article.title,
    description: article.excerpt,
    image: [abs(article.heroImage)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: 'en-US',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: abs(`/authors/${article.author.slug}`),
      ...(article.author.credentials?.length
        ? { jobTitle: article.author.credentials.join(', ') }
        : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher.name,
      logo: { '@type': 'ImageObject', url: siteConfig.publisher.logo },
    },
  };

  if (isReview && article.rating) {
    base.reviewRating = {
      '@type': 'Rating',
      ratingValue: article.rating,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return base;
}

export function buildBreadcrumbSchema(
  trail: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function buildFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildItemListSchema(products: ProductRef[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        ...(p.brand ? { brand: { '@type': 'Brand', name: p.brand } } : {}),
        image: abs(p.image),
        ...(p.rating
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: p.rating,
                reviewCount: p.reviewCount ?? 1,
              },
            }
          : {}),
        offers: p.affiliateLinks.map((link) => ({
          '@type': 'Offer',
          url: link.url,
          priceCurrency: link.currency,
          ...(link.price ? { price: link.price } : {}),
          availability: 'https://schema.org/InStock',
        })),
      },
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.publisher.logo,
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
