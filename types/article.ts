export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  secondaryCategories?: string[];
  tags?: string[];
  author: {
    name: string;
    slug: string;
    avatar?: string;
    bio?: string;
    credentials?: string[];
  };
  publishedAt: string;
  updatedAt?: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
  schemaType?: 'Article' | 'Review' | 'HowTo' | 'ItemList';
  faq?: { question: string; answer: string }[];
  products?: ProductRef[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonical?: string;
    noindex?: boolean;
    ogImage?: string;
  };
  featured?: boolean;
  rating?: number;
}

export interface ProductRef {
  id: string;
  name: string;
  brand?: string;
  image: string;
  imageAlt: string;
  rating?: number;
  reviewCount?: number;
  pros?: string[];
  cons?: string[];
  affiliateLinks: {
    region: 'US' | 'UK';
    network: string;
    url: string;
    price?: number;
    currency: 'USD' | 'GBP';
  }[];
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime: number;
  wordCount: number;
  headings: { id: string; text: string; level: number }[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}
