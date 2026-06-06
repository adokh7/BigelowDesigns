import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CompareProvider } from '@/contexts/CompareContext';
import { LazyCompareDrawer } from '@/components/LazyCompareDrawer';
import { AnalyticsListener } from '@/components/AnalyticsListener';
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
// 198 chars — sits inside the 150–220 sweet spot Google tends to render in full.
const HOME_DESCRIPTION =
  'Read expert interior design guides, honest furniture reviews, and modern room styling ideas at Bigelow Designs — your trusted source for considered, real-world home design inspiration for every room.';

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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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

        {/* Google AdSense Auto-Ads — fully deferred. AdSense itself injects
            its iframes after parse, so lazyOnload has no functional cost. */}
        <Script
          id="adsbygoogle-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8933725159594062"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        <CompareProvider>
          <AnalyticsListener />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* Code-split + client-only — keeps compare state out of the
              initial bundle for the 95% of sessions that never use it. */}
          <LazyCompareDrawer />
        </CompareProvider>
      </body>
    </html>
  );
}
