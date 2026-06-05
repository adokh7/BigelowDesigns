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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
    ];
  },
};

export default nextConfig;