import type { MetadataRoute } from 'next';
import { getAllArticles, getAllCategorySlugs } from '@/lib/articles';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((a) => ({
    url: `${siteConfig.url}/${a.category}/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categories = getAllCategorySlugs().map((slug) => ({
    url: `${siteConfig.url}/rooms/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...categories,
    ...articles,
  ];
}
