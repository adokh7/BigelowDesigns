/**
 * Canonical destination for legacy / spam path redirects.
 * Single source of truth so the host stays in sync with siteConfig.url.
 */
const CANONICAL_HOME = 'https://www.bigelowdesigns.com/';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Author avatars + editorial photography (Hero / SplitHero).
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Amazon product imagery for affiliate ProductCards that point at
      // remote Amazon-hosted images rather than local /public assets.
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },

  /**
   * Legacy-domain spam cleanup.
   *
   * This domain previously hosted (or was confused with) Chinese-language
   * spam pages under /tc/* and a booking flow under /book-online/*. Crawlers
   * and abandoned link farms still hammer those paths and generate 404s
   * that bleed crawl budget and pollute analytics.
   *
   * Every legacy path now returns a hard 301 to the canonical homepage so:
   *   - Bots receive a permanent moved signal and stop revisiting.
   *   - Any residual PageRank / referral juice consolidates on the homepage.
   *   - 404 noise stops appearing in Search Console and GA.
   *
   * statusCode: 301 (not `permanent: true`, which emits 308) — 301 is the
   * universally understood "moved permanently" signal SEO tooling expects.
   */
  async redirects() {
    return [
      // /tc and everything beneath it (e.g. /tc/757706/757706mls.html)
      { source: '/tc',          destination: CANONICAL_HOME, statusCode: 301 },
      { source: '/tc/:path*',   destination: CANONICAL_HOME, statusCode: 301 },

      // /book-online and everything beneath it (e.g. /book-online/phone-meeting)
      { source: '/book-online',         destination: CANONICAL_HOME, statusCode: 301 },
      { source: '/book-online/:path*',  destination: CANONICAL_HOME, statusCode: 301 },

      /*
       * Duplicate-content consolidation (GSC).
       *
       * Articles resolve at both /{category}/{slug} and the canonical
       * /blog/{slug}. To stop the category-path duplicates competing in
       * search, 301 the known duplicates onto their canonical /blog URL.
       */
      { source: '/bathroom/modern-beige-bathroom-ideas', destination: '/blog/modern-beige-bathroom-ideas', statusCode: 301 },
      { source: '/bathroom/smart-bathroom-technology',   destination: '/blog/smart-bathroom-technology',   statusCode: 301 },
      { source: '/kitchen/small-kitchen-design',         destination: '/blog/small-kitchen-design',         statusCode: 301 },
      { source: '/bathroom/honest-bathroom-design',      destination: '/blog/honest-bathroom-design',      statusCode: 301 },
      // Source spec said /kitchen/kitchen-layout, but the real article slug
      // is kitchen-layout-plan-space-flow — corrected so neither end 404s.
      { source: '/kitchen/kitchen-layout-plan-space-flow', destination: '/blog/kitchen-layout-plan-space-flow', statusCode: 301 },
    ];
  },
};

export default nextConfig;