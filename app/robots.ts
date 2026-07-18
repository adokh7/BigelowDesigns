import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Open to every crawler, spider, and AI bot (GPTBot, AhrefsBot,
      // SemrushBot, CCBot, etc.) — there are deliberately no per-user-agent
      // Disallow rules, so all content is fully crawlable.
      //
      // The two exceptions below are non-content paths only:
      //   /api/    — JSON endpoints with nothing for searchers to index.
      //   /search? — internal search results, i.e. thin/duplicate content
      //              that Google's own guidance recommends keeping out of
      //              the index.
      // Neither restricts access to any article or page.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/search?'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
