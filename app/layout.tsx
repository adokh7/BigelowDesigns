import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { CompareProvider } from '@/contexts/CompareContext';
import { CompareDrawer } from '@/components/CompareDrawer';
import { AnalyticsListener } from '@/components/AnalyticsListener';
import { buildOrganizationSchema, buildWebsiteSchema } from '@/lib/schema';
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Interior Design Ideas, Reviews & Inspiration`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss.xml' },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {/* Ahrefs Web Analytics — loads after page is interactive, no hydration impact */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="YhbFfA3VBAMsYXMqB0wX6g"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 — G-VEYTPK0FKL */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VEYTPK0FKL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VEYTPK0FKL');
          `}
        </Script>

        <CompareProvider>
          <AnalyticsListener />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CompareDrawer />
        </CompareProvider>
      </body>
    </html>
  );
}
