import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Fully open: every crawler, spider, and AI bot is permitted on all
      // paths. No per-user-agent Disallow rules (GPTBot, AhrefsBot,
      // SemrushBot, etc. are all explicitly unblocked by this wildcard).
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
