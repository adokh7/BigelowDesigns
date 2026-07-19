import type { MetadataRoute } from 'next';
import { getAllArticles, getAllCategorySlugs } from '@/lib/articles';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((a) => ({
    url: `${siteConfig.url}/blog/${a.slug}`,
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

  const staticPages = [
    { url: `${siteConfig.url}/about`,                priority: 0.6 },
    { url: `${siteConfig.url}/contact`,              priority: 0.5 },
    { url: `${siteConfig.url}/reviews`,              priority: 0.7 },
    { url: `${siteConfig.url}/design-trends`,        priority: 0.7 },
    { url: `${siteConfig.url}/room-guides`,          priority: 0.7 },
    { url: `${siteConfig.url}/newsletter`,           priority: 0.5 },
    { url: `${siteConfig.url}/affiliate-disclosure`, priority: 0.3 },
    { url: `${siteConfig.url}/privacy`,              priority: 0.3 },
    { url: `${siteConfig.url}/terms`,                priority: 0.3 },
    { url: `${siteConfig.url}/global-designs`,        priority: 0.7 },
    { url: `${siteConfig.url}/rooms`,                 priority: 0.7 },
    { url: `${siteConfig.url}/compare`,               priority: 0.7 },
    { url: `${siteConfig.url}/tools/hanging-calculator`, priority: 0.8 },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...staticPages,
    ...categories,
    ...articles,
  ];
}
