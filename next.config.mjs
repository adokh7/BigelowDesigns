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
       * Duplicate-content consolidation (GSC) — category catch-all.
       *
       * Articles historically resolved at both /{category}/{slug} and the
       * canonical /blog/{slug}. This single rule 301s EVERY category-path
       * duplicate onto its canonical /blog URL, superseding the per-article
       * rules that used to live here.
       *
       * The :category segment is an explicit whitelist of the nine article
       * categories in content/articles frontmatter — it can never touch
       * /rooms, /tools (the Design Studio), /blog, or any other route.
       * design-trends, reviews and room-guides are also static listing
       * pages, but the rule needs a :slug subpath to fire, so the listings
       * themselves (/design-trends etc.) are unaffected — and none of them
       * has any real static subroute (verified: each is a lone page.tsx).
       */
      {
        source:
          '/:category(living-room|kitchen|bathroom|bedroom|home-office|outdoor-guides|design-trends|reviews|room-guides)/:slug',
        destination: '/blog/:slug',
        statusCode: 301,
      },

      /*
       * Keyword-cannibalization merge: the narrower "Powder Room Edit"
       * post was folded into the broader design guide. NOTE: this rule
       * must come AFTER the category catch-all conceptually but works at
       * any position — /blog/* never matches the catch-all. The old
       * category path (/bathroom/luxury-powder-room-edit) chains
       * catch-all → this rule → final destination.
       */
      {
        source: '/blog/luxury-powder-room-edit',
        destination: '/blog/luxury-powder-room-design',
        statusCode: 301,
      },

      /*
       * Archive consolidation: /rooms is the single authoritative hub.
       * /room-guides was a parallel archive of the same content and
       * /guides accumulated inbound links without ever being a route.
       */
      { source: '/room-guides', destination: '/rooms', statusCode: 301 },
      { source: '/guides',      destination: '/rooms', statusCode: 301 },
    ];
  },
};

export default nextConfig;