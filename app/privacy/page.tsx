import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Bigelow Designs collects, uses, and protects your personal information. Includes our policy on cookies, Google AdSense advertising, and third-party services.',
  alternates: { canonical: `${siteConfig.url}/privacy` },
  robots: { index: true, follow: true },
};

// Static page — no revalidation needed.
export const dynamic = 'force-static';

const LAST_UPDATED = 'May 28, 2026';
const CONTACT_EMAIL = 'privacy@bigelowdesigns.com';
const SITE_URL = 'https://www.bigelowdesigns.com';

export default function PrivacyPage() {
  return (
    <div className="bg-canvas">
      {/* ── Page header ───────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-prose px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-h1 text-ink-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-body-sm text-ink-500">
            Last updated: <time dateTime="2026-05-28">{LAST_UPDATED}</time>
          </p>
        </div>
      </div>

      {/* ── Prose content ─────────────────────────────────── */}
      <main className="mx-auto max-w-prose px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <div className="prose prose-headings:font-serif prose-a:text-accent-600 prose-a:no-underline hover:prose-a:underline max-w-none text-ink-800">

          <p>
            Welcome to {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;). We are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains how
            we collect, use, and safeguard your information when you visit{' '}
            <a href={SITE_URL}>{SITE_URL}</a> (the &ldquo;Site&rdquo;).
          </p>
          <p>
            Please read this policy carefully. If you disagree with its terms,
            please discontinue use of our Site.
          </p>

          {/* ── 1 ── */}
          <h2>1. Information We Collect</h2>

          <h3>Information you provide directly</h3>
          <p>
            We may collect personal information that you voluntarily provide when
            you subscribe to our newsletter, submit a contact form, or otherwise
            interact with us. This may include:
          </p>
          <ul>
            <li>Name and email address (newsletter subscription)</li>
            <li>Message content (contact form submissions)</li>
          </ul>

          <h3>Information collected automatically</h3>
          <p>
            When you visit the Site, certain information is collected automatically
            by our servers and third-party analytics providers, including:
          </p>
          <ul>
            <li>IP address and approximate geographic location</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URLs and pages visited</li>
            <li>Time and date of your visit</li>
            <li>Time spent on pages</li>
          </ul>

          {/* ── 2 ── */}
          <h2>2. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to operate and improve
            the Site. Cookies are small data files stored on your device. You can
            instruct your browser to refuse all cookies or to indicate when a cookie
            is being sent; however, some features of the Site may not function
            properly without them.
          </p>
          <p>We use the following types of cookies:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Necessary for the Site to function.
              They do not store personally identifiable information.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Allow us to understand how visitors
              interact with the Site (e.g., Google Analytics).
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used by our advertising partners
              (see Section 3 below) to show you relevant advertisements.
            </li>
          </ul>

          {/* ── 3 ── CRITICAL for AdSense approval ── */}
          <h2>3. Google AdSense and Third-Party Advertising</h2>
          <p>
            We use Google AdSense, a third-party advertising service operated by
            Google LLC, to display advertisements on the Site. Google AdSense uses
            cookies and web beacons to collect data about your visits to this and
            other websites in order to provide targeted advertisements based on your
            browsing activity and interests.
          </p>
          <p>
            Google&rsquo;s use of advertising cookies enables it and its partners to
            serve ads to you based on your visit to our Site and/or other sites on the
            Internet. You may opt out of personalised advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&rsquo;s Ads Settings
            </a>
            . Alternatively, you can opt out of a third-party vendor&rsquo;s use of
            cookies by visiting the{' '}
            <a
              href="https://www.networkadvertising.org/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Network Advertising Initiative opt-out page
            </a>
            .
          </p>
          <p>
            For more information about how Google collects and uses data, please
            review the{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>{' '}
            and the{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Partner Sites policy
            </a>
            .
          </p>

          {/* ── 4 ── */}
          <h2>4. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Operate and improve the Site</li>
            <li>
              Send newsletters and editorial updates (only where you have opted in)
            </li>
            <li>Respond to your enquiries</li>
            <li>Analyse Site usage and reader behaviour to improve content</li>
            <li>
              Comply with legal obligations and enforce our Terms of Service
            </li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share anonymised, aggregated data (which cannot
            reasonably identify you) with analytics and advertising partners.
          </p>

          {/* ── 5 ── */}
          <h2>5. Affiliate Links</h2>
          <p>
            The Site contains affiliate links — when you click one and make a
            purchase, we may earn a small commission at no additional cost to you.
            As an Amazon Associate, we earn from qualifying purchases. These
            commercial relationships never influence our editorial recommendations.
            For full details, see our{' '}
            <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
          </p>

          {/* ── 6 ── */}
          <h2>6. Third-Party Websites</h2>
          <p>
            The Site may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites and
            encourage you to read their privacy policies before providing any
            personal information.
          </p>

          {/* ── 7 ── */}
          <h2>7. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to fulfil the
            purposes set out in this policy, unless a longer retention period is
            required by law. Newsletter subscribers may unsubscribe at any time
            using the link included in every email.
          </p>

          {/* ── 8 ── */}
          <h2>8. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have the following rights under
            applicable data protection law (including the GDPR and CCPA):
          </p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of the personal data we hold
              about you.
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate data.
            </li>
            <li>
              <strong>Deletion:</strong> Request that we delete your personal data,
              subject to legal obligations.
            </li>
            <li>
              <strong>Opt-out of sale:</strong> We do not sell personal data.
              California residents may still submit opt-out requests under the CCPA.
            </li>
            <li>
              <strong>Marketing opt-out:</strong> Unsubscribe from our newsletter at
              any time.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          {/* ── 9 ── */}
          <h2>9. Children&rsquo;s Privacy</h2>
          <p>
            The Site is not directed to children under the age of 13. We do not
            knowingly collect personal information from children. If you believe we
            have inadvertently collected such information, please contact us
            immediately and we will take prompt steps to delete it.
          </p>

          {/* ── 10 ── */}
          <h2>10. Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect
            your personal information against unauthorised access, alteration,
            disclosure, or destruction. However, no method of internet transmission
            or electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>

          {/* ── 11 ── */}
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will
            revise the &ldquo;Last updated&rdquo; date at the top of this page. We
            encourage you to review this policy periodically to stay informed about
            how we protect your information. Continued use of the Site after any
            changes constitutes your acceptance of the updated policy.
          </p>

          {/* ── 12 ── */}
          <h2>12. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests relating to this Privacy
            Policy, please contact us:
          </p>
          <p>
            <strong>{siteConfig.name}</strong>
            <br />
            Email:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            Website: <a href={SITE_URL}>{SITE_URL}</a>
          </p>

        </div>

        {/* Back link */}
        <div className="mt-12 border-t border-ink-100 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
