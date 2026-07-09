import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { LazyFooter } from '@/components/LazyFooter';
import { AnalyticsListener } from '@/components/AnalyticsListener';
import { SmoothScroll } from '@/components/SmoothScroll';
import { siteConfig } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

// Homepage SEO copy — tightened to target the "reviews" + "guides" intent
// Ahrefs surfaced for the brand SERP. Centralised so the metadata block,
// OpenGraph card, and Twitter card all stay in sync.
const HOME_TITLE =
  'Bigelow Designs | Expert Interior Design Guides & Furniture Reviews';
// 155 chars — within the strict 150–160 SEO Site Checkup window.
const HOME_DESCRIPTION =
  'Expert interior design guides, honest furniture reviews, and modern room styling ideas at Bigelow Designs — considered, real-world home design inspiration.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
    types: { 'application/rss+xml': `${siteConfig.url}/rss.xml` },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: 'Bigelow Designs',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Favicon / touch icon tags are emitted automatically by Next.js from the
  // App Router file convention — see `app/favicon.ico`, `app/icon.png`, and
  // `app/apple-icon.png`. Each file is served with the correct MIME type and
  // a content hash, which is what Google requires before it will display the
  // logo next to a search result. A manual `icons` block here would override
  // the file-convention tags, so it is intentionally omitted.
  formatDetection: { telephone: false, address: false, email: false },
  verification: {
    google: 'dQtrCW2-Pv7U9oU7DV2FM2vCwvbgDPEicFk8euk-zQc',
  },
  other: {
    'ahrefs-site-verification': '027e0774ab2eaec1091149c1a84cb8fedd64a0dee6b972a2114d3820b90f43f6',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Entity-disambiguation JSON-LD: combined Organization + WebSite
            in a single @graph so Google can resolve "Bigelow Designs" as
            an interior-design publisher entity, distinct from same-name
            web-design agencies. Emitted in <head> so it's available in
            the raw HTML for the first crawl pass. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.bigelowdesigns.com/#organization",
                  "name": "Bigelow Designs",
                  "url": "https://www.bigelowdesigns.com/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.bigelowdesigns.com/logo.png",
                  },
                  "description":
                    "Expert interior design guides, honest furniture reviews, and modern home styling inspiration.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.bigelowdesigns.com/#website",
                  "url": "https://www.bigelowdesigns.com/",
                  "name": "Bigelow Designs",
                  "publisher": {
                    "@id": "https://www.bigelowdesigns.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Facebook SDK mount target. The SDK requires this exact id to
            inject its hidden plugin infrastructure. Empty div, zero
            visual / layout impact. */}
        <div id="fb-root" />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        {/* Google Analytics 4 — G-VEYTPK0FKL.
            lazyOnload defers GA until after the browser fires `load`, freeing
            the main thread during LCP/TBT measurement windows. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VEYTPK0FKL"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VEYTPK0FKL');
          `}
        </Script>

        {/* Ahrefs Web Analytics — verification key surfaces in the lazy load
            request URL, which Ahrefs accepts. Deferred so it never competes
            with first paint. */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="YhbFfA3VBAMsYXMqB0wX6g"
          strategy="lazyOnload"
        />

        {/* Facebook SDK — powers the <FacebookComments /> plugin on every
            article page. Loaded with `lazyOnload` so it can never compete
            with first paint; the SDK auto-scans the DOM for `.fb-comments`
            elements once it finishes downloading (xfbml=1). The fb-root
            anchor is rendered below — the SDK requires it to mount.

            Pinned to a specific Graph API version so a Facebook-side
            breaking change cannot quietly alter the plugin behaviour.
            Bump deliberately when migrating. */}
        <Script
          id="facebook-jssdk"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        {/* Google AdSense Auto-Ads — publisher ID ca-pub-8933725159594062.
            ┌─────────────────────────────────────────────────────────────┐
            │ DO NOT MODIFY src, client ID, or crossOrigin while the site │
            │ is under AdSense review — these exact values are what the   │
            │ AdSense crawler matches against the publisher account.      │
            └─────────────────────────────────────────────────────────────┘
            strategy="afterInteractive" (rather than lazyOnload) ensures
            the <script> tag is injected into the DOM as soon as hydration
            starts, so the AdSense verification crawler reliably finds it
            on the first render pass. The tag is still `async` once
            injected, so it remains fully non-render-blocking. */}
        <Script
          id="adsbygoogle-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8933725159594062"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Lenis smooth scroll — root mode hooks the window scroller (no
            wrapper div, no nested scroll container, no CLS). Falls back
            to native scrolling for prefers-reduced-motion users. */}
        <SmoothScroll>
          <AnalyticsListener />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          {/* Code-split — Footer + its NewsletterForm island ship in a
              separate chunk so they don't compete with LCP work. SSR is
              preserved so crawlers still see the footer link graph. */}
          <LazyFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
